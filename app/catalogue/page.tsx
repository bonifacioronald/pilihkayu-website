import type { Metadata } from "next";
import Image from "next/image";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { Container, Grid, Section } from "@/components/ui/section";
import { settings, whatsappUrl } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Catalogue · PilihKayu",
  description:
    "The PilihKayu catalogue: solid wood flooring, skirting and ceilings, custom-made doors, frames, staircases and furniture, and how to order.",
  alternates: { canonical: "/catalogue" },
};

const steps = [
  { title: "Submit your drawings", text: "Share your plans and requirements." },
  { title: "Consult & refine", text: "Expert advice, feasibility review and material samples if needed." },
  { title: "Agreement & payment", text: "Confirm scope, pricing and payment." },
  { title: "Final checks & production", text: "On-site trial fitting if needed, followed by full production with updates." },
  { title: "Delivery & handover", text: "Transport and installation coordination as agreed." },
];

/** Catalogue: the cover, what is inside, and the download (coming soon until the PDF is final). */
export default function CataloguePage() {
  const available = settings.catalogue.available && settings.catalogue.file;
  return (
    <SiteChrome>
      <Section tone="paper" aria-labelledby="catalogue-title">
        <Container>
          <Grid className="items-start gap-y-12">
            <div className="col-span-4 md:col-span-4 lg:col-span-5">
              <div className="relative mx-auto aspect-[910/1287] w-[78%] shadow-[0_24px_60px_-20px_rgb(43_26_18/0.55)] md:w-full">
                <Image
                  src="/photos/catalogue/cover.jpg"
                  alt="Cover of the PilihKayu catalogue: Your trusted wood manufacturing partner"
                  fill
                  priority
                  sizes="(min-width:1024px) 34vw, (min-width:640px) 45vw, 78vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 lg:pt-6">
              <h1 id="catalogue-title" className="t-title">
                The PilihKayu catalogue
              </h1>
              <p className="t-body t-muted mt-5 max-w-[44ch]">
                Our full range in one document: specifications, finishes and start-from prices for the flooring series, and
                what we make to your drawings.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
                {available ? (
                  <Button href={settings.catalogue.file!}>
                    Download catalogue
                  </Button>
                ) : (
                  <Button comingSoon>Download catalogue</Button>
                )}
                {!available ? (
                  <Button variant="link" href={whatsappUrl("Halo PilihKayu, saya ingin menerima katalog terbaru (dari website)")} external>
                    Ask for it on WhatsApp
                  </Button>
                ) : null}
              </div>

              <h2 className="t-label mt-14 mb-4">How to order</h2>
              <ol className="border-t border-[var(--rule)]/60">
                {steps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-[var(--rule)]/40 py-3">
                    <span className="t-meta tabular pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <p className="text-[0.9375rem]">
                      <span className="font-semibold">{step.title}.</span> <span className="t-muted">{step.text}</span>
                    </p>
                  </li>
                ))}
              </ol>

            </div>
          </Grid>
        </Container>
      </Section>

      <ClosingCta id="contact" />
    </SiteChrome>
  );
}
