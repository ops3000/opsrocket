"use client";

import { useEffect, useRef } from "react";
import type { RocketView } from "./rv-types";

// OpenRocket-style 2D side blueprint (RocketFigure SideView) — the exact
// drawing from the workbench, minus the info overlay. Drag vertically to
// roll the rocket about its axis.

const BORDER_W = 26;
const BORDER_H = 16;

// The .ork-emitted figure_color is a deep blue that fights with the
// blueprint grid behind the hero. Ignore it; paint every body / fin /
// lug stroke in `accentLine` (resolved from --accent2 at draw time) so
// the silhouette reads as on-brand instead of stock-OpenRocket blue.
// Internal recovery/mass dashed, motor mount magenta, motor grey — same
// as before.
function styleFor(kind: string, accentLine: string) {
  if (kind === "Motor")
    return { stroke: "rgb(150,150,150)", fill: "rgb(110,110,120)", dash: "" };
  if (kind === "Parachute" || kind === "ShockCord" || kind === "MassObject")
    return { stroke: accentLine, fill: "none", dash: "6 4" };
  if (kind === "InnerTube" || kind === "CenteringRing")
    return { stroke: "rgb(214,76,160)", fill: "none", dash: "" };
  return { stroke: accentLine, fill: "none", dash: "" };
}

export function RocketView2D({
  rv,
  rollDeg = 0,
  onRollDelta,
}: {
  rv: RocketView;
  rollDeg?: number;
  onRollDelta?: (deltaDeg: number) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rollCb = useRef(onRollDelta);
  rollCb.current = onRollDelta;

  // Drag vertically → roll. Listeners attached once (deps []).
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    let lastY: number | null = null;
    const down = (e: PointerEvent) => {
      lastY = e.clientY;
      cv.setPointerCapture?.(e.pointerId);
      cv.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      if (lastY == null || !rollCb.current) return;
      const dy = e.clientY - lastY;
      lastY = e.clientY;
      if (dy) rollCb.current(dy * 0.7);
    };
    const up = () => {
      lastY = null;
      cv.style.cursor = "grab";
    };
    cv.style.cursor = "grab";
    cv.style.touchAction = "none";
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointerleave", up);
    return () => {
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointerleave", up);
    };
  }, []);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const W = cv.clientWidth || 600;
    const H = cv.clientHeight || 150;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const roll = (rollDeg * Math.PI) / 180;
    cv.width = W * dpr;
    cv.height = H * dpr;
    const g = cv.getContext("2d")!;
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, W, H);

    // Resolve the brand cyan once per paint — the canvas 2D ctx can't
    // consume CSS vars directly. Falls back to a hard cyan if for some
    // reason the property isn't set (e.g. component rendered detached).
    const css = getComputedStyle(document.documentElement);
    const accentLine =
      css.getPropertyValue("--accent-2").trim() || "rgb(41,230,212)";

    let minX = Infinity,
      maxX = -Infinity,
      maxR = 1e-4;
    for (const p of rv.lathe) {
      const rad = Math.abs(p.radial || 0);
      for (const [ax, r] of p.outer) {
        minX = Math.min(minX, ax);
        maxX = Math.max(maxX, ax);
        maxR = Math.max(maxR, r + rad);
      }
    }
    for (const f of rv.fins) {
      const base = (f.radial || 0) + f.body_radius;
      const chords =
        f.outline && f.outline.length
          ? f.outline.map(([c]) => c)
          : [0, f.root_chord, f.sweep + f.tip_chord, f.sweep];
      const hmax =
        f.outline && f.outline.length
          ? Math.max(...f.outline.map(([, h]) => h))
          : f.height;
      minX = Math.min(minX, f.axial_start + Math.min(...chords));
      maxX = Math.max(maxX, f.axial_start + Math.max(...chords));
      maxR = Math.max(maxR, base + hmax);
    }
    for (const l of rv.lugs) {
      minX = Math.min(minX, l.axial_start);
      maxX = Math.max(maxX, l.axial_start + l.length);
      maxR = Math.max(maxR, (l.radial || 0) + l.body_radius + l.outer_radius);
    }
    if (!isFinite(minX)) {
      minX = 0;
      maxX = Math.max(rv.total_length, 1e-4);
    }
    const span = Math.max(maxX - minX, 1e-4);
    const sc = Math.min(
      (W - 2 * BORDER_W) / span,
      (H - 2 * BORDER_H) / (2 * maxR),
    );
    const ox = (W - span * sc) / 2 - minX * sc;
    const oy = H / 2;
    const X = (ax: number) => ox + ax * sc;
    const Y = (r: number) => oy - r * sc;
    const projY = (radial?: number, angle?: number) =>
      (radial || 0) * Math.cos((angle || 0) - roll);

    const poly = (
      pts: [number, number][],
      st: { stroke: string; fill: string; dash: string },
      close = true,
    ) => {
      if (pts.length < 2) return;
      g.beginPath();
      g.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
      if (close) g.closePath();
      g.setLineDash(st.dash ? st.dash.split(" ").map(Number) : []);
      if (st.fill !== "none") {
        g.fillStyle = st.fill;
        g.fill();
      }
      g.strokeStyle = st.stroke;
      g.lineWidth = 1.4;
      g.stroke();
      g.setLineDash([]);
    };

    // faint centreline
    g.strokeStyle = "rgba(138,152,184,0.35)";
    g.setLineDash([4, 4]);
    g.beginPath();
    g.moveTo(X(minX), oy);
    g.lineTo(X(minX + span), oy);
    g.stroke();
    g.setLineDash([]);

    for (const p of rv.lathe) {
      if (p.outer.length < 2) continue;
      const rad = projY(p.radial, p.radial_angle);
      const st = styleFor(p.kind, accentLine);
      if (
        p.kind === "Parachute" ||
        p.kind === "ShockCord" ||
        p.kind === "MassObject"
      ) {
        const x0 = p.outer[0][0];
        const x1 = p.outer[p.outer.length - 1][0];
        const rr = Math.max(...p.outer.map(([, r]) => r));
        const L = Math.abs(x1 - x0);
        const arc = Math.min(L, 2 * rr) * 0.7;
        const px0 = X(x0);
        const px1 = X(x1);
        const pyT = Y(rad + rr);
        const pyB = Y(rad - rr);
        const ka = arc * sc;
        g.beginPath();
        g.roundRect(
          Math.min(px0, px1),
          Math.min(pyT, pyB),
          Math.abs(px1 - px0),
          Math.abs(pyB - pyT),
          Math.max(0, Math.min(ka, Math.abs(px1 - px0) / 2)),
        );
        g.setLineDash(st.dash ? st.dash.split(" ").map(Number) : []);
        g.strokeStyle = st.stroke;
        g.lineWidth = 1.4;
        g.stroke();
        g.setLineDash([]);
        if (p.kind === "Parachute") {
          const cx = (x0 + x1) / 2;
          const cy = rad;
          const bw = L;
          const bh = 2 * rr;
          let cd = bh / 2;
          if (cd > 0.75 * bw) cd = 0.75 * bw;
          const apexY = cy + (3 * cd) / 4;
          const hemY = cy - cd / 4;
          g.strokeStyle = st.stroke;
          g.lineWidth = 1.4;
          g.beginPath();
          g.arc(X(cx), Y(hemY), (cd / 2) * sc, Math.PI, 2 * Math.PI);
          g.stroke();
          const ln = (ax: number, ay: number, bx: number, by: number) => {
            g.beginPath();
            g.moveTo(X(ax), Y(ay));
            g.lineTo(X(bx), Y(by));
            g.stroke();
          };
          ln(cx - cd / 2, cy - cd / 4, cx, apexY);
          ln(cx, apexY, cx + cd / 2, cy - cd / 4);
          ln(cx - cd / 4, cy - cd / 4, cx, apexY);
          ln(cx, apexY, cx + cd / 4, cy - cd / 4);
          ln(cx, cy - cd / 4, cx, apexY);
        }
        if (p.kind === "ShockCord") {
          const left = x0 + L / 4;
          const cordW = L / 2;
          const top = rad;
          const fH = (2 * rr) / 4;
          const fW = cordW / 4;
          g.strokeStyle = st.stroke;
          g.lineWidth = 1.4;
          g.beginPath();
          g.moveTo(X(left), Y(top));
          for (let i = 0; i < 4; i++) {
            g.bezierCurveTo(
              X(left + ((4 * i + 1) * fW) / 4), Y(top + fH),
              X(left + ((4 * i + 1) * fW) / 4), Y(top + fH),
              X(left + ((4 * i + 2) * fW) / 4), Y(top),
            );
            g.bezierCurveTo(
              X(left + ((4 * i + 3) * fW) / 4), Y(top - fH),
              X(left + ((4 * i + 3) * fW) / 4), Y(top - fH),
              X(left + ((4 * i + 4) * fW) / 4), Y(top),
            );
          }
          g.stroke();
        }
        continue;
      }
      const top: [number, number][] = p.outer.map(([ax, r]) => [
        X(ax),
        Y(r + rad),
      ]);
      const bot: [number, number][] = p.outer
        .slice()
        .reverse()
        .map(([ax, r]) => [X(ax), Y(-r + rad)]);
      poly([...top, ...bot], st, true);
    }

    for (const f of rv.fins) {
      const podY = projY(f.radial, f.radial_angle);
      const base = f.body_radius;
      let shape: [number, number][];
      if (f.outline && f.outline.length >= 3) {
        shape = f.outline.map(([c, h]) => [c, h]);
      } else {
        shape = [
          [0, 0],
          [f.root_chord, 0],
          [f.sweep + f.tip_chord, f.height],
          [f.sweep, f.height],
        ];
      }
      const st = { stroke: accentLine, fill: "none", dash: "" };
      const n = Math.max(f.count, 1);
      for (let i = 0; i < n; i++) {
        const phi =
          (f.radial_angle || 0) + f.angle_offset + (i / n) * Math.PI * 2;
        const cphi = Math.cos(phi - roll);
        poly(
          shape.map(([c, h]) => [
            X(f.axial_start + c),
            Y(podY + (base + h) * cphi),
          ]),
          st,
          true,
        );
      }
    }

    for (const l of rv.lugs) {
      const b = projY(l.radial, l.radial_angle) + l.body_radius;
      const st = { stroke: accentLine, fill: "none", dash: "" };
      poly(
        [
          [X(l.axial_start), Y(b)],
          [X(l.axial_start + l.length), Y(b)],
          [X(l.axial_start + l.length), Y(b + l.outer_radius)],
          [X(l.axial_start), Y(b + l.outer_radius)],
        ],
        st,
        true,
      );
    }
  }, [rv, rollDeg]);

  return <canvas ref={ref} className="block h-full w-full" />;
}
