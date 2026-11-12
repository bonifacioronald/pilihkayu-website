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
