"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

// Markdown + KaTeX renderer for assistant messages in the chat surface.
// Streamed deltas mean we re-render on every chunk — react-markdown handles
// that cheaply, and rehype-katex with throwOnError:false silently ignores
// partial `$...` fragments until the closing delimiter arrives.

type Props = { children: string };

// Convert LaTeX-native delimiters (\[ \] and \( \)) to the $$ / $ pairs
// that remark-math understands. Skips fenced code blocks so a stray `\(`
// inside, say, a Rust snippet stays intact.
function normalizeMath(text: string): string {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts
    .map((part, i) =>
      i % 2 === 1
        ? part
        : part
            .replace(
              /\\\[([\s\S]+?)\\\]/g,
              (_, body) => `\n\n$$\n${body.trim()}\n$$\n\n`
            )
            .replace(
              /\\\(([\s\S]+?)\\\)/g,
              (_, body) => `$${body.trim()}$`
            )
    )
    .join("");
}

export function Markdown({ children }: Props) {
  const src = normalizeMath(children);
  return (
    <div className="prose-chat">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[[rehypeKatex, { throwOnError: false, strict: false }]]}
        components={{
          p: ({ children }) => (
            <p className="mb-2 leading-relaxed last:mb-0">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="mb-2 list-disc space-y-1 pl-5 last:mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-2 list-decimal space-y-1 pl-5 last:mb-0">
              {children}
            </ol>
          ),
          h1: ({ children }) => (
            <h3 className="mt-1 mb-2 text-base font-semibold text-ink">
              {children}
            </h3>
          ),
          h2: ({ children }) => (
            <h3 className="mt-1 mb-2 text-base font-semibold text-ink">
              {children}
            </h3>
          ),
          h3: ({ children }) => (
            <h4 className="mt-1 mb-2 text-sm font-semibold text-ink">
              {children}
            </h4>
          ),
          h4: ({ children }) => (
            <h4 className="mt-1 mb-2 text-sm font-semibold text-ink">
              {children}
            </h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-[var(--line)] pl-3 text-muted">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent2)] underline hover:opacity-80"
            >
              {children}
            </a>
          ),
          code: ({ className, children, ...rest }) => {
            const isBlock = /language-/.test(className ?? "");
            if (isBlock) {
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded bg-[var(--panel)] px-1 py-0.5 font-mono text-[12px] text-[var(--accent2)]">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-2 overflow-x-auto rounded-md bg-[var(--panel)] p-2 font-mono text-[12px] leading-snug text-ink">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-2 overflow-x-auto">
              <table className="w-full border-collapse text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-[var(--line)] px-2 py-1 text-left font-semibold text-ink">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-[var(--line)] px-2 py-1 text-muted">
              {children}
            </td>
          ),
          hr: () => <hr className="my-3 border-[var(--line)]" />,
        }}
      >
        {src}
      </ReactMarkdown>
    </div>
  );
}
