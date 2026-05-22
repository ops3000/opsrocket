import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import { SiteNav, SiteFooter } from "@/components/site";
import { Prose } from "@/components/learn/Prose";
import { Eq } from "@/components/learn/widgets/Eq";
import { IspCalc } from "@/components/learn/widgets/IspCalc";
import { Tsiolkovsky } from "@/components/learn/widgets/Tsiolkovsky";
import { MotorCurve } from "@/components/learn/widgets/MotorCurve";
import { OpenInWorkbench } from "@/components/learn/widgets/OpenInWorkbench";
import { DiscussInChat } from "@/components/learn/widgets/DiscussInChat";
import { loadChapters, findChapter } from "@/lib/learn";

export const dynamicParams = false;

export function generateStaticParams() {
  return loadChapters().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ch = findChapter(slug);
  if (!ch) return { title: "Learn — chapter not found" };
  return {
    title: `${ch.title} — OpsRocket Learn`,
    description: ch.description,
  };
}

const components = {
  Eq,
  IspCalc,
  Tsiolkovsky,
  MotorCurve,
  OpenInWorkbench,
};

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ch = findChapter(slug);
  if (!ch) return notFound();

  const all = loadChapters();
  const idx = all.findIndex((c) => c.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  return (
    <main className="flex flex-1 flex-col bg-bg text-ink">
      <SiteNav active="/learn" />
      <div className="flex-1">
        <article className="mx-auto w-full max-w-3xl px-6 py-16">
          <div className="mono mb-2 text-xs tracking-[0.25em] text-[var(--accent2)]">
            LEARN · CHAPTER {String(ch.chapter).padStart(2, "0")}
          </div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-bold sm:text-4xl">{ch.title}</h1>
            <DiscussInChat slug={ch.slug} title={ch.title} />
          </div>
          <p className="mt-3 text-base text-muted">{ch.description}</p>

          <Prose>
            <MDXRemote
              source={ch.body}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm, remarkMath],
                  rehypePlugins: [
                    [rehypeKatex, { throwOnError: false, strict: false }],
                  ],
                },
              }}
            />
          </Prose>

          <nav className="mt-16 flex items-center justify-between border-t border-[var(--line)] pt-6 text-sm">
            <div>
              {prev ? (
                <Link
                  href={`/learn/${prev.slug}`}
                  className="group flex flex-col text-muted hover:text-ink"
                >
                  <span className="mono text-[10px] uppercase tracking-[0.2em]">
                    ← Previous
                  </span>
                  <span className="text-ink group-hover:text-[var(--accent)]">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/learn"
                  className="mono text-xs tracking-[0.2em] text-muted hover:text-ink"
                >
                  ← Back to index
                </Link>
              )}
            </div>
            <div className="text-right">
              {next ? (
                <Link
                  href={`/learn/${next.slug}`}
                  className="group flex flex-col items-end text-muted hover:text-ink"
                >
                  <span className="mono text-[10px] uppercase tracking-[0.2em]">
                    Next →
                  </span>
                  <span className="text-ink group-hover:text-[var(--accent)]">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <Link
                  href="/workspace"
                  className="mono text-xs tracking-[0.2em] text-[var(--accent2)] hover:opacity-80"
                >
                  Open the workbench →
                </Link>
              )}
            </div>
          </nav>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
