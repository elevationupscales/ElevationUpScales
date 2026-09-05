# Manager Reconciliation Prompt

Use this for Operations or any manager reviewing a worker before giving direction:

---

MANAGER RECONCILIATION CHECK

Do not direct implementation from one feed in isolation.

1. Read the live Management Directory.
2. Read the workstream's controlling management feed.
3. Read manager feeds that own dependent truth.
4. Resolve current accepted production/baseline if code is involved.
5. Identify current work item(s), owner(s), claimed scopes, candidate(s), blockers, acceptance state, and deployment custody.
6. Identify stale/superseded handoffs and mark them non-controlling.
7. Check for overlap with other active workers/managers.
8. Reconcile differences before issuing new work.

Return:

WORK ID(S):
CURRENT PRIMARY OWNER:
CURRENT BASELINE:
CURRENT CANDIDATE:
CONTROLLING FEED:
DEPENDENT MANAGER FEEDS CHECKED:
SCOPE:
OVERLAP FOUND: YES / NO
STALE/SUPERSEDED DIRECTION:
BLOCKERS:
ACCEPTANCE STATE:
DEPLOYMENT CUSTODY:
PRODUCTION AUTHORITY:
NEXT ACTION:

If a worker's latest chat state differs from Management, update Management before allowing downstream workers to act on it.

Managers define truth inside their lane; they do not silently take ownership of another manager's lane.

---
