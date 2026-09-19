# Elevation UpScales — Owner Directive: Web V2 Design Finish Priority

**Status:** ACTIVE / OWNER PRIORITY  
**Date:** 2026-09-15 MDT  
**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Lane:** Web V2 Development / Visual Completion

## Owner direction

The website design is behind schedule and must be finished now.

Until the customer-facing Web V2 design is owner-reviewable, Web V2 visual completion is the **highest unblocked execution priority**.

This directive changes sequencing, not truth controls.

## Finish target

Use the existing owner-recovery branch and accepted visual direction. Do not restart architecture or redesign from scratch.

Immediate finish sequence:

1. preserve the recovered SOK homepage hero;
2. preserve the recovered owner-approved store hero;
3. eliminate launch-visible unfinished/blank media presentation on desktop and mobile;
4. make unresolved supplier media look intentionally held rather than visually broken;
5. keep exact product, supplier, MAP, stock, shipping and orderability truth intact — never invent product photography or availability to make the page look finished;
6. run the four-view owner QA set: `/` and `/store` at desktop and 390px mobile;
7. return the finished four views to Casey for visual approval;
8. after Casey approves, forward-port only the accepted visual delta to exact current `main`, preserve current commerce/cart/checkout/order/release architecture, QA, merge, build the immutable candidate, smoke-test and promote the same tested version.

## Scope expansion from prior Phase A

The former sequencing that deferred visible media cleanup until after cutover is superseded **only where the current launch-visible page still looks unfinished**.

Authorized now:

- home/store visual polish required to reach owner-review quality;
- safe presentation of missing/unverified media;
- responsive/mobile visual cleanup;
- already-approved/local visual asset mapping;
- narrow CSS/client behavior needed to prevent broken-image or blank-card presentation.

Still not authorized without separate owner direction:

- commerce architecture rewrite;
- cart/checkout/payment redesign;
- supplier-truth inference;
- fabricated product imagery;
- new paid acquisition;
- broad admin/Ops redesign.

## Execution rule

**FINISH THE DESIGN → PROVE DESKTOP + MOBILE → CASEY VISUAL APPROVAL → FORWARD-PORT → RELEASE.**

Do not allow unrelated blocked work to stop this lane.
