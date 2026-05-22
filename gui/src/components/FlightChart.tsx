import { FlightData } from "../lib/api";
import { formatQuantity, getUserUnit } from "../lib/units";
import { useUnitPref } from "../lib/units-react";

// Lightweight dual-axis SVG line chart: altitude (pink) + velocity (ink).
export function FlightChart({ fd }: { fd: FlightData }) {
  useUnitPref();
  const altUnit = getUserUnit("distance");
  const velUnit = getUserUnit("velocity");
  const timeUnit = getUserUnit("time");
  const W = 900;
  const H = 250;
  const padL = 50;
  const padR = 50;
  const padT = 20;
  const padB = 30;

  const tMax = Math.max(...fd.time, 1);
  const aMax = Math.max(...fd.altitude, 1);
  const vMax = Math.max(...fd.velocity, 1);

  const X = (t: number) => padL + (t / tMax) * (W - padL - padR);
  const YA = (a: number) => H - padB - (a / aMax) * (H - padT - padB);
  const YV = (v: number) => H - padB - (v / vMax) * (H - padT - padB);

  const path = (ys: (i: number) => number) =>
    fd.time
      .map((t, i) => `${i === 0 ? "M" : "L"}${X(t).toFixed(1)},${ys(i).toFixed(1)}`)
      .join(" ");

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <line x1={padL} y1={H - padB} x2={W - padR} y2={H - padB} stroke="#e7d8b0" />
      <line x1={padL} y1={padT} x2={padL} y2={H - padB} stroke="#e7d8b0" />
      <path
        d={path((i) => YA(fd.altitude[i]))}
        fill="none"
        stroke="#ec4899"
        strokeWidth={2}
      />
      <path
        d={path((i) => YV(fd.velocity[i]))}
        fill="none"
        stroke="#3a2a1a"
        strokeWidth={1.5}
        opacity={0.7}
      />
      {fd.events
        .filter(([t]) => t <= tMax)
        .map(([t, name], i) => (
          <g key={i}>
            <line
              x1={X(t)}
              y1={padT}
              x2={X(t)}
              y2={H - padB}
              stroke="#be2768"
              strokeDasharray="3 3"
              opacity={0.4}
            />
            <text x={X(t) + 3} y={padT + 10 + (i % 3) * 12} fontSize={9} fill="#9a7b56">
              {name.replace(/_/g, " ").toLowerCase()}
            </text>
          </g>
        ))}
      <text x={padL} y={14} fontSize={11} fill="#ec4899">
        altitude ({altUnit}), max {formatQuantity(aMax, "distance")}
      </text>
      <text x={W - padR - 140} y={14} fontSize={11} fill="#3a2a1a">
        velocity ({velUnit}), max {formatQuantity(vMax, "velocity")}
      </text>
      <text x={W / 2} y={H - 6} fontSize={10} fill="#9a7b56" textAnchor="middle">
        time ({timeUnit}) — {formatQuantity(tMax, "time")}
      </text>
    </svg>
  );
}
