# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation Operating System 1.1  
**Status:** **ACTIVE — PERMANENT FIRST-CLASS DEVELOPMENT LANE**  
**Parent:** Operating System  
**Reports To:** OS 1.1 Project Manager / MPM  
**Accepted Step 4 application baseline:** `04ef81368732d95c81e8f439f14524df385a9f1e`  
**Git freshness rule:** re-resolve the then-current `main` before every Web V2 task; control-only descendants do not change the accepted application baseline by themselves  
**Legacy production pointer:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — **LEGACY ONLY**  
**Visual control:** `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md`  
**Release control:** `.github/workflows/web-v2-qa.yml` + `.github/workflows/web-v2-release.yml` + `deployment/v2/`

## 1. Lane purpose

**WEB V2 DEVELOPMENT** is the permanent OS 1.1 lane for the new Elevation public web platform.

This is one operating lane under the OS 1.1 Project Manager. It is **not** another management hierarchy and does not create another project-management system.

Control relationship:

**CASEY → OS 1.1 PROJECT MANAGER → WEB V2 DEVELOPMENT**

Specialist worker responsibilities may be assigned inside this lane when required:

- **WEB DEVELOPER** — public customer experience, responsive UI, public routes, accessibility, public-site behavior and implementation of the approved visual system.
- **COMMERCE DEVELOPER** — future Commerce V2 catalog, SKU, pricing, availability, checkout, payment, orders and server-side commerce APIs.
- **RELEASE ENGINEER** — exact-version QA/release mechanics, candidate identity, preview verification, promotion and rollback controls.

These are worker responsibilities, not permanent managers.

## 2. Architecture boundary

Preserve the accepted separation:

- **WEB V2** = public customer experience.
- **COMMERCE V2** = catalog, SKU, price, inventory/availability, checkout, payment and order truth.
- **OPS V2** = internal operations, catalog administration, vendor operations, orders, logistics, leads, analytics and management surfaces.

Development convenience may not collapse these responsibilities back into the Legacy monolith.

Commerce must preserve:

**ONE SURFACE = ONE CHECKOUT OWNER = ONE PAYMENT / ORDER AUTHORITY.**

## 3. Development control loop

Every bounded Web V2 task follows:

**VERIFY CURRENT MAIN → ONE BOUNDED TASK → ONE PRIMARY WORKER → BRANCH → QA → REVIEW → MERGE → UPDATE WORKTREE → NEXT**

Rules:

1. One primary worker per task.
2. No parallel duplicate Web V2 branches for the same objective.
3. Finish/merge one bounded component before opening the next unless Casey explicitly authorizes parallel work.
4. No Legacy site edits merely because Web V2 needs a feature.
5. No Cloudflare mutation from an audit/recon task.
6. No production deployment from a development task unless Casey explicitly authorizes deployment/promotion.
7. No secrets committed to Git.
8. No direct application build bypassing QA.
9. No rebuild after candidate acceptance.
10. `production-deploy` remains Legacy-only and never becomes the Web V2 runtime pointer.
11. `WEB_V2_VISUAL_SYSTEM_SOP_V1_0.md` controls substantial Web V2 visual work.
12. **Start a Project** remains a primary customer path alongside ecommerce.
13. Commerce integration must preserve the checkout/payment/order authority boundary above.

## 4. Release identity model

Permanent V2 release invariant:

**ONE GIT SHA → ONE CLOUDFLARE VERSION ID → ONE TESTED VERSIONED PREVIEW → THAT SAME VERSION ID IN PRODUCTION**

Runtime truth is recorded by:

**GIT SHA + CLOUDFLARE VERSION ID + DEPLOYMENT ID**

It is never inferred from `main`, `production-deploy`, a Cloudflare branch label or a rebuild.

Promotion uses the already-created tested Cloudflare Version ID. Rollback returns traffic to a previously accepted Worker Version ID. Worker rollback covers Worker code/version state only; future D1/R2/KV migrations require separate data-compatibility and rollback controls.

## 5. Owner command semantics for this lane

- **AUDIT / SCAN / CHECK / INSPECT** = read-only → evidence → report → stop.
- **DESIGN** = architecture/documentation only.
- **BUILD** = isolated implementation inside the authorized bounded task.
- **RUN** = continue the currently authorized Worktree from the last verified state.
- **DEPLOY** = deploy/promote only the approved candidate/version.
- **STOP** = stop mutation and preserve state.

None of these commands increase authority beyond the currently authorized task/gate.

## 6. Current verified phase

Accepted Step 4 application baseline:

`04ef81368732d95c81e8f439f14524df385a9f1e`

This SHA contains the owner-accepted Step 4 merge. Later OS/control-only commits may advance `main`; they do not by themselves replace the accepted Web V2 application baseline. Every new task must re-resolve `main` before execution.

Completed and merged:

- Phase 0 architecture/recon — **COMPLETE**;
- isolated `elevation-web-v2` Worker shell — **COMPLETE**;
- exact-version release architecture — **COMPLETE**;
- Web V2 release foundation — **COMPLETE / MERGED**;
- owner-approved visual/customer-experience SOP — **COMPLETE / MERGED**;
- Phase 1 Step 4 first real Web V2 application shell — **COMPLETE / MERGED** from accepted head `5020b2138b62c122fe62d353e366e6b3bab4c445`.

Current lane state:

**PHASE 1 — SOURCE + RELEASE FOUNDATION COMPLETE THROUGH STEP 4 / EXACT-VERSION CLOUDFLARE CANDIDATE IS NEXT.**

## 7. Current worker routing

| Responsibility | Worker State | Current Task / Gate |
|---|---|---|
| WEB DEVELOPER | **STANDBY — STEP 4 MERGED** | No new UI/application task is open. Resume only on the next bounded Web V2 build packet. |
| RELEASE ENGINEER | **QUEUED / NEXT OWNER-GATED ACTION** | Prepare the exact-version candidate flow for the merged Web V2 shell. Cloudflare configuration/upload/promotion requires explicit authorization. |
| COMMERCE DEVELOPER | **STANDBY / WAIT** | Commerce V2 integration is not yet authorized. |

**One current task = one primary worker.** The next task belongs to the Release Engineer when its Cloudflare gate is explicitly opened.

## 8. Current sequence

| Sequence | State | Next Control |
|---|---|---|
| Release foundation | **COMPLETE / MERGED** | Preserve. |
| Visual SOP | **COMPLETE / MERGED** | Governs substantial visual work. |
| Step 4 application shell | **COMPLETE / MERGED** | Accepted application baseline `04ef81368732d95c81e8f439f14524df385a9f1e`. |
| Cloudflare exact-version candidate | **NEXT / OWNER-GATED** | Re-resolve the then-current `main`; configure only the explicitly authorized preview/credential prerequisites; upload one candidate from the exact approved source SHA; record Version ID + preview URL; do not promote without separate approval. |
| Commerce V2 integration | **WAIT** | Do not start yet. |
| Ops V2 | **WAIT** | Do not start yet. |
| Legacy retirement | **NOT AUTHORIZED** | Legacy Safe Prod remains protected until later proof/cutover authority. |

## 9. Legacy separation

The existing `CODING_STABILIZATION_CURRENT_WORKTREE_2026-09-12.md` controls Legacy production repair/stabilization only.

It does not control Web V2 development and must not be used to route Web V2 work back through the abandoned Legacy audit/repair model.

Legacy production remains separately protected while Web V2 is built and proven beside it.

## 10. RUN

**GIT FIRST → READ CURRENT_WORK_BOARD → READ THIS WORKTREE → VERIFY CURRENT MAIN → VERIFY CURRENT OWNER GATE → ASSIGN ONE PRIMARY WORKER → EXECUTE ONE BOUNDED TASK → QA → REVIEW → MERGE → UPDATE THIS WORKTREE → STOP AT THE NEXT GATE.**

## Control phrase

**ONE WEB DEVELOPMENT LANE → ONE CURRENT WORKTREE → ONE PRIMARY WORKER → VERIFY → BUILD → QA → MERGE → VERSION → PREVIEW → PROMOTE → NEXT.**
