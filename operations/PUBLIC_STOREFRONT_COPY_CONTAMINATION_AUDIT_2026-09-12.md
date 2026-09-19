# ELEVATION UPSCALES — PUBLIC STOREFRONT COPY CONTAMINATION AUDIT

**Date:** 2026-09-12
**State:** P0 / OPEN
**Parent control:** `operations/OWNER_DIRECTIVE_PUBLIC_COPY_FIREWALL_2026-09-12.md`

## LIVE VERIFIED CONTAMINATION

The public homepage and store currently expose internal/operational wording that should not be customer-facing.

Examples verified live include:

- `Current lithium and RV & Outdoor products from the live Elevation catalog.`
- `Exact-product, destination and quantity review through the current Purchase Options path.`
- `Controlled logistics review path`
- `Supplier availability is validated before fulfillment.`
- `Supplier inventory is never presented as Elevation physical stock.`
- `Special routes by exception`
- `Kingboss listings shown only when current supplier-backed catalog facts support the retail state.`
- `13 current products · questionable or unavailable listings are protected from direct checkout`
- broken/duplicated homepage heading output: `LITHIUM POWER SHOP BY SOLUTIONSOLUTIONS`
- raw supplier-feed descriptions/titles visible in cards, including `Highlights: 1...` and mechanically truncated text.

## ROOT CAUSE

Customer-facing templates and render functions have been used to explain internal trust, source, supplier, routing, availability, and fulfillment controls.

Recent P0 trust/catalog patches added or preserved operational phrases directly inside public rendering code instead of keeping those controls silent/admin-only. Supplier-feed data is also being rendered too directly without a customer-copy normalization layer.

This produced a mixed public surface containing:

1. real retail copy;
2. internal operating-system explanations;
3. supplier-feed copy;
4. developer/trust-state messaging;
5. duplicated/legacy component text.

## CLEANUP SCOPE

P0 cleanup must:

1. preserve business logic and safety gates;
2. remove internal explanations from customer-visible output;
3. translate required buyer-relevant restrictions into plain retail language;
4. remove trust/quarantine/source-state/routing-state wording from public UI;
5. normalize supplier titles/descriptions before display;
6. remove mechanically truncated junk copy;
7. fix duplicated/broken public headings;
8. keep admin/logging detail available internally;
9. preserve the homepage hero hard lock;
10. avoid broad redesign.

## REQUIRED SURFACES

Audit and clean:

- homepage outside protected hero;
- universal store;
- product detail pages;
- checkout-entry surfaces;
- SOK/Kingboss/Renogy branded storefronts;
- shipping/logistics pages;
- project/intake customer pages;
- footer/help/public status messaging;
- Shopify product presentation where Elevation controls copy/template behavior.

## ACCEPTANCE

Public copy must pass a plain-language review:

- Does this sentence help a customer decide, buy, understand shipping, or get support?
- Would a normal retailer say it to a customer?
- Does it expose internal software/process vocabulary?
- Is it raw supplier-feed language?

If it fails, remove or rewrite it in concise customer language.

**NO INTERNAL OPS/DEV/AI LANGUAGE ON PUBLIC CUSTOMER SURFACES.**
