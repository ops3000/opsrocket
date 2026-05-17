// Lazy singleton loader for the OpsRocket WASM core. The pkg is served
// statically from /public/opswasm; the dynamic import is bundler-ignored
// so Turbopack/Next doesn't try to process the wasm-bindgen glue.
type OpsWasm = {
  rocket_view: (bytes: Uint8Array) => string;
  load_ork: (bytes: Uint8Array) => string;
};

let promise: Promise<OpsWasm> | null = null;

export function opswasm(): Promise<OpsWasm> {
  if (!promise) {
    promise = (async () => {
      // Non-literal specifier so TS/bundler don't try to resolve the
      // public-served wasm-bindgen glue at build time.
      const spec = "/opswasm/opsrocket_wasm.js";
      const mod = (await import(
        /* webpackIgnore: true */ /* turbopackIgnore: true */ spec
      )) as { default: (p: string) => Promise<unknown> } & OpsWasm;
      await mod.default("/opswasm/opsrocket_wasm_bg.wasm");
      return mod;
    })();
  }
  return promise;
}
