import { cx } from "@/lib/cx";

type Size = "display" | "title" | "content";
const sizeClass: Record<Size, string> = { display: "t-display", title: "t-title", content: "t-content" };

type TitleBlockProps = {
  title: string;
  /** Short label above the block (Inter caps). Not a kicker that repeats the title. */
  label?: string;
  tagline?: string;
  as?: "h1" | "h2" | "h3";
  size?: Size;
  /** Left (catalogue p.3, p.5, p.9) or right (cover, p.8). */
  align?: "left" | "right";
  id?: string;
  /** The paragraph. It starts in an offset column, never under the title's left edge. */
  children?: React.ReactNode;
  /** Optional actions under the paragraph. */
  actions?: React.ReactNode;
  className?: string;
};

/**
 * Big caps title pinned to one side, body in an offset column.
 * 12 columns: title 1–9 (or 4–12 right), body 6–11 (or 7–12).
 */
export function TitleBlock({
  title,
  label,
  tagline,
  as: Tag = "h2",
  size = "title",
  align = "left",
  id,
  children,
  actions,
  className,
}: TitleBlockProps) {
  const right = align === "right";
  return (
    <div className={cx("grid-page gap-y-8 lg:gap-y-12", className)}>
      <div
        className={cx(
          "col-span-4 md:col-span-7 lg:col-span-9",
          right && "md:col-start-2 lg:col-start-4 text-right",
        )}
      >
        {label ? <p className="t-label mb-5 lg:mb-6">{label}</p> : null}
        <Tag id={id} className={sizeClass[size]}>
          {title}
        </Tag>
        {tagline ? <p className="t-tagline mt-4 lg:mt-5">{tagline}</p> : null}
      </div>
      {children || actions ? (
        <div
          className={cx(
            "col-span-4 col-start-1 pl-[12%] md:col-span-5 md:pl-0 lg:col-span-5",
            right ? "md:col-start-4 lg:col-start-7" : "md:col-start-3 lg:col-start-6",
          )}
        >
          {children ? <div className="t-body t-muted max-w-[60ch] space-y-4">{children}</div> : null}
          {actions ? <div className="mt-8 flex flex-wrap items-start gap-x-8 gap-y-5">{actions}</div> : null}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Product title with the terracotta section-tag bar (catalogue p.10, p.11).
 * "edge": the bar runs in from the page edge. "inline": a short bar before the title.
 */
export function TaggedTitle({
  title,
  as: Tag = "h2",
  size = "content",
  variant = "edge",
  id,
  className,
}: {
  title: string;
  as?: "h1" | "h2" | "h3";
  size?: Size;
  variant?: "edge" | "inline";
  id?: string;
  className?: string;
}) {
  return (
    <div className={cx("relative flex items-center gap-4", className)}>
      <span
        aria-hidden="true"
        className={cx(
          "h-3.5 shrink-0 bg-terracotta lg:h-4",
          variant === "edge"
            ? "absolute top-1/2 -translate-y-1/2 right-[calc(100%+12px)] w-[max(8px,calc(var(--outer)-12px))]"
            : "w-10 lg:w-14",
        )}
      />
      <Tag id={id} className={sizeClass[size]}>
        {title}
      </Tag>
    </div>
  );
}
