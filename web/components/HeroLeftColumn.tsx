"use client";

// Left column of the homepage hero. Two modes:
//   default — big headline + metrics + the pink pill (HeroPrompt)
//   chat    — the Chat surface (which carries its own pill at the bottom)
// HeroPrompt's submit gets gated by GitHub OAuth; once authed, the text
// is handed up here and we flip into chat mode.

import { useEffect, useState } from "react";
import { HeroPrompt } from "./HeroPrompt";
import { Chat } from "./Chat";
import { HEADLINE } from "@/lib/data";

export function HeroLeftColumn() {
  const [chat, setChat] = useState<
    null | { firstMessage: string; username: string | null }
  >(null);

  // OAuth re-entry: HeroPrompt redirects un-authed users to /api/auth/
  // github/start?next=/?q=<text>. After GitHub bounces back here, pick
  // up `?q=` and (if the session is now valid) drop straight into chat.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q");
    if (!q) return;
    let alive = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (!alive || !j?.ok) return;
        setChat({ firstMessage: q, username: j.login });
        // Strip ?q= so a refresh doesn't replay the same message.
        const u = new URL(window.location.href);
        u.searchParams.delete("q");
        window.history.replaceState(
          {},
          "",
          u.pathname + (u.search || "") + u.hash,
        );
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (chat) {
    return (
      <div className="order-2 flex w-full shrink-0 flex-col items-center pb-6 lg:order-1 lg:items-start lg:pb-0">
        <Chat
          firstMessage={chat.firstMessage}
          username={chat.username}
          onReset={() => setChat(null)}
        />
      </div>
    );
  }

  return (
    <div className="order-2 flex w-full shrink-0 flex-col items-center pb-6 lg:order-1 lg:items-start lg:pb-0">
      <div className="hidden flex-col items-start lg:flex">
        <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
          OpenRocket,
          <br />
          rewritten in Rust
        </h1>
        <p className="mt-7 max-w-xl text-lg text-muted">
          The headless OpenRocket pipeline —{" "}
          <span className="text-ink">.ork</span> loading, Barrowman
          aerodynamics, mass properties, 6-DOF flight — reimplemented and
          diffed against Java OpenRocket and a flown, altimeter-measured
          rocket.
        </p>

        <div className="mt-9 grid w-full max-w-xl grid-cols-2 gap-3">
          {HEADLINE.map((m) => (
            <div key={m.k} className="card px-4 py-4">
              <div className="mono text-[10px] uppercase tracking-wider text-muted">
                {m.k}
              </div>
              <div className="mt-1 text-2xl font-bold text-[var(--accent2)]">
                {m.v}
              </div>
              <div className="mt-0.5 text-[11px] text-muted">{m.s}</div>
            </div>
          ))}
        </div>
      </div>

      <HeroPrompt
        onSend={(text, me) =>
          setChat({
            firstMessage: text.trim(),
            username: me?.login ?? null,
          })
        }
      />
    </div>
  );
}
