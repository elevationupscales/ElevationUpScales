# Elevation UpScales — Renogy Direct-Site Profitability Application

**Status:** ACTIVE / CONTROLLING RENOGY COMMERCIAL GATE  
**Effective:** 2026-09-12  
**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Parent Control:** `DIRECT_SITE_PROFITABILITY_GATE_2026-09-11.md`  
**Renogy Control:** `RENOGY_VENDOR_MASTER_SOP.md`; `vendor-project-sources/RENOGY_PROJECT_SOURCE.md`

## Purpose

Apply the company-wide Direct-Site Profitability Gate to Renogy without weakening Renogy-specific MAP, direct-site-only, exact-SKU, availability, warranty, media, or fulfillment controls.

The Renogy launch objective is now:

**VERIFIED SKU → CURRENT PUBLIC PRICE / RENOGY PRICE CONTROL → CURRENT PROTECTED DEALER COST → CURRENT ORDERABILITY → APPROVED MEDIA → FULL VARIABLE COST CHECK → POSITIVE CONTRIBUTION → ACTIVATE / PROMOTE → CUSTOMER ORDER → REVERIFY → FULFILL → RECORD ACTUAL PROFITABILITY → SCALE.**

A Renogy SKU is not promotion-ready merely because it is price-compliant, orderable, staged in Shopify, or capable of checkout.

## Company profitability states applied to Renogy

### `PROMOTE`
Use only when all are true:

- exact Renogy SKU/source identity verified;
- current Renogy dealer sellability/orderability verified;
- customer price complies with current Renogy public-price / MAP controls;
- current protected dealer cost is known;
- supplier shipping/freight paid by Elevation is known;
- applicable payment processor / checkout / Shopify per-order fees are known enough to calculate expected order contribution;
- other material order-specific variable costs are known;
- expected order contribution is greater than $0;
- approved/current-authoritative Renogy media is attached;
- direct-site fulfillment path is executable;
- checkout path is working.

### `HOLD — ECONOMICS UNKNOWN`
Use when any material current cost remains unknown, including actual processor/platform treatment or freight that could change the result.

### `HOLD — NEGATIVE CONTRIBUTION`
Use when expected order contribution is $0 or below.

### `OWNER REVIEW — STRATEGIC EXCEPTION`
Any intentional loss leader, subsidized launch, below-normal-margin promotion, or other deliberate loss-making strategy requires Casey's explicit approval.

## Protected economics source

Renogy Sales Support supplied the current item workbook with protected dealer cost and public-reference fields. Protected dealer pricing and exact private economics must remain outside public Git and customer-facing surfaces.

Renogy supplier guidance states Lower-48 shipping is free under the current dealer program. Reverify this at order time and do not infer Alaska, Hawaii, territory, international, or dangerous-goods freight from the Lower-48 rule.

## Current launch-wave profitability reconciliation

### `RSP100DCT-US` → supplier item `RSP100DCT-G1-US`

- Current Shopify/customer price remains aligned to the current Renogy public reference.
- Live Opera recon on 2026-09-12 shows the exact public `RSP100DCT-US` page exposing Add to Cart / Buy Now controls and 1–3 business day delivery language.
- That public retail state is a customer-surface signal only and does not substitute for dealer orderability/backorder authority.
- Current protected supplier workbook cost is available and has been reconciled privately.
- The current protected pre-fee economics show a positive spread before processor/platform treatment.
- Lower-48 supplier shipping guidance: free, subject to exact order-time verification.
- Current dealer orderability/backorder authority still requires authenticated Partner Portal exact-SKU confirmation or an equivalent dealer-authoritative source.
- Exact approved Renogy media path is established.
- Applicable payment processor / Shopify per-order treatment is not yet documented in the Renogy lane strongly enough to close the company profitability gate.

**Current state: `HOLD — ECONOMICS UNKNOWN`** until exact dealer orderability plus applicable checkout/platform fee treatment is verified. Positive pre-fee economics and live public checkout controls alone do not authorize promotion.

### `RBM500-US` → supplier item `RBM500-G3-US`

- Current Shopify/customer price remains aligned to the current Renogy public reference.
- Live Opera recon on 2026-09-12 shows the exact public `RBM500-US` page exposing Add to Cart / Buy Now controls and 1–3 business day delivery language.
- That public retail state is a customer-surface signal only and does not substitute for dealer orderability/backorder authority.
- Current protected supplier workbook cost is available and has been reconciled privately.
- The current protected pre-fee economics show a positive spread before processor/platform treatment, with a stronger protected dollar-contribution buffer than the current 100W panel candidate.
- Lower-48 supplier shipping guidance: free, subject to exact order-time verification.
- Current dealer orderability/backorder authority still requires authenticated Partner Portal exact-SKU confirmation or an equivalent dealer-authoritative source.
- Exact media identification is now clean at the current Renogy product-source level: the exact `RBM500-US` page exposes the RBM500-specific gallery (`RBM500-_01_` through `RBM500-_07_`), exact wiring image, `RBM500--600_08_`, and an additional exact 500A Battery Monitor image. This source is permitted by the PM4 handoff; binding to the existing Shopify draft remains required before activation.
- Applicable payment processor / Shopify per-order treatment is not yet documented in the Renogy lane strongly enough to close the company profitability gate.

**Current state: `HOLD — ECONOMICS UNKNOWN`** until exact dealer orderability plus applicable checkout/platform fee treatment is verified. Exact media identification is no longer the unresolved source gate, although media binding remains an activation requirement.

## Profit-first launch ranking delta

Under the company profitability workflow, launch ranking must consider:

**CUSTOMER DEMAND / PURCHASE FRICTION + EXPECTED DOLLAR CONTRIBUTION + EXPECTED CONTRIBUTION RATE + BRAND FIT + FULFILLMENT RELIABILITY + SUPPORT / RETURN RISK.**

Renogy's previous merchandising order is therefore no longer controlled only by product appeal or launch cleanliness.

Based on the protected supplier workbook and currently verified customer-price references, `RBM500-US` has the stronger protected pre-fee contribution buffer and remains a low-friction monitoring/cross-sell candidate. With exact media identification now clean, its primary remaining supplier gate is current dealer orderability/backorder authority.

`RSP100DCT-US` remains strategically useful as a solar-panel trust product, but its protected pre-fee economics provide less room for processor/platform costs or future discounts than the monitor candidate.

Do not create a discount on either SKU until expected contribution after all applicable variable costs remains positive and Renogy price controls are preserved.

## Order-time recheck

For every Renogy vendor-fulfilled order:

**PAID ORDER → REVERIFY EXACT SKU → REVERIFY CURRENT PROTECTED DEALER COST → REVERIFY SELLABILITY / BACKORDER AUTHORITY → REVERIFY LOWER-48 SHIPPING TREATMENT → CALCULATE CURRENT EXPECTED CONTRIBUTION → PLACE RENOGY ORDER → CAPTURE ACCEPTANCE / TRACKING → RECORD ACTUAL ORDER ECONOMICS PRIVATELY.**

If a lawful paid customer order becomes unexpectedly negative after checkout because Renogy cost, shipping, availability, or another variable changes, protect the customer obligation, route the exact order as an economic exception, and correct the pricing/source/promotion state before the next order. Do not normalize the loss-making path.

## Renogy catalog expansion rule

The Renogy prospect universe is now subject to profitability screening as part of catalog prioritization.

Maintain protected internal fields for each candidate:

- exact supplier SKU;
- current customer price / Renogy price-control reference;
- current protected dealer cost;
- supplier shipping/freight treatment;
- processor/platform treatment;
- expected order contribution;
- contribution decision state (`PROMOTE`, `HOLD — ECONOMICS UNKNOWN`, `HOLD — NEGATIVE CONTRIBUTION`, `OWNER REVIEW — STRATEGIC EXCEPTION`);
- orderability/backorder state;
- approved-media state;
- warranty/return support state;
- support/return-risk note.

Protected dealer cost, private contribution calculations, credentials, raw inventory, and account-private data stay out of public Git.

## Immediate next actions

1. Use authenticated Opera/Partner Portal access to clear exact dealer orderability/backorder authority for `RSP100DCT-G1-US` and `RBM500-G3-US`, or obtain an equivalent dealer-authoritative exact-SKU response.
2. Resolve actual applicable Shopify/PayPal checkout fee treatment for the intended buy path.
3. Calculate final expected order contribution privately for both launch SKUs.
4. Bind the already-cleared exact/current-authoritative media to the existing Shopify drafts as required.
5. Return `PROMOTE` only for positive-contribution clean SKUs.
6. Re-rank Tier A/Tier B Renogy candidates by demand + contribution + reliability, not low price alone.
7. On first real Renogy order, record actual contribution privately and use actuals to refine future Renogy ranking.

**Control phrase:**

**RENOGY EXACT SKU → PRICE CONTROL → PROTECTED DEALER COST → ORDERABILITY → MEDIA → FULL VARIABLE COSTS → POSITIVE CONTRIBUTION → ACTIVATE / PROMOTE → RECORD ACTUALS → SCALE.**