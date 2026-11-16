import { AnnotatedImage, type Annotation } from "@/components/ui/annotated-image";
import { ImageFrame } from "@/components/ui/image-frame";
import { SpecBlock } from "@/components/ui/spec-block";
import { TaggedTitle } from "@/components/ui/title-block";
import { metaLine, type CaseStudy, type CaseStudySection } from "@/lib/projects";

/** Large caps title with a meta column (location, year, status, scope, species). */
export function CaseStudyHeader({ study, as: Tag = "h1" }: { study: CaseStudy; as?: "h1" | "h2" }) {
  const meta = [
    { label: "Location", value: study.location },
    { label: "Year", value: study.year ? String(study.year) : null },
    { label: "Status", value: study.status },
    { label: "Scope", value: study.scope.join(", ") },
    { label: "Species", value: study.species.length ? study.species.join(", ") : null },
  ];
  return (
    <div className="grid-page gap-y-10">
      <div className="col-span-4 md:col-span-8 lg:col-span-8">
        <p className="t-label mb-5">{metaLine([study.projectType, study.client])}</p>
        <Tag className="t-display">{study.title}</Tag>
      </div>
      <dl className="tabular col-span-4 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-5 md:col-span-8 md:grid-cols-3 lg:col-span-3 lg:col-start-10 lg:grid-cols-1 lg:self-end">
        {meta.map((m) => (
          <div key={m.label}>
            <dt className="text-[0.875rem] font-semibold">{m.label}</dt>
            <dd className="t-muted text-[0.9375rem]">{m.value ?? "To be confirmed"}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/**
 * One product section of a case study: tag title, image, annotated detail, spec block and a
 * short paragraph. The id is the anchor that grid items link to.
 */
export function CaseStudySectionBlock({
  section,
  annotations = [],
  visualisationPlace,
}: {
  section: CaseStudySection;
  annotations?: Annotation[];
  /** When the main image is a render, the place for its caption box. */
  visualisationPlace?: string;
}) {
  const main = section.images[0];
  return (
    <section id={section.id} data-cs-section="" aria-labelledby={`${section.id}-title`} className="relative scroll-mt-[calc(var(--header-h)+72px)] py-12 lg:scroll-mt-[calc(var(--header-h)+24px)] lg:py-16">
      <TaggedTitle id={`${section.id}-title`} title={section.title} as="h2" />
      <p className="t-label mt-3">{section.product}</p>
      <div className="mt-8 lg:mt-10">
        <ImageFrame
          src={main?.src}
          alt={main?.alt ?? `${section.title}, Semarang`}
          ratio="3 / 2"
          visualisation={main?.visualisation || visualisationPlace ? { place: visualisationPlace ?? "Semarang, Indonesia" } : false}
        />
      </div>
      {annotations.length ? (
        <div className="mt-10">
          <p className="t-break mb-4">Inside the details</p>
          <AnnotatedImage alt={`${section.title} details`} annotations={annotations} />
        </div>
      ) : null}
      <div className="mt-10 grid gap-y-8 lg:grid-cols-2 lg:gap-x-[var(--gutter)]">
        <SpecBlock
          items={[
            { label: "Species", value: section.species },
            { label: "Construction", value: section.construction },
            { label: "Finish", value: section.finish },
            { label: "Dimensions", value: section.dimensions },
          ]}
        />
        <p className="t-body t-muted max-w-[60ch]">
          {section.description ?? "Description to follow at handover, with photos of the finished work."}
        </p>
      </div>
    </section>
  );
}
