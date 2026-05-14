//! 6-DOF flight state and RK4 propagation.
//!
//! Port of `info.openrocket.core.simulation.RK4SimulationStepper`.
//!
//! The initial implementation is a vertical-flight / small-angle model:
//! a 3-DOF point-mass propagator with a rotational track of the pitch angle
//! from gravity-turn dynamics. This is sufficient for the canonical hobby
//! rocket examples whose Java reference output is dominated by axial dynamics.
//! True 6-DOF with quaternion orientation is staged for a follow-up.

use nalgebra::Vector3;
use opsrocket_core::atmosphere::{AtmosphereModel, ExtendedIsa};
use opsrocket_core::geom::Vec3;
use opsrocket_core::mathx::pow2;
use opsrocket_core::units::G0;

/// Instantaneous rocket state (3-DOF + pitch angle).
#[derive(Debug, Clone, Copy)]
pub struct State {
    pub t: f64,
    /// Position (m). +Z is up; X is downrange east, Y north.
    pub pos: Vec3,
    /// Velocity (m/s).
    pub vel: Vec3,
    /// Pitch angle from vertical (rad).
    pub pitch: f64,
    /// Mass at this instant (kg).
    pub mass: f64,
}

impl State {
    pub fn at_rest(launch_altitude: f64, mass: f64, pitch_rad: f64) -> Self {
        Self {
            t: 0.0,
            pos: Vector3::new(0.0, 0.0, launch_altitude),
            vel: Vector3::zeros(),
            pitch: pitch_rad,
            mass,
        }
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
}

impl ForceSampler<'_> {
    /// Compute the time-derivative of the state.
    pub fn deriv(&self, s: &State) -> StateDeriv {
        let atmos = self.atmosphere.conditions(s.pos.z.max(0.0));
        // Velocity relative to wind for drag
        let v_rel = s.vel - self.wind;
        let v_rel_mag = v_rel.norm();
        let q = 0.5 * atmos.density * v_rel_mag * v_rel_mag;
        let drag_mag = q * self.cd * self.area_ref;
        let drag = if v_rel_mag > 1.0e-6 { -drag_mag * v_rel / v_rel_mag } else { Vector3::zeros() };

        let thrust_mag = (self.thrust)(s.t);
        // Body axis: at launch, points along pitch direction (vertical with
        // pitch=0). Once the rocket has its own velocity (not just wind-
        // relative), we align with that velocity for a simple gravity-turn
        // model. The wind frame is only used for drag, never for thrust.
        let v_mag = s.vel.norm();
        let body_axis = if v_mag > 1.0 {
            s.vel / v_mag
        } else {
            Vector3::new(s.pitch.sin(), 0.0, s.pitch.cos())
        };
        let thrust = thrust_mag * body_axis;

        let gravity = Vector3::new(0.0, 0.0, -G0);
        let force = thrust + drag + gravity * s.mass;
        let acc = force / s.mass.max(1e-6);
        StateDeriv {
            d_pos: s.vel,
            d_vel: acc,
            d_pitch: 0.0, // simplified - aligned to velocity by construction
            d_mass: (self.mass_dot)(s.t),
        }
    }
}

#[derive(Debug, Clone, Copy)]
pub struct StateDeriv {
    pub d_pos: Vec3,
    pub d_vel: Vec3,
    pub d_pitch: f64,
    pub d_mass: f64,
}

impl StateDeriv {
    pub fn scale(self, k: f64) -> Self {
        Self {
            d_pos: self.d_pos * k,
            d_vel: self.d_vel * k,
            d_pitch: self.d_pitch * k,
            d_mass: self.d_mass * k,
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

    State {
        t: state.t + dt,
        pos: state.pos + dt * d_pos,
        vel: state.vel + dt * d_vel,
        pitch: state.pitch + dt * d_pitch,
        mass: state.mass + dt * d_mass,
    }
}

fn step(state: &State, deriv: &StateDeriv, dt: f64) -> State {
    State {
        t: state.t + dt,
        pos: state.pos + dt * deriv.d_pos,
        vel: state.vel + dt * deriv.d_vel,
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
