import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { Field } from "../../lib/api";
import {
  UNIT_GROUPS,
  decimalsFor,
  fromBase,
  formatForField,
  getUserUnit,
  groupForField,
  roundForDisplay,
  setUserUnit,
  toBase,
  unitInGroup,
} from "../../lib/units";

// OpenRocket-style number input with a per-field unit picker. Wire base unit
// is whatever Rust sends (mm for length, g for mass, ° for angle, °C for
// temp, hPa for pressure, m/s for velocity, m for distance, s for time).
// The picker switches the *display* unit; the value sent back via onCommit
// is always converted back to the wire base.
//
// Fields with no resolvable group (unit-less `number`, or labels like "°N"
// that are not real angles) fall back to the plain-input behaviour — the
// chip is non-interactive and shows the static unit string.

interface Props {
  field: Field;
  /** Called with the value in the wire base unit (i.e. what to send to Rust). */
  onCommit: (baseValue: number) => void;
  disabled?: boolean;
  /** Optional slider, given in *base unit* range. */
  slider?: [min: number, max: number];
  inputClass?: string;
  sliderClass?: string;
}

// Subscribe to the global "user changed default unit" broadcast so every
// UnitInput on screen re-renders together when the Preferences panel writes
// a new default for the group.
function useUnitPrefBump(): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    const onBump = () => setN((x) => x + 1);
    window.addEventListener("opsrocket-units-changed", onBump);
    return () => window.removeEventListener("opsrocket-units-changed", onBump);
  }, []);
  return n;
}

export function UnitInput({
  field,
  onCommit,
  disabled = false,
  slider,
  inputClass,
  sliderClass,
}: Props) {
  useUnitPrefBump();

  const group = groupForField(field);
  const baseValue =
    typeof field.value === "number" ? (field.value as number) : NaN;
  // Resolve which unit to display: user pref → field.unit (= base) → group base.
  const displayUnit = group
    ? getUserUnit(group)
    : (field.unit ?? "");
  const unitDef = group ? unitInGroup(group, displayUnit) : null;

  const displayValue = group
    ? fromBase(group, baseValue, displayUnit)
    : baseValue;
  const modelStr = Number.isFinite(displayValue)
    ? group && unitDef
      ? roundForDisplay(displayValue, decimalsFor(unitDef, Math.abs(displayValue)))
      : formatForField(field)
    : "";

  const [draft, setDraft] = useState<string>(modelStr);
  const [dirty, setDirty] = useState(false);
  if (!dirty && draft !== modelStr) setDraft(modelStr);

  const commit = useCallback(() => {
    setDirty(false);
    if (draft === modelStr) return;
    const n = Number(draft);
    if (!Number.isFinite(n)) return;
    onCommit(group ? toBase(group, n, displayUnit) : n);
  }, [draft, modelStr, group, displayUnit, onCommit]);

  // Slider operates in display units, but the range was passed in base units.
  const sliderRange = slider && group
    ? ([fromBase(group, slider[0], displayUnit), fromBase(group, slider[1], displayUnit)] as const)
    : slider;

  return (
    <>
      <input
        className={inputClass}
        type={field.kind === "int" || field.kind === "number" || field.kind === "length" || field.kind === "angle" || field.kind === "mass" ? "number" : "text"}
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
      <UnitChip
        group={group ? group : null}
        unit={displayUnit}
        disabled={disabled}
        fallbackLabel={field.unit ?? ""}
      />
      {sliderRange && (
        <input
          className={sliderClass}
          type="range"
          min={sliderRange[0]}
          max={sliderRange[1]}
          step={(sliderRange[1] - sliderRange[0]) / 100}
          disabled={disabled}
          value={Number(draft) || 0}
          onChange={(e) => {
            setDirty(false);
            const v = Number(e.target.value);
            setDraft(String(v));
            // Slider always commits live — convert back to base for the wire.
            onCommit(group ? toBase(group, v, displayUnit) : v);
          }}
        />
      )}
    </>
  );
}

// The little clickable unit chip next to the input. Acts like a portalled
// popover with the list of available units in the group. Non-interactive
// (just a label) when the field has no resolvable unit group.
function UnitChip({
  group,
  unit,
  disabled,
  fallbackLabel,
}: {
  group: ReturnType<typeof groupForField>;
  unit: string;
  disabled: boolean;
  fallbackLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const r = trigger.current?.getBoundingClientRect();
      if (!r) return;
      const listW = list.current?.offsetWidth ?? 90;
      const vw = window.innerWidth;
      let left = r.left;
      if (left + listW > vw - 8) left = r.right - listW;
      if (left < 8) left = 8;
      setPos({ left, top: r.bottom + 4 });
    };
    place();
    const raf = requestAnimationFrame(place);
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        trigger.current && !trigger.current.contains(t) &&
        list.current && !list.current.contains(t)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  if (!group) {
    // Plain label for fields with no real unit group (e.g. °N latitude).
    return fallbackLabel ? <em className="unit">{fallbackLabel}</em> : <span />;
  }

  const opts = UNIT_GROUPS[group].units;

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={"unit-chip" + (open ? " open" : "") + (disabled ? " disabled" : "")}
        disabled={disabled}
        onClick={() => !disabled && setOpen((o) => !o)}
        title={`Change unit (currently ${unit})`}
      >
        {unit}
      </button>
      {open && pos &&
        createPortal(
          <ul
            ref={list}
            className="unit-chip-list"
            onWheel={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{ position: "fixed", left: pos.left, top: pos.top }}
          >
            {opts.map((o) => (
              <li
                key={o.symbol}
                className={"unit-chip-opt" + (o.symbol === unit ? " sel" : "")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  setUserUnit(group, o.symbol);
                  setOpen(false);
                }}
              >
                {o.symbol}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
}
