import Link from "next/link";
import { HeroSideviews } from "@/components/HeroSideviews";
import { HeroPrompt } from "@/components/HeroPrompt";
import { MobileMenu } from "@/components/MobileMenu";
import { HEADLINE } from "@/lib/data";

// Home is now just the blueprint hero. PARITY / VALIDATION / RENDER /
// ARCHITECTURE each live on their own route; no footer here.
export default function Home() {
  return (
    <main className="flex-1 bg-bg text-ink">
      <header className="relative isolate flex h-[100svh] flex-col overflow-hidden lg:h-auto lg:min-h-[100svh]">
        <div className="bp-grid absolute inset-0" />

        <nav className="relative z-20 mx-auto flex w-full max-w-7xl shrink-0 items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <img
              src="/ops.png"
              alt="OpsRocket"
              className="ops-logo h-9 w-9"
            />
            <span className="text-lg font-bold tracking-tight text-ink">
              OpsRocket
            </span>
          </div>
          <div className="mono hidden gap-7 text-xs text-muted sm:flex">
            <Link href="/parity" className="hover:text-ink">
              PARITY
            </Link>
            <Link href="/validation" className="hover:text-ink">
              VALIDATION
            </Link>
            <Link href="/render" className="hover:text-ink">
              RENDER
            </Link>
            <Link href="/architecture" className="hover:text-ink">
              ARCHITECTURE
            </Link>
          </div>
          <Link
            href="/workspace"
            className="hidden rounded-full border border-[var(--accent)] bg-[rgba(255,45,120,0.12)] px-4 py-2 text-sm font-semibold text-ink transition hover:bg-[rgba(255,45,120,0.25)] sm:inline-flex"
          >
            Open Workbench →
          </Link>
          <MobileMenu />
        </nav>

        <div className="relative z-10 mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col px-6 lg:grid lg:flex-none lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:pt-[10vh]">
          {/* Rockets — middle band. Centres when it fits, scrolls (no
              clip) when it doesn't, so the input is never truncated. */}
          <div className="order-1 flex min-h-0 flex-1 overflow-y-auto lg:order-2 lg:block lg:flex-none lg:overflow-visible">
            <div className="m-auto w-full max-w-md py-6 lg:m-0 lg:max-w-none lg:py-0">
              <HeroSideviews />
            </div>
          </div>

          {/* Text (desktop only) + prompt (bottom band on portrait). */}
          <div className="order-2 flex w-full shrink-0 flex-col items-center pb-6 lg:order-1 lg:items-start lg:pb-0">
            <div className="hidden flex-col items-start lg:flex">
              <h1 className="max-w-2xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl">
                OpenRocket,
                <br />
                rewritten in Rust
              </h1>
              <p className="mt-7 max-w-xl text-lg text-muted">
                The headless OpenRocket pipeline —{" "}
                <span className="text-ink">.ork</span> loading, Barrowman
                aerodynamics, mass properties, 6-DOF flight — reimplemented and
                diffed against Java OpenRocket and a flown, altimeter-measured
                rocket.
              </p>

              <div className="mt-9 grid w-full max-w-xl grid-cols-2 gap-3">
                {HEADLINE.map((m) => (
                  <div key={m.k} className="card px-4 py-4">
                    <div className="mono text-[10px] uppercase tracking-wider text-muted">
                      {m.k}
                    </div>
                    <div className="mt-1 text-2xl font-bold text-[var(--accent2)]">
                      {m.v}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">{m.s}</div>
                  </div>
                ))}
              </div>
            </div>

            <HeroPrompt />
          </div>
        </div>
      </header>
    </main>
  );
}
