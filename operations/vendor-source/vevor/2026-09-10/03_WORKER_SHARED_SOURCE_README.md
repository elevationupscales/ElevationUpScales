# VEVOR — SHARED WORKER SOURCE

**Company:** Elevation UpScales, Inc.  
**Supplier:** VEVOR  
**Shared location:** `operations/vendor-source/vevor/2026-09-10/`  
**Authoritative current state:** `operations/vendor-project-sources/VEVOR_PROJECT_SOURCE.md`

## READ ORDER

1. `13_VEVOR_PROJECT_SOURCE_CURRENT.md` — generated copy of current company VEVOR source
2. `00_START_HERE.md`
3. `01_VEVOR_PROJECT_MASTER_PROMPT.md`
4. `02_VEVOR_CURRENT_PROJECT_STATE.md`
5. `VEVOR_A_TIER_RUN_COMPLETE_2026-09-10_PUBLIC_SAFE.xlsx`
6. `04_Elevation_VEVOR_Curated_Catalog_Working_Set_2026-09-10_PUBLIC_SAFE.xlsx`
7. `05_VEVOR_Curated_40.csv` + `05_VEVOR_Curated_40_CONTROL.json`
8. `06_VEVOR_All_Products_Light.csv`
9. `07_VEVOR_Catalog_SOP_2026-09-10.md`

## CURRENT CONTROL

- VEVOR PRO/direct relationship is active.
- 19 direct VEVOR A-tier Shopify products are active/published.
- Direct VEVOR and Doba VEVOR remain separate sourcing lanes.
- Supplier fulfillment questions are answered: VEVOR-branded packaging remains; price/invoice details are not included; tracking comes from the PRO account; returns/warranty use VEVOR's support route; Elevation owns the customer-facing support relationship.
- Current storefront blocker is Shopify Online Store password protection, not VEVOR onboarding.
- First paid VEVOR order proof remains open.
- 17-SKU B-tier queue is prepared and held for Stage-1 authorization + fresh SKU checks.
- Tax-exemption submission is complete; final review remains pending/non-blocking unless an actual order issue appears.

## BUILD / PORTABILITY

`.github/workflows/vevor-worker-assets.yml` reconstructs the large/light feed, curated CSV, public-safe workbooks, SHA256 manifest and a single public-safe worker ZIP from the official supplier feed + committed catalog control source. This lets any Elevation worker recover the working assets from Git without this chat.

## PUBLIC-REPOSITORY SECURITY CONTROL

This repository is public. Do not add tax-license images, tax/account IDs, EIN/W-9 signatures, passwords, API keys, payment data, private addresses or private correspondence. Restricted company/account evidence stays outside public Git.
