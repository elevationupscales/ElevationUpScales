# Elevation UpScales — Current Worker Handoff

Updated: 2026-10-02
Control mode: **OS 1 / MPM 28 ACTIVE MANAGEMENT**
Repository: `elevationupscales/ElevationUpScales`

## Read first

1. `MASTER-SOP.md`
2. `operations/CURRENT_WORK_BOARD.md`
3. `operations/MPM_28_START_STATE_2026-10-02.md`
4. `AGENTS.md`
5. `CODING-WORKFLOW.md`
6. task-specific files explicitly required by the owner

Do not use older handoff content, old PR descriptions, dated baselines, or OS 2 records as current authority.

## Current control

- **OS 1 / Operating System = ACTIVE / CONTROLLING MANAGEMENT SYSTEM.**
- **MPM 28 = current manager continuity inside OS 1.**
- MPM numbers are continuity/session labels, not separate authority layers.
- **OS 2 / Operating System 2.0 = RETIRED.** Do not route new work through it.
- **OS 3 / Agent Manager = ACTIVE API EXECUTION / CONTROL SYSTEM.** It may be used alongside MPM 28 for bounded API execution, acceptance, verification, and audited workflows. It does not replace OS 1 management authority.
- Casey's newest direct instruction remains highest authority.
- `MASTER-SOP.md` is the repository control document.
- Current accepted `main` is technical state truth.

## Git baseline

Control transition base:

`66dc066fddd3d4f5e94fea111977731c77b92349`

Commit description at transition:

`Sync Oct 1 live Shopify purchasability baseline`

Always re-resolve `main` before beginning new work. This SHA records the MPM 28 transition starting point; it is not permission to roll back newer owner-approved work.

## OS 3 accepted state

Separate OS 3 repository:

`elevationupscales/elevationupscales-elevation-agent-manager`

Accepted OS 3 main baseline at this handoff:

`1e6970dd1fb59b82ae7e5adbf92b58c681794969`

That baseline contains the accepted CJ response-shape work and exact-gated Shopify DRAFT-create workflow. eBay read-only foundation work remains a controlled acceptance/development lane until separately accepted.

OS 3 work does not authorize production deployment, publication, payments, external sends, or unrelated mutations.

## Waiting-external rule

A blocked lane that is waiting on an external party leaves the active execution queue.

```
BLOCKED LANE
↓
WAITING EXTERNAL
↓
REMOVE FROM ACTIVE WORK QUEUE
↓
CONTINUE OTHER INDEPENDENT WORK
```

Re-enter a waiting lane only when:
- a new external reply arrives;
- materially new evidence is obtained; or
- Casey explicitly reactivates the lane.

## Current active stack

### P0
- Paid customer fulfillment, with eBay fulfillment at the front of the operational queue.
- MPM 28 management continuity and canonical-control alignment.

### P1
- OS 3 production acceptance / controlled API expansion.
- Shopify/CJ commerce workflow.
- Google Merchant repair.
- Hawaii SOK physical-movement/payment path through completion proof.
- Olight domestic revenue plus bounded global qualification.

### WAITING EXTERNAL
- PayPal complaint / account-review lane. No active recon or repeated escalation without new evidence.
- Signature Solar EG4 freight package.

### HOLD
- Any work specifically dependent on PayPal restoration.

## Platform boundary

### Git website
`elevationupscales.com`

Source/deployment:
GitHub → Cloudflare Pages

### Shopify storefront
`shop.elevationupscales.com`
`store.elevationupscales.com`

Source/deployment:
Shopify

Workers must not cross these systems by assumption.

## Worker operating rule

**ONE TASK → ONE CURRENT-MAIN BRANCH → ONE OWNER-APPROVED OBJECTIVE → VERIFY → PR/MERGE → RECORD RESULT**

Before editing:
- resolve current `main`;
- restate the exact objective;
- identify which platform owns it;
- create a focused branch from current `main`.

Before merge:
- inspect changed files;
- confirm no scope expansion;
- run applicable QA;
- compare against current `main`.

Production deployment remains a separate owner gate under `MASTER-SOP.md`.

## Stop rule

If owner says STOP / HOLD / FREEZE / NO MORE EDITS:
- stop mutations;
- preserve branch;
- do not merge;
- do not deploy;
- report state only.

## Current handoff status

**OS 1 CONTROL ALIGNED / MPM 28 ACTIVE**

This handoff alignment changes management/control documentation only.

It does **not** authorize:
- website redesign;
- Shopify publication;
- product changes;
- pricing changes;
- checkout changes;
- customer/order mutation;
- payment action;
- external sends;
- production deployment.
