# ELEVATION UPSCALES — WEB V2 OWNER VISUAL FIDELITY REQUIREMENTS

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**Authority:** OWNER-DIRECTED / VISUAL SOURCE OF TRUTH  
**Applies To:** Web V2 homepage fidelity repair  
**Date:** 2026-09-13

## Owner authority

Casey Young is the final visual-acceptance authority for Web V2. DEV, Release Engineer, MPM, and OS RECON may verify and report, but they do not declare owner visual acceptance.

## Visual source of truth

The current production homepage at `https://elevationupscales.com/` controls visible homepage presentation until Casey accepts a deliberate change.

Web V2 may replace underlying routing, catalog, checkout, and commerce behavior, but it must not silently redesign, simplify, rewrite, or substitute the approved visible homepage.

## Owner-required fidelity rules

1. **Do not reuse one generic image across multiple category cards, buttons, or sections unless production intentionally does so.** Each visual category/section must use the corresponding approved production imagery or an owner-approved exact replacement.
2. **SOK branding must be original-quality and faithful.** The SOK Battery logo/wordmark must use the best approved original source. Do not use a blurry, distorted, low-resolution, recreated, approximated, or visually altered substitute.
3. **Hero imagery is required, not optional decoration.** Preserve the approved production hero composition, including SOK brand treatment and visible product imagery, at matching scale/crop/placement as closely as practical.
4. **Category imagery is required.** Shop-by-solution, product/category groupings, store sections, freight/logistics, power-system, and other production sections must retain their intended visual imagery rather than becoming text-only or generic cards.
5. **Exact production assets take priority over generic higher-resolution substitutes when the substitute changes the approved presentation.** Improve source quality only when the visual identity/composition remains the same and the asset is authoritative.
6. **No AI redraws or SKU substitutions for factual product media.** Product/vendor imagery must remain source-correct.
7. **No material product crop loss.** A product must not be cut off, stretched, distorted, or presented at visibly poor quality in the final rendered layout.
8. **Copy is part of fidelity.** Do not replace production-visible copy or CTA wording with cleaner/new wording unless Casey explicitly approves the change or a factual/compliance correction is required.
9. **Formatting is part of fidelity.** Match section order, spacing, card dimensions, hierarchy, capitalization, button treatment, responsive layout, header/footer density, and visual rhythm—not merely the same concepts.
10. **Underlying Web V2 safety remains preserved.** Visual fidelity must not invent price, orderability, shipping, tax, freight, Hawaii eligibility, payment readiness, or supplier truth. Preserve the production look while routing unsafe/unverified actions to safe Web V2 destinations or fail-closed behavior.

## Required image audit before next candidate

DEV must inspect the production homepage against Web V2 and account for, at minimum:

- utility/header brand assets;
- hero background and hero product/brand imagery;
- SOK Battery wordmark/logo quality;
- SK12V100PC and SK48V100N presentation;
- Shop by Solution category imagery;
- Featured SOK imagery;
- Hawaii / Alaska / freight imagery;
- homepage product-grid imagery;
- Shop the Store category imagery;
- Build Your Power System imagery;
- Project & Field Support imagery where present;
- footer branding.

For each production visual, DEV must either:

- reproduce the same approved asset/treatment in Web V2; or
- record the exact safety/technical reason it cannot be reproduced and identify the closest owner-reviewable alternative.

## QA evidence required

Before returning to Release Engineer, DEV must compare production and Web V2 at the same desktop and mobile viewport sizes. Evidence must cover:

**HEADER + HERO → SOLUTIONS + SOK → FREIGHT + PRODUCT GRID → SHOP THE STORE + POWER SYSTEM → FIELD SUPPORT + FOOTER**

The repair is not complete merely because routes render or equivalent sections exist.

## Acceptance standard

**A customer familiar with the current Elevation homepage should perceive Web V2 as the same approved Elevation website, with the newer Web V2 catalog/commerce architecture underneath it.**

Final visual acceptance belongs to Casey Young only.
