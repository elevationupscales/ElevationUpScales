# SOK Full-Line Catalog — Production Receipt

Date: 2026-09-04 (Management local date)

## Release identity

- Validated application SHA: `fb8d8bc9e394d0b4ba478ba5c475e7a344ad2233`
- Final clean release SHA: `0dc18bb546a542da4ae98713dc57bd59e7b02c42`
- Production application SHA: `0dc18bb546a542da4ae98713dc57bd59e7b02c42`
- Production parent before promotion: `11af67c46b19979a08a836d384c051c0b04a15d4`
- Rollback baseline: `baseline-2026-09-04-sok-full-line-production`

The delta from the validated application SHA to the final clean release SHA is QA-only: the SOK preview MAP assertion was aligned with the approved full-line rule that unpriced SKUs use Purchase Options until SKU-specific MAP is verified. No `site/` application behavior changed in that cleanup commit.

## Release Candidate

- RC workflow: `One-time SOK Full-Line Final RC Sweep`
- RC run: `33940268474`
- RC immutable preview: `https://24166709.elevationupscales.pages.dev`
- Lineage: PASS
- SOK commercialization static gate: PASS
- SOK full-line static gate: PASS
- JavaScript syntax: PASS
- SOK commercialization preview smoke: PASS
- SOK full-line preview smoke: PASS
- Protected customer routes: PASS

## Production

- Production workflow: `One-time SOK Full-Line Production`
- Production run: `33940399433`
- Immutable production deployment: `https://9cf0e7a1.elevationupscales.pages.dev`
- Canonical production: `https://elevationupscales.com`
- Exact production source enforcement: PASS
- Immutable production smoke: PASS
- Canonical production smoke: PASS on first canonical attempt

## Commercial controls

- Existing SOK anchor pricing preserved: PASS
- MAP / unpriced Purchase Options rule: PASS
- Promotions cannot reduce SOK below approved MAP / unpriced products are not advertised with guessed pricing: PASS
- Hawaii 1–3 qualification / 4+ commercial-review controls: PASS
- Purchase Options / product-aware inquiry: PASS
- Supplier-data exposure protection: PASS
- Local SOK media and published SOK routes: PASS
- Solar Builder SK48 integration: PASS
- Lower-48 / checkout / core route regressions: PASS

## Canonical route smoke

The following canonical routes returned HTTP 200 during the production workflow:

- `/`
- `/store`
- `/rv-store`
- `/lithium-batteries`
- `/hawaii-lithium-batteries`
- `/sok-batteries`
- `/checkout/`
- `/start-a-project`
- `/solar-project`
- `/marketplace`

Representative SOK routes also passed in immutable and canonical smoke, including `/sok-batteries`, `/sok/sk12v100h/`, `/sok/sk24v150ph/`, `/sok/sk48v100n/`, `/sok/sktc30-smart-battery-monitor/`, `/sok/48v-battery-cabinet/`, and `/sok-order.html`.

## Disposition

**SOK FULL-LINE CATALOG — PRODUCTION ACCEPTED**

No rollback was required. No additional production deployment is required for this receipt-only commit.
