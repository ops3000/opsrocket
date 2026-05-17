import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpsRocket — Workbench",
  description: "The live OpsRocket design workbench (React + Three.js).",
};

// The existing Vite + React + Three.js workbench is built under
// /public/workspace-app and embedded full-bleed. Its fetch('/api/...')
// calls are proxied to the opsrocket-web axum server by next.config.
export default function WorkspacePage() {
  return (
    <iframe
      src="/workspace-app/index.html"
      title="OpsRocket Workbench"
      className="h-screen w-screen border-0"
      style={{ display: "block" }}
    />
  );
}
