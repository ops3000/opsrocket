// Light/dark theme handling. The preference is stored in localStorage under
// "opsrocket_theme" so the chat overlay on /workspace (same origin) reads
// the same value via the `storage` event. Default = light.

export type Theme = "light" | "dark";

const KEY = "opsrocket_theme";

export function readTheme(): Theme {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function writeTheme(t: Theme): void {
  try {
    window.localStorage.setItem(KEY, t);
  } catch {
    // ignore (private mode etc.)
  }
}

export function applyTheme(t: Theme): void {
  document.documentElement.setAttribute("data-theme", t);
}

// Set the data-theme attribute on <html> before React boots so there's no
// flash of light-on-dark (or vice versa) during the first paint.
export function bootstrapTheme(): void {
  applyTheme(readTheme());
}
