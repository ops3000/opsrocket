import { useEffect, useMemo, useRef, useState } from "react";
import {
  ConfigPanel,
  MotorInfo,
  Workbench,
  getMotors,
  assignMotor,
  clearMotor,
  registerMotor,
} from "../lib/api";
import { Select } from "./ui/Select";

// OpenRocket's "Motors & Configurations" tab: per flight-configuration,
// pick which motor sits in each mount. Configs have no names in the .ork,
// so they're labelled by the simulation that references them.

export function MotorsPanel({
  config,
  onWorkbench,
  setBusy,
  setErr,
  busy,
}: {
  config: ConfigPanel;
  onWorkbench: (w: Workbench) => void;
  setBusy: (b: boolean) => void;
  setErr: (e: string | null) => void;
  busy: boolean;
}) {
  const [motors, setMotors] = useState<MotorInfo[]>([]);
  const [filter, setFilter] = useState("");
  const [cfg, setCfg] = useState<string>(
    config.configs[0]?.config_id ?? "",
  );
  const [mountId, setMountId] = useState<string>(
    config.mounts[0]?.id ?? "",
  );
  const [delay, setDelay] = useState<string>("0");

  useEffect(() => {
    getMotors()
      .then(setMotors)
      .catch((e) => setErr(String(e)));
  }, [setErr]);

  const cfgLabel = useMemo(() => {
    const m = new Map<string, string>();
    for (const s of config.simulations)
      if (s.config_id) m.set(s.config_id, s.name);
    return (id: string) => m.get(id) ?? id.slice(0, 8);
  }, [config.simulations]);

  const mount = config.mounts.find((x) => x.id === mountId) ?? null;
  const current =
    mount?.assignments.find((a) => a.config_id === cfg) ?? null;

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return motors;
    return motors.filter(
      (m) =>
        m.designation.toLowerCase().includes(q) ||
        m.manufacturer.toLowerCase().includes(q) ||
        m.class.toLowerCase() === q,
    );
  }, [motors, filter]);

  async function run(p: Promise<Workbench>) {
    setBusy(true);
    setErr(null);
    try {
      onWorkbench(await p);
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  }

  const pick = (m: MotorInfo) =>
    mount &&
    run(
      assignMotor(
        mount.id,
        cfg,
        m.designation,
        m.digest,
        Number(delay) || 0,
      ),
    );

  const fileInput = useRef<HTMLInputElement>(null);
  const onImportMotor = async (file: File) => {
    try {
      setBusy(true);
      const text = await file.text();
      const r = await registerMotor(file.name, text);
      // Refresh the motors list so the dropdown picks up the new designation.
      const refreshed = await getMotors();
      setMotors(refreshed);
      setErr(`Imported ${r.designation}`);
    } catch (e) {
      setErr(String(e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={"motors" + (busy ? " busy" : "")}>
      <div className="motors-top">
        <button
          type="button"
          className="ghost"
          onClick={() => fileInput.current?.click()}
          title="Import a custom motor (.eng RASP)"
        >
          + Motor…
        </button>
        <input
          ref={fileInput}
          type="file"
          accept=".eng,text/plain"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImportMotor(f);
            e.target.value = "";
          }}
        />
        <label>
          Configuration
          <Select
            value={cfg}
            onChange={setCfg}
            options={config.configs.map((c) => ({
              value: c.config_id,
              label: c.name ?? cfgLabel(c.config_id),
            }))}
          />
        </label>
        <label>
          Mount
          <Select
            value={mountId}
            onChange={setMountId}
            options={config.mounts.map((m) => ({
              value: m.id,
              label: `${m.name} (${m.kind})`,
            }))}
          />
        </label>
        <label>
          Ejection delay (s)
          <input
            type="number"
            step="any"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
            style={{ width: 70 }}
          />
        </label>
        <span className="cur">
          Loaded:{" "}
          <b>{current?.designation ?? "— none —"}</b>
          {current && ` · delay ${current.ejection_delay}s`}
          {current && (
            <button
              className="link"
              onClick={() =>
                mount && run(clearMotor(mount.id, cfg))
              }
            >
              clear
            </button>
          )}
        </span>
      </div>

      <input
        className="motor-search"
        placeholder="Filter by designation, manufacturer, or class (A/B/C…)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="motor-table">
        <table>
          <thead>
            <tr>
              <th>Cls</th>
              <th>Motor</th>
              <th>Manufacturer</th>
              <th>Ø mm</th>
              <th>Impulse</th>
              <th>Avg N</th>
              <th>Burn s</th>
              <th>Mass g</th>
              <th>Delays</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => {
              const sel =
                current?.designation === m.designation &&
                (current?.digest ?? m.digest) === m.digest;
              return (
                <tr
                  key={m.file}
                  className={sel ? "sel" : ""}
                  onClick={() => pick(m)}
                >
                  <td>{m.class}</td>
                  <td>
                    <b>{m.designation}</b>
                  </td>
                  <td>{m.manufacturer.replace(/_/g, " ")}</td>
                  <td>{m.diameter_mm.toFixed(0)}</td>
                  <td>{m.total_impulse.toFixed(1)}</td>
                  <td>{m.avg_thrust.toFixed(1)}</td>
                  <td>{m.burn_time.toFixed(2)}</td>
                  <td>{m.total_mass_g.toFixed(1)}</td>
                  <td>
                    {m.delays
                      .filter((d) => d < 100)
                      .join(",") || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
