(() => {
  "use strict";
  const LIST_KEY = "eus-rv-shopping-list:v1";
  const EBAY_SELLER = "elevationupscalesshop";
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
  const sellerSearchUrl = (item) => {
    const url = new URL("https://www.ebay.com/sch/i.html");
    url.searchParams.set("_ssn", EBAY_SELLER);
    url.searchParams.set("_nkw", item?.name || "");
    url.searchParams.set("_sop", "10");
    return url.toString();
  };
  const listingUrl = (item) => {
    try {
      const url = new URL(item?.buyUrl || "");
      const host = url.hostname.toLowerCase();
      const itemNumber = String(item?.itemNumber || "");
      if ((host === "ebay.com" || host === "www.ebay.com") && itemNumber && url.pathname.includes(`/itm/${itemNumber}`)) return url.toString();
    } catch (_) {}
    return sellerSearchUrl(item);
  };

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

  function productImage(item) {
    if (!item.imageUrl) {
      const placeholder = document.createElement("div");
      placeholder.className = "rv-product-image-fallback";
      placeholder.textContent = "Listing image unavailable";
      return placeholder;
    }
    const image = document.createElement("img");
    image.className = "rv-product-image";
    image.src = item.imageUrl;
    image.alt = item.name;
    image.loading = "lazy";
    image.decoding = "async";
    image.referrerPolicy = "no-referrer";
    image.addEventListener("error", () => {
      const placeholder = document.createElement("div");
      placeholder.className = "rv-product-image-fallback";
      placeholder.textContent = "Listing image unavailable";
      image.replaceWith(placeholder);
    }, { once: true });
    return image;
  }

  function card(item) {
    const article = document.createElement("article");
    article.className = "rv-product-card";
    const media = document.createElement("div");
    media.className = "rv-product-media";
    media.append(productImage(item));
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
    stock.textContent = "Elevation eBay Store";
    meta.append(price, stock);
    const actions = document.createElement("div");
    actions.className = "rv-product-actions";
    const listButton = document.createElement("button");
    listButton.type = "button";
    listButton.dataset.listItem = item.id;
    listButton.textContent = "+ Shopping List";
    const buy = document.createElement("a");
    buy.href = listingUrl(item);
    buy.target = "_blank";
    buy.rel = "noopener";
    buy.textContent = "Buy Now";
    buy.setAttribute("aria-label", `Buy ${item.name} on eBay`);
    buy.addEventListener("click", () => track("store_destination_click", "ebay", { product: item.name, itemNumber: item.itemNumber, destination: "ebay", seller: EBAY_SELLER }));
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
          : Number(a.order || 0) - Number(b.order || 0));
    return rows;
  }

  function render() {
    const rows = visible();
    grid.replaceChildren(...rows.map(card));
    count.textContent = String(rows.length);
    empty.hidden = rows.length !== 0;
    grid.hidden = rows.length === 0;
    status.textContent = state.items.length
      ? `${state.items.length} Seller Hub–verified products · direct item links and Seller Hub images`
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