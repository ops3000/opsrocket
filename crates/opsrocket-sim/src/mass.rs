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
            // Stage-level mass override with overridesubcomponentsmass:
            // the whole stage subtree weighs exactly mass_override, placed
            // at cg_override or the subtree's computed centroid.
            if stage.common.override_subcomponents_mass {
                if let Some(m) = stage.common.mass_override {
                    let mut sub = Accumulator::default();
                    for (comp, l) in &layout {
                        accumulate_rec(&mut sub, comp, l.axial_start);
                    }
                    let cg = stage
                        .common
                        .cg_override
                        .unwrap_or_else(|| sub.finish().cg_axial);
                    acc.add(m, cg, 0.0, 0.0);
                    if let Some(last) = layout_aft(&stage.children, origin) {
                        origin = last;
                        prev_aft = last;
                    }
                    continue;
                }
            }
            for (comp, layout) in &layout {
                accumulate_rec(&mut acc, comp, layout.axial_start);
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
        resolve_children(&mut stage.children, 0.0, None, None);
    }
    r
}

/// Recursively resolve auto/derived dimensions over the whole tree, so a
/// ring/coupler nested at any depth (stage, nose, body, inner tube, pod,
/// coupler) gets its bore set. `parent_inner` = enclosing tube interior
/// radius (for auto outer), `parent_outer` = enclosing airframe radius
/// (for auto tube-fin radius).
fn resolve_children(
    children: &mut [Component],
    parent_inner: f64,
    parent_outer: Option<f64>,
    inner_outer: Option<f64>,
) {
    // A plain centering ring's bore = the motor-mount inner tube it
    // surrounds (a sibling). Compute once before the mutable walk.
    let sib_inner_outer = children
        .iter()
        .find_map(|c| {
            if let Component::InnerTube(it) = c {
                Some(it.outer_radius)
            } else {
                None
            }
        })
        .or(inner_outer);
    for sub in children {
        match sub {
            Component::BodyTube(t) => {
                let ti = t
                    .radius
                    .map(|o| (o - t.thickness).max(0.0))
                    .unwrap_or(parent_inner);
                resolve_children(&mut t.children, ti, t.radius, None);
            }
            Component::InnerTube(it) => {
                let ii = it.inner_radius;
                resolve_children(&mut it.children, ii, Some(it.outer_radius), None);
            }
            Component::NoseCone(n) => {
                let ni = (n.aft_radius - n.thickness).max(0.0);
                resolve_children(&mut n.children, ni, Some(n.aft_radius), None);
            }
            Component::Transition(tr) => {
                let ro = tr.fore_radius.max(tr.aft_radius);
                resolve_children(
                    &mut tr.children,
                    (ro - tr.thickness).max(0.0),
                    Some(ro),
                    None,
                );
            }
            Component::PodSet(p) => {
                resolve_children(&mut p.children, parent_inner, parent_outer, None);
            }
            Component::CenteringRing(cr) => {
                // resolve_ring also recurses cr.children vs its interior.
                resolve_ring(cr, parent_inner, sib_inner_outer);
            }
            Component::LaunchLug(lug) => {
                if lug.inner_radius == 0.0 || lug.inner_radius >= lug.outer_radius {
                    lug.inner_radius = (lug.outer_radius - 0.0005).max(0.0);
                }
            }
            Component::TubeFinSet(tf) => {
                if tf.outer_radius.is_none() {
                    tf.outer_radius = parent_outer;
                }
            }
            _ => {}
        }
    }
}

/// Resolve a thickness-ring part (centering ring / engine block / tube
/// coupler / bulkhead): auto outer = parent interior radius; solid →
/// inner 0; wall thickness → inner = outer − thickness; otherwise fall
/// back to the motor-mount tube's outer radius. Recurses a coupler's
/// nested rings/bulkheads against the coupler's interior.
fn resolve_ring(cr: &mut CenteringRing, parent_inner: f64, inner_outer: Option<f64>) {
    if cr.outer_radius == 0.0 {
        cr.outer_radius = parent_inner;
    }
    if cr.solid {
        cr.inner_radius = 0.0;
    } else if cr.thickness_set {
        // Wall thickness given (engine block, tube coupler). A zero
        // thickness ⇒ zero-wall tube ⇒ inner = outer ⇒ no mass.
        cr.inner_radius = (cr.outer_radius - cr.thickness).max(0.0);
    } else if cr.inner_radius == 0.0 {
        if let Some(io) = inner_outer {
            cr.inner_radius = io;
        }
    }
    let interior = cr.inner_radius;
    for ch in &mut cr.children {
        if let Component::CenteringRing(inner) = ch {
            resolve_ring(inner, interior, None);
        }
    }
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

/// Accumulate a component and recurse the structural children OpenRocket
/// nests inside body tubes and motor-mount inner tubes (engine block,
/// centering rings, …). PodSet recursion stays inside `accumulate`.
fn accumulate_rec(acc: &mut Accumulator, comp: &Component, axial_start: f64) {
    accumulate_rec_n(acc, comp, axial_start, 1, 0.0);
}

/// Parent body radius seen by a child component at `child_x` (for fin
/// `getBodyRadius`).
fn parent_body_radius(parent: &Component, child_x: f64, parent_x: f64) -> f64 {
    match parent {
        Component::BodyTube(t) => t.radius.unwrap_or(0.0),
        Component::InnerTube(it) => it.outer_radius,
        Component::Transition(t) => opsrocket_core::profile::shape_radius(
            t.shape,
            t.shape_parameter,
            (child_x - parent_x).clamp(0.0, t.length),
            t.fore_radius,
            t.aft_radius,
            t.length,
        ),
        Component::NoseCone(n) => opsrocket_core::profile::shape_radius(
            n.shape,
            n.shape_parameter,
            (child_x - parent_x).clamp(0.0, n.length),
            0.0,
            n.aft_radius,
            n.length,
        ),
        _ => 0.0,
    }
}

/// `reps` = how many physical copies of this subtree exist (inner-tube
/// clustering replicates the whole motor-mount assembly). Cluster is a
/// radial arrangement, so mass + axial CG are simply ×reps at the same x.
fn accumulate_rec_n(
    acc: &mut Accumulator,
    comp: &Component,
    axial_start: f64,
    reps: u32,
    parent_radius: f64,
) {
    // Component-level assembly mass override: the whole subtree weighs
    // exactly mass_override (× reps), at cg_override or the subtree CG;
    // children are not walked.
    let cm = comp.common();
    if cm.override_subcomponents_mass {
        if let Some(m) = cm.mass_override {
            let mut sub = Accumulator::default();
            accumulate(&mut sub, comp, axial_start, parent_radius);
            let (children, len): (&[Component], f64) = match comp {
                Component::BodyTube(t) => (&t.children, t.length),
                Component::InnerTube(it) => (&it.children, it.length),
                Component::CenteringRing(c) => (&c.children, c.length),
                Component::NoseCone(n) => (&n.children, n.length),
                Component::Transition(t) => (&t.children, t.length),
                Component::PodSet(p) => (&p.children, 0.0),
                _ => (&[], 0.0),
            };
            for (s, sl) in layout_children(children, axial_start, axial_start + len) {
                accumulate_rec(&mut sub, s, sl.axial_start);
            }
            let cg = cm.cg_override.unwrap_or_else(|| sub.finish().cg_axial);
            for _ in 0..reps.max(1) {
                acc.add(m, cg, 0.0, 0.0);
            }
            return;
        }
    }
    let self_reps = match comp {
        Component::InnerTube(it) => reps * it.cluster_count.max(1),
        _ => reps,
    };
    for _ in 0..self_reps.max(1) {
        accumulate(acc, comp, axial_start, parent_radius);
    }
    let (children, len, child_reps): (&[Component], f64, u32) = match comp {
        Component::BodyTube(t) => (&t.children, t.length, self_reps),
        Component::InnerTube(it) => (&it.children, it.length, self_reps),
        Component::CenteringRing(c) => (&c.children, c.length, self_reps),
        Component::NoseCone(n) => (&n.children, n.length, self_reps),
        Component::Transition(t) => (&t.children, t.length, self_reps),
        // A pod / parallel stage carries no structural mass itself; its
        // children are replicated `instance_count` times (× any outer
        // cluster reps).
        Component::PodSet(p) => (
            &p.children,
            0.0,
            self_reps * p.instance_count.max(1),
        ),
        _ => return,
    };
    if children.is_empty() {
        return;
    }
    for (sub, sl) in layout_children(children, axial_start, axial_start + len) {
        let child_parent_r = parent_body_radius(comp, sl.axial_start, axial_start);
        accumulate_rec_n(acc, sub, sl.axial_start, child_reps, child_parent_r);
    }
}

fn accumulate(acc: &mut Accumulator, comp: &Component, axial_start: f64, parent_radius: f64) {
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
            // OpenRocket FinSet.CrossSection relative volume: SQUARE 1.00,
            // ROUNDED 0.99, AIRFOIL 0.85 (a slab-volume correction).
            let xsec = match fs.cross_section {
                opsrocket_core::component::FinCrossSection::Square => 1.00,
                opsrocket_core::component::FinCrossSection::Rounded => 0.99,
                opsrocket_core::component::FinCrossSection::Airfoil => 0.85,
            };
            let mass_each = if let Some(mat) = fs.common.material.as_ref() {
                // OpenRocket FinSet.calculateCM: wetted (planform·t·relVol)
                // + root tab (tabL·tabH·t) + root fillet, ×density.
                let wetted = fin_area(fs) * fs.thickness * xsec;
                let tab = fs.tab_length * fs.tab_height * fs.thickness;
                let fillet = if fs.fillet_radius > 0.0 {
                    // Two concave fillets along the root chord; per-side
                    // cross-section r²(1−π/4).
                    let r = fs.fillet_radius;
                    2.0 * r * r * (1.0 - std::f64::consts::PI / 4.0) * fs.root_chord
                } else {
                    0.0
                };
                (wetted + tab + fillet) * mat.density
            } else {
                0.0
            };
            let total_mass = override_mass(&fs.common, mass_each * fs.fin_count as f64);
            let cg = override_cg(&fs.common, axial_start + 0.5 * fs.root_chord);
            // Faithful FinSet.getRotationalUnitInertia / getLongitudinalUnitInertia
            // (rectangular-plate approximation + multi-fin parallel-axis to the
            // FinSet centre, using the parent body radius).
            let spa = fin_area(fs);
            let w = fs.root_chord;
            let h = fs.height;
            let (w2, h2) = if (h * w).abs() < 1e-12 {
                (spa, spa)
            } else {
                (w * spa / h, h * spa / w)
            };
            let br = parent_radius;
            // rotational (roll) unit inertia → opsrocket i_long
            let mut rot_u = h2 / 12.0;
            // longitudinal (pitch) unit inertia → opsrocket i_rot_local
            let mut long_u = (h2 + 2.0 * w2) / 24.0;
            if fs.fin_count > 1 {
                let off = h2.max(0.0).sqrt() / 2.0 + br;
                rot_u += off * off;
                long_u += off * off / 2.0;
            }
            acc.add(total_mass, cg, total_mass * rot_u, total_mass * long_u);
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
        Component::PodSet(_) => {
            // No structural mass of its own; children are walked (×
            // instance_count) by accumulate_rec_n with proper layout.
        }
        Component::TubeFinSet(tf) => {
            // Each tube fin is a thin cylindrical shell: m = ρ·(2πr·L)·t.
            let r = tf.outer_radius.unwrap_or(0.0).max(1e-4);
            let mass_each = if let Some(mat) = tf.common.material.as_ref() {
                mat.density * (2.0 * PI * r * tf.length) * tf.thickness
            } else {
                0.0
            };
            let total = override_mass(&tf.common, mass_each * tf.fin_count as f64);
            let cg = override_cg(&tf.common, axial_start + 0.5 * tf.length);
            // Faithful TubeFinSet.getRotationalUnitInertia /
            // getLongitudinalUnitInertia (verbatim, incl. the OpenRocket
            // multi-fin `+ bodyRadius` quirk).
            let ro = r;
            let ri = (ro - tf.thickness).max(0.0);
            let n = tf.fin_count.max(1) as f64;
            let long1 = (3.0 * (ro * ro + ri * ri) + tf.length * tf.length) / 12.0;
            // axialOffset of the tube assembly ≈ 0 (centred on the body).
            let long_u = if tf.fin_count > 1 { n * long1 } else { long1 };
            let icm = (ri * ri + ro * ro) / 2.0;
            let rot_u = if tf.fin_count > 1 {
                n * (icm + ro * ro + parent_radius)
            } else {
                icm
            };
            acc.add(total, cg, total * rot_u, total * long_u);
        }
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
        // Exact OpenRocket hollow-shell volume (frustum-difference, 128
        // divisions, normal-offset wall) — not wet_area·thickness, which
        // over-estimates curved cones by ~10%.
        let (vol, cg) = opsrocket_core::profile::shell_volume_cg(
            n.shape,
            n.shape_parameter,
            n.length,
            0.0,
            n.aft_radius,
            n.thickness,
            n.filled,
        );
        (vol * mat.density, axial_start + cg)
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
        let (rot_u, long_u) = opsrocket_core::profile::shell_unit_inertia(
            n.shape, n.shape_parameter, n.length, 0.0, n.aft_radius, n.thickness, n.filled,
        );
        acc.add(total, cg, total * rot_u, total * long_u);
    } else if total > 0.0 {
        let cg = override_cg(&n.common, axial_start + 0.75 * n.length);
        let (rot_u, long_u) = opsrocket_core::profile::shell_unit_inertia(
            n.shape, n.shape_parameter, n.length, 0.0, n.aft_radius, n.thickness, n.filled,
        );
        acc.add(total, cg, total * rot_u, total * long_u);
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
    let (shell_mass, shell_cg) = if let Some(mat) = t.common.material.as_ref() {
        // Exact OpenRocket hollow-shell integration (frustum-difference).
        let (vol, cg) = opsrocket_core::profile::shell_volume_cg(
            t.shape,
            t.shape_parameter,
            t.length,
            t.fore_radius,
            t.aft_radius,
            t.thickness,
            t.filled,
        );
        (vol * mat.density, axial_start + cg)
    } else {
        (0.0, axial_start + 0.5 * t.length)
    };

    // Fore + aft shoulders (each contributes wall + optional cap mass).
    let (fore_mass, fore_cg) = transition_shoulder_mass(
        &t.common,
        t.fore_shoulder_radius,
        t.fore_shoulder_length,
        t.fore_shoulder_thickness,
        t.fore_shoulder_capped,
        // Fore shoulder protrudes UPSTREAM from the transition's fore face.
        axial_start - 0.5 * t.fore_shoulder_length,
    );
    let (aft_mass, aft_cg) = transition_shoulder_mass(
        &t.common,
        t.aft_shoulder_radius,
        t.aft_shoulder_length,
        t.aft_shoulder_thickness,
        t.aft_shoulder_capped,
        // Aft shoulder protrudes DOWNSTREAM from the transition's aft face.
        axial_start + t.length + 0.5 * t.aft_shoulder_length,
    );

    let total_computed = shell_mass + fore_mass + aft_mass;
    let mass = override_mass(&t.common, total_computed);
    let computed_cg = if total_computed > 0.0 {
        (shell_mass * shell_cg + fore_mass * fore_cg + aft_mass * aft_cg) / total_computed
    } else {
        axial_start + 0.5 * t.length
    };
    let cg = override_cg(&t.common, computed_cg);
    let (rot_u, long_u) = opsrocket_core::profile::shell_unit_inertia(
        t.shape,
        t.shape_parameter,
        t.length,
        t.fore_radius,
        t.aft_radius,
        t.thickness,
        t.filled,
    );
    // Shoulder inertia contribution is small and rarely material-faithful in
    // OpenRocket either; leave the shell's tensor as the dominant term.
    acc.add(mass, cg, mass * rot_u, mass * long_u);
}

/// Wall + optional cap mass for a transition shoulder. Returns (mass, cg) in
/// world axial coordinates given the shoulder's midpoint as `axial_mid`.
fn transition_shoulder_mass(
    common: &opsrocket_core::component::Common,
    r_outer: f64,
    length: f64,
    thickness: f64,
    capped: bool,
    axial_mid: f64,
) -> (f64, f64) {
    if length <= 0.0 || r_outer <= 0.0 {
        return (0.0, 0.0);
    }
    let mat = match common.material.as_ref() {
        Some(m) => m,
        None => return (0.0, 0.0),
    };
    if !matches!(mat.kind, MaterialType::Bulk) {
        return (0.0, 0.0);
    }
    let r_inner = (r_outer - thickness).max(0.0);
    let wall_vol = PI * (r_outer * r_outer - r_inner * r_inner) * length;
    let mut mass = wall_vol * mat.density;
    if capped {
        let cap_vol = PI * r_inner * r_inner * thickness;
        mass += cap_vol * mat.density;
    }
    (mass, axial_mid)
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
    use opsrocket_core::component::FinShape;
    match fs.shape {
        // Quarter-ellipse-ish OpenRocket elliptical fin: planform =
        // (π/4)·rootChord·height.
        FinShape::Elliptical => {
            std::f64::consts::PI * 0.25 * fs.root_chord * fs.height
        }
        // Freeform: shoelace area of the (chord,height) outline polygon.
        FinShape::Freeform if fs.points.len() >= 3 => {
            let p = &fs.points;
            let mut a = 0.0;
            for i in 0..p.len() {
                let j = (i + 1) % p.len();
                a += p[i][0] * p[j][1] - p[j][0] * p[i][1];
            }
            a.abs() * 0.5
        }
        // Trapezoid: ((root + tip) / 2) · height.
        _ => 0.5 * (fs.root_chord + fs.tip_chord) * fs.height,
    }
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
    accumulate(&mut acc, c, 0.0, 0.0);
    acc.finish().mass
}

/// Recursively collect (component, axial_start) descending the same
/// structural children as the mass walk (body tube + inner tube).
fn collect_layout<'a>(
    c: &'a Component,
    start: f64,
    out: &mut Vec<(&'a Component, f64)>,
) {
    out.push((c, start));
    let (children, len): (&[Component], f64) = match c {
        Component::BodyTube(t) => (&t.children, t.length),
        Component::InnerTube(it) => (&it.children, it.length),
        Component::CenteringRing(cr) => (&cr.children, cr.length),
        Component::NoseCone(n) => (&n.children, n.length),
        Component::Transition(t) => (&t.children, t.length),
        Component::PodSet(p) => (&p.children, 0.0),
        _ => return,
    };
    for (sc, sl) in layout_children(children, start, start + len) {
        collect_layout(sc, sl.axial_start, out);
    }
}

/// Like `collect_layout` but also carries `reps` — the physical-copy
/// multiplier from pod/parallel-stage `instance_count` (and inner-tube
/// `cluster_count`) along the path. Aerodynamics needs this so a parallel
/// booster's nose/fins count once per booster (OpenRocket sums them).
fn collect_layout_reps<'a>(
    c: &'a Component,
    start: f64,
    reps: u32,
    out: &mut Vec<(&'a Component, f64, u32)>,
) {
    out.push((c, start, reps));
    let (children, len, child_reps): (&[Component], f64, u32) = match c {
        Component::BodyTube(t) => (&t.children, t.length, reps),
        Component::InnerTube(it) => {
            (&it.children, it.length, reps * it.cluster_count.max(1))
        }
        Component::CenteringRing(cr) => (&cr.children, cr.length, reps),
        Component::NoseCone(n) => (&n.children, n.length, reps),
        Component::Transition(t) => (&t.children, t.length, reps),
        Component::PodSet(p) => {
            (&p.children, 0.0, reps * p.instance_count.max(1))
        }
        _ => return,
    };
    for (sc, sl) in layout_children(children, start, start + len) {
        collect_layout_reps(sc, sl.axial_start, child_reps, out);
    }
}

/// `iter_layout` with the pod/parallel/cluster replication multiplier.
pub fn iter_layout_reps<'a>(rocket: &'a Rocket) -> Vec<(&'a Component, f64, u32)> {
    let mut out = Vec::new();
    let mut origin = 0.0;
    let mut prev_aft = 0.0;
    for stage in &rocket.stages {
        let layout = layout_children(&stage.children, origin, prev_aft);
        for (c, l) in &layout {
            collect_layout_reps(c, l.axial_start, 1, &mut out);
        }
        if let Some(last) = layout_aft(&stage.children, origin) {
            origin = last;
            prev_aft = last;
        }
    }
    out
}

/// Walk through all stages and yield each component plus its axial start position.
pub fn iter_layout<'a>(rocket: &'a Rocket) -> Vec<(&'a Component, f64)> {
    let mut out = Vec::new();
    let mut origin = 0.0;
    let mut prev_aft = 0.0;
    for stage in &rocket.stages {
        let layout = layout_children(&stage.children, origin, prev_aft);
        for (c, l) in &layout {
            collect_layout(c, l.axial_start, &mut out);
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
