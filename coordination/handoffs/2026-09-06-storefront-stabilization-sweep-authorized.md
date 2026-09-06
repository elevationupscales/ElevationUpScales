# STOREFRONT STABILIZATION SWEEP — AUTHORIZED

**Date:** 2026-09-06
**Owner direction:** BEGIN / DEPLOYMENT MANAGER AUTHORIZED FOR THIS SWEEP
**Starting main:** `c0b64d3563e052f50d3ca29feccac38fb0bb888a`
**Rollback baseline:** `baseline-2026-09-06-pre-storefront-stabilization-sweep`
**Work branch:** `work/storefront-stabilization-sweep-0906-01`

## Controlling status

The current production rebuild is **DEGRADED, BUT NOT ROLLBACK-WORTHY**. Core project/service/solar/marketplace/work-with-us architecture remains preserve-only unless a direct regression is proven.

## Authorized correction order

1. **P0 product-detail integration:** investigate the shared `/product` loader/API/catalog-ID resolution causing published products to render as unavailable. Do not alter individual catalog records unless the shared resolver is cleared.
2. **P1 Hawaii freight policy:** reconcile stale universal `$99 per battery` Terms wording against the current exact-SKU / route / quantity / destination freight-review model. Current operational controls win; do not create blanket Hawaii eligibility.
3. **P1 product-detail category awareness:** lithium-only retailer/Hawaii-lithium messaging must only render for lithium products. RV/outdoor products use normal Elevation product identity and ordinary destination/shipping messaging.
4. **P2 stale logistics copy:** remove any remaining `Shipping & Logistics Services — Coming Soon` language where logistics is now live.
5. **Contact code audit:** inspect actual `sms:` / `Text Casey` targets and enforce `208-813-4998`; visible text alone is not sufficient.

## Explicitly deferred

- global navigation/header/footer consolidation
- lithium catalog deduplication/curation
- supplier-title merchandising cleanup
- broad visual redesign
- unrelated Admin / Portal / Doba / pricing / PayPal / Catalog architecture changes

## Deployment authority

For this sweep, owner has authorized Deployment Manager to continue through engineering validation and production deployment without additional routine management, owner-visual, graphics-to-deployment, preview-approval, or separate production-permission stops. Engineering tests are validation only: pass means continue; an in-scope defect means fix, rerun, and continue.

## Required closeout

Static and integration QA → focused preview/browser verification → exact tested build promotion → production smoke → rollback/accepted baseline → coordination receipt → management/owner log update → CLOSE.
