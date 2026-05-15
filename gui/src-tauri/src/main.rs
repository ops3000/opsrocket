// OpsRocket desktop GUI — Tauri backend.
//
// The simulation core runs in-process; commands are zero-copy Rust calls.
// View/flight DTOs + builders live in `opsrocket-view` so the desktop and
// web front-ends emit identical JSON.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use opsrocket_view::{FlightData, RocketView};

#[tauri::command]
fn load_ork(path: String) -> Result<RocketView, String> {
    let doc = opsrocket_io::read_ork(&path).map_err(|e| e.to_string())?;
    Ok(opsrocket_view::build_rocket_view(&doc))
}

#[tauri::command]
fn simulate(
    path: String,
    sim_name: Option<String>,
    motors_dir: Option<String>,
) -> Result<FlightData, String> {
    let doc = opsrocket_io::read_ork(&path).map_err(|e| e.to_string())?;
    let md = motors_dir.map(std::path::PathBuf::from);
    opsrocket_view::run_flight(&doc, sim_name.as_deref(), md.as_deref())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![load_ork, simulate])
        .run(tauri::generate_context!())
        .expect("error while running OpsRocket GUI");
}
