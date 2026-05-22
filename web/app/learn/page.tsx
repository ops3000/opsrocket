import Link from "next/link";
import { SiteNav, SiteFooter } from "@/components/site";
import { ChatPill } from "@/components/ChatPill";
import { loadChapters } from "@/lib/learn";

export const metadata = {
  title: "Learn — rocket propulsion, from C6 to staging",
  description:
    "Hobbyist-friendly intro to thrust, specific impulse, the rocket equation, nozzles, stability, staging and recovery — with live calculators and one-click open in the OpsRocket workbench.",
};

export default function LearnIndexPage() {
  const chapters = loadChapters();
  return (
    <main className="relative flex flex-1 flex-col bg-bg text-ink">
      <SiteNav active="/learn" />
      <div className="flex-1">
        <section className="mx-auto w-full max-w-3xl px-6 pt-20 pb-40">
          <div className="mono mb-2 text-xs tracking-[0.25em] text-[var(--accent2)]">
            LEARN · ROCKET PROPULSION ELEMENTS, ABRIDGED
          </div>
          <h1 className="text-3xl font-bold sm:text-4xl">
            Eight short chapters on why rockets do what they do.
          </h1>
          <p className="mt-4 text-base text-muted">
            Aimed at model-rocket hobbyists and first-year aerospace
            students. Every chapter has live math you can poke at, a real
            number to anchor it (Estes C6, Saturn V, a typical L1 build),
            and a one-click jump into the OpsRocket workbench to see the
            idea in flight. Pinch from Sutton &amp; Biblarz where useful;
            stay readable everywhere else.
          </p>

          <ol className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {chapters.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/learn/${c.slug}`}
                  className="group flex items-start gap-5 py-5 transition hover:bg-[var(--panel)]"
                >
                  <div className="mono w-10 shrink-0 pt-1 text-right text-xs text-muted">
                    {String(c.chapter).padStart(2, "0")}
                  </div>
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-ink group-hover:text-[var(--accent)]">
                      {c.title}
                    </div>
                    <div className="mt-1 text-sm text-muted">
                      {c.description}
                    </div>
                  </div>
                  <div className="mono shrink-0 pt-2 text-xs text-muted opacity-0 transition group-hover:opacity-100">
                    →
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          <p className="mt-10 text-sm text-muted">
            Reading order is the obvious one, but each chapter stands on
            its own. The chat copilot sits at the bottom of every chapter
            and on the <Link className="text-[var(--accent2)] underline" href="/workspace">workbench</Link> —
            ask it "tell me about specific impulse" and it'll pull the
            chapter as context.
          </p>
        </section>
      </div>
      <SiteFooter />
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-4">
        <div className="pointer-events-auto w-full max-w-xl">
          <ChatPill />
        </div>
      </div>
    </main>
  );
}
