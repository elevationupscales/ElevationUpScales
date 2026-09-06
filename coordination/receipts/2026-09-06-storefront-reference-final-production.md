# STOREFRONT-REFERENCE-0906-02 — Production Receipt

**Date:** 2026-09-06  
**State:** PRODUCTION PASS / ACCEPTED APPLICATION  
**Production application SHA:** `f9afa86bad443bc9eb47c785964b3012488570b6`  
**Production deployment:** `https://14f79e49.elevationupscales.pages.dev`  
**Production domain:** `https://elevationupscales.com`

## Authorization and source resolution

The owner explicitly authorized completion and deployment of the finished homepage/storefront redesign work from `work/storefront-reference-final-0906-02-home-performance`.

The handoff referenced local SHA `049093030f06f4f8297603f528154281b076b862`, but that SHA was not present in the remote repository. The named remote branch was present and its canonical pushed head was:

`f9afa86bad443bc9eb47c785964b3012488570b6`

That commit is one fast-forward commit ahead of prior `main` `df5012cfe33976c85d491933fc31d24b2f7445a4` and is the source actually previewed, verified and deployed.

## Rollback / baselines

Pre-release rollback baseline created before advancing `main`:

`baseline-2026-09-06-pre-storefront-reference-final-production`

→ `df5012cfe33976c85d491933fc31d24b2f7445a4`

Accepted production application baseline:

`baseline-2026-09-06-storefront-reference-final-production`

→ `f9afa86bad443bc9eb47c785964b3012488570b6`

The existing B- owner fallback branch remained untouched.

## Preview evidence

Visual/preview workflow:

- workflow: `STOREFRONT-REFERENCE-0906-02 Visual Completion`
- run: `34052120312`
- conclusion: PASS
- candidate: `f9afa86bad443bc9eb47c785964b3012488570b6`
- preview: `https://365c8cb4.elevationupscales.pages.dev`
- alias: `https://storefront-reference-0906-02.elevationupscales.pages.dev`

Verified in the preview gate:

- full canonical QA PASS;
- rendered slideshow/reference storefront integration PASS;
- preview regression PASS;
- SOK commercialization/full-line and website-integrity smoke PASS;
- true desktop evidence at 1536×1024;
- true mobile evidence at 390×844;
- storefront header wordmark loaded at expected natural dimensions;
- no horizontal overflow;
- desktop first-fold geometry remained within the release thresholds.

## Production execution

`main` was fast-forwarded, without force, from:

`df5012cfe33976c85d491933fc31d24b2f7445a4`

to the tested application candidate:

`f9afa86bad443bc9eb47c785964b3012488570b6`

Because the available connector did not expose the repository's manual `workflow_dispatch` action, an isolated control workflow was used to execute the same controlled production sequence while hard-pinning the exact `main` SHA.

Production control:

- control branch: `control/storefront-reference-final-production-0906`
- workflow: `STOREFRONT-REFERENCE-0906-02 Production Deploy`
- workflow trigger commit: `3503c598236914f153f78b590ccde4c983053bcb`
- run: `34052628263`
- conclusion: PASS

The control workflow did not alter the deployed application candidate. It checked out `main`, asserted exact source `f9afa86...`, ran canonical QA, deployed the `site/` directory to Cloudflare Pages as branch `main`, then ran production smoke.

## Production QA / smoke

Canonical QA: PASS.

Production deployment:

`https://14f79e49.elevationupscales.pages.dev`

200-route smoke PASS:

- `/`
- `/store`
- `/rv-store`
- `/marketplace`
- `/lithium-batteries`
- `/hawaii-lithium-batteries`
- `/checkout`
- `/start-a-project`
- `/solar-project`
- `/sok-batteries`
- `/sok/sk12v100pc/`
- `/sok/sk48v100n/`
- `/admin`
- `/admin-store-orders`
- `/admin-inventory`
- `/admin-listings`
- `/admin-analytics`
- `/admin-system`

Additional PASS checks:

- homepage slideshow root present;
- slideshow JSON/JS/CSS deployed;
- reference storefront markers present;
- storefront wordmark asset returns successfully;
- `/api/admin/sync` remains protected with 401;
- `/sync-admin-runtime.js` remains protected with 404.

The public custom domain was independently reachable after deployment and returned the current Elevation storefront homepage.

## Protected boundaries

No production database mutation, Catalog source rewrite, supplier inventory/cost change, pricing/MAP change, PayPal capture, Hawaii route-policy rewrite, Marketplace merge, Admin schema change or Portal change was part of this visual release.

Static commerce regression passed. The existing QA note remains that PayPal sandbox create/capture is not proven by the static gate itself; that is not a failure introduced by this release.

## Final disposition

**STOREFRONT-REFERENCE-0906-02: PRODUCTION PASS.**

Accepted application SHA: `f9afa86bad443bc9eb47c785964b3012488570b6`.

Rollback: `baseline-2026-09-06-pre-storefront-reference-final-production`.

Stop after receipt/baseline per worker protocol.
