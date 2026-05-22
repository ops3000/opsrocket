"use client";

import { useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";
import { useWorkbench } from "@/lib/workbench-channel";

// Self-contained chat pill — input + agentic chat panel that unfolds
// upward on submit. Reused on the hero (/) and the workbench (/workspace).
// Streams the ndjson /api/chat protocol; tool calls render as ToolChips
// interleaved with text deltas in the assistant bubble. Workbench design
// state lives in lib/workbench-channel (BroadcastChannel), so context
// piping works the same in both surfaces.
//
// The caller is responsible for sizing/positioning the outer width — this
// component just fills `w-full` of its container.

type Me = { login: string; avatar_url: string; starred: boolean } | null;
type ToolEvent = {
  id: string;
  name: string;
  args?: Record<string, unknown>;
  result?: string;
  error?: string;
  ork_b64?: string;
  autoApplied?: boolean;
  status: "running" | "done" | "error";
};
type AssistantPart =
  | { type: "text"; text: string }
  | { type: "tool"; event: ToolEvent };
type Msg =
  | { role: "user"; text: string }
  | { role: "assistant"; parts: AssistantPart[] };

function ToolChip({
  event,
  onApply,
}: {
  event: ToolEvent;
  onApply?: (b64: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);
  const icon =
    event.status === "running" ? "⟳" : event.status === "error" ? "✕" : "✓";
  const color =
    event.status === "running"
      ? "var(--accent2)"
      : event.status === "error"
        ? "var(--accent)"
        : "var(--good)";
  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mono inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--panel)] px-2 py-0.5 text-[11px] text-ink transition hover:border-[var(--muted)]"
        title={event.error || event.result || event.name}
      >
        <span
          className={
            event.status === "running" ? "inline-block animate-spin" : ""
          }
          style={{ color }}
        >
          {icon}
        </span>
        <span>{event.name}</span>
      </button>
      {open && (
        <div className="mono rounded-md border border-[var(--line)] bg-[var(--bg-2)] p-2 text-[10px] leading-snug text-muted">
          {event.args && Object.keys(event.args).length > 0 && (
            <div>
              <div className="text-ink">args</div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-all">
                {JSON.stringify(event.args, null, 2)}
              </pre>
            </div>
          )}
          {(event.result || event.error) && (
            <div className="mt-1">
              <div className="text-ink">
                {event.error ? "error" : "result"}
              </div>
              <pre className="max-h-32 overflow-y-auto whitespace-pre-wrap break-all">
                {event.error || event.result}
              </pre>
            </div>
          )}
          {event.ork_b64 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              <a
                href={`/workspace?ork_b64=${encodeURIComponent(event.ork_b64)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-[var(--accent)] bg-[rgba(255,45,120,0.12)] px-2 py-0.5 text-[11px] font-semibold text-ink hover:bg-[rgba(255,45,120,0.25)]"
              >
                Open in Workbench →
              </a>
              {onApply &&
                (event.autoApplied ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--good)] bg-[rgba(56,224,138,0.10)] px-2 py-0.5 text-[11px] font-semibold text-ink"
                    title="This change was pushed into the open Workbench tab automatically."
                  >
                    ✓ Applied
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onApply(event.ork_b64!);
                      setApplied(true);
                      window.setTimeout(() => setApplied(false), 1500);
                    }}
                    className="inline-flex items-center gap-1 rounded-full border border-[var(--accent2)] bg-[rgba(41,230,212,0.10)] px-2 py-0.5 text-[11px] font-semibold text-ink hover:bg-[rgba(41,230,212,0.20)]"
                    title="Push this design into any open Workbench tab"
                  >
                    {applied ? "✓ Sent" : "Apply to Workbench"}
                  </button>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ChatPill({
  autoApplyDesigns = false,
}: {
  /**
   * When true, any tool result carrying an `ork_b64` is broadcast onto the
   * workbench channel immediately — no "Apply to Workbench" click needed.
   * The /workspace overlay sets this so chat edits flow straight into the
   * open workbench tab.
   */
  autoApplyDesigns?: boolean;
} = {}) {
  const [q, setQ] = useState("");
  const [me, setMe] = useState<Me>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [pending, setPending] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [panelHeight, setPanelHeight] = useState(350);
  // If the user clicked "Discuss this in chat" from a /learn chapter, the
  // chapter slug + title were stashed in localStorage. We read them once
  // on mount and inject a hidden leading message on the next /api/chat
  // call so the copilot has the chapter as context.
  const [chapterSeed, setChapterSeed] = useState<
    { slug: string; title: string } | null
  >(null);
  const { state: workbenchState, loadDesign, requestSimulate } = useWorkbench();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ y: number; height: number } | null>(null);
  // Only auto-scroll to bottom while the user is anchored at the bottom.
  // If they have scrolled up to read older content, leave their viewport
  // alone instead of yanking them back on every streamed text delta.
  const anchoredRef = useRef(true);

  const DEFAULT_PANEL_HEIGHT = 350;
  const MIN_PANEL_HEIGHT = 280;
  const CLOSE_THRESHOLD = 60;

  const maxPanelHeight = () =>
    typeof window === "undefined"
      ? 720
      : Math.max(DEFAULT_PANEL_HEIGHT, window.innerHeight - 140);

  const closeChat = () => {
    setDismissed(true);
    setDragY(0);
    setDragging(false);
    dragStartRef.current = null;
    inputRef.current?.blur();
  };

  const newChat = () => {
    setMessages([]);
    setPending(false);
    setQ("");
    setDismissed(false);
    setDragY(0);
    setDragging(false);
    setPanelHeight(DEFAULT_PANEL_HEIGHT);
    dragStartRef.current = null;
    anchoredRef.current = true;
    setAccountOpen(false);
  };

  const onHandleDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragStartRef.current = { y: e.clientY, height: panelHeight };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onHandleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    if (!start) return;
    const dy = e.clientY - start.y;
    if (dy < 0) {
      // Upward: grow the panel up to viewport-ish; no translate.
      setDragY(0);
      setPanelHeight(Math.min(maxPanelHeight(), start.height - dy));
    } else if (dy > 0) {
      // Downward: first shrink any extra height down to MIN, then once the
      // floor is hit, translate the panel (peel) so continuing the gesture
      // past CLOSE_THRESHOLD dismisses it.
      const targetHeight = Math.max(MIN_PANEL_HEIGHT, start.height - dy);
      const consumed = start.height - targetHeight;
      const overshoot = dy - consumed;
      setPanelHeight(targetHeight);
      setDragY(Math.max(0, overshoot));
    } else {
      setDragY(0);
      setPanelHeight(start.height);
    }
  };

  const onHandleUp = () => {
    dragStartRef.current = null;
    setDragging(false);
    // Dismiss only if the peel (translateY) past the shrunken floor went
    // past the threshold. Gross dy isn't the right signal — shrinking a
    // tall panel back toward MIN doesn't count as a close intent.
    if (dragY > CLOSE_THRESHOLD) {
      closeChat();
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive) return;
        if (j?.ok)
          setMe({
            login: j.login,
            avatar_url: j.avatar_url,
            starred: j.starred,
          });
      })
      .catch(() => {})
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  // One-shot pickup of a /learn chapter seed (set by DiscussInChat). We
  // consume + clear it immediately so a refresh doesn't re-inject the same
  // context forever.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("opsrocket_chat_seed");
      if (!raw) return;
      const parsed = JSON.parse(raw) as { slug?: string; title?: string };
      window.localStorage.removeItem("opsrocket_chat_seed");
      if (parsed.slug && parsed.title) {
        setChapterSeed({ slug: parsed.slug, title: parsed.title });
      }
    } catch {
      // ignore malformed payload
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (anchoredRef.current) el.scrollTop = el.scrollHeight;
  }, [messages, pending, panelHeight]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const distFromBottom = el.scrollHeight - (el.scrollTop + el.clientHeight);
    anchoredRef.current = distFromBottom < 80;
  };

  useEffect(() => {
    if (!accountOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [accountOpen]);

  const canSend = q.trim().length > 0 && !pending && !loading;
  const willDismiss = dragging && dragY > CLOSE_THRESHOLD;
  const chatOpen = (messages.length > 0 || pending) && !dismissed;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!me) {
      window.location.href = `/api/auth/github/start?next=${encodeURIComponent(
        window.location.pathname + window.location.search,
      )}`;
      return;
    }

    const v = q.trim();
    if (!v) return;

    const history = [
      // If the user just came from a /learn chapter, prepend a hidden
      // context message so the model knows what they were reading. This
      // is sent only on the first turn after seed pickup, then unset.
      ...(chapterSeed
        ? [
            {
              role: "user" as const,
              content:
                `(Context from /learn: I just finished reading the chapter "${chapterSeed.title}". ` +
                `If it's relevant, load the \`learn-${chapterSeed.slug}\` skill for accurate details. ` +
                `Don't acknowledge this preface; just answer my next question with that grounding in mind.)`,
            },
          ]
        : []),
      ...messages.map((m) => ({
        role: m.role,
        content:
          m.role === "user"
            ? m.text
            : m.parts
                .filter((p): p is { type: "text"; text: string } =>
                  p.type === "text",
                )
                .map((p) => p.text)
                .join(""),
      })),
      { role: "user" as const, content: v },
    ];
    // Consume the seed so the next turn doesn't re-inject it.
    if (chapterSeed) setChapterSeed(null);

    setDismissed(false);
    // Sending a new turn = user wants to see the response, so re-anchor
    // to the bottom regardless of where they scrolled in the prior turn.
    anchoredRef.current = true;
    setMessages((m) => [
      ...m,
      { role: "user", text: v },
      { role: "assistant", parts: [] },
    ]);
    setQ("");
    setPending(true);

    const mutateLastAssistant = (
      mut: (parts: AssistantPart[]) => AssistantPart[],
    ) =>
      setMessages((arr) => {
        const copy = arr.slice();
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = { ...last, parts: mut(last.parts) };
        }
        return copy;
      });

    const handleEvent = (ev: {
      t?: string;
      s?: string;
      d?: string;
      i?: string;
      n?: string;
      a?: Record<string, unknown>;
      r?: string;
      e?: string;
    }) => {
      if (ev.t === "text" && typeof ev.d === "string") {
        const d = ev.d;
        mutateLastAssistant((parts) => {
          const last = parts[parts.length - 1];
          if (last && last.type === "text") {
            const updated = [...parts];
            updated[updated.length - 1] = {
              type: "text",
              text: last.text + d,
            };
            return updated;
          }
          return [...parts, { type: "text", text: d }];
        });
      } else if (ev.t === "tool" && ev.s === "start" && ev.i && ev.n) {
        const tool: ToolEvent = {
          id: ev.i,
          name: ev.n,
          args: ev.a,
          status: "running",
        };
        mutateLastAssistant((parts) => [
          ...parts,
          { type: "tool", event: tool },
        ]);
      } else if (ev.t === "tool" && ev.s === "end" && ev.i) {
        const id = ev.i;
        const r = ev.r;
        const e = ev.e;
        const name = ev.n;
        const ork_b64 = (ev as { ork_b64?: string }).ork_b64;
        let autoApplied = false;
        if (autoApplyDesigns && ork_b64) {
          autoApplied = loadDesign(ork_b64);
        }
        // After a chat-side simulate succeeds, ask the open workbench to
        // run its own simulate so the FLIGHT chart updates.
        if (autoApplyDesigns && !e && name === "simulate") {
          requestSimulate();
        }
        mutateLastAssistant((parts) =>
          parts.map((p) =>
            p.type === "tool" && p.event.id === id
              ? {
                  type: "tool",
                  event: {
                    ...p.event,
                    status: e ? "error" : "done",
                    result: r,
                    error: e,
                    ork_b64,
                    autoApplied,
                  },
                }
              : p,
          ),
        );
      }
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          ...(workbenchState
            ? {
                context: {
                  ork_b64: workbenchState.ork_b64,
                  name: workbenchState.name,
                  total_length_m: workbenchState.total_length_m,
                  components: workbenchState.components,
                },
              }
            : {}),
        }),
      });
      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `HTTP ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let lineBuf = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        lineBuf += decoder.decode(value, { stream: true });
        const lines = lineBuf.split("\n");
        lineBuf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            handleEvent(JSON.parse(line));
          } catch {
            /* skip malformed line */
          }
        }
      }
      lineBuf += decoder.decode();
      if (lineBuf.trim()) {
        try {
          handleEvent(JSON.parse(lineBuf));
        } catch {
          /* ignore tail garbage */
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "request failed";
      mutateLastAssistant((parts) => [
        ...parts,
        { type: "text", text: `\n\n[error: ${msg}]` },
      ]);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        {chatOpen && (
          <div
            className="absolute overflow-hidden rounded-[28px]"
            style={{
              background: "var(--bg-2)",
              border: willDismiss
                ? "1px solid var(--chat-pill-border-active)"
                : "1px solid var(--chat-pill-border)",
              boxShadow: willDismiss
                ? "var(--chat-pill-shadow-active)"
                : "var(--chat-pill-shadow)",
              top: -(panelHeight + 5),
              bottom: -5,
              left: -5,
              right: -5,
              transform: `translateY(${dragY}px)`,
              transition: dragging
                ? "border-color 60ms ease-out, box-shadow 60ms ease-out"
                : "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), top 180ms ease, border-color 180ms ease, box-shadow 180ms ease",
            }}
          >
            {/* Dismiss-zone overlay: frosted hint that releasing here will
                close the chat. Pointer-events disabled so the in-flight
                drag keeps going. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              style={{
                background: "var(--chat-dismiss-overlay)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                opacity: willDismiss ? 1 : 0,
                transition: willDismiss
                  ? "opacity 60ms ease-out"
                  : "opacity 140ms ease",
              }}
            >
              <div className="flex flex-col items-center gap-2 text-ink">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                  <polyline points="6 15 12 21 18 15" />
                </svg>
                <span className="mono text-[11px] uppercase tracking-[0.2em]">
                  Release to dismiss
                </span>
              </div>
            </div>
            <div
              role="button"
              aria-label="Close chat (drag down or click)"
              className="flex cursor-grab justify-center pt-2 pb-1 active:cursor-grabbing"
              style={{ touchAction: "none" }}
              onPointerDown={onHandleDown}
              onPointerMove={onHandleMove}
              onPointerUp={onHandleUp}
              onPointerCancel={onHandleUp}
            >
              <div
                className="h-1 w-12 rounded-full"
                style={{ background: "var(--muted)", opacity: 0.55 }}
              />
            </div>
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="space-y-2 overflow-y-auto overscroll-contain px-3 pb-3"
              style={{
                height: panelHeight - 20,
                transition: dragging ? "none" : "height 180ms ease",
              }}
            >
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div
                      className="max-w-[80%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div
                      className={`max-w-[85%] rounded-2xl border border-[var(--line)] px-3 py-2 text-sm ${
                        m.parts.length > 0 ? "text-ink" : "text-muted"
                      }`}
                    >
                      {m.parts.length === 0 ? (
                        <>
                          Thinking
                          <span className="inline-block animate-pulse">…</span>
                        </>
                      ) : (
                        m.parts.map((p, pi) =>
                          p.type === "text" ? (
                            <div key={pi}>
                              <Markdown>{p.text}</Markdown>
                            </div>
                          ) : (
                            <div key={pi} className="my-1.5 flex">
                              <ToolChip
                                event={p.event}
                                onApply={
                                  p.event.ork_b64 ? loadDesign : undefined
                                }
                              />
                            </div>
                          ),
                        )
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="relative flex w-full items-center gap-3 rounded-full px-2 py-2"
          style={{
            background: "var(--bg-2)",
            border: focused
              ? "1px solid var(--accent)"
              : "1px solid var(--chat-input-border)",
            boxShadow: focused ? "var(--chat-input-shadow)" : "none",
            transition: "border-color 180ms ease, box-shadow 180ms ease",
          }}
        >
          {me ? (
            <div className="relative">
              <button
                type="button"
                aria-label={`Account menu for ${me.login}`}
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
                className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--line)] transition hover:ring-[var(--accent)]"
                title={`Signed in as ${me.login}${me.starred ? " · ⭐ thanks!" : ""}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={me.avatar_url}
                  alt={me.login}
                  width={36}
                  height={36}
                  className="h-9 w-9 object-cover"
                />
              </button>
              {accountOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close account menu"
                    tabIndex={-1}
                    className="fixed inset-0 z-30 cursor-default bg-transparent"
                    onClick={() => setAccountOpen(false)}
                  />
                  <div
                    role="menu"
                    className="absolute bottom-full left-0 z-40 mb-3 w-44 overflow-hidden rounded-2xl p-1"
                    style={{
                      background: "var(--bg-2)",
                      border: "1px solid rgba(232,237,247,0.18)",
                      boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
                    }}
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={newChat}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-ink hover:bg-[var(--panel)]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                      <span>New chat</span>
                    </button>
                    {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                    <a
                      href="/api/auth/logout"
                      role="menuitem"
                      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink hover:bg-[var(--panel)]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                      <span>Log out</span>
                    </a>
                  </div>
                </>
              )}
            </div>
          ) : (
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ops-mark.png"
                alt=""
                className="h-6 w-6 object-contain"
              />
            </span>
          )}

          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onFocus={() => {
              setFocused(true);
              setDismissed(false);
            }}
            onBlur={() => setFocused(false)}
            placeholder={
              chatOpen
                ? "Reply…"
                : me
                  ? `Ask the OpsRocket co-pilot, ${me.login}…`
                  : "Sign in with GitHub to chat…"
            }
            aria-label="Chat with the OpsRocket co-pilot"
            className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />

          <button
            type="submit"
            aria-label={me ? "Send" : "Sign in with GitHub"}
            className={`flex h-9 shrink-0 items-center justify-center rounded-full transition hover:opacity-90 disabled:cursor-not-allowed ${
              me ? "w-9" : "gap-2 px-3"
            }`}
            style={{
              background:
                !me || canSend ? "var(--accent)" : "rgba(232,237,247,0.10)",
              color: !me || canSend ? "#fff" : "var(--muted)",
              transition: "background-color 180ms ease, color 180ms ease",
            }}
            disabled={loading || (me ? pending || !canSend : false)}
          >
            {me ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
              </svg>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.01-.02-1.99-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
                </svg>
                <span className="text-sm font-semibold">Sign in</span>
              </>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
