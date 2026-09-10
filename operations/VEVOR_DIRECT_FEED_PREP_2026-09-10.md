# VEVOR DIRECT FEED PREPARATION — 2026-09-10

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Status:** ACTIVE / P1 / PREPARATION IN PROGRESS  
**Parent state:** `operations/VEVOR_RENOGY_ACTIVATION_STATE_2026-09-10.md`

## Purpose

Prepare the direct-VEVOR dropship catalog lane without requalifying VEVOR, mixing Doba evidence into the direct relationship, or publishing before source truth is verified.

## Current verified supplier direction

VEVOR has provided:
- VEVOR PRO registration path;
- a direct product-feed workbook link;
- a rule that Elevation's selling price may not be below VEVOR's current selling price;
- U.S.-warehouse dropship fulfillment for the independent-website model;
- tax-exemption setup through the VEVOR account;
- current restriction against Amazon, Walmart, eBay, and other major third-party marketplaces unless later authorized in writing.

## Immediate account-state verification

Peter / authorized human operator should capture the live VEVOR PRO state before catalog activation:
- registration complete: YES / NO;
- business profile complete: YES / NO;
- account/pro level shown;
- active purchasing discount state;
- tax-exempt status: APPROVED / PENDING / NOT SUBMITTED / REJECTED;
- purchasing/order path verified;
- shipping/service-area limitations shown in account;
- return/customer-service terms available in account;
- direct product feed downloaded successfully;
- date/time of verification;
- screenshots or exported source evidence retained outside public Git when they contain protected account information.

Do not place credentials, tax documents, private discount percentages, account identifiers, or sensitive screenshots in public Git.

## Direct-feed intake gate

The supplier-provided workbook is the canonical starting source for direct-VEVOR catalog reconciliation. Do not substitute Doba exports or existing Shopify VEVOR-branded products for this feed.

When the feed file is available to Company Operations:
1. preserve the original workbook unchanged as source evidence;
2. identify columns for VEVOR SKU/product identifier, title, category, selling price, availability/stock, product URL, image/media, specification/source data, shipping information, and any other supplier control fields;
3. normalize a working copy into the Master Catalog schema;
4. separate direct VEVOR records from Doba-sourced VEVOR records;
5. flag missing source data rather than guessing;
6. apply the VEVOR selling-price floor before any publish-ready status;
7. retain direct-site-only channel eligibility unless written marketplace permission exists.

## Initial 20–40 product working set

Selection should prioritize products that fit Elevation's current direct-site lanes:
- solar charging and solar accessories;
- power conversion / electrical support equipment;
- RV and mobile-power accessories;
- backup-power support equipment;
- refrigeration / cooling support;
- water / pumping / plumbing utility products;
- heating / climate support where appropriate;
- off-grid tools and utility equipment;
- outdoor / property-use products aligned with Elevation's existing catalog.

Selection rules:
- exact direct-VEVOR source mapping required;
- current VEVOR selling price captured as the floor input;
- current availability/source state required;
- adequate supplier media/specification evidence required;
- shipping/fulfillment path must be supportable;
- no unsupported certifications or compatibility claims;
- avoid duplicate clutter where an existing product already serves the same lane unless the VEVOR offer materially improves assortment, price, or fulfillment;
- keep products in DRAFT / HOLD until all required gates are verified.

## Pricing control

For each candidate:

**ELEVATION SELLING PRICE >= CURRENT VEVOR SELLING PRICE**

A candidate is HOLD if the current VEVOR selling-price input cannot be verified.

Do not use stale Doba retail pricing, previous Shopify pricing, or an older supplier quote as proof of the current direct-VEVOR price floor.

## Channel control

Allowed now:
- ElevationUpScales.com / Shopify direct-site sales.

Blocked unless later authorized in writing by VEVOR:
- eBay;
- Amazon;
- Walmart;
- other third-party marketplaces.

Doba channel permissions, if any, do not transfer to the direct VEVOR relationship.

## Order-flow close requirement

VEVOR integration cannot be marked CLOSED until a live paid direct-site VEVOR order follows the operating path:

**CUSTOMER PAID ORDER → ELEVATION OPERATING SYSTEM / SOP-STORE-INT-001 → VEVOR PURCHASE → SUPPLIER TRACKING → CUSTOMER TRACKING / FULFILLMENT UPDATE → COMPLETION / RECONCILIATION**

The first live order must preserve exact supplier and SKU mapping and be actionable from the Elevation order record.

## Current blocker / dependency

Company Operations can prepare the schema, selection rules, and reconciliation method now. Final row-level feed reconciliation depends on obtaining the actual direct VEVOR workbook file from the supplier link / VEVOR account path.

Peter's existing assignment already requests live account-state verification and return of the direct feed. Do not send a duplicate assignment merely because this preparation file was created.

## Next

1. Receive Peter's live VEVOR PRO account-state receipt and direct feed file.
2. Reconcile the feed into the Master Catalog working layer.
3. Produce the first 20–40 candidate set with READY / HOLD reasons.
4. Keep Renogy parked in WAITING until Renogy sends an approval, decline, or material request.
