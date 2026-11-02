# Shopify-first company website — 2026-11-02

Owner direction: keep elevationupscales.com simple: company information, Hawaii lithium freight information, domain and a direct path into the Shopify store. Shopify is the sole ecommerce/catalog/checkout/order authority. Legacy site portal, standalone checkout and lead-generation flows should be retired carefully, not simply hidden without reviewing historical data.

## Verified evidence and incident attribution
- The Kauai customer reported a failed SOK Purchase Options submission on the primary website. Cloudflare-side site/sok-full-line-runtime.js had an excess SQL placeholder in the eus_sok_customer_reservations INSERT. GitHub source PR #309 fixed it; PR #311 adds release regression checks. This was not a Shopify checkout operation. A separate Shopify checkout failure has not been established for this incident.
- Connected Shopify Admin already has the SK12V100PC product, $319, ACTIVE with zero recorded units and Mainland-Only tag, and separate Hawaii 1/3/6/9/12-pack SK12V100PC Shopify products. These do not prove purchase availability, hazardous-goods delivery eligibility or an active Hawaii four-pack. Do not fabricate or duplicate listings.
- Main homepage already uses Shopify links. site/store.html plus Worker catalog/checkout modules still present a competing ecommerce route. Hawaii information page links to the custom SOK reservation form. site/_redirects sends several historic storefront routes into /store. site/site-shell.js contains separate project/solar lead menus and a Start a Project global CTA.
- Main website API health returned healthy DB status, which does not exercise the customer purchase-request INSERT. Git source merge does not confirm production deployment.

## Target: one store, one company site
Primary domain keeps home, company details, specialty freight information, privacy and terms. Shopping links go to https://shop.elevationupscales.com/. Shopify handles catalog, stock, carts, shipping zones, tax and payment. Hawaii lithium freight stays an informational/support route; specialized quotes may use the approved manual quote workflow. Do not replace it with unqualified battery checkout or claim carrier acceptance.

## P0 owner visual freeze — exact homepage preservation
- Preserve the existing elevationupscales.com homepage **exactly as it currently appears**. Do not change the homepage layout, sections, imagery, colors, typography, text, navigation, header, footer, buttons, CTA positioning, responsive/mobile appearance, or behavior as part of this restructure.
- In particular do **not** alter `site/index.html`, shared `site/site-shell.js`, associated homepage CSS/JS/assets, or their rendered output. Existing storefront links, Hawaii freight information and company content stay visible and unchanged.
- The initial header/CTA proposal was explicitly **withdrawn and reverted**. The `site/site-shell.js` blob on the working branch is now byte-for-byte identical to `main` as of the rollback. Do not reintroduce the navigation change.
- Only perform **nonvisual, backward-compatible backend/domain/redirect dependency analysis and staged retirement** until owner separately requests additions. A change that could alter rendered HTML, routing for existing homepage links, or homepage behavior is out of scope.
- Before any site deployment, compare homepage desktop/mobile screenshots against the current accepted production baseline, verify primary links and Hawaii contact paths, and stop/rollback on any difference. Do not claim pixel-perfect equality until tested.

## Phase 2 — consolidate public commerce destinations, separate PR
- Audit /store, /rv-store, /lithium-batteries, /marketplace, /product, /checkout, /custom-order and all retired sales paths. Confirm current consumers and preserve successful external backlinks.
- Point browsing to matching verified Shopify pages/collections with safe 301 or 308 rules and no loops. Check Cloudflare Pages redirects against runtime route precedence; no blind redirect of order receipt paths.
- Decommission duplicate local catalog, PayPal-based checkout, customer-facing inventory and self-managed order page only after identifying outstanding orders and replacing valid payment links.

## Phase 3 — Hawaii/customer contact
- Keep freight route, island pickup explanation, supplier/cargo safety qualifications, FAQ and accessible contact.
- Test the actual Shopify support/contact form and notification delivery. If uncertain, use existing public email support@elevationupscales.com as the working route until a single proven form exists.
- A customer requesting specialty freight should not depend on a second bespoke site sales database to contact Elevation. No active customer order/quote should be dropped.
- Do not create unsupported Hawaii rates or force Hawaii stock in Shopify.

## Phase 4 — remove legacy portal and lead backend
- Inventory site/_worker.js imports, legacy admin endpoints, D1 databases, inventory manager, marketplace seller flows, solar lead builder, older forms, PayPal code, email automation and third-party callers.
- Verify which flows are still in actual use, export or preserve historical records privately, preserve redirects and recovery procedures. No credentials, customer PII or sensitive supplier costs in this Git repository.
- Retire public legacy and backend modules in independently verified batches, retaining only minimum Cloudflare static hosting/HTTPS/routing and any critical temporary compatibility.
- Retain OS3/StarNet management in its own Git/runtime boundary rather than as a public storefront administration service.

## Acceptance criteria
One public Shopify store; main domain is informative and lightweight; public shopping routes point to Shopify; Hawaii information and contact work; no retired PayPal customer checkout links; no dual prices or duplicate inventory; past customer/order records secured; desktop and mobile navigation, SEO redirects, form/contact notifications and representative purchase journeys verified. Use exact SHA preview and production receipt per CODING-WORKFLOW.md; rollback if an actual customer path breaks.

Source P0: https://github.com/elevationupscales/ElevationUpScales/issues/310
