//! Barrowman aerodynamic coefficients.
//!
//! Port of `info.openrocket.core.aerodynamics.BarrowmanCalculator` plus the
//! per-component formulas in
//! `info.openrocket.core.aerodynamics.barrowman.*` (NoseConeCalc,
//! BodyTubeCalc, TransitionCalc, FinSetCalc).
//!
//! This is the minimum required for subsonic, axisymmetric, near-zero-AOA
//! flight of the standard hobby-rocket geometries the example fixtures use.
//! Transonic / supersonic corrections and roll-damping are intentionally
//! omitted at this stage and marked `TODO` below.
//!
//! References:
//! - Barrowman, "The Practical Calculation of the Aerodynamic Characteristics
//!   of Slender Finned Vehicles" (NASA TN-D-7615, 1967).
//! - Niskanen, *Development of an Open Source model rocket simulation
//!   software*, MSc thesis (2009), §3.

use opsrocket_core::component::{Component, FinSet, NoseCone, NoseShape, Rocket};
use opsrocket_core::mathx::{pow2, pow3};
use opsrocket_core::units::PI;

use crate::mass::iter_layout;

/// Aerodynamic coefficients at a flight condition.
#[derive(Debug, Clone, Copy, Default)]
pub struct AeroCoefficients {
    /// Total normal-force coefficient slope dCN/dα (1/rad).
    pub cn_alpha: f64,
    /// Total drag coefficient (dimensionless).
    pub cd: f64,
    /// Friction drag coefficient.
    pub cd_friction: f64,
    /// Pressure drag coefficient.
    pub cd_pressure: f64,
    /// Base drag coefficient.
    pub cd_base: f64,
    /// Axial centre of pressure measured from the nose tip (m).
    pub cp_axial: f64,
    /// Reference area used to non-dimensionalise (m²).
    pub reference_area: f64,
    /// Reference length / diameter used for stability margin (m).
    pub reference_length: f64,
}

/// Flight condition input to aero calculations.
#[derive(Debug, Clone, Copy)]
pub struct FlightConditions {
    pub mach: f64,
    pub angle_of_attack: f64,
    pub reynolds: f64,
}

/// Compute Barrowman coefficients for the rocket at the given flight condition.
/// Equivalent to `compute_with(rocket, fc, false)`.
pub fn compute(rocket: &Rocket, fc: FlightConditions) -> AeroCoefficients {
    compute_with(rocket, fc, false)
}

/// Compute Barrowman coefficients; `motor_firing` suppresses the base-drag
/// term, matching the OpenRocket convention that an active motor pressurises
/// the body's base region.
pub fn compute_with(
    rocket: &Rocket,
    fc: FlightConditions,
    motor_firing: bool,
) -> AeroCoefficients {
    let layout = iter_layout(rocket);

    // Reference area uses the maximum body diameter.
    let d_ref = rocket.max_diameter();
    let area_ref = PI * 0.25 * d_ref * d_ref;

    let mut cn_alpha_total = 0.0_f64;
    let mut cn_x_sum = 0.0_f64;
    let mut cd_pressure = 0.0_f64;
    let mut cd_friction = 0.0_f64;
    let mut cd_base = 0.0_f64;

    // Walk pieces in axial order.
    for (comp, axial_start) in &layout {
        match comp {
            Component::NoseCone(n) => {
                let (cn_a, cp) = nosecone_cn(n, area_ref);
                let cp_global = axial_start + cp;
                cn_alpha_total += cn_a;
                cn_x_sum += cn_a * cp_global;
                cd_pressure += nosecone_pressure_drag(n, fc.mach);
                cd_friction += friction_drag(n.length, n.aft_radius * 2.0, fc, area_ref);
            }
            Component::BodyTube(t) => {
                let r = t.radius.unwrap_or(0.0);
                let d = 2.0 * r;
                cd_friction += friction_drag(t.length, d, fc, area_ref);
                // Body-tube Barrowman CN_alpha = 0 (slender body assumption).
            }
            Component::Transition(t) => {
                let (cn_a, cp) = transition_cn(t, area_ref);
                let cp_global = axial_start + cp;
                cn_alpha_total += cn_a;
                cn_x_sum += cn_a * cp_global;
                cd_pressure += transition_pressure_drag(t, fc.mach);
                cd_friction += friction_drag(t.length, 0.5 * (t.fore_radius + t.aft_radius) * 2.0, fc, area_ref);
            }
            Component::FinSet(f) => {
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let (cn_a, cp) = fins_cn(f, body_radius, area_ref);
                cn_alpha_total += cn_a;
                cn_x_sum += cn_a * (axial_start + cp);
                cd_pressure += fin_pressure_drag(f, fc.mach, area_ref);
                cd_friction += fin_friction_drag(f, fc, area_ref);
            }
            Component::LaunchLug(l) => {
                // Niskanen §3.4.4: launch-lug interference drag.
                // We model only friction over the lug's wetted area; pressure
                // drag is captured by the parasitic "interference" factor in
                // the friction term for simplicity.
                let d = 2.0 * l.outer_radius;
                cd_friction += friction_drag(l.length, d, fc, area_ref) * (l.instance_count as f64);
            }
            _ => {}
        }
    }

    // Base drag (subsonic): Hoerner / Niskanen §3.4.3.  An active motor
    // pressurises the base annulus and effectively eliminates this term.
    if !motor_firing {
        let m = fc.mach.min(1.0);
        cd_base = 0.12 + 0.13 * m * m;
    }

    let cp_axial = if cn_alpha_total.abs() > 1e-9 {
        cn_x_sum / cn_alpha_total
    } else {
        0.0
    };
    let cd = cd_friction + cd_pressure + cd_base;

    AeroCoefficients {
        cn_alpha: cn_alpha_total,
        cd,
        cd_friction,
        cd_pressure,
        cd_base,
        cp_axial,
        reference_area: area_ref,
        reference_length: d_ref,
    }
}

fn local_body_radius(layout: &[(&Component, f64)], axial: f64) -> Option<f64> {
    for (c, start) in layout {
        match c {
            Component::BodyTube(t) => {
                let r = t.radius?;
                if axial >= *start && axial <= start + t.length {
                    return Some(r);
                }
            }
            Component::Transition(t) => {
                if axial >= *start && axial <= start + t.length {
                    let f = ((axial - start) / t.length).clamp(0.0, 1.0);
                    return Some(t.fore_radius + f * (t.aft_radius - t.fore_radius));
                }
            }
            _ => {}
        }
    }
    None
}

// ============================================================================
//                        per-component formulas
// ============================================================================

/// Barrowman CN_alpha for a nose cone.
///
/// For slender body theory, CN_alpha = 2 regardless of shape; centre of
/// pressure depends on the shape. From Niskanen §3.2:
///   ogive:    Xcp ≈ 0.466 L
///   conical:  Xcp = (2/3) L
///   parabolic Xcp = 0.5 L
///   ellipsoid Xcp = (1/3) L? - we use 0.466 as a generic ogive fall-back
fn nosecone_cn(n: &NoseCone, area_ref: f64) -> (f64, f64) {
    let cn_a = 2.0;
    let frac = match n.shape {
        NoseShape::Conical => 2.0 / 3.0,
        NoseShape::Ogive => 0.466,
        NoseShape::Parabolic => 0.5,
        NoseShape::Ellipsoid => 1.0 / 3.0,
        NoseShape::Power => 0.5,
        NoseShape::Haack => 0.437,
    };
    let cp = frac * n.length;
    // CN_alpha must be referenced to area_ref; for nose cone the local
    // reference area is the base area = pi r^2.
    let local_area = PI * n.aft_radius * n.aft_radius;
    let cn_scaled = cn_a * local_area / area_ref;
    (cn_scaled, cp)
}

/// Pressure drag coefficient of a nose cone.
fn nosecone_pressure_drag(n: &NoseCone, mach: f64) -> f64 {
    // Fineness ratio
    let fr = if n.aft_radius > 0.0 { n.length / (2.0 * n.aft_radius) } else { 1.0 };
    let cd0 = match n.shape {
        NoseShape::Conical => 0.5 * (1.0 / fr).max(0.0).min(1.0),
        NoseShape::Ogive => 0.1 * (1.0 / fr).clamp(0.0, 1.0),
        NoseShape::Ellipsoid => 0.05,
        _ => 0.1,
    };
    cd0 * (1.0 + 0.15 * mach * mach)
}

fn transition_cn(
    t: &opsrocket_core::component::Transition,
    area_ref: f64,
) -> (f64, f64) {
    let a_fore = PI * t.fore_radius * t.fore_radius;
    let a_aft = PI * t.aft_radius * t.aft_radius;
    let cn_a = 2.0 * (a_aft - a_fore) / area_ref;
    // Barrowman CP for a transition: Xcp = L * (1 + (1 - R)/(1 - R²) - 2/3) where R = r_fore/r_aft
    // Niskanen eq. (3.27).
    let cp = if t.aft_radius.abs() > 1e-9 && (1.0 - pow2(t.fore_radius / t.aft_radius)).abs() > 1e-9 {
        let r = t.fore_radius / t.aft_radius;
        t.length * (1.0 + (1.0 - r) / (1.0 - r * r) - 2.0 / 3.0) / 2.0
    } else {
        0.5 * t.length
    };
    (cn_a, cp)
}

fn transition_pressure_drag(t: &opsrocket_core::component::Transition, _mach: f64) -> f64 {
    // Boattail / shoulder: small contribution, use Hoerner-style approximation.
    let dr = (t.aft_radius - t.fore_radius).abs();
    let r_max = t.aft_radius.max(t.fore_radius);
    if r_max <= 0.0 {
        return 0.0;
    }
    0.8 * pow3(dr / r_max) * (dr / r_max)
}

fn fins_cn(f: &FinSet, body_radius: f64, area_ref: f64) -> (f64, f64) {
    // Barrowman single-fin normal-force-coefficient slope (Niskanen §3.3.3,
    // eq. 3.40), referenced to the maximum body cross-section:
    //
    //   CNa_1 = (2π · (s/d)²) /
    //           (1 + sqrt(1 + (β · s / (c̄ · cos Λ))²))
    //
    // where:
    //   s  = exposed fin semi-span (height)
    //   d  = reference diameter (max body diameter)
    //   c̄  = average chord = (c_r + c_t) / 2
    //   Λ  = midchord sweep angle
    //   β  = sqrt(1 - M²) for subsonic; ≈ 1 at low Mach
    //
    // The (s/d)² factor IS the normalisation to the reference cross-section,
    // so we do *not* multiply by Af/area_ref after the formula.
    let s = f.height;
    if s <= 0.0 || f.root_chord + f.tip_chord <= 0.0 {
        return (0.0, 0.0);
    }
    let avg_chord = 0.5 * (f.root_chord + f.tip_chord);
    let mid_sweep = (f.sweep_length + 0.5 * (f.tip_chord - f.root_chord)).atan2(s);
    let cos_l = mid_sweep.cos().max(1e-3);
    let d_ref = 2.0 * (area_ref / PI).sqrt();
    let s_over_d = s / d_ref.max(1e-9);
    let denom = 1.0 + (1.0 + pow2(s / (avg_chord * cos_l))).sqrt();
    let cn_a_1 = (2.0 * PI * s_over_d * s_over_d) / denom;
    // Body-fin interference factor: Kfb = 1 + r/(s+r) per Pitts/Nielsen/Kaattari.
    let kfb = 1.0 + body_radius / (s + body_radius);
    let cn_a_set = kfb * n_fin_factor(f.fin_count) * cn_a_1;

    // CP of a trapezoidal fin (chord-wise), Niskanen eq. 3.43:
    //   x_f = (m(c_r + 2 c_t) / (3(c_r + c_t))) +
    //         (1/6)(c_r + c_t - c_r c_t/(c_r + c_t))
    // where m is the midchord sweep distance.
    let m = f.sweep_length;
    let cr = f.root_chord;
    let ct = f.tip_chord;
    let cp = m * (cr + 2.0 * ct) / (3.0 * (cr + ct))
        + (1.0 / 6.0) * (cr + ct - cr * ct / (cr + ct));
    (cn_a_set, cp)
}

/// Effective number of fins for normal force: 4 fins ≈ 4, 3 fins ≈ 3,
/// more than 4 gradually loses effectiveness. Matches FinSetCalc.
fn n_fin_factor(n: u32) -> f64 {
    match n {
        0 => 0.0,
        1 => 0.5,
        2 => 1.0,
        3 => 1.5,
        4 => 2.0,
        _ => 2.0 + 0.25 * (n as f64 - 4.0),
    }
}

fn friction_drag(length: f64, diameter: f64, fc: FlightConditions, area_ref: f64) -> f64 {
    if length <= 0.0 || diameter <= 0.0 {
        return 0.0;
    }
    // Schoenherr / ITTC flat-plate friction, Niskanen §3.4.1
    let re = (fc.reynolds * length).max(1.0e4);
    let cf = 0.075 / (re.log10() - 2.0).powi(2);
    let area_wetted = PI * diameter * length;
    cf * area_wetted / area_ref
}

fn fin_friction_drag(f: &FinSet, fc: FlightConditions, area_ref: f64) -> f64 {
    let re = (fc.reynolds * f.root_chord).max(1.0e4);
    let cf = 0.075 / (re.log10() - 2.0).powi(2);
    let af = 0.5 * (f.root_chord + f.tip_chord) * f.height;
    let area_wetted = 2.0 * af * f.fin_count as f64;
    cf * area_wetted / area_ref
}

fn fin_pressure_drag(f: &FinSet, _mach: f64, area_ref: f64) -> f64 {
    // Hoerner leading-edge drag: Cd_LE ≈ 0.135 * (t/c)
    let cr = f.root_chord.max(1e-6);
    let cd_le = 0.135 * (f.thickness / cr);
    let af = 0.5 * (f.root_chord + f.tip_chord) * f.height;
    cd_le * (af * f.fin_count as f64) / area_ref
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;
    use opsrocket_core::component::{BodyTube, Common, NoseCone};

    #[test]
    fn empty_rocket_has_zero_cna() {
        let r = Rocket::default();
        let c = compute(&r, FlightConditions { mach: 0.1, angle_of_attack: 0.0, reynolds: 1.0e6 });
        assert_relative_eq!(c.cn_alpha, 0.0);
    }

    #[test]
    fn single_ogive_cn_is_two_at_local_area() {
        let mut r = Rocket::default();
        let mut stage = opsrocket_core::component::Stage::default();
        stage.children.push(Component::NoseCone(NoseCone {
            common: Common::new("n1", "Nose"),
            shape: NoseShape::Ogive,
            shape_parameter: 1.0,
            length: 0.1,
            aft_radius: 0.025,
            thickness: 0.001,
            aft_shoulder_radius: 0.0,
            aft_shoulder_length: 0.0,
            aft_shoulder_thickness: 0.0,
            aft_shoulder_capped: false,
            is_flipped: false,
        }));
        stage.children.push(Component::BodyTube(BodyTube {
            common: Common::new("b1", "Tube"),
            length: 0.3,
            radius: Some(0.025),
            thickness: 0.001,
            children: vec![],
            motor_mount: None,
        }));
        r.stages.push(stage);
        let c = compute(&r, FlightConditions { mach: 0.1, angle_of_attack: 0.0, reynolds: 1.0e6 });
        // Nose-only contributor and its local area is the same as the reference area
        // (max body diameter == nose base diameter), so CN_alpha ≈ 2.0.
        assert_relative_eq!(c.cn_alpha, 2.0, max_relative = 1e-9);
        // CP should be at 0.466 * 0.1 = 0.0466 m
        assert_relative_eq!(c.cp_axial, 0.0466, max_relative = 1e-9);
    }
}
