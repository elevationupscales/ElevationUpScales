# ELEVATION UPSCALES — CODING STABILIZATION CURRENT WORKTREE

**Date:** 2026-09-12
**State:** ACTIVE / P0 TECHNICAL RECOVERY / MANAGEMENT PLAN INSTALLED
**Reports To:** PM4 / MPM
**Execution Owner:** MASTER DEVELOPER
**Integrity Oversight:** MASTER RECON OS
**Commercial Continuity:** Company Operations Manager / COM 2
**Controlling Owner Directive:** `OWNER_DIRECTIVE_CODING_STABILIZATION_2026-09-12.md`
**Companion Trust Control:** `OWNER_DIRECTIVE_PUBLIC_COPY_FIREWALL_2026-09-12.md`
**Management Repair Plan:** `MANAGEMENT_CODING_REPAIR_PLAN_2026-09-12.md`

## Accepted production / recovery baseline

**ACCEPTED SHA:** `89912be657d7e92c3582619005c0a110ad843577`

Verified production proof:

- GitHub Actions run `34709944113` / run #49: SUCCESS;
- canonical production QA: PASS;
- secret / oversized-artifact gate: PASS;
- Cloudflare deployment: PASS;
- deployed-application smoke: PASS;
- canonical-domain smoke: PASS;
- deployment receipt: PASS;
- independent live verification confirmed legacy generic catalog APIs fail closed, dedicated SOK catalog remains live, SOK Details use trusted `/sok/...` routes, customer-safe availability copy is live, and SOK SK12V100PC checkout remains purchase-ready at $319 without submitting payment.

The earlier `780247...` recovery pointer is historical evidence only and must not be treated as the current accepted baseline.

## Lineage condition

`main` and the production recovery lineage remain diverged.

Therefore:

**NO BULK MERGE / NO WHOLESALE MAIN DEPLOY / NO BLIND FAST-FORWARD / NO FORCE UPDATE.**

`main` is an evidence/input pool until each production-affecting delta is classified and deliberately admitted through the recovery plan.

## Incident

GitHub issue `#65` — **P0: Website coding/deployment stabilization — customer trust + production lineage** — remains OPEN.

Known failure classes:

1. legacy supplier-feed records exposed to customers;
2. unrelated retailer/marketplace image provenance;
3. raw/incomplete customer copy;
4. inconsistent truth across catalog/API/browser paths;
5. product-detail paths capable of bypassing catalog curation;
6. stale browser asset cache after emergency JS changes;
7. operations/public-copy contamination;
8. commerce JavaScript rewriting owner-protected homepage output;
9. development and deployment lineages diverging without a controlled convergence step;
10. preview/deployment assumptions capable of testing the wrong source branch.

## Phase A — containment and verified baseline

**State: COMPLETE / VERIFIED**

Completed:

- customer-trust discovery filter deployed;
- blocked-media defense remains in customer renderers;
- three legacy generic public catalog endpoints fail closed at the route boundary;
- dedicated SOK catalog remains available;
- stale SOK Details loop repaired to trusted `/sok/...` product routes;
- SOK purchase paths preserve exact API-provided CTA/purchase routing;
- customer availability wording cleaned;
- store renderer cache version bumped so returning customers receive the repaired code;
- SOK direct checkout live-verified healthy;
- P0 containment regression tests wired into canonical `npm test`;
- stale legacy regression wording corrected;
- accepted production SHA pinned at `89912be...`.

Do not replay Phase A unless current live evidence shows a regression.

## Phase B — production ↔ `main` delta ledger

**State: NEXT / P0**

MASTER DEVELOPER must build a production-affecting file ledger from accepted production `89912be...` against current `main`.

Every divergence is classified:

- **OPERATIONS ONLY** — docs/receipts/worktrees; no customer runtime effect;
- **REQUIRED RECOVERY** — trust, checkout, product truth, protected-top, deployment or regression safety;
- **BUSINESS-VALID / DEFERRED** — legitimate future feature/vendor work held by the freeze;
- **REJECT / RETIRE** — stale, duplicate, superseded or unsafe implementation.

Priority order:

1. Cloudflare/worker/routes/deployment workflow;
2. public catalog/API/product-detail code;
3. checkout/payment/order-persistence code;
4. homepage/shared customer runtime;
5. Store/catalog renderers and asset versions;
6. admin/internal runtime;
7. operations-only changes.

No commit is admitted because it is newer.

## Phase C — one authoritative public commerce contract

**State: OPEN / P0**

Build/reconcile one public eligibility contract that can determine:

- verified product identity / exact SKU;
- vendor/supplier ownership;
- customer-safe title/description;
- approved media provenance;
- publish state;
- current customer price or explicit purchase-options state;
- availability/orderability;
- checkout eligibility;
- fulfillment owner/path;
- destination/shipping limitations;
- trusted detail route.

Trust-critical unknowns fail closed before public response whenever technically appropriate.

Client-side filtering remains defense in depth only.

## Phase D — route / detail / checkout reconciliation

**State: OPEN / P0**

Verify and deliberately map:

- `/store`;
- supplier storefronts;
- trusted product detail routes;
- legacy product URLs;
- direct checkout URLs;
- custom PayPal checkout paths;
- intentional Shopify purchase paths;
- order-persistence hooks;
- purchase-options/backorder routes.

No customer route may bypass the public eligibility contract.

Working checkout is protected from unrelated refactors. Smoke tests do not submit payment.

## Phase E — customer copy / protected homepage firewall

**State: OPEN / P0**

Reconcile only reviewed protections required to ensure:

- internal AI/OS/dev/operations language does not leak publicly;
- customer trust controls operate silently;
- protected homepage top copy, CTA, imagery, product bindings, layout and runtime output cannot be rewritten indirectly by commerce/shared code;
- Casey's newest homepage lock remains controlling authority.

## Phase F — release-system repair

**State: OPEN / P0**

Required release controls:

- exact source SHA captured before QA;
- recovery candidate preview/test does not implicitly substitute unrelated `main`;
- production mutates only from explicit accepted candidate;
- QA failure blocks deployment;
- customer-critical JS/CSS cache/version changes are enforced where applicable;
- deployed-app smoke runs;
- canonical-domain smoke runs;
- receipt records source SHA and result;
- rollback target is known before production mutation.

## Phase G — controlled convergence

**State: HOLD UNTIL B–F PASS**

After recovery gates pass:

1. choose surviving canonical development lineage;
2. deliberately port/merge accepted recovery truth;
3. retire obsolete duplicate route/catalog/deployment assumptions;
4. prove chosen development lineage reproduces accepted production state;
5. update Current Work Board / Worker Registry / issue state;
6. MASTER RECON performs final drift sweep;
7. PM4 returns freeze-release recommendation;
8. Casey explicitly releases or modifies the freeze.

## Management boundary

### PM4 / MPM

Owns recovery sequence, priority, acceptance gates and freeze-release recommendation.

### MASTER DEVELOPER

Owns technical implementation on the recovery lineage, one root cause at a time.

### MASTER RECON OS

Owns lineage/drift/replay verification and management-state integrity. It does not become a second developer.

### COM 2

Continues customer/order/cash/profitable-sales work and routes exact revenue-critical technical blockers only. It does not create redesign/cosmetic/feature work during the freeze and does not create a parallel developer worktree.

### Vendor / channel managers

Continue exact product/economics/fulfillment/source work without independent website mutations during P0.

## Change admission rule

Every website change is classified before coding:

- **P0 REPAIR** → recovery lane;
- **CUSTOMER / ORDER EMERGENCY** → recovery lane immediately;
- **VERIFIED REVENUE BLOCKER** → PM4 routes through recovery;
- **FEATURE / COSMETIC / NICE-TO-HAVE** → HOLD;
- **PROTECTED TOP CHANGE** → HOLD + route exact delta to Casey;
- **UNCLEAR** → HOLD only that change; continue other repairs.

## RUN loop

**GIT FIRST → VERIFY ACCEPTED PRODUCTION SHA → VERIFY ISSUE #65 / MANAGEMENT PLAN → PICK HIGHEST-RISK OPEN ROOT CAUSE → FIX ON RECOVERY LINEAGE → QA → CONTROLLED DEPLOY IF REQUIRED → CANONICAL VERIFY → RECORD → NEXT ROOT CAUSE.**

## Current next action

1. MASTER DEVELOPER: produce Phase B production-vs-`main` delta ledger from accepted production `89912be...`.
2. MASTER RECON: verify all management/current-worktree pointers have advanced from historical `780247...` to accepted `89912be...` where they claim current production truth.
3. PM4: suppress nonessential website feature routing into MASTER DEVELOPER while the freeze is active.
4. COM 2: preserve active commerce/order/cash work; return only exact technical revenue blockers.
5. After ledger, execute the highest-risk **REQUIRED RECOVERY** item and continue the RUN loop.

## Feature-freeze release gates

Freeze remains active until:

1. accepted production SHA is traceable/reproducible;
2. production-vs-`main` production-affecting delta ledger is complete;
3. one public product/source eligibility contract controls customer truth;
4. unsafe legacy bypasses are retired/mapped;
5. checkout/payment/order persistence paths pass regression checks;
6. public copy + protected-top guards pass;
7. branch-aware preview/deployment path is proven;
8. canonical smoke + exact-SHA receipt are routine;
9. MASTER RECON reports no unresolved P0 drift;
10. PM4 recommends release;
11. Casey explicitly releases the freeze.

**STATUS:** ACTIVE / P0 / FEATURE FREEZE IN FORCE / ACCEPTED PRODUCTION `89912be...` / PHASE B NEXT.
