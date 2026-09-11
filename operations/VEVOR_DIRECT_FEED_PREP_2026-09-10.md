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

VEVOR has also sent a system confirmation that Elevation UpScales joined the VEVOR Pro Member Program. Treat PRO membership as **VERIFIED BY SUPPLIER EMAIL**. Do not treat that email alone as proof that the business profile, tax-exemption review, account discount state, or all operational settings are complete.

## Portal inspection receipt — 2026-09-10

Company Operations attempted a **read-only** VEVOR account inspection to capture the account-specific onboarding state without changing settings or placing an order.

Result:
- VEVOR account page loaded in signed-out state showing `Hello, Sign in`;
- no active VEVOR browser session was present in the available company browser profile;
- no VEVOR credentials were available to the inspection session;
- inspection stopped without requesting or exposing credentials, codes, or account secrets;
- no account settings, forms, orders, support contacts, or purchases were changed or submitted.

Therefore the following account-specific fields remain **NOT VERIFIED BY COMPANY OPERATIONS PORTAL INSPECTION**:
- business/company profile completion;
- tax-exemption certificate status;
- active PRO purchasing discount state;
- account-level order / customer ship-to procedure;
- tracking location and timing;
- account-visible returns / RMA / warranty workflow;
- account-visible shipping or destination restrictions;
- account-visible inventory / stock synchronization controls;
- account-specific blind-shipping or packing-slip controls;
- any account-specific customer-support routing controls.

This is an access-state limitation, not a VEVOR onboarding failure. Do not restart registration or requalify the relationship.

## Human / authenticated portal capture required

Peter / authorized human operator with legitimate VEVOR account access should capture the following from the live portal and return a concise receipt to the VEVOR project:

1. **PRO membership/account level** — confirm active status shown in the account.
2. **Business profile** — COMPLETE / INCOMPLETE and identify only missing fields; do not copy sensitive account identifiers into public Git.
3. **Tax exemption** — APPROVED / PENDING / NOT SUBMITTED / REJECTED / UNCLEAR.
4. **Purchasing discount state** — ACTIVE / NOT SHOWN / OTHER; private discount percentages stay outside public Git.
5. **Ordering path** — verify whether customer orders are placed by purchasing through the PRO account with the customer as ship-to and whether any special order/reference field is required.
6. **Tracking** — where carrier/tracking appears and normal posting timing if shown.
7. **Returns / RMA / warranty** — portal path and role of Elevation vs customer.
8. **Shipping limitations** — state/destination restrictions, Alaska/Hawaii, PO boxes, oversized/heavy-item limits, residential restrictions, or other special handling shown.
9. **Inventory / stock** — where current availability is shown and whether the supplier feed or another account source is the controlling availability source.
10. **Blind shipping / packing slip** — whether neutral or blind fulfillment is available and whether VEVOR invoices, pricing, inserts, or promotional material are included.
11. **Product feed** — download/capture the current direct VEVOR feed and date/time of retrieval.

Screenshots or exports containing account-specific or private commercial information must be retained outside public Git.

## Supplier email already open — do not duplicate

A supplier email has already been sent to Melinda requesting confirmation of these four fulfillment controls:
- blind shipping / packing slips / VEVOR pricing or promotional inserts;
- tracking retrieval location and normal posting timing;
- customer returns, damaged-item, defect and warranty / RMA workflow;
- whether the customer should work through Elevation while Elevation coordinates with VEVOR, or contact VEVOR directly.

Status: **SENT / WAITING FOR VEVOR REPLY**.

Do not send a duplicate email on these four questions while that message is pending.

## Remaining supplier follow-up questions after portal reconciliation

After the authenticated portal capture above, send **one consolidated follow-up only for facts that remain unresolved**. The likely unresolved questions are:

1. **Feed update cadence / stock source**  
   - How often is the supplier-provided workbook/feed refreshed for price and stock?  
   - Should Elevation use that feed, the live product page, the PRO account, or another source as the final pre-order inventory check?

2. **Dropship order procedure**  
   - For an Elevation customer order, should Elevation place the order through the PRO account using the customer as the ship-to address?  
   - Is any PO/reference/order note required to identify the transaction as an Elevation dropship order?

3. **Destination / service restrictions**  
   - Are there PRO dropship restrictions for Alaska, Hawaii, PO boxes, military addresses, oversized/heavy products, residential delivery, or specific SKU classes?  
   - Are any categories excluded from direct-to-customer shipping even when they appear available online?

4. **Price-floor maintenance**  
   - VEVOR has already stated Elevation's selling price may not be below VEVOR's current selling price. Confirm which VEVOR price should be treated as the controlling floor when the website, PRO price, coupon/promotional price, or feed values differ, and whether temporary VEVOR promotions require Elevation to immediately reprice.

5. **Tax-exemption status only if portal remains unclear**  
   - Ask Melinda to confirm whether the submitted tax-exemption documentation is approved/active only if the authenticated portal does not clearly show the result.

Do not ask the supplier for information that the authenticated portal already resolves cleanly.

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

## Current execution sequence

1. **PRO membership** — VERIFIED BY VEVOR EMAIL.
2. **Authenticated portal capture** — REQUIRED; current automated read-only inspection could not authenticate.
3. **Existing fulfillment-question email** — SENT / WAITING; do not duplicate.
4. **Direct product feed retrieval** — REQUIRED.
5. **Reconcile 20–40 product working set** — proceed when feed is available.
6. **One consolidated supplier follow-up** — send only unresolved questions after portal receipt and the existing Melinda reply are reconciled.
7. **Publish-ready review** — direct-site only, correct current price floor, stock source, shipping support and customer-service workflow verified.
8. **First live order proof** — required before integration CLOSE.

## Current blocker / dependency

The workflow is not blocked as a whole. The only current missing account evidence is an authenticated portal receipt and the direct VEVOR workbook/feed. Supplier fulfillment questions already have an active email outstanding.

Continue feed/catalog preparation where possible. Hold only fields that require authenticated account evidence or supplier clarification.

## Next

1. Authorized human/Peter captures the live VEVOR PRO portal receipt and current direct feed.
2. Reconcile that receipt against the four questions already sent to Melinda.
3. Build the final short list of genuinely unresolved questions.
4. Prepare one consolidated VEVOR follow-up email for owner/management review.
5. Reconcile the feed into the Master Catalog and produce the first 20–40 candidate set with READY / HOLD reasons.
