# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **OWNER-ACCEPTED VISUAL BASELINE LOCKED — IMAGE COMPLETION ACTIVE — WEB DEVELOPER CURRENT**  
**Reports To:** OS 1.1 Project Manager / MPM 6  
**Owner visual control:** `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md`  
**Closeout directive:** `WEB_V2_PRODUCTION_FIDELITY_CLOSEOUT_DIRECTIVE_2026-09-13.md`  
**Latest owner-accepted visual baseline:** `e9cbaacc49443637e2241be7948ea93a3848557f`  
**Prior accepted checkpoint:** `cbb9e59707ee07dcb6c84d566156ff36d658924d`  
**Rejected later candidate:** `4bc2d0874db74133be3a76aee8d6db33504b6bfa` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference

## 1. Mission

Close the Web V2 visual lane without another redesign.

Casey accepted two Web V2 visual checkpoints before the later rejected candidate. The unresolved work was **imaging**, not copy/layout/composition approval.

Therefore the controlling path is:

**LAST OWNER-ACCEPTED WEB V2 (`e9cbaacc...`) → FREEZE COPY/LAYOUT/CTAS/SECTION STRUCTURE → FINISH IMAGES → QA → ONE NEW EXACT CANDIDATE → CASEY REVIEW.**

## 2. Accepted visual lineage

### Accepted checkpoint 1

PR #183 — `Web V2: owner homepage fidelity repair`  
Merge SHA: `cbb9e59707ee07dcb6c84d566156ff36d658924d`

Scope established the accepted homepage copy/layout/proportions/SOK treatment while preserving commerce safety.

### Accepted checkpoint 2 — controlling baseline

PR #184 — `Web V2: fix homepage hero image rendering`  
Merge SHA: `e9cbaacc49443637e2241be7948ea93a3848557f`

This repair explicitly preserved accepted homepage copy, CTAs, routes, commerce behavior and sizing/positioning while addressing hero imagery.

**This is the latest owner-accepted visual baseline.**

## 3. Rejected later candidate

The later candidate is technically valid but visually rejected:

- Git SHA: `4bc2d0874db74133be3a76aee8d6db33504b6bfa`;
- GitHub Actions candidate run: `#8 / 34803391129`;
- Cloudflare Version ID: `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`;
- candidate QA: PASS;
- `/__version`: PASS;
- owner visual acceptance: **FAIL / HOLD**;
- production promotion: NONE.

Git shows this candidate is 39 commits beyond `e9cbaacc...` and includes material visual-shell changes. Those later visual changes are **not owner-approved** merely because QA passed.

Do not promote, retry, production-smoke, or treat that candidate as accepted.

## 4. Scope freeze

### Preserve from `e9cbaacc...`

- accepted homepage copy;
- accepted CTA wording;
- accepted section order;
- accepted header/navigation treatment;
- accepted card/category structure;
- accepted spacing/hierarchy/button treatment;
- accepted responsive composition;
- accepted Web V2 routes and commerce behavior.

### Remaining authorized visual work

Images only, including:

- missing/broken hero imagery;
- SOK logo/product-image quality;
- exact SK12V100PC and SK48V100N imagery;
- category-specific images;
- Hawaii/Alaska/freight imagery;
- Featured SOK imagery;
- homepage product-grid imagery;
- Shop the Store imagery;
- Build Your Power System imagery;
- Project & Field Support imagery;
- wrong source paths/mappings;
- blur/thumbnail-resolution defects;
- crop/aspect/object-fit/responsive image defects.

Later clean exact-SKU media improvements may be retained only when they occupy the same accepted visual slot without changing composition or identity.

### Not authorized

- new headline or CTA copy;
- new visual system;
- semantic-icon substitution for intended image slots without owner approval;
- generic image reuse across unrelated sections;
- section/card/navigation redesign;
- commerce/payment/shipping/tax/orderability changes as part of this visual closeout;
- wholesale repository revert.

## 5. Accepted commerce foundation — do not reopen

Preserve:

- canonical catalog + product detail — `72694ae9ba5b9952c0460b9f90b380cffde4ff23`;
- cart — `13b4411fc265a1f7b149ad9207059221fa53db32`;
- checkout review — `f5d3ac7cc4b37e8211a3bb460a8507380b75803d`;
- order + fulfillment handoff — `cd8e21ef4a89c261a4580b683da54be8a896787a`;
- preview/release architecture;
- exact-SKU / fail-closed commercial safety.

Transaction activation holds remain separate and do not block image completion.

## 6. Worker routing

| Worker | State | Task |
|---|---|---|
| **WEB DEVELOPER** | **ACTIVE / CURRENT — IMAGE COMPLETION ONLY** | Start from current `main`; use `e9cbaacc...` as visual reference; remove post-baseline visual drift only where needed; preserve later safe nonvisual work; complete the intended images in the accepted slots; desktop + 390px QA; merge; hand back. |
| **MASTER RECON OS** | **TRIGGERED / CONTROL ONLY** | Enforce accepted-baseline lineage and anti-drift; identify stale pointers; verify DEV receipt; do not choose design/copy/assets. |
| **RELEASE ENGINEER** | **STANDBY** | Wait for DEV image-completion merge. Then make one new exact candidate + immutable preview + `/__version`; return to Casey; stop. |
| COMMERCE DEVELOPER | **STANDBY / ACTIVATION WORK PRESERVED** | Do not reopen checkout/order/payment architecture during visual closeout. |

## 7. Required DEV receipt

Before merge, return PASS/FAIL for:

- accepted copy/layout/CTAs unchanged from `e9cbaacc...`;
- hero image renders correctly;
- SOK branding sharp/original-quality;
- SK12V100PC correct and uncropped;
- SK48V100N correct and uncropped;
- category imagery complete or exact slot explicitly held;
- freight imagery complete;
- Featured SOK imagery complete;
- product-grid imagery complete;
- Shop the Store imagery complete;
- Build Your Power System imagery complete;
- Project & Field Support imagery complete;
- no wrong-SKU media;
- no blurry thumbnail derivatives used as large assets;
- desktop same-layout comparison PASS;
- 390px mobile same-layout comparison PASS;
- Web V2 QA PASS;
- canonical PR QA PASS.

If an image cannot be safely sourced, hold only that image slot and report it. **Do not redesign around the missing image.**

## 8. Next RUN meaning

**WEB DEVELOPER → CURRENT MAIN → VISUAL REFERENCE `e9cbaacc...` → FREEZE ACCEPTED LAYOUT/COPY → COMPLETE IMAGING ONLY → QA → MERGE → RELEASE ENGINEER → ONE NEW EXACT CANDIDATE → CASEY REVIEW → STOP.**

No production promotion before owner acceptance.

## 9. Release invariant

**ONE OWNER-ACCEPTED VISUAL SHA → ONE EXACT CLOUDFLARE VERSION → OWNER VISUAL ACCEPTANCE → PRODUCTION-PARITY SMOKE → SAME VERSION CUTOVER → LIVE VERIFY.**

## Control phrase

**`e9cbaacc...` IS THE LAST ACCEPTED VISUAL BASELINE → IMAGES ARE THE REMAINING DEFECT → NO MORE REDESIGN → DEV FINISHES IMAGES → RELEASE ENGINEER MAKES ONE CANDIDATE → CASEY ACCEPTS → CLOSE.**
