# Porting notes

This document records non-obvious decisions and Java→Rust mappings.

## File format origin

The `.ork` file is a ZIP archive containing `rocket.ork` (XML) and an optional
`decals/` directory. Upstream reference: `info.openrocket.core.file.openrocket`
in the Java codebase.

## Flight data columns

The 56 default flight-data columns and their ordering come from
`info.openrocket.core.simulation.FlightDataType`. OpsRocket emits the same
columns in the same order so CSV diffs against OpenRocket reference output
work directly.

The canonical column list (from a representative `.ork`'s `<databranch types="…">`
attribute) is:

```
Time, Altitude, Altitude above sea level, Vertical velocity, Total velocity,
Vertical acceleration, Total acceleration, Position East of launch,
Position North of launch, Lateral distance, Lateral direction, Lateral velocity,
Lateral acceleration, Latitude, Longitude, Angle of attack, Roll rate,
Pitch rate, Yaw rate, Vertical orientation (zenith), Lateral orientation (azimuth),
Mass, Motor mass, Longitudinal moment of inertia, Rotational moment of inertia,
Gravitational acceleration, CP location, CG location, Stability margin calibers,
Thrust, Thrust-to-weight ratio, Drag force, Drag coefficient,
Friction drag coefficient, Pressure drag coefficient, Base drag coefficient,
Axial drag coefficient, Normal force coefficient, Pitch moment coefficient,
Yaw moment coefficient, Side force coefficient, Roll moment coefficient,
Roll forcing coefficient, Roll damping coefficient, Pitch damping coefficient,
Wind velocity, Wind direction, Air temperature, Air pressure, Air density,
Speed of sound, Mach number, Reynolds number, Reference length, Reference area,
Simulation time step, Computation time, Coriolis acceleration
```

## Reference implementation

Numerical references during the port:

- **Barrowman aerodynamics**: `info.openrocket.core.aerodynamics.barrowman.*`
  + Sampo Niskanen, *Development of an Open Source model rocket simulation
    software* (MSc thesis, 2009).
- **RK4 integrator**: `info.openrocket.core.simulation.RK4SimulationStepper`.
- **Event engine**: `info.openrocket.core.simulation.BasicEventSimulationEngine`.
- **Atmosphere**: `info.openrocket.core.models.atmosphere.ExtendedISAModel`.

## Coordinate system

OpenRocket uses a body-fixed coordinate system where +X is forward (out the
nose), +Y is right, +Z is down (or, more precisely, the rocket's chosen
"down" relative to its initial vertical orientation). OpsRocket preserves
this convention. See `opsrocket-core::geom::Coord`.

## Floating-point parity

We target relative error ≤ 1e-6 vs. Java reference outputs over a single
flight. Larger errors are accepted only when traced to documented Java
quirks (e.g. `StrictMath` vs. JIT-optimized trig); these are noted inline.
