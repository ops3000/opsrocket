/* OpsRocket workbench — serverless shim.
 *
 * Monkey-patches window.fetch so the SPA's /api/* calls are serviced by
 * the OpsRocket core compiled to WASM, in this same tab. No axum server,
 * no stateful single-document backend process. Non-/api requests pass
 * through untouched. Installed synchronously before the app boots.        */
(function () {
  let wasmP = null;
  function wasm() {
    if (!wasmP)
      wasmP = (async () => {
        const m = await import("/opswasm/opsrocket_wasm.js");
        await m.default("/opswasm/opsrocket_wasm_bg.wasm");
        return m;
      })();
    return wasmP;
  }

  const realFetch = window.fetch.bind(window);
  const J = (obj, status = 200) =>
    new Response(typeof obj === "string" ? obj : JSON.stringify(obj), {
      status,
      headers: { "content-type": "application/json" },
    });
  const ERR = (e) =>
    new Response(String((e && e.message) || e), { status: 422 });

  window.fetch = async function (input, init) {
    const url =
      typeof input === "string" ? input : input && input.url ? input.url : "";
    let path;
    try {
      path = new URL(url, location.href).pathname;
    } catch {
      path = "";
    }
    if (!path.startsWith("/api/")) return realFetch(input, init);

    const ep = path.slice(5);
    const method = ((init && init.method) || "GET").toUpperCase();
    let body = {};
    if (init && init.body) {
      try {
        body = JSON.parse(init.body);
      } catch {
        body = {};
      }
    }
    try {
      const w = await wasm();
      switch (ep) {
        case "health":
          return new Response("ok", { status: 200 });
        case "fixtures":
          return J(await (await realFetch("/orks/index.json")).text());
        case "load_ork": {
          // body.b64 = a user-picked local .ork; else fetch the path.
          let bytes;
          if (body.b64) {
            const bin = atob(body.b64);
            bytes = new Uint8Array(bin.length);
            for (let k = 0; k < bin.length; k++)
              bytes[k] = bin.charCodeAt(k);
          } else {
            bytes = new Uint8Array(
              await (await realFetch(body.path)).arrayBuffer(),
            );
          }
          return J(w.session_load(bytes));
        }
        case "new":
          return J(w.session_new());
        case "view":
          return J(w.session_view());
        case "component":
          return J(w.session_patch(JSON.stringify(body)));
        case "component/delete":
          return J(w.session_delete(JSON.stringify(body)));
        case "component/add":
          return J(w.session_add(JSON.stringify(body)));
        case "undo":
          return J(w.session_undo());
        case "redo":
          return J(w.session_redo());
        case "motors":
          return J(w.session_motors());
        case "assign_motor":
          return J(w.session_assign_motor(JSON.stringify(body)));
        case "clear_motor":
          return J(w.session_clear_motor(JSON.stringify(body)));
        case "set_ignition":
          return J(w.session_set_ignition(JSON.stringify(body)));
        case "sim":
          return J(w.session_patch_sim(JSON.stringify(body)));
        case "analysis":
          return J(w.session_analysis(JSON.stringify(body)));
        case "optimize":
          return J(w.session_optimize(JSON.stringify(body)));
        case "simulate":
          return J(w.session_simulate(JSON.stringify(body)));
        case "save": {
          const bytes = w.session_save();
          const blob = new Blob([bytes], { type: "application/zip" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = (body && body.path) || "rocket.ork";
          a.click();
          URL.revokeObjectURL(a.href);
          return J({ saved: a.download });
        }
        case "snapshot": {
          // Same bytes as save(), but returned as base64 instead of
          // triggering a download. Used by the BroadcastChannel bridge
          // so the chat tab can pull the current design as context.
          const bytes = w.session_save();
          let bin = "";
          for (let k = 0; k < bytes.length; k++)
            bin += String.fromCharCode(bytes[k]);
          return J({ ork_b64: btoa(bin) });
        }
        default:
          return new Response("unknown endpoint: " + ep, { status: 404 });
      }
    } catch (e) {
      return ERR(e);
    }
  };
})();
