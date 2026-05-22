//! Browser entry point — runs the OpsRocket core entirely client-side.
//!
//! Two layers:
//!  * stateless `rocket_view` / `load_ork` (used by the marketing hero);
//!  * a stateful `Session` (one open document) whose `session_*` functions
//!    mirror `opsrocket-web`'s `/api/*` handlers 1:1, so the existing
//!    workbench SPA can run with no server (a tiny fetch shim maps the
//!    HTTP calls onto these).

use std::cell::RefCell;

use opsrocket_io::OrkDocument;
use serde_json::{json, Value};
use wasm_bindgen::prelude::*;

/// Most recent edits kept for undo. Each entry is a full document snapshot
/// taken just before a mutation; bounded so a long session can't grow
/// memory without limit.
const HIST_CAP: usize = 100;

#[derive(Default)]
struct Session {
    doc: Option<OrkDocument>,
    undo: Vec<OrkDocument>,
    redo: Vec<OrkDocument>,
}

thread_local! {
    static SESSION: RefCell<Session> = RefCell::new(Session::default());
}

fn jerr(m: impl std::fmt::Display) -> JsError {
    JsError::new(&m.to_string())
}

fn payload(doc: &OrkDocument) -> String {
    serde_json::to_string(&json!({
        "view": opsrocket_view::build_rocket_view(doc),
        "stability": opsrocket_view::stability(doc),
        "tree": opsrocket_view::schema::build_tree(&doc.rocket),
        "config": opsrocket_view::motors::config_panel(doc),
        "sims": opsrocket_view::sim::sim_list(doc),
    }))
    .unwrap()
}

/// Run a mutating closure with undo support: snapshot the document first,
/// keep the snapshot only if the edit succeeds (and clear the redo stack),
/// otherwise roll the document back so a failed edit leaves no trace.
fn with_doc<T>(f: impl FnOnce(&mut OrkDocument) -> Result<T, JsError>) -> Result<T, JsError> {
    SESSION.with(|s| {
        let mut s = s.borrow_mut();
        let snap = s.doc.clone().ok_or_else(|| jerr("no document loaded"))?;
        let doc = s.doc.as_mut().unwrap();
        match f(doc) {
            Ok(v) => {
                s.undo.push(snap);
                if s.undo.len() > HIST_CAP {
                    s.undo.remove(0);
                }
                s.redo.clear();
                Ok(v)
            }
            Err(e) => {
                s.doc = Some(snap); // discard partial mutation
                Err(e)
            }
        }
    })
}
fn read_doc<T>(f: impl FnOnce(&OrkDocument) -> Result<T, JsError>) -> Result<T, JsError> {
    SESSION.with(|s| {
        let s = s.borrow();
        let doc = s.doc.as_ref().ok_or_else(|| jerr("no document loaded"))?;
        f(doc)
    })
}
fn parse(req: &str) -> Result<Value, JsError> {
    serde_json::from_str(req).map_err(jerr)
}
fn s<'a>(v: &'a Value, k: &str) -> Result<&'a str, JsError> {
    v.get(k)
        .and_then(Value::as_str)
        .ok_or_else(|| jerr(format!("missing string '{k}'")))
}

// ── stateless (hero) ────────────────────────────────────────────────────

#[wasm_bindgen]
pub fn rocket_view(bytes: &[u8]) -> Result<String, JsError> {
    let doc = opsrocket_io::read_ork_bytes(bytes).map_err(jerr)?;
    serde_json::to_string(&opsrocket_view::build_rocket_view(&doc)).map_err(jerr)
}

// ── stateful session (mirrors opsrocket-web /api/*) ─────────────────────

#[wasm_bindgen]
pub fn session_load(bytes: &[u8]) -> Result<String, JsError> {
    let mut doc = opsrocket_io::read_ork_bytes(bytes).map_err(jerr)?;
    opsrocket_view::schema::ensure_ids(&mut doc.rocket);
    let out = payload(&doc);
    SESSION.with(|s| {
        let mut s = s.borrow_mut();
        s.doc = Some(doc);
        s.undo.clear();
        s.redo.clear();
    });
    Ok(out)
}

/// Start a fresh blank document (the File ▸ New action).
#[wasm_bindgen]
pub fn session_new() -> Result<String, JsError> {
    let mut doc = opsrocket_view::new_document();
    opsrocket_view::schema::ensure_ids(&mut doc.rocket);
    let out = payload(&doc);
    SESSION.with(|s| {
        let mut s = s.borrow_mut();
        s.doc = Some(doc);
        s.undo.clear();
        s.redo.clear();
    });
    Ok(out)
}

/// Step back one edit. No-op (returns the current view) when the undo
/// stack is empty, so a stray Ctrl/Cmd-Z never errors.
#[wasm_bindgen]
pub fn session_undo() -> Result<String, JsError> {
    SESSION.with(|s| {
        let mut s = s.borrow_mut();
        if s.doc.is_none() {
            return Err(jerr("no document loaded"));
        }
        if let Some(prev) = s.undo.pop() {
            let cur = s.doc.take().unwrap();
            s.redo.push(cur);
            s.doc = Some(prev);
        }
        Ok(())
    })?;
    read_doc(|d| Ok(payload(d)))
}

/// Re-apply the most recently undone edit (no-op if none).
#[wasm_bindgen]
pub fn session_redo() -> Result<String, JsError> {
    SESSION.with(|s| {
        let mut s = s.borrow_mut();
        if s.doc.is_none() {
            return Err(jerr("no document loaded"));
        }
        if let Some(next) = s.redo.pop() {
            let cur = s.doc.take().unwrap();
            s.undo.push(cur);
            s.doc = Some(next);
        }
        Ok(())
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_view() -> Result<String, JsError> {
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_patch(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::schema::apply_edit(
            &mut d.rocket,
            s(&r, "id")?,
            s(&r, "key")?,
            r.get("value").unwrap_or(&Value::Null),
        )
        .map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_delete(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::schema::delete_component(&mut d.rocket, s(&r, "id")?).map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_add(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::schema::add_component(&mut d.rocket, s(&r, "parent_id")?, s(&r, "kind")?)
            .map(|_| ())
            .map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_motors() -> Result<String, JsError> {
    serde_json::to_string(&opsrocket_view::motors::motor_catalog()).map_err(jerr)
}

#[wasm_bindgen]
pub fn session_assign_motor(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::motors::assign_motor(
            &mut d.rocket,
            s(&r, "mount_id")?,
            s(&r, "config_id")?,
            s(&r, "designation")?,
            r.get("digest").and_then(Value::as_str).map(String::from),
            r.get("ejection_delay").and_then(Value::as_f64).unwrap_or(0.0),
        )
        .map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_clear_motor(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::motors::clear_motor(&mut d.rocket, s(&r, "mount_id")?, s(&r, "config_id")?)
            .map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_set_ignition(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::motors::set_ignition(
            &mut d.rocket,
            s(&r, "mount_id")?,
            s(&r, "event")?,
            r.get("delay").and_then(Value::as_f64).unwrap_or(0.0),
        )
        .map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_patch_sim(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    with_doc(|d| {
        opsrocket_view::sim::apply_sim_edit(
            d,
            s(&r, "sim_name")?,
            s(&r, "key")?,
            r.get("value").unwrap_or(&Value::Null),
        )
        .map_err(jerr)
    })?;
    read_doc(|d| Ok(payload(d)))
}

#[wasm_bindgen]
pub fn session_analysis(req: &str) -> Result<String, JsError> {
    let mach = parse(req)?.get("mach").and_then(Value::as_f64).unwrap_or(0.3);
    read_doc(|d| serde_json::to_string(&opsrocket_view::analysis::analysis(d, mach)).map_err(jerr))
}

#[wasm_bindgen]
pub fn session_optimize(req: &str) -> Result<String, JsError> {
    let r = parse(req)?;
    read_doc(|d| {
        let res = opsrocket_view::analysis::optimize(
            d,
            r.get("sim_name").and_then(Value::as_str),
            None, // embedded motor DB
            s(&r, "comp_id")?,
            s(&r, "key")?,
            r.get("min").and_then(Value::as_f64).unwrap_or(0.0),
            r.get("max").and_then(Value::as_f64).unwrap_or(0.0),
            r.get("steps").and_then(Value::as_u64).unwrap_or(20) as usize,
            r.get("goal").and_then(Value::as_str).unwrap_or(""),
            r.get("target").and_then(Value::as_f64).unwrap_or(0.0),
            r.get("min_margin").and_then(Value::as_f64).unwrap_or(1.0),
        )
        .map_err(jerr)?;
        serde_json::to_string(&res).map_err(jerr)
    })
}

#[wasm_bindgen]
pub fn session_simulate(req: &str) -> Result<String, JsError> {
    let name = parse(req)?
        .get("sim_name")
        .and_then(Value::as_str)
        .map(String::from);
    read_doc(|d| {
        let fd = opsrocket_view::run_flight(d, name.as_deref(), None).map_err(jerr)?;
        serde_json::to_string(&fd).map_err(jerr)
    })
}

/// Serialize the open document back to `.ork` bytes (browser download).
#[wasm_bindgen]
pub fn session_save() -> Result<Vec<u8>, JsError> {
    read_doc(|d| opsrocket_io::write_ork_bytes(d).map_err(jerr))
}

// ── stateless MCP API ───────────────────────────────────────────────────
// No session/document state: every call takes the .ork bytes and returns
// JSON (or new .ork bytes). Mirrors opsrocket-web's handlers but pure, so
// a serverless function can expose them over MCP. Reuses the embedded
// motor DB (motors_dir = None) — no filesystem.

const ENGINE_VERSION: &str = env!("CARGO_PKG_VERSION");

fn doc_from(bytes: &[u8]) -> Result<OrkDocument, JsError> {
    let mut doc = opsrocket_io::read_ork_bytes(bytes).map_err(jerr)?;
    opsrocket_view::schema::ensure_ids(&mut doc.rocket);
    Ok(doc)
}

fn ok_json(v: Value) -> Result<String, JsError> {
    serde_json::to_string(&v).map_err(jerr)
}

#[wasm_bindgen]
pub fn mcp_capabilities() -> Result<String, JsError> {
    let kinds = [
        "Stage", "NoseCone", "BodyTube", "Transition", "InnerTube", "FinSet",
        "TubeFinSet", "LaunchLug", "CenteringRing", "Parachute", "ShockCord",
        "MassObject", "PodSet", "ParallelStage",
    ];
    let allowed: serde_json::Map<String, Value> = kinds
        .iter()
        .map(|k| {
            (
                k.to_string(),
                json!(opsrocket_view::schema::allowed_children(k)),
            )
        })
        .collect();
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "units": "SI (m, kg, s, N, rad); lengths reported in cm/mm where noted",
        "component_kinds": kinds,
        "allowed_children": allowed,
        "edit_ops": [
            "patch_field", "add_component", "delete_component",
            "patch_sim", "assign_motor", "clear_motor", "set_ignition",
        ],
    }))
}

#[wasm_bindgen]
pub fn mcp_inspect(bytes: &[u8]) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "view": opsrocket_view::build_rocket_view(&doc),
        "tree": opsrocket_view::schema::build_tree(&doc.rocket),
        "config": opsrocket_view::motors::config_panel(&doc),
        "sims": opsrocket_view::sim::sim_list(&doc),
    }))
}

#[wasm_bindgen]
pub fn mcp_stability(bytes: &[u8]) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "stability": opsrocket_view::stability(&doc),
    }))
}

#[wasm_bindgen]
pub fn mcp_analysis(bytes: &[u8], mach: f64) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "analysis": opsrocket_view::analysis::analysis(&doc, mach),
    }))
}

#[wasm_bindgen]
pub fn mcp_simulate(bytes: &[u8], sim_name: Option<String>) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    let fd = opsrocket_view::run_flight(&doc, sim_name.as_deref(), None).map_err(jerr)?;
    ok_json(json!({ "engine_version": ENGINE_VERSION, "flight": fd }))
}

#[wasm_bindgen]
pub fn mcp_mass_breakdown(bytes: &[u8]) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    let props = opsrocket_sim::mass::empty_mass_properties(&doc.rocket);
    let stab = opsrocket_view::stability(&doc);
    // Per-component mass walk so chat / GUI can show "Component mass: 15.4 g"
    // alongside the assembly total. Walks the same structural tree the
    // aggregate uses.
    let mut per_component: Vec<serde_json::Value> = Vec::new();
    let resolved = opsrocket_sim::mass::resolve_auto_dimensions(&doc.rocket);
    for (c, _) in opsrocket_sim::mass::iter_layout(&resolved) {
        let common = c.common();
        per_component.push(json!({
            "id": common.id.0,
            "name": common.name,
            "kind": opsrocket_view::schema::kind_of(c),
            "mass_g": opsrocket_sim::mass::single_component_mass(c) * 1000.0,
        }));
    }
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "mass_kg": props.mass,
        "cg_axial_m": props.cg_axial,
        "i_long": props.i_long,
        "i_rot": props.i_rot,
        "stability": stab,
        "per_component": per_component,
    }))
}

#[wasm_bindgen]
pub fn mcp_list_presets(filter_json: &str) -> Result<String, JsError> {
    let p: Value = if filter_json.trim().is_empty() {
        json!({})
    } else {
        parse(filter_json)?
    };
    let kind = p.get("kind").and_then(Value::as_str).and_then(|k| {
        match k {
            "body_tube" => Some(opsrocket_core::preset::PresetKind::BodyTube),
            "nose_cone" => Some(opsrocket_core::preset::PresetKind::NoseCone),
            "transition" => Some(opsrocket_core::preset::PresetKind::Transition),
            "inner_tube" => Some(opsrocket_core::preset::PresetKind::InnerTube),
            "centering_ring" => Some(opsrocket_core::preset::PresetKind::CenteringRing),
            _ => None,
        }
    });
    let manufacturer = p.get("manufacturer").and_then(Value::as_str);
    let body_od_mm = p.get("body_od_mm").and_then(Value::as_f64);
    let contains = p.get("contains").and_then(Value::as_str);
    let hits = opsrocket_core::preset::Preset::filter(kind, manufacturer, body_od_mm, contains);
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "count": hits.len(),
        "presets": hits,
    }))
}

#[wasm_bindgen]
pub fn mcp_list_materials() -> Result<String, JsError> {
    let items: Vec<serde_json::Value> = opsrocket_core::material::CATALOG
        .iter()
        .map(|m| {
            json!({
                "name": m.name,
                "kind": match m.kind {
                    opsrocket_core::material::MaterialType::Bulk => "bulk",
                    opsrocket_core::material::MaterialType::Surface => "surface",
                    opsrocket_core::material::MaterialType::Line => "line",
                },
                "density": m.density,
                "group": m.group,
            })
        })
        .collect();
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "materials": items,
    }))
}

#[wasm_bindgen]
pub fn mcp_component_mass(bytes: &[u8], comp_id: &str) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    let resolved = opsrocket_sim::mass::resolve_auto_dimensions(&doc.rocket);
    for (c, _) in opsrocket_sim::mass::iter_layout(&resolved) {
        if c.common().id.0 == comp_id {
            return ok_json(json!({
                "id": c.common().id.0,
                "name": c.common().name,
                "kind": opsrocket_view::schema::kind_of(c),
                "mass_g": opsrocket_sim::mass::single_component_mass(c) * 1000.0,
            }));
        }
    }
    Err(JsError::new(&format!("component {comp_id} not found")))
}

#[wasm_bindgen]
pub fn mcp_optimize(bytes: &[u8], params_json: &str) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    let p = parse(params_json)?;
    let r = opsrocket_view::analysis::optimize(
        &doc,
        p.get("sim_name").and_then(Value::as_str),
        None,
        s(&p, "comp_id")?,
        s(&p, "key")?,
        p.get("min").and_then(Value::as_f64).ok_or_else(|| jerr("min"))?,
        p.get("max").and_then(Value::as_f64).ok_or_else(|| jerr("max"))?,
        p.get("steps").and_then(Value::as_u64).unwrap_or(15) as usize,
        p.get("goal").and_then(Value::as_str).unwrap_or("apogee"),
        p.get("target").and_then(Value::as_f64).unwrap_or(0.0),
        p.get("min_margin").and_then(Value::as_f64).unwrap_or(1.0),
    )
    .map_err(jerr)?;
    ok_json(json!({ "engine_version": ENGINE_VERSION, "optimize": r }))
}

#[wasm_bindgen]
pub fn mcp_parity(bytes: &[u8], index: Option<usize>) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    let idx = index.unwrap_or(0);
    let sim = doc
        .simulations
        .get(idx)
        .ok_or_else(|| jerr(format!("no simulation index {idx}")))?;
    let res = opsrocket_sim::engine::simulate_with(&doc, &sim.name, None).map_err(jerr)?;
    let c = sim
        .cached
        .as_ref()
        .ok_or_else(|| jerr("this .ork has no embedded OpenRocket reference"))?;
    let pct = |o: f64, r: f64| (o - r) / r.abs().max(1e-9) * 100.0;
    let find = |evs: &[(f64, String)]| {
        evs.iter()
            .find(|(_, k)| {
                let k = k.to_lowercase();
                k.contains("recover") || k.contains("deploy")
            })
            .map(|(t, _)| *t)
    };
    let find_ref = |evs: &[opsrocket_io::ork::FlightEvent]| {
        evs.iter()
            .find(|e| {
                let k = e.kind.to_lowercase();
                k.contains("recover") || k.contains("deploy")
            })
            .map(|e| e.time)
    };
    let metric = |o: f64, r: f64| json!({ "ops": o, "openrocket": r, "delta_pct": pct(o, r) });
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "sim_name": sim.name,
        "apogee_m": metric(res.max_altitude, c.max_altitude),
        "max_velocity_ms": metric(res.max_velocity, c.max_velocity),
        "max_acceleration_ms2": metric(res.max_acceleration, c.max_acceleration),
        "flight_time_s": metric(res.flight_time, c.flight_time),
        "time_to_apogee_s": metric(res.time_to_apogee, c.time_to_apogee),
        "recovery_deploy_s": {
            "ops": find(&res.events),
            "openrocket": find_ref(&c.events),
        },
    }))
}

#[wasm_bindgen]
pub fn mcp_extract_or_reference(
    bytes: &[u8],
    index: Option<usize>,
) -> Result<String, JsError> {
    let doc = doc_from(bytes)?;
    let idx = index.unwrap_or(0);
    let c = doc
        .simulations
        .get(idx)
        .and_then(|s| s.cached.as_ref())
        .ok_or_else(|| jerr("no embedded OpenRocket reference"))?;
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "columns": c.column_types,
        "points": c.points.iter().map(|p| &p.values).collect::<Vec<_>>(),
        "events": c.events.iter().map(|e| json!([e.time, e.kind])).collect::<Vec<_>>(),
    }))
}

#[wasm_bindgen]
pub fn mcp_new_document() -> Result<Vec<u8>, JsError> {
    let mut doc = opsrocket_view::new_document();
    opsrocket_view::schema::ensure_ids(&mut doc.rocket);
    opsrocket_io::write_ork_bytes(&doc).map_err(jerr)
}

#[wasm_bindgen]
pub fn mcp_list_motors() -> Result<String, JsError> {
    ok_json(json!({
        "engine_version": ENGINE_VERSION,
        "motors": opsrocket_view::motors::motor_catalog(),
    }))
}

/// Apply a list of edit ops and return the new .ork bytes. Stateless: the
/// caller threads the document through and can re-call mcp_inspect /
/// mcp_stability on the result for a fresh snapshot.
#[wasm_bindgen]
pub fn mcp_edit_apply(bytes: &[u8], ops_json: &str) -> Result<Vec<u8>, JsError> {
    let mut doc = doc_from(bytes)?;
    let ops = parse(ops_json)?;
    let ops = ops.as_array().ok_or_else(|| jerr("ops must be an array"))?;
    for (i, op) in ops.iter().enumerate() {
        let kind = s(op, "op")?;
        let r: Result<(), String> = match kind {
            "patch_field" => opsrocket_view::schema::apply_edit(
                &mut doc.rocket,
                s(op, "id")?,
                s(op, "key")?,
                op.get("value").unwrap_or(&Value::Null),
            ),
            "add_component" => opsrocket_view::schema::add_component(
                &mut doc.rocket,
                s(op, "parent_id")?,
                s(op, "kind")?,
            )
            .map(|_| ()),
            "delete_component" => {
                opsrocket_view::schema::delete_component(&mut doc.rocket, s(op, "id")?)
            }
            "patch_sim" => opsrocket_view::sim::apply_sim_edit(
                &mut doc,
                s(op, "sim_name")?,
                s(op, "key")?,
                op.get("value").unwrap_or(&Value::Null),
            ),
            "assign_motor" => opsrocket_view::motors::assign_motor(
                &mut doc.rocket,
                s(op, "mount_id")?,
                s(op, "config_id")?,
                s(op, "designation")?,
                op.get("digest").and_then(Value::as_str).map(String::from),
                op.get("ejection_delay").and_then(Value::as_f64).unwrap_or(0.0),
            ),
            "clear_motor" => opsrocket_view::motors::clear_motor(
                &mut doc.rocket,
                s(op, "mount_id")?,
                s(op, "config_id")?,
            ),
            "set_ignition" => opsrocket_view::motors::set_ignition(
                &mut doc.rocket,
                s(op, "mount_id")?,
                s(op, "event")?,
                op.get("delay").and_then(Value::as_f64).unwrap_or(0.0),
            ),
            "apply_preset" => (|| -> Result<(), String> {
                let preset_id = op
                    .get("preset_id")
                    .and_then(Value::as_str)
                    .ok_or_else(|| "missing preset_id".to_string())?;
                let comp_id = op
                    .get("id")
                    .and_then(Value::as_str)
                    .ok_or_else(|| "missing id".to_string())?;
                let preset = opsrocket_core::preset::Preset::lookup(preset_id)
                    .ok_or_else(|| format!("unknown preset {preset_id}"))?;
                opsrocket_view::schema::apply_preset(
                    &mut doc.rocket,
                    comp_id,
                    preset,
                )
            })(),
            other => Err(format!("unknown op '{other}'")),
        };
        r.map_err(|e| jerr(format!("op[{i}] ({kind}): {e}")))?;
    }
    opsrocket_io::write_ork_bytes(&doc).map_err(jerr)
}
