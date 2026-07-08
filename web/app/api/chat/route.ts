import OpenAI from "openai";
import { z } from "zod";
import { SESSION_COOKIE, decodeSession, readCookie } from "@/lib/auth";
import { TOOLS, METHODOLOGY, type ToolResult } from "@/lib/mcp-tools";
import { loadSkills } from "@/lib/skills";

// DeepSeek-backed chat with OpsRocket MCP tools wired in as function
// calls. Streams a line-delimited JSON event protocol back to the client:
//   {"t":"text","d":"..."}                  — text delta
//   {"t":"tool","s":"start","i":id,"n":...,"a":{...}}  — tool starting
//   {"t":"tool","s":"end","i":id,"n":...,"r":"…preview…"}  — tool result
//   {"t":"tool","s":"end","i":id,"n":...,"e":"…"}       — tool error
//   {"t":"done"}                            — stream complete
//
// Gated by the same GitHub session cookie /api/auth/me uses; the MCP
// tools all run server-side against the WASM core (lib/opswasm).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const MAX_MESSAGES = 30;
const MAX_TOTAL_CHARS = 12_000;
const TOOL_TIMEOUT_MS = 30_000;
const TOOL_PREVIEW_CHARS = 500;
// What we feed back to the model. Has to comfortably fit a typical .ork
// base64 string (small designs are ~10–20 KB encoded; complex ones can
// touch ~80 KB) so edit_apply → simulate chains can thread `ork_b64`.
const TOOL_RESULT_CHARS = 500_000;

// Local-dev bypass: skip the GitHub session check when this env is "1"
// and we're not in production. Mirrors the bypass in /api/auth/me.
const DEV_BYPASS =
  process.env.NODE_ENV !== "production" &&
  process.env.OPSROCKET_DEV_NO_AUTH === "1";

type ClientMsg = { role: "user" | "assistant"; content: string };

function buildSystemPrompt(): string {
  const skills = loadSkills();
  const skillIndex = skills.length
    ? [
        "",
        "Available skills (call `load_skill(name=...)` whenever a question matches one of these descriptions — do it BEFORE answering from memory):",
        ...skills.map((s) => `  - ${s.name} — ${s.description}`),
      ].join("\n")
    : "";
  return [
    "You are the OpsRocket co-pilot. OpsRocket is a Rust rewrite of OpenRocket — model-rocketry simulation: Barrowman aero, mass/CG/CP, 6-DOF flight.",
    "",
    "You have direct function-call access to the OpsRocket engine. Prefer running a tool over guessing. Common starting moves:",
    "  - `list_examples` to see bundled rockets",
    "  - `inspect` (with example or ork_b64) for a tree + field keys + sim configs",
    "  - `simulate` for flight numbers; `stability` for CG/CP/margin; `aero_analysis` for per-component aero",
    "  - `optimize` to sweep a field; `edit_apply` to mutate; `new_document` to start a fresh runnable starter rocket",
    "  - `list_motors` / `motor_info` for the thrust-curve database",
    "  - `open_in_workbench` whenever the user asks to open/load/show a design — when their workbench is open in another tab, this auto-loads it there",
    "Threading: tools return `ork_b64`; pass it back into the next tool to keep edits stateless. When a tool returns `ork_b64` (e.g. `new_document`, `edit_apply`, `open_in_workbench`, `export`), the user's open Workbench tab auto-loads it — no manual step needed.",
    "",
    "If a workbench context message is present, prefer it as the default subject. For tools that take a rocket input, call them with NO rocket-input args — the server fills in the workbench's design automatically. Do not try to copy the workbench's ork_b64 yourself; it's far too large to pass through a tool call without corruption.",
    "",
    "Only mention tools that are in the function-calling list provided to you this turn. Do not invent tool names or claim to have called tools that are not in that list. For OpenRocket parity questions, load the `opsrocket` skill — its tables are the authoritative source.",
    skillIndex,
    "",
    "Engine context:",
    METHODOLOGY,
    "",
    "Style: terse and technical. Default to metric units. Use `$inline$` / `$$display$$` for math (never `\\(...\\)` or `\\[...\\]`). Standard Markdown for lists, code fences, tables.",
    "If a tool errors, surface the error briefly and try a different angle instead of looping on the same call.",
  ].join("\n");
}

const SYSTEM_PROMPT = buildSystemPrompt();

// ── zod ZodRawShape → JSON schema fragment (OpenAI-tool shape) ─────────
const TOOL_DEFS = TOOLS.map((t) => ({
  type: "function" as const,
  function: {
    name: t.name,
    description: t.description,
    parameters: z.toJSONSchema(z.object(t.inputSchema), {
      target: "draft-07",
      unrepresentable: "any",
    }) as Record<string, unknown>,
  },
}));

const TOOL_INDEX = new Map(TOOLS.map((t) => [t.name, t]));

function toolResultText(r: ToolResult): string {
  const txt = r.content.map((c) => c.text).join("\n");
  if (txt.length <= TOOL_RESULT_CHARS) return txt;
  return (
    txt.slice(0, TOOL_RESULT_CHARS) +
    `\n…[TRUNCATED at ${TOOL_RESULT_CHARS} chars of ${txt.length}]`
  );
}

// If a tool's result JSON top-level contains an `ork_b64`, surface it as
// a separate event field so the client can deeplink into /workspace.
function extractOrkB64(text: string): string | undefined {
  if (!text.startsWith("{")) return undefined;
  try {
    const j = JSON.parse(text);
    if (j && typeof j === "object" && typeof j.ork_b64 === "string") {
      return j.ork_b64 as string;
    }
  } catch {
    /* not JSON */
  }
  return undefined;
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    p.then(
      (v) => {
        clearTimeout(t);
        resolve(v);
      },
      (e) => {
        clearTimeout(t);
        reject(e);
      },
    );
  });
}

export async function POST(req: Request) {
  // ── auth ────────────────────────────────────────────────────────────
  let session = null;
  try {
    session = decodeSession(readCookie(req, SESSION_COOKIE));
  } catch {
    /* env not configured → treat as anonymous */
  }
  if (!session && !DEV_BYPASS) {
    return Response.json({ error: "sign in required" }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "server missing DEEPSEEK_API_KEY" },
      { status: 500 },
    );
  }

  // ── parse + validate ────────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) {
    return Response.json({ error: "bad messages" }, { status: 400 });
  }

  const messages: ClientMsg[] = [];
  let total = 0;
  for (const m of raw) {
    if (!m || typeof m !== "object") {
      return Response.json({ error: "bad message shape" }, { status: 400 });
    }
    const cm = m as Partial<ClientMsg>;
    if (
      (cm.role !== "user" && cm.role !== "assistant") ||
      typeof cm.content !== "string"
    ) {
      return Response.json({ error: "bad message shape" }, { status: 400 });
    }
    total += cm.content.length;
    if (total > MAX_TOTAL_CHARS) {
      return Response.json({ error: "messages too long" }, { status: 413 });
    }
    messages.push({ role: cm.role, content: cm.content });
  }

  // Optional workbench context — design the user has open in another tab.
  // Lives in a separate field (not counted against MAX_TOTAL_CHARS) since
  // ork_b64 can dwarf the chat history.
  const ctx = (body as { context?: unknown }).context;
  let workbench:
    | { ork_b64: string; name?: string; total_length_m?: number; components?: number }
    | null = null;
  if (ctx && typeof ctx === "object") {
    const c = ctx as Record<string, unknown>;
    if (typeof c.ork_b64 === "string" && c.ork_b64.length > 0) {
      workbench = {
        ork_b64: c.ork_b64,
        name: typeof c.name === "string" ? c.name : undefined,
        total_length_m:
          typeof c.total_length_m === "number" ? c.total_length_m : undefined,
        components:
          typeof c.components === "number" ? c.components : undefined,
      };
    }
  }

  // ── deepseek client + agentic stream ────────────────────────────────
  const client = new OpenAI({
    apiKey,
    baseURL: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
  });
  const model = process.env.DEEPSEEK_MODEL ?? "deepseek-chat";

  // openai sdk message type loose-shape; we only use a subset
  type SdkMsg =
    | { role: "system"; content: string }
    | { role: "user"; content: string }
    | {
        role: "assistant";
        content: string | null;
        tool_calls?: {
          id: string;
          type: "function";
          function: { name: string; arguments: string };
        }[];
      }
    | { role: "tool"; tool_call_id: string; content: string };

  const sdkMessages: SdkMsg[] = [
    { role: "system", content: SYSTEM_PROMPT },
  ];
  if (workbench) {
    const tag = workbench.name ? ` "${workbench.name}"` : "";
    const dims = [
      workbench.total_length_m != null
        ? `length=${workbench.total_length_m.toFixed(3)}m`
        : null,
      workbench.components != null
        ? `components=${workbench.components}`
        : null,
    ]
      .filter(Boolean)
      .join(", ");
    sdkMessages.push({
      role: "system",
      content: [
        `The user has a design${tag} open in their Workbench right now (${dims || "details unknown"}). Treat this as the default subject of the conversation.`,
        "",
        "For ANY tool that accepts a rocket input (ork_b64 / example / ork_url) — inspect, stability, simulate, aero_analysis, mass_breakdown, optimize, edit_apply, export, open_in_workbench, etc. — call it WITHOUT supplying ork_b64/example/ork_url. The server will automatically thread in the workbench's current design. Only specify a rocket input when you explicitly need to target a different design.",
        "",
        "Never paste the workbench's base64 into a tool call yourself — it's hundreds of KB and will be corrupted in transit.",
        "",
        "When a tool returns a new design, continue with that returned design. The server tracks the latest returned ork_b64 as the new default for later tool calls in this same turn.",
      ].join("\n"),
    });
  }
  sdkMessages.push(...messages);

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: object) =>
        controller.enqueue(encoder.encode(JSON.stringify(ev) + "\n"));

      try {
        let currentRocketB64 = workbench?.ork_b64 ?? null;
        while (true) {
          const stream = await client.chat.completions.create({
            model,
            // SDK types are stricter than what we accept above; safe at runtime
            messages: sdkMessages as Parameters<
              typeof client.chat.completions.create
            >[0]["messages"],
            tools: TOOL_DEFS,
            tool_choice: "auto",
            stream: true,
          });

          let textBuf = "";
          let finishReason: string | null = null;
          // index → partial accumulator
          const toolBuf = new Map<
            number,
            { id?: string; name?: string; args: string }
          >();

          for await (const chunk of stream) {
            const choice = chunk.choices[0];
            if (choice?.finish_reason) finishReason = choice.finish_reason;
            const delta = choice?.delta;
            if (!delta) continue;
            if (delta.content) {
              textBuf += delta.content;
              emit({ t: "text", d: delta.content });
            }
            if (delta.tool_calls) {
              for (const tc of delta.tool_calls) {
                const idx = tc.index ?? 0;
                let buf = toolBuf.get(idx);
                if (!buf) {
                  buf = { args: "" };
                  toolBuf.set(idx, buf);
                }
                if (tc.id) buf.id = tc.id;
                if (tc.function?.name) buf.name = tc.function.name;
                if (tc.function?.arguments) buf.args += tc.function.arguments;
              }
            }
          }

          if (toolBuf.size === 0) {
            // Plain text response — we're done.
            if (finishReason && !["stop", "tool_calls"].includes(finishReason)) {
              emit({
                t: "text",
                d: `\n\n[stopped: model finish reason "${finishReason}"]`,
              });
            }
            break;
          }

          // Push the assistant turn (with tool_calls) into history.
          const toolCalls = Array.from(toolBuf.values())
            .filter((b) => b.id && b.name)
            .map((b) => ({
              id: b.id!,
              type: "function" as const,
              function: { name: b.name!, arguments: b.args || "{}" },
            }));

          if (toolCalls.length === 0) {
            emit({
              t: "text",
              d: "\n\n[stream error: model returned an incomplete tool call]",
            });
            break;
          }

          sdkMessages.push({
            role: "assistant",
            content: textBuf || null,
            tool_calls: toolCalls,
          });

          // Execute each tool sequentially.
          for (const tc of toolCalls) {
            const tool = TOOL_INDEX.get(tc.function.name);
            let args: Record<string, unknown> = {};
            try {
              args = JSON.parse(tc.function.arguments || "{}");
            } catch {
              /* keep empty args */
            }
            emit({
              t: "tool",
              s: "start",
              i: tc.id,
              n: tc.function.name,
              a: args,
            });

            // Auto-inject the workbench's current `ork_b64` when the model
            // didn't pass any rocket input. The model sees the design's
            // name in a system message but cannot reliably copy a 200+ KB
            // base64 string through a tool call — so we resolve it for it.
            let execArgs = args;
            if (
              currentRocketB64 &&
              !args.ork_b64 &&
              !args.example &&
              !args.ork_url
            ) {
              execArgs = { ...args, ork_b64: currentRocketB64 };
            }

            if (!tool) {
              const errMsg = `unknown tool: ${tc.function.name}`;
              sdkMessages.push({
                role: "tool",
                tool_call_id: tc.id,
                content: `ERROR: ${errMsg}`,
              });
              emit({
                t: "tool",
                s: "end",
                i: tc.id,
                n: tc.function.name,
                e: errMsg,
              });
              continue;
            }

            try {
              const result = await withTimeout(
                tool.handler(execArgs, { req }),
                TOOL_TIMEOUT_MS,
                tc.function.name,
              );
              // Pull ork_b64 from the FULL result text first; the model-
              // facing slice may strip the end of the string and break
              // JSON.parse.
              const fullText = result.content.map((c) => c.text).join("\n");
              const orkB64 = extractOrkB64(fullText);
              if (orkB64) currentRocketB64 = orkB64;
              const text = toolResultText(result);
              sdkMessages.push({
                role: "tool",
                tool_call_id: tc.id,
                content: text,
              });
              if (result.isError) {
                emit({
                  t: "tool",
                  s: "end",
                  i: tc.id,
                  n: tc.function.name,
                  e: text.slice(0, TOOL_PREVIEW_CHARS),
                });
              } else {
                emit({
                  t: "tool",
                  s: "end",
                  i: tc.id,
                  n: tc.function.name,
                  r: text.slice(0, TOOL_PREVIEW_CHARS),
                  ...(orkB64 ? { ork_b64: orkB64 } : {}),
                });
              }
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              sdkMessages.push({
                role: "tool",
                tool_call_id: tc.id,
                content: `ERROR: ${msg}`,
              });
              emit({
                t: "tool",
                s: "end",
                i: tc.id,
                n: tc.function.name,
                e: msg,
              });
            }
          }
          // loop again with tool results in history
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown";
        emit({ t: "text", d: `\n\n[stream error: ${msg}]` });
      } finally {
        emit({ t: "done" });
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
