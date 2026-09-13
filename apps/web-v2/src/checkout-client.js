export const checkoutClientScript = `
(() => {
  const STORAGE_KEY = 'elevation-cart-v1';
  const IDEMPOTENCY_KEY = 'elevation-checkout-idempotency-v1';
  const form = document.querySelector('[data-checkout-form]');
  const root = document.querySelector('[data-checkout-root]');
  if (!form || !root) return;

  function readCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((line) => ({ productId: String(line?.productId || '').toLowerCase(), quantity: Number(line?.quantity) }))
        .filter((line) => line.productId && Number.isInteger(line.quantity) && line.quantity > 0);
    } catch {
      return [];
    }
  }

  const money = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price?.currency || 'USD'
  }).format(Number(price?.amount || 0));

  function orderPayloadFromForm(data) {
    return {
      items: readCart(),
      customer: {
        email: String(data.get('email') || ''),
        phone: String(data.get('phone') || '')
      },
      shipping: {
        fullName: String(data.get('fullName') || ''),
        address1: String(data.get('address1') || ''),
        address2: String(data.get('address2') || ''),
        city: String(data.get('city') || ''),
        countryCode: String(data.get('country') || 'US'),
        state: String(data.get('state') || ''),
        postalCode: String(data.get('postalCode') || '')
      }
    };
  }

  function idempotencyFor(payload) {
    const fingerprint = JSON.stringify({ items: payload.items, customer: payload.customer, shipping: payload.shipping });
    try {
      const saved = JSON.parse(sessionStorage.getItem(IDEMPOTENCY_KEY) || '{}');
      if (saved.fingerprint === fingerprint && saved.key) return saved.key;
      const key = crypto.randomUUID ? crypto.randomUUID() : 'checkout-' + Date.now() + '-' + Math.random().toString(16).slice(2);
      sessionStorage.setItem(IDEMPOTENCY_KEY, JSON.stringify({ fingerprint, key }));
      return key;
    } catch {
      return 'checkout-' + Date.now() + '-' + Math.random().toString(16).slice(2);
    }
  }

  function appendNotice(title, message) {
    const notice = document.createElement('div');
    notice.className = 'cart-notice';
    const heading = document.createElement('h2');
    heading.textContent = title;
    const copy = document.createElement('p');
    copy.textContent = message;
    notice.append(heading, copy);
    root.prepend(notice);
  }

  async function prepareOrder(orderPayload) {
    root.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/api/order/create', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...orderPayload, idempotencyKey: idempotencyFor(orderPayload) })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        const message = response.status === 409
          ? 'The order is still on hold because one or more authoritative totals or fulfillment controls are not verified. No payment order was created.'
          : 'Secure payment is not available for this order right now. No charge was made.';
        appendNotice('Payment not started', message);
        return;
      }
      if (!payload.approveUrl) {
        appendNotice('Payment not started', 'The payment provider did not return an approval path. No charge was made.');
        return;
      }
      const approval = new URL(payload.approveUrl);
      if (approval.protocol !== 'https:' || !approval.hostname.endsWith('paypal.com')) {
        appendNotice('Payment not started', 'The payment approval destination was rejected. No charge was made.');
        return;
      }
      window.location.assign(approval.href);
    } catch {
      appendNotice('Payment unavailable', 'We could not prepare secure payment. No charge was made.');
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  function render(payload, orderPayload) {
    root.replaceChildren();

    if (payload.blocked?.length || payload.destinationBlocked?.length) {
      appendNotice('Checkout hold', 'This cart or destination does not currently pass Elevation checkout controls. No order or payment was created.');
    }

    if (!payload.lines?.length) {
      const empty = document.createElement('div');
      empty.className = 'cart-empty';
      empty.innerHTML = '<h2>No purchasable items</h2><p>The current saved cart does not contain products that pass canonical orderability checks.</p><a href="/store">Return to the store →</a>';
      root.append(empty);
      return;
    }

    const lines = document.createElement('div');
    lines.className = 'cart-lines';
    payload.lines.forEach((line) => {
      const row = document.createElement('article');
      row.className = 'cart-line';
      row.innerHTML = '<div><p class="vendor"></p><h2></h2><p class="sku"></p></div><div class="cart-line-controls"><span data-qty></span><strong></strong></div>';
      row.querySelector('.vendor').textContent = line.vendorName;
      row.querySelector('h2').textContent = line.title;
      row.querySelector('.sku').textContent = line.sku;
      row.querySelector('[data-qty]').textContent = 'Qty ' + line.quantity;
      row.querySelector('strong').textContent = money(line.lineTotal);
      lines.append(row);
    });
    root.append(lines);

    const summary = document.createElement('section');
    summary.className = 'cart-summary';
    summary.innerHTML = '<div><span>Merchandise subtotal</span><strong data-subtotal></strong></div><div><span>Shipping</span><strong>Verified before payment</strong></div><div><span>Tax</span><strong>Verified before payment</strong></div><p data-status></p><button type="button" data-prepare-payment disabled>Prepare secure payment</button>';
    summary.querySelector('[data-subtotal]').textContent = money(payload.totals?.merchandiseSubtotal);
    summary.querySelector('[data-status]').textContent = payload.checkoutReady
      ? 'Product and destination review passed. The order service will perform the final authoritative total, storage and fulfillment checks before PayPal can be created.'
      : 'Checkout cannot advance until every product and destination control passes.';
    const prepare = summary.querySelector('[data-prepare-payment]');
    prepare.disabled = !payload.checkoutReady;
    if (payload.checkoutReady) prepare.addEventListener('click', () => prepareOrder(orderPayload));
    root.append(summary);
  }

  async function captureReturnedPayment() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('payment');
    const token = String(params.get('token') || '');
    if (state === 'cancelled') {
      appendNotice('Payment cancelled', 'The PayPal approval was cancelled. No new capture was requested.');
      return;
    }
    if (state !== 'return' || !/^[A-Z0-9-]{8,80}$/i.test(token)) return;

    root.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/api/order/paypal/' + encodeURIComponent(token) + '/capture', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: '{}'
      });
      const payload = await response.json().catch(() => ({}));
      root.replaceChildren();
      if (!response.ok) {
        appendNotice('Payment reconciliation hold', 'The returned payment could not be safely reconciled. No duplicate capture was attempted.');
        return;
      }
      const complete = document.createElement('div');
      complete.className = 'cart-empty';
      complete.innerHTML = '<h2>Payment recorded</h2><p>Your Elevation order is recorded and ready for fulfillment routing.</p><a href="/store">Return to the store →</a>';
      root.append(complete);
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(IDEMPOTENCY_KEY);
      history.replaceState({}, '', '/checkout');
    } catch {
      appendNotice('Payment reconciliation unavailable', 'We could not safely reconcile the returned payment. No duplicate capture was attempted.');
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const orderPayload = orderPayloadFromForm(data);
    const checkoutBody = {
      items: orderPayload.items,
      destination: {
        country: orderPayload.shipping.countryCode,
        state: orderPayload.shipping.state,
        postalCode: orderPayload.shipping.postalCode
      }
    };

    root.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/api/checkout/resolve', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(checkoutBody)
      });
      if (!response.ok) throw new Error('checkout resolve failed');
      render(await response.json(), orderPayload);
    } catch {
      root.replaceChildren();
      const error = document.createElement('div');
      error.className = 'cart-empty';
      error.innerHTML = '<h2>Checkout unavailable</h2><p>We could not verify this checkout review. No order or payment was created.</p><a href="/cart">Return to cart →</a>';
      root.append(error);
    } finally {
      root.removeAttribute('aria-busy');
    }
  });

  captureReturnedPayment();
})();
`;
