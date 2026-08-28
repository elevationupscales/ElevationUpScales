# Elevation UpScales Store Checkout v3.11.42

Current required main ancestor: `31faa0998a52437c0b305f42d6b8f87d6cece696`

Candidate: `feature/apparel-onsite-checkout-v3.11.42`

Pull request: `#18 — v3.11.42 — Apparel + RV on-site PayPal checkout`

## Scope

This candidate adds an Elevation-owned PayPal checkout path for Apparel and RV / Outdoor products without changing the existing storefront layouts, card formatting, headings, descriptions, or `Buy Now` wording.

### Apparel

- Existing Fourthwall catalog remains the product/image source.
- Existing product cards remain unchanged in source and layout.
- A runtime checkout layer replaces Fourthwall product destinations with `/checkout/`.
- Displayed Fourthwall prices are increased by 20%.
- The server independently re-fetches the Fourthwall product/variant price and applies the same 20% markup before creating the PayPal order.
- Physical Apparel shipping is $7.00 per item.
- Digital/download products are not assigned physical shipping.
- Variant selection is completed on the checkout page for manual fulfillment.
- Quantity is limited to 1–10 and is validated server-side.
- Customer email and U.S. shipping address are validated server-side before a PayPal order can be created.

### RV / Outdoor

- Existing eBay/Seller Hub catalog and product card renderer remain unchanged.
- `Buy Now` is routed through `/checkout/` first.
- RV items only stay in Elevation checkout when a server-side Doba mapping contains an authoritative item price, Doba-derived shipping amount, and `shippingVerified: true`.
- The map key is the exact 12-digit eBay item number used by the current RV catalog.
- Optional `blockedStates` / `allowedStates` rules can prevent direct checkout for destinations the Doba supplier does not serve.
- If the item is unmapped, unverified, invalid, or blocked for the selected state, checkout falls back to that item's existing exact eBay listing.
- This preserves eBay as the safe fulfillment path for items whose direct shipping cannot be represented safely.

## PayPal bindings

Set in Cloudflare, never in repository source:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_ENV=sandbox` during acceptance testing
- switch `PAYPAL_ENV=live` only after sandbox approval

## Doba mapping

The Worker reads `DOBA_PRODUCT_MAP_JSON` as a Cloudflare environment value. Keys are the exact 12-digit eBay item numbers used by the RV storefront.

Example shape only:

```json
{
  "186830991402": {
    "name": "Product name",
    "priceCents": 6200,
    "shippingCents": 1299,
    "shippingVerified": true,
    "blockedStates": ["AK", "HI"],
    "itemNo": "DOBA_ITEM_NO",
    "skuId": "DOBA_SKU_ID",
    "spuNo": "DOBA_SPU_NO",
    "ebayUrl": "https://www.ebay.com/itm/186830991402"
  }
}
```

`shippingVerified` must be exactly `true` before an RV item can enter Elevation PayPal checkout. `priceCents` and `shippingCents` must be values confirmed from Doba for the item. If the verification flag or either amount is absent/invalid, the buyer is sent to eBay instead of being allowed to pay an unverified total.

`blockedStates` is optional. `allowedStates` can be used instead when a supplier provides an explicit destination list. These checks run again when the buyer submits the order, so a blocked destination cannot create a PayPal order.

The current v3.11.42 mapping treats `shippingCents` as a verified per-item shipping amount. Items whose Doba rate changes by destination in a way that cannot safely be represented by the mapping should remain unmapped and use eBay until live Doba destination-rate automation is added.

## Order storage

Before the PayPal order is created, `MARKETPLACE_DB` must be available and the `eus_store_orders` table must pass a schema preflight. Checkout retains:

- order reference
- source
- product and variant
- quantity
- merchandise amount
- shipping amount
- total amount
- customer contact
- shipping address
- Doba supplier identifiers when applicable
- PayPal order and capture identifiers
- payment status

The Worker wrapper blocks PayPal store-order creation if D1 order storage cannot be created/accessed. This prevents a payment from being created without an order-storage path for manual fulfillment.

## Command Center Store Orders

The candidate includes a protected purchase-operations workspace using the existing signed Mission Control admin session.

Files:

- `site/admin-store-orders.html`
- `site/admin-store-orders.css`
- `site/admin-store-orders.js`
- `site/admin-store-orders-link.js`
- `site/store-orders-admin-server.js`

Mission Control gets an `Orders` action at runtime without rewriting the existing Admin page source.

Order operations include:

- Apparel / RV source filtering
- order/customer/product/tracking search
- Paid / Needs Fulfillment / Supplier Ordered / Shipped / Completed / Refund Needed counts
- buyer contact and shipping address
- item, variant, quantity, merchandise, shipping and total
- PayPal order/capture IDs
- supplier/Doba data
- supplier order ID
- carrier and tracking number
- fulfillment notes
- copyable fulfillment summary
- fulfillment state updates

`Refund Needed` and `Refunded` are tracking states in v3.11.42. They do not automatically call the PayPal refund API.

## Preserved production source

The previous 4,604-line `site/_worker.js` is preserved byte-for-byte as `site/worker-core.js` with original blob SHA `8bd4e5157317a8121e1cc96f4befa86bd744f117`.

The new `site/_worker.js` is a thin wrapper that:

1. handles and hardens store-checkout API routes,
2. performs server-side source, quantity, customer-email, U.S.-address and Doba-verification preflight,
3. verifies Store order storage before PayPal order creation,
4. handles protected Store Orders admin API routes,
5. appends behavior-only routing scripts to the existing Apparel/RV JavaScript responses,
6. surfaces the Orders workspace in Mission Control at runtime,
7. adds PayPal CSP allowances only to `/checkout/`, and
8. delegates every other request to the unchanged worker core.

## Validation completed before Cloudflare activation

The first pre-Cloudflare validation run exposed only a Bash quoting mistake in the temporary test harness, not a website-code defect. After correcting the harness, the clean validation passed:

- current-main ancestry PASS
- public Store presentation files unchanged PASS
- existing `Buy Now` source wording PASS
- +20% Apparel markup rule PASS
- $7-per-item Apparel shipping rule PASS
- RV eBay fallback rule PASS
- Store Orders / existing admin-session integration PASS
- JavaScript syntax PASS
- credential scan PASS

The temporary validation workflow was removed after PASS and is not part of the final deployable candidate.

Additional hardening after that pass added explicit Doba `shippingVerified` gating, destination allow/block support, server-side customer/address validation, quantity validation, and D1 schema preflight. These additions are to be exercised by the isolated Cloudflare preview before morning sandbox promotion.

## Morning runbook

Use `MORNING-STORE-v3.11.42-RUNBOOK.md` for the exact Cloudflare → preview → sandbox → Command Center → live promotion sequence.

## Production boundary

Do not promote until:

1. PayPal sandbox credentials are installed in Cloudflare.
2. `MARKETPLACE_DB` is confirmed available to the candidate.
3. `/checkout/` loads PayPal successfully in the candidate preview.
4. At least one Apparel sandbox purchase validates product, variant, +20% price, $7-per-item shipping, stored address, and captured payment.
5. At least one RV item has a `shippingVerified: true` Doba mapping and completes a sandbox purchase with the expected shipping amount to an allowed destination.
6. An unmapped/unverified/blocked RV item is verified to fall back to its exact eBay listing.
7. Store Orders is verified with a sandbox purchase and fulfillment-status update.
8. Sales-tax handling for direct website orders is explicitly approved/configured before live customer payments.
