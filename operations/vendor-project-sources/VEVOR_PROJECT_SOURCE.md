# Elevation UpScales — VEVOR Project Source

**Status:** ACTIVE / PUBLIC-SAFE PROJECT SOURCE  
**Project:** VEVOR Supplier / Catalog / Shopify / Fulfillment  
**Owner:** Casey Young  
**Project Operations Manager:** VEVOR Project Operations Manager  
**Project Specialist:** VEVOR Reconciliation & Price-Control Specialist  
**Human Ecommerce Oversight:** Peter Torres  
**Tailored Workflow:** `../VEVOR_TAILORED_PROJECT_WORKFLOW_2026-09-10.md`  
**Master SOP:** `../VEVOR_VENDOR_MASTER_SOP.md`  
**B-Tier Preparation Receipt:** `../VEVOR_B_TIER_PREPARATION_2026-09-10.md`  
**B-Tier Live Qualification Receipt:** `../VEVOR_B_TIER_LIVE_QUALIFICATION_2026-09-10.md`  
**Fulfillment Qualification Receipt:** `../VEVOR_FULFILLMENT_QUALIFICATION_2026-09-10.md`  
**Current Maturity:** **STAGE 1 — PROVING** for public storefront + first-order proof

## Purpose

Provide one recoverable onboarding/readiness source for turning the verified VEVOR direct relationship into repeatable active Elevation vendor commerce without reopening completed qualification or mixing direct VEVOR with Doba-sourced VEVOR.

## Reusable Elevation onboarding data

- **Legal company:** Elevation UpScales, Inc.
- **Entity:** Colorado profit corporation.
- **Owner / President:** Casey Young.
- **Owner/vendor approval contact:** `casey@elevationupscales.com`.
- **Website / intended direct channel:** `https://elevationupscales.com`.
- **Business model:** lithium battery supply, solar/off-grid power, logistics/market access; RV & Outdoor supporting division.
- **Preferred vendor model:** order-driven / dropship / controlled fulfillment before speculative inventory.
- **Inventory rule:** supplier inventory is not Elevation physical On Hand unless Elevation actually owns/controls it.
- **Protected onboarding packet available:** Colorado formation record, IRS EIN confirmation, signed/current W-9, Colorado sales-tax/resale documentation, current company address/contact record, and supplier-specific tax/account forms where required.
- **Protected payment/account evidence:** kept outside public Git; use the current authorized company record/account.

Do not expose EIN, tax-license numbers, bank/card data, private address data, credentials, signatures, dealer costs, raw supplier inventory or private correspondence in this file.

## Verified supplier/account state

| Onboarding field | Current state | Control / note |
|---|---|---|
| Supplier relationship | **VERIFIED / ACTIVE DIRECT RELATIONSHIP** | VEVOR PRO/direct supplier lane is beyond prospecting. |
| PRO/account setup | **VERIFIED / COMPLETE ENOUGH FOR OPERATIONS** | Generic PRO-registration gate is closed; credentials remain protected. |
| Supplier product feed | **VERIFIED / RECEIVED** | Original/full feed remains source; curated derivatives do not replace it. |
| Direct vs Doba source identity | **VERIFIED / HARD SEPARATION** | Direct VEVOR and Doba-sourced VEVOR remain separate. Never treat Doba VEVOR as direct VEVOR without exact-SKU source reconciliation. |
| Sales channel | **VERIFIED — ELEVATION DIRECT WEBSITE** | Direct VEVOR is not authorized for eBay/Amazon/Walmart/TikTok/other marketplaces absent separate written approval. |
| MAP / price control | **VERIFIED CONTROL EXISTS** | Check feed MAP + current VEVOR public selling price; use higher applicable floor. |
| Current sellability source | **AVAILABLE / MUST BE RECHECKED** | Feed snapshot is not permanent promise; reverify before publication/material price change/order placement. |
| Preorder/backorder | **NOT VERIFIED** | Unavailable direct VEVOR SKU pauses individually unless a valid alternate source/order path is verified. |
| Ship-from / fulfillment | **VERIFIED NORMAL DIRECT ORDER PATH** | VEVOR PRO dropship ordering is placed through the VEVOR website after the customer order; supplier correspondence confirms U.S.-warehouse fulfillment. Exact order still requires live sellability check. |
| Shipping timing | **PLANNING GUIDANCE ONLY** | Supplier correspondence gave ~3–7 working days for U.S.-warehouse delivery; do not promise as a guarantee without order-specific support. |
| Tracking / order status | **SUPPLIER VERIFIED / FIRST ORDER TO PROVE TIMING** | VEVOR confirms tracking is available through Elevation's PRO account. Capture actual carrier/tracking timing and Shopify handoff on first real order. |
| Blind shipping / packing slips | **SUPPLIER VERIFIED — NOT FULLY UNBRANDED** | VEVOR confirms product packaging bears the VEVOR logo. Supplier states invoices/pricing details are not included. Do not market the fulfillment as fully blind/unbranded. |
| Tax/resale treatment | **SUBMISSION COMPLETE / FINAL REVIEW PENDING** | Colorado tax-exemption submission task is complete; pending optimization is not a general commerce blocker if lawful order economics remain executable. |
| Payment setup | **AVAILABLE / PROTECTED** | Use current authorized VEVOR account/payment route; never expose payment details here. |
| Approved media/spec data | **AVAILABLE FOR A + B SETS** | 19 A-tier products and the 17 live-qualified B-tier records have source-backed customer facts/media. Broader feed expansion remains verified-SKU only. |
| Warranty/returns/RMA | **SUPPLIER ROUTE VERIFIED / CASE ACTUALS OPEN** | VEVOR directs Elevation to its current return policy and supplier support process for returns, damage and warranty issues. Exact label/cost treatment remains case-specific and should be captured on the first applicable case. |
| Customer-support ownership | **SUPPLIER VERIFIED — ELEVATION FIRST** | Customer contacts Elevation first; Elevation coordinates the supplier-side issue with VEVOR. |
| Account/catalog contacts | **AVAILABLE THROUGH CURRENT ACCOUNT/CORRESPONDENCE** | Keep private addresses/correspondence outside Git. |
| Source refresh method | **PARTIAL / ACTIVE SOURCE CHECKS** | Feed + live VEVOR selling-price/sellability verification are controlling; formal automation may mature later. |

## Current catalog / commerce state

- A-tier launch is complete: **19 VEVOR Direct A-tier products** are ACTIVE/published in Shopify Admin.
- Existing Doba-sourced VEVOR records remain a separate Doba lane and are not converted into direct VEVOR records.
- Supplier inventory is not represented as Elevation On Hand.
- Customer prices use the current verified VEVOR price/MAP control.
- The **17-SKU B-tier Strong Expansion set is now live-qualified**: exact public VEVOR pages, exact SKUs, current public selling price/feed MAP alignment, source media and Shopify record identity were verified.
- Shopify records now exist for **17 / 17 B-tier SKUs**, and **17 / 17 have Shopify-hosted hero media**. Do not rebuild or duplicate these products.
- A shared Shopify worker repeatedly activated/published the 17 B-tier records while the controlling VEVOR Stage-1 workflow still held publication. The VEVOR manager twice restored the batch to DRAFT/unpublished; the shared worker reactivated it again. Latest stable read during the RUN showed **17 / 17 ACTIVE and attached to the Online Store publication**. This is a concurrency/publication-ownership conflict, not a deliberate Casey-approved B-tier launch under the current VEVOR SOP.
- Do not enter a repeated status-write race with an active shared worker. Preserve the completed records/media and defer the publication-state correction until that worker stops or Casey explicitly changes publication direction.
- Current public storefront proof remains blocked by the Shopify Online Store password gate, not by VEVOR onboarding/catalog readiness.
- Company Operations attempted the exact password-removal action through an authenticated browser route; Shopify Admin was blocked by a Cloudflare verification challenge before the setting could be reached. No store setting changed.
- The connected Shopify Admin API remains available for supported commerce reads but the current password setting remains an authenticated owner/admin action.
- A current Shopify order check returned no orders, so no paid-order proof has started.
- The focused supplier fulfillment follow-up has been answered. Do not recreate that inquiry.

## B-tier publication concurrency control

The authoritative VEVOR-specific rule remains: B-tier publication is not authorized merely because the records exist or a shared worker activated them.

When multiple workers touch the same Shopify records:

1. resolve current Git and current Shopify state first;
2. do not delete or recreate valid records;
3. do not repeatedly overwrite another active worker in a status tug-of-war;
4. record the exact conflicting worktree and defer the status-only correction while the other worker remains active;
5. after the worker stops, reconcile the 17 records once against Casey's newest direction and the then-current VEVOR SOP;
6. absent a newer Casey instruction superseding the hold, staged B-tier intent remains **DRAFT / unpublished** until the Stage-1 storefront publication gate permits expansion;
7. completed live qualification/media work must not be repeated.

See `../VEVOR_B_TIER_LIVE_QUALIFICATION_2026-09-10.md`.

## Fulfillment operating facts now closed enough for first order

Supplier confirmation establishes:

1. **Packaging:** VEVOR branding remains on product packaging.
2. **Price paperwork:** supplier states invoices/price details are not included in the customer package.
3. **Tracking:** use the VEVOR PRO account to retrieve tracking.
4. **Returns / defects / warranty:** use VEVOR's current return-policy/support process.
5. **Customer support:** customer contacts Elevation first; Elevation coordinates with VEVOR.

Remaining proof is transactional, not another onboarding questionnaire: actual tracking timing, first-order completion and first applicable return/RMA label/cost behavior.

## Required onboarding/readiness inputs for expansion

For every new direct VEVOR SKU establish:

**EXACT SKU/MODEL → DIRECT VEVOR SOURCE → APPROVED FACTS/MEDIA → FEED MAP → LIVE VEVOR SELLING PRICE → LIVE SELLABILITY → NORMAL FULFILLMENT → AUTHORIZED DIRECT-SITE CHANNEL**

Only the missing field needed for that SKU/action is a gate.

## Remaining activation proof

1. Preserve storefront password as a deferred owner/admin gate while finishable VEVOR work continues.
2. When authorized access is available, disable/clear the Shopify storefront password.
3. Re-run unauthenticated collection/product/cart/checkout acceptance.
4. Reconcile B-tier publication state once the competing worker is no longer changing the same records, unless a newer Casey direction supersedes the current hold.
5. On first real paid VEVOR order, reverify exact SKU, current VEVOR sellability and price/MAP.
6. Place supplier order through the verified VEVOR account.
7. Capture supplier acceptance, tracking from the PRO account and customer completion.
8. Record actual order result and any exception.
9. Move the repeatable normal-order lane to **CONTROLLED** when proof is clean.

## Real gates

Keep:

- exact SKU/source identity;
- current VEVOR MAP/live-price floor;
- authorized channel;
- live supplier sellability/orderability;
- customer payment/order integrity;
- any genuine tax/legal restriction;
- owner approval for material inventory/financing/contracts/channel expansion.

Do not use completed PRO onboarding, the existence of internal documentation tasks, optional enrichment, or unrelated project status as a checkout blocker.

## Next action

**DEFER PASSWORD + ACTIVE-WORKER PUBLICATION CONFLICT → CONTINUE SAFE VEVOR WORK → WHEN TRIGGERS CLEAR, RECONCILE B-TIER STATUS ONCE + PUBLIC STOREFRONT ACCEPTANCE → FIRST REAL VEVOR ORDER PROOF → RECORD ACTUALS → MOVE NORMAL ORDER FLOW TO CONTROLLED**

## Close condition for active repeatable vendor onboarding

VEVOR is repeatable active vendor commerce when the direct-site storefront/checkout is public and one real paid order completes customer checkout → VEVOR purchase → supplier acceptance → tracking → customer delivery with the ongoing price/source/returns controls documented.
