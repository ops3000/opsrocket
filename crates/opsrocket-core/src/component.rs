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

/// Fields shared by every component.
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Common {
    pub id: ComponentId,
    pub name: String,
    pub axial_method: AxialMethod,
    pub axial_offset: f64,
    /// Override flags - if any are set, the explicit override value is used
    /// instead of the computed value.
    #[serde(default)]
    pub mass_override: Option<f64>,
    #[serde(default)]
    pub cg_override: Option<f64>,
    /// Material the component is made of. May be `None` for assemblies that
    /// have no intrinsic mass.
    #[serde(default)]
    pub material: Option<Material>,
}

impl Common {
    pub fn new(id: impl Into<String>, name: impl Into<String>) -> Self {
        Self {
            id: ComponentId::new(id),
            name: name.into(),
            axial_method: AxialMethod::After,
            axial_offset: 0.0,
            mass_override: None,
            cg_override: None,
            material: None,
        }
    }
}

impl Default for Common {
    fn default() -> Self {
        Self::new("", "")
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
    #[serde(default = "default_lug_count")]
    pub instance_count: u32,
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
        }
    }

    /// Axial length of this component (m).
    pub fn length(&self) -> f64 {
        match self {
            Component::NoseCone(c) => c.length,
            Component::BodyTube(c) => c.length,
            Component::Transition(c) => c.length,
            Component::InnerTube(c) => c.length,
            Component::FinSet(c) => c.root_chord,
            Component::MassObject(c) => c.length,
            Component::Parachute(c) => c.packed_length,
            Component::ShockCord(c) => c.packed_length,
            Component::LaunchLug(c) => c.length,
            Component::CenteringRing(c) => c.length,
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
