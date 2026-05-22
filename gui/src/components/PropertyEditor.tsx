import { useEffect, useMemo, useState } from "react";
import {
  EditNode,
  Field,
  Material,
  componentMass,
  listMaterials,
} from "../lib/api";
import { formatForField, formatFrom, groupForField } from "../lib/units";
import { useUnitPref } from "../lib/units-react";
import { Select } from "./ui/Select";
import { UnitInput } from "./ui/UnitInput";

// One generic panel renders every component's editable surface from the
// schema the Rust core emits — OpenRocket's ~40 dialogs collapsed into one.
// The fields carry an optional `section` tag (general / shoulder / override
// / appearance / comment) so the editor groups them into OpenRocket-style
// tabs without each component knowing about that grouping.

const SECTION_ORDER: Array<{ key: string; label: string }> = [
  { key: "general", label: "General" },
  { key: "shoulder", label: "Shoulder" },
  { key: "override", label: "Override" },
  { key: "appearance", label: "Appearance" },
  { key: "comment", label: "Comment" },
];

let materialsCache: Material[] | null = null;

function FieldRow({
  f,
  materials,
  onCommit,
}: {
  f: Field;
  materials: Material[];
  onCommit: (value: unknown) => void;
}) {
  const modelStr = formatForField(f);
  const [draft, setDraft] = useState<string>(modelStr);
  const [dirty, setDirty] = useState(false);

  // Sync from model when the upstream value changes (e.g. undo, programmatic
  // patch from another panel). The model string is already rounded so we
  // won't show IEEE-754 artifacts like 0.09999999998.
  if (!dirty && draft !== modelStr) setDraft(modelStr);

  if (f.kind === "bool") {
    return (
      <label className="prop-row">
        <span className="prop-label">{f.label}</span>
        <input
          type="checkbox"
          checked={f.value === true}
          onChange={(e) => onCommit(e.target.checked)}
        />
      </label>
    );
  }

  if (f.kind === "enum") {
    return (
      <div className="prop-row">
        <span className="prop-label">{f.label}</span>
        <Select
          value={String(f.value)}
          onChange={(v) => onCommit(v)}
          options={(f.options ?? []).map((o) => ({
            value: o,
            label: o,
          }))}
        />
      </div>
    );
  }

  if (f.kind === "color") {
    // value comes as #RRGGBBAA; <input type=color> only takes #RRGGBB,
    // so we round-trip the alpha component.
    const hex8 = modelStr.startsWith("#")
      ? modelStr
      : `#${modelStr.replace(/[^0-9a-fA-F]/g, "")}`;
    const rgb6 = hex8.length >= 7 ? hex8.slice(0, 7) : "#cccccc";
    const alpha = hex8.length >= 9 ? hex8.slice(7, 9) : "ff";
    return (
      <label className="prop-row">
        <span className="prop-label">{f.label}</span>
        <span className="prop-input">
          <input
            type="color"
            value={rgb6}
            onChange={(e) => {
              onCommit(`${e.target.value}${alpha}`.toUpperCase());
            }}
          />
        </span>
      </label>
    );
  }

  if (f.key === "material_name") {
    // Catalog picker. The current value is always preserved as a selectable
    // option even if it's not in the bundled list (handles custom materials
    // loaded from foreign .ork files).
    const unit = (k: string) =>
      k === "bulk" ? "kg/m³" : k === "surface" ? "kg/m²" : "kg/m";
    const sorted = [...materials].sort((a, b) =>
      (a.group + a.name).localeCompare(b.group + b.name),
    );
    const inCatalog = sorted.some((m) => m.name === modelStr);
    const options = [
      ...(inCatalog || !modelStr
        ? []
        : [{ value: modelStr, label: `${modelStr} (custom)` }]),
      ...sorted.map((m) => ({
        value: m.name,
        label: `${m.name} — ${m.density} ${unit(m.kind)} · ${m.group}`,
      })),
    ];
    return (
      <div className="prop-row">
        <span className="prop-label">{f.label}</span>
        <Select
          className="material-select"
          value={modelStr}
          onChange={(v) => onCommit(v)}
          options={options}
        />
      </div>
    );
  }

  const numeric =
    f.kind === "length" ||
    f.kind === "number" ||
    f.kind === "angle" ||
    f.kind === "mass" ||
    f.kind === "int";

  // Numeric fields go through UnitInput so each one can be displayed in the
  // user's preferred unit (mm/cm/in/ft, g/kg/oz/lb, ...) with the wire still
  // in the base unit Rust expects.
  if (numeric && groupForField(f)) {
    return (
      <label className="prop-row">
        <span className="prop-label">{f.label}</span>
        <span className="prop-input">
          <UnitInput field={f} onCommit={onCommit} />
        </span>
      </label>
    );
  }

  const commit = () => {
    setDirty(false);
    if (draft === modelStr) return;
    onCommit(numeric ? Number(draft) : draft);
  };

  return (
    <label className="prop-row">
      <span className="prop-label">{f.label}</span>
      <span className="prop-input">
        <input
          type={numeric ? "number" : "text"}
          step={f.kind === "int" ? 1 : "any"}
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
        {f.unit && <em className="unit">{f.unit}</em>}
      </span>
    </label>
  );
}

export function FieldList({
  fields,
  onCommit,
}: {
  fields: Field[];
  onCommit: (key: string, value: unknown) => void;
}) {
  const [materials, setMaterials] = useState<Material[]>(
    materialsCache ?? [],
  );
  useEffect(() => {
    if (materialsCache) return;
    listMaterials()
      .then((r) => {
        materialsCache = r.materials;
        setMaterials(r.materials);
      })
      .catch(() => {});
  }, []);
  return (
    <>
      {fields.map((f) => (
        <FieldRow
          key={f.key}
          f={f}
          materials={materials}
          onCommit={(v) => onCommit(f.key, v)}
        />
      ))}
    </>
  );
}

function groupBySection(fields: Field[]): Array<{ key: string; label: string; rows: Field[] }> {
  const buckets = new Map<string, Field[]>();
  const order: string[] = [];
  for (const f of fields) {
    const key = f.section ?? "general";
    if (!buckets.has(key)) {
      buckets.set(key, []);
      order.push(key);
    }
    buckets.get(key)!.push(f);
  }
  const knownOrder = SECTION_ORDER.map((s) => s.key);
  const finalOrder = [
    ...knownOrder.filter((k) => buckets.has(k)),
    ...order.filter((k) => !knownOrder.includes(k)),
  ];
  return finalOrder.map((k) => ({
    key: k,
    label:
      SECTION_ORDER.find((s) => s.key === k)?.label ??
      k.charAt(0).toUpperCase() + k.slice(1),
    rows: buckets.get(k)!,
  }));
}

export function PropertyEditor({
  node,
  onPatch,
  busy,
}: {
  node: EditNode | null;
  onPatch: (id: string, key: string, value: unknown) => void;
  busy: boolean;
}) {
  useUnitPref();
  const [materials, setMaterials] = useState<Material[]>(
    materialsCache ?? [],
  );
  useEffect(() => {
    if (materialsCache) return;
    listMaterials()
      .then((r) => {
        materialsCache = r.materials;
        setMaterials(r.materials);
      })
      .catch(() => {});
  }, []);

  const [massG, setMassG] = useState<number | null>(null);
  useEffect(() => {
    if (!node) {
      setMassG(null);
      return;
    }
    let alive = true;
    componentMass(node.id)
      .then((r) => {
        if (alive) setMassG(r.mass_g);
      })
      .catch(() => {
        if (alive) setMassG(null);
      });
    return () => {
      alive = false;
    };
  }, [node]);

  const sections = useMemo(
    () => (node ? groupBySection(node.fields) : []),
    [node],
  );

  const [activeSection, setActiveSection] = useState<string | null>(null);
  // When the node changes, default to the first section that has rows.
  useEffect(() => {
    setActiveSection(sections[0]?.key ?? null);
  }, [node]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!node)
    return <div className="empty">Select a component to edit it</div>;
  const active = sections.find((s) => s.key === activeSection) ?? sections[0];
  return (
    <div className={"prop-panel" + (busy ? " busy" : "")}>
      <div className="prop-head">
        <strong>{node.name}</strong>
        <span className="k">{node.kind}</span>
        {massG !== null && (
          <span className="mass-readout" title="Component mass">
            {formatFrom(massG, "mass", "g")}
          </span>
        )}
      </div>
      {sections.length > 1 && (
        <div className="prop-tabs">
          {sections.map((s) => (
            <button
              key={s.key}
              type="button"
              className={"prop-tab" + (s.key === active?.key ? " active" : "")}
              onClick={() => setActiveSection(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
      <FieldList
        fields={active?.rows ?? []}
        onCommit={(key, v) => onPatch(node.id, key, v)}
      />
      {/* keep the datalist mounted even if no material_name row is active */}
      <datalist id="opsrocket-materials">
        {materials.map((m) => (
          <option key={m.name} value={m.name}>
            {m.density} · {m.group}
          </option>
        ))}
      </datalist>
    </div>
  );
}
