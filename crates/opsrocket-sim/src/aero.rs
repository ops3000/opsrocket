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
    /// Normal-force coefficient slope dCN/dα (1/rad) at α = 0
    /// (pure Barrowman slender-body — fins + nose + transitions). This is
    /// the value reported in the OpenRocket `Normal force coefficient`
    /// column; downstream consumers that need the *total* normal force at
    /// a given AOA should use `total_cn_at_alpha`.
    pub cn_alpha: f64,
    /// Total drag coefficient (referenced to refArea), excluding the
    /// AOA-induced contribution.  Drag at non-zero α should add
    /// `cn_at_alpha · sin(α)` to this value.
    pub cd: f64,
    pub cd_friction: f64,
    pub cd_pressure: f64,
    pub cd_base: f64,
    /// Axial CP from rocket origin (m), weighted average of the
    /// slender-body CP and the body-lift CP at the current AOA.
    pub cp_axial: f64,
    pub reference_area: f64,
    pub reference_length: f64,
    /// Total normal-force coefficient `CN` at the current AOA: the value
    /// that drives lift force and pitching moment in the dynamics layer.
    /// Equal to `cn_alpha · α` at small α, plus Galejs body-lift terms
    /// that scale as `sin²(α)` (so contribute negligibly at α = 0).
    pub cn_at_alpha: f64,
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
    let cd_base;

    // Java BarrowmanDragCalculator.calculateFrictionCoefficient: fully-
    // turbulent Schlichting for non-perfect-finish rockets, Mach-corrected.
    // Plus a roughness-limited Cf; Java takes max(Cf, roughness_Cf).
    let cf_base = friction_coefficient(fc.reynolds.max(1.0), fc.mach);
    // Aerodynamic length = total body length (Java uses configuration's
    // aerodynamic length). We approximate as the rocket's total length.
    let body_length = rocket.total_length().max(1e-3);
    let cf_rough = roughness_limited_cf(body_length, fc.mach);
    let cf = cf_base.max(cf_rough);
    // Track max body radius and total body length for the body-friction
    // correction factor at the end.
    let mut body_friction_sum = 0.0_f64;
    let mut max_body_radius = 0.0_f64;
    let mut min_body_x = f64::INFINITY;
    let mut max_body_x = 0.0_f64;

    // We compute two CN_α families simultaneously:
    //   - slender-body / fin Barrowman: linear in α, AOA-independent slope
    //   - Galejs body lift: K · A_plan/A_ref · sin(α) · sinc(α) — the
    //     "CN_α-equivalent" at the given α.  Its contribution to actual CN
    //     is `α · weight = α · K · A_plan/A_ref · sin(α) · sinc(α)
    //                    = K · A_plan/A_ref · sin²(α)`, i.e. quadratic in α.
    //
    // `cn_alpha` (column 38 in flight data) is the *slope at α=0*, so the
    // body-lift bit does not contribute there.  Total CN at the current
    // AOA is built up from both via separate accumulators below.
    let alpha = fc.angle_of_attack;
    let sin_a = alpha.sin();
    let sinc_a = if alpha.abs() < 1e-12 { 1.0 } else { sin_a / alpha };
    let body_lift_weight = BODY_LIFT_K * sin_a * sinc_a;  // per-A_plan term
    // Separate accumulators for the body-lift contributions so we can
    // weight CP by both slender and lift CNs without contaminating the
    // pure CN_α slope.
    let mut lift_cn = 0.0_f64;
    let mut lift_cn_x = 0.0_f64;

    for (comp, axial_start) in &layout {
        match comp {
            Component::NoseCone(n) => {
                let integ = nose_cone_integrals(n);
                let (cn_a, cp_local) = slender_body_cna(0.0, n.aft_radius, n.length, integ.volume, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                let lift_w = body_lift_weight * integ.planform_area / area_ref;
                lift_cn += lift_w;
                lift_cn_x += lift_w * (axial_start + integ.planform_center);
                body_friction_sum += cf * integ.wet_area / area_ref;
                if n.aft_radius > max_body_radius { max_body_radius = n.aft_radius; }
                min_body_x = min_body_x.min(*axial_start);
                max_body_x = max_body_x.max(axial_start + n.length);
                cd_pressure += nose_pressure_drag(n.shape, n.shape_parameter, n.length, n.aft_radius, fc.mach);
            }
            Component::BodyTube(t) => {
                let radius = t.radius.unwrap_or(0.0);
                let wet = 2.0 * PI * radius * t.length;
                body_friction_sum += cf * wet / area_ref;
                if radius > max_body_radius { max_body_radius = radius; }
                min_body_x = min_body_x.min(*axial_start);
                max_body_x = max_body_x.max(axial_start + t.length);
                let planform_area = 2.0 * radius * t.length;
                let planform_center = 0.5 * t.length;
                let lift_w = body_lift_weight * planform_area / area_ref;
                lift_cn += lift_w;
                lift_cn_x += lift_w * (axial_start + planform_center);
            }
            Component::Transition(t) => {
                let integ = shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius);
                let (cn_a, cp_local) = slender_body_cna(t.fore_radius, t.aft_radius, t.length, integ.volume, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                let lift_w = body_lift_weight * integ.planform_area / area_ref;
                lift_cn += lift_w;
                lift_cn_x += lift_w * (axial_start + integ.planform_center);
                body_friction_sum += cf * integ.wet_area / area_ref;
                let max_r = t.fore_radius.max(t.aft_radius);
                if max_r > max_body_radius { max_body_radius = max_r; }
                min_body_x = min_body_x.min(*axial_start);
                max_body_x = max_body_x.max(axial_start + t.length);
                cd_pressure += transition_pressure_drag(t, fc.mach, area_ref);
            }
            Component::FinSet(f) => {
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let (cn_a, cp) = fins_cn_alpha(f, body_radius, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp);
                // Fin friction is NOT subject to the body-fineness correction.
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

    // Apply body-fineness friction correction (Java BarrowmanDragCalculator,
    // line 167): correction = 1 + 1/(2·fB) where fB = total_length / maxR.
    if max_body_radius > 0.0 && max_body_x > min_body_x {
        let correction = body_friction_correction(max_body_x - min_body_x, max_body_radius);
        cd_friction += body_friction_sum * correction;
    } else {
        cd_friction += body_friction_sum;
    }

    // Java BarrowmanDragCalculator.calculateBaseCD: returns 0.12 + 0.13·M²
    // regardless of motor firing.  The base annulus is always subject to
    // separated-flow drag in OR's model; the motor jet effect would have
    // to be modelled separately via a thrust-coupling term we don't have.
    let _ = motor_firing;
    cd_base = base_drag(fc.mach);
    let _ = body_friction_correction; // silence warning when unused

    // Java's BarrowmanCalculator combines slender-body and body-lift
    // contributions via Coordinate.average (weighted by their CN_α / weight
    // values). Total CN at the live AOA = α · (cn_α_slender + lift_weight).
    // CP is then the CN-weighted mix of the two CPs.
    let total_weight = cn_total + lift_cn;
    let cp_axial = if total_weight.abs() > 1e-12 {
        (cn_x + lift_cn_x) / total_weight
    } else {
        0.0
    };
    let cn_at_alpha = alpha * total_weight;
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
        cn_at_alpha,
    }
}

fn nose_cone_integrals(n: &NoseCone) -> ShapeIntegrals {
    shape_integrals(n.shape, n.shape_parameter, n.length, 0.0, n.aft_radius)
}

/// Precomputed body-lift geometry. Used by the dynamics layer so it can
/// compute the AOA-dependent body lift each step without recomputing all
/// per-component integrals.
#[derive(Debug, Clone, Copy, Default)]
pub struct BodyLiftGeometry {
    /// `K · Σ A_planform / A_ref` — the Galejs body-lift coefficient
    /// multiplied by the total side-view area divided by the reference
    /// area.  Multiplied by `sin²(α)` to give the body-lift contribution
    /// to total CN.
    pub planform_term: f64,
    /// Axial CP of the body-lift contribution (m, weighted average of
    /// each component's planform centre by its planform area).
    pub planform_cp: f64,
    /// Reference area (m²) — convenience.
    pub reference_area: f64,
}

/// Compute the body-lift planform-area sum / weighted centre for the
/// rocket.  These quantities are AOA-independent and only need to be
/// recomputed when the rocket's active-stage configuration changes.
pub fn body_lift_geometry(rocket: &Rocket) -> BodyLiftGeometry {
    let layout = iter_layout(rocket);
    let d_ref = rocket.max_diameter();
    let area_ref = PI * 0.25 * d_ref * d_ref;
    if area_ref <= 0.0 {
        return BodyLiftGeometry::default();
    }
    let mut total_area = 0.0_f64;
    let mut total_area_x = 0.0_f64;
    for (comp, axial_start) in &layout {
        match comp {
            Component::NoseCone(n) => {
                let integ = nose_cone_integrals(n);
                total_area += integ.planform_area;
                total_area_x += integ.planform_area * (axial_start + integ.planform_center);
            }
            Component::BodyTube(t) => {
                let r = t.radius.unwrap_or(0.0);
                let a = 2.0 * r * t.length;
                total_area += a;
                total_area_x += a * (axial_start + 0.5 * t.length);
            }
            Component::Transition(t) => {
                let integ = shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius);
                total_area += integ.planform_area;
                total_area_x += integ.planform_area * (axial_start + integ.planform_center);
            }
            _ => {}
        }
    }
    let planform_term = BODY_LIFT_K * total_area / area_ref;
    let planform_cp = if total_area > 1e-12 { total_area_x / total_area } else { 0.0 };
    BodyLiftGeometry { planform_term, planform_cp, reference_area: area_ref }
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

/// Friction coefficient — port of Java
/// `BarrowmanDragCalculator.calculateFrictionCoefficient` for the
/// non-perfect-finish (default) case, with Mach correction.
///
/// For a rocket with `isPerfectFinish() == false` (the default), Java uses
/// the fully-turbulent Schlichting formula even at low Reynolds:
///   Re < 1e4 : Cf = 1.48e-2
///   else     : Cf = 1.0 / (1.50·ln(Re) − 5.6)²
/// Then Mach correction:
///   M < 0.9  : Cf *= (1 − 0.1·M²)
///   M > 1.1  : Cf *= 1 / (1 + 0.15·M²)^0.58
///   otherwise: linear blend between the two
fn friction_coefficient(reynolds: f64, mach: f64) -> f64 {
    let re = reynolds.max(1.0);
    let mut cf = if re < 1.0e4 {
        1.48e-2
    } else {
        let denom = 1.50 * re.ln() - 5.6;
        1.0 / (denom * denom)
    };
    // Mach correction
    let c1 = if mach < 1.1 { 1.0 - 0.1 * mach * mach } else { 1.0 };
    let c2 = if mach > 0.9 { 1.0 / (1.0 + 0.15 * mach * mach).powf(0.58) } else { 1.0 };
    if mach < 0.9 {
        cf *= c1;
    } else if mach < 1.1 {
        cf *= c2 * (mach - 0.9) / 0.2 + c1 * (1.1 - mach) / 0.2;
    } else {
        cf *= c2;
    }
    cf
}

/// Roughness-limited friction coefficient — Java
/// `BarrowmanDragCalculator`: `0.032 · (roughness/length)^0.2 · roughness_correction`.
///
/// For a typical hobby-rocket "Normal" finish the roughness size is ~60 µm.
/// We don't yet read this per component, so we hardcode a representative
/// value matching OpenRocket's default `Finish.NORMAL` (60 µm).
fn roughness_limited_cf(rocket_length: f64, mach: f64) -> f64 {
    let roughness_size = 60.0e-6_f64; // OpenRocket default "Normal" finish
    let len = rocket_length.max(1e-3);
    let base = 0.032 * (roughness_size / len).powf(0.2);
    let correction = if mach < 0.9 {
        1.0 - 0.1 * mach * mach
    } else if mach > 1.1 {
        1.0 / (1.0 + 0.18 * mach * mach)
    } else {
        let c1 = 1.0 - 0.1 * 0.81;
        let c2 = 1.0 / (1.0 + 0.18 * 1.21);
        c2 * (mach - 0.9) / 0.2 + c1 * (1.1 - mach) / 0.2
    };
    base * correction
}

/// Body-length-based fineness correction for friction drag of body
/// components: Java `BarrowmanDragCalculator` applies a multiplier of
/// `1 + 1/(2·fB)` to the bodies' summed friction, where `fB = length/maxR`.
fn body_friction_correction(length: f64, max_radius: f64) -> f64 {
    let max_r = max_radius.max(1e-9);
    let f_b = (length + 0.0001) / max_r;
    1.0 + 1.0 / (2.0 * f_b)
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
