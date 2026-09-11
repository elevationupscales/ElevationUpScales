# VEVOR — SHARED WORKER SOURCE

**Company:** Elevation UpScales, Inc.  
**Supplier:** VEVOR  
**Shared location:** `operations/vendor-source/vevor/2026-09-10/`  
**Purpose:** Common source package for Elevation managers, vendor workers, catalog workers, Shopify workers, and operations.

## READ ORDER

1. `00_START_HERE.md`
2. `01_VEVOR_PROJECT_MASTER_PROMPT.md`
3. `02_VEVOR_CURRENT_PROJECT_STATE.md`
4. `VEVOR_A_TIER_RUN_COMPLETE_2026-09-10.xlsx`
5. `04_Elevation_VEVOR_Curated_Catalog_Working_Set_2026-09-10.xlsx`
6. `05_VEVOR_Curated_40.csv`
7. `06_VEVOR_All_Products_Light.csv` — generated in Git from the supplier source feed
8. `07_VEVOR_Catalog_SOP_2026-09-10.md`
9. `09_SOURCE_MASTER_NOTE.txt`

## CURRENT CONTROL

- VEVOR PRO is active.
- A-tier live verification is complete for 19/19 products.
- The 19 A-tier Shopify records already exist and are ACTIVE as `VEVOR-Direct`.
- The `VEVOR Direct` collection is already published to the Online Store.
- Do **not** recreate or duplicate those products.
- VEVOR-via-Doba remains a separate sourcing lane.
- Remaining A-tier waits are supplier/account confirmations: blind shipping/packing slips, tracking handoff, RMA/returns, customer-support routing, and final tax-exemption review.

## PUBLIC-REPOSITORY SECURITY CONTROL

The ElevationUpScales GitHub repository is public. The Colorado wholesale sales-tax license image and tax-account identifier are therefore **not stored in this Git path**. Workers should use the restricted VEVOR/account record when that document is actually required.

Do not add tax-license images, tax-account IDs, passwords, API keys, payment information, or other credentials to this public repository.
