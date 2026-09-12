# Elevation UpScales — Universal Checkout Source Routing Live Receipt

**Status:** PASS / LIVE / SHARED SOURCE-ROUTING DEFECT CLOSED  
**Date:** 2026-09-11 MDT  
**Owner:** Casey Young  
**Lane:** Commerce / Developer / Universal Catalog

## Defect

The universal storefront could classify a product as directly purchasable but generated its Buy Now URL with `source=universal`. The custom checkout accepts the supported commerce source lanes `apparel`, `rv`, and `lithium`; `universal` was not an accepted checkout source. A customer could therefore reach the universal storefront Buy Now action and then fail checkout before the authoritative supplier-specific quote path ran.

## Repair

PR #133 changed only universal-store checkout routing plus regression coverage:

- SOK or `storeSection=lithium-batteries` routes to `source=lithium`.
- Other current universal-store direct-purchase products route to `source=rv`.
- `/checkout/?source=universal` is explicitly rejected by regression coverage from returning to `site/universal-store.js`.
- Supplier-specific safety, stock, shipping, destination, price, payment and delayed-order controls were not weakened.

## Acceptance proof

- PR #133: `Commerce: route universal-store Buy Now into supported checkout lanes`.
- Merge SHA: `97bd22023b0ae02ec5dbc11d6b5cb45ce6f6a7da`.
- Pull Request QA run #89 / run `34664819838`: **SUCCESS**.
- `production-deploy` was set to the exact merge SHA `97bd22023b0ae02ec5dbc11d6b5cb45ce6f6a7da`.
- Production deployment run #40 / run `34664884929`: **SUCCESS**.
- Production validation, canonical QA, secret/artifact guard, Cloudflare deploy, deployed-app smoke and canonical-domain smoke all completed successfully.
- Current public SOK Buy Now resolves through the supported `source=lithium` checkout lane.

## Supplier-control finding

The SOK runtime already uses supplier-specific delayed-order authority (`availability_mode`, purchase mode, management approval, pre-purchase/backorder flags, timing/replenishment evidence and exact commerce identity). No blanket zero-stock bypass is authorized or required.

The shared source-routing defect is closed. Remaining issue #65 work is narrower and must stay supplier-specific:

1. verify Doba current/zero/stale stock state is surfaced to the universal storefront strongly enough to produce the correct Buy Now / Confirm Availability / Out of Stock state while the checkout server retains authoritative exact-stock and shipping checks;
2. when an exact Renogy SKU with verified delayed-order authority is activated, test that exact SKU independently rather than introducing a vendor-wide backorder bypass;
3. keep unsupported unavailable products blocked.

## Control phrase

**UNIVERSAL STORE → SUPPORTED CHECKOUT SOURCE → AUTHORITATIVE SUPPLIER GATE → PAYMENT.**
