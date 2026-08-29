(() => {
  "use strict";

  const LIST_KEY = "eus-rv-shopping-list:v1";
  const grid = document.querySelector("#rv-product-grid");
  const status = document.querySelector("#rv-catalog-status");
  const search = document.querySelector("#rv-search");
  const sort = document.querySelector("#rv-sort");
  const count = document.querySelector("#rv-count");
  const empty = document.querySelector("#rv-empty");
  const listPanel = document.querySelector("#shopping-list");
  const listItems = document.querySelector("#shopping-list-items");
  const listCount = document.querySelector("#shopping-list-count");

  const fallbackCatalog = Array.isArray(window.EUS_VERIFIED_EBAY_CATALOG)
    ? window.EUS_VERIFIED_EBAY_CATALOG.map((item) => ({ ...item, catalogSource: "legacy-fallback" }))
    : [];

  const state = { items: fallbackCatalog, query: "", sort: "updated", category: "all", source: fallbackCatalog.length ? "fallback" : "loading" };
  const debounce = (fn, ms=160) => { let timer=0; return (...args) => { clearTimeout(timer); timer=setTimeout(()=>fn(...args),ms); }; };
  const money = (cents) => Number.isFinite(Number(cents)) && Number(cents) > 0 ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(cents) / 100) : "View price";
  const loadList = () => { try { return new Set(JSON.parse(localStorage.getItem(LIST_KEY) || "[]")); } catch (_) { return new Set(); } };
  let shopping = loadList();
  const saveList = () => { try { localStorage.setItem(LIST_KEY, JSON.stringify([...shopping])); } catch (_) {} };
  const track = (type, value, details = {}) => window.EUSIntent?.track?.(type, value, { source: "RV & Outdoor Store", section: "rv_shop", ...details });

  function normalizeCatalogProduct(product, index) {
    const ebayItemId = String(product?.ebayItemId || "").trim();
    const sourceUrl = String(product?.sourceUrl || "").trim();
    const buyUrl = /^\d{12}$/.test(ebayItemId) ? `https://www.ebay.com/itm/${ebayItemId}` : (/^https?:\/\//i.test(sourceUrl) ? sourceUrl : "");
    const catalogId = String(product?.id || product?.sku || `catalog-${index}`);
    const supplier = String(product?.supplier || product?.sourceType || "Elevation").toLowerCase();
    const directCatalog = supplier === "doba" && String(product?.publishStatus || "") === "published" && String(product?.shippingStatus || "") === "verified" && Number(product?.priceCents || 0) > 0;
    const directUrl = directCatalog ? `/checkout/?source=rv&id=${encodeURIComponent(catalogId)}&name=${encodeURIComponent(String(product?.title || product?.name || "RV & Outdoor item"))}${ebayItemId?`&ebay=${encodeURIComponent(`https://www.ebay.com/itm/${ebayItemId}`)}`:""}` : buyUrl;
    return { id: catalogId, itemNumber: ebayItemId, sku: String(product?.sku || ""), name: String(product?.title || product?.name || "Elevation store product"), category: String(product?.category || "RV & Outdoor"), priceCents: Number(product?.priceCents || 0), imageUrl: String(product?.primaryImage || product?.images?.[0] || ""), buyUrl: directUrl, supplier, shippingStatus: String(product?.shippingStatus || "unverified"), fulfillmentMode: String(product?.fulfillmentMode || "supplier_managed"), order: index, catalogSource: "elevation-catalog" };
  }

  function syncList() {
    const selected = state.items.filter((item) => shopping.has(item.id));
    listPanel.hidden = selected.length === 0; listCount.textContent = String(selected.length);
    listItems.replaceChildren(...selected.map((item) => { const chip = document.createElement("span"); chip.textContent = item.name; return chip; }));
    document.querySelectorAll("[data-list-item]").forEach((button) => { const on = shopping.has(button.dataset.listItem); button.textContent = on ? "✓ On Shopping List" : "+ Shopping List"; button.setAttribute("aria-pressed", String(on)); });
  }

  function productImage(item) {
    if (!item.imageUrl) { const placeholder = document.createElement("div"); placeholder.className = "rv-product-image-fallback"; placeholder.textContent = "Product image unavailable"; return placeholder; }
    const image = document.createElement("img"); image.className = "rv-product-image"; image.src = item.imageUrl; image.alt = item.name; image.loading = "lazy"; image.decoding = "async"; image.referrerPolicy = "no-referrer";
    image.addEventListener("error", () => { const placeholder = document.createElement("div"); placeholder.className = "rv-product-image-fallback"; placeholder.textContent = "Product image unavailable"; image.replaceWith(placeholder); }, { once: true });
    return image;
  }

  function availabilityLabel(item) {
    if (item.shippingStatus === "verified") return "Shipping available";
    if (item.shippingStatus === "quote_required") return "Shipping quote required";
    return "Check shipping availability";
  }

  function card(item) {
    const article = document.createElement("article"); article.className = "rv-product-card";
    const media = document.createElement("div"); media.className = "rv-product-media"; media.append(productImage(item));
    const copy = document.createElement("div"); copy.className = "rv-product-copy";
    const category = document.createElement("p"); category.className = "eyebrow"; category.textContent = item.category || "RV & Outdoor";
    const title = document.createElement("h3"); title.textContent = item.name;
    const meta = document.createElement("div"); meta.className = "rv-product-meta";
    const price = document.createElement("span"); price.className = "rv-product-price"; price.textContent = money(item.priceCents);
    const stock = document.createElement("span"); stock.className = "rv-product-stock"; stock.textContent = availabilityLabel(item); meta.append(price, stock);
    const actions = document.createElement("div"); actions.className = "rv-product-actions";
    const listButton = document.createElement("button"); listButton.type = "button"; listButton.dataset.listItem = item.id; listButton.textContent = "+ Shopping List"; actions.append(listButton);
    if (item.buyUrl) { const buy = document.createElement("a"); buy.href = item.buyUrl; buy.target = "_blank"; buy.rel = "noopener"; buy.textContent = "Buy Now"; buy.setAttribute("aria-label", `Buy ${item.name}`); buy.addEventListener("click", () => track("store_destination_click", item.catalogSource === "elevation-catalog" ? "catalog_product" : "alternate_product_path", { product: item.name, itemNumber: item.itemNumber, destination: item.buyUrl })); actions.append(buy); }
    copy.append(category, title, meta, actions); article.append(media, copy); return article;
  }

  function visible() {
    const q = state.query.trim().toLowerCase(); const rows = state.items.filter((item) => (state.category === "all" || item.category === state.category) && (!q || `${item.name} ${item.category} ${item.sku} ${item.itemNumber}`.toLowerCase().includes(q)));
    rows.sort((a, b) => state.sort === "name" ? a.name.localeCompare(b.name) : state.sort === "price-low" ? (a.priceCents || 0) - (b.priceCents || 0) : state.sort === "price-high" ? (b.priceCents || 0) - (a.priceCents || 0) : Number(a.order || 0) - Number(b.order || 0)); return rows;
  }

  function renderCategoryRail() {
    let rail = document.querySelector("#rv-category-rail");
    const categories = [...new Set(state.items.map(item => item.category).filter(Boolean))];
    const preferred = ["RV Essentials & Water","Solar & Off-Grid","Camping & Shelter","Automotive, ATV & Towing","Tools & Workshop","Outdoor Lighting & Power","Travel & Organization"];
    const shown = preferred.filter(cat => categories.includes(cat));
    if (!shown.length) { rail?.remove(); state.category="all"; return; }
    if (!rail) { rail=document.createElement("div"); rail.id="rv-category-rail"; rail.className="rv-category-rail"; rail.setAttribute("aria-label","Filter products by category"); document.querySelector(".marketplace-summary")?.before(rail); }
    const active = categories.includes(state.category) ? state.category : "all"; state.category=active;
    rail.replaceChildren(...[["All Gear","all"],...shown.map(x=>[x,x])].map(([label,value])=>{ const button=document.createElement("button");button.type="button";button.textContent=label;button.dataset.category=value;button.classList.toggle("is-active",value===active);button.setAttribute("aria-pressed",String(value===active));return button;}));
  }

  function render() {
    renderCategoryRail();
    const rows = visible(); grid.replaceChildren(...rows.map(card)); count.textContent = String(rows.length); empty.hidden = rows.length !== 0; grid.hidden = rows.length === 0;
    if (state.source === "catalog") status.textContent = `${state.items.length} products available now`;
    else if (state.source === "fallback") status.textContent = `${state.items.length} products available while the store refreshes`;
    else if (state.source === "empty") status.textContent = "Products are being refreshed. Please check back soon.";
    else status.textContent = "Loading products…";
    syncList();
  }

  async function loadElevationCatalog() {
    try {
      const response = await fetch("/api/store-catalog?section=rv-outdoor", { cache: "no-store", headers: { Accept: "application/json" } });
      const data = await response.json().catch(() => ({})); const products = Array.isArray(data?.products) ? data.products.map(normalizeCatalogProduct).filter((item) => item.name) : [];
      if (!response.ok || !products.length) throw new Error(data?.error || "No products returned");
      state.items = products; state.source = "catalog"; render(); track("store_catalog_loaded", "elevation_catalog", { catalogCount: products.length });
    } catch (error) { console.warn("RV store product feed unavailable:", error); state.source = fallbackCatalog.length ? "fallback" : "empty"; render(); }
  }

  document.addEventListener("click", (event) => { const button = event.target.closest("[data-list-item]"); if (!button) return; const id = button.dataset.listItem; const item = state.items.find((row) => row.id === id); if (shopping.has(id)) shopping.delete(id); else shopping.add(id); saveList(); syncList(); track("store_product_click", "shopping_list", { product: item?.name || id, destination: "shopping_list" }); });
  document.querySelector("#shopping-list-clear")?.addEventListener("click", () => { shopping.clear(); saveList(); syncList(); });
  document.querySelector("#shopping-list-copy")?.addEventListener("click", async () => { const names = state.items.filter((item) => shopping.has(item.id)).map((item) => `• ${item.name}`).join("\n"); if (!names) return; try { await navigator.clipboard.writeText(`Elevation UpScales RV & Outdoor Shopping List\n${names}`); const copyButton = document.querySelector("#shopping-list-copy"); copyButton.textContent = "Copied"; setTimeout(() => { copyButton.textContent = "Copy List"; }, 1400); } catch (_) {} });
  search?.addEventListener("input", debounce(() => { state.query = search.value; render(); })); sort?.addEventListener("change", () => { state.sort = sort.value; render(); });
  document.addEventListener("click", (event) => { const button=event.target.closest("#rv-category-rail [data-category]"); if(!button)return; state.category=button.dataset.category||"all"; const url=new URL(location.href); if(state.category==="all")url.searchParams.delete("category");else url.searchParams.set("category",state.category); history.replaceState({},"",url); render(); });
  const initialCategory=new URLSearchParams(location.search).get("category"); if(initialCategory) state.category=initialCategory;
  render(); track("store_open", "rv_store", { section: "rv_shop", fallbackCatalogCount: fallbackCatalog.length }); loadElevationCatalog();
})();
