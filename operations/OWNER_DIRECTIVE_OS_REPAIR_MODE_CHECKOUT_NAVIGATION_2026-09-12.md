# ELEVATION UPSCALES — OWNER DIRECTIVE — OS REPAIR MODE / CHECKOUT + NAVIGATION

**Date:** 2026-09-12 MDT  
**Owner:** Casey Young  
**Status:** ACTIVE / P0 CRITICAL / CUSTOMER PURCHASE PATH FIRST  
**Reports through:** Project Manager / PM4  
**Operations coordination:** Company Operations Manager / COM 2  
**Technical execution:** MASTER DEVELOPER  
**Shopify execution:** Shopify Store Operations owning lane  
**Integrity verification:** MASTER RECON OS  
**Related incidents:** GitHub Issue #65; GitHub Issue #147

## Owner decision

The website is now in **OS REPAIR MODE** because customer purchase-path evidence has escalated the storefront from unstable to critical.

Until this incident is stabilized:

**CUSTOMER NAVIGATION + CHECKOUT + TRUST REPAIR OVERRIDES PROFITABILITY GATING AS THE P0 SEQUENCING CONTROL.**

Existing profitability records, source-cost evidence and prior commercial decisions remain historical/operational evidence. They are **not deleted**. However, margin scores, profitability thresholds, promotion classifications and working-capital gates must not prevent the team from diagnosing or repairing customer navigation, product discovery, cart, checkout, payment-path, order-record or trust failures.

This directive does **not** authorize knowingly taking loss-making orders, deleting economics records, reopening paid acquisition, or bypassing supplier/order obligations. It removes profitability gating as the blocker to technical/customer-path repair.

## Verified incident evidence at activation

Company Operations verified all of the following before this directive was recorded:

1. a real customer independently reported that checkout was not going through;
2. Shopify analytics showed customers reaching checkout with no completed checkout in the current-day funnel at the time of review;
3. the canonical Elevation site and Shopify store currently expose more than one purchase architecture, including Elevation custom PayPal checkout and Shopify checkout;
4. the Elevation custom SOK checkout renders a complete guest contact/shipping form and PayPal checkout surface at the tested stage;
5. Shopify checkout also renders a guest checkout, but Shop account/remember-me language can create avoidable account-signup friction even though a `Not now` path exists;
6. a tested Shopify product could be `ACTIVE` in Admin while its direct Online Store handle did not resolve to a product detail page, proving that `ACTIVE` must not be treated as equivalent to customer-public/buyable without publication/path verification;
7. the canonical homepage currently exposes at least one malformed duplicate heading in live output (`SOLUTIONSOLUTIONS` class);
8. public store copy still contains operational/source-control language that should be simplified under the public-copy firewall;
9. separate email messages claiming large rejected-order counts were not from official Shopify domains and must not be used as the factual incident count. The P0 is supported independently by live platform/customer evidence.

No payment was submitted during this audit.

## P0 repair order

Until PM4 changes the sequence, execute in this order:

1. **NAVIGATION** — every intended customer store/product CTA resolves to the intended live customer surface;
2. **PRODUCT DISCOVERY / PUBLICATION** — public/buyable state is verified independently from Admin `ACTIVE` status;
3. **CART** — intended add-to-cart/direct-buy paths create the correct exact product/variant state;
4. **GUEST CHECKOUT** — a customer can proceed without believing a Shop/customer account is mandatory;
5. **SHIPPING + PAYMENT PATH** — shipping method and payment UI load for valid Lower-48 test cases without submitting payment during QA;
6. **ORDER RECORD INTEGRITY** — successful customer payment can create a durable order record through the intended owning system;
7. **TRUST / PUBLIC COPY** — remove malformed headings, raw internal OS/developer/source-state language and confusing operational explanations from ordinary customer surfaces;
8. **MOBILE + DESKTOP ROUTE SWEEP** — verify the same purchase contract across primary device paths;
9. **DEPLOYMENT VERIFICATION** — compare the exact pre-deploy and post-deploy customer surfaces and preserve an exact-SHA production receipt;
10. **MAKE SALES** — once a purchase path is verified, resume owned/free customer traffic to valid public products and measure completed orders rather than checkout starts alone.

## Hard controls still in force

OS REPAIR MODE does not authorize a broad rebuild.

- **No wholesale `main` deployment.**
- **No blind fast-forward / force update.**
- **No unrelated redesign or feature expansion.**
- **Protected homepage top remains owner-controlled.** Repair may stop unauthorized shared-code mutation of the protected top, but any new intended top-homepage experience still requires Casey authorization.
- **Preserve working checkout paths while repairing broken ones.** Do not take down the functioning Elevation custom PayPal path merely because Shopify is being repaired.
- **No payment submission in smoke tests.**
- **No paid acquisition reopening by implication.** Existing owner paid-acquisition lock remains unless separately lifted.
- **No vendor/channel worker independently patches website runtime.** Technical changes stay with MASTER DEVELOPER through the recovery lane.

## Shopify-specific repair requirements

The Shopify owning lane must return customer-path evidence, not only Admin status.

For each primary Shopify offer tested, verify:

**PUBLIC URL → PRODUCT DETAIL → EXACT VARIANT → CART/DIRECT BUY → GUEST CHECKOUT → SHIPPING METHOD → PAYMENT METHOD → PLACE-ORDER READY STATE**

without placing a test order unless Casey separately authorizes a controlled transaction.

`ACTIVE` alone is insufficient. Record Online Store publication/customer visibility and working path separately.

Account/sign-in/Shop Pay features may exist, but the ordinary customer path must not imply that account creation or Shop sign-in is required to buy.

## Company Operations audit responsibility

COM 2 will:

- reconcile real customer/platform evidence from spoofed or unverified messages;
- scan customer-facing trust/navigation before and after each authorized production deployment;
- report exact blocker deltas to PM4 and the owning execution lane;
- preserve working order/payment paths;
- verify live output after deployment;
- keep unrelated vendor/company work moving where it cannot interfere with P0 repair.

COM 2 does not become the website developer.

## Repair acceptance

The site may be downgraded from **CRITICAL** only after all of the following are proven:

1. primary customer navigation paths resolve correctly;
2. at least one intended Shopify product path reaches guest checkout through the correct variant;
3. at least one intended Elevation custom checkout path remains healthy;
4. valid shipping/payment UI is reachable without mandatory account creation;
5. no known malformed/duplicated trust-critical headings remain on audited primary surfaces;
6. internal OS/developer/source-control wording is absent from audited ordinary-customer surfaces;
7. tested products marked buyable are actually customer-public and route-correct;
8. desktop + mobile audits pass for the tested primary sale paths;
9. post-deploy live verification matches the accepted candidate/receipt;
10. PM4 / Company Operations / MASTER RECON have enough evidence to classify the purchase path STABLE rather than merely rendering.

## Control phrase

**REPAIR NAVIGATION → PROVE PUBLIC PRODUCT → PROVE CART → PROVE GUEST CHECKOUT → PROVE SHIPPING/PAYMENT → PROVE ORDER PATH → CLEAN TRUST → VERIFY DEPLOYMENT → MAKE SALES.**