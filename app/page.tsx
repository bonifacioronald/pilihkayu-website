import Image from "next/image";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { VisualisationCaption } from "@/components/ui/image-frame";
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

export default function HomePage() {
  return (
    <SiteChrome>
      {/* Hero. Phone: the render fills the top and dissolves into espresso under the title.
          Desktop: text left, the render as a tall panel on the right. */}
      <Section tone="espresso" spacing="none" aria-labelledby="hero-title" className="relative">
        <div className="lg:grid lg:min-h-[calc(100dvh-var(--header-h))] lg:grid-cols-12">
          <div className="relative lg:order-2 lg:col-span-5 lg:col-start-8">
            <div className="relative aspect-[4/5] w-full lg:absolute lg:inset-0 lg:aspect-auto">
              <Image
                src="/photos/renders/semarang-yh-2026-office-1.jpg"
                alt="Visualisation of a living room with solid wood flooring and wall panelling, for a PilihKayu project in Semarang"
                fill
                priority
                quality={65}
                sizes="(min-width:1024px) 42vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgb(43_26_18/0.85)_80%,#2b1a12_100%)] lg:hidden"
              />
              <VisualisationCaption place="Semarang, Indonesia" className="!top-6 !bottom-auto lg:!top-auto lg:!bottom-10" />
            </div>
          </div>
          <div className="container-page relative -mt-28 pb-20 lg:order-1 lg:col-span-7 lg:mt-0 lg:flex lg:flex-col lg:justify-center lg:py-24 lg:pr-12">
            <h1 id="hero-title" className="t-display max-w-[11ch]">
              Solid wood, made to your drawings
            </h1>
            <p className="t-body mt-5 max-w-[40ch] text-paper/85 lg:mt-7">
              Flooring, ceilings, doors, staircases and furniture in solid wood. Direct from our factory in Indonesia, since
              1995.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 lg:mt-11">
              <Button href={whatsappUrl("Halo PilihKayu, saya ingin konsultasi proyek (dari website)")} external>
                Discuss your project
              </Button>
              <Button variant="link" href="/factory">
                About our factory
              </Button>
            </div>
          </div>
        </div>
      </Section>

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
                  src="/photos/factory/sun-drying-yard.jpg"
                  alt="Solid wood flooring boards laid out to dry in the PilihKayu factory yard"
                  fill
                  sizes="(min-width:1024px) 38vw, (min-width:640px) 48vw, 100vw"
                  className="object-cover object-[50%_88%]"
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
                  src="/photos/renders/semarang-yh-2026-stair-1.jpg"
                  alt="Visualisation of a floating solid teak staircase, for a PilihKayu project in Semarang"
                  fill
                  sizes="(min-width:1024px) 38vw, (min-width:640px) 48vw, 100vw"
                  className="object-cover"
                />
                <VisualisationCaption place="Semarang, Indonesia" />
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
