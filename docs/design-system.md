# PilihKayu design system

Phase 1, approved 16 Nov 2026. This document replaces the **Visual direction**, **Motion & craft rules** (where they disagree) and **Projects** sections of `docs/spec.md`. Everything else in the spec still applies.

Live reference: **/styleguide** (hidden from search, not linked). Every token and component below is shown there.

## Direction in one paragraph

The site reads like the printed catalogue: a dark espresso ground, big light Fraunces capitals pinned off-axis, plain Inter body text in an offset column, thin gold rules and line drawings doing the structuring, and real wood in full colour. Colour lives in the section ground (espresso, paper, deep red, darkened photo), not in decorated elements. Sharp edges everywhere.

Sources: `docs/references/catalogue-pages/` (primary), `docs/references/moodboard/`, `docs/references/brand-guide.png`.

---

## 1. Colour

Tokens live in `app/globals.css` (`@theme`) and are mirrored in `lib/tokens.ts`. Use the tokens only.

| Token | Hex | Role |
| --- | --- | --- |
| `espresso` | #2B1A12 | Default page ground. Most sections. |
| `paper` | #F4EDE3 | Primary text on dark. Alternate ground for some sections only (contents, about, series openers). Never the whole site. |
| `stone` | #B0A08F | Secondary text on dark: spec values, captions, meta. (New in Phase 1; #5A3A28 is unreadable on espresso.) |
| `gold` | #B8863B | Labels, taglines, step markers, thin rules, certification accents. On paper: lines only. |
| `oxblood` | #6E2A2A | The closing call-to-action block only. Never a button colour on dark. |
| `terracotta` | #C1592C | Text-free small blocks: the section-tag bar beside a title. |
| `terracotta-deep` | #A3461F | Blocks that hold small text: the "Visualisation" caption box. (New in Phase 1.) |
| `neutral` | #5A3A28 | Secondary text and labels on paper. |

**Contrast (all checked on /styleguide, computed from the tokens):**

| Pair | Ratio | Allowed for |
| --- | --- | --- |
| paper on espresso | 14.35 | all text |
| stone on espresso | 6.57 | all text |
| gold on espresso | 5.17 | all text, incl. small labels |
| espresso on paper | 14.35 | all text |
| neutral on paper | 8.73 | all text |
| paper on oxblood | 8.91 | all text |
| paper on terracotta-deep | 5.23 | caption text |
| espresso on gold | 5.17 | button hover |
| terracotta on espresso | 3.76 | large text only (24 px+) |
| gold on paper | 2.78 | lines only, never text |
| gold on oxblood | 3.21 | rules and icons only |

**Section tones.** A section sets `tone-espresso`, `tone-paper`, `tone-oxblood` or `tone-image`. Each tone defines `--fg`, `--muted`, `--label`, `--rule`, `--line`, `--btn-bg`, `--btn-fg`, `--btn-hover`, `--outline`, `--field`, `--error`. Components read these variables, so the same component works on every ground. Never hard-code a text colour inside a component.

**Live colour.** Wood in photos and species swatches stays in full colour. Black-and-white photos (`ImageFrame mono`) only for occasional atmosphere, never everywhere.

## 2. Typography

Fraunces (display) and Inter (body), loaded in `app/fonts.ts`. Fraunces replaces Recoleta (decided 12 Nov 2026).

| Class | Use | Spec |
| --- | --- | --- |
| `t-display` | Home hero, case-study titles, WORKS | Fraunces 300, caps, 44 → 112 px, line 1.0 |
| `t-title` | Section titles | Fraunces 300, caps, 36 → 64 px, line 1.02 (brand Title 48) |
| `t-content` | Product and sub-section titles | Fraunces 300, caps, 26 → 36 px (brand H1 32) |
| `t-break` | Section-break label | Fraunces 300, caps, 15 px, tracking 0.25–0.4 em |
| `t-tagline` | The one tagline style; rare | Fraunces 300, lowercase, gold on dark, 22 → 30 px |
| `t-label` | Small labels, product tags | Inter 600, caps, 12 px, tracking 0.24 em (brand H4) |
| `t-heading` | Step and card headings | Inter 600, 18 → 20 px (brand H2) |
| `t-body` | Paragraphs | Inter 400, 16 → 18 px, line 1.6. Never under 16 px. |
| `t-meta` | Captions, "Semarang · 2026" lines | Inter 400, 13 px, muted |
| `tabular` | Prices, dimensions, counters | tabular numbers |

Rules:

- Fraunces always at optical size 144, weight 300, soft and wonky off (set in the classes; do not override).
- Titles are always caps. Never bold, never italic, never sentence case.
- No italics anywhere in headlines.
- Spec pairs: Inter 600 label, value underneath in the muted tone (`SpecBlock`).
- Headings balance; body text wraps "pretty".
- Units keep their case inside caps titles: add `normal-case` around values like "11,000 m²".

## 3. Grid, spacing, motion

- **Grid** (`.grid-page`): 4 columns under 640 px, 8 from 640, 12 from 1024. Gutter 16 / 20 / 24 px.
- **Margins** (`--margin`): 20 / 40 / 6 vw (48–112 px). Content is capped at 1440 px; `--outer` is the distance from the viewport edge to the content, and edge-bleed images extend by exactly `--outer`.
- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 px. Sections: 96 px (phone) to 160 px (desktop) top and bottom (`.section-y`); `spacing="tight"` is 64 / 96.
- **Edges:** border-radius 0 on everything. No cards, pills, shadows or full-page frames. Small round dots (step markers, annotation points) are markers, not containers, and are allowed.
- **Motion** (`--ease-brand` = cubic-bezier(0.23, 1, 0.32, 1)):
  - 160 ms: buttons, hovers, press feedback (`scale(0.97)` on every button)
  - 300 ms: overlays in (menu, banner); exits 200 ms
  - 600 ms: section reveals, fade up 16 px, once (`<Reveal>`)
  - 1200 ms: line drawings draw in when they enter the screen
  - Transform and opacity only. No scroll-jacking, no pinned sections. Hover effects only on devices with a mouse.
  - Reduced motion: final state immediately; colour and opacity feedback stays.

## 4. Section grounds and textures

`<Section tone texture spacing image>` in `components/ui/section.tsx`.

| Ground | When |
| --- | --- |
| `espresso` | Default. Most sections. |
| `paper` | Some sections only: contents-style lists, about, series openers, drawings. |
| `oxblood` | The closing call to action (`<ClosingCta>`), one per page, at the end. |
| `image` | A photo under espresso at 78 % with text on top (catalogue p.4, p.12). |

Textures, varied per section, never one texture across the page, never reducing text contrast:

- `grid`: faint drafting grid (gold 8 % on dark, neutral 7 % on paper).
- `grain`: fine paper-toned grain (`public/textures/grain.png`).
- Wood texture: waits for a high-resolution wood photo (see `docs/assets-needed.md`).

## 5. Layout principles (from the catalogue)

1. **Titles sit off-axis.** Big caps titles pin to the left (p.3, p.5, p.9) or right (cover, p.8). The paragraph starts in an offset column (12 columns: title 1–9, body 6–11; right-aligned: title 4–12, body 7–12). Nothing centred except the logo mark. Use `<TitleBlock>`.
2. **One edge bleeds.** Each section lets one image run off the left or right edge (`placement="bleed-left|bleed-right"`), or frames it inset within the margins. The text keeps its margins. Alternate between sections for rhythm.
3. **Lines do the structuring.** Thin gold rules divide content; dimension lines and leader lines annotate. Spacing groups items; boxes never do. A terracotta tag bar marks a product title.
4. **Specs read like a schedule.** Label/value pairs in columns, tabular numbers, numbered steps along one line, species as tall swatches.
5. **Colour lives in the section.** The ground carries the colour. Inside it: gold accents and at most one terracotta tag.

A small label above a title is allowed when it names the section and the title makes a statement, as the catalogue does ("About Us" above "From our roots…"). Never a label that repeats the title.

No centred hero-with-two-buttons template. One primary button per screen.

## 6. Components

All in `components/ui/` unless noted. Shown on /styleguide.

| Component | File | Notes |
| --- | --- | --- |
| Header + mobile menu | `site-header.tsx` | Sticky. Desktop: logo, links (Inter caps), one secondary CTA. Below 1024 px: "Menu" opens a full-screen overlay (focus kept inside, Esc closes). Skip link included. |
| Footer | `site-footer.tsx` | Logo, tagline, contact, certification codes (logos pending), legal note from catalogue p.15. |
| Logo | `logo.tsx` | Mark + wordmark, `tone="paper"` on dark, `"espresso"` on paper. |
| Button | `button.tsx` | `primary` (paper fill on dark, espresso fill on paper, gold on hover), `secondary` (1 px outline), `link` (gold underline + arrow). `helper` adds an optional short line under it (unused for now: English only). `comingSoon` renders a disabled button labelled "Coming soon". `loading` shows "Sending…". |
| Section / Container / Grid / GoldRule | `section.tsx` | See §3–4. `GoldRule short` is the 64 px divider. |
| TitleBlock | `title-block.tsx` | Title + offset paragraph + actions; `size` display/title/content; `align` left/right; optional `label`, `tagline`. |
| TaggedTitle | `title-block.tsx` | Title with the terracotta bar (`edge`: from the page edge; `inline`: short bar). |
| SpecBlock | `spec-block.tsx` | Label/value pairs; `null` shows "To be confirmed" (never invent a value). |
| NumberedSteps | `numbered-steps.tsx` | Dots on a line; horizontal from 1024 px, vertical below. |
| SpeciesSwatches | `species-swatches.tsx` | Tall 1:3 swatches, name below; scrolls sideways on phones. |
| ImageFrame | `image-frame.tsx` | Fixed ratio, `inset` / `bleed-left` / `bleed-right`, `visualisation={{ place }}` adds the caption box, `mono` for black and white. Placeholder until `src` exists. |
| VisualisationCaption | `image-frame.tsx` | Terracotta-deep box: "A visualisation of an ongoing PilihKayu project in: **Place**". Every render carries one. |
| AnnotatedImage | `annotated-image.tsx` | Leader lines to labels above/below (tablet, desktop); numbered markers + list on phones. Inter labels, never a handwritten font. |
| DimensionLine | `dimension-line.tsx` | Horizontal or vertical, end ticks, centred label ("L: <1800 mm"). |
| LineDrawing | `line-drawing.tsx` | See §7. |
| Reveal | `reveal.tsx` | Fade-up once. Content is visible without JavaScript. |
| Form fields | `form-field.tsx` | `TextField`, `SelectField`, `isIndonesianMobile()`. English label, error under the field, `aria-invalid`, focus moves to the first error. |
| Lead form pattern | `lead-form-demo.tsx` | The /catalogue form (Phase 7) without the sending. |
| PopupBanner | `popup-banner.tsx` | After 20 s or half a page, once; closed = hidden 7 days; never on /catalogue or /welcome. |
| ClosingCta | `closing-cta.tsx` | Deep-red block from catalogue p.14 with WhatsApp button and contact list. |
| Icons | `icons.tsx` | One set: 24 px grid, 1.5 stroke, square caps. |
| CertificationMarks | `certification-marks.tsx` | SVLK, FSC, JAS single-colour marks (`public/certifications/`, paper or espresso). Logos only, never certificate numbers. |
| WelcomeScreen | `components/welcome-screen.tsx` | The /welcome opening screen; see §8. Background film: portrait 9:16 MP4 (540×960, H.264, with audio), poster JPG, loads after the page. |
| Placeholder | `placeholder.tsx` | "Asset pending · ratio". Flat ground, fine hatching, plain label. Never imitates content. |
| ProjectsGrid, ProjectCard | `components/projects/` | See §9. |
| CaseStudyHeader, CaseStudySectionBlock, CaseStudyIndex | `components/projects/` | See §9. |
| Slideshow | `components/projects/slideshow.tsx` | Swipe (scroll snap), arrow keys, prev/next, "03 / 12" counter, `#slide-<id>` deep links. Inset, never full-width. |

## 7. Images and line work

Three kinds of image, each with a job:

| Kind | Job | Rule |
| --- | --- | --- |
| Line illustrations | Brand language; construction know-how | `<LineDrawing>`; gold on dark, neutral on paper |
| Renders | Aspiration | Always the Visualisation caption box; real catalogue products and species only; never presented as a finished project |
| Real photos and footage | Proof | Near every claim ("we make", "since 1995"); shown only at sizes their quality supports |

- Use only PilihKayu's own photos or labelled renders. No stock photos. The catalogue's door and staircase images (p.10, p.11) are royalty-free illustrations and cannot be used on the site.
- Project and furniture photos: one ratio per grid (cards 4:5, case-study images 3:2, slides 4:3), light uniform colour correction, weaker photos at small and medium sizes only.
- Until an asset arrives, use `<Placeholder>` / `ImageFrame` without `src`; the label states the intended ratio.

**Adding a line drawing.** Export the SVG, copy its shapes (paths, lines, rects…) inside `<LineDrawing viewBox="…">`. Every shape becomes a stroke in the ground's line colour; add `data-fill` to a shape that should be filled. `stroke` sets the width in viewBox units. Drawings draw in once when they enter the screen; reduced motion shows them finished. Existing drawings: `components/drawings/` (tree rings, room section for the hero, Uni Joint and FJL 2P diagrams). When the hero render exists, trace its drawing from it so drawing and render match.

## 8. Copy

- Catalogue style: short caps titles that make a statement ("From our roots to your next space", "Every step crafted to fit your space"), then one plain, specific paragraph.
- English only on every page for now (decided 17 Nov 2026): no Indonesian helper lines under buttons or form labels. WhatsApp pre-filled messages stay in Indonesian.
- Error messages say what to fix, in English.
- Only facts listed in `docs/spec.md` (Copy & content rules). Clients by initials only.
- Certifications appear as logos only, never with certificate numbers.
- No stat strips or number cells. Facts are written into sentences next to real proof.

**Grouping.** Title, tagline and paragraph form one group (tight spacing: 12–28 px); actions sit 40–48 px below; sections 96–160 px apart. `TitleBlock` does this; on phones the paragraph aligns with the title (no indent).

**/welcome** is the one centred page: an app-style opening screen (`components/welcome-screen.tsx`, content in `content/welcome-links.json`). Portrait film behind everything at 50 % opacity, fading to solid espresso behind the buttons; on desktop the film is a centred portrait column. Pause and Sound controls in the top corners; sound is off by default. Order: logo, welcome title and one line, Contact us (primary), Download catalogue, "Which best describes you?" (three roles), Explore the website, certification logos. Items not ready are greyed out and labelled "Coming soon".

## 9. Projects: many grid items, few detail pages

Replaces the Projects section of `docs/spec.md`. Data: `content/projects.json`; types and helpers: `lib/projects.ts`.

**Data model**

- `caseStudies[]`: one entry per detail page. `kind: "sections"` (ordered `sections[]`, each with an `id` used as the anchor) or `kind: "slideshow"` (ordered `slides[]`, each with an `id`). Fields: slug, title, client (initials), projectType, location, year, status, scope, species.
- `items[]`: what the grid shows. Each item: id, title, product, projectType, location, year, species, finish, description, image, `caseStudy` (slug) and `target` (section id or slide id). Many items point at the same case study.
- Unknown facts are `null` and show "To be confirmed". Never invent them.
- `itemHref(item)` builds `/projects/<slug>#<section>` or `#slide-<id>`.

**Grid (/projects)**: `t-display` "WORKS" with a superscript count; a plain "Filter" link opens project-type and product filters (empty filters hidden; state in `?type=&product=`); cards show meta line (location · year), image 4:5, caps title, product tag.

**Case study 1** (`/projects/residential-semarang-yh-2026`): large caps title with a meta column (location, year, status "Installation in progress", scope, species); sticky section index (column on desktop, sideways strip on phones); one section per product with images, annotated detail callouts, spec block, short paragraph, Visualisation captions where relevant. Arriving from a grid item scrolls to the section and briefly highlights it. Sections: interior ceiling, exterior ceiling, staircase 1, staircase 2, main door, interior doors, office flooring, bathroom flooring, skirting.

**Case study 2** (`/projects/furniture-heritage`): one page with the slideshow walking timber → workshop → finished pieces. Selected pieces appear as grid items that open the page at their slide. No page per piece.

## 10. Analytics

`components/analytics.tsx` (mounted once in the root layout): Google Analytics 4 on the production site only (`NEXT_PUBLIC_GA_ID` in Vercel), plus Vercel Speed Insights. One click listener sends:

- `whatsapp_click` for any `wa.me` link, with `page` and `product` (from `data-product`, default "general");
- any element with `data-track="event_name"`, with its `data-track-*` attributes as parameters (e.g. `welcome_button_click` with `button`).

New buttons only need the data attributes; no extra code.

## 11. Craft checks (each phase, with docs/spec.md's list)

- Tokens only; radius 0; one primary button per screen.
- Titles caps, light, off-axis; body in the offset column.
- Every render captioned; real proof near every claim.
- Contrast pairs from §1 only.
- Phone (360), tablet (768) and desktop (1440) checked; no sideways scroll.
- Reduced motion shows the final state.
- Placeholders are labelled "Asset pending"; no fake content.
