# OpsRocket

A Rust rewrite of the [OpenRocket](https://openrocket.info/) model rocket simulator core.

OpsRocket aims to reproduce the headless simulation pipeline of OpenRocket — `.ork`
file loading, Barrowman aerodynamic coefficients, mass properties, and
6-DOF flight propagation — with bit-for-bit-compatible numerical output (within
floating-point tolerance) so existing OpenRocket designs continue to simulate
identically.

This project is a third-party reimplementation. It is not affiliated with
OpenRocket. It is licensed under GPL-3.0-or-later, matching the upstream
project, and follows the same conventions for `.ork` file compatibility and
flight-data column ordering.

## Status

Phase 1 (data model, file I/O, motor database) and Phase 2 (headless
simulation engine) are under active development. The GUI (Phase 3) is out of
scope for this project — pair with the upstream Java GUI or build your own
frontend on top of the `opsrocket-sim` library.

## Workspace layout

```
crates/
  opsrocket-core/   geometry, units, rocket-component model, atmosphere
  opsrocket-io/     .ork (zip+XML) reader/writer, motor (.rse/.eng) loader
  opsrocket-sim/    mass, Barrowman aerodynamics, RK4 integrator, event engine
  opsrocket-cli/    `opsrocket simulate file.ork --csv out.csv`
  opsrocket-tests/  regression harness comparing against reference outputs
tests/fixtures/     example .ork files + golden CSV reference outputs
```

## Running tests

```
cargo test --workspace
```

## Comparing to OpenRocket reference output

Every `.ork` file from upstream OpenRocket contains the cached simulation
output as `<datapoint>` XML elements. `opsrocket-tests` extracts these and
compares them against OpsRocket's own simulation of the same file.

## Acknowledgements

Algorithms, file format, and numerical conventions ported from
[OpenRocket](https://github.com/openrocket/openrocket) by Sampo Niskanen and
the OpenRocket contributors. See `docs/PORTING_NOTES.md` for upstream
references.
