import Image from "next/image";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { FlooringSeries } from "@/components/flooring-series";
import { HomeHero } from "@/components/home-hero";
import { VisualisationCaption } from "@/components/ui/image-frame";
import { getCaseStudy } from "@/lib/projects";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import { Reveal } from "@/components/ui/reveal";
import { Container, Grid, Section } from "@/components/ui/section";
import { TitleBlock } from "@/components/ui/title-block";
import { VideoLoop } from "@/components/ui/video-loop";
import { whatsappUrl } from "@/lib/settings";

const steps = [
  { title: "Submit your drawings", text: "Share your plans and requirements." },
  { title: "Consult & refine", text: "Expert advice, feasibility review and material samples if needed." },
  { title: "Agreement & payment", text: "Confirm scope, pricing and payment." },
  { title: "Final checks & production", text: "On-site trial fitting if needed, followed by full production with updates." },
  { title: "Delivery & handover", text: "Transport and installation coordination as agreed." },
];

/** Staggered placement for the project photos (4 / 8 / 12 columns). */
const SCATTER = [
  "col-span-4 md:col-span-4 lg:col-span-5",
  "col-span-2 md:col-span-4 lg:col-span-3 lg:col-start-8 lg:mt-36",
  "col-span-2 md:col-span-4 lg:col-span-4 lg:col-start-2 lg:-mt-10",
  "col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-8 lg:mt-24",
];

export default function HomePage() {
  const semarang = getCaseStudy("residential-semarang-yh-2026")!;
  return (
    <SiteChrome>
      <HomeHero />

      {/* What we make: two families, one next step. */}
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
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/photos/flooring/teak-natural-jumbo-1.jpg"
                  alt="Teak Jumbo solid wood flooring sample, natural finish"
                  fill
                  sizes="(min-width:1024px) 38vw, (min-width:640px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="t-content mt-6">Flooring, skirting &amp; ceilings</h3>
              <p className="t-body t-muted mt-3 max-w-[44ch]">
                Bring the natural warmth of solid wood to your space, in a choice of materials, dimensions and finishes.
              </p>
            </Reveal>
            <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 lg:mt-32" delay={120}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/photos/semarang/staircase-b.jpg"
                  alt="Solid teak stair treads fitted on a staircase in a residence in Semarang"
                  fill
                  sizes="(min-width:1024px) 38vw, (min-width:640px) 48vw, 100vw"
                  className="object-cover"
                />
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

      {/* The flooring series */}
      <Section tone="espresso" aria-labelledby="flooring-title">
        <Container>
          <FlooringSeries />
        </Container>
      </Section>

      {/* Direct from our factory */}
      <Section tone="espresso" texture="grain" aria-labelledby="factory-title">
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

      {/* Projects: in progress. Renders stand in until handover photos (content/projects.json). */}
      <Section tone="paper" aria-labelledby="projects-title">
        <Container>
          <Grid className="gap-y-8">
            <div className="col-span-4 md:col-span-8 lg:col-span-7">
              <p className="t-label mb-4">Projects · In progress</p>
              <h2 id="projects-title" className="t-title">
                A full house in {semarang.location}
              </h2>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:self-end">
              <p className="t-body t-muted">
                Ceilings, staircases, doors and frames, flooring and skirting for one residence, made in our factory. These
                photos are from fitting and sampling; finished photos follow at handover.
              </p>
            </div>
          </Grid>

          <Grid className="mt-14 gap-y-12 lg:mt-20">
            {(semarang.preview ?? []).map((img, i) => (
              <Reveal key={img.src} delay={(i % 2) * 120} className={SCATTER[i % SCATTER.length]}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 36vw, (min-width:640px) 48vw, 100vw" className="object-cover" />
                  {img.visualisation ? <VisualisationCaption place="Semarang residence" /> : null}
                </div>
                {img.caption ? <p className="t-meta mt-3">{img.caption}</p> : null}
              </Reveal>
            ))}
          </Grid>

          <div className="mt-14 flex flex-col items-start gap-x-10 gap-y-5 border-t border-gold/30 pt-8 lg:mt-20 lg:flex-row lg:items-center">
            <dl className="tabular flex flex-wrap gap-x-10 gap-y-3 text-[0.9375rem]">
              <div>
                <dt className="t-meta">Location</dt>
                <dd>{semarang.location}</dd>
              </div>
              <div>
                <dt className="t-meta">Year</dt>
                <dd>{semarang.year}</dd>
              </div>
              <div>
                <dt className="t-meta">Status</dt>
                <dd>{semarang.status}</dd>
              </div>
            </dl>
            <div className="lg:ml-auto">
              <Button comingSoon variant="link">
                Full project
              </Button>
            </div>
          </div>
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
