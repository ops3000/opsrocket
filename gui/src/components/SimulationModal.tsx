import { useEffect, useMemo, useState } from "react";
import {
  Field,
  SimNode,
  SimWarning,
  exportFlightCsvFull,
  listFlightColumns,
  simWarnings as fetchSimWarnings,
} from "../lib/api";
import { formatForField, groupForField } from "../lib/units";
import { Select } from "./ui/Select";
import { UnitInput } from "./ui/UnitInput";

// OpenRocket-style "Edit simulation" dialog: launch conditions split into
// 4 grouped fieldsets (Wind / Launch site / Atmosphere / Launch rod) in a
// 2-column grid, plus Simulation options / Warnings / Plot data / Export
// data tabs. Each numeric field gets a slider next to its number input.

export type SeriesToggles = {
  altitude: boolean;
  velocity: boolean;
  thrust: boolean;
};

// Per-field slider ranges. Anything not listed renders without a slider.
const SLIDER_RANGES: Record<string, [number, number]> = {
  wind_average: [0, 25],
  wind_standard_deviation: [0, 5],
  wind_turbulence: [0, 1],
  wind_direction: [0, 360],
  launch_latitude: [-90, 90],
  launch_longitude: [-180, 180],
  launch_altitude: [0, 5000],
  launch_rod_length: [0.3, 3],
  launch_rod_angle: [0, 45],
  launch_rod_direction: [0, 360],
  launch_temperature: [-40, 60],
  launch_pressure: [800, 1100],
  time_step: [0.005, 0.1],
  max_time: [30, 1200],
};

const LAUNCH_GROUPS: Array<{ section: string; title: string }> = [
  { section: "wind", title: "Wind" },
  { section: "site", title: "Launch site" },
  { section: "atmosphere", title: "Atmospheric conditions" },
  { section: "rod", title: "Launch rod" },
];

function groupBySection(fields: Field[]): Record<string, Field[]> {
  const out: Record<string, Field[]> = {};
  for (const f of fields) {
    const k = f.section ?? "options";
    (out[k] ??= []).push(f);
  }
  return out;
}

function SimRow({
  field,
  onCommit,
  disabled = false,
}: {
  field: Field;
  onCommit: (value: unknown) => void;
  disabled?: boolean;
}) {
  const modelStr = formatForField(field);
  const [draft, setDraft] = useState<string>(modelStr);
  const [dirty, setDirty] = useState(false);
  if (!dirty && draft !== modelStr) setDraft(modelStr);

  if (field.kind === "bool") {
    return (
      <label className={"sim-row sim-row-bool" + (disabled ? " disabled" : "")}>
        <input
          type="checkbox"
          checked={field.value === true}
          disabled={disabled}
          onChange={(e) => onCommit(e.target.checked)}
        />
        <span className="sim-label">{field.label}</span>
      </label>
    );
  }

  if (field.kind === "enum") {
    return (
      <div className={"sim-row sim-row-enum" + (disabled ? " disabled" : "")}>
        <span className="sim-label">{field.label}</span>
        <Select
          className="sim-enum"
          value={modelStr}
          onChange={(v) => onCommit(v)}
          disabled={disabled}
          options={(field.options ?? []).map((o) => ({ value: o, label: o }))}
        />
      </div>
    );
  }

  const numeric =
    field.kind === "length" ||
    field.kind === "number" ||
    field.kind === "angle" ||
    field.kind === "mass" ||
    field.kind === "int";
  const range = SLIDER_RANGES[field.key];

  // UnitInput handles the conversion + picker for fields whose unit maps to
  // a known group (length/mass/angle/velocity/temperature/pressure/distance/time).
  // Lat/long use °N/°E which aren't real angles, so they fall through to the
  // plain renderer below.
  if (numeric && groupForField(field)) {
    return (
      <div className={"sim-row" + (disabled ? " disabled" : "")}>
        <span className="sim-label">{field.label}</span>
        <UnitInput
          field={field}
          onCommit={onCommit}
          disabled={disabled}
          slider={range}
          inputClass="sim-input"
          sliderClass="sim-slider"
        />
      </div>
    );
  }

  const commit = () => {
    setDirty(false);
    if (draft === modelStr) return;
    onCommit(numeric ? Number(draft) : draft);
  };

  return (
    <div className={"sim-row" + (disabled ? " disabled" : "")}>
      <span className="sim-label">{field.label}</span>
      <input
        className="sim-input"
        type={numeric ? "number" : "text"}
        step={field.kind === "int" ? 1 : "any"}
        disabled={disabled}
        value={draft}
        onChange={(e) => {
          setDirty(true);
          setDraft(e.target.value);
        }}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") (e.target as HTMLInputElement).blur();
          if (e.key === "Escape") {
            setDirty(false);
            setDraft(modelStr);
          }
        }}
      />
      <span className="sim-unit">{field.unit ?? ""}</span>
      {numeric && range && (
        <input
          className="sim-slider"
          type="range"
          min={range[0]}
          max={range[1]}
          step={(range[1] - range[0]) / 100}
          disabled={disabled}
          value={Number(draft) || 0}
          onChange={(e) => {
            setDirty(false);
            const v = Number(e.target.value);
            setDraft(String(v));
            onCommit(v);
          }}
        />
      )}
    </div>
  );
}

function Fieldset({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="sim-fieldset">
      <legend>{title}</legend>
      {children}
    </fieldset>
  );
}

function LaunchTab({
  sim,
  simNode,
  onPatch,
}: {
  sim: string;
  simNode: SimNode;
  onPatch: (sim: string, key: string, value: unknown) => void;
}) {
  const grouped = useMemo(
    () => groupBySection(simNode.fields),
    [simNode],
  );
  const useIsa =
    (grouped["atmosphere"] ?? []).find((f) => f.key === "use_isa")?.value === true;
  const launchIntoWind =
    (grouped["rod"] ?? []).find((f) => f.key === "launch_into_wind")?.value ===
    true;
  return (
    <div className="sim-launch">
      {LAUNCH_GROUPS.map((g) => {
        const items = (grouped[g.section] ?? []).filter(
          // Geodetic lives in the Simulation Options tab (matches OR).
          (f) => f.key !== "geodetic_method",
        );
        return (
          <Fieldset key={g.section} title={g.title}>
            {items.map((f) => {
              // OpenRocket-style auto-disables:
              //  - Atmosphere temp/pressure when "Use ISA" is on
              //  - Launch rod direction when "Always launch into wind" is on
              const disabled =
                (g.section === "atmosphere" &&
                  (f.key === "launch_temperature" || f.key === "launch_pressure") &&
                  useIsa) ||
                (g.section === "rod" &&
                  f.key === "launch_rod_direction" &&
                  launchIntoWind);
              return (
                <SimRow
                  key={f.key}
                  field={f}
                  disabled={disabled}
                  onCommit={(v) => onPatch(sim, f.key, v)}
                />
              );
            })}
          </Fieldset>
        );
      })}
    </div>
  );
}

function OptionsTab({
  sim,
  simNode,
  onPatch,
}: {
  sim: string;
  simNode: SimNode;
  onPatch: (sim: string, key: string, value: unknown) => void;
}) {
  const grouped = groupBySection(simNode.fields);
  const optionsRows = grouped["options"] ?? [];
  const geodetic = (grouped["site"] ?? []).find(
    (f) => f.key === "geodetic_method",
  );
  return (
    <Fieldset title="Simulator options">
      <div className="sim-row sim-row-static">
        <span className="sim-label">Calculation method</span>
        <span className="sim-static">Extended Barrowman</span>
      </div>
      <div className="sim-row sim-row-static">
        <span className="sim-label">Simulation method</span>
        <span className="sim-static">6-DOF Runge–Kutta 4 (adaptive)</span>
      </div>
      {geodetic && (
        <SimRow
          field={geodetic}
          onCommit={(v) => onPatch(sim, geodetic.key, v)}
        />
      )}
      {optionsRows.map((f) => (
        <SimRow
          key={f.key}
          field={f}
          onCommit={(v) => onPatch(sim, f.key, v)}
        />
      ))}
    </Fieldset>
  );
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

function FullCsvExportTab({
  sim,
  rocketName,
}: {
  sim: string;
  rocketName: string;
}) {
  const [columns, setColumns] = useState<string[] | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    listFlightColumns()
      .then((r) => {
        if (!alive) return;
        setColumns(r.columns);
        setSelected(new Set(r.columns));
      })
      .catch((e) => alive && setErr(String(e)));
    return () => {
      alive = false;
    };
  }, []);
  const toggle = (c: string) => {
    const next = new Set(selected);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    setSelected(next);
  };
  const all = () => setSelected(new Set(columns ?? []));
  const none = () => setSelected(new Set(["Time"]));
  const download = async () => {
    if (!columns) return;
    setBusy(true);
    setErr(null);
    try {
      const cols = columns.filter((c) => selected.has(c));
      const csv = await exportFlightCsvFull(sim || null, cols);
      const blob = new Blob([csv], { type: "text/csv" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${(rocketName || "rocket").replace(/\W+/g, "_")}_${
        sim || "sim"
      }.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  };
  if (err) return <div className="empty">Error: {err}</div>;
  if (!columns) return <div className="empty">Loading column list…</div>;
  return (
    <Fieldset title={`Columns (${selected.size} / ${columns.length})`}>
      <div className="csv-toolbar">
        <button type="button" className="ghost" onClick={all}>
          Select all
        </button>
        <button type="button" className="ghost" onClick={none}>
          Time only
        </button>
        <button type="button" onClick={download} disabled={busy || !sim}>
          {busy ? "Running sim…" : "Download CSV"}
        </button>
      </div>
      <div className="csv-cols">
        {columns.map((c) => (
          <label key={c} className="csv-col">
            <input
              type="checkbox"
              checked={selected.has(c)}
              disabled={c === "Time"}
              onChange={() => toggle(c)}
            />
            <span>{c}</span>
          </label>
        ))}
      </div>
    </Fieldset>
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
    <Fieldset title="Series">
      <label className="sim-row sim-row-bool">
        <input
          type="checkbox"
          checked={toggles.altitude}
          onChange={() => flip("altitude")}
        />
        <span className="sim-label">Altitude</span>
      </label>
      <label className="sim-row sim-row-bool">
        <input
          type="checkbox"
          checked={toggles.velocity}
          onChange={() => flip("velocity")}
        />
        <span className="sim-label">Velocity</span>
      </label>
      <label className="sim-row sim-row-bool">
        <input
          type="checkbox"
          checked={toggles.thrust}
          onChange={() => flip("thrust")}
        />
        <span className="sim-label">Thrust</span>
      </label>
      {trailing}
    </Fieldset>
  );
}

const TABS: Array<{ key: string; label: string }> = [
  { key: "_launch", label: "Launch conditions" },
  { key: "_options", label: "Simulation options" },
  { key: "_warnings", label: "Warnings" },
  { key: "_plot", label: "Plot data" },
  { key: "_export", label: "Export data" },
];

export function SimulationModal({
  open,
  sim,
  simNode,
  busy,
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
  rocketName: string;
  seriesToggles: SeriesToggles;
  onSeriesChange: (next: SeriesToggles) => void;
  onPatch: (sim: string, key: string, value: unknown) => void;
  onRun: () => void;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<string>("_launch");
  useEffect(() => {
    if (open) setActiveTab("_launch");
  }, [open, sim]);

  // Pre-fetch warnings so the status row can flag errors before the user
  // even clicks the Warnings tab (matches OpenRocket's "Errors in
  // simulation prevent running" line).
  const [headerWarnings, setHeaderWarnings] = useState<SimWarning[] | null>(
    null,
  );
  useEffect(() => {
    if (!open || !sim) {
      setHeaderWarnings(null);
      return;
    }
    let alive = true;
    fetchSimWarnings(sim)
      .then((r) => alive && setHeaderWarnings(r.warnings ?? []))
      .catch(() => alive && setHeaderWarnings([]));
    return () => {
      alive = false;
    };
  }, [open, sim, simNode]);
  const errorCount = headerWarnings?.filter((w) => w.kind === "error").length ?? 0;
  const warnCount = headerWarnings?.filter((w) => w.kind === "warn").length ?? 0;
  const statusText =
    headerWarnings === null
      ? "Checking…"
      : errorCount > 0
        ? `Errors in simulation prevent running (${errorCount})`
        : warnCount > 0
          ? `${warnCount} warning${warnCount > 1 ? "s" : ""}`
          : "Ready";
  const statusKind =
    headerWarnings === null
      ? "info"
      : errorCount > 0
        ? "error"
        : warnCount > 0
          ? "warn"
          : "ok";

  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="modal sim-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Edit simulation"
      >
        <header className="modal-head sim-modal-head">
          <div className="sim-modal-head-grid">
            <span className="sim-head-label">Name:</span>
            <input
              type="text"
              defaultValue={sim || "Simulation 1"}
              className="sim-name-input"
              readOnly
              title="Rename via the sim selector"
            />
            <span className="sim-head-label">Flight config:</span>
            <span className="sim-head-value">
              {simNode?.config_id || "[default]"}
            </span>
            <span className="sim-head-label">Status:</span>
            <span className={`sim-status sim-status-${statusKind}`}>
              {statusText}
            </span>
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
          {TABS.map((t) => (
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
          {!simNode ? (
            <div className="empty">No simulation selected</div>
          ) : activeTab === "_launch" ? (
            <LaunchTab sim={sim} simNode={simNode} onPatch={onPatch} />
          ) : activeTab === "_options" ? (
            <OptionsTab sim={sim} simNode={simNode} onPatch={onPatch} />
          ) : activeTab === "_warnings" ? (
            <WarningsTab sim={sim} />
          ) : activeTab === "_plot" ? (
            <SeriesTab toggles={seriesToggles} onChange={onSeriesChange} />
          ) : activeTab === "_export" ? (
            <FullCsvExportTab sim={sim} rocketName={rocketName} />
          ) : null}
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
