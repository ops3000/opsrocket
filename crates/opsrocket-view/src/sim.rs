//! Simulation-conditions editor (OpenRocket's "Edit simulation" dialog).
//!
//! Each `<simulation>` carries launch conditions the 6-DOF engine reads.
//! Exposed as the same typed [`Field`] list the component editor uses, so
//! the frontend renders one mechanism everywhere. Stored units are SI
//! (angle = rad, temperature = K, pressure = Pa); the editor shows the
//! conventional ones (deg, °C, hPa) and converts on the way in/out.

use opsrocket_io::OrkDocument;
use serde::Serialize;
use serde_json::{json, Value};

use crate::schema::{Field, FieldKind};

fn f(key: &str, label: &str, kind: FieldKind, v: f64, unit: &str) -> Field {
    Field {
        key: key.into(),
        label: label.into(),
        kind,
        value: json!(v),
        options: None,
        unit: if unit.is_empty() { None } else { Some(unit.into()) },
    }
}

#[derive(Serialize, Clone)]
pub struct SimNode {
    pub name: String,
    pub config_id: Option<String>,
    pub fields: Vec<Field>,
}

pub fn sim_list(doc: &OrkDocument) -> Vec<SimNode> {
    doc.simulations
        .iter()
        .map(|s| SimNode {
            name: s.name.clone(),
            config_id: s.config_id.clone(),
            fields: vec![
                f("launch_rod_length", "Launch rod length", FieldKind::Number, s.launch_rod_length, "m"),
                f("launch_rod_angle", "Launch rod angle", FieldKind::Angle, s.launch_rod_angle.to_degrees(), "°"),
                f("launch_altitude", "Launch altitude", FieldKind::Number, s.launch_altitude, "m"),
                f("launch_temperature", "Temperature", FieldKind::Number, s.launch_temperature - 273.15, "°C"),
                f("launch_pressure", "Pressure", FieldKind::Number, s.launch_pressure / 100.0, "hPa"),
                f("wind_average", "Avg wind speed", FieldKind::Number, s.wind_average, "m/s"),
                f("time_step", "Time step", FieldKind::Number, s.time_step, "s"),
                f("max_time", "Max sim time", FieldKind::Number, s.max_time, "s"),
            ],
        })
        .collect()
}

fn num(v: &Value) -> Result<f64, String> {
    v.as_f64()
        .or_else(|| v.as_str().and_then(|s| s.parse().ok()))
        .ok_or_else(|| format!("expected number, got {v}"))
}

pub fn apply_sim_edit(
    doc: &mut OrkDocument,
    sim_name: &str,
    key: &str,
    v: &Value,
) -> Result<(), String> {
    let s = doc
        .simulations
        .iter_mut()
        .find(|s| s.name == sim_name)
        .ok_or_else(|| format!("simulation {sim_name} not found"))?;
    let x = num(v)?;
    match key {
        "launch_rod_length" => s.launch_rod_length = x,
        "launch_rod_angle" => s.launch_rod_angle = x.to_radians(),
        "launch_altitude" => s.launch_altitude = x,
        "launch_temperature" => s.launch_temperature = x + 273.15,
        "launch_pressure" => s.launch_pressure = x * 100.0,
        "wind_average" => s.wind_average = x,
        "time_step" => s.time_step = x.max(0.001),
        "max_time" => s.max_time = x.max(1.0),
        _ => return Err(format!("simulation has no field {key}")),
    }
    Ok(())
}
