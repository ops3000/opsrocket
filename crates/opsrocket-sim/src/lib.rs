//! Simulation engine.
//!
//! Stages of the pipeline:
//! - `mass`  : compute total mass, CG, and moments of inertia for a rocket
//!             plus optionally-loaded motor.
//! - `aero`  : Barrowman aerodynamic coefficients (CN_alpha, CP, drag).
//! - `flight`: 6-DOF state vector and RK4 propagator.
//! - `engine`: high-level driver that walks a flight from launch to landing,
//!             handling events (burnout, apogee, recovery deployment).

pub mod aero;
pub mod aero_drag;
pub mod engine;
pub mod events;
pub mod flight;
pub mod mass;
pub mod output;

pub use engine::{SimulationOptions, SimulationResult, simulate};
pub use output::{FLIGHT_DATA_COLUMNS, write_csv};
