(() => {
  "use strict";

  const CACHE_KEY = "eus-fourthwall-full-catalog:v1";
  const MIN_FULL_COUNT = 13;
  const MAX_PAGES = 10;
  const storefront = window.EUS_STORE?.storefront || "https://elevationupscales-shop.fourthwall.com/";
  const storefrontOrigin = new URL(storefront).origin;
  const grid = document.querySelector("#product-grid");
  const status = document.querySelector("#catalog-status");
  const count = document.querySelector("#visible-product-count");
  const filterLabel = document.querySelector("#active-filter-label");
  if (!grid || !status || !count) return;

  const categoryLabels = {
    all: "All Products",
    apparel: "Apparel",
    headwear: "Hats & Headwear",
    "wall-art": "Wall Art",
    stickers: "Stickers",
    digital: "Digital Products",
    accessories: "Accessories"
  };

  const classify = (name, description = "") => {
    const text = `${name} ${description}`.toLowerCase();
    if (/digital|printable|download|pdf|collector series/.test(text)) return "digital";
    if (/sticker|decal/.test(text)) return "stickers";
    if (/wall art|poster|canvas|print\b|artwork/.test(text)) return "wall-art";
    if (/hat|cap|snapback|trucker|beanie/.test(text)) return "headwear";
    if (/shirt|tee|hoodie|sweatshirt|jacket|crewneck|apparel/.test(text)) return "apparel";
    return "accessories";
  };

  const cleanText = (value) => String(value || "")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();

  const toNumber = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Number.parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  };

  const extractProducts = (data) => [
    data,
    data?.products,
    data?.results,
    data?.items,
    data?.collection?.products,
    data?.data?.products,
    data?.data?.results
  ].find(Array.isArray) || [];

  const imageUrl = (value) => typeof value === "string"
    ? value
    : String(value?.transformedUrl || value?.url || value?.src || value?.imageUrl || "");

  const productImages = (product) => {
    const variants = Array.isArray(product?.variants) ? product.variants : [];
    const candidates = [
      ...(Array.isArray(product?.images) ? product.images : []),
      ...(Array.isArray(product?.media) ? product.media : []),
      ...variants.flatMap((variant) => [
        ...(Array.isArray(variant?.images) ? variant.images : []),
        ...(Array.isArray(variant?.media) ? variant.media : []),
        variant?.thumbnailImage
      ]),
      product?.image,
      product?.featuredImage,
      product?.primaryImage,
      product?.thumbnailImage
    ];
    return [...new Set(candidates.map(imageUrl).filter(Boolean))];
  };

  const slugFrom = (product) => {
    const direct = String(product?.slug || product?.handle || "").trim().replace(/^\/+|\/+$/g, "").replace(/^products\//i, "");
    if (direct) return direct;
    for (const value of [product?.url, product?.productUrl, product?.permalink]) {
      try {
        const match = new URL(String(value || ""), storefrontOrigin).pathname.match(/^\/products\/([^/?#]+)/i);
        if (match) return decodeURIComponent(match[1]);
      } catch (_) {}
    }
    return "";
  };

  const normalize = (product, index) => {
    const name = String(product?.name || product?.title || product?.productName || `Product ${index + 1}`).trim();
    const slug = slugFrom(product);
    const description = cleanText(product?.description || product?.descriptionHtml || product?.subtitle || "").slice(0, 260);
    const variants = Array.isArray(product?.variants) ? product.variants : [];
    const variantPrices = variants.map((variant) => toNumber(variant?.unitPrice?.value ?? variant?.price?.value ?? variant?.price ?? variant?.amount)).filter((v) => v !== null);
    const directPrice = toNumber(product?.price?.value ?? product?.price?.amount ?? product?.price ?? product?.minPrice?.value ?? product?.minPrice);
    const images = productImages(product);
    return {
      id: String(product?.id || product?.productId || product?.offerId || slug || name),
      name,
      slug,
      url: slug ? `${storefrontOrigin}/products/${encodeURIComponent(slug)}` : storefront,
      image: images[0] || "assets/logo.webp",
      price: directPrice ?? (variantPrices.length ? Math.min(...variantPrices) : null),
      description,
      category: product?.category || classify(name, description),
      order: index
    };
  };

  const dedupe = (products) => {
    const seen = new Set();
    return products.filter((product) => {
      const key = product.id || product.slug || product.url || product.name;
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const formatPrice = (value) => value === null || value === undefined
    ? "View price"
    : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: value % 1 ? 2 : 0 }).format(value);

  const loadCache = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      return Array.isArray(parsed?.products) ? parsed.products : [];
    } catch (_) { return []; }
  };

  const saveCache = (products) => {
    if (products.length < MIN_FULL_COUNT) return;
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), products })); } catch (_) {}
  };

  const fetchProxy = async () => {
    const response = await fetch(`/api/store-products?catalog=full&ts=${Date.now()}`, { cache: "no-store", headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`catalog proxy ${response.status}`);
    return extractProducts(await response.json());
  };

  const fetchDirectPages = async () => {
    const products = [];
    const seen = new Set();
    for (let page = 1; page <= MAX_PAGES; page += 1) {
      const suffix = page === 1 ? "/collections/all.json" : `/collections/all/${page}.json`;
      const response = await fetch(`${storefrontOrigin}${suffix}`, { cache: "no-store", headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error(`Fourthwall page ${page}: ${response.status}`);
      const rows = extractProducts(await response.json());
      if (!rows.length) break;
      let added = 0;
      for (const row of rows) {
        const normalized = normalize(row, products.length);
        const key = normalized.id || normalized.slug || normalized.url || normalized.name;
        if (seen.has(key)) continue;
        seen.add(key);
        products.push(row);
        added += 1;
      }
      if (!added) break;
    }
    return products;
  };

  const state = { products: [], query: "", category: "all", sort: "featured" };

  const card = (product) => {
    const article = document.createElement("article");
    article.className = "market-product-card";
    const imagePanel = document.createElement("div");
    imagePanel.className = "market-product-image";
    const img = document.createElement("img");
    img.className = "market-product-image-primary";
    img.src = product.image;
    img.alt = product.name;
    img.width = 1200;
    img.height = 1200;
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.addEventListener("error", () => { img.src = "assets/logo.webp"; }, { once: true });
    imagePanel.append(img);

    const copy = document.createElement("div");
    copy.className = "market-product-copy";
    const category = document.createElement("p");
    category.className = "market-product-category";
    category.textContent = categoryLabels[product.category] || "Official Merchandise";
    const title = document.createElement("h3");
    title.textContent = product.name;
    const description = document.createElement("p");
    description.className = "market-product-description";
    description.textContent = product.description || "Official Elevation UpScales store item.";
    const meta = document.createElement("div");
    meta.className = "market-product-meta";
    const price = document.createElement("span");
    price.className = "market-product-price";
    price.textContent = formatPrice(product.price);
    const link = document.createElement("a");
    link.className = "market-product-link";
    link.href = product.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Buy Now";
    link.setAttribute("aria-label", `Buy ${product.name} on Fourthwall`);
    link.addEventListener("click", () => window.EUSIntent?.track?.("store_destination_click", "fourthwall", { source: "Apparel Store", product: product.name, destination: "fourthwall" }));
    meta.append(price, link);
    copy.append(category, title, description, meta);
    article.append(imagePanel, copy);
    return article;
  };

  const render = () => {
    const query = state.query.trim().toLowerCase();
    let rows = state.products.filter((product) => {
      const categoryOk = state.category === "all" || product.category === state.category;
      const searchOk = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
      return categoryOk && searchOk;
    });
    rows = [...rows].sort((a, b) => state.sort === "name"
      ? a.name.localeCompare(b.name)
      : state.sort === "price-low"
        ? (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER)
        : state.sort === "price-high"
          ? (b.price ?? -1) - (a.price ?? -1)
          : a.order - b.order);
    grid.replaceChildren(...rows.map(card));
    count.textContent = String(rows.length);
    if (filterLabel) filterLabel.textContent = state.category === "all" ? "Showing all categories" : `Showing ${categoryLabels[state.category] || state.category}`;
    const empty = document.querySelector("#empty-products");
    if (empty) empty.hidden = rows.length !== 0;
  };

  const ownControls = () => {
    const search = document.querySelector("#product-search");
    const sort = document.querySelector("#product-sort");
    if (search) {
      const clone = search.cloneNode(true);
      search.replaceWith(clone);
      clone.addEventListener("input", () => { state.query = clone.value; render(); });
    }
    if (sort) {
      const clone = sort.cloneNode(true);
      sort.replaceWith(clone);
      clone.addEventListener("change", () => { state.sort = clone.value; render(); });
    }
    document.querySelectorAll("[data-category]").forEach((button) => {
      const clone = button.cloneNode(true);
      button.replaceWith(clone);
      clone.addEventListener("click", () => {
        state.category = clone.dataset.category || "all";
        document.querySelectorAll("[data-category]").forEach((item) => item.classList.toggle("is-active", item === clone));
        render();
      });
    });
  };

  const chooseBest = (...sets) => sets
    .map((rows) => dedupe((rows || []).map(normalize)))
    .sort((a, b) => b.length - a.length)[0] || [];

  async function refresh() {
    const cached = loadCache();
    const attempts = await Promise.allSettled([fetchProxy(), fetchDirectPages()]);
    const proxy = attempts[0].status === "fulfilled" ? attempts[0].value : [];
    const direct = attempts[1].status === "fulfilled" ? attempts[1].value : [];
    const liveBest = chooseBest(proxy, direct);
    const best = chooseBest(liveBest, cached);

    if (best.length >= MIN_FULL_COUNT) {
      state.products = best;
      saveCache(best);
      ownControls();
      render();
      status.textContent = `${best.length} Fourthwall products loaded · full catalog · Buy Now opens each product`;
      document.body.dataset.fullFourthwallCatalog = String(best.length);
      return true;
    }

    status.textContent = "Store catalog is reconnecting to Fourthwall…";
    return false;
  }

  refresh().then((ok) => {
    if (!ok) setTimeout(refresh, 2500);
  });
})();
