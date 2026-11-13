# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Visitors arrive mostly on phones, already curious, from Instagram, WhatsApp, Google or a QR code on the printed catalogue. Four audiences:

- **Architects and interior designers** (specifiers): need material and construction expertise, drawings, samples, the factory and past work. Land on /for-architects from outreach DMs.
- **Contractors** (buyers): need direct factory pricing, lead times, reliability and coordination. Land on /for-contractors.
- **Owners**: need the look, trust, simple options and how the process works. Land on the home page, product pages or /projects.
- **Explorers and vendor scouts**: need proof of heritage, facility, certifications and volume of work. Land on /welcome or /factory.

## Product Purpose

pilihkayu.id is PilihKayu's credibility check and lead sorter. It has three jobs:

1. Prove PilihKayu is a real manufacturer: factory, heritage, certifications, process, volume of work.
2. Sort visitors by intent and hand them to WhatsApp (pre-filled message naming page and product) or the catalogue form, with their details attached.
3. Answer repeat questions (process, materials, payment) so the owner stops retyping them.

Success is WhatsApp conversations and form leads that become real projects, not traffic.

## Positioning

A solid-wood manufacturer selling direct from its own factory since 1995: 11,000 m² facility, 250+ craftspeople, export history to Europe, Japan, Australia and the United States, SVLK / FSC / JAS certified. It makes flooring, skirting and ceilings as a series, and doors, frames, staircases and furniture custom to the client's drawings.

## Operating Context

- Leads continue on WhatsApp; drawings are sent there, never uploaded to the site.
- The printed catalogue (docs/references/catalogue-pages/) is the sibling artifact; the site and catalogue share copy style, specs and visual language.
- Content is edited by asking Claude Code to change files in /content; Vercel republishes from GitHub main.
- Leads also go to a Google Sheet with an email notification (Phase 7).

## Capabilities and Constraints

- Stack: Next.js (App Router), TypeScript, Tailwind, hosted on Vercel at pilihkayu.id.
- No login, payments, live inventory, file uploads or production tracking.
- No non-functional buttons; "Coming soon" is a labelled, disabled state.
- Projects: many grid items, few detail pages. Only case studies get pages (Residential Semarang YH 2026; Furniture heritage).
- Later, not now: quote basket, guided brief, configurator, estimator, CMS.

## Brand Commitments

- Name: PilihKayu (logo: isometric mark plus PILIHKAYU / INDONESIA wordmark).
- Copy: English; short caps statement titles followed by one plain, specific paragraph, as in the catalogue. Indonesian only as short helper labels on CTAs and form fields. WhatsApp pre-filled messages in Indonesian.
- Tone: premium but approachable; plain, specific, confident; numbers over adjectives.
- Visual direction is defined in docs/design-system.md (Phase 1), which replaces earlier direction in docs/spec.md.

## Evidence on Hand

- Confirmed facts only (docs/spec.md, Copy & content rules): since 1995; single sawmill to full-scale woodworking company; 11,000 m² facility; 250+ craftspeople; six kiln-drying chambers (120 m³); up to 300 m³ per month; exported to Europe, Japan, Australia, United States; SVLK 00055, FSC® COC-005695, JAS.
- Catalogue specs, start-from prices and production times (docs/references/catalogue-pages/).
- Logo (assets/brand/). Photos, renders, factory clips and line art are pending and arrive after Phase 1.
- Absent and never to be invented: testimonials, client names (initials only), extra numbers, certifications or history. Every render is labelled "Visualisation".

## Product Principles

1. Proof sits next to every claim: real footage or photos near "we make" and "since 1995".
2. Every page ends in a WhatsApp conversation with context or a catalogue lead.
3. Show the actual product; renders show only real catalogue products and species.
4. Mobile first: the phone on mobile data is the main viewing condition.

## Accessibility & Inclusion

Text contrast at least 4.5:1 (large text 3:1); full prefers-reduced-motion support; keyboard and screen-reader access; touch targets at least 44 px.
