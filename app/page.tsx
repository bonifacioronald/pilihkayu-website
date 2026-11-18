import Image from "next/image";
import Link from "next/link";
import { FlooringCompare } from "@/components/flooring-compare";
import { HomeHero } from "@/components/home-hero";
import { SiteChrome } from "@/components/site-chrome";
import { SpeciesRow } from "@/components/species-row";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { VisualisationCaption } from "@/components/ui/image-frame";
import { Reveal } from "@/components/ui/reveal";
import { Container, Grid, Section } from "@/components/ui/section";
import { VideoLoop } from "@/components/ui/video-loop";
import products from "@/content/products.json";
import { getCaseStudy } from "@/lib/projects";
import { whatsappUrl } from "@/lib/settings";

type Photo = { src: string; alt: string };

/**
 * A project shown as a future case study: one large photo with a smaller one offset across its
 * corner (the scattered pair), then label, title, one line and status.
 */
function ProjectTeaser({
  label,
  title,
  text,
  large,
  small,
  meta,
  visualisation,
}: {
  label: string;
  title: string;
  text: string;
  large: Photo;
  small: Photo;
  meta: string;
  visualisation?: string;
}) {
  return (
    <article>
      <div className="relative pr-[22%] pb-[18%]">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image src={large.src} alt={large.alt} fill sizes="(min-width:1024px) 34vw, 78vw" className="object-cover" />
          {visualisation ? <VisualisationCaption place={visualisation} /> : null}
        </div>
        <div className="absolute right-0 bottom-0 w-[42%] shadow-[0_18px_40px_-18px_rgb(43_26_18/0.55)]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={small.src} alt={small.alt} fill sizes="(min-width:1024px) 15vw, 34vw" className="object-cover" />
          </div>
        </div>
      </div>
      <p className="t-label mt-7">{label}</p>
      <h3 className="t-content mt-2">{title}</h3>
      <p className="t-body t-muted mt-3 max-w-[42ch]">{text}</p>
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <p className="t-meta tabular">{meta}</p>
        <p className="text-[0.6875rem] font-semibold tracking-[0.2em] text-[var(--muted)] uppercase">Case study · Coming soon</p>
      </div>
    </article>
  );
}

export default function HomePage() {
  const semarang = getCaseStudy("residential-semarang-yh-2026")!;

  return (
    <SiteChrome>
      <HomeHero />

      {/* What we make: same ground as the hero, so the page flows on without a break. */}
      <Section tone="espresso" spacing="none" className="pt-8 pb-24 lg:pt-12 lg:pb-32" aria-labelledby="make-title">
        <Container>
          <div className="border-t border-gold/30 pt-14 lg:pt-20">
            <Grid className="gap-y-6">
              <h2 id="make-title" className="t-title col-span-4 md:col-span-8 lg:col-span-7">
                From floor to ceiling, in solid wood
              </h2>
              <p className="t-body t-muted col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
                Ready-made series for floors, skirting and ceilings, and custom pieces built from your drawings.
              </p>
            </Grid>
          </div>

          <Grid className="mt-12 gap-y-14 lg:mt-16">
            <Reveal className="col-span-4 md:col-span-4 lg:col-span-5">
              <Link href="/flooring" className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/photos/flooring/teak-natural-jumbo-2.jpg"
                    alt="Teak Jumbo solid wood flooring sample, natural finish"
                    fill
                    sizes="(min-width:1024px) 38vw, (min-width:640px) 48vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-brand [@media(hover:hover)]:group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="t-content mt-6">Flooring, skirting &amp; ceilings</h3>
                <p className="t-body t-muted mt-3 max-w-[44ch]">
                  Bring the natural warmth of solid wood to your space, in a choice of materials, dimensions and finishes.
                </p>
                <span className="mt-4 inline-flex min-h-11 items-center gap-3 text-base underline decoration-gold underline-offset-[6px]">
                  See the flooring series <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
            <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 lg:mt-28" delay={120}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/photos/renders/semarang-yh-2026-stair-1.jpg"
                  alt="Visualisation of a floating solid teak staircase for a residence in Semarang"
                  fill
                  sizes="(min-width:1024px) 38vw, (min-width:640px) 48vw, 100vw"
                  className="object-cover"
                />
                <VisualisationCaption place="Semarang residence" />
              </div>
              <h3 className="t-content mt-6">Doors, staircases &amp; furniture</h3>
              <p className="t-body t-muted mt-3 max-w-[44ch]">
                Made to your drawings: material expertise and flexible production for pieces that fit your space and reflect
                your design.
              </p>
              <span className="mt-4 inline-flex min-h-11 items-center">
                <Button variant="link" href={whatsappUrl("Halo PilihKayu, saya ingin membuat pesanan custom (dari website)")} external>
                  Send us your drawings
                </Button>
              </span>
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* Projects: two future case studies side by side, scattered. */}
      <Section tone="paper" aria-labelledby="projects-title">
        <Container>
          <Grid className="gap-y-6">
            <h2 id="projects-title" className="t-title col-span-4 md:col-span-8 lg:col-span-6">
              Projects
            </h2>
            <p className="t-body t-muted col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              Recent and ongoing work from our factory. Full case studies follow as each project is completed.
            </p>
          </Grid>
          <Grid className="mt-14 gap-y-16 lg:mt-16">
            <Reveal className="col-span-4 md:col-span-4 lg:col-span-5">
              <ProjectTeaser
                label="Residential · In progress"
                title={`A residential project in ${semarang.location}`}
                text="Ceilings, staircases, doors and frames, flooring and skirting for one residence. Shown here in fitting and sampling; finished photos follow at handover."
                large={{ src: "/photos/semarang/staircase-a.jpg", alt: "Solid teak stair treads being fitted in the Semarang residence" }}
                small={{ src: "/photos/semarang/stair-treads.jpg", alt: "Close-up of solid teak stair treads" }}
                meta={`${semarang.location} · ${semarang.year}`}
              />
            </Reveal>
            <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 lg:mt-28" delay={120}>
              <ProjectTeaser
                label="Furniture · Export"
                title="Furniture, made piece by piece"
                text="Chairs, tables and sets in merbau, teak and more, cut, shaped, joined and finished on our own floor for clients in Europe, Japan, Australia and the United States."
                large={{ src: "/photos/furniture/merbau-garden-tables.jpg", alt: "Merbau garden tables in production" }}
                small={{ src: "/photos/furniture/chair-parts.jpg", alt: "Shaped chair parts laid out before assembly" }}
                meta="Merbau · Teak"
              />
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* The flooring series and the species, as one material story on one ground. */}
      <Section tone="espresso" aria-labelledby="flooring-title">
        <Container>
          <Grid className="gap-y-6">
            <h2 id="flooring-title" className="t-title col-span-4 md:col-span-8 lg:col-span-6">
              The flooring series
            </h2>
            <p className="t-body t-muted col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              Three solid wood finishes, side by side. Hover or scroll to see the grain move in the light.
            </p>
          </Grid>
          <div className="mt-12 lg:mt-16">
            <FlooringCompare />
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <p className="t-meta max-w-[48ch]">{products.flooring.pattern}</p>
            <Button variant="link" href="/flooring">
              See the flooring series
            </Button>
          </div>

          <Grid className="mt-20 gap-y-10 border-t border-gold/30 pt-14 lg:mt-28 lg:pt-20">
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <h2 id="species-title" className="t-content">
                Wood species we work with
              </h2>
              <p className="t-body t-muted mt-4 max-w-[34ch]">
                Common species for our flooring, ceilings and custom pieces. Others on request.
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <SpeciesRow />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* Direct from our factory: proof, leading to About. */}
      <Section tone="espresso" texture="grain" spacing="none" className="pb-24 lg:pb-32" aria-labelledby="factory-title">
        <Container>
          <div className="border-t border-gold/30 pt-14 lg:pt-20">
            <Grid className="items-end gap-y-12">
              <div className="col-span-4 md:col-span-8 lg:col-span-5">
                <h2 id="factory-title" className="t-title">
                  Direct from our factory
                </h2>
                <p className="t-body t-muted mt-5 max-w-[44ch]">
                  Since 1995, we have grown from a single sawmill into a full-scale woodworking company. Our 11,000 m²
                  facility and over 250 skilled craftspeople make every piece, from timber stock to packed delivery.
                </p>
                <div className="mt-8">
                  <Button href="/factory" variant="secondary">
                    About our factory
                  </Button>
                </div>
              </div>
              <Link
                href="/factory"
                aria-label="About our factory"
                className="col-span-4 grid grid-cols-6 items-end gap-[var(--gutter)] md:col-span-8 lg:col-span-7 lg:col-start-6"
              >
                <div className="col-span-3 sm:col-span-2">
                  <VideoLoop
                    src="/media/factory-portrait.mp4"
                    poster="/media/factory-portrait-poster.jpg"
                    alt="Solid wood boards, timber stacks and packed orders on the PilihKayu production floor"
                    ratio="9 / 16"
                    sizes="(min-width:1024px) 16vw, 45vw"
                  />
                </div>
                <div className="col-span-3 grid gap-[var(--gutter)] sm:col-span-4 sm:grid-cols-2">
                  <div className="relative aspect-[4/5] overflow-hidden sm:mb-16">
                    <Image src="/photos/factory/timber-stack-up.jpg" alt="Sawn timber stacked under the factory roof" fill sizes="(min-width:1024px) 18vw, 45vw" className="object-cover" />
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src="/photos/factory/hall-wide.jpg" alt="The main production hall" fill sizes="(min-width:1024px) 18vw, 45vw" className="object-cover" />
                  </div>
                </div>
              </Link>
            </Grid>
          </div>
        </Container>
      </Section>

      <ClosingCta id="contact" />
    </SiteChrome>
  );
}
