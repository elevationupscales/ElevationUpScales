# Elevation UpScales — Coordination Control Plane

This directory is the shared worker communication layer for Elevation UpScales.

## READ THIS FIRST — OVERSEER DIRECTIVE

Every worker must begin with:

1. `/coordination/MANAGEMENT_README.md`
2. `/coordination/WORKER_PROTOCOL.md`
3. `/ELEVATION_4_3_MASTER_STATUS.md`
4. the controlling handoff/management feed for the workstream
5. every manager feed that owns truth the task depends on

**No worker may treat its chat as the only source of truth.**

The required loop is:

**READ → RECONCILE → CLAIM → WORK → REPORT → VERIFY → HANDOFF/CLOSE**

Website workers have an additional hard rule: before edits, after material milestones, and before stopping, they must report their current work state into the controlling Management feed so work does not stack invisibly or overlap another worker.

## Prompt Library

Use `/coordination/prompts/` when starting, syncing, handing off, reconciling managers, or checking deployment custody:

- `WORKER_START_CHECKIN_PROMPT.md`
- `WEBSITE_WORKER_SYNC_PROMPT.md`
- `WORKER_HANDOFF_CHECKOUT_PROMPT.md`
- `MANAGER_RECONCILIATION_PROMPT.md`
- `DEPLOYMENT_CUSTODY_PROMPT.md`

## Directories

- `handoffs/` — approved work instructions and scope
- `receipts/` — completed audit/deployment/verification evidence
- `decisions/` — durable business/system decisions future workers must preserve
- `audits/` — formal acceptance/process audits
- `prompts/` — copy/paste worker-management synchronization prompts

## Source-of-Truth Rule

Chats provide context, but implementation work must be reconciled against the current owner/management system and accepted production source.

If a chat and the control plane conflict, use the newest explicit owner/management decision and update the control plane/Management feed so the next worker receives the corrected state.

**READ MANAGEMENT FIRST. REPORT MATERIAL WORK WHILE WORKING. UPDATE MANAGEMENT BEFORE STOPPING.**
