# Elevation UpScales — P0 First-Sale Promotion Candidate Routing

**Date:** 2026-09-11 MDT
**Owner:** Casey Young
**Priority:** P0 / #1 COMPANY PRIORITY
**State:** ROUTED / VENDOR FACT RETURN REQUIRED

## Purpose

The PayPal technical checkout path is live and first-real-paid-order proof is an external-event gate. Do not wait on that event before continuing finishable revenue work.

Return a combined first-sale promotion shortlist of **5–10 products total** using current dedicated vendor lanes. Do not create a new vendor manager and do not reopen completed onboarding.

## Required vendor inputs

### VEVOR Project Operations Manager
Return the strongest low-friction candidates from the already-live VEVOR Direct catalog. Reverify each selected exact SKU before recommending promotion.

### SOK Project Operations Manager
Return the strongest Lower-48 direct-sale candidates from the controlled SOK catalog. Preserve SOK MAP, source, availability/backorder, and fulfillment rules.

### Renogy Branch Operations Manager
A source-state conflict is open: `RENOGY_CATALOG_LAUNCH_BATCH_01_2026-09-10.md` records five staged Shopify DRAFT products, while `RENOGY_LOWER48_CATALOG_HAZMAT_SHOPIFY_RECON_2026-09-11.md` later reports zero Renogy products. Perform a live authenticated Shopify recheck before any recreate/import action. **Do not recreate the five prior records while the conflict is unresolved.** Only return a Renogy promotion candidate after the live state is reconciled and its per-SKU activation set is clear.

### Kingboss Project Operations Manager
Do not create placeholder promotion candidates until a verified catalog/source product set exists.

## Per-candidate acceptance fields

Each returned candidate must include vendor; exact SKU/model; customer title; current customer price; current MAP/price-control status; supplier sellability/availability; fulfillment path and destination limitations; current checkout path; verified economic/margin confidence; media/listing readiness; likely conversion rationale; exact blocker if any; and PROMOTE/HOLD recommendation.

## Ranking standard

Prefer products that are currently sellable and fulfillment-clean, lower-friction in price, useful across Elevation customer use cases, margin-safe under verified pricing, already listing/media ready, normal Lower-48 shippable without manual freight review, and ready for a real order now.

Do not prioritize a product merely because it is expensive, popular on a supplier site, or already listed.

## Return path

Vendor managers return only verified product facts and recommendations into their own project worktree/source. Operating System / Company Operations reconciles the combined 5–10 product promotion set and routes traffic only after the candidate set is clean.

**BLOCKED GOES TO THE BACK — FINISHABLE WORK MOVES FORWARD — NOTHING DISAPPEARS.**
