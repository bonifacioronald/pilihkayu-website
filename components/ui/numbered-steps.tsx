import { cx } from "@/lib/cx";

export type Step = { title: string; text: string };

/**
 * Steps on one line with small dot markers (catalogue p.12, How to Order).
 * Horizontal from 1024 px; a vertical line on phones and tablets.
 */
export function NumberedSteps({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol
      className={cx(
        "relative grid gap-y-10 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-x-[var(--gutter)]",
        className,
      )}
      style={{ "--steps": steps.length } as React.CSSProperties}
    >
      {/* Connecting line: vertical on small screens, horizontal on desktop. */}
      <span aria-hidden="true" className="absolute top-1 bottom-1 left-[3.5px] w-px bg-[var(--rule)]/50 lg:top-[3.5px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
      {steps.map((step, i) => (
        <li key={step.title} className="relative pl-8 lg:pl-0 lg:pt-8">
          <span aria-hidden="true" className="absolute top-0 left-0 size-2 rounded-full bg-[var(--rule)]" />
          <p className="t-label tabular mb-2">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="t-heading">{step.title}</h3>
          <p className="t-muted mt-2 text-base leading-relaxed">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}
