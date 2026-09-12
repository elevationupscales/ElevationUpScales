# ELEVATION UPSCALES — CODING STABILIZATION CURRENT WORKTREE

**Date:** 2026-09-12
**State:** ACTIVE / P0 TECHNICAL RECOVERY
**Reports To:** PM4 / MPM
**Execution Owner:** MASTER DEVELOPER
**Integrity Oversight:** MASTER RECON OS
**Controlling Owner Directive:** `OWNER_DIRECTIVE_CODING_STABILIZATION_2026-09-12.md`
**Companion Trust Control:** `OWNER_DIRECTIVE_PUBLIC_COPY_FIREWALL_2026-09-12.md`

## Verified start state

- Production deployment branch: `production-deploy`.
- Emergency customer-trust hotfix line exists independently from current `main`.
- `main` and `production-deploy` are diverged from merge base `c4126b819d2ddcd9b61ade955528b74cec24a161`.
- Latest verified comparison during this RUN: `main` has **120 unique commits** beyond the production branch lineage while `production-deploy` has **4 unique commits** not present on `main`.
- `production-deploy` head: `780247289c304a5f7150cc5addc5e53c7003055f`.
- Canonical `https://elevationupscales.com/store` currently renders the same old storefront copy present in `production-deploy` at `780247...`, including the same internal-language defects. This is strong current evidence that `780247...` is the active recovery lineage; deployment receipt/run evidence is still required before calling it the final accepted baseline.
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
7. operations/public-copy contamination discovered during incident review;
8. commerce JavaScript rewriting owner-protected homepage copy/CTA at runtime.

## Phase 0 — containment

**State: IN PROGRESS**

Completed/started:

- trust-risk customer discovery filter added to store renderer;
- trust-risk homepage featured-card filter added;
- legacy `/product` detail route temporarily fails closed to `/store`;
- emergency production deployment completed for first containment set;
- store script cache version bumped on `production-deploy` to force new trust renderer;
- follow-up controlled deploy triggered;
- public-copy owner firewall established;
- on `main`, `home-commerce.js` no longer rewrites the protected homepage hero lead or primary CTA;
- on `main`, Store customer copy was rewritten from internal implementation language to normal retail language;
- on `main`, Store renderer still keeps trust filtering but no longer tells customers about hidden/quarantined/trust-review records.

Do not close Phase 0 merely because `main` is cleaner. The recovery changes must be classified and deliberately ported to the recovery lineage, then previewed/deployed/verified.

## Phase 1 — establish recovery baseline

Current evidence supports `production-deploy` head `780247289c304a5f7150cc5addc5e53c7003055f` as the working recovery anchor because canonical `/store` matches that branch's storefront source.

Next:

1. obtain/confirm the successful deployment run or equivalent deployment receipt for `780247...`;
2. pin the verified production SHA as accepted recovery baseline;
3. create/use a dedicated recovery branch from that exact SHA;
4. do not move production for ordinary feature work;
5. inventory public customer surfaces from the recovery baseline:
   - `/`
   - `/store`
   - `/product` / legacy product URLs
   - `/checkout`
   - SOK storefront
   - Kingboss storefront
   - public catalog APIs
   - featured-product API
   - Shopify direct purchase links where intentionally external;
6. identify which surface owns product truth and which are legacy/duplicate consumers.

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

**State: PARTIAL / ACTIVE**

Now present on `main`:

- `tests/public-copy-firewall.test.mjs` — blocks high-signal internal OS/developer terms from customer-facing HTML/public renderers;
- `tests/homepage-protected-top.test.mjs` — asserts protected hero copy/CTA stay authored in `index.html` and are not rewritten by `home-commerce.js`;
- both tests are wired into normal `npm test`.

Still required before stabilization closes:

- blocked third-party retailer media domains;
- empty/garbage/raw-feed titles on public cards;
- unpublished/hold products leaking as Buy Now;
- public API rows bypassing retail eligibility;
- stale `/product` links exposing unsafe rows;
- broken checkout routes;
- supplier attribution mismatch;
- JS/CSS asset version not changing when critical customer-facing code changes;
- canonical production smoke tied to exact deployed SHA.

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

1. Confirm deployment receipt/run evidence for `780247...` and pin the recovery baseline.
2. Create/use the recovery branch from that baseline.
3. Build the production-vs-`main` delta ledger, prioritizing customer-visible runtime files over operations-only commits.
4. Port only REQUIRED RECOVERY changes: public-copy firewall, protected-top runtime fix, trust/API fixes and associated tests.
5. Preview and smoke canonical customer paths before any production mutation.

**STATUS:** ACTIVE / P0 / FEATURE FREEZE IN FORCE / NO WHOLESALE MAIN DEPLOY.
