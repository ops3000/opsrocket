//! Core data types for OpsRocket.
//!
//! This crate defines:
//! - geometry primitives (vector, coordinate, quaternion)
//! - unit conversions
//! - the rocket component data model
//! - the standard atmosphere model
//! - material descriptions
//!
//! It depends only on `nalgebra` and `serde` so it can be reused by both the
//! simulation engine and the I/O layer.

pub mod atmosphere;
pub mod component;
pub mod geom;
pub mod material;
pub mod mathx;
pub mod units;

pub use component::{
    AxialStage, BodyTube, ComponentId, FinSet, InnerTube, MassObject, NoseCone, NoseShape,
    Parachute, Rocket, Stage,
};
pub use geom::{Coord, Vec3};
