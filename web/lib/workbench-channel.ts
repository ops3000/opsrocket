"use client";

// Cross-tab bridge between the chat (HeroPrompt) and the workbench iframe.
// The workbench (gui/) broadcasts its current design on load/edit; the chat
// listens and can either thread that design into AI tool calls (3b) or
// push new designs back into an open workbench tab (3c).
//
// Wire: same-origin BroadcastChannel("opsrocket-workbench").
// Messages (all { type, ... }):
//   workbench → *
//     { type: "state",  state: WorkbenchState | null }   — current open design (or null on close)
//     { type: "ready" }                                  — handshake on boot
//   * → workbench
//     { type: "ping" }                                   — request a state replay
//     { type: "load_design", b64: string }               — push this design into the open workbench

import { useEffect, useRef, useState } from "react";

export type WorkbenchState = {
  name: string;
  ork_b64: string;
  total_length_m?: number;
  components?: number;
};

const CHANNEL = "opsrocket-workbench";

export function useWorkbench(): {
  state: WorkbenchState | null;
  loadDesign: (b64: string) => boolean; // returns false if no channel available
} {
  const [state, setState] = useState<WorkbenchState | null>(null);
  const chanRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    if (typeof BroadcastChannel === "undefined") return;
    const chan = new BroadcastChannel(CHANNEL);
    chanRef.current = chan;

    const onMsg = (e: MessageEvent) => {
      const m = e.data;
      if (!m || typeof m !== "object") return;
      if (m.type === "state") {
        setState(
          m.state && typeof m.state === "object"
            ? (m.state as WorkbenchState)
            : null,
        );
      } else if (m.type === "ready") {
        // Workbench just booted — politely ask for state.
        chan.postMessage({ type: "ping" });
      }
    };
    chan.addEventListener("message", onMsg);

    // On mount, see if any open workbench tab already has state.
    chan.postMessage({ type: "ping" });

    return () => {
      chan.removeEventListener("message", onMsg);
      chan.close();
      chanRef.current = null;
    };
  }, []);

  const loadDesign = (b64: string): boolean => {
    const chan = chanRef.current;
    if (!chan) return false;
    chan.postMessage({ type: "load_design", b64 });
    return true;
  };

  return { state, loadDesign };
}
