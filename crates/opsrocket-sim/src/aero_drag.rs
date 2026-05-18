//! Faithful port of `info.openrocket.core.aerodynamics.BarrowmanDragCalculator`
//! plus the per-component `calculateFrictionCD` / `calculatePressureCD` /
//! `calculateComponentBaseCD` from `SymmetricComponentCalc`, `FinSetCalc`,
//! `TubeCalc`, `TubeFinSetCalc` and `LaunchLugCalc`.
//!
//! This replaces the previous subsonic-only drag approximation. CP/CNa is
//! computed elsewhere (unchanged); this module only produces the drag
//! coefficients (friction, pressure, base, override, axial).

use opsrocket_core::component::{Component, FinSet, FinShape, NoseShape, Rocket};
use opsrocket_core::interp::{LinearInterpolator, PolyInterpolator};
use opsrocket_core::profile::{shape_integrals, shape_radius};
use opsrocket_core::units::PI;

use crate::aero::{freeform_mac, local_body_radius, tube_internal_pressure_cd};
use crate::mass::{iter_layout, iter_layout_reps};

#[inline]
fn pow2(x: f64) -> f64 {
    x * x
}

/// `BarrowmanDragCalculator.calculateStagnationCD`.
pub fn stagnation_cd(m: f64) -> f64 {
    let pressure = if m <= 1.0 {
        1.0 + pow2(m) / 4.0 + pow2(pow2(m)) / 40.0
    } else {
        1.84 - 0.76 / pow2(m) + 0.166 / pow2(pow2(m)) + 0.035 / pow2(m * m * m)
    };
    0.85 * pressure
}

/// `BarrowmanDragCalculator.calculateBaseCD`.
pub fn base_cd(m: f64) -> f64 {
    if m <= 1.0 {
        0.12 + 0.13 * m * m
    } else {
        0.25 / m
    }
}

/// `BarrowmanDragCalculator.calculateFrictionCoefficient`.
fn friction_coefficient(perfect_finish: bool, mach: f64, re: f64) -> f64 {
    let mut cf;
    let mut c1 = 1.0;
    let mut c2 = 1.0;
    if perfect_finish {
        if re < 1.0e4 {
            cf = 1.33e-2;
        } else if re < 5.39e5 {
            cf = 1.328 / re.sqrt();
        } else {
            cf = 1.0 / pow2(1.50 * re.ln() - 5.6) - 1700.0 / re;
        }
        if mach < 1.1 && re > 1.0e6 {
            if re < 3.0e6 {
                c1 = 1.0 - 0.1 * pow2(mach) * (re - 1.0e6) / 2.0e6;
            } else {
                c1 = 1.0 - 0.1 * pow2(mach);
            }
        }
        if mach > 0.9 && re > 1.0e6 {
            if re < 3.0e6 {
                c2 = 1.0
                    + (1.0 / (1.0 + 0.045 * pow2(mach)).powf(0.25) - 1.0) * (re - 1.0e6) / 2.0e6;
            } else {
                c2 = 1.0 / (1.0 + 0.045 * pow2(mach)).powf(0.25);
            }
        }
        if mach < 0.9 {
            cf *= c1;
        } else if mach < 1.1 {
            cf *= c2 * (mach - 0.9) / 0.2 + c1 * (1.1 - mach) / 0.2;
        } else {
            cf *= c2;
        }
    } else {
        if re < 1.0e4 {
            cf = 1.48e-2;
        } else {
            cf = 1.0 / pow2(1.50 * re.ln() - 5.6);
        }
        if mach < 1.1 {
            c1 = 1.0 - 0.1 * pow2(mach);
        }
        if mach > 0.9 {
            c2 = 1.0 / (1.0 + 0.15 * pow2(mach)).powf(0.58);
        }
        if mach < 0.9 {
            cf *= c1;
        } else if mach < 1.1 {
            cf *= c2 * (mach - 0.9) / 0.2 + c1 * (1.1 - mach) / 0.2;
        } else {
            cf *= c2;
        }
    }
    cf
}

/// `BarrowmanDragCalculator.calculateRoughnessCorrection`.
fn roughness_correction(mach: f64) -> f64 {
    if mach < 0.9 {
        1.0 - 0.1 * pow2(mach)
    } else if mach > 1.1 {
        1.0 / (1.0 + 0.18 * pow2(mach))
    } else {
        let c1 = 1.0 - 0.1 * pow2(0.9);
        let c2 = 1.0 / (1.0 + 0.18 * pow2(1.1));
        c2 * (mach - 0.9) / 0.2 + c1 * (1.1 - mach) / 0.2
    }
}

// ---- NASA TR-R-100 nose pressure-drag interpolator (SymmetricComponentCalc) ----

fn li(x: &[f64], y: &[f64]) -> LinearInterpolator {
    LinearInterpolator::with_points(x, y)
}

fn blunt_interpolator() -> LinearInterpolator {
    let mut b = LinearInterpolator::new();
    let mut m = 0.0;
    while m < 3.0 {
        b.add_point(m, stagnation_cd(m));
        m += 0.05;
    }
    b
}

const GAMMA: f64 = 1.4;

/// `SymmetricComponentCalc.calculateOgiveNoseInterpolator`.
fn ogive_nose_interpolator(param: f64, sinphi: f64) -> LinearInterpolator {
    let mut interp = LinearInterpolator::new();
    let cd_mach1 = sinphi;
    let cd_mach1_3 = 2.1 * pow2(sinphi) + 0.6019 * sinphi;
    let poly_i = PolyInterpolator::new(&[&[1.0, 1.3], &[1.0, 1.3]]);
    let poly = poly_i.interpolator(&[
        cd_mach1,
        cd_mach1_3,
        4.0 / (GAMMA + 1.0) * (1.0 - 0.5 * cd_mach1),
        -1.1341 * sinphi,
    ]);
    let mul = 0.72 * pow2(param - 0.5) + 0.82;
    let mut m = 1.0;
    while m < 1.3001 {
        interp.add_point(m, mul * PolyInterpolator::eval(m, &poly));
        m += 0.02;
    }
    let mut m = 1.32;
    while m < 4.0 {
        interp.add_point(
            m,
            mul * (2.1 * pow2(sinphi) + 0.5 * sinphi / (m * m - 1.0).max(0.0).sqrt()),
        );
        m += 0.02;
    }
    interp
}

/// `SymmetricComponentCalc.calculateNoseInterpolator`.
fn nose_interpolator(shape: NoseShape, param: f64, fineness: f64, sinphi: f64) -> LinearInterpolator {
    let blunt = blunt_interpolator();
    let ellipsoid = li(
        &[1.2, 1.25, 1.3, 1.4, 1.6, 2.0, 2.4],
        &[0.110, 0.128, 0.140, 0.148, 0.152, 0.159, 0.162],
    );
    let x14 = li(
        &[1.2, 1.3, 1.4, 1.6, 1.8, 2.2, 2.6, 3.0, 3.6],
        &[0.140, 0.156, 0.169, 0.192, 0.206, 0.227, 0.241, 0.249, 0.252],
    );
    let x12 = li(
        &[0.925, 0.95, 1.0, 1.05, 1.1, 1.2, 1.3, 1.7, 2.0],
        &[0.0, 0.014, 0.050, 0.060, 0.059, 0.081, 0.084, 0.085, 0.078],
    );
    let x34 = li(
        &[0.8, 0.9, 1.0, 1.06, 1.2, 1.4, 1.6, 2.0, 2.8, 3.4],
        &[0.0, 0.015, 0.078, 0.121, 0.110, 0.098, 0.090, 0.084, 0.078, 0.074],
    );
    let von_karman = li(
        &[0.9, 0.95, 1.0, 1.05, 1.1, 1.2, 1.4, 1.6, 2.0, 3.0],
        &[0.0, 0.010, 0.027, 0.055, 0.070, 0.081, 0.095, 0.097, 0.091, 0.083],
    );
    let lv_haack = li(
        &[0.9, 0.95, 1.0, 1.05, 1.1, 1.2, 1.4, 1.6, 2.0],
        &[0.0, 0.010, 0.024, 0.066, 0.084, 0.100, 0.114, 0.117, 0.113],
    );
    let parabolic = li(
        &[0.95, 0.975, 1.0, 1.05, 1.1, 1.2, 1.4, 1.7],
        &[0.0, 0.016, 0.041, 0.092, 0.109, 0.119, 0.113, 0.108],
    );
    let parabolic12 = li(
        &[0.8, 0.9, 0.95, 1.0, 1.05, 1.1, 1.3, 1.5, 1.8],
        &[0.0, 0.016, 0.042, 0.100, 0.126, 0.125, 0.100, 0.090, 0.088],
    );
    let parabolic34 = li(
        &[0.9, 0.95, 1.0, 1.05, 1.1, 1.2, 1.4, 1.7],
        &[0.0, 0.023, 0.073, 0.098, 0.107, 0.106, 0.089, 0.082],
    );

    let mut interpolator = LinearInterpolator::new();
    #[allow(unused_assignments)]
    let mut int1: Option<LinearInterpolator> = None;
    let mut int2: Option<LinearInterpolator> = None;
    let mut p = 0.0;

    match shape {
        NoseShape::Conical => {
            return ogive_nose_interpolator(0.0, sinphi);
        }
        NoseShape::Ogive => {
            return ogive_nose_interpolator(param, sinphi);
        }
        NoseShape::Ellipsoid => {
            int1 = Some(ellipsoid);
        }
        NoseShape::Power => {
            if param <= 0.25 {
                int1 = Some(blunt.clone());
                int2 = Some(x14);
                p = param * 4.0;
            } else if param <= 0.5 {
                int1 = Some(x14);
                int2 = Some(x12);
                p = (param - 0.25) * 4.0;
            } else if param <= 0.75 {
                int1 = Some(x12);
                int2 = Some(x34);
                p = (param - 0.5) * 4.0;
            } else {
                int1 = Some(x34);
                int2 = Some(ogive_nose_interpolator(
                    0.0,
                    1.0 / (1.0 + 4.0 * pow2(fineness)).sqrt(),
                ));
                p = (param - 0.75) * 4.0;
            }
        }
        NoseShape::Parabolic => {
            if param <= 0.5 {
                int1 = Some(ogive_nose_interpolator(
                    0.0,
                    1.0 / (1.0 + 4.0 * pow2(fineness)).sqrt(),
                ));
                int2 = Some(parabolic12);
                p = param * 2.0;
            } else if param <= 0.75 {
                int1 = Some(parabolic12);
                int2 = Some(parabolic34);
                p = (param - 0.5) * 4.0;
            } else {
                int1 = Some(parabolic34);
                int2 = Some(parabolic);
                p = (param - 0.75) * 4.0;
            }
        }
        NoseShape::Haack => {
            int1 = Some(von_karman);
            int2 = Some(lv_haack);
            p = param * 3.0;
        }
    }

    if let (Some(a), Some(b)) = (int1.as_ref(), int2.as_ref()) {
        let mut int3 = LinearInterpolator::new();
        for m in a.x_points() {
            int3.add_point(m, p * b.get_value(m) + (1.0 - p) * a.get_value(m));
        }
        for m in b.x_points() {
            int3.add_point(m, p * b.get_value(m) + (1.0 - p) * a.get_value(m));
        }
        int1 = Some(int3);
    }

    if let Some(a) = int1.as_ref() {
        let log4 = (fineness + 1.0).ln() / 4.0_f64.ln();
        for m in a.x_points() {
            let stag = blunt.get_value(m);
            interpolator.add_point(m, stag * (a.get_value(m) / stag).powf(log4));
        }
    }

    let xs = interpolator.x_points();
    if xs.is_empty() {
        return interpolator;
    }
    let min = xs[0];
    let min_value = interpolator.get_value(min);
    if min_value < 0.001 {
        return interpolator;
    }
    let cd_mach0 = 0.8 * pow2(sinphi);
    let min_deriv = (interpolator.get_value(min + 0.01) - min_value) / 0.01;
    if cd_mach0 >= min_value - 0.01 || min_deriv <= 0.01 {
        return interpolator;
    }
    let b = min * min_deriv / (min_value - cd_mach0);
    let a = (min_value - cd_mach0) / min.powf(b);
    let mut m = 0.0;
    while m < min {
        interpolator.add_point(m, a * m.powf(b) + cd_mach0);
        m += 0.05;
    }
    interpolator
}

/// One body (symmetric) component, in axial order.
struct BodyEntry {
    fore_r: f64,
    aft_r: f64,
    length: f64,
    shape: NoseShape,
    param: f64,
    reps: f64,
    cd_overridden_anc: bool,
}

impl BodyEntry {
    /// `SymmetricComponentCalc` frontal area = |π(foreR² − aftR²)|.
    fn frontal_area(&self) -> f64 {
        (PI * (pow2(self.fore_r) - pow2(self.aft_r))).abs()
    }
    fn fineness(&self) -> f64 {
        self.length / (2.0 * (self.aft_r - self.fore_r).abs()).max(1e-12)
    }
    /// `SymmetricComponentCalc.calculatePressureCD`.
    fn pressure_cd(&self, mach: f64, stagnation: f64, base: f64, area_ref: f64) -> f64 {
        if (self.fore_r - self.aft_r).abs() < 1e-12 {
            return 0.0; // body tube
        }
        let frontal = self.frontal_area();
        if self.length < 0.001 {
            return if self.fore_r < self.aft_r {
                stagnation * frontal / area_ref
            } else {
                base * frontal / area_ref
            };
        }
        if self.aft_r < self.fore_r {
            // Boattail.
            let fineness = self.fineness();
            if fineness >= 3.0 {
                return 0.0;
            }
            let cd = base * frontal / area_ref;
            if fineness <= 1.0 {
                return cd;
            }
            return cd * (3.0 - fineness) / 2.0;
        }
        // Nose / shoulder: NASA-table interpolator.
        let r099 = shape_radius(
            self.shape,
            self.param,
            0.99 * self.length,
            self.fore_r,
            self.aft_r,
            self.length,
        );
        let sinphi = if matches!(self.shape, NoseShape::Ogive) && self.param == 1.0 {
            0.0
        } else {
            let d = self.aft_r - r099;
            d / d.hypot(0.01 * self.length)
        };
        let interp = nose_interpolator(self.shape, self.param, self.fineness(), sinphi);
        interp.get_value(mach) * frontal / area_ref
    }
}

/// Result of the drag pass.
pub struct DragParts {
    pub friction: f64,
    pub pressure: f64,
    pub base: f64,
    pub override_cd: f64,
    /// friction + pressure + base + override.
    pub cd: f64,
}

/// Faithful port of `BarrowmanDragCalculator.calculateDrag`.
/// `area_ref` = reference area, `l_aero` = aerodynamic length.
pub fn compute_drag(rocket: &Rocket, mach: f64, reynolds_per_m: f64, area_ref: f64) -> DragParts {
    let layout = iter_layout(rocket);
    let rlayout = iter_layout_reps(rocket);
    let l_aero = rocket.total_length().max(1e-3);
    let re = (reynolds_per_m * l_aero).max(1.0);
    let cf = friction_coefficient(rocket.is_perfect_finish, mach, re);
    let rough_corr = roughness_correction(mach);
    let stagnation = stagnation_cd(mach);
    let base = base_cd(mach);

    // ---- Friction (BarrowmanDragCalculator.calculateFrictionCD) ----
    let mut body_friction = 0.0_f64;
    let mut other_friction = 0.0_f64;
    let mut max_r = 0.0_f64;
    let mut min_x = f64::INFINITY;
    let mut max_x = 0.0_f64;

    // ---- Pressure / base accumulators ----
    let mut pressure = 0.0_f64;
    let mut base_total = 0.0_f64;
    let mut override_total = 0.0_f64;

    // Ordered body chain (for prev/next radius in forward-step & base drag).
    let mut body_chain: Vec<(f64, BodyEntry)> = Vec::new();

    for (comp, axial_start, reps_u) in &rlayout {
        let reps = *reps_u as f64;
        let common = comp.common();
        let cd_over = common.cd_override;
        let cd_overridden_anc = false; // ancestor-override handled at the assembly level (n/a here)

        let component_cf = {
            let rough_lim = 0.032
                * (common.finish.roughness_size() / l_aero).powf(0.2)
                * rough_corr;
            if rocket.is_perfect_finish {
                if re > 1.0e6 && rough_lim > cf {
                    rough_lim
                } else {
                    cf
                }
            } else {
                cf.max(rough_lim)
            }
        };

        match comp {
            Component::NoseCone(n) => {
                let integ = shape_integrals(n.shape, n.shape_parameter, n.length, 0.0, n.aft_radius);
                let (fr, ar) = if n.is_flipped {
                    (n.aft_radius, 0.0)
                } else {
                    (0.0, n.aft_radius)
                };
                if cd_over.is_none() {
                    let fr_cd = component_cf * integ.wet_area / area_ref;
                    body_friction += reps * fr_cd;
                    min_x = min_x.min(*axial_start);
                    max_x = max_x.max(axial_start + n.length);
                    max_r = max_r.max(n.aft_radius);
                }
                body_chain.push((
                    *axial_start,
                    BodyEntry {
                        fore_r: fr,
                        aft_r: ar,
                        length: n.length,
                        shape: n.shape,
                        param: n.shape_parameter,
                        reps,
                        cd_overridden_anc,
                    },
                ));
            }
            Component::Transition(t) => {
                let integ = shape_integrals(
                    t.shape,
                    t.shape_parameter,
                    t.length,
                    t.fore_radius,
                    t.aft_radius,
                );
                if cd_over.is_none() {
                    let fr_cd = component_cf * integ.wet_area / area_ref;
                    body_friction += reps * fr_cd;
                    min_x = min_x.min(*axial_start);
                    max_x = max_x.max(axial_start + t.length);
                    max_r = max_r.max(t.fore_radius.max(t.aft_radius));
                }
                body_chain.push((
                    *axial_start,
                    BodyEntry {
                        fore_r: t.fore_radius,
                        aft_r: t.aft_radius,
                        length: t.length,
                        shape: t.shape,
                        param: t.shape_parameter,
                        reps,
                        cd_overridden_anc,
                    },
                ));
            }
            Component::BodyTube(t) => {
                let radius = t.radius.unwrap_or(0.0);
                let wet = 2.0 * PI * radius * t.length;
                if cd_over.is_none() {
                    let fr_cd = component_cf * wet / area_ref;
                    body_friction += reps * fr_cd;
                    min_x = min_x.min(*axial_start);
                    max_x = max_x.max(axial_start + t.length);
                    max_r = max_r.max(radius);
                }
                body_chain.push((
                    *axial_start,
                    BodyEntry {
                        fore_r: radius,
                        aft_r: radius,
                        length: t.length,
                        shape: NoseShape::Conical,
                        param: 0.0,
                        reps,
                        cd_overridden_anc,
                    },
                ));
            }
            Component::FinSet(f) => {
                if let Some(cd) = cd_over {
                    override_total += reps * cd;
                    continue;
                }
                let (fin_area, mac_len, span, cos_g_lead) = fin_geometry(f);
                if fin_area > 1e-12 {
                    other_friction += reps
                        * component_cf
                        * (1.0 + 2.0 * f.thickness / mac_len.max(1e-9))
                        * 2.0
                        * fin_area
                        / area_ref;
                    pressure += reps
                        * fin_pressure_cd(f, mach, stagnation, span, cos_g_lead, area_ref);
                    base_total += reps * fin_base_cd(f, base, span, area_ref);
                }
            }
            Component::LaunchLug(l) => {
                if let Some(cd) = cd_over {
                    override_total += reps * cd;
                    continue;
                }
                // LaunchLugCalc: friction 0; pressure = TubeCalc.
                pressure += reps
                    * tube_internal_pressure_cd(
                        l.outer_radius,
                        l.inner_radius,
                        l.length,
                        mach,
                        reynolds_per_m,
                        stagnation,
                        base,
                        area_ref,
                    );
            }
            Component::TubeFinSet(tf) => {
                if let Some(cd) = cd_over {
                    override_total += reps * cd;
                    continue;
                }
                let body_radius = local_body_radius(&layout, *axial_start).unwrap_or(0.0);
                let outer = tf.outer_radius.unwrap_or(body_radius).max(1e-4);
                let inner = (outer - tf.thickness).max(0.0);
                let chord = tf.length.max(1e-6);
                let count = tf.fin_count as f64;
                // Friction: wetted area of the tubes (TubeFinSetCalc).
                let d = (pow2(body_radius + outer) - pow2(outer)).max(0.0).sqrt();
                let theta1 = (outer / (outer + body_radius).max(1e-9)).acos();
                let theta2 = std::f64::consts::FRAC_PI_2 - theta1;
                let outer_area = chord * 2.0 * (PI - theta1) * outer;
                let masked = chord * 2.0 * theta2 * body_radius;
                let wetted = (outer_area - masked).max(0.0);
                other_friction += reps * count * component_cf * wetted / area_ref;
                // Pressure: TubeCalc internal + interstice term.
                let a = d * outer;
                let a1 = pow2(outer) * theta1;
                let a2 = pow2(body_radius) * theta2;
                let interstice = (a - a1 - a2).max(0.0);
                let internal = tube_internal_pressure_cd(
                    outer,
                    inner,
                    chord,
                    mach,
                    reynolds_per_m,
                    stagnation,
                    base,
                    area_ref,
                );
                pressure += reps
                    * count
                    * (internal + (stagnation + base) * interstice / area_ref);
            }
            _ => {
                if let Some(cd) = cd_over {
                    override_total += reps * cd;
                }
            }
        }
    }

    // Symmetric pressure CD + forward-step disk drag (prev aft radius).
    body_chain.sort_by(|a, b| a.0.partial_cmp(&b.0).unwrap());
    for i in 0..body_chain.len() {
        let (_, ref e) = body_chain[i];
        if e.cd_overridden_anc {
            continue;
        }
        // pressureCD of the component itself.
        let mut fore_r = e.fore_r;
        if e.length == 0.0 {
            fore_r = e.fore_r.max(e.aft_r);
        }
        let cd = e.pressure_cd(mach, stagnation, base, area_ref);
        pressure += cd * e.reps;
        // Forward-step disk: previous symmetric component's aft radius.
        let prev_aft = if i > 0 { body_chain[i - 1].1.aft_r } else { 0.0 };
        if prev_aft < fore_r {
            let area = PI * (pow2(fore_r) - pow2(prev_aft));
            pressure += e.reps * stagnation * area / area_ref;
        }
    }

    // Per-component base drag (next fore radius). BarrowmanDragCalculator
    // .calculateBaseCD instance method.
    for i in 0..body_chain.len() {
        let (_, ref e) = body_chain[i];
        if e.cd_overridden_anc {
            continue;
        }
        let mut fore_r = e.fore_r;
        let mut aft_r = e.aft_r;
        if e.length == 0.0 {
            let mx = fore_r.max(aft_r);
            fore_r = mx;
            aft_r = mx;
            let _ = fore_r;
        }
        let next_fore = if i + 1 < body_chain.len() {
            body_chain[i + 1].1.fore_r
        } else {
            0.0
        };
        if next_fore < aft_r {
            let area = PI * (pow2(aft_r) - pow2(next_fore));
            base_total += e.reps * base * area / area_ref;
        }
    }

    // Friction fineness correction.
    let friction = if max_r > 0.0 && max_x > min_x {
        let f_b = (max_x - min_x + 0.0001) / max_r;
        let correction = 1.0 + 1.0 / (2.0 * f_b);
        other_friction + correction * body_friction
    } else {
        other_friction + body_friction
    };

    override_total += {
        // Symmetric components may also carry a CD override.
        let mut t = 0.0;
        for (comp, _a, reps_u) in &rlayout {
            if matches!(
                comp,
                Component::NoseCone(_) | Component::Transition(_) | Component::BodyTube(_)
            ) {
                if let Some(cd) = comp.common().cd_override {
                    t += (*reps_u as f64) * cd;
                }
            }
        }
        t
    };
    let _ = override_total;

    let cd = friction + pressure + base_total + override_total;
    DragParts {
        friction,
        pressure,
        base: base_total,
        override_cd: override_total,
        cd,
    }
}

/// Fin planform area, MAC length, span and cos(Γ_lead).
fn fin_geometry(f: &FinSet) -> (f64, f64, f64, f64) {
    match f.shape {
        FinShape::Elliptical => {
            let s = f.height;
            let area = PI * 0.25 * f.root_chord * s;
            // Elliptical wing MAC ≈ (8/3π)·rootChord; LE essentially unswept.
            (area, (8.0 / (3.0 * PI)) * f.root_chord, s, 1.0)
        }
        FinShape::Freeform if f.points.len() >= 3 => {
            let s = f.points.iter().map(|p| p[1]).fold(0.0_f64, f64::max);
            let (area, mac_len, _mac_lead, _cg) = freeform_mac(&f.points, s);
            // Leading-edge sweep from the freeform outline.
            let lead0 = f.points.first().map(|p| p[0]).unwrap_or(0.0);
            let leadtip = f
                .points
                .iter()
                .max_by(|a, b| a[1].partial_cmp(&b[1]).unwrap())
                .map(|p| p[0])
                .unwrap_or(0.0);
            let cos_g = (s).hypot(leadtip - lead0);
            let cos_g_lead = if cos_g > 0.0 { s / cos_g } else { 1.0 };
            (area, mac_len, s, cos_g_lead)
        }
        _ => {
            let s = f.height;
            let area = 0.5 * (f.root_chord + f.tip_chord) * s;
            let cr = f.root_chord;
            let ct = f.tip_chord;
            let mac = if cr + ct > 0.0 {
                (2.0 / 3.0) * (cr * cr + cr * ct + ct * ct) / (cr + ct)
            } else {
                0.0
            };
            let cos_g_lead = {
                let h = s.hypot(f.sweep_length);
                if h > 0.0 {
                    s / h
                } else {
                    1.0
                }
            };
            (area, mac, s, cos_g_lead)
        }
    }
}

/// `FinSetCalc.calculatePressureCD` (leading-edge drag).
fn fin_pressure_cd(
    f: &FinSet,
    mach: f64,
    stagnation: f64,
    span: f64,
    cos_g_lead: f64,
    area_ref: f64,
) -> f64 {
    use opsrocket_core::component::FinCrossSection::*;
    let mut cd = match f.cross_section {
        Airfoil | Rounded => {
            if mach < 0.9 {
                (1.0 - pow2(mach)).powf(-0.417) - 1.0
            } else if mach < 1.0 {
                1.0 - 1.785 * (mach - 0.9)
            } else {
                1.214 - 0.502 / pow2(mach) + 0.1095 / pow2(pow2(mach))
            }
        }
        Square => stagnation,
    };
    cd *= pow2(cos_g_lead);
    cd *= span * f.thickness / area_ref;
    cd
}

/// `FinSetCalc.calculateComponentBaseCD` (trailing-edge / base drag).
fn fin_base_cd(f: &FinSet, base: f64, span: f64, area_ref: f64) -> f64 {
    use opsrocket_core::component::FinCrossSection::*;
    let cd = match f.cross_section {
        Square => base,
        Rounded => base / 2.0,
        Airfoil => 0.0,
    };
    cd * span * f.thickness / area_ref
}

/// `BarrowmanDragCalculator.calculateAxialCD` — converts the total CD to the
/// axial component as a function of AOA.
pub fn axial_cd(aoa: f64, cd: f64) -> f64 {
    let poly1 = PolyInterpolator::new(&[
        &[0.0, 17.0 * PI / 180.0],
        &[0.0, 17.0 * PI / 180.0],
    ])
    .interpolator(&[1.0, 1.3, 0.0, 0.0]);
    let poly2 = PolyInterpolator::new(&[
        &[17.0 * PI / 180.0, PI / 2.0],
        &[17.0 * PI / 180.0, PI / 2.0],
        &[PI / 2.0],
    ])
    .interpolator(&[1.3, 0.0, 0.0, 0.0, 0.0]);

    let mut a = aoa.clamp(0.0, PI);
    let sign_neg = a > PI / 2.0;
    if a > PI / 2.0 {
        a = PI - a;
    }
    let mul = if a < 17.0 * PI / 180.0 {
        PolyInterpolator::eval(a, &poly1)
    } else {
        PolyInterpolator::eval(a, &poly2)
    };
    if !sign_neg {
        mul * cd
    } else {
        -mul * cd
    }
}
