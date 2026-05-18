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
        Self::at_rest_az(launch_altitude, mass, pitch_rad, 0.0)
    }

    /// As [`at_rest`] but with a launch-rod azimuth (radians, clockwise from
    /// north / +Y). The rod is tilted `pitch_rad` from vertical, then rotated
    /// to the requested azimuth about world +Z.
    pub fn at_rest_az(launch_altitude: f64, mass: f64, pitch_rad: f64, azimuth_rad: f64) -> Self {
        // Convention: body Z-axis is the rocket's longitudinal "forward" axis.
        // At rest with pitch=0, body-Z aligns with world +Z (up). A non-zero
        // launch pitch tilts the rocket about world +X (east axis); the
        // azimuth then spins that tilt direction about world +Z.
        let tilt = UnitQuaternion::from_axis_angle(&Vector3::x_axis(), pitch_rad);
        let yaw = UnitQuaternion::from_axis_angle(&Vector3::z_axis(), azimuth_rad);
        let orientation = yaw * tilt;
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
///
/// The aero block carries both the slender-body Barrowman result (linear in
/// α) AND the Galejs body-lift "planform" term (sin²α). At zero AOA only
/// the slender part contributes; off-axis flight pulls in body lift, which
/// adds normal force, lift, and α-induced drag in the dynamics.
pub struct ForceSampler<'a> {
    pub atmosphere: &'a dyn AtmosphereModel,
    /// Wind velocity vector (m/s) in world frame.
    pub wind: Vec3,
    /// Function returning thrust magnitude (N) along the body axis.
    pub thrust: &'a dyn Fn(f64) -> f64,
    /// Axial drag coefficient (referenced to area_ref), excluding any
    /// AOA-induced contribution which is added below.
    pub cd: f64,
    /// Reference area (m²).
    pub area_ref: f64,
    /// Mass derivative (kg/s, negative while motor burns).
    pub mass_dot: &'a dyn Fn(f64) -> f64,
    /// CN_alpha (slender-body slope at α=0, 1/rad, referenced to area_ref).
    pub cn_alpha: f64,
    /// Reference length used for the moment arm (m).
    pub reference_length: f64,
    /// Slender-body CP from rocket origin (m).
    pub cp_axial: f64,
    /// Axial offset of CG from rocket origin (m).
    pub cg_axial: f64,
    /// Transverse (pitching) moment of inertia (kg·m²).
    pub moment_of_inertia_rot: f64,
    /// Longitudinal (roll) moment of inertia (kg·m²).
    pub moment_of_inertia_long: f64,
    /// Body-lift Galejs "planform term": `K · ΣA_planform / A_ref` (per
    /// component summed), constant for the rocket geometry.  Multiplied by
    /// `sin²(α)` to get the body-lift contribution to CN.
    pub body_lift_planform_term: f64,
    /// Axial CP of the body-lift contribution (m, planform centroid
    /// weighted by planform area across all components).
    pub body_lift_cp: f64,
    /// Java pitch-damping multiplier (constant per rocket geometry).
    /// Used as `Cm_damp = 3 · mul · (ω/V)²`.
    pub pitch_damping_mul: f64,
    /// Gravity model (OpenRocket default WGS).
    pub gravity_model: opsrocket_core::gravity::GravityModel,
    /// Geodetic computation strategy (for gravity latitude + Coriolis).
    pub geodetic: opsrocket_core::gravity::GeodeticComputation,
    /// Launch-site world coordinate.
    pub launch_site: opsrocket_core::gravity::WorldCoordinate,
    /// Launch-site geometric altitude (m MSL); `State.pos.z` is absolute, so
    /// the AGL delta fed to the geodetic model is `pos.z - launch_altitude`.
    pub launch_altitude: f64,
    /// Roll-forcing coefficient `Croll` from fin cant (per rad of cant,
    /// already includes the cant): `CrollForce = (macSpan+r)·cna1·(1+τ)·δ
    /// /refLen` summed over fin sets. Multiplied by q·S·L for the roll
    /// moment.
    pub roll_forcing: f64,
    /// Roll-damping coefficient: `CrollDamp = Σ 2π·rollRate·rollSum /
    /// (S·L·V·β)` ≈ `roll_damp_coeff · (rollRate/V)`; we store the
    /// `roll_damp_coeff` (per fin geometry) and multiply by rollRate/V.
    pub roll_damp_coeff: f64,
    /// PITCH_YAW_RANDOM symmetry-breaking seed (per simulation).
    pub pyr_seed: u64,
    /// Recovery descent (parachute deployed / tumbling). When set, the
    /// drag is a pure velocity-opposing force using `cd`·`area_ref`
    /// directly — the AOA axial-drag multiplier (which reverses sign for
    /// AOA > 90°, correct for a rigid body flying backward but catastrophic
    /// for a chute whose drag must always oppose motion) is bypassed.
    /// Mirrors OpenRocket switching to BasicLandingStepper.
    pub recovery: bool,
}

/// Deterministic ±`PITCH_YAW_RANDOM` perturbation as a function of the
/// per-run seed and the (quantised) simulation time. OpenRocket draws this
/// from a seeded `java.util.Random`; we use a deterministic hash so the
/// trajectory is reproducible while still breaking perfect axial symmetry.
fn pyr(seed: u64, t: f64, axis: u64) -> f64 {
    // OpenRocket: ± PITCH_YAW_RANDOM, value = 2·(rand−0.5)·PITCH_YAW_RANDOM.
    const PITCH_YAW_RANDOM: f64 = 0.0005;
    let mut x = seed
        ^ (t * 1.0e6) as i64 as u64
        ^ axis.wrapping_mul(0x9E37_79B9_7F4A_7C15);
    // splitmix64
    x = x.wrapping_add(0x9E37_79B9_7F4A_7C15);
    let mut z = x;
    z = (z ^ (z >> 30)).wrapping_mul(0xBF58_476D_1CE4_E5B9);
    z = (z ^ (z >> 27)).wrapping_mul(0x94D0_49BB_1331_11EB);
    z ^= z >> 31;
    let r = (z >> 11) as f64 / (1u64 << 53) as f64; // [0,1)
    PITCH_YAW_RANDOM * 2.0 * (r - 0.5)
}

impl ForceSampler<'_> {
    /// Compute the time-derivative of the state.
    pub fn deriv(&self, s: &State) -> StateDeriv {
        let atmos = self.atmosphere.conditions(s.pos.z.max(0.0));
        let v_rel = s.vel - self.wind;
        let v_rel_mag = v_rel.norm();
        let q = 0.5 * atmos.density * v_rel_mag * v_rel_mag;

        // ---- AOA between body axis and relative wind ----
        let body_axis = s.body_axis_world();
        let (alpha, perp_hat) = if v_rel_mag > 1.0e-6 {
            let v_hat = v_rel / v_rel_mag;
            let cos_alpha = body_axis.dot(&v_hat).clamp(-1.0, 1.0);
            let alpha = cos_alpha.acos();
            let perp = v_hat - cos_alpha * body_axis;
            let perp_norm = perp.norm();
            let perp_hat = if perp_norm > 1e-9 { perp / perp_norm } else { Vector3::zeros() };
            (alpha, perp_hat)
        } else {
            (0.0, Vector3::zeros())
        };

        // ---- Axial drag (zero-AOA) + AOA-induced drag ----
        // Java's BarrowmanCalculator decomposes total drag into:
        //   D_axial = Cd · q · S_ref           (the "Drag coefficient" column)
        //   D_lift  = CN(α) · sin(α) · q · S_ref  (lift-induced axial drag)
        // The induced piece keeps the rocket from going too high when it
        // weathercocks; this is the key term that closes the apogee gap.
        let cn_slender = self.cn_alpha * alpha;
        let cn_lift = self.body_lift_planform_term * alpha.sin() * alpha.sin();
        let cn_total = cn_slender + cn_lift;
        // OpenRocket force model: the axial drag is `CDaxial · q · S` where
        // CDaxial = mul(α) · CD (BarrowmanDragCalculator.calculateAxialCD).
        // The AOA-induced axial component is carried by the normal force
        // CN projected onto the velocity, NOT a separate term — so there is
        // no extra `CN·sinα` drag here (that would double-count).
        let cdaxial = if self.recovery {
            // Parachute / tumble: drag opposes velocity regardless of body
            // attitude. Skip the AOA axial multiplier (it returns a
            // negative Cd for AOA > 90°, which would accelerate the fall).
            self.cd
        } else {
            crate::aero_drag::axial_cd(alpha, self.cd)
        };
        let axial_drag_mag = q * cdaxial * self.area_ref;
        let drag_world = if v_rel_mag > 1.0e-6 {
            -axial_drag_mag * v_rel / v_rel_mag
        } else {
            Vector3::zeros()
        };

        // ---- Normal (lift) force perpendicular to v_rel ----
        // Aerospace convention: at positive AOA the normal force at the CP
        // points OPPOSITE to the velocity-perpendicular component. This is
        // the direction that, applied at a CP aft of CG, produces a
        // RESTORING moment (rotates the nose back toward the relative wind).
        let lift_world = -q * cn_total * self.area_ref * perp_hat;

        // ---- Thrust ----
        let thrust_mag = (self.thrust)(s.t);
        let thrust_world = thrust_mag * body_axis;

        // ---- World position → gravity + Coriolis ----
        // `add_coordinate(launchSite, rocketPosition)` where rocketPosition is
        // the AGL-relative cartesian (x east, y north, z up).
        let rel = Vec3::new(s.pos.x, s.pos.y, s.pos.z - self.launch_altitude);
        let world = self.geodetic.add_coordinate(&self.launch_site, rel);
        let g = self.gravity_model.gravity(&world);
        let coriolis = self.geodetic.coriolis_acceleration(&world, s.vel);

        let force = thrust_world + drag_world + lift_world;
        let acc = force / s.mass.max(1e-6) + Vector3::new(0.0, 0.0, -g) + coriolis;

        // ---- Rotational dynamics ----
        // Slender-body CP and body-lift CP differ — combine their moments
        // separately so each contribution acts at its physical centre.
        //
        // The body axis points from CG forward (toward the nose). The
        // moment arm from CG to a CP located at distance `arm` AFT of CG
        // is therefore `-arm · body_axis` (pointing aft, opposite to the
        // forward-pointing body axis). Note `arm = CP_x − CG_x > 0` when
        // CP is aft of CG: the conventional sign for a stable rocket.
        let mut d_angular = Vector3::zeros();
        let i_rot = self.moment_of_inertia_rot.max(1e-9);
        let i_long = self.moment_of_inertia_long.max(1e-9);
        // OpenRocket always integrates rotation once the rod is cleared —
        // no v>1 / α>1e-6 gate (that gate froze low-speed attitude).
        if v_rel_mag > 1e-3 && perp_hat.norm_squared() > 1e-12 {
            // Force = −CN·q·S·perp_hat (Barrowman convention; see notes
            // above on lift_world).
            let n_slender = -q * cn_slender * self.area_ref;
            let arm_slender = self.cp_axial - self.cg_axial;
            let r_slender = -arm_slender * body_axis;
            let torque_slender = r_slender.cross(&(n_slender * perp_hat));
            let n_lift = -q * cn_lift * self.area_ref;
            let arm_lift = self.body_lift_cp - self.cg_axial;
            let r_lift = -arm_lift * body_axis;
            let torque_lift = r_lift.cross(&(n_lift * perp_hat));
            let torque_world = torque_slender + torque_lift;
            let torque_body = inverse_world_to_body(s) * torque_world;
            d_angular = Vector3::new(0.0, torque_body.y / i_rot, torque_body.z / i_rot);
            // Pitch damping: stand-in for Barrowman's pitch-damping moment.
            // The proper formula is C_mq · q · S · L · (ω L / V), where
            // C_mq is the pitch-damping derivative (typically −5 to −10
            // for a Barrowman-stable rocket). We use a conservative
            // estimate proportional to ω, scaled so the time-constant is
            // a fraction of a second — slow enough to preserve the natural
            // pitch oscillations Java exhibits.
            // Java BarrowmanStabilityCalculator.calculateDampingMoments:
            //   Cm_damp_magnitude = min(3 · mul · (ω/V)², |Cm_total|)
            //   Cm -= sign(ω) · Cm_damp_magnitude
            //
            // Translated to dynamics: damping torque about the transverse
            // body axes is Cm_damp · q · S · L, opposite to ω. The cap
            // ensures damping never reverses the moment, which matters
            // when ω is small.
            if v_rel_mag > 1e-3 {
                let q_s_l = q * self.area_ref * self.reference_length;
                let total_cm_mag = (cn_total * (self.cp_axial - self.cg_axial)
                    / self.reference_length)
                    .abs();
                let omega_y = s.angular.y;
                let omega_z = s.angular.z;
                let damp_y_mag =
                    (3.0 * self.pitch_damping_mul * (omega_y / v_rel_mag).powi(2)).min(total_cm_mag);
                let damp_z_mag =
                    (3.0 * self.pitch_damping_mul * (omega_z / v_rel_mag).powi(2)).min(total_cm_mag);
                let damp_y = -omega_y.signum() * damp_y_mag * q_s_l / i_rot;
                let damp_z = -omega_z.signum() * damp_z_mag * q_s_l / i_rot;
                d_angular += Vector3::new(0.0, damp_y, damp_z);
            }
        }

        // ---- Roll dynamics (was fully stubbed) ----
        // OpenRocket: momZ = Croll·q·S·L; Croll = CrollForce − CrollDamp,
        // CrollForce from fin cant, CrollDamp ∝ rollRate/V. Integrated about
        // the body roll (x) axis using the longitudinal inertia.
        // Roll aero is only meaningful while there is appreciable airspeed;
        // the `/V` in CrollDamp is otherwise singular (OpenRocket bounds it
        // via the roll-rate timestep limiters dt[3]/dt[4]).
        if v_rel_mag > 1.0 {
            let q_s_l = q * self.area_ref * self.reference_length;
            let roll_rate = s.angular.x;
            let c_roll_damp = self.roll_damp_coeff * roll_rate / v_rel_mag;
            let c_roll = self.roll_forcing - c_roll_damp;
            d_angular.x += c_roll * q_s_l / i_long;
        }

        // ---- PITCH_YAW_RANDOM symmetry breaking ----
        // OpenRocket adds ±0.0005 to Cm and Cyaw every force evaluation so a
        // perfectly axial launch still develops realistic dispersion.
        if v_rel_mag > 1e-3 {
            let q_s_l = q * self.area_ref * self.reference_length;
            let dcm = pyr(self.pyr_seed, s.t, 1);
            let dcy = pyr(self.pyr_seed, s.t, 2);
            // Cm acts about body-y (pitch), Cyaw about body-z (yaw).
            d_angular.y += dcm * q_s_l / i_rot;
            d_angular.z += -dcy * q_s_l / i_rot;
        }

        // Quaternion derivative: dq/dt = 0.5 · q · ω_body
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
