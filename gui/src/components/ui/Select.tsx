import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Fully self-drawn dropdown — no native <select>, so the popup list is
// themeable (the native option list cannot be styled by CSS). Keyboard:
// ↑/↓ move, Enter/Space select, Esc/blur close. Click-outside closes.

export interface SelectOption {
  value: string;
  label: string;
}

export function Select({
  options,
  value,
  onChange,
  className = "",
  title,
  disabled = false,
  placeholder = "—",
}: {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  title?: string;
  disabled?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const cur = options.find((o) => o.value === value);

  // The list is portalled to <body> so an ancestor with overflow (e.g. the
  // horizontally-scrollable workbench header) can't clip it. Position it
  // under the trigger in viewport coords, and keep it there if the page /
  // header scrolls or the window resizes.
  const [pos, setPos] = useState<{
    left: number;
    top: number;
    width: number;
  } | null>(null);
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const r = root.current?.getBoundingClientRect();
      if (r) setPos({ left: r.left, top: r.bottom + 4, width: r.width });
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
        list.current &&
        !list.current.contains(t)
      )
        setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (open)
      setActive(Math.max(0, options.findIndex((o) => o.value === value)));
  }, [open, options, value]);

  const pick = (i: number) => {
    const o = options[i];
    if (o) onChange(o.value);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") return setOpen(false);
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      return setOpen(true);
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(options.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(active);
    }
  };

  return (
    <div
      ref={root}
      className={"uisel" + (disabled ? " disabled" : "") + (className ? " " + className : "")}
      title={title}
    >
      <button
        type="button"
        className="uisel-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className="uisel-value">
          {cur ? cur.label : placeholder}
        </span>
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
      {open &&
        pos &&
        createPortal(
          <ul
            ref={list}
            className="uisel-list"
            role="listbox"
            // Portalled to <body>, but React replays events through the
            // component tree — without this, scrolling the list bubbles
            // up to the header's wheel→horizontal-scroll handler.
            onWheel={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              left: pos.left,
              top: pos.top,
              minWidth: pos.width,
            }}
          >
            {options.map((o, i) => (
              <li
                key={o.value}
                role="option"
                aria-selected={o.value === value}
                className={
                  "uisel-opt" +
                  (o.value === value ? " sel" : "") +
                  (i === active ? " active" : "")
                }
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(i);
                }}
              >
                {o.label}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
}
