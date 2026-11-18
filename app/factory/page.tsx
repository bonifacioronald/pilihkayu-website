import type { Metadata } from "next";
import Image from "next/image";
import { SiteChrome } from "@/components/site-chrome";
import { CertificationMarks } from "@/components/ui/certification-marks";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Reveal } from "@/components/ui/reveal";
import { Container, Grid, Section } from "@/components/ui/section";
import { TitleBlock } from "@/components/ui/title-block";
import { VideoCard } from "@/components/ui/video-card";

export const metadata: Metadata = {
  title: "About our factory · PilihKayu",
  description:
    "Since 1995, from a single sawmill to a full-scale woodworking company: an 11,000 m² facility in Indonesia with over 250 skilled craftspeople. SVLK, FSC and JAS certified.",
  alternates: { canonical: "/factory" },
};

const stages = [
  {
    id: "prepare",
    name: "Prepare",
    text: "Timber is selected, dried and cut to size.",
    src: "/media/process-1-prepare.mp4",
    poster: "/media/process-1-prepare-poster.jpg",
  },
  {
    id: "build",
    name: "Build",
    text: "Pieces are shaped, joined and assembled by hand and machine.",
    src: "/media/process-2-build.mp4",
    poster: "/media/process-2-build-poster.jpg",
  },
  {
    id: "finish",
    name: "Finish",
    text: "Surfaces are sanded and finished, then packed for delivery.",
    src: "/media/process-3-finish.mp4",
    poster: "/media/process-3-finish-poster.jpg",
  },
];

const facility = [
  { src: "/photos/factory/timber-stack-up.jpg", caption: "Timber stock", alt: "Sawn timber stacked high under the factory roof" },
  { src: "/photos/factory/machine-hall.jpg", caption: "Machining", alt: "Woodworking machinery in the PilihKayu factory" },
  { src: "/photos/factory/sun-drying-yard.jpg", caption: "Drying", alt: "Solid wood boards laid out to dry in the factory yard" },
  { src: "/photos/factory/packed-pallets.jpg", caption: "Packed for delivery", alt: "Finished orders wrapped and stacked on pallets" },
];

/** About: proves PilihKayu is a real manufacturer. Heritage, facility, production, certifications. */
export default function FactoryPage() {
  return (
    <SiteChrome>
      {/* Heritage */}
      <Section tone="espresso" texture="grain" spacing="none" className="pt-16 lg:pt-24" aria-labelledby="about-title">
        <Container>
          <TitleBlock as="h1" id="about-title" size="display" title="From our roots to your next space">
            <p>
              Since 1995, we have grown from a single sawmill into a full-scale woodworking company, crafting flooring,
              furniture, doors and architectural components for clients across Europe, Japan, Australia and the United
              States.
            </p>
            <p>
              PilihKayu brings this manufacturing heritage to projects across Indonesia. Solid wood is our specialisation, and
              our role goes beyond production: we work closely with contractors, architects and project owners to turn
              designs into well-considered wood products.
            </p>
          </TitleBlock>
        </Container>
        <div className="mt-14 lg:mt-20">
          <div className="relative aspect-[4/5] w-full md:aspect-[16/9] lg:ml-auto lg:w-[83%]">
            <Image
              src="/photos/factory/hall-wide.jpg"
              alt="The main production hall of the PilihKayu factory, with workstations and timber along its length"
              fill
              priority
              quality={65}
              sizes="(min-width:1024px) 83vw, 100vw"
              className="object-cover object-[0%_60%]"
            />
          </div>
        </div>
      </Section>

      {/* Facility */}
      <Section tone="espresso" aria-labelledby="facility-title">
        <Container>
          <TitleBlock id="facility-title" title="Our facility in Indonesia">
            <p>
              Our 11,000 m² facility combines over 250 skilled craftspeople, six kiln-drying chambers with a total capacity
              of 120 m³, and a monthly production capacity of up to 300 m³.
            </p>
          </TitleBlock>
          <ul className="mt-14 grid grid-cols-2 gap-[var(--gutter)] lg:mt-20 lg:grid-cols-4">
            {facility.map((f, i) => (
              <Reveal as="li" key={f.src} delay={i * 80}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={f.src} alt={f.alt} fill sizes="(min-width:1024px) 22vw, 48vw" className="object-cover" />
                </div>
                <p className="t-meta mt-3">{f.caption}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Production */}
      <Section tone="espresso" texture="grain" aria-labelledby="process-title">
        <Container>
          <TitleBlock id="process-title" title="Prepare, build, finish">
            <p>Every piece passes through our own production floor, from raw timber to packed and loaded. Tap a film to play it.</p>
          </TitleBlock>
        </Container>
        <ol className="mt-14 flex snap-x snap-mandatory scroll-px-[var(--outer)] gap-4 overflow-x-auto px-[var(--outer)] pb-2 [scrollbar-width:none] lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-[var(--gutter)] lg:overflow-visible">
          {stages.map((s, i) => (
            <li key={s.id} className="w-[72%] shrink-0 snap-start md:w-[42%] lg:w-auto">
              <VideoCard
                id={`reel-${s.id}`}
                src={s.src}
                poster={s.poster}
                alt={`${s.name}: footage from the PilihKayu production floor`}
                label={`Play: ${s.name}`}
              />
              <p className="t-label tabular mt-5">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="sr-only">{s.name}</h3>
              <p className="t-muted mt-2 text-base">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Certifications */}
      <Section tone="paper" aria-labelledby="cert-title">
        <Container>
          <Grid className="items-end gap-y-10">
            <div className="col-span-4 md:col-span-5 lg:col-span-6">
              <h2 id="cert-title" className="t-title">
                Recognised standards
              </h2>
              <p className="t-body t-muted mt-5 max-w-[46ch]">
                SVLK for timber legality and traceability, FSC® for responsible sourcing and chain of custody, and JAS for
                applicable timber quality and grading requirements.
              </p>
            </div>
            <div className="col-span-4 md:col-span-3 lg:col-span-5 lg:col-start-8">
              <CertificationMarks tone="espresso" className="lg:justify-end" />
            </div>
          </Grid>
        </Container>
      </Section>

      <ClosingCta id="contact" />
    </SiteChrome>
  );
}
