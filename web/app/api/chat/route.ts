// Streaming chat endpoint for the homepage Chat component.
//
// Wire: client POSTs {messages:[{role,content},…]} → we re-emit OpenAI's
// SSE stream in a uniform shape (data: {type:"content",text}\n\n …
// data: [DONE]\n\n). Gated by the GitHub OAuth session cookie. If
// OPENAI_API_KEY isn't set yet, we stream a short mock note so the UI
// keeps working pre-config.
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { SESSION_COOKIE, decodeSession, readCookie } from "@/lib/auth";

export const runtime = "nodejs";
export const maxDuration = 60;

const SYSTEM_PROMPT = `You are OpsRocket, an in-product assistant for rocketry modelling. The user is on https://ops.sg — a Rust port of OpenRocket with a live workbench at /workspace and a parity harness that cross-validates flights against Java OpenRocket.

Be concise. Use markdown. Don't fabricate physics numbers — if the user wants concrete values for a specific rocket (apogee, max velocity, stability, drag), say which tool would answer it (simulate, parity_openrocket, stability, optimize, list_examples, inspect) and what a typical answer looks like. Tool execution will be wired into this chat shortly; today you can plan and explain, not actually run sims.

Prefer pointing the user at https://ops.sg/workspace for direct visual editing, and treat OpenRocket as the parity baseline (not infallible). Single-stage OpsRocket sims are within a few % of OpenRocket; multi-stage / scripted-extension fixtures still diverge — be honest about that.

Keep replies short unless the user asks for depth.`;

type RawMsg = { role?: unknown; content?: unknown };

export async function POST(req: Request) {
  let sess = null;
  try {
    sess = decodeSession(readCookie(req, SESSION_COOKIE));
  } catch {
    /* env not configured → treat as anonymous */
  }
  if (!sess) return new Response("sign in first", { status: 401 });

  let body: { messages?: RawMsg[] } | null = null;
  try {
    body = (await req.json()) as { messages?: RawMsg[] };
  } catch {
    return new Response("invalid json", { status: 400 });
  }
  const messages: ChatCompletionMessageParam[] = (body?.messages ?? [])
    .map((m): ChatCompletionMessageParam => {
      const content = typeof m.content === "string" ? m.content : "";
      if (m.role === "assistant")
        return { role: "assistant", content };
      if (m.role === "system") return { role: "system", content };
      return { role: "user", content };
    })
    .filter((m) => m.content)
    .slice(-20); // cap history to keep tokens bounded
  if (messages.length === 0)
    return new Response("empty messages", { status: 400 });

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (obj: unknown) => {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(obj)}\n\n`),
        );
      };
      const close = () => {
        try {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch {
          /* already closed */
        }
      };

      try {
        if (!apiKey) {
          const note =
            "_(`OPENAI_API_KEY` isn't configured on the server yet — this is a stub reply so the UI flows end-to-end. Set the env var in Vercel and redeploy; I'll have real answers.)_";
          for (const part of note.match(/.{1,4}/g) ?? []) {
            if (req.signal.aborted) break;
            send({ type: "content", text: part });
            await new Promise((r) => setTimeout(r, 18));
          }
          close();
          return;
        }

        const client = new OpenAI({ apiKey });
        const completion = await client.chat.completions.create({
          model,
          stream: true,
          temperature: 0.4,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
        });

        for await (const chunk of completion) {
          if (req.signal.aborted) break;
          const text = chunk.choices?.[0]?.delta?.content;
          if (typeof text === "string" && text) {
            send({ type: "content", text });
          }
        }
        close();
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        send({ type: "error", message: msg });
        close();
      }
    },
    cancel() {
      // Client disconnect — the for-await loop reads req.signal.aborted
      // and exits on the next tick.
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
