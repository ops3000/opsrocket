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
use opsrocket_core::gravity::{GeodeticComputation, GravityModel, WorldCoordinate};
use opsrocket_core::component::{Component, IgnitionEvent, MotorAssignment, Rocket, SeparationEvent};
use opsrocket_core::geom::{Coord, Vec3};
use opsrocket_core::rigidbody::RigidBody;
use opsrocket_core::units::{G0, PI};
use opsrocket_io::motor::{ThrustCurve, parse_rasp};
use opsrocket_io::OrkDocument;

use crate::aero::{compute as compute_aero, FlightConditions};
use crate::flight::{rk4_step, ForceSampler, State};
use crate::mass::{empty_mass_properties, MassProperties};

// Java RK4SimulationStepper / AbstractSimulationStepper constants.
const MIN_TIME_STEP: f64 = 0.001;
/// Maximum pitch/yaw step angle (Java RECOMMENDED_ANGLE_STEP = 3°).
const MAX_ANGLE_STEP: f64 = 3.0 * std::f64::consts::PI / 180.0;
/// Maximum pitch/yaw angular-velocity change per step (Java = 4°).
const MAX_PITCH_YAW_CHANGE: f64 = 4.0 * std::f64::consts::PI / 180.0;
/// Java RK4SimulationStepper.MAX_ROLL_STEP_ANGLE = 2·28.32°.
const MAX_ROLL_STEP_ANGLE: f64 = 2.0 * 28.32 * std::f64::consts::PI / 180.0;
/// Java RK4SimulationStepper.MAX_ROLL_RATE_CHANGE = 2°.
const MAX_ROLL_RATE_CHANGE: f64 = 2.0 * std::f64::consts::PI / 180.0;

#[derive(Debug, Clone)]
pub struct SimulationOptions {
    pub time_step: f64,
    pub max_time: f64,
    pub launch_altitude: f64,
    /// Launch-site air temperature (K). OpenRocket default 288.15.
    pub launch_temperature: f64,
    /// Launch-site air pressure (Pa). OpenRocket default 101325.
    pub launch_pressure: f64,
    /// Launch-site relative humidity [0,1]. OpenRocket default 0.
    pub launch_relative_humidity: f64,
    /// Launch-site latitude (degrees). OpenRocket preference default 28.61.
    pub launch_latitude: f64,
    /// Launch-site longitude (degrees). OpenRocket default 0.
    pub launch_longitude: f64,
    /// Geodetic computation strategy (OpenRocket default Spherical).
    pub geodetic: GeodeticComputation,
    /// Gravity model (OpenRocket default WGS).
    pub gravity_model: GravityModel,
    /// Launch rod / guide length (m) — drives the dt[6] timestep limit and
    /// rail-clearance event.
    pub launch_rod_length: f64,
    /// Launch rod azimuth (radians, clockwise from north).
    pub launch_azimuth_rad: f64,
    pub launch_pitch_deg: f64,
    pub wind_average: f64,
    /// Standard deviation of the mean wind across runs (m/s). When non-zero
    /// the run shifts `wind_average` by `wind_seed`-derived Gaussian noise
    /// before the per-step turbulence kicks in. Default 0.0 (deterministic).
    pub wind_standard_deviation: f64,
    /// Wind turbulence intensity (σ/mean). OpenRocket default 0.1.
    pub wind_turbulence: f64,
    /// Wind direction (radians). OpenRocket default π/2 (an "east wind").
    pub wind_direction: f64,
    /// When true the atmosphere falls back to International Standard
    /// Atmosphere at `launch_altitude`, ignoring the temperature/pressure
    /// fields.
    pub use_isa: bool,
    /// Pink-noise RNG seed.
    pub wind_seed: i64,
    pub motor: Option<MotorChoice>,
}

impl SimulationOptions {
    /// Build the atmosphere model from the launch-site conditions, mirroring
    /// `SimulationOptions.getAtmosphericModel()` =
    /// `new ExtendedISAModel(launchAltitude, launchTemperature,
    /// launchPressure, launchRelativeHumidity)`.
    pub fn atmosphere(&self) -> ExtendedIsa {
        ExtendedIsa::new_at(
            self.launch_altitude,
            self.launch_temperature,
            self.launch_pressure,
            self.launch_relative_humidity,
        )
    }

    /// Launch-site world coordinate (`conditions.setLaunchSite(...)`).
    pub fn launch_site(&self) -> WorldCoordinate {
        WorldCoordinate::from_degrees(
            self.launch_latitude,
            self.launch_longitude,
            self.launch_altitude,
        )
    }
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
            launch_temperature: 288.15,
            launch_pressure: 101_325.0,
            launch_relative_humidity: 0.0,
            launch_latitude: 28.61,
            launch_longitude: 0.0,
            geodetic: GeodeticComputation::Spherical,
            gravity_model: GravityModel::Wgs,
            launch_rod_length: 1.0,
            launch_azimuth_rad: 0.0,
            launch_pitch_deg: 0.0,
            wind_average: 0.0,
            wind_standard_deviation: 0.0,
            wind_turbulence: 0.1,
            wind_direction: std::f64::consts::FRAC_PI_2,
            use_isa: true,
            wind_seed: 0,
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

/// Number of physical motors at the mount for `config_id` — the inner
/// tube's `<clusterconfiguration>` count (1 for a single motor). Used to
/// sum clustered-motor thrust and mass (`MotorClusterState`).
pub(crate) fn motor_cluster_count(rocket: &Rocket, config_id: &str) -> u32 {
    let layout = crate::mass::iter_layout(rocket);
    for (c, _ax) in &layout {
        if let Component::InnerTube(it) = c {
            if let Some(m) = it.motor_mount.as_ref() {
                if m.motors.iter().any(|a| a.config_id == config_id) {
                    return it.cluster_count.max(1);
                }
            }
        }
    }
    1
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
    let (designation, _search) = want.ok_or_else(|| Error::NoMotor("(unknown)".into()))?;
    find_motor_curve(&designation, None).ok_or(Error::UnknownMotor(designation))
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

/// Every available motor `.eng` as `(content)` strings: the embedded
/// bundled set (always; the sole source on wasm) followed by any on-disk
/// motor dirs (native — `read_dir` simply yields nothing on wasm). The
/// embedded set is the canonical `tests/fixtures/motors`, listed first so
/// designation-first-match results are identical to the previous fs path.
fn all_motor_blobs() -> Vec<String> {
    let mut out: Vec<String> = opsrocket_io::motor::embedded_motors()
        .iter()
        .map(|(_, c)| (*c).to_string())
        .collect();
    for dir in default_motor_dirs() {
        let Ok(rd) = std::fs::read_dir(&dir) else { continue };
        for e in rd.flatten() {
            let p = e.path();
            if p.extension().and_then(|s| s.to_str()) != Some("eng") {
                continue;
            }
            if let Ok(txt) = std::fs::read_to_string(&p) {
                out.push(txt);
            }
        }
    }
    out
}

/// Pick a motor curve by designation, disambiguated by OpenRocket digest
/// when supplied (else first designation-name match) — same selection
/// logic as before, now over in-memory blobs instead of files.
fn find_motor_curve(designation: &str, want_digest: Option<&str>) -> Option<ThrustCurve> {
    let blobs = all_motor_blobs();
    let mut name_match: Option<ThrustCurve> = None;
    let mut digest_pool: Vec<ThrustCurve> = Vec::new();
    for txt in &blobs {
        let header = txt
            .lines()
            .map(str::trim)
            .find(|l| !l.is_empty() && !l.starts_with(';'));
        let Some(header) = header else { continue };
        let Some(name) = header.split_whitespace().next() else { continue };
        if !name.eq_ignore_ascii_case(designation) {
            continue;
        }
        let Ok(curve) = parse_rasp(txt) else { continue };
        if name_match.is_none() {
            name_match = Some(curve.clone());
        }
        if want_digest.is_some() {
            digest_pool.push(curve);
        }
    }
    if let Some(want) = want_digest {
        for c in &digest_pool {
            if c.digest().eq_ignore_ascii_case(want) {
                return Some(c.clone());
            }
        }
    }
    name_match
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
        launch_temperature: sim.launch_temperature,
        launch_pressure: sim.launch_pressure,
        launch_relative_humidity: 0.0,
        launch_latitude: sim.launch_latitude,
        launch_longitude: sim.launch_longitude,
        geodetic: match sim.geodetic_method.as_str() {
            "flat" => GeodeticComputation::Flat,
            "wgs84" => GeodeticComputation::Wgs84,
            _ => GeodeticComputation::Spherical,
        },
        gravity_model: GravityModel::Wgs,
        launch_rod_length: sim.launch_rod_length.max(0.0),
        launch_azimuth_rad: sim.launch_rod_direction,
        launch_pitch_deg: sim.launch_rod_angle.to_degrees(),
        wind_average: sim.wind_average,
        wind_standard_deviation: sim.wind_standard_deviation,
        wind_turbulence: sim.wind_turbulence,
        wind_direction: sim.wind_direction,
        use_isa: sim.use_isa,
        wind_seed: 0,
        motor: motors_dir.map(|d| MotorChoice::Designation {
            designation: String::new(),
            search_dir: Some(d.to_path_buf()),
        }),
    };

    let config_id = sim.config_id.as_deref().unwrap_or("");
    let per_stage = find_motor_assignments_per_stage(&doc.rocket, config_id);

    // Load all per-stage thrust curves up front.
    let _search_dir = motors_dir.map(|p| p.to_path_buf()).or_else(|| match &opts.motor {
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
                let want_digest = assignment.digest.as_deref();
                let count = motor_cluster_count(&doc.rocket, &assignment.config_id);
                let found = find_motor_curve(designation, want_digest).map(|mut curve| {
                    if count > 1 {
                        // Clustered motors: N identical motors fire together —
                        // thrust, impulse and mass scale by N (MotorClusterState).
                        let n = count as f64;
                        for p in curve.points.iter_mut() {
                            p.thrust *= n;
                        }
                        for m in curve.mass.iter_mut() {
                            *m *= n;
                        }
                        curve.total_mass *= n;
                        curve.propellant_mass *= n;
                    }
                    (curve, *ignition)
                });
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
    // Per-stage motor ejection-charge delay (for EJECTION recovery timing).
    let stage_ejection_delay: Vec<f64> = per_stage
        .iter()
        .map(|e| e.as_ref().map(|(a, _)| a.ejection_delay).unwrap_or(0.0))
        .collect();
    run_multistage(
        &doc.rocket,
        &opts,
        &mass_props,
        total_mass_initial,
        stage_curves,
        motor_positions,
        stage_ejection_delay,
    )
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
    stage_ejection_delay: Vec<f64>,
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
    let (roll_forcing_c, roll_damp_c) = crate::aero::fin_roll_coeffs(&aero_rocket);

    let atmosphere = opts.atmosphere();
    let pitch_rad = opts.launch_pitch_deg.to_radians();
    let mut state = State::at_rest_az(opts.launch_altitude, initial_mass.max(0.001), pitch_rad, opts.launch_azimuth_rad);

    // Faithful pink-noise turbulent wind (PinkNoiseWindModel). OpenRocket
    // returns the air-velocity vector and computes airspeed = vel + wind;
    // opsrocket uses v_rel = vel − wind, so we negate OR's vector.
    let mut wind_model = opsrocket_core::wind::PinkNoiseWindModel::new(opts.wind_seed);
    wind_model.set_average(opts.wind_average);
    wind_model.set_direction(opts.wind_direction);
    wind_model.set_turbulence_intensity(opts.wind_turbulence);
    fn sample_wind(wm: &mut opsrocket_core::wind::PinkNoiseWindModel, t: f64) -> Vec3 {
        let (wx, wy, _) = wm.wind_velocity(t.max(0.0));
        Vec3::new(-wx, -wy, 0.0)
    }
    let mut wind = sample_wind(&mut wind_model, 0.0);

    // Adaptive RK4 timestep (Java RK4SimulationStepper). `dt` now varies per
    // step; `user_dt` is the configured base step.
    let user_dt = opts.time_step;
    let mut dt = (user_dt / 5.0).max(MIN_TIME_STEP); // launch-rod start
    let aero0 = compute_aero(
        &aero_rocket,
        FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 },
    );
    let area_ref = aero0.reference_area.max(1.0e-6);
    let chute_drag_factor = parachute_drag_factor(rocket);

    let mut result = SimulationResult::default();
    let mut deployed = false;
    let mut deploy_time = -1.0;
    let mut tumbling = false;
    let tumble_area = tumble_drag_area(rocket);
    let mut apogee_time = -1.0;
    let mut prev_vz = 0.0;
    let mut prev_speed = 0.0;
    let mut _steps_since_print = 0;
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

    /// Aggregate motor rigid body (mass + filled-cylinder MOI at each
    /// motor's axial CG) — `MassCalculation.calculateMountData`. Motor unit
    /// inertias: rotational (roll) = r²/2, longitudinal (pitch) = (3r²+L²)/12
    /// (`Inertia.filledCylinder*`).
    fn motor_rigid_body(
        t: f64,
        stage_curves: &[Option<(ThrustCurve, IgnitionEvent)>],
        attached: &[bool],
        ignition_time: &[Option<f64>],
        motor_positions: &[Option<f64>],
    ) -> RigidBody {
        let mut acc: Option<RigidBody> = None;
        for i in 0..stage_curves.len() {
            if !attached[i] {
                continue;
            }
            if let Some((curve, _)) = stage_curves[i].as_ref() {
                let elapsed = ignition_time[i].map(|t0| t - t0).unwrap_or(0.0);
                let prop_remaining = curve.propellant_mass_at(elapsed);
                let casing = curve.total_mass - curve.propellant_mass;
                let m = casing + prop_remaining;
                if m <= 1e-12 {
                    continue;
                }
                let r = 0.5 * curve.diameter_m;
                let l = curve.length_m;
                // Place the motor mass at mountStart + motor CG-x(t).
                let cgx = motor_positions[i].unwrap_or(0.0);
                let ixx = m * r * r / 2.0;
                let it = m * (3.0 * r * r + l * l) / 12.0;
                let body = RigidBody::new(Coord::new_w(cgx, 0.0, 0.0, m), ixx, it, it);
                acc = Some(match acc {
                    Some(a) => a.add(&body),
                    None => body,
                });
            }
        }
        acc.unwrap_or(RigidBody::EMPTY)
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
        wind = sample_wind(&mut wind_model, state.t);
        let stage_mass = mass_properties_for_stages_active(rocket, &attached);
        let motor_mass = motor_mass_now(state.t, &stage_curves, &attached, &ignition_time);
        state.mass = (stage_mass.mass + motor_mass).max(1.0e-6);
        let thrust = thrust_now(state.t, &stage_curves, &attached, &ignition_time);
        let (cd_now, _, _, _, _, _) = aero_at(&state, &aero_rocket, &atmosphere, wind, thrust);

        // Java BasicLandingStepper.computeCD instantly switches to the
        // parachute's Cd·A_canopy / refArea on deployment — no opening
        // shock ramp.  Match that behaviour.
        let _ = deploy_time;
        // A recovery device (parachute) or a tumbling no-recovery descent
        // both replace the normal aero with a high-drag Cd·A.
        let recovery_active = deployed || tumbling;
        let recovery_area = if deployed {
            chute_drag_factor
        } else if tumbling {
            tumble_area
        } else {
            area_ref
        };
        let active_cd = if recovery_active { 0.0 } else { cd_now };
        let active_area = if recovery_active { recovery_area } else { area_ref };

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
            cd: if recovery_active { 1.0 } else { active_cd },
            area_ref: if recovery_active { active_area } else { area_ref },
            mass_dot: &mass_dot_fn,
            cn_alpha: if recovery_active { 0.0 } else { cn_alpha_now },
            reference_length: aero0.reference_length,
            cp_axial: cp_now,
            cg_axial: total_cg,
            moment_of_inertia_rot: {
                let s_rb = RigidBody::new(
                    Coord::new_w(stage_mass.cg_axial, 0.0, 0.0, stage_mass.mass),
                    stage_mass.i_long,
                    stage_mass.i_rot,
                    stage_mass.i_rot,
                );
                let m_rb = motor_rigid_body(
                    state.t, &stage_curves, &attached, &ignition_time, &motor_positions,
                );
                let rb = if m_rb.mass() > 1e-9 { s_rb.add(&m_rb) } else { s_rb };
                rb.iyy.max(1e-9)
            },
            moment_of_inertia_long: {
                let s_rb = RigidBody::new(
                    Coord::new_w(stage_mass.cg_axial, 0.0, 0.0, stage_mass.mass),
                    stage_mass.i_long,
                    stage_mass.i_rot,
                    stage_mass.i_rot,
                );
                let m_rb = motor_rigid_body(
                    state.t, &stage_curves, &attached, &ignition_time, &motor_positions,
                );
                let rb = if m_rb.mass() > 1e-9 { s_rb.add(&m_rb) } else { s_rb };
                rb.ixx.max(1e-9)
            },
            body_lift_planform_term: if recovery_active { 0.0 } else { body_lift.planform_term },
            body_lift_cp: body_lift.planform_cp,
            pitch_damping_mul: if recovery_active { 0.0 } else {
                crate::aero::pitch_damping_coefficient(&aero_rocket, total_cg)
            },
            gravity_model: opts.gravity_model,
            geodetic: opts.geodetic,
            launch_site: opts.launch_site(),
            launch_altitude: opts.launch_altitude,
            roll_forcing: roll_forcing_c,
            roll_damp_coeff: roll_damp_c,
            pyr_seed: 0x23E3_A01F,
            recovery: recovery_active,
        };

        // ---- Adaptive timestep (Java RK4SimulationStepper) ----
        // dt = min of: base step, angle-step limit, pitch/yaw accel limit,
        // 1.5×previous, event-proximity clamp; floored at user_dt/20.
        {
            let base = if on_rail {
                (user_dt / 5.0).max(MIN_TIME_STEP)
            } else {
                user_dt.max(MIN_TIME_STEP)
            };
            // dt[2]: max angle step / lateral pitch rate.
            let lateral_pitch_rate =
                (state.angular.y * state.angular.y + state.angular.z * state.angular.z).sqrt();
            let dt_angle = if lateral_pitch_rate > 1e-6 {
                MAX_ANGLE_STEP / lateral_pitch_rate
            } else {
                f64::MAX
            };
            // dt[5]: max pitch/yaw angular-velocity change.  Estimate the
            // rotational acceleration from one probe deriv.
            let probe = sampler.deriv(&state);
            let rot_acc_xy = probe.d_angular.y.abs().max(probe.d_angular.z.abs());
            let dt_rot = if rot_acc_xy > 1e-6 {
                MAX_PITCH_YAW_CHANGE / rot_acc_xy
            } else {
                f64::MAX
            };
            // dt[3]: max roll-step angle / |rollRate|.
            let roll_rate = state.angular.x.abs();
            let dt_roll = if roll_rate > 1e-6 {
                MAX_ROLL_STEP_ANGLE / roll_rate
            } else {
                f64::MAX
            };
            // dt[4]: max roll-rate change / |roll angular accel|.
            let roll_acc = probe.d_angular.x.abs();
            let dt_roll_rate = if roll_acc > 1e-6 {
                MAX_ROLL_RATE_CHANGE / roll_acc
            } else {
                f64::MAX
            };
            // dt[6]: 1/10 of the launch-rod traversal time while on the rod.
            let v_mag = state.vel.norm();
            let dt_rod = if on_rail && v_mag > 1e-6 {
                opts.launch_rod_length / v_mag / 10.0
            } else {
                f64::MAX
            };
            // dt[7]: at most 1.5× the previous step.
            let dt_growth = 1.5 * dt;
            // Event-proximity clamp: land exactly on the next scheduled
            // discrete event (burnout / ignition).  Apogee is detected
            // post-step via bisection below.
            let mut max_to_event = f64::MAX;
            for i in 0..n {
                if attached[i] {
                    if let (Some((curve, _)), Some(t0)) =
                        (stage_curves[i].as_ref(), ignition_time[i])
                    {
                        let bt = t0 + curve.burn_time();
                        if bt > state.t {
                            max_to_event = max_to_event.min(bt - state.t);
                        }
                    }
                }
            }
            // dt[8]: recovery-phase drag stability. A deployed parachute /
            // tumble adds a stiff quadratic drag (½ρ·Cd·A·v²); with a fixed
            // step the explicit RK4 over-shoots and the v² term feeds back
            // into a runaway (velocity → 1e4+ m/s). The ascent has rate
            // limits that keep it stable, but during descent the angular
            // rates are ~0 so nothing shrinks dt. Bound the per-step
            // velocity change from the (thrust-free) acceleration to a
            // fraction of the current speed so it converges to terminal
            // velocity instead. Only active under recovery, so the tuned
            // ascent trajectory is untouched.
            let dt_drag = if recovery_active {
                let acc_mag = probe.d_vel.norm();
                if acc_mag > 1e-9 {
                    0.20 * state.vel.norm().max(0.5) / acc_mag
                } else {
                    f64::MAX
                }
            } else {
                f64::MAX
            };
            let min_dt = (user_dt / 20.0).max(MIN_TIME_STEP);
            let mut chosen = base
                .min(dt_angle)
                .min(dt_rot)
                .min(dt_roll)
                .min(dt_roll_rate)
                .min(dt_rod)
                .min(dt_growth)
                .min(dt_drag)
                .min(max_to_event);
            if (max_to_event - chosen).abs() < min_dt && max_to_event < f64::MAX {
                chosen = max_to_event;
            }
            dt = chosen.max(min_dt);
        }

        let next = rk4_step(&state, dt, &sampler);
        let mut next = State { mass: next.mass.max(1.0e-6), ..next };

        // Range / NaN guard — Java RK4SimulationStepper throws
        // SimulationCalculationException if values run away or go NaN; we
        // end the trajectory cleanly at the last good state instead.
        if !next.pos.iter().all(|v| v.is_finite())
            || !next.vel.iter().all(|v| v.is_finite())
            || next.vel.norm_squared() > 1.0e18
            || next.pos.norm_squared() > 1.0e18
        {
            break;
        }

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

        // Apogee detection with linear event-time interpolation. Vertical
        // velocity crosses zero from + to − within this step; the exact
        // apogee time is found by linear interpolation between the
        // step-start vz (prev_vz) and step-end vz (next.vel.z), matching
        // Java's within-step event bisection (to first order).
        if apogee_time < 0.0 && prev_vz > 0.0 && next.vel.z <= 0.0 {
            let denom = prev_vz - next.vel.z;
            let frac = if denom.abs() > 1e-12 { (prev_vz / denom).clamp(0.0, 1.0) } else { 0.0 };
            let t_apogee = state.t + dt * frac;
            apogee_time = t_apogee;
            result.events.push((t_apogee, "APOGEE".to_string()));
        }

        // Recovery deployment per each device's DeploymentConfiguration
        // (apogee / altitude / ejection-charge / launch + deploy delay),
        // replacing the old hardwired apogee→parachute behaviour.
        if !deployed && parachute_count(rocket) > 0 {
            let agl = next.pos.z - opts.launch_altitude;
            let descending = next.vel.z <= 0.0;
            let mut ejection_time = -1.0_f64;
            for i in 0..n {
                if let Some(bt) = burnout_time[i] {
                    ejection_time = ejection_time
                        .max(bt + stage_ejection_delay.get(i).copied().unwrap_or(0.0));
                }
            }
            if let Some(t_dep) =
                recovery_deploy_time(rocket, apogee_time, ejection_time, agl, descending, next.t)
            {
                if next.t >= t_dep {
                    deployed = true;
                    deploy_time = t_dep;
                    result
                        .events
                        .push((t_dep, "RECOVERY_DEVICE_DEPLOYMENT".to_string()));
                }
            }
        }
        // No recovery device will ever deploy → the rocket tumbles down
        // (BasicTumbleStepper), not glide stably.
        if !deployed && !tumbling && apogee_time >= 0.0 && next.vel.z <= 0.0 {
            use opsrocket_core::component::DeployEvent;
            let all_never = rocket
                .iter_components()
                .filter_map(|c| match c {
                    Component::Parachute(p) => Some(p),
                    _ => None,
                })
                .all(|p| matches!(p.deploy_event, DeployEvent::Never));
            if (parachute_count(rocket) == 0 || all_never) && tumble_area > 1e-9 {
                tumbling = true;
                result.events.push((next.t, "TUMBLE".to_string()));
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
        // Record a data row roughly every `user_dt` of sim time, so the
        // output density is independent of the adaptive integration step.
        _steps_since_print += 1;
        let record_interval = user_dt.max(0.02);
        if state.t - (result.rows.last().map(|r| r[0]).unwrap_or(0.0)) >= record_interval {
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
            _steps_since_print = 0;
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
    let (roll_forcing_c, roll_damp_c) = crate::aero::fin_roll_coeffs(rocket);
    let atmosphere = opts.atmosphere();
    let pitch_rad = opts.launch_pitch_deg.to_radians();
    let mut state = State::at_rest_az(opts.launch_altitude, initial_mass.max(0.001), pitch_rad, opts.launch_azimuth_rad);

    // Faithful pink-noise turbulent wind (PinkNoiseWindModel). OpenRocket
    // returns the air-velocity vector and computes airspeed = vel + wind;
    // opsrocket uses v_rel = vel − wind, so we negate OR's vector.
    let mut wind_model = opsrocket_core::wind::PinkNoiseWindModel::new(opts.wind_seed);
    wind_model.set_average(opts.wind_average);
    wind_model.set_direction(opts.wind_direction);
    wind_model.set_turbulence_intensity(opts.wind_turbulence);
    fn sample_wind(wm: &mut opsrocket_core::wind::PinkNoiseWindModel, t: f64) -> Vec3 {
        let (wx, wy, _) = wm.wind_velocity(t.max(0.0));
        Vec3::new(-wx, -wy, 0.0)
    }
    let wind = sample_wind(&mut wind_model, 0.0);

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
            pitch_damping_mul: 0.0,
            gravity_model: opts.gravity_model,
            geodetic: opts.geodetic,
            launch_site: opts.launch_site(),
            launch_altitude: opts.launch_altitude,
            roll_forcing: roll_forcing_c,
            roll_damp_coeff: roll_damp_c,
            pyr_seed: 0x23E3_A01F,
            recovery: deployed,
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
    // Java Parachute.DEFAULT_CD = 0.8; Parachute.getComponentCD always
    // returns the stored `cd` value (no scallop correction).  Match Java
    // exactly: Cd·A summed over all parachutes.
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

/// Sampo tumble-drag "Cd·A" — `BasicTumbleStepper.computeCD` numerator
/// `1.42·ΣaFins + 0.56·aBt` (so the drag force is this × q, matching how
/// the parachute path uses a Cd·A factor). Used when a rocket with no
/// recovery device tumbles down instead of gliding stably.
fn tumble_drag_area(rocket: &Rocket) -> f64 {
    const C_D_FIN: f64 = 1.42;
    const C_D_BT: f64 = 0.56;
    const FIN_EFF: [f64; 8] = [0.0, 0.5, 1.0, 1.41, 1.81, 1.73, 1.90, 1.85];
    let mut a_fins = 0.0_f64;
    let mut a_bt = 0.0_f64;
    for c in rocket.iter_components() {
        match c {
            Component::FinSet(f) => {
                let area = 0.5 * (f.root_chord + f.tip_chord) * f.height;
                let fc = (f.fin_count as usize).min(FIN_EFF.len() - 1);
                // area·finEff[N]/N × N fins = area·finEff[N].
                a_fins += area * FIN_EFF[fc];
            }
            Component::BodyTube(t) => {
                a_bt += 2.0 * t.radius.unwrap_or(0.0) * t.length;
            }
            Component::NoseCone(n) => {
                a_bt += opsrocket_core::profile::shape_integrals(
                    n.shape, n.shape_parameter, n.length, 0.0, n.aft_radius,
                )
                .planform_area;
            }
            Component::Transition(tr) => {
                a_bt += opsrocket_core::profile::shape_integrals(
                    tr.shape, tr.shape_parameter, tr.length, tr.fore_radius, tr.aft_radius,
                )
                .planform_area;
            }
            _ => {}
        }
    }
    C_D_FIN * a_fins + C_D_BT * a_bt
}

/// Earliest absolute deployment time over all recovery devices, per each
/// device's `DeploymentConfiguration` (faithful to OpenRocket's
/// `DeployEvent` + `deployDelay`, incl. ejection-charge timing). Returns
/// `None` if no device can deploy given the triggers known so far.
///
/// - `apogee_time`  : >=0 once apogee has occurred, else <0
/// - `ejection_time`: latest motor burnout + ejection-charge delay (or <0)
/// - `agl`          : current altitude above the launch site (m)
/// - `descending`   : true if vertical velocity ≤ 0
#[allow(clippy::too_many_arguments)]
fn recovery_deploy_time(
    rocket: &Rocket,
    apogee_time: f64,
    ejection_time: f64,
    agl: f64,
    descending: bool,
    now: f64,
) -> Option<f64> {
    use opsrocket_core::component::DeployEvent;
    let mut best: Option<f64> = None;
    for c in rocket.iter_components() {
        if let Component::Parachute(p) = c {
            let cand = match p.deploy_event {
                DeployEvent::Launch => Some(p.deploy_delay),
                DeployEvent::Apogee => {
                    if apogee_time >= 0.0 {
                        Some(apogee_time + p.deploy_delay)
                    } else {
                        None
                    }
                }
                DeployEvent::Ejection => {
                    if ejection_time >= 0.0 {
                        Some(ejection_time + p.deploy_delay.max(0.001))
                    } else {
                        None
                    }
                }
                DeployEvent::Altitude => {
                    // Activates when descending through deployAltitude.
                    if descending && agl <= p.deploy_altitude {
                        Some(now + p.deploy_delay.max(0.001))
                    } else {
                        None
                    }
                }
                // Lower-stage separation handled by the staging path; Never
                // never deploys.
                DeployEvent::LowerStageSeparation | DeployEvent::Never => None,
            };
            if let Some(t) = cand {
                best = Some(best.map_or(t, |b: f64| b.min(t)));
            }
        }
    }
    best
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
    // Java reports world-frame velocity in the "Total velocity" column,
    // not the wind-relative magnitude. The wind-relative `speed` is only
    // used internally for q and Mach computations.
    let total_velocity = state.vel.norm();
    let vertical_velocity = state.vel.z;
    let lateral_velocity = (state.vel.x * state.vel.x + state.vel.y * state.vel.y).sqrt();
    // Acceleration columns: finite-difference of the velocity components
    // against the previously emitted row (same convention as the
    // max_acceleration scalar). First row has no predecessor → 0.
    let (vertical_acc, total_acc, lateral_acc) = match result.rows.last() {
        Some(p) => {
            let dtp = state.t - p[0];
            if dtp > 1e-9 {
                (
                    (vertical_velocity - p[3]) / dtp,
                    (total_velocity - p[4]) / dtp,
                    (lateral_velocity - p[11]) / dtp,
                )
            } else {
                (0.0, 0.0, 0.0)
            }
        }
        None => (0.0, 0.0, 0.0),
    };
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
            decals: Vec::new(),
        };
        // No simulation to run, so we expect NoSuchSimulation rather than EmptyRocket.
        assert!(simulate(&doc, "x").is_err());
    }
}
