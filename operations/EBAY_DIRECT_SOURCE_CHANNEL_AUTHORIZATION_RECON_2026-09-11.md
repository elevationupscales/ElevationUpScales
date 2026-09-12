# Elevation UpScales — eBay Direct-Source Channel Authorization RECON

**Owner:** Casey Young  
**Date:** 2026-09-11 MDT  
**Lane:** eBay Store Operations / Ecommerce & Vendor Operations  
**State:** ACTIVE SOURCE-CONTROL RECEIPT / OWNER CLARIFICATION APPLIED

## Purpose

Prevent the eBay contraction/rebuild from confusing **direct-manufacturer sourcing permission** with **Doba marketplace sourcing authority**.

These are separate source paths.

**DIRECT-MANUFACTURER AUTHORIZATION RULES CONTROL DIRECT SOURCING.**  
**DOBA PRODUCT-LEVEL MARKETPLACE/MAP RULES CONTROL DOBA-SOURCED LISTINGS.**

A listing must not be removed solely because Elevation lacks direct eBay authorization from the manufacturer when the exact product is legitimately offered through Doba for eBay and the Doba product-level MAP/channel/availability/fulfillment controls pass.

## Owner clarification — controlling eBay source rule

For an exact SKU sourced through Doba:

- separate direct-manufacturer eBay authorization is **not required as an Elevation direct-source gate**;
- the Doba listing/source relationship is the operative supply path;
- the exact Doba SKU must permit eBay or must not identify eBay as a prohibited marketplace;
- Doba MAP or other product-level pricing rules must be followed;
- current inventory, destination restrictions, fulfillment reliability and full landed economics must still pass;
- any explicit product-level restriction that names eBay remains controlling;
- a Doba-backed listing may remain live even when the corresponding manufacturer is not approved for **direct** eBay sourcing.

This means Kingboss systems or other manufacturer-branded products already carried through Doba are **not automatically removal candidates** merely because direct Kingboss/manufacturer eBay permission is pending or unavailable.

## Current channel authorization

| Supplier / Path | eBay Source State | Evidence / Control | eBay Action |
|---|---|---|---|
| VEVOR Direct | **PROHIBITED / CURRENT WRITTEN RESTRICTION** | VEVOR Business Development Manager explicitly stated VEVOR is not currently granting authorization for Amazon, Walmart, eBay, etc., and directed Elevation to start with its independent website. | Do not source eBay orders **directly from VEVOR**. This does **not** by itself require removal of an exact VEVOR-branded SKU legitimately sourced through Doba where Doba permits eBay and the listing passes MAP/economics/fulfillment controls. |
| Renogy Direct | **PROHIBITED UNDER CURRENT DEALER TERMS** | Current Renogy dealer relationship does not authorize Elevation direct sourcing for third-party marketplace sales. | Do not source eBay orders **directly from Renogy** under the current dealer relationship. A distinct Doba-supplied SKU is evaluated under Doba product-level eBay/MAP controls instead of the direct Renogy gate. |
| SOK Direct | **HOLD — EBAY DIRECT PERMISSION NOT PROVEN** | Current SOK evidence proves dealer/direct-site relationship but does not yet prove Elevation may source directly from SOK for eBay. | Do not migrate to **direct SOK sourcing** until written eBay/channel permission is verified. Existing or future Doba-sourced SOK-family products are evaluated independently under exact Doba SKU rules. |
| Kingboss Direct | **HOLD — EBAY DIRECT PERMISSION NOT PROVEN** | Kingboss has approved Elevation for B2B wholesale/dropship capability, but direct eBay marketplace permission remains under clarification. | Do not migrate to **direct Kingboss sourcing** until written eBay/channel permission is verified. Do **not** remove Kingboss systems merely for this reason when the exact SKU remains a valid Doba eBay source path. |
| Doba by exact SKU | **AUTHORIZED MARKETPLACE SOURCE PATH BY PRODUCT** | Doba supplies marketplace products under product-level MAP/channel/destination/availability rules. Manufacturer direct-source approval is a separate issue. | Keep/list exact Doba SKUs on eBay when eBay is permitted, MAP/channel restrictions pass, inventory/destination are executable, and contribution/fulfillment standards pass. |

## Doba retention rule

For every existing Doba-backed eBay listing, classify on the actual Doba product facts:

**EXACT SKU → EBAY ALLOWED → MAP/PRICE COMPLIANT → INVENTORY → DESTINATION ROUTING → LANDED COST → POSITIVE CONTRIBUTION → FULFILLMENT RELIABILITY → KEEP / REPRICE / REBUILD / END.**

Do **not** classify `END` merely because the underlying brand is Kingboss, VEVOR, Renogy, SOK, or another manufacturer whose **direct** eBay authorization is absent.

A Doba-backed listing should be ended or rebuilt only for a real product-level reason such as:

- eBay explicitly prohibited for that Doba SKU;
- MAP cannot be met profitably;
- source cost destroys contribution;
- inventory or destination routing is unreliable;
- fulfillment performance is unacceptable;
- listing demand is too weak to justify retention;
- product identity/source mapping cannot be verified.

## Direct-source replacement rule

Direct sourcing remains a separate upgrade path. Before replacing Doba with a manufacturer-direct source:

**PROVEN DEMAND → WRITTEN DIRECT EBAY CHANNEL AUTHORIZATION → EXACT SKU/SOURCE → CURRENT LANDED COST → POSITIVE CONTRIBUTION → SHIPPING/HANDLING PLAN → MANAGER PASS → SWITCH SOURCE.**

Until that direct authorization exists, keep a valid Doba source where it passes product-level controls rather than removing the listing solely because direct permission is missing.

## No inference rule for direct sourcing

Do not infer **direct-manufacturer eBay authorization** from any of the following by themselves:

- dealer status;
- wholesale approval;
- downstream-reseller approval;
- one-piece dropship capability;
- possession of product images/specifications;
- MAP/pricing documentation;
- Shopify/direct-site authorization.

This no-inference rule applies to **direct manufacturer sourcing**. It does not invalidate a separate Doba marketplace source path for an exact SKU that Doba makes available for eBay under its product-level controls.
