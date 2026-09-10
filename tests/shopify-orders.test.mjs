import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { __shopifyOrderTest as bridge } from "../site/worker/domains/shopify-orders.js";

function sampleOrder(overrides = {}) {
  return {
    id: 900100200300,
    name: "#1901",
    created_at: "2026-09-10T02:00:00-06:00",
    processed_at: "2026-09-10T02:01:00-06:00",
    financial_status: "paid",
    currency: "USD",
    current_subtotal_price: "319.00",
    current_total_discounts: "0.00",
    current_total_tax: "25.52",
    current_total_price: "344.52",
    current_shipping_price_set: { shop_money: { amount: "0.00" } },
    contact_email: "customer@example.com",
    customer: { phone: "+12085550123" },
    shipping_address: {
      name: "Test Customer", address1: "1 Main St", address2: "", city: "Boise",
      province_code: "ID", zip: "83702", country_code: "US", phone: "+12085550123",
    },
    line_items: [{
      id: 701, product_id: 801, variant_id: 901, sku: "SK12V100PC",
      title: "Premium 12V 100Ah Bluetooth LiFePO4 Battery", variant_title: null,
      quantity: 1, price: "319.00", discount_allocations: [], fulfillment_status: null,
    }],
    ...overrides,
  };
}

test("valid Shopify HMAC authenticates and invalid HMAC fails", async () => {
  const secret = "unit-test-secret";
  const payload = new TextEncoder().encode(JSON.stringify(sampleOrder()));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = Buffer.from(await crypto.subtle.sign("HMAC", key, payload)).toString("base64");
  assert.equal(await bridge.verifyShopifyHmac(payload, signature, secret), true);
  assert.equal(await bridge.verifyShopifyHmac(payload, Buffer.from("wrong").toString("base64"), secret), false);
});

test("shop domain normalization supports exact expected-shop checks", () => {
  assert.equal(bridge.normalizeShopDomain("HTTPS://Elevation-UpScales.MyShopify.com/"), "elevation-upscales.myshopify.com");
  assert.notEqual(bridge.normalizeShopDomain("other-shop.myshopify.com"), "elevation-upscales.myshopify.com");
});

test("exact canonical SKU maps to SOK and title-only text does not", () => {
  const exact = bridge.resolveSokLine({ sku: "sk12v100pc", title: "anything" });
  assert.equal(exact.isSok, true);
  assert.equal(exact.supplier, "sok");
  assert.equal(exact.supplierSku, "SK12V100PC");
  const falsePositive = bridge.resolveSokLine({ sku: "NOT-SOK-001", title: "SOK SK12V100PC battery" });
  assert.equal(falsePositive.isSok, false);
  assert.equal(falsePositive.supplier, "");
});

test("multi-item paid order preserves lines, customer, shipping, totals, and non-SOK identity", async () => {
  const order = sampleOrder({
    current_subtotal_price: "339.00",
    current_total_tax: "27.12",
    current_total_price: "366.12",
    line_items: [
      sampleOrder().line_items[0],
      { id: 702, product_id: 802, variant_id: 902, sku: "GEAR-001", title: "Non-SOK Gear", quantity: 2, price: "10.00", discount_allocations: [], fulfillment_status: null },
    ],
  });
  const prepared = await bridge.prepareShopifyOrder(order, { shopDomain: "elevation-upscales.myshopify.com", receivedAt: "2026-09-10T08:02:00Z" });
  assert.equal(prepared.items.length, 2);
  assert.equal(prepared.items[0].supplier, "sok");
  assert.equal(prepared.items[1].supplier, "");
  assert.equal(prepared.header.productId, "shopify-multi");
  assert.equal(prepared.header.supplier.supplier, "mixed");
  assert.equal(prepared.customer.email, "customer@example.com");
  assert.equal(prepared.shipping.state, "ID");
  assert.equal(prepared.totals.merchandiseCents, 33900);
  assert.equal(prepared.totals.taxCents, 2712);
  assert.equal(prepared.totals.totalPaidCents, 36612);
});

test("SOK paid order starts actionable but explicitly unreserved at supplier", async () => {
  const prepared = await bridge.prepareShopifyOrder(sampleOrder(), { shopDomain: "elevation-upscales.myshopify.com", receivedAt: "2026-09-10T08:02:00Z" });
  assert.equal(prepared.header.fulfillmentStatus, "fulfillment_pending");
  assert.equal(prepared.header.supplier.supplier, "sok");
  assert.equal(prepared.header.supplier.supplierStockReserved, false);
  assert.equal(prepared.header.supplier.supplierReservationState, "not_reserved_until_supplier_payment");
  assert.match(prepared.header.fulfillmentNotes, /not reserved until Elevation supplier payment/i);
});

test("same Shopify order deterministically resolves to the same Elevation reference for replay safety", async () => {
  const a = await bridge.deterministicOrderReference("elevation-upscales.myshopify.com", "900100200300", "2026-09-10T08:01:00Z");
  const b = await bridge.deterministicOrderReference("elevation-upscales.myshopify.com", "900100200300", "2026-09-10T08:01:00Z");
  assert.equal(a, b);
  assert.match(a, /^EUS-STORE-20260910-[A-F0-9]{8}$/);
});

test("schema defines provider-neutral external orders, normalized items, and webhook uniqueness", async () => {
  const source = await readFile(new URL("../site/commerce-schema-migrations.js", import.meta.url), "utf8");
  assert.match(source, /CREATE TABLE IF NOT EXISTS eus_store_order_external/);
  assert.match(source, /UNIQUE\(sales_channel,shop_domain,external_order_id\)/);
  assert.match(source, /CREATE TABLE IF NOT EXISTS eus_store_order_items/);
  assert.match(source, /CREATE TABLE IF NOT EXISTS eus_shopify_webhook_receipts/);
  assert.match(source, /webhook_id TEXT PRIMARY KEY/);
});
