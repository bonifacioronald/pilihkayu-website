import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/components/ui/placeholder";
import { metaLine, type ProjectItem } from "@/lib/projects";

/** Grid card: meta line, image, caps title, product tag. Sharp edges, no box. */
export function ProjectCard({ item, href }: { item: ProjectItem; href: string }) {
  return (
    <Link href={href} className="group block">
      <p className="t-meta tabular mb-3">{metaLine([item.location, item.year])}</p>
      <div className="relative overflow-hidden" style={{ aspectRatio: "4 / 5" }}>
        {item.image ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
            className="object-cover transition-transform duration-reveal ease-brand [@media(hover:hover)]:group-hover:scale-[1.03]"
          />
        ) : (
          <Placeholder fill label="Asset pending · 4:5" />
        )}
      </div>
      <h3 className="t-content mt-4 !text-[1.375rem] lg:!text-[1.5rem]">
        <span className="underline decoration-transparent decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-ui ease-brand [@media(hover:hover)]:group-hover:decoration-[var(--rule)]">
          {item.title}
        </span>
      </h3>
      <p className="t-label mt-2">{item.product}</p>
    </Link>
  );
}
