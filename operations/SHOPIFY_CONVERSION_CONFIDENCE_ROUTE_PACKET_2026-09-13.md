# SHOPIFY CONVERSION CONFIDENCE ROUTE PACKET — 2026-09-13

**Lane:** Shopify Store Operations
**Owner:** Casey Young
**Store:** Elevation Upscales / Shopify
**Status:** BOUNDED ROUTE — DO NOT REOPEN VERIFIED PAYMENT GATE

## VERIFIED LIVE STATE

- Shopify Payments: **Accepting payments**.
- Shopify Payments: **Receiving payouts**.
- Payout destination ending **6453** verified in authenticated Shopify Admin.
- No payment-specific business-verification / KYC / action-required warning was visible on the Shopify Payments page during the 2026-09-13 check.
- Fresh native checkout smoke: standard credit/debit card + PayPal available; no real payment submitted.
- Current checkout smoke did not render Shop Pay.
- Product-page accelerated checkout already renders PayPal beside Add to Cart.
- Shopify Messaging **Recover abandoned checkout** automation is already **Active**.
- Contact page is live and customer-accessible.
- Microsoft Clarity is not currently visible in the installed Shopify apps list.

## SHOPIFY-OWNED CHANGES COMPLETED

1. Renogy RBM500-US customer copy cleaned. Internal supplier-order/reconciliation language removed; current backorder note, Lower-48 fulfillment, warranty-contact guidance, secure card/PayPal language, and Contact guidance are customer-facing.
2. All 9 current SOK Online Store battery pages cleaned. Internal `Shopify fulfillment / dealer dropship` wording removed and replaced with customer-facing SOK dealer relationship, continental-U.S. shipping eligibility, Alaska/Hawaii exclusion, secure card/PayPal, and Contact guidance. Existing product specs and stated SOK warranty terms were preserved.
3. SK12V314PH preorder statement preserved: supplier currently expects shipment around September 20, 2026; supplier-controlled availability.
4. Live verification passed on representative SOK and Renogy product pages after update. Accelerated PayPal remained live.

## CRITICAL SHIPPING-CONFIDENCE DEFECT — HOLD MUTATION

Authenticated Shopify Admin + Admin GraphQL confirm one default merchant-owned delivery profile currently covers **165 variants** with one broad United States zone, including Alaska, Hawaii, territories, and military regions. Active customer-facing rates currently include generic Standard / free-Standard threshold / Express methods, with Admin displaying broad 3–5 business-day Standard and 1–2 business-day Express expectations.

This profile is not sufficiently precise for current supplier fulfillment truth. In particular, current SOK and Renogy direct-site guidance is Lower-48 oriented, while VEVOR shipping/orderability varies by exact SKU.

**Do not mutate the delivery profile by guessing rates, exclusions, or ETA.** A wrong profile can either overpromise or make legitimate products unshippable.

Required next truth before profile segmentation:
- vendor/SKU eligibility by destination;
- verified shipping charge model;
- verified delivery-time language;
- explicit Alaska/Hawaii treatment per supplier/product family;
- which products may offer expedited service and which may not;
- battery/lithium-specific restrictions that should be enforced versus disclosed.

Once verified, Shopify Store Operations can implement the approved profile structure and re-smoke checkout.

## POLICY TRUST GAP — OWNER / COMPANY OPS APPROVAL REQUIRED

Current Shopify `shopPolicies` contains **Privacy policy** only. No Shopify Refund/Return Policy, Shipping Policy, or Terms of Service record is presently available for the storefront trust layer.

Do not invent legal/commercial terms. Owner / Company Operations must approve the substance. After approval, Shopify Store Operations can publish the Shopify policy records and DEV can surface approved links near the purchase CTA.

## DEV ROUTE — GLOBAL PRODUCT BUY-BOX CONFIDENCE BLOCK

Theme/template placement is a DEV responsibility. Build a compact reusable confidence block immediately adjacent to the price / Add to Cart / accelerated checkout area across customer-facing product templates.

Preserve:
- current Add to Cart;
- current accelerated PayPal/dynamic checkout;
- standard card + PayPal checkout path;
- owner direction: no Shop Pay customer-facing;
- checkout must never be blocked by missing merchandising metadata.

Render only verified product/vendor facts when available:
- supplier/vendor relationship status;
- stock / preorder / backorder state;
- destination eligibility and verified shipping timing;
- warranty owner / stated warranty term;
- approved return/shipping policy links after policy approval;
- `Secure checkout — major cards + PayPal`;
- clear Contact route.

Do **not** render:
- invented inventory;
- invented ETA;
- fake review counts or testimonials;
- supplier logos without brand/media permission;
- generic badges implying authorization not backed by current vendor truth;
- broad discount messaging.

## DOMAIN / IDENTITY TRUST

Current Shopify primary domain remains the `myshopify.com` store domain and current public Shopify product URLs use that domain. DEV / storefront architecture should determine the approved branded-domain presentation without disrupting the existing working checkout path.

## CLARITY ROUTE

Microsoft Clarity is not currently visible as an installed Shopify app. Instrumentation requires app/privacy/analytics authorization and/or theme/pixel implementation outside this worker's mutation lane.

DEV / Owner review:
- add Clarity only through an approved implementation path;
- verify consent/privacy requirements;
- confirm session recording excludes sensitive checkout/customer fields;
- validate recording/heatmap capture on product pages, collection pages, cart, and non-sensitive pre-checkout interactions;
- do not inject unreviewed tracking into the live theme.

## SEARCH / LANDING FINDING

Last-7-day Shopify analytics show Google search is already landing heavily on exact SOK product URLs rather than only the generic storefront. The current problem is not primarily Google landing routing.

Observed Google sessions in the current 7-day window:
- 21 Google-search sessions total;
- 18 landed on exact SOK product pages;
- 3 landed on `/`;
- current Google-search cohort showed 0 cart additions / 0 checkout progression in the queried window.

Priority is therefore **product-page persuasion/trust + shipping clarity**, not adding another traffic source.

## COMMERCIAL GUARDRAIL

No broad discounting authorized. Existing promotions/rates were not changed by this packet. Fix confidence, truth, tracking, and fulfillment clarity before testing any bounded offer.

## PICKUP

**PAYMENT GREEN → PRODUCT COPY CLEANUP COMPLETE FOR SOK + RENOGY ISSUE SKU → SHIPPING PROFILE TRUTH REQUIRED → POLICY LANGUAGE OWNER APPROVAL REQUIRED → DEV BUILDS GLOBAL NEAR-CTA CONFIDENCE LAYER + BRANDED DOMAIN/CLARITY REVIEW → SHOPIFY RE-SMOKES PURCHASE PATH → FIRST REAL ORDER → VERIFY PAYMENT/SKU/SOURCE → FULFILL → RECORD ACTUAL CONTRIBUTION.**
