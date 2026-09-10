# Elevation UpScales — Cross-GPT Communication & Approval SOP

**Status:** ACTIVE / CONTROLLING EXTENSION  
**Effective:** 2026-09-10  
**Reconciled:** 2026-09-10  
**Owner:** Casey Young  
**Parent SOP:** `operations/MANAGEMENT_OPERATING_SOP.md`

## Purpose

Keep Company Operations and Peter's Ecommerce & Vendor Operations AI environment on one operating baseline without creating a second priority system or granting uncontrolled website-development authority.

This SOP controls the communication bridge, execution receipts, synchronization behavior and approval boundaries between the two environments.

It does **not** own the company's global worktree.

Current global priority/state is controlled by:

`operations/CURRENT_WORK_BOARD.md`

## Shared baseline

Use this authority order:

1. Casey / Owner's newest explicit direction.
2. `operations/CURRENT_WORK_BOARD.md` for reconciled global current priority and work-item state.
3. `operations/MANAGEMENT_OPERATING_SOP.md`.
4. `operations/INTERNAL_WORKER_CONFIDENTIALITY_IP_AND_FILE_USE_POLICY.md`.
5. Current controlling `/operations/` project/lane records.
6. Verified live business/platform/vendor facts.
7. Historical handoffs only when needed to resolve an actual gap.

Peter's team must not rebuild or fork company policy. Company Operations must not restart work Peter has already verified and returned cleanly.

## Communication loop

Use:

**CURRENT COMPANY BASELINE → PETER EXECUTION → PETER DELTA / RESULT → COMPANY OPERATIONS RECONCILE → CURRENT WORK BOARD / LANE RECORD UPDATE → PETER CONTINUES**

Peter's AI team reports what changed, not the entire lane history.

Peter's normal return format is intentionally short under the current simplified Peter control:

- `DONE:` what was actually completed;
- `BLOCKED:` only a real blocker, or `NONE`;
- `NEXT:` next executable action;
- `NEEDS CASEY:` only when a genuine owner gate exists.

Add evidence or a longer sync receipt only when it materially helps reconciliation, recovery, compliance, or a complex handoff.

## Priority synchronization

Do not maintain a copied static priority board in this SOP.

At the beginning of meaningful work, Peter's environment should consult `CURRENT_WORK_BOARD.md` and identify the highest-priority Peter-owned executable row.

A real paid-customer/order/security/checkout exception may interrupt when immediate operating risk exists. Resolve or isolate that exception, update/return its state, then resume the highest-priority unblocked row.

### WAITING / HOLD behavior

A work item waiting on an external response, unavailable account access, future date, missing document, or other real dependency does not stay at the top of the execution queue.

Use:

**VERIFY BLOCKER → RECORD TRIGGER → WAIT/HOLD → CONTINUE NEXT UNBLOCKED PRIORITY**

Return to the item when:

- the required reply/file/access arrives;
- its defined date/deadline is reached;
- a material state change occurs; or
- Casey / Company Operations explicitly promotes it.

Do not repeatedly re-check or re-email a legitimately waiting lane merely because it remains open.

A newer priority never silently closes an older unresolved row.

## Peter workflow relationship

`PETER_PROJECT_STARTER_V2_2026-09-10.md` now contains Peter's simplified execution control.

That file intentionally removes the earlier heavy Peter-specific management process and recurring SOP-maintenance requirement.

Accordingly:

- **Peter SOP Sync is no longer a required recurring task.**
- Peter does not need to rewrite his SOP after routine management updates.
- Current work order belongs in `CURRENT_WORK_BOARD.md`, not in parallel Peter/Cross-GPT boards.
- Peter should spend routine work time executing, not maintaining management infrastructure.

## Peter SOP / working-delta model

Peter's AI team may still maintain lane-specific working notes when execution genuinely requires them, but those notes are not company-wide authority.

When a material Peter-lane lesson is discovered:

1. preserve the shared parent SOPs and current work board;
2. capture only the lane-specific addition/clarification needed;
3. return the material delta to Company Operations;
4. Company Operations / OS PM reconciles any company-wide consequence;
5. Peter continues from the reconciled baseline rather than creating a competing control record.

## Website / development / Git approval boundary

Peter and Peter's AI workers are **READ / PROPOSE by default** for website-development Git.

Without explicit approval issued from Casey's owner-side chat for the exact scope, Peter's AI team must not:

- modify website/runtime source files;
- modify checkout, auth, payment, shipping, deployment, Workers, Pages, bindings or production behavior;
- create or merge website-development branches/PRs;
- commit application/runtime changes to `main`;
- deploy or authorize production releases;
- treat repository visibility or technical write capability as authorization.

Peter's team may:

- read public-safe `/operations/` policy/state;
- read public source needed to understand assigned work;
- prepare proposed changes, annotations, acceptance criteria, catalog/product data, screenshots or patch instructions;
- update Peter's internal working project knowledge;
- return proposals to Company Operations / OS PM / Developer Manager.

### Owner-side development approval gate

A valid owner authorization should identify the approved feature/problem or file scope and, where applicable:

- whether Peter may only propose or actually write;
- branch/repository boundary;
- test/preview requirement;
- production/deployment authority.

Approval for one scope does not become standing website-development authority.

## Platform-access boundary

Connected context is not the same as authenticated action access.

If Peter's worker lacks the tool/account access required for an action:

- preserve the project and work item;
- return the exact unavailable action;
- route only that human/UI step;
- continue other unblocked work.

**A BLOCKED WORKER DOES NOT MEAN A BLOCKED PROJECT.**

Do not request or transmit passwords, MFA codes, tokens, session cookies or other authentication secrets through ordinary handoffs.

## Internal confidentiality / IP / terms-of-use control

All Company Materials exchanged between Company Operations, Peter, Peter's AI workers, contractors, managers or other authorized recipients remain subject to:

`operations/INTERNAL_WORKER_CONFIDENTIALITY_IP_AND_FILE_USE_POLICY.md`

New internal ZIP, AI continuity, worker or cross-GPT packages must include the required root terms-of-use notice and current internal policy as defined by that controlling record.

No protected credentials, tax documents, customer PII, banking records, private supplier pricing, private freight rates, API keys, authentication artifacts or other protected records may be placed into public Git-tracked handoffs merely for convenience.

## Protected data

The repository is public. Never place credentials, customer PII, private vendor pricing, signed tax forms, banking records, private freight rates, API keys, authentication artifacts or other protected records into Git or cross-GPT handoffs.

## Operating result

**ONE CURRENT WORK BOARD → TWO COORDINATED EXECUTION ENVIRONMENTS → SIMPLE RESULT RETURN → WAITING WORK PRESERVED → AUTHORITY STAYS EXPLICIT → COMPANY MATERIALS REMAIN PROTECTED**
