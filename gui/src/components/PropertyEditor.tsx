import { useState } from "react";
import { EditNode, Field } from "../lib/api";
import { Select } from "./ui/Select";

// One generic panel renders every component's editable surface from the
// schema the Rust core emits — OpenRocket's 40 dialogs collapsed into one.

function FieldRow({
  f,
  onCommit,
}: {
  f: Field;
  onCommit: (value: unknown) => void;
}) {
  const [draft, setDraft] = useState<string>(String(f.value ?? ""));
  const [dirty, setDirty] = useState(false);

  // Keep the input in sync when the model changes underneath us (e.g. a
  // dependent field recomputed) — unless the user is mid-edit.
  const modelStr = String(f.value ?? "");
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

  const numeric =
    f.kind === "length" ||
    f.kind === "number" ||
    f.kind === "angle" ||
    f.kind === "mass" ||
    f.kind === "int";

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
  return (
    <>
      {fields.map((f) => (
        <FieldRow
          key={f.key}
          f={f}
          onCommit={(v) => onCommit(f.key, v)}
        />
      ))}
    </>
  );
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
  if (!node)
    return <div className="empty">Select a component to edit it</div>;
  return (
    <div className={"prop-panel" + (busy ? " busy" : "")}>
      <div className="prop-head">
        <strong>{node.name}</strong>
        <span className="k">{node.kind}</span>
      </div>
      <FieldList
        fields={node.fields}
        onCommit={(key, v) => onPatch(node.id, key, v)}
      />
    </div>
  );
}
