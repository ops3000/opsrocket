import { invoke } from "@tauri-apps/api/core";

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

export const loadOrk = (path: string) =>
  invoke<RocketView>("load_ork", { path });

export const runSim = (
  path: string,
  simName: string | null,
  motorsDir: string | null,
) =>
  invoke<FlightData>("simulate", {
    path,
    simName,
    motorsDir,
  });
