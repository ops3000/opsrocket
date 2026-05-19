// OpsRocket MCP server — remote, stateless, anonymous. Same Rust engine
// as the browser workbench (server-side wasm). Connect from Claude Code:
//   claude mcp add --transport http opsrocket https://ops.sg/mcp
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import {
  ops,
  resolveRocket,
  listExamples,
  type RocketInput,
} from "@/lib/opswasm";

export const runtime = "nodejs";
export const maxDuration = 300;

// ── helpers ─────────────────────────────────────────────────────────────

const ROCKET_INPUT = {
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

type Result = { content: { type: "text"; text: string }[]; isError?: boolean };

function ok(obj: unknown, maxChars = 50000): Result {
  let text = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
  if (text.length > maxChars)
    text =
      text.slice(0, maxChars) +
      `\n\n…[OUTPUT TRUNCATED at ${maxChars} chars (${text.length} total) — this text is no longer valid JSON; use detail:"summary", a tighter filter, or fewer max_points]`;
  return { content: [{ type: "text", text }] };
}

function fail(e: unknown): Result {
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

// Downsample a numeric series to at most n points (keeps first & last).
function downsample(xs: number[], n: number): number[] {
  if (xs.length <= n) return xs;
  const step = (xs.length - 1) / (n - 1);
  return Array.from({ length: n }, (_, i) => xs[Math.round(i * step)]);
}

const METHODOLOGY = `OpsRocket engine — methodology & known boundaries

Aerodynamics: Barrowman + extensions (per-component base/forward-step
drag, NASA nose interpolators, finish roughness, fin/tube terms),
faithfully ported from OpenRocket. Stability (CP/CNa) and mass/CG are at
parity with OpenRocket (single-stage typically within a few %).

Flight sim: RK4 with adaptive timestep, 6-DOF, wind (PinkNoise), motor
thrust-curve interpolation, recovery (apogee/altitude/ejection-delay),
tumble fallback. Single-stage rockets are within ~0–5% of OpenRocket on
apogee / max velocity / flight time (cross-checked via parity_examples).

Known residuals (genuinely off, not yet at parity): multi-stage /
airstart / pod-powered trajectories, and simulation-extension/scripting
designs (the engine does not execute embedded scripts). Recovery
descent is simplified vs a dedicated landing stepper.

Cross-validation: every .ork from OpenRocket carries a cached flight
reference; parity_openrocket / parity_examples diff against it. RASAero
II cross-validation (parity_rasaero) is planned, not yet implemented.

Units: SI internally (m, kg, s, N, rad); some fields reported in cm/mm.`;

// ── handler ─────────────────────────────────────────────────────────────

const handler = createMcpHandler(
  (server) => {
    // -- discovery --------------------------------------------------------
    server.registerTool(
      "list_examples",
      {
        description:
          "List the bundled example rockets (each carries an embedded OpenRocket reference for cross-validation).",
        inputSchema: {},
      },
      async (_args, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const list = await listExamples(req);
          return ok(list.map((e) => e.name));
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "capabilities",
      {
        description:
          "Engine version, component kinds, allowed children, edit-op list, units.",
        inputSchema: {},
      },
      async () => {
        try {
          return ok(JSON.parse(ops.mcp_capabilities()));
        } catch (e) {
          return fail(e);
        }
      },
    );

    // -- inspection -------------------------------------------------------
    server.registerTool(
      "inspect",
      {
        description:
          "Rocket overview: name, components tree, motor configs, simulations. detail:'full' includes full geometry.",
        inputSchema: {
          ...ROCKET_INPUT,
          detail: z.enum(["summary", "full"]).default("summary"),
        },
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          const j = JSON.parse(ops.mcp_inspect(b));
          if (a.detail === "full") return ok(j, 200000);
          const v = j.view ?? {};
          // Summary tree: keep ids/kinds/names + editable field KEYS (so
          // optimize / edit_apply can target them) but drop the bulky
          // per-field value objects — the full set is in detail:"full".
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
    );

    server.registerTool(
      "stability",
      {
        description:
          "Mass, CG, CP, stability margin (cal), Cd and its breakdown.",
        inputSchema: ROCKET_INPUT,
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          return ok(JSON.parse(ops.mcp_stability(b)));
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "aero_analysis",
      {
        description:
          "Per-component aerodynamics (CNα, CP, Cd shares) and totals at a given Mach.",
        inputSchema: { ...ROCKET_INPUT, mach: z.number().default(0.3) },
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          return ok(JSON.parse(ops.mcp_analysis(b, a.mach ?? 0.3)));
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "mass_breakdown",
      {
        description: "Mass / CG / inertia properties and stability summary.",
        inputSchema: ROCKET_INPUT,
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          return ok(JSON.parse(ops.mcp_mass_breakdown(b)));
        } catch (e) {
          return fail(e);
        }
      },
    );

    // -- simulation -------------------------------------------------------
    const SIM_INPUT = {
      ...ROCKET_INPUT,
      sim: z.string().optional().describe("Simulation name (default: first)"),
      detail: z.enum(["summary", "full"]).default("summary"),
      max_points: z.number().int().min(10).max(2000).default(200),
    };

    function shapeFlight(
      raw: string,
      detail: string,
      maxPoints: number,
    ): unknown {
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

    server.registerTool(
      "simulate",
      {
        description:
          "Run the flight simulation. Returns apogee / max velocity / flight time / events; detail:'full' adds a downsampled time series.",
        inputSchema: SIM_INPUT,
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          return ok(
            shapeFlight(
              ops.mcp_simulate(b, a.sim),
              a.detail ?? "summary",
              a.max_points ?? 200,
            ),
          );
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "compare_runs",
      {
        description:
          "Diff two rockets' flight summaries (e.g. before/after an edit). Pass A and B as base64.",
        inputSchema: {
          a_ork_b64: z.string(),
          b_ork_b64: z.string(),
          sim: z.string().optional(),
        },
      },
      async (a) => {
        try {
          const A = JSON.parse(
            ops.mcp_simulate(
              new Uint8Array(Buffer.from(a.a_ork_b64, "base64")),
              a.sim,
            ),
          ).flight;
          const B = JSON.parse(
            ops.mcp_simulate(
              new Uint8Array(Buffer.from(a.b_ork_b64, "base64")),
              a.sim,
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
    );

    server.registerTool(
      "optimize",
      {
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
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
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
    );

    // -- cross-validation -------------------------------------------------
    server.registerTool(
      "parity_openrocket",
      {
        description:
          "Run our sim and diff against this .ork's embedded OpenRocket reference (apogee / maxV / maxA / flight time / recovery).",
        inputSchema: {
          ...ROCKET_INPUT,
          index: z.number().int().min(0).default(0),
        },
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          return ok(JSON.parse(ops.mcp_parity(b, a.index ?? 0)));
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "parity_examples",
      {
        description:
          "Run all bundled examples and table OpsRocket vs their OpenRocket references (apogee / maxV / flight time, with divergence flags).",
        inputSchema: {},
      },
      async (_args, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request as Request;
          const list = await listExamples(req);
          const rows = [];
          for (const e of list) {
            try {
              const b = await resolveRocket(req, { example: e.name });
              const p = JSON.parse(ops.mcp_parity(b, 0));
              rows.push({
                example: e.name.replace(/\.ork$/, ""),
                apogee_delta_pct: p.apogee_m?.delta_pct ?? null,
                maxV_delta_pct: p.max_velocity_ms?.delta_pct ?? null,
                flight_time_ops: p.flight_time_s?.ops ?? null,
                flight_time_or: p.flight_time_s?.openrocket ?? null,
                flag:
                  Math.abs(p.apogee_m?.delta_pct ?? 0) > 10 ? "!apogee" : "",
              });
            } catch (err) {
              rows.push({
                example: e.name,
                error: err instanceof Error ? err.message : String(err),
              });
            }
          }
          return ok(rows);
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "extract_or_reference",
      {
        description:
          "Extract the embedded OpenRocket cached flight data (columns + events; point rows are summarized to stay in budget).",
        inputSchema: {
          ...ROCKET_INPUT,
          index: z.number().int().min(0).default(0),
        },
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          const j = JSON.parse(
            ops.mcp_extract_or_reference(b, a.index ?? 0),
          );
          const pts: number[][] = j.points ?? [];
          return ok({
            engine_version: j.engine_version,
            columns: j.columns,
            events: j.events,
            point_count: pts.length,
            first: pts[0],
            last: pts[pts.length - 1],
            note: "Full point matrix omitted to stay within MCP context budget; use parity_openrocket for the diff.",
          });
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "parity_rasaero",
      {
        description:
          "[Not implemented yet] Cross-validate against a RASAero II CSV export. Returns a not-implemented notice until CDX1/CSV mapping lands.",
        inputSchema: { ...ROCKET_INPUT, rasaero_csv: z.string().optional() },
      },
      async () =>
        ok(
          "parity_rasaero is not implemented yet (RASAero II CDX1/CSV mapping deferred). Use parity_openrocket for cross-validation today.",
        ),
    );

    // -- design / editing (stateless: thread ork_b64 through) -------------
    server.registerTool(
      "new_document",
      {
        description:
          "Create a blank rocket (one empty Sustainer stage). Returns ork_b64 to feed into edit_apply / simulate.",
        inputSchema: {},
      },
      async () => {
        try {
          const bytes = ops.mcp_new_document();
          return ok({
            ork_b64: Buffer.from(bytes).toString("base64"),
          });
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "edit_apply",
      {
        description:
          "Apply a batch of edit ops and return the new ork_b64 + a stability/tree snapshot. Ops: patch_field{id,key,value} | add_component{parent_id,kind} | delete_component{id} | patch_sim{sim_name,key,value} | assign_motor{mount_id,config_id,designation,digest?,ejection_delay?} | clear_motor{mount_id,config_id} | set_ignition{mount_id,event,delay?}.",
        inputSchema: {
          ...ROCKET_INPUT,
          ops: z
            .array(z.record(z.string(), z.unknown()))
            .describe('Array of {op:"...", ...} operations applied in order'),
        },
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          const out = ops.mcp_edit_apply(b, JSON.stringify(a.ops));
          const snap = JSON.parse(ops.mcp_stability(out));
          return ok({
            ork_b64: Buffer.from(out).toString("base64"),
            stability: snap.stability,
          });
        } catch (e) {
          return fail(e);
        }
      },
    );

    // -- motors -----------------------------------------------------------
    server.registerTool(
      "list_motors",
      {
        description:
          "The bundled motor thrust-curve database. Optional filters.",
        inputSchema: {
          motor_class: z.string().optional(),
          manufacturer: z.string().optional(),
          contains: z.string().optional(),
          limit: z.number().int().min(1).max(500).default(100),
        },
      },
      async (a) => {
        try {
          const all = JSON.parse(ops.mcp_list_motors()).motors as Record<
            string,
            unknown
          >[];
          let m = all;
          if (a.motor_class)
            m = m.filter(
              (x) =>
                String(x.designation ?? "")
                  .toUpperCase()
                  .startsWith(a.motor_class!.toUpperCase()),
            );
          if (a.manufacturer)
            m = m.filter((x) =>
              String(x.manufacturer ?? "")
                .toLowerCase()
                .includes(a.manufacturer!.toLowerCase()),
            );
          if (a.contains)
            m = m.filter((x) =>
              String(x.designation ?? "")
                .toLowerCase()
                .includes(a.contains!.toLowerCase()),
            );
          return ok({ count: m.length, motors: m.slice(0, a.limit ?? 100) });
        } catch (e) {
          return fail(e);
        }
      },
    );

    server.registerTool(
      "motor_info",
      {
        description: "One motor's full record by designation (e.g. 'C6').",
        inputSchema: { designation: z.string() },
      },
      async (a) => {
        try {
          const all = JSON.parse(ops.mcp_list_motors()).motors as Record<
            string,
            unknown
          >[];
          const hit = all.filter(
            (x) =>
              String(x.designation ?? "").toLowerCase() ===
              a.designation.toLowerCase(),
          );
          return hit.length
            ? ok(hit)
            : fail(new Error(`no motor "${a.designation}"`));
        } catch (e) {
          return fail(e);
        }
      },
    );

    // -- export -----------------------------------------------------------
    server.registerTool(
      "export",
      {
        description:
          "Export the rocket: format 'ork' (base64) | 'csv' (flight data) | 'rocket_view_json' (geometry). PNG/OBJ need a browser renderer and are not available server-side.",
        inputSchema: {
          ...ROCKET_INPUT,
          format: z.enum(["ork", "csv", "rocket_view_json"]),
          sim: z.string().optional(),
        },
      },
      async (a, { requestInfo }) => {
        try {
          const req = (requestInfo as { request?: Request })?.request;
          const b = await resolveRocket(req, pickInput(a));
          if (a.format === "ork")
            return ok({ ork_b64: Buffer.from(b).toString("base64") });
          if (a.format === "rocket_view_json")
            return ok(JSON.parse(ops.mcp_inspect(b)).view);
          const f = JSON.parse(ops.mcp_simulate(b, a.sim)).flight;
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
    );

    // -- resources --------------------------------------------------------
    server.registerResource(
      "schema",
      "opsrocket://schema",
      {
        title: "OpsRocket schema & capabilities",
        description: "Component kinds, allowed children, edit ops, units.",
        mimeType: "application/json",
      },
      async () => ({
        contents: [
          {
            uri: "opsrocket://schema",
            mimeType: "application/json",
            text: ops.mcp_capabilities(),
          },
        ],
      }),
    );

    server.registerResource(
      "methodology",
      "opsrocket://methodology",
      {
        title: "OpsRocket methodology & known boundaries",
        description: "How the engine works and where it diverges.",
        mimeType: "text/plain",
      },
      async () => ({
        contents: [
          {
            uri: "opsrocket://methodology",
            mimeType: "text/plain",
            text: METHODOLOGY,
          },
        ],
      }),
    );

    // -- prompts ----------------------------------------------------------
    server.registerPrompt(
      "validate_design",
      {
        description:
          "Health-check a rocket: stability, simulate, and cross-validate vs OpenRocket.",
        argsSchema: { example: z.string().optional() },
      },
      (a) => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Validate this OpsRocket design${a.example ? ` (example: "${a.example}")` : " (I'll provide the .ork as base64)"}. Call: stability, then simulate (detail:summary), then parity_openrocket. Summarize whether it's stable, its apogee, and how closely it matches the OpenRocket reference.`,
            },
          },
        ],
      }),
    );

    server.registerPrompt(
      "optimize_for_apogee",
      {
        description: "Find the component change that maximizes apogee.",
        argsSchema: { example: z.string().optional() },
      },
      (a) => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Optimize this rocket for apogee${a.example ? ` (example: "${a.example}")` : ""}. inspect to find a candidate component/field (e.g. nose length, fin size, mass), run optimize over a sensible range with goal:"apogee" and min_margin:1.0, then report the best value and the apogee gain.`,
            },
          },
        ],
      }),
    );

    server.registerPrompt(
      "cross_validate",
      {
        description: "Compare OpsRocket vs OpenRocket across all examples.",
        argsSchema: {},
      },
      () => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: "Run parity_examples and summarize: which rockets match OpenRocket well (single-stage) and which diverge (staging / scripted), with the apogee deltas.",
            },
          },
        ],
      }),
    );

    server.registerPrompt(
      "design_from_scratch",
      {
        description: "Build a new rocket toward a target apogee.",
        argsSchema: { target_apogee_m: z.string().optional() },
      },
      (a) => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Design a model rocket from scratch${a.target_apogee_m ? ` targeting ~${a.target_apogee_m} m apogee` : ""}. Start with new_document, use edit_apply to add a nose cone / body / fins / parachute and assign a motor (list_motors to pick), simulate, and iterate until stability margin ≥ 1.0 cal and the apogee is close to target.`,
            },
          },
        ],
      }),
    );
  },
  {
    serverInfo: { name: "opsrocket", version: "1.0.0" },
  },
  { basePath: "", disableSse: true, maxDuration: 300 },
);

export { handler as GET, handler as POST, handler as DELETE };
