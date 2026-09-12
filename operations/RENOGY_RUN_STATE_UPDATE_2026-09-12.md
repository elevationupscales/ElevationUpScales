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

## Current execution attempt

The required authenticated Partner Portal read-only check for `RSP100DCT-G1-US` and `RBM500-G3-US` was attempted again.

The browser automation did not start because the connected TinyFish execution wallet remains below zero (`-$0.58`). This is a tooling/payment blocker, not a Renogy account/session failure and not evidence that the Partner Portal is unavailable.

No password reset, password creation, account-security change, order placement, payment-method change, tax-setting change, or other Renogy account mutation was attempted.

## Activation control

No Renogy SKU was activated during this RUN because exact current dealer orderability/backorder authority remains a mandatory publication/checkout gate.

Do not convert public retail availability into dealer availability. Do not activate from the public page alone.

When browser execution is available again, resume directly at:

1. read-only Partner Portal check for `RSP100DCT-G1-US`;
2. read-only Partner Portal check for `RBM500-G3-US`;
3. if clean, bind exact approved media;
4. refresh public price reference and protected economics;
5. activate each clean SKU individually;
6. run public product → cart → checkout QA;
7. record activation receipt and continue first-real-order proof.

## State

**RENOGY: ACTIVE / TOOLING-GATED ONLY AT AUTHENTICATED PORTAL READ STEP / ALL OTHER VERIFIED STATE PRESERVED.**
