(() => {
  "use strict";
  const API = "/api/store-inventory";
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
  const state = { items: [], query: "", sort: "updated" };
  const money = (cents) => cents ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100) : "View price";
  const loadList = () => { try { return new Set(JSON.parse(localStorage.getItem(LIST_KEY) || "[]")); } catch (_) { return new Set(); } };
  let shopping = loadList();
  const saveList = () => { try { localStorage.setItem(LIST_KEY, JSON.stringify([...shopping])); } catch (_) {} };
  const productImage = (item) => item.imageUrl || (/solar|power|electrical|off.?grid/i.test(`${item.category} ${item.name}`) ? "/assets/solar/builder/panel.svg" : "/assets/logo-mark.webp");
  const track = (type, value, details = {}) => window.EUSIntent?.track?.(type, value, { source: "RV & Outdoor Store", section: "rv_shop", ...details });
  function syncList() {
    const selected = state.items.filter((item) => shopping.has(item.id));
    listPanel.hidden = selected.length === 0;
    listCount.textContent = String(selected.length);
    listItems.replaceChildren(...selected.map((item) => { const chip = document.createElement("span"); chip.textContent = item.name; return chip; }));
    document.querySelectorAll("[data-list-item]").forEach((button) => {
      const on = shopping.has(button.dataset.listItem);
      button.textContent = on ? "✓ On Shopping List" : "+ Shopping List";
      button.setAttribute("aria-pressed", String(on));
    });
  }
  function card(item) {
    const article = document.createElement("article"); article.className = "rv-product-card";
    const canBuy = item.fulfillmentMode !== "tracked" || Number(item.quantityAvailable) > 0;
    article.innerHTML = `<div class="rv-product-media"><img alt="" width="420" height="320" loading="lazy"></div><div class="rv-product-copy"><p class="eyebrow">${item.category || "RV & Outdoor"}</p><h3></h3><div class="rv-product-meta"><span class="rv-product-price">${money(item.priceCents)}</span><span class="rv-product-stock"></span></div><div class="rv-product-actions"><button type="button" data-list-item="${item.id}">+ Shopping List</button><a ${canBuy ? `href="${item.buyUrl}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}>Buy Now</a></div></div>`;
    const image = article.querySelector("img"); image.src = productImage(item); image.alt = item.name;
    article.querySelector("h3").textContent = item.name;
    article.querySelector(".rv-product-stock").textContent = item.availability;
    const buy = article.querySelector("a");
    if (canBuy) buy.addEventListener("click", () => track("store_destination_click", "ebay", { product: item.name, destination: "ebay" }));
    return article;
  }
  function visible() {
    const q = state.query.trim().toLowerCase();
    const rows = state.items.filter((item) => !q || `${item.name} ${item.category} ${item.sku}`.toLowerCase().includes(q));
    rows.sort((a, b) => state.sort === "name" ? a.name.localeCompare(b.name) : state.sort === "price-low" ? (a.priceCents || 0) - (b.priceCents || 0) : state.sort === "price-high" ? (b.priceCents || 0) - (a.priceCents || 0) : String(b.updatedAt).localeCompare(String(a.updatedAt)));
    return rows;
  }
  function render() {
    const rows = visible();
    grid.replaceChildren(...rows.map(card));
    count.textContent = String(rows.length);
    empty.hidden = rows.length !== 0;
    grid.hidden = rows.length === 0;
    syncList();
  }
  async function load() {
    status.textContent = "Loading Elevation Inventory…";
    try {
      const response = await fetch(`${API}?t=${Date.now()}`, { headers: { Accept: "application/json" }, cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `Inventory returned ${response.status}`);
      state.items = Array.isArray(data.items) ? data.items : [];
      const sync = data.supplierSync || {};
      if (state.items.length) {
        const source = sync.source === "ebay-api" ? "eBay API" : sync.source === "ebay-public" ? "eBay" : "Elevation Inventory";
        status.textContent = `${state.items.length} live items · ${source}`;
      } else if (sync.status === "error" || sync.status === "stale") {
        status.textContent = "RV inventory is temporarily unavailable.";
      } else {
        status.textContent = "Inventory is loading.";
      }
      render();
    } catch (error) {
      status.textContent = "Live inventory could not be loaded.";
      state.items = [];
      render();
    }
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-list-item]");
    if (!button) return;
    const id = button.dataset.listItem;
    const item = state.items.find((row) => row.id === id);
    if (shopping.has(id)) shopping.delete(id); else shopping.add(id);
    saveList(); syncList();
    track("store_product_click", "shopping_list", { product: item?.name || id, destination: "shopping_list" });
  });
  document.querySelector("#shopping-list-clear")?.addEventListener("click", () => { shopping.clear(); saveList(); syncList(); });
  document.querySelector("#shopping-list-copy")?.addEventListener("click", async () => {
    const names = state.items.filter((item) => shopping.has(item.id)).map((item) => `• ${item.name}`).join("\n");
    if (!names) return;
    try { await navigator.clipboard.writeText(`Elevation UpScales RV & Outdoor Shopping List\n${names}`); document.querySelector("#shopping-list-copy").textContent = "Copied"; setTimeout(() => document.querySelector("#shopping-list-copy").textContent = "Copy List", 1400); } catch (_) {}
  });
  search?.addEventListener("input", () => { state.query = search.value; render(); });
  sort?.addEventListener("change", () => { state.sort = sort.value; render(); });
  track("store_open", "rv_store", { surface: "rv_store" });
  track("store_section_view", "rv_shop", { surface: "rv_store" });
  load();
})();
