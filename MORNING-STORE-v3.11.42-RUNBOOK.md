# Elevation UpScales v3.11.42 — Morning Store Launch Runbook

## Current release state

- Authoritative `main`: `31faa0998a52437c0b305f42d6b8f87d6cece696`
- Navigation prep is already separately deployed to production.
- Final Store candidate: `feature/apparel-onsite-checkout-v3.11.42`
- Pull request: #18
- Public Apparel/RV presentation files are intentionally unchanged by the Store candidate.
- Final Store candidate must remain draft / not production-promoted until the Cloudflare bindings and sandbox acceptance checks below are complete.

## 1. Cloudflare bindings to add/confirm

Do not put secret values in GitHub source or chat.

Required for PayPal sandbox:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET` — secret/server-side only
- `PAYPAL_ENV=sandbox`

Required existing binding:

- `MARKETPLACE_DB` — D1 binding used for `eus_store_orders`

RV direct-checkout mapping:

- `DOBA_PRODUCT_MAP_JSON`

Only RV products with a verified Doba-derived price and shipping amount should be present in this mapping. The map key is the exact **12-digit eBay item number** used by the current RV catalog. Each direct-checkout entry must contain `shippingVerified: true`. Unmapped, unverified, invalid, or destination-blocked RV items intentionally fall back to their exact eBay listing.

Example structure — values shown are placeholders only and must be replaced with actual Doba data:

```json
{
  "186830991402": {
    "name": "Exact catalog product name",
    "priceCents": 6200,
    "shippingCents": 1299,
    "shippingVerified": true,
    "blockedStates": ["AK", "HI"],
    "itemNo": "ACTUAL_DOBA_ITEM_NO",
    "skuId": "ACTUAL_DOBA_SKU_ID",
    "spuNo": "ACTUAL_DOBA_SPU_NO",
    "ebayUrl": "https://www.ebay.com/itm/186830991402"
  }
}
```

`blockedStates` is optional. `allowedStates` may be used instead when the Doba supplier has an explicit supported-state list. Do not set `shippingVerified: true` until the price/shipping basis has actually been confirmed from Doba. `shippingCents` may be `0` only when Doba actually confirms free shipping for that item/basis.

The current v3.11.42 mapping treats `shippingCents` as the verified per-item shipping amount. Items whose shipping cannot safely be represented that way should remain unmapped and therefore stay on the eBay fallback until live destination-rate automation is added.

## 2. Before previewing

1. Re-read current GitHub `main` SHA.
2. If `main` is no longer `31faa0998a52437c0b305f42d6b8f87d6cece696`, sync the new `main` into the Store candidate before any preview.
3. Confirm PR #18 remains draft.
4. Confirm PayPal environment is `sandbox`, not `live`.
5. Confirm no PayPal client secret exists in repository files.

## 3. Controlled preview gate

Run the Store candidate only as an isolated Cloudflare preview first.

Required preview checks:

- `/`
- `/store`
- `/rv-store`
- `/checkout`
- `/start-a-project`
- `/marketplace`
- `/solar-project`
- `/admin-listings`
- `/admin-store-orders.html`

Protected public presentation expectations:

- Homepage primary CTA remains `Start a Project`.
- Correct customer phone remains `208-813-4998` / `+1-208-813-4998`.
- Existing Apparel and RV page design is unchanged.
- Existing product button wording remains `Buy Now`.
- Fourthwall product purchase clicks route internally at runtime instead of sending the buyer to Fourthwall.
- RV product purchase clicks route internally only when the item has an explicitly verified Doba mapping; otherwise exact eBay fallback remains available.

## 4. Apparel sandbox acceptance

Test at least one physical Apparel product with a real selectable variant.

Verify:

1. Store card display price = Fourthwall price × 1.20.
2. `Buy Now` stays on Elevation and opens internal checkout.
3. Correct product and variant are shown.
4. Server independently retrieves/recalculates the variant price; browser-supplied amount is not trusted.
5. Quantity from 1–10 updates merchandise correctly; invalid quantities are rejected server-side.
6. Shipping = `$7.00 × quantity` for physical Apparel.
7. Buyer email and U.S. shipping address are validated server-side before payment creation.
8. PayPal sandbox order creates successfully.
9. PayPal sandbox capture succeeds.
10. New `EUS-STORE-...` record appears in Store Orders.
11. Store Orders displays buyer, shipping address, product, variant, quantity, merchandise, shipping, total, PayPal order ID, and capture ID.
12. Fulfillment status defaults operationally to `Needs Fulfillment` after a completed payment.

## 5. RV sandbox acceptance

Test one mapped RV item and one unmapped RV item.

Mapped item:

1. Map key is the exact 12-digit eBay item number.
2. `shippingVerified` is exactly `true`.
3. Merchandise price must come from the server-side Doba mapping/basis.
4. Shipping must be Doba-derived, not guessed from weight.
5. If the supplier excludes the buyer's state, that state is listed in `blockedStates` (or excluded by `allowedStates`) and checkout falls back to eBay.
6. Buyer stays on Elevation checkout only for an allowed destination.
7. Address and order are stored.
8. PayPal sandbox capture succeeds.
9. Store Orders exposes Doba identifiers in supplier data.

Unmapped/unquotable/unverified item:

1. No website PayPal payment should be offered for an unverified amount.
2. Buyer is routed to the exact existing eBay listing instead.

## 6. Command Center fulfillment smoke

Using the same Mission Control login/session:

1. Open `Store Orders` from Mission Control.
2. Search/filter by Apparel and RV.
3. Open a paid order.
4. Copy the fulfillment summary.
5. Enter the manual Fourthwall or Doba supplier order ID.
6. Move status to `Supplier Ordered`.
7. Add carrier and tracking.
8. Move status to `Shipped`.
9. Move status to `Completed` after fulfillment is complete.

`Refund Needed` / `Refunded` are operational tracking states only in v3.11.42. They do not automatically send money through the PayPal refund API.

## 7. Sales-tax release boundary

Do not treat a technically successful PayPal sandbox test as authorization to accept live taxable retail orders until the business's required sales-tax collection approach is explicitly configured/approved. v3.11.42 does not guess a tax rate from the buyer's address.

## 8. Live promotion order

Only after the sandbox checks and tax boundary are resolved:

1. Change Cloudflare PayPal credentials to the live app credentials.
2. Set `PAYPAL_ENV=live`.
3. Re-run a controlled final preview/config check.
4. Merge PR #18 into authoritative `main`.
5. Deploy authoritative `main` through the production gate.
6. Run the requested live production smoke test immediately after deployment.
7. Verify one Store checkout page load and PayPal configuration response without making an unnecessary real purchase.

## Stop conditions

Stop promotion and leave the Store candidate unmerged if any of these occur:

- Current `main` moved and candidate lineage was not re-synced.
- PayPal secret is absent or exposed in source.
- `MARKETPLACE_DB` is unavailable or the Store order table cannot be created before PayPal order creation.
- Apparel server total does not match approved +20% / $7-per-item rules.
- A mapped RV item is missing `shippingVerified: true`.
- A mapped RV item's shipping basis cannot be verified from Doba.
- A destination the Doba supplier does not serve is not blocked from direct checkout.
- An unmapped RV item fails to fall back to its exact eBay listing.
- Store order/address data is not retained after payment.
- Existing public Store design or `Buy Now` wording changes unexpectedly.
