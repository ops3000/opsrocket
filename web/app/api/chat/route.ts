import OpenAI from "openai";
import { SESSION_COOKIE, decodeSession, readCookie } from "@/lib/auth";

// DeepSeek chat — OpenAI-compatible API, streamed back to the client as
// plain text chunks. Keys live in env (DEEPSEEK_API_KEY); the hero pill
// in components/HeroPrompt.tsx is the only caller today.
//
// Gated by the same GitHub session cookie /api/auth/me uses. Anonymous
// callers get a 401 so randoms can't curl this endpoint and burn the
// shared DeepSeek key.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 30;
const MAX_TOTAL_CHARS = 12_000;

type ClientMsg = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = [
  "You are the OpsRocket co-pilot. OpsRocket is a Rust rewrite of OpenRocket — model-rocketry simulation: Barrowman aero, mass/CG/CP, 6-DOF flight.",
  "Be terse and technical. Default to metric units.",
  "Format math with dollar-sign delimiters: `$inline$` and `$$display$$`. Do NOT use `\\(...\\)` or `\\[...\\]`.",
  "Use standard Markdown for lists, code blocks (with language fences), and tables.",
  "If the user asks something off-topic, answer briefly and steer back to rocketry / the OpsRocket pipeline.",
].join(" ");

export async function POST(req: Request) {
  let session = null;
  try {
    session = decodeSession(readCookie(req, SESSION_COOKIE));
  } catch {
    // Auth env not configured → treat as anonymous, which the next check rejects.
  }
  if (!session) {
    return Response.json({ error: "sign in required" }, { status: 401 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "server missing DEEPSEEK_API_KEY" },
      { status: 500 }
    );
  }

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

  const client = new OpenAI({
    apiKey,
    baseURL: process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com",
  });

  const stream = await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat",
    stream: true,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          const delta = chunk.choices[0]?.delta?.content ?? "";
          if (delta) controller.enqueue(encoder.encode(delta));
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "unknown";
        controller.enqueue(encoder.encode(`\n\n[stream error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
