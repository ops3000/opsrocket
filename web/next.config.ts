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
    "/\\[transport\\]": [
      "./lib/opswasm-web/**",
      "./skills/**",
      "./content/learn/**",
    ],
    "/api/chat": [
      "./lib/opswasm-web/**",
      "./skills/**",
      "./content/learn/**",
    ],
  },
  async headers() {
    // CSP: 'wasm-unsafe-eval' is non-negotiable because /workspace compiles
    // the OpsRocket WebAssembly engine in the browser. 'unsafe-inline' on
    // script-src is the pragmatic call for a marketing/docs site — Next.js
    // ships an inline bootstrap script per page, and switching to per-request
    // nonces would force every static route dynamic. Same reasoning on
    // style-src for styled-jsx / Tailwind inline styles. connect-src is
    // 'self'-only because every external API call (GitHub, DeepSeek, etc.)
    // is brokered server-side; nothing in the browser talks off-origin.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "worker-src 'self' blob:",
      // 'self' (not 'none') because /workspace iframes /workspace-app/* —
      // the actual Vite+Three.js workbench is a same-origin embedded doc.
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders = [
      { key: "Content-Security-Policy", value: csp },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
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
