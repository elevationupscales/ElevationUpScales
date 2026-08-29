(() => {
  "use strict";

  const grid = document.querySelector("[data-lithium-grid]");
  if (!grid) return;

  const hawaiiMode = document.body.dataset.lithiumMode === "hawaii";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const staticCatalog = Array.isArray(window.EUS_LITHIUM_CATALOG) ? window.EUS_LITHIUM_CATALOG : [];

  function normalizeStatic(product) {
    return {
      id: product.id,
      sku: product?.source?.sku || product.id,
      title: product.name,
      description: "",
      category: Array.isArray(product.categories) ? product.categories[0] : "Lithium & Power",
      priceCents: Number(product?.price?.cents || 0),
      supplierStock: Number(product?.inventory?.quantity || 0),
      primaryImage: product.imageUrl || "",
      publishStatus: product?.inventory?.available === true ? "published" : "hold",
      storeSection: "lithium-batteries",
      checkoutId: product.id,
      sourceUrl: product?.purchase?.url || "",
    };
  }

  function publicProducts(rows) {
    return rows.filter((product) => product && product.publishStatus === "published" && Number(product.priceCents) > 0 && Number(product.supplierStock) > 0);
  }

  function card(product) {
    const sku = String(product.sku || product.id || "").trim();
    const id = String(product.id || "").trim();
    const checkoutUrl = `/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(product.title || "Lithium battery")}`;
    const description = String(product.description || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 180);
    return `<article class="lithium-card" data-product-id="${esc(id)}" data-hawaii-sku="${esc(sku)}">
      <div class="lithium-card__image"><img src="${esc(product.primaryImage || "/assets/logo.webp")}" alt="${esc(product.title || "Lithium battery")}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>
      <div class="lithium-card__body">
        <p class="lithium-card__category">${esc(product.category || "Lithium & Power")}</p>
        <h3>${esc(product.title || "Lithium battery")}</h3>
        ${description ? `<p class="lithium-card__description">${esc(description)}</p>` : ""}
        <div class="lithium-card__shipping is-researching" data-hawaii-status>Lower 48 Shipping Available · Alaska/Hawaii Excluded</div>
        <div class="lithium-card__footer"><strong>${money.format(Number(product.priceCents || 0) / 100)}</strong><a class="button button-primary" href="${esc(checkoutUrl)}">Buy Now</a></div>
        <small class="lithium-card__sku">SKU ${esc(sku)}</small>
        ${hawaiiMode ? `<a class="lithium-reserve-link" href="#hawaii-request" data-reserve-product="${esc(product.title || "Lithium battery")}">Request Hawaii Availability →</a>` : ""}
      </div>
    </article>`;
  }

  function render(products) {
    const active = publicProducts(products);
    if (active.length) {
      grid.innerHTML = active.map(card).join("");
    } else {
      const reserveHref = hawaiiMode ? "#hawaii-request" : "/hawaii-lithium-batteries#hawaii-request";
      grid.innerHTML = `<section class="lithium-empty-state" role="status"><h3>Battery inventory is being updated.</h3><p>Check back shortly or request Hawaii availability separately.</p><div class="lithium-actions"><a class="button button-primary" href="${reserveHref}">Request Hawaii Availability</a><a class="button button-outline" href="/rv-store">Browse RV & Outdoor</a></div></section>`;
    }
    const count = document.querySelector("[data-lithium-count]");
    if (count) count.textContent = String(active.length);
    document.querySelectorAll("[data-hawaii-sku]").forEach(syncStatus);
  }

  async function syncStatus(cardEl) {
    const sku = String(cardEl.dataset.hawaiiSku || "").trim();
    const badge = cardEl.querySelector("[data-hawaii-status]");
    if (!sku || !badge) return;
    try {
      const response = await fetch(`/api/hawaii-lithium/status?sku=${encodeURIComponent(sku)}`, { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      badge.className = "lithium-card__shipping";
      if (response.ok && data.status === "HAWAII SHIPPING AVAILABLE" && data.eligible === true) {
        badge.classList.add("is-approved");
        badge.textContent = "Hawaii Shipping Available";
      } else if (response.ok && data.status === "HAWAII SHIPPING QUOTE REQUIRED") {
        badge.classList.add("is-quote");
        badge.textContent = "Lower 48 Shipping Available · Hawaii Quote Required";
      } else {
        badge.classList.add("is-researching");
        badge.textContent = "Lower 48 Shipping Available · Alaska/Hawaii Excluded";
      }
    } catch (_) {
      badge.className = "lithium-card__shipping is-researching";
      badge.textContent = "Lower 48 Shipping Available · Alaska/Hawaii Excluded";
    }
  }

  async function load() {
    try {
      const response = await fetch("/api/store/catalog?section=lithium-batteries", { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !Array.isArray(data.products)) throw new Error("Catalog unavailable");
      render(data.products);
    } catch (_) {
      render(staticCatalog.map(normalizeStatic));
    }
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-reserve-product]");
    if (!link) return;
    const input = document.querySelector("[name='productInterest']");
    if (input) {
      input.value = link.dataset.reserveProduct || "";
      setTimeout(() => input.focus(), 150);
    }
  });

  load();
})();
