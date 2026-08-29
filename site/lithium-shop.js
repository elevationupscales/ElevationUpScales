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
    const capacity = Number.isFinite(specs.capacityAh) ? `${specs.capacityAh}Ah` : "";
    const unitCount = Number(specs.unitCount) > 1 ? `${specs.unitCount} batteries` : "";
    const category = Array.isArray(product.categories) && product.categories.length ? product.categories[0] : "Lithium & Power";
    const sourceSku = String(product.source?.sku || product.id || "").trim();
    const purchaseUrl = esc(product.purchase?.url || "/rv-store");
    return `<article class="lithium-card" data-product-id="${esc(product.id)}" data-hawaii-sku="${esc(sourceSku)}">
      <div class="lithium-card__image"><img src="${esc(product.imageUrl)}" alt="${esc(product.name)}" loading="lazy" decoding="async"></div>
      <div class="lithium-card__body">
        <p class="lithium-card__category">${esc(category)}</p>
        <h3>${esc(product.name)}</h3>
        <div class="lithium-card__specs">${specs.voltageLabel ? `<span>${esc(specs.voltageLabel)}</span>` : ""}${capacity ? `<span>${esc(capacity)}</span>` : ""}${specs.chemistry ? `<span>${esc(specs.chemistry)}</span>` : ""}${unitCount ? `<span>${esc(unitCount)}</span>` : ""}</div>
        <div class="lithium-card__shipping is-researching" data-hawaii-status>Hawaii Shipping Qualification in Progress</div>
        <div class="lithium-card__footer"><strong>${money.format((product.price?.cents || 0) / 100)}</strong><a class="button button-primary" href="${purchaseUrl}" target="_blank" rel="noopener">View Product</a></div>
        <small class="lithium-card__sku">SKU ${esc(sourceSku)}</small>
        ${hawaiiMode ? `<a class="lithium-reserve-link" href="#hawaii-request" data-reserve-product="${esc(product.name)}">Reserve for Next Hawaii Shipment →</a>` : ""}
      </div>
    </article>`;
  });
  grid.innerHTML = cards.join("");
  const count = document.querySelector("[data-lithium-count]"); if (count) count.textContent = String(activeProducts.length);

  const syncStatus = async (card) => {
    const sku = String(card.dataset.hawaiiSku || "").trim(); const badge = card.querySelector("[data-hawaii-status]"); if (!sku || !badge) return;
    try {
      const response = await fetch(`/api/hawaii-lithium/status?sku=${encodeURIComponent(sku)}`, { headers:{Accept:"application/json"}, cache:"no-store" });
      const data = await response.json().catch(()=>({})); if (!response.ok) throw new Error("status unavailable");
      badge.className = "lithium-card__shipping";
      if (data.status === "HAWAII ELIGIBLE" && data.eligible === true) { badge.classList.add("is-approved"); badge.textContent = "Hawaii Shipping Available"; }
      else if (data.status === "QUOTE REQUIRED") { badge.classList.add("is-quote"); badge.textContent = "Hawaii Shipping Quote Required"; }
      else { badge.classList.add("is-researching"); badge.textContent = "Hawaii Shipping Qualification in Progress"; }
    } catch (_) { badge.className = "lithium-card__shipping is-researching"; badge.textContent = "Hawaii Shipping Qualification in Progress"; }
  };
  document.querySelectorAll("[data-hawaii-sku]").forEach(syncStatus);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-reserve-product]"); if (!link) return;
    const input = document.querySelector("[name='productInterest']"); if (input) { input.value = link.dataset.reserveProduct || ""; setTimeout(()=>input.focus(),150); }
  });
})();
