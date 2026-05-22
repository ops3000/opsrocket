// File-system backed skill registry. Each entry under `web/skills/` is a
// markdown file with YAML-ish frontmatter (single-line `key: value`) and
// a markdown body. We also pull in the /learn chapters (content/learn/*.mdx)
// as synthetic `learn-<slug>` skills so the copilot can quote them.
// Loaded once at module init (server-side, Node only) and cached.
// The chat exposes:
//   1. SYSTEM_PROMPT lists every skill's name + description (cheap routing
//      cue for the model)
//   2. `load_skill(name)` MCP-style tool returns the body on demand
// Same surface is shared by /mcp so Claude Code clients see the tools too.
import fs from "fs";
import path from "path";
import { loadChapters, stripMdxWidgets } from "./learn";

export type SkillDef = {
  name: string;
  description: string;
  body: string;
};

const SKILLS_DIR = path.join(process.cwd(), "skills");

function parseFrontmatter(text: string): {
  meta: Record<string, string>;
  body: string;
} {
  const m = text.match(/^---\s*\n([\s\S]+?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([\w-]+)\s*:\s*(.+?)\s*$/);
    if (kv) meta[kv[1]] = kv[2];
  }
  return { meta, body: m[2].trim() };
}

let cache: SkillDef[] | null = null;

export function loadSkills(): SkillDef[] {
  if (cache) return cache;
  try {
    const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
    const out: SkillDef[] = [];
    for (const e of entries) {
      let filePath: string | null = null;
      if (e.isFile() && e.name.endsWith(".md")) {
        filePath = path.join(SKILLS_DIR, e.name);
      } else if (e.isDirectory()) {
        const candidate = path.join(SKILLS_DIR, e.name, "SKILL.md");
        if (fs.existsSync(candidate)) filePath = candidate;
      }
      if (!filePath) continue;
      const text = fs.readFileSync(filePath, "utf-8");
      const { meta, body } = parseFrontmatter(text);
      if (!meta.name || !meta.description) continue;
      out.push({
        name: meta.name,
        description: meta.description,
        body,
      });
    }
    // Also ingest /learn chapters as `learn-<slug>` skills with MDX widget
    // tags stripped to plain markdown.
    for (const ch of loadChapters()) {
      out.push({
        name: `learn-${ch.slug}`,
        description: `Learn chapter ${ch.chapter}: ${ch.title} — ${ch.description}`,
        body: `# ${ch.title}\n\n${stripMdxWidgets(ch.body)}`,
      });
    }
    cache = out.sort((a, b) => a.name.localeCompare(b.name));
    return cache;
  } catch {
    cache = [];
    return cache;
  }
}

export function findSkill(name: string): SkillDef | undefined {
  return loadSkills().find((s) => s.name === name);
}
