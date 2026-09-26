# Elevation UpScales — Coding Entry Point

## MASTER CONTROL

Before any repository work, read `MASTER-SOP.md`.

`MASTER-SOP.md` is the active worker-control authority for MPM 25. If this file, `CODING-WORKFLOW.md`, a historical handoff, a dated baseline, an old PR, or another worker note conflicts with `MASTER-SOP.md`, follow `MASTER-SOP.md` unless the owner gives a newer direct instruction.

## Current source

- `main` is the active website source of truth.
- `site/` is the deployable Cloudflare Pages application.
- Recovery-only branch: `hardbaseline/2026-09-06-production`.
- Recovery commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`.
- Recovery references are not current work baselines. Re-resolve current `main` before every task.

## Platform separation

- `elevationupscales.com`: GitHub / Cloudflare Pages website.
- `shop.elevationupscales.com` and `store.elevationupscales.com`: Shopify storefront.
- Do not duplicate or rebuild Shopify-owned catalog/store behavior in Git unless the owner explicitly asks.
- Website navigation may route directly to the Shopify storefront.

## Active business-operations source

For current SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, and fulfillment rules, read:

- `/operations/README.md`
- `/operations/SOK_ECOMMERCE_SHIPPING_SOP.md`

These operations documents govern their own workstreams but remain subordinate to current owner direction and `MASTER-SOP.md`.

**GitHub is the active management/work source for this repository.** Gmail is for business correspondence, not coding-management authority.

Because this repository is public, never commit confidential supplier costs, raw supplier inventory, private supplier correspondence, customer personal information, private carrier quotes, credentials, payment information, or non-public compliance packets.

## Annotation-first and scope-lock rule

Owner annotations, screenshots, and direct instructions are the primary change specification.

When an annotation or instruction identifies an area:
1. use `ANNOTATION-MAP.md` when useful to locate the owning source;
2. edit only the requested area;
3. do not rewrite neighboring copy or redesign unrelated sections;
4. preserve product truth, pricing, routing, checkout, and protected business logic unless explicitly requested;
5. do not add "helpful" extras.

## Keep coding context small

For ordinary website edits, do not load historical management packets, old handoffs, retired prompts, old baseline files, or old PRs unless the task specifically requires recovery or historical investigation.

Historical context is reference material, not current authority.

## Fast edit cycle

During iterations run:

`npm run qa:fast`

Before preview, merge, or deployment run:

`npm run qa`

and:

`git diff --check`

Use the reusable release-candidate preview when browser review is useful. After approved work is merged, release production only through the **Worker Exact-SHA Release** preview → same-SHA production gate described in `CODING-WORKFLOW.md`.

## No-surprise rule

A visual annotation does not authorize unrelated visual changes. A navigation fix does not authorize copy changes. A code cleanup does not authorize layout, color, image, product, price, routing, SEO, or commerce changes.

If the owner says STOP, HOLD, FREEZE, or NO MORE EDITS, stop mutation and preserve state until that task is explicitly reauthorized.
