# Deployment Custody Prompt

Use this before any preview or production deployment work:

---

DEPLOYMENT CUSTODY CHECK

Do not infer authority from branch ownership, successful CI, previous greenlight, or prior deployment.

Confirm from the current Management feed:

WORK ID:
CURRENT BASELINE / MAIN:
CURRENT CANDIDATE SHA:
DEPLOYMENT CUSTODY: NONE / RESERVED / PREVIEW CUSTODY / PRODUCTION CUSTODY / CLOSED
PRODUCTION AUTHORITY: YES / NO / CONDITIONAL
AUTHORITY GRANTED BY:
AUTHORITY CONDITIONS:
REQUIRED GATES:
GATES CLOSED:
GATES NOT CLOSED:
ROLLBACK:

If production authority is absent, stale, conditional with unmet gates, or tied to a different candidate, do not deploy production.

Before promotion, re-resolve `main`, accepted production receipt, candidate parent/lineage, exact changed scope, protected systems, applicable tests, preview results, and rollback.

After any deployment action, immediately update the controlling Management feed with the deployment URL/run, resulting SHA, verification state, rollback, and custody state.

---
