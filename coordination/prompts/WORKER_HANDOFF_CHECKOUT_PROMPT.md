# Worker Handoff / Check-Out Prompt

Copy/paste this whenever a worker pauses, hands off, runs out of context/credits, or finishes a stage:

---

Before you stop, update the controlling Gmail Management feed. Do not leave the handoff only in this chat.

Return and record:

WORK ID:
ROLE / WORKER:
LAST COMPLETED STEP:
STARTING BASELINE:
CURRENT BRANCH / CANDIDATE / SHA:
EXACT FILES / SYSTEMS CHANGED:
WRITES PERFORMED:
INHERITED WORK PRESERVED:
VERIFIED:
NOT VERIFIED:
TESTS / WORKFLOW RUNS:
PREVIEW URL:
PRODUCTION STATUS:
FUNCTIONAL ACCEPTANCE:
TECHNICAL ACCEPTANCE:
SECURITY / COMMERCE ACCEPTANCE:
VISUAL SCOPE ACCEPTANCE (if applicable):
OWNER VISUAL ACCEPTANCE (if applicable):
CURRENT BLOCKER:
EXACT NEXT ACTION:
DEPLOYMENT CUSTODY:
PRODUCTION AUTHORIZATION:
ROLLBACK / ACCEPTED BASELINE:
OTHER MANAGER FEEDS THAT MUST BE RECHECKED:

Then explicitly state:

`MANAGEMENT FEED UPDATED: YES / NO`

If NO, the handoff is incomplete. Update Management before stopping unless a tool/system outage prevents it; if so, state that exact outage and what must be copied into Management by the next authorized coordinator.

Do not say "done" if any required acceptance dimension remains FAIL, HOLD, or NOT VERIFIED.

---
