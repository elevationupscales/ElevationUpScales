# ELEVATION UPSCALES — MAIN-SITE CART + SECURE CHECKOUT P0 REPAIR

**Date:** 2026-09-12  
**Project:** ElevationUpScales.com Commerce / Operating System  
**Reports To:** Operating System Project Manager (MPM5)  
**Execution Owner:** MASTER DEVELOPER — bounded defect repair  
**Acceptance Owner:** MPM5 + Company Operations / COM2  
**State:** P0 ACTIVE — BOUNDED CODE DEFECT CONFIRMED / DEV WAKE AUTHORIZED

## SCOPE

Repair and harden the existing Elevation-owned direct purchase path on `elevationupscales.com`:

**STORE / PRODUCT DETAIL → CART → SECURE CHECKOUT → CANONICAL PRODUCT VERIFICATION → PAYPAL CREATE → PAYPAL CAPTURE → DURABLE ORDER → CONFIRMATION → FULFILLMENT OWNER**

This is a current-store stabilization task. It is not a catalog expansion project.

## OUT OF SCOPE / FROZEN

- No new product listings while this P0 is active.
- No Meta, Google/YouTube, Amazon, Walmart or other new-channel installation/expansion.
- No protected-top homepage changes.
- No broad visual redesign outside cart/checkout surfaces.
- No live payment submission during QA.
- No secrets, PayPal client secret, raw card data or CVV in Git/client code.
- Do not replace working Shopify/native purchase paths.
- Do not remove the existing Elevation PayPal path while repairing it.
- Do not reopen completed vendor onboarding or unrelated marketplace work.

## CONFIRMED CURRENT FACTS

### 1. There is no real cart in current `main`

Repository inspection found no cart route/module/page such as `cart.html`, `cart.js`, or equivalent basket state implementation. Current `site/universal-store.js` sends an eligible product directly to:

`/checkout/?source=<source>&id=<id>&name=<title>`

The current customer path is therefore **single-item direct checkout**, not a cart.

### 2. Product detail already has richer product information

`site/product.html` + `site/product-detail.js` provide product imagery, current price, shipping presentation, description, specifications, and purchase controls. Checkout does not preserve or expose enough of that context.

### 3. Current checkout UX is too thin for high-consideration purchases

`site/checkout/index.html` presently exposes product image, title, price/option, quantity, coupon, contact/shipping, totals and PayPal. It does not provide a sufficient pre-payment review of exact model/SKU/vendor, meaningful key specifications, warranty/returns, fulfillment expectations, or a clear link back to the exact product-detail page.

### 4. Server-side quote/create protections are valuable and must be preserved

`site/store-checkout-server.js` already re-resolves and validates store source/product state, quantity, inventory/source data, shipping, pricing/promotions, payment eligibility, shipping address and destination controls before PayPal order creation. D1 commerce order storage is required as part of the flow.

Do not replace these protections with client/URL/local-storage pricing authority.

### 5. Capture hardening defect is confirmed

Current `captureStoreOrder()` validates the PayPal-format order ID and immediately calls PayPal capture before proving that the PayPal order ID belongs to an existing local `eus_store_orders` row in an allowed pre-capture state.

After successful PayPal capture, the code updates the local order by `paypal_order_id`. If there is no matching row, PayPal can already have captured while the local update affects no intended order.

Current code also does not require a server-side comparison of captured amount/currency against the intended local order before treating the local record as paid.

`paypalRequest()` generates a new random `PayPal-Request-Id` per helper invocation. Capture retries are therefore not bound to a deterministic local-order-derived request ID under our control.

This does not assert that PayPal will double-charge a completed PayPal order; the defect is that Elevation's own order/capture integrity and retry handling are not strong enough to rely on that assumption.

## REQUIRED REPAIR

### A. Build a real cart

Implement an Elevation-owned cart that supports at minimum:

- add to cart from store and product-detail pages;
- multiple different products where their checkout/fulfillment rules are compatible;
- quantity editing and removal;
- persistent but non-authoritative client cart state;
- product image, exact title, vendor/brand, SKU/model and variant;
- unit price and line total from refreshed canonical server data;
- explicit unavailable/changed-price handling before checkout;
- obvious Continue Shopping and Checkout actions;
- accessible mobile + desktop behavior.

The cart must never become authoritative for price, availability, shipping or payment eligibility. Server-side checkout resolution remains authoritative.

If mixed-source/mixed-shipping checkout cannot safely be completed in this repair, implement the cart with an explicit compatible-order boundary and split incompatible items into clear checkout groups rather than weakening validation.

### B. Upgrade checkout product review

Before payment, show:

- exact product name;
- vendor/brand;
- SKU/model/product ID;
- selected variant/options;
- quantity, unit price and line total;
- primary image;
- concise verified description;
- important verified specifications relevant to the product type;
- current shipping/fulfillment expectation;
- warranty/returns information or an exact policy link where structured product warranty data is not available;
- a prominent **Review full product details** link to the exact `/product?id=...` page;
- a clear path back to cart without losing the basket.

The customer must be able to review item details without destroying cart/checkout state.

### C. Harden PayPal capture integrity

Before sending PayPal capture:

1. Load the local order by `paypal_order_id`.
2. Reject if no local order exists.
3. Verify the order is in an allowed state for capture.
4. Use a deterministic/stable idempotency/request key tied to the local order and operation for the capture call.
5. After PayPal responds, validate the returned PayPal order ID/reference and captured currency/amount against the local intended order before marking paid.
6. Require a completed/acceptable capture status before paid-state transition.
7. Persist capture ID/status/amount/currency and payment evidence atomically enough that an operator can reconcile ambiguity after a network/database failure.
8. Make retry/reconciliation safe after uncertain responses.
9. Log bounded non-secret reconciliation evidence; never log credentials or sensitive payment information.

Also verify create-order persistence behavior. If PayPal order creation succeeds but local persistence fails, do not silently return a normal success. Establish a safe compensating/reconciliation path.

### D. PayPal Developer configuration audit

MPM/COM2 may inspect the authenticated PayPal Developer/account surfaces. DEV must document what the code requires without exposing secrets:

- expected app environment: sandbox vs live;
- client ID/secret binding via environment only;
- `PAYPAL_ENV` behavior;
- `STORE_LIVE_CHECKOUT_ENABLED` behavior;
- correct production app/domain relationship;
- Orders v2 create/capture availability;
- webhook events currently configured, if any;
- whether order/payment reconciliation is relying only on browser capture callback or has server/webhook recovery coverage;
- production return/error behavior.

Do not change live credentials blindly. Any credential/app mutation must be based on authenticated current-state evidence.

### E. Security and trust treatment

Checkout should visually communicate a professional secure purchase without fake security claims:

- clear Elevation identity;
- PayPal presented as the hosted payment provider when PayPal is selected;
- Privacy / Terms / Returns-Warranty access;
- no raw-card collection added to Elevation code;
- no unnecessary third-party scripts;
- graceful payment-cancel/error/retry states;
- no hidden fallback to an unrelated marketplace without clear customer context.

## ACCEPTANCE TESTS

### Cart
- Add one VEVOR non-hazardous product → cart shows correct canonical item.
- Add another compatible product → both lines persist.
- Edit quantity → server-refreshed totals remain correct.
- Remove item → totals update.
- Refresh/back-forward/mobile → cart remains usable.
- Stale/unavailable/changed product is stopped or clearly revalidated before payment.

### Product review
- Each cart/checkout line has exact identity and a working full-details link.
- Full-details review can be opened and buyer can return without losing cart.
- Specs/description displayed are derived from canonical product data, not URL `name` text.

### PayPal
- Sandbox/create test creates a local order and PayPal order with matching total/currency.
- Capture endpoint rejects an unknown PayPal order ID **before** outbound capture.
- Capture endpoint rejects an invalid local state.
- Capture amount/currency mismatch cannot mark local order paid.
- Retry uses stable operation identity and produces a reconcilable outcome.
- Successful sandbox capture produces one durable paid order record with capture evidence.
- Cancel/decline/network failure does not create a false paid order.

### Existing controls
- Lower-48 shipping controls still work.
- Hawaii lithium freight/review controls still prevent ordinary payment where required.
- SOK pre-purchase/backorder timing acknowledgement remains enforced where applicable.
- Protected homepage top remains unchanged.
- Existing product detail and store browse paths remain usable.

## COM2 ROLE

COM2 assists with **production/current-state acceptance evidence**, not duplicate coding:

- inspect live cart/checkout behavior after DEV preview;
- inspect authenticated PayPal Developer/account configuration where access exists;
- return exact pass/fail evidence and screenshots/text state;
- do not independently rewrite the same checkout files while DEV owns the repair.

## DEV HANDOFF PACKET

**Exact paths/components:**
- `site/universal-store.js`
- `site/product.html`
- `site/product-detail.js`
- `site/checkout/index.html`
- `site/store-checkout.js`
- `site/store-checkout-server.js`
- `site/store-checkout.css`
- `site/_worker.js`
- commerce schema/migrations as required

**Expected result:** a real cart plus a trustworthy product-review checkout and hardened PayPal/order integrity.

**Actual result:** no real cart; single-item direct checkout; insufficient product review context; capture endpoint can call PayPal before proving local order/state/expected amount-currency integrity.

**Customer/revenue impact:** elevated abandonment/confusion on high-consideration products and avoidable payment/order reconciliation risk.

**Platform/configuration exhausted?:** The missing cart and capture flow are code defects/omissions in current `main`; operator configuration cannot supply them. DEV wake is authorized.

## CLOSE CONDITION

Close only when:

1. cart exists and passes desktop/mobile acceptance;
2. checkout exposes adequate exact product review and full-detail path;
3. PayPal capture/order integrity tests pass;
4. authenticated PayPal production configuration is verified or any remaining owner-only gate is isolated;
5. preview + production smoke tests pass without a live payment;
6. COM2/MPM acceptance evidence is returned;
7. no protected homepage or catalog-expansion collateral change occurred.

**CONTROL PHRASE:**

**CURRENT STORE FIRST → REAL CART → CANONICAL PRODUCT REVIEW → HARDEN PAYPAL CAPTURE → VERIFY PAYMENT CONFIG → QA → CLOSE → THEN RESUME VENDOR/CHANNEL TUNING.**