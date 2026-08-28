(() => {
  "use strict";

  const catalog = Array.isArray(window.EUS_LITHIUM_CATALOG) ? window.EUS_LITHIUM_CATALOG : [];
  const grid = document.querySelector("[data-lithium-grid]");
  if (!grid) return;

  const hawaiiMode = document.body.dataset.lithiumMode === "hawaii";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  const activeProducts = catalog.filter((product) => product?.inventory?.available === true);
  const cards = activeProducts.map((product) => {
    const specs = product.specs || {};
    const hawaii = product.shipping?.hawaii || {};
    const hawaiiApproved = hawaii.eligible === true && hawaii.verified === true && Number.isInteger(hawaii.priceCents);
    const capacity = Number.isFinite(specs.capacityAh) ? `${specs.capacityAh}Ah` : "";
    const unitCount = Number(specs.unitCount) > 1 ? `${specs.unitCount} batteries` : "";
    const category = Array.isArray(product.categories) && product.categories.length ? product.categories[0] : "Lithium & Power";
    const shippingLabel = hawaiiApproved ? "Hawaii Shipping Available" : "Hawaii Shipping Quote Required";
    const shippingClass = hawaiiApproved ? "is-approved" : "is-quote";
    const actionLabel = hawaiiMode ? "View Product" : "View Product";

    return `<article class="lithium-card" data-product-id="${esc(product.id)}">
      <div class="lithium-card__image"><img src="${esc(product.imageUrl)}" alt="${esc(product.name)}" loading="lazy" decoding="async"></div>
      <div class="lithium-card__body">
        <p class="lithium-card__category">${esc(category)}</p>
        <h3>${esc(product.name)}</h3>
        <div class="lithium-card__specs">
          ${specs.voltageLabel ? `<span>${esc(specs.voltageLabel)}</span>` : ""}
          ${capacity ? `<span>${esc(capacity)}</span>` : ""}
          ${specs.chemistry ? `<span>${esc(specs.chemistry)}</span>` : ""}
          ${unitCount ? `<span>${esc(unitCount)}</span>` : ""}
        </div>
        <div class="lithium-card__shipping ${shippingClass}">${shippingLabel}</div>
        <div class="lithium-card__footer">
          <strong>${money.format((product.price?.cents || 0) / 100)}</strong>
          <a class="button button-primary" href="${esc(product.purchase?.url || "/rv-store")}" target="_blank" rel="noopener">${actionLabel}</a>
        </div>
        <small class="lithium-card__sku">SKU ${esc(product.source?.sku || product.id)}</small>
      </div>
    </article>`;
  });

  grid.innerHTML = cards.join("");
  const count = document.querySelector("[data-lithium-count]");
  if (count) count.textContent = String(activeProducts.length);
})();
