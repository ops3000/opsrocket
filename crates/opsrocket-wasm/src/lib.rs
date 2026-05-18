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
