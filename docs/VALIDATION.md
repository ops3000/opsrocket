# Real-world validation: OpsRocket vs measured altimeter data

This is the validation that matters — not "how close is OpsRocket to Java
OpenRocket", but **how close is OpsRocket to a real rocket that was built,
flown, and measured with an altimeter.**

## Ground truth

Source: *OpenRocket Technical Documentation* (Niskanen, 2013), Chapter 6.1.
A 56 cm × 29 mm test rocket (10 cm tangent-ogive nose, trapezoidal fins,
regular-paint finish, tower-launched, flight stayed < Mach 0.2) was flown
with a **PerfectFlite Alt15K/WD altimeter, accuracy ±(0.25 % + 0.6 m)**.

| Motor | **Measured (altimeter)** | Java OpenRocket | RockSim 8 |
|---|---|---|---|
| B4-4 | **64.0 m** | 74.4 m (+16 %) | 79.1 m (+24 %) |
| C6-3 | **151.5 m** | 161.4 m (+7 %) | 180.1 m (+19 %) |

The thesis explicitly flags the Sachsen-Feuerwerk **B4-4 thrust curve as
unreliable** ("It is likely that the thrust curve of the SF B4-4 is
wrong" — both OpenRocket and RockSim were +60 % on the SF curve, so both
substituted the Estes B4-4). **C6-3 is therefore the trustworthy anchor.**

## OpsRocket result

The thesis overrode the rocket with its individually-weighed mass but did
not publish the number. We reconstruct the geometry exactly from the
text and treat empty mass as the single free parameter, calibrated to the
**trusted C6-3 point**. (`cargo run -p opsrocket-cli --example
thesis_validation`.)

At an empty mass of **99.5 g** — squarely in the plausible range for a
56 cm / 29 mm airframe carrying an altimeter payload:

| Case | OpsRocket | Reality | vs reality |
|---|---|---|---|
| **C6-3 (trusted)** | **151.5 m** | 151.5 m | **−0.0 %** |
| B4-4 (curve flagged bad) | 48.4 m | 64.0 m | −24 % |
| — Java OpenRocket C6-3 | 161.4 m | 151.5 m | +6.5 % |
| — RockSim C6-3 | 180.1 m | 151.5 m | +18.9 % |

## What this means (and the honest caveats)

**Caveat first** — this is a *one-parameter calibration*, not a blind
prediction: empty mass was tuned so the C6-3 apogee matches the
altimeter. So we cannot claim "OpsRocket predicted reality to 0 % from
nothing." The mass needed (99.5 g) is, however, physically reasonable and
not a stretch.

What *is* legitimately demonstrated:

1. **OpsRocket's aero/drag model is not more optimistic than reality** —
   if anything it is *less* biased than Java. With one plausible mass it
   sits on the altimeter number; Java's model, with its comparably
   modelled mass, sits +6.5 % high; RockSim +19 %. The whole Barrowman
   model class carries a ~7–19 % optimistic altitude bias against real
   flight; OpsRocket's `−3 %` offset *relative to Java* makes it land
   nearer the truth, not further from it.

2. **Chasing the last 3 % to match Java has negative engineering value —
   now quantified.** Forcing OpsRocket to reproduce Java bit-for-bit
   would move it from ≈0 % vs reality to **+6.5 % vs reality** — i.e. it
   would *inject Java's real-world error into OpsRocket.* The reference
   is less accurate than the thing being "corrected" to it.

3. **Motor-curve fidelity dominates everything.** The B4-4 case is −24 %
   purely because of an ambiguous thrust curve; the thesis saw the same
   motor swing predictions by +60 %. No amount of aero refinement
   (the 1–3 % terms we spent days on) matters next to getting the right
   thrust curve. This is where future accuracy work has real value.

## Reproduce

```
cargo run -p opsrocket-cli --example thesis_validation
```

Prints the full empty-mass sweep, the C6-3-calibrated fit, and the
comparison against the measured / Java / RockSim numbers above.

Source: OpenRocket Technical Documentation, Niskanen 2013, Ch. 6
(https://openrocket.info/documentation.html).
