export const checkoutClientScript = `
(() => {
  const CART_KEY = 'elevation-cart-v1';
  const CHECKOUT_KEY = 'elevation-checkout-profile-v1';
  const IDEMPOTENCY_KEY = 'elevation-checkout-idempotency-v1';
  const form = document.querySelector('[data-checkout-form]');
  const root = document.querySelector('[data-checkout-root]');
  if (!form || !root) return;

  function readCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((line) => ({ productId: String(line?.productId || '').toLowerCase(), quantity: Number(line?.quantity) }))
        .filter((line) => line.productId && Number.isInteger(line.quantity) && line.quantity > 0);
    } catch {
      return [];
    }
  }

  function readProfile() {
    try {
      const saved = JSON.parse(localStorage.getItem(CHECKOUT_KEY) || '{}');
      return saved && typeof saved === 'object' ? saved : {};
    } catch {
      return {};
    }
  }

  function saveProfile() {
    const data = new FormData(form);
    const profile = {};
    ['email','phone','fullName','address1','address2','city','state','postalCode'].forEach((name) => {
      profile[name] = String(data.get(name) || '').trim();
    });
    localStorage.setItem(CHECKOUT_KEY, JSON.stringify(profile));
  }

  function restoreProfile() {
    const profile = readProfile();
    Object.entries(profile).forEach(([name, value]) => {
      const field = form.elements.namedItem(name);
      if (field && typeof value === 'string' && !field.value) field.value = value;
    });
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
        countryCode: 'US',
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
      if (!response.ok || !payload.approveUrl) {
        appendNotice('Payment unavailable', 'We could not start PayPal. No charge was made.');
        return;
      }
      const approval = new URL(payload.approveUrl);
      if (approval.protocol !== 'https:' || !approval.hostname.endsWith('paypal.com')) {
        appendNotice('Payment unavailable', 'We could not open PayPal. No charge was made.');
        return;
      }
      saveProfile();
      window.location.assign(approval.href);
    } catch {
      appendNotice('Payment unavailable', 'We could not start PayPal. No charge was made.');
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  function render(payload, orderPayload) {
    root.replaceChildren();

    if (!payload.lines?.length) {
      const empty = document.createElement('div');
      empty.className = 'cart-empty';
      empty.innerHTML = '<h2>Your cart is empty</h2><a href="/store">Return to store →</a>';
      root.append(empty);
      return;
    }

    const summary = document.createElement('section');
    summary.className = 'cart-summary';
    summary.innerHTML = '<div><span>Items</span><strong data-count></strong></div><div><span>Subtotal</span><strong data-subtotal></strong></div><div><span>Shipping + tax</span><strong>Confirmed before PayPal</strong></div><button type="button" data-prepare-payment disabled>Pay with PayPal</button>';
    summary.querySelector('[data-count]').textContent = String(payload.lines.reduce((total, line) => total + Number(line.quantity || 0), 0));
    summary.querySelector('[data-subtotal]').textContent = money(payload.totals?.merchandiseSubtotal);
    const prepare = summary.querySelector('[data-prepare-payment]');
    prepare.disabled = !payload.checkoutReady;
    if (payload.checkoutReady) prepare.addEventListener('click', () => prepareOrder(orderPayload));
    root.append(summary);

    if (!payload.checkoutReady) appendNotice('Checkout unavailable', 'This order cannot continue for this address yet.');
  }

  async function resolveCheckout() {
    const data = new FormData(form);
    const orderPayload = orderPayloadFromForm(data);
    saveProfile();
    root.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/api/checkout/resolve', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: orderPayload.items,
          destination: {
            country: 'US',
            state: orderPayload.shipping.state,
            postalCode: orderPayload.shipping.postalCode
          }
        })
      });
      if (!response.ok) throw new Error('checkout resolve failed');
      render(await response.json(), orderPayload);
    } catch {
      root.replaceChildren();
      const error = document.createElement('div');
      error.className = 'cart-empty';
      error.innerHTML = '<h2>Checkout unavailable</h2><a href="/cart">Return to cart →</a>';
      root.append(error);
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  async function captureReturnedPayment() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('payment');
    const token = String(params.get('token') || '');
    if (state === 'cancelled') {
      appendNotice('Payment cancelled', 'No charge was made. Your cart and delivery details are still saved on this device.');
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
      root.replaceChildren();
      if (!response.ok) {
        appendNotice('Payment needs attention', 'We could not confirm the returned payment automatically. Please contact Elevation UpScales.');
        return;
      }
      const complete = document.createElement('div');
      complete.className = 'cart-empty';
      complete.innerHTML = '<h2>Order confirmed</h2><p>Your order is ready for fulfillment.</p><a href="/store">Continue shopping →</a>';
      root.append(complete);
      localStorage.removeItem(CART_KEY);
      sessionStorage.removeItem(IDEMPOTENCY_KEY);
      history.replaceState({}, '', '/checkout');
    } catch {
      appendNotice('Payment needs attention', 'We could not confirm the returned payment automatically. Please contact Elevation UpScales.');
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  form.addEventListener('input', saveProfile);
  form.addEventListener('change', saveProfile);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await resolveCheckout();
  });

  restoreProfile();
  captureReturnedPayment();
})();
`;
