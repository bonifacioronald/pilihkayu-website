# Roadmap: launch a real v1, then grow it

Updated 16 Nov 2026. The site replaces the "Full website coming soon" holding page with a small,
complete v1, then adds the rest in releases. Each release is one or more phases from docs/spec.md,
built on its own branch with a preview, merged only after your phone QA.

## Where we are

| Phase | What | Status |
| --- | --- | --- |
| 0 | Setup, content files, domain | Done (live) |
| 1 | Design system + /styleguide | Done (merged 16 Nov) |
| 2 | /welcome + analytics | Done (live 17 Nov) |
| 3 | Home + /factory (About) | Built on phase-3-home-factory; merging it launches v1 |

## v1 launch: "the site is real"

Goal: everything a visitor from Instagram, WhatsApp, Google or the catalogue QR code needs in the
first 30 seconds. No "coming soon" page. Every link and button works.

| Phase | Page | What it does |
| --- | --- | --- |
| 2 | /welcome | Instagram bio and QR landing as an app-style opening screen: portrait film behind, Contact us (live), Download catalogue and the three role choices (greyed out until their pages ship), Explore the website. Replaces lnk.bio. |
| 3 | / (Home) | Hero, what we make (each product opens WhatsApp with its own message until its page exists), why direct from the factory, 5-step process, factory proof, closing call to action. |
| 3 | /factory (Our Factory = About) | Heritage since 1995, facility facts, production in 3 parts with footage, certifications. |
| 3+ | Launch basics | Header and footer with only live pages (the menu includes "Welcome", back to /welcome), 404, page titles and share images, sitemap.xml and robots.txt, Google Analytics + Vercel Speed Insights (pulled forward from Phase 8 so we measure from day one). |

Launch = Phases 2 and 3 merged together. pilihkayu.id then shows the real home page; Instagram bio
switches to /welcome?utm_source=instagram.

## After launch: one release per phase, in this order

| Release | Phase | Pages | Unlocks when you have |
| --- | --- | --- | --- |
| v1.1 | 4 | /flooring, /ceilings, /custom | Final prices (13 Nov meeting), reshot samples, product photos, renders |
| v1.2 | 5 | /projects + Semarang and Furniture heritage case studies | Mr. YH's permission, project photos per section, furniture photos and heritage facts |
| v1.3 | 6 | /how-we-work, /for-architects, /for-contractors, /for-owners (the three role choices on /welcome switch on here) | Payment terms, delivery areas, FAQ answers, samples and partner terms |
| v1.4 | 7 | /catalogue + lead form → Google Sheet + email + WhatsApp | Final catalogue PDF, Leads Sheet script URL |
| v1.5 | 8 | Popup banner, full QA, Search Console | Founding-client offer wording (optional) |

Later features (quote basket, flooring estimator, wood library, CMS…) stay in docs/spec.md,
"Later phases", and are added when there is a reason.

## How the site grows without rework

- **Navigation and footer read from content files**, with a `live` flag per page. A page appears in
  the menu the day it ships; nothing links to a page that doesn't exist.
- **/welcome buttons** live in content/welcome-links.json with a "Coming soon" flag each.
- **Home links to products by WhatsApp first**, then switches to the product pages in v1.1 by
  changing one field per product.
- **Projects** already have their data model (content/projects.json); v1.2 only adds photos and pages.
- **URLs are fixed now** (docs/spec.md, Sitemap & URLs) and never renamed without a redirect.
- **Analytics events** (whatsapp_click, welcome_button_click…) are wired from launch, so every
  later release can be measured against the month before.
