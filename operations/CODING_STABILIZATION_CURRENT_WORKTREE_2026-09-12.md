# ELEVATION UPSCALES — CODING STABILIZATION CURRENT WORKTREE

**Date:** 2026-09-12
**State:** ACTIVE / P0 TECHNICAL RECOVERY
**Reports To:** PM4 / MPM
**Execution Owner:** MASTER DEVELOPER
**Integrity Oversight:** MASTER RECON OS
**Controlling Owner Directive:** `OWNER_DIRECTIVE_CODING_STABILIZATION_2026-09-12.md`

## Verified start state

- Production deployment branch: `production-deploy`.
- Emergency customer-trust hotfix line exists independently from current `main`.
- Current branch comparison at stabilization start: `main` and `production-deploy` are diverged from merge base `c4126b819d2ddcd9b61ade955528b74cec24a161`.
- More than 100 `main` commits exist beyond the common base; production contains emergency hotfix commits that are not on `main`.
- Therefore **NO BULK MERGE / NO BLIND FAST-FORWARD / NO FORCE UPDATE** is allowed.

## Current incident

GitHub issue `#65` — **P0: Customer trust incident — quarantine legacy catalog presentation** — remains OPEN until live acceptance criteria pass.

Known failure classes:

1. legacy supplier-feed records exposed to customers;
2. unrelated retailer/marketplace image provenance;
3. raw/incomplete customer copy;
4. inconsistent truth across catalog/API/browser paths;
5. product-detail path capable of bypassing catalog curation;
6. stale browser asset cache after emergency JS changes;
7. operations/public-copy contamination discovered during incident review.

## Phase 0 — containment

**State: IN PROGRESS**

Completed/started:

- trust-risk customer discovery filter added to store renderer;
- trust-risk homepage featured-card filter added;
- legacy `/product` detail route temporarily fails closed to `/store`;
- emergency production deployment completed for first containment set;
- store script cache version bumped on `production-deploy` to force new trust renderer;
- follow-up controlled deploy triggered.

Do not close Phase 0 until the cache-bust deployment succeeds and live canonical `/store` no longer exposes blocked retailer-image records.

## Phase 1 — establish recovery baseline

After Phase 0 passes:

1. pin the successful `production-deploy` SHA as the accepted recovery baseline;
2. create/use a dedicated recovery branch from that exact SHA;
3. do not move production for ordinary feature work;
4. inventory public customer surfaces from the recovery baseline:
   - `/`
   - `/store`
   - `/product` / legacy product URLs
   - `/checkout`
   - SOK storefront
   - Kingboss storefront
   - public catalog APIs
   - featured-product API
   - Shopify direct purchase links where intentionally external;
5. identify which surface owns product truth and which are legacy/duplicate consumers.

## Phase 2 — reconcile `main` safely

Classify the divergent `main` work into four buckets:

- **OPERATIONS ONLY** — docs/receipts/worktrees; no production code effect;
- **REQUIRED RECOVERY** — trust, checkout, catalog truth, deployment, tests;
- **BUSINESS-VALID BUT DEFERRED** — legitimate future feature/vendor work held by stabilization freeze;
- **REJECT / RETIRE** — stale, duplicate, superseded or trust-risk code.

Port only REQUIRED RECOVERY changes onto the recovery branch after inspection.

No commit count or recency makes a change deployable by itself.

## Phase 3 — server-side retail contract

Build one customer-public eligibility gate shared by public product feeds and page consumers.

Minimum public eligibility:

- verified product identity;
- approved title/description presentation;
- approved media provenance;
- positive/current sell price or explicit purchase-options state;
- explicit publish state;
- known supplier/vendor ownership;
- orderability/availability state;
- checkout eligibility;
- fulfillment route.

Unsafe/unknown records must fail closed before public API response whenever possible.

Client-side filtering remains secondary defense only.

## Phase 4 — regression guard

Add tests that fail production candidates for:

- blocked third-party retailer media domains;
- empty/garbage/raw-feed titles on public cards;
- unpublished/hold products leaking as Buy Now;
- public API rows bypassing retail eligibility;
- stale `/product` links exposing quarantined rows;
- broken checkout routes;
- supplier attribution mismatch;
- JS/CSS asset version not changing when critical customer-facing code changes;
- protected homepage top output changing outside owner authorization.

## Phase 5 — controlled convergence

Only after recovery passes:

1. choose the surviving canonical development branch/lineage;
2. merge/rebase reconciled recovery truth deliberately;
3. archive/retire obsolete deployment assumptions;
4. verify canonical production SHA is traceable to approved source;
5. update Work Board / Registry with the accepted baseline;
6. request Casey release the feature freeze.

## RUN loop

**GIT FIRST → VERIFY PRODUCTION SHA → VERIFY ISSUE #65 → LIVE CUSTOMER SURFACE → FIX ONE ROOT CAUSE → QA → CONTROLLED DEPLOY → LIVE VERIFY → RECORD → NEXT ROOT CAUSE.**

Do not substitute planning for executable repairs. Do not allow one blocked repair to stop unrelated P0 stabilization work.

## Current next action

1. Wait only for the already-running cache-bust deployment result.
2. Live-verify `/store` against the specific blocked image hosts and raw-feed leakage.
3. If containment passes, pin that production SHA and create recovery branch.
4. Begin code-path inventory and classify divergent production-affecting `main` files.

**STATUS:** ACTIVE / P0 / FEATURE FREEZE IN FORCE.
