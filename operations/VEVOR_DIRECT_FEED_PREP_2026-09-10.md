# VEVOR DIRECT FEED PREPARATION — 2026-09-10

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Status:** CLOSED / FEED PREP + A/B ACTIVATION COMPLETE  
**Controlling SOP:** `operations/VEVOR_VENDOR_MASTER_SOP.md` v1.1  
**Parent state:** `operations/VEVOR_RENOGY_ACTIVATION_STATE_2026-09-10.md`

## Purpose

This file began as the preparation gate for the direct-VEVOR dropship catalog lane. The preparation dependency is now satisfied. It is retained as the public-safe reconciliation receipt for the feed-prep and first two catalog activation tiers.

## Completed supplier/account baseline

- VEVOR PRO registration/onboarding baseline: COMPLETE.
- Direct VEVOR product feed: RECEIVED and reconciled into the dedicated VEVOR working set.
- Original supplier master remains preserved as source evidence; working derivatives do not replace it.
- Direct VEVOR and Doba-sourced VEVOR remain separate sourcing/authorization lanes.
- Elevation direct-site / Shopify is the approved VEVOR direct-account sales lane unless written supplier authorization expands channel eligibility.
- Final tax-exemption review remains WAITING / nonblocking. Protected tax/account identifiers and documents stay outside public Git.

## Catalog reconciliation receipt

Curated launch set: 40 products.

- Tier A — Core Launch: **19/19 catalog activation gate CLOSED**.
- Tier B — Strong Expansion: **17/17 catalog activation gate CLOSED**.
- Tier C — Supporting: **4 candidates NOT YET ACTIVATED**; review only after active enrichment/fulfillment controls are stable.

### Tier B verification completed 2026-09-10

All 17 B-tier records passed:

1. exact direct VEVOR SKU/model identity;
2. live VEVOR public selling-price check;
3. feed MAP / applicable price-floor comparison;
4. live selected-SKU purchase-state sellability check;
5. Shopify duplicate gate before creation;
6. direct-VEVOR Shopify record creation;
7. exact Shopify SKU/price readback;
8. explicit ACTIVE status readback;
9. intended Shopify publication readback.

The pre-create Shopify duplicate gate returned 0/17 direct-SKU duplicates.

A write-state mismatch was caught during verification: the creation response indicated ACTIVE, but authoritative Shopify reads returned DRAFT. The affected B-tier products were explicitly updated to ACTIVE, publication was rerun, and final authoritative reads verified the corrected status and publication state for all 17.

## Live VEVOR sellability interpretation

VEVOR product pages can show an `Out of Stock` label inside a variant/configuration selector while the exact selected SKU's actual purchase block still reports `In Stock` and presents normal purchase actions.

Operational rule:

**EXACT SKU IDENTITY → SELECTED SKU PURCHASE BLOCK → LIVE SELLABILITY DECISION**

Do not hold a SKU solely because selector/link text conflicts with the selected SKU purchase block. If exact SKU or purchase-state evidence is genuinely ambiguous, hold only that SKU as MANUAL CONFIRMATION and continue the rest of the queue.

## Pricing control

For every direct VEVOR SKU:

**LIVE VEVOR SELLING PRICE CHECK + FEED MAP CHECK → USE THE HIGHER APPLICABLE FLOOR**

Feed values remain snapshots. Re-verify price/MAP and live sellability again when a real supplier order is being placed.

## Current open work

### ACTIVE

1. A/B supplier-media and product-presentation enrichment.
2. Collection / merchandising consistency verification.
3. Fulfillment-detail closeout:
   - blind shipping;
   - packing-slip treatment;
   - returns;
   - customer-support responsibility;
   - exact supplier-tracking → customer-tracking handoff.
4. First live paid-order proof when triggered by an actual VEVOR customer order.

### WAITING / NONBLOCKING

- final VEVOR tax-exemption review result.

### NOT YET ACTIVE

- Tier C supporting-product activation.

## Close condition for the wider VEVOR integration

This feed-prep file is CLOSED, but the wider VEVOR integration remains ACTIVE until the first live paid direct-site VEVOR order proves the full operating path:

**CUSTOMER PAID ORDER → ELEVATION SHOPIFY / OPERATING SYSTEM → LIVE SKU/PRICE/STOCK RECHECK → VEVOR PURCHASE → SUPPLIER TRACKING → CUSTOMER TRACKING / FULFILLMENT UPDATE → COMPLETION / ACTUALS**

## RUN pointer

**A/B MEDIA + PRESENTATION ENRICHMENT → FULFILLMENT DETAIL CLOSEOUT → FIRST LIVE ORDER PROOF WHEN TRIGGERED → C-TIER REVIEW**

Do not restart supplier qualification, feed intake, A-tier activation, or B-tier activation unless a specific verified change reopens an affected SKU or policy lane.
