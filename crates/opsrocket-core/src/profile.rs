//! Shape-aware geometric integrals for axisymmetric components.
//!
//! Ports `info.openrocket.core.rocketcomponent.Transition.Shape.getRadius`
//! (Java) plus the numerical integration in `SymmetricComponent.calculateProperties`.
//!
//! Provides per-shape:
//!   - radius(x): exact radius at position x along the body
//!   - volume / wet area / planform area / planform center
//!     by Simpson-rule integration over `INTEGRATION_STEPS` segments.
//!
//! These quantities feed the Barrowman slender-body formula
//! (`CN_α = 2·(A_aft − A_fore)`, `CP = (L·A_aft − V_full) / (A_aft − A_fore)`)
//! and are also used by the mass calculator for proper shape-aware CG / MoI.

use crate::component::{NoseShape, Transition};

/// Number of integration steps per body component.
///
/// Java's `SymmetricComponent.calculateProperties` uses exactly
/// `DIVISIONS = 128`.  Matching that value bit-for-bit matters: the ogive
/// tip region has high curvature and the frustum-sum wetted area is *not*
/// fully converged at 128 divisions, so a finer grid (e.g. 256) yields a
/// ~10% larger ogive wetted area and a friction-Cd mismatch vs Java.  We
/// deliberately use Java's coarse value for output parity.
const INTEGRATION_STEPS: usize = 128;

/// Radius (m) at position `x` along a transition profile of length `length`,
/// going from `r_fore` (x=0) to `r_aft` (x=length).
///
/// Direct port of `Transition.getRadius(x)` + the per-shape lambdas.
pub fn shape_radius(
    shape: NoseShape,
    param: f64,
    x: f64,
    r_fore: f64,
    r_aft: f64,
    length: f64,
) -> f64 {
    if x <= 0.0 { return r_fore; }
    if x >= length { return r_aft; }
    if r_fore == r_aft { return r_fore; }

    // Java flips the profile if r1 > r2 to always work with "small-to-large".
    let (mut x, length, r1, r2) = if r_fore > r_aft {
        (length - x, length, r_aft, r_fore)
    } else {
        (x, length, r_fore, r_aft)
    };
    // For OGIVE the Java code uses the "clipped" path for transitions where
    // r_fore > 0. We model the non-clipped case directly here, which is
    // exact for nose cones (r_fore = 0) and a very close approximation for
    // shallow shoulder shapes.
    let radial = r2 - r1;
    let mut len = length;
    let r_base = r1;

    // For ogive: rescale if length < radial
    if matches!(shape, NoseShape::Ogive) && len < radial {
        x = x * radial / len;
        len = radial;
    }

    let delta = match shape {
        NoseShape::Conical => radial * x / len,
        NoseShape::Ogive => {
            const MIN_FEATURE: f64 = 1.0e-5;
            if param < MIN_FEATURE {
                radial * x / len // collapses to conical
            } else {
                let big_r = ((len * len + radial * radial)
                    * (((2.0 - param) * len).powi(2) + (param * radial).powi(2))
                    / (4.0 * (param * radial).powi(2)))
                .sqrt();
                let big_l = len / param;
                let y0 = (big_r * big_r - big_l * big_l).max(0.0).sqrt();
                (big_r * big_r - (big_l - x) * (big_l - x)).max(0.0).sqrt() - y0
            }
        }
        NoseShape::Ellipsoid => {
            let xs = x * radial / len;
            (2.0 * radial * xs - xs * xs).max(0.0).sqrt()
        }
        NoseShape::Power => {
            if param <= 1e-5 {
                if x <= 1e-5 { 0.0 } else { radial }
            } else {
                radial * (x / len).powf(param)
            }
        }
        NoseShape::Parabolic => {
            radial * ((2.0 * x / len - param * (x / len).powi(2)) / (2.0 - param))
        }
        NoseShape::Haack => {
            let theta = (1.0 - 2.0 * x / len).clamp(-1.0, 1.0).acos();
            let sin_t = theta.sin();
            let inner = if param == 0.0 {
                (theta - (2.0 * theta).sin() / 2.0) / std::f64::consts::PI
            } else {
                (theta - (2.0 * theta).sin() / 2.0 + param * sin_t.powi(3))
                    / std::f64::consts::PI
            };
            radial * inner.max(0.0).sqrt()
        }
    };
    r_base + delta
}

/// Geometric integrals over a transition / nose cone shape.
#[derive(Debug, Clone, Copy)]
pub struct ShapeIntegrals {
    /// Filled volume (m³).
    pub volume: f64,
    /// CG axial offset relative to fore end (m), weighted by volume.
    pub cg_axial: f64,
    /// Wetted (outside) area (m²).
    pub wet_area: f64,
    /// Planform area (side-view area, m²): integral of 2·r dx.
    pub planform_area: f64,
    /// Planform center (m, relative to fore end): integral of x·2·r / planform_area.
    pub planform_center: f64,
}

/// Compute the geometric integrals for a transition / nose cone using
/// composite Simpson's rule.
pub fn shape_integrals(
    shape: NoseShape,
    param: f64,
    length: f64,
    r_fore: f64,
    r_aft: f64,
) -> ShapeIntegrals {
    if length <= 0.0 {
        return ShapeIntegrals {
            volume: 0.0,
            cg_axial: 0.0,
            wet_area: 0.0,
            planform_area: 0.0,
            planform_center: 0.0,
        };
    }
    let n = INTEGRATION_STEPS;
    let dx = length / n as f64;
    let sample = |i: usize| -> f64 {
        let x = (i as f64) * dx;
        shape_radius(shape, param, x, r_fore, r_aft, length)
    };

    // Simpson's rule for cross-section integrand (volume = ∫ π r² dx, etc.).
    let pi = std::f64::consts::PI;
    let mut vol = 0.0;
    let mut vol_x = 0.0;
    let mut wet = 0.0;
    let mut plan = 0.0;
    let mut plan_x = 0.0;

    // Pre-compute radius samples (we need r at i and i+1 for area, plus dr).
    let mut prev_r = sample(0);
    for i in 0..n {
        let r0 = if i == 0 { prev_r } else { prev_r };
        let r1 = sample(i + 1);
        let x_mid = (i as f64 + 0.5) * dx;
        let r_mid = shape_radius(shape, param, x_mid, r_fore, r_aft, length);

        // Volume: ∫ π r² dx — Simpson on cross-section area.
        let a0 = pi * r0 * r0;
        let a_mid = pi * r_mid * r_mid;
        let a1 = pi * r1 * r1;
        let dvol = dx * (a0 + 4.0 * a_mid + a1) / 6.0;
        vol += dvol;
        // CG contribution: ∫ x π r² dx
        let x0 = i as f64 * dx;
        let x1 = (i + 1) as f64 * dx;
        let dvol_x =
            dx * (x0 * a0 + 4.0 * x_mid * a_mid + x1 * a1) / 6.0;
        vol_x += dvol_x;

        // Wet area: ∫ 2π r √(1 + (dr/dx)²) dx — Simpson on lateral element.
        // Approximate slant via trapezoidal slant ≈ √((r1-r0)² + dx²).
        let slant = ((r1 - r0).powi(2) + dx * dx).sqrt();
        let avg_r = 0.5 * (r0 + r1);
        wet += 2.0 * pi * avg_r * slant;

        // Planform area: ∫ 2 r dx
        let dplan = dx * (2.0 * r0 + 4.0 * 2.0 * r_mid + 2.0 * r1) / 6.0;
        plan += dplan;
        let dplan_x = dx * (x0 * 2.0 * r0 + 4.0 * x_mid * 2.0 * r_mid + x1 * 2.0 * r1) / 6.0;
        plan_x += dplan_x;

        prev_r = r1;
    }

    let cg_axial = if vol > 0.0 { vol_x / vol } else { 0.5 * length };
    let planform_center = if plan > 0.0 { plan_x / plan } else { 0.5 * length };
    ShapeIntegrals {
        volume: vol,
        cg_axial,
        wet_area: wet,
        planform_area: plan,
        planform_center,
    }
}

/// Filled volume + CG proxy of a conical frustum, exactly as OpenRocket
/// `SymmetricComponent.calculateCG` (returns 3/π × true volume; π/3 is
/// applied once after the integration loop). Correct for r1=r2, r=0 too.
fn frustum_cg(l: f64, r1: f64, r2: f64) -> (f64, f64) {
    let vol = l * (r1 * r1 + r1 * r2 + r2 * r2);
    let cg = if vol < 1.0e-12 {
        l / 2.0
    } else {
        l * (r1 * r1 + 2.0 * r1 * r2 + 3.0 * r2 * r2)
            / (4.0 * (r1 * r1 + r1 * r2 + r2 * r2))
    };
    (vol, cg)
}

/// Exact wall volume (m³) and volume-weighted CG offset (m, from the fore
/// end) of a (possibly hollow) symmetric component — a bit-for-bit port of
/// OpenRocket `SymmetricComponent.calculateProperties`: 128-division sum of
/// `frustum(outer) − frustum(inner)`, where the wall is offset along the
/// surface normal (`height = thickness·hyp/l`), NOT a flat `thickness`.
/// This replaces the `wet_area·thickness` thin-shell approximation, which
/// over-estimates curved nose cones by ~10%.
pub fn shell_volume_cg(
    shape: NoseShape,
    param: f64,
    length: f64,
    r_fore: f64,
    r_aft: f64,
    thickness: f64,
    filled: bool,
) -> (f64, f64) {
    if length < 1.0e-9 {
        return (0.0, length / 2.0);
    }
    const DIVISIONS: usize = 128;
    let mut volume = 0.0;
    let mut cgx = 0.0;
    for n in 0..DIVISIONS {
        let x1 = n as f64 * length / DIVISIONS as f64;
        let x2 = (n + 1) as f64 * length / DIVISIONS as f64;
        let l = x2 - x1;
        let r1o = shape_radius(shape, param, x1, r_fore, r_aft, length);
        let r2o = shape_radius(shape, param, x2, r_fore, r_aft, length);
        let hyp = ((r2o - r1o).powi(2) + l * l).sqrt();
        let height = thickness * hyp / l;
        let (r1i, r2i) = if filled {
            (0.0, 0.0)
        } else {
            ((r1o - height).max(0.0), (r2o - height).max(0.0))
        };
        let (vf, cgf) = frustum_cg(l, r1o, r2o);
        let (vi, cgi) = frustum_cg(l, r1i, r2i);
        let dv = vf - vi;
        if dv.abs() < 1.0e-15 {
            continue;
        }
        let dcg = (cgf * vf - cgi * vi) / dv;
        cgx += dv * (x1 + dcg);
        volume += dv;
    }
    let pi = std::f64::consts::PI;
    volume *= pi / 3.0;
    cgx *= pi / 3.0;
    let cg = if volume < 1.0e-10 {
        length / 2.0
    } else {
        cgx / volume
    };
    (volume.max(0.0), cg)
}

/// `SymmetricComponent.calculateUnitRotMOI` (returns 10/3 × the true value;
/// corrected by the ×3/10 factor in `shell_unit_inertia`).
fn calc_unit_rot_moi(r1: f64, r2: f64) -> f64 {
    if (r1 - r2).abs() < 1.0e-12 {
        return 10.0 * r1 * r1 / 6.0;
    }
    (r2.powi(5) - r1.powi(5)) / (r2.powi(3) - r1.powi(3))
}

/// `SymmetricComponent.calculateLongMOICone` (requires ×π later, which
/// cancels in the unit-inertia normalisation).
fn calc_long_moi_cone(h: f64, r: f64) -> f64 {
    let m = r * r * h;
    3.0 * m * (r * r / 20.0 + h * h / 5.0)
}

/// `SymmetricComponent.calculateLongMOI` (frustum longitudinal MOI about its
/// CG; `cg` = (volume-proxy weight, cg-x) from `frustum_cg`).
fn calc_long_moi(l: f64, mut r1: f64, mut r2: f64, cg_w: f64, cg_x: f64) -> f64 {
    if (r1 - r2).abs() < 1.0e-12 {
        return cg_w * (3.0 * r1 * r1 + l * l) / 12.0;
    }
    let mut shift_cg = cg_x;
    if r1 > r2 {
        std::mem::swap(&mut r1, &mut r2);
        shift_cg = l - cg_x;
    }
    let h2 = l * r2 / (r2 - r1);
    let h1 = h2 * r1 / r2;
    let moi1 = calc_long_moi_cone(h1, r1);
    let moi2 = calc_long_moi_cone(h2, r2);
    let mut moi = moi2 - moi1;
    moi -= (h1 + shift_cg).powi(2) * cg_w;
    moi
}

/// Faithful port of the MOI part of `SymmetricComponent.calculateProperties`.
/// Returns `(rotational_unit_inertia, longitudinal_unit_inertia)` — exactly
/// `getRotationalUnitInertia()` / `getLongitudinalUnitInertia()` (the latter
/// already shifted to the component CG). Multiply by the component mass to
/// get the physical MOI (`MassCalculation.calculateStructure`).
pub fn shell_unit_inertia(
    shape: NoseShape,
    param: f64,
    length: f64,
    r_fore: f64,
    r_aft: f64,
    thickness: f64,
    filled: bool,
) -> (f64, f64) {
    if length < 1.0e-9 {
        return (0.0, 0.0);
    }
    const DIVISIONS: usize = 128;
    let mut volume = 0.0;
    let mut cgx = 0.0;
    let mut rot = 0.0;
    let mut long = 0.0;
    for n in 0..DIVISIONS {
        let x1 = n as f64 * length / DIVISIONS as f64;
        let x2 = (n + 1) as f64 * length / DIVISIONS as f64;
        let l = x2 - x1;
        let r1o = shape_radius(shape, param, x1, r_fore, r_aft, length);
        let r2o = shape_radius(shape, param, x2, r_fore, r_aft, length);
        let hyp = ((r2o - r1o).powi(2) + l * l).sqrt();
        let height = thickness * hyp / l;
        let (r1i, r2i) = if filled {
            (0.0, 0.0)
        } else {
            ((r1o - height).max(0.0), (r2o - height).max(0.0))
        };
        let (vf, cgf) = frustum_cg(l, r1o, r2o);
        let (vi, cgi) = frustum_cg(l, r1i, r2i);
        let dv = vf - vi;
        if dv.abs() < 1.0e-15 {
            continue;
        }
        let dcg = (cgf * vf - cgi * vi) / dv;
        let ixxo = calc_unit_rot_moi(r1o, r2o);
        let ixxi = calc_unit_rot_moi(r1i, r2i);
        let ixx = ixxo * vf - ixxi * vi;
        let mut iyy = calc_long_moi(l, r1o, r2o, vf, cgf) - calc_long_moi(l, r1i, r2i, vi, cgi);
        iyy += dv * (x1 + dcg).powi(2);
        volume += dv;
        cgx += dv * (x1 + dcg);
        rot += ixx;
        long += iyy;
    }
    if volume < 1.0e-12 {
        return (0.0, 0.0);
    }
    rot /= volume;
    long /= volume;
    rot *= 3.0 / 10.0;
    let cg_x = cgx / volume;
    long -= cg_x * cg_x;
    (rot, long)
}

/// Convenience: integrals for a [`Transition`] component.
pub fn transition_integrals(t: &Transition) -> ShapeIntegrals {
    shape_integrals(t.shape, t.shape_parameter, t.length, t.fore_radius, t.aft_radius)
}

#[cfg(test)]
mod tests {
    use super::*;
    use approx::assert_relative_eq;

    #[test]
    fn conical_volume_matches_analytic() {
        // Conical nose cone (r_fore=0): V = π r² L / 3
        let result = shape_integrals(NoseShape::Conical, 1.0, 0.1, 0.0, 0.025);
        let analytic = std::f64::consts::PI * 0.025 * 0.025 * 0.1 / 3.0;
        assert_relative_eq!(result.volume, analytic, max_relative = 1e-6);
    }

    #[test]
    fn cylinder_volume_matches() {
        // Zero-taper "transition" — should give a cylinder
        let r = 0.025;
        let l = 0.3;
        let result = shape_integrals(NoseShape::Conical, 1.0, l, r, r);
        let analytic = std::f64::consts::PI * r * r * l;
        assert_relative_eq!(result.volume, analytic, max_relative = 1e-9);
    }

    #[test]
    fn conical_cg_is_three_quarters_l() {
        // CG of a solid cone (from base) = L/4, so from tip = 3L/4.
        let result = shape_integrals(NoseShape::Conical, 1.0, 0.1, 0.0, 0.025);
        assert_relative_eq!(result.cg_axial, 0.075, max_relative = 1e-6);
    }
}
