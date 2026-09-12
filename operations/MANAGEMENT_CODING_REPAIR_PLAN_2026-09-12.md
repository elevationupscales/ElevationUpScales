# ELEVATION UPSCALES — MANAGEMENT CODING REPAIR PLAN

**Date:** 2026-09-12  
**Owner:** Casey Young  
**Status:** ACTIVE / P0 MANAGEMENT-CONTROLLED TECHNICAL RECOVERY  
**State Owner:** Operating System Project Manager / PM4 / MPM  
**Execution Owner:** MASTER DEVELOPER  
**Integrity Oversight:** MASTER RECON OS  
**Commercial Continuity:** Company Operations Manager / COM 2  
**Incident:** GitHub Issue #65  

## 1. Management objective

Repair the website coding/deployment system without another broad rebuild.

The management goal is:

**PROTECT CUSTOMERS → HOLD NONESSENTIAL CODE → STABILIZE VERIFIED PRODUCTION → RECONCILE SOURCE → RESTORE ONE PUBLIC PRODUCT TRUTH → PROVE CHECKOUT/ROUTING → HARDEN RELEASE CONTROLS → CONVERGE DELIBERATELY → RELEASE FEATURE FREEZE.**

This plan does not authorize a redesign, wholesale `main` deployment, speculative catalog expansion, protected homepage-top changes, or broad feature work.

## 2. Accepted recovery baseline

The accepted recovery/production baseline is:

**`89912be657d7e92c3582619005c0a110ad843577`**

Production proof:

- GitHub Actions deployment run `34709944113` / run #49;
- canonical production QA: PASS;
- secret / oversized-artifact gate: PASS;
- Cloudflare deployment: PASS;
- deployed-application smoke: PASS;
- canonical-domain smoke: PASS;
- deployment receipt: PASS;
- independent live verification confirmed the legacy generic catalog APIs fail closed, the dedicated SOK catalog remains live, SOK detail links use trusted `/sok/...` routes, and the SOK SK12V100PC checkout remains purchase-ready at the intended $319 customer price without submitting payment.

`main` and the production recovery lineage remain intentionally divergent. The accepted production SHA does **not** make the rest of `main` safe to deploy.

Hard control:

**NO BULK MERGE → NO WHOLESALE MAIN DEPLOY → NO BLIND FAST-FORWARD → NO FORCE UPDATE.**

## 3. Management roles

### PM4 / MPM — recovery manager

PM4 owns:

- recovery priority and sequencing;
- the definition of P0 vs deferred feature work;
- cross-lane routing;
- acceptance gates;
- escalation to Casey only when owner authority is required;
- final recommendation to release the feature freeze.

PM4 does not independently rewrite production code.

### MASTER DEVELOPER — technical execution owner

MASTER DEVELOPER owns:

- recovery branch implementation;
- production-vs-`main` technical delta ledger;
- one-root-cause-at-a-time repairs;
- tests, QA, preview/deployment controls and production receipts;
- exact runtime/source changes needed to satisfy this plan.

During P0, MASTER DEVELOPER works from the accepted recovery lineage. `main` is evidence/input until each production-affecting delta is classified.

### MASTER RECON OS — integrity gate

MASTER RECON owns:

- verifying current branch/SHA lineage before each material recovery step;
- detecting stale pointers, replay, duplicated fixes and conflicting control state;
- checking that management files reflect actual deployed/source truth;
- independently verifying closure criteria;
- refusing to certify convergence while unresolved P0 drift remains.

MASTER RECON does not become a second developer.

### Company Operations Manager / COM 2 — commercial continuity

COM 2 continues customer, order, cash-release and profitable-sales operations.

During the coding freeze COM 2 may:

- identify an exact customer/revenue technical blocker;
- route that blocker to PM4 / MASTER DEVELOPER;
- preserve working checkout/order paths;
- continue non-code vendor/channel work under existing lane rules.

COM 2 must not:

- request redesign/cosmetic work;
- restart broad website merchandising or feature expansion;
- create a second developer worktree;
- treat an older commercial wish-list as authority over the P0 recovery plan;
- ask a vendor/channel lane to alter protected homepage-top output;
- bypass the recovery branch because a change appears small.

### Vendor / channel managers

Vendor and channel managers remain source owners for product, price, availability, fulfillment, warranty, MAP/channel and platform facts.

They return exact source facts to management. They do not independently patch the website during P0 unless MASTER DEVELOPER owns the technical change and routes it through recovery controls.

### Casey / Owner

Casey retains authority for:

- protected homepage-top changes;
- material scope changes;
- exceptions to the freeze;
- final feature-freeze release.

## 4. Repair phases

### Phase A — containment and recovery baseline

**State: COMPLETE / VERIFIED**

Completed:

- customer-trust containment deployed;
- unsafe legacy generic public catalog endpoints fail closed;
- trusted SOK catalog remains available;
- stale SOK detail-loop routing repaired;
- customer-safe availability copy deployed;
- SOK direct checkout verified healthy;
- regression guards added for the containment class;
- accepted production SHA pinned at `89912be...`.

Phase A may be reopened only by a verified live regression.

### Phase B — production ↔ `main` delta ledger

**State: NEXT / P0**

MASTER DEVELOPER produces a file-level ledger for every production-affecting divergence and classifies each item:

1. **OPERATIONS ONLY** — documentation/state; no customer runtime effect;
2. **REQUIRED RECOVERY** — necessary for trust, checkout, source-of-truth, protected-top or deployment safety;
3. **BUSINESS-VALID / DEFERRED** — legitimate but frozen feature/vendor work;
4. **REJECT / RETIRE** — stale, duplicate, superseded or unsafe implementation.

Priority order for the ledger:

1. Cloudflare/worker/routes/deployment workflow;
2. public catalog/API/product-detail code;
3. checkout/payment/order persistence;
4. homepage/shared customer runtime;
5. Store/catalog renderers and asset versions;
6. admin/internal runtime only after customer surfaces are classified;
7. operations-only commits last.

No file crosses into production because it is newer. It crosses only after classification + QA + acceptance.

### Phase C — one authoritative public commerce contract

**State: OPEN / P0**

Repair toward one authoritative customer-public eligibility contract.

A product may reach public discovery/purchase only when the contract can determine:

- exact identity / SKU / vendor ownership;
- customer-safe title and description;
- approved media provenance;
- publish state;
- customer price or explicit purchase-options state;
- availability/orderability state;
- checkout eligibility;
- fulfillment owner/path;
- destination/shipping restrictions;
- exact trusted detail route.

Unsafe/unknown trust-critical records fail closed before the public response whenever technically possible.

Browser filtering remains defense in depth, not the primary source-of-truth control.

### Phase D — route, detail and checkout reconciliation

**State: OPEN / P0**

Verify and deliberately map:

- `/store`;
- supplier storefronts;
- trusted product detail routes;
- legacy product URLs;
- direct checkout URLs;
- PayPal/custom checkout paths;
- intentional Shopify purchase paths;
- order-persistence hooks;
- source-specific purchase-options/backorder routes.

Rules:

- no customer route may expose a record that the public contract rejects;
- no legacy detail route may bypass the public contract;
- a working checkout is protected from unrelated refactors;
- no payment is submitted during smoke testing.

### Phase E — customer-copy and protected-homepage firewall

**State: OPEN / P0**

Port/reconcile only the reviewed protections needed to ensure:

- internal AI/OS/developer/operations language does not leak into customer copy;
- public trust controls operate silently rather than describing quarantines/internal processes to customers;
- protected homepage top copy, CTA, imagery, product bindings, layout and runtime output cannot be silently overwritten by shared commerce JavaScript or backend ordering changes;
- owner homepage lock remains the authority.

### Phase F — release-system repair

**State: OPEN / P0**

MASTER DEVELOPER must make the deployment path deterministic and branch-aware.

Required controls:

- exact source SHA captured before QA;
- recovery candidate can be previewed/tested without implicitly switching to unrelated `main`;
- production mutation occurs only from an explicitly accepted candidate;
- QA failure blocks deployment;
- critical customer JS/CSS changes require an asset/cache version change where applicable;
- deployed-app smoke runs;
- canonical-domain smoke runs;
- deployment receipt records source SHA and result;
- rollback target is known before production mutation.

### Phase G — controlled convergence

**State: HOLD UNTIL B–F PASS**

After recovery gates pass:

1. choose the surviving canonical development lineage;
2. deliberately port/merge accepted recovery truth;
3. retire obsolete duplicate route/catalog/deployment assumptions;
4. confirm the selected development lineage can reproduce the accepted production state;
5. update Work Board, Registry and incident state;
6. MASTER RECON performs final drift sweep;
7. PM4 returns a freeze-release recommendation to Casey;
8. Casey explicitly releases or modifies the feature freeze.

## 5. P0 execution order

Until management changes this plan, the order is:

**1. CUSTOMER TRUST / OUTAGE / PAYMENT FAILURE**  
**2. CHECKOUT + ORDER RECORD INTEGRITY**  
**3. PUBLIC PRODUCT SOURCE-OF-TRUTH**  
**4. ROUTE/DETAIL/LEGACY BYPASS CONTROL**  
**5. PROTECTED HOMEPAGE / PUBLIC COPY**  
**6. DEPLOYMENT / PREVIEW / CACHE / RECEIPT CONTROL**  
**7. MAIN CONVERGENCE**  
**8. DEFERRED FEATURES**

A lower item may proceed in parallel only when it cannot interfere with a higher item.

## 6. Change admission rule during freeze

Every proposed website change is classified before coding:

- **P0 REPAIR** → execute through recovery controls;
- **CUSTOMER/ORDER EMERGENCY** → execute through recovery controls immediately;
- **REVENUE BLOCKER** → PM4 verifies it is truly blocking an existing approved sale/order path, then routes through recovery;
- **FEATURE / COSMETIC / NICE-TO-HAVE** → HOLD;
- **PROTECTED TOP CHANGE** → HOLD and route exact delta to Casey;
- **UNCLEAR** → HOLD only that change; continue other repair work.

## 7. Required management reporting

MASTER DEVELOPER returns after each material repair:

- source branch/SHA;
- exact root cause;
- exact files changed;
- QA/tests run;
- deployment state;
- canonical/live verification;
- unresolved risk;
- next root cause.

COM 2 reports only:

- customer/order impact;
- revenue/cash impact;
- exact technical blocker needing routing.

MASTER RECON returns:

- lineage state;
- drift/replay/conflict findings;
- whether management pointers match verified truth;
- PASS / HOLD / ROUTE REQUIRED.

## 8. Feature-freeze release gates

The feature freeze stays active until all are true:

1. accepted production SHA is traceable and reproducible;
2. production-vs-`main` delta ledger is complete for production-affecting files;
3. one public eligibility/source contract owns customer product truth;
4. unsafe legacy API/detail bypasses are retired or mapped;
5. checkout/payment/order persistence paths pass regression checks;
6. public copy firewall and protected-top guards pass;
7. branch-aware preview/deployment path is proven;
8. canonical production smoke + receipt are routine and exact-SHA tied;
9. MASTER RECON reports no unresolved P0 drift;
10. PM4 recommends release;
11. Casey explicitly releases the freeze.

## 9. Immediate management work order

**PM4:** adopt this plan as the P0 recovery sequence and prevent lower-priority feature routing into MASTER DEVELOPER.  
**MASTER DEVELOPER:** begin Phase B production-vs-`main` delta ledger from accepted production `89912be...`; then execute the next highest-risk REQUIRED RECOVERY item.  
**MASTER RECON:** verify current heads, accepted deployment receipt, worktree/issue/management alignment, and flag any stale pointer still naming `780247...` as the current recovery target.  
**COM 2:** continue customer/order/cash/profitable-sales work; route only exact revenue-critical technical blockers; do not create new website feature requests during the freeze.  
**Vendor/Channel Managers:** continue source/economics/fulfillment work without independent website mutations.  

## Control phrase

**MANAGEMENT PRIORITIZES → MASTER DEVELOPER REPAIRS → MASTER RECON VERIFIES → COM 2 PRESERVES COMMERCE → PM4 ACCEPTS → CASEY RELEASES THE FREEZE.**
