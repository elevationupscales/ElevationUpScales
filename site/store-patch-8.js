(() => {
  "use strict";

  const storefront = window.EUS_STORE?.storefront || "https://elevationupscales-shop.fourthwall.com/";
  const storefrontUrl = new URL(storefront);
  const storefrontOrigin = storefrontUrl.origin;

  const productSlugFromUrl = (value) => {
    if (!value) return "";
    try {
      const parsed = new URL(String(value), storefrontOrigin);
      const match = parsed.pathname.match(/^\/products\/([^/?#]+)/i);
      return match ? decodeURIComponent(match[1]) : "";
    } catch {
      return "";
    }
  };

  const cleanProductSlug = (value) => String(value || "")
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/^products\//i, "");

  const fourthwallProductUrl = (product, fallbackSlug = "") => {
    const slug = cleanProductSlug(
      product?.slug ||
      product?.handle ||
      productSlugFromUrl(product?.url) ||
      productSlugFromUrl(product?.productUrl) ||
      productSlugFromUrl(product?.permalink) ||
      fallbackSlug
    );

    return slug
      ? `${storefrontOrigin}/products/${encodeURIComponent(slug)}`
      : `${storefrontOrigin}/`;
  };

  const FEATURE_MATCHERS = [
    {
      test: (text) => /true-grit-trucker-hat|elevation-upscales-true-grit-trucker-hat|true grit trucker hat/.test(text),
      badge: "Featured",
      priority: 0
    },
    {
      test: (text) => /polar[ -]+bear.*hoodie|bull[ &-]+bear.*hoodie|golden[ -]+bear.*bull.*hoodie|hoodie.*bull[ &-]+bear/.test(text),
      badge: "Featured",
      priority: 1
    }
  ];

  const FALLBACK_PRODUCTS = [
    { name: "True Grit Trucker Hat", price: 27.99, url: "https://elevationupscales-shop.fourthwall.com/products/elevation-upscales-true-grit-trucker-hat", image: "assets/store/true-grit-trucker-hat-approved.webp", category: "headwear", description: "Structured mesh-back trucker hat featuring the bull-and-bear mountain artwork, a pre-curved visor, and an adjustable snapback." },
    { name: "Elevation Signature Series Polar Bear Hoodie", id: "40957901-0099-48b9-aef4-fec0b7539a79", price: 56.08, url: "https://elevationupscales-shop.fourthwall.com/products/elevation-polar-bear-hoodie", image: "assets/store/featured-hoodie-back-mockup.webp", category: "apparel", description: "Heavyweight unisex hoodie featuring the Elevation UpScales polar bear chest mark and full Bull & Bear back artwork." },
    { name: "Black and Gold Signature T-Shirt", price: 18.45, url: "https://elevationupscales-shop.fourthwall.com/products/black-and-gold-signature-t-shirt", image: "https://imgproxy.fourthwall.dev/_bnsWjDPetod-jdewKKc-yiY8ML9I--lB7BGx6vbij4/rt:fill/w:422/sm:1/enc/464Dw2Qp3BNFAX1X/5Wstc18eZ36dP4yO/9YRvhgVr9UG0T5tg/B0Pyi3yTUWqtDSDm/fnKBJlKWz_TT-C7w/Yai48ytXVuxN6Udr/vyem600cZQOdn_0a/Nts8RRVjLjq4B0pT/Eo5AmQli__deYaRo/Q2LugPKANfmH-7lt/xS_2vDXsfkKPBNJA/E7XB_Y1oZ3dRofck/0Xeisv0kRVfmVj34/N9aomCyFtN9ulMML/9isc7DiKkNM.jpg", category: "apparel", description: "Black-and-gold Elevation UpScales signature T-shirt." },
    { name: "Golden Bear and Bull SnapBack", price: 25, url: "https://elevationupscales-shop.fourthwall.com/products/golden-bear-and-bull-snapback", image: "assets/store/hat-coming-soon.webp", category: "headwear", description: "Golden Bear and Bull snapback featuring Elevation UpScales artwork." },
    { name: "Elevation UpScales 4K Wall Art", price: 55, url: "https://elevationupscales-shop.fourthwall.com/products/elevation-upscales-4k-wall-art", image: "assets/store/combined-brand-wall-art.webp", category: "wall-art", description: "High-resolution Elevation UpScales wall art featuring the bull-and-bear brand scene." },
    { name: "Polar Bear Elevation UpScales 4K Wall Art", price: 45, url: "https://elevationupscales-shop.fourthwall.com/products/polar-bear-elevation-upscales-4k-wall-art", image: "assets/store/polar-bear-wall-art.webp", category: "wall-art", description: "High-resolution polar bear Elevation UpScales wall art." },
    { name: "Golden Bull Elevation UpScales 4K Wall Art", price: 45, url: "https://elevationupscales-shop.fourthwall.com/products/golden-bull-elevation-upscales-4k-wall-art", image: "assets/store/golden-bull-wall-art.webp", category: "wall-art", description: "High-resolution golden bull Elevation UpScales wall art." },
    { name: "Emergency Response 4K Wall Art", price: 45, url: "https://elevationupscales-shop.fourthwall.com/products/emergency-response-4k-wall-art", image: "assets/store/emergency-wall-art.webp", category: "wall-art", description: "High-resolution Emergency Response collection wall art." },
    { name: "Elevation UpScales Kiss Cut Stickers", price: 10.29, url: "https://elevationupscales-shop.fourthwall.com/products/elevationupscales-kiss-cut-stickers", image: "assets/store/stickers.webp", category: "stickers", description: "Elevation UpScales kiss-cut sticker design." },
    { name: "Elevation UpScales Trucker Hat", price: 23, url: "https://elevationupscales-shop.fourthwall.com/products/elevationupscales-trucker-hat", image: "assets/store/signature-hat.webp", category: "headwear", description: "Elevation UpScales signature trucker hat." },
    { name: "Elevation UpScales Bull & Bear Trucker Hat", price: 14, url: "https://elevationupscales-shop.fourthwall.com/products/signature-trucker-hat", image: "assets/store/premium-hat.webp", category: "headwear", description: "Bull-and-bear Elevation UpScales trucker hat." },
    { name: "Collectors Series 01 Printable", price: 5, url: "https://elevationupscales-shop.fourthwall.com/products/collectors-series-01-printable", image: "assets/store/signature-digital.webp", category: "digital", description: "Collectors Series 01 digital printable artwork." }
  ];

  const categoryLabels = {
    all: "All Products",
    apparel: "Apparel",
    headwear: "Hats & Headwear",
    "wall-art": "Wall Art",
    stickers: "Stickers",
    digital: "Digital Products",
    accessories: "Accessories"
  };

  const state = {
    products: [],
    category: "all",
    query: "",
    sort: "featured",
    source: "fallback"
  };

  const grid = document.querySelector("#product-grid");
  const status = document.querySelector("#catalog-status");
  const count = document.querySelector("#visible-product-count");
  const activeFilterLabel = document.querySelector("#active-filter-label");
  const empty = document.querySelector("#empty-products");
  const search = document.querySelector("#product-search");
  const sort = document.querySelector("#product-sort");
  const filterButtons = [...document.querySelectorAll("[data-category]")];

  const toNumber = (value) => {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Number.parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  };

  const firstArray = (...values) => values.find((value) => Array.isArray(value)) || [];

  const extractProducts = (data) => firstArray(
    data,
    data?.products,
    data?.results,
    data?.items,
    data?.collection?.products,
    data?.data?.products,
    data?.data?.results
  );

  const imageUrl = (image) => {
    if (typeof image === "string") return image.trim();
    return String(image?.transformedUrl || image?.url || image?.src || image?.imageUrl || "").trim();
  };

  const imageKey = (image, url) => {
    const explicitId = typeof image === "object" && image ? image.id || image.imageId || image.mediaId : "";
    if (explicitId) return `id:${explicitId}`;
    try {
      const parsed = new URL(url);
      return `url:${parsed.origin}${parsed.pathname}`;
    } catch {
      return `url:${url.split("?")[0]}`;
    }
  };

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
      product?.secondaryImage,
      product?.thumbnailImage
    ];

    const seen = new Set();
    const urls = [];
    for (const candidate of candidates) {
      const url = imageUrl(candidate);
      if (!url) continue;
      const key = imageKey(candidate, url);
      if (seen.has(key)) continue;
      seen.add(key);
      urls.push(url);
    }
    return urls;
  };

  const lowestVariantPrice = (product) => {
    const variants = Array.isArray(product?.variants) ? product.variants : [];
    const prices = variants
      .map((variant) => toNumber(variant?.unitPrice?.value ?? variant?.price?.value ?? variant?.price ?? variant?.amount))
      .filter((value) => value !== null);
    return prices.length ? Math.min(...prices) : null;
  };

  const cleanDescription = (value) => {
    if (typeof value !== "string") return "";
    return value
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 260);
  };

  const classify = (name, description = "") => {
    const text = `${name} ${description}`.toLowerCase();
    if (/digital|printable|download|pdf|collector series 01/.test(text)) return "digital";
    if (/sticker|decal/.test(text)) return "stickers";
    if (/wall art|poster|canvas|print\b|artwork/.test(text)) return "wall-art";
    if (/hat|cap|snapback|trucker|beanie/.test(text)) return "headwear";
    if (/shirt|tee|hoodie|sweatshirt|jacket|apparel|crewneck/.test(text)) return "apparel";
    return "accessories";
  };

  const matchFeature = (product) => {
    const searchable = `${product?.slug || ""} ${product?.url || ""} ${product?.name || ""}`.toLowerCase();
    return FEATURE_MATCHERS.find((item) => item.test(searchable)) || null;
  };

  const normalizeProduct = (product, index) => {
    const name = String(product?.name || product?.title || product?.productName || `Product ${index + 1}`).trim();
    const slug = cleanProductSlug(
      product?.slug ||
      product?.handle ||
      productSlugFromUrl(product?.url) ||
      productSlugFromUrl(product?.productUrl) ||
      productSlugFromUrl(product?.permalink)
    );
    const url = fourthwallProductUrl(product, slug);
    const rawDescription = product?.description || product?.descriptionHtml || product?.subtitle || "";
    const description = cleanDescription(rawDescription);
    const directPrice = toNumber(product?.price?.value ?? product?.price?.amount ?? product?.price ?? product?.minPrice?.value ?? product?.minPrice);
    const price = directPrice ?? lowestVariantPrice(product);
    const images = productImages(product);
    const normalized = {
      id: String(product?.id || product?.productId || product?.offerId || ""),
      name,
      slug: String(slug),
      url,
      image: images[0] || "assets/logo.webp",
      secondaryImage: images[1] || "",
      price,
      description,
      category: product?.category || classify(name, description),
      order: index,
      badge: "",
      priority: 99
    };
    const feature = matchFeature(normalized);
    if (feature) {
      normalized.badge = feature.badge;
      normalized.priority = feature.priority;
    }
    return normalized;
  };

  const formatPrice = (value) => {
    if (value === null || value === undefined) return "View price";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: value % 1 ? 2 : 0 }).format(value);
  };

  const buildCard = (product) => {
    const article = document.createElement("article");
    article.className = "market-product-card";
    if (product.priority < 99) article.classList.add("is-priority");

    const imagePanel = document.createElement("div");
    imagePanel.className = "market-product-image";
    imagePanel.setAttribute("aria-label", `${product.name} image`);

    const img = document.createElement("img");
    img.className = "market-product-image-primary";
    img.src = product.image || "assets/logo.webp";
    img.alt = `${product.name} front view`;
    img.width = 1200;
    img.height = 1200;
    img.loading = "lazy";
    img.decoding = "async";
    img.referrerPolicy = "no-referrer";
    img.draggable = false;
    img.addEventListener("error", () => {
      img.src = "assets/logo.webp";
      img.classList.add("is-fallback-image");
    }, { once: true });
    imagePanel.append(img);

    if (product.badge) {
      const badge = document.createElement("span");
      badge.className = "market-product-badge";
      badge.textContent = product.badge;
      imagePanel.append(badge);
    }

    const copy = document.createElement("div");
    copy.className = "market-product-copy";

    const category = document.createElement("p");
    category.className = "market-product-category";
    category.textContent = categoryLabels[product.category] || "Official Merchandise";

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "market-product-description";
    description.textContent = product.description || "Browse the product image, price, and category here before choosing Buy Now.";

    const meta = document.createElement("div");
    meta.className = "market-product-meta";

    const price = document.createElement("span");
    price.className = "market-product-price";
    price.textContent = formatPrice(product.price);

    const link = document.createElement("a");
    link.className = "market-product-link";
    link.href = fourthwallProductUrl(product, product.slug);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "Buy Now";
    link.setAttribute("aria-label", `Buy ${product.name} on Fourthwall`);

    meta.append(price, link);
    copy.append(category, title, description, meta);
    article.append(imagePanel, copy);
    return article;
  };

  const resolveFeaturedProductLinks = (products) => {
    document.querySelectorAll("[data-fourthwall-product-id]").forEach((link) => {
      const productId = String(link.dataset.fourthwallProductId || "");
      const product = products.find((item) => item.id === productId);
      if (!product?.slug) return;
      link.href = fourthwallProductUrl(product, product.slug);
      link.setAttribute("aria-label", `Buy ${product.name} on Fourthwall`);
    });
  };

  const visibleProducts = () => {
    const query = state.query.trim().toLowerCase();
    const filtered = state.products.filter((product) => {
      const categoryMatch = state.category === "all" || product.category === state.category;
      const searchMatch = !query || `${product.name} ${product.description} ${categoryLabels[product.category] || ""}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });

    return [...filtered].sort((a, b) => {
      if (state.sort === "price-low") return (a.price ?? Number.MAX_VALUE) - (b.price ?? Number.MAX_VALUE);
      if (state.sort === "price-high") return (b.price ?? -1) - (a.price ?? -1);
      if (state.sort === "name") return a.name.localeCompare(b.name);
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.order - b.order;
    });
  };

  const render = () => {
    const products = visibleProducts();
    grid.replaceChildren(...products.map(buildCard));
    grid.setAttribute("aria-busy", "false");
    count.textContent = String(products.length);
    activeFilterLabel.textContent = state.category === "all" ? "Showing all categories" : `Filtered by ${categoryLabels[state.category] || state.category}`;
    empty.hidden = products.length !== 0;
    grid.hidden = products.length === 0;
  };

  const loadCatalog = async () => {
    const isLocalPreview = location.protocol === "file:" || location.hostname === "127.0.0.1" || location.hostname === "localhost";
    const sources = isLocalPreview ? [] : [
      async () => {
        const response = await fetch("/api/store-products?v=3.0.3", { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`Catalog proxy returned ${response.status}`);
        return response.json();
      },
      async () => {
        const response = await fetch(`${storefront.replace(/\/$/, "")}/collections/all.json`, { headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error(`Store feed returned ${response.status}`);
        return response.json();
      }
    ];

    for (const source of sources) {
      try {
        const data = await source();
        const rawProducts = extractProducts(data);
        if (!rawProducts.length) continue;
        state.products = rawProducts.map(normalizeProduct);
        state.source = "live";
        break;
      } catch (error) {
        console.warn("Catalog source unavailable:", error);
      }
    }

    if (!state.products.length) {
      state.products = FALLBACK_PRODUCTS.map(normalizeProduct);
      state.source = "fallback";
    }

    status.textContent = state.source === "live"
      ? `${state.products.length} products available to browse`
      : `${state.products.length} products available to browse`;
    resolveFeaturedProductLinks(state.products);
    render();
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.category = button.dataset.category || "all";
      filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
      render();
    });
  });

  search?.addEventListener("input", () => {
    state.query = search.value;
    render();
  });

  sort?.addEventListener("change", () => {
    state.sort = sort.value;
    render();
  });

  document.querySelector("#reset-products")?.addEventListener("click", () => {
    state.category = "all";
    state.query = "";
    state.sort = "featured";
    if (search) search.value = "";
    if (sort) sort.value = "featured";
    filterButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.category === "all"));
    render();
  });

  loadCatalog();
})();
