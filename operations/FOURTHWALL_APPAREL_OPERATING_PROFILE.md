# Elevation UpScales — Fourthwall Apparel Operating Profile

**Effective:** 2026-09-12  
**Owner:** Casey Young  
**Classification:** ELEVATION UPSCALES APPAREL / OWNED SUPPORTING COMMERCE LINE  
**Platform:** Fourthwall  
**Management model:** MANAGERLESS SHARED COMMERCE LANE  
**Operational oversight:** Company Operations / Ecommerce & Vendor Operations — Peter Torres  
**Technical changes only:** MASTER DEVELOPER when routed  
**Current Worktree:** `FOURTHWALL_COMMERCE_INTEGRATION_CURRENT_WORKTREE.md`

## 1. Role in Elevation

Fourthwall is **not** another lithium/solar vendor Project and does **not** receive a dedicated vendor manager.

It is the commerce and print-on-demand fulfillment surface for **Elevation UpScales Apparel**: branded hats, tees, hoodies, outerwear and related merchandise.

The apparel line supports the primary lithium / solar / off-grid business. It should strengthen the brand and generate positive contribution without consuming scarce marketplace fulfillment cash.

## 2. Source-of-truth store identity

Two Fourthwall store containers are present under the account.

### Production / established Apparel store — USE THIS

- Admin store slug: `elevationupscales`
- Public storefront: `https://elevationupscales-shop.fourthwall.com/`
- Current catalog: **29 products**
- Existing order history: present
- Existing social-commerce integrations: present

### Duplicate / empty container — DO NOT USE FOR APPAREL OPERATIONS

- Admin store slug: `elevation-upscales`
- Current state: empty/new container observed during recon
- Do not create, migrate or duplicate Apparel products into this container.
- Do not delete the container without explicit Owner approval.

**Control:** `elevationupscales` is the current Apparel source-of-truth Fourthwall store.

## 3. Verified operating proof

The established store has already completed a real Fourthwall order end-to-end:

**ORDER → FOURTHWALL PRODUCTION/FULFILLMENT → TRACKING → DELIVERY**

The verified historical order was for the `Signature Collection Emblem Tee`.

- customer charge: `$32.37` including shipping/tax;
- merchandise subtotal: `$24.40`;
- Fourthwall-recorded realized profit: **`$1.77`**;
- fulfillment: **Shipped by Fourthwall**;
- delivered successfully.

Customer identity/address details are intentionally excluded from this public-safe operating profile.

### Profitability conclusion

The fulfillment path is proven, but the historical economics are **not acceptable as a recovery target**.

`$1.77` realized contribution on a `$24.40` merchandise subtotal is only about **7.3% of merchandise revenue** before any broader company overhead.

This proves that Fourthwall can remove inventory/pre-funding friction while still producing weak contribution if Elevation prices too close to platform production cost.

## 4. Current example SKU economics

Current `Signature Collection Emblem Tee` configuration:

- base garment: Comfort Colors Garment-Dyed Heavyweight T-Shirt;
- printing/production partner shown by Fourthwall: **Printful (DTG)**;
- produced to order;
- current page indicates orders ship within roughly 3–5 days;
- inventory displayed as unlimited/on-demand.

Current Fourthwall headline `Profit per sale` by size:

| Size | Selling Price | Fourthwall Headline Profit |
|---|---:|---:|
| S | $26.40 | $5.00 |
| M | $26.40 | $5.00 |
| L | $26.40 | $5.00 |
| XL | $29.40 | $8.00 |
| 2XL | $29.40 | $6.00 |
| 3XL | $31.40 | $6.00 |
| 4XL | $33.40 | $6.00 |

The headline platform profit is **not** the final management contribution number. Elevation must rank Apparel using the actual post-order realized profit after payment processing, promotions, refunds/replacements attributable to Elevation, and other seller-funded costs.

## 5. Profitability gate

During company cash recovery, do not promote an Apparel product merely because it is public or shows positive Fourthwall headline profit.

Before owned traffic, social promotion, creator promotion or a discount campaign, verify:

**EXACT FOURTHWALL PRODUCT → VARIANT → SELLING PRICE → PLATFORM/PRODUCTION COST → PAYMENT PROCESSING → PROMOTION/DISCOUNT → SELLER-FUNDED SHIPPING OR OTHER COST → EXPECTED NET CONTRIBUTION.**

### Recovery targets

For intentional promotion, target:

- at least **30% pre-processing gross merchandise margin** where practical;
- at least **20% expected net merchandise contribution after known transaction leakage**; and
- preferably **$8+ expected net dollars per normal apparel order**.

Products below the target may remain live when they are not causing a cash loss, but they should not receive priority traffic until repriced/reconfigured or deliberately approved as a strategic brand item.

After every sale, record actual Fourthwall realized profit and compare it with the expected contribution.

## 6. Promotion stop-loss

Live recon found three Fourthwall promo codes with zero recorded uses:

- `THANKYOU` — 10% off entire order;
- `ELEVATION` — $25 off a product;
- `LASTCHANCE_5_KO` — 5% off entire order.

**The `$25 off` configuration is a material profitability risk** when many Apparel items currently show only single-digit headline profit.

Immediate control:

- do not advertise or intentionally distribute unverified promo codes;
- audit every live promo against current product economics;
- retain, narrow, reduce or disable only after the affected product scope and contribution floor are verified;
- do not stack free shipping or additional discounts on a marginal SKU without contribution proof.

Fourthwall's suggestion to offer free shipping above a threshold is **not automatically approved**. Shipping promotions must pass the same contribution gate.

## 7. Payout / cash-flow state

Fourthwall is attractive during Elevation's cash recovery because the established catalog is produced on demand; Elevation does not need to pre-buy ordinary Fourthwall catalog inventory for each order.

However, the current payout lane is not operationally complete:

- current Fourthwall profit balance observed: **`$1.77`**;
- no payouts recorded;
- Fourthwall currently presents **`Set up your payouts`**;
- ordinary automatic payout threshold presented by the platform: `$25`;
- Fourthwall indicates earnings are transferred at the start of the following month when the threshold is met.

### Cash-flow treatment

Fourthwall profit is **not liquid operating cash until payout actually settles**.

Unlike eBay/TikTok supplier-funded orders, Fourthwall's native POD fulfillment is working-capital-light because production/fulfillment is handled through the platform. Therefore Apparel can remain a parallel revenue lane while Elevation rebuilds marketplace float.

**Payout setup is an immediate Apparel control item.** It requires an authenticated protected account action and must not store banking/security credentials in Git.

## 8. Checkout / fulfillment routing

Current safe production path:

**ELEVATION DISCOVERY → EXACT FOURTHWALL PRODUCT → FOURTHWALL NATIVE CHECKOUT → FOURTHWALL ORDER → POD FULFILLMENT → TRACKING → DELIVERY → FOURTHWALL PROFIT → PAYOUT.**

Existing Elevation code can discover/normalize Fourthwall products and has a custom PayPal apparel path, but current verified code does not prove automatic creation of a Fourthwall fulfillment order after an Elevation custom PayPal capture.

Therefore:

- keep the existing Fourthwall native checkout as the default fulfillment-safe route;
- do not intentionally push Fourthwall-backed Apparel through Elevation custom PayPal until an exact order-creation/fulfillment bridge is proven or an Owner-approved manual order procedure exists;
- do not rebuild a working Fourthwall storefront merely to centralize checkout.

## 9. Developer/API integration

The authenticated established Fourthwall store exposes:

- **Open API** using authenticated API access;
- **Webhooks** for product/order events;
- **Storefront API** for custom storefront use;
- external-store configuration capability;
- developer security controls for protected credentials.

This means Elevation can integrate Apparel into its Operating System without abandoning Fourthwall fulfillment.

### Phase A — read/sync first

MASTER DEVELOPER may be routed to build/verify a read/sync bridge that:

1. ingests exact Fourthwall product IDs, variants, public URLs, prices and availability;
2. normalizes provider identity as `fourthwall` in the Universal Catalog;
3. records Fourthwall order/payout events through supported API/webhooks;
4. preserves Fourthwall-native checkout until fulfillment creation is proven;
5. never stores Fourthwall secrets in public Git.

### Phase B — order bridge only if supported and proven

Only after isolated proof should Elevation consider:

**ELEVATION CHECKOUT → FOURTHWALL ORDER CREATION → FULFILLMENT ACCEPTANCE → TRACKING RETURN → CUSTOMER/OS RECEIPT.**

If Fourthwall APIs do not support a reliable production order-creation path for the exact catalog item, keep native Fourthwall checkout instead of forcing a custom bridge.

## 10. Existing channel integrations

Authenticated Fourthwall Apps recon shows:

- **TikTok Shop — Connected**;
- **Instagram & Facebook Shop — Connected**;
- YouTube Product Shelf available;
- Twitch gifting / streaming integrations available;
- X Shops available;
- TikTok feed available;
- email/automation integrations available.

Fourthwall's dashboard also reports the TikTok Shop sync as stuck.

### Channel rule

The existing dedicated TikTok Shop lane remains authoritative for TikTok operations. Do **not** blindly reconnect, overwrite or duplicate TikTok catalog state from Fourthwall.

Required sequence:

**RECON CURRENT TIKTOK PRODUCT OWNERSHIP → IDENTIFY FOURTHWALL-SOURCED APPAREL ITEMS → VERIFY PROFIT + FULFILLMENT → REPAIR ONLY THE EXACT SYNC DELTA.**

Meta/Facebook/Instagram integration can support free/owned traffic after product profitability is verified.

## 11. Analytics state

Fourthwall native commerce analytics are available, but the connected Google Analytics integration currently reports a connection/access issue.

This is **not a checkout blocker**.

Priority:

1. Fourthwall orders/profit remain the immediate source for Apparel sales economics;
2. repair/reconnect Google Analytics later as a bounded analytics task;
3. do not delay sales or fulfillment for the analytics integration.

## 12. Product workflow

Use this workflow for all Elevation UpScales Apparel products:

**DESIGN / BRAND ASSET**  
→ **FOURTHWALL PRODUCT + EXACT PRODUCTION METHOD**  
→ **SELLING PRICE / VARIANT COST**  
→ **PROMOTION + PROCESSING IMPACT**  
→ **EXPECTED NET CONTRIBUTION**  
→ **PUBLIC / HOLD / REPRICE**  
→ **OWNED TRAFFIC**  
→ **FOURTHWALL CHECKOUT**  
→ **FOURTHWALL FULFILLMENT + TRACKING**  
→ **DELIVERY**  
→ **REALIZED PROFIT**  
→ **PAYOUT**  
→ **SCALE / REPRICE / RETIRE**

## 13. Immediate Apparel priorities

1. Preserve the established `elevationupscales` store; do not build in the empty duplicate.
2. Complete protected payout-account setup.
3. Audit all 29 public products for expected net contribution; do not mass-reprice blindly.
4. Start with the strongest **3–5 apparel lead products** and make each margin-safe.
5. Review the three live promo codes before any campaign traffic.
6. Reconcile the stuck Fourthwall→TikTok Shop sync with the dedicated TikTok lane without duplicate product creation.
7. Keep Meta Shop connection intact unless an exact defect is found.
8. Use free/owned social traffic first; paid ads remain disallowed under company recovery controls until positive conversion/contribution is proven.
9. Record next real Apparel order's actual realized profit and require a meaningful improvement over the historical `$1.77` result.
10. Route developer work only for catalog/API/webhook integration—not for a storefront redesign.

## 14. Success / close condition

The Apparel integration is considered operating cleanly when:

- correct established Fourthwall store is unambiguous;
- payout account is active;
- all live promotions are contribution-safe or intentionally disabled;
- 3–5 lead Apparel products pass the profit gate;
- Elevation Universal Catalog maps exact Fourthwall product identity without duplicates;
- Fourthwall checkout/fulfillment remains clean;
- social integrations do not duplicate/conflict with dedicated channel ownership;
- the first post-recon Apparel order is delivered and produces target realized contribution;
- actual profit enters a verified payout cycle.

## Control phrase

**ELEVATION APPAREL → NO INVENTORY BET → PRICE FOR REAL PROFIT → FOURTHWALL FULFILLS → PAYOUT BECOMES CASH → SCALE THE DESIGNS THAT EARN.**
