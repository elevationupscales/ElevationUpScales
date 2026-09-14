# Elevation UpScales — Shopify Multi-Vendor Execution Plan — DRAFT

**Date:** 2026-09-13  
**Owner:** Casey Young  
**Lane:** Shopify Store Operations  
**State:** DRAFT / NOT YET CONTROLLING  
**Purpose:** Stage the next Shopify conversion workflow without changing vendor authority, pricing authority, payments, or live product state merely because this draft exists.

## Owner objective

Build Shopify into a deliberate Elevation commerce experience rather than a generic catalog:

**TRUSTED STOREFRONT → VERIFIED VENDOR CATALOG → CLEAR PRODUCT PRESENTATION → PURCHASEABILITY → FULFILLMENT → ACTUAL CONTRIBUTION → SCALE WINNERS**

Run two coordinated workstreams:

1. **Shopify Storefront Design Worker** — owns theme/presentation only.
2. **Vendor Manager Shopify Worklists** — SOK, Renogy, VEVOR and Kingboss each own vendor truth and return Shopify-ready activation decisions.

The Shopify Store Operations lane remains the activation/verification point. Vendor managers do not independently rewrite the storefront theme, checkout, payment settings, or another vendor's products.

## Current live starting point

### SOK

- Nine intended SOK products are live and purchaseable.
- Current P0 purchaseability recovery is PASS.
- Prices were verified against the controlling SOK MAP schedule.
- Shopify `CONTINUE` behavior is intentionally preserved for authorized SOK preorder/backorder purchaseability.
- Current next task is merchandising/conversion presentation, not another availability rebuild.

### Renogy

- Live Shopify Admin currently shows **1 ACTIVE Renogy product**: Adventurer Li 30A PWM Solar Charge Controller with LCD.
- The prior live RBM500 record is currently DRAFT and no longer public.
- Shopify contains a large existing Renogy DRAFT population, including the 50-product profitability-prequalified staging cohort. Do not recreate those records.
- Owner pricing direction for the current launch work: use **MSRP as the target public price**, subject to controlling current Renogy dealer/MAP/channel rules and positive contribution.
- Owner launch preference: begin with products **roughly around $100** before expanding into higher-ticket items.
- Current near-$100 draft wave:
  - `RSP100DCT-US` — Renogy 100W N-Type Bifacial Solar Panel — current Shopify staging price $99.99.
  - `RBM500-US` — Renogy 500A Battery Monitor with Shunt — current Shopify staging price $87.99; current `Backorder Review` tag requires resolution before republication.

### VEVOR

- Existing Shopify catalog must be tuned from current verified records rather than rebuilt.
- Vendor manager must return exact current sellability, fulfillment and channel truth SKU-by-SKU before Shopify expansion.
- No blanket preorder/backorder assumption.

### Kingboss

- Treat as pre-launch / controlled vendor lane until its exact source, commercial and channel gates are cleared.
- Do not use Kingboss to substitute for SOK products or specifications.

## Parallel workstream A — Storefront presentation

The Storefront Design Worker receives a bounded theme-only assignment:

1. recon the current live Shopify theme on desktop and mobile;
2. remove the stock illustrated homepage hero and generic `Browse our latest products` presentation;
3. replace the generic `Welcome to our store` announcement with approved Elevation messaging or remove it;
4. establish a clear Elevation hierarchy for Batteries, Solar & Charging, RV/Off-Grid support and Projects/Support;
5. create a compact trust layer using only verified company/vendor facts;
6. feature SOK as the primary battery lane and Renogy as the primary solar/charging/inverter/monitoring lane;
7. keep VEVOR as a supporting equipment/accessory lane rather than letting it dominate the company identity;
8. add a consistent near-purchase trust block on product pages for verified availability, shipping, warranty/support and fulfillment relationship;
9. preserve current checkout, card and PayPal paths;
10. return desktop/mobile screenshots and a bounded QA receipt before any theme publication.

The worker must not alter vendor prices, SKUs, inventory/orderability, product status, payment configuration, shipping rules or vendor claims merely to improve appearance.

## Parallel workstream B — Vendor Shopify conversion loops

Each vendor manager returns one Shopify-ready row per candidate SKU using the Vendor Conversion Standard draft.

Required vendor-manager handoff fields:

- exact Elevation SKU;
- exact supplier item/model identity;
- current channel permission;
- current target price and controlling MAP/price rule;
- protected cost checked privately, never written to public Git;
- current supplier orderability state;
- exact preorder/backorder authority if applicable;
- fulfillment source;
- shipping treatment and realistic customer-facing delivery range where verified;
- approved product-media source;
- exact warranty/support reference or held wording;
- Shopify record already exists? yes/no;
- recommended action: ACTIVATE / KEEP ACTIVE / HOLD / RETIRE;
- exact hold reason if held.

## Immediate execution order

### P0 — Renogy expansion

1. Preserve current active Adventurer 30A.
2. Do not create new Renogy records until existing drafts are reconciled.
3. Work the current near-$100 wave first:
   - `RSP100DCT-US` — first activation candidate.
   - `RBM500-US` — resolve why `Backorder Review` is active and reverify dealer-authoritative orderability before republication.
4. For each candidate verify:
   **EXACT SKU → DEALER ORDERABILITY → PRICE/MAP RULE → POSITIVE CONTRIBUTION → APPROVED MEDIA → SHIPPING → WARRANTY/SUPPORT → ONLINE STORE → LIVE PDP/CART/CHECKOUT QA.**
5. If one SKU is blocked, hold only that SKU and continue to the next near-$100 candidate.
6. After the near-$100 wave, advance additional existing drafts in small verified batches rather than publishing the entire staging cohort.

### P1 — SOK conversion presentation

Use the already-green nine-SKU catalog as the proof set for the storefront design system:

- strong official product imagery;
- authorized SOK dealer relationship language where verified;
- clear Lower-48 direct-ship presentation;
- visible warranty/support block;
- preorder/backorder clarity without claiming reserved supplier stock;
- system cross-sells into verified Renogy charging/solar/inverter products;
- project-support CTA where useful.

Do not reopen SOK payment/purchaseability unless a fresh live defect occurs.

### P2 — VEVOR catalog tuning

Vendor manager audits current public Shopify VEVOR records, returns clean/hold actions and prioritizes reliable sellable supporting products. Do not expand merely to increase product count.

### P3 — Kingboss pre-launch preparation

Prepare Shopify-ready exact-SKU records only after vendor-source truth and channel controls are accepted. No public activation from incomplete source material.

## Storewide conversion standards

Every public product should converge toward:

**EXACT PRODUCT → CLEAR BENEFIT → VERIFIED AVAILABILITY → REALISTIC DELIVERY → WARRANTY/SUPPORT → TRUSTED SUPPLIER RELATIONSHIP → ADD TO CART → CARD/PAYPAL → CROSS-SELL/NEXT PROJECT ACTION**

Use exact vendor photography and assets. Do not AI-redraw supplier product photography or mix vendor specifications.

## Completion target

This draft workflow matures when:

- the generic Shopify stock hero is removed and replaced by an approved Elevation storefront presentation;
- SOK remains fully purchaseable and is presented as the primary battery lane;
- Renogy has a clean, expanding direct-site assortment built from verified existing drafts, beginning around the $100 price point;
- VEVOR supports the store without overwhelming company positioning;
- Kingboss is staged safely for later activation;
- every newly activated SKU passes live PDP → cart → checkout smoke testing;
- actual orders are routed to the correct vendor and contribution is recorded.

**CONTROL:** `DESIGN IN PARALLEL → RENOGY FIRST EXPANSION → SOK TRUST PRESENTATION → VEVOR TUNE → KINGBOSS PREP → LIVE QA → REAL ORDER → PROFIT RECEIPT → ITERATE.`
