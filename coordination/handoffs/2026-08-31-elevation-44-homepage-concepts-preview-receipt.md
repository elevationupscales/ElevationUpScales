# Elevation UpScales 4.4 — Homepage Concepts Preview Receipt

**Date:** 2026-08-31  
**Release:** B — Homepage Concept Review  
**Scope:** Four isolated homepage concepts  
**Production homepage status:** UNCHANGED  
**Disposition:** PREVIEW READY — MANAGEMENT SELECTION REQUIRED

## Lineage

- Current production/repo parent used for concepts: `1809f257c7af31ef51f34673226d5adfcdf9b929`
- Preview branch: `preview/4.4-homepage-concepts-2026-08-31`
- Verified concept preview SHA: `68c03b466e7bc44f10c1782cf2a7d61b286e4df4`
- Preview workflow run: `33458774298` — PASS
- Direct preview deployment: `https://44737b9e.elevationupscales.pages.dev`
- Stable preview alias: `https://homepage-concepts-preview.elevationupscales.pages.dev`

## Four concepts

1. **Elevation Minimal**  
   `https://homepage-concepts-preview.elevationupscales.pages.dev/home-concept-minimal`

2. **Elevation Funnel**  
   `https://homepage-concepts-preview.elevationupscales.pages.dev/home-concept-funnel`

3. **Built Off-Grid**  
   `https://homepage-concepts-preview.elevationupscales.pages.dev/home-concept-built-off-grid`

4. **Elevation Commerce Hub**  
   `https://homepage-concepts-preview.elevationupscales.pages.dev/home-concept-commerce`

## Verification

All four concept routes returned HTTP 200 on the isolated preview deployment.

The preview root `/` was separately checked and remains the existing production-home design. The production `site/index.html` is byte-unchanged from current `main`; no homepage concept has been promoted or substituted for `/`.

Each concept includes:

- `noindex,nofollow`
- explicit preview-only banner
- real Elevation logo/brand assets
- existing Elevation imagery rather than invented stock imagery
- exact public phone `208-813-4998`
- links to:
  - `/start-a-project`
  - `/home-services`
  - `/rv-services`
  - `/solar-services`
  - `/solar-project`
  - `/lithium-batteries`
  - `/rv-store`
  - `/store`
  - `/marketplace`
  - `/hawaii-lithium-batteries`
  - `/work-with-us`
  - `/privacy`

Every required linked route returned HTTP 200 during preview verification.

## Concept intent

### Elevation Minimal

A spacious premium presentation that introduces four primary lanes: Home, RV, Solar/Off-Grid and Elevation retail. Strong when brand clarity and restraint are the priority.

### Elevation Funnel

A conversion/navigation-first homepage with six immediate paths above the fold. Strong when the primary job of the homepage is to help visitors identify what they came for quickly.

### Built Off-Grid

A story-first homepage built around Elevation's real RV/off-grid operating experience, then connecting that story to solar planning, lithium power, RV work, home work and retail. Strongest narrative identity.

### Elevation Commerce Hub

A store-forward homepage that prioritizes Lithium, RV & Outdoor and Apparel while keeping services and Marketplace clearly separate. Strong when commerce growth is the top homepage objective.

## Management design note

The management package identified **Elevation Funnel** as the strongest structural direction and **Built Off-Grid** as the strongest story direction. These are recommendations only. No hybrid has been created and no concept has been selected for production.

## Guardrails preserved

- Production homepage unchanged
- Marketplace remains separate from Elevation-owned stores
- Start a Project remains present
- Solar Builder remains a real route
- Hawaii Lithium remains Coming Soon / availability-request language
- No fake testimonials, fake metrics or unsupported certification/safety/shipping claims
- No new product source or commerce architecture change
- No production deployment authorization is implied by concept review

Temporary one-time preview workflows are removed from the cleaned concept branch after successful deployment. The deployed preview remains available for management review.

**FINAL STATUS: PREVIEW READY — MANAGEMENT SELECTION REQUIRED**
