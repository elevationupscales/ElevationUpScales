# Elevation UpScales, Inc. — ASAP Admin Catalog Usability / Merchandising / Copy Cleanup

**Project:** Elevation 4.3  
**Date:** 2026-08-29  
**Priority:** ASAP  
**Status:** AUTHORIZED DEPLOYMENT REPAIR  
**Repo main when issued:** `9cf4d28e83a50ea1a7cb8c745ee2e4fd73eb1e0c` — confirm accepted production separately before work.

## Owner finding

The current owner Inventory view shows 76 supplier/inventory records with 58 in the Active view. Doba ingestion is working, but Admin currently behaves like a raw supplier database: long supplier titles, inconsistent source categories, many near-duplicate lithium/power-bank records, no product thumbnails, supplier-managed rows dominated by physical-stock columns, weak listing/readiness visibility, no gross-margin context, and developer/AI-style wording.

This repair must turn the existing system into an owner-usable commerce control system without deleting source truth or creating another product database.

## Preserve

- DEC-006 Doba CSV Sync architecture and Partial Snapshot semantics.
- Saved 25% profile cost derivation.
- Exact supplier Item No./SKU records and audit history.
- Existing HOLD controls.
- Hawaii exact-product/route gates.
- Marketplace separation.
- Checkout/PayPal, Solar Builder, Admin auth and Portal separation.
- DEC-007 multi-provider Apparel direction: Fourthwall / Printful / Spreadconnect are provider relationships under one Catalog.

## Required owner-view repair

For supplier-managed Inventory, make the primary row:

`Thumbnail | Product | Supplier | Cost | Retail | Gross $ | Gross Margin | Supplier Stock | Last Checked | Listing | Blocker | Actions`

Physical On Hand/Reserved/Available remain for tracked/self-stock items but must not dominate dropship rows.

Primary top metrics should become:

- Supplier Products
- Supplier Available
- Supplier Low Stock
- Supplier Out of Stock
- Needs Review
- Physical On Hand

Listing states:

- LIVE
- READY
- DRAFT
- HOLD
- OUT OF STOCK
- SYNC ERROR

## Thumbnails

Add one 48–64px lazy-loaded thumbnail wherever product identity is central: Products & Listings, Inventory, Channels & Sync, Store Orders where available, and Shipping & Logistics where useful. Use Catalog primary image first, source/provider fallback, fixed dimensions, object-fit cover, and a broken-image placeholder. No galleries in table rows.

## Clean display titles

Preserve raw Doba titles as source metadata. Add/use a clean Elevation display title for Admin/public merchandising. Do not invent specifications. Manual overrides must remain possible.

Example source title: `12V 100Ah LiFePO4 Battery, Lithium Battery Built-in 100A BMS 1280Wh, Deep Cycle Battery...`

Example display title: `12V 100Ah LiFePO4 Battery — 100A BMS`

## Category normalization

Doba taxonomy is source metadata, not public store navigation. Normalize to Elevation categories such as Lithium Batteries, Solar & Off-Grid, RV Essentials & Water, Camping & Shelter, Automotive/ATV/Towing, Tools & Workshop, Outdoor Lighting & Power, Travel & Organization, Apparel, and Other / Review.

## Duplicate / variant control

Do not merge or delete exact supplier SKU records. Build a merchandising grouping layer for `DISTINCT PRODUCT`, `VARIANT FAMILY`, `NEAR DUPLICATE — REVIEW`, `DUPLICATE PUBLIC LISTING — HOLD`, and `SOURCE RECORD ONLY`. Prevent near-identical supplier records from becoming a flood of duplicate public cards. Lithium exact SKUs remain distinct internally.

## Economics

Show Supplier Cost, Retail Price, Gross $, and Gross Margin %. `Gross $ = Retail - Supplier Cost`; `Gross Margin % = Gross $ / Retail`. Never call this profit. If payment/channel/shipping/direct costs are incomplete, show `Net Contribution Incomplete`.

## Publication gate

Raw supplier ingestion is not publication authorization. READY requires exact identity/SKU, nonzero cost, acceptable stock, usable image, clean title, normalized category, positive retail, margin guard, understood fulfillment/shipping path, no HOLD, no unresolved duplicate/variant conflict, and applicable marketplace restrictions satisfied. Only READY may become LIVE. Do not mass-publish all active Doba rows.

## Public RV Store

Use clean Elevation titles, normalized categories, images, retail price, concise factual copy and only published/readiness-passing products. Do not expose raw Doba taxonomy, giant SEO titles, duplicate product floods, HOLD products or out-of-stock products as purchasable. Marketplace remains separate.

## Human-voice cleanup

Remove normal owner/customer UI wording such as: `server state is rechecked`, `one writer per field`, `product master`, `API healthy`, `server-side capability`, `Phase 2 commercial-control rule`, `destination-specific hard gate`, `exact product identity + supplier truth`, `without pretending we physically hold stock`, `Seller Hub verified`, `internal record`, build/deployment/release wording, and roadmap notes. Keep architecture language in coordination docs. Use short factual wording and do not make unsupported safe/guaranteed/approved/certified/ships-anywhere/Hawaii-eligible claims.

## Performance

Add pagination/progressive rendering, debounced search, lazy thumbnails, fixed image dimensions, defer provider detail calls until needed, avoid loading legacy eBay data on unrelated pages, and verify mobile Admin usability.

## Receipt requirements

Return parent SHA, accepted production SHA used, result/application SHA, repo main SHA, preview/production URLs, workflow run ID, files changed, schema/migration result, supplier-record preservation result, before/after counts, supplier availability counts, distinct merchandising products, variant families, duplicate/review groups, LIVE/READY/DRAFT/HOLD/OUT OF STOCK/SYNC ERROR counts, missing-thumbnail count, clean-title result, category normalization, margin verification, human-voice cleanup, Doba CSV regression, checkout/Hawaii/Marketplace/Solar/mobile regressions, anomalies, deferred items, rollback baseline, and final PASS / PASS WITH FIXES / HOLD / FAIL.

Preview before production. Verify, deploy, receipt, baseline, and STOP.

---

# COPY / PASTE DEPLOYMENT WORKER PROMPT

```text
You are the deployment worker for Elevation UpScales, Inc. Elevation 4.3.

This is an ASAP owner-usability repair to the current Commerce/Admin deployment. Do not restart the architecture, do not create another Admin system, and do not mass-publish supplier records.

START:
1. Read ELEVATION_4_3_MASTER_STATUS.md and coordination/WORKER_PROTOCOL.md.
2. Read DEC-006, DEC-007, and the current commerce handoff/Issue #24.
3. Confirm current repo main and current accepted production application SHA separately. Repo main when this prompt was issued: 9cf4d28e83a50ea1a7cb8c745ee2e4fd73eb1e0c. Do not assume main equals production.
4. Inspect production Admin before editing.

OWNER VIEW TO FIX:
The current Inventory view contains 76 supplier/inventory records with 58 in Active. Doba ingestion works, but Admin reads like a raw supplier database: long Doba titles, inconsistent categories, many near-duplicate lithium/power-bank products, no thumbnails, dropship rows dominated by physical-stock columns, weak listing status, and developer/AI wording.

REQUIRED REPAIR:
- Add 48–64px lazy-loaded thumbnails to Products & Listings, Inventory, Channels & Sync, Store Orders where available, and Shipping & Logistics where product identity matters.
- Preserve raw supplier titles internally. Add/use clean Elevation display titles for Admin/public use. Never invent specifications.
- Normalize Elevation categories; keep Doba taxonomy only as source metadata.
- Detect/group variants and near duplicates for merchandising without deleting/merging exact supplier SKU records.
- Do not publish duplicate floods. Exact lithium SKUs remain distinct internally.
- Rework Inventory for supplier-managed items around Supplier Stock, Last Checked, Freshness, Listing State and Blocker. Physical On Hand remains for tracked stock only.
- Add listing states LIVE, READY, DRAFT, HOLD, OUT OF STOCK, SYNC ERROR.
- Show Cost, Retail, Gross $, Gross Margin %. Never call gross margin profit. If direct costs are incomplete, show Net Contribution Incomplete.
- Replace top Inventory metrics with Supplier Products, Supplier Available, Supplier Low Stock, Supplier Out of Stock, Needs Review, Physical On Hand.
- Add pagination/progressive rendering and debounced filters.
- Remove internal/developer/AI wording from normal Admin and touched public Commerce screens. Keep architecture language in coordination docs.
- Preserve Doba CSV Sync, Partial Snapshot behavior, 25% profile cost derivation, HOLD gates, Hawaii controls, Marketplace separation, checkout, Solar Builder and Portal separation.
- Do not mass-publish all active Doba records.
- Preserve controlled HOLD items unless their exact blockers are actually resolved.

PUBLIC STORE:
RV Store uses clean Elevation titles/categories/images and only published/readiness-passing products. Do not expose raw Doba taxonomy or giant supplier SEO titles. Keep Marketplace separate. Apparel remains one Catalog with Fourthwall / Printful / Spreadconnect provider relationships.

COPY / HUMAN VOICE:
Remove phrases such as server state is rechecked, one writer per field, product master, API healthy, Phase 2, hard gate, Seller Hub verified, internal record, deployment/build/release language, and roadmap notes from customer/owner UI. Use short factual wording. Do not make unsupported safe/guaranteed/approved/certified/ships-anywhere/Hawaii-eligible claims.

VERIFY:
No source records lost; exact supplier SKUs preserved; Doba CSV Sync works; thumbnail fallback works; variant grouping does not create duplicate public listings; margin math is correct; public store only shows published products; existing checkout/HOLD behavior remains intact; mobile Admin remains usable; preview before production.

FINISH:
Return parent SHA, accepted production SHA used, result/application SHA, repo main SHA, preview/production URLs, workflow run ID, files changed, schema/data migration, before/after counts, LIVE/READY/DRAFT/HOLD/OUT OF STOCK/SYNC ERROR counts, duplicate groups, thumbnail coverage, category normalization, margin verification, copy cleanup, regressions, anomalies, rollback baseline, and PASS / PASS WITH FIXES / HOLD / FAIL.

Complete this scoped repair, verify, deploy, receipt, baseline, and STOP. Do not create more phases.
```
