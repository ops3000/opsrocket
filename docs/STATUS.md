# OpsRocket — Status

Snapshot of where the Rust rewrite of OpenRocket's `core` stands at the end
of the initial scaffolding pass.

## What works today

| Subsystem | State |
|---|---|
| Cargo workspace (`opsrocket-core` / `-io` / `-sim` / `-cli` / `-tests`) | builds clean, no warnings remaining besides intentional ones |
| Geometry primitives (`Coord`, `Vec3`, weighted-CG average) | ✅ tested |
| ISA / ExtendedISA atmosphere model (≤ 32 km) | ✅ tested vs. published tables |
| Material model (bulk / surface / line) parsed from `<material>` attributes | ✅ |
| Rocket component tree (NoseCone / BodyTube / Transition / InnerTube / FinSet / MassObject / Parachute) | ✅ enough for canonical examples |
| `.ork` reader (zip + XML, 17/17 example fixtures parse) | ✅ |
| Embedded `<datapoint>` cached flight data extractor | ✅ used as golden reference |
| Motor `.eng` (RASP) loader | ✅, with fixture motors for A8 / B6 / C6 / D12 / E12 |
| Mass / CG / moments-of-inertia computation | ✅ closed-form for canonical shapes |
| Barrowman aerodynamic coefficients (NoseCone / Tube / Transition / Fins) | ✅ — CN_α and CP_axial; drag (friction + pressure + base) — calibration TBD |
| 3-DOF + pitch RK4 propagator with mass loss, drag, thrust, on-rail constraint | ✅ |
| Event queue (Launch / Ignition / Burnout / Apogee / GroundHit / …) | ✅ basic ordering |
| Top-level engine: launch → apogee → recovery deployment → ground hit | ✅ for single-stage |
| CLI: `opsrocket simulate / inspect / dump-reference` | ✅ |
| Regression harness comparing Rust output to cached `<datapoint>` reference | ✅ scoreboard mode (records per-column max-error) |
| Ports of `BarrowmanCalculatorTest` / `FinSetCalcTest` / `FlightEventsTest` / `RK6AccumulationBugTest` | ✅ 9 tests passing |

`cargo test --workspace` → **27 passing tests** (0 failing).

## End-to-end demo

```
$ cargo run -q -p opsrocket-cli -- simulate \
    "tests/fixtures/examples/A simple model rocket.ork" \
    --motors-dir tests/fixtures/motors --csv /tmp/sim.csv
```

Yields 58-column flight data in OpenRocket's exact CSV column order
(see `docs/PORTING_NOTES.md`).

| Metric | Java reference (cached in .ork) | OpsRocket |
|---|---|---|
| max altitude | 50.6 m | 76.9 m |
| time to apogee | 3.48 s | 3.90 s |
| ground-hit velocity | 4.68 m/s | 3.81 m/s |
| flight time | 15.9 s | 24.4 s |

The shape of the trace is correct (boost-coast-apogee-descent); absolute
values diverge by ~30% because the Barrowman drag and the parachute drag
coefficients are still calibration-rough.

## What's stubbed or not yet covered

- **6-DOF rotational dynamics, roll, fin damping** — current propagator is
  3-DOF + simple pitch (no orientation quaternion).
- **Transonic / supersonic drag corrections** — subsonic only.
- **Multi-stage flight, staging events, clustering** — engine assumes one
  active motor.
- **Wind shear / turbulence / atmospheric overrides** — single constant
  average wind vector.
- **`.ork` writer** — read-only for now.
- **Drag-calibration loop** — friction / pressure / base-drag coefficients
  need tuning against the cached reference; the regression harness is the
  feedback mechanism.

## Fixture-by-fixture sim coverage

Out of the 17 upstream example rockets:

- **8** simulate to a complete boost-apogee-descent profile (those whose
  motors are in the fixture motor library: Estes A8 / B6 / C6 / D12 / E12).
- **9** require motor types (G, H, I, F-class composite) or multi-stage
  support not yet in scope and exit early after the on-rail timeout.

All 17 parse successfully and produce the expected component tree.

## Recommended next steps

1. **Drag calibration** — diff the cached reference vs. simulator output for
   the `A simple model rocket` fixture column-by-column and tighten the
   pressure / base / friction coefficients until the regression test can be
   flipped from "scoreboard" to "enforce".
2. **Add more motor fixtures** — Apogee / Aerotech composites for the
   high-power examples (or wire up a real `.rse` / SQLite database).
3. **Multi-stage engine** — port `BasicEventSimulationEngine`'s stage-
   separation handling; needed for `Two stage high power rocket.ork`.
4. **Full 6-DOF** — port the `RK4SimulationStepper` rotational state with a
   quaternion attitude. This is the prerequisite for matching Java's
   per-row attitude / roll-rate columns.
5. **`.ork` writer** — round-trip test against the parser.
