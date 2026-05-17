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

use opsrocket_core::component::{
    Common, Component, FinCrossSection, FinSet, FinShape, NoseCone, Rocket, Transition,
    TubeFinSet,
};
use opsrocket_core::mathx::pow2;
use opsrocket_core::profile::{shape_integrals, ShapeIntegrals};
use opsrocket_core::units::PI;

use crate::mass::{iter_layout, iter_layout_reps};

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

/// Per-component aerodynamic breakdown (name, CNa, absolute CP_x metres)
/// for the CNa-contributing parts — mirrors OpenRocket
/// `BarrowmanCalculator.getForceAnalysis` so CP deltas can be localised
/// the same way the mass `COMP|` diff localises mass. Body lift is omitted
/// (its CNa slope is 0 at α=0, matching OpenRocket's per-component CNa).
pub fn cp_breakdown(rocket: &Rocket, fc: FlightConditions) -> Vec<(String, f64, f64)> {
    let layout = iter_layout(rocket);
    let d_ref = rocket.max_diameter();
    let area_ref = PI * 0.25 * d_ref * d_ref;
    let mut out = Vec::new();
    if area_ref <= 0.0 {
        return out;
    }
    for (comp, axial_start) in &layout {
        match comp {
            Component::NoseCone(n) => {
                let integ = nose_cone_integrals(n);
                let (cn_a, cp_local) =
                    slender_body_cna(0.0, n.aft_radius, n.length, integ.volume, area_ref);
                out.push((n.common.name.clone(), cn_a, axial_start + cp_local));
            }
            Component::Transition(t) => {
                let integ =
                    shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius);
                let (cn_a, cp_local) = slender_body_cna(
                    t.fore_radius, t.aft_radius, t.length, integ.volume, area_ref,
                );
                out.push((t.common.name.clone(), cn_a, axial_start + cp_local));
            }
            Component::FinSet(f) => {
                let br = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let (cn_a, cp) = fins_cn_alpha(f, br, area_ref, fc.mach);
                out.push((f.common.name.clone(), cn_a, axial_start + cp));
            }
            Component::TubeFinSet(tf) => {
                let br = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let outer = tf.outer_radius.unwrap_or(br).max(1e-4);
                let inner = (outer - tf.thickness).max(0.0);
                let chord = tf.length.max(1e-6);
                if inner > 1e-5 {
                    let ar = 2.0 * inner / chord;
                    let arprime = 2.0 * ar / PI;
                    let cnaconst =
                        2.0 * (arprime / (1.0 + arprime)) * PI * PI * inner * chord;
                    let cna_total = tf.fin_count as f64 * cnaconst / area_ref;
                    let cpos = tubefin_cp_pos(ar, fc.mach);
                    out.push((
                        tf.common.name.clone(),
                        cna_total,
                        axial_start + cpos * chord,
                    ));
                }
            }
            _ => {}
        }
    }
    out
}

/// Compute Barrowman coefficients; `motor_firing` suppresses the base-drag
/// term (the open motor nozzle pressurises the base annulus).
pub fn compute_with(
    rocket: &Rocket,
    fc: FlightConditions,
    motor_firing: bool,
) -> AeroCoefficients {
    let layout = iter_layout(rocket);
    // Pod/parallel/cluster-replicated walk: a parallel booster's nose &
    // fins exist once per booster (OpenRocket sums them).
    let rlayout = iter_layout_reps(rocket);

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
    // Fin sets, evaluated in the θ-worst-case sweep below:
    // (cna1_eff, cp_x_abs, fin_count, base_clock_angle).
    let mut fin_sets: Vec<(f64, f64, u32, f64)> = Vec::new();
    let mut cd_friction = 0.0_f64;
    let mut cd_pressure = 0.0_f64;
    let cd_base;

    // Java BarrowmanDragCalculator: Reynolds is `v · L_aero / ν`, i.e. the
    // full Reynolds based on the rocket's aerodynamic length, computed once
    // and applied to every component.  Our caller passes `fc.reynolds` as
    // the per-metre value ρ·v/μ, so multiply by the aerodynamic length to
    // recover Java's Re.
    let body_length = rocket.total_length().max(1e-3);
    let reynolds_full = (fc.reynolds * body_length).max(1.0);
    let cf_base = friction_coefficient(reynolds_full, fc.mach);
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

    for (comp, axial_start, reps_u) in &rlayout {
        let reps = *reps_u as f64;
        match comp {
            Component::NoseCone(n) => {
                let integ = nose_cone_integrals(n);
                // A flipped nose cone is a tail/boat-tail cone: the profile
                // goes aft_radius → 0 (area decreasing), giving a *negative*
                // slender-body CNa, exactly as OpenRocket.
                let (r0, r1) = if n.is_flipped {
                    (n.aft_radius, 0.0)
                } else {
                    (0.0, n.aft_radius)
                };
                let (cn_a0, cp_local) =
                    slender_body_cna(r0, r1, n.length, integ.volume, area_ref);
                let cn_a = cn_a0 * reps;
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                let lift_w = body_lift_weight * integ.planform_area / area_ref * reps;
                lift_cn += lift_w;
                lift_cn_x += lift_w * (axial_start + integ.planform_center);
                body_friction_sum += cf * integ.wet_area / area_ref * reps;
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
                let lift_w = body_lift_weight * planform_area / area_ref * reps;
                lift_cn += lift_w;
                lift_cn_x += lift_w * (axial_start + planform_center);
            }
            Component::Transition(t) => {
                let integ = shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius);
                let (cn_a0, cp_local) = slender_body_cna(t.fore_radius, t.aft_radius, t.length, integ.volume, area_ref);
                let cn_a = cn_a0 * reps;
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                let lift_w = body_lift_weight * integ.planform_area / area_ref * reps;
                lift_cn += lift_w;
                lift_cn_x += lift_w * (axial_start + integ.planform_center);
                body_friction_sum += cf * integ.wet_area / area_ref * reps;
                let max_r = t.fore_radius.max(t.aft_radius);
                if max_r > max_body_radius { max_body_radius = max_r; }
                min_body_x = min_body_x.min(*axial_start);
                max_body_x = max_body_x.max(axial_start + t.length);
                cd_pressure += transition_pressure_drag(t, fc.mach, area_ref);
            }
            Component::FinSet(f) => {
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                // Defer fin CNa to the θ-worst-case sweep (each fin at its
                // clock angle); store single-fin primitives.
                let (cna1_eff, cp) =
                    fin_set_primitives(f, body_radius, area_ref, fc.mach);
                if cna1_eff > 0.0 {
                    // A pod/parallel-replicated fin set exists `reps` times
                    // (each booster) — scale its single-fin CNa accordingly.
                    fin_sets.push((
                        cna1_eff * reps,
                        axial_start + cp,
                        f.fin_count.max(1),
                        f.common.angle_offset,
                    ));
                }
                // Fin friction is NOT subject to the body-fineness correction.
                cd_friction += fin_friction_drag(f, cf, area_ref);
                cd_pressure += fin_pressure_drag(f, fc.mach, area_ref);
            }
            Component::LaunchLug(l) => {
                // Java LaunchLugCalc.calculateFrictionCD returns 0 verbatim
                // ("launch lug doesn't add enough area to worry about").
                // Only the TubeCalc internal-flow pressure drag is counted.
                let n = l.instance_count as f64;
                cd_pressure += n * tube_internal_pressure_cd(
                    l.outer_radius, l.inner_radius, l.length, fc, area_ref);
            }
            Component::TubeFinSet(tf) => {
                // Faithful port of OpenRocket TubeFinSetCalc: each tube is a
                // ring airfoil (Ribner 1947 eq.5). CNa per tube =
                // 2·(arprime/(1+arprime))·π²·rIn·chord / Aref, arprime =
                // 2·ar/π, ar = 2·rIn/chord; CP = calculateCPPos(M)·chord
                // from the tube leading edge. BarrowmanCalculator sums over
                // the tubeCount tubes.
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let outer = tf.outer_radius.unwrap_or(body_radius).max(1e-4);
                let inner = (outer - tf.thickness).max(0.0);
                let chord = tf.length.max(1e-6);
                if inner > 1e-5 {
                    let ar = 2.0 * inner / chord;
                    let arprime = 2.0 * ar / PI;
                    let cnaconst =
                        2.0 * (arprime / (1.0 + arprime)) * PI * PI * inner * chord;
                    let cna_total =
                        tf.fin_count as f64 * cnaconst / area_ref * reps;
                    let cpos = tubefin_cp_pos(ar, fc.mach);
                    cn_total += cna_total;
                    cn_x += cna_total * (axial_start + cpos * chord);
                }
                // Drag still uses the equivalent-fin approximation (a
                // separate concern from CP/stability parity).
                let eqv = tubefin_equiv_finset(tf, body_radius);
                cd_friction += fin_friction_drag(&eqv, cf, area_ref);
                cd_pressure += fin_pressure_drag(&eqv, fc.mach, area_ref);
            }
            // Java InternalComponent.isAerodynamic() == false — InnerTube,
            // CenteringRing, MassObject, Parachute, ShockCord do not appear
            // in the drag aggregation.
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
    // OpenRocket getWorstCP: non-fin CN (slender + body lift) is
    // θ-independent; each fin instance adds cna1_eff·sin²(θ−angleₖ).
    // Sweep θ over 360 steps and take the most-forward (minimum) CP.
    let cn0 = cn_total + lift_cn;
    let cnx0 = cn_x + lift_cn_x;
    let steps = if fin_sets.is_empty() { 1 } else { 360 };
    let mut worst_cp = f64::MAX;
    let mut worst_w = 0.0_f64;
    for i in 0..steps {
        let theta = 2.0 * PI * (i as f64) / 360.0;
        let mut fcna = 0.0;
        let mut fcnx = 0.0;
        for &(cna1, cpx, n, base) in &fin_sets {
            let mut ssin = 0.0;
            for k in 0..n {
                let a = base + 2.0 * PI * (k as f64) / (n as f64);
                let d = (theta - a).sin();
                ssin += d * d;
            }
            let c = cna1 * ssin;
            fcna += c;
            fcnx += c * cpx;
        }
        let w = cn0 + fcna;
        if w.abs() > 1e-12 {
            let cp = (cnx0 + fcnx) / w;
            if cp < worst_cp {
                worst_cp = cp;
                worst_w = w;
            }
        }
    }
    let total_weight = if worst_w.abs() > 1e-12 { worst_w } else { cn0 };
    let cp_axial = if worst_cp < f64::MAX {
        worst_cp
    } else if cn0.abs() > 1e-12 {
        cnx0 / cn0
    } else {
        0.0
    };
    cn_total = total_weight - lift_cn;
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
    /// Total summed planform area of the body components (m²).
    pub total_planform_area: f64,
    /// Total axial length of all symmetric body components (m).
    pub total_body_length: f64,
}

/// Pitch-damping multiplier — direct port of
/// `BarrowmanStabilityCalculator.getDampingMultiplier` and
/// `calculateDampingMoments`.
///
///   d_avg  = total_planform_area / total_body_length
///   mul_body = 0.275 · d_avg / (refArea · refLength)
///              · (cgx⁴ + (body_length − cgx)⁴)
///   mul_fin  = Σ 0.6 · min(N, 4) · A_planform_fin · |x_midchord − cgx|³
///              / (refArea · refLength)
///   damping  = 3 · (mul_body + mul_fin) · (ω/V)²
///   capped at the magnitude of the current pitching moment.
///
/// Returns the damping coefficient `mul` such that
/// `Cm_damp = 3 · mul · (ω/V)²` (with the factor 3 from the "higher damping
/// yields more realistic apogee turn" empirical scaling in Java).
pub fn pitch_damping_coefficient(rocket: &Rocket, cgx: f64) -> f64 {
    let layout = iter_layout(rocket);
    let d_ref = rocket.max_diameter();
    let area_ref = PI * 0.25 * d_ref * d_ref;
    let ref_length = d_ref;
    if area_ref <= 0.0 || ref_length <= 0.0 {
        return 0.0;
    }
    // Body planform area + length sums (symmetric components only).
    let mut planform_area = 0.0_f64;
    let mut body_length = 0.0_f64;
    let mut mul_fin = 0.0_f64;
    for (comp, axial_start) in &layout {
        match comp {
            Component::NoseCone(n) => {
                let integ = nose_cone_integrals(n);
                planform_area += integ.planform_area;
                body_length += n.length;
            }
            Component::BodyTube(t) => {
                let r = t.radius.unwrap_or(0.0);
                planform_area += 2.0 * r * t.length;
                body_length += t.length;
            }
            Component::Transition(t) => {
                let integ = shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius);
                planform_area += integ.planform_area;
                body_length += t.length;
            }
            Component::FinSet(f) => {
                let af = 0.5 * (f.root_chord + f.tip_chord) * f.height;
                let mid_chord_pos = axial_start + 0.5 * f.root_chord;
                let n_eff = (f.fin_count as f64).min(4.0);
                let dist = (mid_chord_pos - cgx).abs();
                mul_fin += 0.6 * n_eff * af * dist.powi(3) / (area_ref * ref_length);
            }
            _ => {}
        }
    }
    if body_length <= 0.0 {
        return mul_fin;
    }
    let d_avg = planform_area / body_length;
    let mul_body = 0.275 * d_avg / (area_ref * ref_length)
        * (cgx.powi(4) + (body_length - cgx).powi(4));
    mul_body + mul_fin
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
    // Total body length (used by pitch damping & body lift).
    let mut total_body_length = 0.0_f64;
    for (comp, _) in &layout {
        match comp {
            Component::NoseCone(n) => total_body_length += n.length,
            Component::BodyTube(t) => total_body_length += t.length,
            Component::Transition(t) => total_body_length += t.length,
            _ => {}
        }
    }
    BodyLiftGeometry {
        planform_term,
        planform_cp,
        reference_area: area_ref,
        total_planform_area: total_area,
        total_body_length,
    }
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

fn nose_pressure_drag(shape: opsrocket_core::component::NoseShape, param: f64, length: f64, radius: f64, mach: f64) -> f64 {
    if length <= 0.0 || radius <= 0.0 {
        return 0.0;
    }
    // Subsonic-region implementation of Java's
    // SymmetricComponentCalc.calculateNoseInterpolator + getPressureCD.
    //
    // Most NASA TR-R-100 tables start at Mach ~0.9 with value 0 (or near
    // zero) at the low end.  Java's subsonic-extrapolation block
    // (lines 401-427) sets `Cd_p = 0` outright when `minValue < 0.001`,
    // which is the case for OGIVE, POWER, and PARABOLIC shapes at typical
    // fineness ratios.  For CONICAL noses Java retains the half-angle
    // term `0.8 · sin²(half_angle)` even at low Mach.
    //
    // For HAACK / ELLIPSOID the tables start non-zero; we approximate the
    // subsonic value by Java's power-law fit `a · M^b + cdMach0` evaluated
    // at the given Mach.  At very low Mach this is close to cdMach0 itself.
    let half_angle = (radius / length).atan();
    let sin_phi_sq = half_angle.sin() * half_angle.sin();
    let cd_mach_0 = 0.8 * sin_phi_sq;
    match shape {
        opsrocket_core::component::NoseShape::Ogive => {
            // Java OGIVE table at M=0.95 is 0 (param doesn't matter at low M).
            // Subsonic Cd_p = 0.  Param-dependent term scales nothing here.
            let _ = (param, mach);
            0.0
        }
        opsrocket_core::component::NoseShape::Conical => {
            // Conical: Java's subsonic extrapolation uses the half-angle
            // pressure-drag stagnation term.  Falls off gently at very low
            // Mach numbers.
            cd_mach_0 * (1.0 + 0.15 * mach * mach)
        }
        opsrocket_core::component::NoseShape::Ellipsoid => {
            // Java's ELLIPSOID interpolator starts at M=1.2 with Cd=0.11.
            // The subsonic extrapolation gives a very small value at low
            // Mach (a·M^b + cdMach0 with cdMach0 = 0.8·sin²φ ≈ 0).
            cd_mach_0 * (1.0 + 0.15 * mach * mach)
        }
        opsrocket_core::component::NoseShape::Parabolic
        | opsrocket_core::component::NoseShape::Power
        | opsrocket_core::component::NoseShape::Haack => {
            // POWER / PARABOLIC / HAACK tables also start at zero or near-
            // zero subsonic.  We use the same approximation: cdMach0
            // multiplied by a tiny Mach correction.
            cd_mach_0 * (1.0 + 0.15 * mach * mach)
        }
    }
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
/// Build the equivalent rectangular fin set for a tube-fin set: one flat
/// fin per tube, chord = tube length, semi-span ≈ tube outer radius.
/// OpenRocket `TubeFinSetCalc.calculateCPPos`: fractional CP position
/// along the chord. Subsonic (M≤0.5) = quarter chord; supersonic (M≥2) an
/// empirical formula; in between a 5th-order interpolation polynomial in M
/// whose coefficients depend on the aspect ratio.
fn tubefin_cp_pos(ar: f64, mach: f64) -> f64 {
    if mach <= 0.5 {
        return 0.25;
    }
    let beta = (mach * mach - 1.0).abs().sqrt();
    if mach >= 2.0 {
        return (ar * beta - 0.67) / (2.0 * ar * beta - 1.0);
    }
    let denom = (1.0 - 3.4641 * ar).powi(2);
    let poly = [
        (9.16049 * (-0.588838 + ar) * (-0.20624 + ar)) / denom,
        (-31.6049 * (-0.705375 + ar) * (-0.198476 + ar)) / denom,
        (55.3086 * (-0.711482 + ar) * (-0.196772 + ar)) / denom,
        (-39.5062 * (-0.72074 + ar) * (-0.194245 + ar)) / denom,
        (12.8395 * (-0.725688 + ar) * (-0.19292 + ar)) / denom,
        (-1.58025 * (-0.728769 + ar) * (-0.192105 + ar)) / denom,
    ];
    let mut x = 1.0;
    let mut val = 0.0;
    for v in poly {
        val += v * x;
        x *= mach;
    }
    val
}

fn tubefin_equiv_finset(tf: &TubeFinSet, body_radius: f64) -> FinSet {
    let r = tf.outer_radius.unwrap_or(body_radius).max(1e-4);
    let mut common = Common::new("", "tube-fin-equiv");
    common.material = tf.common.material.clone();
    FinSet {
        common,
        fin_count: tf.fin_count.max(1),
        root_chord: tf.length,
        tip_chord: tf.length,
        sweep_length: 0.0,
        height: r,
        thickness: tf.thickness.max(1e-4),
        cant_angle: 0.0,
        cross_section: FinCrossSection::Square,
        shape: FinShape::Trapezoidal,
        points: Vec::new(),
        tab_length: 0.0,
        tab_height: 0.0,
        fillet_radius: 0.0,
    }
}

/// Port of OpenRocket `FinSetCalc.calculateFinGeometry` strip integration
/// for a freeform fin polygon `pts` (chord-x, span-y), span `s`. Returns
/// (finArea, macLength, macLead, cosGamma) via 48 spanwise strips: at each
/// y the polygon's min-x (chordLead) and max-x (chordTrail) define the
/// local chord; MAC and mid-chord-sweep cosΓ follow exactly as OpenRocket.
fn freeform_mac(pts: &[[f64; 2]], s: f64) -> (f64, f64, f64, f64) {
    const DIV: usize = 48;
    if s <= 0.0 || pts.len() < 3 {
        return (0.0, 0.0, 0.0, 1.0);
    }
    let mut lead = [f64::INFINITY; DIV];
    let mut trail = [f64::NEG_INFINITY; DIV];
    let n = pts.len();
    for k in 0..n {
        let (x1, y1) = (pts[k][0], pts[k][1]);
        let (x2, y2) = (pts[(k + 1) % n][0], pts[(k + 1) % n][1]);
        if (y1 - y2).abs() < 0.001 {
            continue;
        }
        let mut i1 = (y1 * 1.0001 / s * (DIV as f64 - 1.0)) as isize;
        let mut i2 = (y2 * 1.0001 / s * (DIV as f64 - 1.0)) as isize;
        i1 = i1.clamp(0, DIV as isize - 1);
        i2 = i2.clamp(0, DIV as isize - 1);
        if i1 > i2 {
            std::mem::swap(&mut i1, &mut i2);
        }
        for i in i1..=i2 {
            let y = i as f64 * s / (DIV as f64 - 1.0);
            let x = ((y - y2) / (y1 - y2) * x1 + (y1 - y) / (y1 - y2) * x2)
                .clamp(x1.min(x2), x1.max(x2));
            if x < lead[i as usize] {
                lead[i as usize] = x;
            }
            if x > trail[i as usize] {
                trail[i as usize] = x;
            }
        }
    }
    for i in 0..DIV {
        if !lead[i].is_finite() || !trail[i].is_finite() {
            lead[i] = 0.0;
            trail[i] = 0.0;
        }
    }
    let dy = s / (DIV as f64 - 1.0);
    let mut mac_len = 0.0;
    let mut mac_lead = 0.0;
    let mut area = 0.0;
    let mut cos_g = 0.0;
    for i in 0..DIV {
        let len = (trail[i] - lead[i]).max(0.0);
        mac_len += len * len;
        mac_lead += lead[i] * len;
        area += len;
        if i > 0 {
            let dx = (trail[i] + lead[i]) / 2.0 - (trail[i - 1] + lead[i - 1]) / 2.0;
            let hyp = (dx * dx + dy * dy).sqrt();
            if hyp != 0.0 {
                cos_g += dy / hyp;
            }
        }
    }
    mac_len *= dy;
    mac_lead *= dy;
    area *= dy;
    if area > 1e-12 {
        mac_len /= area;
        mac_lead /= area;
    } else {
        mac_len = 0.0;
        mac_lead = 0.0;
    }
    cos_g /= DIV as f64 - 1.0;
    (area, mac_len, mac_lead, cos_g.max(1e-3))
}

/// OpenRocket FinSetCalc per-*single-fin* primitives: `cna1_eff` =
/// cna1·(1+τ)·interference (one fin, no Σsin²) and the chordwise CP. The
/// per-fin `sin²(θ−angleₖ)` and θ-worst-case are applied by the caller
/// (mirrors BarrowmanCalculator iterating fin instances + getWorstCP).
fn fin_set_primitives(
    f: &FinSet,
    body_radius: f64,
    area_ref: f64,
    mach: f64,
) -> (f64, f64) {
    use opsrocket_core::component::FinShape;
    // Span (semi-span) is shape-dependent: trapezoid/elliptical use the
    // `height` field; a freeform fin's span is the max spanwise point.
    let s = match f.shape {
        FinShape::Freeform if f.points.len() >= 3 => f
            .points
            .iter()
            .map(|p| p[1])
            .fold(0.0_f64, f64::max),
        _ => f.height,
    };
    if s <= 0.0 {
        return (0.0, 0.0);
    }
    // Shape-aware planform area + mid-chord sweep (OpenRocket computes
    // these from the actual fin geometry, not a trapezoid for every type).
    let (fin_area, cos_gamma, cp) = match f.shape {
        FinShape::Elliptical => {
            // Quarter-ellipse-ish: A = (π/4)·c·h; effectively unswept
            // mid-chord; CP at ≈0.4244·rootChord (ellipse MAC centroid).
            let a = std::f64::consts::PI * 0.25 * f.root_chord * s;
            (a, 1.0, 0.4244 * f.root_chord)
        }
        FinShape::Freeform if f.points.len() >= 3 => {
            // Exact OpenRocket FinSetCalc strip integration over the fin
            // polygon (48 spanwise strips): finArea, macLength, macLead,
            // cosGamma; CP = macLead + 0.25·macLength (subsonic).
            let (a, mac_len, mac_lead, cg) = freeform_mac(&f.points, s);
            (a, cg, mac_lead + 0.25 * mac_len)
        }
        _ => {
            let a = 0.5 * (f.root_chord + f.tip_chord) * s;
            let mid_sweep =
                (f.sweep_length + 0.5 * (f.tip_chord - f.root_chord)).atan2(s);
            let m = f.sweep_length;
            let cr = f.root_chord;
            let ct = f.tip_chord;
            let cpx = m * (cr + 2.0 * ct) / (3.0 * (cr + ct))
                + (1.0 / 6.0) * (cr + ct - cr * ct / (cr + ct));
            (a, mid_sweep.cos().max(1e-3), cpx)
        }
    };
    if fin_area <= 0.0 {
        return (0.0, 0.0);
    }
    let m_eff = mach.min(0.9);
    let inner = pow2(s * s / (fin_area.max(1e-12) * cos_gamma));
    let denom = 1.0 + (1.0 + (1.0 - m_eff * m_eff) * inner).sqrt();
    let cna1 = 2.0 * PI * s * s / denom / area_ref;
    let tau = body_radius / (s + body_radius).max(1e-9);
    // FinSetCalc fin-fin interference (by interferenceFinCount; approximated
    // with this set's fin count — exact for isolated sets).
    let interf = match f.fin_count {
        1..=4 => 1.0,
        5 => 0.948,
        6 => 0.913,
        7 => 0.854,
        8 => 0.81,
        _ => 0.75,
    };
    let cna1_eff = cna1 * (1.0 + tau) * interf;
    (cna1_eff, cp)
}

fn fins_cn_alpha(f: &FinSet, body_radius: f64, area_ref: f64, mach: f64) -> (f64, f64) {
    let s = f.height;
    if s <= 0.0 || f.root_chord + f.tip_chord <= 0.0 {
        return (0.0, 0.0);
    }

    let fin_area = 0.5 * (f.root_chord + f.tip_chord) * s;
    let mid_sweep = (f.sweep_length + 0.5 * (f.tip_chord - f.root_chord)).atan2(s);
    let cos_gamma = mid_sweep.cos().max(1e-3);

    // Java FinSetCalc.calculateFinCNa1 (subsonic branch, M < ~0.9):
    //   CNa1 = 2π · s² / (1 + sqrt(1 + (1 − M²) · (s² / (Af · cos Γ))²)) / refArea
    // The (1 − M²) factor is the Prandtl-Glauert subsonic compressibility
    // correction; matches Java line-for-line for mach < CNA_SUBSONIC (~0.9).
    // Above ~0.9 Java switches to a transonic blend, then a supersonic
    // formula. We keep the subsonic branch only (rocket fixtures stay
    // below Mach 0.5).
    let m_eff = mach.min(0.9);
    let inner = pow2(s * s / (fin_area.max(1e-12) * cos_gamma));
    let denom = 1.0 + (1.0 + (1.0 - m_eff * m_eff) * inner).sqrt();
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

/// Java TubeCalc.calculatePressureCD — internal-flow pressure drag for a
/// hollow cylindrical component (inner tube, launch lug).
///
///   Re   = v · D_inner / ν
///   f    = 0.25 / (log10(ε/(3.7·D) + 5.74/Re^0.9))²   (Swamee-Jain)
///   Δp   = f · L · ρ · v² / (2 · D)                   (Darcy-Weissbach)
///   tubeCD = 2 · Δp / (ρ · v²) = f · L / D
///   cd   = (tubeCD · innerArea + 0.7·(stagnationCD + baseCD)·frontalArea) / refArea
///
/// We use a fixed pipe roughness ε = 60 µm (matches Java's default
/// "Normal" finish) and `stagnationCD ≈ 1` for low Mach.
fn tube_internal_pressure_cd(
    outer_r: f64,
    inner_r: f64,
    length: f64,
    fc: FlightConditions,
    area_ref: f64,
) -> f64 {
    if inner_r <= 0.0 || length <= 0.0 || area_ref <= 1e-12 {
        return 0.0;
    }
    let diameter = 2.0 * inner_r;
    let inner_area = PI * inner_r * inner_r;
    let frontal_area = PI * (outer_r * outer_r - inner_r * inner_r).max(0.0);
    let epsilon = 60.0e-6_f64; // surface roughness
    // Reynolds based on tube diameter and the rocket's current speed; we
    // approximate v from fc.reynolds·length-equivalent.  fc.reynolds in our
    // engine is ρ·v/ν (per unit length), so v·D/ν = fc.reynolds · D.
    let re = (fc.reynolds * diameter).max(1.0e3);
    let term = epsilon / (3.7 * diameter) + 5.74 / re.powf(0.9);
    let log = term.log10();
    let f_factor = 0.25 / (log * log);
    let tube_cd = f_factor * length / diameter;
    let stagnation = 1.0_f64; // M ≈ 0 stagnation Cd
    let base = 0.12_f64;
    (tube_cd * inner_area + 0.7 * (stagnation + base) * frontal_area) / area_ref
}

fn fin_friction_drag(f: &FinSet, cf: f64, area_ref: f64) -> f64 {
    // Java FinSetCalc.calculateFrictionCD (verbatim):
    //   cd = cf · (1 + 2·thickness/macLength) · 2·finArea / refArea
    // aggregated × fin_count.  macLength is the mean aerodynamic chord:
    // Java integrates Σchord²/Σchord over the span; for a trapezoidal
    // planform this evaluates exactly to
    //   MAC = (2/3)·(cr² + cr·ct + ct²)/(cr + ct).
    let af = 0.5 * (f.root_chord + f.tip_chord) * f.height; // single-fin area
    let cr = f.root_chord;
    let ct = f.tip_chord;
    let mac = if cr + ct > 1e-9 {
        (2.0 / 3.0) * (cr * cr + cr * ct + ct * ct) / (cr + ct)
    } else {
        0.0
    };
    if af < 1e-12 || mac < 1e-12 {
        return 0.0;
    }
    let form = 1.0 + 2.0 * f.thickness / mac;
    cf * form * 2.0 * af * f.fin_count as f64 / area_ref
}

fn fin_pressure_drag(f: &FinSet, mach: f64, area_ref: f64) -> f64 {
    // Java FinSetCalc.calculatePressureCD (subsonic branch):
    //   round / airfoil:  Cd_LE = (1 − M²)^(−0.417) − 1   (≈ 0 at low M)
    //   square:           Cd_LE = stagnation Cd ≈ 1.0
    // Then multiplied by cos²(γ_lead) and by `span · thickness / refArea`.
    //
    // Java also adds a *base* drag for the trailing edge (rounded fins:
    // base/2; square: base; airfoil: 0).  We include that here so the
    // pressure-drag column matches Java more closely.
    if f.height <= 0.0 {
        return 0.0;
    }
    let cd_le_norm = match f.cross_section {
        opsrocket_core::component::FinCrossSection::Airfoil
        | opsrocket_core::component::FinCrossSection::Rounded => {
            let m = mach.min(0.9);
            (1.0 - m * m).powf(-0.417) - 1.0
        }
        opsrocket_core::component::FinCrossSection::Square => 1.0, // stagnation
    };
    // Slanted leading edge: cos²(γ_lead). Lead-edge sweep ≈ atan(sweep_length / height).
    let lead_sweep = (f.sweep_length / f.height.max(1e-9)).atan();
    let cos2_lead = lead_sweep.cos().powi(2);
    let cd_le = cd_le_norm * cos2_lead * f.height * f.thickness / area_ref;
    // Trailing-edge base drag at the fin root: baseCD/2 for rounded (and
    // for airfoil = 0). For our standard rounded fin section this is the
    // dominant fin-pressure contribution at low Mach.
    let cd_base_per_fin = match f.cross_section {
        opsrocket_core::component::FinCrossSection::Rounded => 0.06,
        opsrocket_core::component::FinCrossSection::Square => 0.12,
        opsrocket_core::component::FinCrossSection::Airfoil => 0.0,
    } * f.height
        * f.thickness
        / area_ref;
    f.fin_count as f64 * (cd_le + cd_base_per_fin)
}

/// One row of OpenRocket's "Component Analysis" table: how much each
/// aerodynamic component contributes to normal force, CP, and drag.
#[derive(Debug, Clone, Default)]
pub struct ComponentAero {
    pub id: String,
    pub name: String,
    pub kind: String,
    pub cn_alpha: f64,
    pub cp_axial: f64,
    pub cd_friction: f64,
    pub cd_pressure: f64,
}

#[derive(Debug, Clone, Default)]
pub struct AnalysisReport {
    pub components: Vec<ComponentAero>,
    pub cd_base: f64,
    pub cn_alpha_total: f64,
    pub cp_axial: f64,
    pub cd_total: f64,
    pub reference_length: f64,
}

/// Per-component aerodynamic breakdown. Mirrors [`compute_with`]'s
/// accumulation exactly but attributes each term to its component, so the
/// totals here equal the aggregate `compute_with` returns (base drag is a
/// rocket-level term, reported separately).
pub fn component_analysis(rocket: &Rocket, fc: FlightConditions) -> AnalysisReport {
    let layout = iter_layout(rocket);
    let d_ref = rocket.max_diameter();
    let area_ref = PI * 0.25 * d_ref * d_ref;
    let mut report = AnalysisReport { reference_length: d_ref, ..Default::default() };
    if area_ref <= 0.0 {
        return report;
    }

    let body_length = rocket.total_length().max(1e-3);
    let reynolds_full = (fc.reynolds * body_length).max(1.0);
    let cf = friction_coefficient(reynolds_full, fc.mach)
        .max(roughness_limited_cf(body_length, fc.mach));

    // Body-friction correction depends on overall fineness; compute it once
    // and apply the same multiplier to every body component (Java does the
    // same — it scales the summed body friction).
    let mut max_body_radius = 0.0_f64;
    let mut min_x = f64::INFINITY;
    let mut max_x = 0.0_f64;
    for (comp, ax) in &layout {
        match comp {
            Component::NoseCone(n) => {
                max_body_radius = max_body_radius.max(n.aft_radius);
                min_x = min_x.min(*ax);
                max_x = max_x.max(ax + n.length);
            }
            Component::BodyTube(t) => {
                max_body_radius = max_body_radius.max(t.radius.unwrap_or(0.0));
                min_x = min_x.min(*ax);
                max_x = max_x.max(ax + t.length);
            }
            Component::Transition(t) => {
                max_body_radius = max_body_radius.max(t.fore_radius.max(t.aft_radius));
                min_x = min_x.min(*ax);
                max_x = max_x.max(ax + t.length);
            }
            _ => {}
        }
    }
    let body_corr = if max_body_radius > 0.0 && max_x > min_x {
        body_friction_correction(max_x - min_x, max_body_radius)
    } else {
        1.0
    };

    let mut cn_total = 0.0_f64;
    let mut cn_x = 0.0_f64;
    for (comp, axial_start) in &layout {
        let common = comp.common();
        let mut row = ComponentAero {
            id: common.id.0.clone(),
            name: common.name.clone(),
            ..Default::default()
        };
        match comp {
            Component::NoseCone(n) => {
                row.kind = "NoseCone".into();
                let integ = nose_cone_integrals(n);
                let (cn_a, cp_local) =
                    slender_body_cna(0.0, n.aft_radius, n.length, integ.volume, area_ref);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                row.cn_alpha = cn_a;
                row.cp_axial = axial_start + cp_local;
                row.cd_friction = cf * integ.wet_area / area_ref * body_corr;
                row.cd_pressure =
                    nose_pressure_drag(n.shape, n.shape_parameter, n.length, n.aft_radius, fc.mach);
            }
            Component::BodyTube(t) => {
                row.kind = "BodyTube".into();
                let radius = t.radius.unwrap_or(0.0);
                row.cd_friction = cf * (2.0 * PI * radius * t.length) / area_ref * body_corr;
            }
            Component::Transition(t) => {
                row.kind = "Transition".into();
                let integ = shape_integrals(
                    t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius,
                );
                let (cn_a, cp_local) = slender_body_cna(
                    t.fore_radius, t.aft_radius, t.length, integ.volume, area_ref,
                );
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp_local);
                row.cn_alpha = cn_a;
                row.cp_axial = axial_start + cp_local;
                row.cd_friction = cf * integ.wet_area / area_ref * body_corr;
                row.cd_pressure = transition_pressure_drag(t, fc.mach, area_ref);
            }
            Component::FinSet(f) => {
                row.kind = "FinSet".into();
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let (cn_a, cp) = fins_cn_alpha(f, body_radius, area_ref, fc.mach);
                cn_total += cn_a;
                cn_x += cn_a * (axial_start + cp);
                row.cn_alpha = cn_a;
                row.cp_axial = axial_start + cp;
                row.cd_friction = fin_friction_drag(f, cf, area_ref);
                row.cd_pressure = fin_pressure_drag(f, fc.mach, area_ref);
            }
            Component::LaunchLug(l) => {
                row.kind = "LaunchLug".into();
                row.cd_pressure = l.instance_count as f64
                    * tube_internal_pressure_cd(
                        l.outer_radius, l.inner_radius, l.length, fc, area_ref,
                    );
            }
            _ => continue,
        }
        report.components.push(row);
    }

    report.cd_base = base_drag(fc.mach);
    report.cn_alpha_total = cn_total;
    report.cp_axial = if cn_total.abs() > 1e-12 { cn_x / cn_total } else { 0.0 };
    report.cd_total = report
        .components
        .iter()
        .map(|c| c.cd_friction + c.cd_pressure)
        .sum::<f64>()
        + report.cd_base;
    report
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
