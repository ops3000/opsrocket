// Filesystem-backed catalog for /learn — the "Rocket Propulsion Elements"
// intro chapters. Each MDX file in `web/content/learn/` has YAML
// frontmatter (slug, title, description, chapter number, tags) and a body
// that mixes prose, KaTeX math, and the small set of React widgets in
// components/learn/widgets.
//
// Two consumers read this module:
//   1. The /learn TOC + /learn/[slug] route pages (renderable MDX).
//   2. lib/skills.ts, which adds each chapter to the chat copilot's skill
//      registry as `learn-<slug>` after stripping MDX widget tags.

import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type ChapterMeta = {
  slug: string;
  title: string;
  description: string;
  chapter: number;
  tags: string[];
};

export type Chapter = ChapterMeta & {
  body: string;
  filePath: string;
};

const LEARN_DIR = path.join(process.cwd(), "content", "learn");

let cache: Chapter[] | null = null;

export function loadChapters(): Chapter[] {
  if (cache) return cache;
  try {
    const files = fs
      .readdirSync(LEARN_DIR, { withFileTypes: true })
      .filter((e) => e.isFile() && e.name.endsWith(".mdx"))
      .map((e) => path.join(LEARN_DIR, e.name));

    const out: Chapter[] = [];
    for (const file of files) {
      const text = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(text);
      if (!data.slug || !data.title) continue;
      out.push({
        slug: String(data.slug),
        title: String(data.title),
        description: String(data.description ?? ""),
        chapter: Number(data.chapter ?? 0),
        tags: Array.isArray(data.tags)
          ? data.tags.map((t) => String(t))
          : [],
        body: content.trim(),
        filePath: file,
      });
    }
    cache = out.sort((a, b) => a.chapter - b.chapter);
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}

export function findChapter(slug: string): Chapter | undefined {
  return loadChapters().find((c) => c.slug === slug);
}

// Strip JSX/MDX widget tags so the copilot context sees clean markdown.
// Removes self-closing tags (<Eq label="..." />), opening + closing pairs
// (<Tsiolkovsky>…</Tsiolkovsky>) — keeps any text children between them.
// Conservative: only matches PascalCase tag names so HTML tags like <table>
// stay intact (MDX docs convention is widgets are PascalCase, HTML lowercase).
export function stripMdxWidgets(body: string): string {
  return body
    .replace(/<([A-Z][A-Za-z0-9]*)([^>]*)\/>/g, "")
    .replace(/<([A-Z][A-Za-z0-9]*)([^>]*)>([\s\S]*?)<\/\1>/g, "$3")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
