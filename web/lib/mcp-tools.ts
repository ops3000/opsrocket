// Shared MCP tool registry. Imported by:
//   - app/[transport]/route.ts → exposed over the MCP HTTP transport
//   - app/api/chat/route.ts    → fed to DeepSeek as OpenAI-compatible
//                                function-calling tools
//
// Each tool is a plain { name, description, inputSchema, handler } record.
// Handlers receive (args, { req? }) — `req` is the inbound HTTP request,
// used only to resolve relative URLs when loading bundled .ork fixtures.

import { z } from "zod";
import {
  ops,
  listExamples,
  resolveRocket,
  type RocketInput,
} from "@/lib/opswasm";
import { findSkill, loadSkills } from "@/lib/skills";

// ── public types ────────────────────────────────────────────────────────

export type ToolResult = {
  content: { type: "text"; text: string }[];
  isError?: boolean;
};

export type ToolCtx = { req?: Request };

export type ToolDef = {
  name: string;
  description: string;
  inputSchema: z.ZodRawShape;
  handler: (
    args: Record<string, unknown>,
    ctx: ToolCtx,
  ) => Promise<ToolResult>;
};

// ── helpers ─────────────────────────────────────────────────────────────

export function ok(obj: unknown, maxChars = 50000): ToolResult {
  let text = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
  if (text.length > maxChars)
    text =
      text.slice(0, maxChars) +
      `\n\n…[OUTPUT TRUNCATED at ${maxChars} chars (${text.length} total) — this text is no longer valid JSON; use detail:"summary", a tighter filter, or fewer max_points]`;
  return { content: [{ type: "text", text }] };
}

export function fail(e: unknown): ToolResult {
  const msg = e instanceof Error ? e.message : String(e);
  return {
    content: [{ type: "text", text: `ERROR: ${msg}` }],
    isError: true,
  };
}

function pickInput(a: Record<string, unknown>): RocketInput {
  return {
    ork_b64: a.ork_b64 as string | undefined,
    example: a.example as string | undefined,
    ork_url: a.ork_url as string | undefined,
  };
}

function downsample(xs: number[], n: number): number[] {
  if (xs.length <= n) return xs;
  const step = (xs.length - 1) / (n - 1);
  return Array.from({ length: n }, (_, i) => xs[Math.round(i * step)]);
}

// ── shared input shapes ─────────────────────────────────────────────────

export const ROCKET_INPUT = {
  ork_b64: z
    .string()
    .optional()
    .describe("Base64-encoded .ork file (read your local file and pass it)"),
  example: z
    .string()
    .optional()
    .describe('Bundled example name, e.g. "A simple model rocket"'),
  ork_url: z.string().optional().describe("https URL to a .ork file"),
};

const SIM_INPUT = {
  ...ROCKET_INPUT,
  sim: z.string().optional().describe("Simulation name (default: first)"),
  detail: z.enum(["summary", "full"]).default("summary"),
  max_points: z.number().int().min(10).max(2000).default(200),
};

function shapeFlight(raw: string, detail: string, maxPoints: number): unknown {
  const j = JSON.parse(raw);
  const f = j.flight ?? {};
  const v: number[] = f.velocity ?? [];
  const summary = {
    engine_version: j.engine_version,
    apogee_m: f.apogee,
    max_velocity_ms: v.length ? Math.max(...v) : null,
    time_to_apogee_s: f.time_to_apogee,
    flight_time_s: f.flight_time,
    ground_hit_velocity_ms: f.ground_hit_velocity,
    events: f.events,
  };
  if (detail === "summary") return summary;
  return {
    ...summary,
    series: {
      time: downsample(f.time ?? [], maxPoints),
      altitude: downsample(f.altitude ?? [], maxPoints),
      velocity: downsample(v, maxPoints),
      thrust: downsample(f.thrust ?? [], maxPoints),
    },
  };
}

// ── engine context shared with the chat system prompt ───────────────────

export const METHODOLOGY = `OpsRocket engine — methodology & known boundaries

Aerodynamics: Barrowman + extensions (per-component base/forward-step
drag, NASA nose interpolators, finish roughness, fin/tube terms),
faithfully ported from OpenRocket. Stability (CP/CNa) and mass/CG are at
parity with OpenRocket (single-stage typically within a few %).

Flight sim: RK4 with adaptive timestep, 6-DOF, wind (PinkNoise), motor
thrust-curve interpolation, recovery (apogee/altitude/ejection-delay),
tumble fallback. Single-stage rockets are within ~0–5% of OpenRocket on
apogee / max velocity / flight time.

Known residuals (genuinely off, not yet at parity): multi-stage /
airstart / pod-powered trajectories, and simulation-extension/scripting
designs (the engine does not execute embedded scripts). Recovery
descent is simplified vs a dedicated landing stepper.

Units: SI internally (m, kg, s, N, rad); some fields reported in cm/mm.`;

// ── tools ───────────────────────────────────────────────────────────────

export const TOOLS: ToolDef[] = [
  // -- discovery ---------------------------------------------------------
  {
    name: "list_examples",
    description:
      "List the bundled example rockets (each carries an embedded OpenRocket reference for cross-validation).",
    inputSchema: {},
    handler: async (_a, { req }) => {
      try {
        const list = await listExamples(req);
        return ok(list.map((e) => e.name));
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "capabilities",
    description:
      "Engine version, component kinds, allowed children, edit-op list, units.",
    inputSchema: {},
    handler: async () => {
      try {
        return ok(JSON.parse(ops.mcp_capabilities()));
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- inspection --------------------------------------------------------
  {
    name: "inspect",
    description:
      "Rocket overview: name, components tree, motor configs, simulations. detail:'full' includes full geometry.",
    inputSchema: {
      ...ROCKET_INPUT,
      detail: z.enum(["summary", "full"]).default("summary"),
    },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        const j = JSON.parse(ops.mcp_inspect(b));
        if (a.detail === "full") return ok(j, 200000);
        const v = j.view ?? {};
        const tree = (j.tree ?? []).map(
          (n: {
            id: string;
            kind: string;
            name: string;
            depth: number;
            fields?: { key: string }[];
          }) => ({
            id: n.id,
            kind: n.kind,
            name: n.name,
            depth: n.depth,
            field_keys: (n.fields ?? []).map((f) => f.key),
          }),
        );
        return ok({
          engine_version: j.engine_version,
          name: v.name,
          designer: v.designer,
          total_length_m: v.total_length,
          components: (v.components ?? []).length,
          tree,
          configs: j.config,
          sims: j.sims,
        });
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "stability",
    description:
      "Mass, CG, CP, stability margin (cal), Cd and its breakdown.",
    inputSchema: ROCKET_INPUT,
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        return ok(JSON.parse(ops.mcp_stability(b)));
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "aero_analysis",
    description:
      "Per-component aerodynamics (CNα, CP, Cd shares) and totals at a given Mach.",
    inputSchema: { ...ROCKET_INPUT, mach: z.number().default(0.3) },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        return ok(
          JSON.parse(ops.mcp_analysis(b, (a.mach as number) ?? 0.3)),
        );
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "mass_breakdown",
    description: "Mass / CG / inertia properties and stability summary.",
    inputSchema: ROCKET_INPUT,
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        return ok(JSON.parse(ops.mcp_mass_breakdown(b)));
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- simulation --------------------------------------------------------
  {
    name: "simulate",
    description:
      "Run the flight simulation. Returns apogee / max velocity / flight time / events; detail:'full' adds a downsampled time series.",
    inputSchema: SIM_INPUT,
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        return ok(
          shapeFlight(
            ops.mcp_simulate(b, a.sim as string | undefined),
            (a.detail as string) ?? "summary",
            (a.max_points as number) ?? 200,
          ),
        );
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "compare_runs",
    description:
      "Diff two rockets' flight summaries (e.g. before/after an edit). Pass A and B as base64.",
    inputSchema: {
      a_ork_b64: z.string(),
      b_ork_b64: z.string(),
      sim: z.string().optional(),
    },
    handler: async (a) => {
      try {
        const A = JSON.parse(
          ops.mcp_simulate(
            new Uint8Array(Buffer.from(a.a_ork_b64 as string, "base64")),
            a.sim as string | undefined,
          ),
        ).flight;
        const B = JSON.parse(
          ops.mcp_simulate(
            new Uint8Array(Buffer.from(a.b_ork_b64 as string, "base64")),
            a.sim as string | undefined,
          ),
        ).flight;
        const mv = (f: { velocity?: number[] }) =>
          f.velocity?.length ? Math.max(...f.velocity) : null;
        return ok({
          apogee_m: { a: A.apogee, b: B.apogee, delta: B.apogee - A.apogee },
          max_velocity_ms: { a: mv(A), b: mv(B) },
          flight_time_s: {
            a: A.flight_time,
            b: B.flight_time,
            delta: B.flight_time - A.flight_time,
          },
        });
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "optimize",
    description:
      "Sweep one component field (min..max, steps) vs a goal (apogee|margin). Find comp_id/key via inspect's tree.",
    inputSchema: {
      ...ROCKET_INPUT,
      comp_id: z.string(),
      key: z.string(),
      min: z.number(),
      max: z.number(),
      steps: z.number().int().min(2).max(60).default(15),
      goal: z.enum(["apogee", "margin"]).default("apogee"),
      target: z.number().default(0),
      min_margin: z.number().default(1),
      sim_name: z.string().optional(),
    },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        const params = JSON.stringify({
          sim_name: a.sim_name,
          comp_id: a.comp_id,
          key: a.key,
          min: a.min,
          max: a.max,
          steps: a.steps,
          goal: a.goal,
          target: a.target,
          min_margin: a.min_margin,
        });
        return ok(JSON.parse(ops.mcp_optimize(b, params)));
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- workbench bridge --------------------------------------------------
  {
    name: "open_in_workbench",
    description:
      "Surface a bundled example or any .ork (b64/url) as `ork_b64`. When the user has the workbench open in another tab, the client auto-loads whatever this returns — so call this whenever the user says 'open X', 'load X', 'show me X', or wants to see a design in 3D. No-op otherwise (the chat just gets the bytes back).",
    inputSchema: ROCKET_INPUT,
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        const j = JSON.parse(ops.mcp_inspect(b));
        return ok(
          {
            ork_b64: Buffer.from(b).toString("base64"),
            name: j.view?.name,
            components: (j.view?.components ?? []).length,
            total_length_m: j.view?.total_length,
          },
          500_000,
        );
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- design / editing (stateless: thread ork_b64 through) --------------
  {
    name: "new_document",
    description:
      "Create a blank rocket (one empty Sustainer stage). Returns ork_b64 to feed into edit_apply / simulate.",
    inputSchema: {},
    handler: async () => {
      try {
        const bytes = ops.mcp_new_document();
        return ok(
          { ork_b64: Buffer.from(bytes).toString("base64") },
          500_000,
        );
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "edit_apply",
    description:
      'Apply a batch of edit ops and return the new ork_b64 + a stability/tree snapshot. Ops: patch_field{id,key,value} | add_component{parent_id,kind} | delete_component{id} | patch_sim{sim_name,key,value} | assign_motor{mount_id,config_id,designation,digest?,ejection_delay?} | clear_motor{mount_id,config_id} | set_ignition{mount_id,event,delay?} | apply_preset{id,preset_id} | add_config{id?,name?} | rename_config{id,name} | delete_config{id} | set_active_stages{id,active:[stage_index,...]}.',
    inputSchema: {
      ...ROCKET_INPUT,
      ops: z
        .array(z.record(z.string(), z.unknown()))
        .describe('Array of {op:"...", ...} operations applied in order'),
    },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        const out = ops.mcp_edit_apply(b, JSON.stringify(a.ops));
        const snap = JSON.parse(ops.mcp_stability(out));
        return ok(
          {
            ork_b64: Buffer.from(out).toString("base64"),
            stability: snap.stability,
          },
          500_000,
        );
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- materials ---------------------------------------------------------
  {
    name: "list_materials",
    description:
      "The bundled materials catalog (OpenRocket-compatible). Returns Bulk (kg/m³), Surface (kg/m²) and Line (kg/m) entries with their density and group (wood / plastic / composite / metal / film / fabric / cord / …). Use the entry's exact `name` as material_name in edit_apply (the density is filled in automatically).",
    inputSchema: {
      kind: z.enum(["bulk", "surface", "line"]).optional(),
      group: z.string().optional(),
      contains: z.string().optional(),
    },
    handler: async (a) => {
      try {
        const all = JSON.parse(ops.mcp_list_materials()).materials as Record<
          string,
          unknown
        >[];
        let m = all;
        const kind = a.kind as string | undefined;
        const group = a.group as string | undefined;
        const contains = a.contains as string | undefined;
        if (kind) m = m.filter((x) => String(x.kind ?? "") === kind);
        if (group)
          m = m.filter(
            (x) =>
              String(x.group ?? "").toLowerCase() === group.toLowerCase(),
          );
        if (contains)
          m = m.filter((x) =>
            String(x.name ?? "")
              .toLowerCase()
              .includes(contains.toLowerCase()),
          );
        return ok({ count: m.length, materials: m });
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "list_presets",
    description:
      "Bundled component preset catalog — manufacturer + part number for body tubes, nose cones, transitions, inner tubes (motor mounts), and centering rings (Estes BT-*, PNC-*, AeroTech motor mounts, LOC Precision, Apogee). To apply a preset to a component use edit_apply with {op:'apply_preset', id:<comp_id>, preset_id:<preset.id>}.",
    inputSchema: {
      kind: z
        .enum(["body_tube", "nose_cone", "transition", "inner_tube", "centering_ring"])
        .optional(),
      manufacturer: z.string().optional(),
      body_od_mm: z.number().optional(),
      contains: z.string().optional(),
    },
    handler: async (a) => {
      try {
        const filter = JSON.stringify({
          kind: a.kind,
          manufacturer: a.manufacturer,
          body_od_mm: a.body_od_mm,
          contains: a.contains,
        });
        return ok(JSON.parse(ops.mcp_list_presets(filter)));
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "sim_warnings",
    description:
      "Pre-flight check against the design + a simulation's launch conditions: motor present, stability margin, recovery, time-step coarseness, multi-stage parity hint. Returns a list of {kind: info|warn|error, category, message}.",
    inputSchema: { ...ROCKET_INPUT, sim_name: z.string().optional() },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        return ok(
          JSON.parse(ops.mcp_sim_warnings(b, a.sim_name as string | undefined)),
        );
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "component_mass",
    description:
      "Mass of a single component (grams) in the current design. Find comp_id via inspect's tree.",
    inputSchema: { ...ROCKET_INPUT, comp_id: z.string() },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        return ok(JSON.parse(ops.mcp_component_mass(b, a.comp_id as string)));
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- motors ------------------------------------------------------------
  {
    name: "list_motors",
    description:
      "The bundled motor thrust-curve database. Optional filters.",
    inputSchema: {
      motor_class: z.string().optional(),
      manufacturer: z.string().optional(),
      contains: z.string().optional(),
      limit: z.number().int().min(1).max(500).default(100),
    },
    handler: async (a) => {
      try {
        const all = JSON.parse(ops.mcp_list_motors()).motors as Record<
          string,
          unknown
        >[];
        let m = all;
        const motor_class = a.motor_class as string | undefined;
        const manufacturer = a.manufacturer as string | undefined;
        const contains = a.contains as string | undefined;
        if (motor_class)
          m = m.filter((x) =>
            String(x.designation ?? "")
              .toUpperCase()
              .startsWith(motor_class.toUpperCase()),
          );
        if (manufacturer)
          m = m.filter((x) =>
            String(x.manufacturer ?? "")
              .toLowerCase()
              .includes(manufacturer.toLowerCase()),
          );
        if (contains)
          m = m.filter((x) =>
            String(x.designation ?? "")
              .toLowerCase()
              .includes(contains.toLowerCase()),
          );
        return ok({
          count: m.length,
          motors: m.slice(0, (a.limit as number) ?? 100),
        });
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "register_motor",
    description:
      "Register a user-supplied motor by pasting its RASP .eng text. Adds it to the session catalog so subsequent assign_motor / simulate calls can use the designation. Returns the parsed designation. Browser-only — survives within a session.",
    inputSchema: {
      name: z
        .string()
        .describe("File-style name, e.g. \"my-custom-K560.eng\""),
      eng_text: z
        .string()
        .describe("Full .eng file body (RASP text format)"),
    },
    handler: async (a) => {
      try {
        const name = a.name as string;
        const txt = a.eng_text as string;
        return ok(JSON.parse(ops.mcp_register_motor(name, txt)));
      } catch (e) {
        return fail(e);
      }
    },
  },

  {
    name: "motor_info",
    description: "One motor's full record by designation (e.g. 'C6').",
    inputSchema: { designation: z.string() },
    handler: async (a) => {
      try {
        const all = JSON.parse(ops.mcp_list_motors()).motors as Record<
          string,
          unknown
        >[];
        const designation = a.designation as string;
        const hit = all.filter(
          (x) =>
            String(x.designation ?? "").toLowerCase() ===
            designation.toLowerCase(),
        );
        return hit.length
          ? ok(hit)
          : fail(new Error(`no motor "${designation}"`));
      } catch (e) {
        return fail(e);
      }
    },
  },

  // -- skills (curated workflows / docs) ---------------------------------
  {
    name: "load_skill",
    description:
      "Load a named OpsRocket skill — a curated workflow or canonical knowledge doc. The SYSTEM_PROMPT lists the names + descriptions available. Use this whenever the user's question matches one of those descriptions (e.g. 'what is opsrocket' → load_skill(name='opsrocket')). Cheap call; do it before answering instead of guessing from memory.",
    inputSchema: { name: z.string() },
    handler: async (a) => {
      const name = a.name as string;
      const s = findSkill(name);
      if (!s) {
        const all = loadSkills()
          .map((x) => x.name)
          .join(", ");
        return fail(
          new Error(`unknown skill "${name}"; known skills: ${all || "(none)"}`),
        );
      }
      return ok(s.body, 200_000);
    },
  },

  // -- export ------------------------------------------------------------
  {
    name: "export",
    description:
      "Export the rocket: format 'ork' (base64) | 'csv' (flight data) | 'rocket_view_json' (geometry). PNG/OBJ need a browser renderer and are not available server-side.",
    inputSchema: {
      ...ROCKET_INPUT,
      format: z.enum(["ork", "csv", "rocket_view_json"]),
      sim: z.string().optional(),
    },
    handler: async (a, { req }) => {
      try {
        const b = await resolveRocket(req, pickInput(a));
        if (a.format === "ork")
          return ok(
            { ork_b64: Buffer.from(b).toString("base64") },
            500_000,
          );
        if (a.format === "rocket_view_json")
          return ok(JSON.parse(ops.mcp_inspect(b)).view);
        const f = JSON.parse(
          ops.mcp_simulate(b, a.sim as string | undefined),
        ).flight;
        const head = "time_s,altitude_m,velocity_ms,thrust_N";
        const rows = (f.time ?? []).map(
          (t: number, i: number) =>
            `${t},${f.altitude[i]},${f.velocity[i]},${f.thrust[i]}`,
        );
        return ok([head, ...rows].join("\n"), 60000);
      } catch (e) {
        return fail(e);
      }
    },
  },
];
