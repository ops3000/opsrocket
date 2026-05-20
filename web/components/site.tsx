// Shared chrome + section bodies. The home page is now just the blueprint
// hero; PARITY / VALIDATION / RENDER / ARCHITECTURE each live on their own
// route and reuse the pieces here.
import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import {
  PARITY,
  VALIDATION,
  RENDER,
  ARCH,
  STATS,
  FIXTURES,
  ARCH_NOTE,
} from "@/lib/data";

const NAV: [string, string][] = [
  ["PARITY", "/parity"],
  ["VALIDATION", "/validation"],
  ["RENDER", "/render"],
  ["ARCHITECTURE", "/architecture"],
];

export function SiteNav({ active }: { active?: string }) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line">
      <div className="bp-grid absolute inset-0 opacity-60" />
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/ops.png"
            alt="OpsRocket"
            className="ops-logo h-9 w-9"
          />
          <span className="text-lg font-bold tracking-tight text-ink">
            OpsRocket
          </span>
        </Link>
        <div className="mono hidden gap-7 text-xs sm:flex">
          {NAV.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={
                active === href
                  ? "text-[var(--accent2)]"
                  : "text-muted hover:text-ink"
              }
            >
              {label}
            </Link>
          ))}
        </div>
        <Link
          href="/workspace"
          className="hidden rounded-full border border-[var(--accent)] bg-[rgba(255,45,120,0.12)] px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[rgba(255,45,120,0.25)] sm:inline-flex"
        >
          Open Workbench →
        </Link>
        <MobileMenu active={active} />
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="glow absolute inset-x-0 top-0 h-40" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center">
        <img
          src="/ops.png"
          alt="OpsRocket"
          className="ops-logo h-12 w-12"
        />
        <h2 className="text-3xl font-bold sm:text-4xl">
          Open a design. Watch the numbers match.
        </h2>
        <Link
          href="/workspace"
          className="rounded-full bg-[var(--accent)] px-8 py-4 text-base font-semibold text-white transition hover:opacity-90"
        >
          Enter the workbench →
        </Link>
        <div className="mono mt-6 text-xs text-muted">
          OpsRocket · Rust core · GPL-3.0-or-later · not affiliated with
          OpenRocket
        </div>
      </div>
    </footer>
  );
}

export function Section({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="mono mb-2 text-xs tracking-[0.25em] text-[var(--accent2)]">
        {tag}
      </div>
      <h1 className="mb-8 text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
      {children}
    </section>
  );
}

export function DataTable({
  head,
  rows,
}: {
  head: string[];
  rows: string[][];
}) {
  return (
    <div className="card overflow-hidden">
      <table className="data">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={h} className={i ? "num" : ""}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]}>
              {r.map((c, i) => (
                <td
                  key={i}
                  className={i ? "num text-ink" : "text-muted"}
                  style={
                    i === r.length - 1
                      ? { color: "var(--good)", fontWeight: 700 }
                      : undefined
                  }
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// A boxed-out methodology / reasoning callout — the "why you can trust
// this number" paragraph that sits next to the headline result.
export function Callout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card relative mt-10 overflow-hidden px-6 py-5">
      <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent2)]" />
      <div className="mono mb-2 text-[10px] uppercase tracking-[0.2em] text-[var(--accent2)]">
        {label}
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted">
        {children}
      </p>
    </div>
  );
}

export function StatStrip() {
  return (
    <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {STATS.map((m) => (
        <div key={m.k} className="card px-4 py-4">
          <div className="mono text-[10px] uppercase tracking-wider text-muted">
            {m.k}
          </div>
          <div className="mt-1 text-2xl font-bold text-[var(--accent2)]">
            {m.v}
          </div>
          <div className="mt-0.5 text-[11px] leading-snug text-muted">
            {m.s}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FixtureGrid() {
  return (
    <div className="mt-12">
      <div className="mono mb-4 text-xs tracking-[0.2em] text-[var(--accent2)]">
        THE 17 FIXTURES
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {FIXTURES.map(([name, what]) => (
          <div
            key={name}
            className="card flex items-baseline gap-3 px-4 py-3 text-sm"
          >
            <span className="font-semibold text-ink">{name}</span>
            <span className="text-muted">— {what}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── the four section bodies ─────────────────────────────────────────────

export function ParityBody() {
  return (
    <Section tag="PHYSICS PARITY" title="Bit-for-bit against Java OpenRocket">
      <p className="mb-2 max-w-3xl text-muted">{PARITY.intro}</p>
      <StatStrip />
      <div className="mt-12">
        <DataTable
          head={["Metric", "Before", "Now", "Result"]}
          rows={PARITY.rows}
        />
      </div>
      <Callout label="How the ground truth is made">{PARITY.method}</Callout>
      <div className="mono mt-12 mb-4 text-xs tracking-[0.2em] text-[var(--accent2)]">
        ALGORITHMS PORTED FAITHFULLY (NOT APPROXIMATED)
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {PARITY.ports.map((p) => (
          <div
            key={p}
            className="card flex items-start gap-3 px-4 py-3 text-sm text-muted"
          >
            <span className="mt-0.5 text-[var(--good)]">✓</span>
            <span>{p}</span>
          </div>
        ))}
      </div>
      <FixtureGrid />
    </Section>
  );
}

export function ValidationBody() {
  return (
    <Section
      tag="ACADEMIC VALIDATION"
      title="−0.0% against a real flown rocket"
    >
      <p className="mb-8 max-w-3xl text-muted">{VALIDATION.source}</p>
      <DataTable
        head={["Case", "Measured / ref", "Predicted", "Δ"]}
        rows={VALIDATION.rows}
      />
      <Callout label="Why this is a calibration, not a fit">
        {VALIDATION.method}
      </Callout>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        {VALIDATION.note}
      </p>
    </Section>
  );
}

export function RenderBody() {
  return (
    <Section
      tag="RENDER FIDELITY"
      title="Pixel-checked against OpenRocket's own renderer"
    >
      <p className="mb-8 max-w-3xl text-muted">{RENDER.intro}</p>
      <DataTable head={["Mode", "Result", "Coverage"]} rows={RENDER.rows} />
      <Callout label="How it is scored">{RENDER.method}</Callout>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        {RENDER.note}
      </p>
    </Section>
  );
}

export function ArchBody() {
  return (
    <Section tag="ARCHITECTURE" title="One Rust engine, two frontends">
      <div className="grid gap-3 md:grid-cols-2">
        {ARCH.map(([name, desc]) => (
          <div key={name} className="card px-5 py-4">
            <div className="mono text-sm font-semibold text-[var(--accent2)]">
              {name}
            </div>
            <div className="mt-1 text-sm text-muted">{desc}</div>
          </div>
        ))}
      </div>
      <Callout label="No server required">{ARCH_NOTE}</Callout>
      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        <span className="text-ink">opsrocket-view</span>{" "}is the single
        boundary every frontend speaks to. This site&apos;s{" "}
        <Link href="/workspace" className="text-[var(--accent2)] underline">
          /workspace
        </Link>{" "}
        is that workbench running entirely on the WASM build — open it and edit
        a real design with no backend in the loop.
      </p>
    </Section>
  );
}
