export function renderCartPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#07161c">
<meta name="description" content="Review products selected from Elevation UpScales.">
<link rel="canonical" href="https://elevationupscales.com/cart">
<title>Cart | Elevation UpScales</title>
<link rel="stylesheet" href="/assets/app.css">
<script defer src="/assets/cart.js"></script>
</head>
<body>
<header class="catalog-topnav"><div class="catalog-nav-inner"><a class="catalog-brand" href="/">Elevation UpScales</a><nav aria-label="Cart navigation"><a href="/store">Shop</a><a href="/cart" aria-current="page">Cart</a><a href="/start-a-project">Start a Project</a></nav></div></header>
<main id="main" class="catalog-main"><div class="catalog-shell">
<section class="catalog-hero">
<p>YOUR ORDER</p>
<h1>Your Cart</h1>
<p>Review your items and continue to checkout when you're ready.</p>
</section>
<section class="cart-panel" data-cart-root aria-live="polite" aria-busy="true">
<div class="cart-empty"><h2>Loading your cart</h2><p>One moment while we load your items.</p></div>
</section>
<noscript><div class="cart-empty"><h2>JavaScript required</h2><p>Please enable JavaScript to use the shopping cart.</p><a href="/store">Return to the store →</a></div></noscript>
</div></main>
<footer class="catalog-footer"><div class="catalog-nav-inner"><a href="/store">Shop</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© 2026 Elevation UpScales, Inc.</span></div></footer>
</body>
</html>`;
}
