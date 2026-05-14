//! Top-level simulation driver.
//!
//! Port of (a vertical-flight subset of)
//! `info.openrocket.core.simulation.BasicEventSimulationEngine`.
//!
//! For the headless MVP we model:
//! - Launch from rod, gravity, drag, thrust.
//! - One motor in the default flight configuration; thrust curve interpolated
//!   in time, propellant mass decremented continuously.
//! - Apogee detection (vertical velocity crosses zero from positive).
//! - Recovery: once apogee fires we switch to a high-drag parachute Cd*A and
//!   keep stepping until altitude returns to launch altitude (ground hit).
//!
//! Out of scope today (`TODO`):
//! - True 6-DOF rotational dynamics, roll, fin damping coefficients.
//! - Multi-stage separation / clustering / airstart.
//! - Coriolis, wind shear, custom atmosphere overrides.

use std::path::Path;

use opsrocket_core::atmosphere::{AtmosphereModel, ExtendedIsa};
use opsrocket_core::component::{Component, IgnitionEvent, MotorAssignment, Rocket, SeparationEvent};
use opsrocket_core::geom::Vec3;
use opsrocket_core::units::{G0, PI};
use opsrocket_io::motor::{ThrustCurve, parse_rasp};
use opsrocket_io::OrkDocument;

use crate::aero::{compute as compute_aero, FlightConditions};
use crate::flight::{rk4_step, ForceSampler, State};
use crate::mass::{empty_mass_properties, MassProperties};

#[derive(Debug, Clone)]
pub struct SimulationOptions {
    pub time_step: f64,
    pub max_time: f64,
    pub launch_altitude: f64,
    pub launch_pitch_deg: f64,
    pub wind_average: f64,
    pub motor: Option<MotorChoice>,
}

#[derive(Debug, Clone)]
pub enum MotorChoice {
    /// Use a thrust curve already loaded by the caller.
    Curve(ThrustCurve),
    /// Look up the named designation in a motor database directory.
    Designation { designation: String, search_dir: Option<std::path::PathBuf> },
}

impl Default for SimulationOptions {
    fn default() -> Self {
        Self {
            time_step: 0.05,
            max_time: 1200.0,
            launch_altitude: 0.0,
            launch_pitch_deg: 0.0,
            wind_average: 0.0,
            motor: None,
        }
    }
}

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("simulation `{0}` not found")]
    NoSuchSimulation(String),
    #[error("rocket has no body components")]
    EmptyRocket,
    #[error("no motor assigned for configuration `{0}`")]
    NoMotor(String),
    #[error("motor `{0}` could not be located")]
    UnknownMotor(String),
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
    #[error("motor parse error: {0}")]
    MotorParse(#[from] opsrocket_io::motor::Error),
}

pub type Result<T> = std::result::Result<T, Error>;

/// Result of a simulation run: one row per recorded time-step.
///
/// Each row has 58 columns matching `FLIGHT_DATA_COLUMNS`.
#[derive(Debug, Default)]
pub struct SimulationResult {
    pub rows: Vec<[f64; 58]>,
    pub events: Vec<(f64, String)>,
    /// Diagnostic summary values.
    pub max_altitude: f64,
    pub max_velocity: f64,
    pub max_acceleration: f64,
    pub flight_time: f64,
    pub time_to_apogee: f64,
    pub ground_hit_velocity: f64,
}

/// Locate the motor for the active configuration of the rocket. Returns the
/// assignment + motor mount reference radius (for plume base-drag credit, not
/// yet used) plus the absolute axial position of the mount (used to compute
/// the motor's CG contribution).
#[allow(dead_code)]
fn find_motor_assignment(doc: &OrkDocument, config_id: &str) -> Option<MotorAssignment> {
    for stage in &doc.rocket.stages {
        for child in &stage.children {
            if let Some(a) = motor_assignment_in_component(child, config_id) {
                return Some(a);
            }
        }
    }
    None
}

/// Find the per-stage motor assignment + ignition event for the given config.
/// Returns one entry per stage, with `None` for stages that have no motor in
/// this configuration.
fn find_motor_assignments_per_stage(
    rocket: &Rocket,
    config_id: &str,
) -> Vec<Option<(MotorAssignment, IgnitionEvent)>> {
    rocket
        .stages
        .iter()
        .map(|stage| {
            for child in &stage.children {
                if let Some(found) = motor_assignment_in_component_with_event(child, config_id) {
                    return Some(found);
                }
            }
            None
        })
        .collect()
}

/// Return the axial position (m from rocket origin) of a motor mount with
/// the given config id, if found. Used to compute motor CG contribution.
pub(crate) fn motor_mount_axial_position(rocket: &Rocket, config_id: &str) -> Option<f64> {
    let layout = crate::mass::iter_layout(rocket);
    for (c, axial_start) in &layout {
        match c {
            Component::InnerTube(it) => {
                if let Some(m) = it.motor_mount.as_ref() {
                    for a in &m.motors {
                        if a.config_id == config_id {
                            // Approximate motor CG as the centre of the inner tube.
                            return Some(axial_start + 0.5 * it.length);
                        }
                    }
                }
            }
            Component::BodyTube(t) => {
                if let Some(m) = t.motor_mount.as_ref() {
                    for a in &m.motors {
                        if a.config_id == config_id {
                            return Some(axial_start + 0.5 * t.length);
                        }
                    }
                }
            }
            _ => {}
        }
    }
    None
}

fn motor_assignment_in_component_with_event(
    c: &Component,
    config_id: &str,
) -> Option<(MotorAssignment, IgnitionEvent)> {
    match c {
        Component::BodyTube(tube) => {
            if let Some(mount) = tube.motor_mount.as_ref() {
                for a in &mount.motors {
                    if a.config_id == config_id {
                        return Some((a.clone(), mount.ignition_event));
                    }
                }
            }
            for sub in &tube.children {
                if let Some(found) = motor_assignment_in_component_with_event(sub, config_id) {
                    return Some(found);
                }
            }
            None
        }
        Component::InnerTube(it) => {
            if let Some(mount) = it.motor_mount.as_ref() {
                for a in &mount.motors {
                    if a.config_id == config_id {
                        return Some((a.clone(), mount.ignition_event));
                    }
                }
            }
            None
        }
        _ => None,
    }
}

#[allow(dead_code)]
fn motor_assignment_in_component(c: &Component, config_id: &str) -> Option<MotorAssignment> {
    match c {
        Component::BodyTube(tube) => {
            if let Some(mount) = tube.motor_mount.as_ref() {
                for a in &mount.motors {
                    if a.config_id == config_id {
                        return Some(a.clone());
                    }
                }
            }
            for sub in &tube.children {
                if let Some(a) = motor_assignment_in_component(sub, config_id) {
                    return Some(a);
                }
            }
            None
        }
        Component::InnerTube(it) => {
            if let Some(mount) = it.motor_mount.as_ref() {
                for a in &mount.motors {
                    if a.config_id == config_id {
                        return Some(a.clone());
                    }
                }
            }
            None
        }
        _ => None,
    }
}

#[allow(dead_code)]
fn load_thrust_curve(opts: &SimulationOptions, designation_hint: Option<&str>) -> Result<ThrustCurve> {
    if let Some(MotorChoice::Curve(c)) = &opts.motor {
        return Ok(c.clone());
    }
    let want = match &opts.motor {
        Some(MotorChoice::Designation { designation, search_dir }) => Some((designation.clone(), search_dir.clone())),
        _ => designation_hint.map(|d| (d.to_string(), None)),
    };
    let (designation, search) = want.ok_or_else(|| Error::NoMotor("(unknown)".into()))?;
    let dirs = if let Some(d) = search { vec![d] } else { default_motor_dirs() };
    for dir in &dirs {
        if let Some(path) = find_motor_file(dir, &designation) {
            let txt = std::fs::read_to_string(&path)?;
            return Ok(parse_rasp(&txt)?);
        }
    }
    Err(Error::UnknownMotor(designation))
}

fn default_motor_dirs() -> Vec<std::path::PathBuf> {
    let mut out = Vec::new();
    // Bundled fixtures path discovered relative to the binary location, so
    // `cargo run` works from any directory.
    if let Ok(exe) = std::env::current_exe() {
        // target/<profile>/opsrocket → walk up to find tests/fixtures/motors
        for ancestor in exe.ancestors().skip(1) {
            let candidate = ancestor.join("tests/fixtures/motors");
            if candidate.is_dir() {
                out.push(candidate);
                break;
            }
        }
    }
    if let Ok(cwd) = std::env::current_dir() {
        out.push(cwd.join("tests/fixtures/motors"));
    }
    if let Some(home) = std::env::var_os("HOME") {
        out.push(std::path::PathBuf::from(home).join(".opsrocket/motors"));
    }
    out
}

fn find_motor_file(dir: &Path, designation: &str) -> Option<std::path::PathBuf> {
    let entries = std::fs::read_dir(dir).ok()?;
    for entry in entries.flatten() {
        let path = entry.path();
        if path.extension().and_then(|s| s.to_str()) != Some("eng") {
            continue;
        }
        if let Ok(txt) = std::fs::read_to_string(&path) {
            for line in txt.lines() {
                let l = line.trim();
                if l.is_empty() || l.starts_with(';') {
                    continue;
                }
                if let Some(name) = l.split_whitespace().next() {
                    if name.eq_ignore_ascii_case(designation) {
                        return Some(path);
                    }
                }
                break;
            }
        }
    }
    None
}

/// Run a simulation by name from the parsed .ork document.
pub fn simulate(doc: &OrkDocument, sim_name: &str) -> Result<SimulationResult> {
    simulate_with(doc, sim_name, None)
}

/// Run a simulation by name, with an optional explicit motor-search directory.
pub fn simulate_with(
    doc: &OrkDocument,
    sim_name: &str,
    motors_dir: Option<&Path>,
) -> Result<SimulationResult> {
    let sim = doc
        .simulations
        .iter()
        .find(|s| s.name == sim_name)
        .ok_or_else(|| Error::NoSuchSimulation(sim_name.to_string()))?;

    if doc.rocket.stages.is_empty() {
        return Err(Error::EmptyRocket);
    }

    let opts = SimulationOptions {
        time_step: sim.time_step.max(0.001),
        max_time: sim.max_time.max(1.0),
        launch_altitude: sim.launch_altitude,
        launch_pitch_deg: sim.launch_rod_angle.to_degrees(),
        wind_average: sim.wind_average,
        motor: motors_dir.map(|d| MotorChoice::Designation {
            designation: String::new(),
            search_dir: Some(d.to_path_buf()),
        }),
    };

    let config_id = sim.config_id.as_deref().unwrap_or("");
    let per_stage = find_motor_assignments_per_stage(&doc.rocket, config_id);

    // Load all per-stage thrust curves up front.
    let search_dir = motors_dir.map(|p| p.to_path_buf()).or_else(|| match &opts.motor {
        Some(MotorChoice::Designation { search_dir, .. }) => search_dir.clone(),
        _ => None,
    });
    let mut stage_curves: Vec<Option<(ThrustCurve, IgnitionEvent)>> = Vec::with_capacity(per_stage.len());
    for entry in &per_stage {
        match entry {
            Some((assignment, ignition)) => {
                let designation = match assignment.designation.as_deref() {
                    Some(d) => d,
                    None => {
                        stage_curves.push(None);
                        continue;
                    }
                };
                let dirs = if let Some(d) = &search_dir {
                    vec![d.clone()]
                } else {
                    default_motor_dirs()
                };
                let mut found = None;
                for dir in &dirs {
                    if let Some(path) = find_motor_file(dir, designation) {
                        let txt = std::fs::read_to_string(&path)?;
                        let curve = parse_rasp(&txt)?;
                        found = Some((curve, *ignition));
                        break;
                    }
                }
                stage_curves.push(found);
            }
            None => stage_curves.push(None),
        }
    }

    let mass_props = empty_mass_properties(&doc.rocket);
    let total_motor_mass: f64 = stage_curves
        .iter()
        .filter_map(|c| c.as_ref().map(|(curve, _)| curve.total_mass))
        .sum();
    let total_mass_initial = mass_props.mass + total_motor_mass;
    // Per-stage motor axial position (for CG contribution).
    let motor_positions: Vec<Option<f64>> = per_stage
        .iter()
        .map(|entry| entry.as_ref().and_then(|(a, _)| motor_mount_axial_position(&doc.rocket, &a.config_id)))
        .collect();
    run_multistage(&doc.rocket, &opts, &mass_props, total_mass_initial, stage_curves, motor_positions)
}

/// Multi-stage simulation driver.  Treats `stage_curves` as the per-stage
/// motor + ignition event.  Stages count from 0 (top / sustainer) to N-1
/// (bottom / booster).  The bottom stage's motor fires first (or whichever
/// ignition event matches), and stages separate in bottom-to-top order
/// when their separation event fires.
fn run_multistage(
    rocket: &Rocket,
    opts: &SimulationOptions,
    mass_props: &MassProperties,
    initial_mass: f64,
    stage_curves: Vec<Option<(ThrustCurve, IgnitionEvent)>>,
    motor_positions: Vec<Option<f64>>,
) -> Result<SimulationResult> {
    let n = rocket.stages.len();
    // Whether each stage is currently attached.
    let mut attached: Vec<bool> = vec![true; n];
    // Per-stage motor ignition time (None = not yet lit).
    let mut ignition_time: Vec<Option<f64>> = vec![None; n];
    // Per-stage burnout time (None = still burning, or never ignited).
    let mut burnout_time: Vec<Option<f64>> = vec![None; n];

    // Ignite the bottom-most stage that has a motor right away (or at the
    // first ignition event "automatic" or "launch").
    if let Some(idx) = (0..n).rev().find(|&i| stage_curves[i].is_some()) {
        let evt = stage_curves[idx].as_ref().unwrap().1;
        if matches!(evt, IgnitionEvent::Automatic | IgnitionEvent::Launch) {
            ignition_time[idx] = Some(0.0);
        }
    }

    // Single-stage fallback to the original path if nothing else is set up.
    // (Maintains the previous behaviour for unstaged rockets.)
    let aero_rocket = rocket.clone();

    let atmosphere = ExtendedIsa::default();
    let pitch_rad = opts.launch_pitch_deg.to_radians();
    let mut state = State::at_rest(opts.launch_altitude, initial_mass.max(0.001), pitch_rad);

    // Java convention (`PinkNoiseWindModel`): an "east wind" (direction = π/2)
    // means wind blowing FROM east TOWARDS west, i.e. the wind velocity
    // vector points in -X. So a positive average speed gives a -X velocity.
    let wind = Vec3::new(-opts.wind_average, 0.0, 0.0);

    let dt = opts.time_step;
    let aero0 = compute_aero(
        &aero_rocket,
        FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 },
    );
    let area_ref = aero0.reference_area.max(1.0e-6);
    let chute_drag_factor = parachute_drag_factor(rocket);

    let mut result = SimulationResult::default();
    let mut deployed = false;
    let mut deploy_time = -1.0;
    let mut apogee_time = -1.0;
    let mut prev_vz = 0.0;
    let mut prev_speed = 0.0;
    let mut steps_since_print = 0;
    let mut on_rail = stage_curves.iter().any(|c| c.is_some());
    let mut lifted = false;

    // Helper free functions (no captures) so they don't conflict with
    // mutable borrows of `attached` / `ignition_time` across iterations.
    fn thrust_now(
        t: f64,
        stage_curves: &[Option<(ThrustCurve, IgnitionEvent)>],
        attached: &[bool],
        ignition_time: &[Option<f64>],
    ) -> f64 {
        let mut total = 0.0;
        for i in 0..stage_curves.len() {
            if !attached[i] { continue; }
            if let (Some((curve, _)), Some(t0)) = (stage_curves[i].as_ref(), ignition_time[i]) {
                total += curve.thrust_at(t - t0);
            }
        }
        total
    }
    fn motor_mass_now(
        t: f64,
        stage_curves: &[Option<(ThrustCurve, IgnitionEvent)>],
        attached: &[bool],
        ignition_time: &[Option<f64>],
    ) -> f64 {
        let mut total = 0.0;
        for i in 0..stage_curves.len() {
            if !attached[i] { continue; }
            if let Some((curve, _)) = stage_curves[i].as_ref() {
                let elapsed = ignition_time[i].map(|t0| t - t0).unwrap_or(0.0);
                let prop_remaining = curve.propellant_mass_at(elapsed);
                let casing = curve.total_mass - curve.propellant_mass;
                total += casing + prop_remaining;
            }
        }
        total
    }
    /// Total CG including current motor mass contribution at each stage.
    fn combined_cg(
        t: f64,
        stage_mass: f64,
        stage_cg: f64,
        stage_curves: &[Option<(ThrustCurve, IgnitionEvent)>],
        attached: &[bool],
        ignition_time: &[Option<f64>],
        motor_positions: &[Option<f64>],
    ) -> (f64, f64) {
        let mut sum_mass = stage_mass;
        let mut sum_moment = stage_mass * stage_cg;
        for i in 0..stage_curves.len() {
            if !attached[i] { continue; }
            if let Some((curve, _)) = stage_curves[i].as_ref() {
                let elapsed = ignition_time[i].map(|t0| t - t0).unwrap_or(0.0);
                let prop_remaining = curve.propellant_mass_at(elapsed);
                let casing = curve.total_mass - curve.propellant_mass;
                let m = casing + prop_remaining;
                let pos = motor_positions[i].unwrap_or(stage_cg);
                sum_mass += m;
                sum_moment += m * pos;
            }
        }
        let cg = if sum_mass > 1e-12 { sum_moment / sum_mass } else { stage_cg };
        (sum_mass, cg)
    }

    // Push initial state
    {
        let stage_mass = mass_properties_for_stages_active(rocket, &attached);
        let total_mass = stage_mass.mass + motor_mass_now(state.t, &stage_curves, &attached, &ignition_time);
        state.mass = total_mass.max(1.0e-6);
        let (cd, _f, _p, _b, _cn, _cp) = aero_at(
            &state,
            &aero_rocket,
            &atmosphere,
            wind,
            thrust_now(state.t, &stage_curves, &attached, &ignition_time),
        );
        push_row(
            &mut result,
            &state,
            &aero_rocket,
            &stage_mass,
            &atmosphere,
            wind,
            thrust_now(state.t, &stage_curves, &attached, &ignition_time),
            cd,
            area_ref,
            0.0,
            dt,
            deployed,
            chute_drag_factor,
        );
    }

    while state.t < opts.max_time {
        let stage_mass = mass_properties_for_stages_active(rocket, &attached);
        let motor_mass = motor_mass_now(state.t, &stage_curves, &attached, &ignition_time);
        state.mass = (stage_mass.mass + motor_mass).max(1.0e-6);
        let thrust = thrust_now(state.t, &stage_curves, &attached, &ignition_time);
        let (cd_now, _, _, _, _, _) = aero_at(&state, &aero_rocket, &atmosphere, wind, thrust);

        // Parachute opening shock factor.
        let opening_factor = if deployed {
            let elapsed = (state.t - deploy_time).max(0.0);
            (elapsed / chute_open_time()).clamp(0.0, 1.0)
        } else {
            0.0
        };
        let active_cd = if deployed { 0.0 } else { cd_now };
        let active_area = if deployed {
            chute_drag_factor * opening_factor + area_ref * cd_now * (1.0 - opening_factor)
        } else {
            area_ref
        };

        // Build a fresh thrust + mass_dot closure for this step. Both
        // capture only by reference for safety.
        let stage_curves_ref = &stage_curves;
        let attached_ref = &attached;
        let ignition_time_ref = &ignition_time;
        let total_motor_mass_consumed: f64 = stage_curves.iter().enumerate().filter_map(|(i, opt)| {
            opt.as_ref().map(|(c, _)| (i, c))
        }).filter(|(i, _)| attached[*i] && ignition_time[*i].is_some())
            .map(|(_, c)| c.propellant_mass)
            .sum();
        let thrust_fn = move |t: f64| -> f64 {
            thrust_now(t, stage_curves_ref, attached_ref, ignition_time_ref)
        };
        let stage_curves_dot = &stage_curves;
        let attached_dot = &attached;
        let ignition_time_dot = &ignition_time;
        let mass_dot_fn = move |t: f64| -> f64 {
            let mut total = 0.0_f64;
            for i in 0..stage_curves_dot.len() {
                if !attached_dot[i] {
                    continue;
                }
                if let (Some((curve, _)), Some(t0)) =
                    (stage_curves_dot[i].as_ref(), ignition_time_dot[i])
                {
                    let elapsed = t - t0;
                    let ti = curve.total_impulse();
                    if ti > 0.0 && curve.propellant_mass > 0.0 {
                        let f = curve.thrust_at(elapsed);
                        total -= (f / ti) * curve.propellant_mass;
                    }
                }
            }
            total
        };
        let _ = total_motor_mass_consumed;

        // Pull current aero coefficients for rotational dynamics.
        let (_, _, _, _, cn_alpha_now, cp_now) = aero_at(&state, &aero_rocket, &atmosphere, wind, thrust);
        let body_lift = crate::aero::body_lift_geometry(&aero_rocket);
        // Combine empty-rocket CG with motor mass contributions to get the
        // CG used by the moment-arm calc (CP − CG). This is critical: my
        // empty-rocket CG is ~3 cm forward of Java's total CG (with motor),
        // and the resulting 50%-too-large arm previously over-rotated the
        // rocket and reduced AOA-induced drag.
        let (_, total_cg) = combined_cg(
            state.t,
            stage_mass.mass,
            stage_mass.cg_axial,
            &stage_curves,
            &attached,
            &ignition_time,
            &motor_positions,
        );
        let sampler = ForceSampler {
            atmosphere: &atmosphere,
            wind,
            thrust: &thrust_fn,
            cd: if deployed { 1.0 } else { active_cd },
            area_ref: if deployed { active_area } else { area_ref },
            mass_dot: &mass_dot_fn,
            cn_alpha: if deployed { 0.0 } else { cn_alpha_now },
            reference_length: aero0.reference_length,
            cp_axial: cp_now,
            cg_axial: total_cg,
            moment_of_inertia_rot: stage_mass.i_rot.max(1e-9),
            moment_of_inertia_long: stage_mass.i_long.max(1e-9),
            body_lift_planform_term: if deployed { 0.0 } else { body_lift.planform_term },
            body_lift_cp: body_lift.planform_cp,
        };
        let next = rk4_step(&state, dt, &sampler);
        let mut next = State { mass: next.mass.max(1.0e-6), ..next };

        // On-rail constraint: while sliding up the launch rod, the rocket
        // is constrained to move along the rod direction only and cannot
        // rotate.  Pin orientation, kill angular velocity, project linear
        // velocity onto the rod (body) axis so AOA stays zero physically
        // even though the wind would otherwise tilt the apparent flow.
        if on_rail {
            next.orientation = state.orientation;
            next.angular = Vec3::zeros();
            let rod_axis = state.body_axis_world();
            let along = next.vel.dot(&rod_axis).max(0.0);
            next.vel = along * rod_axis;
            // Position constrained to the rod line through the launch point.
            let above = (next.pos - state.pos).dot(&rod_axis).max(0.0);
            next.pos = state.pos + above * rod_axis;
            if thrust < next.mass * G0 && !lifted {
                next.pos = state.pos;
                next.vel = Vec3::zeros();
            } else {
                lifted = true;
                if next.pos.z >= opts.launch_altitude + sim_rail_clear_threshold() {
                    on_rail = false;
                    result.events.push((next.t, "LAUNCHROD".to_string()));
                }
            }
        }
        if apogee_time < 0.0 && next.pos.z < opts.launch_altitude {
            next.pos.z = opts.launch_altitude;
            next.vel.z = next.vel.z.max(0.0);
        }

        // Burnout detection per stage.
        for i in 0..n {
            if attached[i] && ignition_time[i].is_some() && burnout_time[i].is_none() {
                if let Some((curve, _)) = stage_curves[i].as_ref() {
                    let t0 = ignition_time[i].unwrap();
                    if next.t - t0 >= curve.burn_time() {
                        burnout_time[i] = Some(next.t);
                        result.events.push((next.t, format!("BURNOUT_STAGE_{}", i)));
                        // Ignite upper stages whose ignition event is Burnout
                        for j in 0..n {
                            if attached[j] && ignition_time[j].is_none() {
                                if let Some((_, evt)) = stage_curves[j].as_ref() {
                                    if matches!(evt, IgnitionEvent::Burnout) {
                                        ignition_time[j] = Some(next.t);
                                        result.events.push((
                                            next.t,
                                            format!("IGNITION_STAGE_{}", j),
                                        ));
                                    }
                                }
                            }
                        }
                        // Separation: drop the burned-out stage if its
                        // separation event is Burnout.  We check stage[i].
                        if rocket.stages[i].separation_event == SeparationEvent::Burnout {
                            attached[i] = false;
                            result.events.push((next.t, format!("SEPARATION_STAGE_{}", i)));
                        }
                    }
                }
            }
        }

        // Apogee detection
        if apogee_time < 0.0 && prev_vz > 0.0 && next.vel.z <= 0.0 {
            apogee_time = state.t;
            result.events.push((state.t, "APOGEE".to_string()));
            if !deployed && parachute_count(rocket) > 0 {
                deployed = true;
                deploy_time = state.t;
                result.events.push((state.t, "RECOVERY_DEVICE_DEPLOYMENT".to_string()));
            }
        }
        prev_vz = next.vel.z;

        let speed = next.vel.norm();
        if speed > result.max_velocity { result.max_velocity = speed; }
        let acc = ((speed - prev_speed) / dt).abs();
        if acc > result.max_acceleration { result.max_acceleration = acc; }
        prev_speed = speed;
        if next.pos.z > result.max_altitude { result.max_altitude = next.pos.z; }

        if apogee_time >= 0.0 && next.pos.z <= opts.launch_altitude + 1e-6 {
            result.events.push((next.t, "GROUND_HIT".to_string()));
            result.ground_hit_velocity = speed;
            state = next;
            let stage_mass = mass_properties_for_stages_active(rocket, &attached);
            let thrust = thrust_now(state.t, &stage_curves, &attached, &ignition_time);
            let (cd_now, _, _, _, _, _) = aero_at(&state, &aero_rocket, &atmosphere, wind, thrust);
            push_row(
                &mut result,
                &state,
                &aero_rocket,
                &stage_mass,
                &atmosphere,
                wind,
                thrust,
                if deployed { 0.0 } else { cd_now },
                area_ref,
                0.0,
                dt,
                deployed,
                chute_drag_factor,
            );
            result.flight_time = state.t;
            break;
        }

        state = next;
        steps_since_print += 1;
        if steps_since_print >= 4 {
            let stage_mass = mass_properties_for_stages_active(rocket, &attached);
            let thrust = thrust_now(state.t, &stage_curves, &attached, &ignition_time);
            let (cd_now, _, _, _, _, _) = aero_at(&state, &aero_rocket, &atmosphere, wind, thrust);
            push_row(
                &mut result,
                &state,
                &aero_rocket,
                &stage_mass,
                &atmosphere,
                wind,
                thrust,
                if deployed { 0.0 } else { cd_now },
                area_ref,
                0.0,
                dt,
                deployed,
                chute_drag_factor,
            );
            steps_since_print = 0;
        }

        // Termination: ground hit pre-apogee or stationary
        if state.t > 1.0 && state.vel.norm() < 1.0e-3 && state.pos.z <= opts.launch_altitude + 1e-3 {
            break;
        }
        // No motor case: end shortly after t=1
        let any_curve = stage_curves.iter().any(|c| c.is_some());
        if !any_curve && state.t > 0.5 {
            break;
        }
    }

    if apogee_time >= 0.0 { result.time_to_apogee = apogee_time; }
    if result.flight_time == 0.0 { result.flight_time = state.t; }
    let _ = mass_props;
    Ok(result)
}

/// Wrapper to call out to mass.rs's stage-aware mass function.
fn mass_properties_for_stages_active(rocket: &Rocket, active: &[bool]) -> MassProperties {
    crate::mass::mass_properties_for_stages(rocket, active)
}

/// Sample aero coefficients for the current state.
fn aero_at(
    state: &State,
    rocket: &Rocket,
    atmosphere: &ExtendedIsa,
    wind: Vec3,
    thrust: f64,
) -> (f64, f64, f64, f64, f64, f64) {
    let atmos = atmosphere.conditions(state.pos.z.max(0.0));
    let v_rel = state.vel - wind;
    let speed = v_rel.norm();
    let mach = atmos.mach(speed);
    let reynolds = atmos.density * speed.max(0.0) / atmos.viscosity.max(1e-9);
    let firing = thrust > 1.0e-3;
    let a = crate::aero::compute_with(
        rocket,
        FlightConditions { mach, angle_of_attack: 0.0, reynolds },
        firing,
    );
    (a.cd, a.cd_friction, a.cd_pressure, a.cd_base, a.cn_alpha, a.cp_axial)
}

#[allow(dead_code)]
fn run(
    rocket: &Rocket,
    opts: &SimulationOptions,
    mass_props: &MassProperties,
    initial_mass: f64,
    curve: Option<ThrustCurve>,
) -> Result<SimulationResult> {
    let atmosphere = ExtendedIsa::default();
    let pitch_rad = opts.launch_pitch_deg.to_radians();
    let mut state = State::at_rest(opts.launch_altitude, initial_mass.max(0.001), pitch_rad);

    // Java convention (`PinkNoiseWindModel`): an "east wind" (direction = π/2)
    // means wind blowing FROM east TOWARDS west, i.e. the wind velocity
    // vector points in -X. So a positive average speed gives a -X velocity.
    let wind = Vec3::new(-opts.wind_average, 0.0, 0.0);

    let dt = opts.time_step;
    let aero0 = compute_aero(
        rocket,
        FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 },
    );
    let area_ref = aero0.reference_area.max(1.0e-6);

    // Parachute drag (when deployed): sum of pi/4 D² Cd over all parachutes.
    let chute_drag_factor = parachute_drag_factor(rocket);

    let mut result = SimulationResult::default();
    let burn_time = curve.as_ref().map(|c| c.burn_time()).unwrap_or(0.0);
    let total_impulse = curve.as_ref().map(|c| c.total_impulse()).unwrap_or(0.0);
    let propellant_mass = curve.as_ref().map(|c| c.propellant_mass).unwrap_or(0.0);
    let total_motor_mass = curve.as_ref().map(|c| c.total_mass).unwrap_or(0.0);

    let thrust_fn = |t: f64| -> f64 { curve.as_ref().map(|c| c.thrust_at(t)).unwrap_or(0.0) };
    let mass_dot_fn = |t: f64| -> f64 {
        if total_impulse <= 0.0 || propellant_mass <= 0.0 {
            return 0.0;
        }
        let thrust = thrust_fn(t);
        -(thrust / total_impulse) * propellant_mass
    };

    let mut deployed = false;
    let mut deploy_time = -1.0;
    let mut apogee_time = -1.0;
    let mut prev_vz = 0.0;
    let mut prev_speed = 0.0;
    let mut steps_since_print = 0;
    let mut on_rail = curve.is_some();
    let mut lifted = false;

    // Helper: sample the current aero coefficients given the current flight
    // condition.  Repeated each step so Mach-dependent terms (pressure /
    // base drag) update with the changing flight regime.
    let aero_at = |state: &State| -> (f64, f64, f64, f64, f64, f64) {
        let atmos = atmosphere.conditions(state.pos.z.max(0.0));
        let v_rel = state.vel - wind;
        let speed = v_rel.norm();
        let mach = atmos.mach(speed);
        let reynolds = atmos.density * speed.max(0.0) / atmos.viscosity.max(1e-9);
        let firing = thrust_fn(state.t) > 1.0e-3;
        let a = crate::aero::compute_with(
            rocket,
            FlightConditions { mach, angle_of_attack: 0.0, reynolds },
            firing,
        );
        (a.cd, a.cd_friction, a.cd_pressure, a.cd_base, a.cn_alpha, a.cp_axial)
    };

    // Record initial state
    {
        let (cd, _f, _p, _b, _cn, _cp) = aero_at(&state);
        push_row(
            &mut result,
            &state,
            rocket,
            mass_props,
            &atmosphere,
            wind,
            thrust_fn(state.t),
            cd,
            area_ref,
            total_motor_mass,
            dt,
            deployed,
            chute_drag_factor,
        );
    }

    while state.t < opts.max_time {
        let (cd_now, _, _, _, _, _) = aero_at(&state);
        // Parachute opening shock: chute drag area ramps from 0 to full
        // value over `chute_open_time` seconds after deployment so the
        // descent doesn't snap instantly to terminal velocity.
        let opening_factor = if deployed {
            let elapsed = (state.t - deploy_time).max(0.0);
            (elapsed / chute_open_time()).clamp(0.0, 1.0)
        } else {
            0.0
        };
        let active_cd = if deployed { 0.0 } else { cd_now };
        let active_area = if deployed {
            chute_drag_factor * opening_factor + area_ref * cd_now * (1.0 - opening_factor)
        } else {
            area_ref
        };
        let sampler = ForceSampler {
            atmosphere: &atmosphere,
            wind,
            thrust: &thrust_fn,
            cd: if deployed { 1.0 } else { active_cd },
            area_ref: if deployed { active_area } else { area_ref },
            mass_dot: &mass_dot_fn,
            cn_alpha: 0.0,
            reference_length: 0.025,
            cp_axial: 0.0,
            cg_axial: mass_props.cg_axial,
            moment_of_inertia_rot: mass_props.i_rot.max(1e-9),
            moment_of_inertia_long: mass_props.i_long.max(1e-9),
            body_lift_planform_term: 0.0,
            body_lift_cp: 0.0,
        };
        let next = rk4_step(&state, dt, &sampler);
        // monotonic-mass safety: don't let the rocket "gain" mass below empty
        let min_mass = mass_props.mass.max(1.0e-6);
        let mut next = State {
            mass: next.mass.max(min_mass),
            ..next
        };

        // On-rail constraint: until thrust exceeds weight, the rocket sits
        // motionless on the pad. As soon as it lifts off, we stop pinning it.
        if on_rail {
            let thrust_now = thrust_fn(next.t);
            if thrust_now < next.mass * G0 && !lifted {
                next.pos = state.pos;
                next.vel = Vec3::zeros();
            } else {
                lifted = true;
                if next.pos.z >= opts.launch_altitude + sim_rail_clear_threshold() {
                    on_rail = false;
                    result.events.push((next.t, "LAUNCHROD".to_string()));
                }
            }
        }

        // Altitude clamp: never report below launch altitude before apogee
        if apogee_time < 0.0 && next.pos.z < opts.launch_altitude {
            next.pos.z = opts.launch_altitude;
            next.vel.z = next.vel.z.max(0.0);
        }

        // Apogee detection: vertical velocity crosses zero from positive
        if apogee_time < 0.0 && prev_vz > 0.0 && next.vel.z <= 0.0 {
            apogee_time = state.t;
            result.events.push((state.t, "APOGEE".to_string()));
            // Auto-deploy at apogee for the simple-model fixture
            if !deployed && parachute_count(rocket) > 0 {
                deployed = true;
                deploy_time = state.t;
                result.events.push((state.t, "RECOVERY_DEVICE_DEPLOYMENT".to_string()));
            }
        }
        prev_vz = next.vel.z;

        let speed = next.vel.norm();
        if speed > result.max_velocity {
            result.max_velocity = speed;
        }
        let acc = ((speed - prev_speed) / dt).abs();
        if acc > result.max_acceleration {
            result.max_acceleration = acc;
        }
        prev_speed = speed;
        if next.pos.z > result.max_altitude {
            result.max_altitude = next.pos.z;
        }

        // Ground hit: altitude drops to / below launch altitude after apogee
        if apogee_time >= 0.0 && next.pos.z <= opts.launch_altitude + 1e-6 {
            result.events.push((next.t, "GROUND_HIT".to_string()));
            result.ground_hit_velocity = speed;
            state = next;
            let (cd_now, _, _, _, _, _) = aero_at(&state);
            push_row(
                &mut result,
                &state,
                rocket,
                mass_props,
                &atmosphere,
                wind,
                thrust_fn(state.t),
                if deployed { 0.0 } else { cd_now },
                area_ref,
                total_motor_mass,
                dt,
                deployed,
                chute_drag_factor,
            );
            result.flight_time = state.t;
            break;
        }

        state = next;
        steps_since_print += 1;
        if steps_since_print >= 4 {
            let (cd_now, _, _, _, _, _) = aero_at(&state);
            push_row(
                &mut result,
                &state,
                rocket,
                mass_props,
                &atmosphere,
                wind,
                thrust_fn(state.t),
                if deployed { 0.0 } else { cd_now },
                area_ref,
                total_motor_mass,
                dt,
                deployed,
                chute_drag_factor,
            );
            steps_since_print = 0;
        }

        // No motor and rocket is sitting on the ground: terminate immediately.
        if state.t > 1.0 && state.vel.norm() < 1.0e-3 && state.pos.z <= opts.launch_altitude + 1e-3 {
            break;
        }
        if state.t > burn_time + 0.5 && curve.is_none() {
            break;
        }
    }

    if apogee_time >= 0.0 {
        result.time_to_apogee = apogee_time;
    }
    if result.flight_time == 0.0 {
        result.flight_time = state.t;
    }
    Ok(result)
}

fn sim_rail_clear_threshold() -> f64 {
    // Distance above the pad after which the rail-clearing event is recorded.
    // Real launch rods are typically ~1m; we use a small fraction of that as
    // the "off-rail" boundary for the simplified model.
    0.5
}

fn chute_open_time() -> f64 {
    // Time for a typical model-rocket parachute to inflate from the packed
    // bundle to its full drag area. Matches OpenRocket's default opening
    // model (RecoveryDevice.deployTime ≈ 0.3 s).
    0.3
}

fn parachute_drag_factor(rocket: &Rocket) -> f64 {
    // Effective Cd·A for fully-open recovery devices. We use a default Cd
    // of 0.75 for hemispherical model-rocket parachutes (matches OR's
    // `Parachute.getDefaultCD()` minus a small effectiveness loss accounting
    // for scallops / gaps / shroud-line bunching).
    let mut total = 0.0;
    for c in rocket.iter_components() {
        if let Component::Parachute(p) = c {
            let cd = p.cd.unwrap_or(0.75);
            total += cd * PI * (0.5 * p.diameter).powi(2);
        }
    }
    total
}

fn parachute_count(rocket: &Rocket) -> usize {
    rocket.iter_components().filter(|c| matches!(c, Component::Parachute(_))).count()
}

#[allow(clippy::too_many_arguments)]
fn push_row(
    result: &mut SimulationResult,
    state: &State,
    rocket: &Rocket,
    mass_props: &MassProperties,
    atmosphere: &ExtendedIsa,
    wind: Vec3,
    thrust: f64,
    cd: f64,
    area_ref: f64,
    motor_mass_full: f64,
    dt: f64,
    deployed: bool,
    chute_factor: f64,
) {
    let atmos = atmosphere.conditions(state.pos.z.max(0.0));
    let v_rel = state.vel - wind;
    let speed = v_rel.norm();
    let mach = atmos.mach(speed);
    let weight = state.mass * G0;
    let thrust_to_weight = if weight > 0.0 { thrust / weight } else { 0.0 };
    let q = 0.5 * atmos.density * speed * speed;
    let drag_force = if deployed { q * chute_factor } else { q * cd * area_ref };
    let stability_margin = 0.0_f64;
    let aero = crate::aero::compute_with(
        rocket,
        FlightConditions { mach, angle_of_attack: 0.0, reynolds: atmos.density * speed / atmos.viscosity.max(1e-9) },
        thrust > 1.0e-3,
    );
    let cp = aero.cp_axial;
    // Use the live (motor-inclusive) CG that the dynamics is using. The
    // mass_props passed in here is the empty rocket; state.mass includes
    // motor mass so the difference + assumption "motor at empty CG" is a
    // reasonable approximation, but the dynamics uses the more accurate
    // combined_cg.  For the data column we approximate: CG_total ≈
    // (empty_mass·CG_empty + motor_mass·motor_axial) / total_mass, but
    // motor_axial isn't known here so we report empty CG biased by motor.
    let motor_mass = (state.mass - mass_props.mass).max(0.0);
    let cg = if state.mass > 1e-9 {
        // Approximate motor at 75% of the rocket length (close to motor
        // mount position for typical hobby rockets).  The dynamics uses
        // the exact value; this is only for the reporting column.
        let motor_axial_guess = 0.75 * (mass_props.cg_axial * 2.0).max(0.3);
        (mass_props.mass * mass_props.cg_axial + motor_mass * motor_axial_guess) / state.mass
    } else {
        mass_props.cg_axial
    };
    let caliber = if aero.reference_length > 0.0 { (cp - cg) / aero.reference_length } else { 0.0 };

    let _ = motor_mass_full;
    let total_velocity = speed;
    let vertical_velocity = state.vel.z;
    let lateral_velocity = (state.vel.x * state.vel.x + state.vel.y * state.vel.y).sqrt();
    let vertical_acc = f64::NAN; // not tracked between steps in this MVP
    let total_acc = f64::NAN;
    let lateral_acc = f64::NAN;
    let altitude_agl = state.pos.z;
    let altitude_asl = state.pos.z;
    let position_east = state.pos.x;
    let position_north = state.pos.y;
    let lateral_distance = (position_east * position_east + position_north * position_north).sqrt();
    let lateral_direction = position_north.atan2(position_east);

    let mut row = [f64::NAN; 58];
    row[0] = state.t;
    row[1] = altitude_agl;
    row[2] = altitude_asl;
    row[3] = vertical_velocity;
    row[4] = total_velocity;
    row[5] = vertical_acc;
    row[6] = total_acc;
    row[7] = position_east;
    row[8] = position_north;
    row[9] = lateral_distance;
    row[10] = lateral_direction;
    row[11] = lateral_velocity;
    row[12] = lateral_acc;
    // 13 latitude, 14 longitude - not modeled
    // AOA: angle between body axis and velocity vector
    let body_axis = state.body_axis_world();
    let v_rel = state.vel - wind;
    let v_mag = v_rel.norm();
    let aoa = if v_mag > 1.0 {
        body_axis.dot(&(v_rel / v_mag)).clamp(-1.0, 1.0).acos()
    } else {
        0.0
    };
    row[15] = aoa;
    row[16] = state.angular.x; // roll rate (body X)
    row[17] = state.angular.y; // pitch rate (body Y)
    row[18] = state.angular.z; // yaw rate (body Z)
    // Vertical orientation (zenith): angle of body axis from world +Z
    let zenith = body_axis.z.clamp(-1.0, 1.0).acos();
    row[19] = zenith;
    row[20] = lateral_direction; // lateral orientation (azimuth)
    row[21] = state.mass;
    row[22] = motor_mass;
    row[23] = mass_props.i_long;
    row[24] = mass_props.i_rot;
    row[25] = G0;
    row[26] = cp;
    row[27] = cg;
    row[28] = caliber;
    row[29] = thrust;
    row[30] = thrust_to_weight;
    row[31] = drag_force;
    row[32] = if deployed { f64::NAN } else { cd };
    row[33] = if deployed { f64::NAN } else { aero.cd_friction };
    row[34] = if deployed { f64::NAN } else { aero.cd_pressure };
    row[35] = if deployed { f64::NAN } else { aero.cd_base };
    row[36] = if deployed { f64::NAN } else { cd };
    row[37] = aero.cn_alpha;
    row[38] = 0.0; // pitch moment coefficient
    row[39] = 0.0; // yaw
    row[40] = 0.0; // side force
    row[41] = 0.0; // roll moment
    row[42] = 0.0; // roll forcing
    row[43] = 0.0; // roll damping
    row[44] = 0.0; // pitch damping
    row[45] = wind.norm();
    row[46] = wind.y.atan2(wind.x);
    row[47] = atmos.temperature;
    row[48] = atmos.pressure;
    row[49] = atmos.density;
    row[50] = atmos.speed_of_sound;
    row[51] = mach;
    row[52] = atmos.density * speed / atmos.viscosity.max(1e-9);
    row[53] = aero.reference_length;
    row[54] = aero.reference_area;
    row[55] = dt;
    row[56] = 0.0; // computation time
    row[57] = 0.0; // coriolis acceleration
    result.rows.push(row);

    // suppress unused-variable warnings for vars kept for future use
    let _ = stability_margin;
    let _ = (
        atmos.viscosity,
        motor_mass_full,
        opsrocket_core::component::ReferenceType::default(),
    );
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_rocket_errors() {
        let rocket = Rocket::default();
        let doc = OrkDocument {
            version: "test".into(),
            creator: "test".into(),
            rocket,
            simulations: vec![],
        };
        // No simulation to run, so we expect NoSuchSimulation rather than EmptyRocket.
        assert!(simulate(&doc, "x").is_err());
    }
}
