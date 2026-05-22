import { useEffect, useState } from "react";
import { applyTheme, readTheme, writeTheme } from "../lib/theme";

// Small floating button anchored to the bottom-right of the workbench. Click
// flips light ↔ dark; the choice is persisted to localStorage so the chat
// overlay on /workspace (same origin) picks it up via the `storage` event.
export function ThemeToggle() {
  const [theme, setTheme] = useState(readTheme());

  useEffect(() => {
    applyTheme(theme);
    writeTheme(theme);
  }, [theme]);

  // Cross-tab/iframe sync: if the chat overlay or a sibling tab flips the
  // theme, mirror the change here.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "opsrocket_theme") {
        const next = e.newValue === "dark" ? "dark" : "light";
        setTheme(next);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
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
