import Image from "next/image";
import { cx } from "@/lib/cx";
import { Placeholder } from "./placeholder";

export type Species = { name: string; image?: string | null };

/**
 * Tall vertical swatches with the name under each (catalogue p.12). Wood stays in full colour.
 * Phones scroll the row sideways; desktop shows all in one row.
 */
export function SpeciesSwatches({ species, className }: { species: Species[]; className?: string }) {
  return (
    <ul
      className={cx(
        "-mx-[var(--outer)] flex snap-x snap-mandatory scroll-px-[var(--outer)] gap-3 overflow-x-auto px-[var(--outer)] pb-2 [scrollbar-width:none] lg:mx-0 lg:grid lg:snap-none lg:gap-[var(--gutter)] lg:overflow-visible lg:px-0",
        className,
      )}
      style={{ gridTemplateColumns: `repeat(${species.length}, minmax(0, 1fr))` }}
    >
      {species.map((s) => (
        <li key={s.name} className="w-[38%] shrink-0 snap-start md:w-[22%] lg:w-auto">
          <div className="relative" style={{ aspectRatio: "1 / 3" }}>
            {s.image ? (
              <Image src={s.image} alt={`${s.name} grain`} fill sizes="(min-width:1024px) 12vw, 40vw" className="object-cover" />
            ) : (
              <Placeholder fill label="Pending" />
            )}
          </div>
          <p className="mt-3 text-base font-semibold">{s.name}</p>
        </li>
      ))}
    </ul>
  );
}
