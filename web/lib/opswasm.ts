// Server-side OpsRocket engine: the same Rust core as the browser
// workbench, built with `wasm-pack --target web` and initialized in-process
// from the .wasm bytes read off the function filesystem (path we control +
// traced via next.config outputFileTracingIncludes). Stateless; used only
// by the MCP route. The separate browser build lives in /public/opswasm.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import * as engine from "./opswasm-web/opsrocket_wasm.js";

export type RocketInput = {
  ork_b64?: string;
  example?: string;
  ork_url?: string;
};

const MAX_ORK_BYTES = 4 * 1024 * 1024; // 4 MB anti-abuse cap

let inited = false;
function ensureInit() {
  if (inited) return;
  const candidates = [
    join(process.cwd(), "lib/opswasm-web/opsrocket_wasm_bg.wasm"),
    join(process.cwd(), "web/lib/opswasm-web/opsrocket_wasm_bg.wasm"),
    join(__dirname, "opswasm-web/opsrocket_wasm_bg.wasm"),
    join(__dirname, "../lib/opswasm-web/opsrocket_wasm_bg.wasm"),
  ];
  let bytes: Buffer | null = null;
  for (const p of candidates) {
    try {
      bytes = readFileSync(p);
      break;
    } catch {
      /* try next */
    }
  }
  if (!bytes)
    throw new Error(
      `opsrocket wasm not found (tried: ${candidates.join(", ")})`,
    );
  (engine as { initSync: (m: Uint8Array) => unknown }).initSync(
    new Uint8Array(bytes),
  );
  inited = true;
}

type Ops = {
  mcp_capabilities(): string;
  mcp_inspect(b: Uint8Array): string;
  mcp_stability(b: Uint8Array): string;
  mcp_analysis(b: Uint8Array, mach: number): string;
  mcp_simulate(b: Uint8Array, sim?: string): string;
  mcp_mass_breakdown(b: Uint8Array): string;
  mcp_optimize(b: Uint8Array, paramsJson: string): string;
  mcp_parity(b: Uint8Array, index?: number): string;
  mcp_extract_or_reference(b: Uint8Array, index?: number): string;
  mcp_new_document(): Uint8Array;
  mcp_list_motors(): string;
  mcp_list_materials(): string;
  mcp_list_presets(filterJson: string): string;
  mcp_sim_warnings(b: Uint8Array, simName?: string): string;
  mcp_component_mass(b: Uint8Array, compId: string): string;
  mcp_edit_apply(b: Uint8Array, opsJson: string): Uint8Array;
};

// Lazy proxy: every call ensures the wasm is initialized first, so route
// handlers can use `ops.mcp_*` synchronously without an init dance.
export const ops = new Proxy({} as Ops, {
  get(_t, prop: string) {
    ensureInit();
    const fn = (engine as Record<string, unknown>)[prop];
    if (typeof fn !== "function")
      throw new Error(`opsrocket engine has no export "${prop}"`);
    return (fn as (...args: unknown[]) => unknown).bind(engine);
  },
});

let manifest: { name: string; path: string }[] | null = null;

function selfOrigin(req?: Request): string {
  const host =
    req?.headers.get("x-forwarded-host") ?? req?.headers.get("host");
  const proto = req?.headers.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;
  return process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://ops.sg";
}

export async function listExamples(
  req?: Request,
): Promise<{ name: string; path: string }[]> {
  if (!manifest) {
    const r = await fetch(`${selfOrigin(req)}/orks/index.json`);
    if (!r.ok) throw new Error(`example manifest unavailable (${r.status})`);
    manifest = (await r.json()) as { name: string; path: string }[];
  }
  return manifest;
}

/** Resolve a RocketInput to raw .ork bytes (stateless). */
export async function resolveRocket(
  req: Request | undefined,
  input: RocketInput,
): Promise<Uint8Array> {
  if (input.ork_b64) {
    const buf = Buffer.from(input.ork_b64, "base64");
    if (buf.length === 0) throw new Error("ork_b64 decoded to 0 bytes");
    if (buf.length > MAX_ORK_BYTES)
      throw new Error(`.ork exceeds ${MAX_ORK_BYTES} byte cap`);
    return new Uint8Array(buf);
  }
  if (input.example) {
    const list = await listExamples(req);
    const want = input.example.toLowerCase().replace(/\.ork$/, "");
    const hit =
      list.find(
        (e) => e.name.toLowerCase().replace(/\.ork$/, "") === want,
      ) ?? list.find((e) => e.name.toLowerCase().includes(want));
    if (!hit) throw new Error(`no example matching "${input.example}"`);
    const r = await fetch(`${selfOrigin(req)}${hit.path}`);
    if (!r.ok) throw new Error(`failed to load example (${r.status})`);
    return new Uint8Array(await r.arrayBuffer());
  }
  if (input.ork_url) {
    let u: URL;
    try {
      u = new URL(input.ork_url);
    } catch {
      throw new Error("ork_url is not a valid URL");
    }
    if (u.protocol !== "https:") throw new Error("ork_url must be https");
    const r = await fetch(u, { redirect: "follow" });
    if (!r.ok) throw new Error(`ork_url fetch failed (${r.status})`);
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > MAX_ORK_BYTES)
      throw new Error(`.ork exceeds ${MAX_ORK_BYTES} byte cap`);
    return new Uint8Array(buf);
  }
  throw new Error(
    "provide one of: ork_b64 (base64 .ork), example (bundled name), ork_url (https)",
  );
}
