(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const source = String(params.get("source") || "").trim().toLowerCase();
  const id = String(params.get("id") || "").trim();
  const productName = String(params.get("name") || "").trim();

  // Payment-lane recovery: Elevation direct checkout stays on Elevation + PayPal.
  // The former SOK -> Shopify card fallback is intentionally disabled.
  const shopifyPanel = document.querySelector("#checkout-shopify-direct");
  if (shopifyPanel) shopifyPanel.hidden = true;

  const productCopy = document.querySelector(".eus-checkout-product-copy");
  if (!productCopy || !id || !["rv", "lithium", "apparel"].includes(source)) return;

  const review = document.createElement("section");
  review.className = "eus-checkout-review";
  review.setAttribute("aria-label", "Verify item details before payment");

  const sourceLabel = source === "lithium"
    ? "Lithium / off-grid"
    : source === "rv"
      ? "RV & outdoor"
      : "Elevation apparel";

  const detailUrl = source === "apparel"
    ? "/store"
    : `/product?id=${encodeURIComponent(id)}&store=universal`;

  review.innerHTML = `
    <div class="eus-checkout-review__heading">
      <strong>Verify before payment</strong>
      <span>Elevation secure order review</span>
    </div>
    <dl class="eus-checkout-review__facts">
      <div><dt>Product reference</dt><dd id="checkout-review-sku"></dd></div>
      <div><dt>Department</dt><dd>${escapeHtml(sourceLabel)}</dd></div>
      <div><dt>Selected option</dt><dd id="checkout-review-option">Standard item</dd></div>
      <div><dt>Current unit price</dt><dd id="checkout-review-price">Confirming…</dd></div>
    </dl>
    <p class="eus-checkout-review__note">Elevation revalidates the current product, price, availability and shipping path before creating the PayPal order. You can review the full product description and specifications before paying.</p>
    <a class="eus-checkout-review__link" href="${escapeHtml(detailUrl)}">Review full product details</a>
  `;

  productCopy.appendChild(review);

  const style = document.createElement("style");
  style.textContent = `
    .eus-checkout-review{margin-top:1rem;padding:1rem;border:1px solid rgba(255,255,255,.16);border-radius:14px;background:rgba(255,255,255,.035)}
    .eus-checkout-review__heading{display:flex;justify-content:space-between;gap:.75rem;align-items:baseline;margin-bottom:.75rem}
    .eus-checkout-review__heading strong{font-size:.98rem}
    .eus-checkout-review__heading span{font-size:.75rem;opacity:.7;text-align:right}
    .eus-checkout-review__facts{display:grid;gap:.4rem;margin:0}
    .eus-checkout-review__facts div{display:flex;justify-content:space-between;gap:1rem;border-top:1px solid rgba(255,255,255,.08);padding-top:.4rem}
    .eus-checkout-review__facts dt{font-size:.76rem;opacity:.68}
    .eus-checkout-review__facts dd{margin:0;font-size:.8rem;font-weight:700;text-align:right;overflow-wrap:anywhere}
    .eus-checkout-review__note{font-size:.78rem;line-height:1.45;opacity:.78;margin:.8rem 0}
    .eus-checkout-review__link{display:inline-flex;align-items:center;justify-content:center;width:100%;min-height:42px;border:1px solid rgba(255,255,255,.24);border-radius:10px;font-weight:800;text-decoration:none}
    .eus-checkout-review__link:hover,.eus-checkout-review__link:focus-visible{border-color:currentColor}
  `;
  document.head.appendChild(style);

  const sku = review.querySelector("#checkout-review-sku");
  const option = review.querySelector("#checkout-review-option");
  const price = review.querySelector("#checkout-review-price");
  const optionSource = document.querySelector("#checkout-selected-option");
  const priceSource = document.querySelector("#checkout-unit-price");
  const titleSource = document.querySelector("#checkout-product");

  if (sku) sku.textContent = id;

  const sync = () => {
    if (option) {
      const text = String(optionSource?.textContent || "").trim();
      option.textContent = text && text !== "Loading option…" ? text : "Standard item";
    }
    if (price) {
      const text = String(priceSource?.textContent || "").trim();
      price.textContent = text && text !== "—" ? text : "Confirming…";
    }
    if (titleSource && productName && /loading item/i.test(String(titleSource.textContent || ""))) {
      titleSource.textContent = productName;
    }
    if (shopifyPanel) shopifyPanel.hidden = true;
  };

  const observer = new MutationObserver(sync);
  if (optionSource) observer.observe(optionSource, { childList: true, characterData: true, subtree: true });
  if (priceSource) observer.observe(priceSource, { childList: true, characterData: true, subtree: true });
  if (shopifyPanel) observer.observe(shopifyPanel, { attributes: true, attributeFilter: ["hidden"] });

  sync();

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[character]);
  }
})();
