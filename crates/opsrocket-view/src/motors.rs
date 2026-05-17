//! Motor browser + flight-configuration editing.
//!
//! OpenRocket's "Motors & Configurations" tab as data: scan a directory of
//! `.eng` files into a searchable catalog, expose every motor mount and the
//! per-flight-configuration motor assignment, and edit those assignments.

use std::path::Path;

use opsrocket_core::component::*;
use opsrocket_io::OrkDocument;
use serde::Serialize;

#[derive(Serialize, Clone)]
pub struct MotorInfo {
    pub file: String,
    pub designation: String,
    pub manufacturer: String,
    pub diameter_mm: f64,
    pub length_mm: f64,
    pub total_impulse: f64,
    pub avg_thrust: f64,
    pub burn_time: f64,
    pub total_mass_g: f64,
    pub prop_mass_g: f64,
    pub delays: Vec<f64>,
    pub class: String,
    pub digest: String,
}

/// NAR/Tripoli impulse class from total impulse (N·s): A=1.25–2.5, then ×2.
fn impulse_class(total: f64) -> String {
    if total <= 0.0 {
        return "?".into();
    }
    if total <= 1.25 {
        // 1/8A .. 1/2A region
        if total <= 0.3125 {
            return "1/4A".into();
        }
        if total <= 0.625 {
            return "1/2A".into();
        }
        return "A".into();
    }
    // A: (1.25, 2.5], B: (2.5, 5], ...
    let mut hi = 2.5_f64;
    for c in b'A'..=b'O' {
        if total <= hi {
            return (c as char).to_string();
        }
        hi *= 2.0;
    }
    "O+".into()
}

/// Parse every `.eng` file in `dir` into a catalog, sorted by impulse.
pub fn scan_motors(dir: &Path) -> Vec<MotorInfo> {
    let mut out = Vec::new();
    let Ok(rd) = std::fs::read_dir(dir) else {
        return out;
    };
    for e in rd.flatten() {
        let p = e.path();
        if p.extension().and_then(|s| s.to_str()) != Some("eng") {
            continue;
        }
        let Ok(text) = std::fs::read_to_string(&p) else { continue };
        let fname = p.file_name().unwrap().to_string_lossy().into_owned();
        if let Some(mi) = motor_info(&fname, &text) {
            out.push(mi);
        }
    }
    sort_catalog(&mut out);
    out
}

fn motor_info(file: &str, text: &str) -> Option<MotorInfo> {
    let tc = opsrocket_io::parse_rasp(text).ok()?;
    let burn = tc.burn_time();
    let imp = tc.total_impulse();
    Some(MotorInfo {
        file: file.to_string(),
        designation: tc.designation.clone(),
        manufacturer: tc.manufacturer.clone(),
        diameter_mm: tc.diameter_m * 1000.0,
        length_mm: tc.length_m * 1000.0,
        total_impulse: imp,
        avg_thrust: if burn > 0.0 { imp / burn } else { 0.0 },
        burn_time: burn,
        total_mass_g: tc.total_mass * 1000.0,
        prop_mass_g: tc.propellant_mass * 1000.0,
        delays: tc.delays.clone(),
        class: impulse_class(imp),
        digest: tc.digest(),
    })
}

fn sort_catalog(out: &mut [MotorInfo]) {
    out.sort_by(|a, b| {
        a.total_impulse
            .partial_cmp(&b.total_impulse)
            .unwrap_or(std::cmp::Ordering::Equal)
            .then(a.designation.cmp(&b.designation))
    });
}

/// Catalog from the embedded bundled motor set — filesystem-free, the
/// motor list used under WASM (and a stable default everywhere).
pub fn motor_catalog() -> Vec<MotorInfo> {
    let mut out: Vec<MotorInfo> = opsrocket_io::motor::embedded_motors()
        .iter()
        .filter_map(|(f, t)| motor_info(f, t))
        .collect();
    sort_catalog(&mut out);
    out
}

#[derive(Serialize, Clone)]
pub struct AssignmentView {
    pub config_id: String,
    pub designation: Option<String>,
    pub digest: Option<String>,
    pub ejection_delay: f64,
}

#[derive(Serialize, Clone)]
pub struct MountView {
    pub id: String,
    pub name: String,
    pub kind: String,
    pub overhang_mm: f64,
    pub ignition_event: String,
    pub ignition_delay: f64,
    pub assignments: Vec<AssignmentView>,
}

#[derive(Serialize, Clone)]
pub struct ConfigView {
    pub config_id: String,
    pub name: Option<String>,
}

#[derive(Serialize, Clone)]
pub struct SimView {
    pub name: String,
    pub config_id: Option<String>,
}

#[derive(Serialize, Clone)]
pub struct ConfigPanel {
    pub configs: Vec<ConfigView>,
    pub default_config: Option<String>,
    pub simulations: Vec<SimView>,
    pub mounts: Vec<MountView>,
}

fn ign_str(e: IgnitionEvent) -> &'static str {
    match e {
        IgnitionEvent::Automatic => "automatic",
        IgnitionEvent::Launch => "launch",
        IgnitionEvent::Burnout => "burnout",
        IgnitionEvent::Ejection => "ejection",
        IgnitionEvent::LowerStageSeparation => "lower_stage_separation",
    }
}
fn parse_ign(s: &str) -> IgnitionEvent {
    match s {
        "launch" => IgnitionEvent::Launch,
        "burnout" => IgnitionEvent::Burnout,
        "ejection" => IgnitionEvent::Ejection,
        "lower_stage_separation" => IgnitionEvent::LowerStageSeparation,
        _ => IgnitionEvent::Automatic,
    }
}

fn mount_of(c: &Component) -> Option<(&str, &MotorMount)> {
    match c {
        Component::BodyTube(b) => b.motor_mount.as_ref().map(|m| ("BodyTube", m)),
        Component::InnerTube(t) => t.motor_mount.as_ref().map(|m| ("InnerTube", m)),
        _ => None,
    }
}

fn walk_mounts(c: &Component, out: &mut Vec<MountView>) {
    if let Some((kind, mm)) = mount_of(c) {
        out.push(MountView {
            id: c.common().id.0.clone(),
            name: c.common().name.clone(),
            kind: kind.into(),
            overhang_mm: mm.overhang * 1000.0,
            ignition_event: ign_str(mm.ignition_event).into(),
            ignition_delay: mm.ignition_delay,
            assignments: mm
                .motors
                .iter()
                .map(|a| AssignmentView {
                    config_id: a.config_id.clone(),
                    designation: a.designation.clone(),
                    digest: a.digest.clone(),
                    ejection_delay: a.ejection_delay,
                })
                .collect(),
        });
    }
    if let Component::BodyTube(t) = c {
        for s in &t.children {
            walk_mounts(s, out);
        }
    }
}

pub fn config_panel(doc: &OrkDocument) -> ConfigPanel {
    let mut mounts = Vec::new();
    for st in &doc.rocket.stages {
        for ch in &st.children {
            walk_mounts(ch, &mut mounts);
        }
    }
    ConfigPanel {
        configs: doc
            .rocket
            .configurations
            .iter()
            .map(|c| ConfigView { config_id: c.config_id.clone(), name: c.name.clone() })
            .collect(),
        default_config: doc.rocket.default_config.clone(),
        simulations: doc
            .simulations
            .iter()
            .map(|s| SimView { name: s.name.clone(), config_id: s.config_id.clone() })
            .collect(),
        mounts,
    }
}

fn find_mount_mut<'a>(rocket: &'a mut Rocket, id: &str) -> Option<&'a mut MotorMount> {
    fn walk<'b>(c: &'b mut Component, id: &str) -> Option<&'b mut MotorMount> {
        let hit = c.common().id.0 == id;
        match c {
            Component::BodyTube(b) => {
                if hit {
                    return b.motor_mount.get_or_insert_with(MotorMount::default).into();
                }
                for s in &mut b.children {
                    if let Some(m) = walk(s, id) {
                        return Some(m);
                    }
                }
            }
            Component::InnerTube(t) if hit => {
                return t.motor_mount.get_or_insert_with(MotorMount::default).into();
            }
            _ => {}
        }
        None
    }
    for st in &mut rocket.stages {
        for ch in &mut st.children {
            if let Some(m) = walk(ch, id) {
                return Some(m);
            }
        }
    }
    None
}

/// Assign (or replace) the motor for `config_id` on the given mount.
pub fn assign_motor(
    rocket: &mut Rocket,
    mount_id: &str,
    config_id: &str,
    designation: &str,
    digest: Option<String>,
    ejection_delay: f64,
) -> Result<(), String> {
    let mm = find_mount_mut(rocket, mount_id)
        .ok_or_else(|| format!("motor mount {mount_id} not found"))?;
    if let Some(a) = mm.motors.iter_mut().find(|a| a.config_id == config_id) {
        a.designation = Some(designation.to_string());
        a.digest = digest;
        a.ejection_delay = ejection_delay;
    } else {
        mm.motors.push(MotorAssignment {
            config_id: config_id.to_string(),
            designation: Some(designation.to_string()),
            digest,
            ejection_delay,
        });
    }
    Ok(())
}

pub fn clear_motor(rocket: &mut Rocket, mount_id: &str, config_id: &str) -> Result<(), String> {
    let mm = find_mount_mut(rocket, mount_id)
        .ok_or_else(|| format!("motor mount {mount_id} not found"))?;
    mm.motors.retain(|a| a.config_id != config_id);
    Ok(())
}

/// Edit a mount's ignition behaviour.
pub fn set_ignition(
    rocket: &mut Rocket,
    mount_id: &str,
    event: &str,
    delay: f64,
) -> Result<(), String> {
    let mm = find_mount_mut(rocket, mount_id)
        .ok_or_else(|| format!("motor mount {mount_id} not found"))?;
    mm.ignition_event = parse_ign(event);
    mm.ignition_delay = delay;
    Ok(())
}
