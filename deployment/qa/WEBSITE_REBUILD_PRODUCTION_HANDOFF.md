# Website Rebuild — Production Handoff

## Status

`WEBSITE REBUILD CODE COMPLETE — CLEAN BASELINE VALIDATED — PRODUCTION UNCHANGED`

## Validated application source

- Accepted production base: `995ddef117be2ba5b26e154ea43409271fc938a9`
- Final validated application candidate: `0ad9c73781d82fc276476fe6123b4c27cd544492`
- Final committed-source validation run: `33973499299`
- Final isolated preview: `https://fb9fc421.elevationupscales.pages.dev`
- Candidate relation to production: `48 commits ahead / 0 behind`
- Production `main`: unchanged at `995ddef117be2ba5b26e154ea43409271fc938a9`

Receipt-only commits after the validated application candidate may update this handoff/manifest. They do not change `site/` runtime code and do not replace the validated application SHA above.

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
- `npm run qa:preview -- <preview-url>`

Final script behavior:

- `deployment/rebuild/verify-complete-rebuild.py` is the authoritative rebuild-layout verifier.
- `split-worker-core.py` and `finalize-cleanup.py` are safe verification-only compatibility entrypoints; their historical mutation behavior is retired.
- Migration utilities are retained for provenance but are not executed by final CI.
- `.github/workflows/website-rebuild-complete-code.yml` validates committed source only; it does not generate, recommit, push `main`, or deploy production.
- `.github/workflows/release-candidate-gate.yml` uses the same canonical committed-source and preview gates and verifies candidate immutability.

## Final validation

Run `33973499299` passed:

- rebuild source invariants;
- complete unit/static suite;
- 111 JavaScript syntax checks;
- Worker compilation;
- isolated Pages preview deployment;
- public route regression;
- Admin route regression;
- Admin/sync unauthorized `401` contracts;
- protected runtime `404` contracts;
- `/api/store-products` GET + HEAD compatibility;
- accepted health/degraded-notification contract;
- SOK commercialization smoke;
- SOK full-line smoke;
- website integrity smoke;
- candidate working-tree immutability.

## Protected scope

This rebuild does **not** authorize or contain intentional changes to:

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

Until explicit production promotion is accepted, rollback/production baseline remains:

`995ddef117be2ba5b26e154ea43409271fc938a9`

## Disposition

The approved Website Rebuild **code build is complete**.

The next action belongs to controlled Deployment: validate/promote the exact application candidate through the existing production authorization path. This handoff is not itself authorization to push `main` or deploy production.
