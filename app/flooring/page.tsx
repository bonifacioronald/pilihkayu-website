import type { Metadata } from "next";
import Image from "next/image";
import { FjlDiagram, UniJointDiagram } from "@/components/drawings/construction-diagram";
import { FlooringCompare } from "@/components/flooring-compare";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Reveal } from "@/components/ui/reveal";
import { Container, Grid, Section } from "@/components/ui/section";
import { SpecBlock } from "@/components/ui/spec-block";
import { TaggedTitle, TitleBlock } from "@/components/ui/title-block";
import products from "@/content/products.json";
import { whatsappUrl } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Solid wood flooring · PilihKayu",
  description:
    "Solid wood tongue-and-groove flooring in Teak Jumbo, Teak and Mahony: construction, dimensions and finishes. Made in our factory in Indonesia.",
  alternates: { canonical: "/flooring" },
};

/** The flooring series: compare the finishes, then each finish in detail, then how it is built. */
export default function FlooringPage() {
  const { flooring } = products;
  return (
    <SiteChrome>
      <Section tone="espresso" texture="grain" aria-labelledby="flooring-page-title">
        <Container>
          <TitleBlock as="h1" id="flooring-page-title" size="display" title="Solid wood flooring">
            <p>
              Bring the natural warmth of solid wood to your space, in a choice of materials, dimensions and finishes. Each
              board is made in our own factory.
            </p>
          </TitleBlock>
          <div className="mt-14 lg:mt-20">
            <FlooringCompare hrefBase="" headingLevel="h2" />
          </div>
        </Container>
      </Section>

      {flooring.finishes.map((f, i) => (
        <Section
          key={f.id}
          id={f.id}
          tone={i % 2 === 0 ? "paper" : "espresso"}
          aria-labelledby={`${f.id}-title`}
          className="scroll-mt-[var(--header-h)]"
        >
          <Container>
            <Grid className="items-start gap-y-12">
              <div className={`col-span-4 md:col-span-4 lg:col-span-5 ${i % 2 ? "lg:order-2 lg:col-start-8" : ""}`}>
                <TaggedTitle id={`${f.id}-title`} title={f.name} variant="inline" />
                <p className="t-label mt-3">{f.finish}</p>
                <SpecBlock
                  className="mt-9"
                  columns={1}
                  items={[
                    { label: "Construction", value: f.construction },
                    { label: "Dimensions", value: f.dimensions },
                    { label: "Finishing", value: f.finishing },
                    ...(f.priceFrom ? [{ label: "Prices start from", value: f.priceFrom as string }] : []),
                  ]}
                />
                <div className="mt-10">
                  <Button
                    href={whatsappUrl(`Halo PilihKayu, saya tertarik dengan ${f.name} Flooring (${f.finish}) (dari website)`)}
                    external
                  >
                    Ask about {f.name}
                  </Button>
                </div>
              </div>
              <Reveal className={`col-span-4 md:col-span-4 lg:col-span-6 ${i % 2 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                <div className="grid grid-cols-5 gap-[var(--gutter)]">
                  <div className="relative col-span-3 aspect-[4/5] overflow-hidden">
                    <Image src={f.poster} alt={`${f.name} flooring, ${f.finish} finish`} fill sizes="(min-width:1024px) 28vw, 58vw" className="object-cover" />
                  </div>
                  <div className="relative col-span-2 mt-16 aspect-[4/5] self-start overflow-hidden">
                    <Image src={f.still} alt={`${f.name} flooring, ${f.finish} finish, seen at an angle`} fill sizes="(min-width:1024px) 18vw, 38vw" className="object-cover" />
                  </div>
                </div>
              </Reveal>
            </Grid>
          </Container>
        </Section>
      ))}

      {/* Construction */}
      <Section tone="espresso" texture="grid" aria-labelledby="construction-title">
        <Container>
          <TitleBlock id="construction-title" title="How it is built">
            <p>
              Tongue-and-groove boards lock together edge to edge for a tight, stable floor. Uni Joint uses one solid length
              per board; FJL is finger-jointed and laminated.
            </p>
          </TitleBlock>
          <Grid className="mt-14 items-start gap-y-12 lg:mt-20">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <div className="space-y-10">
                <UniJointDiagram />
                <FjlDiagram />
              </div>
              <p className="t-meta mt-8 max-w-[48ch]">{flooring.pattern}</p>
            </div>
            <div className="col-span-4 grid grid-cols-2 gap-[var(--gutter)] md:col-span-8 lg:col-span-5 lg:col-start-8">
              {[1, 2].map((n) => (
                <Reveal key={n} delay={n * 100} className={n === 2 ? "mt-12" : ""}>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={`/photos/flooring/tg-closeup-${n}.jpg`}
                      alt="Close-up of the tongue-and-groove edge of a solid wood floor board"
                      fill
                      sizes="(min-width:1024px) 20vw, 45vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="t-meta mt-2">Tongue and groove</p>
                </Reveal>
              ))}
            </div>
          </Grid>
        </Container>
      </Section>

      <ClosingCta id="contact" message="Halo PilihKayu, saya tertarik dengan lantai kayu solid (dari website)" />
    </SiteChrome>
  );
}
