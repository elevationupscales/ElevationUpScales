# Website Rebuild — Final Changed-File Manifest

## Control

- Accepted production base: `995ddef117be2ba5b26e154ea43409271fc938a9`
- Final validated application candidate: `0ad9c73781d82fc276476fe6123b4c27cd544492`
- Validation run: `33973499299`
- Validated preview: `https://fb9fc421.elevationupscales.pages.dev`
- Git relation: `48 commits ahead / 0 behind`
- Production `main`: unchanged

This manifest is generated from the exact Git compare:

`995ddef117be2ba5b26e154ea43409271fc938a9...0ad9c73781d82fc276476fe6123b4c27cd544492`

Receipt-only commits that update this document or the production handoff do not change the validated `site/` application candidate.

## Workflows / build control

- `M .github/workflows/release-candidate-gate.yml`
- `A .github/workflows/website-rebuild-complete-code.yml`
- `A package.json`

## Rebuild scripts

- `A deployment/rebuild/README.md`
- `A deployment/rebuild/extract-worker-routes.py`
- `A deployment/rebuild/finalize-cleanup.py`
- `A deployment/rebuild/finish-worker-imports.py`
- `A deployment/rebuild/integrate-worker-shared-foundation.py`
- `A deployment/rebuild/split-worker-core.py`
- `A deployment/rebuild/verify-complete-rebuild.py`

Final script disposition:

- canonical active verifier: `verify-complete-rebuild.py`;
- one-shot splitter/cleanup mutation behavior retired;
- final CI validates committed source and never generates/recommits runtime code.

## QA / receipts

- `A deployment/qa/CLOUDFLARE_BINDING_NAME_INVENTORY.md`
- `A deployment/qa/LEGACY_COMPATIBILITY_AUDIT.md`
- `A deployment/qa/PHASE7_FINAL_STABILIZATION.md`
- `A deployment/qa/RUNTIME_ROUTING_AUDIT.md`
- `A deployment/qa/WEBSITE_REBUILD_FINAL_MANIFEST.md`
- `A deployment/qa/WEBSITE_REBUILD_PRODUCTION_HANDOFF.md`
- `A deployment/qa/WORKER_ROUTE_OWNERSHIP.md`
- `A deployment/qa/clean-baseline-preview.sh`
- `A deployment/qa/clean-baseline-static.mjs`
- `A deployment/qa/phase2a-admin-static.mjs`
- `M deployment/qa/website-integrity-static.mjs`
- `A deployment/qa/worker-import-surface-static.mjs`

## Public/Admin browser consolidation

- `M site/site-shell.js`
- `M site/sok-order.js`
- `M site/admin-command-center.js`
- `M site/admin-command-center.css`
- `D site/admin-command-center-pass1.css`
- `M site/admin-overview.js`

## Worker/runtime routing

- `M site/_worker.js`
- `M site/_routes.json`
- `M site/worker-core.js`
- `A site/worker/core-context.js`
- `A site/worker/routes.js`

## Worker domains

- `A site/worker/domains/admin-auth.js`
- `A site/worker/domains/admin-overview.js`
- `A site/worker/domains/analytics-reporting.js`
- `A site/worker/domains/analytics.js`
- `A site/worker/domains/compatibility.js`
- `A site/worker/domains/inventory.js`
- `A site/worker/domains/leads.js`
- `A site/worker/domains/marketplace.js`
- `A site/worker/domains/opportunities.js`
- `A site/worker/domains/solar.js`
- `A site/worker/domains/system.js`

## Shared deployed Worker runtime

- `A site/worker/shared/html.js`
- `A site/worker/shared/response.js`
- `A site/worker/shared/solar-sanitizers.js`
- `A site/worker/shared/validation.js`

The former duplicate prep copies under `src/shared/*` and `src/worker/response.js` are intentionally absent from the final candidate.

## Architecture-as-code / tests

- `A src/core-route-registry.js`
- `A tests/core-route-registry.test.mjs`
- `A tests/shared-foundation.test.mjs`

## Final validation result

`PASS`

The validated application candidate passed committed-source invariants, static/unit QA, Worker compilation, isolated preview deployment, public/Admin regression, protected 401/404 contracts, SOK commercialization/full-line, website integrity, compatibility Catalog GET/HEAD, and candidate immutability.

## Protected unchanged production boundaries

No intentional rebuild change to:

- D1 schema/migrations;
- production data;
- Cloudflare binding values/secrets;
- checkout/PayPal server business rules;
- SOK/Hawaii server business rules;
- supplier source-of-truth ownership;
- Marketplace/Catalog separation;
- Technician Portal ownership;
- accepted `_redirects` compatibility behavior.
