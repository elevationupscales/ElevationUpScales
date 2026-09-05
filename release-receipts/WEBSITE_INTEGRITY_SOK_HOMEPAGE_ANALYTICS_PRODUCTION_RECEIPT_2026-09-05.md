# Website Integrity / SOK Homepage / Analytics — Production Receipt

Date: 2026-09-05

Disposition: PRODUCTION ACCEPTED

## Lineage
- Production parent: `253b4f326b6bc5a616c481a59cc06cfe03abccff`
- Accepted application SHA: `176dbd96cac420b1e52e4fb19ab2483a6caeb46b`
- Permanent baseline: `baseline-2026-09-05-website-integrity-sok-homepage-analytics-production`

## Validation
- Final RC run: `33944263215` — PASS
- Production run: `33944483511` — PASS
- Static / JavaScript / protected SOK gates — PASS
- Existing SOK commercialization smoke — PASS
- Existing SOK full-line smoke — PASS
- Website-integrity smoke — PASS
- Sitemap and internal-route checks — PASS
- Browser console/runtime/mobile RC gate — PASS
- Immutable production smoke — PASS
- Canonical production smoke — PASS

## Deployment
- Immutable production: `https://78494b0e.elevationupscales.pages.dev`
- Canonical: `https://elevationupscales.com`

## Approved production changes
- Added homepage SOK merchandising and anchor-product visibility.
- Preserved full-line SOK catalog architecture and existing purchase-mode boundaries.
- Simplified SOK Purchase Options to the approved short customer flow.
- Corrected conditional Hawaii-island field visibility so it does not appear outside Hawaii context.
- Added/normalized approved SOK/customer-intent analytics events and central dedupe behavior.
- Expanded approved SK48 manufacturer-media presentation.
- Removed stale `/project-guides` sitemap entry after RC crawl verified the advertised route returned 404.

## Protected systems preserved
- SOK MAP and public pricing controls unchanged.
- PayPal / checkout architecture unchanged.
- Hawaii 1–3 freight-review and 4+ commercial-review policy unchanged.
- Supplier cost, inventory, carrier, DG, landed economics and internal lifecycle data remain private.
- Pricing 2.0 importer was not rerun.
- No production data migration/write was performed.

Final status: **PASS / PRODUCTION ACCEPTED**.
