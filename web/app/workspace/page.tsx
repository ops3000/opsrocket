import type { Metadata } from "next";
import { ChatPill } from "@/components/ChatPill";

export const metadata: Metadata = {
  title: "OpsRocket — Workbench",
  description: "The live OpsRocket design workbench (React + Three.js).",
};

// The Vite + React + Three.js workbench lives under /public/workspace-app
// (built from gui/, synced via gui/scripts/sync-to-web.sh). Its /api/*
// calls are handled in-tab by /public/workspace-shim.js → WASM. A
// ChatPill floats at the bottom-centre; iframe still gets all the
// pointer events (the wrapper layer is pointer-events:none, the pill
// itself re-enables them).
//
// Query parameters threaded into the iframe so chat deeplinks can preload
// a design:
//   /workspace?ork_b64=<b64>   — load this design
//   /workspace?example=<name>  — load a bundled example
//   /workspace?path=<url>      — load a fetchable .ork
type SearchParams = Record<string, string | string[] | undefined>;

export default async function WorkspacePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const qs = new URLSearchParams();
  for (const k of ["ork_b64", "example", "path"]) {
    const v = sp[k];
    if (typeof v === "string") qs.set(k, v);
  }
  const tail = qs.toString();
  const src = tail
    ? `/workspace-app/index.html?${tail}`
    : "/workspace-app/index.html";
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-bg">
      <iframe
        src={src}
        title="OpsRocket Workbench"
        className="absolute inset-0 h-full w-full border-0"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
        <div className="pointer-events-auto w-full max-w-xl">
          <ChatPill />
        </div>
      </div>
    </div>
  );
}
