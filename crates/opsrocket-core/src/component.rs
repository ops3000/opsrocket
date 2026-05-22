//! Rocket component data model.
//!
//! This is a Rust port of `info.openrocket.core.rocketcomponent.*`.
//!
//! The Java implementation uses deep inheritance hierarchies
//! (`RocketComponent` → `ExternalComponent` → `SymmetricComponent` →
//! `BodyTube`, `NoseCone`, `Transition`; etc.). Rust replaces this with
//! enums that hold the per-kind data plus a small `Common` block of fields
//! shared across all components. This makes pattern-matching exhaustive,
//! avoids dyn-trait downcasts at every aerodynamic-coefficient call site,
//! and serialises cleanly via serde.
//!
//! At this stage only the fields required for mass-property and Barrowman
//! aerodynamic computation are modeled. Cosmetic data (paint, decals, comments)
//! is round-tripped through the I/O layer but not represented here.

use crate::material::Material;
use serde::{Deserialize, Serialize};

/// Stable identifier for a component within a rocket.
///
/// Mirrors the upstream `<id>UUID</id>` in `.ork` files. Kept as a free-form
/// string rather than `uuid::Uuid` so we can round-trip non-conforming ids
/// from third-party tools without lossy normalisation.
#[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
pub struct ComponentId(pub String);

impl ComponentId {
    pub fn new(s: impl Into<String>) -> Self {
        Self(s.into())
    }
}

/// How a child component is positioned along its parent's axis.
#[derive(Debug, Clone, Copy, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum AxialMethod {
    /// Absolute distance from rocket origin.
    Absolute,
    /// Offset from the top of the parent component.
    Top,
    /// Offset from the bottom (aft) of the parent.
    Bottom,
    /// Position is measured from the center of the parent.
    Middle,
    /// Component is placed immediately after the previous sibling.
    After,
}

impl Default for AxialMethod {
    fn default() -> Self {
        AxialMethod::After
    }
}

/// Visual appearance (OpenRocket `<appearance>`): surface paint colour,
/// gloss, and an optional decal image name. Drives the 3D "Finished" view.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Appearance {
    /// sRGB paint colour, RGBA 0..=255.
    pub paint: [u8; 4],
    /// Gloss 0 (matte) .. 1 (mirror).
    pub shine: f64,
    /// Decal (texture) applied over the paint, if any.
    #[serde(default)]
    pub decal: Option<Decal>,
}

/// A decal: an image from the `.ork` archive mapped onto the surface,
/// with OpenRocket's center / offset / scale / rotation transform.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Decal {
    /// Archive path, e.g. `decals/BodyStripe.png`.
    pub name: String,
    pub rotation: f64,
    pub edge_mode: String,
    pub center: [f64; 2],
    pub offset: [f64; 2],
    pub scale: [f64; 2],
}

/// Fields shared by every component.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Common {
    pub id: ComponentId,
    pub name: String,
    pub axial_method: AxialMethod,
    pub axial_offset: f64,
    /// Angular position about the rocket axis (radians). From OpenRocket
    /// `<angleoffset>` (fin sets, pods) or `<radialdirection>` (launch lugs,
    /// rail buttons). Drives where the part sits in the 3D view.
    #[serde(default)]
    pub angle_offset: f64,
    /// Override flags - if any are set, the explicit override value is used
    /// instead of the computed value.
    #[serde(default)]
    pub mass_override: Option<f64>,
    #[serde(default)]
    pub cg_override: Option<f64>,
    /// `<overridesubcomponentsmass>`: when true, `mass_override` replaces
    /// the mass of this component AND its entire subtree (children then
    /// contribute nothing). OpenRocket assembly-level mass override.
    #[serde(default)]
    pub override_subcomponents_mass: bool,
    /// `<overridecd>` — explicit drag-coefficient override (referenced to the
    /// rocket reference area). `None` ⇒ compute the CD from geometry.
    #[serde(default)]
    pub cd_override: Option<f64>,
    /// `<overridesubcomponentscd>` — the CD override also applies to the
    /// whole subtree (children's computed CD is suppressed).
    #[serde(default)]
    pub override_subcomponents_cd: bool,
    /// `<finish>` surface roughness (drives skin-friction). Default Normal.
    #[serde(default)]
    pub finish: Finish,
    /// Material the component is made of. May be `None` for assemblies that
    /// have no intrinsic mass.
    #[serde(default)]
    pub material: Option<Material>,
    #[serde(default)]
    pub appearance: Option<Appearance>,
    /// Free-text comment (the OpenRocket dialog's "Comment" tab). Round-trips
    /// through the .ork as `<comment>…</comment>`.
    #[serde(default)]
    pub comment: String,
}

impl Common {
    pub fn new(id: impl Into<String>, name: impl Into<String>) -> Self {
        Self {
            id: ComponentId::new(id),
            name: name.into(),
            axial_method: AxialMethod::After,
            axial_offset: 0.0,
            angle_offset: 0.0,
            mass_override: None,
            cg_override: None,
            override_subcomponents_mass: false,
            cd_override: None,
            override_subcomponents_cd: false,
            finish: Finish::Normal,
            material: None,
            appearance: None,
            comment: String::new(),
        }
    }
}

impl Default for Common {
    fn default() -> Self {
        Self::new("", "")
    }
}

/// Surface finish — `info.openrocket.core.rocketcomponent.ExternalComponent.Finish`.
/// `roughness_size()` returns the value in metres (drives the
/// roughness-limited skin-friction coefficient).
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum Finish {
    Rough,
    RoughUnfinished,
    Unfinished,
    #[default]
    Normal,
    Smooth,
    Optimum,
    Polished,
    FinishPolished,
    Mirror,
}

impl Finish {
    /// `Finish.getRoughnessSize()` (metres).
    pub fn roughness_size(self) -> f64 {
        match self {
            Finish::Rough => 500.0e-6,
            Finish::RoughUnfinished => 250.0e-6,
            Finish::Unfinished => 150.0e-6,
            Finish::Normal => 60.0e-6,
            Finish::Smooth => 20.0e-6,
            Finish::Optimum => 5.0e-6,
            Finish::Polished => 2.0e-6,
            Finish::FinishPolished => 0.5e-6,
            Finish::Mirror => 0.0e-6,
        }
    }

    /// Parse the `.ork` `<finish>` text.
    pub fn from_ork(s: &str) -> Self {
        match s.trim().to_lowercase().as_str() {
            "rough" => Finish::Rough,
            "roughunfinished" => Finish::RoughUnfinished,
            "unfinished" => Finish::Unfinished,
            "smooth" => Finish::Smooth,
            "optimum" => Finish::Optimum,
            "polished" => Finish::Polished,
            "finishpolished" => Finish::FinishPolished,
            "mirror" => Finish::Mirror,
            _ => Finish::Normal,
        }
    }
}

/// Nose-cone profile shapes.
///
/// Matches `info.openrocket.core.rocketcomponent.Transition.Shape`.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum NoseShape {
    Conical,
    Ogive,
    Ellipsoid,
    Power,
    Parabolic,
    Haack,
}

/// Nose cone component.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct NoseCone {
    pub common: Common,
    pub shape: NoseShape,
    /// Shape parameter (e.g. ogive sharpness, Haack C). Ignored for conical / ellipsoid.
    pub shape_parameter: f64,
    pub length: f64,
    /// Aft (base) radius.
    pub aft_radius: f64,
    pub thickness: f64,
    #[serde(default)]
    pub aft_shoulder_radius: f64,
    #[serde(default)]
    pub aft_shoulder_length: f64,
    #[serde(default)]
    pub aft_shoulder_thickness: f64,
    #[serde(default)]
    pub aft_shoulder_capped: bool,
    #[serde(default)]
    pub is_flipped: bool,
    /// Solid (filled) vs hollow shell — `<filled>` in the .ork. A filled
    /// nose is the full solid-of-revolution mass, not a wall shell.
    #[serde(default)]
    pub filled: bool,
    /// Components mounted inside the nose (ballast/mass, electronics,
    /// recovery, …). OpenRocket nests these; they carry real mass.
    #[serde(default)]
    pub children: Vec<Component>,
}

/// Body tube component.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct BodyTube {
    pub common: Common,
    pub length: f64,
    /// Outer radius. If `None`, the tube auto-matches its predecessor's aft radius.
    #[serde(default)]
    pub radius: Option<f64>,
    pub thickness: f64,
    #[serde(default)]
    pub children: Vec<Component>,
    /// True if this tube acts as a motor mount.
    #[serde(default)]
    pub motor_mount: Option<MotorMount>,
}

/// Conical / transitional shoulder.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Transition {
    pub common: Common,
    pub shape: NoseShape,
    pub shape_parameter: f64,
    pub length: f64,
    pub fore_radius: f64,
    pub aft_radius: f64,
    pub thickness: f64,
    /// Solid (filled) vs hollow shell — `<filled>` in the .ork.
    #[serde(default)]
    pub filled: bool,
    /// Whether the shape is "clipped" — see OpenRocket Transition.isClipped.
    /// Currently informational; geometry uses the same shape integral.
    #[serde(default)]
    pub clipped: bool,
    // Fore shoulder (fits inside the upstream body tube). Mirrors NoseCone.aft_shoulder_*.
    #[serde(default)]
    pub fore_shoulder_radius: f64,
    #[serde(default)]
    pub fore_shoulder_length: f64,
    #[serde(default)]
    pub fore_shoulder_thickness: f64,
    #[serde(default)]
    pub fore_shoulder_capped: bool,
    // Aft shoulder (fits inside the downstream body tube).
    #[serde(default)]
    pub aft_shoulder_radius: f64,
    #[serde(default)]
    pub aft_shoulder_length: f64,
    #[serde(default)]
    pub aft_shoulder_thickness: f64,
    #[serde(default)]
    pub aft_shoulder_capped: bool,
    /// Nested components (couplers, mass, …) inside the transition.
    #[serde(default)]
    pub children: Vec<Component>,
}

/// Inner tube (engine block, coupler, motor mount, etc.).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct InnerTube {
    pub common: Common,
    pub length: f64,
    pub outer_radius: f64,
    pub inner_radius: f64,
    #[serde(default)]
    pub motor_mount: Option<MotorMount>,
    /// Nested components (engine block, centering rings, …) inside the
    /// motor-mount tube. OpenRocket carries these as children; they
    /// contribute structural mass and must be walked.
    #[serde(default)]
    pub children: Vec<Component>,
    /// Physical tube count from `<clusterconfiguration>` (1 = single,
    /// 3 = "3-ring", …). The whole inner-tube assembly is replicated.
    #[serde(default = "default_lug_count")]
    pub cluster_count: u32,
}

/// Generic point-mass component (lump of mass at a specified offset).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct MassObject {
    pub common: Common,
    pub length: f64,
    pub radius: f64,
    pub mass: f64,
}

/// Parachute component.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Parachute {
    pub common: Common,
    pub diameter: f64,
    /// Drag coefficient. `None` selects OpenRocket's default of 0.8.
    #[serde(default)]
    pub cd: Option<f64>,
    pub deploy_event: DeployEvent,
    #[serde(default)]
    pub deploy_altitude: f64,
    #[serde(default)]
    pub deploy_delay: f64,
    #[serde(default)]
    pub line_count: u32,
    #[serde(default)]
    pub line_length: f64,
    /// Material of the shroud lines (line-density). `None` falls back to
    /// the canopy material in legacy files where no separate line material
    /// is specified.
    #[serde(default)]
    pub line_material: Option<Material>,
    pub packed_length: f64,
    pub packed_radius: f64,
}

/// Shock cord component (separate from a generic mass object because its
/// mass is computed from the cord length and a line-density material).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ShockCord {
    pub common: Common,
    pub cord_length: f64,
    /// Packed bundle for rendering; not used for mass.
    pub packed_length: f64,
    pub packed_radius: f64,
}

/// Launch lug — a small tube glued to the body for the launch rod.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct LaunchLug {
    pub common: Common,
    pub length: f64,
    pub outer_radius: f64,
    pub inner_radius: f64,
    #[serde(default = "default_lug_count")]
    pub instance_count: u32,
}

fn default_lug_count() -> u32 { 1 }

/// Centering ring — a thin annulus joining an inner tube to a body tube.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CenteringRing {
    pub common: Common,
    pub length: f64,
    pub outer_radius: f64,
    pub inner_radius: f64,
    /// Wall thickness (m). Used by engine blocks / thickness-ring parts
    /// where the .ork gives `<thickness>` + `<outerradius>auto` instead of
    /// explicit inner/outer radii; inner = outer − thickness post-resolve.
    #[serde(default)]
    pub thickness: f64,
    /// Whether the .ork gave an explicit `<thickness>` tag. A tube coupler
    /// with `<thickness>0</thickness>` is a zero-wall tube (0 mass) — must
    /// be distinguished from a plain centering ring that has no thickness
    /// tag and instead derives its bore from the motor-mount tube.
    #[serde(default)]
    pub thickness_set: bool,
    #[serde(default = "default_lug_count")]
    pub instance_count: u32,
    /// Nested components (a tube coupler can carry bulkheads / mass
    /// components / etc. inside it). Empty for plain rings/bulkheads.
    #[serde(default)]
    pub children: Vec<Component>,
    /// True for `<bulkhead>` — a solid disc (inner radius 0), as opposed
    /// to a hollow ring/coupler.
    #[serde(default)]
    pub solid: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum DeployEvent {
    Launch,
    Ejection,
    Apogee,
    Altitude,
    LowerStageSeparation,
    Never,
}

/// A pod set: a sub-assembly (its own nose/body/fins) mounted radially off
/// the parent, instanced `instance_count` times evenly around the axis.
/// Mirrors OpenRocket `<podset>`.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct PodSet {
    pub common: Common,
    #[serde(default = "default_lug_count")]
    pub instance_count: u32,
    /// Radial offset value (m); meaning depends on `radius_method`.
    #[serde(default)]
    pub radius_offset: f64,
    /// OpenRocket RadiusMethod: "relative" (offset+parentR+podR),
    /// "surface" (parentR+podR), "free"/"absolute" (offset from axis),
    /// "coaxial" (0). Default RELATIVE.
    #[serde(default = "default_radius_method")]
    pub radius_method: String,
    /// True when this came from `<parallelstage>` rather than `<podset>`.
    /// Geometrically identical, but OpenRocket's figure palette differs
    /// (ParallelStage 198,163,184 vs PodSet 160,160,215).
    #[serde(default)]
    pub is_parallel_stage: bool,
    #[serde(default)]
    pub children: Vec<Component>,
}

fn default_radius_method() -> String {
    "relative".to_string()
}

/// Tube fin set — a ring of `fin_count` tubes around the body, each acting
/// as a stabilising surface. Mirrors OpenRocket `<tubefinset>`
/// (`TubeFinSet` / `ComponentRenderer.renderTubeFins`).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct TubeFinSet {
    pub common: Common,
    #[serde(default = "default_lug_count")]
    pub fin_count: u32,
    pub length: f64,
    /// Outer radius of each tube. `None` = "auto" (= parent body radius,
    /// the OpenRocket default — each tube the same size as the airframe).
    #[serde(default)]
    pub outer_radius: Option<f64>,
    pub thickness: f64,
}

/// Trapezoidal fin set (the only profile required for the canonical examples).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct FinSet {
    pub common: Common,
    pub fin_count: u32,
    pub root_chord: f64,
    pub tip_chord: f64,
    pub sweep_length: f64,
    pub height: f64,
    pub thickness: f64,
    pub cant_angle: f64,
    /// Fin cross-section shape (square / rounded / airfoil) - simple drag model.
    #[serde(default)]
    pub cross_section: FinCrossSection,
    /// Planform shape. Trapezoidal uses root/tip/sweep/height; Elliptical is
    /// a quarter-ellipse of root_chord × height; Freeform uses `points`.
    #[serde(default)]
    pub shape: FinShape,
    /// Freeform planform outline: (chordwise, spanwise) metres from the
    /// root leading edge, used only when `shape == Freeform`.
    #[serde(default)]
    pub points: Vec<[f64; 2]>,
    /// Root-tab rectangle (the part of the fin buried in the body tube).
    /// Adds `tab_length·tab_height·thickness·ρ` per fin to the mass.
    #[serde(default)]
    pub tab_length: f64,
    #[serde(default)]
    pub tab_height: f64,
    /// Root-fillet radius (m); a concave-cylinder fillet either side of
    /// each fin root. 0 = none.
    #[serde(default)]
    pub fillet_radius: f64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum FinShape {
    #[default]
    Trapezoidal,
    Elliptical,
    Freeform,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum FinCrossSection {
    #[default]
    Square,
    Rounded,
    Airfoil,
}

/// Motor mount metadata (attached to a body tube or inner tube).
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
pub struct MotorMount {
    pub overhang: f64,
    pub ignition_event: IgnitionEvent,
    pub ignition_delay: f64,
    /// Maps flight-configuration id -> motor designation.
    pub motors: Vec<MotorAssignment>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "snake_case")]
pub enum IgnitionEvent {
    #[default]
    Automatic,
    Launch,
    Burnout,
    Ejection,
    LowerStageSeparation,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct MotorAssignment {
    pub config_id: String,
    /// Motor designation (e.g. "Estes B6").
    pub designation: Option<String>,
    /// Manufacturer-assigned digest (`<digest>...</digest>`).
    pub digest: Option<String>,
    /// Ejection delay in seconds.
    pub ejection_delay: f64,
}

/// A polymorphic child of a stage / tube.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(tag = "kind", rename_all = "snake_case")]
pub enum Component {
    NoseCone(NoseCone),
    BodyTube(BodyTube),
    Transition(Transition),
    InnerTube(InnerTube),
    FinSet(FinSet),
    MassObject(MassObject),
    Parachute(Parachute),
    ShockCord(ShockCord),
    LaunchLug(LaunchLug),
    CenteringRing(CenteringRing),
    PodSet(PodSet),
    TubeFinSet(TubeFinSet),
}

impl Component {
    pub fn common(&self) -> &Common {
        match self {
            Component::NoseCone(c) => &c.common,
            Component::BodyTube(c) => &c.common,
            Component::Transition(c) => &c.common,
            Component::InnerTube(c) => &c.common,
            Component::FinSet(c) => &c.common,
            Component::MassObject(c) => &c.common,
            Component::Parachute(c) => &c.common,
            Component::ShockCord(c) => &c.common,
            Component::LaunchLug(c) => &c.common,
            Component::CenteringRing(c) => &c.common,
            Component::PodSet(c) => &c.common,
            Component::TubeFinSet(c) => &c.common,
        }
    }

    /// Axial length of this component (m).
    pub fn length(&self) -> f64 {
        match self {
            Component::NoseCone(c) => c.length,
            Component::BodyTube(c) => c.length,
            Component::Transition(c) => c.length,
            Component::InnerTube(c) => c.length,
            // OpenRocket's fin "length" is the chordwise planform extent
            // (FinSet.length). Trapezoidal/elliptical use the root chord;
            // freeform uses the point span (FreeformFinSet:
            // length = points[last].x - points[0].x). This drives axial
            // (After/Bottom) placement, so a freeform fin must report its
            // real chord or it collapses to length 0 at the parent's aft.
            Component::FinSet(c) => {
                if matches!(c.shape, FinShape::Freeform) && c.points.len() >= 2 {
                    let xs = c.points.iter().map(|p| p[0]);
                    let (mut lo, mut hi) = (f64::INFINITY, f64::NEG_INFINITY);
                    for x in xs {
                        lo = lo.min(x);
                        hi = hi.max(x);
                    }
                    (hi - lo).max(0.0)
                } else {
                    c.root_chord
                }
            }
            Component::MassObject(c) => c.length,
            Component::Parachute(c) => c.packed_length,
            Component::ShockCord(c) => c.packed_length,
            Component::LaunchLug(c) => c.length,
            Component::CenteringRing(c) => c.length,
            Component::PodSet(c) => c
                .children
                .iter()
                .filter(|x| {
                    matches!(
                        x,
                        Component::NoseCone(_)
                            | Component::BodyTube(_)
                            | Component::Transition(_)
                    )
                })
                .map(|x| x.length())
                .sum(),
            Component::TubeFinSet(c) => c.length,
        }
    }

    /// Outer radius at the aft end. Used by sibling auto-radius bodies.
    pub fn aft_radius(&self) -> Option<f64> {
        match self {
            Component::NoseCone(c) => Some(c.aft_radius),
            Component::BodyTube(c) => c.radius,
            Component::Transition(c) => Some(c.aft_radius),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "snake_case")]
pub enum SeparationEvent {
    /// Never separate (default for the sustainer stage).
    #[default]
    Never,
    /// Separate when the lower stage's motor burns out.
    Burnout,
    /// Separate when the lower stage's motor fires its ejection charge.
    Ejection,
    /// Separate when the upper stage's motor ignites.
    UpperIgnition,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
pub struct Stage {
    pub common: Common,
    pub children: Vec<Component>,
    /// When this stage separates from the one above it (i.e. drops below).
    /// Only meaningful for non-sustainer (booster) stages.
    #[serde(default)]
    pub separation_event: SeparationEvent,
    /// Optional delay after the separation event (s).
    #[serde(default)]
    pub separation_delay: f64,
}

pub type AxialStage = Stage;

/// Active flight configuration: which motor is loaded, which stages are active.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct FlightConfiguration {
    pub config_id: String,
    #[serde(default)]
    pub name: Option<String>,
    #[serde(default)]
    pub active_stages: Vec<u32>,
}

/// Top-level rocket.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Default)]
pub struct Rocket {
    pub name: String,
    pub designer: Option<String>,
    pub stages: Vec<Stage>,
    pub configurations: Vec<FlightConfiguration>,
    pub default_config: Option<String>,
    pub reference_type: ReferenceType,
    /// Explicit reference length / area for non-`maximum` modes.
    pub reference_length: Option<f64>,
    /// `Rocket.isPerfectFinish()` — selects the laminar/turbulent
    /// perfect-finish skin-friction branch. Default false.
    #[serde(default)]
    pub is_perfect_finish: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, Default)]
#[serde(rename_all = "lowercase")]
pub enum ReferenceType {
    /// Use the maximum body diameter as the reference length.
    #[default]
    Maximum,
    /// Use the nose cone base diameter.
    Nose,
    /// Use a user-supplied custom length.
    Custom,
}

impl Rocket {
    /// Iterate all components across all stages in order (top-down,
    /// depth-first). Useful for aero / mass roll-ups.
    pub fn iter_components(&self) -> impl Iterator<Item = &Component> {
        self.stages
            .iter()
            .flat_map(|s| iter_components_in(&s.children))
    }

    /// Find the maximum outer diameter across the rocket. Used as the
    /// reference area when `reference_type == Maximum`.
    pub fn max_diameter(&self) -> f64 {
        self.iter_components()
            .filter_map(|c| match c {
                Component::NoseCone(n) => Some(2.0 * n.aft_radius),
                Component::BodyTube(t) => t.radius.map(|r| 2.0 * r),
                Component::Transition(t) => Some(2.0 * t.aft_radius.max(t.fore_radius)),
                _ => None,
            })
            .fold(0.0, f64::max)
    }

    /// Sum total axial length (m) across the active stage(s) along the body.
    pub fn total_length(&self) -> f64 {
        self.stages
            .iter()
            .map(|s| {
                s.children
                    .iter()
                    .filter(|c| matches!(c, Component::NoseCone(_) | Component::BodyTube(_) | Component::Transition(_)))
                    .map(|c| c.length())
                    .sum::<f64>()
            })
            .sum()
    }
}

fn iter_components_in(slice: &[Component]) -> Box<dyn Iterator<Item = &Component> + '_> {
    Box::new(slice.iter().flat_map(|c| {
        let here = std::iter::once(c);
        let inner: Box<dyn Iterator<Item = &Component>> = match c {
            Component::BodyTube(t) => Box::new(iter_components_in(&t.children)),
            Component::PodSet(p) => Box::new(iter_components_in(&p.children)),
            _ => Box::new(std::iter::empty()),
        };
        here.chain(inner)
    }))
}

/// Anchor position of `child` (axial coordinate of the child's leading edge,
/// in metres from the rocket origin) given its predecessor sibling.
///
/// This duplicates the layout logic the OpenRocket Java side performs at
/// configuration time. It is intentionally narrow: only the fields we need
/// for aerodynamic CP calculation are honoured.
pub fn axial_position(
    parent_origin: f64,
    parent_length: f64,
    previous_aft: f64,
    child: &Component,
) -> f64 {
    let c = child.common();
    match c.axial_method {
        AxialMethod::Absolute => c.axial_offset,
        AxialMethod::Top => parent_origin + c.axial_offset,
        AxialMethod::Bottom => parent_origin + parent_length - child.length() - c.axial_offset,
        AxialMethod::Middle => parent_origin + 0.5 * (parent_length - child.length()) + c.axial_offset,
        AxialMethod::After => previous_aft + c.axial_offset,
    }
}
