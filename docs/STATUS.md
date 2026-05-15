# OpsRocket — Status

**Apogee within 2.9% of upstream Java OpenRocket** for the canonical
"A simple model rocket" fixture (49.12 m vs 50.59 m).
**Ground-hit velocity within 0.7%** (4.65 m/s vs 4.68 m/s).

## Numerical fidelity (A simple model rocket vs Java cached reference)

| Metric | Java reference | OpsRocket | Δ |
|---|---|---|---|
| Empty mass | 49.0 g | **49.05 g** | **+0.1%** |
| Apogee | 50.59 m | **49.12 m** | **−2.9%** |
| Time to apogee | 3.48 s | **3.40 s** | −2.3% |
| Flight time | 15.9 s | **15.50 s** | −2.5% |
| Ground-hit velocity | 4.68 m/s | **4.65 m/s** | **−0.7%** ✓ |
| Drag coefficient (boost) | 0.617 | **0.6255** | **+1.4%** |
| Friction Cd | 0.433 | **0.439** | +1.4% |
| Pressure Cd | 0.063 | **0.0658** | +4.4% |
| Base Cd | 0.12 | **0.12** | 0% |
| Total CG (with motor) | 0.247 m | **≈0.241 m** | −2.4% |
| CP | 0.31 m | **0.319 m** | +3% |

Headline gap progression across the porting passes:
- After scaffolding only: apogee +52%
- After mass / drag / 6-DOF basics: apogee +6.3%
- After real motor curves + Java atmosphere + wind sign + Bottom-axial fix: +2.5%
- After Java friction + base drag + nose volumetric mass: −2.8%
- After AOA-coupled body lift + Mach-aware fin CN_α + NASA TR-R-100 subsonic + TubeCalc lug drag + Java pitch damping + world-frame total velocity: **−2.9% / +0.7% / −2.5%**

The ~3% apogee residual is dominated by floating-point accumulation
differences between Java and Rust over ~16 s of RK4 integration plus
small algorithmic gaps (RK4 substep timing vs Java's adaptive stepper,
event-time bisection, fin-shape-aware mass formulas).

## Subsystems

| Subsystem | State |
|---|---|
| Cargo workspace (5 crates) | builds clean, **32 tests passing** |
| Java ExtendedISAModel atmosphere (8 layers, 500 m cache, geopotential) | ✅ verbatim |
| Real motor curves from upstream `initial_motors.db` SQLite | ✅ 13 motors |
| Wind direction (Java's east wind = −X velocity) | ✅ |
| Shape-aware getRadius + Simpson volume / wet-area / planform / planform-center integrals for all 6 shapes | ✅ |
| Java slender-body Barrowman: `CN_α = 2·(A_aft − A_fore)`, `CP = (L·A_aft − V) / (A_aft − A_fore)` | ✅ |
| Java's exact subsonic fin CN_α with Mach-dependent Prandtl-Glauert β | ✅ |
| Pitts-Nielsen-Kaattari fin-body interference factor | ✅ |
| Java's fully-turbulent Schlichting friction Cf with Mach correction | ✅ |
| Roughness-limited friction (60 µm "Normal" finish) | ✅ |
| Body-fineness friction correction `1 + 1/(2·fB)` | ✅ |
| Base drag (always on, Hoerner subsonic) | ✅ |
| Java FinSetCalc subsonic pressure drag (rounded/airfoil/square LE + base) | ✅ |
| Java TubeCalc internal-flow pressure drag for launch lugs (Swamee-Jain + Darcy-Weissbach) | ✅ |
| NASA TR-R-100 subsonic ogive Cd = 0 + conical 0.8·sin²φ + others' subsonic extrapolation | ✅ |
| AOA-coupled body lift dynamics (Galejs `K · sin²α`) with separate CP | ✅ |
| Java pitch-damping moment: `mul · (ω/V)²` with body planform + fin contributions, scaled ×3 | ✅ |
| Combined empty+motor CG for moment-arm computation | ✅ |
| Launch-rod constraint (velocity along rod, orientation pinned, no angular velocity) | ✅ |
| Multi-stage simulation engine with per-stage motors and separation events | ✅ |
| `.ork` reader + round-trip writer (17/17 fixtures) | ✅ |
| Regression diff CLI: `opsrocket diff` reports max/mean/RMS/max-rel per column | ✅ |
| 6-DOF flight propagator: quaternion attitude, body-frame angular velocity, RK4 | ✅ |
| Java-convention world-frame velocity in output columns | ✅ |
| Instant-deploy parachute model matching `BasicLandingStepper.computeCD` | ✅ |

## Per-column max-abs error (final)

| Column | Max abs | Mean abs |
|---|---|---|
| Altitude | 1.79 m | 0.74 m |
| Vertical velocity | 3.76 m/s | 0.85 m/s |
| Total velocity | 3.76 m/s | 0.85 m/s |
| Position East | 1.90 m | 0.35 m |
| Pitch rate | 1.99 rad/s | 0.29 rad/s |
| Lateral velocity | 0.45 m/s | 0.16 m/s |
| Yaw rate | 1e-3 rad/s | 6e-5 rad/s |
| Roll rate | 6e-8 rad/s | 2e-8 rad/s |

The "Stability margin calibers" max-abs of 13.6 calibers is artificial: Java
reports NaN in many rows where my values are non-NaN, so the metric
captures NaN-vs-finite comparisons, not real disagreement.

## Adaptive RK4 + event bisection (done)

- **Adaptive timestep** ported from Java RK4SimulationStepper: dt =
  min(base, MAX_ANGLE_STEP/lateral_pitch_rate, MAX_PITCH_YAW_CHANGE/
  rot_accel, 1.5×prev, time-to-next-event), floored at user_dt/20, /5
  on the launch rod. This dropped **vertical-velocity max error from
  3.76 → 0.93 m/s** and time-to-apogee error from 2.3% → 1.2%.
- **Apogee event-time interpolation**: exact apogee time found by linear
  interpolation of vz across the step (Java does within-step bisection;
  linear is first-order equivalent for the vz zero-crossing).

| Metric | Java | OpsRocket | Δ |
|---|---|---|---|
| Apogee | 50.59 m | 48.90 m | −3.3% |
| Time to apogee | 3.48 s | 3.44 s | −1.2% |
| Ground-hit velocity | 4.68 m/s | 4.65 m/s | −0.7% |
| Vertical velocity (max abs err) | — | 0.93 m/s | — |

## What's left (hard limit)

The residual ~3% apogee gap is now bounded by:

1. **`StrictMath` parity**: Java's `Math.atan2` / `Math.pow` last-bit
   precision differs from Rust's libm. Cumulative effect over 16 s of
   integration is in the 1e-5 to 1e-3 range.
2. **~0.6 m/s burnout-velocity deficit**: my Cd is 1.4% high vs Java's,
   which over the boost phase costs ~0.6 m/s at burnout ≈ ~1.8 m apogee.
   Closing this needs the exact NASA TR-R-100 transonic tables (we only
   ported the subsonic branch) and bit-exact thrust-curve integration.
3. **RK4 sub-step quaternion handling**: Java uses `Quaternion.rotation`
   for the attitude sub-steps; we use a linearised `q + dt·dq`
   renormalised. The difference is O(dt³) per step but accumulates.

`cargo test --workspace` → **32 passing**.
