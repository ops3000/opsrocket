// Data layer. Inside Tauri it uses the in-process Rust `invoke` commands;
// in a plain browser it falls back to the opsrocket-web HTTP server
// (proxied at /api). Same RocketView/FlightData shape either way.

export interface CompView {
  kind: string;
  name: string;
  axial_start: number;
  length: number;
}
export interface Shape2D {
  kind: string;
  points: [number, number][];
}
export interface LatheProfile {
  points: [number, number][];
}
export interface FinView {
  axial_start: number;
  root_chord: number;
  tip_chord: number;
  sweep: number;
  height: number;
  count: number;
  body_radius: number;
}
export interface RocketView {
  name: string;
  designer: string | null;
  total_length: number;
  max_radius: number;
  components: CompView[];
  outline: Shape2D[];
  lathe: LatheProfile[];
  fins: FinView[];
  simulations: string[];
}
export interface FlightData {
  time: number[];
  altitude: number[];
  velocity: number[];
  thrust: number[];
  apogee: number;
  time_to_apogee: number;
  flight_time: number;
  ground_hit_velocity: number;
  events: [number, string][];
}
export interface Fixture {
  name: string;
  path: string;
}

export const isTauri = (): boolean =>
  typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;

async function tauriInvoke<T>(
  cmd: string,
  args: Record<string, unknown>,
): Promise<T> {
  const { invoke } = await import("@tauri-apps/api/core");
  return invoke<T>(cmd, args);
}

async function httpPost<T>(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<T> {
  const r = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json() as Promise<T>;
}

export const loadOrk = (path: string): Promise<RocketView> =>
  isTauri()
    ? tauriInvoke<RocketView>("load_ork", { path })
    : httpPost<RocketView>("load_ork", { path });

export const runSim = (
  path: string,
  simName: string | null,
  motorsDir: string | null,
): Promise<FlightData> =>
  isTauri()
    ? tauriInvoke<FlightData>("simulate", {
        path,
        simName,
        motorsDir,
      })
    : httpPost<FlightData>("simulate", {
        path,
        sim_name: simName,
        motors_dir: motorsDir,
      });

// Browser mode: server lists the bundled example .ork files (a plain
// browser cannot hand a server-side filesystem path from a file dialog).
export const listFixtures = async (): Promise<Fixture[]> => {
  if (isTauri()) return [];
  const r = await fetch("/api/fixtures");
  if (!r.ok) return [];
  return r.json() as Promise<Fixture[]>;
};
