(() => {
  "use strict";

  const grid = document.querySelector("[data-lithium-grid]");
  if (!grid) return;

  const hawaiiMode = document.body.dataset.lithiumMode === "hawaii";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const state = { products: [], category: "all" };

  const textOnly = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  function publicProducts(rows) {
    return rows.filter((product) => {
      if (!product) return false;
      const status = String(product.publishStatus || "").toLowerCase();
      if (status && status !== "published") return false;
      if (!(Number(product.priceCents) > 0)) return false;
      const stock = Number(product.supplierStock);
      if (Number.isFinite(stock) && stock <= 0) return false;
      return true;
    });
  }

  function viewFor(product) {
    const raw = textOnly(product.title || product.name || "Lithium battery");
    const lower = raw.toLowerCase();
    let title = "Lithium Battery";
    if (/battery box/.test(lower)) title = "RV Battery Box";
    else if (/power bank/.test(lower)) title = /fast.?charge/.test(lower) ? "Fast-Charge Power Bank" : "Portable Solar Power Bank";
    else if (/48v|36v|24v/.test(lower)) title = "High-Voltage Solar Storage Battery";
    else if (/dual|2[- ]pack|two /.test(lower)) title = "Dual Lithium Battery Set";
    else if (/marine/.test(lower)) title = "RV & Marine Lithium Battery";
    else if (/solar|off[- ]grid/.test(lower)) title = "RV & Solar Lithium Battery";

    const voltage = raw.match(/\b(12|24|36|48)V\b/i)?.[0]?.toUpperCase();
    const ah = raw.match(/\b(\d{2,4})Ah\b/i)?.[0];
    const kwh = raw.match(/\b\d+(?:\.\d+)?\s*kWh\b/i)?.[0]?.replace(/\s+/g, "");
    const wh = raw.match(/\b\d{3,5}\s*Wh\b/i)?.[0]?.replace(/\s+/g, "");
    const chemistry = /LiFePO4/i.test(raw) ? "LiFePO4" : "";
    const specs = [voltage, ah, kwh || wh, chemistry].filter(Boolean).join(" · ");

    let subtitle = "";
    if (/rv/.test(lower) && /solar|off[- ]grid/.test(lower)) subtitle = "For RV, solar & off-grid systems";
    else if (/solar|off[- ]grid/.test(lower)) subtitle = "For solar & off-grid storage";
    else if (/rv|marine/.test(lower)) subtitle = "For RV & mobile power";

    const category = /battery box/.test(lower)
      ? "Battery Accessories"
      : /power bank/.test(lower)
        ? "Portable Power"
        : /48v|36v|24v/.test(lower)
          ? "Higher Voltage / Storage"
          : /solar|off[- ]grid/.test(lower)
            ? "Solar & Off-Grid"
            : "12V Lithium";

    return { title, subtitle, specs, category, rawTitle: raw };
  }

  function lower48Shipping(product) {
    const shippingStatus = String(product?.shippingStatus || "unverified").toLowerCase();
    if (shippingStatus === "verified") return { label: "Ships to the Lower 48", className: "is-approved" };
    if (shippingStatus === "quote_required") return { label: "Shipping quote required", className: "is-quote" };
    return { label: "Check shipping availability", className: "is-researching" };
  }

  function card(product) {
    const sku = String(product.sku || product.id || "").trim();
    const id = String(product.id || "").trim();
    const view = viewFor(product);
    const shipping = lower48Shipping(product);
    const checkoutUrl = `/checkout/?source=rv&id=${encodeURIComponent(id)}&name=${encodeURIComponent(view.rawTitle || view.title)}`;
    const defaultShipping = hawaiiMode ? { label: "Hawaii availability by request", className: "is-researching" } : shipping;
    return `<article class="lithium-card" data-product-id="${esc(id)}" data-hawaii-sku="${esc(sku)}" data-shipping-status="${esc(String(product.shippingStatus || "unverified"))}">
      <div class="lithium-card__image"><img src="${esc(product.primaryImage || "/assets/logo.webp")}" alt="${esc(view.title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></div>
      <div class="lithium-card__body">
        <p class="lithium-card__category">${esc(view.category)}</p>
        <h3>${esc(view.title)}</h3>
        ${view.subtitle ? `<p class="lithium-card__subtitle">${esc(view.subtitle)}</p>` : ""}
        ${view.specs ? `<p class="lithium-card__spec-line">${esc(view.specs)}</p>` : ""}
        <div class="lithium-card__shipping ${defaultShipping.className}" data-hawaii-status>${esc(defaultShipping.label)}</div>
        <div class="lithium-card__footer"><strong>${money.format(Number(product.priceCents || 0) / 100)}</strong><a class="button button-primary" href="${esc(checkoutUrl)}">Buy Now</a></div>
        ${hawaiiMode ? `<a class="lithium-reserve-link" href="#hawaii-request" data-reserve-product="${esc(view.rawTitle || view.title)}">Request Hawaii Availability →</a>` : ""}
      </div>
    </article>`;
  }

  function renderCategories(products) {
    const host = document.querySelector("[data-lithium-categories]");
    if (!host) return;
    const categories = [...new Set(products.map((product) => viewFor(product).category).filter(Boolean))];
    if (!categories.includes(state.category)) state.category = "all";
    host.replaceChildren(...[["All Batteries", "all"], ...categories.map((category) => [category, category])].map(([label, value]) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lithium-chip";
      button.dataset.lithiumCategory = value;
      button.textContent = label;
      button.classList.toggle("is-active", value === state.category);
      button.setAttribute("aria-pressed", String(value === state.category));
      return button;
    }));
  }

  function render(products) {
    const active = publicProducts(products);
    state.products = active;
    renderCategories(active);
    const visible = state.category === "all" ? active : active.filter((product) => viewFor(product).category === state.category);
    if (visible.length) {
      grid.innerHTML = visible.map(card).join("");
      grid.dataset.prerendered = "false";
    } else if (active.length) {
      grid.innerHTML = `<section class="lithium-empty-state" role="status"><h3>No batteries match this category.</h3><p>Choose another battery category to continue browsing.</p></section>`;
    } else {
      const reserveHref = hawaiiMode ? "#hawaii-request" : "/hawaii-lithium-batteries#hawaii-request";
      grid.innerHTML = `<section class="lithium-empty-state" role="status"><h3>Current battery inventory is temporarily unavailable.</h3><p>Please check back shortly or request help choosing a battery.</p><div class="lithium-actions"><a class="button button-primary" href="${reserveHref}">Request Availability</a><a class="button button-outline" href="/start-a-project?type=solar">Ask for Sizing Help</a></div></section>`;
    }
    const count = document.querySelector("[data-lithium-count]");
    if (count) count.textContent = String(active.length);
    document.querySelectorAll("[data-hawaii-sku]").forEach(syncStatus);
  }

  async function syncStatus(cardEl) {
    const sku = String(cardEl.dataset.hawaiiSku || "").trim();
    const badge = cardEl.querySelector("[data-hawaii-status]");
    if (!sku || !badge) return;
    if (!hawaiiMode) {
      const shipping = lower48Shipping({ shippingStatus: cardEl.dataset.shippingStatus || "unverified" });
      badge.className = `lithium-card__shipping ${shipping.className}`;
      badge.textContent = shipping.label;
      return;
    }
    try {
      const response = await fetch(`/api/hawaii-lithium/status?sku=${encodeURIComponent(sku)}`, { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      badge.className = "lithium-card__shipping";
      if (response.ok && data.status === "HAWAII SHIPPING AVAILABLE" && data.eligible === true) {
        badge.classList.add("is-approved");
        badge.textContent = "Hawaii Shipping Available";
      } else if (response.ok && data.status === "HAWAII SHIPPING QUOTE REQUIRED") {
        badge.classList.add("is-quote");
        badge.textContent = "Hawaii Shipping Quote Required";
      } else {
        badge.classList.add("is-researching");
        badge.textContent = "Hawaii availability by request";
      }
    } catch (_) {
      badge.className = "lithium-card__shipping is-researching";
      badge.textContent = "Hawaii availability by request";
    }
  }

  async function load() {
    try {
      const response = await fetch("/api/store/catalog?section=lithium-batteries", { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !Array.isArray(data.products)) throw new Error("Catalog unavailable");
      render(data.products);
    } catch (_) {
      if (grid.dataset.prerendered === "true" && grid.children.length) {
        document.querySelectorAll("[data-hawaii-sku]").forEach(syncStatus);
        return;
      }
      render([]);
    }
  }

  document.addEventListener("click", (event) => {
    const categoryButton = event.target.closest("[data-lithium-category]");
    if (categoryButton) {
      state.category = categoryButton.dataset.lithiumCategory || "all";
      render(state.products);
      return;
    }
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