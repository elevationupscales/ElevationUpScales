# Website Graphics Manager Closeout — Homepage Marketing Slideshow

**Date:** 2026-09-05  
**Mode:** CLOSE OUT / HANDOFF TO NEXT WORKER  
**Production:** UNCHANGED

## Owner direction

Another worker will finish this work. Do not continue this Graphics Manager workstream in parallel.

The controlling owner direction is the reusable **1640 × 624 landscape homepage marketing slideshow** described in:

- `coordination/decisions/DEC-009-homepage-marketing-slideshow-lane.md`
- `coordination/handoffs/2026-09-05-homepage-marketing-slideshow-corrective-deployment-handoff.md`
- `ELEVATION_4_3_MASTER_STATUS.md`

## What was learned

The earlier slideshow preview appeared static because it had only one active slide. The runtime intentionally hides arrows, pagination and pause controls when only one slide is active. That preview is superseded and must not be treated as owner-accepted.

## Corrected tested candidate

A corrected three-slide implementation was built and tested on:

- branch: `work/home-hero-slides-0905-03-graphics`
- candidate SHA: `b97bd0e749fbc91c763f2602217517e597f16d62`
- isolated preview: `https://31ecf67f.elevationupscales.pages.dev`
- stable preview alias: `https://home-hero-slides-0905-03-pre.elevationupscales.pages.dev`

The workflow completed successfully and verified:

- 3 active slides;
- approved storefront wordmark remains slide 1;
- previous/next controls render;
- pagination renders;
- pause control renders;
- next-control interaction advances the active slide;
- full canonical QA passes;
- preview route regression passes;
- SOK/Hawaii/checkout/store/runtime smoke remains clean.

Relevant application files on that tested candidate:

- `site/index.html`
- `site/home-hero-slides.css`
- `site/home-hero-slides.js`
- `site/home-hero-slides.json`
- `.github/workflows/home-hero-slides-0905-03-preview.yml`

## Important lineage warning

Do **not** promote `b97bd0e...` directly.

Repository `main` advanced after that preview because the canonical coordination plane was updated. The next worker must resolve current `main`, rebuild/rebase the exact slideshow application delta onto that current lineage, then rerun preview before production.

A scaffolding branch named `work/home-hero-slides-0905-04-final` was created from the then-current main but contains **no slideshow application delta**. Treat it as disposable scaffolding, not a release candidate.

## Recommended next-worker sequence

1. Read current `main`, Master Status, DEC-009 and the corrective deployment handoff.
2. Confirm current production separately from repo main.
3. Create a fresh branch from current main.
4. Reapply the tested slideshow application delta from `b97bd0e...` without importing stale coordination state.
5. Use at least three active launch slides so slideshow controls are visibly testable.
6. Run the isolated slideshow preview gate plus canonical regression.
7. Present the preview for owner visual review.
8. Only after acceptance, pass the current-lineage candidate to Deployment for normal controlled production release.

## Boundaries

No pricing, MAP, supplier inventory/cost, Catalog truth, PayPal/checkout, Hawaii routing, Admin/Portal, Marketplace, database or production changes were authorized by this Graphics workstream.

**Graphics Manager workstream is now closed.**
