import { cx } from "@/lib/cx";

export type SpecItem = {
  label: string;
  /** A string, or several lines. null shows "To be confirmed" rather than an invented value. */
  value: string | string[] | null;
};

/** Label and value pairs in columns, like a drawing schedule (catalogue p.6, p.10). */
export function SpecBlock({
  items,
  columns = 2,
  className,
}: {
  items: SpecItem[];
  columns?: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <dl
      className={cx(
        "grid gap-x-[var(--gutter)] gap-y-7 tabular",
        columns >= 2 && "sm:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <div key={item.label} className="min-w-0">
          <dt className="text-base font-semibold">{item.label}</dt>
          <dd className="t-muted mt-1 text-base leading-relaxed">
            {item.value === null ? (
              "To be confirmed"
            ) : Array.isArray(item.value) ? (
              item.value.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
