"use client";

import { useEffect, useRef, useState } from "react";
import { Markdown } from "@/components/Markdown";

// Homepage hero input. Submitting unfolds a chat panel above the pill
// (var(--bg-2), 350px tall, 5px frame around the input); drag the top
// handle down to dismiss. Border is white-ish until focused; send button
// only lights up once there's something to send. AI responses are a
// placeholder — wire up a real endpoint later.

type Me = { login: string; avatar_url: string; starred: boolean } | null;
type Msg = { role: "user" | "assistant"; text: string };

export function HeroPrompt() {
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dragStartRef = useRef<{ y: number; height: number } | null>(null);

  const DEFAULT_PANEL_HEIGHT = 350;
  const MIN_PANEL_HEIGHT = 220;
  const CLOSE_THRESHOLD = 60;

  const maxPanelHeight = () =>
    typeof window === "undefined"
      ? 720
      : Math.max(DEFAULT_PANEL_HEIGHT, window.innerHeight - 140);

  const closeChat = () => {
    // Hide the panel without throwing away the conversation. Re-focusing the
    // input pops it back open via the onFocus handler below.
    setDismissed(true);
    setDragY(0);
    setDragging(false);
    dragStartRef.current = null;
    inputRef.current?.blur();
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
    if (dy >= 0) {
      // Downward: translate the panel; height stays at whatever it was when
      // the drag began (so dragging up-then-down doesn't keep the new size).
      setDragY(dy);
      if (panelHeight !== start.height) setPanelHeight(start.height);
    } else {
      // Upward: grow the panel; no translate.
      setDragY(0);
      const next = Math.min(
        maxPanelHeight(),
        Math.max(MIN_PANEL_HEIGHT, start.height - dy)
      );
      setPanelHeight(next);
    }
  };

  const onHandleUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const start = dragStartRef.current;
    const dy = start === null ? 0 : e.clientY - start.y;
    dragStartRef.current = null;
    setDragging(false);
    if (dy > CLOSE_THRESHOLD) {
      closeChat();
    } else if (dy > 0) {
      setDragY(0);
    }
    // dy <= 0: panel height is already committed via onHandleMove.
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

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, pending, panelHeight]);

  useEffect(() => {
    if (!accountOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAccountOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [accountOpen]);

  const canSend = q.trim().length > 0 && !pending && !loading;
  const chatOpen = (messages.length > 0 || pending) && !dismissed;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // GitHub sign-in gate runs before the empty-input bail-out so an
    // unauthed user can hit Sign in with an empty pill. The server also
    // enforces auth on /api/chat.
    if (!me) {
      window.location.href = `/api/auth/github/start?next=${encodeURIComponent("/")}`;
      return;
    }

    const v = q.trim();
    if (!v) return;

    const history = [
      ...messages.map((m) => ({ role: m.role, content: m.text })),
      { role: "user" as const, content: v },
    ];

    setDismissed(false);
    setMessages((m) => [
      ...m,
      { role: "user", text: v },
      { role: "assistant", text: "" },
    ]);
    setQ("");
    setPending(true);

    const appendToLast = (chunk: string) =>
      setMessages((m) => {
        const copy = m.slice();
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          copy[copy.length - 1] = { ...last, text: last.text + chunk };
        }
        return copy;
      });

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => "");
        throw new Error(errText || `HTTP ${res.status}`);
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        appendToLast(decoder.decode(value, { stream: true }));
      }
      const tail = decoder.decode();
      if (tail) appendToLast(tail);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "request failed";
      appendToLast(`[error: ${msg}]`);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="mt-9 w-full max-w-xl">
      <div className="relative">
        {chatOpen && (
          <div
            className="absolute overflow-hidden rounded-[28px]"
            style={{
              background: "var(--bg-2)",
              border: "1px solid rgba(232,237,247,0.18)",
              boxShadow:
                "0 0 0 3px rgba(255,45,120,0.06), 0 18px 48px rgba(255,45,120,0.12)",
              top: -(panelHeight + 5),
              bottom: -5,
              left: -5,
              right: -5,
              transform: `translateY(${dragY}px)`,
              transition: dragging
                ? "none"
                : "transform 220ms cubic-bezier(0.2, 0.8, 0.2, 1), top 180ms ease",
            }}
          >
            {/* Drag handle — pointer-down + drag past threshold dismisses the
                chat. Click also closes if there's no drag. */}
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
            {/* Messages: fill the panel's height minus the drag handle. */}
            <div
              ref={scrollRef}
              className="space-y-2 overflow-y-auto px-3 pb-3"
              style={{
                height: panelHeight - 20,
                transition: dragging ? "none" : "height 180ms ease",
              }}
            >
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <div key={i} className="flex justify-end">
                    <div
                      className="max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap text-white"
                      style={{ background: "var(--accent)" }}
                    >
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div
                      className={`max-w-[85%] rounded-2xl border border-[var(--line)] px-3 py-2 text-sm ${
                        m.text ? "text-ink" : "text-muted"
                      }`}
                    >
                      {m.text ? (
                        <Markdown>{m.text}</Markdown>
                      ) : (
                        <>
                          Thinking
                          <span className="inline-block animate-pulse">…</span>
                        </>
                      )}
                    </div>
                  </div>
                )
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
              : "1px solid rgba(232,237,247,0.18)",
            boxShadow: focused
              ? "0 0 0 3px rgba(255,45,120,0.08), 0 8px 28px rgba(255,45,120,0.16)"
              : "none",
            transition:
              "border-color 180ms ease, box-shadow 180ms ease",
          }}
        >
          {/* Left badge: ops mark on a light disc, or the user's avatar if signed in */}
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
                    {/* /api/auth/logout is an API endpoint (Set-Cookie +
                        redirect) — use a plain anchor so the cookie clear
                        round-trips through the network, not next/link. */}
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
            aria-label="Open the live workbench"
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
                !me || canSend
                  ? "var(--accent)"
                  : "rgba(232,237,247,0.10)",
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
