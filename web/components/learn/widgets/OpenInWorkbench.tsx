import Link from "next/link";

// CTA that deep-links the workbench to a specific bundled example. The
// /workspace page already wires `?example=`, `?path=` and `?ork_b64=` so
// we just construct the URL.
//
// `example` matches a filename under public/orks (without the .ork suffix)
// — picked because the workbench iframe already loads from /orks/.

export function OpenInWorkbench({
  example,
  label,
}: {
  example: string;
  label?: string;
}) {
  const fileName = example.endsWith(".ork") ? example : `${example}.ork`;
  const url = `/workspace?path=/orks/${encodeURIComponent(fileName)}`;
  return (
    <div className="my-6 flex items-center gap-3 rounded-xl border border-[var(--accent)] bg-[rgba(255,45,120,0.08)] p-4">
      <div className="flex-1">
        <div className="mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
          See it in the workbench
        </div>
        <div className="text-sm text-ink">{label ?? `Open ${example}`}</div>
      </div>
      <Link
        href={url}
        className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Open →
      </Link>
    </div>
  );
}
