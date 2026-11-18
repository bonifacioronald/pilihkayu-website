import Image from "next/image";
import products from "@/content/products.json";

/** Wood species as a compact row of tall swatches (6 across on desktop, 3 × 2 on phones). */
export function SpeciesRow() {
  return (
    <ul className="grid grid-cols-3 gap-x-3 gap-y-6 lg:grid-cols-6 lg:gap-x-3">
      {products.species.map((s) => (
        <li key={s.name} className="group">
          <div className="relative aspect-[1/1.7] overflow-hidden lg:aspect-[1/2.6]">
            <Image
              src={s.image}
              alt={`${s.name} wood grain`}
              fill
              sizes="(min-width:1024px) 8vw, 30vw"
              className="object-cover transition-transform duration-[1200ms] ease-brand [@media(hover:hover)]:group-hover:scale-[1.06]"
            />
          </div>
          <p className="mt-3 text-[0.9375rem] font-semibold">{s.name}</p>
        </li>
      ))}
    </ul>
  );
}
