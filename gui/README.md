# OpsRocket GUI

Desktop front-end for OpsRocket — **Tauri 2 + React + Vite + Three.js**.

The simulation core (`opsrocket-core/io/sim`) runs **in-process** inside the
Tauri Rust backend, so opening a `.ork` and simulating are direct Rust
calls; only the resulting view / flight data crosses to the webview.

## Vertical slice (current)

Proves the architecture end-to-end:

- **Open `.ork`** via native file dialog
- **2D side view** — SVG silhouette (body shapes mirrored about the
  centreline, fins as pink trapezoids), computed server-side from
  `opsrocket-core::profile`
- **3D view** — Three.js: each body component lathed from its radius
  profile, fins replicated radially, OrbitControls
- **Component tree** sidebar
- **Simulate** the selected flight configuration → dual-axis
  altitude/velocity chart with flight-event markers
- Footer: apogee / time-to-apogee / flight time / ground-hit velocity

Palette: accent `#ec4899`, background `#FEF3C7`.

## Run

```
cd gui
npm install          # once
npm run tauri dev    # launches the desktop app (Vite + Tauri)
```

`npm run build` then `npm run tauri build` for a release bundle (bundling
is currently disabled in `tauri.conf.json`; flip `bundle.active` to ship
installers).

## Layout

```
gui/
  src/                 React app
    App.tsx             layout, file open, simulate
    components/         RocketView2D (SVG), RocketView3D (three.js), FlightChart
    lib/api.ts          typed Tauri command wrappers
  src-tauri/            Rust glue (load_ork, simulate commands)
```

The `gui/src-tauri` crate is **excluded** from the root Cargo workspace so
`cargo test --workspace` stays fast and free of the Tauri dependency tree.

## Not yet (next steps)

Component editing dialogs, drag handles on the 2D view, motor-selection
browser, multi-series plot export, flight-configuration management — the
large surface area flagged in the architecture discussion. The slice
deliberately stays read-only to validate the stack first.
