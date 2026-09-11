# Elevation UpScales — Owner RUN Direct Deployment Decision

**Status:** ACTIVE / OWNER DECISION  
**Effective:** 2026-09-11  
**Owner:** Casey Young  
**Applies to:** Operating System Project Manager, Company Operations Manager, Developer/Release lane

## Decision

When Casey issues **RUN**, an already-approved website/runtime repair is not complete merely because it is merged.

If the repair is merged to the reviewed current `main`, required QA/security checks are clean, production is stale or drift is proven, and no true hard gate remains, **RUN authorizes the production catch-up automatically**.

No second owner message saying `DEPLOY` is required for that ordinary approved-repair catch-up.

## Direct release path

Preferred path when GitHub ref control is available:

**RE-RESOLVE CURRENT MAIN → VERIFY REVIEWED/QA-CLEAN SHA → FAST-FORWARD `production-deploy` TO THE EXACT CURRENT MAIN SHA → EXISTING DEPLOY WORKFLOW RUNS QA / SECRET SCAN / CLOUDFLARE DEPLOY / CANONICAL SMOKE → VERIFY LIVE REPAIR / DRIFT CLOSED → RECORD RECEIPT**

Rules:

- never force `production-deploy`;
- never point `production-deploy` at an unmerged work branch;
- re-resolve `main` immediately before moving the release ref;
- do not deploy docs-only changes when there is no runtime effect or proven production drift;
- if the production workflow fails, fix only the proven release/runtime failure and keep the release worktree open;
- do not rewrite already-approved design/copy simply because production is stale.

## Scope containment

This decision does not give every vendor/project manager production authority.

A dedicated SOK, Renogy, VEVOR, Kingboss or other project manager remains inside that project lane. If its bounded work creates a shared-site runtime repair, it records/routes **RELEASE REQUIRED** upward. The OS/Company Operations/Developer release lane completes the production step under the same Owner RUN worktree.

## Hard gates preserved

RUN does not bypass:

- failing canonical QA or secret/security checks;
- customer money/payment integrity;
- legal/compliance requirements;
- supplier/channel authorization;
- MAP/pricing controls;
- lithium/DG/freight safety;
- protected credentials/data;
- binding commercial commitments requiring a separate owner decision.

## Current drift application

The September 11 morning recovery sweep verified that PR #94's approved homepage/lithium design and wording remain correct on current Git source while canonical production is stale.

Therefore, on the next OS/Company Operations/Developer **RUN**, that release row is executable as:

**CURRENT MAIN → `production-deploy` FAST-FORWARD → PRODUCTION WORKFLOW → LIVE SMOKE / APPROVED DESIGN VERIFICATION**

The older `CURRENT_WORK_BOARD.md` wording that says this specific repair must wait for a separate exact-SHA preview and second production confirmation is **superseded by this newer Owner decision and the updated Owner RUN protocol** until the board is next reconciled.

## Controlling references

- `operations/OWNER_RUN_COMMAND_EXECUTION_PROTOCOL_2026-09-10.md`
- `operations/UNIFIED_RUN_WORKFLOW_SOP_2026-09-10.md`
- `.github/workflows/deploy-pages.yml`
- `operations/MORNING_RECOVERY_SWEEP_2026-09-11.md`
