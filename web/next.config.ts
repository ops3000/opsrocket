import type { NextConfig } from "next";

// The embedded workbench is fully serverless: workspace-shim.js monkey-
// patches fetch and services every /api/* call from the in-browser WASM
// core before it ever hits the network. No backend, so no rewrites.
const nextConfig: NextConfig = {};

export default nextConfig;
