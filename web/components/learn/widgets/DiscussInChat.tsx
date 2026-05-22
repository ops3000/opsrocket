"use client";

import { useRouter } from "next/navigation";

// "Discuss this chapter in chat" CTA. Stashes the chapter title + slug into
// localStorage so ChatPill can prepend it as a system message on its first
// outbound /api/chat request. Then navigates to /workspace where ChatPill
// lives. The pill auto-applies designs there, and the chapter context will
// be available for the copilot to ground its answers in.

export function DiscussInChat({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  const router = useRouter();

  const onClick = () => {
    try {
      localStorage.setItem(
        "opsrocket_chat_seed",
        JSON.stringify({ slug, title, t: Date.now() }),
      );
    } catch {
      // private mode — proceed without seed, chat still works
    }
    router.push("/workspace");
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="mono rounded-full border border-[var(--accent2)] bg-[rgba(41,230,212,0.08)] px-4 py-2 text-xs tracking-[0.2em] text-ink transition hover:bg-[rgba(41,230,212,0.16)]"
    >
      Discuss this in chat →
    </button>
  );
}
