export function renderCheckoutPage() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#07161c">
<meta name="description" content="Complete your Elevation UpScales order securely.">
<meta name="robots" content="noindex,nofollow">
<link rel="canonical" href="https://elevationupscales.com/checkout">
<title>Checkout | Elevation UpScales</title>
<link rel="stylesheet" href="/assets/app.css">
<script defer src="/assets/checkout.js"></script>
</head>
<body>
<header class="catalog-topnav"><div class="catalog-nav-inner"><a class="catalog-brand" href="/">Elevation UpScales</a><nav aria-label="Checkout navigation"><a href="/store">Shop</a><a href="/cart">Cart</a></nav></div></header>
<main id="main" class="catalog-main"><div class="catalog-shell">
<section class="catalog-hero"><p>SECURE CHECKOUT</p><h1>Checkout</h1></section>
<section class="checkout-layout">
<form class="checkout-destination" data-checkout-form>
<h2>Contact & delivery</h2>
<label>Email <input type="email" name="email" autocomplete="email" required></label>
<label>Phone <input type="tel" name="phone" autocomplete="tel"></label>
<label>Full name <input name="fullName" autocomplete="name" required></label>
<label>Address <input name="address1" autocomplete="address-line1" required></label>
<label>Address line 2 <input name="address2" autocomplete="address-line2"></label>
<label>City <input name="city" autocomplete="address-level2" required></label>
<label>State <input name="state" autocomplete="address-level1" maxlength="2" pattern="[A-Za-z]{2}" required placeholder="CO"></label>
<label>ZIP <input name="postalCode" autocomplete="postal-code" inputmode="numeric" required></label>
<button type="submit">Continue</button>
<p class="checkout-help">Saved on this device. Payment details stay securely with PayPal.</p>
</form>
<section class="checkout-review" data-checkout-root aria-live="polite"><div class="cart-empty"><h2>Order summary</h2><p>Enter your delivery details once, then continue to PayPal.</p></div></section>
</section>
</div></main>
<footer class="catalog-footer"><div class="catalog-nav-inner"><a href="/store">Shop</a><a href="/cart">Cart</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><span>© 2026 Elevation UpScales, Inc.</span></div></footer>
</body>
</html>`;
}
