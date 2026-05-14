//! File I/O for OpsRocket.
//!
//! Currently implemented:
//! - `.ork` reader (zip + XML deserialisation into `opsrocket_core::Rocket`)
//! - cached `<datapoint>` flight-data extractor (used as golden reference
//!   by the regression test harness)
//! - RASP `.eng` thrust-curve parser
//!
//! Pending:
//! - `.ork` writer
//! - RockSim `.rse` thrust-curve parser

pub mod motor;
pub mod ork;
pub mod writer;

pub use motor::{ThrustCurve, ThrustPoint, parse_rasp};
pub use ork::{CachedSimulation, FlightDataPoint, OrkDocument, read_ork};
pub use writer::{render_xml, write_ork};
