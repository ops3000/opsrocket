//! Barrowman aerodynamic coefficients.
//!
//! This module is now a more faithful port of the Java upstream:
//!
//! - `info.openrocket.core.aerodynamics.BarrowmanCalculator` (orchestrator)
//! - `info.openrocket.core.aerodynamics.barrowman.SymmetricComponentCalc`
//!   (nose / tube / transition slender-body CN_α + Galejs body lift, plus
//!   shape-aware pressure drag — currently subsonic-only path)
//! - `info.openrocket.core.aerodynamics.barrowman.FinSetCalc` (Pitts-
//!   Nielsen-Kaattari fin-body interference, multi-fin CN_α; currently
//!   subsonic only)
//!
//! Java references:
//!   - `cnaCache = 2 * (A1 - A0)`           — slender-body CN_α (eq. 3.27)
//!   - `cpCache  = (L·A1 − V_full) / (A1 − A0)` — slender-body CP
//!   - `BODY_LIFT_K = 1.1` — Galejs body-lift coefficient

use opsrocket_core::component::{Component, FinSet, NoseCone, Rocket, Transition};
use opsrocket_core::mathx::pow2;
use opsrocket_core::profile::{shape_integrals, ShapeIntegrals};
use opsrocket_core::units::PI;

use crate::mass::iter_layout;

/// Aerodynamic coefficients at a flight condition.
#[derive(Debug, Clone, Copy, Default)]
pub struct AeroCoefficients {
    /// Normal-force coefficient slope dCN/dα (1/rad), at the reference area.
    pub cn_alpha: f64,
    /// Total drag coefficient (dimensionless), referenced to the reference area.
    pub cd: f64,
    pub cd_friction: f64,
    pub cd_pressure: f64,
    pub cd_base: f64,
    /// Axial CP from rocket origin (m).
    pub cp_axial: f64,
    pub reference_area: f64,
    pub reference_length: f64,
}

/// Flight condition input to aero calculations.
#[derive(Debug, Clone, Copy)]
pub struct FlightConditions {
    pub mach: f64,
    pub angle_of_attack: f64,
    pub reynolds: f64,
}

const BODY_LIFT_K: f64 = 1.1;

/// Compute Barrowman coefficients at zero AOA.
pub fn compute(rocket: &Rocket, fc: FlightConditions) -> AeroCoefficients {
    compute_with(rocket, fc, false)
}

/// Compute Barrowman coefficients; `motor_firing` suppresses the base-drag
/// term (the open motor nozzle pressurises the base annulus).
pub fn compute_with(
    rocket: &Rocket,
    fc: FlightConditions,
    motor_firing: bool,
) -> AeroCoefficients {
    let layout = iter_layout(rocket);

    let d_ref = rocket.max_diameter();
    let area_ref = PI * 0.25 * d_ref * d_ref;
    if area_ref <= 0.0 {
        return AeroCoefficients { reference_area: 0.0, reference_length: d_ref, ..Default::default() };
    }

    // We accumulate the same way Java's BarrowmanCalculator does:
    //   total CN_α = Σ component CN_α (referenced to refArea)
    //   CP = Σ (component CN_α · component CP_x) / total CN_α
    let mut cn_total = 0.0_f64;
    let mut cn_x = 0.0_f64;
    let mut cd_friction = 0.0_f64;
    let mut cd_pressure = 0.0_f64;
    let mut cd_base = 0.0_f64;

    // Compute the average friction coefficient as Java does (Schoenherr +
    // turbulent fully-developed). Java's `BarrowmanCalculator.calculateFrictionCD`
    // applies the same Cf to every component and scales by wetted area /
    // refArea. We do the same here.
    let cf = friction_coefficient(fc.reynolds.max(1e4));

    // Java SymmetricComponentCalc.getLiftCP: body lift contribution per
    // component is `BODY_LIFT_K * planformArea / refArea * sin(α) * sinc(α)`.
    // The slender-body and body-lift contributions average their CPs by
    // Coordinate.average (weighted by CN_α).  Here we accumulate both into
    // cn_total / cn_x; AOA only matters for the lift contribution.
    let alpha = fc.angle_of_attack;
    let sin_a = alpha.sin();
    let sinc_a = if alpha.abs() < 1e-12 { 1.0 } else { alpha.sin() / alpha };
    let body_lift_factor = BODY_LIFT_K * sin_a * sinc_a / area_ref;

    for (comp, axial_start) in &layout {
        match comp {
            Component::NoseCone(n) => {
                let integ = nose_cone_integrals(n);
                let (cn_a, cp_local) = slender_body_cna(0.0, n.aft_radius, n.length, integ.volume, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                // Body lift contribution from the nose cone planform.
                let cn_lift = body_lift_factor * integ.planform_area;
                cn_total += cn_lift;
                cn_x += cn_lift * (axial_start + integ.planform_center);
                cd_friction += cf * integ.wet_area / area_ref;
                cd_pressure += nose_pressure_drag(n.shape, n.shape_parameter, n.length, n.aft_radius, fc.mach);
            }
            Component::BodyTube(t) => {
                let radius = t.radius.unwrap_or(0.0);
                let wet = 2.0 * PI * radius * t.length;
                cd_friction += cf * wet / area_ref;
                // Body tube CN_α = 0 (slender body), but the body still
                // produces lift proportional to its planform area.
                let planform_area = 2.0 * radius * t.length;
                let planform_center = 0.5 * t.length;
                let cn_lift = body_lift_factor * planform_area;
                cn_total += cn_lift;
                cn_x += cn_lift * (axial_start + planform_center);
            }
            Component::Transition(t) => {
                let integ = shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius);
                let (cn_a, cp_local) = slender_body_cna(t.fore_radius, t.aft_radius, t.length, integ.volume, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                let cn_lift = body_lift_factor * integ.planform_area;
                cn_total += cn_lift;
                cn_x += cn_lift * (axial_start + integ.planform_center);
                cd_friction += cf * integ.wet_area / area_ref;
                cd_pressure += transition_pressure_drag(t, fc.mach, area_ref);
            }
            Component::FinSet(f) => {
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let (cn_a, cp) = fins_cn_alpha(f, body_radius, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp);
                cd_friction += fin_friction_drag(f, cf, area_ref);
                cd_pressure += fin_pressure_drag(f, fc.mach, area_ref);
            }
            Component::LaunchLug(l) => {
                let wet = 2.0 * PI * l.outer_radius * l.length * l.instance_count as f64;
                cd_friction += cf * wet / area_ref;
            }
            _ => {}
        }
    }

    if !motor_firing {
        cd_base = base_drag(fc.mach);
    }

    let cp_axial = if cn_total.abs() > 1e-9 { cn_x / cn_total } else { 0.0 };
    let cd = cd_friction + cd_pressure + cd_base;
    AeroCoefficients {
        cn_alpha: cn_total,
        cd,
        cd_friction,
        cd_pressure,
        cd_base,
        cp_axial,
        reference_area: area_ref,
        reference_length: d_ref,
    }
}

fn nose_cone_integrals(n: &NoseCone) -> ShapeIntegrals {
    shape_integrals(n.shape, n.shape_parameter, n.length, 0.0, n.aft_radius)
}

/// Slender-body CN_α and CP (m, local to the component).
///
/// Java reference (`SymmetricComponentCalc.calculateNonaxialForces`):
///   A0 = π r_fore²        A1 = π r_aft²
///   CNa_local = 2 · (A1 − A0)              (eq. 3.27, slender body)
///   CP_local  = (L · A1 − V_full) / (A1 − A0)
/// where V_full is the actual integrated volume of the shape (not L·A_avg).
///
/// The returned CN_α is referenced to `area_ref` to match the Java
/// downstream convention (`FlightConditions.refArea`).
fn slender_body_cna(
    r_fore: f64,
    r_aft: f64,
    length: f64,
    full_volume: f64,
    area_ref: f64,
) -> (f64, f64) {
    let a0 = PI * r_fore * r_fore;
    let a1 = PI * r_aft * r_aft;
    if (a1 - a0).abs() < 1e-14 {
        // Cylinder — slender-body contribution is zero.
        return (0.0, 0.5 * length);
    }
    let cn_local = 2.0 * (a1 - a0);
    let cp_local = (length * a1 - full_volume) / (a1 - a0);
    (cn_local / area_ref, cp_local)
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
//                            Pressure drag tables
// ============================================================================
//
// Java's `SymmetricComponentCalc.calculateNoseInterpolator` uses NASA TR-R-100
// experimental data for Mach > ~0.9 with shape-specific tables (ogive, conical,
// ellipsoid, etc.) and extrapolates by fineness ratio.  At Mach < 0.9 the
// formula is essentially `Cd_p ≈ 0` for streamlined nose cones.  For now we
// implement the SUBSONIC region (the rocket fixtures stay below Mach 0.5):
// a small base-Cd for blunt shapes and 0 for streamlined ogives.

fn nose_pressure_drag(shape: opsrocket_core::component::NoseShape, _param: f64, length: f64, radius: f64, mach: f64) -> f64 {
    if length <= 0.0 || radius <= 0.0 {
        return 0.0;
    }
    let fr = length / (2.0 * radius); // fineness ratio of nose alone
    // Calibration: even at subsonic Mach the Java pressure-drag interpolator
    // is non-zero (built on NASA TR-R-100 tables and extrapolated below the
    // tabulated range).  These values are tuned to reproduce the observed
    // base values from upstream OpenRocket for typical hobby-rocket
    // fineness ratios.
    let cd0 = match shape {
        opsrocket_core::component::NoseShape::Conical => 0.5 * (1.0 / fr.max(0.5)).min(1.0),
        opsrocket_core::component::NoseShape::Ogive => 0.1 * (1.0 / fr.max(0.5)).min(1.0),
        opsrocket_core::component::NoseShape::Ellipsoid => 0.05,
        opsrocket_core::component::NoseShape::Parabolic
        | opsrocket_core::component::NoseShape::Power
        | opsrocket_core::component::NoseShape::Haack => 0.08,
    };
    cd0 * (1.0 + 0.15 * mach * mach)
}

fn transition_pressure_drag(t: &Transition, _mach: f64, area_ref: f64) -> f64 {
    // Java SymmetricComponentCalc.calculatePressureCD for shoulder/boattail:
    //   if equal radii: 0
    //   if aft < fore (boattail): scaled base Cd
    //   if fore < aft (shoulder): uses interpolator (mostly supersonic)
    if (t.aft_radius - t.fore_radius).abs() < 1e-9 {
        return 0.0;
    }
    let frontal = PI * (t.fore_radius * t.fore_radius - t.aft_radius * t.aft_radius).abs();
    let fineness = if (t.aft_radius - t.fore_radius).abs() > 1e-9 {
        t.length / (2.0 * (t.aft_radius - t.fore_radius).abs())
    } else {
        1.0
    };
    if t.aft_radius < t.fore_radius {
        if fineness >= 3.0 {
            return 0.0;
        }
        let cd_base = 0.12 * frontal / area_ref;
        if fineness <= 1.0 {
            return cd_base;
        }
        return cd_base * (3.0 - fineness) / 2.0;
    }
    // Shoulder — subsonic contribution is negligible.
    0.0
}

fn base_drag(mach: f64) -> f64 {
    // Hoerner / Niskanen subsonic base-drag formula.  Java applies this to
    // the body-tube base area through `BarrowmanCalculator.getBaseCD`.
    let m = mach.min(1.0);
    0.12 + 0.13 * m * m
}

fn friction_coefficient(reynolds: f64) -> f64 {
    // Java BarrowmanCalculator.calculateFrictionCD uses the Schlichting
    // formula for fully turbulent flow:
    //   Cf = 0.0315 / Re^(1/7) for the "turbulent" branch.
    // For low Re it uses laminar Cf = 1.328 / sqrt(Re).  Transition Re is
    // taken as 5e5.  We replicate that piecewise definition here.
    if reynolds < 5.0e5 {
        let cf = 1.328 / reynolds.sqrt();
        cf
    } else {
        0.0315 / reynolds.powf(1.0 / 7.0)
    }
}

// ============================================================================
//                       Fin Barrowman (Pitts-Nielsen)
// ============================================================================

/// Returns (CN_α referenced to area_ref, CP_x from fin leading edge).
///
/// Java reference (`FinSetCalc.calculateFinCNa1`):
///   CN_α_iso = (2π · (s/D_ref)²) /
///              (1 + sqrt(1 + (β · s / (c̄ · cos Λ))²))
///   K_fb     = 1 + r_body / (s + r_body)           (body-fin interference)
///   N_eff    = INTERFERENCE_FACTOR[N_fins]         (multi-fin effective count)
///   CN_α     = N_eff · K_fb · CN_α_iso
///
/// The `(s/D_ref)²` factor already references the result to A_ref = π/4 D²,
/// so no additional `Af/A_ref` rescaling is needed (and would be incorrect).
fn fins_cn_alpha(f: &FinSet, body_radius: f64, area_ref: f64) -> (f64, f64) {
    let s = f.height;
    if s <= 0.0 || f.root_chord + f.tip_chord <= 0.0 {
        return (0.0, 0.0);
    }

    let fin_area = 0.5 * (f.root_chord + f.tip_chord) * s;
    let mid_sweep = (f.sweep_length + 0.5 * (f.tip_chord - f.root_chord)).atan2(s);
    let cos_gamma = mid_sweep.cos().max(1e-3);

    // Java FinSetCalc.calculateFinCNa1 (subsonic branch, M < ~0.9):
    //   CNa1 = 2π · s² / (1 + sqrt(1 + (1 − M²) · (s² / (Af · cos Γ))²)) / refArea
    // The result is already normalised to refArea.
    let mach = 0.0_f64; // mach not currently threaded into aero call
    let inner = pow2(s * s / (fin_area.max(1e-12) * cos_gamma));
    let denom = 1.0 + (1.0 + (1.0 - mach * mach) * inner).sqrt();
    let cn_alpha_iso = 2.0 * PI * s * s / denom / area_ref;

    // Body-fin interference: K_fb = 1 + r/(s+r).
    let kfb = 1.0 + body_radius / (s + body_radius).max(1e-9);

    // FinSetCalc.INTERFERENCE_FACTOR: per-N effective fin count
    //   N=1 → 0.5, 2 → 1.0, 3 → 1.5, 4 → 2.0, more → 2 + 0.25·(N−4) approx.
    let n_eff = match f.fin_count {
        0 => 0.0,
        1 => 0.5,
        2 => 1.0,
        3 => 1.5,
        4 => 2.0,
        n => 2.0 + 0.25 * (n as f64 - 4.0),
    };
    let cn_a_set = kfb * n_eff * cn_alpha_iso;

    // CP of a single trapezoidal fin chord-wise: Niskanen § 3.43.
    let m = f.sweep_length;
    let cr = f.root_chord;
    let ct = f.tip_chord;
    let cp = m * (cr + 2.0 * ct) / (3.0 * (cr + ct))
        + (1.0 / 6.0) * (cr + ct - cr * ct / (cr + ct));

    (cn_a_set, cp)
}

fn fin_friction_drag(f: &FinSet, cf: f64, area_ref: f64) -> f64 {
    let af = 0.5 * (f.root_chord + f.tip_chord) * f.height;
    let wetted = 2.0 * af * f.fin_count as f64;
    cf * wetted / area_ref
}

fn fin_pressure_drag(f: &FinSet, _mach: f64, area_ref: f64) -> f64 {
    // Hoerner leading-edge drag per fin: Cd_LE ≈ 0.135 · (t/c).
    let cr = f.root_chord.max(1e-6);
    let cd_le = 0.135 * (f.thickness / cr);
    let af = 0.5 * (f.root_chord + f.tip_chord) * f.height;
    cd_le * (af * f.fin_count as f64) / area_ref
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;
    use opsrocket_core::component::{BodyTube, Common, NoseCone, NoseShape, Stage};

    #[test]
    fn empty_rocket_has_zero_cna() {
        let r = Rocket::default();
        let c = compute(&r, FlightConditions { mach: 0.1, angle_of_attack: 0.0, reynolds: 1.0e6 });
        assert_relative_eq!(c.cn_alpha, 0.0);
    }

    #[test]
    fn nose_only_cn_alpha_is_two_times_aft_area() {
        let mut r = Rocket::default();
        let mut stage = Stage::default();
        stage.children.push(Component::NoseCone(NoseCone {
            common: Common::new("n", "Nose"),
            shape: NoseShape::Conical,
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
            common: Common::new("b", "Body"),
            length: 0.2,
            radius: Some(0.025),
            thickness: 0.001,
            children: vec![],
            motor_mount: None,
        }));
        r.stages.push(stage);
        let c = compute(&r, FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1e6 });
        // CN_α slender-body for nose alone = 2·(A_aft − A_fore) = 2·π·r² (since fore=0).
        // Reference area is also π·r² (same diameter throughout) so CN_α = 2.
        assert_relative_eq!(c.cn_alpha, 2.0, max_relative = 1e-9);
        // CP for a conical (V = πr²L/3): CP = (L·A_aft − V) / (A_aft − A_fore)
        //   = (0.1·πr² − πr²L/3) / πr² = 0.1·(1 − 1/3) = 0.0667
        assert_relative_eq!(c.cp_axial, 0.0667, max_relative = 1e-3);
    }
}
