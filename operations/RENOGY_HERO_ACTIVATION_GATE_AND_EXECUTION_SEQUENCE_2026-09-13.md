# Elevation UpScales — Renogy Hero Activation Gate & Execution Sequence

**Status:** ACTIVE / OWNER-DIRECTED / CONTROLLING RENOGY ACTIVATION ORDER  
**Effective:** 2026-09-13  
**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Parent:** `RENOGY_VENDOR_MASTER_SOP.md`, `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`

## Required Renogy gate

No Renogy SKU may be treated as clean for activation until the following exact-SKU sequence is satisfied:

**EXACT CURRENT SKU → CURRENT RETAIL/MSRP → PROFIT → PARTNER PORTAL ORDERABILITY → APPROVED MEDIA → WARRANTY → SHIPPING → DIRECT-SITE AUTHORIZATION → SHOPIFY RECORD MATCH → ACTIVATE → LIVE SMOKE**

### Gate interpretation

1. **Exact current SKU** — reconcile against the currently sellable Renogy identity. Do not activate an obsolete, superseded, mismatched or ambiguous Shopify record.
2. **Current retail/MSRP** — verify Renogy's current public retail/MSRP reference before activation. Renogy launch pricing follows the owner rule: **Renogy at MSRP, around $100 first** where a clean candidate supports that strategy.
3. **Profit** — apply the Direct-Site Profitability Gate using protected dealer economics outside public Git. Positive contribution is mandatory unless Casey explicitly authorizes a strategic exception.
4. **Partner Portal orderability** — verify current exact-SKU dealer orderability. If unavailable, apply the Renogy SKU-specific preorder/backorder control; do not infer dealer orderability from a public retail page.
5. **Approved media** — use exact Renogy-approved product media. Do not substitute generic or adjacent-SKU assets.
6. **Warranty** — verify the exact-SKU warranty term/source before customer-facing warranty representation.
7. **Shipping** — verify current Lower-48 shipping treatment and any SKU-specific exception or freight requirement.
8. **Direct-site authorization** — confirm the SKU remains authorized for Elevation's direct website. Renogy dealer inventory is not authorized for third-party marketplaces unless Renogy separately authorizes the channel.
9. **Shopify record match** — reconcile the existing Shopify record to the current Renogy SKU, title, price, facts, media, fulfillment state and supplier identity. Correct the existing record when possible; do not create a duplicate merely because an old record is wrong.
10. **Activate** — activate only the exact clean Shopify record after every required gate above passes.
11. **Live smoke** — immediately verify the live PDP, product card, cart, checkout, card path and PayPal path. A Shopify ACTIVE status by itself is not acceptance.

## Catalog hygiene rule

**RECONCILE EXISTING RECORD → CORRECT IF CURRENT → ARCHIVE/HOLD IF OBSOLETE → CREATE NEW ONLY WHEN A GENUINELY DISTINCT CURRENT SKU HAS NO EXISTING RECORD.**

Do not pollute the live catalog with obsolete or duplicate Renogy product identities.

## Hero-candidate strategy

Owner commercial direction:

**RENOGY AT MSRP → AROUND $100 FIRST → CLEAN EXACT SKU → POSITIVE CONTRIBUTION → TRUSTED PRODUCT PRESENTATION → LIVE BUY PATH.**

Price alone does not make a hero candidate. The candidate must pass the full Renogy gate and the company profitability gate.

## Locked execution sequence

The storefront execution order is:

1. **MERCHANT PUBLISH HERO CANDIDATE**
2. **RENOGY EXACT-SKU RECON FIRST**
   - correct/reconcile existing Shopify records rather than duplicate them;
   - activate first clean Renogy wave;
   - run PDP/cart/checkout/card + PayPal smoke;
3. **SOK media/trust enrichment**;
4. **VEVOR catalog cleanup**;
5. **Kingboss ready cohort**;
6. **full storefront trust/visual QA**;
7. **first real order**;
8. **actual contribution receipt**.

This sequence does not authorize the Renogy manager to perform SOK, VEVOR or Kingboss execution directly. The Renogy manager completes the Renogy segment, records acceptance evidence, and returns control to the Operating System / Company Operations routing layer for the next vendor lane.

## Renogy close condition

The Renogy hero wave is not complete when a product merely becomes ACTIVE.

Close only when the selected exact current SKU has:

**CURRENT IDENTITY PASS + MSRP/RETAIL PASS + PROFIT PASS + PORTAL ORDERABILITY PASS + MEDIA PASS + WARRANTY PASS + SHIPPING PASS + DIRECT-SITE PASS + SHOPIFY MATCH PASS + ACTIVE PASS + LIVE PDP/CART/CARD/PAYPAL SMOKE PASS.**

First-order commercial proof remains open until a real customer order is fulfilled and actual contribution is recorded.

## RUN behavior

When Casey says **RUN** in the Renogy project:

**RE-RESOLVE CURRENT MAIN → APPLY THIS GATE TO THE BEST CURRENT HERO CANDIDATE → RECONCILE EXISTING SHOPIFY RECORD → COMPLETE EVERY UNBLOCKED GATE → ACTIVATE ONLY IF ALL REQUIRED GATES PASS → LIVE SMOKE → RECORD RECEIPT → CONTINUE THE NEXT CLEAN RENOGY SKU.**

Do not skip to a later vendor lane from inside the Renogy manager. Return the completed Renogy handoff to OS/Company Operations for the next lane in the locked company sequence.

**Control phrase:**

**EXACT CURRENT RENOGY SKU → MSRP → PROFIT → PORTAL → MEDIA → WARRANTY → SHIPPING → DIRECT SITE → SHOPIFY MATCH → ACTIVATE → LIVE SMOKE.**