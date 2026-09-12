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
Return the strongest low-friction candidates from the already-live VEVOR Direct catalog. Reverify each selected exact SKU, current customer price/MAP control, supplier sellability and fulfillment before recommending promotion.

### SOK Project Operations Manager
Return the strongest Lower-48 direct-sale candidates from the controlled SOK catalog. Preserve SOK MAP, source, availability/backorder, and fulfillment rules.

### Renogy Branch Operations Manager
Five Shopify Renogy products are live-verified as DRAFT and must not be recreated. `RSP100DCT-US` and `RBM500-US` are the cleaner activation-QA candidates. `RBC2125DS-21W-US`, `RNG-INVT-2000-12V-P2-US`, and `RNG-CTRL-RVR40` retain the exact held questions recorded in the current Renogy source receipts. Use the authenticated Partner Portal read-only to resolve exact item/variant/orderability facts, attach exact approved media, refresh customer price/availability, and only return a Renogy product for promotion after its activation set clears.

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
