# ELEVATION UPSCALES — MPM5 PAYMENT ARCHITECTURE REPLACEMENT FLOW

**Date:** 2026-09-12  
**Owner:** Casey Young  
**State Owner:** Operating System Project Manager  
**Status:** PROPOSED CONTROLLING REPLACEMENT FLOW / MASTER RECON VALIDATION REQUIRED BEFORE DEV  
**Parent recovery:** `MPM5_OWNER_PAYMENT_DRIFT_RECOVERY_WORKFLOW_2026-09-12.md`

## Purpose

Replace the owner-created payment-architecture drift with one explicit, non-overlapping model for direct-site commerce, Shopify commerce, marketplace commerce, payout ownership, order authority and fulfillment routing.

This flow corrects the mistaken assumption that PayPal inside Shopify can bypass Shopify Payments / Shopify payout handling.

## Core architecture

**ONE SURFACE = ONE CHECKOUT OWNER = ONE PAYMENT/ORDER AUTHORITY. NO CROSS-ROUTE PAYMENT FALLBACKS.**

### A. ElevationUpScales.com direct-site lane

Customer path:

**ELEVATION PRODUCT / CART → ELEVATION CHECKOUT → PAYPAL ORDERS V2 → ELEVATION LOCAL ORDER RECORD → PAYPAL CAPTURE → ELEVATION FULFILLMENT ROUTING**

Rules:

- ElevationUpScales.com direct checkout is owned by Elevation, not Shopify.
- PayPal Orders v2 remains server-side for create/capture.
- PayPal credentials/secrets remain in environment bindings only.
- Use stable `PayPal-Request-Id` values for idempotent create/capture retries.
- A matching local Elevation order in an allowed state must exist before capture.
- Captured amount, currency, order ID, capture ID and status must reconcile to local order intent before paid-state transition.
- Persist PayPal reconciliation evidence on the local Elevation order.
- PayPal webhooks may provide recovery/async confirmation only after signature verification.
- Customer funding choices exposed by PayPal may include PayPal Wallet and any other PayPal-provided eligible funding sources. Do not invent or promise a funding method not enabled by PayPal for the live account/customer.
- **Do not route an Elevation direct-site buyer to Shopify as a payment fallback.**
- Direct-site PayPal settlement belongs to the PayPal merchant account used by the Elevation PayPal integration; it is not a Shopify Payments transaction.

### B. Shopify lane

Customer path:

**SHOPIFY PRODUCT → SHOPIFY CART/CHECKOUT → SHOPIFY PAYMENTS / SHOPIFY-SUPPORTED METHODS → SHOPIFY ORDER → SHOPIFY PAYOUT → FULFILLMENT ROUTING**

Rules:

- Shopify owns Shopify cart, checkout, payment processing, payment-method presentation, order record and payout handling for Shopify orders.
- Current Shopify Payments state is **Accepting payments / Receiving payouts**.
- PayPal presented inside the current U.S. Shopify checkout is PayPal Wallet in the Shopify Payments lane.
- Shopify PayPal Wallet is **not** a direct-PayPal-payout bypass.
- Preserve working Shopify configuration during the current recovery.
- Do not use Shopify as a payment fallback for an Elevation direct-site checkout.
- Do not use an Elevation direct PayPal capture to settle a Shopify-native order.

### C. Marketplace / platform lanes

Examples: eBay, TikTok Shop, Fourthwall and future approved marketplaces.

Rules:

- Each marketplace uses its own required checkout/payment/payout rails.
- Marketplace payment records are never reprocessed through Elevation PayPal or Shopify.
- OS may normalize fulfillment/status reporting after payment, but does not replace marketplace payment authority.

## Ten required architecture answers

1. **Customer checkout owner**
   - ElevationUpScales.com direct sale: Elevation checkout.
   - Shopify store sale: Shopify checkout.
   - Marketplace sale: marketplace checkout.

2. **Payment processor(s)**
   - Elevation direct: PayPal Orders v2 / PayPal merchant processing.
   - Shopify: Shopify Payments and Shopify-supported payment methods.
   - Marketplace: marketplace-native processor.

3. **Payout / settlement owner**
   - Elevation direct: PayPal merchant settlement.
   - Shopify: Shopify Payments payout.
   - Marketplace: marketplace payout.

4. **Order system of record**
   - Elevation direct: durable Elevation local order record / current D1 order path.
   - Shopify: Shopify order.
   - Marketplace: marketplace order.

5. **Product / cart source of truth**
   - Vendor Project source truth remains upstream for identity, source, MAP, stock, shipping, warranty and fulfillment.
   - Elevation direct storefront consumes Universal Catalog / website product truth and revalidates exact product/price/shipping server-side before payment.
   - Shopify uses its own channel product/variant records as the Shopify projection; current staging/publication controls remain in force.

6. **Fulfillment handoff**
   - Payment-confirmed orders enter one OS fulfillment-routing layer tagged with `source_channel` and exact SKU/vendor.
   - Direct Elevation order remains an Elevation order; Shopify order remains a Shopify order; marketplace order remains a marketplace order.
   - Vendor/Shipping owner performs source/order-time verification before supplier purchase when required.

7. **Refund / cancellation owner**
   - Elevation direct: Elevation local order state + PayPal refund/capture controls.
   - Shopify: Shopify refund/cancellation controls.
   - Marketplace: marketplace refund/cancellation controls.
   - Never issue the same refund through two payment rails.

8. **Failure / fallback behavior**
   - Elevation PayPal failure: preserve cart/order state, show retry/contact/review path, do not silently redirect to Shopify.
   - Shopify payment failure: remain in Shopify and use Shopify-supported recovery.
   - Marketplace payment failure: remain in marketplace.
   - No cross-surface fallback may create duplicate orders or duplicate captures.

9. **Direct-site / marketplace lane boundaries**
   - Elevation direct, Shopify and each marketplace are distinct transaction lanes.
   - Shared vendor/product truth may feed multiple channels, but checkout/payment/order authority remains channel-specific.
   - Channel-specific authorization, MAP, availability and shipping rules remain enforceable before publication or fulfillment.

10. **Migration / rollback rule**
    - Current production `dfb0dc2683035dd9e06f667aaabc04fc6eed3a0b` remains the live anchor during RECON validation.
    - Stale candidate `84af23ec814baa73718e33ec052044ce4706534d` remains **DO NOT DEPLOY** and must not be promoted as the replacement candidate.
    - After RECON PASS, MASTER DEVELOPER builds a fresh bounded candidate from the exact approved production lineage.
    - Candidate must remove cross-route Shopify fallback from the Elevation direct payment path, preserve/harden the direct PayPal order path, and leave Shopify-native commerce untouched.
    - Release path: exact candidate → non-charging QA/smoke → RECON exact-SHA pass → production → live verify → receipt.
    - Failure returns to the last proven production anchor or a bounded fix-forward candidate; no broad `main` deployment.

## Direct-site implementation requirements after RECON PASS

MASTER DEVELOPER receives one bounded packet containing only the direct-site transaction path:

- real cart/order state as approved by MPM;
- canonical server-side product/price/shipping revalidation;
- complete pre-payment product review / full-detail return path;
- PayPal Orders v2 server create/capture;
- local-order precheck before capture;
- stable idempotency keys;
- amount/currency/status reconciliation;
- durable PayPal order/capture evidence;
- no Shopify direct-buy/card fallback in the Elevation payment path;
- no protected-homepage-top change;
- no catalog expansion;
- no live-payment QA.

## Shopify implementation requirements during recovery

- Preserve current Shopify Payments accepting-payments / receiving-payouts state.
- Preserve current 53 public products and 50 VEVOR staging holds.
- Do not add/remove payment methods merely to solve the Elevation direct-site architecture.
- Do not rebuild Shopify checkout as part of the Elevation direct-site repair.
- Resume broader Shopify tuning only after the recovery hold is released.

## RECON validation assignment

MASTER RECON OS must return **PASS** or one bounded correction list against this exact flow.

Validate:

1. direct PayPal settlement is genuinely outside Shopify for the direct Elevation path;
2. Shopify PayPal Wallet remains correctly classified under Shopify Payments;
3. no duplicate order authority exists;
4. no payment rail can capture the same order twice;
5. payout ownership is explicit per lane;
6. refund ownership is explicit per lane;
7. current production/recovery lineage is preserved;
8. stale `84af23ec...` cannot be replayed;
9. no secret/raw-card handling regression is introduced;
10. release packet can be bounded to one transaction-path delta.

## New-listing / expansion hold

New item listings, new payment experiments and new-channel expansion remain paused until this architecture passes RECON and the production repair is live-verified.

## Control phrase

**DIRECT ELEVATION = ELEVATION CHECKOUT + PAYPAL SETTLEMENT → SHOPIFY = SHOPIFY CHECKOUT + SHOPIFY PAYOUT → MARKETPLACES = NATIVE RAILS → ONE ORDER AUTHORITY PER SURFACE → NO CROSS-ROUTE PAYMENT FALLBACK → RECON PASS → DEV ONE DELTA → RELEASE.**