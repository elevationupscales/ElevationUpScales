# Homepage Marketing Slideshow — Corrective Deployment Handoff

**Date:** 2026-09-05  
**From:** Website Visual / Graphics Manager  
**To:** Deployment / Management  
**State:** OWNER CORRECTION ACTIVE / REBUILD REQUIRED  
**Production state:** UNCHANGED

## Why this handoff exists

The prior slideshow handoff was written only on the visual work branch, so Deployment workers reading the canonical `main` coordination plane did not inherit it.

The first isolated preview also passed file/runtime smoke but did not satisfy owner visual acceptance because only one slide was active. The runtime intentionally hides arrows, pagination and pause controls when there is one active slide, so the owner could not visibly verify a working slideshow.

That preview is therefore **not the accepted visual candidate** even though its automated smoke completed successfully.

## Controlling owner decision

Use a reusable landscape marketing slideshow in place of continuing the broad hardcoded homepage redesign.

- Canonical creative canvas: **1640 × 624**.
- First creative: approved `OFF-GRID POWER • SUPPLY • LOGISTICS` storefront wordmark.
- Initial launch: **at least three active slides** so slideshow behavior is visible and testable.
- Routine campaign rotation should be data-driven through `site/home-hero-slides.json` rather than homepage HTML rewrites.

Controlling decision:
`coordination/decisions/DEC-009-homepage-marketing-slideshow-lane.md`

## Corrective workstream

Visual branch to watch:
`work/home-hero-slides-0905-03-graphics`

The branch must be built from the current `main` **after this coordination update** so Deployment and Visual inherit the same parent.

Expected application delta:
- `site/index.html`
- `site/home-hero-slides.css`
- `site/home-hero-slides.js`
- `site/home-hero-slides.json`

A fresh isolated workflow/preview must verify:
1. three or more active slides;
2. visible next/previous controls;
3. visible pagination and pause control;
4. auto-rotation;
5. correct first-slide wordmark rendering;
6. desktop/mobile usability;
7. canonical commerce/SOK/Hawaii/checkout regressions remain clean.

## Deployment instruction

Do **not** release the earlier `HOME-HERO-SLIDES-0905-02` candidate as the owner-accepted slideshow.

Wait for the corrected `0905-03` branch receipt/preview evidence. When that passes, re-resolve current `main`, preserve newer Deployment work, run the standard release gate, and promote only under normal management authorization.

## Protected boundaries

No authorization is granted to change pricing, MAP, supplier cost/inventory, Catalog truth, PayPal/checkout, Hawaii routing, Admin/Portal, Marketplace or production data/schema.
