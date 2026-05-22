import { useEffect, useRef } from "react";
import { RocketView, Mat } from "../lib/api";
import { formatFrom, formatQuantity, roundForDisplay } from "../lib/units";
import { useUnitPref } from "../lib/units-react";

// OpenRocket-style 2D side blueprint (RocketFigure SideView). Component
// outlines stroked in their FigureRenderer class colour; internal
// recovery/mass components dashed; motor a grey fill — matching
// OpenRocket's RocketFigure. Scale/origin reproduce AbstractScaleFigure:
// border (30,20) px, fit span×2·maxR preserving aspect, axis centred.

const BORDER_W = 30;
const BORDER_H = 20;

function col(m: Mat): string {
  const [r, g, b] = m.figure_color;
  return `rgb(${r},${g},${b})`;
}
// OpenRocket dashes recovery/mass internals; draws motor filled grey;
// motor-mount/rings magenta; everything else a solid outline.
function styleFor(kind: string, m: Mat) {
  // OpenRocket draws the loaded motor as a solid grey fill.
  if (kind === "Motor")
    return { stroke: "rgb(120,120,120)", fill: "rgb(150,150,150)", dash: "" };
  if (kind === "Parachute" || kind === "ShockCord" || kind === "MassObject")
    return { stroke: col(m), fill: "none", dash: "6 4" };
  if (kind === "InnerTube" || kind === "CenteringRing")
    return { stroke: "rgb(170,0,100)", fill: "none", dash: "" };
  return { stroke: col(m), fill: "none", dash: "" };
}

export interface Overlay2D {
  name: string;
  length_cm: number;
  max_diam_cm: number;
  mass_g: number;
  mass_motors_g: number | null;
  margin_cal: number;
  margin_pct: number;
  cg_cm: number;
  cp_cm: number;
  mach: number;
  config_name: string;
  apogee_m: number | null;
  max_velocity_ms: number | null;
  max_velocity_mach: number | null;
  max_accel_ms2: number | null;
}

export function RocketView2D({
  rv,
  raw = false,
  rollDeg = 0,
  overlay = null,
  onRollDelta,
}: {
  rv: RocketView;
  raw?: boolean;
  rollDeg?: number;
  overlay?: Overlay2D | null;
  onRollDelta?: (deltaDeg: number) => void;
}) {
  useUnitPref();
  const ref = useRef<HTMLCanvasElement>(null);
  // Latest callback in a ref so the drag listeners can stay attached once
  // (re-attaching them mid-drag, as rollDeg state churns, would break it).
  const rollCb = useRef(onRollDelta);
  rollCb.current = onRollDelta;

  // Drag the figure vertically to roll the rocket (OpenRocket lets you
  // spin it by dragging in the view, not only via the slider).
  useEffect(() => {
    const cv = ref.current;
    if (!cv || raw) return;
    let lastY: number | null = null;
    const down = (e: PointerEvent) => {
      lastY = e.clientY;
      cv.setPointerCapture?.(e.pointerId);
      cv.style.cursor = "ns-resize";
    };
    const move = (e: PointerEvent) => {
      if (lastY == null || !rollCb.current) return;
      const dy = e.clientY - lastY;
      lastY = e.clientY;
      if (dy) rollCb.current(dy * 0.6); // ~0.6°/px, drag down → +roll
    };
    const up = () => {
      lastY = null;
      cv.style.cursor = "grab";
    };
    cv.style.cursor = "grab";
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
  }, [raw]);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const W = raw ? 1280 : cv.clientWidth || 1000;
    const H = raw ? 720 : cv.clientHeight || 300;
    // OpenRocket rotates the rocket about its axis by the roll angle; only
    // the radial (Y) projection is affected: Y = R·cos(θ − roll).
    const roll = (rollDeg * Math.PI) / 180;
    cv.width = W;
    cv.height = H;
    const g = cv.getContext("2d")!;
    g.fillStyle = "rgb(254,243,199)";
    g.fillRect(0, 0, W, H);

    // OpenRocket RocketFigure.updateSubjectDimensions uses the selected
    // configuration's BoundingBox: [minX, -maxR] .. span × 2·maxR, where
    // the box spans ALL geometry (fins/motor overhang included). Compute
    // the identical box from the view geometry.
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
    // Centre the subject box in the viewport; rocket axis at vertical mid.
    const ox = (W - span * sc) / 2 - minX * sc;
    const oy = H / 2;
    const X = (ax: number) => ox + ax * sc;
    const Y = (r: number) => oy - r * sc;
    // OpenRocket RocketFigure SideView projects an instance at radius R,
    // azimuth θ (about the rocket X axis) onto the view by R·cos(θ): a pod
    // at θ=0 sits above the axis, its θ=π twin below — NOT both on one side.
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
      g.lineWidth = 1;
      g.stroke();
      g.setLineDash([]);
    };

    // Centreline axis (faint dashed), like OpenRocket.
    g.strokeStyle = "rgb(200,200,200)";
    g.setLineDash([4, 4]);
    g.beginPath();
    g.moveTo(X(minX), oy);
    g.lineTo(X(minX + span), oy);
    g.stroke();
    g.setLineDash([]);

    // Bodies / internals / motor: outer profile mirrored about the axis,
    // offset by the component's radial (pods) along Y.
    for (const p of rv.lathe) {
      if (p.outer.length < 2) continue;
      const rad = projY(p.radial, p.radial_angle);
      const st = styleFor(p.kind, p.mat);
      // OpenRocket draws recovery/mass internals as a ROUNDED RECTANGLE
      // (RoundRectangle2D, corner arc = min(L,2r)·0.7), not a tapered
      // capsule. Match that exactly for those component classes.
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
        const ka = arc * sc; // corner radius in px (clamped by canvas)
        g.beginPath();
        // @ts-ignore - roundRect is supported in the target browsers
        g.roundRect(
          Math.min(px0, px1),
          Math.min(pyT, pyB),
          Math.abs(px1 - px0),
          Math.abs(pyB - pyT),
          Math.max(0, Math.min(ka, Math.abs(px1 - px0) / 2)),
        );
        g.setLineDash(st.dash ? st.dash.split(" ").map(Number) : []);
        g.strokeStyle = st.stroke;
        g.lineWidth = 1;
        g.stroke();
        g.setLineDash([]);
        // OpenRocket ParachuteShapes.addSymbol: a canopy dome (half-circle)
        // + three converging shroud lines, drawn solid over the box.
        if (p.kind === "Parachute") {
          const cx = (x0 + x1) / 2;
          const cy = rad;
          const bw = L;
          const bh = 2 * rr;
          let cd = bh / 2;
          if (cd > 0.75 * bw) cd = 0.75 * bw;
          const apexY = cy + (3 * cd) / 4; // +Y is up in rocket coords
          const hemY = cy - cd / 4;
          g.strokeStyle = st.stroke;
          g.lineWidth = 1;
          // canopy: upper half-circle, radius cd/2, centred at (cx, hemY)
          g.beginPath();
          g.arc(X(cx), Y(hemY), (cd / 2) * sc, Math.PI, 2 * Math.PI);
          g.stroke();
          const ln = (
            ax: number,
            ay: number,
            bx: number,
            by: number,
          ) => {
            g.beginPath();
            g.moveTo(X(ax), Y(ay));
            g.lineTo(X(bx), Y(by));
            g.stroke();
          };
          // three V-shroud sets converging to the apex
          ln(cx - cd / 2, cy - cd / 4, cx, apexY);
          ln(cx, apexY, cx + cd / 2, cy - cd / 4);
          ln(cx - cd / 4, cy - cd / 4, cx, apexY);
          ln(cx, apexY, cx + cd / 4, cy - cd / 4);
          ln(cx, cy - cd / 4, cx, apexY);
        }
        // OpenRocket ShockCordShapes.addSymbol: a 4-period flutter (wavy)
        // line across the box mid-line.
        if (p.kind === "ShockCord") {
          const left = x0 + L / 4;
          const cordW = L / 2;
          const top = rad;
          const fH = (2 * rr) / 4;
          const fW = cordW / 4;
          g.strokeStyle = st.stroke;
          g.lineWidth = 1;
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

    // Fins: planform at the body surface, both sides of the axis.
    for (const f of rv.fins) {
      // Anchor at the pod centre projected onto the side view, then the
      // fin extends ±(body_radius + span) from there.
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
      const st = { stroke: col(f.mat), fill: "none", dash: "" };
      // Draw each fin INSTANCE at its true azimuth φ = pod azimuth + the
      // fin's clock offset + replication, projecting the spanwise (radial)
      // coordinate onto the side view by cos(φ): a fin pointing up (φ=0)
      // shows full span, one toward the viewer (φ=±90°) is edge-on (≈a
      // line), one down (φ=180°) shows full span the other way — exactly
      // OpenRocket's RocketFigure SideView.
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

    // Launch lugs: a short tube on the surface (both sides).
    for (const l of rv.lugs) {
      const b = projY(l.radial, l.radial_angle) + l.body_radius;
      const st = { stroke: col(l.mat), fill: "none", dash: "" };
      // OpenRocket's side view shows the lug once at its clocked position;
      // approximate as a single tube on the upper surface.
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

    // ── OpenRocket RocketFigure overlay (ruler + info text + CG/CP) ──────
    // Skipped in `raw` capture mode so the pixel harness keeps comparing a
    // bare blueprint against OrRef2D.
    if (overlay && !raw) {
      // Adaptive ruler step: pick the smallest "nice" cm step whose tick
      // spacing is at least MIN_PX_PER_LABEL pixels apart on the current
      // canvas — long rockets at fit-to-width zoom (270 cm at ~1280 px)
      // were drawing every 5-cm label which then overlapped into an
      // illegible smear.
      const MIN_PX_PER_LABEL = 36;
      const NICE_STEPS = [1, 2, 5, 10, 25, 50, 100, 250, 500, 1000, 2500];
      const pickStep = (pxPerCm: number) => {
        for (const s of NICE_STEPS) {
          if (s * pxPerCm >= MIN_PX_PER_LABEL) return s;
        }
        return NICE_STEPS[NICE_STEPS.length - 1];
      };

      // cm ruler along the top: minor tick every 1 cm, major + label
      // every `majorStep` cm, spanning 0 .. ceil(maxX) cm.
      const rulerY = 20;
      g.strokeStyle = "rgb(90,90,90)";
      g.fillStyle = "rgb(70,70,70)";
      g.font = "11px -apple-system, Helvetica, Arial, sans-serif";
      g.textAlign = "center";
      g.textBaseline = "top";
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(X(0), rulerY);
      g.lineTo(X(Math.ceil(maxX * 100) / 100), rulerY);
      const cmMax = Math.ceil(maxX * 100);
      const pxPerCmX = X(0.01) - X(0);
      const majorStepX = pickStep(pxPerCmX);
      // Hide the 1-cm minor ticks once they would visually merge into a
      // solid bar (anything under ~3 px between them).
      const showMinorX = pxPerCmX >= 3;
      for (let cm = 0; cm <= cmMax; cm++) {
        const px = X(cm / 100);
        const major = cm % majorStepX === 0;
        if (!major && !showMinorX) continue;
        g.moveTo(px, rulerY);
        g.lineTo(px, rulerY + (major ? 9 : 5));
        if (major) g.fillText(String(cm), px, rulerY + 11);
      }
      g.stroke();

      // cm ruler down the left edge (OpenRocket ScaleScrollPane vertical
      // ruler): 0 on the rocket axis, ticks every 1 cm out to ±maxR, major
      // tick + label every `majorStepR` cm. Same adaptive rule.
      const rulerX = 20;
      const rCmMax = Math.ceil(maxR * 100);
      g.strokeStyle = "rgb(90,90,90)";
      g.fillStyle = "rgb(70,70,70)";
      g.textAlign = "right";
      g.textBaseline = "middle";
      g.beginPath();
      g.moveTo(rulerX, Math.max(Y(maxR), 0));
      g.lineTo(rulerX, Math.min(Y(-maxR), H));
      const pxPerCmY = Y(0) - Y(0.01);
      const majorStepR = pickStep(pxPerCmY);
      const showMinorR = pxPerCmY >= 3;
      for (let cm = -rCmMax; cm <= rCmMax; cm++) {
        const py = Y(cm / 100);
        if (py < 0 || py > H) continue;
        const major = cm % majorStepR === 0;
        if (!major && !showMinorR) continue;
        g.moveTo(rulerX, py);
        g.lineTo(rulerX + (major ? 9 : 5), py);
        if (major) g.fillText(String(Math.abs(cm)), rulerX - 3, py);
      }
      g.stroke();

      // Info text blocks. OpenRocket draws the headline block top-left and
      // the stability block top-right; the flight summary sits lower-left.
      // Each block sits on a frosted-glass card so the underlying rocket
      // schematic doesn't visually merge with the text.
      const tx = Math.max(X(0), BORDER_W) + 8;
      const fNorm = "13px -apple-system, Helvetica, Arial, sans-serif";
      g.textBaseline = "alphabetic";
      const lineH = 19;
      const pad = { x: 12, top: 14, bottom: 12 };

      const roundRect = (x: number, y: number, w: number, h: number, r = 10) => {
        g.beginPath();
        g.moveTo(x + r, y);
        g.lineTo(x + w - r, y);
        g.quadraticCurveTo(x + w, y, x + w, y + r);
        g.lineTo(x + w, y + h - r);
        g.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        g.lineTo(x + r, y + h);
        g.quadraticCurveTo(x, y + h, x, y + h - r);
        g.lineTo(x, y + r);
        g.quadraticCurveTo(x, y, x + r, y);
        g.closePath();
      };
      // Frosted-glass: clip to the rounded rect, draw the canvas back into
      // itself with a heavy blur filter (true backdrop blur — the rocket
      // schematic underneath becomes a soft wash), then tint with a low-
      // alpha cream so the original line colours still suggest themselves
      // without competing with the text.
      const glassCard = (x: number, y: number, w: number, h: number) => {
        // 1. Backdrop blur — sample what's already on the canvas, paint
        //    it back over the same region through a blur filter.
        g.save();
        roundRect(x, y, w, h);
        g.clip();
        g.filter = "blur(12px)";
        g.drawImage(cv, 0, 0);
        g.filter = "none";
        g.restore();

        // 2. Translucent cream tint + soft drop shadow.
        g.save();
        g.shadowColor = "rgba(58, 42, 26, 0.10)";
        g.shadowBlur = 18;
        g.shadowOffsetY = 4;
        g.fillStyle = "rgba(255, 250, 240, 0.55)";
        roundRect(x, y, w, h);
        g.fill();
        g.restore();

        // 3. Inner highlight (top edge) + soft cream border.
        g.strokeStyle = "rgba(255, 255, 255, 0.7)";
        g.lineWidth = 1;
        roundRect(x + 0.5, y + 0.5, w - 1, h - 1);
        g.stroke();
        g.strokeStyle = "rgba(231, 216, 176, 0.55)";
        roundRect(x, y, w, h);
        g.stroke();
      };
      const measureMax = (lines: string[]) => {
        let m = 0;
        for (const s of lines) {
          const w = g.measureText(s).width;
          if (w > m) m = w;
        }
        return m;
      };

      g.font = fNorm;

      // ── Top-left card: name + dimensions + mass ──────────────────
      const mm =
        overlay.mass_motors_g != null
          ? formatFrom(overlay.mass_motors_g, "mass", "g")
          : "—";
      const tlLines = [
        overlay.name,
        `Length ${formatFrom(overlay.length_cm, "length", "cm")}, max. diameter ${formatFrom(overlay.max_diam_cm, "length", "cm")}`,
        `Mass with no motors ${formatFrom(overlay.mass_g, "mass", "g")}`,
        `Mass with motors ${mm}`,
      ];
      const tlWidth = measureMax(tlLines) + pad.x * 2;
      const tlHeight = tlLines.length * lineH + pad.top + pad.bottom - 4;
      glassCard(tx - pad.x, rulerY + 24, tlWidth, tlHeight);

      g.textAlign = "left";
      g.fillStyle = "rgb(28,40,90)";
      let ty = rulerY + 34 + 8;
      for (const s of tlLines) {
        g.fillText(s, tx, ty);
        ty += lineH;
      }

      // ── Top-right card: stability + CG/CP + Mach ────────────────
      const rx = W - 12;
      const stabLine = `Stability: ${roundForDisplay(overlay.margin_cal, 2)} cal / ${roundForDisplay(overlay.margin_pct, 2)} %`;
      const cgLine = `CG: ${formatFrom(overlay.cg_cm, "length", "cm")}`;
      const cpLine = `CP: ${formatFrom(overlay.cp_cm, "length", "cm")}`;
      const machLine = `at M=${roundForDisplay(overlay.mach, 3)}`;
      const trLines = [stabLine, cgLine, cpLine, machLine];
      // The CG/CP rows have a 6.5-radius glyph + 12px gap to the left of
      // the text, so widen accordingly.
      const trTextWidth = measureMax(trLines);
      const trWidth = trTextWidth + 22 + pad.x * 2;
      const trHeight = trLines.length * lineH + pad.top + pad.bottom - 4;
      glassCard(rx - trWidth + pad.x, rulerY + 24, trWidth, trHeight);

      g.textAlign = "right";
      let ry = rulerY + 34 + 8;
      g.fillStyle = "rgb(28,40,90)";
      g.fillText(stabLine, rx, ry);
      ry += lineH;
      // CG balance glyph (quartered blue/white circle).
      const glyph = (cx: number, cy: number, kind: "cg" | "cp") => {
        const r = 6.5;
        if (kind === "cg") {
          g.beginPath();
          g.arc(cx, cy, r, 0, Math.PI * 2);
          g.fillStyle = "#fff";
          g.fill();
          for (const a0 of [-Math.PI / 2, Math.PI / 2]) {
            g.beginPath();
            g.moveTo(cx, cy);
            g.arc(cx, cy, r, a0, a0 + Math.PI / 2);
            g.closePath();
            g.fillStyle = "#3552d6";
            g.fill();
          }
          g.beginPath();
          g.arc(cx, cy, r, 0, Math.PI * 2);
          g.strokeStyle = "#1a1a1a";
          g.lineWidth = 1;
          g.stroke();
        } else {
          g.beginPath();
          g.arc(cx, cy, r, 0, Math.PI * 2);
          g.fillStyle = "#d3202a";
          g.fill();
          g.strokeStyle = "#7a1014";
          g.lineWidth = 1;
          g.stroke();
        }
      };
      const cgT = `CG: ${formatFrom(overlay.cg_cm, "length", "cm")}`;
      const cpT = `CP: ${formatFrom(overlay.cp_cm, "length", "cm")}`;
      g.fillStyle = "rgb(28,40,90)";
      g.fillText(cgT, rx, ry);
      glyph(rx - g.measureText(cgT).width - 12, ry - 5, "cg");
      ry += lineH;
      g.fillStyle = "rgb(28,40,90)";
      g.fillText(cpT, rx, ry);
      glyph(rx - g.measureText(cpT).width - 12, ry - 5, "cp");
      ry += lineH;
      g.fillStyle = "rgb(140,140,140)";
      g.fillText(`at M=${roundForDisplay(overlay.mach, 3)}`, rx, ry);

      // Lower-left flight summary (blue), only when a sim has been run.
      // Same frosted-card treatment as the top blocks.
      const flightRows: [string, string][] = [];
      flightRows.push(["Flight configuration:", overlay.config_name]);
      if (overlay.apogee_m != null)
        flightRows.push([
          "Apogee:",
          formatQuantity(overlay.apogee_m, "distance"),
        ]);
      if (overlay.max_velocity_ms != null)
        flightRows.push([
          "Max. velocity:",
          formatQuantity(overlay.max_velocity_ms, "velocity") +
            (overlay.max_velocity_mach != null
              ? `  (Mach ${roundForDisplay(overlay.max_velocity_mach, 3)})`
              : ""),
        ]);
      if (overlay.max_accel_ms2 != null)
        flightRows.push([
          "Max. acceleration:",
          `${roundForDisplay(overlay.max_accel_ms2, 0)} m/s²`,
        ]);

      g.font = fNorm;
      const valueColX = 150;
      const flValueMax = measureMax(flightRows.map(([, v]) => v));
      const flWidth = valueColX + flValueMax + pad.x * 2;
      const flHeight = flightRows.length * lineH + pad.top + pad.bottom - 4;
      const flY = H * 0.6 - 8;
      glassCard(tx - pad.x, flY, flWidth, flHeight);

      g.textAlign = "left";
      g.fillStyle = "rgb(43,63,174)";
      let fy = flY + pad.top + 6;
      for (const [k, v] of flightRows) {
        g.fillText(k, tx, fy);
        g.fillText(v, tx + valueColX, fy);
        fy += lineH;
      }

      // CG / CP markers on the centreline at their axial stations.
      glyph(X(overlay.cg_cm / 100), oy, "cg");
      glyph(X(overlay.cp_cm / 100), oy, "cp");
    }
  }, [rv, raw, rollDeg, overlay]);

  return (
    <canvas
      ref={ref}
      style={
        raw
          ? { width: 1280, height: 720, display: "block" }
          : { width: "100%", height: "100%" }
      }
    />
  );
}
