"use client";

// Inline chat surface that the homepage pill unfolds into on submit.
// Pattern lifted from the juglans embed iframe — log + composer + SSE
// streaming + AbortController stop — but rendered as a React component
// styled to match the ops.sg cream/pink palette.

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Simulate the A simple model rocket",
  "Compare OpsRocket vs OpenRocket across all examples",
  "Optimize the nose cone for max apogee",
  "What example rockets are bundled?",
];

function lsKey(username: string | null | undefined) {
  return `opsrocket:chat:${username || "anon"}`;
}

export function Chat({
  firstMessage,
  username,
  onReset,
}: {
  firstMessage?: string;
  username?: string | null;
  onReset?: () => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const ctlRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const sentFirst = useRef(false);

  // Restore history on mount (per-user localStorage). The firstMessage
  // path below decides whether to append on top of that or seed fresh.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(lsKey(username));
      if (raw) {
        const parsed = JSON.parse(raw) as Msg[];
        // Hydration-safe localStorage restore: initial state must match
        // the server render (empty), so we load + setState on mount. The
        // lint rule's "no setState in effect" doesn't apply to this
        // documented pattern.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if (Array.isArray(parsed)) setMessages(parsed);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on change.
  useEffect(() => {
    try {
      localStorage.setItem(lsKey(username), JSON.stringify(messages));
    } catch {
      /* ignore */
    }
  }, [messages, username]);

  // Auto-scroll the log to the bottom on every message / streaming tick.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  // Auto-send the message the pill carried in, exactly once.
  useEffect(() => {
    if (firstMessage && !sentFirst.current) {
      sentFirst.current = true;
      void send(firstMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstMessage]);

  function updateLast(updater: (last: Msg) => Msg) {
    setMessages((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice();
      next[next.length - 1] = updater(next[next.length - 1]);
      return next;
    });
  }

  async function send(text: string) {
    const t = text.trim();
    if (!t || streaming) return;
    setErrorMsg(null);
    const user: Msg = { role: "user", content: t };
    const placeholder: Msg = { role: "assistant", content: "" };
    const history = [...messages, user];
    setMessages([...history, placeholder]);
    setDraft("");
    autoresize();
    setStreaming(true);
    const ctl = new AbortController();
    ctlRef.current = ctl;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        signal: ctl.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify({ messages: history }),
      });
      if (!r.ok) {
        const body = await r.text();
        const detail = body.slice(0, 200) || `${r.status}`;
        updateLast((m) => ({ ...m, content: `Error: ${detail}` }));
        return;
      }
      if (!r.body) throw new Error("no response body");
      await streamSse(
        r.body,
        (chunk) =>
          updateLast((m) => ({ ...m, content: (m.content || "") + chunk })),
        ctl.signal,
      );
    } catch (e) {
      const name = (e as { name?: string })?.name;
      if (name === "AbortError") {
        updateLast((m) => ({
          ...m,
          content: (m.content || "") + "\n\n_(stopped)_",
        }));
      } else {
        const msg = e instanceof Error ? e.message : String(e);
        updateLast((m) => ({ ...m, content: `Error: ${msg}` }));
        setErrorMsg(msg);
      }
    } finally {
      setStreaming(false);
      ctlRef.current = null;
      // refocus the composer for follow-up
      taRef.current?.focus();
    }
  }

  function stop() {
    ctlRef.current?.abort();
  }

  function resetConversation() {
    if (streaming) stop();
    setMessages([]);
    setErrorMsg(null);
    try {
      localStorage.removeItem(lsKey(username));
    } catch {
      /* ignore */
    }
    onReset?.();
  }

  function autoresize() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(140, ta.scrollHeight) + "px";
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (streaming) {
      stop();
      return;
    }
    void send(draft);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (streaming) stop();
      else void send(draft);
    }
  }

  return (
    <div className="flex w-full max-w-xl flex-col">
      {/* Empty-state suggestions */}
      {messages.length === 0 && !streaming && (
        <div className="mb-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setDraft(s);
                void send(s);
              }}
              className="rounded-full border border-[var(--line)] bg-[var(--bg-2)] px-3 py-1.5 text-xs text-ink transition hover:border-[var(--accent)] hover:bg-[rgba(255,45,120,0.08)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Log */}
      <div
        ref={logRef}
        className="mb-3 flex max-h-[60vh] min-h-[120px] flex-col gap-3 overflow-y-auto pr-1"
      >
        {messages.map((m, i) => (
          <Bubble
            key={i}
            role={m.role}
            content={m.content}
            streaming={
              streaming &&
              i === messages.length - 1 &&
              m.role === "assistant" &&
              !m.content
            }
          />
        ))}
      </div>

      {errorMsg && (
        <div className="mb-3 rounded-md border border-[var(--line)] bg-[rgba(220,38,38,0.06)] px-3 py-2 text-xs text-[#9a3232]">
          {errorMsg}
        </div>
      )}

      {/* Composer (same pink pill as the hero) */}
      <form
        onSubmit={onSubmit}
        className="flex w-full items-end gap-3 rounded-3xl px-2 py-2"
        style={{
          background: "var(--bg-2)",
          border: "1px solid var(--accent)",
          boxShadow:
            "0 0 0 3px rgba(255,45,120,0.08), 0 8px 28px rgba(255,45,120,0.16)",
        }}
      >
        <span
          className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full bg-white"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ops-mark.png" alt="" className="h-6 w-6 object-contain" />
        </span>
        <textarea
          ref={taRef}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            autoresize();
          }}
          onKeyDown={onKeyDown}
          placeholder={
            messages.length
              ? "Reply… (Enter to send · Shift-Enter for newline)"
              : "Ask OpsRocket anything about your rocket…"
          }
          rows={1}
          aria-label="Message"
          className="min-h-[22px] min-w-0 flex-1 resize-none bg-transparent py-2 text-base text-ink outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          aria-label={streaming ? "Stop" : "Send"}
          disabled={!streaming && !draft.trim()}
          className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center self-end rounded-full text-white transition hover:opacity-90 disabled:opacity-40"
          style={{ background: "var(--accent)" }}
        >
          {streaming ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12" rx="2" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z" />
            </svg>
          )}
        </button>
      </form>

      <div className="mono mt-2 flex justify-between px-2 text-[10px] uppercase tracking-wider text-muted">
        <span>
          chatting as <span className="text-ink">{username || "you"}</span>
          {streaming && " · streaming…"}
        </span>
        <button
          type="button"
          onClick={resetConversation}
          className="underline hover:text-ink"
        >
          new conversation
        </button>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────

function Bubble({
  role,
  content,
  streaming,
}: {
  role: "user" | "assistant";
  content: string;
  streaming: boolean;
}) {
  if (role === "user") {
    return (
      <div className="self-end max-w-[85%] whitespace-pre-wrap rounded-2xl bg-[var(--bg-2)] px-4 py-2 text-ink ring-1 ring-[var(--line)]">
        {content}
      </div>
    );
  }
  return (
    <div className="self-start max-w-[92%]">
      <div className="mono mb-1 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted">
        <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-full bg-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/ops-mark.png" alt="" className="h-3 w-3 object-contain" />
        </span>
        <span>OpsRocket</span>
      </div>
      <div className="md-body rounded-2xl bg-[rgba(255,45,120,0.06)] px-4 py-2 text-ink ring-1 ring-[rgba(255,45,120,0.18)]">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <span className="text-muted italic">
            {streaming ? "…" : ""}
          </span>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────
// SSE parser. Server emits frames like:
//   data: {"type":"content","text":"…"}\n\n
//   data: {"type":"error","message":"…"}\n\n
//   data: [DONE]\n\n
// Anything unparseable is silently skipped; the parser only forwards
// content chunks to `onContent`.

async function streamSse(
  body: ReadableStream<Uint8Array>,
  onContent: (chunk: string) => void,
  signal: AbortSignal,
) {
  const reader = body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  while (true) {
    if (signal.aborted) throw new DOMException("aborted", "AbortError");
    const { value, done } = await reader.read();
    if (done) return;
    buf += dec.decode(value, { stream: true });
    let idx: number;
    while ((idx = buf.indexOf("\n\n")) !== -1) {
      const frame = buf.slice(0, idx);
      buf = buf.slice(idx + 2);
      for (const line of frame.split("\n")) {
        const m = line.match(/^data:\s?(.*)$/);
        if (!m) continue;
        const raw = m[1];
        if (!raw || raw === "[DONE]") continue;
        let ev: { type?: string; text?: string; message?: string };
        try {
          ev = JSON.parse(raw);
        } catch {
          continue;
        }
        if (ev.type === "content" && typeof ev.text === "string") {
          onContent(ev.text);
        } else if (ev.type === "error" && typeof ev.message === "string") {
          throw new Error(ev.message);
        }
      }
    }
  }
}
