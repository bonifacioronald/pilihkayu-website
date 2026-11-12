# PilihKayu Website — Spec v2

Nov 12, 2026 · @Bonifacio Ronald

The complete spec for building pilihkayu.id with Claude Code. It replaces Plan & Spec v1.

## Summary & decisions

The website is PilihKayu's credibility check and lead sorter. Most visitors arrive from Instagram, WhatsApp, Google or a QR code already curious, so the site has to convince them in 30 seconds and hand them to WhatsApp with context.

It has three jobs:

1. **Prove we are a real manufacturer**: factory, heritage, certifications, process, volume of work.
2. **Sort visitors by intent** and hand them to WhatsApp or the catalogue form with their details attached.
3. **Answer repeat questions** (process, materials, payment) so Ronald stops retyping them.

| Decision | Choice |
| --- | --- |
| V1 scope | Lean launch: 13 pages including 2 case studies. Quote basket, guided brief and configurator come later |
| Content updates | Ronald asks Claude Code; content lives in simple files; Vercel republishes automatically |
| Where leads go | Google Sheet + email notification + WhatsApp handoff |
| Images | A mix of three kinds: line illustrations (brand language), labelled renders (aspiration), real photos and footage (proof) |
| Projects | One grid with filters and tags so the volume of work is visible in one place |
| Stack | Next.js built with Claude Code, hosted on Vercel at pilihkayu.id |

**Ground rules**

- No invented testimonials, clients, numbers, certifications or history. Only the facts listed under Copy & content rules.
- Every render is labelled "Visualisation"; a render is never presented as a finished real project.
- No customer login, payments, live inventory, file uploads or production tracking. Drawings are sent on WhatsApp.
- No non-functional buttons. "Coming soon" is a labelled, disabled state.
- Mobile first: almost every visitor arrives on a phone.

## Audiences & flows

Four kinds of visitors arrive. Each gets a page that speaks to them, and all of them end in the same two actions.

| Audience | Usually arrives from | Lands on | What they need to see | Main action |
| --- | --- | --- | --- | --- |
| Architects & interior designers | Instagram DM, referral, Instagram bio | /for-architects | Material and construction expertise, drawings, samples, factory, projects | Partner chat on WhatsApp |
| Contractors | Instagram DM, Google, referral | /for-contractors | Direct factory pricing, lead times, reliability, coordination | Price list form or WhatsApp |
| Owners | Instagram, Google | Home, product pages, /projects | The look, trust, simple options, how it works | Discuss project on WhatsApp |
| Exploring / vendor scouting | Any | /welcome, /factory | Proof: heritage, facility, certifications, volume of work | Download catalogue |

&#91;embedded content: visitor flow · 5 entry points, 2 actions\]

Outreach messages link straight to /for-architects or /for-contractors, so a DM lands on the page made for that reader.

## Sitemap & URLs

V1 has 13 pages. Flooring and skirting share a page (skirting finishes a floor); ceilings get their own.

**URL rules**

- Short, lowercase, real words you could say out loud: pilihkayu.id/flooring.
- Audience pages start with **/for-**: pilihkayu.id/for-architects.
- **/welcome** for the Instagram bio page: an invitation, not a step.
- Never rename a URL once printed or shared; if one must change, redirect the old one.
- Track sources with a tag on the same URL: /welcome?utm\_source=instagram, /welcome?utm\_source=qr.

| Page | URL | Purpose | Key sections | Main action |
| --- | --- | --- | --- | --- |
| Welcome (replaces lnk.bio) | /welcome | Instagram bio and QR landing; sorts visitors in one tap | Logo, one-line positioning, credibility strip, 4–5 buttons ("Coming soon" until live), short factory loop | WhatsApp or the right page |
| Home | / | First impression | Hero, what we make, why direct from factory, featured projects, 5-step process, factory proof | Discuss your project (WhatsApp) |
| Our Factory | /factory | Who makes it | Heritage, facility facts, production process in 3 parts, certifications, footage | Download catalogue |
| Flooring & Skirting | /flooring | Ready-made floors | Flooring by species (teak, teak jumbo, mahony): render in a room, grain detail, specs, start-from price; patterns; finishes; matching skirting | Get price list or WhatsApp |
| Ceilings | /ceilings | Interior and exterior lumber ceilings | Species (teak, ulin), dimensions, construction drawing, finishes, Semarang example | Get price list or WhatsApp |
| Custom-Made | /custom | Doors & frames, staircases, furniture | One section each (#doors, #staircases, #furniture): species, scope, production time | Send your drawings (WhatsApp) |
| Projects | /projects | All work in one grid | Count, filters, tags (see Projects) | Open a project |
| Case study: Semarang | /projects/residential-semarang-yh-2026 | Full-house proof | See Projects | Discuss a similar project |
| Case study: Furniture heritage | /projects/furniture-heritage | Furniture craft and history | See Projects | Send your drawings |
| How We Work | /how-we-work | Process questions answered | 5 steps, what to prepare, payment terms, delivery areas, FAQ | Start a project (WhatsApp) |
| For Architects & Designers | /for-architects | Specifier landing | Material and construction guidance, construction drawings, samples, factory visit | Partner with us (WhatsApp) |
| For Contractors | /for-contractors | Buyer landing | Direct factory pricing, lead times, coordination, repeat orders | Partner with us (WhatsApp) |
| Catalogue | /catalogue | Download + lead capture | Direct download, optional form for latest price list & spec sheet | Download / submit |

Also: a 404 page pointing to /welcome and WhatsApp, and a footer with WhatsApp, email, Instagram and certification marks.

## Projects

All work lives on one page, /projects, so the volume of work is visible at a glance instead of spread thin across pages.

**The grid**

- One grid with a visible total, e.g. "14 works".
- Filter chips by type: Residential, Commercial, Furniture. Types with no entries stay hidden.
- Product tags on every entry: Flooring, Ceilings, Doors & Frames, Staircases, Skirting, Furniture. A project shows up under every product it uses.
- Two kinds of entry, same card design:
  - **Case study**: opens a full page.
  - **Single work** (a furniture piece or set): opens a photo viewer with a short caption (piece type, species where known).
- One project is never split into several cards to inflate the count.

**Case study 1: Residential, Semarang, Mr. YH, 2026** (/projects/residential-semarang-yh-2026)

- Status: installation in progress.
- Scope: ceilings (interior and exterior), flooring, staircase, doors & frames, skirting.
- Sections: overview, scope by product (species, construction, finish), labelled visualisations, progress photos added over time.
- Featured on the home page as the full-house example. The write-up is finished at handover.

**Case study 2: Furniture heritage** (/projects/furniture-heritage)

- The factory's history of making furniture, told as a story: what it has made, for which markets, how it's built.
- Lead with the 3–4 best photos plus factory footage or a line drawing; the rest appear as single works in the grid.
- Needs facts from Ronald (see Assets needed). Nothing is invented.

**Uneven photo quality**

- Consistent crops (one aspect ratio per grid) and a light, uniform colour correction so the set looks like one body of work.
- Weaker photos only at small and medium sizes, never full-width.
- Clients by initials only; no addresses.

## Visual direction

The look is an architect's drawing set brought to life: warm paper background, dark ink, thin lines, dimension marks, then polished renders for aspiration and real factory footage for proof.

**Colours (brand guide)**

| Role | Hex | Use | Share |
| --- | --- | --- | --- |
| Background | #F4EDE3 | Page background, generous whitespace | \~70% |
| Anchor dark | #2B1A12 | Headlines, body text, logo | \~20% |
| Supporting neutral | #5A3A28 | Secondary text, captions, muted UI | within the 20% |
| Deep accent | #6E2A2A | Primary buttons, section tags | \~10% combined |
| Accent metal | #B8863B | Dividers, certification marks, fine lines | within the 10% |
| Mid-century warm | #C1592C | Small highlights only | within the 10% |

Gold and terracotta are too light for body text on the background (about 2.8:1 and 3.8:1), so they're used for lines and large accents only.

**Typography**: Recoleta in letter-spaced capitals for section titles and short labels, regular Recoleta for headings; Inter for body, captions, forms and buttons. Decide before Phase 1: buy the Recoleta web licence or use the free Fraunces.

**Brand details**: the logo mark in Anchor Dark (top left, favicon); the two wood-texture swatches as thin bands or small panels, never behind long text.

**Image strategy: three kinds of image, each with a job**

| Kind | Job | Where |
| --- | --- | --- |
| Line illustrations | Brand language; shows construction know-how | Hero opening, product construction details, For Architects, How We Work |
| Renders, labelled "Visualisation" | Aspiration: what a finished room looks like | Hero, product pages (product in a room), case study |
| Real photos and footage | Proof: we make this ourselves | Factory, credibility strip under the hero, case study progress, furniture works, /welcome |

Rules:

- Every page with a claim ("we make", "since 1995") has real footage or photos nearby.
- Renders show the actual products and species from the catalogue, never invented designs.
- Real photos are shown only at sizes their quality supports.
- The handheld 1 m × 1 m sample photos stay on Instagram. On the site they're used only as small grain-detail crops, or reshot (see Assets needed).

**The hero (home page)**

1. A technical line drawing of a room section (teak floor with T&G, lumber ceiling, a staircase) draws itself in over about 1.2 seconds.
2. The drawing resolves into a labelled render of the same room in teak, matching the drawing's composition.
3. Headline, specific not a slogan: "Solid wood flooring, ceilings, doors and stairs, made to your drawings." Sub-line: "Direct from our factory, since 1995."
4. One dominant button, **Discuss your project** (WhatsApp). Download catalogue is a quieter text link.
5. Directly under the hero, a credibility strip: a short real factory loop beside the facts (since 1995, 11,000 m², 250+ craftspeople, SVLK / FSC / JAS).

Until the matching render exists, the hero uses the Semarang visualisation from the catalogue. Performance: the render is the first image to load (compressed AVIF), the drawing is inline SVG, and with reduce-motion on the final frame shows straight away.

## Motion & craft rules

Motion supports the drawings and gives feedback; it never replaces content or slows the page.

**Motion system**

- One easing curve and three durations: 150–200 ms for buttons and hovers, 300 ms for menus and popups, 500–700 ms for section reveals.
- Scroll reveals play once, never in reverse. No scroll-jacking or pinned sections that trap the scroll.
- Animate only transform and opacity, so motion stays smooth on mid-range phones.
- Line drawings draw in when they enter the screen; images fade up slightly.
- Feedback animates: button press, form sending (loading state), success tick, error on the field.
- With the phone's reduce-motion setting on, everything appears in its final state.

**Craft rules (checked at the end of every phase)**

- No filler badges or decorative labels ("Premium", "New", a tag above every heading).
- Drop redundant labels: no tag that repeats the heading under it.
- No random italic words inside headlines.
- Monospace only where it earns its place (spec values, if at all).
- Design-system tokens only: no one-off colours, sizes or radii.
- Show the actual product wherever possible; renders show real catalogue products.
- Main features get more size and space; group related items by spacing, not boxes.
- Headlines are specific: what, for whom, with a number where there is one.
- One primary button per screen, clearly the strongest element.
- One icon set, one stroke weight, one size scale.
- No ornament without a job.
- Nested corners: inner radius = outer radius − padding.
- Text contrast at least 4.5:1.
- Headlines wrap in balanced lines, with no single word alone on the last line.
- Align by eye, not pixels: optically adjust icons, numbers and quote marks.
- Tabular numbers for prices, dimensions and specs.
- Loading states for forms, downloads and video.
- Animate useful feedback only.
- No gradients, glassy cards, stock photos, emoji, generic icon grids, or slogans like "Elevate your space".

## Functions & data

Every page does one of four things: prove credibility, educate, capture a lead, or start a WhatsApp conversation with context.

**WhatsApp handoff**

- Every WhatsApp button opens a pre-filled Indonesian message naming the page and product, e.g. "Halo PilihKayu, saya tertarik dengan Teak Flooring (dari website)".
- One number, set in one settings file.

**Catalogue download (no wall, optional form)**

1. Tap Download catalogue and the PDF downloads straight away.
2. On the same screen, an optional form: *Want the latest price list & spec sheet?* Name, WhatsApp number, city, role (owner / architect / designer / contractor / other), product interest (optional).
3. On submit: a row in the Google Sheet, an email to Ronald, and a confirmation with a Continue on WhatsApp button pre-filled with their details.
4. Validation: Indonesian phone formats (08… or +62…), required fields marked, clear errors with Indonesian helper text, loading state while sending.

**Gentle popup**: one small bottom banner after 20 seconds or half a page of scrolling; easy to close and stays closed for 7 days; never on /catalogue or /welcome. Content: the founding-client offer once defined, until then "Get the latest price list".

**Analytics**: Google Analytics 4 for traffic and events, plus Vercel Speed Insights.

| Event | Fires when |
| --- | --- |
| whatsapp\_click | Any WhatsApp button; records page and product |
| catalogue\_download | PDF downloaded |
| lead\_form\_submit | Price list form sent |
| welcome\_button\_click | A button on /welcome is tapped; records which |
| project\_filter | A filter or tag on /projects is used |
| popup\_click / popup\_dismiss | Banner used or closed |

**Content files Ronald asks Claude to edit**: settings (WhatsApp number, email, catalogue file, "Coming soon" flags), products (specs, prices, species, production time), projects (entries, tags, photos), links on /welcome. Changes go to GitHub and Vercel republishes in about a minute.

**Speed & reliability targets**: mobile Lighthouse 90+; largest image visible in under 2.5 seconds on 4G; images in AVIF/WebP; videos short, muted, compressed, with a poster; zero broken links.

## Copy & content rules

Copy is English first, with short Indonesian helper text wherever a visitor has to understand or do something.

- **English** for headings, body and buttons.
- **Indonesian helper text** under form labels, error messages, button hints and key instructions, e.g. label "City", helper "Kota lokasi proyek".
- **WhatsApp pre-filled messages** in Indonesian.
- **Code and file names** in English.
- **Tone**: premium but approachable. Plain, specific, confident; short sentences; numbers over adjectives.

**Facts that may be used (confirmed by Ku Yos / Om Tung)**

- Since 1995; grew from a single sawmill into a full-scale woodworking company.
- 11,000 m² facility, 250+ skilled craftspeople, six kiln-drying chambers (120 m³ total), up to 300 m³ production per month.
- Exported to clients in Europe, Japan, Australia and the United States.
- SVLK 00055, FSC® COC-005695, JAS, shown with their logos.
- Product specs, start-from prices and production times as in the catalogue (prices updated after the 13 Nov meeting).

Anything not on this list stays off the site until it's confirmed.

## Assets needed

Assets are handed to Claude Code phase by phase. Each phase prompt asks Claude to list what it needs first.

| Asset | Used on | Format | Have it? |
| --- | --- | --- | --- |
| Logo: wordmark + mark, dark and light | Every page, favicon | SVG (or high-res PNG) |  |
| Brand & design guide | Design system | PNG/PDF | Yes |
| Recoleta web licence (or Fraunces) | Headings | Font files |  |
| Final catalogue PDF | /catalogue | PDF, under 10 MB | Later |
| Raw factory clips: rip saw, moulding, finger joint, laminate, sanding, sun drying, UV coating, assembly, hand finishing, storage, forklift, packing, loading | Credibility strip, /factory, /welcome | MP4, portrait OK, no text or music, 1080p+ | Yes |
| 3 edited process reels | /factory | MP4 | Yes |
| Factory stills: facility wide shot, wood stock, people at work (with consent) | /factory, Home | JPG |  |
| Renders, labelled "Visualisation" (see render plan) | Hero, product pages, case study | JPG/PNG, 2400 px wide+ | Partly (catalogue) |
| Flooring sample photos, reshot (see guide below) | Grain details on /flooring | JPG | Reshoot |
| Product photos: skirting, ceilings (teak, ulin), doors, staircase | Product pages | JPG | Partly |
| Semarang YH 2026 photos per product: interior and exterior ceiling, flooring, staircase, doors & frames, skirting | Case study, Home | JPG, progress now, finished later | Partly |
| Furniture photos (candid, past pieces) | Furniture works, heritage case study | JPG | Yes |
| Furniture heritage facts | Heritage case study | Text |  |
| Certification logos: FSC, SVLK, JAS | Footer, /factory | SVG/PNG |  |
| Contact details: WhatsApp, email, Instagram, office address (when decided) | Settings file | Text | Partly |

**Render plan**

1. **Launch with what exists**: the Semarang visualisations from the catalogue.
2. **Add AI-generated renders**: Claude writes the image prompts from real catalogue specs (species, board width, pattern, finish); you generate them in an image tool and pick the best. Each one is labelled "Visualisation" and shows only real products.
3. **Later, if budget allows**: one commissioned 3D render for the hero, by a 3D artist.
4. Whatever render is used in the hero, Claude Code traces its line drawing from it, so drawing and render always match.

**Reshooting the flooring samples (about 30 minutes)**

- Daylight near a window, no direct sun; turn off portrait mode and filters.
- Phone straight above the sample, steadied on a stack of books or a tripod; 1× lens; fill the frame.
- Clean off dust first; one shot per species and finish.
- One extra angled shot with light across the surface to show the grain.

**Furniture heritage facts to supply**

- Roughly when the factory started making furniture.
- What kinds of pieces (chairs, sofas, dining sets, others).
- Which markets they went to.
- Any notable volumes or long-running clients you're allowed to mention (types, not names).

## Metrics

The site is working if visitors turn into WhatsApp conversations and form leads, and those leads become real projects. Traffic alone means little at this stage.

| Metric | What it tells you | Where |
| --- | --- | --- |
| Visitors by source (Instagram, Google, direct, QR) | Which channels feed the site | GA4 |
| WhatsApp clicks ÷ visitors | Is interest turning into conversations? | GA4 events |
| Catalogue downloads and form submissions | How many leads you can follow up | GA4 + Google Sheet |
| Form completion (submitted ÷ started) | Is the form too long or confusing? | GA4 |
| Website leads that become Hot or Warm | Are the right people coming? | Leads sheet (Source = Website) |
| Most-tapped buttons on /welcome; filters used on /projects | What visitors want first | GA4 events |
| Top pages and exit pages | What interests them; where they give up | GA4 |
| Mobile load speed | Are people waiting too long? | Vercel Speed Insights |

No targets yet: collect one month of data, then set targets from your own numbers.

**Monthly 30-minute review**

1. Compare the numbers above with last month.
2. Read the last 10 website leads: where they came from, what they asked.
3. Ask every new lead "how did you find us?" and note it in the Leads sheet.
4. Pick one change to try next month, then compare.

## Build guide

Six steps. Steps 1–3 happen once, step 4 repeats per phase, steps 5–6 happen during specific phases.

### Step 1: Accounts (once, about 1 hour)

- [x] GitHub account
- [x] Vercel account, signed up with GitHub
- [x] Login for the registrar where pilihkayu.id was bought
- [x] Google account (pilihkayu.id@gmail.com for now) for the Leads Sheet and Analytics
- [x] Claude Code and Node.js installed on your computer
- [x] Font decision: Recoleta web licence or Fraunces

### Step 2: Project folder

1. Create an empty folder called `pilihkayu-website`.
2. Export this doc as Markdown and save it inside as `docs/spec.md`.
3. Create `CLAUDE.md` with the guardrails below.
4. Make an `assets/` folder and sort files in as you collect them (Claude Code optimises and renames them):
   - `brand/` (logo, brand guide, fonts, texture swatches, certification logos)
   - `clips/` (raw factory clips) and `reels/` (3 edited process reels)
   - `renders/` (catalogue visualisations, AI renders)
   - `flooring-samples/`, `products/`
   - `projects/residential-semarang-yh-2026/`, `projects/furniture/`
   - `catalogue/` (the PDF, when final)
5. Working rule: each phase is built on its own branch with a Vercel preview link; merging into main publishes it, only after your manual QA.

### Step 3: Skills

Install inside the project folder from the terminal:

| Skill | What it adds | When | Install |
| --- | --- | --- | --- |
| Impeccable | Design rules, anti-pattern checks, /impeccable audit and /impeccable polish; includes Anthropic's frontend-design | `/impeccable teach` once at Phase 1 (point it at docs/spec.md); audit + polish every phase | `npx skills add pbakaus/impeccable` |
| Emil Kowalski design engineering | Animation and interaction judgment | Hero, reveals, buttons, forms | `npx skills add emilkowalski/skill` |
| Vercel Web Interface Guidelines | Accessibility, keyboard, forms, motion and performance review | Before each phase goes live | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |

Not installed: Taste skill (overlaps with Impeccable and pushes back on Inter, your body font) and "awesome design" collections (other brands' systems; your guide already defines the design).

**CLAUDE.md** (Claude Code reads it at the start of every session):

```markdown
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
- If a skill conflicts with docs/spec.md or the brand guide, the spec wins (Inter stays the body font).

## Stack
- Next.js (App Router) + TypeScript + Tailwind on Vercel.
- Content in /content (settings.json, products.json, projects.json, welcome-links.json).
- Never hard-code the WhatsApp number, prices or links in components.

## Brand
- #F4EDE3 background, #2B1A12 text, #5A3A28 secondary, #6E2A2A buttons,
  #B8863B fine lines, #C1592C small highlights. Ratio 70 / 20 / 10.
- Gold and terracotta never for body text.
- Recoleta (letter-spaced capitals for section titles, regular for headings); Inter for body.
- Architectural look: grid, thin rules, numbered sections, line drawings.
- Follow the craft rules in docs/spec.md.

## Images
- Three kinds: line illustrations (brand), renders labelled "Visualisation" (aspiration),
  real photos and footage (proof). Real proof near every claim.
- Renders show real catalogue products only; never present a render as a finished project.
- Show photos only at sizes their quality supports; consistent crops and light uniform
  colour correction for project and furniture photos.

## Motion
- One easing curve; 150-200 ms UI, 300 ms overlays, 500-700 ms reveals.
- Transform and opacity only. Reveals play once. No scroll-jacking.
- Respect prefers-reduced-motion. Hero image loads before any video.

## Copy
- English primary; Indonesian helper text on form labels, errors, key instructions.
- WhatsApp pre-filled messages in Indonesian.
- Only facts listed in docs/spec.md. Clients by initials only.

## Never
- Login, payments, live inventory, file uploads, production tracking.
- Buttons that do nothing; "Coming soon" = disabled and labelled. Empty filters hidden.
- Changing a URL without a redirect. Secrets in code. New libraries without explaining why.

## Before handing over a preview
- Run the automatic QA list in docs/spec.md and report what passed, what was fixed, what's left.
```

### Step 4: One phase per prompt

```text
Read CLAUDE.md and docs/spec.md. We're doing Phase [N]: [name].
First, list what you need from me (assets, decisions). Wait for my answer.
Then build it on a new branch, run the automatic QA list, run /impeccable audit and
/impeccable polish, deploy a preview and send me the link with a short QA report.
Don't start the next phase.
```

| Phase | What gets built | What you provide |
| --- | --- | --- |
| 0. Setup | Project, content files, placeholder live on pilihkayu.id | GitHub and Vercel access, domain (step 6) |
| 1. Design system | Colours, type, buttons, form fields, section layouts, line-drawing style on a hidden /styleguide page | Logo, fonts, brand guide |
| 2. /welcome | The lnk.bio replacement, live | WhatsApp number, button list, 2–3 clips |
| 3. Home + /factory | Hero, credibility strip, process, facility facts | Hero render, clips, stills, reels |
| 4. /flooring, /ceilings, /custom | Product pages from the catalogue | Renders, product photos, reshot samples, prices |
| 5. /projects + 2 case studies | Grid with filters and tags, Semarang and furniture heritage pages | Project photos, furniture photos, heritage facts |
| 6. /how-we-work, /for-architects, /for-contractors | Process, FAQ, partner pages | Payment terms, FAQ answers |
| 7. /catalogue + lead form | Download, form, Sheet, email, WhatsApp handoff | Catalogue PDF, Sheet link (step 5) |
| 8. Finishing | Analytics, popup, search basics, 404, full QA | Analytics ID (step 6) |

### Step 5: Google Sheet for leads (Phase 7)

1. Create a Sheet called **PilihKayu Leads** with headers: Date, Name, WhatsApp, City, Role, Product, Page, Source.
2. Extensions → Apps Script; paste the script Claude Code gives you (adds a row and emails you).
3. Deploy → New deployment → Web app → Execute as: Me → Who has access: Anyone → Deploy, and approve permissions.
4. Copy the Web app URL.
5. Vercel → project → Settings → Environment Variables → `LEADS_WEBHOOK_URL` → redeploy.
6. Send a test form; check the row and the email.

### Step 6: Domain, analytics, Google

- **Domain (Phase 0):** Vercel → project → Settings → Domains → add pilihkayu.id and www.pilihkayu.id → add the DNS records Vercel shows at your registrar → wait for "Valid".
- **Analytics (Phase 8):** create a GA4 property and web stream for pilihkayu.id → copy the Measurement ID (G-…) → Vercel variable `NEXT_PUBLIC_GA_ID` → redeploy. Turn on Speed Insights in Vercel.
- **Search Console (after launch):** add pilihkayu.id and submit /sitemap.xml.

## QA

Claude Code runs the automatic checks before handing over a preview link; Ronald then checks what only a person can judge. A phase goes live only when both lists pass.

**Automatic, by Claude Code (every phase)**

- [ ] Build passes with no errors
- [ ] Every internal link and button leads somewhere real
- [ ] Lighthouse mobile 90+ for performance, accessibility and best practices
- [ ] `/impeccable audit` + `/impeccable polish` against the craft rules
- [ ] Vercel Web Interface Guidelines review (keyboard, labels, focus, forms, motion)
- [ ] Layout checked at 360, 768 and 1440 px wide
- [ ] Reduce-motion version works
- [ ] Text contrast at least 4.5:1
- [ ] Every render labelled "Visualisation"; copy checked against the allowed facts
- [ ] Short report: what passed, what was fixed, what's left for you

**Manual, by Ronald (on your phone, about 15 minutes)**

- [ ] Open the preview on mobile data, not Wi-Fi: fast, and feels right?
- [ ] First impression: would an architect trust this in 5 seconds?
- [ ] Tap every WhatsApp button: right number, right message
- [ ] Read every line: true, specific, sounds like PilihKayu; Indonesian helper text makes sense
- [ ] Images: right product, quality holds up at the size shown, renders look believable
- [ ] Forms (Phase 7 onward): one test; check the Sheet row and the email
- [ ] Someone who hasn't seen it (Ku Yos or a friend) finds the catalogue and contacts you without help

**Before launch only (manual)**

- [ ] pilihkayu.id and www.pilihkayu.id show the site with https
- [ ] Instagram bio switched to /welcome?utm\_source=instagram and tested from the Instagram app
- [ ] Google Analytics shows your own visit in the real-time view

## After launch & later phases

Do each update when its piece becomes available, by asking Claude Code to make the change.

**Links & contact**

- [ ] Confirm the WhatsApp number and test every WhatsApp button
- [ ] Instagram bio to pilihkayu.id/welcome?utm\_source=instagram, then cancel lnk.bio
- [ ] Switch each "Coming soon" button on /welcome to live as its page ships
- [ ] QR code to /welcome?utm\_source=qr on the catalogue (and the coaster later)
- [ ] @pilihkayu.id email in the footer and form notifications
- [ ] Office address and Google Business link once decided

**Content**

- [ ] Final catalogue PDF on /catalogue
- [ ] Start-from prices after the 13 Nov meeting (flooring mahony, skirting, ceilings)
- [ ] Semarang photos as installation progresses; finish the case study at handover
- [ ] More AI renders as products are added; a commissioned hero render when budget allows
- [ ] Founding-client offer as the popup message
- [ ] New projects added to the grid as they finish

**Monitoring**

- [ ] Submit the sitemap in Google Search Console
- [ ] A test form once a month
- [ ] First monthly metrics review 30 days after launch

**Later phases (add when there's a reason)**

| Feature | Add when |
| --- | --- |
| Quote basket / shortlist sent to WhatsApp | Product range and prices are stable |
| Guided project brief (drawings still via WhatsApp) | Missing info keeps slowing custom quotes |
| Wood & finish library | Good close-ups of each species and finish exist |
| Flooring estimator (m² + indicative price to WhatsApp) | Flooring prices are final |
| Internal enquiry board | The Sheet stops being enough (\~20+ active leads) |
| Editing panel (CMS) | Updates become weekly |
| Interactive showroom, client portal | Order volume justifies it |
