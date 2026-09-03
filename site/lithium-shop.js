(() => {
  "use strict";

  const grid = document.querySelector("[data-lithium-grid]");
  if (!grid) return;

  const hawaiiMode = document.body.dataset.lithiumMode === "hawaii";
  const search = document.querySelector("[data-lithium-search]");
  const sort = document.querySelector("[data-lithium-sort]");
  const results = document.querySelector("[data-lithium-results]");
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const state = { products: [], category: "all", query: "", sort: "featured" };
  const debounce = (fn, ms=150) => { let timer=0; return (...args) => { clearTimeout(timer); timer=setTimeout(() => fn(...args), ms); }; };
  const textOnly = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  const token = (raw, re, format = (x) => x) => { const m=raw.match(re); return m ? format(m) : ""; };

  function publicProducts(rows) {
    return rows.filter((product) => {
      if (!product) return false;
      const status = String(product.publishStatus || "").toLowerCase();
      if (status && status !== "published") return false;
      if (!(Number(product.priceCents) > 0)) return false;
      const stock = Number(product.supplierStock);
      if (Number.isFinite(stock) && stock <= 0) return false;
      if (hawaiiMode && batteryUnitsFor(product) < 1) return false;
      return true;
    });
  }

  function viewFor(product) {
    const raw = textOnly(product.title || product.name || "Lithium battery");
    const lower = raw.toLowerCase();
    const voltage = token(raw, /\b(12|24|36|48)V\b/i, (m) => `${m[1]}V`);
    const ah = token(raw, /\b(\d{2,4})\s*Ah\b/i, (m) => `${m[1]}Ah`);
    const kwh = token(raw, /\b(\d+(?:\.\d+)?)\s*kWh\b/i, (m) => `${m[1]}kWh`);
    const wh = token(raw, /\b(\d{3,5})\s*Wh\b/i, (m) => `${m[1]}Wh`);
    const mah = token(raw, /\b(\d{4,7})\s*mAh\b/i, (m) => `${m[1]}mAh`);
    const bms = token(raw, /\b(\d{2,3})A\s*BMS\b/i, (m) => `${m[1]}A BMS`);
    const dimensions = token(raw, /\b(\d+(?:\.\d+)?\s*(?:x|×|\*)\s*\d+(?:\.\d+)?(?:\s*(?:x|×|\*)\s*\d+(?:\.\d+)?)?\s*(?:in(?:ch(?:es)?)?|"|cm|mm)?)\b/i, (m) => m[1].replace(/\*/g,"×").replace(/\s+/g," "));
    const chemistry = /LiFePO4/i.test(raw) ? "LiFePO4" : "";
    const heated = /\b(?:heated|self[- ]heating|self heating)\b/i.test(raw);
    const bluetooth = /\bBluetooth\b/i.test(raw);
    const twoPack = /\b(?:2[- ]?pack|two[- ]pack|dual)\b/i.test(raw);

    let title;
    if (/battery box/.test(lower)) {
      title = `RV Battery Box${dimensions ? ` — ${dimensions}` : ""}`;
    } else if (/power bank/.test(lower)) {
      const cap = mah || wh || kwh;
      title = `${/solar/.test(lower) ? "Portable Solar Power Bank" : "Portable Power Bank"}${cap ? ` — ${cap}` : ""}`;
    } else {
      const parts = [voltage, ah, heated ? "Heated" : "", chemistry].filter(Boolean);
      if (parts.length >= 2) title = `${twoPack ? "2-Pack " : ""}${parts.join(" ")} Battery`;
      else {
        const cleaned = raw.replace(/^(?:VEVOR|KINGBOSS)\s+/i, "").replace(/^Lithium Battery[:,]?\s*/i, "").trim();
        title = cleaned.split(/[,;|]/)[0].trim().slice(0, 82) || "Lithium Battery";
      }
    }

    const specParts = [kwh || wh, bms, bluetooth ? "Bluetooth" : "", heated && !/Heated/.test(title) ? "Heated" : ""].filter(Boolean);
    const specs = specParts.join(" · ");
    let subtitle = "";
    if (/rv/.test(lower) && /solar|off[- ]grid/.test(lower)) subtitle = "For RV, solar & off-grid systems";
    else if (/solar|off[- ]grid/.test(lower)) subtitle = "For solar & off-grid storage";
    else if (/rv|marine|trolling/.test(lower)) subtitle = "For RV & mobile power";
    else if (/backup/.test(lower)) subtitle = "For backup power";

    const category = /battery box/.test(lower) ? "Battery Accessories"
      : /power bank/.test(lower) ? "Portable Power"
      : /48v|36v|24v/.test(lower) ? "Higher Voltage / Storage"
      : /solar|off[- ]grid/.test(lower) ? "Solar & Off-Grid" : "12V Lithium";

    let capacityWh = 0;
    if (kwh) capacityWh = Number.parseFloat(kwh) * 1000;
    else if (wh) capacityWh = Number.parseFloat(wh);
    else if (voltage && ah) capacityWh = Number.parseFloat(voltage) * Number.parseFloat(ah);
    else if (mah) capacityWh = Number.parseFloat(mah) / 1000;

    return { title, subtitle, specs, category, rawTitle: raw, voltage, ah, capacityWh };
  }

  function batteryUnitsFor(product) {
    const title = textOnly(product?.title || product?.name || "").toLowerCase();
    const description = textOnly(product?.description || "").toLowerCase();
    const category = textOnly(product?.category || "").toLowerCase();
    const identity = `${title} ${String(product?.sku || "").toLowerCase()}`;
    const excluded = /battery\s*(?:box|case|tray|holder)|power\s*bank|power\s*station|\bcharger\b|charging\s*cable|\bcable\b|adapter|connector|terminal|monitor|meter|accessor/;
    const positive = /\blifepo4\b|\blithium(?:[- ]ion| iron phosphate)?\b[^.]{0,100}\bbatter(?:y|ies)\b|\bbatter(?:y|ies)\b[^.]{0,100}\b(?:12|24|36|48)\s*v\b|\b\d{2,4}\s*ah\b[^.]{0,100}\bbatter(?:y|ies)\b/;
    if (excluded.test(identity)) return 0;
    if (!positive.test(identity) && (excluded.test(description.slice(0,500)) || !positive.test(`${description} ${category}`))) return 0;
    const pack = title.match(/\b([2-9])\s*[- ]?(?:pack|pcs?|pieces?)\b/); if (pack) return Math.min(10, Number(pack[1]) || 1);
    const times = title.match(/\b([2-9])\s*[x×]\s*\d{2,4}\s*ah\b/); if (times) return Math.min(10, Number(times[1]) || 1);
    if (/\bdual\b|\btwo[- ]pack\b/.test(title)) return 2;
    return 1;
  }

  function lower48Shipping(product) {
    const shippingStatus = String(product?.shippingStatus || "unverified").toLowerCase();
    if (shippingStatus === "verified") return { label: "Ships to the Lower 48", className: "is-approved" };
    if (shippingStatus === "quote_required") return { label: "Shipping quote required", className: "is-quote" };
    return { label: "Check shipping availability", className: "is-researching" };
  }

  const deferredPlaceholder = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  function imageMarkup(src, alt, index) {
    const deferred = hawaiiMode && index >= 4;
    return `<img src="${esc(deferred ? deferredPlaceholder : src)}"${deferred ? ` data-lithium-deferred-image data-src="${esc(src)}"` : ""} alt="${esc(alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer">`;
  }

  function hydrateDeferredImages(root = document) {
    const images = [...root.querySelectorAll("img[data-lithium-deferred-image][data-src]")];
    if (!images.length) return;
    const load = (img) => { const src = String(img.dataset.src || "").trim(); if (!src) return; img.src = src; delete img.dataset.src; img.removeAttribute("data-lithium-deferred-image"); };
    if (!("IntersectionObserver" in window)) { images.forEach(load); return; }
    const observer = new IntersectionObserver((entries) => { for (const entry of entries) { if (!entry.isIntersecting) continue; load(entry.target); observer.unobserve(entry.target); } }, { rootMargin: "120px 0px" });
    images.forEach((img) => observer.observe(img));
  }

  function card(product, index = 0) {
    const sku = String(product.sku || product.id || "").trim();
    const id = String(product.id || "").trim();
    const view = viewFor(product);
    const shipping = lower48Shipping(product);
    const detailUrl = `/product?id=${encodeURIComponent(id)}&store=lithium${hawaiiMode ? "&program=hawaii" : ""}`;
    const checkoutUrl = `/checkout/?source=lithium&id=${encodeURIComponent(id)}&name=${encodeURIComponent(view.rawTitle || view.title)}${hawaiiMode ? "&state=HI" : ""}`;
    const reviewUrl = `/hawaii-lithium-batteries?productId=${encodeURIComponent(id)}&product=${encodeURIComponent(view.rawTitle || view.title)}&qty=1#hawaii-request`;
    const inventory = Number.isFinite(Number(product.supplierStock)) ? `${Math.max(0, Number(product.supplierStock))} available` : "Supplier-managed availability";
    const status = hawaiiMode ? { label: "Checking Hawaii Availability", className: "is-quote" } : shipping;
    const batteryUnits = hawaiiMode ? batteryUnitsFor(product) : 0;
    const merchandiseCents = Number(product.priceCents || 0);
    const pickupPriceCents = merchandiseCents + (batteryUnits > 0 ? 9900 * batteryUnits : 0);
    return `<article class="lithium-card" data-product-id="${esc(id)}" data-hawaii-sku="${esc(sku)}" data-shipping-status="${esc(String(product.shippingStatus || "unverified"))}"${hawaiiMode ? ` data-hawaii-merchandise-cents="${merchandiseCents}" data-hawaii-battery-units="${batteryUnits}"` : ""}>
      <div class="lithium-card__image"><a class="lithium-card__detail-link" href="${esc(detailUrl)}" aria-label="View ${esc(view.title)} details">${imageMarkup(product.primaryImage || "/assets/logo.webp", view.title, index)}</a></div>
      <div class="lithium-card__body">
        <p class="lithium-card__category">${esc(view.category)}</p>
        <h3><a class="lithium-card__title-link" href="${esc(detailUrl)}">${esc(view.title)}</a></h3>
        ${view.specs ? `<p class="lithium-card__spec-line">${esc(view.specs)}</p>` : ""}
        <div class="lithium-card__shipping ${status.className}" data-hawaii-status>${esc(status.label)}</div>
        ${hawaiiMode ? `<div class="hawaii-card-simple"><p><strong>Availability</strong><span>${esc(inventory)}</span></p><p><strong>Hawaii Pickup Price</strong><span data-hawaii-pickup-price>${batteryUnits > 0 ? money.format(pickupPriceCents / 100) : "Freight Review Required"}</span></p><p><strong>Included Freight</strong><span>To our Honolulu warehouse / pickup location</span></p><p><strong>Address Delivery</strong><span>Additional charge · quote required</span></p></div>` : ""}
        <div class="lithium-card__footer"><strong>${hawaiiMode && batteryUnits > 0 ? money.format(pickupPriceCents / 100) : money.format(merchandiseCents / 100)}</strong><div class="lithium-card__actions"><a class="button button-outline" href="${esc(detailUrl)}">View Details</a><a class="button button-primary" ${hawaiiMode ? `data-hawaii-action data-checkout-url="${esc(checkoutUrl)}" data-review-url="${esc(reviewUrl)}" href="${esc(reviewUrl)}"` : `href="${esc(checkoutUrl)}"`}>${hawaiiMode ? "Check Hawaii Availability" : "Buy Now"}</a></div></div>
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

  function visibleProducts(active) {
    const q = state.query.trim().toLowerCase();
    const visible = active.filter((product) => {
      const view = viewFor(product);
      const haystack = `${view.title} ${view.subtitle} ${view.specs} ${view.category} ${view.rawTitle}`.toLowerCase();
      return (state.category === "all" || view.category === state.category) && (!q || haystack.includes(q));
    });
    if (state.sort === "price-low") visible.sort((a,b) => Number(a.priceCents||0)-Number(b.priceCents||0));
    else if (state.sort === "price-high") visible.sort((a,b) => Number(b.priceCents||0)-Number(a.priceCents||0));
    else if (state.sort === "capacity") visible.sort((a,b) => viewFor(b).capacityWh-viewFor(a).capacityWh);
    return visible;
  }

  function render(products) {
    const active = publicProducts(products);
    state.products = active;
    renderCategories(active);
    const visible = visibleProducts(active);
    if (visible.length) {
      grid.innerHTML = visible.map((product, index) => card(product, index)).join("");
      grid.dataset.prerendered = "false";
      hydrateDeferredImages(grid);
    } else if (active.length) {
      grid.innerHTML = `<section class="lithium-empty-state" role="status"><h3>No batteries match your search.</h3><p>Try another voltage, capacity, use case or category.</p></section>`;
    } else {
      const reserveHref = hawaiiMode ? "#hawaii-request" : "/hawaii-lithium-batteries#hawaii-request";
      grid.innerHTML = `<section class="lithium-empty-state" role="status"><h3>Current battery inventory is temporarily unavailable.</h3><p>Please check back shortly or request help choosing a battery.</p><div class="lithium-actions"><a class="button button-primary" href="${reserveHref}">Request Availability</a><a class="button button-outline" href="/start-a-project?type=solar">Ask for Sizing Help</a></div></section>`;
    }
    const count = document.querySelector("[data-lithium-count]");
    if (count) count.textContent = String(active.length);
    if (results) results.textContent = visible.length === active.length ? `${active.length} shown` : `${visible.length} of ${active.length} shown`;
    if (hawaiiMode) syncHawaiiStatuses();
  }

  function applyHawaiiStatus(cardEl, data, rateCents) {
    const badge = cardEl.querySelector("[data-hawaii-status]");
    if (!badge) return;
    const stateValue = data?.customerState || "review_required";
    badge.className = "lithium-card__shipping";
    if (stateValue === "shipping_available") badge.classList.add("is-approved");
    else if (stateValue === "review_required") badge.classList.add("is-quote");
    else badge.classList.add("is-researching");
    badge.textContent = data?.label || (stateValue === "shipping_available" ? "Shipping Available" : stateValue === "unavailable" ? "Currently Unavailable" : "Freight Review Required");
    const merchandiseCents = Number(cardEl.dataset.hawaiiMerchandiseCents || 0);
    const batteryUnits = Number(cardEl.dataset.hawaiiBatteryUnits || 0);
    const pickupPrice = merchandiseCents + Math.max(0, Number(rateCents || 0)) * Math.max(0, batteryUnits);
    const pickupEl = cardEl.querySelector("[data-hawaii-pickup-price]");
    if (pickupEl) pickupEl.textContent = batteryUnits > 0 ? money.format(pickupPrice / 100) : "Freight Review Required";
    const footerPrice = cardEl.querySelector(".lithium-card__footer > strong");
    if (footerPrice && batteryUnits > 0) footerPrice.textContent = money.format(pickupPrice / 100);
    const action = cardEl.querySelector("[data-hawaii-action]");
    if (action) {
      if (stateValue === "shipping_available" && batteryUnits > 0) { action.href = action.dataset.checkoutUrl || action.href; action.textContent = "Buy Now"; }
      else if (stateValue === "unavailable") { action.href = action.dataset.reviewUrl || "/hawaii-lithium-batteries#hawaii-request"; action.textContent = "Check Availability / Contact Elevation"; }
      else { action.href = action.dataset.reviewUrl || "/hawaii-lithium-batteries#hawaii-request"; action.textContent = "Request Shipping Review"; }
    }
  }

  async function syncHawaiiStatuses() {
    if (!hawaiiMode) return;
    const cards = [...document.querySelectorAll("[data-hawaii-sku]")];
    if (!cards.length) return;
    try {
      const response = await fetch("/api/hawaii-lithium/statuses", { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error("Hawaii status unavailable");
      const statuses = data.statuses || {};
      for (const cardEl of cards) {
        const sku = String(cardEl.dataset.hawaiiSku || "").trim().toLowerCase();
        const id = String(cardEl.dataset.productId || "").trim();
        applyHawaiiStatus(cardEl, statuses[sku] || statuses[id] || { customerState: "review_required", label: "Freight Review Required" }, data.customerFreightPerBatteryCents || 9900);
      }
    } catch (_) {
      for (const cardEl of cards) applyHawaiiStatus(cardEl, { customerState: "review_required", label: "Freight Review Required" }, 9900);
    }
  }

  async function loadCatalog() {
    const response = await fetch("/api/store/catalog?section=lithium-batteries", { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(data.products)) throw new Error("Catalog unavailable");
    state.products = publicProducts(data.products);
    return data.products;
  }

  async function hydrateAndRender() {
    try {
      const rows = state.products.length ? state.products : await loadCatalog();
      render(rows);
    } catch (_) {
      if (!(grid.dataset.prerendered === "true" && grid.children.length)) render([]);
    }
  }

  function init() {
    if (grid.dataset.prerendered === "true" && grid.children.length) {
      if (hawaiiMode) { hydrateDeferredImages(grid); syncHawaiiStatuses(); }
      return;
    }
    hydrateAndRender();
  }

  document.addEventListener("click", (event) => {
    const categoryButton = event.target.closest("[data-lithium-category]");
    if (categoryButton) { state.category = categoryButton.dataset.lithiumCategory || "all"; hydrateAndRender(); return; }
    const link = event.target.closest("[data-reserve-product]");
    if (!link) return;
    const input = document.querySelector("[name='productInterest']");
    if (input) { input.value = link.dataset.reserveProduct || ""; setTimeout(() => input.focus(), 150); }
  });
  search?.addEventListener("input", debounce(() => { state.query = search.value; hydrateAndRender(); }));
  sort?.addEventListener("change", () => { state.sort = sort.value; hydrateAndRender(); });

  init();
})();
