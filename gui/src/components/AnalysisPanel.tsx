import { useEffect, useMemo, useState } from "react";
import {
  Analysis,
  EditNode,
  OptResult,
  getAnalysis,
  runOptimize,
} from "../lib/api";
import { formatFrom, formatQuantity, getUserUnit, roundForDisplay } from "../lib/units";
import { useUnitPref } from "../lib/units-react";
import { Select } from "./ui/Select";

// OpenRocket's "Component Analysis" tab + a focused 1-D design optimizer.

const NUMERIC = ["length", "number", "angle", "mass", "int"];

export function AnalysisPanel({
  tree,
  sim,
  setErr,
}: {
  tree: EditNode[];
  sim: string;
  setErr: (e: string | null) => void;
}) {
  useUnitPref();
  const lenUnit = getUserUnit("length");
  const distUnit = getUserUnit("distance");
  const [an, setAn] = useState<Analysis | null>(null);
  const [mach, setMach] = useState("0.3");

  const editable = useMemo(
    () => tree.filter((n) => n.kind !== "Stage"),
    [tree],
  );
  const [compId, setCompId] = useState(editable[0]?.id ?? "");
  const comp = editable.find((n) => n.id === compId) ?? editable[0];
  const numFields = (comp?.fields ?? []).filter((f) =>
    NUMERIC.includes(f.kind),
  );
  const [fieldKey, setFieldKey] = useState(numFields[0]?.key ?? "");
  const [range, setRange] = useState({ min: "10", max: "80", steps: "15" });
  const [goal, setGoal] = useState("max_apogee");
  const [target, setTarget] = useState("100");
  const [margin, setMargin] = useState("1");
  const [opt, setOpt] = useState<OptResult | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    getAnalysis(Number(mach) || 0.3)
      .then(setAn)
      .catch((e) => setErr(String(e)));
  }, [mach, setErr]);

  async function optimize() {
    if (!comp || !fieldKey) return;
    setRunning(true);
    setErr(null);
    try {
      setOpt(
        await runOptimize({
          sim_name: sim || null,
          comp_id: comp.id,
          key: fieldKey,
          min: Number(range.min),
          max: Number(range.max),
          steps: Number(range.steps),
          goal,
          target: Number(target),
          min_margin: Number(margin),
        }),
      );
    } catch (e) {
      setErr(String(e));
    } finally {
      setRunning(false);
    }
  }

  return (
    <div className="analysis">
      <div className="an-sec">
        <div className="an-head">
          <span>Component analysis</span>
          <label>
            Mach
            <input
              type="number"
              step="0.05"
              value={mach}
              onChange={(e) => setMach(e.target.value)}
              style={{ width: 64 }}
            />
          </label>
        </div>
        {an && (
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>CNα</th>
                <th>CP {lenUnit}</th>
                <th>CD fric</th>
                <th>CD press</th>
                <th>CD share</th>
              </tr>
            </thead>
            <tbody>
              {an.rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <b>{r.name}</b>{" "}
                    <span className="k">{r.kind}</span>
                  </td>
                  <td>{roundForDisplay(r.cn_alpha, 3)}</td>
                  <td>{formatFrom(r.cp_cm, "length", "cm", { withUnit: false })}</td>
                  <td>{roundForDisplay(r.cd_friction, 4)}</td>
                  <td>{roundForDisplay(r.cd_pressure, 4)}</td>
                  <td>{roundForDisplay(r.cd_share * 100, 1)}%</td>
                </tr>
              ))}
              <tr className="tot">
                <td>Total (+ base {roundForDisplay(an.cd_base, 3)})</td>
                <td>{roundForDisplay(an.cn_alpha_total, 3)}</td>
                <td>{formatFrom(an.cp_cm, "length", "cm", { withUnit: false })}</td>
                <td colSpan={2}></td>
                <td>CD {roundForDisplay(an.cd_total, 4)}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      <div className="an-sec">
        <div className="an-head">
          <span>Optimize (1-D sweep)</span>
        </div>
        <div className="opt-form">
          <label>
            Component
            <Select
              value={compId}
              onChange={(v) => {
                setCompId(v);
                setFieldKey("");
              }}
              options={editable.map((n) => ({
                value: n.id,
                label: `${n.name} (${n.kind})`,
              }))}
            />
          </label>
          <label>
            Parameter
            <Select
              value={fieldKey || numFields[0]?.key || ""}
              onChange={setFieldKey}
              options={numFields.map((f) => ({
                value: f.key,
                label: f.label + (f.unit ? ` (${f.unit})` : ""),
              }))}
            />
          </label>
          <label>
            Min
            <input
              type="number"
              value={range.min}
              onChange={(e) =>
                setRange({ ...range, min: e.target.value })
              }
            />
          </label>
          <label>
            Max
            <input
              type="number"
              value={range.max}
              onChange={(e) =>
                setRange({ ...range, max: e.target.value })
              }
            />
          </label>
          <label>
            Steps
            <input
              type="number"
              value={range.steps}
              onChange={(e) =>
                setRange({ ...range, steps: e.target.value })
              }
            />
          </label>
          <label>
            Goal
            <Select
              value={goal}
              onChange={setGoal}
              options={[
                { value: "max_apogee", label: "Max apogee" },
                { value: "target_apogee", label: "Target apogee" },
              ]}
            />
          </label>
          {goal === "target_apogee" && (
            <label>
              Target m
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </label>
          )}
          <label>
            Min stab cal
            <input
              type="number"
              step="0.5"
              value={margin}
              onChange={(e) => setMargin(e.target.value)}
            />
          </label>
          <button onClick={optimize} disabled={running}>
            {running ? "Running…" : "Run sweep"}
          </button>
        </div>

        {opt && (
          <div className="opt-res">
            <p>
              Baseline <b>{roundForDisplay(opt.baseline_value, 2)}</b> ·{" "}
              {opt.best_value != null ? (
                <>
                  Best{" "}
                  <b className="hit">
                    {roundForDisplay(opt.best_value, 2)}
                  </b>{" "}
                  → apogee{" "}
                  <b>{opt.best_apogee != null ? formatQuantity(opt.best_apogee, "distance") : "—"}</b>
                </>
              ) : (
                <span className="bad">
                  No feasible point (all unstable)
                </span>
              )}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Apogee {distUnit}</th>
                  <th>Stability cal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {opt.points.map((p, i) => (
                  <tr
                    key={i}
                    className={
                      p.value === opt.best_value ? "sel" : ""
                    }
                  >
                    <td>{roundForDisplay(p.value, 2)}</td>
                    <td>{formatFrom(p.apogee, "distance", "m", { withUnit: false })}</td>
                    <td>{roundForDisplay(p.margin_cal, 2)}</td>
                    <td>
                      {p.feasible ? (
                        ""
                      ) : (
                        <span className="bad">unstable</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
