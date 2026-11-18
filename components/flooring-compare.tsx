import products from "@/content/products.json";
import { FlooringCard } from "@/components/flooring-card";

/** The three flooring finishes side by side, so they can be compared at a glance. */
export function FlooringCompare({ hrefBase = "/flooring", headingLevel = "h3" }: { hrefBase?: string; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="-mx-[var(--outer)] flex snap-x snap-mandatory scroll-px-[var(--outer)] gap-[var(--gutter)] overflow-x-auto px-[var(--outer)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
      {products.flooring.finishes.map((f) => (
        <li key={f.id} className="w-[78%] shrink-0 snap-start md:w-auto">
          <FlooringCard
            id={f.id}
            name={f.name}
            finish={f.finish}
            still={f.poster}
            video={f.video}
            href={`${hrefBase}#${f.id}`}
            headingLevel={headingLevel}
            specs={[
              { label: "Construction", value: f.construction },
              { label: "Width", value: f.dimensions[1].replace("Width: ", "") },
              { label: "Finishing", value: f.finishing },
              ...(f.priceFrom ? [{ label: "From", value: f.priceFrom as string }] : []),
            ]}
          />
        </li>
      ))}
    </ul>
  );
}
