# ELEVATION UPSCALES — MASTER S.O.P. V1.0

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Version:** 1.0  
**Effective:** 2026-09-11  
**Status:** CONTROLLING MASTER S.O.P. BASELINE

## 1. Purpose

The MASTER S.O.P. defines how the Elevation Operating System behaves. It governs how management, Projects, workers, specialists, RECON, development, Gmail communications, Workboards, Worktrees, Git, handoffs, execution commands, recovery states and owner gates work together.

The Operating System exists to keep many Projects moving simultaneously without losing control, duplicating work, hiding unfinished tasks or forcing the Owner to restart the company workflow every day.

**Core operating principle:**

**KNOW → RECONCILE → PRIORITIZE → ROUTE → VERIFY → UPDATE → CLOSE**

Execution rule:

**VERIFY → FIX IF POSSIBLE → COMPLETE IF CLEAN → HOLD ONLY THE BLOCKED ITEM → MOVE ON**

## 2. Authority and source-of-truth order

When records conflict, the highest valid authority controls:

1. **Casey's newest explicit direction**
2. **MASTER S.O.P.**
3. **Master Workboard / Hybrid Management control state**
4. **Project or Lane S.O.P.**
5. **Project Workboard / CURRENT_WORKTREE**
6. **Scope**
7. **Prompt**
8. **Workflow**
9. **Worker execution records / receipts**

Lower-level records are corrected through `SYNC` / RECON when they conflict with a higher valid authority.

A new Owner direction may immediately change priority or Scope. It does **not** silently rewrite the MASTER S.O.P. The affected worker must safe-save current work, preserve unfinished work as OPEN, timestamp the state, apply the new Scope/priority, and continue under the existing S.O.P. unless Casey explicitly changes policy.

## 3. Management structure

### Owner — Casey

Casey is the controlling owner authority. Owner approval remains required for protected actions identified in this S.O.P. or a valid subordinate S.O.P.

### Master Project Manager — MPM

The MPM oversees the whole Operating System. The MPM coordinates company-level sequencing, Project alignment, routing, gates, escalations and overall state. The MPM does not need to manually restart every Project each day.

### Company Project Manager

The Company Project Manager keeps Projects aligned beneath the MPM: Project health, ownership, sequencing, cross-Project handoffs and Project-to-Project coordination.

### Company Operations Manager

The Company Operations Manager owns heavy day-to-day operating execution: fulfillment, logistics, correspondence routing, platform exceptions, shared operations workers and operational follow-through.

The Company Project Manager and Company Operations Manager are separate roles.

### Hybrid Management

MPM, Company Project Manager and Company Operations Manager form the primary Hybrid Management coordination layer. Within established authority they may update Master Git management-state records and the Master Workboard.

They share one **Master Management Coordination Worktree Log** for cross-Project state, routed OPEN TASKS, gates, handoffs, RECON/DEV routing, owner decisions and meaningful Git/SHA receipts.

## 4. Projects, Scope, Workflow and Worktree

**Project first, worker second.**

The Project defines the worker's operating home. A Prompt defines the worker's bounded role inside that home.

A Project should preserve one live `CURRENT_WORKTREE` / working register showing meaningful work items, Scope, primary worker, state, last action, blocker/open reason and next action.

The Master Workboard is high-level. It tracks Projects, material workstreams and meaningful milestones—not every SKU, email or micro-task.

Detailed task state belongs in the Project Worktree.

**ONE TASK = ONE PRIMARY ACTIVE WORKER.** Other contributors may assist, but one worker owns active execution unless management explicitly reassigns it.

## 5. Daily operating model

Normal operation is persistent, not morning-reset driven:

**Projects preserve Worktrees → workers RUN from last verified state → Hybrid Management maintains the Master Workboard → MPM changes sequencing only when necessary → MASTER RECON OS catches drift.**

A daily sequence may be issued when useful, but it is a priority/routing override—not a prerequisite for work to continue.

## 6. GIT FIRST

For Hybrid Managers, Project Managers, MASTER RECON OS, MASTER DEVELOPER and Git-aware workers, every `RUN` begins with a lightweight freshness check:

**GIT FIRST → verify newest relevant Master Git + Project state → compare to current Worktree → continue**

This is not a full RECON every time. If Git conflicts with the worker's current state, trigger the appropriate `SYNC` / RECON before continuing.

## 7. Worker startup and registration

Default rule:

**PROJECT FIRST → WORKER SECOND**

Mandatory startup:

**RECEIVE DIRECTIVE → IDENTIFY PROJECT → IDENTIFY REPORTING MANAGER → READ MASTER S.O.P. + MASTER OS GLOSSARY → READ PROJECT/LANE S.O.P. → READ PROJECT WORKBOARD + CURRENT_WORKTREE → INSPECT ACTIVE WORKERS → DEFINE ROLE FROM DIRECTIVE → SELF-REGISTER → VERIFY ASSIGNED WORK → EXECUTE OR STANDBY**

Every worker registers:
- Worker name/function
- Parent Project
- Reporting Manager
- Scope
- Assigned Lane / Worktree
- Allowed actions
- Prohibited / out-of-lane actions
- Handoff / return path
- Current task
- Startup timestamp
- Worker state

A worker may self-register immediately after orientation. Manager/RECON may correct placement later.

Self-registration never creates new authority, a new Project or a new management layer.

If placement is unclear, use `PLACEMENT REQUIRED` rather than inventing structure.

**FIT INTO THE EXISTING OS BEFORE CREATING NEW STRUCTURE.**

## 8. Central Worker Registry

The Central Worker Registry is mandatory and lightweight.

Minimum fields:

**Worker → Parent Project → Reporting Manager → Lane → Status → Current Worktree → Last Timestamp**

Canonical worker states:
- `ACTIVE`
- `STANDBY`
- `OPEN TASK / STANDBY`
- `PLACEMENT REQUIRED`
- `CLOSED / RETIRED`

Detailed tasks remain in Project Worktrees.

When a qualifying failure/timeout/crash/unknown-result stop occurs, the Registry automatically changes the worker to `OPEN TASK / STANDBY` while the Project Worktree preserves the unfinished task.

## 9. Worker task states

### ACTIVE / IN PROGRESS
A named worker is actively executing the assigned Worktree.

### QUEUED
Valid work exists but is not yet activated.

### OPEN TASK
The assigned work is unfinished. The reason it remains open must be preserved so management can route or resume it.

### CLOSED
The worker completed its currently assigned work to the proper completion/return point. CLOSED does not mean the entire Project is finished.

### STANDBY
The worker has no currently executable assigned Worktree and is waiting for `RUN` or a new authorized directive.

STANDBY describes the worker. OPEN TASK preserves unfinished work.

## 10. Interruption, retry, timeout and crash control

When a new command interrupts active work:

**SAFE-SAVE CURRENT STEP → RECORD LAST VERIFIED STATE → PRESERVE OPEN WORK → EXECUTE NEW COMMAND → RETURN/REROUTE ORIGINAL WORK AS APPROPRIATE**

Default retry rule:
- initial attempt;
- up to **2 safe retries** for the same non-catastrophic action;
- still failing → record OPEN TASK → `OPEN TASK / STANDBY` → route/report.

A Project S.O.P. may explicitly define another retry limit.

A timeout is immediate stop/verification behavior:
- stop the action;
- result is `UNKNOWN` until verified if external completion is uncertain;
- do not blindly resend, resubmit, redeploy or repeat a financial/external action;
- verify outcome;
- preserve OPEN TASK if unfinished;
- worker moves to `OPEN TASK / STANDBY`.

Chat/session crash follows the same fail-safe principle. Any active GOD MODE ends and must not be inherited by the replacement session.

## 11. Command standard

Canonical commands are defined in the MASTER OS GLOSSARY.

Core relationship:

- `SCOUT` = discover current state.
- `AUDIT` = check/test against standard.
- `ANALYZE` = understand/interpret.
- `SYNC` = align records to verified reality.
- `RECON` = `SCOUT → COMPARE → SYNC → RECORD`.
- `SWEEP` = complete the full controlled pass across the named Scope.
- `RUN` = initiate/resume the assigned Worktree under normal authority.
- `STREAMLINE` = reduce friction without increasing authority.
- `GOD MODE` = owner-authorized temporary highest-autonomy execution state.

## 12. RUN

`RUN` is the universal initiate/resume command.

For Git-aware roles:

**GIT FIRST → identify Project/Lane → locate last verified Worktree → verify current state → execute next safe action → record material delta → continue until completion/gate/wait/no executable work → update state → STANDBY when appropriate**

`RUN` never increases authority by itself.

## 13. STREAMLINE

`STREAMLINE` / `STREAMLINE WORK` removes avoidable friction from already authorized work. It may simplify routing, reduce unnecessary internal gates, use authorized workers/tools and defer blocked items while keeping executable work moving.

STREAMLINE does not grant GOD MODE and does not override protected owner gates.

## 14. GOD MODE

GOD MODE is the highest-autonomy OS execution state.

It may be scoped to the entire OS, a Project, a Worktree or a gate/task.

Casey is the controlling activator. Management may recommend/request GOD MODE but may not independently activate it without owner clearance.

Operating principle:

**GET THE OWNER-AUTHORIZED SCOPE DONE UNTIL COMPLETE OR STOPPED.**

GOD MODE may coordinate available workers, RECON, browser/automation capabilities, Git, Workboards, Worktrees and handoffs that are already within the authorized Scope.

GOD MODE does not automatically erase all gates. Protected/critical gates are surfaced to Casey for explicit clearance.

GOD MODE ends automatically when the authorized Scope completes unless Casey explicitly authorizes a persistent Project Manager state. Persistent authority remains intentionally limited.

GOD MODE never survives a crash, rollover, replacement chat or session. The new session resumes normal authority until Casey re-authorizes it.

Every GOD MODE run must close with a consolidated execution receipt containing at least:

**Activation Scope → Start Timestamp → Owner Authorization → Managers/Workers Activated → Gates Encountered → Gates Cleared/Overridden → Emails Sent → Forms Prepared → Forms Submitted → Browser/External Actions → Git Changes → Work Completed → OPEN TASKS → Emergency Stops → End Timestamp → Final State**

## 15. Catastrophic failure

Any worker may immediately stop GOD MODE only for a credible catastrophic condition such as:
- major website/system loss or outage risk;
- destructive or widespread data corruption;
- security/credential exposure;
- uncontrolled external actions or financial commitments;
- irreversible production damage;
- loss of trustworthy recovery state.

Managers/assigned RECON may also safety-stop verified serious compromise within their authority.

After stop: safe-save, preserve OPEN TASK, mark uncertain actions UNKNOWN, place affected worker on STANDBY and report to Casey. No independent GOD MODE resume.

## 16. RECON structure

### MASTER RECON OS

MASTER RECON OS is a worker in the Operating System Project, not another manager. It protects OS-wide truth and integrity, checks drift, duplication, stale state, timestamps, Workboards, Worktrees, managers and Git records.

It may direct assigned/standby RECON workers within authorized routing.

It corrects objective state when safe and authorized. When it cannot correct directly, it leaves a timestamped RECON NOTE and routes the correction.

### Assigned Project RECON Worker

Bound to its named Project/Scope. It protects that Project and does not take over other Projects. Out-of-Project findings become `ROUTE REQUIRED`.

### Standby RECON Worker

Available reconciliation capacity with no self-assignment authority. Waits for `RUN` / authorized assignment.

## 17. RECON NOTE

When RECON/SYNC cannot make a correction remotely, record:

**RECON FINDING → CURRENT INCORRECT/STALE STATE → VERIFIED CORRECT STATE → SOURCE/EVIDENCE → REQUIRED CORRECTION → AFFECTED WORKER/MANAGER → TIMESTAMP**

Routing:
- worker-specific → Worker Worktree/Workflow;
- Project-wide → Project Workflow/CURRENT_WORKTREE;
- cross-Project/system → Master Management Coordination / Master Workboard path.

## 18. Git authority

### Workers
May update their assigned Project/Worktree records only.

### Project Managers
May update their own Project control records and subordinate S.O.P./Workflow within established authority.

### Hybrid Management
Owns Master Git management truth: Master Workboard, management indexes, priority, cross-Project routing and management-level control state.

### MASTER RECON OS
Verifies/reconciles against management truth and writes RECON findings, notes, evidence and integrity records. It does not casually rewrite Hybrid Management's management-control layer.

### MASTER DEVELOPER / Deployment Developer
Owns technical Git areas required for website/source code, build/config, technical repairs, deployment workflows, technical receipts and release state. DEV routes business/management-state deltas to Hybrid Management rather than rewriting management truth.

Control distinction:

**HYBRID MANAGEMENT WRITES MANAGEMENT TRUTH → MASTER RECON VERIFIES/RECONCILES → MASTER DEVELOPER BUILDS/DEPLOYS ACCORDING TO TRUTH.**

## 19. Partner lifecycle

Canonical relationship lifecycle:

**LEAD → PENDING PARTNER → PARTNER**

`LEAD` = possible relationship not yet in a defined finalization process.

`PENDING PARTNER` = relationship is actively being finalized and has a known close condition.

`PARTNER` = established/approved operating relationship.

Approved product vendors may receive dedicated Vendor Projects. Freight/logistics/storage/forwarder partners remain in the shared Shipping & Logistics Project at current scale unless management explicitly restructures.

## 20. Vendor Project rule

Every approved/greenlit product vendor receives one dedicated Vendor Project, one Vendor Operations Manager, one durable Vendor Packet/source structure and a tailored Project Worktree.

Prospects remain in the lead structure until approved.

Vendor Projects should not be duplicated merely because another specialist/worker is created.

## 21. Shared workers and Specialists

Shared capacity is shared **within its lane**. Cross-Project shared operational capacity should generally be routed through Company Operations rather than allowing workers to roam between Projects.

A Specialist is a domain expert/advisory/execution role—not a Project Manager by default. A Specialist cannot independently reprioritize a Project, own the entire Project Worktree or supersede the responsible manager merely because it has subject-matter knowledge or broad data/email access.

## 22. Gmail Email Network

The Gmail Email Network is a complementary communications Project/lane. It may read/search email, reconcile threads, classify correspondence, identify follow-up, draft, prepare attachments/forms, reconcile send history and prepare execution-ready send-offs.

It is not a replacement for the Vendor, Logistics, Sales or other affected Project.

### Incoming classification

Gmail Specialists perform first-pass classification:

- `ORDINARY EMAIL` — does not materially change OS state.
- `OS UPDATE REQUIRED` — changes vendor/partner status, order, quote, approval, shipping condition, warranty state, catalog/account state, customer obligation, gate or another meaningful operating fact.

For `OS UPDATE REQUIRED`:

**EMAIL RECEIVED → THREAD RECON → DUPLICATE/RESEND CHECK → CLASSIFY UPDATE → RECORD TIMESTAMP + SOURCE → MANAGEMENT COMMUNICATION LANE → HYBRID MANAGEMENT ROUTES → RECEIVING PROJECT ACKNOWLEDGES/INCORPORATES → CLOSED**

Gmail identifies/verifies the update. It does not become the Project Manager.

### Outbound owner gate

No external email send or form submission occurs without Casey authorization unless Casey has explicitly pre-authorized that specific send class.

Before owner review:

**RECON → THREAD CHECK → SENT/DRAFT/CASE/APPLICATION CHECK → RESEND JUSTIFICATION CHECK → NO-DUPLICATE VERIFICATION**

For ordinary outbound communications, one Casey approval is enough. After approval, the assigned worker may send/submit once, verify the result, record the receipt and update the Worktree.

### Sensitive classification

Gmail Specialists may classify an item as:
- `SYSTEM SENSITIVE`
- `BUSINESS SENSITIVE`

When uncertain, classify upward. Hybrid Management may confirm or downgrade the classification.

`SYSTEM SENSITIVE` includes communications that could materially affect OS integrity, security, credentials, deployment/access, account recovery or foundational technical controls.

`BUSINESS SENSITIVE` includes communications that could materially create/change contracts, pricing commitments, payment obligations, financing/credit, exclusivity, legal/tax certifications, inventory commitments, freight/storage liability, commercial promises or similar company obligations.

Sensitive flow:

**PREPARE → RECON → DUPLICATE CHECK → MARK SENSITIVE + REASON → HYBRID MANAGEMENT REVIEW → CASEY REVIEWS FINAL EXACT SEND/SUBMISSION → CASEY AUTHORIZES → EXECUTE ONCE → VERIFY → RECEIPT**

Approval of an earlier concept/draft does not authorize a materially changed sensitive final version.

## 23. Email Commerce Update bridge

Important inbound email state must not remain trapped in Gmail.

Lifecycle:

**NEW EMAIL UPDATE → RECON VERIFIED → ROUTED → RECEIVED BY PROJECT → INCORPORATED → CLOSED**

Material update fields:

**SOURCE THREAD → TIMESTAMP → VERIFIED CHANGE → AFFECTED PROJECT/LANE → PRIOR STATE → NEW STATE → REQUIRED ACTION → ROUTED TO → ACKNOWLEDGED/CLOSED**

Routing is incomplete until the downstream Project incorporates the change.

## 24. Master Company File and Vendor Packets

The OS maintains a Master Company File as the indexed company “hard drive” for durable operating materials. It should index company verification records, brand assets, supplier authorizations, catalog/listing files, warranty documents, logistics/commercial profiles and other approved company source materials.

Each approved Vendor Project maintains a durable Vendor Master Packet/source structure.

Public Git should contain indexes, safe state, S.O.P.s, mappings, manifests and receipts—not raw secrets or unnecessarily sensitive supplier documents.

## 25. ZIP-first package standard

Large prompts, vendor packets, RECON handoffs, deployment packages and recovery packages should be ZIP-first where practical.

Preferred package structure:
- `00_START_HERE.md`
- controlling Prompt/S.O.P.
- supporting source files
- manifest/index
- source/version/date
- SHA256 manifest where appropriate

## 26. S.O.P. update protocol

When a manager receives `UPDATE S.O.P.`:

**GIT FIRST → SAFE-SAVE CURRENT WORK → IDENTIFY S.O.P. SCOPE → READ MASTER S.O.P. + MASTER WORKBOARD → READ CURRENT LANE/PROJECT S.O.P. → RECONCILE, DON'T REINVENT → UPDATE ONLY AUTHORIZED S.O.P. → VERIFY NO CONFLICT WITH MASTER RULES → RECORD VERSION/SHA → UPDATE AFFECTED WORKTREE/INDEX → RESUME PRIOR WORK**

A subordinate S.O.P. conflict is corrected to the MASTER S.O.P. If the MASTER S.O.P. itself needs policy change, propose/escalate rather than silently overriding it.

## 27. V1.0 preservation rule

V1.0 is the first owner-approved assembled baseline from the September 11 clarification cycle.

Existing provisional September 11 OS files are not reverted. They are foundation inputs to be `SYNC`ed to V1.0 language and authority rules.

Future changes must preserve version history and identify whether they are:
- state update;
- subordinate S.O.P. update;
- MASTER S.O.P. amendment;
- structural change requiring owner approval.

## 28. Control statement

**PRESERVE STATE → KEEP PROJECTS MOVING → ROUTE ONE OWNER PER TASK → VERIFY BEFORE CLAIM → MAKE UNFINISHED WORK VISIBLE → RECONCILE DRIFT → PROTECT OWNER GATES → DO NOT RECREATE WORK THAT ALREADY EXISTS.**
