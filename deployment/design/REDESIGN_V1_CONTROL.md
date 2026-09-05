# Elevation UpScales Visual Redesign V1 — Control & Rollback

## Status

`NON-PRODUCTION DESIGN EXPERIMENT`

Parent clean production baseline:

`0f343f281e72ddf102c5174b02e8c4a0a8dbf1d7`

Branch:

`design/website-visual-redesign-2026-09-05`

## Purpose

Translate the approved Elevation/SOK tropical off-grid visual direction into a real ecommerce interface while preserving the clean production application's business behavior.

The interaction model borrows high-level shopping patterns observed on battery ecommerce sites such as simple category browsing, application-first merchandising, visible filters, large product imagery, availability/action hierarchy, and support links. It does not copy external source code, proprietary imagery, product claims, or page text.

## Design-only architecture

The redesign is intentionally implemented as a late presentation overlay:

- `site/redesign-v1.css` — visual theme only
- `site/redesign-v1.js` — presentation-only DOM enhancements
- `site/script.js` — tiny loader added after the existing contact/year behavior
- `site/sok-batteries.html` — adds existing `script.js` so the SOK catalog receives the same reversible overlay

No Worker, D1, API, auth, checkout, PayPal, supplier, Catalog source-of-truth, Hawaii freight engine, or routing contract is changed by this design pass.

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
- homepage Shop by Solution expansion;
- stronger SOK merchandising;
- high-contrast product cards;
- voltage/use filters already present in the application are restyled rather than replaced;
- Hawaii Logistics availability badge where appropriate;
- simplified browse-first CTA hierarchy.

## Revert

Production is untouched while this branch is in review.

To discard the experiment: delete the branch.

If later merged and a visual rollback is required:

1. restore `site/script.js` from the prior accepted production baseline;
2. restore `site/sok-batteries.html` from the prior accepted production baseline;
3. delete `site/redesign-v1.css`;
4. delete `site/redesign-v1.js`.

No DB, Worker, checkout, API, or data rollback is required.

## Preview gate

Before any production consideration:

- canonical source QA;
- public route smoke;
- Admin 401 / runtime 404 regression;
- SOK catalog and Purchase Options smoke;
- lithium/Hawaii route smoke;
- RV/store/product browsing smoke;
- desktop/mobile visual review;
- no horizontal overflow;
- no active 719 Elevation contact route;
- current clean production remains rollback baseline.
