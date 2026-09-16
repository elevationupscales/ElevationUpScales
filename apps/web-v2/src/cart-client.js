export const cartClientScript = `
(() => {
  const STORAGE_KEY = 'elevation-cart-v1';

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

  function writeCart(lines) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines.map(({ productId, quantity }) => ({ productId, quantity }))));
  }

  function addProduct(productId) {
    const lines = readCart();
    const existing = lines.find((line) => line.productId === productId);
    if (existing) existing.quantity += 1;
    else lines.push({ productId, quantity: 1 });
    writeCart(lines);
  }

  document.querySelectorAll('[data-add-to-cart]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = String(button.dataset.addToCart || '').toLowerCase();
      if (!productId) return;
      addProduct(productId);
      const original = button.textContent;
      button.textContent = 'Added ✓';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = original || 'Add to Cart';
        button.disabled = false;
      }, 900);
    });
  });

  document.querySelectorAll('[data-buy-now]').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = String(button.dataset.buyNow || '').toLowerCase();
      if (!productId) return;
      writeCart([{ productId, quantity: 1 }]);
      window.location.assign('/checkout');
    });
  });

  const root = document.querySelector('[data-cart-root]');
  if (!root) return;

  const money = (price) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price?.currency || 'USD'
  }).format(Number(price?.amount || 0));

  const render = (payload) => {
    root.replaceChildren();

    if (payload.blocked?.length) {
      const notice = document.createElement('div');
      notice.className = 'cart-notice';
      notice.textContent = 'An unavailable item was removed from your cart.';
      root.append(notice);
    }

    if (!payload.lines?.length) {
      const empty = document.createElement('div');
      empty.className = 'cart-empty';
      empty.innerHTML = '<h2>Your cart is empty</h2><a href="/store">Keep shopping →</a>';
      root.append(empty);
      writeCart([]);
      return;
    }

    const list = document.createElement('div');
    list.className = 'cart-lines';

    payload.lines.forEach((line) => {
      const row = document.createElement('article');
      row.className = 'cart-line';
      row.innerHTML = '<div><h2></h2><p class="sku"></p></div><div class="cart-line-controls"><label>Qty <input type="number" min="1" max="20"></label><strong></strong><button type="button">Remove</button></div>';
      row.querySelector('h2').textContent = line.title;
      row.querySelector('.sku').textContent = line.sku;
      row.querySelector('strong').textContent = money(line.lineTotal);
      const input = row.querySelector('input');
      input.value = String(line.quantity);
      input.addEventListener('change', () => {
        const next = readCart();
        const match = next.find((item) => item.productId === line.productId);
        const quantity = Number(input.value);
        if (match && Number.isInteger(quantity) && quantity >= 1 && quantity <= 20) match.quantity = quantity;
        writeCart(next);
        sync();
      });
      row.querySelector('button').addEventListener('click', () => {
        writeCart(readCart().filter((item) => item.productId !== line.productId));
        sync();
      });
      list.append(row);
    });

    root.append(list);

    const summary = document.createElement('section');
    summary.className = 'cart-summary';
    summary.innerHTML = '<div><span>Subtotal</span><strong data-subtotal></strong></div><a class="button button-primary" data-checkout-link href="/checkout">Checkout</a>';
    summary.querySelector('[data-subtotal]').textContent = money(payload.subtotal);
    const checkout = summary.querySelector('[data-checkout-link]');
    if (!payload.checkoutReady) {
      checkout.removeAttribute('href');
      checkout.setAttribute('aria-disabled', 'true');
      checkout.textContent = 'Checkout unavailable';
    }
    root.append(summary);

    writeCart(payload.lines.map(({ productId, quantity }) => ({ productId, quantity })));
  };

  async function sync() {
    root.setAttribute('aria-busy', 'true');
    try {
      const items = encodeURIComponent(JSON.stringify(readCart()));
      const response = await fetch('/api/cart/resolve?items=' + items, { credentials: 'same-origin' });
      if (!response.ok) throw new Error('cart resolve failed');
      render(await response.json());
    } catch {
      root.replaceChildren();
      const error = document.createElement('div');
      error.className = 'cart-empty';
      error.innerHTML = '<h2>Cart unavailable</h2><a href="/store">Return to store →</a>';
      root.append(error);
    } finally {
      root.removeAttribute('aria-busy');
    }
  }

  sync();
})();
`;
