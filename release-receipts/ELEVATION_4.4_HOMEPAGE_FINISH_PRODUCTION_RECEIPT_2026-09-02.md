# Elevation 4.4 — Homepage Finish Production Receipt

Date: 2026-09-02
Status: PRODUCTION DEPLOYED / CLOSED

## Lineage
- Previous production receipt/main: `f5415bf58de82e5247f3e8f3646b107d4bf11436`
- Deployed application candidate: `049d52d1f09fe9a830be25b9553fdfd4b026d1cb`
- Patch branch: `release/homepage-finish-patch-2026-09-02`

## Deployment
- Targeted preview: `https://c022820f.elevationupscales.pages.dev`
- Production deployment: `https://71fa3f72.elevationupscales.pages.dev`
- Initial targeted verification run: `33675850566` — failed only because the verifier treated an off-screen lazy Marketplace image as broken before lazy loading.
- Allowed one targeted verifier correction only.
- Final targeted verification + production run: `33675998939` — PASS.

## Targeted homepage verification
Viewports:
- Desktop: 1440 × 900
- Mobile: 390 × 844

Results:
- Six-route Funnel: PASS / unchanged
- Horizontal overflow: PASS
- Homepage image/resource validation: PASS
- Button/route usability: PASS
- Desktop CLS: `0.00789822048611111`
- Mobile CLS: `0.040929508686911795`
- Production lineage reverified immediately before promotion: PASS

## Application scope
Application files changed from previous production:
- `site/index.html`

No homepage CSS, commerce logic, checkout, PayPal, Catalog, shipping, Marketplace logic, Solar Builder calculations, Start a Project logic, Admin, schema, or site-wide navigation architecture changed.

## Final homepage image mapping
### Six main Funnel routes
1. Lithium — `/assets/elevation-lithium-social-card.webp`
2. RV & Outdoor — `/assets/hero-galaxy-rv.webp`
3. Solar Builder — `/assets/solar/builder-v2/rv-solar-install-field-mobile.webp`
4. Start a Project — `/assets/hero-tile-project.webp`
5. Home & RV Services — `/assets/home-services-hero-bathroom.webp`
6. Marketplace — `/assets/marketplace/marketplace-premium-hero-desktop.webp`

### Supporting homepage imagery
- Built Off-Grid — `/assets/rvs/1975-winnebago-brave-features-layout.webp`
- Shop Lithium — `/assets/elevation-lithium-social-card.webp`
- Shop RV & Outdoor — `/assets/hero-galaxy-fifth-wheel-9-1-4.webp`
- Apparel — `/assets/store/premium-hat.webp`
- Project Work proof — `/assets/gallery/01_kitchen_finished.webp`

Lithium uses the same dedicated approved static lithium visual in the Funnel and Shop tile because it is the repository's dedicated lithium merchandising asset; unrelated RV/project imagery was not substituted merely to avoid duplication.

## Copy finish
- `Built from real work.` → `Built from hands-on experience.`
- `REAL WORK` → `PROJECT WORK`
- `Home, RV and solar or off-grid work starts here.` → `Home, RV, solar and off-grid work starts here.`
- Existing approved direct homepage language and six-route architecture otherwise preserved.

## Closeout
Homepage finish patch deployed to production after one targeted verification correction permitted by management. Operations Interface 2.0 was not started as part of this task.
