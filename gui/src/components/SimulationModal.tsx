import { useEffect, useMemo, useState } from "react";
import {
  Field,
  FlightData,
  SimNode,
  SimWarning,
  simWarnings as fetchSimWarnings,
} from "../lib/api";
import { exportFlightCsv } from "../lib/export";
import { FieldList } from "./PropertyEditor";

export type SeriesToggles = {
  altitude: boolean;
  velocity: boolean;
  thrust: boolean;
};

// OpenRocket-style "Edit simulation" dialog: launch conditions split into
// Wind / Site / Rod / Atmosphere / Options tabs, plus a Warnings tab that
// surfaces pre-flight checks from the Rust core.

const SECTION_ORDER: Array<{ key: string; label: string }> = [
  { key: "wind", label: "Wind" },
  { key: "site", label: "Launch site" },
  { key: "rod", label: "Launch rod" },
  { key: "atmosphere", label: "Atmosphere" },
  { key: "options", label: "Options" },
];

function groupBySection(fields: Field[]): Array<{ key: string; label: string; rows: Field[] }> {
  const buckets = new Map<string, Field[]>();
  const order: string[] = [];
  for (const f of fields) {
    const key = f.section ?? "options";
    if (!buckets.has(key)) {
      buckets.set(key, []);
      order.push(key);
    }
    buckets.get(key)!.push(f);
  }
  const known = SECTION_ORDER.map((s) => s.key);
  const finalOrder = [
    ...known.filter((k) => buckets.has(k)),
    ...order.filter((k) => !known.includes(k)),
  ];
  return finalOrder.map((k) => ({
    key: k,
    label:
      SECTION_ORDER.find((s) => s.key === k)?.label ??
      k.charAt(0).toUpperCase() + k.slice(1),
    rows: buckets.get(k)!,
  }));
}

function WarningsTab({ sim }: { sim: string }) {
  const [items, setItems] = useState<SimWarning[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    setItems(null);
    setErr(null);
    fetchSimWarnings(sim)
      .then((r) => {
        if (alive) setItems(r.warnings ?? []);
      })
      .catch((e) => {
        if (alive) setErr(String(e));
      });
    return () => {
      alive = false;
    };
  }, [sim]);
  if (err) return <div className="empty">Could not load warnings: {err}</div>;
  if (items === null) return <div className="empty">Checking…</div>;
  if (!items.length)
    return <div className="empty">No warnings — design and sim look healthy.</div>;
  return (
    <ul className="warn-list">
      {items.map((w, i) => (
        <li key={i} className={`warn warn-${w.kind}`}>
          <span className="warn-icon" aria-hidden="true">
            {w.kind === "error" ? "✕" : w.kind === "warn" ? "▲" : "ℹ"}
          </span>
          <div>
            <div className="warn-msg">{w.message}</div>
            <div className="warn-cat">{w.category}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function SeriesTab({
  toggles,
  onChange,
  trailing,
}: {
  toggles: SeriesToggles;
  onChange: (next: SeriesToggles) => void;
  trailing?: React.ReactNode;
}) {
  const flip = (k: keyof SeriesToggles) =>
    onChange({ ...toggles, [k]: !toggles[k] });
  return (
    <div>
      <div className="prop-row">
        <span className="prop-label">Altitude</span>
        <input
          type="checkbox"
          checked={toggles.altitude}
          onChange={() => flip("altitude")}
        />
      </div>
      <div className="prop-row">
        <span className="prop-label">Velocity</span>
        <input
          type="checkbox"
          checked={toggles.velocity}
          onChange={() => flip("velocity")}
        />
      </div>
      <div className="prop-row">
        <span className="prop-label">Thrust</span>
        <input
          type="checkbox"
          checked={toggles.thrust}
          onChange={() => flip("thrust")}
        />
      </div>
      {trailing}
    </div>
  );
}

export function SimulationModal({
  open,
  sim,
  simNode,
  busy,
  fd,
  rocketName,
  seriesToggles,
  onSeriesChange,
  onPatch,
  onRun,
  onClose,
}: {
  open: boolean;
  sim: string;
  simNode: SimNode | null;
  busy: boolean;
  fd: FlightData | null;
  rocketName: string;
  seriesToggles: SeriesToggles;
  onSeriesChange: (next: SeriesToggles) => void;
  onPatch: (sim: string, key: string, value: unknown) => void;
  onRun: () => void;
  onClose: () => void;
}) {
  const sections = useMemo(
    () => (simNode ? groupBySection(simNode.fields) : []),
    [simNode],
  );
  const tabs: Array<{ key: string; label: string }> = [
    ...sections.map((s) => ({ key: s.key, label: s.label })),
    { key: "_warnings", label: "Warnings" },
    { key: "_plot", label: "Plot data" },
    { key: "_export", label: "Export data" },
  ];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.key ?? "wind");
  useEffect(() => {
    if (open) setActiveTab(tabs[0]?.key ?? "wind");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, sim]);

  if (!open) return null;
  const activeSection = sections.find((s) => s.key === activeTab);
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal sim-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit simulation"
      >
        <header className="modal-head">
          <div>
            <strong>New simulation</strong>
            {sim && <span className="modal-sub">— {sim}</span>}
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>
        <div className="prop-tabs sim-tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={"prop-tab" + (t.key === activeTab ? " active" : "")}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="modal-body">
          {activeTab === "_warnings" ? (
            <WarningsTab sim={sim} />
          ) : activeTab === "_plot" ? (
            <SeriesTab toggles={seriesToggles} onChange={onSeriesChange} />
          ) : activeTab === "_export" ? (
            <SeriesTab
              toggles={seriesToggles}
              onChange={onSeriesChange}
              trailing={
                <div style={{ marginTop: 14 }}>
                  <button
                    type="button"
                    disabled={!fd}
                    onClick={() => {
                      if (fd) exportFlightCsv(fd, rocketName, sim, seriesToggles);
                    }}
                    title={fd ? "Download CSV" : "Run a simulation first"}
                  >
                    Download CSV
                  </button>
                  {!fd && (
                    <div className="empty" style={{ paddingLeft: 0 }}>
                      No flight data yet — run a simulation first.
                    </div>
                  )}
                </div>
              }
            />
          ) : activeSection ? (
            <FieldList
              fields={activeSection.rows}
              onCommit={(key, v) => onPatch(sim, key, v)}
            />
          ) : (
            <div className="empty">No simulation selected</div>
          )}
        </div>
        <footer className="modal-foot">
          <button type="button" className="ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onRun();
              onClose();
            }}
            disabled={busy || !simNode}
          >
            Run simulation
          </button>
        </footer>
      </div>
    </div>
  );
}
