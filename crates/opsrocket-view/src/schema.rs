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
    }
}
fn f_num(key: &str, label: &str, v: f64) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Number, value: json!(v), options: None, unit: None }
}
fn f_mass(key: &str, label: &str, v: f64) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Mass, value: json!(v * 1000.0), options: None, unit: Some("g".into()) }
}
fn f_ang(key: &str, label: &str, rad: f64) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Angle, value: json!(rad.to_degrees()), options: None, unit: Some("°".into()) }
}
fn f_int(key: &str, label: &str, v: u32) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Int, value: json!(v), options: None, unit: None }
}
fn f_bool(key: &str, label: &str, v: bool) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Bool, value: json!(v), options: None, unit: None }
}
fn f_text(key: &str, label: &str, v: &str) -> Field {
    Field { key: key.into(), label: label.into(), kind: FieldKind::Text, value: json!(v), options: None, unit: None }
}
fn f_enum(key: &str, label: &str, v: &str, opts: &[&str]) -> Field {
    Field {
        key: key.into(),
        label: label.into(),
        kind: FieldKind::Enum,
        value: json!(v),
        options: Some(opts.iter().map(|s| s.to_string()).collect()),
        unit: None,
    }
}
fn f_opt_len(key: &str, label: &str, v: Option<f64>) -> Field {
    // -1 sentinel = "auto / none"
    f_len(key, label, v.unwrap_or(-0.001))
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

fn common_fields(c: &Common) -> Vec<Field> {
    let mut v = vec![
        f_text("name", "Name", &c.name),
        f_enum("axial_method", "Position", axial_str(c.axial_method), AXIAL),
        f_len("axial_offset", "Offset", c.axial_offset),
    ];
    if let Some(m) = &c.material {
        v.push(f_text("material_name", "Material", &m.name));
        v.push(f_num("material_density", "Density (SI)", m.density));
    }
    v.push(f_num("mass_override", "Mass override (g, <0=off)", c.mass_override.map(|x| x * 1000.0).unwrap_or(-1.0)));
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
            f.push(f_enum("shape", "Shape", nose_shape_str(n.shape), SHAPES));
            f.push(f_num("shape_parameter", "Shape param", n.shape_parameter));
            f.push(f_len("length", "Length", n.length));
            f.push(f_len("aft_radius", "Base radius", n.aft_radius));
            f.push(f_len("thickness", "Wall thickness", n.thickness));
            f.push(f_len("aft_shoulder_radius", "Shoulder radius", n.aft_shoulder_radius));
            f.push(f_len("aft_shoulder_length", "Shoulder length", n.aft_shoulder_length));
            f.push(f_bool("aft_shoulder_capped", "Shoulder capped", n.aft_shoulder_capped));
            f.push(f_bool("is_flipped", "Flipped", n.is_flipped));
        }
        Component::BodyTube(b) => {
            f.push(f_len("length", "Length", b.length));
            f.push(f_opt_len("radius", "Outer radius (<0=auto)", b.radius));
            f.push(f_len("thickness", "Wall thickness", b.thickness));
        }
        Component::Transition(t) => {
            f.push(f_enum("shape", "Shape", nose_shape_str(t.shape), SHAPES));
            f.push(f_num("shape_parameter", "Shape param", t.shape_parameter));
            f.push(f_len("length", "Length", t.length));
            f.push(f_len("fore_radius", "Fore radius", t.fore_radius));
            f.push(f_len("aft_radius", "Aft radius", t.aft_radius));
            f.push(f_len("thickness", "Wall thickness", t.thickness));
        }
        Component::InnerTube(it) => {
            f.push(f_len("length", "Length", it.length));
            f.push(f_len("outer_radius", "Outer radius", it.outer_radius));
            f.push(f_len("inner_radius", "Inner radius", it.inner_radius));
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
            f.push(f_int("fin_count", "Fin count", fs.fin_count));
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
        let kids = match c {
            Component::BodyTube(t) => Some(&mut t.children),
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
        let kids = match c {
            Component::BodyTube(t) => Some(&t.children),
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
        out.push(EditNode {
            id: st.common.id.0.clone(),
            kind: "Stage".into(),
            name: if st.common.name.is_empty() {
                format!("Stage {}", si + 1)
            } else {
                st.common.name.clone()
            },
            depth: 0,
            fields: vec![f_text("name", "Name", &st.common.name)],
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
        let kids = match c {
            Component::BodyTube(t) => Some(&mut t.children),
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
        "material_name" => {
            if let Some(m) = &mut common.material {
                m.name = as_str(v)?;
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
        "mass_override" => {
            let g = as_f64(v)?;
            common.mass_override = if g < 0.0 { None } else { Some(g / 1000.0) };
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
            if key == "name" {
                st.common.name = as_str(v)?;
                return Ok(());
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
            "aft_shoulder_radius" => n.aft_shoulder_radius = mm(v)?,
            "aft_shoulder_length" => n.aft_shoulder_length = mm(v)?,
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
            _ => return Err(format!("BodyTube has no field {key}")),
        },
        Component::Transition(t) => match key {
            "shape" => t.shape = parse_shape(&as_str(v)?),
            "shape_parameter" => t.shape_parameter = as_f64(v)?,
            "length" => t.length = mm(v)?,
            "fore_radius" => t.fore_radius = mm(v)?,
            "aft_radius" => t.aft_radius = mm(v)?,
            "thickness" => t.thickness = mm(v)?,
            _ => return Err(format!("Transition has no field {key}")),
        },
        Component::InnerTube(it) => match key {
            "length" => it.length = mm(v)?,
            "outer_radius" => it.outer_radius = mm(v)?,
            "inner_radius" => it.inner_radius = mm(v)?,
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
            let kids = match c {
                Component::BodyTube(t) => Some(&mut t.children),
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
