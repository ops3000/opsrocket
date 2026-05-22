//! Data-driven component schema.
//!
//! Instead of 40 hand-written config dialogs (OpenRocket's approach), every
//! component is described as a flat list of typed [`Field`]s. The frontend
//! renders one generic property panel from this schema, and [`apply_edit`]
//! writes a single field back. This faithfully covers every component's
//! editable surface (dimensions, material, position, overrides) with one
//! mechanism.
//!
//! Length fields are exchanged in **millimetres** (the unit OpenRocket
//! shows by default for model rockets); the model stays SI internally.

use opsrocket_core::component::*;
use opsrocket_core::material::{Material, MaterialType};
use serde::Serialize;
use serde_json::{json, Value};

#[derive(Serialize, Clone, Copy, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum FieldKind {
    Length, // mm
    Number,
    Angle, // degrees
    Mass,  // grams
    Int,
    Bool,
    Text,
    Enum,
    Color, // "#RRGGBBAA" hex string
}

#[derive(Serialize, Clone)]
pub struct Field {
    pub key: String,
    pub label: String,
    pub kind: FieldKind,
    pub value: Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub options: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub unit: Option<String>,
    /// Logical section the gui groups this field under: "general", "shoulder",
    /// "override", "appearance", "comment". None ⇒ renders ungrouped (legacy).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub section: Option<String>,
}

#[derive(Serialize, Clone)]
pub struct EditNode {
    pub id: String,
    pub kind: String,
    pub name: String,
    pub depth: usize,
    pub fields: Vec<Field>,
}

const M2MM: f64 = 1000.0;

fn f_len(key: &str, label: &str, v: f64) -> Field {
    Field {
        key: key.into(),
        label: label.into(),
        kind: FieldKind::Length,
        value: json!(v * M2MM),
        options: None,
        unit: Some("mm".into()),
        section: None,
    }
}
fn f_num(key: &str, label: &str, v: f64) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Number, value: json!(v), options: None, unit: None, section: None }
}
fn f_mass(key: &str, label: &str, v: f64) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Mass, value: json!(v * 1000.0), options: None, unit: Some("g".into()), section: None }
}
fn f_ang(key: &str, label: &str, rad: f64) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Angle, value: json!(rad.to_degrees()), options: None, unit: Some("°".into()), section: None }
}
fn f_int(key: &str, label: &str, v: u32) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Int, value: json!(v), options: None, unit: None, section: None }
}
fn f_bool(key: &str, label: &str, v: bool) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Bool, value: json!(v), options: None, unit: None, section: None }
}
fn f_text(key: &str, label: &str, v: &str) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Text, value: json!(v), options: None, unit: None, section: None }
}
fn f_enum(key: &str, label: &str, v: &str, opts: &[&str]) -> Field {
    Field {
        key: key.into(),
        label: label.into(),
        kind: FieldKind::Enum,
        value: json!(v),
        options: Some(opts.iter().map(|s| s.to_string()).collect()),
        unit: None,
        section: None,
    }
}
fn f_opt_len(key: &str, label: &str, v: Option<f64>) -> Field {
    // -1 sentinel = "auto / none"
    f_len(key, label, v.unwrap_or(-0.001))
}
fn f_color(key: &str, label: &str, rgba: [u8; 4]) -> Field {
    let hex = format!(
        "#{:02X}{:02X}{:02X}{:02X}",
        rgba[0], rgba[1], rgba[2], rgba[3]
    );
    Field {
        key: key.into(),
        label: label.into(),
        kind: FieldKind::Color,
        value: json!(hex),
        options: None,
        unit: None,
        section: None,
    }
}
/// Append a `section` tag to the most recently-pushed fields. Saves the
/// per-field section: assignment boilerplate.
fn tag_section(fields: &mut [Field], from: usize, section: &str) {
    for f in &mut fields[from..] {
        if f.section.is_none() {
            f.section = Some(section.into());
        }
    }
}
fn finish_str(f: Finish) -> &'static str {
    match f {
        Finish::Rough => "rough",
        Finish::RoughUnfinished => "rough_unfinished",
        Finish::Unfinished => "unfinished",
        Finish::Normal => "normal",
        Finish::Smooth => "smooth",
        Finish::Optimum => "optimum",
        Finish::Polished => "polished",
        Finish::FinishPolished => "finish_polished",
        Finish::Mirror => "mirror",
    }
}
const FINISHES: &[&str] = &[
    "rough",
    "rough_unfinished",
    "unfinished",
    "normal",
    "smooth",
    "optimum",
    "polished",
    "finish_polished",
    "mirror",
];
fn parse_finish(s: &str) -> Finish {
    match s {
        "rough" => Finish::Rough,
        "rough_unfinished" => Finish::RoughUnfinished,
        "unfinished" => Finish::Unfinished,
        "smooth" => Finish::Smooth,
        "optimum" => Finish::Optimum,
        "polished" => Finish::Polished,
        "finish_polished" => Finish::FinishPolished,
        "mirror" => Finish::Mirror,
        _ => Finish::Normal,
    }
}
fn parse_hex_rgba(s: &str) -> Option<[u8; 4]> {
    let s = s.trim_start_matches('#');
    if s.len() != 8 && s.len() != 6 {
        return None;
    }
    let mut out = [0u8; 4];
    out[3] = 255;
    let bytes = s.as_bytes();
    for i in 0..(s.len() / 2) {
        let hi = (bytes[i * 2] as char).to_digit(16)? as u8;
        let lo = (bytes[i * 2 + 1] as char).to_digit(16)? as u8;
        out[i] = (hi << 4) | lo;
    }
    Some(out)
}

fn nose_shape_str(s: NoseShape) -> &'static str {
    match s {
        NoseShape::Conical => "conical",
        NoseShape::Ogive => "ogive",
        NoseShape::Ellipsoid => "ellipsoid",
        NoseShape::Power => "power",
        NoseShape::Parabolic => "parabolic",
        NoseShape::Haack => "haack",
    }
}
const SHAPES: &[&str] = &["conical", "ogive", "ellipsoid", "power", "parabolic", "haack"];

fn axial_str(a: AxialMethod) -> &'static str {
    match a {
        AxialMethod::Absolute => "absolute",
        AxialMethod::Top => "top",
        AxialMethod::Bottom => "bottom",
        AxialMethod::Middle => "middle",
        AxialMethod::After => "after",
    }
}
const AXIAL: &[&str] = &["after", "top", "bottom", "middle", "absolute"];

fn separation_event_str(e: opsrocket_core::component::SeparationEvent) -> &'static str {
    use opsrocket_core::component::SeparationEvent::*;
    match e {
        Never => "never",
        Burnout => "burnout",
        Ejection => "ejection",
        UpperIgnition => "upper_ignition",
    }
}
const SEPARATION_EVENTS: &[&str] = &["never", "burnout", "ejection", "upper_ignition"];
fn parse_separation_event(s: &str) -> opsrocket_core::component::SeparationEvent {
    use opsrocket_core::component::SeparationEvent::*;
    match s {
        "burnout" => Burnout,
        "ejection" => Ejection,
        "upper_ignition" => UpperIgnition,
        _ => Never,
    }
}

fn ignition_str(e: opsrocket_core::component::IgnitionEvent) -> &'static str {
    use opsrocket_core::component::IgnitionEvent::*;
    match e {
        Automatic => "automatic",
        Launch => "launch",
        Burnout => "burnout",
        Ejection => "ejection",
        LowerStageSeparation => "lower_stage_separation",
    }
}
const IGNITION_EVENTS: &[&str] = &[
    "automatic",
    "launch",
    "burnout",
    "ejection",
    "lower_stage_separation",
];
fn parse_ignition_event(s: &str) -> opsrocket_core::component::IgnitionEvent {
    use opsrocket_core::component::IgnitionEvent::*;
    match s {
        "launch" => Launch,
        "burnout" => Burnout,
        "ejection" => Ejection,
        "lower_stage_separation" => LowerStageSeparation,
        _ => Automatic,
    }
}
fn apply_motor_mount_edit(
    mm: &mut Option<opsrocket_core::component::MotorMount>,
    key: &str,
    v: &Value,
) -> Result<(), String> {
    use opsrocket_core::component::{IgnitionEvent, MotorMount};
    match key {
        "motor_mount_present" => {
            let present = as_bool(v)?;
            if present && mm.is_none() {
                *mm = Some(MotorMount {
                    overhang: 0.0,
                    ignition_event: IgnitionEvent::Automatic,
                    ignition_delay: 0.0,
                    motors: Vec::new(),
                });
            } else if !present {
                *mm = None;
            }
            Ok(())
        }
        "motor_mount_overhang" => {
            if let Some(m) = mm {
                m.overhang = as_f64(v)? / M2MM;
            }
            Ok(())
        }
        "motor_mount_ignition_event" => {
            if let Some(m) = mm {
                m.ignition_event = parse_ignition_event(&as_str(v)?);
            }
            Ok(())
        }
        "motor_mount_ignition_delay" => {
            if let Some(m) = mm {
                m.ignition_delay = as_f64(v)?;
            }
            Ok(())
        }
        _ => Err(format!("unknown motor mount field {key}")),
    }
}

fn push_motor_mount_fields(
    f: &mut Vec<Field>,
    mm: Option<&opsrocket_core::component::MotorMount>,
) {
    let from = f.len();
    let has_mount = mm.is_some();
    f.push(f_bool("motor_mount_present", "Is motor mount", has_mount));
    if let Some(m) = mm {
        f.push(f_len("motor_mount_overhang", "Overhang", m.overhang));
        f.push(f_enum(
            "motor_mount_ignition_event",
            "Ignition event",
            ignition_str(m.ignition_event),
            IGNITION_EVENTS,
        ));
        f.push(f_num(
            "motor_mount_ignition_delay",
            "Ignition delay (s)",
            m.ignition_delay,
        ));
    }
    tag_section(f, from, "motor");
}

fn common_fields(c: &Common) -> Vec<Field> {
    let mut v = Vec::new();

    // General: identity + placement + material/finish (the surface knobs)
    v.push(f_text("name", "Name", &c.name));
    v.push(f_enum("axial_method", "Position", axial_str(c.axial_method), AXIAL));
    v.push(f_len("axial_offset", "Offset", c.axial_offset));
    v.push(f_ang("angle_offset", "Angle offset", c.angle_offset));
    if let Some(m) = &c.material {
        v.push(f_text("material_name", "Material", &m.name));
        v.push(f_num("material_density", "Density (SI)", m.density));
    }
    v.push(f_enum("finish", "Surface finish", finish_str(c.finish), FINISHES));
    tag_section(&mut v, 0, "general");

    // Override: mass / cg / cd plus their subcomponents flags
    let from = v.len();
    v.push(f_mass(
        "mass_override",
        "Mass override (<0=off)",
        c.mass_override.unwrap_or(-0.001),
    ));
    v.push(f_len(
        "cg_override",
        "CG override (<0=off)",
        c.cg_override.unwrap_or(-0.001),
    ));
    v.push(f_bool(
        "override_subcomponents_mass",
        "Override subcomponents mass",
        c.override_subcomponents_mass,
    ));
    v.push(f_num(
        "cd_override",
        "CD override (<0=off)",
        c.cd_override.unwrap_or(-1.0),
    ));
    v.push(f_bool(
        "override_subcomponents_cd",
        "Override subcomponents CD",
        c.override_subcomponents_cd,
    ));
    tag_section(&mut v, from, "override");

    // Appearance: paint + shine. If the component has no appearance yet,
    // expose the default so the user can edit it without an extra click.
    let from = v.len();
    let app = c.appearance.clone().unwrap_or(Appearance {
        paint: [200, 200, 200, 255],
        shine: 0.3,
        decal: None,
    });
    v.push(f_color("appearance_paint", "Paint colour", app.paint));
    v.push(f_num("appearance_shine", "Shine (0-1)", app.shine));
    tag_section(&mut v, from, "appearance");

    // Comment: free-text note attached to the component.
    let from = v.len();
    v.push(f_text("comment", "Comment", &c.comment));
    tag_section(&mut v, from, "comment");

    v
}

fn enum_block(kind: &str) -> Vec<Field> {
    // Extra editable enums that aren't on Common.
    match kind {
        _ => vec![],
    }
}

fn fields_for(comp: &Component) -> Vec<Field> {
    let mut f = common_fields(comp.common());
    match comp {
        Component::NoseCone(n) => {
            let gen_from = f.len();
            f.push(f_enum("shape", "Shape", nose_shape_str(n.shape), SHAPES));
            f.push(f_num("shape_parameter", "Shape param", n.shape_parameter));
            f.push(f_len("length", "Length", n.length));
            f.push(f_len("aft_radius", "Base radius", n.aft_radius));
            f.push(f_len("thickness", "Wall thickness", n.thickness));
            f.push(f_bool("filled", "Filled", n.filled));
            f.push(f_bool("is_flipped", "Flipped", n.is_flipped));
            tag_section(&mut f, gen_from, "general");
            let sh_from = f.len();
            f.push(f_len("aft_shoulder_radius", "Shoulder radius", n.aft_shoulder_radius));
            f.push(f_len("aft_shoulder_length", "Shoulder length", n.aft_shoulder_length));
            f.push(f_len("aft_shoulder_thickness", "Shoulder thickness", n.aft_shoulder_thickness));
            f.push(f_bool("aft_shoulder_capped", "Shoulder capped", n.aft_shoulder_capped));
            tag_section(&mut f, sh_from, "shoulder");
        }
        Component::BodyTube(b) => {
            let gen_from = f.len();
            f.push(f_len("length", "Length", b.length));
            f.push(f_opt_len("radius", "Outer radius (<0=auto)", b.radius));
            f.push(f_len("thickness", "Wall thickness", b.thickness));
            tag_section(&mut f, gen_from, "general");
            push_motor_mount_fields(&mut f, b.motor_mount.as_ref());
        }
        Component::Transition(t) => {
            let gen_from = f.len();
            f.push(f_enum("shape", "Shape", nose_shape_str(t.shape), SHAPES));
            f.push(f_num("shape_parameter", "Shape param", t.shape_parameter));
            f.push(f_len("length", "Length", t.length));
            f.push(f_len("fore_radius", "Fore radius", t.fore_radius));
            f.push(f_len("aft_radius", "Aft radius", t.aft_radius));
            f.push(f_len("thickness", "Wall thickness", t.thickness));
            f.push(f_bool("filled", "Filled", t.filled));
            f.push(f_bool("clipped", "Clipped", t.clipped));
            tag_section(&mut f, gen_from, "general");
            let sh_from = f.len();
            f.push(f_len("fore_shoulder_radius", "Fore shoulder radius", t.fore_shoulder_radius));
            f.push(f_len("fore_shoulder_length", "Fore shoulder length", t.fore_shoulder_length));
            f.push(f_len("fore_shoulder_thickness", "Fore shoulder thickness", t.fore_shoulder_thickness));
            f.push(f_bool("fore_shoulder_capped", "Fore shoulder capped", t.fore_shoulder_capped));
            f.push(f_len("aft_shoulder_radius", "Aft shoulder radius", t.aft_shoulder_radius));
            f.push(f_len("aft_shoulder_length", "Aft shoulder length", t.aft_shoulder_length));
            f.push(f_len("aft_shoulder_thickness", "Aft shoulder thickness", t.aft_shoulder_thickness));
            f.push(f_bool("aft_shoulder_capped", "Aft shoulder capped", t.aft_shoulder_capped));
            tag_section(&mut f, sh_from, "shoulder");
        }
        Component::InnerTube(it) => {
            let gen_from = f.len();
            f.push(f_len("length", "Length", it.length));
            f.push(f_len("outer_radius", "Outer radius", it.outer_radius));
            f.push(f_len("inner_radius", "Inner radius", it.inner_radius));
            tag_section(&mut f, gen_from, "general");
            push_motor_mount_fields(&mut f, it.motor_mount.as_ref());
        }
        Component::MassObject(m) => {
            f.push(f_len("length", "Length", m.length));
            f.push(f_len("radius", "Radius", m.radius));
            f.push(f_mass("mass", "Mass", m.mass));
        }
        Component::Parachute(p) => {
            f.push(f_len("diameter", "Canopy diameter", p.diameter));
            f.push(f_num("cd", "Drag coeff (<0=auto)", p.cd.unwrap_or(-1.0)));
            f.push(f_enum(
                "deploy_event",
                "Deploy event",
                match p.deploy_event {
                    DeployEvent::Launch => "launch",
                    DeployEvent::Ejection => "ejection",
                    DeployEvent::Apogee => "apogee",
                    DeployEvent::Altitude => "altitude",
                    DeployEvent::LowerStageSeparation => "lower_stage_separation",
                    DeployEvent::Never => "never",
                },
                &["ejection", "apogee", "altitude", "launch", "lower_stage_separation", "never"],
            ));
            f.push(f_len("deploy_altitude", "Deploy altitude", p.deploy_altitude));
            f.push(f_num("deploy_delay", "Deploy delay (s)", p.deploy_delay));
            f.push(f_int("line_count", "Shroud lines", p.line_count));
            f.push(f_len("line_length", "Line length", p.line_length));
            f.push(f_len("packed_length", "Packed length", p.packed_length));
            f.push(f_len("packed_radius", "Packed radius", p.packed_radius));
        }
        Component::ShockCord(s) => {
            f.push(f_len("cord_length", "Cord length", s.cord_length));
            f.push(f_len("packed_length", "Packed length", s.packed_length));
            f.push(f_len("packed_radius", "Packed radius", s.packed_radius));
        }
        Component::LaunchLug(l) => {
            f.push(f_len("length", "Length", l.length));
            f.push(f_len("outer_radius", "Outer radius", l.outer_radius));
            f.push(f_len("inner_radius", "Inner radius", l.inner_radius));
            f.push(f_int("instance_count", "Count", l.instance_count));
        }
        Component::CenteringRing(c) => {
            f.push(f_len("length", "Thickness", c.length));
            f.push(f_len("outer_radius", "Outer radius", c.outer_radius));
            f.push(f_len("inner_radius", "Inner radius", c.inner_radius));
            f.push(f_int("instance_count", "Count", c.instance_count));
        }
        Component::FinSet(fs) => {
            let gen_from = f.len();
            f.push(f_int("fin_count", "Fin count", fs.fin_count));
            f.push(f_enum(
                "shape",
                "Planform",
                match fs.shape {
                    FinShape::Trapezoidal => "trapezoidal",
                    FinShape::Elliptical => "elliptical",
                    FinShape::Freeform => "freeform",
                },
                &["trapezoidal", "elliptical", "freeform"],
            ));
            f.push(f_len("root_chord", "Root chord", fs.root_chord));
            f.push(f_len("tip_chord", "Tip chord", fs.tip_chord));
            f.push(f_len("sweep_length", "Sweep length", fs.sweep_length));
            f.push(f_len("height", "Height (span)", fs.height));
            f.push(f_len("thickness", "Thickness", fs.thickness));
            f.push(f_ang("cant_angle", "Cant angle", fs.cant_angle));
            f.push(f_enum(
                "cross_section",
                "Cross section",
                match fs.cross_section {
                    FinCrossSection::Square => "square",
                    FinCrossSection::Rounded => "rounded",
                    FinCrossSection::Airfoil => "airfoil",
                },
                &["square", "rounded", "airfoil"],
            ));
            tag_section(&mut f, gen_from, "general");
            // Root tab (fin section buried inside the body tube) + fillets.
            let tab_from = f.len();
            f.push(f_len("tab_length", "Tab length", fs.tab_length));
            f.push(f_len("tab_height", "Tab height", fs.tab_height));
            f.push(f_len("fillet_radius", "Fillet radius", fs.fillet_radius));
            tag_section(&mut f, tab_from, "shoulder"); // reuse the "tabs/root" group
            // Freeform points — exposed as a JSON-encoded text field for v1.
            if matches!(fs.shape, FinShape::Freeform) {
                let from = f.len();
                f.push(f_text(
                    "freeform_points",
                    "Freeform points (JSON)",
                    &serde_json::to_string(&fs.points).unwrap_or_default(),
                ));
                tag_section(&mut f, from, "general");
            }
        }
        Component::PodSet(p) => {
            f.push(f_int("instance_count", "Instances", p.instance_count));
            f.push(f_len("radius_offset", "Radial offset", p.radius_offset));
        }
        Component::TubeFinSet(t) => {
            f.push(f_int("fin_count", "Tube count", t.fin_count));
            f.push(f_len("length", "Length", t.length));
            f.push(f_len(
                "outer_radius",
                "Tube radius (<0=auto)",
                t.outer_radius.unwrap_or(-0.001),
            ));
            f.push(f_len("thickness", "Wall thickness", t.thickness));
        }
    }
    f.extend(enum_block(kind_of(comp)));
    f
}

pub fn kind_of(c: &Component) -> &'static str {
    match c {
        Component::NoseCone(_) => "NoseCone",
        Component::BodyTube(_) => "BodyTube",
        Component::Transition(_) => "Transition",
        Component::InnerTube(_) => "InnerTube",
        Component::FinSet(_) => "FinSet",
        Component::MassObject(_) => "MassObject",
        Component::Parachute(_) => "Parachute",
        Component::ShockCord(_) => "ShockCord",
        Component::LaunchLug(_) => "LaunchLug",
        Component::CenteringRing(_) => "CenteringRing",
        Component::PodSet(p) if p.is_parallel_stage => "ParallelStage",
        Component::PodSet(_) => "PodSet",
        Component::TubeFinSet(_) => "TubeFinSet",
    }
}

/// Ensure every component has a non-empty stable id (the editor keys on it).
pub fn ensure_ids(rocket: &mut Rocket) {
    let mut n = 0usize;
    fn walk(c: &mut Component, n: &mut usize) {
        if c.common().id.0.is_empty() {
            set_id(c, format!("auto-{}", *n));
        }
        *n += 1;
        let kids: Option<&mut Vec<Component>> = match c {
            Component::BodyTube(t) => Some(&mut t.children),
            Component::NoseCone(n) => Some(&mut n.children),
            Component::Transition(t) => Some(&mut t.children),
            Component::InnerTube(it) => Some(&mut it.children),
            Component::CenteringRing(cr) => Some(&mut cr.children),
            Component::PodSet(p) => Some(&mut p.children),
            _ => None,
        };
        if let Some(kids) = kids {
            for s in kids {
                walk(s, n);
            }
        }
    }
    for st in &mut rocket.stages {
        if st.common.id.0.is_empty() {
            st.common.id = ComponentId::new(format!("stage-{}", n));
        }
        n += 1;
        for ch in &mut st.children {
            walk(ch, &mut n);
        }
    }
}

fn set_id(c: &mut Component, id: String) {
    let cid = ComponentId::new(id);
    match c {
        Component::NoseCone(x) => x.common.id = cid,
        Component::BodyTube(x) => x.common.id = cid,
        Component::Transition(x) => x.common.id = cid,
        Component::InnerTube(x) => x.common.id = cid,
        Component::FinSet(x) => x.common.id = cid,
        Component::MassObject(x) => x.common.id = cid,
        Component::Parachute(x) => x.common.id = cid,
        Component::ShockCord(x) => x.common.id = cid,
        Component::LaunchLug(x) => x.common.id = cid,
        Component::CenteringRing(x) => x.common.id = cid,
        Component::PodSet(x) => x.common.id = cid,
        Component::TubeFinSet(x) => x.common.id = cid,
    }
}

/// Flatten the rocket into an editable tree (depth for indentation).
pub fn build_tree(rocket: &Rocket) -> Vec<EditNode> {
    let mut out = Vec::new();
    fn walk(c: &Component, depth: usize, out: &mut Vec<EditNode>) {
        out.push(EditNode {
            id: c.common().id.0.clone(),
            kind: kind_of(c).into(),
            name: c.common().name.clone(),
            depth,
            fields: fields_for(c),
        });
        // Every variant that holds nested components: descend so the GUI
        // tree mirrors what the engine actually walks (and the user can
        // edit / delete the nested parts).
        let kids: Option<&Vec<Component>> = match c {
            Component::BodyTube(t) => Some(&t.children),
            Component::NoseCone(n) => Some(&n.children),
            Component::Transition(t) => Some(&t.children),
            Component::InnerTube(it) => Some(&it.children),
            Component::CenteringRing(cr) => Some(&cr.children),
            Component::PodSet(p) => Some(&p.children),
            _ => None,
        };
        if let Some(kids) = kids {
            for s in kids {
                walk(s, depth + 1, out);
            }
        }
    }
    for (si, st) in rocket.stages.iter().enumerate() {
        let stage_fields = vec![
            f_text("name", "Name", &st.common.name),
            f_enum(
                "separation_event",
                "Separation event",
                separation_event_str(st.separation_event),
                SEPARATION_EVENTS,
            ),
            f_num("separation_delay", "Separation delay (s)", st.separation_delay),
        ];
        out.push(EditNode {
            id: st.common.id.0.clone(),
            kind: "Stage".into(),
            name: if st.common.name.is_empty() {
                format!("Stage {}", si + 1)
            } else {
                st.common.name.clone()
            },
            depth: 0,
            fields: stage_fields,
        });
        for ch in &st.children {
            walk(ch, 1, &mut out);
        }
    }
    out
}

fn find_mut<'a>(rocket: &'a mut Rocket, id: &str) -> Option<&'a mut Component> {
    fn walk<'b>(c: &'b mut Component, id: &str) -> Option<&'b mut Component> {
        if c.common().id.0 == id {
            return Some(c);
        }
        let kids: Option<&mut Vec<Component>> = match c {
            Component::BodyTube(t) => Some(&mut t.children),
            Component::NoseCone(n) => Some(&mut n.children),
            Component::Transition(t) => Some(&mut t.children),
            Component::InnerTube(it) => Some(&mut it.children),
            Component::CenteringRing(cr) => Some(&mut cr.children),
            Component::PodSet(p) => Some(&mut p.children),
            _ => None,
        };
        if let Some(kids) = kids {
            for s in kids {
                if let Some(found) = walk(s, id) {
                    return Some(found);
                }
            }
        }
        None
    }
    for st in &mut rocket.stages {
        for ch in &mut st.children {
            if let Some(found) = walk(ch, id) {
                return Some(found);
            }
        }
    }
    None
}

fn as_f64(v: &Value) -> Result<f64, String> {
    v.as_f64()
        .or_else(|| v.as_str().and_then(|s| s.parse().ok()))
        .ok_or_else(|| format!("expected number, got {v}"))
}
fn as_u32(v: &Value) -> Result<u32, String> {
    Ok(as_f64(v)?.round().max(0.0) as u32)
}
fn as_str(v: &Value) -> Result<String, String> {
    v.as_str().map(|s| s.to_string()).ok_or_else(|| "expected string".into())
}
fn as_bool(v: &Value) -> Result<bool, String> {
    v.as_bool().ok_or_else(|| "expected bool".into())
}

fn parse_shape(s: &str) -> NoseShape {
    match s {
        "conical" => NoseShape::Conical,
        "ellipsoid" => NoseShape::Ellipsoid,
        "power" => NoseShape::Power,
        "parabolic" => NoseShape::Parabolic,
        "haack" => NoseShape::Haack,
        _ => NoseShape::Ogive,
    }
}

fn set_common(common: &mut Common, key: &str, v: &Value) -> Result<bool, String> {
    match key {
        "name" => {
            common.name = as_str(v)?;
            Ok(true)
        }
        "axial_method" => {
            common.axial_method = match as_str(v)?.as_str() {
                "top" => AxialMethod::Top,
                "bottom" => AxialMethod::Bottom,
                "middle" => AxialMethod::Middle,
                "absolute" => AxialMethod::Absolute,
                _ => AxialMethod::After,
            };
            Ok(true)
        }
        "axial_offset" => {
            common.axial_offset = as_f64(v)? / M2MM;
            Ok(true)
        }
        "angle_offset" => {
            common.angle_offset = as_f64(v)?.to_radians();
            Ok(true)
        }
        "material_name" => {
            let name = as_str(v)?;
            // If the name matches the bundled materials catalog, adopt its
            // density + kind + group so the user doesn't have to enter them.
            if let Some(entry) = opsrocket_core::material::Material::lookup(&name) {
                common.material = Some(entry.into_material());
            } else if let Some(m) = &mut common.material {
                m.name = name;
            } else {
                common.material = Some(Material {
                    name,
                    kind: MaterialType::Bulk,
                    density: 0.0,
                    group: None,
                });
            }
            Ok(true)
        }
        "material_density" => {
            let d = as_f64(v)?;
            match &mut common.material {
                Some(m) => m.density = d,
                None => {
                    common.material =
                        Some(Material { name: "Custom".into(), kind: MaterialType::Bulk, density: d, group: None })
                }
            }
            Ok(true)
        }
        "finish" => {
            common.finish = parse_finish(&as_str(v)?);
            Ok(true)
        }
        "mass_override" => {
            // grams in the UI; struct stores kg. Sentinel <0 = off.
            let g = as_f64(v)?;
            common.mass_override = if g < 0.0 { None } else { Some(g / 1000.0) };
            Ok(true)
        }
        "cg_override" => {
            // mm in the UI; struct stores metres. Sentinel <0 = off.
            let mm = as_f64(v)?;
            common.cg_override = if mm < 0.0 { None } else { Some(mm / M2MM) };
            Ok(true)
        }
        "override_subcomponents_mass" => {
            common.override_subcomponents_mass = as_bool(v)?;
            Ok(true)
        }
        "cd_override" => {
            let x = as_f64(v)?;
            common.cd_override = if x < 0.0 { None } else { Some(x) };
            Ok(true)
        }
        "override_subcomponents_cd" => {
            common.override_subcomponents_cd = as_bool(v)?;
            Ok(true)
        }
        "appearance_paint" => {
            let hex = as_str(v)?;
            let rgba =
                parse_hex_rgba(&hex).ok_or_else(|| format!("bad colour {hex}"))?;
            let mut app = common.appearance.clone().unwrap_or(Appearance {
                paint: [200, 200, 200, 255],
                shine: 0.3,
                decal: None,
            });
            app.paint = rgba;
            common.appearance = Some(app);
            Ok(true)
        }
        "appearance_shine" => {
            let s = as_f64(v)?.clamp(0.0, 1.0);
            let mut app = common.appearance.clone().unwrap_or(Appearance {
                paint: [200, 200, 200, 255],
                shine: 0.3,
                decal: None,
            });
            app.shine = s;
            common.appearance = Some(app);
            Ok(true)
        }
        "comment" => {
            common.comment = as_str(v)?;
            Ok(true)
        }
        _ => Ok(false),
    }
}

/// Apply a single field edit to the component with the given id.
pub fn apply_edit(rocket: &mut Rocket, id: &str, key: &str, v: &Value) -> Result<(), String> {
    // Stage rename.
    for (si, st) in rocket.stages.iter_mut().enumerate() {
        if st.common.id.0 == id {
            match key {
                "name" => {
                    st.common.name = as_str(v)?;
                    return Ok(());
                }
                "separation_event" => {
                    st.separation_event = parse_separation_event(&as_str(v)?);
                    return Ok(());
                }
                "separation_delay" => {
                    st.separation_delay = as_f64(v)?.max(0.0);
                    return Ok(());
                }
                _ => {}
            }
            let _ = si;
            return Err(format!("stage has no field {key}"));
        }
    }
    let comp = find_mut(rocket, id).ok_or_else(|| format!("component {id} not found"))?;
    {
        let common = match comp {
            Component::NoseCone(x) => &mut x.common,
            Component::BodyTube(x) => &mut x.common,
            Component::Transition(x) => &mut x.common,
            Component::InnerTube(x) => &mut x.common,
            Component::FinSet(x) => &mut x.common,
            Component::MassObject(x) => &mut x.common,
            Component::Parachute(x) => &mut x.common,
            Component::ShockCord(x) => &mut x.common,
            Component::LaunchLug(x) => &mut x.common,
            Component::CenteringRing(x) => &mut x.common,
            Component::PodSet(x) => &mut x.common,
            Component::TubeFinSet(x) => &mut x.common,
        };
        if set_common(common, key, v)? {
            return Ok(());
        }
    }
    let mm = |v: &Value| as_f64(v).map(|x| x / M2MM);
    match comp {
        Component::NoseCone(n) => match key {
            "shape" => n.shape = parse_shape(&as_str(v)?),
            "shape_parameter" => n.shape_parameter = as_f64(v)?,
            "length" => n.length = mm(v)?,
            "aft_radius" => n.aft_radius = mm(v)?,
            "thickness" => n.thickness = mm(v)?,
            "filled" => n.filled = as_bool(v)?,
            "aft_shoulder_radius" => n.aft_shoulder_radius = mm(v)?,
            "aft_shoulder_length" => n.aft_shoulder_length = mm(v)?,
            "aft_shoulder_thickness" => n.aft_shoulder_thickness = mm(v)?,
            "aft_shoulder_capped" => n.aft_shoulder_capped = as_bool(v)?,
            "is_flipped" => n.is_flipped = as_bool(v)?,
            _ => return Err(format!("NoseCone has no field {key}")),
        },
        Component::BodyTube(b) => match key {
            "length" => b.length = mm(v)?,
            "radius" => {
                let r = mm(v)?;
                b.radius = if r < 0.0 { None } else { Some(r) };
            }
            "thickness" => b.thickness = mm(v)?,
            k if k.starts_with("motor_mount") => {
                apply_motor_mount_edit(&mut b.motor_mount, k, v)?;
            }
            _ => return Err(format!("BodyTube has no field {key}")),
        },
        Component::Transition(t) => match key {
            "shape" => t.shape = parse_shape(&as_str(v)?),
            "shape_parameter" => t.shape_parameter = as_f64(v)?,
            "length" => t.length = mm(v)?,
            "fore_radius" => t.fore_radius = mm(v)?,
            "aft_radius" => t.aft_radius = mm(v)?,
            "thickness" => t.thickness = mm(v)?,
            "filled" => t.filled = as_bool(v)?,
            "clipped" => t.clipped = as_bool(v)?,
            "fore_shoulder_radius" => t.fore_shoulder_radius = mm(v)?,
            "fore_shoulder_length" => t.fore_shoulder_length = mm(v)?,
            "fore_shoulder_thickness" => t.fore_shoulder_thickness = mm(v)?,
            "fore_shoulder_capped" => t.fore_shoulder_capped = as_bool(v)?,
            "aft_shoulder_radius" => t.aft_shoulder_radius = mm(v)?,
            "aft_shoulder_length" => t.aft_shoulder_length = mm(v)?,
            "aft_shoulder_thickness" => t.aft_shoulder_thickness = mm(v)?,
            "aft_shoulder_capped" => t.aft_shoulder_capped = as_bool(v)?,
            _ => return Err(format!("Transition has no field {key}")),
        },
        Component::InnerTube(it) => match key {
            "length" => it.length = mm(v)?,
            "outer_radius" => it.outer_radius = mm(v)?,
            "inner_radius" => it.inner_radius = mm(v)?,
            k if k.starts_with("motor_mount") => {
                apply_motor_mount_edit(&mut it.motor_mount, k, v)?;
            }
            _ => return Err(format!("InnerTube has no field {key}")),
        },
        Component::MassObject(m) => match key {
            "length" => m.length = mm(v)?,
            "radius" => m.radius = mm(v)?,
            "mass" => m.mass = as_f64(v)? / 1000.0,
            _ => return Err(format!("MassObject has no field {key}")),
        },
        Component::Parachute(p) => match key {
            "diameter" => p.diameter = mm(v)?,
            "cd" => {
                let c = as_f64(v)?;
                p.cd = if c < 0.0 { None } else { Some(c) };
            }
            "deploy_event" => {
                p.deploy_event = match as_str(v)?.as_str() {
                    "launch" => DeployEvent::Launch,
                    "apogee" => DeployEvent::Apogee,
                    "altitude" => DeployEvent::Altitude,
                    "lower_stage_separation" => DeployEvent::LowerStageSeparation,
                    "never" => DeployEvent::Never,
                    _ => DeployEvent::Ejection,
                }
            }
            "deploy_altitude" => p.deploy_altitude = mm(v)?,
            "deploy_delay" => p.deploy_delay = as_f64(v)?,
            "line_count" => p.line_count = as_u32(v)?,
            "line_length" => p.line_length = mm(v)?,
            "packed_length" => p.packed_length = mm(v)?,
            "packed_radius" => p.packed_radius = mm(v)?,
            _ => return Err(format!("Parachute has no field {key}")),
        },
        Component::ShockCord(s) => match key {
            "cord_length" => s.cord_length = mm(v)?,
            "packed_length" => s.packed_length = mm(v)?,
            "packed_radius" => s.packed_radius = mm(v)?,
            _ => return Err(format!("ShockCord has no field {key}")),
        },
        Component::LaunchLug(l) => match key {
            "length" => l.length = mm(v)?,
            "outer_radius" => l.outer_radius = mm(v)?,
            "inner_radius" => l.inner_radius = mm(v)?,
            "instance_count" => l.instance_count = as_u32(v)?.max(1),
            _ => return Err(format!("LaunchLug has no field {key}")),
        },
        Component::CenteringRing(c) => match key {
            "length" => c.length = mm(v)?,
            "outer_radius" => c.outer_radius = mm(v)?,
            "inner_radius" => c.inner_radius = mm(v)?,
            "instance_count" => c.instance_count = as_u32(v)?.max(1),
            _ => return Err(format!("CenteringRing has no field {key}")),
        },
        Component::FinSet(fs) => match key {
            "fin_count" => fs.fin_count = as_u32(v)?.max(1),
            "shape" => {
                fs.shape = match as_str(v)?.as_str() {
                    "elliptical" => FinShape::Elliptical,
                    "freeform" => FinShape::Freeform,
                    _ => FinShape::Trapezoidal,
                }
            }
            "root_chord" => fs.root_chord = mm(v)?,
            "tip_chord" => fs.tip_chord = mm(v)?,
            "sweep_length" => fs.sweep_length = mm(v)?,
            "height" => fs.height = mm(v)?,
            "thickness" => fs.thickness = mm(v)?,
            "cant_angle" => fs.cant_angle = as_f64(v)?.to_radians(),
            "cross_section" => {
                fs.cross_section = match as_str(v)?.as_str() {
                    "rounded" => FinCrossSection::Rounded,
                    "airfoil" => FinCrossSection::Airfoil,
                    _ => FinCrossSection::Square,
                }
            }
            "tab_length" => fs.tab_length = mm(v)?,
            "tab_height" => fs.tab_height = mm(v)?,
            "fillet_radius" => fs.fillet_radius = mm(v)?,
            "freeform_points" => {
                let s = as_str(v)?;
                if let Ok(pts) = serde_json::from_str::<Vec<[f64; 2]>>(&s) {
                    fs.points = pts;
                }
            }
            _ => return Err(format!("FinSet has no field {key}")),
        },
        Component::PodSet(p) => match key {
            "instance_count" => p.instance_count = as_u32(v)?.max(1),
            "radius_offset" => p.radius_offset = mm(v)?,
            _ => return Err(format!("PodSet has no field {key}")),
        },
        Component::TubeFinSet(t) => match key {
            "fin_count" => t.fin_count = as_u32(v)?.max(1),
            "length" => t.length = mm(v)?,
            "outer_radius" => {
                let r = mm(v)?;
                t.outer_radius = if r < 0.0 { None } else { Some(r) };
            }
            "thickness" => t.thickness = mm(v)?,
            _ => return Err(format!("TubeFinSet has no field {key}")),
        },
    }
    Ok(())
}

/// Delete the component with the given id (and its subtree).
pub fn delete_component(rocket: &mut Rocket, id: &str) -> Result<(), String> {
    fn rm(children: &mut Vec<Component>, id: &str) -> bool {
        if let Some(pos) = children.iter().position(|c| c.common().id.0 == id) {
            children.remove(pos);
            return true;
        }
        for c in children.iter_mut() {
            let kids: Option<&mut Vec<Component>> = match c {
                Component::BodyTube(t) => Some(&mut t.children),
                Component::NoseCone(n) => Some(&mut n.children),
                Component::Transition(t) => Some(&mut t.children),
                Component::InnerTube(it) => Some(&mut it.children),
                Component::CenteringRing(cr) => Some(&mut cr.children),
                Component::PodSet(p) => Some(&mut p.children),
                _ => None,
            };
            if let Some(kids) = kids {
                if rm(kids, id) {
                    return true;
                }
            }
        }
        false
    }
    for st in &mut rocket.stages {
        if rm(&mut st.children, id) {
            return Ok(());
        }
    }
    Err(format!("component {id} not found"))
}

/// Every component id currently in the rocket (used to mint a fresh,
/// collision-free id for a newly-added part). Walks every container kind,
/// not just the tree-visible ones, so we never reuse a nested id.
fn collect_ids(rocket: &Rocket, into: &mut std::collections::HashSet<String>) {
    fn walk(c: &Component, into: &mut std::collections::HashSet<String>) {
        into.insert(c.common().id.0.clone());
        let kids = match c {
            Component::NoseCone(x) => Some(&x.children),
            Component::BodyTube(x) => Some(&x.children),
            Component::Transition(x) => Some(&x.children),
            Component::InnerTube(x) => Some(&x.children),
            Component::CenteringRing(x) => Some(&x.children),
            Component::PodSet(x) => Some(&x.children),
            _ => None,
        };
        if let Some(kids) = kids {
            for s in kids {
                walk(s, into);
            }
        }
    }
    for st in &rocket.stages {
        into.insert(st.common.id.0.clone());
        for ch in &st.children {
            walk(ch, into);
        }
    }
}

/// Build a sensible default component of the requested kind. Dimensions
/// mirror OpenRocket's "new component" starting point closely enough to be
/// editable immediately; the user then tunes it in the property panel.
fn default_component(kind: &str) -> Result<Component, String> {
    let c = |name: &str| Common::new(String::new(), name.to_string());
    Ok(match kind {
        "NoseCone" => Component::NoseCone(NoseCone {
            common: c("Nose cone"),
            shape: NoseShape::Ogive,
            shape_parameter: 1.0,
            length: 0.10,
            aft_radius: 0.0125,
            thickness: 0.002,
            aft_shoulder_radius: 0.0,
            aft_shoulder_length: 0.0,
            aft_shoulder_thickness: 0.0,
            aft_shoulder_capped: false,
            is_flipped: false,
            filled: false,
            children: vec![],
        }),
        "BodyTube" => Component::BodyTube(BodyTube {
            common: c("Body tube"),
            length: 0.20,
            radius: None,
            thickness: 0.001,
            children: vec![],
            motor_mount: None,
        }),
        "Transition" => Component::Transition(Transition {
            common: c("Transition"),
            shape: NoseShape::Conical,
            shape_parameter: 1.0,
            length: 0.05,
            fore_radius: 0.0125,
            aft_radius: 0.025,
            thickness: 0.002,
            filled: false,
            clipped: false,
            fore_shoulder_radius: 0.0,
            fore_shoulder_length: 0.0,
            fore_shoulder_thickness: 0.0,
            fore_shoulder_capped: false,
            aft_shoulder_radius: 0.0,
            aft_shoulder_length: 0.0,
            aft_shoulder_thickness: 0.0,
            aft_shoulder_capped: false,
            children: vec![],
        }),
        "InnerTube" => Component::InnerTube(InnerTube {
            common: c("Inner tube"),
            length: 0.07,
            outer_radius: 0.009,
            inner_radius: 0.0085,
            motor_mount: None,
            children: vec![],
            cluster_count: 1,
        }),
        "FinSet" => Component::FinSet(FinSet {
            common: c("Fin set"),
            fin_count: 3,
            root_chord: 0.05,
            tip_chord: 0.03,
            sweep_length: 0.025,
            height: 0.03,
            thickness: 0.003,
            cant_angle: 0.0,
            cross_section: FinCrossSection::default(),
            shape: FinShape::default(),
            points: vec![],
            tab_length: 0.0,
            tab_height: 0.0,
            fillet_radius: 0.0,
        }),
        "MassObject" => Component::MassObject(MassObject {
            common: c("Mass component"),
            length: 0.02,
            radius: 0.009,
            mass: 0.010,
        }),
        "Parachute" => Component::Parachute(Parachute {
            common: c("Parachute"),
            diameter: 0.30,
            cd: None,
            deploy_event: DeployEvent::Apogee,
            deploy_altitude: 200.0,
            deploy_delay: 0.0,
            line_count: 6,
            line_length: 0.30,
            line_material: None,
            packed_length: 0.025,
            packed_radius: 0.009,
        }),
        "ShockCord" => Component::ShockCord(ShockCord {
            common: c("Shock cord"),
            cord_length: 1.0,
            packed_length: 0.025,
            packed_radius: 0.009,
        }),
        "LaunchLug" => Component::LaunchLug(LaunchLug {
            common: c("Launch lug"),
            length: 0.035,
            outer_radius: 0.0055,
            inner_radius: 0.0051,
            instance_count: 1,
        }),
        "CenteringRing" => Component::CenteringRing(CenteringRing {
            common: c("Centering ring"),
            length: 0.002,
            outer_radius: 0.0125,
            inner_radius: 0.009,
            thickness: 0.0,
            thickness_set: false,
            instance_count: 1,
            children: vec![],
            solid: false,
        }),
        "PodSet" | "ParallelStage" => Component::PodSet(PodSet {
            common: c(if kind == "ParallelStage" {
                "Parallel stage"
            } else {
                "Pod set"
            }),
            instance_count: 2,
            radius_offset: 0.0,
            radius_method: "relative".to_string(),
            is_parallel_stage: kind == "ParallelStage",
            children: vec![],
        }),
        "TubeFinSet" => Component::TubeFinSet(TubeFinSet {
            common: c("Tube fin set"),
            fin_count: 6,
            length: 0.10,
            outer_radius: None,
            thickness: 0.001,
        }),
        other => return Err(format!("unknown component kind '{other}'")),
    })
}

/// Component kinds that can be added under each parent kind. Mirrors the
/// editor's tree model: only Stage / BodyTube / PodSet hold visible
/// children, so those are the only valid drop targets.
pub fn allowed_children(parent_kind: &str) -> &'static [&'static str] {
    match parent_kind {
        "Stage" => &[
            "NoseCone",
            "BodyTube",
            "Transition",
            "PodSet",
            "ParallelStage",
        ],
        "BodyTube" => &[
            "InnerTube",
            "FinSet",
            "TubeFinSet",
            "LaunchLug",
            "CenteringRing",
            "Parachute",
            "ShockCord",
            "MassObject",
        ],
        "PodSet" | "ParallelStage" => &["NoseCone", "BodyTube", "Transition"],
        _ => &[],
    }
}

/// Append a new default component of `kind` as the last child of
/// `parent_id` (a stage, body tube, or pod set). Returns the new id.
pub fn add_component(
    rocket: &mut Rocket,
    parent_id: &str,
    kind: &str,
) -> Result<String, String> {
    let mut comp = default_component(kind)?;

    let mut ids = std::collections::HashSet::new();
    collect_ids(rocket, &mut ids);
    let mut n = ids.len();
    let new_id = loop {
        let cand = format!("new-{n}");
        if !ids.contains(&cand) {
            break cand;
        }
        n += 1;
    };
    set_id(&mut comp, new_id.clone());

    // Direct child of a stage?
    for st in &mut rocket.stages {
        if st.common.id.0 == parent_id {
            st.children.push(comp);
            return Ok(new_id);
        }
    }

    // Nested under a body tube / pod set.
    fn push_into(children: &mut Vec<Component>, parent_id: &str, comp: &mut Option<Component>) -> bool {
        for c in children.iter_mut() {
            if c.common().id.0 == parent_id {
                return match c {
                    Component::BodyTube(t) => {
                        t.children.push(comp.take().unwrap());
                        true
                    }
                    Component::PodSet(p) => {
                        p.children.push(comp.take().unwrap());
                        true
                    }
                    _ => false,
                };
            }
        }
        for c in children.iter_mut() {
            let kids = match c {
                Component::BodyTube(t) => Some(&mut t.children),
                Component::PodSet(p) => Some(&mut p.children),
                _ => None,
            };
            if let Some(kids) = kids {
                if push_into(kids, parent_id, comp) {
                    return true;
                }
            }
        }
        false
    }
    let mut slot = Some(comp);
    for st in &mut rocket.stages {
        if push_into(&mut st.children, parent_id, &mut slot) {
            return Ok(new_id);
        }
    }
    Err(format!("parent {parent_id} not found or cannot hold children"))
}

/// Apply a preset (from `core::preset`) to an existing component.
///
/// Copies the preset's dimensions and material onto the matching component
/// kind. Returns an error if the preset kind doesn't fit the target.
pub fn apply_preset(
    rocket: &mut Rocket,
    comp_id: &str,
    preset: &opsrocket_core::preset::Preset,
) -> Result<(), String> {
    use opsrocket_core::preset::PresetKind;
    let comp = find_mut(rocket, comp_id)
        .ok_or_else(|| format!("component {comp_id} not found"))?;
    let kind = kind_of(comp);
    let m = |mm: f64| mm / M2MM;
    let mat = || {
        opsrocket_core::material::Material::lookup(preset.material)
            .map(|e| e.into_material())
    };
    match (preset.kind, comp) {
        (PresetKind::BodyTube, Component::BodyTube(b)) => {
            b.length = m(preset.length_mm);
            b.radius = Some(m(preset.od_mm / 2.0));
            b.thickness = m((preset.od_mm - preset.id_mm) / 2.0).max(0.0);
            if let Some(material) = mat() {
                b.common.material = Some(material);
            }
        }
        (PresetKind::NoseCone, Component::NoseCone(n)) => {
            n.length = m(preset.length_mm);
            n.aft_radius = m(preset.od_mm / 2.0);
            n.thickness = m((preset.od_mm - preset.id_mm) / 2.0).max(0.0);
            n.aft_shoulder_radius = if preset.id_mm > 0.0 {
                m(preset.id_mm / 2.0)
            } else {
                0.0
            };
            n.aft_shoulder_length = m(preset.shoulder_length_mm);
            n.aft_shoulder_thickness = m((preset.od_mm - preset.id_mm) / 2.0).max(0.0);
            n.shape = parse_shape(preset.shape);
            if let Some(material) = mat() {
                n.common.material = Some(material);
            }
        }
        (PresetKind::Transition, Component::Transition(t)) => {
            t.length = m(preset.length_mm);
            t.fore_radius = m(preset.od_mm / 2.0);
            t.aft_radius = m(preset.od2_mm.max(preset.od_mm) / 2.0);
            t.thickness = m((preset.od_mm - preset.id_mm) / 2.0).max(0.0);
            if let Some(material) = mat() {
                t.common.material = Some(material);
            }
        }
        (PresetKind::InnerTube, Component::InnerTube(it)) => {
            it.length = m(preset.length_mm);
            it.outer_radius = m(preset.od_mm / 2.0);
            it.inner_radius = m(preset.id_mm / 2.0);
            if let Some(material) = mat() {
                it.common.material = Some(material);
            }
        }
        (PresetKind::CenteringRing, Component::CenteringRing(cr)) => {
            cr.length = m(preset.length_mm);
            cr.outer_radius = m(preset.od_mm / 2.0);
            cr.inner_radius = m(preset.id_mm / 2.0);
            if let Some(material) = mat() {
                cr.common.material = Some(material);
            }
        }
        (preset_kind, _) => {
            return Err(format!(
                "preset {:?} does not fit a {} component",
                preset_kind, kind
            ));
        }
    }
    Ok(())
}
