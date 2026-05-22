import type { ReactNode } from "react";

// Typography wrapper for /learn chapter bodies. Tailwind's typography
// plugin isn't installed, so the styles here are explicit and theme-token
// driven (var(--ink), var(--accent), var(--line)) — same shape as the
// chat .prose-chat selector but tuned for long-form reading.

export function Prose({ children }: { children: ReactNode }) {
  return <div className="learn-prose">{children}</div>;
}
