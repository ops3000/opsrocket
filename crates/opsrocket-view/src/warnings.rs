//! Simulation-time warnings — mirrors OpenRocket's "Warnings" tab in the
//! Edit Simulation dialog. Walks the rocket + the active sim and reports
//! anything that would prevent a clean flight (no motor, instability, no
//! recovery, coarse time step …). Pure observation — does not run the sim.
//!
//! Severity is conveyed by an `kind` field: "info" | "warn" | "error".

use opsrocket_io::OrkDocument;
use opsrocket_core::component::{Component, DeployEvent};
use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct Warning {
    pub kind: &'static str, // "info" | "warn" | "error"
    pub category: &'static str,
    pub message: String,
}

fn err(category: &'static str, msg: impl Into<String>) -> Warning {
    Warning { kind: "error", category, message: msg.into() }
}
fn warn(category: &'static str, msg: impl Into<String>) -> Warning {
    Warning { kind: "warn", category, message: msg.into() }
}
fn info(category: &'static str, msg: impl Into<String>) -> Warning {
    Warning { kind: "info", category, message: msg.into() }
}

/// Walk the rocket + the named (or first) simulation and emit warnings.
pub fn sim_warnings(doc: &OrkDocument, sim_name: Option<&str>) -> Vec<Warning> {
    let mut out: Vec<Warning> = Vec::new();
    let sim = match sim_name {
        Some(n) => doc.simulations.iter().find(|s| s.name == n),
        None => doc.simulations.first(),
    };
    let sim = match sim {
        Some(s) => s,
        None => {
            out.push(err("config", "no simulation defined"));
            return out;
        }
    };

    // ── Motor configuration ─────────────────────────────────────────────
    let config_id = sim.config_id.clone().unwrap_or_default();
    let has_motor = walk(&doc.rocket).iter().any(|c| match c {
        Component::BodyTube(t) => t
            .motor_mount
            .as_ref()
            .map(|mm| {
                mm.motors.iter().any(|a| {
                    a.config_id == config_id
                        && a.designation.as_deref().map_or(false, |d| !d.is_empty())
                })
            })
            .unwrap_or(false),
        Component::InnerTube(it) => it
            .motor_mount
            .as_ref()
            .map(|mm| {
                mm.motors.iter().any(|a| {
                    a.config_id == config_id
                        && a.designation.as_deref().map_or(false, |d| !d.is_empty())
                })
            })
            .unwrap_or(false),
        _ => false,
    });
    if !has_motor {
        out.push(err(
            "motor",
            format!(
                "no motor assigned to flight configuration {}",
                if config_id.is_empty() { "<default>".into() } else { format!("\"{config_id}\"") }
            ),
        ));
    }

    // ── Stability ───────────────────────────────────────────────────────
    let stab = crate::stability(doc);
    if stab.cp_cm > 0.0 && stab.mass_g > 0.0 {
        if stab.margin_cal < 0.0 {
            out.push(err(
                "stability",
                format!(
                    "unstable: stability margin {:+.2} cal — CP is forward of CG",
                    stab.margin_cal
                ),
            ));
        } else if stab.margin_cal < 1.0 {
            out.push(warn(
                "stability",
                format!(
                    "low stability margin {:+.2} cal (target ≥ 1.0)",
                    stab.margin_cal
                ),
            ));
        }
    }

    // ── Recovery ────────────────────────────────────────────────────────
    let mut has_chute = false;
    let mut chute_will_deploy = false;
    for c in walk(&doc.rocket) {
        if let Component::Parachute(p) = c {
            has_chute = true;
            if !matches!(p.deploy_event, DeployEvent::Never) {
                chute_will_deploy = true;
            }
        }
    }
    if !has_chute {
        out.push(warn(
            "recovery",
            "no parachute in the design — descent will be by tumble fallback",
        ));
    } else if !chute_will_deploy {
        out.push(warn(
            "recovery",
            "parachute(s) present but deploy_event is Never — they won't open",
        ));
    }

    // ── Launch rod ──────────────────────────────────────────────────────
    if sim.launch_rod_length < 0.3 {
        out.push(warn(
            "rod",
            format!("launch rod is very short ({:.2} m) — guidance phase ≪ 0.1 s", sim.launch_rod_length),
        ));
    }

    // ── Integration parameters ──────────────────────────────────────────
    if sim.time_step > 0.05 {
        out.push(warn(
            "options",
            format!(
                "time step is coarse ({:.3} s) — apogee accuracy can drift > 1%",
                sim.time_step
            ),
        ));
    }
    if sim.max_time < 30.0 {
        out.push(info(
            "options",
            format!("max sim time is short ({:.0} s) — flight may be cut off", sim.max_time),
        ));
    }

    // ── Multi-stage hint ────────────────────────────────────────────────
    if doc.rocket.stages.len() > 1 {
        out.push(info(
            "staging",
            format!(
                "{} stages — OpsRocket's staging is at lower parity than single-stage (see methodology)",
                doc.rocket.stages.len()
            ),
        ));
    }

    out
}

/// Depth-first walk over every component in every stage.
fn walk(rocket: &opsrocket_core::component::Rocket) -> Vec<&Component> {
    let mut out = Vec::new();
    fn rec<'a>(c: &'a Component, out: &mut Vec<&'a Component>) {
        out.push(c);
        let children: &[Component] = match c {
            Component::NoseCone(n) => &n.children,
            Component::BodyTube(t) => &t.children,
            Component::Transition(t) => &t.children,
            Component::InnerTube(it) => &it.children,
            Component::CenteringRing(cr) => &cr.children,
            Component::PodSet(p) => &p.children,
            _ => &[],
        };
        for sub in children {
            rec(sub, out);
        }
    }
    for stage in &rocket.stages {
        for c in &stage.children {
            rec(c, &mut out);
        }
    }
    out
}
