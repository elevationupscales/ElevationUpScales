(() => {
  "use strict";

  const root = document.querySelector("[data-universal-store]");
  if (!root) return;
  const grid = root.querySelector("[data-universal-grid]");
  const status = root.querySelector("[data-universal-status]");
  const search = root.querySelector("[data-universal-search]");
  const sort = root.querySelector("[data-universal-sort]");
  const chips = [...root.querySelectorAll("[data-universal-department]")];
  const requestedBrand = String(document.body.dataset.storeBrand || "").trim().toLowerCase();
  const params = new URLSearchParams(location.search);
  const requestedDepartment = params.get("department") || "all";
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const state = { products: [], query: "", department: requestedDepartment, sort: "featured" };
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const text = (value) => String(value ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  function identity(product) {
    return [product.brand, product.manufacturer, product.supplier, product.vendor, product.title, product.name, product.sku]
      .map((v) => text(v).toLowerCase()).join(" ");
  }

  function brand(product) {
    const all = identity(product);
    if (all.includes("kingboss")) return "Kingboss";
    if (product.sokProduct || all.includes("sok battery") || /\bsok\b/.test(all)) return "SOK";
    return text(product.brand || product.manufacturer || product.supplier || "Supplier");
  }

  function department(product) {
    const raw = `${identity(product)} ${text(product.category).toLowerCase()} ${text(product.storeSection).toLowerCase()}`;
    if (/monitor|display|meter|controller|bms|shunt/.test(raw)) return "monitoring-controls";
    if (/cable|connector|terminal|adapter|bracket|rack|mount|wire|fuse/.test(raw)) return "cables-accessories";
    if (/charger|charging|solar|panel|mppt|inverter|converter/.test(raw)) return "solar-charging";
    if (/rv|camper|marine|van|travel|trailer|outdoor|camp/.test(raw) && !/battery/.test(raw)) return "rv-outdoor";
    if (/backup|ups|rack|server|storage/.test(raw)) return "backup-power";
    if (/battery|lifepo4|lithium/.test(raw)) return "lithium-batteries";
    return "outdoor-offgrid";
  }

  function sellability(product) {
    const publish = text(product.publishStatus || product.publish_status).toLowerCase();
    const mode = text(product.availabilityMode || product.availabilityStatus || product.status || "available").toLowerCase();
    const sourceState = text(product.sourceState || product.source_state || product.reviewState || "").toLowerCase();
    const shipping = text(product.shippingStatus || product.shipping_status || "").toLowerCase();
    const supplier = identity(product);
    const stockRaw = product.supplierStock ?? product.inventoryQty ?? product.inventory_qty ?? product.quantityOnHand;
    const hasStock = stockRaw !== null && stockRaw !== undefined && String(stockRaw) !== "";
    const stock = hasStock ? Number(stockRaw) : null;
    const price = Number(product.priceCents || product.price_cents || 0);
    const paymentEligible = product.paymentEligible !== false;

    if (publish && publish !== "published") return { code: "hold", label: "Confirm Availability", canBuy: false };
    if (/stale|source missing|unknown|hold|review/.test(sourceState)) return { code: "hold", label: "Confirm Availability", canBuy: false };
    if (/unavailable|out of stock|zero stock/.test(mode) || (hasStock && Number.isFinite(stock) && stock <= 0)) return { code: "out", label: "Out of Stock", canBuy: false };
    if (/prepurchase|preorder|backorder/.test(mode)) return { code: "hold", label: product.commerceLabel || "Confirm Availability", canBuy: paymentEligible && price > 0 };
    if (!price && !product.sokProduct) return { code: "hold", label: "Confirm Availability", canBuy: false };

    if (/doba/.test(supplier)) {
      if (!hasStock || !Number.isFinite(stock)) return { code: "hold", label: "Confirm Availability", canBuy: false };
      if (shipping && shipping !== "verified") return { code: "hold", label: shipping === "quote_required" ? "Shipping Quote Required" : "Confirm Availability", canBuy: false };
      return { code: "buy", label: "Supplier Stock Available", canBuy: price > 0 };
    }

    if (product.sokProduct) {
      if (!paymentEligible) return { code: "hold", label: product.commerceLabel || "See Purchase Options", canBuy: false };
      return { code: "buy", label: product.commerceLabel || "Available", canBuy: price > 0 };
    }

    if (shipping === "quote_required") return { code: "hold", label: "Shipping Quote Required", canBuy: false };
    return { code: "buy", label: "Available", canBuy: price > 0 };
  }

  function publicProduct(product) {
    if (!product || !text(product.id || product.sku || product.title || product.name)) return false;
    const publish = text(product.publishStatus || product.publish_status).toLowerCase();
    if (publish && !["published", "hold"].includes(publish)) return false;
    if (requestedBrand && !identity(product).includes(requestedBrand)) return false;
    return true;
  }

  function key(product) {
    return text(product.id || product.sku || `${brand(product)}-${product.title || product.name}`).toLowerCase();
  }

  function mergeProducts(groups) {
    const map = new Map();
    for (const group of groups) for (const product of (Array.isArray(group) ? group : [])) {
      const k = key(product);
      if (!k) continue;
      const current = map.get(k);
      map.set(k, current ? { ...current, ...product } : product);
    }
    return [...map.values()].filter(publicProduct);
  }

  async function readJson(url) {
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(`${url} unavailable`);
    return data;
  }

  async function loadCatalog() {
    const results = await Promise.allSettled([
      readJson("/api/store/catalog?section=lithium-batteries"),
      readJson("/api/store/catalog?section=rv-outdoor"),
      readJson("/api/sok/catalog")
    ]);
    const groups = results.map((result) => result.status === "fulfilled" ? result.value.products : []).filter(Boolean);
    const products = mergeProducts(groups);
    if (!products.length) throw new Error("No current retail products are available");
    return products;
  }

  function actionFor(product, sale) {
    const id = text(product.id || "");
    const sku = text(product.sku || product.supplierSku || "");
    const title = text(product.title || product.name || "Product");
    const detail = `/product?id=${encodeURIComponent(id || sku)}&store=universal`;
    if (sale.canBuy) return { href: `/checkout/?source=universal&id=${encodeURIComponent(id || sku)}&name=${encodeURIComponent(title)}`, label: /prepurchase|preorder|backorder/i.test(String(product.availabilityMode || "")) ? "Purchase Options" : "Buy Now", detail };
    if (product.sokProduct) return { href: `/sok-order.html?sku=${encodeURIComponent(sku)}&intent=purchase_options`, label: "See Purchase Options", detail };
    return { href: detail, label: sale.code === "out" ? "View Product" : "Confirm Availability", detail };
  }

  function card(product) {
    const sale = sellability(product);
    const action = actionFor(product, sale);
    const title = text(product.title || product.name || "Power product");
    const supplier = brand(product);
    const image = text(product.primaryImage || product.image || (Array.isArray(product.images) && product.images[0]) || "/assets/logo.webp");
    const desc = text(product.description).slice(0, 180);
    const price = Number(product.priceCents || product.price_cents || 0);
    const stockRaw = product.supplierStock ?? product.inventoryQty ?? product.inventory_qty;
    const inventoryNote = stockRaw === null || stockRaw === undefined ? "Supplier availability is validated before fulfillment." : "Inventory shown is supplier-managed, not Elevation on-hand stock.";
    return `<article class="universal-product" data-product-department="${esc(department(product))}" data-product-brand="${esc(supplier.toLowerCase())}">
      <a class="universal-product__image" href="${esc(action.detail)}"><img src="${esc(image)}" alt="${esc(title)}" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a>
      <div class="universal-product__body">
        <div class="universal-product__meta">${esc(supplier)} · ${esc(department(product).replaceAll("-", " "))}</div>
        <h3>${esc(title)}</h3>
        ${desc ? `<p class="universal-product__description">${esc(desc)}</p>` : ""}
        <span class="universal-product__state is-${esc(sale.code)}">${esc(sale.label)}</span>
        <p class="universal-product__description">${esc(inventoryNote)}</p>
        <div class="universal-product__footer"><strong class="universal-product__price">${price > 0 ? money.format(price / 100) : "Purchase options"}</strong><div class="universal-product__actions"><a class="button button-outline" href="${esc(action.detail)}">Details</a><a class="button button-primary" href="${esc(action.href)}">${esc(action.label)}</a></div></div>
      </div>
    </article>`;
  }

  function filtered() {
    let rows = state.products.filter((product) => state.department === "all" || department(product) === state.department);
    const q = state.query.trim().toLowerCase();
    if (q) rows = rows.filter((product) => `${identity(product)} ${text(product.category).toLowerCase()}`.includes(q));
    if (state.sort === "price-low") rows.sort((a,b) => Number(a.priceCents||0)-Number(b.priceCents||0));
    else if (state.sort === "price-high") rows.sort((a,b) => Number(b.priceCents||0)-Number(a.priceCents||0));
    else if (state.sort === "name") rows.sort((a,b) => text(a.title||a.name).localeCompare(text(b.title||b.name)));
    else rows.sort((a,b) => Number(Boolean(b.sokProduct))-Number(Boolean(a.sokProduct)) || text(a.title||a.name).localeCompare(text(b.title||b.name)));
    return rows;
  }

  function render() {
    const rows = filtered();
    grid.innerHTML = rows.length ? rows.map(card).join("") : `<div class="universal-empty"><strong>No current products match this view.</strong><p>Try another department or clear the search. Products with uncertain supplier or fulfillment state stay out of direct checkout.</p></div>`;
    status.textContent = `${rows.length} current product${rows.length === 1 ? "" : "s"} · questionable or unavailable listings are protected from direct checkout`;
    chips.forEach((chip) => chip.classList.toggle("is-active", chip.dataset.universalDepartment === state.department));
  }

  chips.forEach((chip) => chip.addEventListener("click", () => { state.department = chip.dataset.universalDepartment || "all"; params.set("department", state.department); history.replaceState(null, "", `${location.pathname}?${params.toString()}`); render(); }));
  search?.addEventListener("input", () => { state.query = search.value || ""; render(); });
  sort?.addEventListener("change", () => { state.sort = sort.value || "featured"; render(); });

  status.textContent = "Loading current supplier-backed catalog…";
  loadCatalog().then((products) => { state.products = products; render(); }).catch(() => {
    status.textContent = "Catalog temporarily unavailable.";
    grid.innerHTML = `<div class="universal-empty"><strong>Current catalog could not be loaded.</strong><p>No order is being offered from stale fallback data. Try again shortly or contact Elevation for product availability.</p></div>`;
  });
})();
