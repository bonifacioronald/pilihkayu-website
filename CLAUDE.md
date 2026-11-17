# PilihKayu website: rules for every session

## Read first
- docs/spec.md is the source of truth: pages, URLs, projects, images, copy, design, craft rules.
- One phase at a time. Stop at the end of each phase and give me the preview link.
- Before building a phase, list the assets and decisions you need from me.
- Never use placeholders that look like real content.

## Skills
- impeccable for design; run /impeccable audit, then /impeccable polish, at the end of every phase.
- emil-design-eng for animation and interaction.
- web-design-guidelines to review before a phase goes live.
- If a skill conflicts with docs/design-system.md, docs/spec.md or the brand guide, those win
  (Inter stays the body font; the cream paper ground, drafting grid and catalogue-style section
  labels are brand choices, not defaults to remove).

## Stack
- Next.js (App Router) + TypeScript + Tailwind on Vercel.
- Content in /content (settings.json, products.json, projects.json, welcome-links.json).
- Never hard-code the WhatsApp number, prices or links in components.

## Brand
- docs/design-system.md is the visual source of truth (Phase 1, 16 Nov 2026). It replaces the
  Visual direction and Projects sections of docs/spec.md. Live reference: /styleguide.
- Dark by default: espresso #2B1A12 ground for most sections. Paper #F4EDE3 is primary text on
  dark and an alternate ground for some sections only. Deep red #6E2A2A only as the full closing
  call-to-action block. Muted photo grounds: espresso overlay at 78 %.
- Text on dark: paper; secondary stone #B0A08F; gold #B8863B for labels, taglines, step markers,
  rules. On paper: espresso text, neutral #5A3A28 secondary, gold for lines only.
- Terracotta #C1592C for text-free tag bars only; terracotta-deep #A3461F for the Visualisation
  caption box. Use the tokens and the section tones; never hard-code colours.
- Primary button: paper fill with espresso text on dark (espresso fill on paper). Secondary: 1 px
  outline. Link: gold underline. One primary per screen.
- Type: Fraunces 300, all caps, optical size 144, soft/wonky off, line 1.0–1.05 for titles; never
  bold, italic or sentence case. One tagline style: Fraunces lowercase in gold, rarely. Inter for
  body (never under 16 px on mobile), labels (600 caps, wide tracking) and spec pairs. Tabular numbers.
- Layout: 12/8/4-column grid, generous margins. Titles off-axis (left or right), paragraph in an
  offset column. One image per section bleeds off an edge or sits inset. Thin gold rules,
  dimension lines and leader lines structure the page. Border-radius 0 everywhere; no cards,
  pills, full-page frames or centred hero-with-two-buttons.
- Textures vary per section (drafting grid, fine grain, wood once the photo exists); never one
  texture across the page; never at the cost of contrast.
- Line work is part of the brand: build with <LineDrawing> (components/drawings/ for examples).
- Follow the craft checks in docs/design-system.md and docs/spec.md.

## Images
- Three kinds: line illustrations (brand), renders labelled with the Visualisation caption box
  (aspiration), real photos and footage (proof). Real proof near every claim.
- Renders show real catalogue products only; never present a render as a finished project.
- Own photos only: no stock. The catalogue's door and staircase images are royalty-free
  illustrations and cannot be used on the site.
- Wood stays in full colour. Black-and-white photos only occasionally, for atmosphere.
- One ratio per grid (cards 4:5, case-study images 3:2, slides 4:3); light uniform colour
  correction; weaker photos at small and medium sizes only, never full-width.
- Until an asset exists, use the "Asset pending" placeholder with its ratio. Never fake content.

## Projects
- Many grid items, few detail pages. Data in content/projects.json, helpers in lib/projects.ts.
- caseStudies: one entry per page, with ordered sections (or slides) whose ids are anchors.
- items: what /projects shows; each points at a caseStudy + section (or slide) id. Many items
  share one case study. Only case studies get pages.
- Unknown facts stay null and show "To be confirmed"; never invent them.
- /projects: "WORKS (n)" title with superscript count, Filter link (project type, product; empty
  filters hidden), cards with location · year, image, caps title, product tag.
- Case study pages: caps title + meta column, sticky section index, per-section images,
  annotated details, spec block, short paragraph. Arriving from the grid highlights the section.
- Furniture heritage: one slideshow page (swipe, arrows, counter); pieces link to their slide.

## Motion
- One easing curve; 150-200 ms UI, 300 ms overlays, 500-700 ms reveals.
- Transform and opacity only. Reveals play once. No scroll-jacking.
- Respect prefers-reduced-motion. Hero image loads before any video.

## Copy
- Catalogue style: short caps statement titles, then one plain, specific paragraph.
- English only on every page for now. No Indonesian wording anywhere visible (no helper lines
  under buttons or form labels) until Ronald asks for it back.
- WhatsApp pre-filled messages stay in Indonesian (they are sent, not shown on the page).
- Only facts listed in docs/spec.md. Clients by initials only.
- Certifications: logos only. Never show certificate numbers or codes.

## What Ronald wants (learned from his feedback; follow these before any skill or default)
- Premium first impression above all. If something looks generic or "AI-made", it is wrong:
  no stat/fact strips or number cells (1995 · 11,000 m² · 250+), no boxed cells, no random
  ruled blocks, no decorative frames, no filler sections.
- Every page has one job. Put on it only what serves that job. /welcome routes people to an
  action; it carries no facts, no proof strip, no extra sections.
- Group by hierarchy: lines that belong together sit close together (title, tagline and its
  paragraph are one group); bigger gaps only between groups. Never leave a paragraph floating
  far from its title.
- /welcome is an app-style opening screen, designed for the phone first but with a proper
  desktop layout (never a stretched or cropped phone layout: "lazy for desktop" is a failure).
  Phone: portrait film behind everything, whole film visible under a soft scrim. Desktop: film
  uncropped as a full-height panel beside the content. Sound off with a toggle. Main buttons:
  Contact us and Download catalogue. Then, with clear space, "Which best describes you?" as one
  smooth dropdown (Architect or designer, Contractor, Project owner), not a row of buttons.
  Then "Explore the website". The site menu has a "Welcome" link back to this screen.
- Small headings and questions are plain Inter. Fraunces caps are for real titles only, never
  for small text.
- Prefer one interactive control over a stack of "Coming soon" buttons.
- Anything not ready is shown greyed out, labelled "Coming soon", and cannot be tapped.
- Video: Ronald edits the clips himself. Tell him the spec (orientation, length, no text) and
  use his file as delivered; do not cut clips out of the captioned reels. Compress for web only.
- He is not a developer: give plain numbered steps for Vercel, GitHub and Google, one decision
  at a time, and recommend an answer. When he says "whatever is best", decide and move on.
- He uploads through GitHub's website, sometimes to the repo root: move files into assets/.
- Launch plan: v1 = /welcome + Home + /factory together (docs/roadmap.md). Later phases plug in.
- Show him a preview and wait for his OK before merging anything into main.

## Never
- Login, payments, live inventory, file uploads, production tracking.
- Buttons that do nothing; "Coming soon" = disabled and labelled. Empty filters hidden.
- Changing a URL without a redirect. Secrets in code. New libraries without explaining why.

## Before handing over a preview
- Run the automatic QA list in docs/spec.md and report what passed, what was fixed, what's left.
