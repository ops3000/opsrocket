"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Mobile-only hamburger that replaces the inline nav links + the "Open
// Workbench" CTA on small screens. Desktop keeps the original layout.

const ITEMS: [label: string, href: string][] = [
  ["PARITY", "/parity"],
  ["VALIDATION", "/validation"],
  ["RENDER", "/render"],
  ["ARCHITECTURE", "/architecture"],
];

export function MobileMenu({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition"
        style={{
          background: "var(--bg-2)",
          border: "1px solid rgba(232,237,247,0.18)",
        }}
      >
        {open ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            className="fixed inset-0 z-30 cursor-default bg-transparent"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute right-0 top-12 z-40 w-56 rounded-2xl p-2"
            style={{
              background: "var(--bg-2)",
              border: "1px solid rgba(232,237,247,0.18)",
              boxShadow: "0 18px 48px rgba(0,0,0,0.45)",
            }}
          >
            <nav className="flex flex-col">
              {ITEMS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`mono rounded-xl px-3 py-2 text-xs ${
                    active === href
                      ? "text-[var(--accent2)]"
                      : "text-muted hover:bg-[var(--panel)] hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <div
                className="mt-1 pt-2"
                style={{ borderTop: "1px solid var(--line)" }}
              >
                <Link
                  href="/workspace"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl border border-[var(--accent)] bg-[rgba(255,45,120,0.12)] px-3 py-2 text-center text-sm font-semibold text-ink hover:bg-[rgba(255,45,120,0.25)]"
                >
                  Open Workbench →
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
