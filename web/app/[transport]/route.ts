// OpsRocket MCP server — remote, stateless, anonymous. Same Rust engine
// as the browser workbench (server-side wasm). Connect from Claude Code:
//   claude mcp add --transport http opsrocket https://ops.sg/mcp
//
// Tools live in lib/mcp-tools.ts so /api/chat can feed the same set to
// DeepSeek as function-calling tools. This file only wires those shared
// tools into mcp-handler and keeps the MCP-specific resources + prompts.
import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
import { ops } from "@/lib/opswasm";
import { TOOLS, METHODOLOGY } from "@/lib/mcp-tools";

export const runtime = "nodejs";
export const maxDuration = 300;

const handler = createMcpHandler(
  (server) => {
    // -- tools (shared) ---------------------------------------------------
    for (const t of TOOLS) {
      server.registerTool(
        t.name,
        { description: t.description, inputSchema: t.inputSchema },
        async (args, info) =>
          t.handler(args as Record<string, unknown>, {
            req: (info as { requestInfo?: { request?: Request } })?.requestInfo
              ?.request,
          }),
      );
    }

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
        description: "Health-check a rocket: stability + simulated flight.",
        argsSchema: { example: z.string().optional() },
      },
      (a) => ({
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Validate this OpsRocket design${a.example ? ` (example: "${a.example}")` : " (I'll provide the .ork as base64)"}. Call: stability, then simulate (detail:summary). Summarize whether it's stable (margin ≥ 1.0 cal) and its apogee / max velocity / flight time.`,
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
