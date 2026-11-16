import { cx } from "@/lib/cx";

/**
 * Architectural dimension line with end ticks and a centred label, e.g. "L: <1800 mm".
 * Horizontal by default; vertical runs the full height of its parent.
 */
export function DimensionLine({
  label,
  orientation = "horizontal",
  className,
}: {
  label: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}) {
  if (orientation === "vertical") {
    return (
      <div className={cx("relative flex h-full w-8 items-center justify-center text-[var(--line)]", className)}>
        <span aria-hidden="true" className="absolute top-0 bottom-0 left-1/2 w-px bg-current" />
        <span aria-hidden="true" className="absolute top-0 left-1/2 h-px w-3 -translate-x-1/2 bg-current" />
        <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-px w-3 -translate-x-1/2 bg-current" />
        <span className="tabular relative bg-[var(--bg)] py-1 text-[0.8125rem] text-[var(--muted)] [writing-mode:vertical-rl]">
          {label}
        </span>
      </div>
    );
  }
  return (
    <div className={cx("relative flex h-8 w-full items-center justify-center text-[var(--line)]", className)}>
      <span aria-hidden="true" className="absolute top-1/2 right-0 left-0 h-px bg-current" />
      <span aria-hidden="true" className="absolute top-1/2 left-0 h-3 w-px -translate-y-1/2 bg-current" />
      <span aria-hidden="true" className="absolute top-1/2 right-0 h-3 w-px -translate-y-1/2 bg-current" />
      <span className="tabular relative bg-[var(--bg)] px-2 text-[0.8125rem] text-[var(--muted)]">{label}</span>
    </div>
  );
}
