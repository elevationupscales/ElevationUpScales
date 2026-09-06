# DEC-009 — Homepage Marketing Slideshow Lane

**Date:** 2026-09-05  
**Status:** OWNER-DIRECTED / CONTROLLING FOR HOMEPAGE MARKETING CREATIVE

## Decision

The homepage will use a **landscape marketing slideshow** as the primary interchangeable marketing lane instead of continuing to pursue the failed broad hardcoded homepage redesign.

The slideshow is intended to carry current campaigns without requiring a homepage HTML rewrite each time marketing creative changes.

## Creative format

- canonical working canvas: **1640 × 624** Facebook-cover-style landscape;
- important logo/text content stays inside the central safe area;
- approved storefront identity may be used where appropriate;
- Bull + Bear identity remains available for Apparel, internal and non-store applications under the existing brand split.

## Initial launch requirement

The initial launch must contain **at least three active slides** so the owner can visibly verify that the marketing area is functioning as a slideshow. Controls, pagination and auto-rotation must be visible/functional when more than one slide is active.

A future campaign may intentionally use a single active slide only when that is an explicit marketing choice; that must not be mistaken for a broken slideshow.

## Initial creative

The first slide remains the owner-approved Elevation UpScales storefront wordmark:

**ELEVATION UpScales Inc. — OFF-GRID POWER • SUPPLY • LOGISTICS**

Repository source:
`site/assets/brand/storefront-wordmark.webp`

Additional launch slides may use already-approved local Elevation category/lifestyle media, with factual overlay copy and links to the matching storefront routes.

## Implementation rule

Homepage slideshow markup/runtime is generic.

Marketing rotation is controlled from:
`site/home-hero-slides.json`

Routine campaign updates should normally require only:

1. add/localize an approved landscape creative asset;
2. add/reorder/disable its slide record in `site/home-hero-slides.json`;
3. run preview/visual QA;
4. release through the normal Deployment gate.

Do not rewrite homepage hero HTML for ordinary marketing rotation.

## Acceptance rule

A deployment smoke test that only confirms the JSON/JS/CSS files exist is insufficient. Visual acceptance must also confirm in the rendered preview that:

- the first slide is visible;
- the active slide count is greater than one for the initial launch;
- next/previous controls and pagination appear;
- automatic rotation advances slides;
- the wordmark is not stretched or materially cropped;
- desktop and mobile layouts remain usable.

## Boundaries

This decision changes presentation only. It does not authorize changes to Catalog/product truth, pricing or MAP, supplier inventory/cost, checkout or PayPal, Hawaii routing/freight controls, Admin/Portal architecture, or production deployment gates.

## Worker ownership

- **Visual / Graphics Worker:** artwork preparation, slideshow configuration/runtime, visual QA and handoff.
- **Deployment Worker:** preview/production deployment, production regression, rollback baseline and final release receipt.

## Supersession

For homepage marketing presentation, this decision supersedes earlier direction to keep pursuing the failed broad hardcoded redesign as the main route to visual fidelity. Existing accepted commerce/runtime protections remain controlling.
