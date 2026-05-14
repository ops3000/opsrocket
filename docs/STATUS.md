# OpsRocket — Status

Snapshot of where the Rust rewrite of OpenRocket's `core` stands after
phase 1 + 2 + the post-MVP polish pass.

## What works today

| Subsystem | State |
|---|---|
| Cargo workspace (`opsrocket-core` / `-io` / `-sim` / `-cli` / `-tests`) | builds clean |
| Geometry primitives (`Coord`, `Vec3`, weighted-CG average) | ✅ tested |
| ISA / ExtendedISA atmosphere model (≤ 32 km) | ✅ tested vs. published tables |
| Material model (bulk / surface / line) parsed from `<material>` attributes | ✅ |
| Rocket component tree (NoseCone / BodyTube / Transition / InnerTube / FinSet / MassObject / Parachute / **ShockCord / LaunchLug / CenteringRing**) | ✅ full canonical set |
| Auto-resolved dimensions (centering ring radii inferred from neighbours) | ✅ |
| Nose cone aft-shoulder mass | ✅ |
| Parachute line + canopy mass with separate `<linematerial>` | ✅ |
| `.ork` reader (zip + XML, 17/17 example fixtures parse) | ✅ |
| `.ork` **writer** with round-trip tests (17/17 fixtures round-trip) | ✅ |
| Embedded `<datapoint>` cached flight-data extractor | ✅ |
| Motor `.eng` (RASP) loader | ✅ |
| Bundled motor fixtures (A8 / B6 / C6 / D12 / E12 / F50T / G40W / G80T / H148R / I115W / I59WN / I357T) | ✅ |
| Mass / CG / moments-of-inertia computation | ✅ closed-form |
| Barrowman aerodynamics (CN_α, CP, drag — friction / pressure / base) recomputed per time step with Mach-dependent terms | ✅ |
| **6-DOF flight propagator**: quaternion attitude, body-frame angular velocity, RK4 with pitching-moment dynamics and damping | ✅ |
| Parachute opening shock (drag area ramps up over 0.3 s after deployment) | ✅ |
| **Multi-stage simulation engine**: per-stage motors, burnout-triggered separation, per-stage attached mass | ✅ |
| Event queue (Launch / Ignition / Burnout / Apogee / Separation / GroundHit) | ✅ |
| CLI: `opsrocket simulate / inspect / dump-reference` | ✅ |
| Regression harness comparing Rust output to cached `<datapoint>` reference | ✅ |
| Ports of `BarrowmanCalculatorTest` / `FinSetCalcTest` / `FlightEventsTest` / `RK6AccumulationBugTest` | ✅ |

`cargo test --workspace` → **29 passing tests** (0 failing).

## Numerical fidelity (A simple model rocket vs. Java reference)

| Metric | Java reference | OpsRocket | gap |
|---|---|---|---|
| empty mass | ~49 g | 46.3 g | -5.5% |
| max altitude | 50.6 m | **53.8 m** | +6.3% |
| time to apogee | 3.48 s | **3.40 s** | -2.3% |
| flight time | 15.9 s | **16.45 s** | +3.5% |
| ground-hit velocity | 4.68 m/s | 4.24 m/s | -9.4% |

The headline gap closed from +52% / +52% / +12% on the initial pass to under
10% in every dimension after mass / drag / 6-DOF fixes.

## Fixture coverage

| Fixture | Behaviour |
|---|---|
| A simple model rocket | full flight, ~50 m apogee |
| Deployable payload | full flight |
| Three stage low power rocket | full flight |
| Two stage high power rocket | full flight with stage separation |
| Pods—airframes and winglets | full flight |
| Pods—powered with recovery deployment | full flight |
| Clustered motors | partial (single motor approximation) |
| Tube fin rocket | full flight |
| ARC payload rocket | full flight |
| Chute release | full flight |
| Parallel booster staging | full flight (parallel stages run sequentially in this MVP) |
| 3D printable nose cone and fins | full flight |
| Dual parachute deployment | parses, no flight (specific deploy events not wired) |
| Simulation scripting / extensions | parses, no flight (no scripting runtime) |
| Base drag hack (short-wide) | parses, no flight (no motor configured for default sim) |
| Airstart timing | parses, no flight (delayed ignition events not modeled) |

All 17 examples **parse and round-trip** through the writer without loss.

## Known limitations

- **Roll-coupled aerodynamics** — fin cant produces roll torque; we model
  pitch + yaw damping but not roll forcing/damping.
- **Transonic / supersonic drag corrections** — subsonic only.
- **Custom deployment events** (altitude-triggered, lower-stage-separation
  apogee delays) are recognised in the data model but the engine currently
  only honours `Apogee` + `Ejection` (treated as apogee).
- **Wind shear / turbulence / atmospheric overrides** — single constant
  average wind vector.
- **Scripting & extensions** — the `Simulation*.ork` fixtures rely on the
  GraalVM JS runtime which is intentionally out of scope.
- **AeroTech / HPR motor curves** — the bundled `.eng` files are
  manufacturer-spec approximations, not the full ThrustCurve.org database.
  Swap in real curves via `--motors-dir`.
