# Elevation UpScales

Controlled source repository for the Elevation UpScales Cloudflare Pages website, Mission Control, Marketplace, customer intake system, and Solar Builder.

## Current baseline

- Release: `v3.11.25`
- Backend runtime marker: `3.11.24-guided-solar-builder`
- Front-end release marker: `v3.11.25 — interactive Builder navigation + visual live summary`
- Corrective parent commit: `36fef1e50ade89065cd61b83d11670cd7bf9ee69`
- Original v3.11.25 update ZIP SHA256: `5b92373bcdd80261987c7f7731b343981b7a9ab3b2f5842625f6c3e3b0dd78ec`
- Recovery deployment ZIP SHA256: `6163c59f0b83c942e0cd1cf37d39a722dc4ae87cab98cf87b1b3a6d32986b4e3`
- Website source directory: `site/`
- Website files: `236`

The corrective release restores the intended v3.11.24 Solar Builder files to the authoritative root `site/` tree, applies the v3.11.25 navigation and live-summary update, and removes the misplaced nested copy created by the prior GitHub upload.

Cloudflare bindings such as `LEADS_DB`, Marketplace storage, analytics storage, and runtime secrets remain configured in the existing Cloudflare Pages project. They are not stored in this repository. This release adds no database migration and no binding change.

## Deploy safely

The repository does not deploy merely because files are uploaded or changed. Deployments are started manually from GitHub Actions.

1. Open **Actions** in GitHub.
2. Select **Deploy Elevation UpScales**.
3. Select **Run workflow**.
4. Choose **preview** first.
5. Inspect the preview URL shown in the completed workflow summary.
6. Run the workflow again with **production** only after the preview is approved.

The production job deploys the `main` Pages branch to the existing `elevationupscales` Cloudflare Pages project.

## Required GitHub configuration

Repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Repository variable:

- `CLOUDFLARE_PAGES_PROJECT=elevationupscales`

Never commit Cloudflare tokens, `.env`, `.dev.vars`, private keys, database exports, customer records, or payment credentials.

## Editing rule

Make website changes inside `site/`. The workflow validates required files, JavaScript syntax, deployment limits, v3.11.25 Solar Builder markers, and blocked secret/archive files before Cloudflare receives an upload.
