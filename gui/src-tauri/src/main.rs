// OpsRocket desktop GUI — Tauri backend.
//
// Thin glue: the simulation core (opsrocket-core/io/sim) runs in-process,
// so commands are zero-copy Rust calls — no IPC serialization of the
// physics, only the resulting view/flight data is sent to the webview.
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use opsrocket_core::component::Component;
use opsrocket_core::profile::shape_radius;
use serde::Serialize;

#[derive(Serialize)]
struct CompView {
    kind: String,
    name: String,
    axial_start: f64,
    length: f64,
}

/// A filled silhouette polygon (meters): x is along the rocket axis,
/// y is the (positive) radius. The frontend mirrors it about y=0.
#[derive(Serialize)]
struct Shape2D {
    kind: String,
    points: Vec<[f64; 2]>,
}

/// A surface-of-revolution profile for the 3D view: (axial_x, radius)
/// pairs in world axial coordinates.
#[derive(Serialize)]
struct LatheProfile {
    points: Vec<[f64; 2]>,
}

#[derive(Serialize)]
struct FinView {
    axial_start: f64,
    root_chord: f64,
    tip_chord: f64,
    sweep: f64,
    height: f64,
    count: u32,
    body_radius: f64,
}

#[derive(Serialize)]
struct RocketView {
    name: String,
    designer: Option<String>,
    total_length: f64,
    max_radius: f64,
    components: Vec<CompView>,
    outline: Vec<Shape2D>,
    lathe: Vec<LatheProfile>,
    fins: Vec<FinView>,
    simulations: Vec<String>,
}

#[derive(Serialize)]
struct FlightData {
    time: Vec<f64>,
    altitude: Vec<f64>,
    velocity: Vec<f64>,
    thrust: Vec<f64>,
    apogee: f64,
    time_to_apogee: f64,
    flight_time: f64,
    ground_hit_velocity: f64,
    events: Vec<(f64, String)>,
}

const PROFILE_SAMPLES: usize = 48;

fn body_local_radius(comp: &Component, x: f64) -> f64 {
    match comp {
        Component::NoseCone(n) => shape_radius(
            n.shape,
            n.shape_parameter,
            x,
            0.0,
            n.aft_radius,
            n.length,
        ),
        Component::Transition(t) => shape_radius(
            t.shape,
            t.shape_parameter,
            x,
            t.fore_radius,
            t.aft_radius,
            t.length,
        ),
        Component::BodyTube(b) => b.radius.unwrap_or(0.0),
        _ => 0.0,
    }
}

#[tauri::command]
fn load_ork(path: String) -> Result<RocketView, String> {
    let doc = opsrocket_io::read_ork(&path).map_err(|e| e.to_string())?;
    let layout = opsrocket_sim::mass::iter_layout(&doc.rocket);

    let mut components = Vec::new();
    let mut outline = Vec::new();
    let mut lathe = Vec::new();
    let mut fins = Vec::new();
    let mut max_radius = 0.0_f64;

    for (comp, axial_start) in &layout {
        let common = comp.common();
        let length = comp.length();
        let kind = match comp {
            Component::NoseCone(_) => "NoseCone",
            Component::BodyTube(_) => "BodyTube",
            Component::Transition(_) => "Transition",
            Component::InnerTube(_) => "InnerTube",
            Component::FinSet(_) => "FinSet",
            Component::MassObject(_) => "MassObject",
            Component::Parachute(_) => "Parachute",
            Component::ShockCord(_) => "ShockCord",
            Component::LaunchLug(_) => "LaunchLug",
            Component::CenteringRing(_) => "CenteringRing",
        }
        .to_string();
        components.push(CompView {
            kind: kind.clone(),
            name: common.name.clone(),
            axial_start: *axial_start,
            length,
        });

        match comp {
            Component::NoseCone(_) | Component::Transition(_) => {
                let mut pts = Vec::with_capacity(PROFILE_SAMPLES + 1);
                let mut lpts = Vec::with_capacity(PROFILE_SAMPLES + 1);
                for i in 0..=PROFILE_SAMPLES {
                    let xl = length * i as f64 / PROFILE_SAMPLES as f64;
                    let r = body_local_radius(comp, xl);
                    max_radius = max_radius.max(r);
                    pts.push([axial_start + xl, r]);
                    lpts.push([axial_start + xl, r]);
                }
                outline.push(Shape2D { kind: kind.clone(), points: pts });
                lathe.push(LatheProfile { points: lpts });
            }
            Component::BodyTube(b) => {
                let r = b.radius.unwrap_or(0.0);
                max_radius = max_radius.max(r);
                let pts = vec![
                    [*axial_start, r],
                    [axial_start + length, r],
                ];
                outline.push(Shape2D { kind: kind.clone(), points: pts.clone() });
                lathe.push(LatheProfile { points: pts });
            }
            Component::FinSet(f) => {
                // Body radius at the fin's leading edge.
                let br = body_radius_at(&layout, *axial_start);
                max_radius = max_radius.max(br + f.height);
                fins.push(FinView {
                    axial_start: *axial_start,
                    root_chord: f.root_chord,
                    tip_chord: f.tip_chord,
                    sweep: f.sweep_length,
                    height: f.height,
                    count: f.fin_count,
                    body_radius: br,
                });
            }
            _ => {}
        }
    }

    Ok(RocketView {
        name: doc.rocket.name.clone(),
        designer: doc.rocket.designer.clone(),
        total_length: doc.rocket.total_length(),
        max_radius,
        components,
        outline,
        lathe,
        fins,
        simulations: doc.simulations.iter().map(|s| s.name.clone()).collect(),
    })
}

fn body_radius_at(layout: &[(&Component, f64)], axial: f64) -> f64 {
    for (c, start) in layout {
        match c {
            Component::BodyTube(t) => {
                if axial >= *start && axial <= start + t.length {
                    return t.radius.unwrap_or(0.0);
                }
            }
            Component::Transition(t) => {
                if axial >= *start && axial <= start + t.length {
                    let f = ((axial - start) / t.length).clamp(0.0, 1.0);
                    return t.fore_radius + f * (t.aft_radius - t.fore_radius);
                }
            }
            _ => {}
        }
    }
    0.0
}

#[tauri::command]
fn simulate(
    path: String,
    sim_name: Option<String>,
    motors_dir: Option<String>,
) -> Result<FlightData, String> {
    let doc = opsrocket_io::read_ork(&path).map_err(|e| e.to_string())?;
    let name = sim_name
        .or_else(|| doc.simulations.first().map(|s| s.name.clone()))
        .ok_or_else(|| "no simulations in this .ork".to_string())?;
    let md = motors_dir.map(std::path::PathBuf::from);
    let r = opsrocket_sim::engine::simulate_with(&doc, &name, md.as_deref())
        .map_err(|e| e.to_string())?;

    let mut time = Vec::with_capacity(r.rows.len());
    let mut altitude = Vec::with_capacity(r.rows.len());
    let mut velocity = Vec::with_capacity(r.rows.len());
    let mut thrust = Vec::with_capacity(r.rows.len());
    for row in &r.rows {
        time.push(row[0]);
        altitude.push(row[1]);
        velocity.push(row[4]); // total velocity
        thrust.push(row[29]); // thrust
    }
    Ok(FlightData {
        time,
        altitude,
        velocity,
        thrust,
        apogee: r.max_altitude,
        time_to_apogee: r.time_to_apogee,
        flight_time: r.flight_time,
        ground_hit_velocity: r.ground_hit_velocity,
        events: r.events.clone(),
    })
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![load_ork, simulate])
        .run(tauri::generate_context!())
        .expect("error while running OpsRocket GUI");
}
