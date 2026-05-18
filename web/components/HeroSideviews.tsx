"use client";

import { useEffect, useRef, useState } from "react";
import { RocketView2D } from "./RocketView2D";
import type { RocketView } from "./rv-types";
import { opswasm } from "@/lib/opswasm-load";

const FILES = [
  {
    ork: "/orks/a_simple.ork",
    name: "A simple model rocket",
    spec: "42.5 cm · C6-5 · trapezoidal fins",
  },
  {
    ork: "/orks/two_stage.ork",
    name: "Two-stage high-power rocket",
    spec: "multi-stage · booster + sustainer",
  },
  {
    ork: "/orks/pods.ork",
    name: "Pods — powered w/ recovery deployment",
    spec: "80.6 cm · pods · 2× A10-3, B6-4",
  },
];

function Plate({
  rv,
  name,
  spec,
}: {
  rv: RocketView;
  name: string;
  spec: string;
}) {
  const [roll, setRoll] = useState(0);
  // Auto-roll continuously; hold still only while the pointer is over the
  // plate (or the user is dragging it). Drag-to-roll still works.
  const hover = useRef(false);
  const last = useRef(0);
  useEffect(() => {
    const SPEED = 22; // deg / sec
    let raf = 0;
    const tick = (t: number) => {
      if (!last.current) last.current = t;
      const dt = (t - last.current) / 1000;
      last.current = t;
      if (!hover.current) setRoll((r) => r + SPEED * dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const hold = () => {
    hover.current = true;
  };
  const release = () => {
    hover.current = false;
    last.current = 0; // avoid a dt jump after a long pause
  };
  return (
    <div
      className="card px-5 py-4"
      onMouseEnter={hold}
      onMouseLeave={release}
      onPointerDown={hold}
      onPointerUp={release}
    >
      <div className="mono mb-1 flex items-center justify-between text-[10px] uppercase tracking-wider text-muted">
        <span className="text-[var(--accent2)]">{name}</span>
        <span>
          {Math.round(((roll % 360) + 360) % 360)}° · hover to hold · drag ↕
        </span>
      </div>
      <div className="h-[120px] w-full">
        <RocketView2D
          rv={rv}
          rollDeg={roll}
          onRollDelta={(d) => setRoll((r) => r + d)}
        />
      </div>
      <div className="mono mt-1 text-[10px] text-muted">{spec}</div>
    </div>
  );
}

export function HeroSideviews() {
  // One slot per file; null until that file's view is ready. Each slot
  // fills independently so plates appear as soon as their own data
  // arrives instead of waiting for all three (matters a lot on a slow /
  // high-latency link).
  const [items, setItems] = useState<(RocketView | null)[]>(() =>
    FILES.map(() => null),
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      let w: Awaited<ReturnType<typeof opswasm>>;
      try {
        w = await opswasm();
      } catch (e) {
        console.error("opswasm init failed", e);
        return;
      }
      // Fetch all .ork files concurrently; resolve each slot the moment
      // its file is parsed (progressive, not all-or-nothing).
      FILES.forEach(async (f, i) => {
        try {
          const buf = await (await fetch(f.ork)).arrayBuffer();
          const rv = JSON.parse(
            w.rocket_view(new Uint8Array(buf)),
          ) as RocketView;
          if (!alive) return;
          setItems((prev) => {
            const next = prev.slice();
            next[i] = rv;
            return next;
          });
        } catch (e) {
          console.error("opswasm hero load failed", f.ork, e);
        }
      });
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {FILES.map((f, i) =>
        items[i] ? (
          <Plate key={f.ork} rv={items[i]!} name={f.name} spec={f.spec} />
        ) : (
          <div key={f.ork} className="card px-5 py-4">
            <div className="mono mb-1 text-[10px] uppercase tracking-wider text-[var(--accent2)]">
              {f.name}
            </div>
            <div className="mono flex h-[120px] items-center justify-center text-[11px] text-muted">
              rendering via opsrocket-wasm…
            </div>
          </div>
        ),
      )}
    </div>
  );
}
