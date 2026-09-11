# Recon Damage Report — Tailored Workflow

**Effective:** 2026-09-11  
**Status:** ACTIVE

## Trigger
Use after an aggressive work stretch, incident, major release/vendor/catalog/payment change, or explicit owner request for a damage report/recovery sweep.

## Sequence
1. Resolve current `main`, current production/platform state, canonical work board, applicable Project Sources and open worktrees.
2. Compare current state against newest approved/accepted evidence.
3. Classify each item as exactly one of:
   - `DAMAGE — REPAIR NOW`
   - `DAMAGE — ROUTE TO OWNER LANE`
   - `STALE CONTROL — RECONCILE ONLY`
   - `WAITING — NO DAMAGE`
   - `HOLD — INTENTIONAL`
   - `CLOSED — PROTECTED FROM RECREATION`
4. Contain only the affected action. Do not freeze unrelated safe work.
5. Route repairs to the owning vendor/developer/commerce/payment/release/communications lane.
6. Verify with live/platform/source evidence; a commit alone is not closure.
7. Update Project Source and the applicable incident/damage report.

## First recovery pass
- absorb `OUTBOUND_EMAIL_DAMAGE_REPORT_2026-09-11.md` as the seed incident;
- keep outbound automation containment scoped to the incident until owner review resolves the DHX identity/shipper ambiguity;
- preserve SAFE-SAVED PayPal/direct-site work;
- reconcile stale VEVOR Shopify-password blocker language after owner removal;
- reconcile Renogy five staged Stage-01 drafts against older zero-product wording;
- reconcile stale homepage-release state against successful production release evidence;
- verify PayPal activation/payment path before removing any internal working-capital/order-value cap;
- verify VEVOR archive/security regression does not recur.

## Exit condition
A recovery cycle closes when every proven damage item is repaired and verified, routed into a durable owning-lane worktree, intentionally accepted by Casey, or placed on a legitimate WAITING/HOLD trigger—and stale controls can no longer recreate completed work or falsely block valid operations.