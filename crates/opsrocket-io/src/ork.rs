//! `.ork` file reader.
//!
//! A `.ork` is a ZIP archive containing a single entry `rocket.ork` (XML) plus
//! optional decal images. The XML schema is documented at
//! <https://github.com/openrocket/openrocket/blob/unstable/core/resources-src/fileformat.txt>.
//!
//! This reader is intentionally minimal: it parses only the fields needed for
//! mass + Barrowman aerodynamics + simulation. Unknown elements are skipped.
//! The cached `<flightdata>` block is preserved verbatim because the
//! regression test harness uses it as the ground-truth reference.

use std::fs::File;
use std::io::{Cursor, Read, Seek};
use std::path::Path;

use opsrocket_core::component::{
    Appearance, BodyTube, CenteringRing, Common, Component, ComponentId, DeployEvent,
    FinCrossSection, FinSet,
    FlightConfiguration, IgnitionEvent, InnerTube, LaunchLug, MassObject, MotorAssignment,
    MotorMount, NoseCone, NoseShape, Parachute, ReferenceType, Rocket, SeparationEvent, ShockCord,
    Stage, Transition,
};
use opsrocket_core::material::{Material, MaterialType};

use quick_xml::events::Event;
use quick_xml::Reader;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum Error {
    #[error("I/O error: {0}")]
    Io(#[from] std::io::Error),
    #[error("ZIP error: {0}")]
    Zip(#[from] zip::result::ZipError),
    #[error("XML error: {0}")]
    Xml(#[from] quick_xml::Error),
    #[error("UTF-8 decode error: {0}")]
    Utf8(#[from] std::str::Utf8Error),
    #[error("malformed .ork: {0}")]
    Malformed(String),
    #[error("rocket.ork entry not found in archive")]
    NoRocketEntry,
}

pub type Result<T> = std::result::Result<T, Error>;

/// Top-level parsed document.
#[derive(Debug, Clone)]
pub struct OrkDocument {
    pub version: String,
    pub creator: String,
    pub rocket: Rocket,
    pub simulations: Vec<CachedSimulation>,
    /// Decal images packed in the `.ork` zip: (archive path, PNG bytes).
    pub decals: Vec<(String, Vec<u8>)>,
}

/// One `<simulation>` block. `cached` is `Some` if the file carries the
/// previous run's `<flightdata>`.
#[derive(Debug, Clone)]
pub struct CachedSimulation {
    pub name: String,
    pub config_id: Option<String>,
    pub launch_rod_length: f64,
    pub launch_rod_angle: f64,
    /// Launch rod azimuth (radians). OpenRocket default 0.
    pub launch_rod_direction: f64,
    pub launch_altitude: f64,
    pub launch_temperature: f64,
    pub launch_pressure: f64,
    /// Launch-site latitude (degrees). OpenRocket preference default 28.61.
    pub launch_latitude: f64,
    /// Launch-site longitude (degrees). OpenRocket default 0.
    pub launch_longitude: f64,
    /// Geodetic computation: "flat" | "spherical" | "wgs84"
    /// (OpenRocket default "spherical").
    pub geodetic_method: String,
    pub wind_average: f64,
    /// Wind turbulence intensity (fraction). OpenRocket default 0.1.
    pub wind_turbulence: f64,
    /// Wind direction (radians). OpenRocket default π/2 (from east).
    pub wind_direction: f64,
    pub time_step: f64,
    pub max_time: f64,
    pub cached: Option<CachedFlightData>,
}

#[derive(Debug, Clone)]
pub struct CachedFlightData {
    pub max_altitude: f64,
    pub max_velocity: f64,
    pub max_acceleration: f64,
    pub max_mach: f64,
    pub time_to_apogee: f64,
    pub flight_time: f64,
    pub ground_hit_velocity: f64,
    pub launch_rod_velocity: f64,
    pub deployment_velocity: Option<f64>,
    pub column_types: Vec<String>,
    pub points: Vec<FlightDataPoint>,
    pub events: Vec<FlightEvent>,
}

#[derive(Debug, Clone)]
pub struct FlightDataPoint {
    /// All 56 columns as declared in the `<databranch types="…">` header.
    /// NaN values are preserved exactly.
    pub values: Vec<f64>,
}

#[derive(Debug, Clone)]
pub struct FlightEvent {
    pub time: f64,
    pub kind: String,
}

/// Read a `.ork` file and return the parsed document.
/// Load a `.ork` from a filesystem path.
pub fn read_ork(path: impl AsRef<Path>) -> Result<OrkDocument> {
    read_ork_zip(zip::ZipArchive::new(File::open(path.as_ref())?)?)
}

/// Load a `.ork` from an in-memory byte buffer (no filesystem — the WASM /
/// browser entry point; native callers can use [`read_ork`]).
pub fn read_ork_bytes(bytes: &[u8]) -> Result<OrkDocument> {
    read_ork_zip(zip::ZipArchive::new(Cursor::new(bytes))?)
}

fn read_ork_zip<R: Read + Seek>(mut zip: zip::ZipArchive<R>) -> Result<OrkDocument> {
    let xml = {
        let mut entry = zip.by_name("rocket.ork").map_err(|_| Error::NoRocketEntry)?;
        let mut buf = String::new();
        entry.read_to_string(&mut buf)?;
        buf
    };
    let mut doc = parse_xml(&xml)?;
    for i in 0..zip.len() {
        let mut e = zip.by_index(i)?;
        if !e.is_file() || e.name() == "rocket.ork" {
            continue;
        }
        let name = e.name().to_string();
        let mut bytes = Vec::new();
        if e.read_to_end(&mut bytes).is_ok() && !bytes.is_empty() {
            doc.decals.push((name, bytes));
        }
    }
    Ok(doc)
}

/// Parse a `rocket.ork` XML string directly (no zip wrapper).
pub fn parse_xml(xml: &str) -> Result<OrkDocument> {
    let mut reader = Reader::from_str(xml);
    reader.config_mut().trim_text(true);

    let mut version = String::from("?");
    let mut creator = String::new();
    let mut rocket: Option<Rocket> = None;
    let mut simulations: Vec<CachedSimulation> = Vec::new();

    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) if e.name().as_ref() == b"openrocket" => {
                for attr in e.attributes().with_checks(false).flatten() {
                    match attr.key.as_ref() {
                        b"version" => version = attr.unescape_value()?.to_string(),
                        b"creator" => creator = attr.unescape_value()?.to_string(),
                        _ => {}
                    }
                }
            }
            Event::Start(e) if e.name().as_ref() == b"rocket" => {
                rocket = Some(parse_rocket(&mut reader)?);
            }
            Event::Start(e) if e.name().as_ref() == b"simulations" => {
                simulations = parse_simulations(&mut reader)?;
            }
            Event::Eof => break,
            _ => {}
        }
        buf.clear();
    }

    let rocket = rocket.ok_or_else(|| Error::Malformed("no <rocket>".into()))?;
    Ok(OrkDocument { version, creator, rocket, simulations, decals: Vec::new() })
}

// ============================================================================
//                              <rocket> parser
// ============================================================================

fn parse_rocket(reader: &mut Reader<&[u8]>) -> Result<Rocket> {
    let mut rocket = Rocket::default();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let name = e.name();
                match name.as_ref() {
                    b"name" => rocket.name = read_text(reader, b"name")?,
                    b"designer" => rocket.designer = Some(read_text(reader, b"designer")?),
                    b"referencetype" => {
                        let v = read_text(reader, b"referencetype")?;
                        rocket.reference_type = match v.as_str() {
                            "nose" => ReferenceType::Nose,
                            "custom" => ReferenceType::Custom,
                            _ => ReferenceType::Maximum,
                        };
                    }
                    b"customreference" | b"referencelength" => {
                        let v = read_text(reader, name.as_ref())?;
                        rocket.reference_length = v.parse::<f64>().ok();
                    }
                    b"isperfectfinish" => {
                        rocket.is_perfect_finish =
                            read_text(reader, b"isperfectfinish")?.trim() == "true";
                    }
                    b"motorconfiguration" => {
                        let mut config_id = String::new();
                        let mut default = false;
                        for attr in e.attributes().with_checks(false).flatten() {
                            match attr.key.as_ref() {
                                b"configid" => config_id = attr.unescape_value()?.to_string(),
                                b"default" => default = matches!(attr.unescape_value()?.as_ref(), "true"),
                                _ => {}
                            }
                        }
                        // skip until matching end - we don't model active stages yet
                        skip_to_end(reader, b"motorconfiguration")?;
                        if default {
                            rocket.default_config = Some(config_id.clone());
                        }
                        rocket.configurations.push(FlightConfiguration {
                            config_id,
                            name: None,
                            active_stages: Vec::new(),
                        });
                    }
                    b"subcomponents" => {
                        rocket.stages = parse_stages(reader)?;
                    }
                    _ => {
                        // skip unknown
                        skip_to_end(reader, name.as_ref())?;
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"rocket" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <rocket>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(rocket)
}

fn parse_stages(reader: &mut Reader<&[u8]>) -> Result<Vec<Stage>> {
    let mut stages = Vec::new();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) if e.name().as_ref() == b"stage" => {
                stages.push(parse_stage(reader)?);
            }
            Event::End(e) if e.name().as_ref() == b"subcomponents" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <subcomponents>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(stages)
}

fn parse_stage(reader: &mut Reader<&[u8]>) -> Result<Stage> {
    let mut stage = Stage::default();
    stage.common = Common::new("", "Stage");
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                match n.as_ref() {
                    b"name" => stage.common.name = read_text(reader, b"name")?,
                    b"id" => stage.common.id = ComponentId::new(read_text(reader, b"id")?),
                    b"separationevent" => {
                        let v = read_text(reader, b"separationevent")?;
                        stage.separation_event = match v.as_str() {
                            "burnout" => SeparationEvent::Burnout,
                            "ejection" => SeparationEvent::Ejection,
                            "upperignition" => SeparationEvent::UpperIgnition,
                            _ => SeparationEvent::Never,
                        };
                    }
                    b"separationdelay" => stage.separation_delay = parse_f64(reader, b"separationdelay")?,
                    b"subcomponents" => {
                        stage.children = parse_children(reader)?;
                    }
                    // Stage-level mass/CG override (incl. overridemass +
                    // overridesubcomponentsmass — assembly mass override).
                    other => {
                        if !parse_common_field(&mut stage.common, &e, reader)? {
                            skip_to_end(reader, other)?;
                        }
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"stage" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <stage>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(stage)
}

fn parse_children(reader: &mut Reader<&[u8]>) -> Result<Vec<Component>> {
    let mut out = Vec::new();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                let component = match n.as_ref() {
                    b"nosecone" => Some(Component::NoseCone(parse_nosecone(reader)?)),
                    b"bodytube" => Some(Component::BodyTube(parse_bodytube(reader)?)),
                    b"transition" => Some(Component::Transition(parse_transition(reader)?)),
                    b"innertube" => Some(Component::InnerTube(parse_innertube(reader)?)),
                    b"trapezoidfinset" | b"freeformfinset" | b"ellipticalfinset" => {
                        let tag = n.as_ref().to_vec();
                        Some(Component::FinSet(parse_finset(reader, &tag)?))
                    }
                    b"masscomponent" => {
                        Some(Component::MassObject(parse_mass_object(reader, n.as_ref())?))
                    }
                    b"shockcord" => Some(Component::ShockCord(parse_shockcord(reader)?)),
                    b"parachute" => Some(Component::Parachute(parse_parachute(reader)?)),
                    b"launchlug" => Some(Component::LaunchLug(parse_launchlug(reader)?)),
                    b"railbutton" => Some(Component::LaunchLug(parse_railbutton(reader)?)),
                    b"centeringring" => Some(Component::CenteringRing(parse_centeringring(reader)?)),
                    b"engineblock" => {
                        Some(Component::CenteringRing(parse_ring_tagged(reader, b"engineblock", false)?))
                    }
                    b"tubecoupler" => {
                        Some(Component::CenteringRing(parse_ring_tagged(reader, b"tubecoupler", false)?))
                    }
                    b"bulkhead" => {
                        Some(Component::CenteringRing(parse_ring_tagged(reader, b"bulkhead", true)?))
                    }
                    b"tubefinset" => Some(Component::TubeFinSet(parse_tubefinset(reader)?)),
                    b"podset" => Some(Component::PodSet(parse_podset(reader)?)),
                    b"parallelstage" => Some(Component::PodSet(parse_podset_tagged(
                        reader,
                        b"parallelstage",
                    )?)),
                    _ => {
                        skip_to_end(reader, n.as_ref())?;
                        None
                    }
                };
                if let Some(c) = component {
                    out.push(c);
                }
            }
            Event::End(e) if e.name().as_ref() == b"subcomponents" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <subcomponents>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(out)
}

// --- individual components ---

fn parse_common_field(
    common: &mut Common,
    start: &quick_xml::events::BytesStart<'_>,
    reader: &mut Reader<&[u8]>,
) -> Result<bool> {
    let tag = start.name();
    match tag.as_ref() {
        b"name" => {
            common.name = read_text(reader, b"name")?;
            Ok(true)
        }
        b"id" => {
            common.id = ComponentId::new(read_text(reader, b"id")?);
            Ok(true)
        }
        b"axialoffset" => {
            let mut method = None;
            for attr in start.attributes().with_checks(false).flatten() {
                if attr.key.as_ref() == b"method" {
                    method = Some(attr.unescape_value()?.to_string());
                }
            }
            let txt = read_text(reader, b"axialoffset")?;
            common.axial_offset = txt.parse().unwrap_or(0.0);
            if let Some(m) = method {
                common.axial_method = match m.as_str() {
                    "absolute" => opsrocket_core::component::AxialMethod::Absolute,
                    "top" => opsrocket_core::component::AxialMethod::Top,
                    "bottom" => opsrocket_core::component::AxialMethod::Bottom,
                    "middle" => opsrocket_core::component::AxialMethod::Middle,
                    _ => opsrocket_core::component::AxialMethod::After,
                };
            }
            Ok(true)
        }
        b"angleoffset" => {
            let txt = read_text(reader, b"angleoffset")?;
            if let Ok(deg) = txt.parse::<f64>() {
                common.angle_offset = deg.to_radians();
            }
            Ok(true)
        }
        b"radialdirection" => {
            // Launch lugs / rail buttons use this; only adopt it if a
            // fin-style <angleoffset> hasn't already set the azimuth.
            let txt = read_text(reader, b"radialdirection")?;
            if common.angle_offset == 0.0 {
                if let Ok(deg) = txt.parse::<f64>() {
                    common.angle_offset = deg.to_radians();
                }
            }
            Ok(true)
        }
        b"position" => {
            // Legacy form used by older .ork versions. Don't override the method
            // if a newer <axialoffset> already set it.
            let txt = read_text(reader, b"position")?;
            common.axial_offset = txt.parse().unwrap_or(common.axial_offset);
            Ok(true)
        }
        b"material" => {
            common.material = parse_material(start, reader)?;
            Ok(true)
        }
        b"appearance" => {
            common.appearance = Some(parse_appearance(reader)?);
            Ok(true)
        }
        b"overridemass" => {
            common.mass_override = read_text(reader, b"overridemass")?.parse().ok();
            Ok(true)
        }
        b"overridecg" => {
            common.cg_override = read_text(reader, b"overridecg")?.parse().ok();
            Ok(true)
        }
        b"overridesubcomponentsmass" => {
            common.override_subcomponents_mass =
                read_text(reader, b"overridesubcomponentsmass")?.trim() == "true";
            Ok(true)
        }
        b"overridecd" => {
            common.cd_override = read_text(reader, b"overridecd")?.parse().ok();
            Ok(true)
        }
        b"overridesubcomponentscd" => {
            common.override_subcomponents_cd =
                read_text(reader, b"overridesubcomponentscd")?.trim() == "true";
            Ok(true)
        }
        b"finish" => {
            common.finish = opsrocket_core::component::Finish::from_ork(
                &read_text(reader, b"finish")?,
            );
            Ok(true)
        }
        _ => Ok(false),
    }
}

/// Parse `<appearance>`: `<paint red green blue alpha/>`, `<shine>v</shine>`,
/// and an optional `<decal name= rotation= edgemode= >` with
/// `<center/> <offset/> <scale/>` children.
fn parse_appearance(reader: &mut Reader<&[u8]>) -> Result<Appearance> {
    use opsrocket_core::component::Decal;
    let mut paint = [160u8, 160, 160, 255];
    let mut shine = 0.3_f64;
    let mut decal: Option<Decal> = None;
    let mut buf = Vec::new();
    let attr_u8 = |s: &quick_xml::events::BytesStart<'_>, k: &[u8]| -> u8 {
        for a in s.attributes().with_checks(false).flatten() {
            if a.key.as_ref() == k {
                if let Ok(v) = a.unescape_value() {
                    return v.parse::<f64>().unwrap_or(0.0).round().clamp(0.0, 255.0) as u8;
                }
            }
        }
        255
    };
    let attr_str = |s: &quick_xml::events::BytesStart<'_>, k: &[u8]| -> String {
        for a in s.attributes().with_checks(false).flatten() {
            if a.key.as_ref() == k {
                if let Ok(v) = a.unescape_value() {
                    return v.into_owned();
                }
            }
        }
        String::new()
    };
    let attr_f = |s: &quick_xml::events::BytesStart<'_>, k: &[u8]| -> f64 {
        for a in s.attributes().with_checks(false).flatten() {
            if a.key.as_ref() == k {
                if let Ok(v) = a.unescape_value() {
                    return v.parse().unwrap_or(0.0);
                }
            }
        }
        0.0
    };
    let new_decal = |e: &quick_xml::events::BytesStart<'_>| Decal {
        name: attr_str(e, b"name"),
        rotation: attr_f(e, b"rotation"),
        edge_mode: {
            let m = attr_str(e, b"edgemode");
            if m.is_empty() { "REPEAT".into() } else { m }
        },
        center: [0.0, 0.0],
        offset: [0.0, 0.0],
        scale: [1.0, 1.0],
    };
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Empty(e) | Event::Start(e) if e.name().as_ref() == b"paint" => {
                paint = [
                    attr_u8(&e, b"red"),
                    attr_u8(&e, b"green"),
                    attr_u8(&e, b"blue"),
                    attr_u8(&e, b"alpha"),
                ];
            }
            Event::Start(e) if e.name().as_ref() == b"shine" => {
                shine = read_text(reader, b"shine")?.trim().parse().unwrap_or(0.3);
            }
            Event::Empty(e) if e.name().as_ref() == b"decal" => {
                decal = Some(new_decal(&e));
            }
            Event::Start(e) if e.name().as_ref() == b"decal" => {
                let mut d = new_decal(&e);
                let mut sb = Vec::new();
                loop {
                    match reader.read_event_into(&mut sb)? {
                        Event::Empty(c) | Event::Start(c) => {
                            let xy = [attr_f(&c, b"x"), attr_f(&c, b"y")];
                            match c.name().as_ref() {
                                b"center" => d.center = xy,
                                b"offset" => d.offset = xy,
                                b"scale" => d.scale = xy,
                                _ => {}
                            }
                        }
                        Event::End(c) if c.name().as_ref() == b"decal" => break,
                        Event::Eof => {
                            return Err(Error::Malformed("EOF inside <decal>".into()))
                        }
                        _ => {}
                    }
                    sb.clear();
                }
                decal = Some(d);
            }
            Event::End(e) if e.name().as_ref() == b"appearance" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <appearance>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(Appearance { paint, shine: shine.clamp(0.0, 1.0), decal })
}

fn parse_material(
    start: &quick_xml::events::BytesStart<'_>,
    reader: &mut Reader<&[u8]>,
) -> Result<Option<Material>> {
    // Used for both <material> and <linematerial> blocks; the closing tag
    // name must match the opening name we were given.
    let mut kind = MaterialType::Bulk;
    let mut density = 0.0_f64;
    let mut group: Option<String> = None;
    for attr in start.attributes().with_checks(false).flatten() {
        let v = attr.unescape_value()?;
        match attr.key.as_ref() {
            b"type" => {
                kind = match v.as_ref() {
                    "surface" => MaterialType::Surface,
                    "line" => MaterialType::Line,
                    _ => MaterialType::Bulk,
                }
            }
            b"density" => density = v.parse().unwrap_or(0.0),
            b"group" => group = Some(v.into_owned()),
            _ => {}
        }
    }
    let close_tag = start.name().as_ref().to_vec();
    let name = read_text(reader, &close_tag)?;
    Ok(Some(Material { name, kind, density, group }))
}

fn parse_nosecone(reader: &mut Reader<&[u8]>) -> Result<NoseCone> {
    let mut nc = NoseCone {
        common: Common::new("", "Nose cone"),
        shape: NoseShape::Ogive,
        shape_parameter: 1.0,
        length: 0.0,
        aft_radius: 0.0,
        thickness: 0.0,
        aft_shoulder_radius: 0.0,
        aft_shoulder_length: 0.0,
        aft_shoulder_thickness: 0.0,
        aft_shoulder_capped: false,
        is_flipped: false,
        filled: false,
        children: Vec::new(),
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut nc.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"shape" => {
                            let v = read_text(reader, b"shape")?;
                            nc.shape = match v.as_str() {
                                "conical" => NoseShape::Conical,
                                "ellipsoid" => NoseShape::Ellipsoid,
                                "power" => NoseShape::Power,
                                "parabolic" => NoseShape::Parabolic,
                                "haack" => NoseShape::Haack,
                                _ => NoseShape::Ogive,
                            };
                        }
                        b"shapeparameter" => {
                            nc.shape_parameter = parse_f64(reader, b"shapeparameter")?;
                        }
                        b"length" => nc.length = parse_f64(reader, b"length")?,
                        b"aftradius" => nc.aft_radius = parse_f64_or_auto(reader, b"aftradius")?.unwrap_or(0.0),
                        b"thickness" => {
                            // OpenRocket encodes a solid nose as the literal
                            // string `<thickness>filled</thickness>`.
                            let v = read_text(reader, b"thickness")?;
                            if v.trim() == "filled" {
                                nc.filled = true;
                            } else if let Ok(t) = v.trim().parse::<f64>() {
                                nc.thickness = t;
                            }
                        }
                        b"aftshoulderradius" => nc.aft_shoulder_radius = parse_f64(reader, b"aftshoulderradius")?,
                        b"aftshoulderlength" => nc.aft_shoulder_length = parse_f64(reader, b"aftshoulderlength")?,
                        b"aftshoulderthickness" => nc.aft_shoulder_thickness = parse_f64(reader, b"aftshoulderthickness")?,
                        b"aftshouldercapped" => {
                            nc.aft_shoulder_capped = read_text(reader, b"aftshouldercapped")? == "true";
                        }
                        b"isflipped" => {
                            nc.is_flipped = read_text(reader, b"isflipped")? == "true";
                        }
                        b"filled" => {
                            nc.filled = read_text(reader, b"filled")? == "true";
                        }
                        b"subcomponents" => nc.children = parse_children(reader)?,
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"nosecone" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <nosecone>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(nc)
}

fn parse_bodytube(reader: &mut Reader<&[u8]>) -> Result<BodyTube> {
    let mut bt = BodyTube {
        common: Common::new("", "Body tube"),
        length: 0.0,
        radius: None,
        thickness: 0.0,
        children: Vec::new(),
        motor_mount: None,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut bt.common, &e, reader)? {
                    // handled
                } else {
                    match n.as_ref() {
                        b"length" => bt.length = parse_f64(reader, b"length")?,
                        b"radius" => bt.radius = parse_f64_or_auto(reader, b"radius")?,
                        b"thickness" => bt.thickness = parse_f64(reader, b"thickness")?,
                        b"subcomponents" => bt.children = parse_children(reader)?,
                        b"motormount" => bt.motor_mount = Some(parse_motor_mount(reader)?),
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"bodytube" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <bodytube>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(bt)
}

fn parse_transition(reader: &mut Reader<&[u8]>) -> Result<Transition> {
    let mut tr = Transition {
        common: Common::new("", "Transition"),
        shape: NoseShape::Conical,
        shape_parameter: 1.0,
        length: 0.0,
        fore_radius: 0.0,
        aft_radius: 0.0,
        thickness: 0.0,
        filled: false,
        children: Vec::new(),
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut tr.common, &e, reader)? {
                    // handled
                } else {
                    match n.as_ref() {
                        b"shape" => {
                            let v = read_text(reader, b"shape")?;
                            tr.shape = match v.as_str() {
                                "ogive" => NoseShape::Ogive,
                                "ellipsoid" => NoseShape::Ellipsoid,
                                "power" => NoseShape::Power,
                                "parabolic" => NoseShape::Parabolic,
                                "haack" => NoseShape::Haack,
                                _ => NoseShape::Conical,
                            };
                        }
                        b"shapeparameter" => tr.shape_parameter = parse_f64(reader, b"shapeparameter")?,
                        b"length" => tr.length = parse_f64(reader, b"length")?,
                        b"foreradius" => tr.fore_radius = parse_f64_or_auto(reader, b"foreradius")?.unwrap_or(0.0),
                        b"aftradius" => tr.aft_radius = parse_f64_or_auto(reader, b"aftradius")?.unwrap_or(0.0),
                        b"thickness" => {
                            let v = read_text(reader, b"thickness")?;
                            if v.trim() == "filled" {
                                tr.filled = true;
                            } else if let Ok(t) = v.trim().parse::<f64>() {
                                tr.thickness = t;
                            }
                        }
                        b"filled" => {
                            tr.filled = read_text(reader, b"filled")? == "true";
                        }
                        b"subcomponents" => tr.children = parse_children(reader)?,
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"transition" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <transition>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(tr)
}

/// OpenRocket `ClusterConfiguration` xml-name → physical tube count
/// (= number of (x,y) point pairs). Unknown → single.
fn cluster_count(name: &str) -> u32 {
    match name.trim() {
        "single" => 1,
        "double" => 2,
        "3-row" | "3-ring" => 3,
        "4-row" | "4-ring" | "3-star" => 4,
        "5-ring" | "4-star" => 5,
        "6-ring" | "5-star" => 6,
        "6-star" => 7,
        "9-grid" => 9,
        "9-star" => 10,
        _ => 1,
    }
}

fn parse_innertube(reader: &mut Reader<&[u8]>) -> Result<InnerTube> {
    let mut it = InnerTube {
        common: Common::new("", "Inner tube"),
        length: 0.0,
        outer_radius: 0.0,
        inner_radius: 0.0,
        motor_mount: None,
        children: Vec::new(),
        cluster_count: 1,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut it.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"subcomponents" => it.children = parse_children(reader)?,
                        b"length" => it.length = parse_f64(reader, b"length")?,
                        b"radius" => {
                            let r = parse_f64(reader, b"radius")?;
                            it.outer_radius = r;
                            it.inner_radius = r;
                        }
                        b"outerradius" => it.outer_radius = parse_f64(reader, b"outerradius")?,
                        b"innerradius" => it.inner_radius = parse_f64(reader, b"innerradius")?,
                        b"thickness" => {
                            let t = parse_f64(reader, b"thickness")?;
                            it.inner_radius = (it.outer_radius - t).max(0.0);
                        }
                        b"motormount" => it.motor_mount = Some(parse_motor_mount(reader)?),
                        b"clusterconfiguration" => {
                            let v = read_text(reader, b"clusterconfiguration")?;
                            it.cluster_count = cluster_count(&v);
                        }
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"innertube" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <innertube>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(it)
}

/// Parse a freeform fin's `<finpoints>` block: a series of
/// `<point x="" y=""/>` elements (chordwise, spanwise) in metres.
fn parse_finpoints(reader: &mut Reader<&[u8]>) -> Result<Vec<[f64; 2]>> {
    let mut pts = Vec::new();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Empty(e) | Event::Start(e) if e.name().as_ref() == b"point" => {
                let mut x = 0.0;
                let mut y = 0.0;
                for a in e.attributes().with_checks(false).flatten() {
                    let v = a.unescape_value().unwrap_or_default();
                    match a.key.as_ref() {
                        b"x" => x = v.parse().unwrap_or(0.0),
                        b"y" => y = v.parse().unwrap_or(0.0),
                        _ => {}
                    }
                }
                pts.push([x, y]);
            }
            Event::End(e) if e.name().as_ref() == b"finpoints" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <finpoints>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(pts)
}

fn parse_finset(reader: &mut Reader<&[u8]>, tag: &[u8]) -> Result<FinSet> {
    let mut fs = FinSet {
        common: Common::new("", "Fin set"),
        fin_count: 3,
        root_chord: 0.0,
        tip_chord: 0.0,
        sweep_length: 0.0,
        height: 0.0,
        thickness: 0.003,
        cant_angle: 0.0,
        cross_section: FinCrossSection::Square,
        shape: match tag {
            b"ellipticalfinset" => opsrocket_core::component::FinShape::Elliptical,
            b"freeformfinset" => opsrocket_core::component::FinShape::Freeform,
            _ => opsrocket_core::component::FinShape::Trapezoidal,
        },
        points: Vec::new(),
        tab_length: 0.0,
        tab_height: 0.0,
        fillet_radius: 0.0,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut fs.common, &e, reader)? {
                    // handled
                } else {
                    match n.as_ref() {
                        b"fincount" => fs.fin_count = parse_u32(reader, b"fincount")?,
                        b"tablength" => fs.tab_length = parse_f64(reader, b"tablength")?,
                        b"tabheight" => fs.tab_height = parse_f64(reader, b"tabheight")?,
                        b"filletradius" => fs.fillet_radius = parse_f64(reader, b"filletradius")?,
                        b"rootchord" => fs.root_chord = parse_f64(reader, b"rootchord")?,
                        b"tipchord" => fs.tip_chord = parse_f64(reader, b"tipchord")?,
                        b"sweeplength" => fs.sweep_length = parse_f64(reader, b"sweeplength")?,
                        b"height" => fs.height = parse_f64(reader, b"height")?,
                        b"thickness" => fs.thickness = parse_f64(reader, b"thickness")?,
                        // OpenRocket stores <cant> in DEGREES
                        // (FinSetSaver: Math.toDegrees; loader ×π/180).
                        b"cant" => {
                            fs.cant_angle = parse_f64(reader, b"cant")?.to_radians()
                        }
                        b"finpoints" => fs.points = parse_finpoints(reader)?,
                        b"crosssection" => {
                            let v = read_text(reader, b"crosssection")?;
                            fs.cross_section = match v.as_str() {
                                "rounded" => FinCrossSection::Rounded,
                                "airfoil" => FinCrossSection::Airfoil,
                                _ => FinCrossSection::Square,
                            };
                        }
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == tag => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <finset>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(fs)
}

fn parse_mass_object(reader: &mut Reader<&[u8]>, end_tag: &[u8]) -> Result<MassObject> {
    let mut mo = MassObject {
        common: Common::new("", "Mass object"),
        length: 0.0,
        radius: 0.0,
        mass: 0.0,
    };
    let end_tag = end_tag.to_vec();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut mo.common, &e, reader)? {
                    // handled
                } else {
                    match n.as_ref() {
                        b"mass" => mo.mass = parse_f64(reader, b"mass")?,
                        b"length" | b"packedlength" => mo.length = parse_f64(reader, n.as_ref())?,
                        b"radius" | b"packedradius" => mo.radius = parse_f64(reader, n.as_ref())?,
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == end_tag.as_slice() => break,
            Event::Eof => return Err(Error::Malformed("EOF inside mass object".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(mo)
}

fn parse_parachute(reader: &mut Reader<&[u8]>) -> Result<Parachute> {
    let mut p = Parachute {
        common: Common::new("", "Parachute"),
        diameter: 0.0,
        cd: None,
        deploy_event: DeployEvent::Ejection,
        deploy_altitude: 0.0,
        deploy_delay: 0.0,
        line_count: 0,
        line_length: 0.0,
        line_material: None,
        packed_length: 0.0,
        packed_radius: 0.0,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut p.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"diameter" => p.diameter = parse_f64(reader, b"diameter")?,
                        b"cd" => p.cd = parse_f64_or_auto(reader, b"cd")?,
                        b"deployevent" => {
                            let v = read_text(reader, b"deployevent")?;
                            p.deploy_event = match v.as_str() {
                                "launch" => DeployEvent::Launch,
                                "apogee" => DeployEvent::Apogee,
                                "altitude" => DeployEvent::Altitude,
                                "lower_stage_separation" => DeployEvent::LowerStageSeparation,
                                "never" => DeployEvent::Never,
                                _ => DeployEvent::Ejection,
                            };
                        }
                        b"deployaltitude" => p.deploy_altitude = parse_f64(reader, b"deployaltitude")?,
                        b"deploydelay" => p.deploy_delay = parse_f64(reader, b"deploydelay")?,
                        b"linecount" => p.line_count = parse_u32(reader, b"linecount")?,
                        b"linelength" => p.line_length = parse_f64(reader, b"linelength")?,
                        b"linematerial" => p.line_material = parse_material(&e, reader)?,
                        b"packedlength" => p.packed_length = parse_f64(reader, b"packedlength")?,
                        b"packedradius" => p.packed_radius = parse_f64(reader, b"packedradius")?,
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"parachute" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <parachute>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(p)
}

fn parse_shockcord(reader: &mut Reader<&[u8]>) -> Result<ShockCord> {
    let mut s = ShockCord {
        common: Common::new("", "Shock cord"),
        cord_length: 0.0,
        packed_length: 0.0,
        packed_radius: 0.0,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut s.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"cordlength" => s.cord_length = parse_f64(reader, b"cordlength")?,
                        b"packedlength" => s.packed_length = parse_f64(reader, b"packedlength")?,
                        b"packedradius" => s.packed_radius = parse_f64(reader, b"packedradius")?,
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"shockcord" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <shockcord>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(s)
}

fn parse_launchlug(reader: &mut Reader<&[u8]>) -> Result<LaunchLug> {
    let mut l = LaunchLug {
        common: Common::new("", "Launch lug"),
        length: 0.0,
        outer_radius: 0.0,
        inner_radius: 0.0,
        instance_count: 1,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut l.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"length" => l.length = parse_f64(reader, b"length")?,
                        b"radius" => {
                            l.outer_radius = parse_f64(reader, b"radius")?;
                            if l.inner_radius == 0.0 {
                                l.inner_radius = (l.outer_radius - 0.0005).max(0.0);
                            }
                        }
                        b"outerradius" => l.outer_radius = parse_f64(reader, b"outerradius")?,
                        b"innerradius" => l.inner_radius = parse_f64(reader, b"innerradius")?,
                        b"thickness" => {
                            let t = parse_f64(reader, b"thickness")?;
                            l.inner_radius = (l.outer_radius - t).max(0.0);
                        }
                        b"instancecount" => l.instance_count = parse_u32(reader, b"instancecount")?.max(1),
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"launchlug" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <launchlug>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(l)
}

/// Rail buttons are modelled as a short surface stub (a stand-in for the
/// mushroom shape) so they appear in the 3D view at the right station and
/// azimuth. Mass/aero treat them as negligible (as OpenRocket largely does).
fn parse_railbutton(reader: &mut Reader<&[u8]>) -> Result<LaunchLug> {
    let mut l = LaunchLug {
        common: Common::new("", "Rail button"),
        length: 0.005,
        outer_radius: 0.005,
        inner_radius: 0.0,
        instance_count: 1,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut l.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"outerdiameter" => {
                            l.outer_radius = parse_f64(reader, b"outerdiameter")? * 0.5;
                        }
                        b"totalheight" | b"height" => {
                            l.length = parse_f64(reader, n.as_ref())?.max(1e-4);
                        }
                        b"instancecount" => {
                            l.instance_count = parse_u32(reader, b"instancecount")?.max(1);
                        }
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"railbutton" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <railbutton>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(l)
}

fn parse_centeringring(reader: &mut Reader<&[u8]>) -> Result<CenteringRing> {
    parse_ring_tagged(reader, b"centeringring", false)
}

/// Shared parser for thickness-ring parts: `<centeringring>`, `<engineblock>`,
/// `<tubecoupler>`, `<bulkhead>` — geometrically a ring (outer/inner radius
/// or outer + wall thickness). Parameterised by the closing tag.
fn parse_ring_tagged(
    reader: &mut Reader<&[u8]>,
    end: &[u8],
    solid: bool,
) -> Result<CenteringRing> {
    let mut c = CenteringRing {
        common: Common::new("", "Centering ring"),
        length: 0.0,
        outer_radius: 0.0,
        inner_radius: 0.0,
        thickness: 0.0,
        thickness_set: false,
        instance_count: 1,
        children: Vec::new(),
        solid,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut c.common, &e, reader)? {
                    /* handled */
                } else {
                    match n.as_ref() {
                        b"subcomponents" => c.children = parse_children(reader)?,
                        b"length" => c.length = parse_f64(reader, b"length")?,
                        b"outerradius" => {
                            c.outer_radius = parse_f64_or_auto(reader, b"outerradius")?.unwrap_or(0.0);
                        }
                        b"innerradius" => {
                            c.inner_radius = parse_f64_or_auto(reader, b"innerradius")?.unwrap_or(0.0);
                        }
                        b"thickness" => {
                            c.thickness = parse_f64(reader, b"thickness")?;
                            c.thickness_set = true;
                        }
                        b"instancecount" => c.instance_count = parse_u32(reader, b"instancecount")?.max(1),
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == end => break,
            Event::Eof => return Err(Error::Malformed("EOF inside ring component".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(c)
}

fn parse_tubefinset(
    reader: &mut Reader<&[u8]>,
) -> Result<opsrocket_core::component::TubeFinSet> {
    let mut t = opsrocket_core::component::TubeFinSet {
        common: Common::new("", "Tube fin set"),
        fin_count: 6,
        length: 0.0,
        outer_radius: None, // <radius>auto</radius> is the default
        thickness: 0.0,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut t.common, &e, reader)? {
                    /* handled (incl. angleoffset → common.angle_offset) */
                } else {
                    match n.as_ref() {
                        b"fincount" => t.fin_count = parse_u32(reader, b"fincount")?.max(1),
                        b"length" => t.length = parse_f64(reader, b"length")?,
                        b"radius" => {
                            t.outer_radius = parse_f64_or_auto(reader, b"radius")?;
                        }
                        b"thickness" => t.thickness = parse_f64(reader, b"thickness")?,
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == b"tubefinset" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <tubefinset>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(t)
}

fn parse_podset(reader: &mut Reader<&[u8]>) -> Result<opsrocket_core::component::PodSet> {
    parse_podset_tagged(reader, b"podset")
}

/// `<parallelstage>` (strap-on boosters) is, geometrically, identical to a
/// `<podset>` — a radially-mounted instanced sub-assembly. Render it as one.
fn parse_podset_tagged(
    reader: &mut Reader<&[u8]>,
    end: &[u8],
) -> Result<opsrocket_core::component::PodSet> {
    let mut p = opsrocket_core::component::PodSet {
        common: Common::new("", "Pod set"),
        instance_count: 1,
        radius_offset: 0.0,
        radius_method: "relative".to_string(),
        is_parallel_stage: end == b"parallelstage",
        children: Vec::new(),
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                if parse_common_field(&mut p.common, &e, reader)? {
                    /* handled (incl. angleoffset → common.angle_offset) */
                } else {
                    match n.as_ref() {
                        b"instancecount" => {
                            p.instance_count =
                                parse_u32(reader, b"instancecount")?.max(1);
                        }
                        b"radiusoffset" => {
                            if let Ok(Some(a)) = e.try_get_attribute("method") {
                                if let Ok(v) = a.unescape_value() {
                                    p.radius_method = v.to_ascii_lowercase();
                                }
                            }
                            p.radius_offset = parse_f64(reader, b"radiusoffset")?;
                        }
                        b"subcomponents" => {
                            p.children = parse_children(reader)?;
                        }
                        other => skip_to_end(reader, other)?,
                    }
                }
            }
            Event::End(e) if e.name().as_ref() == end => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <podset>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(p)
}

fn parse_motor_mount(reader: &mut Reader<&[u8]>) -> Result<MotorMount> {
    let mut mm = MotorMount::default();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                match n.as_ref() {
                    b"motor" => {
                        let mut a = MotorAssignment {
                            config_id: String::new(),
                            designation: None,
                            digest: None,
                            ejection_delay: 0.0,
                        };
                        for attr in e.attributes().with_checks(false).flatten() {
                            if attr.key.as_ref() == b"configid" {
                                a.config_id = attr.unescape_value()?.to_string();
                            }
                        }
                        // walk inside <motor> for type / designation / digest / delay
                        let mut mb = Vec::new();
                        loop {
                            match reader.read_event_into(&mut mb)? {
                                Event::Start(inner) => {
                                    let nn = inner.name();
                                    match nn.as_ref() {
                                        b"designation" => a.designation = Some(read_text(reader, b"designation")?),
                                        b"digest" => a.digest = Some(read_text(reader, b"digest")?),
                                        _ => skip_to_end(reader, nn.as_ref())?,
                                    }
                                }
                                Event::End(end) if end.name().as_ref() == b"motor" => break,
                                Event::Eof => return Err(Error::Malformed("EOF in <motor>".into())),
                                _ => {}
                            }
                            mb.clear();
                        }
                        mm.motors.push(a);
                    }
                    b"ignitionevent" => {
                        let v = read_text(reader, b"ignitionevent")?;
                        mm.ignition_event = match v.as_str() {
                            "launch" => IgnitionEvent::Launch,
                            "burnout" => IgnitionEvent::Burnout,
                            "ejection" => IgnitionEvent::Ejection,
                            "lower_stage_separation" => IgnitionEvent::LowerStageSeparation,
                            _ => IgnitionEvent::Automatic,
                        };
                    }
                    b"ignitiondelay" => mm.ignition_delay = parse_f64(reader, b"ignitiondelay")?,
                    b"overhang" => mm.overhang = parse_f64(reader, b"overhang")?,
                    other => skip_to_end(reader, other)?,
                }
            }
            Event::End(e) if e.name().as_ref() == b"motormount" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <motormount>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(mm)
}

// ============================================================================
//                             <simulations> parser
// ============================================================================

fn parse_simulations(reader: &mut Reader<&[u8]>) -> Result<Vec<CachedSimulation>> {
    let mut sims = Vec::new();
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) if e.name().as_ref() == b"simulation" => {
                sims.push(parse_simulation(reader)?);
            }
            Event::End(e) if e.name().as_ref() == b"simulations" => break,
            Event::Eof => break,
            _ => {}
        }
        buf.clear();
    }
    Ok(sims)
}

fn parse_simulation(reader: &mut Reader<&[u8]>) -> Result<CachedSimulation> {
    let mut s = CachedSimulation {
        name: String::new(),
        config_id: None,
        launch_rod_length: 1.0,
        launch_rod_angle: 0.0,
        launch_rod_direction: 0.0,
        launch_altitude: 0.0,
        launch_temperature: 288.15,
        launch_pressure: 101_325.0,
        launch_latitude: 28.61,
        launch_longitude: 0.0,
        geodetic_method: "spherical".to_string(),
        wind_average: 0.0,
        wind_turbulence: 0.1,
        wind_direction: std::f64::consts::FRAC_PI_2,
        time_step: 0.05,
        max_time: 1200.0,
        cached: None,
    };
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                match n.as_ref() {
                    b"name" => s.name = read_text(reader, b"name")?,
                    b"conditions" => parse_conditions(reader, &mut s)?,
                    b"flightdata" => {
                        s.cached = Some(parse_flightdata(reader, &e)?);
                    }
                    other => skip_to_end(reader, other)?,
                }
            }
            Event::End(e) if e.name().as_ref() == b"simulation" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <simulation>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(s)
}

fn parse_conditions(reader: &mut Reader<&[u8]>, s: &mut CachedSimulation) -> Result<()> {
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                match n.as_ref() {
                    b"configid" => s.config_id = Some(read_text(reader, b"configid")?),
                    b"launchrodlength" => s.launch_rod_length = parse_f64(reader, b"launchrodlength")?,
                    b"launchrodangle" => s.launch_rod_angle = parse_f64(reader, b"launchrodangle")?,
                    b"launchroddirection" => {
                        // .ork stores degrees; OpenRocket converts to radians.
                        s.launch_rod_direction =
                            parse_f64(reader, b"launchroddirection")?.to_radians()
                    }
                    b"launchaltitude" => s.launch_altitude = parse_f64(reader, b"launchaltitude")?,
                    b"launchtemperature" => s.launch_temperature = parse_f64(reader, b"launchtemperature")?,
                    b"launchpressure" => s.launch_pressure = parse_f64(reader, b"launchpressure")?,
                    b"launchlatitude" => s.launch_latitude = parse_f64(reader, b"launchlatitude")?,
                    b"launchlongitude" => s.launch_longitude = parse_f64(reader, b"launchlongitude")?,
                    b"geodeticmethod" => {
                        s.geodetic_method =
                            read_text(reader, b"geodeticmethod")?.trim().to_lowercase()
                    }
                    b"windaverage" => s.wind_average = parse_f64(reader, b"windaverage")?,
                    b"windturbulence" => s.wind_turbulence = parse_f64(reader, b"windturbulence")?,
                    b"winddirection" => s.wind_direction = parse_f64(reader, b"winddirection")?,
                    b"timestep" => s.time_step = parse_f64(reader, b"timestep")?,
                    b"maxtime" => s.max_time = parse_f64(reader, b"maxtime")?,
                    other => skip_to_end(reader, other)?,
                }
            }
            Event::End(e) if e.name().as_ref() == b"conditions" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <conditions>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(())
}

fn parse_flightdata(
    reader: &mut Reader<&[u8]>,
    start: &quick_xml::events::BytesStart<'_>,
) -> Result<CachedFlightData> {
    let mut data = CachedFlightData {
        max_altitude: 0.0,
        max_velocity: 0.0,
        max_acceleration: 0.0,
        max_mach: 0.0,
        time_to_apogee: 0.0,
        flight_time: 0.0,
        ground_hit_velocity: 0.0,
        launch_rod_velocity: 0.0,
        deployment_velocity: None,
        column_types: Vec::new(),
        points: Vec::new(),
        events: Vec::new(),
    };
    for attr in start.attributes().with_checks(false).flatten() {
        let v = attr.unescape_value()?;
        match attr.key.as_ref() {
            b"maxaltitude" => data.max_altitude = v.parse().unwrap_or(0.0),
            b"maxvelocity" => data.max_velocity = v.parse().unwrap_or(0.0),
            b"maxacceleration" => data.max_acceleration = v.parse().unwrap_or(0.0),
            b"maxmach" => data.max_mach = v.parse().unwrap_or(0.0),
            b"timetoapogee" => data.time_to_apogee = v.parse().unwrap_or(0.0),
            b"flighttime" => data.flight_time = v.parse().unwrap_or(0.0),
            b"groundhitvelocity" => data.ground_hit_velocity = v.parse().unwrap_or(0.0),
            b"launchrodvelocity" => data.launch_rod_velocity = v.parse().unwrap_or(0.0),
            b"deploymentvelocity" => data.deployment_velocity = v.parse().ok(),
            _ => {}
        }
    }

    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) if e.name().as_ref() == b"databranch" => {
                // Capture the types attribute (only for the first branch).
                if data.column_types.is_empty() {
                    for attr in e.attributes().with_checks(false).flatten() {
                        if attr.key.as_ref() == b"types" {
                            data.column_types = attr
                                .unescape_value()?
                                .split(',')
                                .map(|s| s.to_string())
                                .collect();
                        }
                    }
                }
                parse_databranch(reader, &mut data)?;
            }
            Event::End(e) if e.name().as_ref() == b"flightdata" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <flightdata>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(data)
}

fn parse_databranch(reader: &mut Reader<&[u8]>, data: &mut CachedFlightData) -> Result<()> {
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) => {
                let n = e.name();
                match n.as_ref() {
                    b"event" => {
                        let mut time = 0.0_f64;
                        let mut kind = String::new();
                        for attr in e.attributes().with_checks(false).flatten() {
                            match attr.key.as_ref() {
                                b"time" => time = attr.unescape_value()?.parse().unwrap_or(0.0),
                                b"type" => kind = attr.unescape_value()?.to_string(),
                                _ => {}
                            }
                        }
                        skip_to_end(reader, b"event")?;
                        data.events.push(FlightEvent { time, kind });
                    }
                    b"datapoint" => {
                        let txt = read_text(reader, b"datapoint")?;
                        let values = parse_datapoint_values(&txt);
                        data.points.push(FlightDataPoint { values });
                    }
                    other => skip_to_end(reader, other)?,
                }
            }
            Event::Empty(e) => {
                if e.name().as_ref() == b"event" {
                    let mut time = 0.0_f64;
                    let mut kind = String::new();
                    for attr in e.attributes().with_checks(false).flatten() {
                        match attr.key.as_ref() {
                            b"time" => time = attr.unescape_value()?.parse().unwrap_or(0.0),
                            b"type" => kind = attr.unescape_value()?.to_string(),
                            _ => {}
                        }
                    }
                    data.events.push(FlightEvent { time, kind });
                }
            }
            Event::End(e) if e.name().as_ref() == b"databranch" => break,
            Event::Eof => return Err(Error::Malformed("EOF inside <databranch>".into())),
            _ => {}
        }
        buf.clear();
    }
    Ok(())
}

fn parse_datapoint_values(txt: &str) -> Vec<f64> {
    txt.split(',')
        .map(|s| {
            let t = s.trim();
            if t == "NaN" {
                f64::NAN
            } else {
                t.parse::<f64>().unwrap_or(f64::NAN)
            }
        })
        .collect()
}

// ============================================================================
//                              XML helpers
// ============================================================================

fn read_text(reader: &mut Reader<&[u8]>, end_tag: &[u8]) -> Result<String> {
    let mut buf = Vec::new();
    let mut s = String::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Text(t) => s.push_str(&t.unescape()?),
            Event::CData(t) => s.push_str(std::str::from_utf8(&t)?),
            Event::End(e) if e.name().as_ref() == end_tag => return Ok(s),
            Event::Eof => return Err(Error::Malformed(format!("EOF inside text of <{}>", String::from_utf8_lossy(end_tag)))),
            _ => {}
        }
        buf.clear();
    }
}

fn parse_f64(reader: &mut Reader<&[u8]>, end_tag: &[u8]) -> Result<f64> {
    Ok(read_text(reader, end_tag)?.trim().parse().unwrap_or(0.0))
}

fn parse_f64_or_auto(reader: &mut Reader<&[u8]>, end_tag: &[u8]) -> Result<Option<f64>> {
    let s = read_text(reader, end_tag)?;
    let s = s.trim();
    if s.starts_with("auto") {
        // "auto 0.0125" - second token is the cached auto-resolved value
        let v = s.split_whitespace().nth(1).and_then(|t| t.parse::<f64>().ok());
        Ok(v)
    } else {
        Ok(s.parse::<f64>().ok())
    }
}

fn parse_u32(reader: &mut Reader<&[u8]>, end_tag: &[u8]) -> Result<u32> {
    Ok(read_text(reader, end_tag)?.trim().parse().unwrap_or(0))
}

fn skip_to_end(reader: &mut Reader<&[u8]>, end_tag: &[u8]) -> Result<()> {
    let mut depth = 1;
    let mut buf = Vec::new();
    loop {
        match reader.read_event_into(&mut buf)? {
            Event::Start(e) if e.name().as_ref() == end_tag => depth += 1,
            Event::End(e) if e.name().as_ref() == end_tag => {
                depth -= 1;
                if depth == 0 {
                    return Ok(());
                }
            }
            Event::Eof => {
                return Err(Error::Malformed(format!(
                    "EOF inside <{}>",
                    String::from_utf8_lossy(end_tag)
                )))
            }
            _ => {}
        }
        buf.clear();
    }
}

// re-export Common for the user
pub use opsrocket_core::component::Common as _ReExportCommon;
