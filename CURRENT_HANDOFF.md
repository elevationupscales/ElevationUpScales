# Elevation UpScales — Current Worker Handoff

Updated: 2026-09-08

Repository: `elevationupscales/ElevationUpScales`

Local path: `/workspace/scratch/c34e45c0c31d/repo`

Verified source `main`: `9961fb0cc99e16df2096994ee779b7757db31bd1`

Active handoff branch: `docs/current-work-handoff-0908`

Production promotion: deployment worker only

## Fast takeover

1. Read `/AGENTS.md`, `/CODING-WORKFLOW.md`, and this file only.
2. Run `git fetch origin refs/heads/main:refs/remotes/origin/main`.
3. Compare this recorded `main` with `git rev-parse origin/main`; current Git wins.
4. Inspect `git status --short --branch` and `git log -3 --oneline`.
5. Continue only the explicitly assigned next scope on a fresh branch from current `main`.

## Current accepted state

- The simplified Command Center foundation is released: six primary destinations are Today, Orders, Products, Leads, Logistics, and System.
- Leads are separated into Customer Leads, Supplier Growth, Solar, Work With Us, and Portal-ready. Supplier, customer, Solar, and lithium activity must not be mixed.
- Commerce Logistics is released. Doba is the primary inventory/supplier source for TikTok Shop and eBay; CJ Dropshipping remains a separate supplier.
- Shopify, eBay, and TikTok are sales channels. Printful and SpreadConnect are fulfillment providers. Fourthwall is a hybrid storefront/provider.
- CSV fallback, preview-first review, idempotency, and one-writer ownership remain mandatory. There is no automatic publishing, supplier ordering, price mutation, or inventory mutation.
- SOK dropship/order controls are released. Current Shopify operating truth is in `/operations/shopify-manager/SHOPIFY_MANAGER.md`.
- Nine SOK products are ACTIVE and confirmed in Shopify Online Store publication records with MAP controls, no active discounts, no compare-at prices, and one ready image each.
- SOK weekly availability reconciliation is still manual. Never commit raw supplier inventory, dealer cost, private correspondence, private freight terms, customer data, or credentials.
- Current operational follow-ups are in `/operations/ACTIVE_FOLLOWUPS_2026-09-08.md`: Doba order verification, Hawaii receiving partner qualification, PayPal readiness, first-wave non-lithium Shopify products, and SOK media expansion.

## Completed lineage

- Command Center foundation commit on production: `b300022`; merge: `8ad1434`.
- Current production source includes later SOK dropship, trust-surface, Shopify catalog, and storefront navigation work through `9961fb0`.
- The former local Command Center commit `2dd1dac` is equivalent to production `b300022`; do not cherry-pick or redeploy it.
- This handoff branch contains documentation/process improvements only and must not be treated as a new functional release.

## Next coding priorities

Use a separate branch per approved priority:

1. SOK stock intake: protected weekly SKU availability input with preview, validation, freshness, and review-first apply; expose only customer-safe derived availability.
2. Today queue: one ranked action list showing owner, age, blocker, and direct next action.
3. Products: simplify Intake → Review → Catalog → Channels while preserving Doba and Catalog ownership.
4. Doba ingestion: build authenticated Doba → TikTok/eBay order ingestion incrementally with idempotency and CSV fallback.
5. Logistics: prioritize exceptions, destination verification, lithium review, and shipment handoff.

Do not begin a priority merely because it is listed here; use the owner's newest explicit task as scope.

## Permanent boundaries

- No database schema or production-data changes without separate approval.
- Preserve checkout, PayPal, pricing, freight, Cloudflare bindings, secrets, auth, and sessions.
- Preserve SOK MAP, availability, purchase-mode, lithium, Hawaii, and Alaska controls.
- Do not promise ordinary parcel delivery for Hawaii lithium.
- Catalog remains the product master; supplier inventory is not physical On Hand; Marketplace remains separate from Elevation Catalog.
- Portal handoff remains manual export only unless separately authorized.
- Build workers stop before production merge/deployment. Deployment is owned by another worker.

## Verification at handoff

Last full code QA on the Command Center closeout: PASS.

Supplier Leads QA: PASS.

Command Center QA: PASS.

`git diff --check`: PASS.

PayPal sandbox create/capture was not exercised because checkout was unchanged.

The commits after that full QA through recorded `main` changed operating documentation only. Run targeted QA during the next code pass and full `npm run qa` once before release-candidate handoff.

## Required finish receipt

Return only:

- parent `main` SHA;
- branch and resulting HEAD;
- changed files;
- targeted/full QA results;
- schema/protected-boundary status;
- blocker or deferred item;
- exact next action;
- merge/deployment state.

Update this file, commit, push the branch to GitHub, and stop.
