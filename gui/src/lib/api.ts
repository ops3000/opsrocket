// Data layer. The Rust core runs in the opsrocket-web server (proxied at
// /api in dev). The server is stateful: one open document, edits accumulate.
// Every mutating call returns the fresh {view, stability, tree} snapshot so
// the whole UI stays in lock-step with the model.

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
export interface DecalView {
  url: string;
  offset: [number, number];
  scale: [number, number];
  center: [number, number];
  rotation: number;
  edge_mode: string;
}
export interface Mat {
  color: [number, number, number, number];
  shine: number;
  decal?: DecalView | null;
  default_color: [number, number, number, number];
  default_shine: number;
  default_decal?: DecalView | null;
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
  designer: string | null;
  total_length: number;
  max_radius: number;
  components: CompView[];
  outline: Shape2D[];
  lathe: LatheProfile[];
  fins: FinView[];
  lugs: LugView[];
  cg_axial: number;
  cp_axial: number;
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

export type FieldKind =
  | "length"
  | "number"
  | "angle"
  | "mass"
  | "int"
  | "bool"
  | "text"
  | "enum"
  | "color";

export interface Field {
  key: string;
  label: string;
  kind: FieldKind;
  value: unknown;
  options?: string[];
  unit?: string;
  /** "general" | "shoulder" | "override" | "appearance" | "comment" | undefined. */
  section?: string;
}

export interface Material {
  name: string;
  kind: "bulk" | "surface" | "line";
  density: number;
  group: string;
}

export interface ComponentMassInfo {
  id: string;
  name: string;
  kind: string;
  mass_g: number;
}

// Fetch the bundled materials catalog (browser-mode shim handles /api/list_materials).
export const listMaterials = (): Promise<{ materials: Material[] }> =>
  req("list_materials", "GET");

// Single-component mass (grams).
export const componentMass = (id: string): Promise<ComponentMassInfo> =>
  req("component_mass", "POST", { id });

export interface Preset {
  id: string;
  manufacturer: string;
  part_no: string;
  kind: string;
  description: string;
  od_mm: number;
  od2_mm?: number;
  id_mm?: number;
  length_mm: number;
  shoulder_length_mm?: number;
  shape?: string;
  material: string;
  mass_g?: number;
}

export const listPresets = (
  filter: {
    kind?: string;
    manufacturer?: string;
    body_od_mm?: number;
    contains?: string;
  } = {},
): Promise<{ presets: Preset[] }> => req("list_presets", "POST", filter);

export interface SimWarning {
  kind: "info" | "warn" | "error";
  category: string;
  message: string;
}

export const simWarnings = (
  sim_name?: string,
): Promise<{ warnings: SimWarning[] }> =>
  req("sim_warnings", "POST", { sim_name });
export interface EditNode {
  id: string;
  kind: string;
  name: string;
  depth: number;
  fields: Field[];
}
export interface Stability {
  mass_g: number;
  cg_cm: number;
  cp_cm: number;
  margin_cal: number;
  ref_diameter_mm: number;
  cn_alpha: number;
  cd: number;
  cd_friction: number;
  cd_pressure: number;
  cd_base: number;
  stable: boolean;
}
export interface MotorInfo {
  file: string;
  designation: string;
  manufacturer: string;
  diameter_mm: number;
  length_mm: number;
  total_impulse: number;
  avg_thrust: number;
  burn_time: number;
  total_mass_g: number;
  prop_mass_g: number;
  delays: number[];
  class: string;
  digest: string;
}
export interface AssignmentView {
  config_id: string;
  designation: string | null;
  digest: string | null;
  ejection_delay: number;
}
export interface MountView {
  id: string;
  name: string;
  kind: string;
  overhang_mm: number;
  ignition_event: string;
  ignition_delay: number;
  /** Physical copies of this mount (pod/parallel-stage replication).
   * Optional: defaults to 1 until the backend supplies it. */
  instances?: number;
  assignments: AssignmentView[];
}
export interface ConfigView {
  config_id: string;
  name: string | null;
}
export interface SimView {
  name: string;
  config_id: string | null;
}
export interface ConfigPanel {
  configs: ConfigView[];
  default_config: string | null;
  simulations: SimView[];
  mounts: MountView[];
}
export interface SimNode {
  name: string;
  config_id: string | null;
  fields: Field[];
}
export interface Workbench {
  view: RocketView;
  stability: Stability;
  tree: EditNode[];
  config: ConfigPanel;
  sims: SimNode[];
}

async function req<T>(
  endpoint: string,
  method: string,
  body?: unknown,
): Promise<T> {
  const r = await fetch(`/api/${endpoint}`, {
    method,
    headers: body ? { "content-type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(await r.text());
  return r.json() as Promise<T>;
}

export const loadOrk = (path: string): Promise<Workbench> =>
  req("load_ork", "POST", { path });

// Browser-mode counterpart of openOrkFile: load directly from a base64
// string. Used by the parent-page bridge (chat → workbench deeplinks).
export const loadOrkB64 = (b64: string): Promise<Workbench> =>
  req("load_ork", "POST", { b64 });

// Browser-only: same bytes as save(), returned as base64 instead of
// triggering a download. Used by the cross-tab chat bridge to expose
// the current design as AI context.
export const snapshotOrkB64 = (): Promise<{ ork_b64: string }> =>
  req("snapshot", "POST", {});

export const newDoc = (): Promise<Workbench> => req("new", "POST", {});

// Open a user-picked local .ork: read bytes, base64, hand to the core.
export const openOrkFile = async (file: File): Promise<Workbench> => {
  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i++) bin += String.fromCharCode(buf[i]);
  return req("load_ork", "POST", { b64: btoa(bin) });
};

export const getView = (): Promise<Workbench> => req("view", "GET");

export const patchField = (
  id: string,
  key: string,
  value: unknown,
): Promise<Workbench> => req("component", "PATCH", { id, key, value });

export const deleteComponent = (id: string): Promise<Workbench> =>
  req("component/delete", "POST", { id });

export const addComponent = (
  parent_id: string,
  kind: string,
): Promise<Workbench> =>
  req("component/add", "POST", { parent_id, kind });

// Step the server-side edit history. Both are no-ops (return the current
// snapshot) when the respective stack is empty.
export const undoEdit = (): Promise<Workbench> => req("undo", "POST", {});
export const redoEdit = (): Promise<Workbench> => req("redo", "POST", {});

// Which child kinds may be added under a given parent kind. Mirrors
// opsrocket-view::schema::allowed_children — keep in lock-step.
export const allowedChildren = (parentKind: string): string[] => {
  switch (parentKind) {
    case "Stage":
      return ["NoseCone", "BodyTube", "Transition", "PodSet", "ParallelStage"];
    case "BodyTube":
      return [
        "InnerTube",
        "FinSet",
        "TubeFinSet",
        "LaunchLug",
        "CenteringRing",
        "Parachute",
        "ShockCord",
        "MassObject",
      ];
    case "PodSet":
    case "ParallelStage":
      return ["NoseCone", "BodyTube", "Transition"];
    default:
      return [];
  }
};

export const saveOrk = (path?: string): Promise<{ saved: string }> =>
  req("save", "POST", { path: path ?? null });

export const runSim = (simName: string | null): Promise<FlightData> =>
  req("simulate", "POST", { sim_name: simName });

export const patchSim = (
  sim_name: string,
  key: string,
  value: unknown,
): Promise<Workbench> =>
  req("sim", "PATCH", { sim_name, key, value });

export interface CompAeroRow {
  id: string;
  name: string;
  kind: string;
  cn_alpha: number;
  cp_cm: number;
  cd_friction: number;
  cd_pressure: number;
  cd_share: number;
}
export interface Analysis {
  mach: number;
  rows: CompAeroRow[];
  cd_base: number;
  cn_alpha_total: number;
  cp_cm: number;
  cd_total: number;
}
export const getAnalysis = (mach: number): Promise<Analysis> =>
  req("analysis", "POST", { mach });

export interface OptPoint {
  value: number;
  apogee: number;
  margin_cal: number;
  feasible: boolean;
}
export interface OptResult {
  points: OptPoint[];
  best_value: number | null;
  best_apogee: number | null;
  baseline_value: number;
}
export const runOptimize = (p: {
  sim_name: string | null;
  comp_id: string;
  key: string;
  min: number;
  max: number;
  steps: number;
  goal: string;
  target: number;
  min_margin: number;
}): Promise<OptResult> => req("optimize", "POST", p);

export const getMotors = (): Promise<MotorInfo[]> => req("motors", "GET");

export const assignMotor = (
  mount_id: string,
  config_id: string,
  designation: string,
  digest: string | null,
  ejection_delay: number,
): Promise<Workbench> =>
  req("assign_motor", "POST", {
    mount_id,
    config_id,
    designation,
    digest,
    ejection_delay,
  });

export const clearMotor = (
  mount_id: string,
  config_id: string,
): Promise<Workbench> =>
  req("clear_motor", "POST", { mount_id, config_id });

export const setIgnition = (
  mount_id: string,
  event: string,
  delay: number,
): Promise<Workbench> =>
  req("set_ignition", "POST", { mount_id, event, delay });

export const listFixtures = async (): Promise<Fixture[]> => {
  try {
    return await req<Fixture[]>("fixtures", "GET");
  } catch {
    return [];
  }
};
