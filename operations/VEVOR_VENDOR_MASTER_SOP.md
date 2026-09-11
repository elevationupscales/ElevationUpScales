# Elevation UpScales — VEVOR Vendor Master SOP

**Status: ACTIVE / CONTROLLING VEVOR LANE**  
**Version: 1.1**  
**Effective: 2026-09-10**  
**Owner: Casey Young**  
**Human Ecommerce Manager: Peter Torres**  
**Parent:** `MANAGEMENT_OPERATING_SOP.md` and `VENDOR_ONBOARDING_AND_CATALOG_MERGE_SOP.md`

## Purpose

Establish one controlled operating source for the active VEVOR direct-account supplier, catalog, pricing/MAP, Shopify and fulfillment lane without creating a second company priority system or another competing top-level VEVOR project.

VEVOR is already beyond prospecting. The operating objective is:

**VERIFY SOURCE → CONTROL MAP / PRICE → VERIFY LIVE SELLABILITY → BUILD CATALOG → SELL → FULFILL → RECORD → SCALE**

This SOP is public-safe. Protected supplier costs, raw inventory, tax documents/identifiers, private correspondence, credentials, payment terms and other confidential commercial evidence stay outside the public repository.

## 1. Authority and role fit

Use the existing company authority chain:

**CASEY → OPERATING SYSTEM PROJECT MANAGER → COMPANY OPERATIONS → VEVOR PROJECT / PETER TORRES → DIRECT FUNCTIONAL MANAGERS / ROUTED WORKERS**

- Casey's newest explicit direction controls.
- The Operating System Project Manager owns reconciled overall project state and cross-project priority.
- Company Operations owns company-operational execution and routing.
- Peter Torres remains the Human Ecommerce & Vendor Operations Manager for VEVOR execution.
- The existing VEVOR Supplier, Catalog & Commerce Project remains the single VEVOR project. Do not create another top-level VEVOR manager or competing master state.
- Direct functional managers below are narrow workstream owners. They may maintain VEVOR-specific controls but may not override shared company SOPs or another manager's ownership.
- Workers execute routed actions and return evidence/state. They do not self-approve policy changes outside their assigned lane.

## 2. Direct VEVOR functional managers

### VEVOR MAP & Pricing Control Manager

Owns the VEVOR advertising-price control lane.

Responsibilities:
- maintain the applicable public-safe MAP/pricing rule;
- identify the exact VEVOR SKU/model being priced;
- verify the supplier-feed MAP reference;
- verify VEVOR's current public selling price immediately before publication or material price change;
- apply the higher applicable advertised-price floor;
- record verification date/source and affected SKU without exposing protected supplier cost;
- return an approved Shopify price instruction to the Shopify Operations Worker;
- re-open only affected SKUs when VEVOR price/MAP evidence changes.

This manager does **not** waive VEVOR MAP, invent extra MAP restrictions, expose wholesale cost, or publish Shopify changes by itself.

### VEVOR SOP & Change-Control Manager

Owns VEVOR-specific operating-procedure maintenance and change reconciliation.

Responsibilities:
- maintain this VEVOR master SOP and public-safe change history;
- reconcile verified VEVOR policy, fulfillment, channel, returns, tracking and operational facts into the applicable procedure;
- identify downstream impact on Shopify, catalog, fulfillment, customer support and other VEVOR workstreams;
- route company-wide conflicts to Company Operations / Operating System Project Manager;
- route genuine owner gates to Casey;
- prevent duplicated VEVOR SOPs or parallel priority boards.

Routine factual updates may be reconciled without rebuilding the full SOP. Material changes to channel authorization, MAP interpretation, contractual commitments, financing, exclusivity, major inventory investment or other owner-level commercial commitments remain owner-gated.

### Shopify Operations Worker — VEVOR execution lane

The Shopify Operations Worker is the execution layer for VEVOR direct-account catalog work under Peter / Company Operations.

Responsibilities:
- create and update VEVOR direct-account Shopify products after required source, MAP/price and live-sellability checks;
- organize approved products into Shopify collections;
- apply approved selling prices and public-safe product facts;
- verify product status, channel publication, presentation and checkout behavior through authoritative Shopify reads after writes;
- preserve source identity and keep direct VEVOR inventory separate from Doba-sourced VEVOR inventory;
- return completion evidence, blockers and exceptions to Peter / Company Operations.

The Shopify Operations Worker does **not** self-approve VEVOR MAP policy, change supplier/channel authorization, modify global company SOPs, or treat Shopify access as authority to make unrelated changes.

## 3. Source separation — direct VEVOR vs Doba VEVOR

Direct VEVOR and Doba-sourced VEVOR are separate sourcing and authorization lanes even when the underlying manufacturer/product brand is the same.

For Shopify/catalog control:
- preserve the exact source lane for every SKU;
- use public-safe source identifiers/tags sufficient to distinguish `VEVOR-Direct` from `Doba` inventory;
- do not convert a Doba VEVOR listing into direct VEVOR merely because the same or similar product appears in the VEVOR feed;
- do not assume direct VEVOR authorization extends to eBay, Amazon, Walmart, TikTok Shop or other marketplaces;
- merge/reuse customer-facing product records only when exact SKU identity, channel authorization, pricing, inventory source and fulfillment ownership are reconciled safely.

## 4. VEVOR MAP / pricing control

The received VEVOR supplier feed contains a field identified as `MAP (Minimum Advertised Price)`.

VEVOR also instructed Elevation that Elevation's selling price must not be below VEVOR's current selling price.

Controlling rule:

**LIVE VEVOR SELLING PRICE CHECK + FEED MAP CHECK → USE THE HIGHER APPLICABLE FLOOR**

The working catalog's planning floor is a screening aid only. It does not replace a current supplier check.

### Price-release sequence

For each SKU before first publication and before a material price change:
1. confirm exact VEVOR SKU/model identity;
2. read the applicable feed MAP reference;
3. check the current VEVOR public selling price from the approved live source;
4. set the applicable advertising floor to the higher valid control;
5. set Elevation's customer selling price at or above that floor using protected internal economics outside this public repository;
6. record the price/MAP verification date and source pointer;
7. hand the approved customer price to Shopify execution;
8. verify the Shopify variant price after the change.

If the live price or MAP cannot be verified reliably, hold only that SKU/price action and continue other verified products.

Do not use coupons, compare-at pricing, automatic discounts, bundle mechanics, gifts or other promotional treatment to bypass a VEVOR MAP floor. Do not add restrictions VEVOR has not supplied.

## 5. Inventory and live sellability

The received VEVOR inventory feed is a source snapshot, not a permanent customer promise.

Before first publication and when a real order is being fulfilled, verify current supplier sellability using the approved VEVOR source.

Use customer-safe states rather than exposing raw supplier counts:
- AVAILABLE
- MANUAL CONFIRMATION
- UNAVAILABLE
- DISCONTINUED / RETIRED

### VEVOR page-state interpretation rule — verified 2026-09-10

VEVOR product pages may display an `Out of Stock` label inside a configuration/variant selector while the exact selected SKU's purchase block on the same page still shows `In Stock` and exposes normal purchase actions.

For live sellability control:
1. confirm the exact SKU/model on the page;
2. read the **selected SKU's actual purchase-state block** and purchase-action state;
3. use that purchase block as the live sellability decision source;
4. do not place a SKU on hold solely because a variant-selector/link label says `Out of Stock` when the selected exact SKU's purchase block says `In Stock`;
5. if the exact SKU identity or purchase block is ambiguous/conflicting, classify only that SKU as MANUAL CONFIRMATION and continue the rest of the queue.

VEVOR-specific rule: do not assume a paid preorder/backorder path exists. If an exact direct VEVOR SKU is genuinely unavailable and no authorized alternate fulfillment source exists, pause only that SKU until a valid order path is confirmed.

Supplier delivery guidance may be used for internal planning but must not be converted into a customer guarantee without verified support.

## 6. Catalog activation standard

The curated VEVOR launch set is the working activation set. The original/full supplier feed remains the supplier source and must not be overwritten by a curated derivative.

Priority sequence remains:

**A — CORE LAUNCH → B — STRONG EXPANSION → C — SUPPORTING**

A direct VEVOR SKU is ready for Shopify implementation when the applicable minimum is verified:

**EXACT SKU/MODEL + APPROVED PRODUCT FACTS/MEDIA SOURCE + PRICE/MAP SOURCE + LIVE SELLABILITY SOURCE + NORMAL FULFILLMENT STATE + APPROVED CHANNEL**

Do not expand simply because a product exists in the supplier feed. Favor products that fit Elevation's real off-grid, RV/mobile, restoration/field-service and outdoor/support customer lanes.

Catalog activation is separate from catalog enrichment. A verified product may be activated once the minimum safe listing data is established; image/media enrichment, collection refinement and merchandising quality work then continue without falsely reopening completed SKU/price/source gates.

## 7. Shopify implementation controls

For VEVOR direct-account records, preserve public-safe internal identifiers that make the source and control state clear. Recommended controls include:
- vendor/brand: VEVOR;
- source tag: `VEVOR-Direct` / `Source-VEVOR-Direct`;
- tier tag when applicable (`VEVOR-A`, `VEVOR-B`, etc.);
- `MAP-Controlled` when applicable;
- current price-verification marker;
- current stock/sellability-verification marker;
- appropriate Elevation collection/lane;
- exact VEVOR SKU/model when available.

Do not expose wholesale cost or protected margin information in customer-visible fields or this public repository.

Existing Doba-sourced VEVOR drafts/products remain in the Doba lane unless a deliberate SKU/source merge is separately verified.

### Shopify write-verification rule — verified 2026-09-10

A write-tool success response is not final proof of Shopify state. After catalog creation or material status/publication changes:
1. read the product back through Shopify's authoritative API;
2. verify `status` is the intended state;
3. verify exact SKU and selling price;
4. verify intended publication IDs/channel state;
5. treat search/indexing lag as non-authoritative until direct product/API reads confirm state.

If the creation response and authoritative read disagree, fix the authoritative state before closing the lane.

## 8. Normal order / fulfillment flow

Use:

**CUSTOMER ORDER → ELEVATION SHOPIFY CHECKOUT → VEVOR ORDER VALIDATION / PLACEMENT → SUPPLIER FULFILLMENT → TRACKING → CUSTOMER COMPLETION → ACTUALS**

An unrelated onboarding note must not automatically block an otherwise verified checkout path.

Before supplier placement, verify the exact SKU, current sellability, valid supplier-order path and current price/MAP condition required for the transaction.

Open operational details such as blind shipping, packing slip treatment, returns, support ownership and exact tracking handoff should be resolved as they become necessary. A missing detail blocks only the lane/action that actually depends on it.

## 9. VEVOR SOP change control

Use the smallest safe revision.

When a verified VEVOR fact changes:
1. identify the exact affected rule/SKU/channel;
2. preserve the authoritative source/evidence outside Git when protected;
3. update only the VEVOR procedure or workstream that changed;
4. note the effective/reconciliation date;
5. identify affected Shopify/catalog/order actions;
6. route implementation to the responsible worker;
7. verify implementation;
8. return the material delta to Company Operations / Operating System Project Manager.

Do not create a new VEVOR SOP for every update. This file is the VEVOR master operating SOP; narrower working notes must defer to it and the parent company SOPs.

## 10. Owner gates

Routine direct-site catalog onboarding, source verification, compliant pricing deployment and normal VEVOR fulfillment are Operations work.

Return to Casey for genuine owner commitments including:
- material bulk-purchase/inventory commitments;
- unusual financing or credit obligations;
- exclusivity or contracts;
- material marketplace/channel-policy expansion;
- intentional exceptions to established supplier pricing/channel rules;
- significant inventory investment;
- other material legal or commercial commitments.

## 11. Public-repository protection

This repository is public. Never commit:
- dealer/wholesale costs or private price sheets;
- raw supplier inventory counts;
- private supplier correspondence;
- signed tax documents or private tax/account identifiers;
- payment credentials or private payment terms;
- private carrier quotes;
- non-public compliance packets;
- customer personal information;
- credentials, secrets or tokens;
- internal margin details or private commercial terms.

Public Git may store policy, state, public-safe SKU identifiers, verification status, workflow and evidence pointers.

## 12. Current VEVOR work state — reconciled 2026-09-10

Current global work remains governed by `CURRENT_WORK_BOARD.md`.

### CLOSED / verified

- VEVOR PRO registration/onboarding baseline: COMPLETE.
- Direct supplier feed received and reconciled into the VEVOR working catalog.
- Tier A — Core Launch: **19/19 activated and closed at the catalog-activation gate**.
- Legacy direct-source reconciliation: CLOSED for source/SKU/tag conversion; individually unresolved unavailable products remain DRAFT/HOLD rather than blocking the supplier.
- Tier B — Strong Expansion: **17/17 exact SKU identity, live VEVOR price/MAP floor, live purchase-state sellability, Shopify creation, ACTIVE status and publication verified**.
- Tier B duplicate gate before creation: 0/17 direct-SKU duplicates in Shopify.
- A Shopify creation-state mismatch was detected during verification (creation response indicated ACTIVE while authoritative reads returned DRAFT); all 17 affected B-tier products were explicitly corrected to ACTIVE and publication was rerun. Final authoritative read confirmed the intended state.

### ACTIVE / next executable lanes

1. **A/B catalog media and presentation enrichment** — add/verify approved supplier media, images, collection placement and merchandising quality without changing verified source/MAP controls.
2. **Fulfillment detail closeout** — resolve blind shipping, packing-slip behavior, returns, customer-support ownership and exact tracking handoff to the level needed for normal order execution.
3. **First live paid-order proof** — when a VEVOR customer order occurs, route it through Shopify → VEVOR purchase → tracking → customer completion → actuals and retain the receipt.
4. **Tier C review** — evaluate the 4 supporting candidates only after the active enrichment/fulfillment controls are stable; do not activate them merely to increase SKU count.

### WAITING / nonblocking

- Final VEVOR tax-exemption review result. Preserve protected tax/account identifiers outside public Git. This waiting state does not block otherwise valid catalog, media, checkout or fulfillment preparation work.

### Current RUN pointer

**A/B MEDIA + PRESENTATION ENRICHMENT → FULFILLMENT DETAIL CLOSEOUT → FIRST LIVE ORDER PROOF WHEN TRIGGERED → C-TIER REVIEW**

Do not restart A-tier or B-tier activation unless a specific SKU is reopened by changed live price, MAP, sellability, source identity or publication state.

## 13. Return format

Functional managers and routed workers return concise state:

**DONE:** completed and verified change.  
**BLOCKED:** only the exact blocked item, otherwise `NONE`.  
**NEXT:** next executable action.  
**NEEDS CASEY:** only a genuine owner gate.

## Operating result

**ONE VEVOR PROJECT → ONE MASTER VEVOR SOP → MAP OWNED BY MAP CONTROL → SOP OWNED BY SOP CHANGE CONTROL → SHOPIFY EXECUTES APPROVED DELTAS → PETER / COMPANY OPERATIONS RETAIN MANAGEMENT AUTHORITY → CASEY RETAINS TRUE OWNER GATES**