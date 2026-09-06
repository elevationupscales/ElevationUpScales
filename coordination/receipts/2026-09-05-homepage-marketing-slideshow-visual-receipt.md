# Homepage Marketing Slideshow — Visual Worker Receipt

**Date:** 2026-09-05  
**Worker:** Website Visual / Graphics Manager  
**State:** VISUAL BUILD + ISOLATED PREVIEW PASS  
**Production promotion by Visual Worker:** NO

## Owner decision incorporated

The broad hardcoded storefront redesign is no longer the preferred homepage marketing path.

The homepage now uses a reusable **landscape marketing slideshow** as the interchangeable visual lane. New marketing should normally be introduced through approved landscape artwork plus the slideshow manifest rather than by rewriting homepage hero markup.

Creative target:
- Facebook-cover-style landscape;
- canonical working canvas: **1640 × 624**;
- important text/logos stay inside a central safe area;
- approved artwork is not redrawn or restyled by slideshow runtime.

The initial active slide is the owner-approved storefront wordmark:

**ELEVATION UpScales Inc. — OFF-GRID POWER • SUPPLY • LOGISTICS**

Repository asset:
`site/assets/brand/storefront-wordmark.webp`

This remains a storefront/power-side identity treatment, not a company-wide rebrand. Bull + Bear remains available for Apparel, internal and non-store contexts.

## Deployment baseline incorporated

Deployment/current repository baseline used as parent at visual build and workflow validation:

`fb6f741b2b05ae04a7894f889eccbc55362bb15c`

The visual branch was exactly ahead of that parent and behind by 0 when the preview gate ran.

Branch:
`work/home-hero-slides-0905-02-graphics`

Preview candidate SHA:
`55c6a3b43314ae20c6f6d7f5b42788657c345d00`

## Application changes

- `site/index.html`
  - removed the hardcoded retail hero block only;
  - installed generic slideshow mount point;
  - preserved the Deployment baseline navigation, category, logistics, SOK, commerce, builder, services and footer content.

- `site/home-hero-slides.css`
  - 1640:624 landscape presentation contract;
  - full-width black creative frame;
  - responsive controls and mobile preservation of the landscape banner;
  - reduced-motion support.

- `site/home-hero-slides.js`
  - generic data-driven slideshow runtime;
  - autoplay only when more than one active slide exists;
  - pause/resume, keyboard arrows, swipe, hover/focus pause and page-visibility handling;
  - respects `prefers-reduced-motion`;
  - does not encode pricing, product or logistics rules.

- `site/home-hero-slides.json`
  - editable marketing manifest;
  - initial active creative is `/assets/brand/storefront-wordmark.webp`;
  - ordinary future campaigns can be added, reordered or disabled here without homepage HTML changes.

## Durable decision

`coordination/decisions/DEC-009-homepage-marketing-slideshow-lane.md`

This is the controlling homepage marketing-creative decision until superseded by newer explicit owner/management direction.

## Workflow execution

Workflow:
`HOME-HERO-SLIDES-0905-02 Preview`

GitHub Actions run:
`34004289777`

Result:
**PASS / SUCCESS**

Exact head validated:
`55c6a3b43314ae20c6f6d7f5b42788657c345d00`

Exact current-main parent validated:
`fb6f741b2b05ae04a7894f889eccbc55362bb15c`

Isolated Cloudflare preview:
`https://4ec3e0ae.elevationupscales.pages.dev`

Preview alias:
`https://home-hero-slides-0905-02-pre.elevationupscales.pages.dev`

## Validation results

PASS — exact parent / ancestry gate.  
PASS — slideshow-only application scope gate.  
PASS — JavaScript syntax.  
PASS — JSON/schema and initial-creative contract.  
PASS — old hardcoded `retail-hero` removed from homepage.  
PASS — canonical `npm run qa`.  
PASS — clean-baseline static QA.  
PASS — SOK commercialization static gate.  
PASS — SOK full-line static gate.  
PASS — website integrity static gate.  
PASS — commerce regression static gate.  
PASS — analytics contract.  
PASS — navigation contract.  
PASS — isolated Cloudflare preview deployment.  
PASS — `npm run qa:preview`.  
PASS — SOK commercialization preview smoke.  
PASS — SOK full-line preview smoke.  
PASS — website integrity preview smoke.  
PASS — slideshow manifest/CSS/JS/wordmark HTTP smoke.  
PASS — candidate immutability.

## Protected systems

No Visual Worker changes were made to:
- Catalog/product truth;
- SOK MAP/public pricing rules;
- supplier cost/inventory;
- PayPal or checkout processing;
- Hawaii quantity/freight routing logic;
- Doba synchronization;
- Admin/Portal architecture;
- database schema/data;
- production deployment controls.

## Future marketing operation

Normal campaign change:

`approve landscape creative → localize asset → edit site/home-hero-slides.json → visual preview/QA → Deployment release gate`

Do not rewrite homepage hero HTML for routine campaign swaps.

## Next action / worker boundary

Visual work for this lane is complete and preview-verified.

Deployment/Management may now take the candidate through the controlled production process. Immediately before promotion, Deployment must re-resolve current `main`; if it moved after `fb6f741b2b05ae04a7894f889eccbc55362bb15c`, rebuild/rebase this small slideshow diff onto the newer accepted lineage and rerun the appropriate release gate.

Visual Worker does not authorize bypassing preview, production regression, rollback-baseline or receipt requirements.

**FINAL VISUAL STATE: PASS — READY FOR DEPLOYMENT / MANAGEMENT RELEASE REVIEW.**
