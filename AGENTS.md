# Elevation UpScales — Coding Entry Point

For normal website coding, start here and in `CODING-WORKFLOW.md`.

## Current source
- `main` is the active website source of truth.
- `site/` is the deployable Cloudflare Pages application.
- Recovery-only branch: `hardbaseline/2026-09-06-production`.
- Recovery commit: `cfc2f8cbe4d89ef40a46fb95d075ee579075a78d`.

## Active business-operations source
For current SOK, lithium, RV/outdoor ecommerce, shipping-option, Hawaii/Alaska, purchase-agreement, and fulfillment rules, read:

- `/operations/README.md`
- `/operations/SOK_ECOMMERCE_SHIPPING_SOP.md`

These repository operations files are the active control plane for those workstreams.

**Gmail management records are backup / historical reference only.** Do not use an older Gmail management draft to override a current `/operations/` rule.

Because this repository is public, never commit confidential supplier costs, raw supplier inventory, private supplier correspondence, customer personal information, private carrier quotes, credentials, or non-public compliance packets.

## Annotation-first rule
Owner annotations, screenshots, and direct instructions are the primary change specification.

When an annotation identifies a visual area:
1. use `ANNOTATION-MAP.md` to locate the owning source;
2. edit only the requested area;
3. do not rewrite neighboring copy or redesign unrelated sections;
4. preserve product truth, pricing, routing, checkout, and protected business logic unless explicitly requested.

## Keep coding context small
For ordinary website edits, DO NOT load the old Elevation 4.3 management control plane, historical handoffs, receipts, runbooks, release packets, or old baseline files unless the task specifically requires historical investigation.

In particular, normal website work does not require reading `ELEVATION_4_3_MASTER_STATUS.md` or reconstructing prior management approvals.

## Fast edit cycle
During annotation iterations run:

`npm run qa:fast`

Before preview, merge, or deployment run:

`npm run qa`

Use the permanent release-candidate preview and deploy workflows. Do not create a new workflow for each edit.

## No-surprise rule
A visual annotation does not authorize unrelated visual changes. A code cleanup does not authorize copy, layout, color, image, product, price, or routing changes.
