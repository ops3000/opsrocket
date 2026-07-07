//! `.ork` writer.
//!
//! Produces an OpenRocket-compatible ZIP-wrapped XML file from a
//! [`Rocket`] plus the simulations stored in an [`OrkDocument`].
//!
//! The output is a subset of what the upstream Java writer emits — we only
//! serialize fields we model. Round-tripping a fully-featured `.ork` through
//! this writer will lose appearance data (paint colours, decals, comments,
//! per-component instance counts beyond 1, etc.). The component tree itself
//! and the simulation conditions round-trip losslessly.

use std::io::Write;
use std::path::Path;

use opsrocket_core::component::{
    AxialMethod, Component, NoseShape, Rocket, Stage,
};
use opsrocket_core::material::{Material, MaterialType};

use crate::ork::{CachedSimulation, OrkDocument};

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
    #[error("ZIP error: {0}")]
    Zip(#[from] zip::result::ZipError),
}

pub type Result<T> = std::result::Result<T, Error>;

const ORK_VERSION: &str = "1.10";
const WRITER_CREATOR: &str = "OpsRocket 0.1.0";

/// Write a `.ork` file (ZIP container with a `rocket.ork` XML entry).
pub fn write_ork(path: impl AsRef<Path>, doc: &OrkDocument) -> Result<()> {
    let file = std::fs::File::create(path.as_ref())?;
    let mut zip = zip::ZipWriter::new(file);
    let options: zip::write::FileOptions<()> = zip::write::FileOptions::default()
        .compression_method(zip::CompressionMethod::Deflated);
    zip.start_file("rocket.ork", options)?;
    let xml = render_xml(doc);
    zip.write_all(xml.as_bytes())?;
    zip.finish()?;
    Ok(())
}

/// Serialize a `.ork` (ZIP container) to an in-memory byte buffer — the
/// filesystem-free counterpart of [`write_ork`] (browser/WASM save).
pub fn write_ork_bytes(doc: &OrkDocument) -> Result<Vec<u8>> {
    let mut buf = std::io::Cursor::new(Vec::new());
    {
        let mut zip = zip::ZipWriter::new(&mut buf);
        let options: zip::write::FileOptions<()> = zip::write::FileOptions::default()
            .compression_method(zip::CompressionMethod::Deflated);
        zip.start_file("rocket.ork", options)?;
        zip.write_all(render_xml(doc).as_bytes())?;
        zip.finish()?;
    }
    Ok(buf.into_inner())
}

/// Render the XML body that goes into the ZIP entry. Exposed so callers
/// can inspect / diff the textual output without writing to disk.
pub fn render_xml(doc: &OrkDocument) -> String {
    let mut out = String::with_capacity(4096);
    out.push_str("<?xml version='1.0' encoding='utf-8'?>\n");
    out.push_str(&format!(
        "<openrocket version=\"{}\" creator=\"{}\">\n",
        ORK_VERSION, WRITER_CREATOR
    ));
    render_rocket(&mut out, &doc.rocket);
    render_simulations(&mut out, &doc.simulations);
    out.push_str("</openrocket>\n");
    out
}

fn render_rocket(out: &mut String, rocket: &Rocket) {
    indent(out, 1);
    out.push_str("<rocket>\n");
    push_text(out, 2, "name", &rocket.name);
    if let Some(d) = &rocket.designer {
        push_text(out, 2, "designer", d);
    }
    let ref_type_str = match rocket.reference_type {
        opsrocket_core::component::ReferenceType::Maximum => "maximum",
        opsrocket_core::component::ReferenceType::Nose => "nose",
        opsrocket_core::component::ReferenceType::Custom => "custom",
    };
    push_text(out, 2, "referencetype", ref_type_str);
    for cfg in &rocket.configurations {
        indent(out, 2);
        out.push_str(&format!(
            "<motorconfiguration configid=\"{}\"{}>\n",
            xml_escape(&cfg.config_id),
            if rocket.default_config.as_deref() == Some(cfg.config_id.as_str()) {
                " default=\"true\""
            } else {
                ""
            }
        ));
        if let Some(name) = &cfg.name {
            push_text(out, 3, "name", name);
        }
        for stage in &cfg.active_stages {
            indent(out, 3);
            out.push_str(&format!("<stage number=\"{}\" active=\"true\"></stage>\n", stage));
        }
        indent(out, 2);
        out.push_str("</motorconfiguration>\n");
    }

    if !rocket.stages.is_empty() {
        indent(out, 2);
        out.push_str("<subcomponents>\n");
        for stage in &rocket.stages {
            render_stage(out, 3, stage);
        }
        indent(out, 2);
        out.push_str("</subcomponents>\n");
    }
    indent(out, 1);
    out.push_str("</rocket>\n");
}

fn render_stage(out: &mut String, depth: usize, stage: &Stage) {
    indent(out, depth);
    out.push_str("<stage>\n");
    push_text(out, depth + 1, "name", &stage.common.name);
    push_text(out, depth + 1, "id", &stage.common.id.0);
    if !stage.children.is_empty() {
        indent(out, depth + 1);
        out.push_str("<subcomponents>\n");
        for child in &stage.children {
            render_component(out, depth + 2, child);
        }
        indent(out, depth + 1);
        out.push_str("</subcomponents>\n");
    }
    indent(out, depth);
    out.push_str("</stage>\n");
}

fn render_component(out: &mut String, depth: usize, c: &Component) {
    let (tag, body): (&str, Box<dyn Fn(&mut String, usize) + '_>) = match c {
        Component::NoseCone(n) => ("nosecone", Box::new(move |o, d| render_nosecone(o, d, n))),
        Component::BodyTube(b) => ("bodytube", Box::new(move |o, d| render_bodytube(o, d, b))),
        Component::Transition(t) => ("transition", Box::new(move |o, d| render_transition(o, d, t))),
        Component::InnerTube(i) => ("innertube", Box::new(move |o, d| render_innertube(o, d, i))),
        Component::FinSet(f) => (
            match f.shape {
                opsrocket_core::component::FinShape::Freeform => "freeformfinset",
                opsrocket_core::component::FinShape::Elliptical => "ellipticalfinset",
                opsrocket_core::component::FinShape::Trapezoidal => "trapezoidfinset",
            },
            Box::new(move |o, d| render_finset(o, d, f)),
        ),
        Component::MassObject(m) => ("masscomponent", Box::new(move |o, d| render_mass(o, d, m))),
        Component::Parachute(p) => ("parachute", Box::new(move |o, d| render_parachute(o, d, p))),
        Component::ShockCord(s) => ("shockcord", Box::new(move |o, d| render_shockcord(o, d, s))),
        Component::LaunchLug(l) => ("launchlug", Box::new(move |o, d| render_launchlug(o, d, l))),
        Component::CenteringRing(r) => (
            if r.solid { "bulkhead" } else { "centeringring" },
            Box::new(move |o, d| render_centeringring(o, d, r)),
        ),
        Component::PodSet(p) => ("podset", Box::new(move |o, d| render_podset(o, d, p))),
        Component::TubeFinSet(t) => {
            ("tubefinset", Box::new(move |o, d| render_tubefinset(o, d, t)))
        }
    };
    indent(out, depth);
    out.push_str(&format!("<{}>\n", tag));
    body(out, depth + 1);
    indent(out, depth);
    out.push_str(&format!("</{}>\n", tag));
}

fn render_podset(out: &mut String, d: usize, p: &opsrocket_core::component::PodSet) {
    render_common(out, d, &p.common);
    push_text(out, d, "instancecount", &p.instance_count.to_string());
    push_text(out, d, "radiusoffset", &p.radius_offset.to_string());
    push_text(
        out,
        d,
        "angleoffset",
        &p.common.angle_offset.to_degrees().to_string(),
    );
    if !p.children.is_empty() {
        indent(out, d);
        out.push_str("<subcomponents>\n");
        for child in &p.children {
            render_component(out, d + 1, child);
        }
        indent(out, d);
        out.push_str("</subcomponents>\n");
    }
}

fn render_common(
    out: &mut String,
    depth: usize,
    common: &opsrocket_core::component::Common,
) {
    if !common.name.is_empty() {
        push_text(out, depth, "name", &common.name);
    }
    if !common.id.0.is_empty() {
        push_text(out, depth, "id", &common.id.0);
    }
    let method_str = match common.axial_method {
        AxialMethod::Absolute => "absolute",
        AxialMethod::Top => "top",
        AxialMethod::Bottom => "bottom",
        AxialMethod::Middle => "middle",
        AxialMethod::After => "after",
    };
    indent(out, depth);
    out.push_str(&format!(
        "<axialoffset method=\"{}\">{}</axialoffset>\n",
        method_str, common.axial_offset
    ));
    if !matches!(common.angle_offset, x if x == 0.0) {
        push_text(out, depth, "angleoffset", &common.angle_offset.to_degrees().to_string());
    }
    if let Some(m) = &common.material {
        render_material(out, depth, "material", m);
    }
    push_text(out, depth, "finish", finish_str(common.finish));
    if let Some(v) = common.mass_override {
        push_text(out, depth, "overridemass", &v.to_string());
    }
    if common.override_subcomponents_mass {
        push_text(out, depth, "overridesubcomponentsmass", "true");
    }
    if let Some(v) = common.cg_override {
        push_text(out, depth, "overridecg", &v.to_string());
    }
    if let Some(v) = common.cd_override {
        push_text(out, depth, "overridecd", &v.to_string());
    }
    if common.override_subcomponents_cd {
        push_text(out, depth, "overridesubcomponentscd", "true");
    }
    if !common.comment.is_empty() {
        push_text(out, depth, "comment", &common.comment);
    }
}

fn finish_str(f: opsrocket_core::component::Finish) -> &'static str {
    use opsrocket_core::component::Finish;
    match f {
        Finish::Rough => "rough",
        Finish::RoughUnfinished => "roughunfinished",
        Finish::Unfinished => "unfinished",
        Finish::Normal => "normal",
        Finish::Smooth => "smooth",
        Finish::Optimum => "optimum",
        Finish::Polished => "polished",
        Finish::FinishPolished => "finishpolished",
        Finish::Mirror => "mirror",
    }
}

fn render_material(out: &mut String, depth: usize, tag: &str, m: &Material) {
    let type_str = match m.kind {
        MaterialType::Bulk => "bulk",
        MaterialType::Surface => "surface",
        MaterialType::Line => "line",
    };
    indent(out, depth);
    out.push_str(&format!(
        "<{} type=\"{}\" density=\"{}\"{}>{}</{}>\n",
        tag,
        type_str,
        m.density,
        m.group
            .as_ref()
            .map(|g| format!(" group=\"{}\"", xml_escape(g)))
            .unwrap_or_default(),
        xml_escape(&m.name),
        tag,
    ));
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

fn render_nosecone(out: &mut String, d: usize, n: &opsrocket_core::component::NoseCone) {
    render_common(out, d, &n.common);
    push_text(out, d, "shape", nose_shape_str(n.shape));
    push_text(out, d, "shapeparameter", &n.shape_parameter.to_string());
    push_text(out, d, "length", &n.length.to_string());
    if n.filled {
        // Parser convention: `<thickness>filled</thickness>` ⇒ solid nose.
        push_text(out, d, "thickness", "filled");
    } else {
        push_text(out, d, "thickness", &n.thickness.to_string());
    }
    push_text(out, d, "aftradius", &n.aft_radius.to_string());
    if n.aft_shoulder_length > 0.0 {
        push_text(out, d, "aftshoulderradius", &n.aft_shoulder_radius.to_string());
        push_text(out, d, "aftshoulderlength", &n.aft_shoulder_length.to_string());
        push_text(out, d, "aftshoulderthickness", &n.aft_shoulder_thickness.to_string());
        push_text(out, d, "aftshouldercapped", if n.aft_shoulder_capped { "true" } else { "false" });
    }
    push_text(out, d, "isflipped", if n.is_flipped { "true" } else { "false" });
    render_subcomponents(out, d, &n.children);
}

/// Emit a `<subcomponents>` block if there are nested children.
fn render_subcomponents(out: &mut String, d: usize, children: &[Component]) {
    if children.is_empty() {
        return;
    }
    indent(out, d);
    out.push_str("<subcomponents>\n");
    for child in children {
        render_component(out, d + 1, child);
    }
    indent(out, d);
    out.push_str("</subcomponents>\n");
}

fn render_bodytube(out: &mut String, d: usize, b: &opsrocket_core::component::BodyTube) {
    render_common(out, d, &b.common);
    push_text(out, d, "length", &b.length.to_string());
    match b.radius {
        Some(r) => push_text(out, d, "radius", &r.to_string()),
        None => push_text(out, d, "radius", "auto"),
    }
    push_text(out, d, "thickness", &b.thickness.to_string());
    if !b.children.is_empty() {
        indent(out, d);
        out.push_str("<subcomponents>\n");
        for child in &b.children {
            render_component(out, d + 1, child);
        }
        indent(out, d);
        out.push_str("</subcomponents>\n");
    }
}

fn render_transition(out: &mut String, d: usize, t: &opsrocket_core::component::Transition) {
    render_common(out, d, &t.common);
    push_text(out, d, "shape", nose_shape_str(t.shape));
    push_text(out, d, "shapeparameter", &t.shape_parameter.to_string());
    push_text(out, d, "length", &t.length.to_string());
    push_text(out, d, "foreradius", &t.fore_radius.to_string());
    push_text(out, d, "aftradius", &t.aft_radius.to_string());
    if t.filled {
        push_text(out, d, "thickness", "filled");
    } else {
        push_text(out, d, "thickness", &t.thickness.to_string());
    }
    if t.clipped {
        push_text(out, d, "clipped", "true");
    }
    if t.fore_shoulder_length > 0.0 {
        push_text(out, d, "foreshoulderradius", &t.fore_shoulder_radius.to_string());
        push_text(out, d, "foreshoulderlength", &t.fore_shoulder_length.to_string());
        push_text(out, d, "foreshoulderthickness", &t.fore_shoulder_thickness.to_string());
        push_text(out, d, "foreshouldercapped", if t.fore_shoulder_capped { "true" } else { "false" });
    }
    if t.aft_shoulder_length > 0.0 {
        push_text(out, d, "aftshoulderradius", &t.aft_shoulder_radius.to_string());
        push_text(out, d, "aftshoulderlength", &t.aft_shoulder_length.to_string());
        push_text(out, d, "aftshoulderthickness", &t.aft_shoulder_thickness.to_string());
        push_text(out, d, "aftshouldercapped", if t.aft_shoulder_capped { "true" } else { "false" });
    }
    render_subcomponents(out, d, &t.children);
}

fn render_innertube(out: &mut String, d: usize, i: &opsrocket_core::component::InnerTube) {
    render_common(out, d, &i.common);
    push_text(out, d, "length", &i.length.to_string());
    push_text(out, d, "outerradius", &i.outer_radius.to_string());
    push_text(out, d, "innerradius", &i.inner_radius.to_string());
    if i.cluster_count > 1 {
        // Emit the canonical cluster name that `cluster_count()` re-parses
        // back to the same count.
        let name = match i.cluster_count {
            2 => "double",
            3 => "3-ring",
            4 => "4-ring",
            5 => "5-ring",
            6 => "6-ring",
            7 => "6-star",
            9 => "9-grid",
            10 => "9-star",
            _ => "single",
        };
        push_text(out, d, "clusterconfiguration", name);
    }
    if let Some(mm) = &i.motor_mount {
        render_motor_mount(out, d, mm);
    }
    render_subcomponents(out, d, &i.children);
}

fn render_motor_mount(
    out: &mut String,
    d: usize,
    mm: &opsrocket_core::component::MotorMount,
) {
    indent(out, d);
    out.push_str("<motormount>\n");
    let ie = match mm.ignition_event {
        opsrocket_core::component::IgnitionEvent::Automatic => "automatic",
        opsrocket_core::component::IgnitionEvent::Launch => "launch",
        opsrocket_core::component::IgnitionEvent::Burnout => "burnout",
        opsrocket_core::component::IgnitionEvent::Ejection => "ejection",
        opsrocket_core::component::IgnitionEvent::LowerStageSeparation => {
            "lower_stage_separation"
        }
    };
    push_text(out, d + 1, "ignitionevent", ie);
    push_text(out, d + 1, "ignitiondelay", &mm.ignition_delay.to_string());
    push_text(out, d + 1, "overhang", &mm.overhang.to_string());
    for a in &mm.motors {
        indent(out, d + 1);
        out.push_str(&format!(
            "<motor configid=\"{}\">\n",
            xml_escape(&a.config_id)
        ));
        if let Some(des) = &a.designation {
            push_text(out, d + 2, "designation", des);
        }
        if let Some(dig) = &a.digest {
            push_text(out, d + 2, "digest", dig);
        }
        indent(out, d + 1);
        out.push_str("</motor>\n");
    }
    indent(out, d);
    out.push_str("</motormount>\n");
}

fn render_finset(out: &mut String, d: usize, f: &opsrocket_core::component::FinSet) {
    render_common(out, d, &f.common);
    push_text(out, d, "fincount", &f.fin_count.to_string());
    if matches!(f.shape, opsrocket_core::component::FinShape::Freeform)
        && f.points.len() >= 2
    {
        indent(out, d);
        out.push_str("<finpoints>\n");
        for p in &f.points {
            indent(out, d + 1);
            out.push_str(&format!("<point x=\"{}\" y=\"{}\"/>\n", p[0], p[1]));
        }
        indent(out, d);
        out.push_str("</finpoints>\n");
    } else {
        push_text(out, d, "rootchord", &f.root_chord.to_string());
        push_text(out, d, "tipchord", &f.tip_chord.to_string());
        push_text(out, d, "sweeplength", &f.sweep_length.to_string());
        push_text(out, d, "height", &f.height.to_string());
    }
    push_text(out, d, "thickness", &f.thickness.to_string());
    // OpenRocket stores <cant> in degrees; loader multiplies by π/180.
    push_text(out, d, "cant", &f.cant_angle.to_degrees().to_string());
    if f.tab_length > 0.0 {
        push_text(out, d, "tablength", &f.tab_length.to_string());
    }
    if f.tab_height > 0.0 {
        push_text(out, d, "tabheight", &f.tab_height.to_string());
    }
    if f.fillet_radius > 0.0 {
        push_text(out, d, "filletradius", &f.fillet_radius.to_string());
    }
    let cs = match f.cross_section {
        opsrocket_core::component::FinCrossSection::Square => "square",
        opsrocket_core::component::FinCrossSection::Rounded => "rounded",
        opsrocket_core::component::FinCrossSection::Airfoil => "airfoil",
    };
    push_text(out, d, "crosssection", cs);
}

fn render_mass(out: &mut String, d: usize, m: &opsrocket_core::component::MassObject) {
    render_common(out, d, &m.common);
    push_text(out, d, "mass", &m.mass.to_string());
    push_text(out, d, "packedlength", &m.length.to_string());
    push_text(out, d, "packedradius", &m.radius.to_string());
}

fn render_parachute(out: &mut String, d: usize, p: &opsrocket_core::component::Parachute) {
    render_common(out, d, &p.common);
    push_text(out, d, "diameter", &p.diameter.to_string());
    match p.cd {
        Some(v) => push_text(out, d, "cd", &v.to_string()),
        None => push_text(out, d, "cd", "auto"),
    }
    let de = match p.deploy_event {
        opsrocket_core::component::DeployEvent::Launch => "launch",
        opsrocket_core::component::DeployEvent::Ejection => "ejection",
        opsrocket_core::component::DeployEvent::Apogee => "apogee",
        opsrocket_core::component::DeployEvent::Altitude => "altitude",
        opsrocket_core::component::DeployEvent::LowerStageSeparation => "lower_stage_separation",
        opsrocket_core::component::DeployEvent::Never => "never",
    };
    push_text(out, d, "deployevent", de);
    push_text(out, d, "deployaltitude", &p.deploy_altitude.to_string());
    push_text(out, d, "deploydelay", &p.deploy_delay.to_string());
    push_text(out, d, "linecount", &p.line_count.to_string());
    push_text(out, d, "linelength", &p.line_length.to_string());
    if let Some(m) = &p.line_material {
        render_material(out, d, "linematerial", m);
    }
    push_text(out, d, "packedlength", &p.packed_length.to_string());
    push_text(out, d, "packedradius", &p.packed_radius.to_string());
}

fn render_shockcord(out: &mut String, d: usize, s: &opsrocket_core::component::ShockCord) {
    render_common(out, d, &s.common);
    push_text(out, d, "cordlength", &s.cord_length.to_string());
    push_text(out, d, "packedlength", &s.packed_length.to_string());
    push_text(out, d, "packedradius", &s.packed_radius.to_string());
}

fn render_launchlug(out: &mut String, d: usize, l: &opsrocket_core::component::LaunchLug) {
    render_common(out, d, &l.common);
    push_text(out, d, "length", &l.length.to_string());
    push_text(out, d, "outerradius", &l.outer_radius.to_string());
    push_text(out, d, "innerradius", &l.inner_radius.to_string());
    push_text(out, d, "instancecount", &l.instance_count.to_string());
}

fn render_tubefinset(out: &mut String, d: usize, t: &opsrocket_core::component::TubeFinSet) {
    render_common(out, d, &t.common);
    push_text(out, d, "fincount", &t.fin_count.to_string());
    push_text(out, d, "length", &t.length.to_string());
    match t.outer_radius {
        Some(r) => push_text(out, d, "radius", &r.to_string()),
        None => push_text(out, d, "radius", "auto"),
    }
    push_text(out, d, "thickness", &t.thickness.to_string());
}

fn render_centeringring(out: &mut String, d: usize, r: &opsrocket_core::component::CenteringRing) {
    render_common(out, d, &r.common);
    push_text(out, d, "length", &r.length.to_string());
    // outer_radius == 0.0 is the parser's "auto" sentinel.
    if r.outer_radius == 0.0 {
        push_text(out, d, "outerradius", "auto");
    } else {
        push_text(out, d, "outerradius", &r.outer_radius.to_string());
    }
    if r.thickness_set {
        // The bore is derived from `<thickness>` (engine block / coupler);
        // emitting innerradius here would defeat that derivation.
        push_text(out, d, "thickness", &r.thickness.to_string());
    } else if r.inner_radius == 0.0 {
        push_text(out, d, "innerradius", "auto");
    } else {
        push_text(out, d, "innerradius", &r.inner_radius.to_string());
    }
    push_text(out, d, "instancecount", &r.instance_count.to_string());
    render_subcomponents(out, d, &r.children);
}

fn render_simulations(out: &mut String, sims: &[CachedSimulation]) {
    if sims.is_empty() {
        return;
    }
    indent(out, 1);
    out.push_str("<simulations>\n");
    for s in sims {
        indent(out, 2);
        out.push_str("<simulation>\n");
        push_text(out, 3, "name", &s.name);
        indent(out, 3);
        out.push_str("<conditions>\n");
        if let Some(id) = &s.config_id {
            push_text(out, 4, "configid", id);
        }
        push_text(out, 4, "launchrodlength", &s.launch_rod_length.to_string());
        push_text(out, 4, "launchrodangle", &s.launch_rod_angle.to_string());
        push_text(
            out,
            4,
            "launchroddirection",
            &s.launch_rod_direction.to_degrees().to_string(),
        );
        push_text(out, 4, "launchaltitude", &s.launch_altitude.to_string());
        push_text(out, 4, "launchtemperature", &s.launch_temperature.to_string());
        push_text(out, 4, "launchpressure", &s.launch_pressure.to_string());
        push_text(out, 4, "launchlatitude", &s.launch_latitude.to_string());
        push_text(out, 4, "launchlongitude", &s.launch_longitude.to_string());
        push_text(out, 4, "geodeticmethod", &s.geodetic_method);
        push_text(out, 4, "windaverage", &s.wind_average.to_string());
        push_text(
            out,
            4,
            "windaveragedeviation",
            &s.wind_standard_deviation.to_string(),
        );
        push_text(out, 4, "windturbulence", &s.wind_turbulence.to_string());
        push_text(out, 4, "winddirection", &s.wind_direction.to_string());
        push_text(out, 4, "useisamodel", if s.use_isa { "true" } else { "false" });
        push_text(
            out,
            4,
            "launchintowind",
            if s.launch_into_wind { "true" } else { "false" },
        );
        if !s.wind_layers.is_empty() {
            push_text(
                out,
                4,
                "usemultilevelwind",
                if s.use_multi_level_wind { "true" } else { "false" },
            );
            for layer in &s.wind_layers {
                indent(out, 4);
                out.push_str("<windlevel>\n");
                push_text(out, 5, "altitude", &layer.altitude_m.to_string());
                push_text(out, 5, "speed", &layer.speed_ms.to_string());
                push_text(out, 5, "direction", &layer.direction_rad.to_string());
                indent(out, 4);
                out.push_str("</windlevel>\n");
            }
        }
        push_text(out, 4, "timestep", &s.time_step.to_string());
        push_text(out, 4, "maxtime", &s.max_time.to_string());
        indent(out, 3);
        out.push_str("</conditions>\n");
        indent(out, 2);
        out.push_str("</simulation>\n");
    }
    indent(out, 1);
    out.push_str("</simulations>\n");
}

// ---- small helpers ----

fn indent(out: &mut String, depth: usize) {
    for _ in 0..depth {
        out.push_str("  ");
    }
}

fn push_text(out: &mut String, depth: usize, tag: &str, value: &str) {
    indent(out, depth);
    out.push_str(&format!("<{}>{}</{}>\n", tag, xml_escape(value), tag));
}

fn xml_escape(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
}
