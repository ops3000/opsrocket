//! OpsRocket HTTP server — stateful design workbench.
//!
//! Holds one open document (like OpenRocket's single-window model) so
//! edits accumulate: load → edit components → re-view / simulate → save.
//! The Rust core runs in-process; only view JSON crosses to the browser.

use std::path::{Path, PathBuf};
use std::sync::{Arc, Mutex, OnceLock};

use axum::{
    extract::{Json, State},
    http::StatusCode,
    response::Json as JsonResp,
    routing::{get, post},
    Router,
};
use opsrocket_io::OrkDocument;
use serde::Deserialize;
use serde_json::{json, Value};
use tower_http::cors::{Any, CorsLayer};

/// Bounded edit history (full document snapshots) for undo/redo.
const HIST_CAP: usize = 100;

#[derive(Default)]
struct Session {
    path: Option<String>,
    doc: Option<OrkDocument>,
    undo: Vec<OrkDocument>,
    redo: Vec<OrkDocument>,
}
type Shared = Arc<Mutex<Session>>;

fn repo_root() -> PathBuf {
    if let Ok(p) = std::env::var("OPSROCKET_ROOT") {
        return PathBuf::from(p);
    }
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(|p| p.parent())
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("."))
}
fn motors_dir() -> PathBuf {
    repo_root().join("tests/fixtures/motors")
}

fn err(code: StatusCode, m: impl Into<String>) -> (StatusCode, String) {
    (code, m.into())
}

async fn fixtures() -> JsonResp<Value> {
    let dir = repo_root().join("tests/fixtures/examples");
    let mut out = Vec::new();
    if let Ok(rd) = std::fs::read_dir(&dir) {
        for e in rd.flatten() {
            let p = e.path();
            if p.extension().and_then(|s| s.to_str()) == Some("ork") {
                out.push(json!({
                    "name": p.file_name().unwrap().to_string_lossy(),
                    "path": p.to_string_lossy(),
                }));
            }
        }
    }
    out.sort_by(|a, b| a["name"].as_str().cmp(&b["name"].as_str()));
    JsonResp(json!(out))
}

#[derive(Deserialize)]
struct LoadReq {
    path: String,
}

async fn load_ork(
    State(st): State<Shared>,
    Json(req): Json<LoadReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let mut doc =
        opsrocket_io::read_ork(&req.path).map_err(|e| err(StatusCode::BAD_REQUEST, e.to_string()))?;
    opsrocket_view::schema::ensure_ids(&mut doc.rocket);
    let view = opsrocket_view::build_rocket_view(&doc);
    let stab = opsrocket_view::stability(&doc);
    let tree = opsrocket_view::schema::build_tree(&doc.rocket);
    let config = opsrocket_view::motors::config_panel(&doc);
    let sims = opsrocket_view::sim::sim_list(&doc);
    let mut s = st.lock().unwrap();
    s.path = Some(req.path.clone());
    s.doc = Some(doc);
    s.undo.clear();
    s.redo.clear();
    Ok(JsonResp(json!({
        "view": view, "stability": stab, "tree": tree,
        "config": config, "sims": sims,
    })))
}

async fn new_doc(State(st): State<Shared>) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let mut doc = opsrocket_view::new_document();
    opsrocket_view::schema::ensure_ids(&mut doc.rocket);
    let view = opsrocket_view::build_rocket_view(&doc);
    let stab = opsrocket_view::stability(&doc);
    let tree = opsrocket_view::schema::build_tree(&doc.rocket);
    let config = opsrocket_view::motors::config_panel(&doc);
    let sims = opsrocket_view::sim::sim_list(&doc);
    let mut s = st.lock().unwrap();
    s.path = None;
    s.doc = Some(doc);
    s.undo.clear();
    s.redo.clear();
    Ok(JsonResp(json!({
        "view": view, "stability": stab, "tree": tree,
        "config": config, "sims": sims,
    })))
}

/// Apply a mutating edit with undo support: snapshot first, keep the
/// snapshot only if the edit succeeds (clearing redo), otherwise roll the
/// document back so a rejected edit leaves no trace.
fn with_doc<T>(
    st: &Shared,
    f: impl FnOnce(&mut OrkDocument) -> Result<T, String>,
) -> Result<T, (StatusCode, String)> {
    let mut s = st.lock().unwrap();
    let snap = s
        .doc
        .clone()
        .ok_or_else(|| err(StatusCode::CONFLICT, "no document loaded"))?;
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
        Err(m) => {
            s.doc = Some(snap); // discard partial mutation
            Err(err(StatusCode::UNPROCESSABLE_ENTITY, m))
        }
    }
}

async fn undo(State(st): State<Shared>) -> Result<JsonResp<Value>, (StatusCode, String)> {
    {
        let mut s = st.lock().unwrap();
        if s.doc.is_none() {
            return Err(err(StatusCode::CONFLICT, "no document"));
        }
        if let Some(prev) = s.undo.pop() {
            let cur = s.doc.take().unwrap();
            s.redo.push(cur);
            s.doc = Some(prev);
        }
    }
    get_view(State(st)).await
}

async fn redo(State(st): State<Shared>) -> Result<JsonResp<Value>, (StatusCode, String)> {
    {
        let mut s = st.lock().unwrap();
        if s.doc.is_none() {
            return Err(err(StatusCode::CONFLICT, "no document"));
        }
        if let Some(next) = s.redo.pop() {
            let cur = s.doc.take().unwrap();
            s.undo.push(cur);
            s.doc = Some(next);
        }
    }
    get_view(State(st)).await
}

async fn get_view(State(st): State<Shared>) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let s = st.lock().unwrap();
    let doc = s.doc.as_ref().ok_or_else(|| err(StatusCode::CONFLICT, "no document"))?;
    Ok(JsonResp(json!({
        "view": opsrocket_view::build_rocket_view(doc),
        "stability": opsrocket_view::stability(doc),
        "tree": opsrocket_view::schema::build_tree(&doc.rocket),
        "config": opsrocket_view::motors::config_panel(doc),
        "sims": opsrocket_view::sim::sim_list(doc),
    })))
}

#[derive(Deserialize)]
struct SimEditReq {
    sim_name: String,
    key: String,
    value: Value,
}

async fn patch_sim(
    State(st): State<Shared>,
    Json(req): Json<SimEditReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::sim::apply_sim_edit(doc, &req.sim_name, &req.key, &req.value)
    })?;
    get_view(State(st)).await
}

fn motor_catalog() -> &'static Vec<opsrocket_view::motors::MotorInfo> {
    static CAT: OnceLock<Vec<opsrocket_view::motors::MotorInfo>> = OnceLock::new();
    CAT.get_or_init(|| opsrocket_view::motors::scan_motors(&motors_dir()))
}

async fn motors() -> JsonResp<Value> {
    JsonResp(json!(motor_catalog()))
}

#[derive(Deserialize)]
struct AssignReq {
    mount_id: String,
    config_id: String,
    designation: String,
    #[serde(default)]
    digest: Option<String>,
    #[serde(default)]
    ejection_delay: f64,
}

async fn assign_motor(
    State(st): State<Shared>,
    Json(req): Json<AssignReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::motors::assign_motor(
            &mut doc.rocket,
            &req.mount_id,
            &req.config_id,
            &req.designation,
            req.digest.clone(),
            req.ejection_delay,
        )
    })?;
    get_view(State(st)).await
}

#[derive(Deserialize)]
struct ClearReq {
    mount_id: String,
    config_id: String,
}

async fn clear_motor(
    State(st): State<Shared>,
    Json(req): Json<ClearReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::motors::clear_motor(&mut doc.rocket, &req.mount_id, &req.config_id)
    })?;
    get_view(State(st)).await
}

#[derive(Deserialize)]
struct IgnReq {
    mount_id: String,
    event: String,
    #[serde(default)]
    delay: f64,
}

async fn set_ignition(
    State(st): State<Shared>,
    Json(req): Json<IgnReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::motors::set_ignition(&mut doc.rocket, &req.mount_id, &req.event, req.delay)
    })?;
    get_view(State(st)).await
}

#[derive(Deserialize)]
struct EditReq {
    id: String,
    key: String,
    value: Value,
}

async fn patch_component(
    State(st): State<Shared>,
    Json(req): Json<EditReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::schema::apply_edit(&mut doc.rocket, &req.id, &req.key, &req.value)
    })?;
    get_view(State(st)).await
}

#[derive(Deserialize)]
struct IdReq {
    id: String,
}

async fn delete_component(
    State(st): State<Shared>,
    Json(req): Json<IdReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::schema::delete_component(&mut doc.rocket, &req.id)
    })?;
    get_view(State(st)).await
}

#[derive(Deserialize)]
struct AddReq {
    parent_id: String,
    kind: String,
}

async fn add_component(
    State(st): State<Shared>,
    Json(req): Json<AddReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    with_doc(&st, |doc| {
        opsrocket_view::schema::add_component(&mut doc.rocket, &req.parent_id, &req.kind)
            .map(|_| ())
    })?;
    get_view(State(st)).await
}

#[derive(Deserialize)]
struct SaveReq {
    #[serde(default)]
    path: Option<String>,
}

async fn save(
    State(st): State<Shared>,
    Json(req): Json<SaveReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let s = st.lock().unwrap();
    let doc = s.doc.as_ref().ok_or_else(|| err(StatusCode::CONFLICT, "no document"))?;
    let path = req
        .path
        .clone()
        .or_else(|| s.path.clone())
        .ok_or_else(|| err(StatusCode::BAD_REQUEST, "no save path"))?;
    opsrocket_io::write_ork(&path, doc)
        .map_err(|e| err(StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;
    Ok(JsonResp(json!({ "saved": path })))
}

#[derive(Deserialize)]
struct AnalysisReq {
    #[serde(default = "default_mach")]
    mach: f64,
}
fn default_mach() -> f64 {
    0.3
}

async fn analysis(
    State(st): State<Shared>,
    Json(req): Json<AnalysisReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let s = st.lock().unwrap();
    let doc = s.doc.as_ref().ok_or_else(|| err(StatusCode::CONFLICT, "no document"))?;
    Ok(JsonResp(json!(opsrocket_view::analysis::analysis(doc, req.mach))))
}

#[derive(Deserialize)]
struct OptReq {
    #[serde(default)]
    sim_name: Option<String>,
    comp_id: String,
    key: String,
    min: f64,
    max: f64,
    #[serde(default = "default_steps")]
    steps: usize,
    #[serde(default)]
    goal: String,
    #[serde(default)]
    target: f64,
    #[serde(default = "default_margin")]
    min_margin: f64,
}
fn default_steps() -> usize {
    20
}
fn default_margin() -> f64 {
    1.0
}

async fn optimize(
    State(st): State<Shared>,
    Json(req): Json<OptReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let s = st.lock().unwrap();
    let doc = s.doc.as_ref().ok_or_else(|| err(StatusCode::CONFLICT, "no document"))?;
    let md = motors_dir();
    let r = opsrocket_view::analysis::optimize(
        doc,
        req.sim_name.as_deref(),
        Some(&md),
        &req.comp_id,
        &req.key,
        req.min,
        req.max,
        req.steps,
        &req.goal,
        req.target,
        req.min_margin,
    )
    .map_err(|m| err(StatusCode::UNPROCESSABLE_ENTITY, m))?;
    Ok(JsonResp(json!(r)))
}

#[derive(Deserialize)]
struct SimReq {
    #[serde(default)]
    sim_name: Option<String>,
}

async fn simulate(
    State(st): State<Shared>,
    Json(req): Json<SimReq>,
) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let s = st.lock().unwrap();
    let doc = s.doc.as_ref().ok_or_else(|| err(StatusCode::CONFLICT, "no document"))?;
    let md = motors_dir();
    let fd = opsrocket_view::run_flight(doc, req.sim_name.as_deref(), Some(&md))
        .map_err(|e| err(StatusCode::UNPROCESSABLE_ENTITY, e))?;
    Ok(JsonResp(serde_json::to_value(fd).unwrap()))
}

#[tokio::main]
async fn main() {
    let port: u16 = std::env::var("OPSROCKET_PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(8787);
    let shared: Shared = Arc::new(Mutex::new(Session::default()));

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/fixtures", get(fixtures))
        .route("/api/load_ork", post(load_ork))
        .route("/api/new", post(new_doc))
        .route("/api/view", get(get_view))
        .route("/api/component", axum::routing::patch(patch_component))
        .route("/api/component/delete", post(delete_component))
        .route("/api/component/add", post(add_component))
        .route("/api/undo", post(undo))
        .route("/api/redo", post(redo))
        .route("/api/motors", get(motors))
        .route("/api/assign_motor", post(assign_motor))
        .route("/api/clear_motor", post(clear_motor))
        .route("/api/set_ignition", post(set_ignition))
        .route("/api/sim", axum::routing::patch(patch_sim))
        .route("/api/analysis", post(analysis))
        .route("/api/optimize", post(optimize))
        .route("/api/save", post(save))
        .route("/api/simulate", post(simulate))
        .route("/api/health", get(|| async { "ok" }))
        .with_state(shared)
        .layer(cors);

    let addr = format!("127.0.0.1:{port}");
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    println!("opsrocket-web (stateful) on http://{addr}  root={}", repo_root().display());
    axum::serve(listener, app).await.unwrap();
}
