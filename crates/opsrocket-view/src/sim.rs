//! Simulation-conditions editor (OpenRocket's "Edit simulation" dialog).
//!
//! Each `<simulation>` carries launch conditions the 6-DOF engine reads.
//! Exposed as the same typed [`Field`] list the component editor uses, so
//! the frontend renders one mechanism everywhere. Stored units are SI
//! (angle = rad, temperature = K, pressure = Pa); the editor shows the
//! conventional ones (deg, °C, hPa) and converts on the way in/out.
//!
//! Fields carry `section` tags matching OpenRocket's tabs:
//!   wind  · site · rod · atmosphere · options
//! plus the gui can layer a Warnings / Plot / Export tab on top.

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
        section: None,
    }
}

fn f_bool(key: &str, label: &str, v: bool) -> Field {
    Field {
        key: key.into(),
        label: label.into(),
        kind: FieldKind::Bool,
        value: json!(v),
        options: None,
        unit: None,
        section: None,
    }
}

fn f_enum(key: &str, label: &str, v: &str, opts: &[&str]) -> Field {
    Field {
        key: key.into(),
        label: label.into(),
        kind: FieldKind::Enum,
        value: json!(v),
        options: Some(opts.iter().map(|s| s.to_string()).collect()),
        unit: None,
        section: None,
    }
}

fn tag(fields: &mut [Field], from: usize, section: &str) {
    for f in &mut fields[from..] {
        if f.section.is_none() {
            f.section = Some(section.into());
        }
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
        .map(|s| {
            let mut fields: Vec<Field> = Vec::new();
            // ── Wind ────────────────────────────────────────────────────
            let from = fields.len();
            fields.push(f_enum(
                "wind_model",
                "Wind model",
                if s.use_multi_level_wind { "multi_level" } else { "average" },
                &["average", "multi_level"],
            ));
            fields.push(f("wind_average", "Average wind speed", FieldKind::Number, s.wind_average, "m/s"));
            fields.push(f("wind_standard_deviation", "Standard deviation", FieldKind::Number, s.wind_standard_deviation, "m/s"));
            fields.push(f("wind_turbulence", "Turbulence intensity", FieldKind::Number, s.wind_turbulence, ""));
            fields.push(f("wind_direction", "Wind direction", FieldKind::Angle, s.wind_direction.to_degrees(), "°"));
            tag(&mut fields, from, "wind");

            // ── Launch site ─────────────────────────────────────────────
            let from = fields.len();
            fields.push(f("launch_latitude", "Latitude", FieldKind::Number, s.launch_latitude, "°N"));
            fields.push(f("launch_longitude", "Longitude", FieldKind::Number, s.launch_longitude, "°E"));
            fields.push(f("launch_altitude", "Altitude", FieldKind::Number, s.launch_altitude, "m"));
            fields.push(f_enum("geodetic_method", "Geodetic", &s.geodetic_method, &["flat", "spherical", "wgs84"]));
            tag(&mut fields, from, "site");

            // ── Launch rod ──────────────────────────────────────────────
            let from = fields.len();
            fields.push(f("launch_rod_length", "Length", FieldKind::Number, s.launch_rod_length, "m"));
            fields.push(f("launch_rod_angle", "Angle", FieldKind::Angle, s.launch_rod_angle.to_degrees(), "°"));
            fields.push(f("launch_rod_direction", "Direction", FieldKind::Angle, s.launch_rod_direction.to_degrees(), "°"));
            fields.push(f_bool("launch_into_wind", "Always launch into wind", s.launch_into_wind));
            tag(&mut fields, from, "rod");

            // ── Atmosphere ──────────────────────────────────────────────
            let from = fields.len();
            fields.push(f_bool("use_isa", "Use ISA model", s.use_isa));
            fields.push(f("launch_temperature", "Temperature", FieldKind::Number, s.launch_temperature - 273.15, "°C"));
            fields.push(f("launch_pressure", "Pressure", FieldKind::Number, s.launch_pressure / 100.0, "hPa"));
            tag(&mut fields, from, "atmosphere");

            // ── Simulation options ──────────────────────────────────────
            let from = fields.len();
            fields.push(f("time_step", "Time step", FieldKind::Number, s.time_step, "s"));
            fields.push(f("max_time", "Max sim time", FieldKind::Number, s.max_time, "s"));
            tag(&mut fields, from, "options");

            SimNode {
                name: s.name.clone(),
                config_id: s.config_id.clone(),
                fields,
            }
        })
        .collect()
}

fn num(v: &Value) -> Result<f64, String> {
    v.as_f64()
        .or_else(|| v.as_str().and_then(|s| s.parse().ok()))
        .ok_or_else(|| format!("expected number, got {v}"))
}

fn as_bool(v: &Value) -> Result<bool, String> {
    v.as_bool()
        .or_else(|| v.as_str().map(|s| matches!(s, "true" | "1" | "yes")))
        .ok_or_else(|| format!("expected bool, got {v}"))
}

fn as_str(v: &Value) -> Result<String, String> {
    v.as_str()
        .map(String::from)
        .ok_or_else(|| format!("expected string, got {v}"))
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
    match key {
        // Wind
        "wind_model" => {
            s.use_multi_level_wind = matches!(as_str(v)?.as_str(), "multi_level");
        }
        "wind_average" => s.wind_average = num(v)?,
        "wind_standard_deviation" => s.wind_standard_deviation = num(v)?.max(0.0),
        "wind_turbulence" => s.wind_turbulence = num(v)?.clamp(0.0, 1.0),
        "wind_direction" => s.wind_direction = num(v)?.to_radians(),
        // Site
        "launch_latitude" => s.launch_latitude = num(v)?,
        "launch_longitude" => s.launch_longitude = num(v)?,
        "launch_altitude" => s.launch_altitude = num(v)?,
        "geodetic_method" => {
            let m = as_str(v)?.to_lowercase();
            s.geodetic_method = match m.as_str() {
                "flat" | "spherical" | "wgs84" => m,
                _ => return Err(format!("unknown geodetic_method {m}")),
            };
        }
        // Rod
        "launch_rod_length" => s.launch_rod_length = num(v)?.max(0.0),
        "launch_rod_angle" => s.launch_rod_angle = num(v)?.to_radians(),
        "launch_rod_direction" => s.launch_rod_direction = num(v)?.to_radians(),
        "launch_into_wind" => {
            s.launch_into_wind = as_bool(v)?;
            if s.launch_into_wind {
                // Mirror the OR dialog's "lock to wind" behaviour.
                s.launch_rod_direction = s.wind_direction;
            }
        }
        // Atmosphere
        "use_isa" => s.use_isa = as_bool(v)?,
        "launch_temperature" => s.launch_temperature = num(v)? + 273.15,
        "launch_pressure" => s.launch_pressure = num(v)? * 100.0,
        // Options
        "time_step" => s.time_step = num(v)?.max(0.001),
        "max_time" => s.max_time = num(v)?.max(1.0),
        _ => return Err(format!("simulation has no field {key}")),
    }
    Ok(())
}
