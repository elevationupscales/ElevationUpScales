import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { handleStoreCheckoutApi, __storeCheckoutCaptureRepairTest } from "../site/store-checkout-server.js";

const repairSource = fs.readFileSync("site/store-checkout-server.js", "utf8");
const clientGuardSource = fs.readFileSync("site/store-direct-buy-payment-hotfix.js", "utf8");
const PAYPAL_ORDER_ID = "PAYPAL123";
const CAPTURE_PATH = `/api/store-checkout/orders/${PAYPAL_ORDER_ID}/capture`;

function request() {
  return new Request(`https://elevationupscales.com${CAPTURE_PATH}`, { method: "POST" });
}

function env(db) {
  return {
    MARKETPLACE_DB: db,
    PAYPAL_CLIENT_ID: "test-client",
    PAYPAL_CLIENT_SECRET: "test-secret",
    PAYPAL_ENV: "sandbox",
  };
}

function makeDb(initialOrder) {
  const state = { order: initialOrder ? { ...initialOrder } : null, updates: [] };
  return {
    state,
    prepare(sql) {
      const normalized = String(sql).replace(/\s+/g, " ").trim();
      return {
        bind(...args) {
          return {
            async first() {
              if (/FROM eus_store_orders/i.test(normalized)) {
                const wanted = args[0];
                return state.order?.paypal_order_id === wanted ? { ...state.order } : null;
              }
              return null;
            },
            async run() {
              state.updates.push({ sql: normalized, args });
              if (!state.order || !/UPDATE eus_store_orders/i.test(normalized)) return { success: true };
              if (args[1] === "RECONCILIATION_HOLD") {
                state.order.paypal_capture_id = args[0];
                state.order.payment_status = args[1];
                state.order.paid_at = null;
              } else if (/payment_status='COMPLETED'/i.test(normalized)) {
                state.order.paypal_capture_id = args[0];
                state.order.payment_status = "COMPLETED";
                state.order.paid_at = args[1];
              }
              return { success: true };
            },
          };
        },
      };
    },
  };
}

function createdOrder(totalCents = 31900) {
  return {
    id: "EUS-STORE-20260912-ABC12345",
    paypal_order_id: PAYPAL_ORDER_ID,
    paypal_capture_id: "",
    payment_status: "created",
    total_cents: totalCents,
    paid_at: null,
  };
}

function paypalFetch({ amount = "319.00", currency = "USD", orderStatus = "COMPLETED", captureStatus = "COMPLETED" } = {}) {
  const calls = [];
  const fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    if (String(url).endsWith("/v1/oauth2/token")) {
      return new Response(JSON.stringify({ access_token: "fake-access-token" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    if (String(url).endsWith(`/v2/checkout/orders/${PAYPAL_ORDER_ID}/capture`)) {
      return new Response(JSON.stringify({
        id: PAYPAL_ORDER_ID,
        status: orderStatus,
        purchase_units: [{ payments: { captures: [{
          id: "CAPTURE123",
          status: captureStatus,
          amount: { value: amount, currency_code: currency },
        }] } }],
      }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      });
    }
    throw new Error(`Unexpected fetch: ${url}`);
  };
  return { fetch, calls };
}

async function withFetch(fakeFetch, fn) {
  const previous = globalThis.fetch;
  globalThis.fetch = fakeFetch;
  try { return await fn(); }
  finally { globalThis.fetch = previous; }
}

test("capture repair requires a matching local order before PayPal capture", async () => {
  const lookup = repairSource.indexOf("loadStoreOrder(db, id)");
  const capture = repairSource.indexOf("paypalCaptureRequest(env, id");
  assert.ok(lookup > -1, "local order lookup missing");
  assert.ok(capture > lookup, "PayPal capture must happen after local order lookup");

  const db = makeDb(null);
  let fetchCalled = false;
  const response = await withFetch(async () => {
    fetchCalled = true;
    throw new Error("PayPal must not be called for unknown orders");
  }, () => handleStoreCheckoutApi(request(), env(db), CAPTURE_PATH));

  assert.equal(response.status, 404);
  assert.equal(fetchCalled, false);
  assert.match((await response.json()).error, /No matching Elevation order/i);
});

test("completed local order returns idempotent success without a second PayPal capture", async () => {
  const db = makeDb({
    ...createdOrder(),
    paypal_capture_id: "CAPTURE-EXISTING",
    payment_status: "COMPLETED",
    paid_at: "2026-09-12T23:00:00.000Z",
  });
  let fetchCalled = false;
  const response = await withFetch(async () => {
    fetchCalled = true;
    throw new Error("PayPal must not be called twice for a completed order");
  }, () => handleStoreCheckoutApi(request(), env(db), CAPTURE_PATH));

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.alreadyCaptured, true);
  assert.equal(body.captureId, "CAPTURE-EXISTING");
  assert.equal(fetchCalled, false);
});

test("matching PayPal capture marks the exact local order completed", async () => {
  const db = makeDb(createdOrder());
  const paypal = paypalFetch();
  const response = await withFetch(paypal.fetch, () => handleStoreCheckoutApi(request(), env(db), CAPTURE_PATH));

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.ok, true);
  assert.equal(body.id, PAYPAL_ORDER_ID);
  assert.equal(body.captureId, "CAPTURE123");
  assert.equal(body.amount, "319.00");
  assert.equal(body.currency, "USD");
  assert.equal(db.state.order.payment_status, "COMPLETED");
  assert.equal(db.state.order.paypal_capture_id, "CAPTURE123");
  assert.ok(db.state.order.paid_at);

  const captureCall = paypal.calls.find((call) => call.url.endsWith(`/v2/checkout/orders/${PAYPAL_ORDER_ID}/capture`));
  assert.ok(captureCall, "PayPal capture request missing");
  assert.equal(
    captureCall.options.headers["PayPal-Request-Id"],
    "EUS-CAPTURE-EUS-STORE-20260912-ABC12345",
  );
});

test("successful PayPal response with a mismatched amount is held for reconciliation, not marked paid", async () => {
  const db = makeDb(createdOrder());
  const paypal = paypalFetch({ amount: "318.00" });
  const response = await withFetch(paypal.fetch, () => handleStoreCheckoutApi(request(), env(db), CAPTURE_PATH));

  assert.equal(response.status, 409);
  const body = await response.json();
  assert.match(body.error, /requires reconciliation/i);
  assert.equal(db.state.order.payment_status, "RECONCILIATION_HOLD");
  assert.equal(db.state.order.paypal_capture_id, "CAPTURE123");
  assert.equal(db.state.order.paid_at, null);
});

test("capture helpers reject malformed PayPal money and generate stable request ids", () => {
  const helpers = __storeCheckoutCaptureRepairTest;
  const order = { id: "EUS-STORE-20260912-ABC12345" };
  assert.equal(helpers.captureRequestId(order), helpers.captureRequestId(order));
  assert.equal(helpers.captureRequestId(order), "EUS-CAPTURE-EUS-STORE-20260912-ABC12345");
  assert.equal(helpers.paypalMoneyToCents("319.00"), 31900);
  assert.equal(helpers.paypalMoneyToCents("319.9"), 31990);
  assert.equal(helpers.paypalMoneyToCents("319.999"), null);
});

test("direct-site checkout no longer exposes the old Shopify card fallback and includes pre-payment verification", () => {
  assert.doesNotMatch(clientGuardSource, /myshopify\.com/);
  assert.doesNotMatch(clientGuardSource, /SHOPIFY_VARIANT_ID/);
  assert.match(clientGuardSource, /former SOK -> Shopify card fallback is intentionally disabled/);
  assert.match(clientGuardSource, /Verify before payment/);
  assert.match(clientGuardSource, /Review full product details/);
});
