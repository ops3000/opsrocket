//! Flight-data output (CSV format compatible with OpenRocket reference dumps).

use std::io::Write;

use crate::engine::SimulationResult;

/// Column names matching OpenRocket's default `FlightDataType` ordering.
/// See `docs/PORTING_NOTES.md` for the canonical 58-column list and its
/// source in upstream `FlightDataType.java`.
pub const FLIGHT_DATA_COLUMNS: &[&str] = &[
    "Time",
    "Altitude",
    "Altitude above sea level",
    "Vertical velocity",
    "Total velocity",
    "Vertical acceleration",
    "Total acceleration",
    "Position East of launch",
    "Position North of launch",
    "Lateral distance",
    "Lateral direction",
    "Lateral velocity",
    "Lateral acceleration",
    "Latitude",
    "Longitude",
    "Angle of attack",
    "Roll rate",
    "Pitch rate",
    "Yaw rate",
    "Vertical orientation (zenith)",
    "Lateral orientation (azimuth)",
    "Mass",
    "Motor mass",
    "Longitudinal moment of inertia",
    "Rotational moment of inertia",
    "Gravitational acceleration",
    "CP location",
    "CG location",
    "Stability margin calibers",
    "Thrust",
    "Thrust-to-weight ratio",
    "Drag force",
    "Drag coefficient",
    "Friction drag coefficient",
    "Pressure drag coefficient",
    "Base drag coefficient",
    "Axial drag coefficient",
    "Normal force coefficient",
    "Pitch moment coefficient",
    "Yaw moment coefficient",
    "Side force coefficient",
    "Roll moment coefficient",
    "Roll forcing coefficient",
    "Roll damping coefficient",
    "Pitch damping coefficient",
    "Wind velocity",
    "Wind direction",
    "Air temperature",
    "Air pressure",
    "Air density",
    "Speed of sound",
    "Mach number",
    "Reynolds number",
    "Reference length",
    "Reference area",
    "Simulation time step",
    "Computation time",
    "Coriolis acceleration",
];

/// Write a simulation result as CSV.
pub fn write_csv<W: Write>(out: &mut W, result: &SimulationResult) -> std::io::Result<()> {
    writeln!(out, "{}", FLIGHT_DATA_COLUMNS.join(","))?;
    for row in &result.rows {
        let line: Vec<String> = row
            .iter()
            .map(|v| {
                if v.is_nan() {
                    "NaN".to_string()
                } else {
                    format!("{}", v)
                }
            })
            .collect();
        writeln!(out, "{}", line.join(","))?;
    }
    Ok(())
}
