# ELEVATION UPSCALES — COM2 CURRENT STORE / CHECKOUT / VENDOR INTAKE AUDIT RETURN

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Role:** Company Operations Manager / COM2  
**Reports To:** Operating System Project Manager / MPM5  
**Status:** ACTIVE AUDIT RETURN / INPUT TO MPM5 — NOT A PARALLEL MANAGEMENT PLAN  
**Baseline inspected:** `main` @ `69faaf47fed94b25bc2b8151ca04db7a51ed9f61`  
**Production checkout branch inspected:** `production-deploy` @ `4da62160a5d9250a1d977a42052644798fac0b40`

## OWNER DIRECTION ADOPTED

Effective for COM2 routing:

**PAUSE NEW ITEM LISTINGS / BULK PUBLICATION / NEW CHANNEL EXPANSION.**

Foreground sequence:

**CLOSE SHOPIFY PAYMENT/PURCHASABILITY WORK → AUDIT/REPAIR CURRENT ELEVATION STORE + CART/CHECKOUT → VERIFY PAYPAL APP/PAYMENT RESILIENCE → AUDIT CURRENT VENDOR CHANNELS → AUDIT VENDOR INTAKE → VERIFY CURRENT PURCHASE/FULFILLMENT PATHS → RESUME LISTING EXPANSION ONLY WHEN MPM5/OWNER REOPENS.**

Functional checkout/payment repair is not blocked by profitability scoring. Product identity, legal/compliance restrictions, exact fulfillment impossibility and special-destination safety controls remain valid gates.

No production code, product listing, payment credential, customer order, vendor record or protected homepage-top mutation was changed by this audit.

---

# 1. SHOPIFY CLOSE GATE

Shopify remains the owning lane until its existing-shop payment/purchasability work is verified closed.

Current management state already proves:

- 103 ACTIVE Shopify records;
- 53 Online Store public;
- 50 hidden VEVOR records are an **intentional staging hold**, not a publication outage;
- the 50 staging records must not be bulk-published;
- Shopify Payments latest verified account state remains `Complete setup` until current authorized owner/platform evidence proves completion.

COM2 pickup after Shopify close:

**SHOPIFY CLOSED/PASS → MAIN-SITE CHECKOUT BECOMES FOREGROUND P0 CONVERSION WORK.**

---

# 2. LIVE ELEVATION PAYPAL STATE — CONFIGURED / LIVE

Live public configuration endpoint verified:

`https://elevationupscales.com/api/store-checkout/config`

Current runtime reports:

- PayPal credentials configured;
- checkout enabled;
- live checkout approved;
- PayPal environment = **live**;
- currency = USD.

Do **not** rebuild PayPal from scratch merely because the checkout beta looks unfinished.

The PayPal Developer dashboard is authenticated/open in the current browser, but the browser connector explicitly blocks AI page reading/screenshots on that PayPal Developer surface. Therefore app-level webhook/capability/configuration inspection remains an exact authenticated-human/tool-access gate; credentials must never be copied into Git or chat.

---

# 3. PAYMENT/ORDER BACKEND — PRESERVE

Current `main` retains a server-authoritative Elevation checkout architecture:

- `/api/store-checkout/quote` recomputes current price/shipping/product state server-side;
- `/api/store-checkout/orders` creates the PayPal order server-side;
- `/api/store-checkout/orders/{PayPalOrderId}/capture` captures payment server-side;
- PayPal client secret remains server-side;
- same-origin POST protection is enforced;
- checkout CSP is scoped for PayPal;
- durable `eus_store_orders` order state is created before capture;
- capture ID/status/paid time are written to durable order storage;
- Hawaii/Alaska/freight and availability gates are preserved;
- live mode is independently gated by checkout approval configuration.

Disposition:

**PRESERVE CORE PAYMENT SECURITY/ORDER AUTHORITY → REPAIR UX/RESILIENCE/LINEAGE AROUND IT.**

Do not replace server-authoritative pricing with browser-supplied totals.

Payment resilience still requires bounded verification of webhook/reconciliation behavior, retry/idempotency and post-capture recovery when the browser closes or loses network. No categorical claim is made here that a PayPal webhook is absent; current repo search did not produce one and the exact app configuration cannot be inspected through the present PayPal Developer browser access.

---

# 4. P0 RELEASE-LINEAGE CONFLICT — RECON REQUIRED BEFORE CHECKOUT DEV

`production-deploy` and `main` are materially diverged.

Production contains the direct-buy Card/Shop Pay hotfix at:

`4da62160a5d9250a1d977a42052644798fac0b40`

Current `main` does not contain the same checkout hotfix state.

The live production checkout currently exposes:

- PayPal;
- Card / Shop Pay link;
- a hardcoded Shopify bridge for the exact SOK `SK12V100PC` Shopify variant;
- special-destination suppression for HI/AK.

The compare state between production and current main is **diverged**, not a simple forward-only lineage.

Risk:

**A checkout patch built only from current `main` can silently remove or overwrite production-only payment behavior.**

Routing:

**MPM5 → MASTER RECON integrity/release gate → reconcile exact checkout lineage → only then admit a bounded DEV repair.**

No blind `main` deployment, wholesale production merge, force update or stale branch deployment is authorized by this return.

---

# 5. CURRENT CHECKOUT UX / CONVERSION DEFECTS

The live Elevation checkout works as an item-specific secure checkout, but the customer experience is fragmented and visually unfinished.

Verified current defects/gaps:

1. **No unified Elevation cart exists.** Current Elevation flow is product → `Buy Now` → item-specific checkout. The production Card/Shop Pay hotfix uses a Shopify cart deep-link for one SOK SKU; this is not a general Elevation cart.
2. **Split payment systems:** PayPal completes through the Elevation order system while Card/Shop Pay leaves for Shopify. This produces two purchase/order paths.
3. **Duplicate-data friction:** customers can enter name/address/contact in Elevation and then select Shopify, where checkout requires customer information again.
4. **Checkout item verification is too thin:** current checkout visibly provides product image/title/price/option but does not provide the meaningful description/spec verification Casey requested.
5. **No obvious `View product details` / `Back to product` control inside checkout.** The current top link returns to Store instead of the exact product.
6. **Generic `/product?...` detail routing is not reliable in production:** tested URL redirected to the Store rather than rendering the intended generic detail page.
7. **Dedicated SOK product detail route works** and contains useful human-facing model/spec/features/literature content. This proves the information exists and can be linked from checkout without exposing internal process language.
8. **Stale promotion assets/UI remain in the checkout code** despite the live promotion window being expired. Current checkout should not make expired campaign machinery part of the ordinary purchase experience.
9. **Public trust copy still includes process/supply-chain wording** that reads like internal operating logic rather than retail copy. Customer surfaces should use human retail language only.
10. **Payment presentation can overstate readiness** if Card/Shop Pay remains advertised before Shopify Payments is fully verified complete.

## Checkout customer target

A repaired checkout should make these items obvious before payment:

- product image;
- human product title;
- model/SKU;
- selected option/variant;
- quantity;
- unit price;
- merchandise subtotal;
- shipping/destination treatment;
- total;
- concise customer-safe description;
- 3–6 useful verified specs/features;
- `View product details` / `Back to product` link;
- shipping timing/state when applicable;
- returns/warranty/policy links or concise summary;
- Elevation support contact;
- clear guest purchase path;
- one understandable payment area;
- no AI/ops/dev/source-control terminology.

A true multi-item cart is a separate architecture decision. Do not build it automatically simply because the current checkout is item-specific. MPM5 should decide whether direct-buy remains the simpler controlled path or whether cross-vendor cart behavior is worth the additional order-source/fulfillment complexity.

---

# 6. PAYPAL MODERNIZATION DISPOSITION

Current Elevation PayPal integration is live and functional at the configuration/core-code level. Modernization should be evaluated **after** exact current-path verification, not used as a reason to discard working payment controls.

Candidate target for MPM/DEV evaluation after lineage reconciliation:

**ONE ELEVATION CHECKOUT → SERVER-AUTHORITATIVE ORDER → PAYPAL/ELIGIBLE PAYMENT METHOD → DURABLE ORDER → FULFILLMENT OWNER → CUSTOMER CONFIRMATION.**

This should be compared against continuing a separate Shopify Card/Shop Pay bridge.

Any PayPal SDK/card-field modernization must preserve server-side create/capture, secret isolation, durable order recording, exception gates and sandbox/preview verification before production.

---

# 7. CURRENT VENDOR / CHANNEL AUDIT — NEW LISTINGS PAUSED

Current-channel tuning continues; expansion does not.

| Lane / Channel | Current disposition during pause |
|---|---|
| Elevation direct website | **P0 AUDIT/REPAIR after Shopify close** — purchase path, item truth, checkout, PayPal, customer copy |
| Shopify Online Store | **FINISH/CLOSE FIRST** — existing 53 public, 50 VEVOR staging hidden |
| Shopify Shop | Existing-surface eligibility/configuration work only; no expansion count goal |
| Microsoft Copilot | Preserve current surface; VEVOR permission/authorization gate must be resolved before relying on broad exposure |
| eBay | Dedicated worker continues customer/cash/stop-loss recovery; COM2 does not duplicate mutations |
| TikTok Shop/Affiliate | Tune existing restricted shop/catalog/commission exposure; failed appeal not replayed |
| Fourthwall | Tune existing 29 products/native POD; no mass migration/new storefront |
| SOK | Protected existing supplier/direct-site lane; dedicated product-detail/purchase controls preserved |
| VEVOR | Existing released products + hidden staging only; no new broad publication |
| Renogy | Existing direct-site lane only under current authorization; no marketplace broadening |
| Kingboss | Current proving/authorization/compliance work only; no broad listing release |
| Doba/CJ/other source lanes | Existing gap-fill/reconciliation only; no speculative catalog build |

Control:

**REPAIR WHAT IS ALREADY SELLING/EXPOSED BEFORE ADDING MORE ITEMS.**

---

# 8. VENDOR INTAKE AUDIT

Current generic `commerce-intake` flow is fundamentally safe because it is review/staging oriented:

- preview is non-mutating;
- apply stages candidates for review;
- auto-publish = false;
- auto inventory write = false;
- auto price write = false;
- intake classification is `INTAKE / REVIEW`;
- applying intake does not automatically publish a customer listing.

Current generic intake registry includes Doba, CJ, SOK, Fourthwall, Printful, SpreadConnect, Shopify, eBay and TikTok.

Systemic process gap:

**VEVOR, Renogy and Kingboss are active managed vendor lanes but are not represented in the generic intake registry.**

That does not invalidate their current vendor Project SOPs, but it demonstrates fragmented intake governance.

The generic canonical intake fields also do not explicitly standardize several controls now required for a clean company-wide vendor-to-sale path.

MPM/vendor-process reconciliation should require, where applicable:

- owning Vendor Project;
- supplier/channel authorization scope;
- direct-site vs marketplace permission;
- exact SKU/model/variant identity;
- source timestamp/freshness;
- current stock/orderability/backorder state;
- current price/MAP/floor control;
- supplier cost/landed-cost state;
- shipping regions / freight / DG class;
- fulfillment owner;
- warranty and RMA/returns state;
- media source/rights/provenance;
- customer-safe description/spec readiness;
- exact purchase/payment path readiness;
- publication state distinct from product source state;
- traffic/promotion clearance state.

Target intake chain:

**VENDOR AUTHORITY → CHANNEL AUTHORITY → EXACT SKU/MODEL → TRUSTED FACTS → PRICE/MAP → SELLABILITY → MEDIA → SHIPPING/DG → WARRANTY/RETURNS → FULFILLMENT OWNER → CUSTOMER COPY QA → PURCHASE/PAYMENT PATH → PUBLICATION → TRAFFIC.**

During the owner listing pause, no new intake candidate should leave review/staging merely to increase catalog count.

---

# 9. BOUNDED DEFECT PACKETS FOR MPM5 CLASSIFICATION

## Packet A — checkout release-lineage conflict

- **Area:** production checkout vs current `main`
- **Expected:** one reconciled accepted checkout lineage before further DEV work
- **Actual:** production and main diverged; production-only Card/Shop Pay hotfix is absent from current main
- **Impact:** new repairs can regress live payment options
- **Owner:** MPM5 / MASTER RECON release gate
- **DEV:** do not wake until lineage is reconciled and exact accepted source is named.

## Packet B — customer item-verification / navigation

- **Area:** `/checkout/` and product-detail navigation
- **Expected:** customer can verify exact product description/specs and return to exact product before payment
- **Actual:** checkout lacks sufficient description/spec context and exact product-detail link; generic `/product?...` route tested into Store rather than detail page
- **Impact:** trust/conversion failure; customer may abandon rather than pay without verifying the item
- **Owner:** MPM5 classifies after Shopify close; DEV only if admitted.

## Packet C — fragmented payment experience

- **Area:** `/checkout/` PayPal + production SOK Shopify bridge
- **Expected:** simple guest checkout with clear payment choices and minimal duplicate entry
- **Actual:** Elevation form + PayPal coexist with separate Shopify Card/Shop Pay redirect; Shopify path duplicates customer entry and is one-SKU hardcoded
- **Impact:** friction, trust ambiguity, two order/payment systems
- **Owner:** MPM5 architecture decision; Shopify configuration must close first; DEV executes only accepted target.

## Packet D — intake governance fragmentation

- **Area:** vendor/channel intake process
- **Expected:** every active vendor follows consistent authorization → source → publication → purchase-path controls
- **Actual:** generic intake is safe/review-only but excludes VEVOR/Renogy/Kingboss and lacks several explicit authorization/warranty/media/purchase-path fields
- **Impact:** fragmented control, inconsistent handoffs, future listing drift
- **Owner:** MPM5 + vendor managers; this is primarily process/control before code.

---

# 10. ACCEPTANCE GATE BEFORE LISTING PAUSE IS RELEASED

Do not reopen normal new-listing production merely because one payment button renders.

Minimum acceptance:

1. Shopify existing-shop payment/purchasability work is formally PASS/CLOSED or reduced to a known non-blocking state by MPM5.
2. Checkout production lineage is reconciled; accepted parent/source is named.
3. Elevation live checkout preserves server-authoritative pricing/order creation/capture.
4. PayPal live create/capture path is verified without exposing credentials.
5. Payment reconciliation/recovery behavior is verified for interruption/retry scenarios.
6. Customer can view exact item description/specs and navigate back to the exact product before payment.
7. Customer sees one clear payment area without misleading method availability.
8. Special Hawaii/Alaska/freight guards still work.
9. Current public vendor listings/channels are audited for authorization, source, availability, shipping, fulfillment and customer-safe copy.
10. Vendor intake/review process has one explicit control model even if vendor Projects retain specialized source files.
11. Representative desktop/mobile purchase paths PASS.
12. MPM5/Casey explicitly reopens new-listing expansion.

## CONTROL

**SHOPIFY CLOSE → RECONCILE PRODUCTION/MAIN CHECKOUT LINEAGE → PRESERVE SECURE PAYPAL CORE → SIMPLIFY CUSTOMER CHECKOUT → VERIFY ITEM DETAILS BEFORE PAYMENT → TUNE EXISTING VENDOR CHANNELS → NORMALIZE INTAKE CONTROL → VERIFY REAL PURCHASE PATH → THEN REOPEN LISTINGS.**
