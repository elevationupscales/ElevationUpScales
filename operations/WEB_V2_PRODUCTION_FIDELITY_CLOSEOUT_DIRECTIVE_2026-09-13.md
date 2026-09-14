# ELEVATION UPSCALES — WEB V2 PRODUCTION-FIDELITY CLOSEOUT DIRECTIVE

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Authority:** OWNER-DIRECTED / CLOSEOUT CONTROL  
**Date:** 2026-09-13  
**Applies To:** Web V2 homepage only  

## 1. Owner decision

The exact Web V2 candidate built from current `main` SHA `4bc2d0874db74133be3a76aee8d6db33504b6bfa` is **REJECTED FOR VISUAL FIDELITY** and must not be promoted.

Candidate evidence retained only:

- Git SHA: `4bc2d0874db74133be3a76aee8d6db33504b6bfa`
- GitHub Actions run: `#8 / 34803391129`
- Cloudflare Version ID: `41bbca73-fb38-4f0f-87b3-a24b3f1801d0`
- candidate QA: `PASS`
- `/__version`: matched candidate Version ID
- owner visual approval: `FAIL / HOLD`
- production deployment: **NONE**

Do not retry, promote, production-smoke, or reinterpret this candidate as accepted.

## 2. Why it failed

The candidate is materially different from the current production homepage. The production homepage remains the visual source of truth under `WEB_V2_OWNER_VISUAL_FIDELITY_REQUIREMENTS_2026-09-13.md`.

Visible drift includes, at minimum:

- candidate hero: **“Power Beyond the Grid.”**
- production hero: **“Lithium Power” / “for RV, Solar & Backup”**
- candidate CTA: **“Shop Power & Energy”**
- production CTA: **“Explore Power Solutions →”**
- candidate uses a materially different homepage presentation and owned visual set rather than reproducing the production composition.

This is not a minor asset-rendering issue. It is a presentation-control failure.

## 3. Governing acceptance target

The current production homepage at `https://elevationupscales.com/` controls visible homepage presentation until Casey explicitly accepts a deliberate redesign.

The Web V2 implementation may modernize routing, catalog, checkout, payment/order, and fulfillment underneath the page, but the visible homepage must remain recognizably the same approved Elevation website.

The production homepage currently includes this controlling visible sequence and wording:

1. utility/header and current navigation treatment;
2. **AUTHORIZED SOK ENERGY DEALER**;
3. **Lithium Power** / **for RV, Solar & Backup**;
4. body copy: **“Shop SOK lithium batteries and power systems for RV, solar, backup and off-grid use.”**;
5. primary CTA: **“Explore Power Solutions →”**;
6. secondary CTA: **“Start a Project”**;
7. category shortcut row;
8. SOK hero/product treatment;
9. authorized-dealer / supply / logistics support treatment;
10. **Shop by Category.**;
11. **Battery Freight for Hawaii & Alaska.**;
12. Authorized SOK section with SK12V100PC and SK48V100N;
13. **Shop the Store.**;
14. **Build Your Power System.**;
15. **Project & Field Support.**;
16. production-like footer branding, density and links.

Copy, section order, imagery purpose, scale, hierarchy, button treatment and responsive rhythm are part of acceptance.

## 4. Scope freeze

This closeout is **NOT** another visual-system redesign.

DEV may change only what is necessary to make the Web V2 homepage visibly match production while preserving already-accepted Web V2 commerce architecture.

### Preserve

- current Web V2 routing and commerce architecture;
- canonical catalog/product/cart/checkout/order work;
- exact-SKU / fail-closed commercial safety;
- current release architecture;
- correct clean SOK factual product imagery where it can be placed without changing the approved production composition;
- existing non-homepage work unless a homepage dependency requires a bounded fix.

### Do not

- rewrite homepage copy;
- invent a new headline, CTA, category treatment or section order;
- call a new dark/cyan composition “accepted” unless Casey explicitly accepts it;
- replace production imagery with semantic icons merely because the icon is cleaner;
- substitute generic or higher-resolution imagery when it changes the approved presentation;
- redesign header/footer density;
- reopen commerce/payment architecture;
- change shipping, tax, MAP, orderability, inventory, PayPal, D1, fulfillment or Legacy production;
- create another candidate before DEV returns production-vs-Web-V2 comparison evidence.

## 5. RECON lane — control only

MASTER RECON must stop acting as a design interpreter.

RECON owns only:

- confirm current `main` and rejected candidate lineage;
- confirm this directive and the owner fidelity requirements are the controlling visual authority;
- identify stale pointers that would route DEV or Release Engineer backward/sideways;
- verify the resulting DEV receipt against the owner acceptance target;
- sync control pointers after terminal evidence.

RECON must not authorize alternative wording, alternative composition, semantic redesign, or “equivalent” visuals.

## 6. DEV lane — one bounded correction

WEB DEVELOPER is the sole implementation owner for closeout.

Start from current `main` so no accepted commerce/release work is lost. Create/recover one bounded homepage-fidelity branch and make the smallest correction necessary.

Required implementation target:

**CURRENT MAIN → RESTORE PRODUCTION-VISIBLE HOMEPAGE COPY + SECTION ORDER + ASSET PURPOSE + LAYOUT RHYTHM → PRESERVE WEB V2 FUNCTIONAL ROUTES UNDERNEATH → QA → SAME-VIEWPORT COMPARISON → MERGE → HAND BACK**

The earlier owner-fidelity work may be used as reference, but do not wholesale-revert current `main` and do not discard later safe commerce/media fixes.

## 7. DEV acceptance checklist before merge

DEV must return a checklist with PASS/FAIL for each:

- production hero eyebrow/text reproduced;
- production hero headline reproduced;
- production hero body copy reproduced;
- **Explore Power Solutions →** reproduced;
- **Start a Project** preserved;
- header/nav visually production-like;
- category shortcut row production-like;
- SOK hero/product treatment production-like;
- Shop by Category section production-like;
- Hawaii/Alaska freight section production-like;
- SOK SK12V100PC + SK48V100N presentation production-like;
- Shop the Store section production-like;
- Build Your Power System section production-like;
- Project & Field Support section production-like;
- footer production-like;
- no wrong-SKU media;
- no material product crop loss;
- no new unsupported commercial claims;
- desktop comparison PASS;
- 390px mobile comparison PASS;
- Web V2 QA PASS;
- canonical PR QA PASS.

If any visible item differs materially from production, do not call the repair complete.

## 8. Release Engineer lane

RELEASE ENGINEER remains **STANDBY** until DEV merges the bounded production-fidelity correction.

Then and only then:

**CORRECTED MERGED SHA → ONE NEW EXACT CLOUDFLARE VERSION → IMMUTABLE PREVIEW → `/__version` PROOF → CASEY VISUAL REVIEW → STOP.**

No production-parity smoke and no production promotion before Casey accepts the visual candidate.

## 9. Closeout rule

This work closes when all of the following are true:

1. DEV merge is complete and QA is green;
2. next exact candidate is built from that corrected merged SHA;
3. `/__version` proves the exact Cloudflare Version ID;
4. Casey visually accepts that candidate;
5. only after owner acceptance may release flow advance to the separately controlled production-parity smoke / same-version cutover gate.

## Control phrase

**PRODUCTION IS THE VISUAL BASELINE → RECON CONTROLS STATE, NOT DESIGN → DEV MAKES ONE BOUNDED FIDELITY CORRECTION → RELEASE ENGINEER MAKES ONE NEW EXACT CANDIDATE → CASEY ACCEPTS OR REJECTS → NO PROMOTION BEFORE ACCEPTANCE.**
