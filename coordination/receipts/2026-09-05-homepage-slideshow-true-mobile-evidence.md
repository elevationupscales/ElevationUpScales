# Homepage Slideshow — True Viewport Evidence Receipt

**Date:** 2026-09-05  
**Worker:** Next Visual Worker / evidence closeout  
**Application candidate:** `83f2761750cf975f54ae91aed31c52ffee349e55`  
**Preview under test:** `https://e89b242b.elevationupscales.pages.dev`  
**Production:** UNCHANGED / NOT AUTHORIZED

## Purpose

The previous owner-evidence workflow used Playwright `browser.newPage({ viewportSize: ... })`. That option was not applied by this API path, so both supposed desktop and mobile captures reported Chromium's default 1280px viewport. The prior "390px" screenshot therefore did **not** constitute valid mobile visual evidence.

## Corrective evidence harness

Evidence-only branch:
`work/home-hero-slides-0905-06-mobile-evidence`

Harness commit:
`6a0dba57ef824c3716e6763926d17438ad56c5e6`

Workflow:
`HOME-HERO-SLIDES-0905-06 Mobile Evidence`

Run:
`34013032706`

Result:
**PASS**

The harness uses Playwright `browser.newPage({ viewport })` and hard-fails unless browser-reported dimensions exactly match the requested viewport.

## Verified dimensions

### Desktop
- requested: 1536 × 1024
- browser-reported viewport: **1536 × 1024**
- body width: 1536
- horizontal overflow: none detected
- flagship present: yes
- trust strip present: yes
- solution cards: 7
- slideshow initialized: yes
- H1: `POWER BEYOND THE GRID.`

### Mobile
- requested: 390 × 844
- browser-reported viewport: **390 × 844**
- body width: 390
- horizontal overflow: none detected
- flagship present: yes
- trust strip present: yes
- solution cards: 7
- slideshow initialized: yes
- H1: `POWER BEYOND THE GRID.`

## Artifact

Artifact name:
`home-hero-slides-0905-06-true-viewport-evidence`

Artifact ID:
`9983057710`

Artifact SHA-256:
`cfeb6379740d3a5880fb7b349d96b84fe5b4bfcb0b288cdc515d24bb387f7b30`

Contents:
- desktop 1536×1024 viewport screenshot
- desktop full-page screenshot
- mobile 390×844 viewport screenshot
- mobile full-page screenshot
- evidence.json

## Independent visual comparison finding

The corrected evidence removes the viewport-harness blocker, but **owner visual approval is still blocked** by visible presentation defects.

Most important current defect:
- the top-left Elevation header brand image is visibly broken in both the true 1536px desktop and true 390px mobile capture; the browser renders the missing-image indicator / alt text instead of the intended brand mark.

Additional comparison notes:
- the desktop flagship composition now tracks the reference direction materially better: dark/cyan palette, `POWER BEYOND THE GRID.` hierarchy, SOK partnership emphasis, solution categories, logistics/support strip and compact retail structure are present;
- the hero's right-side SOK/product composition remains visually denser/more cluttered than the controlling reference and should be judged against the owner's exact mockup before acceptance;
- at 390px the layout fits without horizontal overflow and preserves the headline/category hierarchy, but the broken header brand is immediately visible and the promotional sale block consumes substantial first-screen height before the flagship hero;
- therefore the mobile viewport is now **technically verified**, but the design is **not yet owner-acceptance ready**.

## Next controlled step

1. Correct the broken storefront/header brand asset reference without widening scope into commerce/runtime behavior.
2. Re-run the same true-viewport evidence harness.
3. Compare the corrected desktop/mobile captures to the owner mockup.
4. Obtain explicit owner visual approval.
5. Only then hand the immutable application candidate/current-lineage successor to Deployment for its normal production gate.

No production promotion was performed by this worker.
