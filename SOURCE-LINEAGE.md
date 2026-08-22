# Source lineage

This controlled corrective release repairs the GitHub source placement and advances the Solar Builder UI to v3.11.25.

- Release: `v3.11.25`
- Backend runtime marker retained: `3.11.24-guided-solar-builder`
- Front-end marker: `v3.11.25 — interactive Builder navigation + visual live summary`
- Parent GitHub commit: `36fef1e50ade89065cd61b83d11670cd7bf9ee69`
- Parent root deploy source at that commit: `v3.11.23-solar-intake-polish`
- Intended v3.11.24 source at that commit: misplaced under `.github/workflows/site/`
- Original v3.11.25 update package SHA256: `5b92373bcdd80261987c7f7731b343981b7a9ab3b2f5842625f6c3e3b0dd78ec`
- Recovery deployment package SHA256: `6163c59f0b83c942e0cd1cf37d39a722dc4ae87cab98cf87b1b3a6d32986b4e3`
- Website files under `site/`: `236`

## Controlled scope

The release installs the intended v3.11.24 Solar Builder runtime and responsive imagery at the authoritative root path, then applies the v3.11.25 Builder navigation and live-summary layer.

Changed or added website paths:

- `site/_worker.js`
- `site/solar-builder.css`
- `site/solar-builder.js`
- `site/solar-project.html`
- `site/solar-project/index.html`
- `site/assets/solar/builder-v2/rv-solar-install-field-desktop.webp`
- `site/assets/solar/builder-v2/rv-solar-install-field-mobile.webp`
- `site/assets/solar/builder-v2/rv-solar-install-field-social.webp`

The release does not add a database migration, alter Cloudflare bindings, change Marketplace or Mission Control formulas, or modify the Solar Lead API contract. The two Solar route files remain byte-identical.
