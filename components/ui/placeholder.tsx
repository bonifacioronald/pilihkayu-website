import { cx } from "@/lib/cx";

type PlaceholderProps = {
  /** e.g. "Asset pending · 16:9". */
  label?: string;
  /** CSS aspect ratio, e.g. "16 / 9". Ignored with fill. */
  ratio?: string;
  fill?: boolean;
  className?: string;
};

/**
 * Neutral block that stands in for a photo, render or clip until the asset arrives.
 * It never imitates real content: a flat ground, fine diagonal hatching and a plain label.
 */
export function Placeholder({ label = "Asset pending", ratio, fill = false, className }: PlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={fill ? undefined : { aspectRatio: ratio }}
      className={cx(
        "overflow-hidden bg-[var(--placeholder-bg)]",
        fill ? "absolute inset-0" : "relative w-full",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, color-mix(in srgb, var(--muted) 22%, transparent) 0 1px, transparent 1px 14px)",
        }}
      />
      <span className="absolute bottom-3 left-3 text-[0.6875rem] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">
        {label}
      </span>
    </div>
  );
}
