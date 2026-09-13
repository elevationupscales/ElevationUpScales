(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const source = String(params.get("source") || "").trim().toLowerCase();
  const id = String(params.get("id") || "").trim();
  const productName = String(params.get("name") || "").trim();

  // Direct Elevation checkout is PayPal-owned. Never expose the retired Shopify
  // cross-route from this transaction lane, even if stale markup survives.
  const shopifyPanel = document.querySelector("#checkout-shopify-direct");
  if (shopifyPanel) shopifyPanel.remove();

  const productCopy = document.querySelector(".eus-checkout-product-copy");
  if (!productCopy || !id || !["rv", "lithium", "apparel"].includes(source)) return;

  const normalizedId = id.toLowerCase();
  const isSok = source === "lithium" && /^sok-[a-z0-9-]+$/i.test(id);
  const productReference = isSok ? id.slice(4).toUpperCase() : id;
  const brandLabel = isSok ? "SOK Energy" : source === "apparel" ? "Elevation UpScales" : "Elevation supplier catalog";
  const sourceLabel = source === "lithium"
    ? "Lithium / off-grid"
    : source === "rv"
      ? "RV & outdoor"
      : "Elevation apparel";

  const detailUrl = source === "apparel"
    ? "/store"
    : isSok
      ? `/sok/${encodeURIComponent(normalizedId.slice(4))}/`
      : source === "rv"
        ? "/store?department=rv-outdoor"
        : "/store?department=lithium-batteries";

  let review = productCopy.querySelector(".eus-checkout-review");
  if (!review) {
    review = document.createElement("section");
    review.className = "eus-checkout-review";
    review.setAttribute("aria-label", "Verify item details before payment");
    review.innerHTML = `
      <div class="eus-checkout-review__heading">
        <strong>Verify before payment</strong>
        <span>Elevation secure order review</span>
      </div>
      <dl class="eus-checkout-review__facts">
        <div><dt>Product / model</dt><dd id="checkout-review-sku">${escapeHtml(productReference)}</dd></div>
        <div><dt>Brand / supplier</dt><dd>${escapeHtml(brandLabel)}</dd></div>
        <div><dt>Department</dt><dd>${escapeHtml(sourceLabel)}</dd></div>
        <div><dt>Selected option</dt><dd id="checkout-review-option">Confirming…</dd></div>
        <div><dt>Current unit price</dt><dd id="checkout-review-price">Confirming…</dd></div>
      </dl>
      <p class="eus-checkout-review__note">Elevation revalidates the current product, price, availability and shipping path before creating the PayPal order. Review the full product description, specifications, warranty and purchase information before paying.</p>
      <a class="eus-checkout-review__link" href="${escapeHtml(detailUrl)}">Review full product details</a>
    `;
    productCopy.appendChild(review);
  }

  if (!document.querySelector("style[data-eus-checkout-review-style]")) {
    const style = document.createElement("style");
    style.dataset.eusCheckoutReviewStyle = "true";
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
  }

  const option = review.querySelector("#checkout-review-option");
  const price = review.querySelector("#checkout-review-price");
  const optionSource = document.querySelector("#checkout-selected-option");
  const priceSource = document.querySelector("#checkout-unit-price");
  const titleSource = document.querySelector("#checkout-product");

  const fallbackOption = isSok
    ? `${productReference} · Standard configuration`
    : "Standard configuration";

  const sync = () => {
    if (optionSource) {
      const text = String(optionSource.textContent || "").trim();
      if (!text || text === "Loading option…" || text === "Standard item") {
        if (optionSource.textContent !== fallbackOption) optionSource.textContent = fallbackOption;
        if (option) option.textContent = fallbackOption;
      } else if (option) {
        option.textContent = text;
      }
    } else if (option) {
      option.textContent = fallbackOption;
    }

    if (price) {
      const text = String(priceSource?.textContent || "").trim();
      price.textContent = text && text !== "—" ? text : "Confirming…";
    }

    if (titleSource && productName && /loading item/i.test(String(titleSource.textContent || ""))) {
      titleSource.textContent = productName;
    }

    document.querySelector("#checkout-shopify-direct")?.remove();
  };

  const observer = new MutationObserver(sync);
  if (optionSource) observer.observe(optionSource, { childList: true, characterData: true, subtree: true });
  if (priceSource) observer.observe(priceSource, { childList: true, characterData: true, subtree: true });
  observer.observe(document.body, { childList: true, subtree: true });

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
