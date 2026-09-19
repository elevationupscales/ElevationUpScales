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
2. All 9 current SOK Online Store battery pages cleaned. Internal `Shopify fulfillment / dealer dropship` wording removed and replaced with customer-facing SOK dealer relationship, continental-U.S. shipping eligibility, Alaska/Hawaii exclusion, secure card/PayPal, and Contact guidance. Existing specs/warranties/prices were preserved.
3. SK12V314PH preorder statement preserved: supplier currently expects shipment around September 20, 2026; supplier-controlled availability.
4. Live verification passed on representative SOK and Renogy product pages after update. Accelerated PayPal remained live.

## P0 IMAGE-QUALITY / BLURRY-MEDIA CONVERSION DEFECT — DEV ACTIVE

Owner identified blurry storefront/product imagery as a direct conversion-trust defect. This is now **P0 conversion work** and ranks ahead of optional Clarity/domain polish.

DEV must run a bounded image-quality audit across the active Shopify purchase path, beginning with:
- homepage hero / featured retail imagery;
- SOK and Renogy product-card images;
- product-detail primary media and gallery images;
- any image immediately adjacent to price / Add to Cart / accelerated PayPal;
- vendor/partner visuals used as purchase-confidence evidence.

Classify each defect as one of:
1. weak source asset / insufficient native resolution;
2. wrong image mapped to product/SKU;
3. theme/CSS/container upscaling or distortion;
4. responsive `srcset` / rendered-size selection defect;
5. excessive compression or transformed derivative quality loss;
6. crop/aspect-ratio presentation defect.

Execution rule:
- fix rendering/theme defects immediately;
- use the best **approved, source-correct** vendor/product media already available;
- do not substitute an image from a different SKU/model;
- do not invent or AI-redraw product appearance as a replacement for exact-SKU media;
- do not upscale a weak thumbnail and present it as a sharp product image;
- if no trustworthy higher-quality exact-SKU source exists, record the media hold rather than fabricating a replacement;
- preserve existing checkout, payment, product price/specs, inventory state and supplier truth.

Acceptance standard:
- key product/hero images render sharp at their actual desktop and mobile display sizes;
- no obvious stretched/pixelated primary product media;
- no incorrect SKU imagery;
- intentional crops do not materially cut off the product;
- product galleries remain usable on mobile;
- purchase CTA/payment controls remain intact after theme/media changes.

This image-quality pass may run in parallel with shipping-truth and policy work because it does not require inventing vendor commercial facts.

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

DEV priority inside this route is:
**IMAGE QUALITY / BLUR FIX → BUY-BOX CONFIDENCE BLOCK → BRANDED-DOMAIN REVIEW → CLARITY REVIEW.**

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

Priority is therefore **product-page persuasion/trust + image quality + shipping clarity**, not adding another traffic source.

## COMMERCIAL GUARDRAIL

No broad discounting authorized. Existing promotions/rates were not changed by this packet. Fix confidence, truth, image quality, tracking, and fulfillment clarity before testing any bounded offer.

## PICKUP

**PAYMENT GREEN → PRODUCT COPY CLEANUP COMPLETE FOR SOK + RENOGY ISSUE SKU → P0 BLURRY-IMAGE CORRECTION → SHIPPING PROFILE TRUTH REQUIRED → POLICY LANGUAGE OWNER APPROVAL REQUIRED → DEV GLOBAL NEAR-CTA CONFIDENCE LAYER → BRANDED DOMAIN/CLARITY REVIEW → SHOPIFY RE-SMOKES PURCHASE PATH → FIRST REAL ORDER → VERIFY PAYMENT/SKU/SOURCE → FULFILL → RECORD ACTUAL CONTRIBUTION.**
