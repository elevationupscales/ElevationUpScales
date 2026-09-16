import test from 'node:test';
import assert from 'node:assert/strict';
import { getProductById } from '../src/catalog.js';
import { resolveOrderHandoff } from '../src/order.js';
import { createLower48ChargeResolver } from '../src/lower48-charges.js';
import { createOrderFromCheckout } from '../src/order-service.js';

const customer = { email: 'checkout-test@example.com' };
const delaware = {
  fullName: 'Checkout Test',
  address1: '1209 Orange St',
  city: 'Wilmington',
  state: 'DE',
  postalCode: '19801',
  countryCode: 'US'
};

const texas = {
  fullName: 'Checkout Test',
  address1: '100 Congress Ave',
  city: 'Austin',
  state: 'TX',
  postalCode: '78701',
  countryCode: 'US'
};

const colorado = {
  fullName: 'Checkout Test',
  address1: '123 Main St',
  city: 'Colorado Springs',
  state: 'CO',
  postalCode: '80903',
  countryCode: 'US'
};

test('SOK Lower-48 resolver produces exact shipping and zero tax outside configured nexus', () => {
  const resolver = createLower48ChargeResolver({});
  const draft = resolveOrderHandoff(
    [{ productId: 'sok-sk12v100pc', quantity: 1 }],
    customer,
    texas,
    { chargeResolver: resolver }
  );

  assert.equal(draft.orderReady, true);
  assert.equal(draft.paymentReady, true);
  assert.deepEqual(draft.totals.merchandiseSubtotal, { currency: 'USD', amount: 319 });
  assert.deepEqual(draft.totals.shipping, { currency: 'USD', amount: 27.99 });
  assert.deepEqual(draft.totals.tax, { currency: 'USD', amount: 0 });
  assert.deepEqual(draft.totals.amountDue, { currency: 'USD', amount: 346.99 });
});

test('Colorado physical-nexus destination fails closed without authoritative destination tax rate', () => {
  const resolver = createLower48ChargeResolver({});
  const draft = resolveOrderHandoff(
    [{ productId: 'sok-sk12v100pc', quantity: 1 }],
    customer,
    colorado,
    { chargeResolver: resolver }
  );

  assert.equal(draft.paymentReady, false);
  assert.ok(draft.holds.includes('TAX_AMOUNT_UNVERIFIED'));
});

test('an explicitly added nexus state also fails closed until a destination rate exists', () => {
  const resolver = createLower48ChargeResolver({ STORE_TAX_NEXUS_STATES: 'CO,TX' });
  const draft = resolveOrderHandoff(
    [{ productId: 'sok-sk12v100pc', quantity: 1 }],
    customer,
    texas,
    { chargeResolver: resolver }
  );

  assert.equal(draft.paymentReady, false);
  assert.ok(draft.holds.includes('TAX_AMOUNT_UNVERIFIED'));
});

test('configured nexus destination tax basis points produce deterministic server totals', () => {
  const resolver = createLower48ChargeResolver({ STORE_SALES_TAX_BPS_JSON: JSON.stringify({ 'CO:80903': 825 }) });
  const draft = resolveOrderHandoff(
    [{ productId: 'sok-sk12v100pc', quantity: 1 }],
    customer,
    colorado,
    { chargeResolver: resolver }
  );

  assert.equal(draft.paymentReady, true);
  assert.deepEqual(draft.totals.shipping, { currency: 'USD', amount: 27.99 });
  assert.deepEqual(draft.totals.tax, { currency: 'USD', amount: 28.63 });
  assert.deepEqual(draft.totals.amountDue, { currency: 'USD', amount: 375.62 });
});

test('one SOK order reaches provider-order creation end to end without capture', async () => {
  let storedOrder;
  let providerCalls = 0;
  const env = {
    PAYPAL_CLIENT_ID: 'configured',
    PAYPAL_CLIENT_SECRET: 'configured',
    PAYPAL_ENV: 'sandbox'
  };
  const storage = {
    async createDirectOrder(_env, draft, key) {
      storedOrder = {
        id: 'EUS-SOK-E2E-1',
        idempotencyKey: key,
        paymentProvider: 'paypal',
        paymentStatus: 'PENDING',
        providerOrderId: null,
        totals: draft.totals
      };
      return { order: storedOrder, reused: false };
    },
    async attachProviderOrder(_env, id, providerOrderId) {
      storedOrder = { ...storedOrder, id, providerOrderId, paymentStatus: 'CREATED' };
      return storedOrder;
    }
  };
  const payment = {
    async createPaypalOrder(_env, order) {
      providerCalls += 1;
      assert.deepEqual(order.totals.amountDue, { currency: 'USD', amount: 346.99 });
      return {
        orderId: 'PAYPAL-SOK-E2E-1',
        approveUrl: 'https://www.paypal.com/checkoutnow?token=PAYPAL-SOK-E2E-1'
      };
    }
  };

  const result = await createOrderFromCheckout({
    items: [{ productId: 'sok-sk12v100pc', quantity: 1 }],
    customer,
    shipping: delaware,
    idempotencyKey: 'sok-e2e-checkout-0001'
  }, env, { productLookup: getProductById, storage, payment });

  assert.equal(result.status, 201);
  assert.equal(result.body.providerOrderId, 'PAYPAL-SOK-E2E-1');
  assert.equal(result.body.paymentStatus, 'CREATED');
  assert.equal(providerCalls, 1);
});
