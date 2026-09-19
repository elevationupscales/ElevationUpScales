# Web V2 Abandoned / Failed Checkout Recovery Workflow

**Owner:** Casey Young  
**Status:** ACTIVE WORKFLOW / LAUNCH HARDENING  
**Parent controls:** `operations/MASTER_SOP_V1_0.md` → Web V2 commerce lane → `operations/AUTOMATED_EMAIL_EXECUTION_MATRIX_2026-09-11.md`

## Owner direction

Do not lose a recoverable customer because checkout was exited, failed, or payment could not start.

The storefront must stay simple. Recovery runs behind the checkout; it must not add visible complexity to the customer flow.

## Trigger point

Create a recoverable checkout record only after the customer has submitted enough information to identify and contact them:

- valid email;
- full name;
- usable delivery address;
- at least one currently orderable cart line.

Do **not** send or create a server event for every keystroke.

## Required states

`CHECKOUT_STARTED` → `PAYMENT_ORDER_CREATED` → `PAYMENT_COMPLETED`

Alternative recovery states:

- `CHECKOUT_RESOLVE_FAILED`
- `PAYMENT_START_FAILED`
- `PAYMENT_CANCELLED`
- `ABANDONED`
- `RECOVERED`

## Recovery rule

1. Customer submits Contact & Delivery.
2. Server creates or updates one checkout-recovery record using a stable checkout/session fingerprint.
3. If PayPal order creation succeeds, attach the provider order ID and mark `PAYMENT_ORDER_CREATED`.
4. If payment captures successfully, mark `PAYMENT_COMPLETED`; no abandoned notification is sent.
5. If checkout/payment fails, send one internal owner notification immediately.
6. If no successful payment occurs after the abandonment window, mark `ABANDONED` and send one internal owner notification.
7. Dedupe by checkout record so the owner does not receive repeated alerts for the same unchanged checkout.
8. If the customer later completes payment, mark `RECOVERED` / `PAYMENT_COMPLETED` and suppress further abandoned notices.

## Internal notification content

Send to the approved Elevation owner/business notification inbox. Include only the information needed to recover the sale:

- customer name;
- email;
- phone when provided;
- city/state/ZIP and delivery address needed for order recovery;
- cart products, SKUs, quantities, and server-derived subtotal;
- checkout state / failure reason;
- timestamp;
- internal checkout/order ID;
- PayPal provider-order ID when one exists.

Never include PayPal credentials, card data, CVV/CVC, access tokens, or secrets.

## Customer privacy / local persistence

Customer contact and delivery details may remain locally persisted on that customer's device for checkout convenience. Elevation must never store raw payment-card information in browser local storage. Payment credentials remain with PayPal / the customer's approved wallet or browser payment provider.

## Email authority

This recovery notification is an **internal company routing notice** and is pre-authorized under `AUTOMATED_EMAIL_EXECUTION_MATRIX_2026-09-11.md`.

Customer-facing follow-up is a separate step. Ordinary factual website-order follow-up is allowed by the email execution matrix, but do not automatically promise discounts, credits, delivery outcomes, refunds, or other material terms.

## Launch gates

Before this workflow can be called LIVE:

- checkout recovery record persists in the commerce D1 database;
- duplicate alerts are suppressed;
- payment success suppresses abandoned notifications;
- failed payment-start produces a recoverable record;
- notification transport is connected and verified;
- one test checkout proves record → notification without charging money;
- no customer payment credentials are stored.

## Current implementation order

1. **DONE:** simplified cart and locally persistent contact/delivery flow.
2. **NEXT:** server-side checkout recovery record + status transitions.
3. Connect internal notification transport.
4. Verify one failed/abandoned SOK checkout without payment capture.
5. Verify completed-payment suppression.
6. Continue production checkout readiness.

## Control phrase

**CAPTURE THE RECOVERABLE CHECKOUT ONCE → NOTIFY ON FAILURE/ABANDONMENT → DEDUPE → SUPPRESS AFTER PAYMENT → NEVER STORE PAYMENT CREDENTIALS.**
