"use client";

import { ChatPill } from "@/components/ChatPill";

// Homepage hero placement of the shared ChatPill. Hands the pill the
// hero-specific outer sizing (max width + top margin); the rest of the
// chat behaviour lives in ChatPill itself.

export function HeroPrompt() {
  return (
    <div className="mt-9 w-full max-w-xl">
      <ChatPill />
    </div>
  );
}
