import type { NextConfig } from "next";

// The embedded workbench is fully serverless: workspace-shim.js monkey-
// patches fetch and services every /api/* call from the in-browser WASM
// core before it ever hits the network. No backend, so no rewrites.
const nextConfig: NextConfig = {
  // The MCP route and the chat route both load the OpsRocket wasm engine
  // (and chat reads skill markdown) off the function filesystem at
  // runtime — make sure the file tracer ships them. Keys are picomatch
  // globs against the route path; brackets in dynamic segments are
  // escaped per the Next.js docs (node_modules/next/dist/docs/.../output.md).
  outputFileTracingIncludes: {
    "/\\[transport\\]": ["./lib/opswasm-web/**", "./skills/**"],
    "/api/chat": ["./lib/opswasm-web/**", "./skills/**"],
  },
  async headers() {
    return [
      {
        // The demo .ork files behind the homepage hero are static assets
        // that only change on a deploy. Default Next static serving tags
        // them `max-age=0, must-revalidate`, so every visit pays a
        // blocking revalidation round-trip on ~500 KB — brutal on a
        // high-latency link. Long-cache them instead.
        source: "/orks/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
