---
name: opsrocket
description: Canonical "what is OpsRocket" overview — architecture, frontends (web/native/MCP/chat), parity reality (do NOT invent Mach-banded numbers), how to connect from Claude Code. Use when the user asks what OpsRocket is, how it compares to OpenRocket, what it can/can't do today, or how to wire its MCP server into Claude.
---

# OpsRocket — what it is

A clean-room **Rust rewrite of OpenRocket**. Same .ork files, same Barrowman
aerodynamics, same mass/CG/CP, same 6-DOF flight integration — re-implemented
as a small Rust core with multiple frontends.

Live: **https://ops.sg**. Repo: <https://github.com/ops3000/opsrocket>
(GPL-3.0-or-later, **not affiliated with the OpenRocket project**).

## Architecture (one engine, several frontends)

| Layer | What it is | Where |
|-------|-----------|-------|
| `opsrocket-core` | Rust crate: .ork parser, aero, mass, sim, optimizer | `crates/` |
| `opsrocket-view` | Rust crate: the only boundary every frontend uses | `crates/` |
| Native GUI | Tauri 2 + React 18 + Vite + Three.js, Rust in-process | `gui/` |
| Browser workbench | Same React app, compiled to WASM, iframed by Next.js. `/api/*` is monkey-patched in-tab via `workspace-shim.js` → WASM. No backend. | `web/public/workspace-app/` (built from `gui/`) + `ops.sg/workspace` |
| MCP server | Remote, stateless, anonymous, server-side WASM | `ops.sg/mcp` |
| Chat copilot | DeepSeek + OpenAI-style function calling. The functions ARE the MCP tools below. | Homepage and bottom of `/workspace` |

The chat and the MCP server share the **same** tool registry
(`web/lib/mcp-tools.ts`), so anything you can do from Claude Code via MCP,
the ops.sg chat can do too.

## Connect from Claude Code

```sh
claude mcp add --transport http opsrocket https://ops.sg/mcp
```

Callable tools (single shared registry for both /mcp and the chat):

`list_examples`, `capabilities`, `inspect`, `stability`, `aero_analysis`,
`mass_breakdown`, `simulate`, `compare_runs`, `optimize`, `new_document`,
`edit_apply`, `list_motors`, `motor_info`, `export`, `load_skill`.

Two MCP resources: `opsrocket://schema`, `opsrocket://methodology`.
Three MCP prompts: `validate_design`, `optimize_for_apogee`,
`design_from_scratch`.

Note on UA: Cloudflare in front of ops.sg blocks `python-urllib` UA;
`curl` / Node / official MCP clients are fine.

## Project scale (`web/lib/data.ts` → `STATS`)

| Metric | Value |
|---|---|
| Rust source | ~11.2k lines across 6 crates |
| Sim engine alone | ~4.0k lines (mass · Barrowman · RK4 6-DOF) |
| Test suite | 35 tests across 14 files, all green |
| Fixtures (parity targets) | 17 stock OpenRocket sample designs |
| Motor DB | 55 RASP `.eng` motors, exact-digest matched to OpenRocket |
| Engine WASM | 428 KB (whole thing, runs in the tab) |

## Physics parity vs Java OpenRocket — the actual table

Source: `web/lib/data.ts` → `PARITY.rows`. Ground truth is Java OpenRocket's
own `MassCalculator` + `BarrowmanCalculator.getForceAnalysis`, scraped via
a one-off Java harness (`OrMassRef.java`), diffed per-component over all
17 fixtures.

| Metric | Before | Now | Result |
|---|---|---|---|
| Empty mass — mean \|Δ\| | 23.5 % | **0.09 %** | 17/17 bit-exact |
| Centre of pressure — mean \|Δ\| | 3.32 cm | **0.23 cm** | 17/17 < 1 cm |
| Max CP deviation (worst fixture) | ≈ 14 cm | **0.90 cm** | — |
| Fixtures within 1 % mass | 1 / 17 | **17 / 17** | ✓ |
| Per-component mass match | partial | **every part** | ✓ |

So: mass/CG/CP are at full parity for every one of the 17 stock designs
(the worst fixture's CP error is 0.9 cm).

## Flight-sim parity

Once you have parity on the inputs (mass / aero), the flight numbers
(apogee / max velocity / flight time) are within **~0–5 % on single-stage
rockets**. This is the only quantified flight-sim parity claim that's
real.

**Known residuals** — the docs flag these as "genuinely off, not yet at
parity", but **no quantified range exists** for any of them:

- Multi-stage trajectories (separation events, residual mass)
- Airstart timing (scheduled mid-air ignition)
- Pod-powered / parallel-booster rockets
- Designs with embedded OpenRocket scripts (engine refuses to execute
  Jython by design — by definition non-parity)
- Recovery descent (simplified vs a dedicated landing stepper)

## Real-world validation (`lib/data.ts` → `VALIDATION`)

Niskanen 2013 thesis, Ch. 6.1 — a flown 56 cm × 29 mm test rocket with a
PerfectFlite Alt15K/WD altimeter (±(0.25 % + 0.6 m)). Two flights logged.

| Case | Measured | OpsRocket | Δ |
|---|---|---|---|
| C6-3 — measured (anchor) | 151.5 m | **151.5 m** | **−0.0 %** |
| C6-3 — Java OpenRocket | 151.5 m | 161.4 m | +6.5 % |
| C6-3 — RockSim 8 | 151.5 m | 180.1 m | +18.9 % |
| B4-4 — measured | 64.0 m | 48.4 m | −24 % |
| B4-4 — Java OpenRocket | 64.0 m | 74.4 m | +16 % |

The thesis overrode the rocket's empty mass without publishing the value,
so OpsRocket sweeps a physically plausible empty-mass band; the C6-3
anchor lands at 99.5 g. **One-parameter calibration, not a curve fit.**
OpsRocket sits inside the ±0.25 % altimeter envelope — tighter than the
6–19 % spread between the three simulators.

B4-4 misses because the thesis itself flags that motor's thrust curve as
unreliable; OpsRocket and Java OpenRocket miss in opposite directions
(−24 % vs +16 %), consistent with a bad motor curve, not a bad airframe
model.

## Render fidelity (`lib/data.ts` → `RENDER`)

Pixel-checked against OpenRocket's own GL renderer, OpenRocket's exact
camera projection, 17 fixtures × 3 finish modes × 8 angles.

| Mode | Result | Coverage |
|---|---|---|
| 2D blueprint silhouette IoU | **0.967** | 17 / 17 ≥ 0.90 |
| 3D figure silhouette IoU | **0.965** | 17 / 17 ≥ 0.90 |
| 3D finished / unfinished mesh | **bit-identical** | numerically verified |
| Colour Δ (figure palette, /255) | 60–79 → 21.5 | ≈ secondary |

The shape is proven bit-identical; residual IoU is a cross-engine
boundary (≈95 %-transparent drag-hack parts that two renderers blend
differently, sub-pixel camera rounding, MSAA vs Chrome AA).

## Anti-hallucination rules for parity

- **The engine does NOT report parity bucketed by Mach regime.** If a
  table comes back as "subsonic < 3 % / transonic < 5 % / supersonic
  < 8 %", it's fabricated. Quote the tables in this skill instead.
- **Multi-stage / airstart / pod-powered / scripted** designs have no
  quantified range. The only flight-sim parity claim that exists is
  "single-stage within ~0–5 %". Do not invent ranges like "10–30 %"
  from memory.
- **"Recovery descent simplified"** is qualitative. No quantified range.
- Units: SI internally (m, kg, s, N, rad); some fields reported in cm / mm.

## What's NOT there (vs OpenRocket)

- **JVM / Jython scripting**: out of scope by design; OpsRocket parses
  but does not execute embedded scripts.
- **Print-template export**: not implemented.
- **CDX1 / RASAero II import**: not implemented.
- **Component-aware landing model**: descent is simplified.

What IS there but the LLM sometimes forgets:

- **A full GUI**: `gui/` is a React + Three.js + Tauri 2 desktop app, ALSO
  served as WASM at `ops.sg/workspace`. "OpsRocket has no GUI" is wrong.
- **Real 3D preview**: `gui/src/components/RocketView3D.tsx` is live in
  the browser workbench at `/workspace`. Not "planned".
- **Visual component editing**: `PropertyEditor.tsx` in the GUI.
  `edit_apply` is the headless / MCP path, not the only path.

## When the user asks "is X accurate?" — run the tool, do not guess

| Question | Tool |
|----------|------|
| How close is OpsRocket to OpenRocket? | Quote the tables above (they are the authoritative parity / validation results from `lib/data.ts`). |
| Will it fly? Stability margin? | `stability` |
| Apogee / max velocity / flight time? | `simulate` |
| Per-component aero shares at Mach M? | `aero_analysis(mach=…)` |
| Mass / CG / inertia breakdown? | `mass_breakdown` |
| What motor for target apogee? | `list_motors` filter → `simulate` chain |
| What can I edit / what fields exist? | `inspect(detail:"full")` or `capabilities` |
| Compare two designs side by side? | `compare_runs` |

## Pointers

- `docs/STATUS.md` — current per-rocket parity numbers (real data)
- `docs/VALIDATION.md` — cross-check against a flown, altimeter-measured rocket
- `docs/PORTING_NOTES.md` — what was ported how
- `web/app/parity/`, `/validation/`, `/render/`, `/architecture/` — same
  numbers as the docs, web-facing
- `web/lib/mcp-tools.ts` — single source of truth for the MCP tool registry
