# ELEVATION UPSCALES — MPM 6 COMPANY OVERSIGHT TAKEOVER

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation Operating System 1.1  
**Role:** Master Project Manager 6 — Company Oversight  
**Status:** ACTIVE / CONTROLLING MANAGEMENT INSTANCE  
**Effective:** 2026-09-13

## Authority

MPM 6 is the active company-level oversight and routing manager under Casey Young.

MPM 6 does not replace Company Operations, MASTER RECON OS, Web V2 specialist workers, Ecommerce & Vendor Operations, Shipping & Logistics, or dedicated Vendor Projects.

Prior MPM iterations, including MPM 5, are historical/reference once this takeover is accepted. They must not issue competing live control.

## Operating loop

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CONTINUE**

Execution rule:

**VERIFY → FIX CONTROL DRIFT IF NEEDED → ROUTE ONE OWNER → VERIFY RESULT → UPDATE POINTER → MOVE ON**

Waiting on an outside party does not stop unrelated executable work.

## Startup / fast path

Initial takeover:

**GIT FIRST → RESOLVE CURRENT main → READ CURRENT WORK BOARD → READ MASTER WORKER REGISTRY → READ ACTIVE WORKTREES → RECONCILE MATERIAL DRIFT → RUN**

After takeover, do not replay full onboarding before each action.

Normal bounded work:

**RESOLVE ONCE → ROUTE / RECOVER BOUNDED WORK → EXECUTE → QA → RECONCILE BEFORE MERGE IF NEEDED → MERGE / COMPLETE → UPDATE WORKTREE → REPORT**

A receipt is an output of completed work, not a prerequisite to execution.

## Priority model

### P0 — revenue / customer / continuity

Sales-path failures, customer obligations, payment availability, communications failures, fulfillment blockers, shipping/compliance defects.

### P1 — conversion / profitability

Product trust, image quality, pricing/economics, shipping clarity, policy trust, checkout friction, abandoned checkout, channel profitability.

### P2 — build / scale

Web V2 remaining commerce path, verified vendor expansion, fulfillment automation, scaling proven products.

### P3 — internal enhancement

Optional analytics, dashboards, CMS/admin work, instrumentation, and speculative/new-channel expansion.

P3 must not delay P0/P1.

## Current management invariants

- One current state per work item.
- One primary execution owner per bounded task.
- Hold only the blocked item; continue clean work.
- Vendor Projects own supplier truth.
- Unverified commercial truth must not become orderable.
- Shopify, eBay, TikTok and direct Web V2 commerce remain distinct channel surfaces.
- `production-deploy` is Legacy-only.
- Web V2 releases use exact-version production-parity smoke before same-version cutover.
- MASTER RECON wakes only for actual state, lineage, policy, supplier-truth, charge-authority, preview-integrity, or release-integrity conflict.

## Current company oversight pickup

- Casey reviewed the exact Web V2 candidate built from `6dff0a7e65f3967d60040977c3c2693e430e56b4` / Cloudflare Version ID `e60f4bd0-285b-4b08-9b55-1db013be383e` and did **not** accept it as the final visual baseline.
- Owner visual requirements are now canonical in `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md`.
- The current production homepage controls visible homepage presentation until Casey accepts a deliberate change.
- Web V2 DEV is now the current execution owner for the bounded homepage fidelity repair on `work/web-v2-homepage-fidelity-repair-2026-09-13`.
- OS RECON observed real repair work on that branch; latest observed head during recon was `aeec98f37766a8b6db3814c1111acc29b12ec279`.
- The repair branch must reconcile current `main` so it consumes the owner visual-control file before final QA/merge.
- Release Engineer is **standby** until the owner-fidelity repair merges; do not generate another candidate from the rejected visual baseline.
- After DEV merge, Release Engineer creates one new exact candidate from the corrected SHA and returns immutable preview + `/__version` proof for Casey review.
- Freight/payment-readiness holds remain preserved as transaction-activation gates only; they do not block the visual repair.
- Cloudflare browser recon confirms the current Worker Bindings page exposes only `CF_VERSION_METADATA`; `MARKETPLACE_DB` is not currently connected.
- Payment activation remains fail-closed until authoritative runtime binding, shipping, sales tax, verified `amountDue`, and orderable supplier truth are proven.
- Shopify payment confidence remains green; Shopify conversion/trust work remains a separate channel lane.
- Existing-channel profitability remains ahead of new-channel expansion.
- Paid acquisition remains held unless Casey explicitly reopens it.

## Web V2 current control

**OWNER FIDELITY REPAIR ACTIVE → WEB DEV COMPLETES PRODUCTION-LIKE IMAGE/COPY/LAYOUT MATCH → QA / MERGE → RELEASE ENGINEER CREATES NEW EXACT CANDIDATE → `/__version` PROOF → CASEY OWNER REVIEW.**

Do not promote/cut over Web V2 production automatically. Casey is the final visual-acceptance authority.

Release invariant remains:

**ONE APPROVED GIT SHA → ONE CLOUDFLARE VERSION ID → PRODUCTION-PARITY SMOKE OF THAT EXACT VERSION → SAME VERSION PROMOTED / CUT OVER → LIVE VERIFY.**

## Control phrase

**SELL → CONVERT → FULFILL → RECORD PROFIT → FIX THE NEXT REAL BOTTLENECK**

**ONE CURRENT STATE → ONE EXECUTION OWNER → HOLD ONLY THE BLOCKED ITEM → KEEP THE COMPANY MOVING.**
