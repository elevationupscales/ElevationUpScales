# Elevation UpScales — PayPal Cart Integration / First-Sale Revenue Directive

**Owner:** Casey Young  
**Date:** 2026-09-11  
**Status:** ACTIVE / BIG IDEA / FIRST-SALE REVENUE PRIORITY  
**Authority:** Owner direct direction; subordinate to Master S.O.P. V1.0 and current payment/security controls.

## Mission

Make the first direct Elevation website sale as quickly and safely as possible while preserving a working checkout path.

**Revenue rule:** do not hold valid customer purchases merely because the preferred PayPal cart integration is still being improved. Native Shopify checkout may continue accepting supported payment methods while PayPal integration is evaluated and implemented in parallel.

The temporary startup-revenue phase remains open until Hybrid Management verifies the first Elevation website order paid through PayPal, unless Casey explicitly supersedes that close condition.

## Verified starting point

- Shopify storefront password protection has been lifted by Owner.
- Native Shopify storefront is publicly accessible.
- Live QA reached native Shopify checkout using `VEVOR 50A RV Power Outlet Box — NEMA 14-50R` at `$34.90` without a checkout blocker.
- The observed native checkout exposed card payment and Shop Pay; PayPal was not observed in that QA path.
- The separate custom Elevation checkout remains a parallel repair lane where prior QA exposed `Checkout item is unavailable` / cross-origin behavior. That defect must not unnecessarily disable the working native Shopify checkout.

## Owner routing — RECON-led parallel cart initiative

Casey has directed that RECON take point on adding the PayPal shopping-cart capability to the Elevation home site while the rest of company work continues.

This is a **parallel P0 revenue initiative**, not a company-wide stop-work gate.

To remain compliant with the Operating System S.O.P.:

- **RECON owns:** current-state inspection, PayPal documentation/architecture comparison, requirements reconciliation, existing-checkout conflict detection, security/credential checks, acceptance criteria, regression checks, and the final reconciliation/verification packet.
- **MASTER DEVELOPER / Commerce lane owns:** code changes, branches/PRs, checkout/cart implementation, server-side order-create/capture integration, deployment candidate construction, and technical release execution.
- **Shopify / Ecommerce execution owns:** native Shopify configuration and merchandising work that does not require custom-site code.
- **Vendor Project Managers own:** authoritative SKU, price/MAP, availability, shipping, backorder/preorder, warranty and fulfillment facts for their suppliers.
- **Operating System Project Manager / Company Operations owns:** priority, routing, cross-project coordination, owner gates, and final workboard state.

RECON must not become a competing developer or second project manager. It may drive the initiative, identify the exact technical delta and verify the result, but code execution remains routed through the established technical lane.

**Parallel-work rule:** VEVOR, SOK, Renogy, Kingboss, Shipping & Logistics, vendor onboarding, catalog activation, email operations and other clean worktrees continue while the PayPal cart initiative advances. A blocker inside the cart project blocks only the affected cart sub-item unless the blocker is a real security, payment-integrity, legal or production-safety issue.

## 2026 PayPal path split — controlling implementation direction

Current official platform guidance requires two different PayPal lanes:

### A. Native Shopify checkout — PayPal Wallet

For U.S. Shopify merchants, PayPal Express Checkout is not the current native route. Shopify directs U.S. merchants to **PayPal Wallet through Shopify Payments** when offering PayPal in Shopify checkout.

Therefore:

- do not spend development time trying to force legacy PayPal Express Checkout into the U.S. Shopify checkout;
- verify whether PayPal Wallet can be enabled in the store's Shopify Payments configuration;
- only the authorized store owner should make the protected payment-setting change;
- keep cards/Shop Pay live while PayPal Wallet is evaluated or enabled.

### B. Elevation custom website/cart — PayPal JavaScript SDK v6

For Elevation-owned custom cart/checkout surfaces, current PayPal developer guidance favors **JavaScript SDK v6** for new integrations.

Target pattern:

**CUSTOM CART → SERVER CREATE ORDER → PAYPAL UI / APPROVAL → SERVER CAPTURE → DURABLE ELEVATION ORDER RECORD → FULFILLMENT ROUTING**

The browser must never be trusted to set the final payable amount. The server must re-resolve and validate SKU, quantity, price, shipping, supplier eligibility and any applicable fulfillment restrictions before creating the PayPal order.

## BIG IDEA — PayPal Cart Integration

Evaluate and implement PayPal's business/developer shopping-cart integration as a direct Elevation commerce option where it improves conversion and preserves correct order capture.

The Owner currently has the PayPal business coding/cart documentation open for implementation review.

### Required architecture outcome

**PUBLIC PRODUCT → CART → VERIFIED PRICE / SELLABILITY / FULFILLMENT → PAYPAL OR WORKING CHECKOUT → ORDER RECORD → PROJECT / FULFILLMENT ROUTING**

### Guardrails

1. Never expose PayPal client secrets, API secrets, tokens, or credentials in Git, browser-visible code, email, or public documentation.
2. Do not replace or disable a currently working native Shopify checkout until the PayPal cart path passes isolated acceptance.
3. Do not invent supplier stock, MAP, shipping, tax, or fulfillment facts to make a product purchasable.
4. Supplier-specific rules remain controlling: SOK backorder support is distinct from Renogy exact-SKU delayed-order rules and VEVOR has no verified blanket preorder authorization.
5. Payments must create a durable order/fulfillment record before the company treats the purchase as operationally accepted.
6. Test without placing an unnecessary real order; real payment occurs only through a legitimate customer purchase or explicit owner-authorized test.
7. Continue selling through any verified working Shopify payment path while PayPal integration is built.
8. Treat Shopify PayPal Wallet enablement and custom PayPal v6 cart development as separate work items sharing one revenue objective; neither should unnecessarily block the other.

## Fast-money merchandising strategy

Prioritize a small launch set of verified, low-friction products rather than trying to advertise the entire catalog at once.

Initial VEVOR candidate lane should favor products approximately `$30–$100` that have fresh supplier evidence, broad RV/off-grid utility, clear customer intent, and simple fulfillment. Examples already present in Shopify include RV electrical, leveling, charging, solar, water-pump and utility products.

Before promotion, each candidate must pass:

**LIVE SKU → LIVE PRICE/MAP → SUPPLIER SELLABILITY → SHIPPING/FULFILLMENT BASIS → PUBLIC PRODUCT → CART → CHECKOUT**

Products that fail one gate stay out of the launch set without blocking clean products.

## Work sequence

1. Keep native Shopify checkout available.
2. RECON inspects the current Elevation home-site checkout/cart code, current PayPal documentation and existing order-record path; it returns the smallest safe technical delta rather than redesigning commerce.
3. Run fast-revenue RECON across active Shopify inventory and rank products by purchase friction, price, margin confidence, supplier availability and fulfillment confidence.
4. Verify the first 5–10 launch SKUs immediately before merchandising.
5. In Shopify, verify the current Shopify Payments / PayPal Wallet eligibility and configuration path; do not assume legacy PayPal Express applies in the U.S.
6. For Elevation custom checkout, compare the current implementation against PayPal JavaScript SDK v6 and server-side Orders create/capture requirements.
7. Route the exact technical implementation to MASTER DEVELOPER / Commerce; build and test in isolation without regressing working Shopify checkout.
8. RECON validates product → cart → payment handoff → durable order capture, plus security and regression controls, before production acceptance.
9. Push free/owned traffic only to products with a proven purchase path.
10. On first real website order, route fulfillment immediately and record the source, payment method, supplier SKU, fulfillment state and actual exceptions.
11. The startup-phase PayPal close condition is satisfied only by a verified Elevation website order paid through PayPal.

## Management routing

Initiative lead / reconciliation: **MASTER RECON / assigned RECON worker**.  
Primary control: **Operating System Project Manager / Company Operations**.  
Technical integration: **MASTER DEVELOPER / Commerce lane**.  
Inventory and supplier truth: **applicable Vendor Project Manager**.  
Store merchandising: **Shopify / Ecommerce execution worker within verified supplier controls**.

## Close condition

This BIG IDEA remains ACTIVE until both are true:

1. Elevation has a repeatable direct-site cart/checkout/order-routing path that does not depend on unsafe manual workarounds; and
2. the first verified Elevation website PayPal order is received and routed into fulfillment, satisfying the current startup-phase close condition.
