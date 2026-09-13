export const checkoutClientScript = `
(() => {
  const STORAGE_KEY = 'elevation-cart-v1';
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

  function render(payload) {
    root.replaceChildren();

    if (payload.blocked?.length || payload.destinationBlocked?.length) {
      const hold = document.createElement('div');
      hold.className = 'cart-notice';
      hold.innerHTML = '<h2>Checkout hold</h2><p>This cart or destination does not currently pass Elevation checkout controls. No order or payment was created.</p>';
      root.append(hold);
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
    summary.innerHTML = '<div><span>Merchandise subtotal</span><strong data-subtotal></strong></div><div><span>Shipping</span><strong>Calculated in order phase</strong></div><div><span>Tax</span><strong>Calculated in order phase</strong></div><p data-status></p><button type="button" disabled>Payment not enabled in this phase</button>';
    summary.querySelector('[data-subtotal]').textContent = money(payload.totals?.merchandiseSubtotal);
    summary.querySelector('[data-status]').textContent = payload.checkoutReady
      ? 'Product and destination review passed. The next order/payment phase still performs final authoritative checks.'
      : 'Checkout cannot advance until every product and destination control passes.';
    root.append(summary);
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const body = {
      items: readCart(),
      destination: {
        country: String(data.get('country') || 'US'),
        state: String(data.get('state') || ''),
        postalCode: String(data.get('postalCode') || '')
      }
    };

    root.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch('/api/checkout/resolve', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!response.ok) throw new Error('checkout resolve failed');
      render(await response.json());
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
})();
`;
