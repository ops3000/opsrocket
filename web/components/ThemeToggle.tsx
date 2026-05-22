"use client";

import { useEffect, useState } from "react";

// Light/dark theme toggle for the main site. Shares the
// `opsrocket_theme` localStorage key with the workbench (gui/src/lib/theme.ts)
// and the layout.tsx pre-paint script — toggling here flips the workbench
// next time it loads (and vice versa via the `storage` event).
type Theme = "light" | "dark";

function readTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const v = window.localStorage.getItem("opsrocket_theme");
    return v === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  // Cross-tab/iframe sync: if the workbench or another tab flips the
  // theme, mirror the change here without reloading.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "opsrocket_theme") {
        setTheme(e.newValue === "light" ? "light" : "dark");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Apply the current theme to <html>. The layout.tsx pre-paint script
  // does the same on first load; this useEffect handles toggle clicks.
  useEffect(() => {
    if (!mounted) return;
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      window.localStorage.setItem("opsrocket_theme", theme);
    } catch {
      // private mode
    }
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Render a hidden placeholder on the server so the SSR markup matches
  // the first client paint (the script in layout.tsx may have set
  // data-theme to either value).
  if (!mounted) {
    return (
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className={
          "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] " +
          className
        }
        style={{ opacity: 0 }}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={
        "inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg-2)] text-muted transition hover:border-[var(--accent)] hover:text-ink " +
        className
      }
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}

function Sun() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Moon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
