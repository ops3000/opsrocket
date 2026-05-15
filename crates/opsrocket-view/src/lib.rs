//! Presentation layer shared by the Tauri desktop app and the web server.
//!
//! Both front-ends call [`build_rocket_view`] and [`run_flight`] so the
//! JSON they emit is byte-identical — no drift between desktop and web.

use opsrocket_core::component::Component;
use opsrocket_core::profile::shape_radius;
use opsrocket_io::OrkDocument;
use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct CompView {
    pub kind: String,
    pub name: String,
    pub axial_start: f64,
    pub length: f64,
}

/// Filled silhouette polygon (metres): x along the rocket axis, y the
/// positive radius. The frontend mirrors it about y = 0.
#[derive(Serialize, Clone)]
pub struct Shape2D {
    pub kind: String,
    pub points: Vec<[f64; 2]>,
}

/// Surface-of-revolution profile for the 3D view: (axial_x, radius) pairs.
#[derive(Serialize, Clone)]
pub struct LatheProfile {
    pub points: Vec<[f64; 2]>,
}

#[derive(Serialize, Clone)]
pub struct FinView {
    pub axial_start: f64,
    pub root_chord: f64,
    pub tip_chord: f64,
    pub sweep: f64,
    pub height: f64,
    pub count: u32,
    pub body_radius: f64,
}

#[derive(Serialize, Clone)]
pub struct RocketView {
    pub name: String,
    pub designer: Option<String>,
    pub total_length: f64,
    pub max_radius: f64,
    pub components: Vec<CompView>,
    pub outline: Vec<Shape2D>,
    pub lathe: Vec<LatheProfile>,
    pub fins: Vec<FinView>,
    pub simulations: Vec<String>,
}

#[derive(Serialize, Clone)]
pub struct FlightData {
    pub time: Vec<f64>,
    pub altitude: Vec<f64>,
    pub velocity: Vec<f64>,
    pub thrust: Vec<f64>,
    pub apogee: f64,
    pub time_to_apogee: f64,
    pub flight_time: f64,
    pub ground_hit_velocity: f64,
    pub events: Vec<(f64, String)>,
}

const PROFILE_SAMPLES: usize = 48;

fn body_local_radius(comp: &Component, x: f64) -> f64 {
    match comp {
        Component::NoseCone(n) => {
            shape_radius(n.shape, n.shape_parameter, x, 0.0, n.aft_radius, n.length)
        }
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

/// Build the geometry/component view from a parsed `.ork` document.
pub fn build_rocket_view(doc: &OrkDocument) -> RocketView {
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
                for i in 0..=PROFILE_SAMPLES {
                    let xl = length * i as f64 / PROFILE_SAMPLES as f64;
                    let r = body_local_radius(comp, xl);
                    max_radius = max_radius.max(r);
                    pts.push([axial_start + xl, r]);
                }
                outline.push(Shape2D { kind: kind.clone(), points: pts.clone() });
                lathe.push(LatheProfile { points: pts });
            }
            Component::BodyTube(b) => {
                let r = b.radius.unwrap_or(0.0);
                max_radius = max_radius.max(r);
                let pts = vec![[*axial_start, r], [axial_start + length, r]];
                outline.push(Shape2D { kind: kind.clone(), points: pts.clone() });
                lathe.push(LatheProfile { points: pts });
            }
            Component::FinSet(f) => {
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

    RocketView {
        name: doc.rocket.name.clone(),
        designer: doc.rocket.designer.clone(),
        total_length: doc.rocket.total_length(),
        max_radius,
        components,
        outline,
        lathe,
        fins,
        simulations: doc.simulations.iter().map(|s| s.name.clone()).collect(),
    }
}

/// Run a flight simulation and reduce it to the columns the chart needs.
pub fn run_flight(
    doc: &OrkDocument,
    sim_name: Option<&str>,
    motors_dir: Option<&std::path::Path>,
) -> Result<FlightData, String> {
    let name = sim_name
        .map(|s| s.to_string())
        .or_else(|| doc.simulations.first().map(|s| s.name.clone()))
        .ok_or_else(|| "no simulations in this .ork".to_string())?;
    let r = opsrocket_sim::engine::simulate_with(doc, &name, motors_dir)
        .map_err(|e| e.to_string())?;

    let mut time = Vec::with_capacity(r.rows.len());
    let mut altitude = Vec::with_capacity(r.rows.len());
    let mut velocity = Vec::with_capacity(r.rows.len());
    let mut thrust = Vec::with_capacity(r.rows.len());
    for row in &r.rows {
        time.push(row[0]);
        altitude.push(row[1]);
        velocity.push(row[4]);
        thrust.push(row[29]);
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
