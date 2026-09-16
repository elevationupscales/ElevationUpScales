# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **CURRENT-MAIN RELEASE ACTIVE**  
**Controlling release directive:** `OWNER_DIRECTIVE_WEB_V2_DIRECT_RELEASE_CONTROL_2026-09-16.md`  
**Historical recovery workflow:** `WEB_V2_DEV_OS_RECOVERY_WORKFLOW_2026-09-14.md` — **REFERENCE / EXCEPTION ONLY**

---

# 1. CURRENT CONTROL

Web V2 no longer operates through mandatory historical recovery → owner QA → forward-port replay.

The owner-approved visual work and later commerce/runtime work have already advanced into current `main`.

Therefore the controlling path is:

**CURRENT MAIN → RELEASE-CRITICAL QA → FIX ONLY PROVEN BLOCKER → IMMUTABLE CANDIDATE → SMOKE → PROMOTE SAME VERSION → LIVE VERIFY → DONE.**

Historical states such as `e0db198...` and `a2c0de22...` remain useful rollback/reference evidence only. They are not the default execution path.

---

# 2. CURRENT-MAIN RULE

Before Web V2 release work, resolve `main` once.

If current `main` contains the approved work, do not:

- rebuild an old recovery branch;
- replay Phase A;
- replay Phase B;
- forward-port work that is already present;
- recreate old screenshot approval gates;
- route Casey through another owner review merely because a prior worktree required one.

If a dated deployment instruction names an older SHA as current, that instruction is automatically **STALE / REFERENCE ONLY** unless it states a permanent invariant.

---

# 3. RELEASE-CRITICAL TEST SCOPE

Required proof is bounded to the customer revenue path:

1. homepage renders;
2. store renders;
3. representative product detail renders;
4. Add to Cart works;
5. cart persistence/totals work;
6. checkout accepts required contact/delivery data;
7. PayPal handoff opens correctly without an unintended test charge;
8. server-side price/orderability controls remain enforced;
9. candidate reports exact Git SHA and Cloudflare Version ID;
10. production smoke passes after promotion.

Previously approved visual work is not re-litigated on every release.

A material new visual regression introduced by the current candidate is a blocker; old visual history by itself is not.

---

# 4. RELEASE LOOP

**RESOLVE CURRENT MAIN**  
↓  
**RUN REQUIRED RELEASE-CRITICAL TESTS**  
↓  
**IF FAIL: FIX ONLY THE EXACT PROVEN BLOCKER AND RETEST**  
↓  
**CREATE ONE IMMUTABLE CLOUDFLARE CANDIDATE**  
↓  
**VERIFY GIT SHA + CLOUDFLARE VERSION ID + `/__version`**  
↓  
**SMOKE HOME / STORE / PRODUCT / CART / CHECKOUT / PAYPAL**  
↓  
**PROMOTE THE SAME TESTED VERSION ID**  
↓  
**LIVE VERIFY**  
↓  
**RECORD PRODUCTION BASELINE**  
↓  
**DONE**

No extra management phase is inserted without a proven release-critical defect.

---

# 5. EXECUTION OWNERSHIP

One release = one execution owner.

Management routes and verifies; it does not create duplicate execution lanes.

For an active release:

- Web V2 Development / Release Engineer executes the release path;
- Company/OS management tracks state and removes blockers;
- specialist workers are used only for a specific proven defect;
- no second manager re-runs broad recon before release can continue.

---

# 6. OWNER GATES

A fresh Casey approval gate is required only for:

- a new material customer-facing design decision;
- new pricing/business policy;
- material payment-behavior change;
- a release-critical tradeoff requiring owner judgment;
- an explicit owner request to review.

No new owner gate is required for normal candidate creation, smoke testing, same-version promotion, or deployment of work Casey already approved.

---

# 7. PRESERVE DURING RELEASE

Do not broaden release scope into:

- redesign;
- catalog architecture changes unrelated to a blocker;
- optional media cleanup;
- new vendor integrations;
- new analytics/dashboard work;
- management documentation projects;
- unrelated Shopify/eBay work;
- unrelated Hawaii/freight work.

The release path must remain shorter than the feature-development path.

---

# 8. HISTORICAL VISUAL CONTROLS

The owner-approved visual direction remains protected.

Historical references may be consulted when diagnosing a current regression, including:

- `e0db19829ec3c36b4caaa503f5b9f7bcde38d868` — owner-reviewed QA history;
- `a2c0de22b7c18320603b196f0b3f6401fe4e7b40` — underlying historical visual implementation;
- QA run `34799915010` / `web-v2-final-visual-qa` — historical visual evidence.

These are not mandatory deployment starting points.

A rejected historical candidate remains rejected and must not be promoted merely to shorten release work.

---

# 9. FAILURE RULE

If current-main QA exposes a real regression:

**EXACT FAILURE → SMALLEST SAFE FIX → RETEST → CONTINUE RELEASE.**

Only reactivate historical recovery when comparison to a prior state is actually necessary to repair that exact regression.

Do not convert one failed test into a project-wide recovery loop.

---

# 10. RELEASE RECEIPT

A clean release receipt contains only:

- Git SHA;
- Cloudflare Version ID / deployment ID;
- release-critical QA result;
- production smoke result;
- narrowly held non-blocking defects, if any.

No long-form recovery narrative is required.

---

# 11. RUN MEANING

When Casey says **RUN** for Web V2 deployment:

**RESOLVE CURRENT MAIN → TEST RELEASE PATH → FIX ONLY PROVEN BLOCKER → BUILD IMMUTABLE CANDIDATE → SMOKE → PROMOTE SAME VERSION → LIVE VERIFY → REPORT RECEIPT.**

Do not route backward into Phase A / Phase B unless current-main testing proves a recovery need.

---

# CONTROL PHRASE

**CURRENT MAIN IS THE RELEASE SOURCE. TEST THE REVENUE PATH. FIX ONLY PROVEN BLOCKERS. PROMOTE THE SAME TESTED VERSION. HISTORICAL RECOVERY IS EXCEPTION-ONLY.**
