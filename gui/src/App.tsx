import { useEffect, useMemo, useRef, useState } from "react";
import {
  loadOrk,
  loadOrkB64,
  snapshotOrkB64,
  newDoc,
  openOrkFile,
  runSim,
  saveOrk,
  patchField,
  patchSim,
  deleteComponent,
  addComponent,
  allowedChildren,
  undoEdit,
  redoEdit,
  listFixtures,
  getMotors,
  Workbench,
  FlightData,
  Fixture,
  EditNode,
  MotorInfo,
} from "./lib/api";
import { Select } from "./components/ui/Select";
import { FileMenu } from "./components/ui/FileMenu";
import {
  exportFlightCsv,
  exportDesignPng,
  exportObj,
} from "./lib/export";
import { RocketView2D, Overlay2D } from "./components/RocketView2D";
import { RocketView3D } from "./components/RocketView3D";
import { FlightChart } from "./components/FlightChart";
import { PropertyEditor, FieldList } from "./components/PropertyEditor";
import { COMPONENT_ICONS } from "./lib/component-icons";
import { MotorsPanel } from "./components/MotorsPanel";
import { AnalysisPanel } from "./components/AnalysisPanel";
import { SimulationModal } from "./components/SimulationModal";

// Chrome-free capture route: #raw=<orkPath>|<figure|unfinished|finished>|<angleIdx>
// Renders ONLY a 1280x720 RocketView3D with OpenRocket's exact camera, for
// pixel diffing against the OpenRocket reference renders.
function RawCapture({ spec }: { spec: string }) {
  const [path, mode, aStr, bg] = spec.split("|");
  const [wb, setWb] = useState<Workbench | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    loadOrk(decodeURIComponent(path))
      .then(setWb)
      .catch((e) => setErr(String(e)));
  }, [path]);
  if (err) return <div id="raw-err" style={{ color: "red" }}>{err}</div>;
  if (!wb) return <div id="raw-loading">loading</div>;
  return (
    <div
      id="raw-ready"
      style={{ width: 1280, height: 720, overflow: "hidden" }}
    >
      {mode === "blueprint" ? (
        <RocketView2D rv={wb.view} raw />
      ) : (
        <RocketView3D
          rv={wb.view}
          mode={(mode as "figure" | "unfinished" | "finished") || "finished"}
          raw={parseInt(aStr || "0", 10)}
          keyBg={bg === "key"}
        />
      )}
    </div>
  );
}

export default function App() {
  const hash = typeof window !== "undefined" ? window.location.hash : "";
  if (hash.startsWith("#raw=")) {
    return <RawCapture spec={hash.slice(5)} />;
  }
  return <Workbenchful />;
}

function Workbenchful() {
  const [wb, setWb] = useState<Workbench | null>(null);
  const [fd, setFd] = useState<FlightData | null>(null);
  const [sim, setSim] = useState<string>("");
  const [viewSel, setViewSel] = useState<
    "side" | "top" | "back" | "figure" | "unfinished" | "finished"
  >("side");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [selId, setSelId] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [tab, setTab] = useState<
    "design" | "motors" | "sim" | "analysis"
  >("design");
  const [rollDeg, setRollDeg] = useState(0);
  const [motors, setMotors] = useState<MotorInfo[]>([]);
  // Vertical split between the rocket view and the flight chart (fraction
  // of the centre column given to the top panel). Draggable.
  const [vSplit, setVSplit] = useState(0.5);
  // id of the tree node whose "add child" picker is open (null = none)
  const [addFor, setAddFor] = useState<string | null>(null);
  const [simModalOpen, setSimModalOpen] = useState(false);
  const [seriesToggles, setSeriesToggles] = useState<{
    altitude: boolean;
    velocity: boolean;
    thrust: boolean;
  }>({ altitude: true, velocity: true, thrust: false });

  useEffect(() => {
    listFixtures()
      .then(setFixtures)
      .catch(() => {});
  }, []);

  const rv = wb?.view ?? null;
  const stab = wb?.stability ?? null;
  const selected = useMemo<EditNode | null>(
    () => wb?.tree.find((n) => n.id === selId) ?? null,
    [wb, selId],
  );

  async function run<T>(fn: () => Promise<T>, after?: (r: T) => void) {
    setBusy(true);
    setErr(null);
    try {
      after?.(await fn());
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  const onLoaded = (w: Workbench) => {
    setWb(w);
    setFd(null);
    setSelId(null);
    setSim(w.view.simulations[0] ?? "");
    getMotors()
      .then(setMotors)
      .catch(() => setMotors([]));
  };
  const loadPath = (p: string) => run(() => loadOrk(p), onLoaded);
  const loadB64 = (b64: string) => run(() => loadOrkB64(b64), onLoaded);
  const onNewDoc = () => run(() => newDoc(), onLoaded);
  const onOpenFile = (f: File) => run(() => openOrkFile(f), onLoaded);

  // Bridge-triggered simulate: chat calls its simulate tool → it asks the
  // workbench to run its own simulate against the currently-loaded design,
  // so the FLIGHT chart populates without the user clicking the button.
  const bridgeSimulate = () => {
    const w = wbRef.current;
    if (!w) return;
    const simName = w.view.simulations[0] ?? "";
    run(
      () => runSim(simName || null),
      (d) => setFd(d),
    );
  };

  // Workbench bridge.
  //
  //   - On boot, look at our own URL (?ork_b64= / ?example= / ?path=) and
  //     auto-load. This is the chat → workbench deeplink entry point.
  //   - postMessage(parent): legacy iframe-embedded mode.
  //   - BroadcastChannel("opsrocket-workbench"): same-origin cross-tab
  //     bridge with the chat. Listens for `load_design` and replies to
  //     `ping` with current state; the wb-broadcast effect below pushes
  //     fresh state on every successful mutation.
  const bcastRef = useRef<BroadcastChannel | null>(null);
  const wbRef = useRef<Workbench | null>(null);
  wbRef.current = wb;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const b64 = params.get("ork_b64");
    const example = params.get("example");
    const path = params.get("path");
    if (b64) loadB64(b64);
    else if (example) loadPath(`/orks/${example}`);
    else if (path) loadPath(path);

    const onParentMsg = (e: MessageEvent) => {
      if (e.source !== window.parent) return;
      const m = e.data;
      if (!m || typeof m !== "object") return;
      if (m.type === "workbench:load_design") {
        if (typeof m.b64 === "string") loadB64(m.b64);
        else if (typeof m.example === "string") loadPath(`/orks/${m.example}`);
        else if (typeof m.path === "string") loadPath(m.path);
      } else if (m.type === "workbench:run_simulate") {
        bridgeSimulate();
      }
    };
    window.addEventListener("message", onParentMsg);
    if (window.parent !== window) {
      window.parent.postMessage({ type: "workbench:ready" }, "*");
    }

    let chan: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      chan = new BroadcastChannel("opsrocket-workbench");
      bcastRef.current = chan;
      const onChanMsg = (e: MessageEvent) => {
        const m = e.data;
        if (!m || typeof m !== "object") return;
        if (m.type === "ping") {
          const w = wbRef.current;
          if (!w) return;
          snapshotOrkB64()
            .then(({ ork_b64 }) => {
              chan!.postMessage({
                type: "state",
                state: {
                  name: w.view.name,
                  ork_b64,
                  total_length_m: w.view.total_length,
                  components: w.view.components.length,
                },
              });
            })
            .catch(() => {});
        } else if (m.type === "load_design" && typeof m.b64 === "string") {
          loadB64(m.b64);
        } else if (m.type === "run_simulate") {
          bridgeSimulate();
        }
      };
      chan.addEventListener("message", onChanMsg);
      chan.postMessage({ type: "ready" });
    }

    return () => {
      window.removeEventListener("message", onParentMsg);
      if (chan) {
        chan.close();
        bcastRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Broadcast the current design whenever it changes so the chat tab can
  // mirror it. Skipped when the channel is unavailable.
  useEffect(() => {
    const chan = bcastRef.current;
    if (!chan) return;
    if (!wb) {
      chan.postMessage({ type: "state", state: null });
      return;
    }
    let alive = true;
    snapshotOrkB64()
      .then(({ ork_b64 }) => {
        if (!alive) return;
        chan.postMessage({
          type: "state",
          state: {
            name: wb.view.name,
            ork_b64,
            total_length_m: wb.view.total_length,
            components: wb.view.components.length,
          },
        });
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [wb]);

  const onPatch = (id: string, key: string, value: unknown) =>
    run(
      () => patchField(id, key, value),
      (w) => setWb(w),
    );

  const onDelete = (id: string) =>
    run(
      () => deleteComponent(id),
      (w) => {
        setWb(w);
        if (selId === id) setSelId(null);
      },
    );

  const onAdd = (parentId: string, kind: string) => {
    const before = new Set((wb?.tree ?? []).map((n) => n.id));
    setAddFor(null);
    run(
      () => addComponent(parentId, kind),
      (w) => {
        setWb(w);
        // select the freshly-added node so its properties open immediately
        const fresh = w.tree.find((n) => !before.has(n.id));
        if (fresh) setSelId(fresh.id);
      },
    );
  };

  // "+ New" in the Components header: open the add-menu on the selected
  // container, or fall back to the first container (the Sustainer stage).
  const onNew = () => {
    if (!wb) return;
    const sel = wb.tree.find((n) => n.id === selId);
    const target =
      sel && allowedChildren(sel.kind).length > 0
        ? sel
        : wb.tree.find((n) => allowedChildren(n.kind).length > 0);
    if (target) {
      setSelId(target.id);
      setAddFor(target.id);
    }
  };

  const onPatchSim = (key: string, value: unknown) =>
    run(
      () => patchSim(sim, key, value),
      (w) => setWb(w),
    );

  const restore = (w: Workbench) => {
    setWb(w);
    // keep the selection if that component still exists, else drop it
    setSelId((id) => (id && w.tree.some((n) => n.id === id) ? id : null));
  };
  const onUndo = () => run(() => undoEdit(), restore);
  const onRedo = () => run(() => redoEdit(), restore);

  // Cmd/Ctrl+Z = undo, Cmd/Ctrl+Shift+Z or Ctrl+Y = redo. Skipped while
  // typing in a field so it falls back to the browser's text undo.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!wb || busy) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        t?.isContentEditable
      )
        return;
      const z = e.key === "z" || e.key === "Z";
      const y = e.key === "y" || e.key === "Y";
      if ((e.metaKey || e.ctrlKey) && z) {
        e.preventDefault();
        e.shiftKey ? onRedo() : onUndo();
      } else if (e.ctrlKey && y) {
        e.preventDefault();
        onRedo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wb, busy, sim]);

  const simulate = () =>
    run(
      () => runSim(sim || null),
      (d) => setFd(d),
    );

  // Toolbar pan: wheel → horizontal, and click-drag on empty header space
  // (not on a button/select) slides it left/right.
  const headerRef = useRef<HTMLElement>(null);
  const pan = useRef<{ x: number; left: number } | null>(null);
  const onHeaderWheel = (e: React.WheelEvent) => {
    const el = headerRef.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return; // native already
    el.scrollLeft += e.deltaY;
  };
  const onHeaderDown = (e: React.PointerEvent) => {
    const el = headerRef.current;
    if (!el) return;
    const t = e.target as HTMLElement;
    if (t !== el && t.tagName !== "H1") return; // leave buttons/selects alone
    pan.current = { x: e.clientX, left: el.scrollLeft };
    el.classList.add("grab");
    el.setPointerCapture(e.pointerId);
  };
  const onHeaderMove = (e: React.PointerEvent) => {
    const el = headerRef.current;
    if (el && pan.current)
      el.scrollLeft = pan.current.left - (e.clientX - pan.current.x);
  };
  const onHeaderUp = (e: React.PointerEvent) => {
    const el = headerRef.current;
    if (!el) return;
    pan.current = null;
    el.classList.remove("grab");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      /* pointer already released */
    }
  };

  // Draggable centre divider: resize the rocket view vs the flight chart.
  const viewportRef = useRef<HTMLDivElement>(null);
  const vdrag = useRef(false);
  const onVSplitDown = (e: React.PointerEvent) => {
    vdrag.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const onVSplitMove = (e: React.PointerEvent) => {
    if (!vdrag.current || !viewportRef.current) return;
    const r = viewportRef.current.getBoundingClientRect();
    const f = (e.clientY - r.top) / r.height;
    setVSplit(Math.min(0.85, Math.max(0.15, f)));
  };
  const onVSplitUp = (e: React.PointerEvent) => {
    vdrag.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
  };

  // File ▸ Export handlers (see lib/export.ts).
  const onExportCsv = () => {
    if (fd) exportFlightCsv(fd, rv?.name ?? "flight", sim);
  };
  const onExportPng = () => {
    if (!exportDesignPng(rv?.name ?? "rocket"))
      setErr("Open the Side/3D view before exporting an image");
  };
  const onExportObj = () => {
    if (rv) exportObj(rv, rv.name);
  };

  const simNode = wb?.sims.find((s) => s.name === sim) ?? null;

  // OpenRocket RocketFigure info overlay, populated with OpsRocket's own
  // computed values (the layout is reproduced; physics-model deltas vs
  // OpenRocket are a separate, known concern).
  const overlay = useMemo<Overlay2D | null>(() => {
    if (!rv || !stab) return null;
    const cfg = wb?.config;
    const activeId =
      cfg?.simulations.find((s) => s.name === sim)?.config_id ??
      cfg?.default_config ??
      cfg?.configs[0]?.config_id ??
      null;
    // Max body diameter = widest on-axis (non-pod) lathe profile.
    let maxR = rv.max_radius;
    const onAxis = rv.lathe.filter((p) => Math.abs(p.radial ?? 0) < 1e-4);
    if (onAxis.length) {
      maxR = Math.max(
        ...onAxis.map((p) => Math.max(...p.outer.map(([, r]) => r))),
      );
    }
    const L = rv.total_length * 100;
    // Mass with motors: empty + each mount's assigned motor for the active
    // config (matched by digest, then designation) × the mount's copies.
    let motorMass = 0;
    let anyMotor = false;
    for (const m of cfg?.mounts ?? []) {
      const a = m.assignments.find((x) => x.config_id === activeId);
      if (!a || (!a.digest && !a.designation)) continue;
      const mi =
        motors.find((mo) => a.digest && mo.digest === a.digest) ??
        motors.find((mo) => mo.designation === a.designation);
      if (mi) {
        motorMass += mi.total_mass_g * Math.max(1, m.instances ?? 1);
        anyMotor = true;
      }
    }
    const cfgName =
      cfg?.configs.find((c) => c.config_id === activeId)?.name ||
      (() => {
        const ds = (cfg?.mounts ?? [])
          .map(
            (m) =>
              m.assignments.find((x) => x.config_id === activeId)
                ?.designation,
          )
          .filter((d): d is string => !!d);
        return ds.length ? `[${ds.join("; ")}]` : "[No motors]";
      })();
    let maxV: number | null = null;
    let maxA: number | null = null;
    if (fd && fd.velocity.length > 1) {
      maxV = Math.max(...fd.velocity);
      let a = 0;
      for (let i = 1; i < fd.velocity.length; i++) {
        const dt = fd.time[i] - fd.time[i - 1];
        if (dt > 0)
          a = Math.max(
            a,
            (fd.velocity[i] - fd.velocity[i - 1]) / dt,
          );
      }
      maxA = a;
    }
    return {
      name: rv.name,
      length_cm: L,
      max_diam_cm: maxR * 200,
      mass_g: stab.mass_g,
      mass_motors_g: anyMotor ? stab.mass_g + motorMass : null,
      margin_cal: stab.margin_cal,
      margin_pct: L > 0 ? ((stab.cp_cm - stab.cg_cm) / L) * 100 : 0,
      cg_cm: stab.cg_cm,
      cp_cm: stab.cp_cm,
      mach: 0.3,
      config_name: cfgName,
      apogee_m: fd ? fd.apogee : null,
      max_velocity_ms: maxV,
      max_velocity_mach: maxV != null ? maxV / 340.3 : null,
      max_accel_ms2: maxA,
    };
  }, [rv, stab, wb, sim, fd, motors]);

  const onSaved = (r: { saved: string }) => {
    setSavedMsg(`Saved → ${r.saved}`);
    setTimeout(() => setSavedMsg(null), 2500);
  };
  const save = () => run(() => saveOrk(), onSaved);
  const onSaveAs = (name: string) => run(() => saveOrk(name), onSaved);
  // Export ▸ OpenRocket file (.ork): same write path, name derived from the
  // design (no prompt) — on the web build the server shim turns it into a
  // download.
  const onExportOrk = () =>
    run(
      () =>
        saveOrk(`${(rv?.name ?? "rocket").replace(/\W+/g, "_")}.ork`),
      onSaved,
    );

  return (
    <div className="app">
      <SimulationModal
        open={simModalOpen}
        sim={sim}
        simNode={simNode}
        busy={busy}
        fd={fd}
        rocketName={rv?.name ?? "rocket"}
        seriesToggles={seriesToggles}
        onSeriesChange={setSeriesToggles}
        onPatch={(_s, key, value) => onPatchSim(key, value)}
        onRun={simulate}
        onClose={() => setSimModalOpen(false)}
      />
      <header
        ref={headerRef}
        onWheel={onHeaderWheel}
        onPointerDown={onHeaderDown}
        onPointerMove={onHeaderMove}
        onPointerUp={onHeaderUp}
      >
        <a href="/" target="_top" className="logo-link" title="Home">
          <img className="logo" src="/ops.png" alt="OpsRocket" />
        </a>
        <FileMenu
          fixtures={fixtures}
          busy={busy}
          hasDoc={!!wb}
          canExportCsv={!!fd}
          onNew={onNewDoc}
          onOpenFile={onOpenFile}
          onOpenExample={loadPath}
          onSave={save}
          onSaveAs={onSaveAs}
          onExportCsv={onExportCsv}
          onExportPng={onExportPng}
          onExportObj={onExportObj}
          onExportOrk={onExportOrk}
        />
        {rv && (
          <>
            <Select
              className="simsel"
              value={sim}
              onChange={setSim}
              options={rv.simulations.map((s) => ({
                value: s,
                label: s,
              }))}
            />
            <button
              onClick={() => setSimModalOpen(true)}
              disabled={busy || !rv.simulations.length || !sim}
              title="Edit simulation conditions and run"
            >
              New simulation
            </button>
            <button
              className="ghost"
              onClick={onUndo}
              disabled={busy}
              title="Undo (⌘Z / Ctrl+Z)"
            >
              ↶ Undo
            </button>
            <button
              className="ghost"
              onClick={onRedo}
              disabled={busy}
              title="Redo (⇧⌘Z / Ctrl+Y)"
            >
              ↷ Redo
            </button>
            <Select
              title="View"
              value={viewSel}
              onChange={(v) => setViewSel(v as typeof viewSel)}
              options={[
                { value: "side", label: "Side view" },
                { value: "top", label: "Top view" },
                { value: "back", label: "Back view" },
                { value: "figure", label: "3D Figure" },
                { value: "unfinished", label: "3D Unfinished" },
                { value: "finished", label: "3D Finished" },
              ]}
            />
            {(viewSel === "side" ||
              viewSel === "top" ||
              viewSel === "back") && (
              <span
                className="rollctl"
                title="Change the rocket's roll rotation (only affects the rocket view)"
              >
                <input
                  type="number"
                  value={rollDeg}
                  step={1}
                  onChange={(e) =>
                    setRollDeg(
                      ((Number(e.target.value) % 360) + 360) % 360,
                    )
                  }
                  style={{ width: 56 }}
                />
                <span style={{ opacity: 0.7 }}>°</span>
                <input
                  type="range"
                  min={0}
                  max={359}
                  value={rollDeg}
                  onChange={(e) => setRollDeg(Number(e.target.value))}
                  title="Roll"
                />
              </span>
            )}
            {(
              ["design", "motors", "sim", "analysis"] as const
            ).map((t) => (
              <button
                key={t}
                className={tab === t ? "" : "ghost"}
                onClick={() => setTab(t)}
              >
                {t === "design"
                  ? "Design"
                  : t === "motors"
                    ? "Motors"
                    : t === "sim"
                      ? "Conditions"
                      : "Analysis"}
              </button>
            ))}
          </>
        )}
        {savedMsg && <span className="ok">{savedMsg}</span>}
        {err && <span className="err">{err}</span>}
      </header>

      {rv && (
        <div className="metabar">
          {rv.name}
          {rv.designer ? ` — ${rv.designer}` : ""} ·{" "}
          {(rv.total_length * 100).toFixed(1)} cm
        </div>
      )}

      {stab && (
        <div className="statbar">
          <span>
            Mass <b>{stab.mass_g.toFixed(1)} g</b>
          </span>
          <span>
            CG <b>{stab.cg_cm.toFixed(2)} cm</b>
          </span>
          <span>
            CP <b>{stab.cp_cm.toFixed(2)} cm</b>
          </span>
          <span className={stab.stable ? "good" : "bad"}>
            Stability <b>{stab.margin_cal.toFixed(2)} cal</b>
          </span>
          <span>
            Ø <b>{stab.ref_diameter_mm.toFixed(1)} mm</b>
          </span>
          <span>
            Cᴅ <b>{stab.cd.toFixed(3)}</b>
          </span>
        </div>
      )}

      <div className="main">
        <aside className="sidebar">
          <div className="sidebar-head">
            <h2>Components</h2>
            {wb && (
              <button
                className="new-btn"
                onClick={onNew}
                title="Add a new component"
              >
                + New
              </button>
            )}
          </div>
          {wb ? (
            wb.tree.map((n) => {
              const kinds = allowedChildren(n.kind);
              return (
                <div key={n.id}>
                  <div
                    className={
                      "tree-item" + (n.id === selId ? " sel" : "")
                    }
                    style={{ paddingLeft: 8 + n.depth * 14 }}
                    onClick={() => setSelId(n.id)}
                  >
                    {COMPONENT_ICONS[n.kind] && (
                      <img
                        className="ci"
                        src={COMPONENT_ICONS[n.kind]}
                        alt=""
                        title={n.kind}
                        draggable={false}
                      />
                    )}
                    <span className="nm">{n.name}</span>
                    {kinds.length > 0 && (
                      <button
                        className="add"
                        title="Add child component"
                        onClick={(e) => {
                          e.stopPropagation();
                          setAddFor(addFor === n.id ? null : n.id);
                        }}
                      >
                        +
                      </button>
                    )}
                    {n.kind !== "Stage" && (
                      <button
                        className="del"
                        title="Delete"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(n.id);
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                  {addFor === n.id && kinds.length > 0 && (
                    <div
                      className="add-menu"
                      style={{ paddingLeft: 8 + (n.depth + 1) * 14 }}
                    >
                      {kinds.map((k) => (
                        <button
                          key={k}
                          className="add-opt"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdd(n.id, k);
                          }}
                        >
                          + {k}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="empty">Pick a rocket and click Load</div>
          )}
        </aside>

        <div
          className="viewport"
          ref={viewportRef}
          style={{
            gridTemplateRows: `${vSplit}fr 3px ${1 - vSplit}fr`,
          }}
        >
          <div className="panel">
            {!(
              tab === "design" &&
              (viewSel === "side" ||
                viewSel === "top" ||
                viewSel === "back")
            ) && (
              <span className="tag">
                {tab === "motors"
                  ? "Motors & configurations"
                  : tab === "sim"
                    ? `Conditions — ${sim}`
                    : tab === "analysis"
                      ? "Analysis & optimization"
                      : viewSel === "side"
                        ? "Side view"
                        : viewSel === "top"
                          ? "Top view"
                          : viewSel === "back"
                            ? "Back view"
                            : `3D ${viewSel}`}
              </span>
            )}
            {!wb ? (
              <div className="empty">Pick a rocket and click Load</div>
            ) : tab === "motors" ? (
              <MotorsPanel
                config={wb.config}
                onWorkbench={setWb}
                setBusy={setBusy}
                setErr={setErr}
                busy={busy}
              />
            ) : tab === "sim" ? (
              <div className="conditions">
                {simNode ? (
                  <FieldList
                    fields={simNode.fields}
                    onCommit={onPatchSim}
                  />
                ) : (
                  <div className="empty">No simulation selected</div>
                )}
              </div>
            ) : tab === "analysis" ? (
              <AnalysisPanel
                tree={wb.tree}
                sim={sim}
                setErr={setErr}
              />
            ) : viewSel === "side" ||
              viewSel === "top" ||
              viewSel === "back" ? (
              <RocketView2D
                rv={rv!}
                overlay={overlay}
                rollDeg={
                  rollDeg +
                  (viewSel === "top"
                    ? 90
                    : viewSel === "back"
                      ? 180
                      : 0)
                }
                onRollDelta={(d) =>
                  setRollDeg(
                    (r) =>
                      ((Math.round(r + d) % 360) + 360) % 360,
                  )
                }
              />
            ) : (
              <RocketView3D
                rv={rv!}
                mode={
                  viewSel === "finished"
                    ? "finished"
                    : viewSel === "unfinished"
                      ? "unfinished"
                      : "figure"
                }
                preset="3d"
              />
            )}
          </div>
          <div
            className="vsplit"
            onPointerDown={onVSplitDown}
            onPointerMove={onVSplitMove}
            onPointerUp={onVSplitUp}
            title="Drag to resize"
          />
          <div className="panel" style={{ borderBottom: "none" }}>
            <span className="tag">Flight</span>
            {fd ? (
              <FlightChart fd={fd} />
            ) : (
              <div className="empty">Run a simulation</div>
            )}
          </div>
        </div>

        <aside className="inspector">
          <h2>Properties</h2>
          <PropertyEditor
            node={selected}
            onPatch={onPatch}
            busy={busy}
          />
        </aside>
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
            OpsRocket — Rust core · live design workbench · React + Three.js
          </span>
        )}
      </footer>
    </div>
  );
}
