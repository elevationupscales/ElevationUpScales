# Website Rebuild — Production Handoff

## Status

`WEBSITE REBUILD COMPLETE — CLEAN BASELINE ACCEPTED IN PRODUCTION`

## Accepted production lineage

- Prior accepted production / rollback baseline: `995ddef117be2ba5b26e154ea43409271fc938a9`
- Validated application SHA: `0ad9c73781d82fc276476fe6123b4c27cd544492`
- Receipt-bearing main before final production receipt: `b018c83f9ab93bb30ad803f3b321385cd55bc94d`
- Independent QA run: `33975905113` — PASS
- Controlled production workflow run: `33976304409` — PASS
- Controlled production runner commit: `39279d270143608637ff98c0b2602b636838495e`
- Immutable production URL: `https://9e2fb406.elevationupscales.pages.dev`
- Canonical production URL: `https://elevationupscales.com`

Receipt-only documentation commits after the validated application SHA do not alter the deployed `site/` tree. Production was promoted only after the runner verified the deployable `site/` tree was identical to the validated application.

## Production promotion result

- Exact lineage preflight: PASS
- Exact deployable `site/` parity to validated application: PASS
- Canonical source QA: PASS
- Rebuild architecture verifier: PASS
- Unit/static suite: PASS
- 111 JavaScript syntax checks: PASS
- Pages limits / secret scan: PASS
- Worker compilation: PASS
- Production deployment: PASS
- Immutable production smoke: PASS
- Canonical asset SHA-256 parity: PASS
- Canonical production smoke: PASS
- Rollback invoked: NO

## Runtime / customer regression result

Production validation passed for:

- homepage;
- Start a Project;
- Store;
- RV Store;
- Marketplace;
- Solar;
- SOK catalog and anchor products;
- SOK Purchase Options;
- lithium/Hawaii surfaces;
- checkout;
- Admin operating surfaces;
- `/api/store-products` GET + HEAD compatibility;
- accepted health/degraded-notification behavior;
- SOK commercialization;
- SOK full-line;
- website-integrity regression.

Security/protection contracts passed:

- unauthorized Admin/sync APIs return expected `401`;
- protected Worker/runtime source returns expected `404`;
- retired `admin-command-center-pass1.css` returns expected `404`;
- deployed canonical `site-shell.js`, `admin-command-center.js`, and `sok-order.js` hashes match the validated production source.

## Code completion

- Browser shell consolidation: PASS
- SOK Purchase Options consolidation: PASS
- Admin view-model/control consolidation: PASS
- Worker business-domain decomposition: PASS
- Thin `worker-core.js` dispatcher: PASS
- Explicit named Worker dependencies: PASS
- Shared Worker response/security/HTML/validation runtime: PASS
- Duplicate shared prep implementations retired: PASS
- Canonical Worker route-contract module: PASS
- `/api/store-products` compatibility ownership moved into compatibility domain: PASS
- Runtime source protection: PASS
- Legacy Admin Pass 1 CSS retirement: PASS
- Compatibility/redirect retention: PASS

## Script / build completion

Canonical commands:

- `npm run rebuild:verify`
- `npm test`
- `npm run check`
- `npm run qa`
- `npm run qa:preview -- <url>`

Final script behavior:

- `deployment/rebuild/verify-complete-rebuild.py` is the authoritative rebuild-layout verifier.
- `split-worker-core.py` and `finalize-cleanup.py` are verification-only compatibility entrypoints; their historical mutation behavior is retired.
- Migration utilities are retained for provenance but are not executed by final CI.
- `.github/workflows/website-rebuild-complete-code.yml` validates committed source only.
- `.github/workflows/release-candidate-gate.yml` uses the same canonical committed-source and preview gates and verifies candidate immutability.

## Protected scope confirmation

The rebuild did not intentionally change:

- D1 schema/migrations;
- production data;
- Cloudflare binding values or secrets;
- checkout/PayPal server business rules;
- SOK/Hawaii server business rules;
- supplier source-of-truth ownership;
- Marketplace/Catalog separation;
- Technician Portal ownership;
- accepted `_redirects` compatibility behavior.

## Rollback

Known-good rollback baseline:

`995ddef117be2ba5b26e154ea43409271fc938a9`

The controlled production runner included automatic rollback to that baseline on any post-deploy failure. Rollback was not needed because immutable and canonical production validation both passed.

## Disposition

`STATUS: WEBSITE REBUILD COMPLETE — CLEAN BASELINE ACCEPTED`

The approved Website Rebuild code is deployed and accepted in production. Future website changes should use this production descendant as the new clean baseline rather than historical patch-era branches.
