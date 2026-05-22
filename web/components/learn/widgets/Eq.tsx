import type { ReactNode } from "react";

// Display equation block. Wraps a KaTeX expression in a labelled card so
// chapters can reference equations as "see Eq. (3)". Author writes the
// math as raw LaTeX between `$$ … $$` in the MDX body and uses this
// component when they need numbering or a side label.

export function Eq({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-6 flex items-center gap-4">
      <div className="flex-1 overflow-x-auto rounded-xl border border-[var(--line)] bg-[var(--bg-2)] px-4 py-3">
        {children}
      </div>
      {label && (
        <div className="mono shrink-0 text-xs text-muted">{label}</div>
      )}
    </div>
  );
}
