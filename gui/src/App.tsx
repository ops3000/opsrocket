import { useEffect, useState } from "react";
import {
  loadOrk,
  runSim,
  listFixtures,
  isTauri,
  RocketView,
  FlightData,
  Fixture,
} from "./lib/api";
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
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [picked, setPicked] = useState<string>("");

  useEffect(() => {
    if (!isTauri()) {
      listFixtures()
        .then((f) => {
          setFixtures(f);
          if (f.length) setPicked(f[0].path);
        })
        .catch(() => {});
    }
  }, []);

  async function loadPath(p: string) {
    setBusy(true);
    setErr(null);
    setFd(null);
    try {
      const r = await loadOrk(p);
      setPath(p);
      setRv(r);
      setSim(r.simulations[0] ?? "");
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  async function openNative() {
    const { open } = await import("@tauri-apps/plugin-dialog");
    const sel = await open({
      filters: [{ name: "OpenRocket", extensions: ["ork"] }],
    });
    if (typeof sel === "string") loadPath(sel);
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
        {isTauri() ? (
          <button onClick={openNative} disabled={busy}>
            Open .ork
          </button>
        ) : (
          <>
            <select
              value={picked}
              onChange={(e) => setPicked(e.target.value)}
              disabled={busy || !fixtures.length}
            >
              {fixtures.map((f) => (
                <option key={f.path} value={f.path}>
                  {f.name}
                </option>
              ))}
            </select>
            <button onClick={() => picked && loadPath(picked)} disabled={busy}>
              Load
            </button>
          </>
        )}
        {rv && (
          <>
            <span className="meta">
              {rv.name}
              {rv.designer ? ` — ${rv.designer}` : ""} ·{" "}
              {(rv.total_length * 100).toFixed(1)} cm
            </span>
            <select value={sim} onChange={(e) => setSim(e.target.value)}>
              {rv.simulations.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={simulate}
              disabled={busy || !rv.simulations.length}
            >
              Simulate
            </button>
            <button onClick={() => setView3d((v) => !v)}>
              {view3d ? "2D view" : "3D view"}
            </button>
          </>
        )}
        {err && (
          <span style={{ color: "#be2768", fontSize: 13 }}>{err}</span>
        )}
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
              <div className="empty">
                {isTauri()
                  ? "Open an .ork file to begin"
                  : "Pick a rocket and click Load"}
              </div>
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
            OpsRocket — Rust core · {isTauri() ? "Tauri desktop" : "web"} ·
            React + Three.js
          </span>
        )}
      </footer>
    </div>
  );
}

function guessMotorsDir(orkPath: string): string | null {
  const marker = "/tests/fixtures/";
  const i = orkPath.indexOf(marker);
  if (i === -1) return null;
  return orkPath.slice(0, i) + "/tests/fixtures/motors";
}
