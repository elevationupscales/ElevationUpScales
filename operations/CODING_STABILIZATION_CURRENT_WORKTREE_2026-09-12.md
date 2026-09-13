# ELEVATION UPSCALES — CODING STABILIZATION CURRENT WORKTREE

> **OS 1.1 SCOPE BOUNDARY — 2026-09-12**  
> This Worktree controls **Legacy production repair/stabilization only**. It does **not** control the permanent Web V2 development lane.  
> Web V2 current control is `WEB_V2_CURRENT_WORKTREE.md`.  
> Do not route Web V2 work back through the abandoned Legacy audit/repair model, MASTER DEVELOPER standby lane, or `production-deploy`.

**Date:** 2026-09-12  
**State:** **STANDBY — PRODUCTION REPAIR CLOSED / OWNER ROLLED BACK ABORTED LIVE-SITE AUDIT ROUND**  
**Reports To:** MPM  
**Execution Owner:** MASTER DEVELOPER — **STANDBY / VERIFY-FIX ONLY**  
**Integrity Validator:** MASTER RECON OS — **TRIGGERED ONLY**  
**Incident record:** `MPM5_OWNER_ROLLBACK_LIVE_SITE_AUDIT_INCIDENT_2026-09-12.md`

## Current production truth

Accepted Legacy production remains:

`production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88`

That production commit is the completed bounded direct-site checkout / PayPal capture repair.

No code from the subsequent live-site audit round reached production.

`production-deploy` is **LEGACY ONLY** and must not be used as the Web V2 runtime pointer.

## Aborted audit round

The owner requested a website scan. Execution drifted from read-only inspection into implementation and created:

`repair/live-site-audit-20260912`

Current audit-branch tip:

`5fc55c806c1d7e138a9819a234e85ec932a056cb`

Disposition:

**QUARANTINED / ABANDONED / DO NOT DEPLOY / DO NOT MERGE.**

The branch is five commits ahead of the production parent and contains changes to checkout code, package/test wiring, a new test, and a new audit-specific GitHub Actions workflow.

Workflow run `34728792703` completed **FAILURE** during canonical QA. Do not rerun it.

## Owner rollback

Owner direction:

**STOP ADDING LAYERS OF REPAIR.**

The owner rolled back/abandoned the audit round and requested an audit of how execution drifted.

The audit branch is evidence only. It is not an active candidate and does not authorize any follow-on patch.

## Correct Legacy execution rule

For Legacy production requests:

### Scan / audit / inspect / check / review

**READ-ONLY LIVE INSPECTION → SOURCE VERIFICATION IF NEEDED → PRIORITIZED DEFECT REPORT → STOP.**

Do not create a repair branch, edit code, add tests, add workflows, change configuration, or deploy merely because a scan found an issue.

### Repair / fix / build / deploy / RUN with mutation clearly authorized

**ONE DEFECT PACKET → ONE BOUNDED CANDIDATE → EXISTING QA → DEPLOY ONLY IF AUTHORIZED → LIVE VERIFY → CLOSE.**

No new workflow/control layer for a one-off Legacy repair unless Casey explicitly authorizes a permanent new workflow.

Web V2 development follows `WEB_V2_CURRENT_WORKTREE.md` and its exact-version release model instead of this Legacy repair loop.

## Current DEV disposition

**MASTER DEVELOPER = STANDBY / VERIFY-FIX ONLY FOR LEGACY PRODUCTION.**

Wake MASTER DEVELOPER only when:

1. a fresh reproducible Legacy defect exists;
2. the defect is specific enough to form one bounded packet; and
3. Casey/MPM has authorized Legacy repair execution rather than inspection only.

MASTER RECON remains available for lineage/state conflicts but is not a standing website executor.

Web V2 specialist workers are routed through `WEB_V2_CURRENT_WORKTREE.md` and do not wake this Legacy lane.

## Protected state

- Legacy production `894b15cb...` remains the accepted runtime baseline.
- Do not wholesale deploy `main` to Legacy production.
- Do not deploy or cherry-pick `repair/live-site-audit-20260912`.
- Stale candidate `84af23ec814baa73718e33ec052044ce4706534d` remains DO NOT DEPLOY.
- Do not create additional Legacy website-repair workflows as a reaction to this incident.
- `production-deploy` remains Legacy-only.
- Web V2 remains separate and is controlled by `WEB_V2_CURRENT_WORKTREE.md`.
- Shopify remains its own commerce lane.
- New-item listing and paid-acquisition controls remain separate business decisions and are not changed by this rollback.
- Protected Legacy homepage-top rules remain unchanged.

## Observations from the aborted scan

Any Legacy website issues seen during the aborted round are now **UNCONFIRMED BACKLOG EVIDENCE ONLY**. They must be reproduced in a fresh read-only scan before being promoted to an active Legacy repair packet.

Do not assume an observation from the aborted round is still a current production defect merely because it appeared in browser/source evidence during the incident.

## Control phrase

**LEGACY PRODUCTION CLOSED → AUDIT ROUND ROLLED BACK → MASTER DEV STANDBY → WEB V2 ROUTED SEPARATELY → SCAN READ-ONLY → REPORT FIRST → ONE LEGACY REPAIR ONLY WHEN AUTHORIZED.**
