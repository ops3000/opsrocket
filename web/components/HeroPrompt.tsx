"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// The pink pill input on the homepage hero. To use it you sign in with
// GitHub (and we star the repo for you on first sign-in — see /api/auth).
// Returning signed-in visitors submit straight to the workbench with no
// extra round-trip.

type Me = { login: string; avatar_url: string; starred: boolean } | null;

export function HeroPrompt() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [me, setMe] = useState<Me>(null);
  const [loading, setLoading] = useState(true);

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

  const target = () => {
    const v = q.trim();
    return v ? `/workspace?q=${encodeURIComponent(v)}` : "/workspace";
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (me) {
      router.push(target());
    } else {
      // Bounce through GitHub OAuth; the callback redirects back to `next`.
      window.location.href = `/api/auth/github/start?next=${encodeURIComponent(target())}`;
    }
  };

  return (
    <div className="mt-9 w-full max-w-xl">
      <form
        onSubmit={onSubmit}
        className="flex w-full items-center gap-3 rounded-full px-2 py-2"
        style={{
          background: "var(--bg-2)",
          border: "1px solid var(--accent)",
          boxShadow:
            "0 0 0 3px rgba(255,45,120,0.08), 0 8px 28px rgba(255,45,120,0.16)",
        }}
      >
        {/* Left badge: ops mark on a light disc, or the user's avatar if signed in */}
        {me ? (
          <span
            className="flex h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-[var(--line)]"
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
          </span>
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
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={
            me
              ? `Open the live workbench, ${me.login}…`
              : "Open the live workbench…"
          }
          aria-label="Open the live workbench"
          className="min-w-0 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />

        <button
          type="submit"
          aria-label={me ? "Launch the workbench" : "Sign in with GitHub"}
          className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full px-3 text-sm font-semibold text-white transition hover:opacity-90"
          style={{ background: "var(--accent)" }}
          disabled={loading}
        >
          {me ? (
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
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56 0-.28-.01-1.01-.02-1.99-3.2.7-3.87-1.54-3.87-1.54-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11 11 0 015.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.35.78 1.05.78 2.12 0 1.53-.01 2.76-.01 3.13 0 .31.21.67.8.56C20.21 21.39 23.5 17.08 23.5 12 23.5 5.65 18.35.5 12 .5z" />
              </svg>
              <span className="hidden sm:inline">Sign in</span>
            </>
          )}
        </button>
      </form>

      {/* Disclosure: transparent about the auto-star. */}
      <p className="mono mt-2 px-2 text-[10px] uppercase tracking-wider text-muted">
        {me ? (
          <>
            signed in as <span className="text-ink">{me.login}</span>
            {me.starred && (
              <>
                {" "}
                · <span className="text-[var(--accent2)]">⭐ thanks!</span>
              </>
            )}
            {" · "}
            {/* /api/auth/logout is an API endpoint (Set-Cookie + redirect), not a page — <Link> would client-navigate and miss the cookie clear. */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/auth/logout" className="underline hover:text-ink">
              sign out
            </a>
          </>
        ) : (
          <>
            sign in with GitHub to open the workbench · also{" "}
            <span className="text-ink">⭐ stars ops3000/opsrocket</span> for
            you (one-time, permission: starring only)
          </>
        )}
      </p>
    </div>
  );
}
