# Recon Damage Report — Tailored Workflow

**Effective:** 2026-09-11  
**Status:** ACTIVE

## Trigger

Use this workflow after an aggressive work stretch, major release window, vendor/catalog expansion, Operating System restructuring, payment/checkout change, or when Casey explicitly requests a damage report/recovery sweep.

## Pass sequence

### 1. Resolve
- current `main`
- current production/release state
- canonical work board
- applicable project sources
- open PRs/issues/workflows
- live commerce/catalog state where relevant

### 2. Compare
Compare current state against the newest approved/accepted state. Distinguish:
- real regression;
- expected incomplete work;
- stale documentation only;
- external waiting;
- owner gate;
- already repaired/closed item.

### 3. Classify
Every finding becomes exactly one of:
- `DAMAGE — REPAIR NOW`
- `DAMAGE — ROUTE TO OWNER LANE`
- `STALE CONTROL — RECONCILE ONLY`
- `WAITING — NO DAMAGE`
- `HOLD — INTENTIONAL`
- `CLOSED — PROTECTED FROM RECREATION`

### 4. Repair/routing
- project-owned low-risk control/state drift: repair directly;
- vendor fact/catalog issue: route to vendor project;
- runtime/release defect: Developer/Release lane;
- payment/checkout: Commerce/Payments lane;
- owner/financial/legal commitment: owner gate;
- security exposure: stop affected path and escalate immediately.

### 5. Verify
No item closes on a commit alone. Use the applicable proof:
- live site smoke;
- Shopify/catalog query;
- checkout/payment-path test;
- exact-SHA workflow success;
- supplier/source verification;
- canonical board/source update;
- security/QA pass.

### 6. Record
Update the newest damage report and Project Source. Do not create a new permanent manager, issue or project for each finding.

## First recovery pass scope

The initial pass must specifically reconcile:
- stale VEVOR storefront-password blocker language after owner removal;
- stale Renogy zero-product wording versus staged Stage-01 catalog state;
- stale homepage release row versus verified production deployment closure;
- PayPal/payment activation state and any internal working-capital cap dependent on verified fund availability;
- universal catalog vendor-state accuracy;
- VEVOR generated-archive/security regression recurrence;
- any newly surfaced aggressive-work side effect proven from current evidence.

## Exit condition

A pass is complete when all proven damage is repaired/routed/held with a real trigger and no stale control text can cause completed work to be recreated or valid commerce to be falsely blocked.
