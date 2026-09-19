# ELEVATION UPSCALES — WEB V2 ACCEPTED-VISUAL CLOSEOUT DIRECTIVE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Authority:** OWNER-DIRECTED / CLOSEOUT CONTROL  
**Date:** 2026-09-13  
**Applies To:** Web V2 visible homepage + remaining image completion only  

## 1. Owner correction

The prior interpretation that Web V2 must return all the way to the current Legacy production homepage is **SUPERSEDED**.

Casey had already accepted two Web V2 visual checkpoints before the later rejected candidate. The unresolved problem at that point was **imaging completion**, not permission to redesign the accepted page.

Accepted checkpoints:

1. PR #183 — `Web V2: owner homepage fidelity repair`  
   Merge SHA: `cbb9e59707ee07dcb6c84d566156ff36d658924d`

2. PR #184 — `Web V2: fix homepage hero image rendering`  
   Merge SHA: `e9cbaacc49443637e2241be7948ea93a3848557f`

**Latest accepted visual baseline: `e9cbaacc49443637e2241be7948ea93a3848557f`.**

PR #184 explicitly preserved the accepted homepage copy, CTAs, routes, commerce behavior and production-matched sizing/positioning while attempting the hero-image repair.

Therefore:

**DO NOT REDESIGN. DO NOT RETURN TO AN EARLIER VISUAL SYSTEM. DO NOT CHANGE ACCEPTED COPY/LAYOUT. FINISH THE IMAGING ON TOP OF THE LAST OWNER-ACCEPTED VERSION.**

## 2. Rejected later candidate

The later exact candidate is **REJECTED FOR VISUAL DRIFT** and must not be promoted:

- Git SHA: `4bc2d0874db74133be3a76aee8d6db33504b6bfa`
- GitHub Actions run: `#8 / 34803391129`
- Cloudflare Version ID: `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`
- candidate QA: `PASS`
- `/__version`: matched candidate Version ID
- owner visual approval: `FAIL / HOLD`
- production deployment: **NONE**

The rejection is not a rejection of Web V2 generally. It is a rejection of the visual changes made after the accepted `e9cbaacc...` baseline.

## 3. Drift boundary

Git comparison shows `4bc2d087...` is 39 commits ahead of `e9cbaacc...` and introduced material visual-shell changes, including new wordmark/hero assets, semantic icons, a new final-visual style layer and substantial `shell.js` changes.

Those later visual changes must not be treated as owner-approved merely because their QA passed.

QA PASS proves implementation/test integrity; it does **not** override the owner visual gate.

## 4. Governing visual target

For closeout, the visible owner-approved reference is the Web V2 state at:

**`e9cbaacc49443637e2241be7948ea93a3848557f`**

Use `cbb9e597...` as the immediately prior accepted reference where needed.

Legacy production remains useful as an asset/source reference where the accepted Web V2 version intentionally matched production, but it is **not** permission to discard owner-approved Web V2 refinements.

## 5. Remaining scope = imaging completion

The remaining visual work is bounded to getting the intended imagery to render correctly inside the accepted layout.

DEV may repair:

- missing/broken hero imagery;
- incorrect image source paths;
- wrong asset mapping;
- low-resolution or blurred source usage;
- crop/aspect/object-fit defects;
- category-specific image gaps;
- SOK logo/product-image quality;
- Hawaii/Alaska/freight imagery;
- Shop by Category imagery;
- Featured SOK imagery;
- Shop the Store imagery;
- Build Your Power System imagery;
- Project & Field Support imagery;
- responsive image rendering on desktop/mobile.

DEV may use later exact-SKU clean media improvements **only when they fit the same accepted visual slot and do not change the accepted composition or product identity**.

## 6. Scope freeze

### Preserve exactly from the accepted baseline

- accepted homepage copy;
- accepted CTA wording;
- accepted section order;
- accepted navigation/header treatment;
- accepted card/category structure;
- accepted spacing/hierarchy/button treatment;
- accepted responsive composition;
- Web V2 routing and commerce behavior underneath;
- canonical catalog/product/cart/checkout/order work;
- exact-SKU / fail-closed commercial safety;
- release architecture.

### Do not

- invent new headline/CTA copy;
- introduce a new dark/cyan visual system or any other redesign;
- replace intended photography/product imagery with semantic icons merely because an image is difficult;
- reuse generic images across unrelated categories;
- change section order or card architecture;
- alter pricing, MAP, inventory, shipping, tax, orderability, PayPal, D1, fulfillment or Legacy production;
- create another exact candidate before image QA is complete.

## 7. RECON lane — control only

MASTER RECON owns lineage and anti-drift control only:

- confirm `e9cbaacc...` as latest owner-accepted visual baseline;
- identify visual changes after that baseline;
- separate safe nonvisual/current-main work from rejected visual drift;
- verify DEV did not redesign while repairing images;
- sync Worktree/Board/Registry pointers after terminal receipts.

RECON must not choose alternate copy, composition, icons or design direction.

## 8. DEV lane — one bounded image-completion branch

WEB DEVELOPER is the sole implementation owner.

Start from current `main` so accepted later commerce/control work is not lost, but restore the **visible homepage behavior/composition** to the last owner-accepted `e9cbaacc...` baseline and carry forward only compatible safe improvements.

Required path:

**CURRENT MAIN → USE `e9cbaacc...` AS VISUAL REFERENCE → REMOVE/SUPERSEDE POST-BASELINE VISUAL DRIFT → COMPLETE IMAGES IN EXISTING ACCEPTED SLOTS → DESKTOP + 390PX MOBILE QA → MERGE → RELEASE ENGINEER**

Do not wholesale revert the repository. Reconcile the visual files only.

## 9. Required image receipt

Before merge, DEV must return PASS/FAIL for:

- accepted hero copy/layout unchanged;
- hero image renders correctly;
- SOK branding sharp/original-quality;
- SK12V100PC image correct and uncropped;
- SK48V100N image correct and uncropped;
- each category has the intended unique visual or an explicit owner hold;
- Hawaii/Alaska/freight image renders;
- Shop by Category imagery renders;
- Featured SOK imagery renders;
- homepage product-grid imagery renders;
- Shop the Store imagery renders;
- Build Your Power System imagery renders;
- Project & Field Support imagery renders;
- no wrong-SKU images;
- no blurry thumbnail derivatives used as large display assets;
- no semantic icon substituted for an image slot without owner approval;
- desktop same-layout comparison to `e9cbaacc...` PASS;
- 390px mobile same-layout comparison PASS;
- Web V2 QA PASS;
- canonical PR QA PASS.

If an intended image cannot be sourced safely, **hold that exact image slot and report it**. Do not redesign the section to hide the gap.

## 10. Release Engineer lane

RELEASE ENGINEER remains **STANDBY** until the image-completion repair is merged.

Then:

**CORRECTED MERGED SHA → ONE NEW EXACT CLOUDFLARE VERSION → IMMUTABLE PREVIEW → `/__version` PROOF → CASEY VISUAL REVIEW → STOP.**

No production-parity smoke and no production promotion before Casey accepts the new candidate.

## 11. Closeout rule

Close Web V2 visual work when:

1. accepted `e9cbaacc...` composition is preserved;
2. intended images are complete or explicitly owner-held one-by-one;
3. desktop/mobile QA is green;
4. one new exact candidate is generated;
5. Casey visually accepts it.

Only then may the release lane advance to the separately controlled production-parity smoke / same-version cutover gate.

## Control phrase

**LAST OWNER-ACCEPTED WEB V2 = `e9cbaacc...` → FREEZE COPY/LAYOUT → FINISH IMAGES ONLY → NO REDESIGN → ONE NEW EXACT CANDIDATE → CASEY ACCEPTS → THEN RELEASE.**
