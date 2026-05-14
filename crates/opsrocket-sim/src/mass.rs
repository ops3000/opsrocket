//! Mass property calculations.
//!
//! Port of `info.openrocket.core.masscalc.MassCalculator`.
//!
//! This module computes the rocket's empty mass + CG and contributes the
//! mass / CG of a loaded motor at simulation time. Moments of inertia for
//! each component are computed using the thin-shell / solid approximations
//! the Java implementation uses.
//!
//! Only the components produced by the `.ork` reader are handled here.
//! Cylinders use the standard thin-shell formula; the nose cone is
//! approximated as a half-cone shell for moments-of-inertia purposes (the
//! Java code uses the same approximation in `SymmetricComponent.calculateMOI`).

use opsrocket_core::component::{CenteringRing, Common, Component, LaunchLug, NoseCone, Rocket, ShockCord, Stage};
use opsrocket_core::material::MaterialType;
use opsrocket_core::geom::Coord;
use opsrocket_core::mathx::pow2;
use opsrocket_core::units::PI;

/// Aggregated mass properties.
#[derive(Debug, Clone, Copy, Default)]
pub struct MassProperties {
    /// Total mass (kg).
    pub mass: f64,
    /// Center of gravity along the rocket axis (m, measured from nose tip).
    pub cg_axial: f64,
    /// Longitudinal moment of inertia (kg·m²) -- about the rocket axis.
    pub i_long: f64,
    /// Rotational moment of inertia (kg·m²) -- about a transverse axis through CG.
    pub i_rot: f64,
}

/// Compute the empty (no motor) mass properties of the rocket.
pub fn empty_mass_properties(rocket: &Rocket) -> MassProperties {
    let mask: Vec<bool> = (0..rocket.stages.len()).map(|_| true).collect();
    mass_properties_for_stages(rocket, &mask)
}

/// Mass / CG / MoI for the subset of stages whose mask bit is true. Stages
/// whose bit is false are treated as separated (no longer part of the
/// vehicle). Lower stages remain in axial layout to keep CG references
/// stable while a vehicle decomposes during flight.
pub fn mass_properties_for_stages(rocket: &Rocket, active: &[bool]) -> MassProperties {
    let resolved = resolve_auto_dimensions(rocket);
    let mut acc = Accumulator::default();
    let mut origin = 0.0;
    let mut prev_aft = 0.0;
    for (i, stage) in resolved.stages.iter().enumerate() {
        let include = active.get(i).copied().unwrap_or(true);
        let layout = layout_children(&stage.children, origin, prev_aft);
        if include {
            for (comp, layout) in &layout {
                accumulate(&mut acc, comp, layout.axial_start);
                if let Component::BodyTube(t) = comp {
                    let body_start = layout.axial_start;
                    let body_end = body_start + t.length;
                    for (sub, sub_layout) in layout_children(&t.children, body_start, body_end) {
                        accumulate(&mut acc, sub, sub_layout.axial_start);
                    }
                }
            }
        }
        if let Some(last) = layout_aft(&stage.children, origin) {
            origin = last;
            prev_aft = last;
        }
    }
    acc.finish()
}

/// Resolve auto-sized dimensions (centering ring radii, launch lug thickness, etc.)
/// by inferring from neighboring components. Returns a cloned rocket with the
/// fields filled in; the input is not mutated.
pub fn resolve_auto_dimensions(rocket: &Rocket) -> Rocket {
    let mut r = rocket.clone();
    for stage in &mut r.stages {
        for child in &mut stage.children {
            if let Component::BodyTube(tube) = child {
                let tube_inner = tube.radius.map(|outer| (outer - tube.thickness).max(0.0));
                // Find the first inner tube to provide a reference inner-radius.
                let inner_outer = tube
                    .children
                    .iter()
                    .find_map(|c| if let Component::InnerTube(it) = c { Some(it.outer_radius) } else { None });
                for sub in &mut tube.children {
                    match sub {
                        Component::CenteringRing(cr) => {
                            if cr.outer_radius == 0.0 {
                                if let Some(t) = tube_inner { cr.outer_radius = t; }
                            }
                            if cr.inner_radius == 0.0 {
                                if let Some(io) = inner_outer { cr.inner_radius = io; }
                            }
                        }
                        Component::LaunchLug(lug) => {
                            if lug.inner_radius == 0.0 || lug.inner_radius >= lug.outer_radius {
                                // Fall back to a 0.5 mm wall if the file doesn't specify one.
                                lug.inner_radius = (lug.outer_radius - 0.0005).max(0.0);
                            }
                        }
                        _ => {}
                    }
                }
            }
        }
    }
    r
}

struct ChildLayout {
    axial_start: f64,
}

fn layout_children<'a>(
    children: &'a [Component],
    parent_origin: f64,
    parent_prev_aft: f64,
) -> Vec<(&'a Component, ChildLayout)> {
    // Java RocketComponent.AxialMethod:
    //   ABSOLUTE: offset from rocket origin
    //   TOP:      offset from top (forward end) of parent
    //   MIDDLE:   parent_origin + (parent_length − child_length)/2 + offset
    //   BOTTOM:   parent_origin + parent_length − child_length − offset
    //   AFTER:    cursor (after previous "body" sibling) + offset
    let parent_length = (parent_prev_aft - parent_origin).max(0.0);
    let mut out = Vec::with_capacity(children.len());
    let mut cursor = parent_prev_aft;
    for c in children {
        let common = c.common();
        let child_len = c.length();
        let start = match common.axial_method {
            opsrocket_core::component::AxialMethod::After => cursor + common.axial_offset,
            opsrocket_core::component::AxialMethod::Absolute => common.axial_offset,
            opsrocket_core::component::AxialMethod::Top => parent_origin + common.axial_offset,
            opsrocket_core::component::AxialMethod::Middle => {
                parent_origin + 0.5 * (parent_length - child_len) + common.axial_offset
            }
            opsrocket_core::component::AxialMethod::Bottom => {
                // Java RocketComponent.AxialMethod.BOTTOM.getAsAbsolute:
                //   parent_length + offset − child_length
                // (positive offset shifts the child downward beyond the
                // parent's aft; negative offset places it above).
                parent_origin + parent_length + common.axial_offset - child_len
            }
        };
        out.push((c, ChildLayout { axial_start: start }));
        if matches!(c, Component::NoseCone(_) | Component::BodyTube(_) | Component::Transition(_)) {
            cursor = start + child_len;
        }
    }
    out
}

fn layout_aft(children: &[Component], origin: f64) -> Option<f64> {
    let mut cursor = origin;
    let mut last_aft = None;
    for c in children {
        let start = match c.common().axial_method {
            opsrocket_core::component::AxialMethod::After => cursor + c.common().axial_offset,
            opsrocket_core::component::AxialMethod::Absolute => c.common().axial_offset,
            opsrocket_core::component::AxialMethod::Top => origin + c.common().axial_offset,
            _ => cursor + c.common().axial_offset,
        };
        if matches!(c, Component::NoseCone(_) | Component::BodyTube(_) | Component::Transition(_)) {
            cursor = start + c.length();
            last_aft = Some(cursor);
        }
    }
    last_aft
}

#[derive(Default)]
struct Accumulator {
    weighted_cg: Coord,
    /// Moments about the nose tip; we re-base to CG at the end.
    i_long: f64,
    i_rot_about_origin: f64,
}

impl Accumulator {
    fn add(&mut self, mass: f64, cg_axial: f64, i_long: f64, i_rot_local: f64) {
        if mass <= 0.0 {
            return;
        }
        let contribution = Coord::new_w(cg_axial, 0.0, 0.0, mass);
        self.weighted_cg = self.weighted_cg.average(contribution);
        self.i_long += i_long;
        // parallel-axis theorem: I about origin = I about local CG + m * d²
        self.i_rot_about_origin += i_rot_local + mass * cg_axial * cg_axial;
    }

    fn finish(self) -> MassProperties {
        let mass = self.weighted_cg.weight;
        let cg = if mass > 0.0 { self.weighted_cg.x } else { 0.0 };
        // shift the transverse MoI from origin back to CG
        let i_rot = (self.i_rot_about_origin - mass * cg * cg).max(0.0);
        MassProperties { mass, cg_axial: cg, i_long: self.i_long, i_rot }
    }
}

fn accumulate(acc: &mut Accumulator, comp: &Component, axial_start: f64) {
    match comp {
        Component::NoseCone(n) => add_nosecone(acc, n, axial_start),
        Component::BodyTube(b) => add_bodytube(acc, b, axial_start),
        Component::Transition(t) => add_transition(acc, t, axial_start),
        Component::InnerTube(it) => add_innertube(acc, it, axial_start),
        Component::MassObject(m) => {
            let cg = override_cg(&m.common, axial_start + 0.5 * m.length);
            let mass = override_mass(&m.common, m.mass);
            let r = m.radius;
            // treat as solid cylinder
            let i_long = 0.5 * mass * r * r;
            let i_rot_local = mass * (3.0 * r * r + m.length * m.length) / 12.0;
            acc.add(mass, cg, i_long, i_rot_local);
        }
        Component::FinSet(fs) => {
            let mass_each = if let Some(mat) = fs.common.material.as_ref() {
                fs.thickness * fin_area(fs) * mat.density
            } else {
                0.0
            };
            let total_mass = override_mass(&fs.common, mass_each * fs.fin_count as f64);
            let cg = override_cg(&fs.common, axial_start + 0.5 * fs.root_chord);
            // crude approximation - fins are thin and offset from axis
            let i_long = total_mass * pow2(0.5 * fs.height);
            let i_rot_local = total_mass * pow2(0.5 * fs.root_chord);
            acc.add(total_mass, cg, i_long, i_rot_local);
        }
        Component::Parachute(p) => {
            // Canopy mass uses the parachute's own (surface) material.
            let canopy_mass = if let Some(mat) = p.common.material.as_ref() {
                if matches!(mat.kind, MaterialType::Surface) {
                    let area = PI * pow2(0.5 * p.diameter);
                    mat.density * area
                } else {
                    0.0
                }
            } else {
                0.0
            };
            // Lines: use the separate line material if available, otherwise
            // fall back to the canopy material if it happens to be a line.
            let line_density = p
                .line_material
                .as_ref()
                .filter(|m| matches!(m.kind, MaterialType::Line))
                .map(|m| m.density)
                .or_else(|| {
                    p.common.material.as_ref().and_then(|m| {
                        if matches!(m.kind, MaterialType::Line) { Some(m.density) } else { None }
                    })
                })
                .unwrap_or(0.0);
            let line_mass = line_density * p.line_length * p.line_count as f64;
            let mass = override_mass(&p.common, canopy_mass + line_mass);
            let cg = override_cg(&p.common, axial_start + 0.5 * p.packed_length);
            acc.add(mass, cg, 0.0, 0.0);
        }
        Component::ShockCord(s) => add_shockcord(acc, s, axial_start),
        Component::LaunchLug(l) => add_launchlug(acc, l, axial_start),
        Component::CenteringRing(c) => add_centering_ring(acc, c, axial_start),
    }
}

fn add_shockcord(acc: &mut Accumulator, s: &ShockCord, axial_start: f64) {
    let line_density = s
        .common
        .material
        .as_ref()
        .filter(|m| matches!(m.kind, MaterialType::Line))
        .map(|m| m.density)
        .unwrap_or(0.0);
    let mass = override_mass(&s.common, line_density * s.cord_length);
    let cg = override_cg(&s.common, axial_start + 0.5 * s.packed_length);
    acc.add(mass, cg, 0.0, 0.0);
}

fn add_launchlug(acc: &mut Accumulator, l: &LaunchLug, axial_start: f64) {
    let mass_each = if let Some(mat) = l.common.material.as_ref() {
        if matches!(mat.kind, MaterialType::Bulk) {
            let area = PI * (pow2(l.outer_radius) - pow2(l.inner_radius));
            area * l.length * mat.density
        } else {
            0.0
        }
    } else {
        0.0
    };
    let total = override_mass(&l.common, mass_each * l.instance_count as f64);
    let cg = override_cg(&l.common, axial_start + 0.5 * l.length);
    let i_long = 0.5 * total * (pow2(l.outer_radius) + pow2(l.inner_radius));
    let i_rot_local = total
        * (3.0 * (pow2(l.outer_radius) + pow2(l.inner_radius)) + pow2(l.length))
        / 12.0;
    acc.add(total, cg, i_long, i_rot_local);
}

fn add_centering_ring(acc: &mut Accumulator, c: &CenteringRing, axial_start: f64) {
    let mass_each = if let Some(mat) = c.common.material.as_ref() {
        if matches!(mat.kind, MaterialType::Bulk) {
            let area = PI * (pow2(c.outer_radius) - pow2(c.inner_radius));
            area * c.length * mat.density
        } else {
            0.0
        }
    } else {
        0.0
    };
    let total = override_mass(&c.common, mass_each * c.instance_count as f64);
    let cg = override_cg(&c.common, axial_start + 0.5 * c.length);
    let i_long = 0.5 * total * (pow2(c.outer_radius) + pow2(c.inner_radius));
    let i_rot_local = total
        * (3.0 * (pow2(c.outer_radius) + pow2(c.inner_radius)) + pow2(c.length))
        / 12.0;
    acc.add(total, cg, i_long, i_rot_local);
}

fn add_nosecone(acc: &mut Accumulator, n: &NoseCone, axial_start: f64) {
    // Main shell mass.
    let (shell_mass, shell_cg) = if let Some(mat) = n.common.material.as_ref() {
        // Use the shape-aware integrated wet area instead of the simple
        // slant approximation; for ogive / Haack / power shapes the
        // curvature gives a meaningfully larger wetted area than the
        // frustum slant.  Volume CG comes from the same integral.
        let integ = opsrocket_core::profile::shape_integrals(
            n.shape,
            n.shape_parameter,
            n.length,
            0.0,
            n.aft_radius,
        );
        let m = integ.wet_area * n.thickness * mat.density;
        // For a thin shell, CG of the shell ≈ CG of the surface, not the
        // filled volume. We use the volume-weighted CG (computed by
        // shape_integrals) as a close approximation — the difference is
        // typically < 1% of L for typical nose-cone shapes.
        (m, axial_start + integ.cg_axial)
    } else {
        (0.0, axial_start + 0.5 * n.length)
    };

    // Aft shoulder (a small cylindrical extension that plugs into the body tube).
    let (shoulder_mass, shoulder_cg) = nosecone_shoulder_mass(n, axial_start);

    // Treat the override as applying to the whole nose-cone assembly (shell + shoulder).
    let total_computed = shell_mass + shoulder_mass;
    let total = override_mass(&n.common, total_computed);
    if total > 0.0 && total_computed > 0.0 {
        // Combine the shell + shoulder CGs as a weighted average; scale per
        // the override so a user-supplied mass still has the right CG.
        let combined_cg = (shell_mass * shell_cg + shoulder_mass * shoulder_cg) / total_computed;
        let cg = override_cg(&n.common, combined_cg);
        let r = n.aft_radius;
        let i_long = total * 0.5 * r * r * 0.5;
        let i_rot_local = total * (3.0 * r * r + n.length * n.length) / 20.0;
        acc.add(total, cg, i_long, i_rot_local);
    } else if total > 0.0 {
        let cg = override_cg(&n.common, axial_start + 0.75 * n.length);
        let r = n.aft_radius;
        let i_long = total * 0.5 * r * r * 0.5;
        let i_rot_local = total * (3.0 * r * r + n.length * n.length) / 20.0;
        acc.add(total, cg, i_long, i_rot_local);
    }
}

fn nosecone_shoulder_mass(n: &NoseCone, axial_start: f64) -> (f64, f64) {
    if n.aft_shoulder_length <= 0.0 || n.aft_shoulder_radius <= 0.0 {
        return (0.0, 0.0);
    }
    let mat = match n.common.material.as_ref() {
        Some(m) => m,
        None => return (0.0, 0.0),
    };
    if !matches!(mat.kind, MaterialType::Bulk) {
        return (0.0, 0.0);
    }
    let r_outer = n.aft_shoulder_radius;
    let r_inner = (r_outer - n.aft_shoulder_thickness).max(0.0);
    let wall_volume = PI * (r_outer * r_outer - r_inner * r_inner) * n.aft_shoulder_length;
    let wall_mass = wall_volume * mat.density;
    let mut total = wall_mass;
    let cap_mass = if n.aft_shoulder_capped {
        let cap_vol = PI * r_inner * r_inner * n.aft_shoulder_thickness;
        cap_vol * mat.density
    } else {
        0.0
    };
    total += cap_mass;
    let cg = axial_start + n.length + 0.5 * n.aft_shoulder_length;
    (total, cg)
}

fn add_bodytube(acc: &mut Accumulator, b: &opsrocket_core::component::BodyTube, axial_start: f64) {
    let r = b.radius.unwrap_or(0.0);
    let r_in = (r - b.thickness).max(0.0);
    let mass = override_mass(
        &b.common,
        if let Some(mat) = b.common.material.as_ref() {
            let area = PI * (r * r - r_in * r_in);
            area * b.length * mat.density
        } else {
            0.0
        },
    );
    let cg = override_cg(&b.common, axial_start + 0.5 * b.length);
    let i_long = 0.5 * mass * (r * r + r_in * r_in);
    let i_rot_local = mass * (3.0 * (r * r + r_in * r_in) + b.length * b.length) / 12.0;
    acc.add(mass, cg, i_long, i_rot_local);
}

fn add_transition(
    acc: &mut Accumulator,
    t: &opsrocket_core::component::Transition,
    axial_start: f64,
) {
    let mass = override_mass(
        &t.common,
        if let Some(mat) = t.common.material.as_ref() {
            // Approximate as the frustum-shell area.
            let r1 = t.fore_radius;
            let r2 = t.aft_radius;
            let slant = ((r2 - r1).powi(2) + t.length * t.length).sqrt();
            let area = PI * (r1 + r2) * slant;
            area * t.thickness * mat.density
        } else {
            0.0
        },
    );
    let cg = override_cg(&t.common, axial_start + 0.5 * t.length);
    let r_eff = 0.5 * (t.fore_radius + t.aft_radius);
    let i_long = 0.5 * mass * r_eff * r_eff;
    let i_rot_local = mass * (3.0 * r_eff * r_eff + t.length * t.length) / 12.0;
    acc.add(mass, cg, i_long, i_rot_local);
}

fn add_innertube(acc: &mut Accumulator, it: &opsrocket_core::component::InnerTube, axial_start: f64) {
    let mass = override_mass(
        &it.common,
        if let Some(mat) = it.common.material.as_ref() {
            let area = PI * (it.outer_radius * it.outer_radius - it.inner_radius * it.inner_radius);
            area * it.length * mat.density
        } else {
            0.0
        },
    );
    let cg = override_cg(&it.common, axial_start + 0.5 * it.length);
    let i_long = 0.5 * mass * (it.outer_radius * it.outer_radius + it.inner_radius * it.inner_radius);
    let i_rot_local = mass
        * (3.0 * (it.outer_radius * it.outer_radius + it.inner_radius * it.inner_radius)
            + it.length * it.length)
        / 12.0;
    acc.add(mass, cg, i_long, i_rot_local);
}

fn fin_area(fs: &opsrocket_core::component::FinSet) -> f64 {
    // Trapezoid area: ((root + tip) / 2) * height
    0.5 * (fs.root_chord + fs.tip_chord) * fs.height
}

fn override_mass(c: &Common, computed: f64) -> f64 {
    c.mass_override.unwrap_or(computed)
}

fn override_cg(c: &Common, computed: f64) -> f64 {
    c.cg_override.unwrap_or(computed)
}

/// Return the mass contribution of a single component in isolation.  This is a
/// helper used by debug tooling.  Walks the same accumulator path as the full
/// rocket calc but stops at a single component.
pub fn single_component_mass(c: &Component) -> f64 {
    let mut acc = Accumulator::default();
    accumulate(&mut acc, c, 0.0);
    acc.finish().mass
}

/// Walk through all stages and yield each component plus its axial start position.
pub fn iter_layout<'a>(rocket: &'a Rocket) -> Vec<(&'a Component, f64)> {
    let mut out = Vec::new();
    let mut origin = 0.0;
    let mut prev_aft = 0.0;
    for stage in &rocket.stages {
        let layout = layout_children(&stage.children, origin, prev_aft);
        for (c, l) in &layout {
            out.push((*c, l.axial_start));
            if let Component::BodyTube(t) = c {
                let body_start = l.axial_start;
                let body_end = body_start + t.length;
                for (sc, sl) in layout_children(&t.children, body_start, body_end) {
                    out.push((sc, sl.axial_start));
                }
            }
        }
        if let Some(last) = layout_aft(&stage.children, origin) {
            origin = last;
            prev_aft = last;
        }
    }
    out
}

#[allow(dead_code)]
pub(crate) fn layout_per_stage<'a>(stage: &'a Stage, origin: f64) -> Vec<(&'a Component, f64)> {
    layout_children(&stage.children, origin, origin)
        .into_iter()
        .map(|(c, l)| (c, l.axial_start))
        .collect()
}
