export function renderCheckoutPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#07161c">
<meta name="description" content="Review destination eligibility and current product totals before an Elevation UpScales order advances.">
<meta name="robots" content="noindex,nofollow">
<link rel="canonical" href="https://elevationupscales.com/checkout">
<title>Checkout | Elevation UpScales</title>
<link rel="stylesheet" href="/assets/app.css">
<script defer src="/assets/checkout.js"></script>
</head>
<body>
<header class="catalog-topnav"><div class="catalog-nav-inner"><a class="catalog-brand" href="/">Elevation UpScales</a><nav aria-label="Checkout navigation"><a href="/store">Shop</a><a href="/cart">Cart</a><a href="/checkout" aria-current="page">Checkout</a></nav></div></header>
<main id="main" class="catalog-main"><div class="catalog-shell">
<section class="catalog-hero"><p>DIRECT ELEVATION COMMERCE</p><h1>Checkout Review</h1><p>Your cart is revalidated against current Elevation product truth, then the destination is checked before an order can advance. No browser price or availability state is trusted.</p></section>
<section class="checkout-layout">
<form class="checkout-destination" data-checkout-form>
<h2>Destination eligibility</h2>
<input type="hidden" name="country" value="US">
<label>State <input name="state" autocomplete="address-level1" maxlength="2" pattern="[A-Za-z]{2}" required placeholder="CO"></label>
<label>ZIP code <input name="postalCode" autocomplete="postal-code" inputmode="numeric" required placeholder="80903"></label>
<button type="submit">Review checkout</button>
<p class="checkout-help">Hawaii, Alaska, freight and other special routes remain held unless the exact product route is verified.</p>
</form>
<section class="checkout-review" data-checkout-root aria-live="polite"><div class="cart-empty"><h2>Enter a destination</h2><p>We will re-check the saved cart and destination before anything can advance.</p></div></section>
</section>
</div></main>
<footer class="catalog-footer"><div class="catalog-nav-inner"><a href="/store">Shop</a><a href="/cart">Cart</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© 2026 Elevation UpScales, Inc.</span></div></footer>
</body>
</html>`;
}
