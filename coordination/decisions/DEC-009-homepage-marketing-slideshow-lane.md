# DEC-009 — Homepage Marketing Slideshow Lane

**Date:** 2026-09-05  
**Status:** OWNER-DIRECTED / CONTROLLING FOR HOMEPAGE MARKETING CREATIVE

## Decision

The prior attempt to achieve the target storefront appearance through a broad hardcoded homepage/storefront redesign is no longer the preferred visual path.

The homepage will use a **landscape marketing slideshow** as the primary interchangeable creative lane.

This slideshow is intended to carry current marketing artwork without requiring a homepage HTML redesign each time the campaign changes.

## Creative format

- target creative ratio: Facebook-cover-style landscape;
- canonical working canvas: **1640 × 624**;
- important logo/text content should remain inside the central safe area;
- slideshow background should not force portrait/mobile-style artwork;
- artwork may use the approved storefront identity where appropriate;
- Bull + Bear identity remains available for Apparel, internal and non-store applications under the existing brand split.

## Initial creative

The initial slideshow creative is the owner-approved Elevation UpScales storefront wordmark:

**ELEVATION UpScales Inc. — OFF-GRID POWER • SUPPLY • LOGISTICS**

Repository source:
`site/assets/brand/storefront-wordmark.webp`

The creative must be displayed without restyling, redrawing or altering the approved wordmark.

## Implementation rule

Homepage slideshow markup/runtime is generic.

Marketing rotation is controlled from:
`site/home-hero-slides.json`

New campaigns should normally require only:

1. add/localize an approved landscape creative asset;
2. add/reorder/disable its slide record in `site/home-hero-slides.json`;
3. run preview/visual QA;
4. release through the normal Deployment gate.

Do not rewrite homepage hero HTML for ordinary marketing rotation.

## Boundaries

This decision changes presentation only. It does not authorize changes to:
- Catalog/product truth;
- pricing or MAP controls;
- supplier inventory/cost;
- checkout or PayPal;
- Hawaii routing/freight controls;
- Admin/Portal architecture;
- production deployment gates.

## Worker ownership

- **Visual / Graphics Worker:** artwork preparation, visual standards, slideshow creative records, visual QA.
- **Deployment Worker:** preview/production deployment, production regression, rollback baseline and final release receipt.

## Supersession

For homepage marketing presentation, this decision supersedes earlier direction to keep pursuing the failed broad hardcoded redesign as the main route to visual fidelity.

Existing accepted commerce/runtime protections remain controlling.
