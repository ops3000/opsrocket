"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Replaces the two hero CTA buttons with a single pill input. Enter or the
// send button opens the live workbench; a typed name is carried along so
// the workbench could preselect it. Colours/logo are OpsRocket's own
// (magenta accent + the masked ops mark), not the reference green.
export function HeroPrompt() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const go = () => {
    const v = q.trim();
    router.push(v ? `/workspace?q=${encodeURIComponent(v)}` : "/workspace");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        go();
      }}
      className="mt-9 flex w-full max-w-xl items-center gap-3 rounded-full px-2 py-2"
      style={{
        background: "var(--bg-2)",
        border: "1px solid var(--accent)",
        boxShadow:
          "0 0 0 3px rgba(255,45,120,0.08), 0 8px 28px rgba(255,45,120,0.16)",
      }}
    >
      {/* Left badge — the pink ops mark on a light disc */}
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white"
        aria-hidden="true"
      >
        <img src="/ops-mark.png" alt="" className="h-6 w-6 object-contain" />
      </span>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Open the live workbench…"
        aria-label="Open the live workbench"
        className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
      />

      {/* Send */}
      <button
        type="submit"
        aria-label="Launch the workbench"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition hover:opacity-90"
        style={{ background: "var(--accent)" }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.4 20.4l17.45-7.48a1 1 0 000-1.84L3.4 3.6a.993.993 0 00-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"
            fill="#fff"
          />
        </svg>
      </button>
    </form>
  );
}
