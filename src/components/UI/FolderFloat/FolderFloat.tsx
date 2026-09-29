"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import "./FolderFloat.css";

export type FolderFloatItem = string | { label: string; value: string };
export type FolderFloatTrigger = "hover" | "click";

export interface FolderFloatProps {
  items?: FolderFloatItem[];
  label?: string;
  sublabel?: string;
  trigger?: FolderFloatTrigger;
  defaultOpen?: boolean;
  autoScrollTrigger?: boolean;
  scrollThreshold?: number;
  closeOnSelect?: boolean;
  onSelect?: (value: string, index: number) => void;
  onOpenChange?: (open: boolean) => void;
  folderColor?: string;
  frontColor?: string;
  paperColor?: string;
  itemColor?: string;
  itemTextColor?: string;
  labelColor?: string;
  width?: number;
  height?: number;
  radius?: number;
  spread?: number;
  lift?: number;
  tilt?: number;
  flapAngle?: number;
  restAngle?: number;
  openDuration?: number;
  stagger?: number;
  bounce?: number;
  className?: string;
}

type Entry = { label: string; value: string };
type Size = { w: number; h: number };

const DEFAULT_ITEMS: FolderFloatItem[] = [
  "Try a warmer palette",
  "Tighten the spacing",
  "Logo feels small",
  "Love the new hero",
];

const PAD = 28;
const CHAR = 6.8;
const GAP = 12;
const ROW = 52;

const jitter = (i: number) => {
  const x = Math.sin(i * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
};

const layout = (
  list: Entry[],
  spread: number,
  lift: number,
  tilt: number,
  sizes: (Size | null)[]
) => {
  const rows: { items: { i: number; pw: number }[]; width: number }[] = [];
  let row: { i: number; pw: number }[] = [];
  let width = 0;

  list.forEach((item, i) => {
    const pw = sizes[i]?.w ?? PAD + item.label.length * CHAR;
    if (row.length && width + GAP + pw > spread * 2) {
      rows.push({ items: row, width });
      row = [];
      width = 0;
    }
    row.push({ i, pw });
    width += (row.length > 1 ? GAP : 0) + pw;
  });

  if (row.length) rows.push({ items: row, width });

  const pos: { x: number; y: number; r: number }[] = [];
  rows.forEach((r, ri) => {
    let x = -r.width / 2;
    const shift = (ri % 2 ? 1 : -1) * Math.min(16, spread * 0.1);
    r.items.forEach(({ i, pw }) => {
      const j = jitter(i);
      pos[i] = {
        x: x + pw / 2 + shift + (j - 0.5) * 6,
        y: -lift - ri * ROW - j * 6,
        r: tilt * (j * 2 - 1),
      };
      x += pw + GAP;
    });
  });

  return pos;
};

export default function FolderFloat({
  items = DEFAULT_ITEMS,
  label = "Design feedback",
  sublabel = "",
  trigger = "hover",
  defaultOpen = false,
  closeOnSelect = true,
  onSelect,
  onOpenChange,
  folderColor = "#18181b",
  frontColor = "#27272a",
  paperColor = "#fafafa",
  itemColor = "#ffffff",
  itemTextColor = "#18181b",
  labelColor = "#fafafa",
  width = 210,
  height = 155,
  radius = 14,
  spread = 190,
  lift = 32,
  tilt = 8,
  flapAngle = 34,
  restAngle = 16,
  openDuration = 520,
  stagger = 45,
  bounce = 0.3,
  className = "",
  autoScrollTrigger = false,
  scrollThreshold = 0.35,
}: FolderFloatProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [popped, setPopped] = useState(-1);
  const [sizes, setSizes] = useState<(Size | null)[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const popTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const list: Entry[] = items.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  );
  const n = list.length;
  const sub = sublabel || `${n} ${n === 1 ? "item" : "items"}`;
  const pos = layout(list, spread, lift, tilt, sizes);

  const labelsKey = list.map((item) => item.label).join("|");
  useLayoutEffect(() => {
    const measure = () => {
      const next = pillRefs.current
        .slice(0, n)
        .map((el) => (el ? { w: el.offsetWidth, h: el.offsetHeight } : null));
      if (next.some((s) => !s)) return;
      setSizes((prev) =>
        prev.length === next.length &&
        prev.every((s, i) => s?.w === next[i]?.w && s?.h === next[i]?.h)
          ? prev
          : next
      );
    };
    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
  }, [n, labelsKey]);

  const set = useCallback(
    (next: boolean) => {
      setOpen((prev) => {
        if (prev === next) return prev;
        onOpenChange?.(next);
        return next;
      });
    },
    [onOpenChange]
  );

  // Auto-erupt on scroll (Option 3: Modern ScrollTrigger Extension)
  useEffect(() => {
    if (!autoScrollTrigger || !rootRef.current) return;
    if (typeof window === "undefined") return;

    // Respect user's accessibility preferences
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          set(true);
        } else {
          // Gently fold back when scrolled away so it can erupt again on revisit
          set(false);
        }
      },
      {
        threshold: scrollThreshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [autoScrollTrigger, scrollThreshold, set]);

  const pick = (item: Entry, i: number) => {
    onSelect?.(item.value, i);
    clearTimeout(popTimer.current);
    setPopped(i);
    popTimer.current = setTimeout(() => setPopped(-1), 320);
    if (closeOnSelect) set(false);
  };

  useEffect(
    () => () => {
      clearTimeout(popTimer.current);
    },
    []
  );

  const hover = trigger === "hover";

  return (
    <div
      ref={rootRef}
      className={`folder-float${className ? ` ${className}` : ""}`}
      data-open={open ? "" : undefined}
      data-trigger={trigger}
      onPointerEnter={hover ? () => set(true) : undefined}
      onPointerLeave={hover && !autoScrollTrigger ? () => set(false) : undefined}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          set(false);
        }
      }}
      style={
        {
          "--ff-w": `${width}px`,
          "--ff-h": `${height}px`,
          "--ff-r": `${radius}px`,
          "--ff-tab": `${radius}px`,
          "--ff-back": folderColor,
          "--ff-front": frontColor,
          "--ff-paper": paperColor,
          "--ff-item": itemColor,
          "--ff-item-ink": itemTextColor,
          "--ff-label": labelColor,
          "--ff-spread": `${spread}px`,
          "--ff-lift": `${lift}px`,
          "--ff-angle": `${flapAngle}deg`,
          "--ff-rest": `${restAngle}deg`,
          "--ff-open": `${openDuration}ms`,
          "--ff-close": `${Math.round(openDuration * 0.6)}ms`,
          "--ff-stagger": `${stagger}ms`,
          "--ff-n": n,
          "--ff-spring": `cubic-bezier(0.34, ${(1 + bounce * 1.9).toFixed(
            2
          )}, 0.64, 1)`,
        } as React.CSSProperties
      }
    >
      <div ref={anchorRef} className="folder-float__items">
        {list.map((item, i) => {
          const p = pos[i] || { x: 0, y: -lift, r: 0 };
          return (
            <button
              key={`${item.value}-${i}`}
              ref={(el) => {
                pillRefs.current[i] = el;
              }}
              type="button"
              className="folder-float__item"
              tabIndex={open ? 0 : -1}
              aria-hidden={!open}
              data-pop={popped === i ? "" : undefined}
              style={
                {
                  "--i": i,
                  "--x": `${p.x.toFixed(1)}px`,
                  "--y": `${p.y.toFixed(1)}px`,
                  "--r": `${p.r.toFixed(2)}deg`,
                } as React.CSSProperties
              }
              onClick={() => pick(item, i)}
            >
              <span className="folder-float__drift">{item.label}</span>
            </button>
          );
        })}
      </div>
      <div className="folder-float__folder">
        <span className="folder-float__back" aria-hidden="true" />
        <span className="folder-float__paper" aria-hidden="true" />
        <span className="folder-float__front" aria-hidden="true">
          <span className="folder-float__label">{label}</span>
          <span className="folder-float__sub">{sub}</span>
        </span>
        <button
          type="button"
          className="folder-float__trigger"
          aria-expanded={open}
          aria-label={`${label}, ${sub}`}
          onClick={() => set(!open)}
        />
      </div>
    </div>
  );
}
