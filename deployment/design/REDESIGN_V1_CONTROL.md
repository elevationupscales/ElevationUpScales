# Elevation UpScales Visual Redesign V1 — Control & Rollback

## Status

`NON-PRODUCTION DESIGN EXPERIMENT`

Parent clean production baseline:

`0f343f281e72ddf102c5174b02e8c4a0a8dbf1d7`

Branch:

`design/website-visual-redesign-2026-09-05`

## Purpose

Translate the approved Elevation/SOK tropical off-grid visual direction into a real ecommerce interface while preserving the clean production application's business behavior.

The interaction model borrows high-level shopping patterns observed on mature battery ecommerce sites: simple category browsing, application-first merchandising, visible filters, large product imagery, clear availability/action hierarchy, and fast routes into support. It does not copy external source code, proprietary imagery, product claims, or page text.

## Design-only architecture

The redesign is intentionally implemented as a late presentation overlay:

- `site/redesign-v1.css` — global visual tokens, header, homepage and shared public styling
- `site/redesign-v1-pages.css` — storefront/product/page-specific presentation
- `site/redesign-v1.js` — presentation-only DOM enhancements and browse navigation
- `site/site-shell.js` — one append-only public loader block marked `EUS_VISUAL_REDESIGN_V1_LOADER`
- `deployment/design/apply-redesign-loader.py` — idempotent migration used to append the loader safely

`site/script.js` and `site/sok-batteries.html` were restored byte-for-byte to the accepted production versions after the shared shell loader was installed.

No Worker, D1, API, auth, checkout logic, PayPal logic, supplier integration, Catalog source-of-truth, Hawaii freight engine, or routing contract is changed by this design pass.

## Preserved contracts

- Start a Project remains available and prominent.
- Public phone remains `208-813-4998`.
- Public email remains `casey@elevationupscales.com`.
- Authorized SOK Energy Dealer wording only.
- SOK MAP / public pricing controls remain server/data authoritative.
- Purchase Options remains Product → Quantity → Destination → Contact → Submit.
- SOK 1–3 / 4+ behavior remains unchanged.
- Marketplace remains separate from Catalog.
- Technician Portal remains separate.
- No database/schema/data/binding/secret changes.

## Header experiment

The branch hides the legacy emblem visually in the public header and restyles the existing text wordmark into the white/cyan energy/logistics treatment. The source logo asset and markup remain in place, making approval or rollback trivial.

## Shopping changes

Presentation additions include:

- persistent Power & Shop category rail;
- homepage Shop by Solution expansion covering Lithium, SOK, Solar, Hawaii, RV, Backup and Commercial;
- stronger SOK merchandising and existing voltage/use filters;
- larger product imagery and denser scan-friendly cards;
- improved RV collection search/category/sort presentation;
- two-column premium product detail presentation on desktop;
- Hawaii Logistics availability badge where appropriate;
- simplified browse-first CTA hierarchy;
- consistent dark navy / cyan ecommerce language across public pages.

## Revert

Production is untouched while this branch is in review.

To discard the experiment now: delete the branch.

If later merged and a visual rollback is required:

1. restore `site/site-shell.js` from baseline `0f343f281e72ddf102c5174b02e8c4a0a8dbf1d7`;
2. delete `site/redesign-v1.css`;
3. delete `site/redesign-v1-pages.css`;
4. delete `site/redesign-v1.js`.

That fully removes the redesign loader and presentation layer.

No DB, Worker, checkout, API, freight, auth, supplier, or production-data rollback is required.

## Preview gate

Before any production consideration:

- canonical source QA;
- public route smoke;
- Admin 401 / runtime 404 regression;
- SOK catalog and Purchase Options smoke;
- lithium/Hawaii route smoke;
- RV/store/product browsing smoke;
- Solar Builder / Start a Project / checkout presentation load through shared shell;
- desktop/mobile visual review;
- no horizontal overflow;
- no active 719 Elevation contact route;
- current clean production remains rollback baseline.
