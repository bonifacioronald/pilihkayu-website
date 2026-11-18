import Image from "next/image";
import Link from "next/link";
import { FlooringCompare } from "@/components/flooring-compare";
import { HomeHero } from "@/components/home-hero";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { VisualisationCaption } from "@/components/ui/image-frame";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import { Reveal } from "@/components/ui/reveal";
import { Container, Grid, Section } from "@/components/ui/section";
import { SpeciesSwatches } from "@/components/ui/species-swatches";
import { TitleBlock } from "@/components/ui/title-block";
import { VideoLoop } from "@/components/ui/video-loop";
import products from "@/content/products.json";
import { getCaseStudy } from "@/lib/projects";
import { whatsappUrl } from "@/lib/settings";

const steps = [
  { title: "Submit your drawings", text: "Share your plans and requirements." },
  { title: "Consult & refine", text: "Expert advice, feasibility review and material samples if needed." },
  { title: "Agreement & payment", text: "Confirm scope, pricing and payment." },
  { title: "Final checks & production", text: "On-site trial fitting if needed, followed by full production with updates." },
  { title: "Delivery & handover", text: "Transport and installation coordination as agreed." },
];

const furniture = [
  { src: "/photos/furniture/merbau-garden-tables.jpg", alt: "Merbau garden tables in production", caption: "Merbau garden tables" },
  { src: "/photos/furniture/chair-parts.jpg", alt: "Shaped chair parts laid out before assembly", caption: "Chair parts, before assembly" },
  { src: "/photos/furniture/merbau-garden-chairs.jpg", alt: "Merbau garden chairs boxed for shipment", caption: "Merbau garden chairs, packed" },
];

/** Small, staggered photos: work in progress is shown, never blown up. */
const SMALL_SCATTER = [
  "col-span-2 md:col-span-3 lg:col-span-3",
  "col-span-2 mt-12 md:col-span-3 lg:col-span-3 lg:mt-20",
  "col-span-2 col-start-2 md:col-span-2 md:col-start-auto md:mt-6 lg:col-span-3 lg:col-start-4 lg:-mt-10",
];

function SmallPhotos({ items, sizes }: { items: Array<{ src: string; alt: string; caption?: string }>; sizes: string }) {
  return (
    <Grid className="gap-y-6">
      {items.map((img, i) => (
        <Reveal key={img.src} delay={i * 100} className={SMALL_SCATTER[i % SMALL_SCATTER.length]}>
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover" />
          </div>
          {img.caption ? <p className="t-meta mt-2">{img.caption}</p> : null}
        </Reveal>
      ))}
    </Grid>
  );
}

export default function HomePage() {
  const semarang = getCaseStudy("residential-semarang-yh-2026")!;
  const semarangPhotos = (semarang.preview ?? []).filter((p) => !p.visualisation).slice(0, 3);

  return (
    <SiteChrome>
      <HomeHero />

      {/* What we make */}
      <Section tone="paper" aria-labelledby="make-title">
        <Container>
          <TitleBlock id="make-title" title="From floor to ceiling, in solid wood">
            <p>
              Ready-made series for floors, skirting and ceilings, and custom pieces built from your drawings. Teak, merbau,
              mahony, ulin, acacia, oak and more.
            </p>
          </TitleBlock>

          <Grid className="mt-14 gap-y-14 lg:mt-20">
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
                <span className="mt-5 inline-flex min-h-11 items-center gap-3 text-base underline decoration-[var(--rule)] underline-offset-[6px]">
                  See the flooring series
                  <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
            <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 lg:mt-32" delay={120}>
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
            </Reveal>
          </Grid>

          <div className="mt-16 flex flex-col items-start gap-3 border-t border-[var(--rule)] pt-10 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
            <p className="t-heading">Not sure where to start? Tell us what you’re building.</p>
            <Button href={whatsappUrl("Halo PilihKayu, saya ingin bertanya tentang produk kayu solid (dari website)")} external>
              Ask us on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>

      {/* The flooring series, side by side */}
      <Section tone="espresso" aria-labelledby="flooring-title">
        <Container>
          <TitleBlock id="flooring-title" title="The flooring series" align="right">
            <p>Three solid wood finishes, side by side. Hover or scroll to see the grain move in the light.</p>
          </TitleBlock>
          <div className="mt-14 lg:mt-20">
            <FlooringCompare />
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-gold/30 pt-8">
            <p className="t-meta max-w-[48ch]">{products.flooring.pattern}</p>
            <Button variant="link" href="/flooring">
              See the flooring series
            </Button>
          </div>
        </Container>
      </Section>

      {/* Wood species */}
      <Section tone="espresso" texture="grain" aria-labelledby="species-title">
        <Container>
          <TitleBlock id="species-title" title="Wood species we work with">
            <p>Common species for our flooring, ceilings and custom pieces. Others on request.</p>
          </TitleBlock>
          <SpeciesSwatches className="mt-14 lg:mt-20" species={products.species} />
        </Container>
      </Section>

      {/* Direct from our factory */}
      <Section tone="espresso" aria-labelledby="factory-title">
        <Container>
          <Grid className="items-center gap-y-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-6">
              <h2 id="factory-title" className="t-title">
                Direct from our factory
              </h2>
              <p className="t-body t-muted mt-5 max-w-[46ch]">
                Since 1995, we have grown from a single sawmill into a full-scale woodworking company, crafting for clients
                across Europe, Japan, Australia and the United States. Now we bring that manufacturing heritage to projects
                across Indonesia, working with contractors, architects and project owners from drawing to delivery.
              </p>
              <div className="mt-9">
                <Button variant="link" href="/factory">
                  About our factory
                </Button>
              </div>
            </div>
            <Reveal className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9">
              <VideoLoop
                src="/media/factory-portrait.mp4"
                poster="/media/factory-portrait-poster.jpg"
                alt="Solid wood boards, timber stacks and packed orders on the PilihKayu production floor"
                ratio="4 / 5"
                sizes="(min-width:1024px) 30vw, (min-width:640px) 48vw, 100vw"
              />
            </Reveal>
          </Grid>
        </Container>
      </Section>

      {/* Projects: residential (in progress) and furniture */}
      <Section tone="paper" aria-labelledby="projects-title">
        <Container>
          <h2 id="projects-title" className="t-title">
            Projects
          </h2>

          <Grid className="mt-14 gap-y-10 lg:mt-20">
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <p className="t-label mb-3">Residential · In progress</p>
              <h3 className="t-content">A residential project in {semarang.location}</h3>
              <p className="t-body t-muted mt-4 max-w-[40ch]">
                Ceilings, staircases, doors and frames, flooring and skirting for one residence, made in our factory. These
                photos are from fitting and sampling; finished photos follow at handover.
              </p>
              <dl className="tabular mt-6 flex flex-wrap gap-x-8 gap-y-2 text-[0.9375rem]">
                <div>
                  <dt className="t-meta">Year</dt>
                  <dd>{semarang.year}</dd>
                </div>
                <div>
                  <dt className="t-meta">Status</dt>
                  <dd>{semarang.status}</dd>
                </div>
              </dl>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <SmallPhotos items={semarangPhotos} sizes="(min-width:1024px) 18vw, 45vw" />
            </div>
          </Grid>

          <Grid className="mt-20 gap-y-10 border-t border-[var(--rule)]/60 pt-14 lg:mt-28 lg:pt-20">
            <div className="col-span-4 md:col-span-8 lg:order-2 lg:col-span-4 lg:col-start-9">
              <p className="t-label mb-3">Furniture</p>
              <h3 className="t-content">Furniture, made piece by piece</h3>
              <p className="t-body t-muted mt-4 max-w-[40ch]">
                Chairs, tables and sets in merbau, teak and more: cut, shaped, joined and finished on our own floor, then
                packed for clients across Europe, Japan, Australia and the United States.
              </p>
            </div>
            <div className="col-span-4 md:col-span-8 lg:order-1 lg:col-span-7">
              <SmallPhotos items={furniture} sizes="(min-width:1024px) 18vw, 45vw" />
            </div>
          </Grid>
        </Container>
      </Section>

      {/* How to order */}
      <Section tone="espresso" texture="grid" aria-labelledby="order-title">
        <Container>
          <TitleBlock id="order-title" title="Every step crafted to fit your space" align="right">
            <p>We keep you informed from approval through production and delivery.</p>
          </TitleBlock>
          <NumberedSteps className="mt-16 lg:mt-24" steps={steps} />
        </Container>
      </Section>

      <ClosingCta id="contact" />
    </SiteChrome>
  );
}
