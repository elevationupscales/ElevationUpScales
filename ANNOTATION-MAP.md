# Elevation UpScales — Annotation Source Map

Use this file before searching the whole repository. It identifies the source that actually owns the visible area.

## Homepage `/`
Primary static source:
- `site/index.html`

Homepage runtime source:
- `site/home-hero-slides.js` — homepage utility/header enhancement, solution-grid construction, slideshow rendering and controls
- `site/home-hero-slides.json` — slideshow content/config

Homepage styles:
- `site/home-hero-slides.css`
- `site/home-commerce.css`
- `site/retail-first.css`
- `site/site-shell.css`
- `site/styles.css`

Important: some homepage markup is runtime-generated. If an annotation points to the header, solution grid, or slideshow, inspect `home-hero-slides.js` before changing duplicated-looking HTML.

Known no-visual cleanup debt found in the September 6 sweep:
- `site/home-hero-slides.js` still contains a dormant `buildFlagshipHero()` fallback with older hero wording. The current static homepage already has `data-reference-flagship`, so the fallback returns immediately today. Do not treat that dormant copy as the current owner-approved homepage source.
- `site/index.html` contains the real homepage `<h1>` plus a second screen-reader-only `<h1>` inside the slideshow placeholder. This is semantic cleanup debt, not a visible layout defect.

## Shared non-home header/footer
- `site/site-shell.js` — runtime shell, navigation, support dialog, analytics, non-home retail header/footer
- `site/site-shell.css`
- `site/retail-first.css`

Important: on many non-home routes, the header/footer visible in the browser is rebuilt by `site-shell.js`. Editing only the page HTML may not change what the browser displays.

## Start a Project `/start-a-project`
- `site/start-a-project.html`
- `site/start-project.js`
- `site/start-project.css`
- `site/site-shell.js` — also rewrites selected intake presentation text at runtime

## RV & Outdoor `/rv-store`
- `site/rv-store.html`
- `site/rv-store.js`
- shared shell: `site/site-shell.js`

## Lithium `/lithium-batteries`
- `site/lithium-batteries.html`
- shared shell: `site/site-shell.js`

## Marketplace `/marketplace`
- `site/marketplace.html`
- shared shell/runtime behavior may also come from `site/site-shell.js`

## Solar Builder `/solar-project`
- `site/solar-project.html`
- `site/solar-builder.js`
- `site/solar-builder.css`
- shared shell: `site/site-shell.js`

## Editing rule
When an annotation points at an element, first identify whether the browser-visible element is static HTML or runtime-generated. Change the owning source only. Do not patch both copies unless the duplicated source must intentionally stay synchronized.
