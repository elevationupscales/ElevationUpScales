# Elevation UpScales — Fourthwall Commerce Integration Current Worktree

**Status:** ACTIVE / EXISTING INTEGRATION RECONCILIATION / DASHBOARD DEVICE VERIFICATION OPEN  
**Date:** 2026-09-12  
**Owner:** Casey Young  
**Parent:** Company Operations / Ecommerce & Vendor Operations  
**Reporting Manager:** Peter Torres — Ecommerce & Vendor Operations Manager  
**Primary Execution Lane:** Shopify Store Operations Worker + MASTER DEVELOPER only for code changes  
**Fourthwall Role:** Apparel / creator-merch catalog + fulfillment provider; not a new vendor Project or duplicate store-management hierarchy

## Owner direction

Begin Fourthwall integration into the current Elevation UpScales operating model.

## Verified baseline

- Existing Fourthwall storefront is live at `https://elevationupscales-shop.fourthwall.com/`.
- Public storefront currently exposes active Elevation merchandise and owner-facing `Edit Page` / `Go To Dashboard` controls in the existing browser session.
- Fourthwall dashboard sign-in is currently stopped at a legitimate new-device verification step tied to the existing Elevation account. Verification email was received; no credentials or code are stored in Git.
- Current `main` already contains Fourthwall commerce integration code; this is not a greenfield build.
- `site/store-config.js` identifies Fourthwall as the store provider and existing Fourthwall storefront.
- `site/store-catalog-resilience.js` fetches the full Fourthwall catalog, normalizes products, renders catalog cards and routes `Buy Now` directly to the Fourthwall product URL.
- `site/store-checkout-server.js` can resolve Fourthwall-backed apparel product data and quote apparel pricing, including the current 20% markup / $7-per-item shipping model.
- The custom PayPal apparel path can create/capture an Elevation PayPal order and persist an `eus_store_orders` record, but current verified code does **not** show an automatic Fourthwall order-creation / fulfillment call after payment capture.

## Integration safety decision

Until an authenticated Fourthwall fulfillment/order API path is verified end-to-end:

**FOURTHWALL-BACKED APPAREL → ELEVATION DISCOVERY / CATALOG → EXACT FOURTHWALL PRODUCT → FOURTHWALL NATIVE CHECKOUT → FOURTHWALL ORDER / FULFILLMENT / SUPPORT.**

Do not intentionally promote a Fourthwall-backed product through Elevation custom PayPal checkout unless the fulfillment step is explicitly proven or an owner-approved manual-fulfillment workflow is documented for that exact product/order.

This protects against collecting customer payment without a reliable provider order being created.

## Integration objectives

1. Complete existing-account Fourthwall dashboard device verification.
2. Inventory current Fourthwall products, variants, live prices, fulfillment types and provider state.
3. Reconcile Fourthwall catalog against current Elevation Universal Catalog; do not create duplicate products.
4. Normalize provider identity as `fourthwall` for Fourthwall-backed apparel/merch records.
5. Preserve source product/variant identity and current Fourthwall product URL.
6. Use Fourthwall native checkout as the production fulfillment-safe path until direct-order automation is proven.
7. Verify Fourthwall order/customer-support responsibilities and current returns/shipping behavior for catalog products.
8. Determine whether the authenticated Fourthwall Developer Platform can support direct order creation/fulfillment from Elevation checkout. If yes, design and test the bridge in isolation before changing production routing.
9. Reconcile Fourthwall-native integrations already in use or available (TikTok Shop, YouTube Product Shelf, Twitch gifting, Meta shopping, etc.) without duplicating current channel ownership.
10. Feed only profit-qualified Fourthwall products into Marketing/Social promotion after exact price/fee/contribution review.

## Known current code surfaces

- `site/store-config.js`
- `site/store-catalog-resilience.js`
- `site/store-checkout-server.js`
- Universal Catalog / provider-link tables, including `eus_catalog_provider_links` provider=`fourthwall`

## Immediate next action

**AUTHENTICATE FOURTHWALL DASHBOARD → READ CURRENT PRODUCTS / ORDERS / PAYOUT / INTEGRATIONS → RECONCILE EXACT CATALOG + FULFILLMENT STATE → RETURN SAFE INTEGRATION DELTA.**

No product, price, payout, domain, integration, order or fulfillment mutation is authorized merely by creating this Worktree.

## Close condition

Fourthwall is integrated as a controlled provider lane with:

- exact current catalog mapping;
- duplicate-free Universal Catalog participation;
- verified checkout/fulfillment routing;
- documented order/support/returns ownership;
- profitability controls;
- first real Fourthwall-backed sale routed end-to-end without manual ambiguity.

## Control phrase

**DISCOVER ON ELEVATION → PRESERVE FOURTHWALL IDENTITY → CHECK OUT ONLY THROUGH A PROVEN FULFILLMENT PATH → VERIFY REAL CONTRIBUTION → SCALE WINNERS.**
