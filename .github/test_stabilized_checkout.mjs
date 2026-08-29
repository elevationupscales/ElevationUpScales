import assert from "node:assert/strict";
import { handleStoreCheckoutApi } from "../site/store-checkout-server.js";

let now = 1_000_000;
Date.now = () => now;

class FakeStatement {
  bind() { return this; }
  async run() { return { success: true }; }
  async first() { return null; }
  async all() { return { results: [] }; }
}
class FakeDb {
  prepare() { return new FakeStatement(); }
}

const db = new FakeDb();
const dobaMap = JSON.stringify({
  rvtest: {
    shippingVerified: true,
    priceCents: 12500,
    shippingCents: 0,
    name: "Stabilization Test RV Item",
    imageUrl: "https://example.invalid/test.webp",
    itemNo: "TESTITEM",
    skuId: "TESTSKU",
    spuNo: "TESTSPU",
    blockedStates: ["HI"],
  },
});

const liveEnv = {
  MARKETPLACE_DB: db,
  DOBA_PRODUCT_MAP_JSON: dobaMap,
  PAYPAL_ENV: "live",
  PAYPAL_CLIENT_ID: "live-test-client",
  PAYPAL_CLIENT_SECRET: "live-test-secret",
  STORE_LIVE_CHECKOUT_ENABLED: "true",
};
const sandboxEnv = {
  ...liveEnv,
  PAYPAL_ENV: "sandbox",
  PAYPAL_CLIENT_ID: "sandbox-test-client",
};

let tokenCalls = 0;
let createCalls = 0;
let captureCalls = 0;
let order401Once = false;
let oauthFail = false;
let captureDecline = false;
let lastTokenUrl = "";

globalThis.fetch = async (url) => {
  const target = String(url);
  if (target.endsWith("/v1/oauth2/token")) {
    tokenCalls += 1;
    lastTokenUrl = target;
    if (oauthFail) return new Response(JSON.stringify({ error: "invalid_client" }), { status: 401, headers: { "Content-Type": "application/json" } });
    return new Response(JSON.stringify({ access_token: `token-${tokenCalls}`, expires_in: 300 }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (/\/v2\/checkout\/orders\/[^/]+\/capture$/.test(target)) {
    captureCalls += 1;
    if (captureDecline) {
      return new Response(JSON.stringify({ details: [{ issue: "INSTRUMENT_DECLINED" }] }), { status: 422, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ id: "TESTORDER123", status: "COMPLETED", purchase_units: [{ payments: { captures: [{ id: "CAPTURE123", status: "COMPLETED", amount: { value: "125.00", currency_code: "USD" } }] } }] }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  if (target.endsWith("/v2/checkout/orders")) {
    createCalls += 1;
    if (order401Once) {
      order401Once = false;
      return new Response(JSON.stringify({ error: "expired" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ id: "TESTORDER123" }), { status: 200, headers: { "Content-Type": "application/json" } });
  }
  throw new Error(`Unexpected fetch: ${target}`);
};

function requestBody(overrides = {}) {
  return {
    source: "rv",
    id: "rvtest",
    quantity: 1,
    customer: { email: "test@example.com", phone: "2088134998" },
    shipping: { fullName: "Test User", address1: "1 Main St", city: "Denver", state: "CO", postalCode: "80202", countryCode: "US" },
    ...overrides,
  };
}

async function post(path, env, body = {}) {
  const request = new Request(`https://unit.test${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  return handleStoreCheckoutApi(request, env, path);
}

// Successful live order creation acquires one OAuth token.
let response = await post("/api/store-checkout/orders", liveEnv, requestBody());
assert.equal(response.status, 200);
assert.equal(tokenCalls, 1);
assert.equal(createCalls, 1);
assert.match(lastTokenUrl, /api-m\.paypal\.com/);

// Reuse while token remains valid.
response = await post("/api/store-checkout/orders", liveEnv, requestBody());
assert.equal(response.status, 200);
assert.equal(tokenCalls, 1);
assert.equal(createCalls, 2);

// Expiration forces a fresh OAuth token.
now += 301_000;
response = await post("/api/store-checkout/orders", liveEnv, requestBody());
assert.equal(response.status, 200);
assert.equal(tokenCalls, 2);

// Provider 401 forces exactly one token refresh/retry.
order401Once = true;
response = await post("/api/store-checkout/orders", liveEnv, requestBody());
assert.equal(response.status, 200);
assert.equal(tokenCalls, 3);

// Sandbox mode selects sandbox PayPal origin without changing amounts/business rules.
response = await post("/api/store-checkout/orders", sandboxEnv, requestBody());
assert.equal(response.status, 200);
assert.equal(tokenCalls, 4);
assert.match(lastTokenUrl, /api-m\.sandbox\.paypal\.com/);

// Bad provider credentials are controlled 502, not an uncaught runtime exception.
oauthFail = true;
const badEnv = { ...liveEnv, PAYPAL_CLIENT_ID: "bad-client", PAYPAL_CLIENT_SECRET: "bad-secret" };
response = await post("/api/store-checkout/orders", badEnv, requestBody());
assert.equal(response.status, 502);
oauthFail = false;

// Storage unavailable fails closed before a payment/order provider call.
const beforeStorageTokenCalls = tokenCalls;
response = await post("/api/store-checkout/orders", { ...liveEnv, MARKETPLACE_DB: undefined }, requestBody());
assert.equal(response.status, 503);
assert.equal(tokenCalls, beforeStorageTokenCalls);

// Capture provider decline is surfaced as controlled 422.
captureDecline = true;
response = await post("/api/store-checkout/orders/TESTORDER123/capture", liveEnv, {});
assert.equal(response.status, 422);
assert.equal(captureCalls, 1);
captureDecline = false;

console.log(JSON.stringify({
  status: "PASS",
  tokenCalls,
  createCalls,
  captureCalls,
  checks: ["live-token-acquire", "reuse", "expiry-refresh", "401-refresh", "sandbox-origin", "bad-credentials", "storage-fail-closed", "capture-decline"],
}));
