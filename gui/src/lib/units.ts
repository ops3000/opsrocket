// Unit-group registry. Mirrors OpenRocket's net.sf.openrocket.unit.UnitGroup
// so each numeric quantity has a base unit (= what the Rust core emits on the
// wire) and a list of display units the UI can switch to. Conversion is:
//
//   display = (base - 0) * scale + offset       (offset only for temperature)
//   base    = (display - offset) / scale
//
// `scale = 1 / multiplier_in_base_per_one_display_unit`.
// For length with base = mm:  cm has multiplier 10  → scale = 0.1
//                              m  has multiplier 1000 → scale = 0.001
//                              in has multiplier 25.4 → scale ≈ 0.0394
//
// The default unit per group is what Rust emits today; the user can override
// per group via localStorage (set in P4 by the Preferences panel).
//
// formatForField(field) is the entry point for P1: it returns a clean,
// rounded display string for the field's current value, killing IEEE-754
// artifacts like 0.09999999998 that surface when the value round-trips
// through the Rust schema.

import type { Field, FieldKind } from "./api";

export type UnitGroupId =
  | "length"
  | "mass"
  | "angle"
  | "velocity"
  | "temperature"
  | "pressure"
  | "distance"
  | "time"
  | "density_bulk"
  | "density_surface"
  | "density_line";

export interface UnitDef {
  /** Symbol shown next to the input (e.g. "mm", "in", "°", "°C"). */
  symbol: string;
  /** Multiplier from this display unit to base: 1 display unit = mult base units. */
  mult: number;
  /** Additive offset (display = base * (1/mult) + offset), only used for temperature. */
  offset?: number;
  /** Display precision. Either fixed digits or a dynamic function of magnitude. */
  decimals: number | ((abs: number) => number);
}

export interface UnitGroupDef {
  id: UnitGroupId;
  /** Name of the wire base unit (must match a `symbol` in `units`). */
  base: string;
  units: UnitDef[];
}

// OpenRocket-flavoured precision heuristic. Always strip trailing zeros at
// the end of formatForUnit() so 1.000 mm renders as "1 mm".
const lenDec = (a: number) => (a >= 100 ? 1 : a >= 10 ? 2 : 3);
const massDec = (a: number) => (a >= 10 ? 1 : 2);

export const UNIT_GROUPS: Record<UnitGroupId, UnitGroupDef> = {
  length: {
    id: "length",
    base: "mm",
    units: [
      { symbol: "mm", mult: 1, decimals: lenDec },
      { symbol: "cm", mult: 10, decimals: (a) => (a >= 10 ? 2 : 3) },
      { symbol: "m", mult: 1000, decimals: (a) => (a >= 1 ? 3 : 4) },
      { symbol: "in", mult: 25.4, decimals: 3 },
      { symbol: "ft", mult: 304.8, decimals: 3 },
    ],
  },
  mass: {
    id: "mass",
    base: "g",
    units: [
      { symbol: "g", mult: 1, decimals: massDec },
      { symbol: "kg", mult: 1000, decimals: 3 },
      { symbol: "oz", mult: 28.349523125, decimals: 2 },
      { symbol: "lb", mult: 453.59237, decimals: 3 },
    ],
  },
  angle: {
    id: "angle",
    base: "°",
    units: [
      { symbol: "°", mult: 1, decimals: 1 },
      { symbol: "rad", mult: 180 / Math.PI, decimals: 4 },
      { symbol: "arcmin", mult: 1 / 60, decimals: 1 },
    ],
  },
  velocity: {
    id: "velocity",
    base: "m/s",
    units: [
      { symbol: "m/s", mult: 1, decimals: 2 },
      { symbol: "km/h", mult: 1 / 3.6, decimals: 2 },
      { symbol: "ft/s", mult: 0.3048, decimals: 2 },
      { symbol: "mph", mult: 0.44704, decimals: 2 },
      { symbol: "kt", mult: 0.5144444, decimals: 2 },
    ],
  },
  temperature: {
    id: "temperature",
    base: "°C",
    units: [
      { symbol: "°C", mult: 1, offset: 0, decimals: 1 },
      // °F = °C * 9/5 + 32  ⇒ display = base*(1/mult) + offset, with mult=5/9, offset=32
      { symbol: "°F", mult: 5 / 9, offset: 32, decimals: 1 },
      { symbol: "K", mult: 1, offset: 273.15, decimals: 2 },
    ],
  },
  pressure: {
    id: "pressure",
    base: "hPa",
    units: [
      { symbol: "hPa", mult: 1, decimals: 2 },
      { symbol: "mbar", mult: 1, decimals: 2 },
      { symbol: "Pa", mult: 0.01, decimals: 0 },
      { symbol: "kPa", mult: 10, decimals: 3 },
      { symbol: "atm", mult: 1013.25, decimals: 4 },
      { symbol: "psi", mult: 68.9476, decimals: 3 },
    ],
  },
  distance: {
    id: "distance",
    base: "m",
    units: [
      { symbol: "m", mult: 1, decimals: (a) => (a >= 100 ? 0 : a >= 10 ? 1 : 2) },
      { symbol: "km", mult: 1000, decimals: 3 },
      { symbol: "ft", mult: 0.3048, decimals: 1 },
      { symbol: "mi", mult: 1609.344, decimals: 3 },
      { symbol: "nmi", mult: 1852, decimals: 3 },
    ],
  },
  time: {
    id: "time",
    base: "s",
    units: [
      { symbol: "s", mult: 1, decimals: 2 },
      { symbol: "min", mult: 60, decimals: 3 },
      { symbol: "ms", mult: 0.001, decimals: 0 },
    ],
  },
  density_bulk: {
    id: "density_bulk",
    base: "kg/m³",
    units: [
      { symbol: "kg/m³", mult: 1, decimals: 1 },
      { symbol: "g/cm³", mult: 1000, decimals: 3 },
      { symbol: "lb/ft³", mult: 16.0184634, decimals: 3 },
    ],
  },
  density_surface: {
    id: "density_surface",
    base: "kg/m²",
    units: [
      { symbol: "kg/m²", mult: 1, decimals: 4 },
      { symbol: "g/cm²", mult: 10, decimals: 4 },
      { symbol: "oz/ft²", mult: 0.30515, decimals: 3 },
    ],
  },
  density_line: {
    id: "density_line",
    base: "kg/m",
    units: [
      { symbol: "kg/m", mult: 1, decimals: 4 },
      { symbol: "g/m", mult: 0.001, decimals: 3 },
      { symbol: "oz/in", mult: 1.11612, decimals: 4 },
    ],
  },
};

// Infer which UnitGroup a Field belongs to, from its `kind` + `unit` label.
// In P2 the Rust core will emit Field.group directly; for now we resolve it
// here so we don't need a wire change for P1.
export function groupForField(field: {
  kind: FieldKind;
  unit?: string;
}): UnitGroupId | null {
  if (field.kind === "length") return "length";
  if (field.kind === "mass") return "mass";
  if (field.kind === "angle") return "angle";
  if (field.kind !== "number") return null;
  const u = field.unit?.trim();
  if (!u) return null;
  switch (u) {
    case "m/s":
    case "km/h":
    case "ft/s":
    case "mph":
    case "kt":
      return "velocity";
    case "°C":
    case "°F":
    case "K":
      return "temperature";
    case "hPa":
    case "Pa":
    case "kPa":
    case "mbar":
    case "atm":
    case "psi":
      return "pressure";
    case "m":
    case "km":
    case "ft":
    case "mi":
    case "nmi":
      return "distance";
    case "s":
    case "ms":
    case "min":
      return "time";
    case "kg/m³":
    case "g/cm³":
    case "lb/ft³":
      return "density_bulk";
    case "kg/m²":
    case "g/cm²":
      return "density_surface";
    case "kg/m":
    case "g/m":
      return "density_line";
    default:
      return null;
  }
}

export function unitInGroup(group: UnitGroupId, symbol: string): UnitDef | null {
  const g = UNIT_GROUPS[group];
  return g.units.find((u) => u.symbol === symbol) ?? null;
}

// Convert a value from the wire base unit to the requested display unit.
export function fromBase(
  group: UnitGroupId,
  baseValue: number,
  toSymbol: string,
): number {
  const u = unitInGroup(group, toSymbol);
  if (!u) return baseValue;
  // base * (1/mult) + offset
  return baseValue / u.mult + (u.offset ?? 0);
}

// Inverse: from a user-typed display value back to the base unit.
export function toBase(
  group: UnitGroupId,
  displayValue: number,
  fromSymbol: string,
): number {
  const u = unitInGroup(group, fromSymbol);
  if (!u) return displayValue;
  return (displayValue - (u.offset ?? 0)) * u.mult;
}

// Round a number to N decimals and strip trailing zeros so 1.000 → "1".
export function roundForDisplay(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return String(value);
  // toFixed handles the rounding; then strip trailing zeros / lone "." so
  // we don't show "1.000 mm" when the underlying value is integer-clean.
  const fixed = value.toFixed(Math.max(0, Math.min(12, decimals)));
  if (!fixed.includes(".")) return fixed;
  return fixed.replace(/0+$/, "").replace(/\.$/, "");
}

export function decimalsFor(u: UnitDef, abs: number): number {
  return typeof u.decimals === "function" ? u.decimals(abs) : u.decimals;
}

// Format a *display-unit* value (i.e. what Rust already sent on the wire) for
// a Field. Strips IEEE-754 noise: 0.09999999998 → "0.1", 999.999999 → "1000".
export function formatForField(field: Field): string {
  const v = field.value;
  if (v === null || v === undefined) return "";
  if (typeof v !== "number") return String(v);
  if (!Number.isFinite(v)) return String(v);
  if (field.kind === "int") return String(Math.round(v));
  const group = groupForField(field);
  if (group) {
    // The wire unit IS the field's `unit` label — use that as the source-of-truth
    // for precision so we round to that unit's natural digits.
    const u =
      unitInGroup(group, field.unit ?? UNIT_GROUPS[group].base) ??
      unitInGroup(group, UNIT_GROUPS[group].base)!;
    return roundForDisplay(v, decimalsFor(u, Math.abs(v)));
  }
  // Unit-less number — generic clean-up. 6 sig digits, strip trailing zeros.
  if (Math.abs(v) >= 1) {
    return roundForDisplay(v, 4);
  }
  return roundForDisplay(v, 6);
}

// localStorage preference for the *default* display unit per group. Used in
// P2's UnitInput picker and P4's Preferences panel. Reading is safe in SSR
// (returns null) so this module can be imported anywhere.
const PREF_PREFIX = "opsrocket_unit_";

export function getUserUnit(group: UnitGroupId): string {
  try {
    return (
      window.localStorage.getItem(PREF_PREFIX + group) ??
      UNIT_GROUPS[group].base
    );
  } catch {
    return UNIT_GROUPS[group].base;
  }
}

// Render a base-unit value as "<rounded> <unit>" using the user's preferred
// unit for that group. Useful for read-only displays (stability bar, flight
// summary, canvas overlays) that don't go through UnitInput.
export function formatQuantity(
  baseValue: number,
  group: UnitGroupId,
  opts?: { decimals?: number; withUnit?: boolean },
): string {
  if (!Number.isFinite(baseValue)) return String(baseValue);
  const unit = getUserUnit(group);
  const u = unitInGroup(group, unit) ?? UNIT_GROUPS[group].units[0];
  const display = fromBase(group, baseValue, unit);
  const dec = opts?.decimals ?? decimalsFor(u, Math.abs(display));
  const num = roundForDisplay(display, dec);
  return opts?.withUnit === false ? num : `${num} ${unit}`;
}

// Same, but the input value is in `sourceUnit` (not the group's base). Used
// by API types whose field names already bake in a unit (mass_g, cg_cm,
// ref_diameter_mm, etc.) — we round-trip via base so the user's chosen
// display unit kicks in even when the wire format is "cm" but base is "mm".
export function formatFrom(
  value: number,
  group: UnitGroupId,
  sourceUnit: string,
  opts?: { decimals?: number; withUnit?: boolean },
): string {
  if (!Number.isFinite(value)) return String(value);
  const base = toBase(group, value, sourceUnit);
  return formatQuantity(base, group, opts);
}

// React hook: re-render the caller when the user changes any default unit.
// (Read-only displays that aren't inside a UnitInput need this manually.)
// Hook implementation lives in units-react.ts to keep this file framework-free.

export function setUserUnit(group: UnitGroupId, symbol: string): void {
  try {
    if (symbol === UNIT_GROUPS[group].base) {
      window.localStorage.removeItem(PREF_PREFIX + group);
    } else {
      window.localStorage.setItem(PREF_PREFIX + group, symbol);
    }
    window.dispatchEvent(new CustomEvent("opsrocket-units-changed"));
  } catch {
    // ignore (private mode etc.)
  }
}
