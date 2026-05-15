import { useState } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { loadOrk, runSim, RocketView, FlightData } from "./lib/api";
import { RocketView2D } from "./components/RocketView2D";
import { RocketView3D } from "./components/RocketView3D";
import { FlightChart } from "./components/FlightChart";

export default function App() {
  const [path, setPath] = useState<string | null>(null);
  const [rv, setRv] = useState<RocketView | null>(null);
  const [fd, setFd] = useState<FlightData | null>(null);
  const [sim, setSim] = useState<string>("");
  const [view3d, setView3d] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function openFile() {
    const sel = await open({
      filters: [{ name: "OpenRocket", extensions: ["ork"] }],
    });
    if (typeof sel !== "string") return;
    setBusy(true);
    setErr(null);
    setFd(null);
    try {
      const r = await loadOrk(sel);
      setPath(sel);
      setRv(r);
      setSim(r.simulations[0] ?? "");
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function simulate() {
    if (!path) return;
    setBusy(true);
    setErr(null);
    try {
      const motorsDir = guessMotorsDir(path);
      const d = await runSim(path, sim || null, motorsDir);
      setFd(d);
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="app">
      <header>
        <h1>OpsRocket</h1>
        <button onClick={openFile} disabled={busy}>
          Open .ork
        </button>
        {rv && (
          <>
            <span className="meta">
              {rv.name}
              {rv.designer ? ` — ${rv.designer}` : ""} · {(rv.total_length * 100).toFixed(1)} cm
            </span>
            <select value={sim} onChange={(e) => setSim(e.target.value)}>
              {rv.simulations.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button onClick={simulate} disabled={busy || !rv.simulations.length}>
              Simulate
            </button>
            <button onClick={() => setView3d((v) => !v)}>
              {view3d ? "2D view" : "3D view"}
            </button>
          </>
        )}
        {err && <span style={{ color: "#be2768", fontSize: 13 }}>{err}</span>}
      </header>

      <div className="main">
        <aside className="sidebar">
          <h2>Components</h2>
          {rv ? (
            rv.components.map((c, i) => (
              <div className="tree-item" key={i}>
                <span>{c.name}</span>
                <span className="k">{c.kind}</span>
              </div>
            ))
          ) : (
            <div className="empty">—</div>
          )}
        </aside>

        <div className="viewport">
          <div className="panel">
            <span className="tag">{view3d ? "3D" : "Side view"}</span>
            {rv ? (
              view3d ? (
                <RocketView3D rv={rv} />
              ) : (
                <RocketView2D rv={rv} />
              )
            ) : (
              <div className="empty">Open an .ork file to begin</div>
            )}
          </div>
          <div className="panel" style={{ borderBottom: "none" }}>
            <span className="tag">Flight</span>
            {fd ? (
              <FlightChart fd={fd} />
            ) : (
              <div className="empty">Run a simulation</div>
            )}
          </div>
        </div>
      </div>

      <footer>
        {fd ? (
          <>
            <span>
              Apogee <b>{fd.apogee.toFixed(1)} m</b>
            </span>
            <span>
              t&#8209;apogee <b>{fd.time_to_apogee.toFixed(2)} s</b>
            </span>
            <span>
              Flight time <b>{fd.flight_time.toFixed(2)} s</b>
            </span>
            <span>
              Ground hit <b>{fd.ground_hit_velocity.toFixed(2)} m/s</b>
            </span>
          </>
        ) : (
          <span style={{ color: "#9a7b56" }}>
            OpsRocket — Rust simulation core · Tauri + React + Three.js
          </span>
        )}
      </footer>
    </div>
  );
}

// The bundled motor fixtures live at <repo>/tests/fixtures/motors.
// Derive that from a fixture .ork path if it sits under tests/fixtures.
function guessMotorsDir(orkPath: string): string | null {
  const marker = "/tests/fixtures/";
  const i = orkPath.indexOf(marker);
  if (i === -1) return null;
  return orkPath.slice(0, i) + "/tests/fixtures/motors";
}
