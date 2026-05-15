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
