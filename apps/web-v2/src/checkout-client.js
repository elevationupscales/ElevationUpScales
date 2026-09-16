export const checkoutClientScript = `
(() => {
  const STORAGE_KEY = 'elevation-cart-v1';
  const IDEMPOTENCY_KEY = 'elevation-checkout-idempotency-v1';
  const SUPPORT_EMAIL = 'casey@elevationupscales.com';
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

  function appendNotice(title, message, link = null) {
    const notice = document.createElement('div');
    notice.className = 'cart-notice';
    const heading = document.createElement('h2');
    heading.textContent = title;
    const copy = document.createElement('p');
    copy.textContent = message;
    notice.append(heading, copy);
    if (link) {
      const action = document.createElement('a');
      action.className = 'button button-primary';
      action.href = link.href;
      action.textContent = link.label;
      notice.append(action);
    }
    root.prepend(notice);
  }

  function supportLink(orderPayload, label = 'Email us about this order') {
    const subject = encodeURIComponent('Website order help');
    const lines = orderPayload.items.map((item) => item.productId + ' × ' + item.quantity).join('\n');
    const body = encodeURIComponent(
      'Hi Elevation UpScales,\n\nI need help completing this website order.\n\nItems:\n' + lines +
      '\n\nDestination: ' + orderPayload.shipping.state + ' ' + orderPayload.shipping.postalCode + '\n'
    );
    return { href: 'mailto:' + SUPPORT_EMAIL + '?subject=' + subject + '&body=' + body, label };
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
          ? 'We could not finish the shipping, tax, or final total for this order online. No charge was made.'
          : 'Secure payment is temporarily unavailable. No charge was made.';
        appendNotice('We need a little help to finish this order', message, supportLink(orderPayload));
        return;
      }
      if (!payload.approveUrl) {
        appendNotice('Payment unavailable', 'PayPal did not return a secure payment link. No charge was made.', supportLink(orderPayload));
        return;
      }
      const approval = new URL(payload.approveUrl);
      if (approval.protocol !== 'https:' || !approval.hostname.endsWith('paypal.com')) {
        appendNotice('Payment unavailable', 'We could not open the secure PayPal payment page. No charge was made.', supportLink(orderPayload));
        return;
      }
      window.location.assign(approval.href);
    } catch {
      appendNotice('Payment unavailable', 'We could not connect to secure payment. No charge was made.', supportLink(orderPayload));
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  function render(payload, orderPayload) {
    root.replaceChildren();

    if (payload.blocked?.length) {
      appendNotice('An item is not available online', 'One or more items in your cart cannot be purchased online right now.', supportLink(orderPayload, 'Email us about the item'));
    }

    if (payload.destinationBlocked?.length) {
      const reasons = payload.destinationBlocked.map((item) => item.reason);
      const hawaii = reasons.includes('HAWAII_CONTACT_REQUIRED');
      const alaska = reasons.includes('ALASKA_CONTACT_REQUIRED');
      if (hawaii) appendNotice('Hawaii shipping available', 'This item needs a quick Hawaii shipping check before purchase.', supportLink(orderPayload, 'Email us about Hawaii shipping'));
      else if (alaska) appendNotice('Alaska shipping available', 'This item needs a quick Alaska shipping check before purchase.', supportLink(orderPayload, 'Email us about Alaska shipping'));
      else appendNotice('Shipping needs a quick check', 'We need to confirm shipping for this item and destination before purchase.', supportLink(orderPayload));
    }

    if (!payload.lines?.length) {
      const empty = document.createElement('div');
      empty.className = 'cart-empty';
      empty.innerHTML = '<h2>No items ready for checkout</h2><p>Please return to the store or contact us for help.</p><a href="/store">Return to the store →</a>';
      root.append(empty);
      return false;
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
    summary.innerHTML = '<div><span>Merchandise</span><strong data-subtotal></strong></div><div><span>Shipping</span><strong>Confirmed before payment</strong></div><div><span>Tax</span><strong>Confirmed before payment</strong></div><p data-status></p>';
    summary.querySelector('[data-subtotal]').textContent = money(payload.totals?.merchandiseSubtotal);
    summary.querySelector('[data-status]').textContent = payload.checkoutReady
      ? 'Opening secure PayPal checkout…'
      : 'Contact us if you need help completing this order.';
    root.append(summary);

    return Boolean(payload.checkoutReady);
  }

  async function captureReturnedPayment() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('payment');
    const token = String(params.get('token') || '');
    if (state === 'cancelled') {
      appendNotice('Payment cancelled', 'Your PayPal payment was cancelled. You can try again whenever you’re ready.');
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
        appendNotice('We’re confirming your payment', 'We could not finish confirming the returned payment automatically. Please contact Elevation and do not submit a second payment.', { href: 'mailto:' + SUPPORT_EMAIL + '?subject=' + encodeURIComponent('Payment confirmation help'), label: 'Contact Elevation' });
        return;
      }
      const complete = document.createElement('div');
      complete.className = 'cart-empty';
      complete.innerHTML = '<h2>Thank you for your order</h2><p>Your payment is recorded and your Elevation order is ready for fulfillment. We’ll send the next update as your order moves forward.</p><a href="/store">Continue shopping →</a>';
      root.append(complete);
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(IDEMPOTENCY_KEY);
      history.replaceState({}, '', '/checkout');
    } catch {
      appendNotice('We’re confirming your payment', 'We could not finish confirming the returned payment automatically. Please contact Elevation and do not submit a second payment.', { href: 'mailto:' + SUPPORT_EMAIL + '?subject=' + encodeURIComponent('Payment confirmation help'), label: 'Contact Elevation' });
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
      const payload = await response.json();
      const ready = render(payload, orderPayload);
      if (ready) await prepareOrder(orderPayload);
    } catch {
      root.replaceChildren();
      appendNotice('Checkout temporarily unavailable', 'Please try again in a moment or contact Elevation for help.', supportLink(orderPayload));
    } finally {
      root.removeAttribute('aria-busy');
    }
  });

  captureReturnedPayment();
})();
`;
