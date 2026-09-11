# Renogy Lower-48 Backorder & Warranty Program — Specialist Findings

**Date:** 2026-09-10  
**Project:** Renogy Dealer / Catalog / Commerce Integration  
**Role:** Renogy Project Specialist — availability / sellability / warranty / RMA verification  
**Reports To:** Renogy Branch Operations Manager  
**Status:** DRAFT FOR PROJECT MANAGER ACCEPTANCE / PUBLIC-SAFE  
**Controlling SOP:** `RENOGY_VENDOR_MASTER_SOP.md`  

> This is a supporting specialist findings/program file. It does **not** replace the Renogy Vendor Master SOP, Current Work Board, supplier portal evidence, or the Branch Operations Manager's control of the worktree.

## 1. Executive finding

### Backorder verdict

**RENOGY BACKORDER / PREORDER IS SUPPORTED AS A SKU-SPECIFIC AVAILABILITY STATE, NOT AS A BLANKET PERMISSION FOR EVERY OUT-OF-STOCK ITEM.**

Current public Renogy US catalog evidence shows all three states can coexist:

- ordinary **In stock** inventory;
- ordinary **Out of stock / Unavailable** inventory;
- selected products explicitly marked **Pre-order** and, in at least one current catalog example, an explicit dated **Back Order** notice.

Therefore Elevation must **not** globally convert Renogy zero-stock/out-of-stock products into purchasable backorders.

### Required catalog rule

For each Renogy SKU:

1. Verify the exact Renogy SKU/model.
2. Read the current supplier availability source / Partner Portal state.
3. Classify availability as one of:
   - `IN_STOCK`
   - `PREORDER_AUTHORIZED`
   - `BACKORDER_AUTHORIZED`
   - `OUT_OF_STOCK_NOT_ORDERABLE`
   - `UNKNOWN_HOLD`
4. Set `backorder_allowed=true` **only** when the current Renogy source explicitly supports preorder/backorder purchase for that exact SKU or the Partner Portal/order path accepts it under current dealer terms.
5. Preserve any supplier ETA/backorder date as supplier-provided data; do not invent an ETA.
6. Reverify availability immediately before placing a real supplier order.

**Default for an unavailable SKU with no explicit preorder/backorder evidence: `backorder_allowed=false`.**

Public storefront evidence establishes that Renogy operates SKU-level preorder/backorder states. It does **not**, by itself, establish a blanket dealer-account right to backorder every unavailable SKU. The dealer Partner Portal remains the controlling source for supplier-order acceptance.

## 2. Lower-48 scope

The current approved dealer record in `RENOGY_VENDOR_MASTER_SOP.md` states Renogy supports direct-to-customer dropshipping and free shipping within the **48 contiguous U.S. states**. This program therefore begins with the Lower-48 catalog only.

For this program:

- `lower_48_eligible=true` applies only after the normal Renogy fulfillment path is verified for the SKU.
- Alaska, Hawaii, U.S. territories, international destinations, and special dangerous-goods routes remain outside this Lower-48 program unless separately qualified.
- Ordinary dealer approval must not be interpreted as authorization for special-route battery freight.

## 3. Warranty source hierarchy

Use this order for customer-facing warranty facts:

1. exact current Renogy product page for the exact SKU;
2. current Renogy **Limited Warranty for All** document;
3. current Partner Portal/dealer warranty or RMA instruction if it supplements the public terms;
4. Renogy Warranty/Technical Support written case determination for an actual claim.

When sources conflict, hold the affected warranty statement and route the discrepancy to the Renogy Branch Operations Manager for reconciliation. Do not advertise the more favorable term without verification.

Primary public sources verified 2026-09-10:

- Renogy Warranty FAQ: `https://www.renogy.com/pages/shipping_warranty_return_faq`
- Renogy Limited Warranty for All, current file published May 2026: `https://www.renogy.com/cdn/shop/files/RNG-4-243_Limited_warranty_A9_ALL_1__20260519141306.pdf`
- Renogy Return & Refund Policy: `https://www.renogy.com/pages/return-refund-policy`
- Renogy All Products catalog / availability evidence: `https://www.renogy.com/collections/all-products`

## 4. Warranty program operating rule

Renogy warranty must be attached to the **exact SKU**, not inferred solely from a broad product category.

The current May 2026 Renogy warranty document contains different warranty durations even within the same product family. Examples include:

- LFP batteries with 3-, 5-, 7-, and 8-year prorated material/workmanship terms depending on exact SKU;
- solar panels/kits with material/workmanship terms ranging from 1 year through 10 years depending on exact SKU, plus separate performance-warranty schedules for specified panels;
- charge controllers with 1-, 2-, 3-, or 5-year terms depending on exact SKU;
- inverters/inverter-chargers with terms ranging from 1 year through 10 years depending on exact SKU;
- a listed microinverter with a 25-year material/workmanship term;
- battery chargers with 1-, 2-, 3-, or 5-year terms depending on exact SKU;
- monitoring/accessory products with varying 1-, 2-, and 5-year terms;
- refurbished product grades with separate limited terms.

Because of that variation, **no generic statement such as “all Renogy batteries have a 5-year warranty” or “all Renogy panels have a 10/25 warranty” may be applied across the Lower-48 catalog.**

## 5. Normalized warranty fields for every Lower-48 Renogy SKU

The existing Elevation catalog record should carry or reference the following public-safe/internal fields:

| Field | Required behavior |
|---|---|
| `supplier` | `Renogy` |
| `manufacturer_sku` | Exact Renogy SKU/model |
| `product_name` | Current verified title |
| `lower_48_eligible` | Boolean; verified normal fulfillment only |
| `availability_status` | Controlled state from Section 1 |
| `backorder_allowed` | Boolean; false unless exact supplier evidence supports it |
| `backorder_or_preorder_type` | `NONE`, `PREORDER`, `BACKORDER` |
| `supplier_eta` | Exact supplier date/window or blank |
| `availability_source` | Public product/catalog source or protected portal pointer |
| `availability_verified_at` | Timestamp |
| `warranty_policy_class` | SKU-mapped Renogy warranty class |
| `workmanship_term` | Exact current term |
| `performance_warranty` | Exact panel performance term where applicable; otherwise blank |
| `prorated` | Boolean / exact schedule reference where applicable |
| `warranty_start` | Usually end-user purchase date under current written policy; verify SKU exception |
| `original_purchaser_required` | Current policy flag |
| `proof_of_purchase_required` | Current policy flag |
| `registration_path` | Renogy warranty registration/support path |
| `claim_channel` | Renogy Technical Support / Warranty Team |
| `rma_required` | Current policy flag |
| `return_or_rma_deadline` | Exact applicable written deadline where relevant |
| `warranty_shipping_rule` | Exact current written allocation; no invented promise |
| `labor_covered` | Current written rule |
| `replacement_effect_on_term` | Whether replacement restarts/extends term; current policy says original term continues |
| `notable_exclusions` | Condensed verified exclusions, not marketing copy |
| `warranty_source` | Exact URL/document + revision/effective marker if available |
| `warranty_verified_at` | Timestamp |
| `verification_state` | `EXACT`, `UNKNOWN_HOLD`, or manager-approved equivalent |

Protected dealer pricing, portal credentials, private inventory counts, customer PII, and private supplier correspondence must remain outside public Git.

## 6. Current claim/RMA baseline

Current Renogy written policy supports this baseline workflow:

**CUSTOMER CLAIM → ELEVATION CAPTURES ORDER/SKU/SYMPTOM → RENOGY TECHNICAL SUPPORT / WARRANTY CASE → DIAGNOSTIC STEPS → RENOGY DETERMINATION → RMA IF REQUIRED → AUTHORIZED RETURN / REPAIR / REPLACEMENT / ELIGIBLE REFUND → CUSTOMER UPDATE → RECEIPT/CLOSE**

Current public warranty terms state, among other things:

- warranty begins from purchase by the end user/purchaser under the general limited warranty;
- Renogy may repair, replace with new/refurbished equal-or-greater performance product, or in qualifying circumstances refund;
- the general warranty extends to the original purchaser and original order information is needed for a claim;
- Renogy technical support may require testing/troubleshooting before warranty service is approved;
- returns for warranty service require prior written authorization / a valid RMA number;
- the current limited warranty states the product/component should be returned within 15 days after RMA issuance unless Renogy directs otherwise;
- valid warranty return shipping is handled under Renogy's written terms; invalid claims can create customer costs;
- warranty service/replacement does not restart or extend the original warranty period;
- labor and incidental installation/removal/system-test costs are not covered by the general limited warranty;
- installation/operation outside Renogy instructions, unauthorized modification/repair, misuse, certain environmental/electrical conditions, and other listed exclusions can void or defeat coverage.

For customer-facing use, Elevation should promise only: **“We will help route and document your Renogy warranty claim under the warranty applicable to your exact product. Final warranty authorization and remedy are determined by Renogy under its current written terms.”**

## 7. Return-policy separation

Do not merge ordinary returns with warranty claims.

Current Renogy public policy distinguishes:

- direct renogy.com returns;
- warranty/quality claims after the ordinary return window;
- third-party-vendor returns;
- product-specific exceptions such as AGM/GEL restrictions and selected lithium/inverter return windows.

Elevation is an approved dealer, so the customer-facing Elevation return process must be reconciled with the dealer/Partner Portal procedure before copying renogy.com retail return promises verbatim. Warranty coverage for Renogy-manufactured products can still route through Renogy according to the applicable exact-product terms.

## 8. Lower-48 warranty publication gate

A Renogy SKU may display an exact warranty promise on ElevationUpScales.com only when the following are verified together:

**EXACT SKU → CURRENT PRODUCT FACTS → CURRENT SELLABILITY → LOWER-48 FULFILLMENT → EXACT WARRANTY TERM → WARRANTY SOURCE POINTER**

If the exact SKU appears in the current warranty document, map that exact row/class. If it is absent, use the current product-page warranty and/or Partner Portal/written Renogy confirmation. If the term remains unclear, publish no invented duration; set `UNKNOWN_HOLD` for the warranty enrichment while continuing other safe SKU work as permitted by the controlling workflow.

## 9. Availability refresh behavior

Availability is perishable operating data.

Recommended controls:

- refresh supplier availability before publication;
- refresh again before accepting/committing an exceptional backorder ETA to a customer;
- always reverify before Partner Portal purchase after a customer order;
- if an authorized preorder/backorder changes to unavailable with no accepted supplier order, stop presenting the old ETA as current;
- preserve the customer order obligation and route fulfillment rather than silently canceling or substituting a different SKU;
- substitutions require exact compatibility and customer/manager approval where applicable.

## 10. Manager acceptance decisions requested

The Renogy Branch Operations Manager should record/accept these as project operating rules if consistent with current Partner Portal evidence:

1. **Backorder mode = SKU-specific / supplier-authorized only.**
2. **Generic out-of-stock ≠ backorderable.**
3. **Preorder and backorder remain separate availability states.**
4. **Exact Renogy SKU controls warranty duration and performance terms.**
5. **Lower-48 program excludes special-route Alaska/Hawaii/territory/DG assumptions.**
6. **Warranty claims route through Renogy technical/warranty authorization; Elevation supports the customer but does not self-authorize Renogy remedies.**

If the Partner Portal supplies a dedicated dealer backorder rule that differs from public SKU behavior, the manager should treat that private dealer evidence as controlling for order execution and revise the public-safe operating rule without exposing protected commercial data.

## 11. Specialist return

**RENOGY COMPLETED:** Current Git/SOP workflow resolved; current Renogy public backorder/preorder behavior verified; current May 2026 warranty source reviewed; Lower-48 warranty/backorder normalization and claim program initialized.  
**RENOGY CURRENT:** Exact-SKU warranty mapping and availability classification can now proceed against the Lower-48 catalog/source feed as exact SKUs are normalized.  
**RENOGY WAITING/BLOCKED:** Blanket dealer-account backorder authorization is not established from public evidence; Partner Portal/source evidence is required before treating unavailable unmarked SKUs as orderable. Exact SKU warranty enrichment remains SKU-by-SKU.  
**RENOGY OWNER GATE:** None for this supporting program.  
**RENOGY NEXT:** Branch Operations Manager accepts/reconciles the rules, then routes the current Lower-48 SKU source/feed for batch exact-SKU warranty + availability mapping.  
**ROUTE REQUIRED:** Renogy Branch Operations Manager — acceptance/recording into controlled Renogy worktree; Catalog worker only if a bounded implementation handoff is needed.
