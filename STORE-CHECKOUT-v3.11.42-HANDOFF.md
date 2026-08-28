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

### RV / Outdoor

- Existing eBay/Seller Hub catalog and product card renderer remain unchanged.
- `Buy Now` is routed through `/checkout/` first.
- RV items only stay in Elevation checkout when a server-side Doba mapping contains both an authoritative item price and a Doba-derived shipping amount.
- If the item cannot be quoted from the Doba mapping, checkout immediately falls back to that item's existing eBay listing.
- This preserves eBay as the safe fulfillment path for items that cannot yet be calculated.

## PayPal bindings

Set in Cloudflare, never in repository source:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_ENV=sandbox` during acceptance testing
- switch `PAYPAL_ENV=live` only after sandbox approval

## Doba mapping

The Worker reads `DOBA_PRODUCT_MAP_JSON` as a Cloudflare environment value. Keys may be the storefront's `ebay-<itemNumber>` product ID or the 12-digit eBay item number used by the RV storefront.

Example shape only:

```json
{
  "ebay-186830991402": {
    "name": "Product name",
    "priceCents": 6200,
    "shippingCents": 1299,
    "itemNo": "DOBA_ITEM_NO",
    "skuId": "DOBA_SKU_ID",
    "spuNo": "DOBA_SPU_NO",
    "ebayUrl": "https://www.ebay.com/itm/186830991402"
  }
}
```

`priceCents` and `shippingCents` must be values confirmed from Doba for the item. If either is absent or invalid, the buyer is sent to eBay instead of being allowed to pay an unverified total.

Doba's Retailer API supports shipping-rate estimation. A later automated-rate pass can replace mapped shipping amounts once Doba API credentials/item identifiers are fully mapped. Doba API credentials must not be committed to GitHub.

## Order storage

Before the PayPal order is created, `MARKETPLACE_DB` must be available. Checkout creates/uses `eus_store_orders` to retain:

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

The Worker wrapper blocks new PayPal store-order creation if D1 order storage is not available.

## Command Center Store Orders

The candidate now includes a protected purchase-operations workspace using the existing signed Mission Control admin session.

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

1. handles store-checkout API routes,
2. handles protected Store Orders admin API routes,
3. appends behavior-only routing scripts to the existing Apparel/RV JavaScript responses,
4. surfaces the Orders workspace in Mission Control at runtime,
5. adds PayPal CSP allowances only to `/checkout/`, and
6. delegates every other request to the unchanged worker core.

## Validation completed before Cloudflare activation

Pre-Cloudflare validation passed after the test-harness quoting issue was corrected:

- current-main ancestry PASS
- public Store presentation files unchanged PASS
- existing `Buy Now` source wording PASS
- +20% Apparel markup rule PASS
- $7-per-item Apparel shipping rule PASS
- RV eBay fallback rule PASS
- Store Orders / existing admin-session integration PASS
- JavaScript syntax PASS
- credential scan PASS

The temporary validation workflow is not part of the final deployable candidate.

## Morning runbook

Use `MORNING-STORE-v3.11.42-RUNBOOK.md` for the exact Cloudflare → preview → sandbox → Command Center → live promotion sequence.

## Production boundary

Do not promote until:

1. PayPal sandbox credentials are installed in Cloudflare.
2. `MARKETPLACE_DB` is confirmed available to the candidate.
3. `/checkout/` loads PayPal successfully in the candidate preview.
4. At least one Apparel sandbox purchase validates product, variant, +20% price, $7-per-item shipping, stored address, and captured payment.
5. At least one RV item has a verified Doba mapping and completes a sandbox purchase with the expected shipping amount.
6. An unmapped RV item is verified to fall back to its exact eBay listing.
7. Store Orders is verified with a sandbox purchase and fulfillment-status update.
8. Sales-tax handling for direct website orders is explicitly approved/configured before live customer payments.
