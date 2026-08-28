# Elevation UpScales — PayPal Checkout v3.11.42 Handoff

Status: **prepared candidate / not production-enabled**

Parent: `1c68f9fd38cc3ca773778fdeef57b035a3afa18c`

Purpose: add a secure one-time `Pay Elevation` checkout for approved service payments, deposits, invoices, or other amounts already discussed with Elevation UpScales, Inc. This does **not** replace Fourthwall apparel checkout or eBay seller checkout.

## Prepared files

- `site/pay.html` — one-time customer payment page.
- `site/paypal-checkout.css` — payment page styling.
- `site/paypal-checkout.js` — PayPal JS SDK client flow.
- `site/paypal-checkout-server.js` — server-side PayPal OAuth, Orders v2 create, and Orders v2 capture handlers.

## Security model

- `PAYPAL_CLIENT_SECRET` is server-side only.
- `PAYPAL_CLIENT_ID` is returned by `/api/paypal/config` because the PayPal browser SDK requires the client ID.
- PayPal environment defaults to `sandbox`; live mode requires an explicit `PAYPAL_ENV=live` binding.
- Create/capture endpoints reject cross-origin POST requests.
- Amount is revalidated server-side and limited to `$1.00–$10,000.00` USD.
- The server module logs only sanitized status/debug metadata; it does not log access tokens or credentials.
- Physical-goods shipping is disabled for this one-time service-payment surface (`NO_SHIPPING`).

## Required Cloudflare bindings

Do not commit values to GitHub.

Required secrets/bindings:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_ENV` — start with `sandbox`; change to `live` only after sandbox approval and live credentials are installed.

## Remaining `_worker.js` activation delta

The current Pages project uses advanced `_worker.js` routing and a restrictive HTTP Content-Security-Policy. The prepared module must not be considered active until these controlled edits are made from the current source.

### 1. Import the PayPal handler

At the top of `site/_worker.js`:

```js
import { handlePayPalCheckoutApi } from "./paypal-checkout-server.js";
```

### 2. Route PayPal API requests

Inside the existing `export default { async fetch(...) }` router, before static asset handling:

```js
if (url.pathname === "/api/paypal/config" ||
    url.pathname === "/api/paypal/orders" ||
    /^\/api\/paypal\/orders\/[A-Z0-9]{8,40}\/capture$/i.test(url.pathname)) {
  return handlePayPalCheckoutApi(request, env, url.pathname);
}
```

### 3. Extend the HTML CSP only for PayPal

The current CSP allows only first-party scripts plus Cloudflare Insights. The `/pay` page will therefore block the PayPal SDK until the existing `HTML_SECURITY_HEADERS` CSP is extended.

Add only the minimum PayPal origins needed by this integration:

- `script-src`: `https://www.paypal.com https://www.paypalobjects.com`
- `connect-src`: `https://www.paypal.com https://*.paypal.com`
- `frame-src`: `https://www.paypal.com https://*.paypal.com`

Do not relax `frame-ancestors`, `object-src`, `base-uri`, or the existing first-party restrictions.

### 4. Preserve existing architecture

The activation patch must not alter:

- Fourthwall Store checkout or catalog hydration.
- eBay RV & Outdoor Store purchase links.
- Marketplace buyer/seller workflow.
- Start a Project.
- Solar Builder.
- Mission Control analytics formulas.
- Inventory D1 schema.
- Notification architecture.
- `208-813-4998` customer routing.

## API contract

### `GET /api/paypal/config`

Returns:

```json
{
  "configured": true,
  "environment": "sandbox",
  "clientId": "public-paypal-client-id",
  "currency": "USD"
}
```

### `POST /api/paypal/orders`

Input:

```json
{
  "amount": "125.00",
  "reference": "INV-1042",
  "description": "RV inspection deposit"
}
```

Creates an Orders v2 `CAPTURE` order on the server.

### `POST /api/paypal/orders/:orderId/capture`

Captures the approved order on the server and returns sanitized order/capture identifiers and captured amount.

## Sandbox acceptance gate

Before live mode:

1. Install sandbox `PAYPAL_CLIENT_ID` and `PAYPAL_CLIENT_SECRET` in Cloudflare.
2. Set `PAYPAL_ENV=sandbox`.
3. Deploy only through the Release Candidate Gate.
4. Verify `/pay` loads without CSP errors.
5. Verify `$1.00`, a normal deposit amount, and `$10,000.00` create orders.
6. Verify `$0.99`, malformed values, and values over `$10,000.00` are rejected before PayPal order creation.
7. Complete a purchase with a PayPal sandbox personal account.
8. Confirm the sandbox business account receives the transaction.
9. Exercise cancellation.
10. Exercise a simulated funding failure and confirm the buyer can select another funding source.
11. Confirm no PayPal secret/token appears in browser source, network responses, GitHub, or logs.
12. Confirm Fourthwall/eBay checkout remains unchanged.

## Live promotion boundary

Only after sandbox acceptance:

- obtain PayPal **live** credentials,
- replace Cloudflare PayPal credentials with live credentials,
- explicitly set `PAYPAL_ENV=live`,
- run the candidate gate again,
- perform a controlled low-dollar live payment,
- verify the captured transaction in the PayPal business account,
- then expose `/pay` in customer-facing navigation if desired.

Until the `_worker.js` activation delta, CSP update, and Cloudflare secrets are complete, **do not merge/promote this feature as a functioning payment integration**.
