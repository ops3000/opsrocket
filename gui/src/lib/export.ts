// File ▸ Export helpers. Each produces a browser download. Kept out of the
// components so the File menu can trigger them without prop-drilling refs.
import { OBJExporter } from "three/examples/jsm/exporters/OBJExporter.js";
import { buildRocketGroup } from "../components/RocketView3D";
import type { FlightData, RocketView } from "./api";

// Slugify a rocket name into a safe filename stem.
function stem(name: string): string {
  return (name || "rocket").replace(/\W+/g, "_").replace(/^_+|_+$/g, "") || "rocket";
}

function download(blob: Blob, filename: string) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// Flight-simulation data as CSV (was App.exportCsv; unchanged columns).
export function exportFlightCsv(
  fd: FlightData,
  name: string,
  sim: string,
): void {
  const head = "time_s,altitude_m,velocity_ms,thrust_N";
  const rows = fd.time.map(
    (t, i) => `${t},${fd.altitude[i]},${fd.velocity[i]},${fd.thrust[i]}`,
  );
  const blob = new Blob([head + "\n" + rows.join("\n")], {
    type: "text/csv",
  });
  download(blob, `${stem(name)}_${sim || "sim"}.csv`);
}

// The current rocket view (2D canvas or 3D WebGL canvas) as a PNG. The only
// <canvas> inside .viewport is the rocket render — the flight chart is SVG.
export function exportDesignPng(name: string): boolean {
  const canvas = document.querySelector<HTMLCanvasElement>(
    ".viewport canvas",
  );
  if (!canvas) return false;
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${stem(name)}.png`;
  a.click();
  return true;
}

// The rocket as a Wavefront OBJ, built from the exact geometry the 3D view
// draws (finished appearance). Geometry only — OBJ carries no materials.
export function exportObj(rv: RocketView, name: string): void {
  const { group, bin } = buildRocketGroup(rv, "finished");
  try {
    group.updateMatrixWorld(true);
    const text = new OBJExporter().parse(group);
    download(
      new Blob([text], { type: "model/obj" }),
      `${stem(name)}.obj`,
    );
  } finally {
    bin.forEach((d) => d.dispose());
  }
}
