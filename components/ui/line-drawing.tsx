"use client";

import { useEffect, useRef } from "react";
import { cx } from "@/lib/cx";

const SHAPES = "path, line, polyline, polygon, circle, ellipse, rect";

type LineDrawingProps = {
  viewBox: string;
  /** Accessible description. Omit for purely decorative drawings. */
  title?: string;
  /** Stroke width in viewBox units. */
  stroke?: number;
  /** "in-view": draws in once when it enters the screen. "none": static. */
  draw?: "in-view" | "none";
  /** Delay between strokes, ms. */
  stagger?: number;
  className?: string;
  /** SVG shapes. Every shape is a stroke unless it has data-fill. Drop exported SVG contents straight in. */
  children: React.ReactNode;
};

/**
 * Line illustration in the brand colour for its ground (gold on dark, neutral on paper).
 * Server markup shows the finished drawing; the draw-in only arms after hydration,
 * and never with reduced motion.
 */
export function LineDrawing({
  viewBox,
  title,
  stroke = 1,
  draw = "in-view",
  stagger = 30,
  className,
  children,
}: LineDrawingProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg || draw === "none") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const shapes = Array.from(svg.querySelectorAll<SVGGeometryElement>(SHAPES)).filter(
      (el) => !el.hasAttribute("data-fill"),
    );
    shapes.forEach((el, i) => {
      el.setAttribute("pathLength", "1");
      el.style.setProperty("--draw-delay", `${Math.min(i * stagger, 900)}ms`);
    });
    svg.setAttribute("data-armed", "");

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          // Next frame, so the armed (hidden) state paints before the transition starts.
          requestAnimationFrame(() => requestAnimationFrame(() => svg.setAttribute("data-drawn", "")));
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [draw, stagger]);

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      className={cx("line-art block h-auto w-full", className)}
      style={{ "--stroke": stroke } as React.CSSProperties}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}
