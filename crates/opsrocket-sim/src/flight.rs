//! 6-DOF flight state and RK4 propagation.
//!
//! Port of `info.openrocket.core.simulation.RK4SimulationStepper`.
//!
//! The initial implementation is a vertical-flight / small-angle model:
//! a 3-DOF point-mass propagator with a rotational track of the pitch angle
//! from gravity-turn dynamics. This is sufficient for the canonical hobby
//! rocket examples whose Java reference output is dominated by axial dynamics.
//! True 6-DOF with quaternion orientation is staged for a follow-up.

use nalgebra::{Quaternion, UnitQuaternion, Vector3};
use opsrocket_core::atmosphere::{AtmosphereModel, ExtendedIsa};
use opsrocket_core::geom::Vec3;
use opsrocket_core::mathx::pow2;
use opsrocket_core::units::G0;

/// Instantaneous rocket state.
///
/// We carry the 6 degrees of freedom needed for a full attitude-aware
/// simulation: position, linear velocity, body-frame orientation (as a unit
/// quaternion), and body-axis angular velocity. The body convention follows
/// OpenRocket: +X is up the rocket's longitudinal axis (out the nose), +Y is
/// right, +Z is down (in body frame). World frame: +X east, +Y north, +Z up.
#[derive(Debug, Clone, Copy)]
pub struct State {
    pub t: f64,
    /// Position in world frame (m). +Z is up; X east, Y north.
    pub pos: Vec3,
    /// Velocity in world frame (m/s).
    pub vel: Vec3,
    /// Orientation: world-frame rotation that takes body-X to the rocket's
    /// pointing direction in the world.
    pub orientation: UnitQuaternion<f64>,
    /// Angular velocity in body frame (rad/s).  X = roll, Y = pitch, Z = yaw.
    pub angular: Vec3,
    /// Legacy pitch angle from vertical (rad).  Maintained for the simplified
    /// thrust-direction heuristic and for downstream tools that don't yet
    /// consume the quaternion.
    pub pitch: f64,
    /// Mass at this instant (kg).
    pub mass: f64,
}

impl State {
    pub fn at_rest(launch_altitude: f64, mass: f64, pitch_rad: f64) -> Self {
        // Convention: body Z-axis is the rocket's longitudinal "forward" axis.
        // At rest with pitch=0, body-Z aligns with world +Z (up). A non-zero
        // launch pitch tilts the rocket about world +X (east axis).
        let orientation = UnitQuaternion::from_axis_angle(
            &Vector3::x_axis(),
            pitch_rad,
        );
        Self {
            t: 0.0,
            pos: Vector3::new(0.0, 0.0, launch_altitude),
            vel: Vector3::zeros(),
            orientation,
            angular: Vector3::zeros(),
            pitch: pitch_rad,
            mass,
        }
    }

    /// World-frame direction of the rocket's longitudinal "forward" axis
    /// (out the nose).  With body-Z = forward and identity orientation,
    /// this is world +Z (straight up).
    pub fn body_axis_world(&self) -> Vec3 {
        self.orientation * Vector3::new(0.0, 0.0, 1.0)
    }
}

/// External forces & masses sampled at a single time-step.
pub struct ForceSampler<'a> {
    pub atmosphere: &'a dyn AtmosphereModel,
    /// Wind velocity vector (m/s) in world frame.
    pub wind: Vec3,
    /// Function returning thrust magnitude (N) along the body axis.
    pub thrust: &'a dyn Fn(f64) -> f64,
    /// Drag coefficient (assumed constant per-step here).
    pub cd: f64,
    /// Reference area (m²).
    pub area_ref: f64,
    /// Mass derivative (kg/s, negative while motor burns).
    pub mass_dot: &'a dyn Fn(f64) -> f64,
    /// CN_alpha (normal-force coefficient slope, 1/rad).  Used to produce
    /// a pitching moment when angle of attack > 0.  If zero, the rocket is
    /// effectively neutral and angular dynamics decay only through damping.
    pub cn_alpha: f64,
    /// Reference length used for the moment arm (m).
    pub reference_length: f64,
    /// Axial offset of CP from rocket origin (m).
    pub cp_axial: f64,
    /// Axial offset of CG from rocket origin (m).
    pub cg_axial: f64,
    /// Transverse (pitching) moment of inertia (kg·m²).
    pub moment_of_inertia_rot: f64,
    /// Longitudinal (roll) moment of inertia (kg·m²).
    pub moment_of_inertia_long: f64,
}

impl ForceSampler<'_> {
    /// Compute the time-derivative of the state.
    pub fn deriv(&self, s: &State) -> StateDeriv {
        let atmos = self.atmosphere.conditions(s.pos.z.max(0.0));
        let v_rel = s.vel - self.wind;
        let v_rel_mag = v_rel.norm();
        let q = 0.5 * atmos.density * v_rel_mag * v_rel_mag;
        let drag_mag = q * self.cd * self.area_ref;
        let drag_world = if v_rel_mag > 1.0e-6 { -drag_mag * v_rel / v_rel_mag } else { Vector3::zeros() };

        let thrust_mag = (self.thrust)(s.t);
        // Body axis: prefer the explicit orientation quaternion when the
        // rocket has been integrated for at least one step. At t = 0 with
        // angular velocity zero, the quaternion already captures the launch
        // pitch.
        let body_axis = s.body_axis_world();
        let thrust_world = thrust_mag * body_axis;

        let gravity = Vector3::new(0.0, 0.0, -G0);
        let force = thrust_world + drag_world + gravity * s.mass;
        let acc = force / s.mass.max(1e-6);

        // ----- Rotational dynamics -----
        // Compute the angle of attack between the body axis and the relative
        // wind, plus the lift-equivalent force (CN_alpha * α * q * S_ref)
        // applied at the CP. The moment arm is (CP - CG) along body axis.
        let mut d_angular = Vector3::zeros();
        if v_rel_mag > 1.0 && self.cn_alpha.abs() > 1e-9 {
            let v_hat = v_rel / v_rel_mag;
            let cos_alpha = body_axis.dot(&v_hat).clamp(-1.0, 1.0);
            let alpha = cos_alpha.acos(); // in [0, π]
            if alpha > 1e-6 {
                // Component of v_rel perpendicular to body_axis (in world frame).
                let perp = v_hat - cos_alpha * body_axis;
                let perp_norm = perp.norm();
                if perp_norm > 1e-9 {
                    let perp_hat = perp / perp_norm;
                    // Normal force magnitude (Barrowman, small-α): CN_alpha * α
                    let cn = self.cn_alpha * alpha;
                    let n_force_mag = cn * q * self.area_ref;
                    // Moment arm CP-CG: positive (CP behind CG) is stabilising.
                    let arm = self.cp_axial - self.cg_axial;
                    // Torque vector (world frame): r × F. r points from CG
                    // backward along body axis by `arm` (negative direction).
                    let r = -arm * body_axis;
                    let force_perp = n_force_mag * perp_hat;
                    let torque_world = r.cross(&force_perp);
                    // Convert to body frame
                    let torque_body = inverse_world_to_body(s) * torque_world;
                    let i_rot = self.moment_of_inertia_rot.max(1e-9);
                    // Apply pitch / yaw acceleration, ignore roll (axial-
                    // symmetric rocket, no roll torque from CN_alpha).
                    d_angular = Vector3::new(0.0, torque_body.y / i_rot, torque_body.z / i_rot);
                    // Pitch damping: simple linear damping proportional to
                    // ω; the damping coefficient is taken from a quarter
                    // of the normal-force slope as a stand-in for the
                    // proper Barrowman damping moment.
                    let damping = 0.25 * self.cn_alpha * q * self.area_ref * self.reference_length
                        / i_rot;
                    d_angular -= damping * Vector3::new(0.0, s.angular.y, s.angular.z);
                }
            }
        }

        // Quaternion derivative: dq/dt = 0.5 * q * ω_body (quaternion)
        let omega_q = Quaternion::new(0.0, s.angular.x, s.angular.y, s.angular.z);
        let dq = 0.5 * s.orientation.quaternion() * omega_q;

        StateDeriv {
            d_pos: s.vel,
            d_vel: acc,
            d_pitch: 0.0,
            d_mass: (self.mass_dot)(s.t),
            d_angular,
            d_orientation: dq,
        }
    }
}

fn inverse_world_to_body(s: &State) -> nalgebra::Rotation3<f64> {
    s.orientation.inverse().to_rotation_matrix()
}

#[derive(Debug, Clone, Copy)]
pub struct StateDeriv {
    pub d_pos: Vec3,
    pub d_vel: Vec3,
    pub d_pitch: f64,
    pub d_mass: f64,
    pub d_angular: Vec3,
    pub d_orientation: Quaternion<f64>,
}

impl StateDeriv {
    pub fn scale(self, k: f64) -> Self {
        Self {
            d_pos: self.d_pos * k,
            d_vel: self.d_vel * k,
            d_pitch: self.d_pitch * k,
            d_mass: self.d_mass * k,
            d_angular: self.d_angular * k,
            d_orientation: self.d_orientation * k,
        }
    }
}

/// Classical RK4 step.
pub fn rk4_step(state: &State, dt: f64, sampler: &ForceSampler<'_>) -> State {
    let k1 = sampler.deriv(state);
    let s2 = step(state, &k1, 0.5 * dt);
    let k2 = sampler.deriv(&s2);
    let s3 = step(state, &k2, 0.5 * dt);
    let k3 = sampler.deriv(&s3);
    let s4 = step(state, &k3, dt);
    let k4 = sampler.deriv(&s4);

    let d_pos = (k1.d_pos + 2.0 * k2.d_pos + 2.0 * k3.d_pos + k4.d_pos) / 6.0;
    let d_vel = (k1.d_vel + 2.0 * k2.d_vel + 2.0 * k3.d_vel + k4.d_vel) / 6.0;
    let d_pitch = (k1.d_pitch + 2.0 * k2.d_pitch + 2.0 * k3.d_pitch + k4.d_pitch) / 6.0;
    let d_mass = (k1.d_mass + 2.0 * k2.d_mass + 2.0 * k3.d_mass + k4.d_mass) / 6.0;
    let d_ang = (k1.d_angular + 2.0 * k2.d_angular + 2.0 * k3.d_angular + k4.d_angular) / 6.0;
    let d_q = (k1.d_orientation + k2.d_orientation * 2.0 + k3.d_orientation * 2.0 + k4.d_orientation)
        * (1.0 / 6.0);

    let new_q_raw = state.orientation.quaternion() + dt * d_q;
    let new_q = UnitQuaternion::new_normalize(new_q_raw);

    State {
        t: state.t + dt,
        pos: state.pos + dt * d_pos,
        vel: state.vel + dt * d_vel,
        orientation: new_q,
        angular: state.angular + dt * d_ang,
        pitch: state.pitch + dt * d_pitch,
        mass: state.mass + dt * d_mass,
    }
}

fn step(state: &State, deriv: &StateDeriv, dt: f64) -> State {
    let new_q_raw = state.orientation.quaternion() + dt * deriv.d_orientation;
    let new_q = UnitQuaternion::new_normalize(new_q_raw);
    State {
        t: state.t + dt,
        pos: state.pos + dt * deriv.d_pos,
        vel: state.vel + dt * deriv.d_vel,
        orientation: new_q,
        angular: state.angular + dt * deriv.d_angular,
        pitch: state.pitch + dt * deriv.d_pitch,
        mass: state.mass + dt * deriv.d_mass,
    }
}

/// Default atmosphere model used when the simulation conditions don't specify
/// a custom sea-level point.
pub fn default_atmosphere() -> ExtendedIsa {
    ExtendedIsa::default()
}

// silence unused warnings for helpers exported for future use
#[allow(dead_code)]
fn _unused_pow2(x: f64) -> f64 {
    pow2(x)
}
