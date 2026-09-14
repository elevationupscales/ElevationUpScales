# ELEVATION UPSCALES — WEB V2 CURRENT WORKTREE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Status:** **OWNER-ACCEPTED VISUAL BASELINE LOCKED — BASELINE RESTORATION / CUTOVER FIRST — SECTION MEDIA PATCHES AFTER**  
**Reports To:** OS 1.1 Project Manager / MPM 7  
**Owner visual control:** `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md`  
**Closeout directive:** `WEB_V2_PRODUCTION_FIDELITY_CLOSEOUT_DIRECTIVE_2026-09-13.md`  
**Latest owner-accepted visual baseline:** `e9cbaacc49443637e2241be7948ea93a3848557f`  
**Prior accepted checkpoint:** `cbb9e59707ee07dcb6c84d566156ff36d658924d`  
**Rejected later candidate:** `4bc2d0874db74133be3a76aee8d6db33504b6bfa` / Cloudflare `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`  
**Historical earlier approved candidate:** `6dff0a7e65f3967d60040977c3c2693e430e56b4` / Cloudflare `e60f4bd0-285b-4b08-9b55-1db013be383e` — predates controlling `e9cbaacc...`; do not promote as substitute  
**Legacy production:** `production-deploy = 894b15cb12bf75a6a8e81b916e2a9bc2de858f88` — LEGACY ONLY / rollback reference

## 1. Mission

Put the already owner-approved Web V2 presentation on the release path **before** reopening broad image cleanup.

Casey accepted the Web V2 visual presentation at `e9cbaacc...`. The later problem was image/icon/media completion and post-baseline visual drift, not rejection of the accepted copy, layout, hierarchy, CTAs, section structure or vendor-catalog architecture.

The prior closeout sequence attempted to finish many images before release. Owner direction now changes sequencing:

**CURRENT MAIN → RESTORE `e9cbaacc...` VISUAL CONTRACT ONLY → PRESERVE LATER SAFE NONVISUAL / COMMERCE WORK → QA → MERGE → ONE EXACT CURRENT-MAIN CANDIDATE → VERIFY RESTORATION → PRODUCTION-PARITY SMOKE → PROMOTE SAME VERSION → THEN REPAIR IMAGES/ICONS ONE SECTION AT A TIME.**

This is **not** a wholesale repository rollback and **not** another redesign.

## 2. Accepted visual lineage

### Accepted checkpoint 1

PR #183 — `Web V2: owner homepage fidelity repair`  
Merge SHA: `cbb9e59707ee07dcb6c84d566156ff36d658924d`

Scope established the accepted homepage copy/layout/proportions/SOK treatment while preserving commerce safety.

### Accepted checkpoint 2 — controlling baseline

PR #184 — `Web V2: fix homepage hero image rendering`  
Merge SHA: `e9cbaacc49443637e2241be7948ea93a3848557f`

This repair explicitly preserved accepted homepage copy, CTAs, routes, commerce behavior and sizing/positioning while addressing the hero image.

**This is the latest owner-accepted visual baseline and the visual contract to restore.**

## 3. Later candidates / closeout work

### Rejected later candidate — do not promote

- Git SHA: `4bc2d0874db74133be3a76aee8d6db33504b6bfa`;
- GitHub Actions candidate run: `#8 / 34803391129`;
- Cloudflare Version ID: `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`;
- candidate QA: PASS;
- `/__version`: PASS;
- owner visual acceptance: **FAIL / HOLD**;
- production promotion: NONE.

Git shows this candidate is materially beyond `e9cbaacc...` and includes visual-shell changes that were not owner-approved merely because technical QA passed.

**Do not promote, retry, production-smoke, or treat `4bc2d087...` as accepted.**

### PR #194 image closeout — useful source, not the owner visual baseline

PR #194 attempted to restore the `e9cbaacc...` owner-accepted presentation while localizing and repairing approved media. It may contain safe image assets or mappings worth retaining, but it does **not** supersede `e9cbaacc...` as the visual authority.

Retain later media only when it can be placed into the exact accepted slot without changing composition, identity, section structure, typography, navigation, spacing or CTA behavior.

### Earlier immutable candidate — historical only

The release workflow successfully created Cloudflare Version `e60f4bd0-285b-4b08-9b55-1db013be383e` from `6dff0a7e...`. That checkpoint was owner-approved at the time, but the accepted visual baseline later advanced to `e9cbaacc...`.

Therefore **do not promote `e60f4bd0...` as a shortcut**. It proves the release system worked; it is not the controlling visual target.

## 4. Baseline restoration scope

### Restore / preserve from `e9cbaacc...`

- homepage copy;
- CTA wording;
- section order;
- header/navigation treatment;
- card/category structure;
- typography and hierarchy;
- spacing and sizing;
- button treatment;
- responsive composition;
- accepted hero treatment;
- accepted Web V2 routes and customer-facing behavior.

### Preserve forward from current main

Do **not** reset current main to the old commit. Preserve later safe nonvisual work, including:

- canonical catalog + product detail;
- cart;
- checkout review;
- order + fulfillment handoff;
- release architecture;
- exact-SKU / fail-closed commercial safety;
- verified vendor/catalog truth that does not alter the accepted visual contract;
- operational documentation and unrelated company work.

The implementation is a **visual restoration patch on current main**, not `git reset`, wholesale revert, historical branch promotion, or deletion of later commerce work.

## 5. Baseline restoration gate

Before the baseline-restoration PR can merge, return PASS/FAIL for:

- customer-facing homepage layout matches `e9cbaacc...`;
- copy/CTAs/section order match `e9cbaacc...`;
- header/navigation treatment matches `e9cbaacc...`;
- card/category structure and spacing match `e9cbaacc...`;
- hero presentation matches the accepted baseline;
- current canonical catalog/product routes remain present;
- cart/checkout/order foundations remain intact;
- no supplier, price, shipping, tax, warranty, MAP or orderability truth is changed as part of visual restoration;
- Web V2 QA PASS;
- canonical PR QA PASS;
- desktop comparison PASS;
- 390px technical comparison PASS.

A missing or imperfect downstream image is **not** a reason to redesign or delay the accepted baseline unless it blocks basic usability or creates false product identity.

## 6. Release sequence — baseline first

The existing `web-v2-release.yml` requires the candidate/promote SHA to equal **current `main`**. Therefore the historical `e9cbaacc...` commit cannot be promoted directly while main has advanced.

Required release path:

1. merge the bounded visual-restoration patch into current main;
2. create one immutable candidate from that exact current-main SHA;
3. verify candidate-to-SHA identity and `/__version`;
4. verify the restored presentation against `e9cbaacc...`;
5. run production-parity smoke using the exact candidate and accepted baseline controls;
6. promote the **same tested Cloudflare Version ID** to production;
7. live-verify key routes and runtime identity;
8. freeze that release as the Web V2 production visual baseline.

No release-flow modification is authorized merely to bypass the exact-current-main invariant.

## 7. Post-cutover image / icon strategy — section scoped

Once the approved baseline is live, image and icon work becomes a sequence of **bounded section patches**, not another full-site visual closeout.

Each section patch must:

- name exactly one homepage/customer-facing section or one tightly coupled image group;
- change only that section's image/icon assets, mappings, crop/object-fit/responsive rules, and the minimum code required to render them;
- preserve copy, CTAs, dimensions, section order, navigation, layout and visual system unless Casey explicitly approves a change;
- use exact product/vendor identity where applicable;
- avoid generic image reuse across unrelated sections;
- avoid semantic-icon substitution for an intended photo/product image unless Casey approves it;
- hold only the unresolved asset instead of redesigning around it;
- run targeted desktop + 390px visual QA plus canonical Web V2/PR QA;
- produce a small diff and a section-specific receipt.

Suggested section order after cutover:

1. hero / primary product imagery;
2. SOK branding + exact SK12V100PC / SK48V100N slots;
3. category tiles;
4. Featured SOK / homepage product grid;
5. Shop the Store;
6. Build Your Power System;
7. Hawaii / Alaska / freight;
8. Project & Field Support;
9. remaining icons / decorative media.

**Technical note:** Cloudflare Worker releases are immutable whole-version artifacts. A section patch may still require a new Worker version to go live, but the **code and visual scope must remain section-bounded**. Do not treat each media correction as authority to rebuild or visually retune the entire site.

## 8. Worker routing

| Worker | State | Task |
|---|---|---|
| **WEB DEVELOPER** | **ACTIVE — BASELINE RESTORATION FIRST** | Start from current `main`; restore the `e9cbaacc...` visual contract only; preserve later safe nonvisual/catalog/commerce work; QA; merge; stop. Do **not** continue broad image closeout in the same PR. |
| **MASTER RECON OS** | **TRIGGERED / CONTROL ONLY** | Enforce `e9cbaacc...` lineage, current-main preservation, and anti-drift. Verify that restoration does not roll back commerce or broaden visual scope. |
| **RELEASE ENGINEER** | **STANDBY UNTIL RESTORATION MERGE** | From exact restored current main: candidate → identity proof → restoration verification → production-parity smoke → same-version promotion → live verify. |
| **WEB DEVELOPER — MEDIA PASSES** | **QUEUED AFTER CUTOVER** | One section/image group per bounded branch/PR. No broad visual redesign or full-site image sweep. |
| COMMERCE DEVELOPER | **STANDBY / FOUNDATION PRESERVED** | Do not reopen checkout/order/payment architecture during visual restoration or media passes. |

## 9. Next RUN meaning

**WEB DEVELOPER → CURRENT MAIN → RESTORE `e9cbaacc...` VISUAL CONTRACT ONLY → PRESERVE FORWARD COMMERCE/CATALOG → QA → MERGE → RELEASE ENGINEER → ONE EXACT CURRENT-MAIN CANDIDATE → RESTORATION VERIFY → PRODUCTION-PARITY SMOKE → SAME-VERSION PROMOTION → LIVE VERIFY → SECTION MEDIA PASSES.**

## 10. Release invariant

**OWNER-ACCEPTED VISUAL CONTRACT + CURRENT SAFE COMMERCE/CATALOG → ONE EXACT CURRENT-MAIN CLOUDFLARE VERSION → VERIFY → SMOKE → SAME VERSION CUTOVER → SECTION-SCOPED MEDIA PATCHES ONLY.**

## Control phrase

**`e9cbaacc...` IS THE LAST OWNER-ACCEPTED VISUAL BASELINE → RESTORE THAT PRESENTATION ON CURRENT MAIN → PROMOTE THE RESTORED BASELINE ONCE → REPAIR IMAGES/ICONS SECTION BY SECTION → NO MORE WHOLE-SITE VISUAL REBUILDS.**
