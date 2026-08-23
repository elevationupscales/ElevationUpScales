(() => {
  "use strict";
  const LIST_KEY = "eus-rv-shopping-list:v1";
  const SPRITE_URL = "/assets/store/ebay49-sprite.webp";
  const SPRITE_COLUMNS = 7;
  const grid = document.querySelector("#rv-product-grid");
  const status = document.querySelector("#rv-catalog-status");
  const search = document.querySelector("#rv-search");
  const sort = document.querySelector("#rv-sort");
  const count = document.querySelector("#rv-count");
  const empty = document.querySelector("#rv-empty");
  const listPanel = document.querySelector("#shopping-list");
  const listItems = document.querySelector("#shopping-list-items");
  const listCount = document.querySelector("#shopping-list-count");
  const catalog = Array.isArray(window.EUS_VERIFIED_EBAY_CATALOG) ? [...window.EUS_VERIFIED_EBAY_CATALOG] : [];
  const state = { items: catalog, query: "", sort: "updated" };
  const money = (cents) => Number.isFinite(Number(cents)) && Number(cents) > 0
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(cents) / 100)
    : "View price";
  const loadList = () => { try { return new Set(JSON.parse(localStorage.getItem(LIST_KEY) || "[]")); } catch (_) { return new Set(); } };
  let shopping = loadList();
  const saveList = () => { try { localStorage.setItem(LIST_KEY, JSON.stringify([...shopping])); } catch (_) {} };
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

  function productThumb(item) {
    const thumb = document.createElement("div");
    thumb.className = "rv-product-thumb";
    thumb.setAttribute("role", "img");
    thumb.setAttribute("aria-label", `${item.name} eBay listing image`);
    const index = Number(item.spriteIndex);
    if (Number.isInteger(index) && index >= 0) {
      const col = index % SPRITE_COLUMNS;
      const row = Math.floor(index / SPRITE_COLUMNS);
      const denominator = SPRITE_COLUMNS - 1;
      thumb.style.backgroundImage = `url("${SPRITE_URL}")`;
      thumb.style.backgroundPosition = `${(col / denominator) * 100}% ${(row / denominator) * 100}%`;
    } else {
      thumb.classList.add("is-missing");
      thumb.textContent = "Image unavailable";
    }
    return thumb;
  }

  function card(item) {
    const article = document.createElement("article");
    article.className = "rv-product-card";
    const media = document.createElement("div");
    media.className = "rv-product-media";
    media.append(productThumb(item));

    const copy = document.createElement("div");
    copy.className = "rv-product-copy";
    const category = document.createElement("p");
    category.className = "eyebrow";
    category.textContent = item.category || "RV & Outdoor";
    const title = document.createElement("h3");
    title.textContent = item.name;
    const meta = document.createElement("div");
    meta.className = "rv-product-meta";
    const price = document.createElement("span");
    price.className = "rv-product-price";
    price.textContent = money(item.priceCents);
    const stock = document.createElement("span");
    stock.className = "rv-product-stock";
    stock.textContent = "Verified eBay listing";
    meta.append(price, stock);

    const actions = document.createElement("div");
    actions.className = "rv-product-actions";
    const listButton = document.createElement("button");
    listButton.type = "button";
    listButton.dataset.listItem = item.id;
    listButton.textContent = "+ Shopping List";
    const buy = document.createElement("a");
    buy.href = item.buyUrl;
    buy.target = "_blank";
    buy.rel = "noopener";
    buy.textContent = "Buy Now";
    buy.setAttribute("aria-label", `Buy ${item.name} on eBay`);
    buy.addEventListener("click", () => track("store_destination_click", "ebay", { product: item.name, itemNumber: item.itemNumber, destination: "ebay" }));
    actions.append(listButton, buy);
    copy.append(category, title, meta, actions);
    article.append(media, copy);
    return article;
  }

  function visible() {
    const q = state.query.trim().toLowerCase();
    const rows = state.items.filter((item) => !q || `${item.name} ${item.category} ${item.sku} ${item.itemNumber}`.toLowerCase().includes(q));
    rows.sort((a, b) => state.sort === "name"
      ? a.name.localeCompare(b.name)
      : state.sort === "price-low"
        ? (a.priceCents || 0) - (b.priceCents || 0)
        : state.sort === "price-high"
          ? (b.priceCents || 0) - (a.priceCents || 0)
          : String(b.updatedAt).localeCompare(String(a.updatedAt)) || a.name.localeCompare(b.name));
    return rows;
  }

  function render() {
    const rows = visible();
    grid.replaceChildren(...rows.map(card));
    count.textContent = String(rows.length);
    empty.hidden = rows.length !== 0;
    grid.hidden = rows.length === 0;
    status.textContent = state.items.length
      ? `${state.items.length} Seller Hub–verified eBay listings · prices shown from the verified catalog snapshot`
      : "The verified eBay catalog could not be loaded. Use the eBay Store link below.";
    syncList();
  }

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-list-item]");
    if (!button) return;
    const id = button.dataset.listItem;
    const item = state.items.find((row) => row.id === id);
    if (shopping.has(id)) shopping.delete(id); else shopping.add(id);
    saveList();
    syncList();
    track("store_product_click", "shopping_list", { product: item?.name || id, destination: "shopping_list" });
  });
  document.querySelector("#shopping-list-clear")?.addEventListener("click", () => { shopping.clear(); saveList(); syncList(); });
  document.querySelector("#shopping-list-copy")?.addEventListener("click", async () => {
    const names = state.items.filter((item) => shopping.has(item.id)).map((item) => `• ${item.name}`).join("\n");
    if (!names) return;
    try {
      await navigator.clipboard.writeText(`Elevation UpScales RV & Outdoor Shopping List\n${names}`);
      const copyButton = document.querySelector("#shopping-list-copy");
      copyButton.textContent = "Copied";
      setTimeout(() => { copyButton.textContent = "Copy List"; }, 1400);
    } catch (_) {}
  });
  search?.addEventListener("input", () => { state.query = search.value; render(); });
  sort?.addEventListener("change", () => { state.sort = sort.value; render(); });

  track("store_open", "rv_store", { section: "rv_shop", catalogCount: state.items.length });
  render();
})();
