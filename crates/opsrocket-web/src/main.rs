//! OpsRocket HTTP server.
//!
//! Exposes the in-process Rust simulation core to the web frontend so the
//! same React/Three.js UI runs both inside Tauri (via `invoke`) and in a
//! plain browser (via `fetch`). Endpoints mirror the Tauri commands and
//! return identical JSON (both go through `opsrocket-view`).

use std::path::{Path, PathBuf};

use axum::{
    extract::Json,
    http::StatusCode,
    response::Json as JsonResp,
    routing::{get, post},
    Router,
};
use serde::Deserialize;
use serde_json::{json, Value};
use tower_http::cors::{Any, CorsLayer};

fn repo_root() -> PathBuf {
    if let Ok(p) = std::env::var("OPSROCKET_ROOT") {
        return PathBuf::from(p);
    }
    // crate dir is crates/opsrocket-web → repo root is two levels up.
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .and_then(|p| p.parent())
        .map(PathBuf::from)
        .unwrap_or_else(|| PathBuf::from("."))
}

fn motors_dir() -> PathBuf {
    repo_root().join("tests/fixtures/motors")
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

async fn load_ork(Json(req): Json<LoadReq>) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let doc = opsrocket_io::read_ork(&req.path)
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let view = opsrocket_view::build_rocket_view(&doc);
    Ok(JsonResp(serde_json::to_value(view).unwrap()))
}

#[derive(Deserialize)]
struct SimReq {
    path: String,
    #[serde(default)]
    sim_name: Option<String>,
    #[serde(default)]
    motors_dir: Option<String>,
}

async fn simulate(Json(req): Json<SimReq>) -> Result<JsonResp<Value>, (StatusCode, String)> {
    let doc = opsrocket_io::read_ork(&req.path)
        .map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
    let md: PathBuf = req
        .motors_dir
        .map(PathBuf::from)
        .unwrap_or_else(motors_dir);
    let fd = opsrocket_view::run_flight(&doc, req.sim_name.as_deref(), Some(&md))
        .map_err(|e| (StatusCode::UNPROCESSABLE_ENTITY, e))?;
    Ok(JsonResp(serde_json::to_value(fd).unwrap()))
}

#[tokio::main]
async fn main() {
    let port: u16 = std::env::var("OPSROCKET_PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(8787);

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/fixtures", get(fixtures))
        .route("/api/load_ork", post(load_ork))
        .route("/api/simulate", post(simulate))
        .route("/api/health", get(|| async { "ok" }))
        .layer(cors);

    let addr = format!("127.0.0.1:{port}");
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    println!("opsrocket-web listening on http://{addr}");
    println!("repo root: {}", repo_root().display());
    axum::serve(listener, app).await.unwrap();
}
