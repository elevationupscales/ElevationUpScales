# ELEVATION UPSCALES — WEB V2 DEV OS RECOVERY WORKFLOW

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Lane:** Web V2 Development  
**Role:** DEV OS / Web V2 Development Worker  
**Status:** **OWNER-APPROVED RECOVERY BASELINE IDENTIFIED — BOUNDED RECOVERY AUTHORIZED**  
**Authority:** Casey Young + OS RECON verified Git lineage  
**Effective:** 2026-09-14

---

# 1. PURPOSE

Recover the exact Web V2 presentation Casey reviewed and approved **before** later icon/image work expanded scope and altered the broader visual system.

This is not another redesign.

This is not permission to continue forward from the drifted visual branch.

This workflow exists to put a stake in the ground at the owner-reviewed state, repair only the narrow remaining visual defects, then move that approved presentation through the controlled release path.

---

# 2. VERIFIED RECOVERY LINEAGE

## Owner-reviewed QA checkpoint

**`e0db19829ec3c36b4caaa503f5b9f7bcde38d868`**  
Commit: `QA: recapture after asset-render correction`

This commit itself is QA-only. It changed the one-time visual QA workflow so the corrected build would be recaptured.

## Actual visual implementation underneath the reviewed checkpoint

**`a2c0de22b7c18320603b196f0b3f6401fe4e7b40`**  
Commit: `Web V2: fix final visual asset rendering`

`e0db198...` is a direct child of `a2c0de22...`.

Therefore:

- **OWNER-APPROVED REVIEW STATE = `e0db198...`**
- **OWNER-APPROVED VISUAL CODE BASELINE = `a2c0de22...`**

Do not collapse those two roles into one SHA.

## Browser QA proof

GitHub Actions run:

**`34799915010` — One-time Web V2 final visual QA — SUCCESS**

The run captured:

- homepage desktop: `1536 × 960`;
- homepage mobile: `390 × 844`;
- store desktop: `1536 × 960`;
- store mobile: `390 × 844`.

Artifact name:

**`web-v2-final-visual-qa`**

This is the QA set associated with the owner-reviewed checkpoint.

## Earlier accepted checkpoints

The following remain useful historical references but are **not** the final recovery authority:

- `e9cbaacc49443637e2241be7948ea93a3848557f` — earlier owner-accepted homepage/hero checkpoint;
- `d81844556a62b27e3040e94a8ca7eae6ccb7fcd9` — earlier SOK homepage image-repair state that still preceded the final asset-render correction;
- `6dff0a7e65f3967d60040977c3c2693e430e56b4` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` — older immutable candidate.

None supersede `e0db198...` / `a2c0de22...` as the recovery target.

---

# 3. VERIFIED DRIFT POINT

By:

**`f532741933d842213716b8d1bee1a3fecd8e6442`**  
Commit: `QA: capture semantic icon and image repair`

Git shows the branch was already **6 commits ahead of `e0db198...`**.

That sequence introduced or expanded work touching the broader visual system, including areas such as:

- `shell.js`;
- `catalog-pages.js`;
- `final-visual-styles.js`;
- semantic icon handling / `semantic-icons.js`;
- additional tests and visual-repair machinery.

That is the anti-drift boundary.

**Do not continue repairing the later drifted branch as the primary recovery method.**

The later commits may be inspected only as a source for a single proven asset fix if the exact change can be isolated without importing surrounding visual-system drift.

---

# 4. OWNER ACCEPTANCE STATEMENT

The owner-reviewed state is the build Casey described as effectively:

**“Other than improper hero use, it looks good.”**

Interpretation for DEV:

The baseline visual system is accepted.

The remaining authorized defects are narrow:

1. incorrect homepage hero imagery/use;
2. incorrect store hero imagery/use;
3. genuinely missing or broken icons.

Everything else is presumptively **LOCKED** unless Casey separately reopens it.

---

# 5. HARD SCOPE — ALLOWED

DEV may change only what is required to:

### A. Homepage hero

- replace an incorrect hero image;
- correct hero asset mapping;
- correct crop / object-fit / positioning needed to render the intended hero correctly;
- correct a broken image URL or local-asset reference;
- preserve the accepted hero dimensions, copy, CTA placement, typography and composition.

### B. Store hero

- replace an incorrect store hero image;
- correct store-hero asset mapping;
- correct crop / object-fit / positioning needed to render the intended hero correctly;
- preserve accepted copy, CTA placement, proportions and composition.

### C. Broken icons only

- restore an icon that is actually absent, broken, clipped or mapped to the wrong asset;
- use the smallest possible icon asset/CSS/render correction;
- preserve the existing accepted icon size, placement and surrounding card/layout.

### D. Required QA support

- narrowly scoped tests that prove the three areas above;
- screenshot/review tooling needed to reproduce the owner-reviewed QA set;
- no QA change may become a pretext for customer-facing redesign.

---

# 6. HARD SCOPE — PROHIBITED

Unless Casey explicitly reopens scope, DEV must not:

- redesign the catalog;
- restructure `shell.js` broadly;
- redesign store architecture;
- create a new card system;
- change navigation architecture;
- rewrite page copy;
- change CTA wording;
- alter section order;
- retune typography sitewide;
- retune spacing sitewide;
- create another semantic-icon system;
- replace valid photography with generic symbolic icons;
- replace exact vendor/product identity with generic imagery;
- reopen cart, checkout, payment, order or fulfillment architecture;
- change supplier truth, pricing, MAP, shipping, warranty, tax, stock or orderability;
- import the six-commit post-`e0db198...` drift sequence wholesale;
- use PR #194 or another later image-closeout branch as visual authority;
- modify release controls merely to make a historical SHA directly promotable;
- touch Legacy production as part of visual recovery.

**No catalog redesign. No shell restructure. No new store architecture. No new card system. No copy rewrite.**

---

# 7. RECOVERY BRANCH MODEL

The recovery process has two distinct branches/phases because the approved review state is historical while the release system requires exact current `main` for candidate/smoke/promotion.

## Phase A — historical recovery branch

Create or recover one bounded branch starting from:

**`e0db19829ec3c36b4caaa503f5b9f7bcde38d868`**

Purpose:

- reconstruct exactly what Casey reviewed;
- keep `a2c0de22...` as the actual visual implementation beneath it;
- apply only homepage hero, store hero and genuinely broken-icon fixes;
- preserve everything else byte-for-byte where possible;
- produce a clean owner-review candidate.

This branch is a **recovery/reference branch**, not the production source branch.

Do not merge the entire historical branch backward over current `main`.

## Phase B — forward-port branch on current main

After Casey approves the recovered visual result:

1. re-resolve exact current `main`;
2. create one new bounded forward-port branch from current `main`;
3. port only the owner-approved visual delta required to make current Web V2 visually match the approved recovery result;
4. preserve later safe catalog/cart/checkout/order/release architecture that does not conflict with the approved presentation;
5. run source tests and exact browser QA again;
6. merge only after visual parity and commerce-safety gates pass.

This is how we preserve both:

- the **owner-approved visual state**;
- the **current safe commerce/catalog/release foundation**.

---

# 8. PHASE A EXECUTION WORKFLOW — RECOVER WHAT CASEY APPROVED

DEV OS must execute in this order:

**GIT FIRST → RESOLVE `e0db198...` → VERIFY PARENT `a2c0de22...` → CREATE/RECOVER BOUNDED HISTORICAL RECOVERY BRANCH → RUN BASELINE TESTS → RECAPTURE BASELINE → FIX ONLY HERO/STORE-HERO/BROKEN-ICON DEFECTS → TEST → RECAPTURE → RETURN OWNER REVIEW RECEIPT → STOP.**

### Step A1 — resolve baseline

Verify:

- `e0db198...` exists;
- commit message is `QA: recapture after asset-render correction`;
- parent is `a2c0de22...`;
- `a2c0de22...` commit message is `Web V2: fix final visual asset rendering`;
- QA run `34799915010` completed successfully.

If any of those fail:

**STOP — BASELINE IDENTITY MISMATCH.**

### Step A2 — reproduce owner-reviewed screenshots before mutation

Use the same core capture dimensions as the accepted QA run:

- `/` at `1536 × 960` full page;
- `/` at `390 × 844` full page;
- `/store` at `1536 × 960` full page;
- `/store` at `390 × 844` full page.

Keep these as **BEFORE / RECOVERY BASELINE** screenshots.

### Step A3 — identify only allowed defects

Create a three-part defect sheet:

| Surface | Allowed issue | Evidence | Proposed smallest change |
|---|---|---|---|
| Homepage | hero use only | screenshot + source path | exact asset/mapping/crop fix |
| Store | hero use only | screenshot + source path | exact asset/mapping/crop fix |
| Icons | only genuinely broken/missing | screenshot + DOM/source | exact isolated icon repair |

No other defect enters the worktree without owner authorization.

### Step A4 — apply smallest patch

Preferred mutation order:

1. asset mapping/reference;
2. crop/object-fit/object-position;
3. local CSS for that exact component;
4. local render markup only if the asset cannot be fixed otherwise.

Avoid structural changes.

### Step A5 — QA

Required:

- `npm test` or current equivalent for `apps/web-v2`;
- `git diff --check`;
- no unrelated changed files;
- four browser screenshots at the owner-reviewed viewports;
- compare against run `34799915010` / `web-v2-final-visual-qa`;
- report every changed file and why it was unavoidable.

### Step A6 — owner gate

Return:

- recovery branch name;
- baseline SHA;
- resulting recovery SHA;
- changed files;
- before/after screenshots;
- test results;
- explicit statement that catalog/shell/card/copy architecture was not broadened.

Then:

**STOP FOR CASEY VISUAL APPROVAL.**

Do not merge into current main yet.

---

# 9. PHASE B EXECUTION WORKFLOW — FORWARD-PORT TO CURRENT MAIN

Only after Casey approves Phase A:

**RE-RESOLVE CURRENT MAIN → NEW BOUNDED FORWARD-PORT BRANCH → APPLY ONLY APPROVED VISUAL DELTA → PRESERVE CURRENT SAFE COMMERCE/CATALOG → TEST → FOUR-VIEWPORT QA → CANONICAL PR QA → MERGE → STOP FOR RELEASE.**

### Preservation gate

Before merge, prove the forward-port did not regress:

- canonical catalog routes;
- product detail routes;
- cart;
- checkout review;
- order/fulfillment handoff;
- release architecture;
- exact-SKU / fail-closed commerce controls;
- verified vendor-catalog truth.

Visual recovery must not become a commerce rollback.

---

# 10. RELEASE WORKFLOW

After Phase B merges:

1. resolve exact new current-main SHA;
2. run canonical Web V2 QA;
3. create **one immutable Cloudflare candidate from exact current main**;
4. verify Git SHA ↔ Cloudflare Version ID identity;
5. verify `/__version`;
6. visually compare homepage/store against the approved recovery result;
7. run production-parity smoke;
8. if clean, promote the **same tested Cloudflare Version ID**;
9. live-verify key routes and runtime identity;
10. freeze that production version as the new Web V2 visual baseline.

Do not bypass the release invariant requiring exact current `main`.

Do not directly promote `e0db198...`, `a2c0de22...`, `d818445...`, `e9cbaacc...`, or an older Cloudflare version as a shortcut.

---

# 11. POST-CUTOVER IMAGE / ICON WORK

After the approved baseline is live, image/icon work becomes **section-scoped only**.

One branch / PR should normally cover one named section or one tightly coupled media group.

Recommended order:

1. homepage hero;
2. store hero;
3. SOK product imagery;
4. category tiles;
5. Featured / homepage product cards;
6. Shop the Store section;
7. Build Your Power System;
8. Hawaii / Alaska / freight section;
9. Project & Field Support;
10. remaining genuinely broken icons/decorative media.

For every section patch:

- preserve approved copy;
- preserve CTAs;
- preserve dimensions and layout;
- preserve nav and shell;
- change only the named section's assets/mappings/minimum render rules;
- run desktop + 390px QA;
- run canonical QA;
- return a section receipt;
- merge only that bounded change.

Cloudflare still publishes a whole immutable Worker version. **Section-scoped means the code/visual delta is bounded, not that Worker bytecode is partially deployed.**

---

# 12. ANTI-DRIFT GUARDS

The following are explicit **DO NOT REPLAY / DO NOT USE AS PRIMARY RECOVERY STATE** controls:

- the six-commit drift sequence after `e0db198...` through `f532741...`;
- broad semantic-icon/image repair as a sitewide task;
- later visual candidates that passed technical QA but were not owner-approved;
- PR #194 as a visual authority;
- `4bc2d087...` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0` as a promotion target;
- `d818445...` as final owner-approved recovery point;
- `e9cbaacc...` as final owner-approved recovery point.

Those may be inspected for narrow evidence only.

---

# 13. DEV OS RUN COMMAND

When Casey says **RUN** in the Web V2 DEV OS lane, interpret it as:

**VERIFY `e0db198...` + `a2c0de22...` → RECOVER EXACT OWNER-REVIEWED PRESENTATION → FIX HOMEPAGE HERO + STORE HERO + ONLY ACTUALLY BROKEN ICONS → RECAPTURE 1536×960 + 390×844 FOR `/` AND `/store` → RETURN RECEIPT → STOP FOR OWNER APPROVAL.**

After Casey approves that result:

**RE-RESOLVE CURRENT MAIN → FORWARD-PORT ONLY THE APPROVED VISUAL DELTA → PRESERVE CURRENT COMMERCE/CATALOG/RELEASE FOUNDATION → QA → MERGE → EXACT CURRENT-MAIN CANDIDATE → SMOKE → SAME-VERSION PROMOTION → SECTION-SCOPED MEDIA PASSES.**

---

# 14. CONTROL PHRASE

**`e0db198...` IS THE OWNER-REVIEWED RECOVERY STATE. `a2c0de22...` IS THE VISUAL CODE UNDER IT. RECOVER THERE. FIX ONLY HERO / STORE-HERO / GENUINELY BROKEN ICONS. DO NOT CONTINUE THE SIX-COMMIT VISUAL DRIFT. OWNER-APPROVE THE RECOVERY, THEN FORWARD-PORT ONLY THAT VISUAL DELTA TO CURRENT MAIN AND RELEASE IT THROUGH THE NORMAL EXACT-SHA PIPELINE.**
