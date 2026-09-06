# Homepage Marketing Slideshow → Deployment Handoff

**Date:** 2026-09-05  
**From:** Website Visual / Graphics Manager  
**To:** Deployment / Management  
**Visual state:** COMPLETE / PREVIEW PASS  
**Production state:** UNCHANGED BY VISUAL WORKER

## Controlling owner direction

Use the homepage slideshow as the interchangeable marketing lane rather than continuing the failed broad hardcoded homepage redesign.

Creative format is Facebook-cover-style landscape with a canonical 1640 × 624 working canvas. Initial creative is the approved Elevation UpScales storefront wordmark: OFF-GRID POWER • SUPPLY • LOGISTICS.

Routine campaign changes should be accomplished by approved creative assets + `site/home-hero-slides.json`, not by rebuilding the homepage hero.

## Deployment baseline incorporated

Parent/current main validated by the Visual workflow:
`fb6f741b2b05ae04a7894f889eccbc55362bb15c`

Visual preview candidate:
`55c6a3b43314ae20c6f6d7f5b42788657c345d00`

Branch:
`work/home-hero-slides-0905-02-graphics`

## Preview evidence

Workflow:
`HOME-HERO-SLIDES-0905-02 Preview`

Run ID:
`34004289777`

Conclusion:
`success`

Preview URL:
`https://4ec3e0ae.elevationupscales.pages.dev`

Stable preview alias:
`https://home-hero-slides-0905-02-pre.elevationupscales.pages.dev`

Canonical static + preview QA, SOK gates, commerce regression, website-integrity smoke and slideshow asset/manifest smoke all passed.

## Application delta to take forward

- `site/index.html`
- `site/home-hero-slides.css`
- `site/home-hero-slides.js`
- `site/home-hero-slides.json`

Coordination/validation support:
- `coordination/decisions/DEC-009-homepage-marketing-slideshow-lane.md`
- `.github/workflows/home-hero-slides-0905-02-preview.yml`
- `coordination/receipts/2026-09-05-homepage-marketing-slideshow-visual-receipt.md`
- this handoff

## Release instructions

1. Resolve current repo `main` again immediately before release.
2. If `main` still equals `fb6f741b2b05ae04a7894f889eccbc55362bb15c`, the previewed application candidate has exact accepted ancestry.
3. If `main` moved, reconstruct/rebase only the small slideshow delta onto the newer accepted baseline; do not rewind newer Deployment work.
4. Preserve the four application-file scope unless a release/cache adjustment is necessary.
5. Re-run the controlled release/production gate after any lineage reconstruction.
6. Verify the homepage shows the landscape slide cleanly at desktop and mobile widths, with no stretching/cropping of the approved wordmark.
7. Verify `/store` and non-store brand surfaces remain unaffected.
8. Verify commerce/SOK/Hawaii/checkout regressions remain clean.
9. Promote production only under Deployment/Management authority.
10. Create rollback baseline and final production receipt.

## Protected boundaries

No authorization is granted here to change pricing, MAP, inventory, supplier data, checkout/PayPal, Hawaii routing, Catalog/Doba, Admin/Portal or production data.

## Disposition

**VISUAL COMPLETE. DEPLOYMENT / MANAGEMENT MAY PROCEED WITH THE RELEASE PASS.**
