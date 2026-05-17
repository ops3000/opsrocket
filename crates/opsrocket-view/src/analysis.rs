//! Component analysis + a bounded 1-D design optimizer.
//!
//! Analysis = OpenRocket's "Component Analysis" tab: per-component CN_α,
//! CP and drag share. Optimizer = a focused subset of OpenRocket's rocket
//! optimization: sweep one numeric field of one component and report the
//! value that best meets a goal (max apogee, or hit a target apogee),
//! subject to a minimum stability margin.

use opsrocket_io::OrkDocument;
use serde::Serialize;
use serde_json::Value;

#[derive(Serialize, Clone)]
pub struct CompAeroRow {
    pub id: String,
    pub name: String,
    pub kind: String,
    pub cn_alpha: f64,
    pub cp_cm: f64,
    pub cd_friction: f64,
    pub cd_pressure: f64,
    pub cd_share: f64,
}

#[derive(Serialize, Clone)]
pub struct Analysis {
    pub mach: f64,
    pub rows: Vec<CompAeroRow>,
    pub cd_base: f64,
    pub cn_alpha_total: f64,
    pub cp_cm: f64,
    pub cd_total: f64,
}

pub fn analysis(doc: &OrkDocument, mach: f64) -> Analysis {
    use opsrocket_sim::aero::{component_analysis, FlightConditions};
    let r = component_analysis(
        &doc.rocket,
        FlightConditions { mach, angle_of_attack: 0.0, reynolds: 1.0e6 },
    );
    let rows = r
        .components
        .iter()
        .map(|c| {
            let cd = c.cd_friction + c.cd_pressure;
            CompAeroRow {
                id: c.id.clone(),
                name: c.name.clone(),
                kind: c.kind.clone(),
                cn_alpha: c.cn_alpha,
                cp_cm: c.cp_axial * 100.0,
                cd_friction: c.cd_friction,
                cd_pressure: c.cd_pressure,
                cd_share: if r.cd_total > 0.0 { cd / r.cd_total } else { 0.0 },
            }
        })
        .collect();
    Analysis {
        mach,
        rows,
        cd_base: r.cd_base,
        cn_alpha_total: r.cn_alpha_total,
        cp_cm: r.cp_axial * 100.0,
        cd_total: r.cd_total,
    }
}

#[derive(Serialize, Clone)]
pub struct OptPoint {
    pub value: f64,
    pub apogee: f64,
    pub margin_cal: f64,
    pub feasible: bool,
}

#[derive(Serialize, Clone)]
pub struct OptResult {
    pub points: Vec<OptPoint>,
    pub best_value: Option<f64>,
    pub best_apogee: Option<f64>,
    pub baseline_value: f64,
}

/// Sweep `key` of component `comp_id` from `min`..=`max` over `steps`
/// samples. `goal` is "max_apogee" or "target_apogee" (with `target`).
/// A sample is feasible only if its stability margin ≥ `min_margin`.
#[allow(clippy::too_many_arguments)]
pub fn optimize(
    doc: &OrkDocument,
    sim_name: Option<&str>,
    motors_dir: Option<&std::path::Path>,
    comp_id: &str,
    key: &str,
    min: f64,
    max: f64,
    steps: usize,
    goal: &str,
    target: f64,
    min_margin: f64,
) -> Result<OptResult, String> {
    let steps = steps.clamp(2, 60);
    let baseline = current_value(doc, comp_id, key)?;
    let mut points = Vec::with_capacity(steps);
    let mut best: Option<(f64, f64)> = None;

    for i in 0..steps {
        let v = min + (max - min) * i as f64 / (steps - 1) as f64;
        let mut trial = doc.clone();
        crate::schema::apply_edit(&mut trial.rocket, comp_id, key, &Value::from(v))?;
        let stab = crate::stability(&trial);
        let feasible = stab.margin_cal >= min_margin;
        let apogee = match opsrocket_sim::engine::simulate_with(
            &trial,
            sim_name.or_else(|| doc.simulations.first().map(|s| s.name.as_str()))
                .ok_or("no simulation")?,
            motors_dir,
        ) {
            Ok(r) => r.max_altitude,
            Err(_) => 0.0,
        };
        points.push(OptPoint { value: v, apogee, margin_cal: stab.margin_cal, feasible });
        if feasible {
            let score = match goal {
                "target_apogee" => -(apogee - target).abs(),
                _ => apogee,
            };
            if best.map(|(_, s)| score > s).unwrap_or(true) {
                best = Some((v, score));
            }
        }
    }

    let best_value = best.map(|(v, _)| v);
    let best_apogee = best_value
        .and_then(|bv| points.iter().find(|p| p.value == bv).map(|p| p.apogee));
    Ok(OptResult { points, best_value, best_apogee, baseline_value: baseline })
}

/// Read the editor-facing (mm/deg/g) value of a field, so the optimizer's
/// sweep range is in the same units the UI shows.
fn current_value(doc: &OrkDocument, comp_id: &str, key: &str) -> Result<f64, String> {
    for n in crate::schema::build_tree(&doc.rocket) {
        if n.id == comp_id {
            for f in n.fields {
                if f.key == key {
                    return f
                        .value
                        .as_f64()
                        .ok_or_else(|| format!("field {key} is not numeric"));
                }
            }
            return Err(format!("component has no field {key}"));
        }
    }
    Err(format!("component {comp_id} not found"))
}
