import { useEffect } from "react";
import { UNIT_GROUPS, UnitGroupId, getUserUnit, setUserUnit } from "../lib/units";
import { useUnitPref } from "../lib/units-react";
import { Select } from "./ui/Select";

// OpenRocket-style "Preferences → Units" dialog. The actual user-facing
// preference is the *default display unit per group*; every UnitInput and
// every read-only formatter picks it up via getUserUnit() and re-renders on
// the "opsrocket-units-changed" event that setUserUnit broadcasts.

const GROUP_LABELS: Record<UnitGroupId, string> = {
  length: "Length (component dimensions)",
  mass: "Mass",
  angle: "Angle",
  velocity: "Velocity (wind, ground hit)",
  temperature: "Temperature",
  pressure: "Pressure",
  distance: "Distance (altitude, rod length)",
  time: "Time",
  density_bulk: "Bulk density",
  density_surface: "Surface density",
  density_line: "Line density",
};

export function PreferencesModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useUnitPref();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const groupIds = Object.keys(UNIT_GROUPS) as UnitGroupId[];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal pref-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>Preferences — Units</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">
          <p className="pref-hint">
            Pick the default unit shown next to each quantity. You can still
            override on a per-field basis with the small unit chip in the
            editor.
          </p>
          <div className="pref-grid">
            {groupIds.map((g) => (
              <label key={g} className="pref-row">
                <span className="pref-label">{GROUP_LABELS[g]}</span>
                <Select
                  value={getUserUnit(g)}
                  onChange={(v) => setUserUnit(g, v)}
                  options={UNIT_GROUPS[g].units.map((u) => ({
                    value: u.symbol,
                    label: u.symbol,
                  }))}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="modal-foot">
          <button
            className="ghost"
            onClick={() => {
              for (const g of groupIds) setUserUnit(g, UNIT_GROUPS[g].base);
            }}
            title="Reset all groups to their OpsRocket defaults"
          >
            Reset to defaults
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
