# ELEVATION UPSCALES — OWNER DIRECTIVE: WEB V2 DIRECT RELEASE CONTROL

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Effective:** 2026-09-16  
**Status:** ACTIVE / P0 RELEASE CONTROL  
**Authority:** NEWEST OWNER DIRECTION — supersedes conflicting historical Web V2 recovery/replay instructions

---

# PURPOSE

Stop release-management loops from turning approved current code into hours of recovery, recon, branch replay, duplicate QA, and repeated owner gates.

The objective is simple:

**GET THE CURRENT APPROVED STORE SAFELY LIVE.**

Safeguards remain. Ritual does not.

---

# PRIMARY RELEASE RULE

If current `main` contains the owner-approved work and passes release-critical QA:

**DEPLOY CURRENT MAIN.**

Do not route backward through a historical recovery branch merely because an older worktree, handoff, MPM prompt, recon report, or dated Markdown file still describes that path.

---

# CANONICAL RELEASE LOOP

**RESOLVE CURRENT MAIN → RUN REQUIRED RELEASE-CRITICAL TESTS → FIX ONLY A PROVEN RELEASE BLOCKER → CREATE ONE IMMUTABLE CLOUDFLARE CANDIDATE → VERIFY GIT SHA / VERSION ID → SMOKE HOME / STORE / PRODUCT / CART / CHECKOUT / PAYPAL → PROMOTE THE SAME TESTED VERSION → VERIFY LIVE PRODUCTION → RECORD BASELINE → DONE.**

No additional management phase is inserted unless a real defect is proven.

---

# RELEASE-CRITICAL QA

QA should prove the customer revenue path, not recreate the entire project history.

Minimum release proof:

- homepage renders;
- store renders;
- representative product detail renders;
- Add to Cart works;
- cart persists and totals correctly;
- checkout accepts required customer/delivery data;
- payment handoff reaches PayPal correctly without an unintended charge during smoke testing;
- server-side orderability/price truth remains enforced;
- production candidate identifies the exact Git SHA and Cloudflare Version ID;
- no release-critical error is present in the tested path.

Visual inspection is required only for material customer-facing regressions introduced by the current candidate. Previously approved visual work is not re-litigated every release.

---

# HISTORICAL RECOVERY RULE

Historical Web V2 recovery states including `e0db198...`, `a2c0de22...`, prior Cloudflare candidates, old screenshot artifacts, and old recovery branches are now:

**REFERENCE / ROLLBACK EVIDENCE ONLY.**

They may be reactivated only when current `main` fails and a specific regression requires comparison or restoration.

A manager or worker may not send the owner backward through recovery because a historical document still says `RECOVER`, `PHASE A`, `PHASE B`, `FORWARD-PORT`, or `STOP FOR OWNER`.

---

# STALE-CONTROL AUTO-INVALIDATION

Any deployment instruction that names a specific Git SHA as current becomes **STALE / REFERENCE ONLY** when `main` advances beyond that SHA, unless the instruction explicitly states that it remains a permanent invariant.

Before routing Web V2 work, resolve current `main` once.

If an older document conflicts with current `main` and this directive:

**CURRENT MAIN + THIS DIRECTIVE WINS.**

Do not open a recon project to discover that the old file is stale.

---

# OWNER GATE RULE

Owner approval is required when:

- a new material customer-facing design is being introduced;
- pricing/business policy is being changed;
- payment behavior is being materially changed;
- a release-critical defect requires a tradeoff that only Casey should decide;
- Casey explicitly requests a review gate.

Owner approval is **not** required again merely because:

- previously approved work was merged to current `main`;
- a release candidate must be created;
- normal smoke tests must run;
- the same tested version must be promoted;
- a worker is handing off to another worker.

One owner decision must not be multiplied into several synthetic owner gates.

---

# MANAGER / WORKER CONTROL

For one release there is one execution owner.

Managers may:

- confirm current state;
- route one execution worker;
- verify the receipt;
- escalate a proven blocker.

Managers may not:

- create another recovery phase without a proven defect;
- require duplicate recon already supported by current Git evidence;
- restart visual approval already accepted by Casey;
- require historical forward-port work when the approved delta is already on current `main`;
- create a new worktree simply because the prior manager changed;
- block release for unrelated catalog/media/admin cleanup.

Waiting or failure in one non-release-critical lane does not stop an otherwise clean release.

---

# SCOPE DISCIPLINE

During release:

**FIX ONLY THE BLOCKER.**

Do not add:

- broad redesign;
- catalog normalization unrelated to the failing SKU/path;
- optional media cleanup;
- new management architecture;
- new analytics work;
- unrelated vendor integration;
- documentation churn beyond the release receipt.

Post-release improvements become separate bounded work after production is verified.

---

# FAILURE PATH

If release-critical QA fails:

**IDENTIFY EXACT FAILURE → MAKE SMALLEST SAFE FIX ON CURRENT MAIN PATH → TEST AGAIN → CONTINUE RELEASE.**

Use a historical recovery reference only if it materially helps repair that exact defect.

Do not automatically restart the entire recovery workflow.

---

# RELEASE RECEIPT

A completed release needs only:

- deployed Git SHA;
- Cloudflare Version ID / deployment identifier;
- required QA result;
- production smoke result;
- any specific held defects that did not block release.

No long narrative handoff is required to prove a clean release.

---

# CONTROL PHRASE

**CURRENT MAIN IS THE RELEASE SOURCE. TEST THE REVENUE PATH. FIX ONLY PROVEN BLOCKERS. PROMOTE THE SAME TESTED VERSION. HISTORICAL RECOVERY IS EXCEPTION-ONLY. DO NOT TURN RELEASE CONTROL INTO ANOTHER PROJECT.**
