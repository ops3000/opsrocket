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

use opsrocket_core::component::{Common, Component, NoseCone, Rocket, Stage};
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
    let mut acc = Accumulator::default();
    let mut origin = 0.0;
    let mut prev_aft = 0.0;
    for stage in &rocket.stages {
        let layout = layout_children(&stage.children, origin, prev_aft);
        for (comp, layout) in layout {
            accumulate(&mut acc, comp, layout.axial_start);
            // body components push the cursor forward
            if let Component::BodyTube(t) = comp {
                let r = t.radius.unwrap_or(0.0);
                for (sub, sub_layout) in layout_children(&t.children, layout.axial_start, layout.axial_start) {
                    accumulate(&mut acc, sub, sub_layout.axial_start);
                    let _ = r;
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

struct ChildLayout {
    axial_start: f64,
}

fn layout_children<'a>(
    children: &'a [Component],
    parent_origin: f64,
    parent_prev_aft: f64,
) -> Vec<(&'a Component, ChildLayout)> {
    let mut out = Vec::with_capacity(children.len());
    let mut cursor = parent_prev_aft;
    for c in children {
        let start = match c.common().axial_method {
            opsrocket_core::component::AxialMethod::After => cursor + c.common().axial_offset,
            opsrocket_core::component::AxialMethod::Absolute => c.common().axial_offset,
            opsrocket_core::component::AxialMethod::Top => parent_origin + c.common().axial_offset,
            _ => cursor + c.common().axial_offset,
        };
        out.push((c, ChildLayout { axial_start: start }));
        // Only "body" components advance the cursor for sibling After-positioning.
        if matches!(c, Component::NoseCone(_) | Component::BodyTube(_) | Component::Transition(_)) {
            cursor = start + c.length();
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
            let mass_each = if let Some(mat) = p.common.material.as_ref() {
                let area = PI * pow2(0.5 * p.diameter);
                mat.density * area
            } else {
                0.0
            };
            let mass = override_mass(&p.common, mass_each);
            let cg = override_cg(&p.common, axial_start + 0.5 * p.packed_length);
            acc.add(mass, cg, 0.0, 0.0);
        }
    }
}

fn add_nosecone(acc: &mut Accumulator, n: &NoseCone, axial_start: f64) {
    let mass = override_mass(
        &n.common,
        if let Some(mat) = n.common.material.as_ref() {
            // Approximate as a thin shell of a cone of the given length / base radius.
            // Surface area ~ pi * r * sqrt(r^2 + L^2).
            let r = n.aft_radius;
            let area = PI * r * (r * r + n.length * n.length).sqrt();
            area * n.thickness * mat.density
        } else {
            0.0
        },
    );
    // CG of a cone (solid) is at L/4 from base. Use that for shell-with-thin-wall
    // as an acceptable approximation (Java code uses 0.25L for ogive too).
    let cg_local = 0.75 * n.length;
    let cg = override_cg(&n.common, axial_start + cg_local);
    let r = n.aft_radius;
    let i_long = mass * 0.5 * r * r * 0.5; // shell ≈ 0.5 m r^2; scale by 0.5 for cone
    let i_rot_local = mass * (3.0 * r * r + n.length * n.length) / 20.0;
    acc.add(mass, cg, i_long, i_rot_local);
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
                for (sc, sl) in layout_children(&t.children, l.axial_start, l.axial_start) {
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
