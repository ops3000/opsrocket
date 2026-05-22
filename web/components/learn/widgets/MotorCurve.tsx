"use client";

// Thrust curve mini-viewer. v1 just renders a static SVG curve sketch from
// hard-coded shape parameters keyed by designation — no live motor catalog
// fetch yet (the workbench-side wasm catalog isn't trivially reachable
// from the marketing surface). When we want live curves later we can plug
// in /api/motor/<designation> that proxies through the wasm engine.

const PROFILES: Record<
  string,
  { peak: number; avg: number; burn: number; class: string }
> = {
  "C6-3": { peak: 14.6, avg: 4.7, burn: 1.86, class: "C" },
  "D12-5": { peak: 29.7, avg: 11.6, burn: 1.7, class: "D" },
  "F15-6": { peak: 24.5, avg: 15.6, burn: 3.45, class: "F" },
  "H128W-M": { peak: 178, avg: 128, burn: 1.65, class: "H" },
};

export function MotorCurve({ designation }: { designation: string }) {
  const p = PROFILES[designation];
  if (!p) {
    return (
      <div className="my-6 rounded-xl border border-[var(--line)] bg-[var(--bg-2)] p-4 text-sm text-muted">
        Unknown motor designation: <code>{designation}</code>. Try{" "}
        {Object.keys(PROFILES).join(", ")}.
      </div>
    );
  }

  const W = 480;
  const H = 180;
  const padL = 38;
  const padR = 14;
  const padT = 14;
  const padB = 26;

  // Synthetic thrust curve: fast spike to peak in ~12% of burn, smooth
  // decay to a steady plateau, then linear cutoff. Enough to teach what a
  // "thrust curve" is, not enough to claim it's the real data.
  const pts: [number, number][] = [];
  for (let i = 0; i <= 60; i++) {
    const t = (i / 60) * p.burn;
    const rise = Math.min(1, t / (0.12 * p.burn));
    const plateau = Math.exp(-2.2 * Math.max(0, t / p.burn - 0.12));
    const tail = t > 0.92 * p.burn ? (p.burn - t) / (0.08 * p.burn) : 1;
    const T =
      Math.max(0, rise * p.peak * plateau) * Math.max(0, Math.min(1, tail));
    pts.push([t, T]);
  }

  const X = (t: number) => padL + (t / p.burn) * (W - padL - padR);
  const Y = (T: number) => H - padB - (T / p.peak) * (H - padT - padB);

  const d = pts.map(([t, T], i) => `${i === 0 ? "M" : "L"}${X(t).toFixed(1)},${Y(T).toFixed(1)}`).join(" ");

  return (
    <div className="my-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-4">
      <div className="mono mb-2 flex items-center justify-between text-xs">
        <span className="tracking-[0.2em] text-[var(--accent2)]">
          {designation} · class {p.class}
        </span>
        <span className="text-muted">
          peak {p.peak} N · avg {p.avg} N · burn {p.burn} s
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="var(--line)" />
        <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="var(--line)" />
        <path d={d} fill="none" stroke="var(--accent)" strokeWidth={2} />
        <text x={padL} y={padT - 2} fontSize={10} fill="var(--muted)">
          thrust (N)
        </text>
        <text x={W - padR} y={H - 6} fontSize={10} fill="var(--muted)" textAnchor="end">
          t (s) — {p.burn}
        </text>
      </svg>
      <div className="mt-1 text-[11px] text-muted">
        Sketched profile, not measured data — real .eng curves live in the workbench.
      </div>
    </div>
  );
}
