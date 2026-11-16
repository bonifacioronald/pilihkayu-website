import type { Metadata } from "next";
import { WelcomeLinks } from "@/components/welcome-links";
import { CertificationMarks } from "@/components/ui/certification-marks";
import { FactoryLoop } from "@/components/ui/factory-loop";
import { Logo } from "@/components/ui/logo";
import { Container, Grid, Section } from "@/components/ui/section";
import { settings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "PilihKayu · Solid wood, direct from our factory",
  description:
    "Flooring, ceilings, doors, staircases and furniture in solid wood, made to your drawings. Direct from our factory in Indonesia since 1995.",
  alternates: { canonical: "/welcome" },
};

const facts = [
  { value: "1995", label: "Since 1995, from a single sawmill" },
  { value: "11,000 m²", label: "Facility in Indonesia" },
  { value: "250", plus: true, label: "Skilled craftspeople" },
] as Array<{ value: string; label: string; plus?: boolean }>;

/** Instagram bio and QR landing: one tap to the right place. Replaces lnk.bio. */
export default function WelcomePage() {
  return (
    <Section tone="espresso" texture="grain" spacing="none" className="min-h-dvh">
      <Container className="flex h-[var(--header-h)] items-center justify-between border-b border-gold/25">
        <Logo />
        <a
          href={settings.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="t-meta inline-flex min-h-11 items-center [@media(hover:hover)]:hover:text-paper"
          translate="no"
        >
          @{settings.instagram.handle}
        </a>
      </Container>

      <main id="main">
        <Container className="pt-12 pb-16 lg:pt-20 lg:pb-24">
          <Grid className="gap-y-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <h1 className="t-title">Solid wood, made to your drawings</h1>
              <p className="t-body t-muted mt-6 max-w-[44ch]">
                Flooring, ceilings, doors, staircases and furniture, direct from our factory in Indonesia since 1995.
              </p>
              <div className="mt-10 lg:mt-12">
                <WelcomeLinks />
              </div>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-5 lg:col-start-8 lg:pt-2">
              <FactoryLoop
                src="/media/factory-loop-build.mp4"
                poster="/media/factory-loop-build-poster.jpg"
                alt="Craftspeople shaping and sanding solid wood parts in the PilihKayu factory"
                caption="Our factory in Indonesia, filmed on the production floor."
                priority
              />
            </div>
          </Grid>
        </Container>

        <Container className="border-t border-gold/25 py-12 lg:py-16">
          <Grid className="gap-y-10">
            <ul className="tabular col-span-4 grid grid-cols-3 border-l border-gold/40 md:col-span-8 lg:col-span-6">
              {facts.map((f) => (
                <li key={f.value} className="flex flex-col justify-between gap-4 border-r border-gold/40 px-3 py-1 lg:px-5">
                  <p className="t-content !text-[1.375rem] normal-case lg:!text-[1.875rem]">
                    {f.value}
                    {f.plus ? <span className="font-sans font-light">+</span> : null}
                  </p>
                  <p className="t-meta">{f.label}</p>
                </li>
              ))}
            </ul>
            <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
              <p className="t-label mb-5">Certified</p>
              <CertificationMarks />
            </div>
          </Grid>
        </Container>

        <Container className="border-t border-gold/25 py-8">
          <p className="t-meta">
            © {new Date().getFullYear()} PilihKayu ·{" "}
            <a href={`mailto:${settings.email}`} className="underline decoration-gold/60 underline-offset-4">
              {settings.email}
            </a>
          </p>
        </Container>
      </main>
    </Section>
  );
}
