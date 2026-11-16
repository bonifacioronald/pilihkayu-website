import type { Metadata } from "next";
import { RoomSection } from "@/components/drawings/room-section";
import { FjlDiagram, UniJointDiagram } from "@/components/drawings/construction-diagram";
import { TreeRings } from "@/components/drawings/tree-rings";
import { CaseStudyHeader, CaseStudySectionBlock } from "@/components/projects/case-study";
import { CaseStudyIndex } from "@/components/projects/case-study-index";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { Slideshow, type SlideshowSlide } from "@/components/projects/slideshow";
import { AnnotatedImage } from "@/components/ui/annotated-image";
import { Button } from "@/components/ui/button";
import { ClosingCta } from "@/components/ui/closing-cta";
import { DimensionLine } from "@/components/ui/dimension-line";
import { ImageFrame } from "@/components/ui/image-frame";
import { LeadFormDemo } from "@/components/ui/lead-form-demo";
import { NumberedSteps } from "@/components/ui/numbered-steps";
import { Placeholder } from "@/components/ui/placeholder";
import { PopupBanner } from "@/components/ui/popup-banner";
import { Reveal } from "@/components/ui/reveal";
import { Container, GoldRule, Grid, Section, type Tone } from "@/components/ui/section";
import { ShowBannerButton } from "@/components/ui/show-banner-button";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { SpecBlock } from "@/components/ui/spec-block";
import { SpeciesSwatches } from "@/components/ui/species-swatches";
import { TaggedTitle, TitleBlock } from "@/components/ui/title-block";
import { getCaseStudy, projectItems } from "@/lib/projects";
import { settings, whatsappUrl } from "@/lib/settings";
import { colors, contrast, contrastPairs } from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Style guide · PilihKayu",
  robots: { index: false, follow: false },
};

const nav = [
  { label: "Tokens", href: "#tokens" },
  { label: "Grounds", href: "#grounds" },
  { label: "Components", href: "#components" },
  { label: "Compositions", href: "#compositions" },
];

/** Small heading that names each specimen on the page. */
function Specimen({ name, note, children }: { name: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="mt-12 border-t border-[var(--rule)]/40 py-12 lg:mt-16 lg:py-16">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 className="t-break">{name}</h3>
        {note ? <p className="t-meta max-w-[48ch]">{note}</p> : null}
      </div>
      {children}
    </div>
  );
}

const sentence = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192];

const typeScale: Array<{ cls: string; name: string; spec: string; sample: string }> = [
  { cls: "t-display", name: "Display", spec: "Fraunces 300 caps · 44 → 112 px · line 1.0", sample: "From our roots" },
  { cls: "t-title", name: "Title", spec: "Fraunces 300 caps · 36 → 64 px · line 1.02 · brand Title 48", sample: "How to order" },
  { cls: "t-content", name: "Content title", spec: "Fraunces 300 caps · 26 → 36 px · brand H1 32", sample: "Doors & frames" },
  { cls: "t-break", name: "Section break", spec: "Fraunces 300 caps · 15 px · tracking 0.4 em", sample: "Custom-made collection" },
  { cls: "t-tagline", name: "Tagline", spec: "Fraunces 300 lowercase · gold on dark · 22 → 30 px · rare", sample: "bringing your designs to life" },
  { cls: "t-label", name: "Label", spec: "Inter 600 caps · 12 px · tracking 0.24 em · brand H4", sample: "Flooring · Doors · Frames · Ceilings" },
  { cls: "t-heading", name: "Heading", spec: "Inter 600 · 18 → 20 px · brand H2 16 bold", sample: "Submit your drawings" },
  { cls: "t-body", name: "Body", spec: "Inter 400 · 16 → 18 px · line 1.6 · never under 16 px", sample: "Since 1995, we have grown from a single sawmill into a full-scale woodworking company." },
  { cls: "t-meta", name: "Meta", spec: "Inter 400 · 13 px · captions and location · year lines", sample: "Semarang · 2026" },
];

const furnitureSlides: SlideshowSlide[] = [
  ...Array.from({ length: 3 }, (_, i) => ({ id: `timber-${i + 1}`, stage: "Timber" })),
  ...Array.from({ length: 4 }, (_, i) => ({ id: `workshop-${i + 1}`, stage: "Workshop" })),
  ...Array.from({ length: 5 }, (_, i) => ({ id: `piece-${i + 1}`, stage: "Finished piece" })),
];

export default function StyleguidePage() {
  const semarang = getCaseStudy("residential-semarang-yh-2026")!;
  const sections = semarang.sections ?? [];

  return (
    <>
      <SiteHeader items={nav} homeHref="/styleguide" cta={{ label: "Discuss your project", href: whatsappUrl(), external: true }} />
      <main id="main">
        {/* Intro */}
        <Section tone="espresso" texture="grain" spacing="tight">
          <Container>
            <TitleBlock as="h1" size="display" label="Style guide · not public" title="Design system">
              <p>
                Every token, ground and component of pilihkayu.id, in the order they are built from. Placeholders mark
                assets that arrive in later phases. The full rules are in docs/design-system.md.
              </p>
            </TitleBlock>
          </Container>
        </Section>

        {/* ---------- Tokens ---------- */}
        <Section tone="espresso" id="tokens" aria-labelledby="tokens-title" spacing="tight">
          <Container>
            <TitleBlock id="tokens-title" label="01" title="Tokens">
              <p>Dark by default. Colour lives in the section ground; inside it, only gold accents and one terracotta tag.</p>
            </TitleBlock>

            <Specimen name="Colour" note="Contrast is computed from the tokens on this page.">
              <ul className="grid grid-cols-2 gap-x-[var(--gutter)] gap-y-8 md:grid-cols-4">
                {Object.entries(colors).map(([name, c]) => (
                  <li key={name} className="min-w-0">
                    <div className="h-20 shadow-[inset_0_0_0_1px_rgb(244_237_227/0.18)] lg:h-28" style={{ background: c.hex }} />
                    <p className="mt-3 text-base font-semibold capitalize">{name.replace("-", " ")}</p>
                    <p className="t-meta tabular">{c.hex}</p>
                    <p className="t-muted mt-1 text-[0.875rem] leading-snug">{c.role}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-12 overflow-x-auto">
                <table className="tabular w-full min-w-[34rem] text-left text-[0.9375rem]">
                  <thead>
                    <tr className="border-b border-gold/50">
                      <th scope="col" className="py-3 pr-4 font-semibold">Pair</th>
                      <th scope="col" className="py-3 pr-4 font-semibold">Use</th>
                      <th scope="col" className="py-3 pr-4 text-right font-semibold">Ratio</th>
                      <th scope="col" className="py-3 text-right font-semibold">Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contrastPairs.map((p) => {
                      const r = contrast(colors[p.fg].hex, colors[p.bg].hex);
                      const pass = p.min === 0 ? "Lines only" : r >= p.min ? `Pass ${p.min}:1` : "Fail";
                      return (
                        <tr key={`${p.fg}-${p.bg}`} className="border-b border-gold/20">
                          <td className="py-3 pr-4">
                            <span className="inline-flex items-center gap-3">
                              <span aria-hidden="true" className="inline-flex h-7 w-10 items-center justify-center text-[0.75rem] font-semibold" style={{ background: colors[p.bg].hex, color: colors[p.fg].hex }}>
                                {p.min >= 4.5 ? "Aa" : <span className="block h-0.5 w-6 bg-current" />}
                              </span>
                              <span>
                                {sentence(`${p.fg.replace("-", " ")} on ${p.bg.replace("-", " ")}`)}
                              </span>
                            </span>
                          </td>
                          <td className="t-muted py-3 pr-4">{p.use}</td>
                          <td className="py-3 pr-4 text-right">{r.toFixed(2)}:1</td>
                          <td className="py-3 text-right">{pass}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Specimen>
          </Container>
        </Section>

        <Section tone="paper" id="type" aria-labelledby="type-title" spacing="tight">
          <Container>
            <TitleBlock id="type-title" label="Type" title="Light capitals, plain body">
              <p>Fraunces at optical size 144, weight 300, soft and wonky off. Titles are always caps, never bold, never italic. Inter for everything that is read or tapped.</p>
            </TitleBlock>
            <dl className="mt-12">
              {typeScale.map((t) => (
                <div key={t.name} className="grid gap-x-[var(--gutter)] gap-y-2 border-t border-[var(--rule)]/50 py-6 lg:grid-cols-12">
                  <dt className="lg:col-span-3">
                    <span className="block text-base font-semibold">{t.name}</span>
                    <span className="t-meta">{t.spec}</span>
                  </dt>
                  <dd className={`${t.cls} min-w-0 lg:col-span-9`}>{t.sample}</dd>
                </div>
              ))}
              <div className="grid gap-x-[var(--gutter)] gap-y-2 border-t border-[var(--rule)]/50 py-6 lg:grid-cols-12">
                <dt className="lg:col-span-3">
                  <span className="block text-base font-semibold">Spec pair</span>
                  <span className="t-meta">Inter 600 label · value in the muted tone · tabular numbers</span>
                </dt>
                <dd className="lg:col-span-9">
                  <SpecBlock items={[{ label: "Construction", value: "Uni Joint" }, { label: "Dimensions", value: ["Thickness: 15 mm", "Width: 120 mm", "Length: <1800 mm (random)"] }]} />
                </dd>
              </div>
            </dl>
          </Container>
        </Section>

        <Section tone="espresso" texture="grid" id="space" aria-labelledby="space-title" spacing="tight">
          <Container>
            <TitleBlock id="space-title" label="Space, grid, motion" title="Twelve columns, off-axis" />
            <Specimen name="Spacing scale" note="px. Sections use 96 (phone) to 160 (desktop).">
              <ul className="space-y-3">
                {spacing.map((s) => (
                  <li key={s} className="flex items-center gap-4">
                    <span className="tabular t-meta w-10 text-right">{s}</span>
                    <span className="h-3 bg-gold" style={{ width: s }} />
                  </li>
                ))}
              </ul>
            </Specimen>
            <Specimen name="Grid" note="4 columns under 640 px · 8 to 1023 px · 12 from 1024 px. Margins 20 / 40 / 6 vw, content capped at 1440 px.">
              <div className="grid-page h-40" aria-hidden="true">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className={`${i >= 4 ? "hidden md:block" : ""} ${i >= 8 ? "md:hidden lg:block" : ""} border-x border-gold/40 bg-gold/10`} />
                ))}
              </div>
            </Specimen>
            <Specimen name="Motion" note="One curve, three durations. Transform and opacity only. Plays once. Reduced motion: final state at once.">
              <SpecBlock
                columns={3}
                items={[
                  { label: "Curve", value: "cubic-bezier(0.23, 1, 0.32, 1)" },
                  { label: "UI · 160 ms", value: "Buttons, hovers, press feedback" },
                  { label: "Overlays · 300 ms", value: "Menu, banner (exit 200 ms)" },
                  { label: "Reveals · 600 ms", value: "Sections fade up 16 px, once" },
                  { label: "Line draw · 1200 ms", value: "Drawings draw in when they enter the screen" },
                  { label: "Press", value: "Scale 0.97 on every button" },
                ]}
              />
            </Specimen>
          </Container>
        </Section>

        {/* ---------- Grounds ---------- */}
        <div id="grounds">
          {(
            [
              { tone: "espresso", texture: "none", name: "Espresso", note: "Default ground. Most sections sit on it." },
              { tone: "paper", texture: "none", name: "Paper", note: "Alternate ground: contents, about, series openers. Never the whole site." },
              { tone: "oxblood", texture: "none", name: "Deep red", note: "The closing call to action only." },
              { tone: "image", texture: "none", name: "Image + overlay", note: "Photo under espresso at 78 %. Text stays above 4.5:1." },
              { tone: "espresso", texture: "grid", name: "Drafting grid", note: "Gold lines at 8 % on espresso, neutral at 7 % on paper." },
              { tone: "espresso", texture: "grain", name: "Fine grain", note: "Paper-toned grain at 9 %. Never behind long text on paper." },
              { tone: "paper", texture: "grid", name: "Paper + grid", note: "For drawings and specification pages." },
            ] as Array<{ tone: Tone; texture: "none" | "grid" | "grain"; name: string; note: string }>
          ).map((g, i) => (
            <Section key={g.name} tone={g.tone} texture={g.texture} spacing="tight">
              <Container>
                <Grid className="items-end gap-y-4">
                  <div className="col-span-4 md:col-span-5 lg:col-span-7">
                    {i === 0 ? <p className="t-label mb-4">02 · Section grounds</p> : null}
                    <h2 className="t-title">{g.name}</h2>
                  </div>
                  <p className="t-muted col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9">{g.note}</p>
                </Grid>
              </Container>
            </Section>
          ))}
          <Section tone="espresso" spacing="tight">
            <Container>
              <Grid className="items-end gap-y-4">
                <div className="col-span-4 md:col-span-5 lg:col-span-7">
                  <h2 className="t-title">Wood texture</h2>
                </div>
                <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9">
                  <Placeholder ratio="3 / 1" label="Asset pending · wood photo" />
                  <p className="t-meta mt-3">Waits for a high-resolution wood photo; used at low opacity, never behind long text.</p>
                </div>
              </Grid>
            </Container>
          </Section>
        </div>

        {/* ---------- Components ---------- */}
        <Section tone="espresso" id="components" aria-labelledby="components-title">
          <Container>
            <TitleBlock id="components-title" label="03" title="Components">
              <p>The header above is the live header component: resize below 1024 px for the Menu overlay.</p>
            </TitleBlock>

            <Specimen name="Buttons" note="Primary: paper fill on dark. Secondary: 1 px gold outline. Link: gold underline. One primary per screen.">
              <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
                <Button href={whatsappUrl()} external helper="Chat lewat WhatsApp">
                  Discuss your project
                </Button>
                <Button variant="secondary" href="#tokens">
                  View the tokens
                </Button>
                <Button variant="link" href="#compositions">
                  View all works
                </Button>
                <Button comingSoon variant="secondary">
                  Download catalogue
                </Button>
                <Button loading>Send</Button>
              </div>
            </Specimen>

            <Specimen name="Section tag, gold rule, title + offset paragraph" note="Catalogue p.10, p.11 · p.5, p.9">
              <TaggedTitle title="Doors & frames" as="h3" />
              <GoldRule className="my-12" />
              <TitleBlock as="h3" title="The custom-made collection">
                <p>
                  From your drawings to the final finish, we bring together material expertise and flexible production to
                  create pieces that fit your space and reflect your design.
                </p>
              </TitleBlock>
              <div className="mt-16">
                <TitleBlock as="h3" align="right" title="The warmth that makes a space feel like home" size="content">
                  <p>Right-aligned titles (cover, p.8) keep their paragraph in the right-hand offset column.</p>
                </TitleBlock>
              </div>
            </Specimen>

            <Specimen name="Spec block" note="Catalogue p.6: Teak flooring T&G.">
              <SpecBlock
                columns={3}
                items={[
                  { label: "Construction", value: ["Uni Joint or", "FJL 2P/3P/4P/5P"] },
                  { label: "Dimensions", value: ["Thickness: 15 mm", "Width: 90/100/120/150 mm", "Length: <1800 mm (random)"] },
                  { label: "Finishing", value: "UV Coating" },
                ]}
              />
            </Specimen>

            <Specimen name="Numbered steps" note="Catalogue p.12, How to Order.">
              <NumberedSteps
                steps={[
                  { title: "Submit your drawings", text: "Share your plans and requirements." },
                  { title: "Consult & refine", text: "Expert advice, feasibility review and material samples if needed." },
                  { title: "Agreement & payment", text: "Confirm scope, pricing and payment." },
                  { title: "Final checks & production", text: "On-site trial fitting if needed, followed by full production with updates." },
                  { title: "Delivery & handover", text: "Transport and installation coordination as agreed." },
                ]}
              />
            </Specimen>

            <Specimen name="Species swatches" note="Catalogue p.12. Wood photos stay in full colour.">
              <SpeciesSwatches species={[{ name: "Teak" }, { name: "Merbau" }, { name: "Mahony" }, { name: "Ulin" }, { name: "Acacia" }, { name: "Oak" }]} />
            </Specimen>

            <Specimen name="Image frames" note="Inset (framed by margins), edge-bleed, and the Visualisation caption box for renders.">
              <Grid className="gap-y-12">
                <div className="col-span-4 md:col-span-3 lg:col-span-4">
                  <ImageFrame alt="" ratio="4 / 5" caption="Inset · 4:5" />
                </div>
                <div className="col-span-4 md:col-span-5 lg:col-span-8">
                  <ImageFrame alt="" ratio="16 / 10" placement="bleed-right" visualisation={{ place: "Semarang, Indonesia" }} caption="Edge-bleed right · render with caption box" />
                </div>
                <div className="col-span-4 md:col-span-5 lg:col-span-7">
                  <ImageFrame alt="" ratio="3 / 2" placement="bleed-left" mono caption="Edge-bleed left · black and white for atmosphere" />
                </div>
              </Grid>
            </Specimen>

            <Specimen name="Annotated image" note="Moodboard 05. Leader lines on tablet and desktop; numbered markers on phones.">
              <div className="lg:w-2/3">
                <AnnotatedImage
                  alt="Staircase details"
                  annotations={[
                    { x: 30, y: 62, label: "Tread", side: "top", labelX: 22 },
                    { x: 55, y: 44, label: "Handrail", side: "top", labelX: 62 },
                    { x: 42, y: 78, label: "Riser", side: "bottom", labelX: 36 },
                  ]}
                />
              </div>
            </Specimen>

            <Specimen name="Line drawings" note="Gold on dark, neutral on paper. Draw in once when they enter the screen (1200 ms). Drop exported SVG shapes straight into <LineDrawing>.">
              <Grid className="gap-y-12">
                <div className="col-span-4 md:col-span-8 lg:col-span-7">
                  <RoomSection title="Section of a room with a tongue-and-groove floor, lumber ceiling, a door and a staircase" />
                </div>
                <div className="col-span-4 space-y-10 md:col-span-8 lg:col-span-5">
                  <UniJointDiagram />
                  <FjlDiagram />
                  <div>
                    <p className="t-meta mb-2">Dimension line</p>
                    <DimensionLine label="W: 90 / 100 / 120 / 150 mm" />
                  </div>
                </div>
              </Grid>
            </Specimen>
          </Container>
        </Section>

        <Section tone="paper" texture="grid" spacing="tight" aria-labelledby="rings-title">
          <Container>
            <Grid className="items-center gap-y-10">
              <div className="col-span-4 md:col-span-4 lg:col-span-5">
                <h2 id="rings-title" className="t-title">From our roots</h2>
                <p className="t-body t-muted mt-6">Line work on paper: the tree-ring drawing (catalogue p.2) in neutral brown.</p>
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
                <TreeRings title="Tree-ring cross-section" />
              </div>
            </Grid>
          </Container>
        </Section>

        <Section tone="espresso" spacing="tight" aria-labelledby="forms-title">
          <Container>
            <Grid className="gap-y-10">
              <div className="col-span-4 md:col-span-8 lg:col-span-4">
                <h2 id="forms-title" className="t-title">Form fields</h2>
                <p className="t-body t-muted mt-6">
                  English labels with a short Indonesian helper. Errors say what to fix. Submit shows sending, then success.
                  Try sending it empty.
                </p>
              </div>
              <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
                <LeadFormDemo />
              </div>
            </Grid>
          </Container>
        </Section>

        <Section tone="espresso" texture="grain" spacing="tight" aria-labelledby="banner-title">
          <Container>
            <Grid className="items-end gap-y-6">
              <div className="col-span-4 md:col-span-5 lg:col-span-7">
                <h2 id="banner-title" className="t-title">Bottom banner</h2>
                <p className="t-body t-muted mt-6 max-w-[56ch]">
                  On live pages it opens once, after 20 seconds or half a page of scrolling. Closing hides it for 7 days. Never
                  on /catalogue or /welcome.
                </p>
              </div>
              <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9">
                <ShowBannerButton />
              </div>
            </Grid>
          </Container>
        </Section>

        {/* ---------- Compositions ---------- */}
        <div id="compositions">
          {/* A. Home hero */}
          <Section tone="espresso" texture="grain" spacing="none" className="pt-12 lg:pt-20" aria-labelledby="hero-title">
            <Container>
              <p className="t-label mb-10 lg:mb-14">04 · Composition A · Home hero</p>
              <TitleBlock
                id="hero-title"
                size="display"
                title="Solid wood flooring, ceilings, doors and stairs, made to your drawings"
                tagline="direct from our factory, since 1995"
                actions={
                  <>
                    <Button href={whatsappUrl()} external helper="Chat lewat WhatsApp">
                      Discuss your project
                    </Button>
                    {settings.catalogue.available ? (
                      <Button variant="link" href="/catalogue">
                        Download catalogue
                      </Button>
                    ) : (
                      <Button variant="link" comingSoon>
                        Download catalogue
                      </Button>
                    )}
                  </>
                }
              />
              <Grid className="mt-14 lg:mt-20">
                <div className="relative col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
                  <ImageFrame alt="Visualisation of a room in teak" ratio="16 / 9" placement="bleed-right" visualisation={{ place: "Semarang, Indonesia" }} priority />
                  <div className="pointer-events-none absolute inset-0 -mr-[var(--outer)] flex items-center p-[6%]">
                    <RoomSection className="opacity-90" />
                  </div>
                </div>
              </Grid>
            </Container>
            {/* Credibility strip */}
            <Container className="pt-16 pb-24 lg:pt-24 lg:pb-32">
              <Grid className="gap-y-px">
                <ul className="tabular col-span-4 grid grid-cols-2 border-t border-l border-gold/40 md:col-span-8 md:grid-cols-4 lg:col-span-9">
                  {[
                    { n: "1995", t: "Since 1995, from a single sawmill" },
                    { n: "11,000 m²", t: "Facility in Indonesia" },
                    { n: "250+", t: "Skilled craftspeople" },
                    { n: "SVLK · FSC® · JAS", t: "Legality, sourcing and grading" },
                  ].map((s) => (
                    <li key={s.n} className="flex min-h-36 flex-col justify-between gap-6 border-r border-b border-gold/40 p-4 lg:min-h-44 lg:p-5">
                      <p className="t-meta">{s.t}</p>
                      <p className="t-content !text-[1.625rem] normal-case lg:!text-[2rem]">{s.n}</p>
                    </li>
                  ))}
                </ul>
                <div className="col-span-4 md:col-span-3 lg:col-span-3">
                  <Placeholder ratio="4 / 5" label="Asset pending · factory loop · 4:5" />
                </div>
              </Grid>
            </Container>
          </Section>

          {/* B. Projects grid */}
          <Section tone="espresso" texture="grid" aria-labelledby="works-title">
            <Container>
              <p className="t-label mb-10">Composition B · Projects grid</p>
              <Reveal>
                <ProjectsGrid items={projectItems} syncUrl={false} headingLevel="h2" linkMode="anchor" />
              </Reveal>
            </Container>
          </Section>

          {/* C. Case study */}
          <Section tone="espresso" spacing="none" className="pt-24 lg:pt-32" aria-labelledby="case-title">
            <Container>
              <p className="t-label mb-10">Composition C · Case study</p>
              <CaseStudyHeader study={semarang} as="h2" />
              <Grid className="mt-16 lg:mt-24">
                <div className="col-span-4 md:col-span-8 lg:col-span-3">
                  <div className="h-full">
                    <CaseStudyIndex sections={sections.map((s) => ({ id: s.id, title: s.title }))} />
                  </div>
                </div>
                <div className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-5">
                  {sections.map((s, i) => (
                    <CaseStudySectionBlock
                      key={s.id}
                      section={s}
                      visualisationPlace={s.id === "staircase-1" ? "Semarang, Indonesia" : undefined}
                      annotations={
                        i === 2
                          ? [
                              { x: 30, y: 62, label: "Tread", side: "top", labelX: 22 },
                              { x: 55, y: 44, label: "Handrail", side: "top", labelX: 62 },
                              { x: 42, y: 78, label: "Riser", side: "bottom", labelX: 36 },
                            ]
                          : []
                      }
                    />
                  ))}
                </div>
              </Grid>
            </Container>
          </Section>

          {/* Slideshow */}
          <Section tone="espresso" texture="grain" aria-labelledby="heritage-title">
            <Container>
              <TitleBlock id="heritage-title" label="Slideshow · Furniture heritage" title="From timber to finished piece">
                <p>Swipe, use the arrow keys, or the buttons. Each furniture item in the grid opens this page at its own slide.</p>
              </TitleBlock>
              <div className="mt-14 lg:mt-20">
                <Slideshow label="Furniture heritage" slides={furnitureSlides} />
              </div>
            </Container>
          </Section>
        </div>

        <ClosingCta id="contact" />
      </main>
      <SiteFooter />
      <PopupBanner mode="demo" />
    </>
  );
}
