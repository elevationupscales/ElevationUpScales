# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **OWNER-REVIEWED RECOVERY STATE LOCKED — RECOVER → OWNER QA → FORWARD-PORT → CUTOVER → SECTION MEDIA PASSES**  
**Reports To:** OS 1.1 Project Manager / MPM 7  
**Controlling DEV OS workflow:** `WEB_V2_DEV_OS_RECOVERY_WORKFLOW_2026-09-14.md`  
**Owner visual control:** `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md`  
**Prior closeout directive:** `WEB_V2_PRODUCTION_FIDELITY_CLOSEOUT_DIRECTIVE_2026-09-13.md` — historical/reference only where consistent with this worktree

---

# 1. CONTROLLING RECOVERY STATE

OS RECON recovered and Git verification confirmed the exact owner-reviewed visual state.

## Owner-reviewed QA checkpoint

**`e0db19829ec3c36b4caaa503f5b9f7bcde38d868`**  
Commit: `QA: recapture after asset-render correction`

This is the branch/review state Casey saw and accepted as essentially good other than remaining hero/image/icon misuse.

## Visual implementation beneath that checkpoint

**`a2c0de22b7c18320603b196f0b3f6401fe4e7b40`**  
Commit: `Web V2: fix final visual asset rendering`

`e0db198...` is a direct child of `a2c0de22...` and only changes the one-time QA workflow.

Therefore:

**OWNER-REVIEWED RECOVERY STATE = `e0db198...`**  
**VISUAL CODE BASELINE = `a2c0de22...`**

Do not use one SHA to describe both roles.

---

# 2. OWNER QA PROOF

GitHub Actions:

**Run `34799915010` — `One-time Web V2 final visual QA` — SUCCESS**

Captured owner-review views:

- `/` — desktop `1536 × 960`, full page;
- `/` — mobile `390 × 844`, full page;
- `/store` — desktop `1536 × 960`, full page;
- `/store` — mobile `390 × 844`, full page.

Artifact:

**`web-v2-final-visual-qa`**

This run supersedes earlier attempts to identify `e9cbaacc...` as the final recovery target.

---

# 3. SUPERSEDED / HISTORICAL VISUAL REFERENCES

The following are valid historical checkpoints but are **not** the controlling recovery target:

- `e9cbaacc49443637e2241be7948ea93a3848557f` — earlier owner-accepted homepage/hero checkpoint;
- `d81844556a62b27e3040e94a8ca7eae6ccb7fcd9` — earlier SOK homepage image repair;
- `6dff0a7e65f3967d60040977c3c2693e430e56b4` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` — older immutable candidate;
- PR #194 — later image-closeout work; useful only for narrow evidence/assets, not visual authority.

Do not route DEV back to these as the final baseline.

---

# 4. VERIFIED DRIFT BOUNDARY

By:

**`f532741933d842213716b8d1bee1a3fecd8e6442`**  
Commit: `QA: capture semantic icon and image repair`

Git shows that state was already **6 commits ahead of `e0db198...`**.

That later sequence expanded into broader visual-system work, including shell/catalog/style/icon machinery.

**DO NOT CONTINUE FORWARD FROM THAT DRIFTED STATE AS THE PRIMARY RECOVERY METHOD.**

Later commits may be mined only for one proven isolated asset fix when the change can be separated cleanly from surrounding drift.

---

# 5. OWNER SCOPE

The accepted visual system is locked.

Remaining authorized visual work is limited to:

1. **homepage hero imagery/use;**
2. **store hero imagery/use;**
3. **genuinely missing/broken icons.**

Everything else remains closed unless Casey reopens it.

### Explicitly prohibited

- catalog redesign;
- broad `shell.js` restructure;
- store architecture redesign;
- new card system;
- copy rewrite;
- CTA rewrite;
- section-order changes;
- sitewide typography/spacing retuning;
- new semantic-icon system;
- broad visual cleanup disguised as an image repair;
- cart/checkout/order/payment redesign;
- supplier/pricing/shipping/tax/warranty/MAP/orderability changes;
- wholesale replay of the six post-`e0db198...` commits.

**No catalog redesign. No shell restructure. No new store architecture. No new card system. No copy rewrite.**

---

# 6. RECOVERY MODEL

Because the owner-reviewed checkpoint is historical while the current release workflow requires candidate/smoke/promotion to use exact current `main`, the job is intentionally split into two phases.

## Phase A — recover the approved visual state

Start a bounded recovery/reference branch from:

**`e0db19829ec3c36b4caaa503f5b9f7bcde38d868`**

Use `a2c0de22...` as the visual-code baseline beneath it.

On that branch:

- reproduce the four accepted QA views;
- identify only homepage hero, store hero and genuinely broken icons;
- apply the smallest possible corrections;
- preserve everything else byte-for-byte where practical;
- recapture the same four views;
- return a receipt to Casey;
- **STOP FOR OWNER APPROVAL.**

Do not merge the historical branch directly backward over current `main`.

## Phase B — forward-port the approved visual delta

Only after Casey approves Phase A:

- re-resolve current `main`;
- create one bounded forward-port branch from current `main`;
- port only the owner-approved visual delta;
- preserve current safe catalog/cart/checkout/order/release architecture;
- run canonical source and visual QA;
- merge only if visual parity + commerce safety pass.

This protects both the approved appearance and later safe functional work.

---

# 7. PHASE A RUN LOOP

**GIT FIRST → VERIFY `e0db198...` → VERIFY PARENT `a2c0de22...` → VERIFY QA RUN `34799915010` SUCCESS → CREATE/RECOVER HISTORICAL RECOVERY BRANCH → RUN BASELINE TESTS → CAPTURE FOUR BASELINE VIEWS → FIX ONLY HOMEPAGE HERO / STORE HERO / BROKEN ICONS → TEST → CAPTURE FOUR AFTER VIEWS → RETURN RECEIPT → STOP FOR CASEY.**

Required owner-review screenshots:

- home desktop `1536 × 960`;
- home mobile `390 × 844`;
- store desktop `1536 × 960`;
- store mobile `390 × 844`.

Required receipt:

- branch;
- baseline SHA;
- result SHA;
- changed files;
- exact reason for every changed file;
- source tests;
- `git diff --check`;
- four before/after screenshots;
- explicit confirmation that catalog/shell/card/copy architecture was not broadened.

---

# 8. PHASE B RUN LOOP

After Casey accepts Phase A:

**RE-RESOLVE CURRENT MAIN → NEW BOUNDED FORWARD-PORT BRANCH → APPLY ONLY APPROVED VISUAL DELTA → VERIFY CATALOG / PRODUCT / CART / CHECKOUT / ORDER / RELEASE FOUNDATIONS → RUN FOUR-VIEWPORT QA → CANONICAL PR QA → MERGE → STOP FOR RELEASE.**

No historical branch is merged wholesale into current main.

---

# 9. RELEASE LOOP

After Phase B merges:

**EXACT CURRENT MAIN → CANONICAL WEB V2 QA → ONE IMMUTABLE CLOUDFLARE CANDIDATE → SHA/VERSION ID PROOF → `/__version` → VISUAL PARITY CHECK → PRODUCTION-PARITY SMOKE → PROMOTE SAME VERSION ID → LIVE VERIFY → FREEZE AS PRODUCTION BASELINE.**

Do not weaken the current-main release invariant.

Do not directly promote a historical SHA or historical Cloudflare version as a shortcut.

### Existing rejected candidate guard

`4bc2d0874db74133be3a76aee8d6db33504b6bfa` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0` remains:

**VISUALLY REJECTED / DO NOT PROMOTE / DO NOT REPLAY.**

---

# 10. POST-CUTOVER MEDIA STRATEGY

After the approved recovery is live, image/icon work is **section scoped**.

One named section or tightly coupled media group per bounded branch/PR.

Recommended sequence:

1. homepage hero;
2. store hero;
3. SOK product imagery;
4. category tiles;
5. Featured / homepage product cards;
6. Shop the Store;
7. Build Your Power System;
8. Hawaii / Alaska / freight;
9. Project & Field Support;
10. remaining genuinely broken icons/decorative media.

Each media patch must preserve:

- copy;
- CTA wording;
- section order;
- navigation;
- component dimensions;
- accepted visual composition;
- current commerce behavior.

Cloudflare Worker deployment remains an immutable whole-version artifact. **Section-scoped means the code/visual delta is bounded, not partial Worker deployment.**

---

# 11. WORKER ROUTING

| Worker | State | Task |
|---|---|---|
| **WEB V2 DEVELOPMENT / DEV OS** | **ACTIVE — PHASE A RECOVERY** | Start from `e0db198...`; verify `a2c0de22...`; reproduce owner QA; fix only homepage hero, store hero, genuinely broken icons; return receipt; stop. |
| **MASTER RECON OS** | **TRIGGERED CONTROL SUPPORT** | Enforce recovered lineage and anti-drift. Validate that later six-commit visual expansion is not replayed wholesale. |
| **MPM 7** | **CONTROL / ROUTING** | Hold scope, reconcile receipt, route Casey owner review, authorize Phase B only after owner approval. |
| **RELEASE ENGINEER** | **STANDBY** | No candidate/promotion until Phase A owner approval + Phase B forward-port merge. |
| **COMMERCE DEVELOPMENT** | **PRESERVE / NO REOPEN** | Current safe catalog/cart/checkout/order/payment architecture is preserved during recovery. |

---

# 12. NEXT RUN MEANING

When Casey says **RUN** in the DEV OS/Web V2 lane:

**VERIFY `e0db198...` / `a2c0de22...` / RUN `34799915010` → CREATE OR RECOVER PHASE-A BRANCH FROM `e0db198...` → RECAPTURE OWNER QA → FIX HOMEPAGE HERO + STORE HERO + ONLY GENUINELY BROKEN ICONS → RECAPTURE → RETURN RECEIPT → STOP FOR OWNER REVIEW.**

After Casey approves:

**CURRENT MAIN → FORWARD-PORT ONLY APPROVED VISUAL DELTA → PRESERVE FUNCTIONAL FOUNDATION → QA → MERGE → EXACT CURRENT-MAIN CANDIDATE → SMOKE → SAME-VERSION PROMOTION → SECTION MEDIA PASSES.**

---

# 13. CONTROL PHRASE

**`e0db198...` IS THE OWNER-REVIEWED RECOVERY STATE. `a2c0de22...` IS THE VISUAL CODE UNDER IT. RECOVER THAT BUILD, FIX ONLY THE HERO / STORE HERO / ACTUALLY BROKEN ICONS, STOP FOR OWNER APPROVAL, THEN FORWARD-PORT ONLY THE APPROVED VISUAL DELTA TO CURRENT MAIN. DO NOT CONTINUE THE SIX-COMMIT VISUAL DRIFT.**
