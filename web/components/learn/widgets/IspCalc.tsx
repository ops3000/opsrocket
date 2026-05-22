"use client";

import { useMemo, useState } from "react";

// Specific-impulse calculator. Uses the ideal-nozzle relation:
//   v_e = sqrt( 2k/(k-1) · R/M · T_c · [1 - (p_e/p_c)^((k-1)/k)] )
// then Isp = v_e / g0. Handy for showing how chamber temperature,
// pressure ratio and gas properties trade against each other.
//
// All inputs are in SI; outputs in m/s and seconds.

const R = 8.31446; // J / (mol·K)
const G0 = 9.80665; // m/s²

function exhaustVelocity(
  k: number,
  M_g_per_mol: number,
  T_c: number,
  p_c: number,
  p_e: number,
): number {
  if (k <= 1 || M_g_per_mol <= 0 || T_c <= 0 || p_c <= p_e) return 0;
  const M = M_g_per_mol / 1000;
  const ratio = 1 - Math.pow(p_e / p_c, (k - 1) / k);
  return Math.sqrt(((2 * k) / (k - 1)) * (R / M) * T_c * ratio);
}

export function IspCalc() {
  const [Tc, setTc] = useState(3500);
  const [pc, setPc] = useState(70);
  const [pe, setPe] = useState(1);
  const [k, setK] = useState(1.22);
  const [M, setM] = useState(22);

  const { ve, isp } = useMemo(() => {
    const ve = exhaustVelocity(k, M, Tc, pc * 1e5, pe * 1e5);
    return { ve, isp: ve / G0 };
  }, [Tc, pc, pe, k, M]);

  return (
    <div className="my-6 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5">
      <div className="mono mb-3 text-xs tracking-[0.2em] text-[var(--accent2)]">
        ISP CALCULATOR
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Row label="Chamber T_c" value={Tc} unit="K" min={500} max={4500} step={50} on={setTc} />
        <Row label="Chamber p_c" value={pc} unit="bar" min={5} max={300} step={1} on={setPc} />
        <Row label="Exit p_e" value={pe} unit="bar" min={0.05} max={5} step={0.05} on={setPe} />
        <Row label="Ratio k = cp/cv" value={k} unit="" min={1.1} max={1.4} step={0.01} on={setK} />
        <Row label="Mol. mass M" value={M} unit="g/mol" min={2} max={40} step={0.5} on={setM} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-4">
        <Out label="Exhaust velocity v_e" value={`${ve.toFixed(0)} m/s`} />
        <Out label="Specific impulse Isp" value={`${isp.toFixed(0)} s`} />
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
}: {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  on: (v: number) => void;
}) {
  return (
    <label className="flex items-center gap-3 text-sm">
      <span className="w-32 shrink-0 text-muted">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => on(Number(e.target.value))}
        className="flex-1"
      />
      <span className="mono w-24 shrink-0 text-right tabular-nums text-ink">
        {value} {unit}
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
