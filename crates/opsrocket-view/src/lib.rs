//! Presentation layer shared by the Tauri desktop app and the web server.
//!
//! Both front-ends call [`build_rocket_view`] and [`run_flight`] so the
//! JSON they emit is byte-identical — no drift between desktop and web.

pub mod analysis;
pub mod motors;
pub mod schema;
pub mod sim;

use opsrocket_core::component::Component;
use opsrocket_core::profile::shape_radius;
use opsrocket_io::OrkDocument;
use serde::Serialize;

/// Always-visible stability readout (OpenRocket's headline metric bar).
#[derive(Serialize, Clone)]
pub struct Stability {
    pub mass_g: f64,
    pub cg_cm: f64,
    pub cp_cm: f64,
    pub margin_cal: f64,
    pub ref_diameter_mm: f64,
    pub cn_alpha: f64,
    pub cd: f64,
    pub cd_friction: f64,
    pub cd_pressure: f64,
    pub cd_base: f64,
    pub stable: bool,
}

/// Compute the live mass / CG / CP / stability margin for the rocket
/// (empty, no motor — matches OpenRocket's default design-time readout).
pub fn stability(doc: &OrkDocument) -> Stability {
    use opsrocket_sim::aero::{compute_with, FlightConditions};
    let mp = opsrocket_sim::mass::empty_mass_properties(&doc.rocket);
    let aero = compute_with(
        &doc.rocket,
        FlightConditions { mach: 0.05, angle_of_attack: 0.0, reynolds: 1.0e6 },
        false,
    );
    let d = aero.reference_length.max(1e-6);
    let margin = (aero.cp_axial - mp.cg_axial) / d;
    Stability {
        mass_g: mp.mass * 1000.0,
        cg_cm: mp.cg_axial * 100.0,
        cp_cm: aero.cp_axial * 100.0,
        margin_cal: margin,
        ref_diameter_mm: d * 1000.0,
        cn_alpha: aero.cn_alpha,
        cd: aero.cd,
        cd_friction: aero.cd_friction,
        cd_pressure: aero.cd_pressure,
        cd_base: aero.cd_base,
        stable: margin > 1.0,
    }
}

#[derive(Serialize, Clone)]
pub struct CompView {
    pub kind: String,
    pub name: String,
    pub axial_start: f64,
    pub length: f64,
}

/// Filled silhouette polygon (metres): x along the rocket axis, y the
/// positive radius. The frontend mirrors it about y = 0.
#[derive(Serialize, Clone)]
pub struct Shape2D {
    pub kind: String,
    pub points: Vec<[f64; 2]>,
}

/// A decal texture resolved for the frontend: an inline data-URL plus
/// OpenRocket's placement transform.
#[derive(Serialize, Clone)]
pub struct DecalView {
    pub url: String,
    pub offset: [f64; 2],
    pub scale: [f64; 2],
    pub center: [f64; 2],
    pub rotation: f64,
    pub edge_mode: String,
}

/// Surface material. Carries BOTH the "Finished" appearance (explicit
/// `.ork` paint/decal, else the OpenRocket class default) and the
/// "Unfinished" appearance (always the OpenRocket class default,
/// ignoring `.ork` paint — mirrors `UnfinishedRenderer`).
#[derive(Serialize, Clone)]
pub struct Mat {
    pub color: [u8; 4],
    pub shine: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub decal: Option<DecalView>,
    /// OpenRocket class-default colour/gloss/texture (the "Unfinished" look).
    pub default_color: [u8; 4],
    pub default_shine: f64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub default_decal: Option<DecalView>,
    /// True for body tubes: `UnfinishedRenderer` draws them at alpha 0.2 so
    /// internal components show through.
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    pub translucent_unfinished: bool,
    /// OpenRocket FigureRenderer per-class colour (UITheme LIGHT defaults):
    /// body 0,0,240; fins/tubefins 0,0,200; lug 0,0,180; internal 170,0,100;
    /// mass 0,0,0; chute 255,0,0; pod 160,160,215. Figure mode only.
    pub figure_color: [u8; 3],
}

/// OpenRocket `SwingPreferences.getDefaultColor` (UITheme.Themes.LIGHT) —
/// the colours `FigureRenderer` paints components with in 3D-figure mode.
fn figure_color(kind: &str) -> [u8; 3] {
    match kind {
        "NoseCone" | "BodyTube" | "Transition" | "Shoulder" => [0, 0, 240],
        "FinSet" | "TubeFinSet" => [0, 0, 200],
        "LaunchLug" | "RailButton" => [0, 0, 180],
        "InnerTube" | "CenteringRing" | "EngineBlock" => [170, 0, 100],
        "MassObject" | "ShockCord" => [0, 0, 0],
        "Parachute" => [255, 0, 0],
        "PodSet" => [160, 160, 215],
        "ParallelStage" => [198, 163, 184],
        "Motor" => [77, 77, 77], // FigureRenderer.renderMotor: 0.3 grey
        _ => [0, 0, 240],
    }
}

/// OpenRocket `DefaultAppearance.getDefaultAppearance(RocketComponent)`:
/// per-component-class base colour, gloss, and default texture file
/// (served from `/textures/...`). `simple()` entries use a white base so
/// the (opaque) texture stands in for the colour; `simpleAlpha()` entries
/// keep their tint and overlay an alpha texture.
fn default_appearance(kind: &str) -> ([u8; 4], f64, Option<&'static str>) {
    match kind {
        // ESTES_BT — spiral-wound cardboard body tube.
        "BodyTube" => ([212, 185, 145, 255], 0.3, Some("spiral-wound-alpha.png")),
        // ESTES_IT — inner tube / coupler / tube fin.
        "InnerTube" | "TubeFinSet" => {
            ([168, 146, 116, 255], 0.1, Some("spiral-wound-alpha.png"))
        }
        // WHITE_BT — launch lug.
        "LaunchLug" => ([240, 240, 240, 255], 0.3, Some("spiral-wound-alpha.png")),
        // BALSA — fins.
        "FinSet" => ([255, 255, 255, 255], 0.0, Some("balsa.jpg")),
        // WOOD — centering / bulkhead rings (RadiusRingComponent).
        "CenteringRing" => ([255, 255, 255, 255], 0.0, Some("wood.jpg")),
        // CHUTE — parachute canopy.
        "Parachute" => ([255, 255, 255, 255], 0.0, Some("chute.jpg")),
        // HARDBOARD — engine block.
        "EngineBlock" => ([255, 255, 255, 255], 0.0, Some("hardboard.jpg")),
        // WADDING — mass objects / shock cord bundle.
        "MassObject" | "ShockCord" => ([255, 255, 255, 255], 0.0, Some("wadding.png")),
        // getPlastic(255,255,220) — rail button.
        "RailButton" => ([255, 255, 220, 255], 0.3, None),
        // getPlastic(255,255,255) — Transition (NoseCone extends Transition)
        // and nose-cone / transition shoulders.
        "NoseCone" | "Transition" | "Shoulder" => ([255, 255, 255, 255], 0.3, None),
        _ => ([200, 200, 200, 255], 0.3, None),
    }
}

/// A full-surface default texture, mapped like OpenRocket's default
/// `Decal` (centre 0, offset 0, scale 1, no rotation, REPEAT wrap). The
/// frontend tiles it to keep the weave/grain at a physical aspect ratio.
fn default_decal(file: &str) -> DecalView {
    DecalView {
        url: format!("/textures/{file}"),
        offset: [0.0, 0.0],
        scale: [1.0, 1.0],
        center: [0.0, 0.0],
        rotation: 0.0,
        edge_mode: "REPEAT".into(),
    }
}

fn b64(bytes: &[u8]) -> String {
    const T: &[u8; 64] =
        b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut s = String::with_capacity(bytes.len().div_ceil(3) * 4);
    for c in bytes.chunks(3) {
        let b = [c[0], *c.get(1).unwrap_or(&0), *c.get(2).unwrap_or(&0)];
        let n = (b[0] as u32) << 16 | (b[1] as u32) << 8 | b[2] as u32;
        s.push(T[(n >> 18 & 63) as usize] as char);
        s.push(T[(n >> 12 & 63) as usize] as char);
        s.push(if c.len() > 1 { T[(n >> 6 & 63) as usize] as char } else { '=' });
        s.push(if c.len() > 2 { T[(n & 63) as usize] as char } else { '=' });
    }
    s
}

/// Resolve a component's material for both render modes.
///
/// "Unfinished" always uses the OpenRocket class default (with its default
/// texture). "Finished" uses the explicit `.ork` `<appearance>` when set
/// (paint + its own decal, no default texture — matching OpenRocket), else
/// falls back to the same class default.
fn appearance_mat(
    common: &opsrocket_core::component::Common,
    kind: &str,
    doc: &OrkDocument,
) -> Mat {
    let (dcolor, dshine, dtex) = default_appearance(kind);
    let default_decal = dtex.map(default_decal);
    let translucent_unfinished = kind == "BodyTube";

    if let Some(a) = &common.appearance {
        // Explicit decal: resolve the image bytes from the .ork archive.
        let decal = a.decal.as_ref().and_then(|d| {
            doc.decals
                .iter()
                .find(|(n, _)| *n == d.name || n.ends_with(&d.name))
                .map(|(_, bytes)| DecalView {
                    url: format!("data:image/png;base64,{}", b64(bytes)),
                    offset: d.offset,
                    scale: d.scale,
                    center: d.center,
                    rotation: d.rotation,
                    edge_mode: d.edge_mode.clone(),
                })
        });
        return Mat {
            color: a.paint,
            shine: a.shine,
            decal,
            default_color: dcolor,
            default_shine: dshine,
            default_decal,
            translucent_unfinished,
            figure_color: figure_color(kind),
        };
    }
    Mat {
        color: dcolor,
        shine: dshine,
        decal: default_decal.clone(),
        default_color: dcolor,
        default_shine: dshine,
        default_decal,
        translucent_unfinished,
        figure_color: figure_color(kind),
    }
}

/// OpenRocket `RocketComponentUtils.getMassObjectRadius`: a capsule/pill
/// silhouette — radius 0 at both ends, circular fillets of height
/// `arc = min(L, 2R)·0.35`, full radius in the middle. Used for mass
/// objects, packed parachutes and shock-cord bundles.
fn rounded_mass_profile(x0: f64, length: f64, radius: f64) -> Vec<[f64; 2]> {
    let n = 28;
    let arc = (length.min(2.0 * radius) * 0.35).max(1e-5);
    let r_at = |z: f64| -> f64 {
        if z <= 0.0 || z >= length {
            0.0
        } else if z < arc {
            let zz = z - arc;
            (radius - arc) + (arc * arc - zz * zz).max(0.0).sqrt()
        } else if z > length - arc {
            let zz = z - length + arc;
            (radius - arc) + (arc * arc - zz * zz).max(0.0).sqrt()
        } else {
            radius
        }
    };
    (0..=n)
        .map(|i| {
            let z = length * i as f64 / n as f64;
            [x0 + z, r_at(z).max(0.0)]
        })
        .collect()
}

/// Map a motor designation ("Estes B6", "AeroTech G80", …) to OpenRocket's
/// default motor texture (`DefaultAppearance.getDefaultAppearance(Motor)`).
fn motor_texture(designation: &str) -> &'static str {
    let d = designation.to_ascii_lowercase();
    if d.starts_with("estes") {
        "motors/estes.jpg"
    } else if d.starts_with("aerotech") {
        "motors/aerotech.png"
    } else if d.starts_with("klima") {
        "motors/klima.jpg"
    } else {
        "motors/reusable.png"
    }
}

/// A closed solid of revolution: an OUTER profile, an INNER profile (wall
/// bore — `r = outer − wall`, clamped ≥0) and fore/aft annulus end caps.
/// Mirrors OpenRocket's `ComponentRenderer.renderTube` (outside cylinder +
/// inside cylinder with reversed normals + two `gluDisk` end rings).
#[derive(Serialize, Clone)]
pub struct LatheProfile {
    pub kind: String,
    pub outer: Vec<[f64; 2]>,
    pub inner: Vec<[f64; 2]>,
    pub cap_fore: bool,
    pub cap_aft: bool,
    /// Pod transform: radial distance from the rocket axis (m) and azimuth
    /// (radians). 0/0 for centreline parts.
    #[serde(default)]
    pub radial: f64,
    #[serde(default)]
    pub radial_angle: f64,
    pub mat: Mat,
}

#[derive(Serialize, Clone)]
pub struct FinView {
    pub axial_start: f64,
    pub root_chord: f64,
    pub tip_chord: f64,
    pub sweep: f64,
    pub height: f64,
    pub count: u32,
    pub body_radius: f64,
    /// Fin material thickness (m) — fins are extruded, not flat.
    pub thickness: f64,
    /// Cant angle (radians) about the fin's spanwise root axis.
    pub cant_angle: f64,
    /// "square" | "rounded" | "airfoil".
    pub cross_section: String,
    /// Explicit planform outline (chordwise, spanwise) m for elliptical /
    /// freeform fins. Empty ⇒ build the trapezoid from the fields above.
    pub outline: Vec<[f64; 2]>,
    /// Azimuth of the first fin about the body axis (radians).
    pub angle_offset: f64,
    #[serde(default)]
    pub radial: f64,
    #[serde(default)]
    pub radial_angle: f64,
    pub mat: Mat,
}

/// External launch lug / rail guide: a short tube on the body surface.
#[derive(Serialize, Clone)]
pub struct LugView {
    pub axial_start: f64,
    pub length: f64,
    pub outer_radius: f64,
    pub body_radius: f64,
    pub count: u32,
    /// Azimuth about the body axis (radians).
    pub angle_offset: f64,
    #[serde(default)]
    pub radial: f64,
    #[serde(default)]
    pub radial_angle: f64,
    pub mat: Mat,
}

#[derive(Serialize, Clone)]
pub struct RocketView {
    pub name: String,
    pub designer: Option<String>,
    pub total_length: f64,
    pub max_radius: f64,
    pub components: Vec<CompView>,
    pub outline: Vec<Shape2D>,
    pub lathe: Vec<LatheProfile>,
    pub fins: Vec<FinView>,
    pub lugs: Vec<LugView>,
    /// Centre of gravity / centre of pressure axial positions (m), for the
    /// blue/red stability markers OpenRocket overlays on the 3D view.
    pub cg_axial: f64,
    pub cp_axial: f64,
    pub simulations: Vec<String>,
}

#[derive(Serialize, Clone)]
pub struct FlightData {
    pub time: Vec<f64>,
    pub altitude: Vec<f64>,
    pub velocity: Vec<f64>,
    pub thrust: Vec<f64>,
    pub apogee: f64,
    pub time_to_apogee: f64,
    pub flight_time: f64,
    pub ground_hit_velocity: f64,
    pub events: Vec<(f64, String)>,
}

const PROFILE_SAMPLES: usize = 48;

fn body_local_radius(comp: &Component, x: f64) -> f64 {
    match comp {
        Component::NoseCone(n) => {
            shape_radius(n.shape, n.shape_parameter, x, 0.0, n.aft_radius, n.length)
        }
        Component::Transition(t) => shape_radius(
            t.shape,
            t.shape_parameter,
            x,
            t.fore_radius,
            t.aft_radius,
            t.length,
        ),
        Component::BodyTube(b) => b.radius.unwrap_or(0.0),
        _ => 0.0,
    }
}

/// Emit the geometry for one instance of a pod set: lay its children out
/// in sequence from `pod_axial`, offset radially to (`host_r + radius_offset`,
/// `angle`). Covers the component kinds pods actually contain
/// (nose / body / transition / fins / inner tube / mass).
#[allow(clippy::too_many_arguments)]
fn emit_pod(
    pod: &opsrocket_core::component::PodSet,
    pod_axial: f64,
    radial: f64,
    angle: f64,
    doc: &OrkDocument,
    lathe: &mut Vec<LatheProfile>,
    fins: &mut Vec<FinView>,
    lugs: &mut Vec<LugView>,
    max_radius: &mut f64,
) {
    use opsrocket_core::component::AxialMethod;
    *max_radius = max_radius.max(radial + 0.02);
    // Lay pod children sequentially (After). A pod body tube's *nested*
    // children (motor-mount inner tube, fin set, mass) are positioned
    // WITHIN the body span by their own axial method — exactly as the main
    // layout does — not appended after the body.
    let mut seq: Vec<(&Component, f64)> = Vec::new();
    let mut cur = pod_axial;
    for c in &pod.children {
        let cl = c.length();
        seq.push((c, cur));
        if let Component::BodyTube(b) = c {
            let (bstart, blen) = (cur, b.length);
            let mut ncur = bstart;
            for g in &b.children {
                let gc = g.common();
                let gl = g.length();
                let gs = match gc.axial_method {
                    AxialMethod::Bottom => bstart + blen - gl + gc.axial_offset,
                    AxialMethod::Top => bstart + gc.axial_offset,
                    AxialMethod::Middle => {
                        bstart + (blen - gl) / 2.0 + gc.axial_offset
                    }
                    AxialMethod::Absolute => gc.axial_offset,
                    AxialMethod::After => ncur,
                };
                if matches!(gc.axial_method, AxialMethod::After) {
                    ncur = gs + gl;
                }
                seq.push((g, gs));
            }
        }
        cur += cl;
    }
    let mut pod_r = 0.0_f64;
    let samp = |shape, p, x, rf, ra, l| shape_radius(shape, p, x, rf, ra, l);
    for (child, start) in seq {
        let common = child.common();
        match child {
            Component::NoseCone(n) => {
                let mut pts = Vec::with_capacity(PROFILE_SAMPLES + 1);
                for i in 0..=PROFILE_SAMPLES {
                    let xl = n.length * i as f64 / PROFILE_SAMPLES as f64;
                    // Flipped nose (tip aft) — e.g. a pod tail-cone.
                    let sx = if n.is_flipped { n.length - xl } else { xl };
                    pts.push([
                        start + xl,
                        samp(n.shape, n.shape_parameter, sx, 0.0, n.aft_radius, n.length),
                    ]);
                }
                let inner: Vec<[f64; 2]> =
                    pts.iter().map(|[x, r]| [*x, (r - n.thickness).max(0.0)]).collect();
                lathe.push(LatheProfile {
                    kind: "NoseCone".into(),
                    outer: pts,
                    inner,
                    cap_fore: n.is_flipped,
                    cap_aft: !n.is_flipped,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "NoseCone", doc),
                });
                pod_r = if n.is_flipped { 0.0 } else { n.aft_radius };
            }
            Component::Transition(t) => {
                let mut pts = Vec::with_capacity(PROFILE_SAMPLES + 1);
                for i in 0..=PROFILE_SAMPLES {
                    let xl = t.length * i as f64 / PROFILE_SAMPLES as f64;
                    pts.push([start + xl, samp(t.shape, t.shape_parameter, xl, t.fore_radius, t.aft_radius, t.length)]);
                }
                let inner: Vec<[f64; 2]> =
                    pts.iter().map(|[x, r]| [*x, (r - t.thickness).max(0.0)]).collect();
                lathe.push(LatheProfile {
                    kind: "Transition".into(),
                    outer: pts,
                    inner,
                    cap_fore: t.fore_radius > 1e-5,
                    cap_aft: true,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "Transition", doc),
                });
                pod_r = t.aft_radius;
            }
            Component::BodyTube(b) => {
                let r = b.radius.unwrap_or(pod_r.max(0.01));
                pod_r = r;
                let ir = (r - b.thickness).max(0.0);
                let x1 = start + b.length;
                lathe.push(LatheProfile {
                    kind: "BodyTube".into(),
                    outer: vec![[start, r], [x1, r]],
                    inner: vec![[start, ir], [x1, ir]],
                    cap_fore: true,
                    cap_aft: true,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "BodyTube", doc),
                });
            }
            Component::InnerTube(it) => {
                let x1 = start + it.length;
                lathe.push(LatheProfile {
                    kind: "InnerTube".into(),
                    outer: vec![[start, it.outer_radius], [x1, it.outer_radius]],
                    inner: vec![[start, it.inner_radius], [x1, it.inner_radius]],
                    cap_fore: true,
                    cap_aft: true,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "InnerTube", doc),
                });
            }
            Component::MassObject(m) if m.length > 0.0 && m.radius > 0.0 => {
                let outer = rounded_mass_profile(start, m.length, m.radius);
                let inner: Vec<[f64; 2]> = outer.iter().map(|[x, _]| [*x, 0.0]).collect();
                lathe.push(LatheProfile {
                    kind: "MassObject".into(),
                    outer,
                    inner,
                    cap_fore: false,
                    cap_aft: false,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "MassObject", doc),
                });
            }
            Component::FinSet(f) => {
                use opsrocket_core::component::FinShape;
                let outline: Vec<[f64; 2]> = match f.shape {
                    FinShape::Trapezoidal => Vec::new(),
                    FinShape::Freeform => f.points.clone(),
                    FinShape::Elliptical => (0..=32)
                        .map(|i| {
                            let th = std::f64::consts::PI * i as f64 / 32.0;
                            [0.5 * f.root_chord * (1.0 - th.cos()), f.height * th.sin()]
                        })
                        .collect(),
                };
                *max_radius = max_radius.max(radial + pod_r + f.height);
                fins.push(FinView {
                    axial_start: start,
                    root_chord: f.root_chord,
                    tip_chord: f.tip_chord,
                    sweep: f.sweep_length,
                    height: f.height,
                    count: f.fin_count,
                    body_radius: pod_r,
                    thickness: f.thickness,
                    cant_angle: f.cant_angle,
                    cross_section: match f.cross_section {
                        opsrocket_core::component::FinCrossSection::Square => "square",
                        opsrocket_core::component::FinCrossSection::Rounded => "rounded",
                        opsrocket_core::component::FinCrossSection::Airfoil => "airfoil",
                    }
                    .to_string(),
                    outline,
                    angle_offset: common.angle_offset,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "FinSet", doc),
                });
            }
            Component::LaunchLug(l) => {
                lugs.push(LugView {
                    axial_start: start,
                    length: l.length,
                    outer_radius: l.outer_radius,
                    body_radius: pod_r,
                    count: l.instance_count.max(1),
                    angle_offset: common.angle_offset,
                    radial,
                    radial_angle: angle,
                    mat: appearance_mat(common, "LaunchLug", doc),
                });
            }
            _ => {}
        }
    }
}

/// Build the geometry/component view from a parsed `.ork` document.
pub fn build_rocket_view(doc: &OrkDocument) -> RocketView {
    // Resolve "auto" dimensions (centering-ring radii, tube-fin radius, …)
    // exactly as the mass/aero paths do, so the rendered geometry matches
    // OpenRocket's resolved model instead of collapsing autos to zero.
    let rocket = opsrocket_sim::mass::resolve_auto_dimensions(&doc.rocket);
    let layout = opsrocket_sim::mass::iter_layout(&rocket);
    let mut components = Vec::new();
    let mut outline = Vec::new();
    let mut lathe = Vec::new();
    let mut fins = Vec::new();
    let mut lugs = Vec::new();
    let mut max_radius = 0.0_f64;

    // Carry the running outer radius so an auto-radius body tube (radius =
    // None, "same as previous") and surface-mounted parts (fins, lugs)
    // attach at the correct radius instead of collapsing to 0.
    let mut current_body_radius = 0.0_f64;

    for (comp, axial_start) in &layout {
        let common = comp.common();
        let length = comp.length();
        let kind = match comp {
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
            Component::PodSet(_) => "PodSet",
            Component::TubeFinSet(_) => "TubeFinSet",
        }
        .to_string();
        components.push(CompView {
            kind: kind.clone(),
            name: common.name.clone(),
            axial_start: *axial_start,
            length,
        });

        let mat = appearance_mat(common, &kind, doc);
        // Wall bore: outer profile shifted in by the wall thickness
        // (OpenRocket uses radius + offsetRadius, offsetRadius = -thickness).
        let bore = |outer: &[[f64; 2]], th: f64| -> Vec<[f64; 2]> {
            outer
                .iter()
                .map(|[x, r]| [*x, (r - th).max(0.0)])
                .collect()
        };
        match comp {
            Component::NoseCone(n) => {
                let mut pts = Vec::with_capacity(PROFILE_SAMPLES + 1);
                for i in 0..=PROFILE_SAMPLES {
                    let xl = length * i as f64 / PROFILE_SAMPLES as f64;
                    // OpenRocket draws a flipped nose cone rotated 180° (tip
                    // aft) — used for boat-tails / pod tail-cones. Reverse the
                    // radius profile so the base is fore and the tip is aft.
                    let sx = if n.is_flipped { length - xl } else { xl };
                    let r = shape_radius(
                        n.shape, n.shape_parameter, sx, 0.0, n.aft_radius, n.length,
                    );
                    max_radius = max_radius.max(r);
                    pts.push([axial_start + xl, r]);
                }
                current_body_radius = if n.is_flipped { 0.0 } else { n.aft_radius };
                outline.push(Shape2D { kind: kind.clone(), points: pts.clone() });
                let inner = bore(&pts, n.thickness);
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    inner,
                    outer: pts,
                    cap_fore: n.is_flipped, // flipped: open base ring is fore
                    cap_aft: !n.is_flipped, // normal: open base aft; flipped: tip aft
                    mat: mat.clone(),
                });
                // Aft shoulder: a short plug-tube inside the next body tube.
                if n.aft_shoulder_length > 0.0 && n.aft_shoulder_radius > 0.0 {
                    let x0 = axial_start + length;
                    let r = n.aft_shoulder_radius;
                    let ir = if n.aft_shoulder_capped {
                        0.0
                    } else {
                        (r - n.aft_shoulder_thickness).max(0.0)
                    };
                    lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                        kind: "Shoulder".into(),
                        outer: vec![[x0, r], [x0 + n.aft_shoulder_length, r]],
                        inner: vec![[x0, ir], [x0 + n.aft_shoulder_length, ir]],
                        cap_fore: true,
                        cap_aft: true,
                        mat: mat.clone(),
                    });
                }
            }
            Component::Transition(t) => {
                let mut pts = Vec::with_capacity(PROFILE_SAMPLES + 1);
                for i in 0..=PROFILE_SAMPLES {
                    let xl = length * i as f64 / PROFILE_SAMPLES as f64;
                    let r = body_local_radius(comp, xl);
                    max_radius = max_radius.max(r);
                    pts.push([axial_start + xl, r]);
                }
                current_body_radius = t.aft_radius;
                outline.push(Shape2D { kind: kind.clone(), points: pts.clone() });
                let inner = bore(&pts, t.thickness);
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    inner,
                    outer: pts,
                    cap_fore: t.fore_radius > 1e-5,
                    cap_aft: true,
                    mat,
                });
            }
            Component::BodyTube(b) => {
                // None = inherit the predecessor's aft radius.
                let r = b.radius.unwrap_or(current_body_radius);
                current_body_radius = r;
                max_radius = max_radius.max(r);
                let ir = (r - b.thickness).max(0.0);
                let x1 = axial_start + length;
                outline.push(Shape2D {
                    kind: kind.clone(),
                    points: vec![[*axial_start, r], [x1, r]],
                });
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    outer: vec![[*axial_start, r], [x1, r]],
                    inner: vec![[*axial_start, ir], [x1, ir]],
                    cap_fore: true,
                    cap_aft: true,
                    mat,
                });
            }
            Component::InnerTube(it) => {
                let x1 = axial_start + it.length;
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    outer: vec![[*axial_start, it.outer_radius], [x1, it.outer_radius]],
                    inner: vec![[*axial_start, it.inner_radius], [x1, it.inner_radius]],
                    cap_fore: true,
                    cap_aft: true,
                    mat,
                });
            }
            Component::CenteringRing(cr) => {
                let x1 = axial_start + cr.length.max(1e-4);
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    outer: vec![[*axial_start, cr.outer_radius], [x1, cr.outer_radius]],
                    inner: vec![[*axial_start, cr.inner_radius], [x1, cr.inner_radius]],
                    cap_fore: true,
                    cap_aft: true,
                    mat,
                });
            }
            Component::FinSet(f) => {
                let br = current_body_radius;
                max_radius = max_radius.max(br + f.height);
                use opsrocket_core::component::FinShape;
                let outline: Vec<[f64; 2]> = match f.shape {
                    FinShape::Trapezoidal => Vec::new(),
                    FinShape::Freeform => f.points.clone(),
                    FinShape::Elliptical => {
                        // Half-ellipse: (0,0) → (root/2, height) → (root,0).
                        let n = 32;
                        (0..=n)
                            .map(|i| {
                                let th = std::f64::consts::PI * i as f64 / n as f64;
                                [
                                    0.5 * f.root_chord * (1.0 - th.cos()),
                                    f.height * th.sin(),
                                ]
                            })
                            .collect()
                    }
                };
                fins.push(FinView {
                    radial: 0.0, radial_angle: 0.0,
                    axial_start: *axial_start,
                    root_chord: f.root_chord,
                    tip_chord: f.tip_chord,
                    sweep: f.sweep_length,
                    height: f.height,
                    count: f.fin_count,
                    body_radius: br,
                    thickness: f.thickness,
                    cant_angle: f.cant_angle,
                    outline,
                    angle_offset: common.angle_offset,
                    cross_section: match f.cross_section {
                        opsrocket_core::component::FinCrossSection::Square => "square",
                        opsrocket_core::component::FinCrossSection::Rounded => "rounded",
                        opsrocket_core::component::FinCrossSection::Airfoil => "airfoil",
                    }
                    .to_string(),
                    mat,
                });
            }
            Component::LaunchLug(l) => {
                max_radius = max_radius.max(current_body_radius + 2.0 * l.outer_radius);
                lugs.push(LugView {
                    radial: 0.0, radial_angle: 0.0,
                    axial_start: *axial_start,
                    length: l.length,
                    outer_radius: l.outer_radius,
                    body_radius: current_body_radius,
                    count: l.instance_count.max(1),
                    angle_offset: common.angle_offset,
                    mat,
                });
            }
            // Internal soft parts — a rounded "pill" like OpenRocket's
            // MassObjectRenderer (radius 0 at the ends, full in the middle).
            Component::MassObject(m) if m.length > 0.0 && m.radius > 0.0 => {
                let outer = rounded_mass_profile(*axial_start, m.length, m.radius);
                let inner: Vec<[f64; 2]> =
                    outer.iter().map(|[x, _]| [*x, 0.0]).collect();
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    outer,
                    inner,
                    cap_fore: false,
                    cap_aft: false,
                    mat,
                });
            }
            Component::Parachute(p) if p.packed_length > 0.0 && p.packed_radius > 0.0 => {
                let outer =
                    rounded_mass_profile(*axial_start, p.packed_length, p.packed_radius);
                let inner: Vec<[f64; 2]> =
                    outer.iter().map(|[x, _]| [*x, 0.0]).collect();
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    outer,
                    inner,
                    cap_fore: false,
                    cap_aft: false,
                    mat,
                });
            }
            Component::ShockCord(sc) if sc.packed_length > 0.0 && sc.packed_radius > 0.0 => {
                let outer = rounded_mass_profile(
                    *axial_start,
                    sc.packed_length,
                    sc.packed_radius,
                );
                let inner: Vec<[f64; 2]> =
                    outer.iter().map(|[x, _]| [*x, 0.0]).collect();
                lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
                    kind: kind.clone(),
                    outer,
                    inner,
                    cap_fore: false,
                    cap_aft: false,
                    mat,
                });
            }
            Component::PodSet(pod) => {
                let n = pod.instance_count.max(1);
                let host_r = current_body_radius;
                // OpenRocket RadiusPositionable.getBoundingRadius(): the pod
                // assembly's max structural radius (its largest tube/cone).
                let pod_br = pod
                    .children
                    .iter()
                    .map(|c| match c {
                        Component::NoseCone(x) => x.aft_radius,
                        Component::Transition(x) => x.fore_radius.max(x.aft_radius),
                        Component::BodyTube(x) => x.radius.unwrap_or(0.0),
                        Component::InnerTube(x) => x.outer_radius,
                        _ => 0.0,
                    })
                    .fold(0.0_f64, f64::max);
                // RadiusMethod (RadiusMethod.java): RELATIVE = offset +
                // parentOuterR + podBoundingR; SURFACE = parentOuterR +
                // podBoundingR; FREE/ABSOLUTE = offset; COAXIAL = 0.
                let radial = match pod.radius_method.as_str() {
                    "surface" => host_r + pod_br,
                    "free" | "absolute" => pod.radius_offset,
                    "coaxial" => 0.0,
                    _ => pod.radius_offset + host_r + pod_br, // relative
                };
                for i in 0..n {
                    let angle = pod.common.angle_offset
                        + i as f64 * std::f64::consts::TAU / n as f64;
                    emit_pod(
                        pod,
                        *axial_start,
                        radial,
                        angle,
                        doc,
                        &mut lathe,
                        &mut fins,
                        &mut lugs,
                        &mut max_radius,
                    );
                }
            }
            Component::TubeFinSet(tf) => {
                // OpenRocket ComponentRenderer.renderTubeFins: each of the
                // `fin_count` tubes is a cylinder (outer r, inner r−t) of
                // `length`, instanced about the axis and translated out by
                // its own outer radius so its inner wall is tangent to the
                // airframe (centre at body_radius + r).
                let br = current_body_radius;
                let r = tf.outer_radius.unwrap_or(br).max(1e-4);
                let ir = (r - tf.thickness).max(0.0);
                let x1 = *axial_start + tf.length;
                let n = tf.fin_count.max(1);
                max_radius = max_radius.max(br + 2.0 * r);
                for i in 0..n {
                    let angle = common.angle_offset
                        + i as f64 * std::f64::consts::TAU / n as f64;
                    lathe.push(LatheProfile {
                        kind: "TubeFinSet".into(),
                        outer: vec![[*axial_start, r], [x1, r]],
                        inner: vec![[*axial_start, ir], [x1, ir]],
                        cap_fore: true,
                        cap_aft: true,
                        radial: br + r,
                        radial_angle: angle,
                        mat: mat.clone(),
                    });
                }
            }
            _ => {}
        }
    }

    // Motor(s): OpenRocket draws the loaded motor as a cylinder with a
    // short fore taper and an aft nozzle, inside its mount tube. We size it
    // to the mount bore and the default flight configuration's assignment.
    let default_cfg = rocket.default_config.clone().or_else(|| {
        rocket.configurations.first().map(|c| c.config_id.clone())
    });
    for (comp, axial_start) in &layout {
        let (mm, mount_len, bore_r) = match comp {
            Component::BodyTube(b) => match &b.motor_mount {
                Some(mm) => (mm, b.length, b.radius.unwrap_or(0.0) - b.thickness),
                None => continue,
            },
            Component::InnerTube(it) => match &it.motor_mount {
                Some(mm) => (mm, it.length, it.inner_radius),
                None => continue,
            },
            _ => continue,
        };
        if bore_r <= 1e-5 {
            continue;
        }
        let assign = mm
            .motors
            .iter()
            .find(|a| {
                default_cfg
                    .as_deref()
                    .map(|c| c == a.config_id)
                    .unwrap_or(false)
            })
            .or_else(|| mm.motors.iter().find(|a| a.designation.is_some()))
            .or_else(|| mm.motors.first());
        let Some(assign) = assign else { continue };
        let desig = assign.designation.clone().unwrap_or_default();
        // Motor fills the mount bore; length = mount length (motors are
        // sized to their mount). Aft end protrudes by the overhang.
        let r = (bore_r - 0.0003).max(1e-4);
        let aft = *axial_start + mount_len + mm.overhang;
        let len = mount_len.max(1e-3);
        let fore = aft - len;
        max_radius = max_radius.max(r);
        // body + short fore taper (1/8) + aft nozzle contraction.
        let nose = (len * 0.12).min(r);
        let outer = vec![
            [fore, 0.0],
            [fore + nose, r],
            [aft - r * 0.6, r],
            [aft, r * 0.55],
        ];
        let motor_mat = Mat {
            color: [220, 220, 220, 255],
            shine: 0.4,
            decal: Some(default_decal(motor_texture(&desig))),
            default_color: [220, 220, 220, 255],
            default_shine: 0.4,
            default_decal: Some(default_decal(motor_texture(&desig))),
            translucent_unfinished: false,
            figure_color: [77, 77, 77],
        };
        lathe.push(LatheProfile {
                    radial: 0.0, radial_angle: 0.0,
            kind: "Motor".into(),
            inner: outer.iter().map(|[x, _]| [*x, 0.0]).collect(),
            outer,
            cap_fore: true,
            cap_aft: true,
            mat: motor_mat,
        });
    }

    let s = stability(doc);
    RocketView {
        name: doc.rocket.name.clone(),
        designer: doc.rocket.designer.clone(),
        total_length: doc.rocket.total_length(),
        max_radius,
        components,
        outline,
        lathe,
        fins,
        lugs,
        cg_axial: s.cg_cm / 100.0,
        cp_axial: s.cp_cm / 100.0,
        simulations: doc.simulations.iter().map(|s| s.name.clone()).collect(),
    }
}

/// Run a flight simulation and reduce it to the columns the chart needs.
pub fn run_flight(
    doc: &OrkDocument,
    sim_name: Option<&str>,
    motors_dir: Option<&std::path::Path>,
) -> Result<FlightData, String> {
    let name = sim_name
        .map(|s| s.to_string())
        .or_else(|| doc.simulations.first().map(|s| s.name.clone()))
        .ok_or_else(|| "no simulations in this .ork".to_string())?;
    let r = opsrocket_sim::engine::simulate_with(doc, &name, motors_dir)
        .map_err(|e| e.to_string())?;

    let mut time = Vec::with_capacity(r.rows.len());
    let mut altitude = Vec::with_capacity(r.rows.len());
    let mut velocity = Vec::with_capacity(r.rows.len());
    let mut thrust = Vec::with_capacity(r.rows.len());
    for row in &r.rows {
        time.push(row[0]);
        altitude.push(row[1]);
        velocity.push(row[4]);
        thrust.push(row[29]);
    }
    Ok(FlightData {
        time,
        altitude,
        velocity,
        thrust,
        apogee: r.max_altitude,
        time_to_apogee: r.time_to_apogee,
        flight_time: r.flight_time,
        ground_hit_velocity: r.ground_hit_velocity,
        events: r.events.clone(),
    })
}
