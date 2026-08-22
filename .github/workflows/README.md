# Elevation UpScales

Controlled source repository for the Elevation UpScales Cloudflare Pages website, Mission Control, Marketplace, customer intake system, and Solar Builder.

## Current baseline

- Release: `v3.11.24`
- Runtime marker: `3.11.24-guided-solar-builder`
- Parent release: `v3.11.23`
- Parent deployment ZIP SHA256: `9c3a08bc85c566c9e2d5c9e323afa4db7096954b7fc6b8f11dae3c42adfb5f7a`
- Website source directory: `site/`

Cloudflare bindings such as `LEADS_DB`, Marketplace storage, analytics storage, and runtime secrets remain configured in the Cloudflare Pages project. They are not stored in this repository.

## Deploy safely

The repository does not deploy merely because files are uploaded or changed. Deployments are started manually from GitHub Actions.

1. Open **Actions** in GitHub.
2. Select **Deploy Elevation UpScales**.
3. Select **Run workflow**.
4. Choose **preview** first.
5. Inspect the preview URL shown in the completed workflow summary.
6. Run the workflow again with **production** only after the preview is approved.

The production job deploys the `main` Pages branch. Confirm the existing Cloudflare Pages project's production branch is `main` before the first production run.

## Required GitHub configuration

Repository secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Repository variable:

- `CLOUDFLARE_PAGES_PROJECT=elevationupscales`

Never commit Cloudflare tokens, `.env`, `.dev.vars`, private keys, database exports, customer records, or payment credentials.

## Editing rule

Make website changes inside `site/`. The workflow validates required files, JavaScript syntax, deployment limits, and blocked secret/archive files before Cloudflare receives an upload.
