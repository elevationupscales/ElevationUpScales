# PM4 — Renogy Activation Recheck

**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Actor:** Operating System Project Manager — PM4  
**Scope:** Renogy sales-first activation lane  
**State:** PUBLIC QA ADVANCED / PORTAL SESSION EXPIRED / MEDIA GATE VERIFIED / HOLD ONLY EXACT BLOCKERS

## Git-first control

PM4 adopted the current Renogy Project Source and existing five-product Shopify draft wave. Dealer onboarding, supplier workbook intake, Marketing Toolkit intake, warranty/backorder program and the five draft records remain completed prior work and were not recreated.

## Authenticated Partner Portal state

The previously recorded owner-authenticated Renogy browser session is no longer active in the current Opera Browser Connector session. The current Renogy account surface returns to the Renogy login screen.

PM4 did not enter credentials, request/reuse an expired verification code, change account settings, touch payment/tax/security state or restart dealer onboarding.

This changes only the current availability of protected Partner Portal verification. It does not invalidate the approved dealer relationship or prior supplier evidence.

## Fresh public exact-SKU verification

Current Renogy public product evidence was refreshed on 2026-09-11 for the five staged identities.

### `RSP100DCT-US`

- public identity remains exact: 100W N-Type bifacial panel;
- current Renogy public price reference: **$99.99**;
- current public page explicitly states the 100W / 1-piece variant is **backordered** and offers a paid Add to Cart / Buy Now path;
- current Shopify draft price is **$99.99**.

Public price/reference alignment is therefore clean at this check. Existing exact-SKU backorder evidence remains current publicly. Protected dealer orderability/pricing still requires the approved account path immediately before activation/order execution.

### `RBM500-US`

- public identity remains exact: 500A Battery Monitor With Shunt;
- current Renogy public price reference: **$87.99**;
- current public page explicitly states the item is **backordered** and offers a paid Add to Cart / Buy Now path;
- current Shopify draft price is **$87.99**.

Public price/reference alignment is clean at this check. Existing exact-SKU backorder evidence remains current publicly. Protected dealer orderability/pricing still requires the approved account path immediately before activation/order execution.

### `RBC2125DS-21W-US`

- exact current public identity remains the 12V/24V IP67 50A DC-DC Battery Charger with MPPT;
- current Renogy public price reference at the check: **$299.99**;
- public page reports the product as unavailable; PM4 did **not** find an exact current public paid-backorder statement equivalent to the two clean launch candidates;
- current Shopify draft price is **$299.99**.

Price/reference alignment is clean, but the existing current dealer orderability / delayed-order authority gate remains valid.

### `RNG-INVT-2000-12V-P2-US`

- current Renogy public page still identifies the product under exact public SKU `RNG-INVT-2000-12V-P2-US`;
- current public price reference: **$285.99**;
- current public page states the inverter is backordered and offers Add to Cart / Buy Now;
- current Shopify draft price is **$285.99**.

This narrows the public identity question but does **not** resolve the supplier-workbook dealer order-source ambiguity between generation-coded dealer items. Keep the supplier generation/order-source hold until the current Partner Portal/order source identifies the intended item.

### `RNG-CTRL-RVR40`

- current Renogy public support/product evidence continues to recognize `RNG-CTRL-RVR40` as the Rover Li 40A MPPT controller;
- current public product family exposes G1/G2 communication-generation distinctions;
- the existing supplier-workbook mismatch to a Bluetooth generation-coded dealer item remains unresolved.

Do not silently convert the staged non-Bluetooth/public identity to the dealer workbook Bluetooth item. Exact dealer variant identity remains the controlling hold.

## Live Shopify draft check

Connected Shopify Admin was refreshed for `vendor:Renogy AND status:draft`.

Result: exactly **5 Renogy DRAFT products**, matching the controlled launch wave, with **0 activation performed**.

Current draft customer prices:

- `RSP100DCT-US` — $99.99;
- `RBM500-US` — $87.99;
- `RBC2125DS-21W-US` — $299.99;
- `RNG-INVT-2000-12V-P2-US` — $285.99;
- `RNG-CTRL-RVR40` — $152.44.

The first four prices above align with the fresh exact public price references found in this pass where an exact current public price was verified.

### Media gate

All five current Shopify draft results returned `featuredMedia = null`.

Therefore the existing product-by-product exact approved media attachment requirement is a **real current activation gate**, not a stale checklist item. Do not activate any draft without attaching exact approved product media from the received Renogy-authorized source set or another currently approved exact source.

## Current dispositions

- `RSP100DCT-US` — **ADVANCED / PUBLIC PRICE + BACKORDER STATE CLEAN / HOLD PROTECTED DEALER RECHECK + EXACT MEDIA**.
- `RBM500-US` — **ADVANCED / PUBLIC PRICE + BACKORDER STATE CLEAN / HOLD PROTECTED DEALER RECHECK + EXACT MEDIA**.
- `RBC2125DS-21W-US` — **HOLD CURRENT DEALER ORDERABILITY / DELAYED-ORDER AUTHORITY + EXACT MEDIA**.
- `RNG-INVT-2000-12V-P2-US` — **PUBLIC IDENTITY + PRICE ADVANCED / HOLD DEALER GENERATION ORDER-SOURCE + EXACT MEDIA**.
- `RNG-CTRL-RVR40` — **HOLD EXACT DEALER VARIANT IDENTITY + CURRENT PRICE CONTROL + EXACT MEDIA**.

## Next execution

1. Restore the authorized Renogy Partner Portal session when the owner/account action surface is available; do not reuse expired verification codes.
2. Resolve only the three protected dealer/order-source holds already identified.
3. Select and attach exact approved Renogy media for the two cleanest drafts first: `RSP100DCT-US` and `RBM500-US`.
4. Reverify protected current dealer price/orderability immediately before activation.
5. Activate each clean SKU individually, then run public product/cart/checkout QA.
6. Do not wait for all five products if one or two independently clear every gate.

**Control:** `FIVE DRAFTS PRESERVED → PUBLIC PRICE/STATE REFRESHED → MEDIA GAP PROVEN → HOLD ONLY PROTECTED PORTAL/EXACT MEDIA QUESTIONS → ACTIVATE CLEAN SKUS INDIVIDUALLY.`
