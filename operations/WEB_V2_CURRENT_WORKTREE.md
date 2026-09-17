# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **COMMERCE STABILIZATION / DEVELOPMENT ACTIVE**  
**Canonical state:** `CURRENT_WORK_BOARD.md`  
**Historical recovery workflow:** `WEB_V2_DEV_OS_RECOVERY_WORKFLOW_2026-09-14.md` — **REFERENCE / EXCEPTION ONLY**

---

# 1. CURRENT CONTROL

Major website build/edit work is substantially complete.

Web V2 is no longer operating as a broad redesign/rebuild program and management/recon chats are no longer the default coding/deployment lane.

The controlling execution path is:

**PROVEN DEFECT → MPM ROUTES BOUNDED PACKET → DEVELOPMENT BRANCH → BUILD → TEST → QA/RECON VERIFY → READY TO DEPLOY → CASEY APPROVAL → RELEASE ENGINEER DEPLOY → LIVE SMOKE → RECORD BASELINE.**

Development is state/gate driven. It is not run on a clock or deadline block unless Casey explicitly sets one.

---

# 2. OWNER DEPLOYMENT GATE

**NO PRODUCTION DEPLOYMENT WITHOUT CASEY'S EXPLICIT APPROVAL.**

Development may create branches, fixes, tests, previews/candidates and release receipts under already-approved scope.

Production promotion/deployment must stop at:

**READY TO DEPLOY — OWNER APPROVAL REQUIRED.**

This owner instruction supersedes older language allowing normal promotion/deployment without a fresh Casey gate.

The temporary manager/recon direct-deploy pattern used during major website grunt work is closed. MPM/COM/Recon may directly code/deploy only when Casey explicitly authorizes that exception for the specific task.

---

# 3. CURRENT DEVELOPMENT SCOPE

Work only **proven customer/revenue-path defects** and bounded commerce stabilization.

Current allowed classes include:

1. store readability/contrast or broken branding asset behavior;
2. product card → product detail → CTA consistency;
3. SKU/model visibility and customer-readable product identity;
4. catalog category/classification defects that materially hurt shopping;
5. listing/card presentation defects after functional revenue-path defects;
6. exact checkout/cart defects proven by QA.

Do not broaden into:

- homepage redesign;
- broad visual redesign;
- new architecture;
- new vendor integrations unrelated to a proven blocker;
- speculative shipping/tax/payment changes;
- unrelated Shopify/eBay work;
- management dashboards/analytics unless specifically routed;
- mass catalog polish before duplicate/source truth is resolved.

Kingboss remains isolated and must not block the main store or other vendor lanes.

---

# 4. CURRENT-MAIN RULE

Before technical work, resolve current `main` once.

Create/recover one bounded development branch from current truth unless an existing active branch already owns the exact packet.

Do not:

- rebuild an old recovery branch;
- replay Phase A / Phase B by default;
- forward-port work already present on current main;
- restart broad visual QA because history exists;
- create a second execution lane for the same defect.

Historical SHAs remain rollback/reference evidence only.

---

# 5. QA / RELEASE-READINESS SCOPE

For any branch that affects the customer revenue path, prove only what the change can affect plus the critical surrounding path:

1. homepage remains unchanged unless Casey explicitly authorized a homepage change;
2. store renders and navigation remains stable;
3. affected product cards show correct identity / CTA;
4. affected product detail routes render correctly;
5. cart/checkout behavior remains correct where touched;
6. server-side price/orderability protections remain enforced;
7. PayPal/payment handoff remains intact when the packet touches checkout or product orderability;
8. no unrelated vendor/catalog area regresses.

Do not re-litigate previously approved design decisions on every packet.

---

# 6. EXECUTION OWNERSHIP

One packet = one execution owner.

- Web V2 Development executes code changes;
- Recon / QA inspects and verifies exact defects/results;
- MPM / Company Oversight owns priority, routing and state;
- specialist workers own only their named defect class;
- Release Engineer owns production deployment after Casey approval.

Management must not become the routine coder simply because it can access Git.

---

# 7. DEVELOPMENT RECEIPT

When the packet is complete, Development returns:

- branch name;
- exact SHA;
- defects fixed;
- files changed;
- tests / QA evidence;
- known holds or non-blocking issues;
- `READY TO DEPLOY: YES/NO`.

If `NO`, identify the exact blocker and keep unrelated work moving.

If `YES`, stop. Do not deploy until Casey explicitly approves.

---

# 8. RELEASE LOOP AFTER OWNER APPROVAL

Only after Casey says to deploy the ready candidate:

**VERIFY EXACT APPROVED SHA/CANDIDATE → DEPLOY/PROMOTE EXACT TESTED BUILD → LIVE SMOKE CUSTOMER PATH → RECORD DEPLOYMENT RECEIPT → CLOSE.**

Do not silently add features or rebuild between approval and promotion.

If production smoke exposes a real regression:

**EXACT FAILURE → HOLD/ROLL BACK AS APPROPRIATE → ROUTE SMALLEST SAFE FIX → RETEST → RETURN TO OWNER GATE.**

---

# 9. FAILURE RULE

If branch QA exposes a real regression:

**IDENTIFY EXACT FAILURE → FIX SMALLEST SAFE DELTA → RETEST → CONTINUE PACKET.**

Do not convert one failed test into a project-wide recovery loop.

Do not make one broken SKU, image, vendor, optional feature or admin surface block unrelated clean revenue work.

---

# 10. RUN MEANING

When Casey says **MPM RUN**:

MPM resolves current state, routes the highest-priority unblocked packet, verifies receipts and continues until a real owner/external gate.

When Casey explicitly says **DEPLOY** for a ready Web V2 candidate:

Release Engineer verifies the exact approved candidate, deploys/promotes that exact tested build, performs live smoke, and records the receipt.

`RUN` by itself is not standing authorization for a production deployment when the current worktree is at READY TO DEPLOY.

---

# CONTROL PHRASE

**DEVELOPMENT BUILDS. RECON VERIFIES. MANAGEMENT ROUTES. CASEY APPROVES PRODUCTION. FIX PROVEN REVENUE DEFECTS WITHOUT REOPENING THE WEBSITE PROJECT.**
