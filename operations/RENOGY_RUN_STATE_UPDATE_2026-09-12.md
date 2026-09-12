# Renogy RUN State Update — 2026-09-12

**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Manager:** Renogy Branch Operations Manager  
**State:** ACTIVE / RESUMABLE  
**Git-first baseline checked:** `57f9e6ac91f87204e99d4ee791696db5d47e3871`

## Reconciliation

Current `main` was re-resolved before execution. The newest repository commit is unrelated to the Renogy lane, so the controlling Renogy handoff remains `PM4_TO_RENOGY_TEAM_ACTIVATION_HANDOFF_2026-09-11.md`.

The Renogy activation sequence remains:

**PORTAL READ-ONLY ORDERABILITY CHECK → EXACT APPROVED MEDIA → CURRENT PUBLIC PRICE / PROTECTED ECONOMICS CHECK → ACTIVATE CLEAN SKU INDIVIDUALLY → PUBLIC PRODUCT/CART/CHECKOUT QA → FIRST REAL ORDER PROOF**

## Preserved verified state

- Five Renogy Shopify records already exist as DRAFT. Do not recreate them.
- `RSP100DCT-US` maps to supplier item `RSP100DCT-G1-US`.
- `RBM500-US` maps to supplier item `RBM500-G3-US`.
- Exact approved Renogy media path for `RSP100DCT-US` is already established in the supplied Product Assets library under the 100W Bifacial N-Type panel folder.
- Exact RBM500 media identification remains required before RBM500 activation.
- Current public Renogy retail reference previously verified:
  - `RSP100DCT-US` — $99.99
  - `RBM500-US` — $87.99
- Existing Shopify draft prices match those public references.
- Public Renogy pages currently show both launch candidates as unavailable; this does not substitute for Partner Portal dealer orderability/backorder verification.
- The three isolated exact holds remain isolated and must not block the cleaner launch candidates:
  - `RBC2125DS-21W-US`
  - `RNG-INVT-2000-12V-P2-US`
  - `RNG-CTRL-RVR40`

## Opera authenticated-state proof

Owner directed use of the connected Opera browser instead of TinyFish.

Opera directly verified an active authenticated Renogy Partner Portal session for Elevation UpScales, Inc. The portal home displays:

- `Welcome to Renogy Partner Portal -- Elevation UpScales, Inc.`
- account user `Casey Young`;
- active portal navigation including Products, Shopping Cart, My Orders, My Invoices and Customer Support;
- Renogy Sales Support as the Primary Account Manager.

Therefore the prior TinyFish-wallet limitation is **not** a Renogy portal/account blocker and must not be carried forward as supplier-access state.

The current Opera connector can read authenticated page content and navigate directly to URLs, but it does not currently expose a click/press action for the portal's SPA `Products` menu. Direct guesses `/products` and `/product` resolve to Renogy's internal lost-page state and are not treated as product/orderability evidence.

No password reset, password creation, account-security change, order placement, payment-method change, tax-setting change, address change or other Renogy account mutation was attempted.

## Supplier asset lane continuation

Opera also confirmed the supplier-shared Renogy Product Assets library remains accessible in open Dropbox tabs. The `7.Accessory` asset folder exposes exact SKU-named subfolders and is usable as an approved-media source. Exact `RBM500-G3-US` asset identification remains open; no nearby or generic monitor image may be substituted.

## Activation control

No Renogy SKU was activated during this RUN because exact current dealer orderability/backorder authority remains a mandatory publication/checkout gate.

Do not convert public retail availability into dealer availability. Do not activate from the public page alone.

Resume directly at the first available route that can invoke the authenticated Products navigation:

1. open Products inside the existing authenticated Opera Partner Portal session;
2. verify `RSP100DCT-G1-US` exact dealer orderability / delayed-order state;
3. verify `RBM500-G3-US` exact dealer orderability / delayed-order state;
4. if clean, bind exact approved media;
5. refresh public price reference and protected economics;
6. activate each clean SKU individually;
7. run public product → cart → checkout QA;
8. record activation receipt and continue first-real-order proof.

## State

**RENOGY: ACTIVE / PARTNER PORTAL AUTHENTICATION VERIFIED IN OPERA / EXACT PRODUCT NAVIGATION ACTION STILL REQUIRED / ALL OTHER VERIFIED STATE PRESERVED.**
