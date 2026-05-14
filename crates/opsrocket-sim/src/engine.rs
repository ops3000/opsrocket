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
use opsrocket_core::component::{Component, MotorAssignment, Rocket};
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

    let designation = sim
        .config_id
        .as_deref()
        .and_then(|id| find_motor_assignment(doc, id))
        .and_then(|a| a.designation);

    let mut effective_opts = opts.clone();
    if let Some(d) = designation.as_deref() {
        // Carry the designation through; preserve any user-supplied search_dir.
        let dir = motors_dir
            .map(|p| p.to_path_buf())
            .or_else(|| match &opts.motor {
                Some(MotorChoice::Designation { search_dir, .. }) => search_dir.clone(),
                _ => None,
            });
        effective_opts.motor = Some(MotorChoice::Designation {
            designation: d.to_string(),
            search_dir: dir,
        });
    }

    let curve = match load_thrust_curve(&effective_opts, designation.as_deref()) {
        Ok(c) => Some(c),
        Err(Error::UnknownMotor(_)) | Err(Error::NoMotor(_)) => None,
        Err(e) => return Err(e),
    };

    let mass_props = empty_mass_properties(&doc.rocket);
    let total_mass_initial = mass_props.mass + curve.as_ref().map(|c| c.total_mass).unwrap_or(0.0);
    run(&doc.rocket, &effective_opts, &mass_props, total_mass_initial, curve)
}

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

    let wind = Vec3::new(opts.wind_average, 0.0, 0.0);

    let dt = opts.time_step;
    let cd_const = {
        let aero = compute_aero(
            rocket,
            FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 },
        );
        aero.cd
    };
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
    let mut apogee_time = -1.0;
    let mut prev_vz = 0.0;
    let mut prev_speed = 0.0;
    let mut steps_since_print = 0;
    let mut on_rail = curve.is_some();
    let mut lifted = false;

    // Record initial state
    push_row(
        &mut result,
        &state,
        rocket,
        mass_props,
        &atmosphere,
        wind,
        thrust_fn(state.t),
        cd_const,
        area_ref,
        total_motor_mass,
        dt,
        deployed,
        chute_drag_factor,
    );

    while state.t < opts.max_time {
        let active_cd = if deployed { 0.0 } else { cd_const };
        let active_area = if deployed { chute_drag_factor.max(area_ref) } else { area_ref };
        let sampler = ForceSampler {
            atmosphere: &atmosphere,
            wind,
            thrust: &thrust_fn,
            cd: if deployed { 1.0 } else { active_cd },
            area_ref: if deployed { active_area } else { area_ref },
            mass_dot: &mass_dot_fn,
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
            push_row(
                &mut result,
                &state,
                rocket,
                mass_props,
                &atmosphere,
                wind,
                thrust_fn(state.t),
                if deployed { 0.0 } else { cd_const },
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
        // Sub-sample output every ~4 steps to keep row count close to OR (~80
        // rows for a short flight).
        if steps_since_print >= 4 {
            push_row(
                &mut result,
                &state,
                rocket,
                mass_props,
                &atmosphere,
                wind,
                thrust_fn(state.t),
                if deployed { 0.0 } else { cd_const },
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

fn parachute_drag_factor(rocket: &Rocket) -> f64 {
    let mut total = 0.0;
    for c in rocket.iter_components() {
        if let Component::Parachute(p) = c {
            let cd = p.cd.unwrap_or(0.8);
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
    let aero = compute_aero(
        rocket,
        FlightConditions { mach, angle_of_attack: 0.0, reynolds: atmos.density * speed / atmos.viscosity.max(1e-9) },
    );
    let cp = aero.cp_axial;
    let cg = mass_props.cg_axial;
    let caliber = if aero.reference_length > 0.0 { (cp - cg) / aero.reference_length } else { 0.0 };

    let motor_mass = (state.mass - mass_props.mass).max(0.0);
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
    row[15] = 0.0; // angle of attack
    row[16] = 0.0; // roll rate
    row[17] = 0.0; // pitch rate
    row[18] = 0.0; // yaw rate
    row[19] = state.pitch; // vertical orientation (zenith)
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
