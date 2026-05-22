"use client";

import { useMemo, useState } from "react";

// Tsiolkovsky rocket equation playground:
//   Δv = v_e · ln(m0 / m_f),   m_f = m0 - m_prop
// Sliders for Isp and propellant mass fraction → Δv.
// Reference points: LEO ≈ 9.4 km/s, Moon TLI from LEO ≈ 3.2 km/s,
// hobby high-power flight ≈ 0.3 km/s.

const G0 = 9.80665;

export function Tsiolkovsky() {
  const [isp, setIsp] = useState(265);
  const [pmf, setPmf] = useState(0.85);

  const { dv, mRatio, ve } = useMemo(() => {
    const ve = isp * G0;
    const mRatio = 1 / (1 - pmf);
    const dv = ve * Math.log(mRatio);
    return { dv, mRatio, ve };
  }, [isp, pmf]);

  return (
    <div className="my-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5">
      <div className="mono mb-3 text-xs tracking-[0.2em] text-[var(--accent2)]">
        TSIOLKOVSKY PLAYGROUND
      </div>
      <div className="grid grid-cols-1 gap-3">
        <Row label="Isp" value={isp} unit="s" min={60} max={460} step={1} on={setIsp} />
        <Row label="Prop. mass fraction" value={pmf} unit="" min={0.1} max={0.95} step={0.01} on={setPmf} fmt={(v) => v.toFixed(2)} />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3 border-t border-[var(--line)] pt-4">
        <Out label="v_e" value={`${(ve / 1000).toFixed(2)} km/s`} />
        <Out label="m0 / m_f" value={mRatio.toFixed(2)} />
        <Out label="Δv" value={`${(dv / 1000).toFixed(2)} km/s`} />
      </div>
      <div className="mt-3 text-xs text-muted">
        Reference: LEO insertion ≈ 9.4 km/s · Moon TLI from LEO ≈ 3.2 km/s · hobby high-power ≈ 0.3 km/s
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  unit,
  min,
  max,
  step,
  on,
  fmt,
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  on: (v: number) => void;
  fmt?: (v: number) => string;
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-44 shrink-0 text-muted">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => on(Number(e.target.value))}
        className="flex-1"
      />
      <span className="mono w-20 shrink-0 text-right tabular-nums text-ink">
        {fmt ? fmt(value) : value} {unit}
      </span>
    </label>
  );
}

function Out({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {label}
      </div>
      <div className="text-xl font-semibold text-[var(--accent)]">{value}</div>
    </div>
  );
}
