# ELEVATION UPSCALES — MPM 5 MULTI-CHANNEL SALES RECON

**Date:** 2026-09-12  
**Role:** MPM 5 / Operating System Project Manager  
**Owner:** Casey Young  
**State:** RECONCILED — MULTI-CHANNEL SALES ARCHITECTURE / PAYPAL DIRECT-PATH PROTECTION  

## Owner direction

Elevation UpScales should not depend on one sales channel. Use multiple complementary channels while preserving a reliable direct purchase path and keeping PayPal available to customers on Elevation-controlled checkout.

## Core rule

**ONE PRODUCT TRUTH → MULTIPLE SALES CHANNELS → CHANNEL-SPECIFIC AVAILABILITY/PRICING WHERE REQUIRED → ONE FULFILLMENT OWNER PER ORDER.**

A product may be ACTIVE in Shopify without being customer-purchasable on a particular channel. Publication/sales-channel state must be verified independently from product status.

## Tier 1 — primary channels

### 1. Elevation direct website + Shopify Online Store publication

**Role:** canonical direct-sales / trust / conversion hub.

- Every `INTENDED PUBLIC` product should be published to the Shopify Online Store sales channel unless an exact source, compliance, shipping, MAP, fulfillment, or strategic hold applies.
- ElevationUpScales.com remains the company-controlled customer experience and must consume the same trusted product truth.
- Direct checkout must preserve PayPal as a working payment path.
- Shopify-native checkout may provide cards / Shop Pay after Shopify Payments setup is fully active, but those methods must supplement rather than eliminate the PayPal option.

**PAYPAL CONTROL:** current production `site/store-checkout.js` contains the dedicated PayPal SDK/order/capture path. Do not remove or subordinate this path merely because Shopify Payments is activated.

### 2. Google & YouTube

**Role:** high-intent discovery / organic shopping acquisition.

- Priority because eligible products can appear in unpaid Google product listings.
- Sync only source-safe, customer-ready products.
- Online Store publication, valid payment provider, policies, shipping, product identifiers and Merchant Center compliance must remain healthy.
- Paid Google advertising remains blocked by the current owner no-paid-acquisition control; free listings are allowed.

### 3. Facebook & Instagram by Meta

**Role:** social discovery / catalog sync / product tagging / website traffic.

- Maintain catalog sync for approved products.
- Use organic posts, product tagging and owned audience first.
- Prefer the Elevation/Shopify website completion path where appropriate so company checkout controls remain available.
- Paid Meta advertising remains blocked by the current owner no-paid-acquisition control.

## Tier 2 — selective native-order channels

### 4. TikTok Shop

**Role:** native social-commerce sales + creator/affiliate engine.

- Keep active because Elevation already has a dedicated TikTok Affiliate Growth lane.
- Publish only exact SKUs whose source, fulfillment, inventory/orderability and contribution economics are cleared for TikTok.
- TikTok can own the customer checkout on TikTok; do not require Elevation PayPal inside TikTok's platform-native checkout.
- The direct Elevation PayPal path must remain available as a separate purchasing option for direct-site eligible products.

### 5. Shop

**Role:** Shopify-native discovery / repeat purchase surface.

- Add/activate after Shopify Payments onboarding is fully complete and Shop eligibility is confirmed.
- Do not treat Shop as the immediate repair for current unpublished products.
- Reconcile product publication intentionally before expanding Shop visibility.

## Existing marketplace lane — preserve but do not broadly couple yet

### 6. eBay

**Role:** marketplace demand / liquidation / validated product sales.

- Keep eBay as a distinct active sales channel under the existing eBay recovery lane.
- Do **not** bulk-connect or bulk-republish the Shopify catalog into eBay while eBay customer/cash/profitability recovery remains open.
- After eBay is stable, Shopify Marketplace Connect may be evaluated for selected SKUs only, with one connector and exact price/inventory/fulfillment controls.

## Parallel specialty channel

### Fourthwall / Apparel

- Preserve Fourthwall as a separate cash-light apparel channel where its native fulfillment is advantageous.
- Do not force Fourthwall products into Shopify merely for channel count.
- Shopify apparel should have one explicit fulfillment owner per SKU to prevent duplicate fulfillment paths.

## Tier 3 — later expansion

### Amazon / Walmart through Shopify Marketplace Connect

Evaluate only after:

1. direct-site publication and payment paths are stable;
2. eBay recovery is stable;
3. exact product identifiers (UPC/GTIN/MPN where required) are clean;
4. supplier orderability and fulfillment are repeatable;
5. marketplace-specific fees still leave positive contribution;
6. inventory/price synchronization cannot create oversells or below-floor pricing.

Do not add marketplaces merely to increase channel count.

## PayPal operating rule

**PAYPAL MUST REMAIN AVAILABLE ON THE ELEVATION-CONTROLLED DIRECT PURCHASE PATH.**

For the United States, Shopify's current native model integrates PayPal as PayPal Wallet through Shopify Payments rather than separate PayPal Express when Shopify Payments is used. Therefore:

1. preserve the existing custom Elevation PayPal checkout now;
2. finish Shopify Payments account setup separately;
3. after Shopify Payments is active, verify PayPal Wallet appears and completes correctly in Shopify-native checkout;
4. do not remove the custom Elevation PayPal path solely because PayPal Wallet becomes available;
5. external native marketplaces such as TikTok/eBay/Amazon may control their own buyer payment methods and are not required to expose Elevation's PayPal checkout internally;
6. an external marketplace checkout must never become the only available purchase route for a product intended to be directly purchasable from Elevation unless the product has an explicit channel-only reason.

## Channel priority matrix

| Priority | Channel | Primary purpose | Payment model | Current management disposition |
|---|---|---|---|---|
| P0 | Elevation direct + Shopify Online Store | Direct conversion / canonical retail | **PayPal protected** + cards/Shop Pay after activation | PRIMARY / REPAIR PUBLICATION FIRST |
| P1 | Google & YouTube | High-intent free discovery | Redirect/native depending Google/YouTube experience | ACTIVATE/VERIFY AFTER PUBLICATION HEALTH |
| P1 | Facebook & Instagram | Organic social catalog + traffic | Website/direct or eligible Meta checkout | ACTIVATE/VERIFY / ORGANIC FIRST |
| P1 | TikTok Shop | Native social commerce + affiliates | TikTok-native checkout | SELECTIVE SKU EXPANSION |
| P1/P2 | Shop | Shopify discovery / repeat buyers | Shopify-native | WAIT FOR SHOPIFY PAYMENTS ACTIVE |
| P0 parallel | eBay | Existing marketplace revenue/recovery | eBay-managed checkout | PRESERVE SEPARATE / NO BULK SYNC YET |
| P1 parallel | Fourthwall | Cash-light apparel | Fourthwall-native | PRESERVE SEPARATE |
| Later | Amazon / Walmart | Marketplace reach | Marketplace-managed checkout | HOLD UNTIL OPERATIONS READY |

## Shopify Store Operations next return

The Shopify Manager should return a channel-by-channel publication matrix for current intended products:

**SKU → ACTIVE STATUS → ONLINE STORE → GOOGLE/YOUTUBE → META → TIKTOK → SHOP → OTHER → PUBLIC URL → VARIANT BUYABILITY → DIRECT PAYPAL ELIGIBILITY → HOLD REASON IF NOT PUBLISHED.**

Do not blindly publish every ACTIVE item everywhere. Channel publication follows exact source, legal/compliance, destination, MAP/price, fulfillment and economics rules.

## MPM 5 disposition

**USE MORE THAN ONE SALES CHANNEL — APPROVED DIRECTION.**  
**DIRECT SITE / ONLINE STORE = CANONICAL CORE.**  
**GOOGLE + META = NEXT ACQUISITION CHANNELS.**  
**TIKTOK = SELECTIVE NATIVE SALES CHANNEL.**  
**SHOP = AFTER SHOPIFY PAYMENTS ACTIVATION.**  
**EBAY = KEEP SEPARATE UNTIL RECOVERY STABLE.**  
**PAYPAL DIRECT PATH = PROTECTED.**

Control phrase:

**PUBLISH CORRECTLY → SELL WHERE CUSTOMERS ALREADY ARE → KEEP DIRECT PAYPAL AVAILABLE → CENTRALIZE PRODUCT TRUTH → ROUTE EACH ORDER TO ONE FULFILLMENT OWNER.**
