import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Fixture } from "../../lib/api";

// OpenRocket-style File menu (replaces the bare fixture select). Portalled
// to <body> so the scrollable header can't clip it. Submenus (Open example,
// Export) open on hover as a flyout panel to the right of the menu, exactly
// like OpenRocket's native cascading menus.
const FLY_W = 250; // keep in sync with .fm-fly min-width
export function FileMenu({
  fixtures,
  busy,
  hasDoc,
  canExportCsv,
  onNew,
  onOpenFile,
  onOpenExample,
  onSave,
  onSaveAs,
  onExportCsv,
  onExportPng,
  onExportObj,
  onExportOrk,
  onOpenPreferences,
}: {
  fixtures: Fixture[];
  busy: boolean;
  /** A document is loaded — gates Save / Save as / Export. */
  hasDoc: boolean;
  /** A simulation has been run — flight-data CSV is only valid then. */
  canExportCsv: boolean;
  onNew: () => void;
  onOpenFile: (f: File) => void;
  onOpenExample: (path: string) => void;
  onSave: () => void;
  onSaveAs: (name: string) => void;
  onExportCsv: () => void;
  onExportPng: () => void;
  onExportObj: () => void;
  onExportOrk: () => void;
  onOpenPreferences: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [sub, setSub] = useState<"" | "examples" | "export">("");
  const root = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const fly = useRef<HTMLDivElement>(null);
  const file = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [subPos, setSubPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });

  // Open a flyout next to the menu, anchored to the hovered parent row.
  // Flips to the left edge if it would overflow the viewport.
  const openSub = (
    which: "examples" | "export",
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const m = menu.current?.getBoundingClientRect();
    const b = e.currentTarget.getBoundingClientRect();
    if (!m) return;
    const right = m.right + FLY_W <= window.innerWidth;
    setSubPos({
      // 2px overlap so the pointer crosses into the flyout with no gap.
      left: right ? m.right - 2 : m.left - FLY_W + 2,
      top: Math.max(8, Math.min(b.top - 6, window.innerHeight - 60)),
    });
    setSub(which);
  };

  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const r = root.current?.getBoundingClientRect();
      if (r) setPos({ left: r.left, top: r.bottom + 4 });
    };
    place();
    window.addEventListener("scroll", place, true);
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place, true);
      window.removeEventListener("resize", place);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (
        root.current &&
        !root.current.contains(t) &&
        menu.current &&
        !menu.current.contains(t) &&
        !(fly.current && fly.current.contains(t))
      ) {
        setOpen(false);
        setSub("");
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const close = () => {
    setOpen(false);
    setSub("");
  };
  const act = (fn: () => void) => {
    close();
    fn();
  };

  return (
    <div ref={root} className="uisel filemenu">
      <button
        type="button"
        className="uisel-trigger"
        disabled={busy}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => !busy && setOpen((o) => !o)}
      >
        <span className="uisel-value">File</span>
        <svg
          className={"uisel-chev" + (open ? " up" : "")}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          aria-hidden="true"
        >
          <path
            d="M1 1l5 5 5-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <input
        ref={file}
        type="file"
        accept=".ork"
        style={{ display: "none" }}
        onChange={(e) => {
          const f = e.target.files?.[0];
          e.target.value = "";
          if (f) act(() => onOpenFile(f));
        }}
      />

      {open &&
        pos &&
        createPortal(
          <>
            <div
              ref={menu}
              className="fmenu"
              onWheel={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              style={{ position: "fixed", left: pos.left, top: pos.top }}
            >
              <button
                className="fm-item"
                onMouseEnter={() => setSub("")}
                onClick={() => act(onNew)}
              >
                New
              </button>
              <button
                className="fm-item"
                onMouseEnter={() => setSub("")}
                onClick={() => file.current?.click()}
              >
                Open .ork file…
              </button>
              <button
                className={
                  "fm-item fm-parent" + (sub === "examples" ? " on" : "")
                }
                onMouseEnter={(e) => openSub("examples", e)}
                onClick={(e) => openSub("examples", e)}
              >
                Open example
                <span className="fm-arrow">▸</span>
              </button>

              <div className="fm-sep" />

              <button
                className="fm-item"
                disabled={!hasDoc}
                onMouseEnter={() => setSub("")}
                onClick={() => act(onSave)}
              >
                Save
              </button>
              <button
                className="fm-item"
                disabled={!hasDoc}
                onMouseEnter={() => setSub("")}
                onClick={() =>
                  act(() => {
                    const n = window.prompt(
                      "Save as (filename):",
                      "rocket.ork",
                    );
                    if (n) onSaveAs(n.endsWith(".ork") ? n : n + ".ork");
                  })
                }
              >
                Save as…
              </button>

              <div className="fm-sep" />

              <button
                className={
                  "fm-item fm-parent" + (sub === "export" ? " on" : "")
                }
                disabled={!hasDoc}
                onMouseEnter={(e) => hasDoc && openSub("export", e)}
                onClick={(e) => hasDoc && openSub("export", e)}
              >
                Export
                <span className="fm-arrow">▸</span>
              </button>

              <div className="fm-sep" />

              <button
                className="fm-item"
                onMouseEnter={() => setSub("")}
                onClick={() => act(onOpenPreferences)}
              >
                Preferences…
              </button>
            </div>

            {sub && (
              <div
                ref={fly}
                className="fmenu fm-fly"
                onWheel={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseLeave={() => setSub("")}
                style={{
                  position: "fixed",
                  left: subPos.left,
                  top: subPos.top,
                }}
              >
                {sub === "examples" ? (
                  fixtures.length === 0 ? (
                    <div className="fm-empty">no examples</div>
                  ) : (
                    fixtures.map((f) => (
                      <button
                        key={f.path}
                        className="fm-item"
                        onClick={() => act(() => onOpenExample(f.path))}
                      >
                        {f.name}
                      </button>
                    ))
                  )
                ) : (
                  <>
                    <button
                      className="fm-item"
                      onClick={() => act(onExportPng)}
                    >
                      Design image (PNG)
                    </button>
                    <button
                      className="fm-item"
                      onClick={() => act(onExportObj)}
                    >
                      3D model (OBJ)
                    </button>
                    <button
                      className="fm-item"
                      onClick={() => act(onExportOrk)}
                    >
                      OpenRocket file (.ork)
                    </button>
                    <button
                      className="fm-item"
                      disabled={!canExportCsv}
                      title={canExportCsv ? "" : "Run a simulation first"}
                      onClick={() => act(onExportCsv)}
                    >
                      Flight data (CSV)
                    </button>
                  </>
                )}
              </div>
            )}
          </>,
          document.body,
        )}
    </div>
  );
}
