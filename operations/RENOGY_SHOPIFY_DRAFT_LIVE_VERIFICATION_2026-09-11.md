# Elevation UpScales — Renogy Shopify Draft Live Verification

**Status:** PASS / FIVE DRAFTS CONTAINED / ZERO RENOGY ACTIVATIONS  
**Date:** 2026-09-11  
**Owner:** Casey Young  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Source:** Connected Elevation Shopify Admin live product search

## Live verification

A live Shopify Admin search for `vendor:Renogy AND status:draft` returned exactly five current Renogy products. All five remain `DRAFT`; no Renogy product was activated during this verification.

| Shopify Product | Staged SKU | Live State | Current control |
|---|---|---|---|
| Renogy 100W N-Type Bifacial Solar Panel | `RSP100DCT-US` | DRAFT | activation QA may continue; mapped supplier item remains reconciled separately |
| Renogy 500A Battery Monitor with Shunt | `RBM500-US` | DRAFT | activation QA may continue; exact warranty wording remains bounded |
| Renogy 50A IP67 DC-DC Battery Charger with MPPT | `RBC2125DS-21W-US` | DRAFT | current dealer orderability / delayed-order authority still held |
| Renogy 2000W 12V Pure Sine Wave Inverter | `RNG-INVT-2000-12V-P2-US` | DRAFT | supplier generation/order-source identity still held |
| Renogy Rover Li 40A MPPT Solar Charge Controller | `RNG-CTRL-RVR40` | DRAFT | exact current variant identity still held |

All five currently show zero Shopify on-hand inventory. That zero is an Elevation Shopify inventory state and must not be interpreted as proof of supplier unavailability or as automatic backorder authorization.

## Publication protection

The live Shopify state matches `RENOGY_SUPPLIER_SOURCE_INTAKE_AND_SKU_ALIAS_RECON_2026-09-11.md`:

- preserve the existing five drafts;
- do not recreate them;
- do not activate ambiguous variants;
- do not treat generic zero inventory as paid-backorder authority;
- verify exact supplier orderability and current customer-facing price/reference immediately before activation;
- attach exact approved Renogy media before activation.

## Next action

Use the authenticated Renogy Partner Portal session to resolve the three held item/variant/orderability questions. When a product clears its exact gates, activate that SKU individually and run public product/cart/checkout QA without waiting for the entire Renogy catalog.

**Control phrase:**

**FIVE DRAFTS VERIFIED → ZERO ACCIDENTAL ACTIVATIONS → HOLD ONLY THE THREE EXACT QUESTIONS → ACTIVATE CLEAN SKUS INDIVIDUALLY.**
