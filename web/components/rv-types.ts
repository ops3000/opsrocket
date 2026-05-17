// Minimal RocketView DTO types (copied from the workbench api.ts) — just
// what RocketView2D's blueprint drawing reads.
export interface Mat {
  color: [number, number, number, number];
  shine: number;
  default_color: [number, number, number, number];
  default_shine: number;
  translucent_unfinished?: boolean;
  figure_color: [number, number, number];
}
export interface LatheProfile {
  kind: string;
  outer: [number, number][];
  inner: [number, number][];
  cap_fore: boolean;
  cap_aft: boolean;
  radial?: number;
  radial_angle?: number;
  mat: Mat;
}
export interface FinView {
  axial_start: number;
  root_chord: number;
  tip_chord: number;
  sweep: number;
  height: number;
  count: number;
  body_radius: number;
  thickness: number;
  cant_angle: number;
  cross_section: string;
  outline: [number, number][];
  angle_offset: number;
  radial?: number;
  radial_angle?: number;
  mat: Mat;
}
export interface LugView {
  axial_start: number;
  length: number;
  outer_radius: number;
  body_radius: number;
  count: number;
  angle_offset: number;
  radial?: number;
  radial_angle?: number;
  mat: Mat;
}
export interface RocketView {
  name: string;
  total_length: number;
  max_radius: number;
  lathe: LatheProfile[];
  fins: FinView[];
  lugs: LugView[];
  cg_axial: number;
  cp_axial: number;
}
