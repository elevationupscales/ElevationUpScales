# Elevation UpScales — Doba CSV Sync Post-Deployment Addendum

**Date:** 2026-08-28  
**Status:** QUEUED — BEGIN IMMEDIATELY AFTER CURRENT FINAL ADMIN DEPLOYMENT PASSES

## Sequencing
Do not interrupt or widen the currently active Admin deployment. Finish the current release first: build → preview → verify → production → verify → receipt/baseline. Then begin this Doba CSV Sync follow-on from the newly accepted production baseline.

## Owner decision
Doba CSV upload is now the primary Doba source-sync process for Elevation's custom website.

The workflow is:

`Find products in Doba → Download Doba CSV → Upload CSV to Admin → Preview Diff → Approve Sync → Catalog/Inventory reconciliation → Ready-to-Publish queue → Auto Upload → channel reconciliation`

Admin terminology: `Doba — CSV Sync`.

This means manual supplier snapshot retrieval with automatic Admin reconciliation. It is not a live Doba API connection.

## Accepted sample audit
File: `US_Dropshipping_Product_Data_with_25%_Markup_20260829_5188491.csv`

- 32 source rows
- 10 current Catalog Doba Item No. matches
- 22 new Item No. candidates
- current movie-screen Catalog product is absent from this file
- 3 zero-stock rows
- 3 additional rows with stock 1–10
- 24 rows exclude AK/HI
- 8 rows list all 50 states
- 23 rows prohibit Amazon
- 22 rows prohibit Walmart
- 20 rows prohibit Temu
- all 32 have a primary image, source URL, description and processing time
- 12 lack UPC
- 12 lack brand
- 9 lack product weight

## Critical 25% pricing semantics
For all 10 rows overlapping the current Catalog cost snapshot, the CSV `Dropshipping Price (US$)` equals approximately 1.25× current stored supplier cost.

Examples:
- D01027HHGCG: $54.39 current cost → $67.99 CSV
- D01027HX25W: $23.12 → $28.90
- D0102H2V6BY: $51.92 → $64.90
- D0102HGWKXG: $47.12 → $58.90
- D0102HRMZW6: $117.59 → $146.99
- D010277TCB2: $28.72 → $35.90

Therefore `Dropshipping Price` in this marked-up export must NOT be mapped directly to supplier cost.

For saved profile `Doba Download Center — 25% Markup`:

`Derived Base Supplier Cost = Dropshipping Price / 1.25`

Store the selected markup percentage with the import run/profile; do not rely on filename inference for future files.

## Admin location
`Commerce → Channels & Sync → Doba CSV Sync`

Primary action: `Upload Doba CSV`.

Show:
- last upload
- last successful import
- file/fingerprint
- row count
- snapshot scope
- markup profile
- adds
- updates
- reviews
- holds
- errors
- `Upload CSV`
- `Preview Diff`
- `Apply Sync`

## Partial vs Full snapshot
Every import declares scope.

### Partial Snapshot — default
Only rows in the CSV are reconciled. Missing existing products are untouched.

### Full Snapshot
File is explicitly declared the complete managed Doba set. Missing Doba records may become `STALE / SOURCE MISSING`, but are not immediately deleted or blindly unpublished.

The sample must be processed as Partial unless the owner explicitly says it is complete.

## Mapping
- `SPU NO` → Doba source group
- `Item No.` → Doba supplier product ID / primary source identity
- `SKU Code` → exact supplier variant SKU
- `URL` → source URL
- `Dropshipping Price` → marked-up export price for selected profile
- derived base cost → Inventory supplier cost
- `Inventory Qty` → supplier-managed stock quantity
- `Inventory Location` → supplier/source location
- `Shipping Method`, `Ship-to`, `Estimate Shipping Cost`, `Shipping Limitations`, package data → shipping/readiness source metadata
- `Prohibited Marketplace` → channel publish restriction
- images/description/HTML/UPC/ASIN/brand/parameters → source content snapshot

## Reconciliation behavior
### Exact Item No. + exact supplier SKU
Update safe source fields, derived supplier cost, supplier stock, restrictions, shipping/content snapshot and last-source-check. Audit material changes.

### Supplier SKU/variant changed
Do not substitute. Set `REVIEW — SUPPLIER SKU CHANGED`.

### New Doba Item No.
Stage `DRAFT / NEEDS REVIEW`. Never auto-publish an unknown product.

### Stock 0
Supplier unavailable/HOLD according to product state. Never physical On Hand.

### Stock 1–10
Flag low supplier stock.

### Missing in Partial CSV
No action.

### Missing in Full CSV
Mark stale/source-missing for review before destructive action.

### Existing HOLD
CSV can supply evidence, but does not automatically clear a separate channel/SKU/price blocker.

## Required build
1. Add Doba CSV Sync to Channels & Sync.
2. Implement CSV header/schema validation and staging.
3. Saved import profile including markup percentage.
4. Partial/Full snapshot selection.
5. Preview Diff before mutation.
6. Idempotent import run + row-level audit.
7. Exact match/reconciliation.
8. New-product staging.
9. SKU/identity change protection.
10. Supplier stock/cost/shipping/restriction/content update.
11. Feed Products & Listings readiness.
12. Feed Mission Control stale/error/upload-needed signals.
13. Re-run the 32-row sample as production acceptance.
14. Produce deployment/import receipt.
15. STOP.

## Sample acceptance
Preview of the supplied sample should produce approximately:
- 32 source rows
- 10 existing Catalog Item No. matches
- 22 new Item No. candidates
- 3 zero-stock rows
- 3 low-stock rows
- missing movie-screen item unchanged in Partial mode
- 10/10 overlapping derived base costs matching current Catalog costs within rounding tolerance

A materially different result blocks Apply until investigated.

## Final direction
Do not make a Doba API/feed integration a prerequisite for the current Elevation website.

**Download from Doba → Upload CSV → Admin automatically reconciles it.**

This is the standard Doba source-refresh process until management explicitly replaces it.
