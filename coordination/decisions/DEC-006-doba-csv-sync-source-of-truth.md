# DEC-006 — Doba CSV Sync Is the Primary Doba Source Refresh

**Date:** 2026-08-28  
**Status:** ACCEPTED

## Decision
For Elevation's custom website, Doba product-source synchronization will use the Doba Download Center CSV workflow as the primary source refresh process until management explicitly replaces it with a verified API/feed integration.

The owner workflow is:

`Download Doba CSV → Upload CSV in Admin → Preview Diff → Approve → Catalog/Inventory reconciliation → listing readiness → channel publish/sync`

This is intentionally a **manual supplier snapshot retrieval + automatic Admin reconciliation** workflow. Admin should label it truthfully as `Doba — CSV Sync`, not as a live Doba API connection.

## Critical pricing rule
The accepted sample export was generated using a 25% markup profile. For all 10 sample rows that overlap the current Catalog cost snapshot, `Dropshipping Price (US$)` is approximately 1.25× the current stored supplier cost.

Therefore a marked-up Doba export must not map `Dropshipping Price` directly to supplier cost.

For the saved 25% profile:

`Derived Base Supplier Cost = Dropshipping Price / 1.25`

Import runs must store the selected markup profile. Do not rely permanently on the filename to infer the percentage.

## Snapshot scope
Every CSV import must be explicitly `Partial Snapshot` or `Full Snapshot`.

Default: `Partial Snapshot`.

A missing row in Partial mode has no effect on existing Catalog products. Full Snapshot may mark missing Doba records stale/source-missing, but must not silently delete them.

## Safety
- exact Doba Item No. + supplier SKU controls identity;
- SKU/variant changes require review and cannot silently substitute;
- new Doba items stage as Draft/Review rather than auto-publish;
- zero supplier stock becomes unavailable/HOLD as appropriate;
- marketplace and ship-to restrictions must be parsed before channel eligibility;
- CSV source stock remains supplier-managed and never becomes physical On Hand;
- existing product HOLD states are not automatically cleared solely because a CSV row exists;
- all imports require Preview Diff and row-level audit.

## Sequencing
Do not interrupt the currently active final Admin deployment. Begin Doba CSV Sync implementation immediately after that release is deployed and verified, using the newly accepted production baseline.
