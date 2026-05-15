import { RocketView } from "../lib/api";

// Side silhouette: body shapes mirrored about the centreline, fins drawn
// as trapezoids at the body surface. Pure SVG, scaled to fit.
export function RocketView2D({ rv }: { rv: RocketView }) {
  const L = rv.total_length || 1;
  const R = Math.max(rv.max_radius, 0.001);
  const padX = 40;
  const padY = 30;
  const W = 900;
  const H = 260;
  const sx = (W - 2 * padX) / L;
  const sy = (H - 2 * padY) / (2 * R);
  const s = Math.min(sx, sy);
  const x = (ax: number) => padX + ax * s;
  const y = (r: number) => H / 2 - r * s;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <line
        x1={padX}
        y1={H / 2}
        x2={W - padX}
        y2={H / 2}
        stroke="#e7d8b0"
        strokeDasharray="4 4"
      />
      {rv.fins.map((f, i) => {
        const ax0 = x(f.axial_start);
        const yb = y(f.body_radius);
        const root = f.root_chord * s;
        const sweep = f.sweep * s;
        const span = f.height * s;
        const tip = f.tip_chord * s;
        const pts = [
          [ax0, yb],
          [ax0 + root, yb],
          [ax0 + sweep + tip, yb - span],
          [ax0 + sweep, yb - span],
        ];
        const ptsM = pts.map(([px, py]) => [px, H - py]);
        const toStr = (p: number[][]) => p.map((q) => q.join(",")).join(" ");
        return (
          <g key={`fin${i}`}>
            <polygon points={toStr(pts)} fill="#ec4899" opacity={0.85} />
            <polygon points={toStr(ptsM)} fill="#ec4899" opacity={0.85} />
          </g>
        );
      })}
      {rv.outline.map((sh, i) => {
        const top = sh.points.map(([ax, r]) => `${x(ax)},${y(r)}`);
        const bot = sh.points
          .slice()
          .reverse()
          .map(([ax, r]) => `${x(ax)},${H - y(r)}`);
        return (
          <polygon
            key={`o${i}`}
            points={[...top, ...bot].join(" ")}
            fill="#fffdf5"
            stroke="#3a2a1a"
            strokeWidth={1.5}
          />
        );
      })}
    </svg>
  );
}
