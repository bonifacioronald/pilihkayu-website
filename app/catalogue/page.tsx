import type { Metadata } from "next";
import Image from "next/image";
import { SiteChrome } from "@/components/site-chrome";
import { Button } from "@/components/ui/button";
import { Container, Grid, Section } from "@/components/ui/section";
import { settings, whatsappUrl } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Catalogue · PilihKayu",
  description:
    "The PilihKayu catalogue: solid wood flooring, skirting and ceilings, custom-made doors, frames, staircases and furniture, wood species and how to order.",
  alternates: { canonical: "/catalogue" },
};

const contents = [
  { title: "About us", page: 3 },
  { title: "Project support", page: 4 },
  { title: "Solid wood flooring, skirting & ceilings series", page: 5 },
  { title: "Flooring T&G · Skirting · Ceiling", page: 6, sub: true },
  { title: "The custom-made collection", page: 9 },
  { title: "Doors & frames · Staircases · Furniture", page: 10, sub: true },
  { title: "Wood species we work with", page: 12 },
  { title: "How to order", page: 12 },
  { title: "Contacts", page: 14 },
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

              <h2 className="t-label mt-14 mb-2">Inside</h2>
              <ol className="tabular border-t border-[var(--rule)]/60">
                {contents.map((c) => (
                  <li
                    key={c.title}
                    className={`flex items-baseline justify-between gap-6 border-b border-[var(--rule)]/40 py-3 ${c.sub ? "pl-5 text-[var(--muted)]" : ""}`}
                  >
                    <span className={c.sub ? "text-[0.9375rem]" : "text-base"}>{c.title}</span>
                    <span className="t-meta">p.{c.page}</span>
                  </li>
                ))}
              </ol>
            </div>
          </Grid>
        </Container>
      </Section>
    </SiteChrome>
  );
}
