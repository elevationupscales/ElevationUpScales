(() => {
  "use strict";

  if (location.pathname !== "/store" && location.pathname !== "/store.html") return;

  const BUILD = "3.11.28-native-rv-catalog";
  const EBAY_SELLER = "elevationupscalesshop";
  const EBAY_HOSTS = new Set(["ebay.com", "www.ebay.com"]);
  const FOURTHWALL_HOST = "elevationupscales-shop.fourthwall.com";
  const params = new URLSearchParams(location.search);

  const RV_COLLECTIONS = Object.freeze([
    {
      id: "rv-essentials",
      name: "RV Essentials",
      category: "essentials",
      description: "Everyday RV gear and practical travel items selected for campers, trailers, motorhomes, and vans.",
      image: "assets/rv-interior-before-after.webp",
      keyword: "RV essentials",
      badge: "RV Shop"
    },
    {
      id: "rv-electrical",
      name: "Electrical & Power",
      category: "electrical",
      description: "Electrical accessories, charging gear, power-management items, wiring support, and useful RV electrical upgrades.",
      image: "/assets/solar/builder/wiring.svg",
      keyword: "RV electrical power",
      badge: "Power"
    },
    {
      id: "rv-plumbing",
      name: "Plumbing & Water",
      category: "plumbing",
      description: "Water-system accessories, fittings, hoses, pumps, sanitation items, and practical RV plumbing essentials.",
      image: "assets/logo-mark.webp",
      keyword: "RV plumbing water",
      badge: "Water"
    },
    {
      id: "rv-leveling",
      name: "Leveling & Setup",
      category: "leveling",
      description: "Setup and campsite gear for leveling, stabilizing, parking, and getting an RV ready for use.",
      image: "assets/logo-mark.webp",
      keyword: "RV leveling stabilizer",
      badge: "Setup"
    },
    {
      id: "rv-exterior",
      name: "Exterior & Travel",
      category: "exterior",
      description: "Exterior accessories, towing and travel support, storage solutions, covers, and road-ready RV gear.",
      image: "assets/logo-mark.webp",
      keyword: "RV exterior travel accessories",
      badge: "Travel"
    },
    {
      id: "rv-offgrid",
      name: "Outdoor & Off-Grid",
      category: "outdoor",
      description: "Camping, outdoor, solar-support, and off-grid gear for customers who use their RV beyond full-hookup campgrounds.",
      image: "/assets/solar/builder/panel.svg",
      keyword: "RV camping off grid",
      badge: "Off-Grid"
    }
  ]);

  const CATEGORY_LABELS = Object.freeze({
    all: "All RV Products",
    essentials: "RV Essentials",
    electrical: "Electrical & Power",
    plumbing: "Plumbing & Water",
    leveling: "Leveling & Setup",
    exterior: "Exterior & Travel",
    outdoor: "Outdoor & Off-Grid"
  });

  const clean = (value, max = 120) => String(value || "").trim().replace(/\s+/g, " ").slice(0, max);
  const escapeHtml = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const referrerHost = (() => {
    try { return document.referrer ? new URL(document.referrer).hostname : ""; }
    catch (_) { return ""; }
  })();
  const baseDetails = () => ({
    source: "Store",
    build: BUILD,
    referrerHost: clean(referrerHost, 120),
    utmSource: clean(params.get("utm_source"), 80),
    utmMedium: clean(params.get("utm_medium"), 80),
    utmCampaign: clean(params.get("utm_campaign"), 120),
  });
  const track = (type, value = "", details = {}) => {
    window.EUSIntent?.track?.(type, value, { ...baseDetails(), ...details });
  };
  const oncePerSession = (key, callback) => {
    const storageKey = `eus-store-analytics:${BUILD}:${key}`;
    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
    } catch (_) {}
    callback();
  };

  const sellerSearchUrl = (keyword = "") => {
    const url = new URL("https://www.ebay.com/sch/i.html");
    url.searchParams.set("_ssn", EBAY_SELLER);
    if (keyword) url.searchParams.set("_nkw", keyword);
    return url.toString();
  };

  const destinationFor = (link) => {
    try {
      const url = new URL(link.href, location.href);
      const host = url.hostname.toLowerCase();
      if (EBAY_HOSTS.has(host)) {
        const profile = /\/usr\/elevationupscalesshop\/?$/i.test(url.pathname);
        const sellerSearch = /\/sch\/i\.html$/i.test(url.pathname) && (url.searchParams.get("_ssn") || "").toLowerCase() === EBAY_SELLER;
        if (profile || sellerSearch || /\/itm\//i.test(url.pathname)) return "ebay";
      }
      if (host === FOURTHWALL_HOST) return "fourthwall";
      if (url.origin === location.origin && /^\/collector(?:$|[/?#])/.test(url.pathname)) return "collector";
    } catch (_) {}
    return "";
  };

  const productNameFor = (link) => {
    const card = link.closest(".market-product-card,.hero-product,.rv-detail-dialog");
    return clean(card?.querySelector("h3,h2")?.textContent, 120);
  };

  const safeSearchValue = (value) => {
    const query = clean(value, 80);
    if (!query) return "";
    if (/@/.test(query) || /(?:\D|^)(?:\d[\s().-]*){7,}(?:\D|$)/.test(query)) return "[redacted]";
    return query.replace(/[^a-zA-Z0-9 '&+._/-]/g, "").slice(0, 80);
  };

  function createRvCatalog() {
    const rvShop = document.querySelector("#rv-shop");
    if (!rvShop || document.querySelector("#rv-catalog")) return;

    const externalHeroLink = rvShop.querySelector('a[data-store-destination="ebay"]');
    if (externalHeroLink) {
      externalHeroLink.href = "#rv-catalog";
      externalHeroLink.removeAttribute("target");
      externalHeroLink.removeAttribute("rel");
      externalHeroLink.removeAttribute("data-store-destination");
      externalHeroLink.textContent = "Browse RV Products";
      externalHeroLink.setAttribute("aria-label", "Browse RV products on Elevation UpScales");
    }
    const heroPrice = rvShop.querySelector(".hero-product-price");
    if (heroPrice) heroPrice.textContent = "Shop on Elevation";

    const section = document.createElement("section");
    section.className = "marketplace rv-native-marketplace";
    section.id = "rv-catalog";
    section.setAttribute("aria-labelledby", "rv-catalog-title");
    section.innerHTML = `
      <div class="container marketplace-shell">
        <div class="marketplace-toolbar">
          <div>
            <p class="eyebrow">Browse the RV Shop</p>
            <h2 id="rv-catalog-title">RV Parts, Gear &amp; Essentials</h2>
            <p class="catalog-status" id="rv-catalog-status">Browse inside Elevation. eBay opens only when you choose to continue toward purchase.</p>
          </div>
          <div class="marketplace-controls">
            <label class="shop-search">
              <span class="sr-only">Search RV products</span>
              <input autocomplete="off" id="rv-product-search" placeholder="Search RV shop" type="search"/>
            </label>
            <label class="shop-sort">
              <span class="sr-only">Sort RV products</span>
              <select id="rv-product-sort">
                <option value="featured">Featured</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>
        <div class="rv-native-filters" id="rv-category-filters" role="group" aria-label="RV Shop categories">
          ${Object.entries(CATEGORY_LABELS).map(([key, label], index) => `<button class="category-chip${index === 0 ? " is-active" : ""}" data-rv-category="${escapeHtml(key)}" type="button">${escapeHtml(label)}</button>`).join("")}
        </div>
        <div class="marketplace-summary">
          <strong><span id="rv-visible-product-count">${RV_COLLECTIONS.length}</span> collections</strong>
          <span id="rv-active-filter-label">Showing all RV categories</span>
        </div>
        <div class="product-market-grid" id="rv-product-grid"></div>
        <div class="empty-products" hidden id="rv-empty-products">
          <h3>No RV products matched.</h3>
          <p>Try a different search or choose another RV category.</p>
          <button class="button button-outline" id="rv-reset-products" type="button">Reset Filters</button>
        </div>
        <p class="rv-native-browse-note">Elevation UpScales hosts the browsing experience. Current availability, final product selection, shipping, taxes, payment, and order checkout are completed on eBay only after you choose to continue.</p>
      </div>`;
    rvShop.insertAdjacentElement("afterend", section);

    const dialog = document.createElement("div");
    dialog.className = "rv-detail-wall";
    dialog.id = "rv-detail-wall";
    dialog.hidden = true;
    dialog.innerHTML = `
      <div class="rv-detail-backdrop" data-close-rv-detail></div>
      <section class="rv-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="rv-detail-title">
        <button class="rv-detail-close" type="button" data-close-rv-detail aria-label="Close RV product details">×</button>
        <div class="rv-detail-media"><img id="rv-detail-image" src="assets/logo-mark.webp" alt="" width="900" height="900"></div>
        <div class="rv-detail-copy">
          <p class="market-product-category" id="rv-detail-category">RV Shop</p>
          <h2 id="rv-detail-title">RV Shop</h2>
          <p id="rv-detail-description"></p>
          <div class="rv-detail-policy"><strong>Stay on Elevation while you browse.</strong><span>You'll leave this site only when you press the final eBay button below.</span></div>
          <a class="market-product-link rv-ebay-checkout" id="rv-detail-checkout" data-store-destination="ebay" rel="noopener" target="_blank">Continue to live eBay inventory</a>
          <button class="button button-outline" type="button" data-close-rv-detail>Keep Browsing Elevation</button>
        </div>
      </section>`;
    document.body.append(dialog);
  }

  const rvState = { category: "all", query: "", sort: "featured" };
  let previousFocus = null;

  function visibleRvCollections() {
    const query = rvState.query.trim().toLowerCase();
    const rows = RV_COLLECTIONS.filter((item) => {
      const categoryMatch = rvState.category === "all" || item.category === rvState.category;
      const searchMatch = !query || `${item.name} ${item.description} ${CATEGORY_LABELS[item.category] || ""}`.toLowerCase().includes(query);
      return categoryMatch && searchMatch;
    });
    if (rvState.sort === "name") rows.sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }

  function buildRvCard(item) {
    const article = document.createElement("article");
    article.className = "market-product-card rv-native-card";
    article.dataset.rvCollection = item.id;
    article.innerHTML = `
      <div class="market-product-image" aria-label="${escapeHtml(item.name)} collection">
        <img class="market-product-image-primary" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" width="1200" height="1200" loading="lazy" decoding="async">
        <span class="market-product-badge">${escapeHtml(item.badge)}</span>
      </div>
      <div class="market-product-copy">
        <p class="market-product-category">${escapeHtml(CATEGORY_LABELS[item.category] || "RV Shop")}</p>
        <h3>${escapeHtml(item.name)}</h3>
        <p class="market-product-description">${escapeHtml(item.description)}</p>
        <div class="market-product-meta">
          <span class="market-product-price">Live Inventory</span>
          <button class="market-product-link" type="button" data-rv-view="${escapeHtml(item.id)}">View Products</button>
        </div>
      </div>`;
    const img = article.querySelector("img");
    img?.addEventListener("error", () => { img.src = "assets/logo-mark.webp"; }, { once: true });
    return article;
  }

  function renderRvCatalog() {
    const grid = document.querySelector("#rv-product-grid");
    if (!grid) return;
    const rows = visibleRvCollections();
    grid.replaceChildren(...rows.map(buildRvCard));
    const count = document.querySelector("#rv-visible-product-count");
    if (count) count.textContent = String(rows.length);
    const label = document.querySelector("#rv-active-filter-label");
    if (label) label.textContent = rvState.category === "all" ? "Showing all RV categories" : `Filtered by ${CATEGORY_LABELS[rvState.category] || rvState.category}`;
    const empty = document.querySelector("#rv-empty-products");
    if (empty) empty.hidden = rows.length !== 0;
    grid.hidden = rows.length === 0;
  }

  function openRvDetail(id, trigger) {
    const item = RV_COLLECTIONS.find((row) => row.id === id);
    const wall = document.querySelector("#rv-detail-wall");
    if (!item || !wall) return;
    previousFocus = trigger || document.activeElement;
    const image = document.querySelector("#rv-detail-image");
    const category = document.querySelector("#rv-detail-category");
    const title = document.querySelector("#rv-detail-title");
    const description = document.querySelector("#rv-detail-description");
    const checkout = document.querySelector("#rv-detail-checkout");
    if (image) { image.src = item.image; image.alt = item.name; }
    if (category) category.textContent = CATEGORY_LABELS[item.category] || "RV Shop";
    if (title) title.textContent = item.name;
    if (description) description.textContent = item.description;
    if (checkout) {
      checkout.href = sellerSearchUrl(item.keyword);
      checkout.dataset.product = item.name;
      checkout.setAttribute("aria-label", `Continue to live eBay inventory for ${item.name}`);
    }
    wall.hidden = false;
    document.body.classList.add("rv-detail-open");
    wall.querySelector(".rv-detail-close")?.focus();
  }

  function closeRvDetail() {
    const wall = document.querySelector("#rv-detail-wall");
    if (!wall || wall.hidden) return;
    wall.hidden = true;
    document.body.classList.remove("rv-detail-open");
    if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
    previousFocus = null;
  }

  document.addEventListener("DOMContentLoaded", () => {
    createRvCatalog();
    renderRvCatalog();
    track("store_open", "storefront", { section: "store" });

    const observedSections = [
      [document.querySelector("#rv-shop"), "rv_shop"],
      [document.querySelector("#rv-catalog"), "rv_shop"],
      [document.querySelector("#catalog"), "brand_catalog"],
    ].filter(([element]) => element);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.28) return;
          const row = observedSections.find(([element]) => element === entry.target);
          if (!row) return;
          oncePerSession(`section:${row[1]}`, () => track("store_section_view", row[1], { section: row[0].id || row[1] }));
          observer.unobserve(entry.target);
        });
      }, { threshold: [0.28] });
      observedSections.forEach(([element]) => observer.observe(element));
    }

    document.addEventListener("click", (event) => {
      const rvCategory = event.target.closest("[data-rv-category]");
      if (rvCategory) {
        rvState.category = clean(rvCategory.dataset.rvCategory, 60) || "all";
        document.querySelectorAll("[data-rv-category]").forEach((item) => item.classList.toggle("is-active", item === rvCategory));
        renderRvCatalog();
        track("store_category_select", rvState.category, { category: rvState.category, section: "rv_shop" });
        return;
      }

      const viewButton = event.target.closest("[data-rv-view]");
      if (viewButton) {
        openRvDetail(viewButton.dataset.rvView, viewButton);
        return;
      }

      if (event.target.closest("[data-close-rv-detail]")) {
        closeRvDetail();
        return;
      }

      const categoryButton = event.target.closest("[data-category]");
      if (categoryButton) {
        track("store_category_select", clean(categoryButton.dataset.category, 60), { category: clean(categoryButton.dataset.category, 60), section: "brand_catalog" });
      }

      const link = event.target.closest("a[href]");
      if (!link) return;
      const destination = destinationFor(link);
      if (!destination) return;

      const product = clean(link.dataset.product, 120) || productNameFor(link);
      const section = link.closest("#rv-shop,#rv-catalog,.rv-detail-dialog") ? "rv_shop" : (link.closest("#catalog,#featured") ? "brand_catalog" : "store_navigation");
      track("store_destination_click", destination, { destination, section, product });
      if (product) track("store_product_click", destination, { destination, product, section });
    }, { capture: true });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeRvDetail();
    });

    const brandSearch = document.querySelector("#product-search");
    let brandSearchTimer = null;
    brandSearch?.addEventListener("input", () => {
      clearTimeout(brandSearchTimer);
      brandSearchTimer = setTimeout(() => {
        const query = safeSearchValue(brandSearch.value);
        if (query) track("store_search_used", query, { section: "brand_catalog" });
      }, 900);
    });

    document.querySelector("#product-sort")?.addEventListener("change", (event) => {
      const value = clean(event.target?.value, 60);
      if (value) track("store_sort_changed", value, { section: "brand_catalog" });
    });

    const rvSearch = document.querySelector("#rv-product-search");
    let rvSearchTimer = null;
    rvSearch?.addEventListener("input", () => {
      rvState.query = rvSearch.value;
      renderRvCatalog();
      clearTimeout(rvSearchTimer);
      rvSearchTimer = setTimeout(() => {
        const query = safeSearchValue(rvSearch.value);
        if (query) track("store_search_used", query, { section: "rv_shop" });
      }, 900);
    });

    document.querySelector("#rv-product-sort")?.addEventListener("change", (event) => {
      rvState.sort = clean(event.target?.value, 60) || "featured";
      renderRvCatalog();
      track("store_sort_changed", rvState.sort, { section: "rv_shop" });
    });

    document.querySelector("#rv-reset-products")?.addEventListener("click", () => {
      rvState.category = "all";
      rvState.query = "";
      rvState.sort = "featured";
      if (rvSearch) rvSearch.value = "";
      const rvSort = document.querySelector("#rv-product-sort");
      if (rvSort) rvSort.value = "featured";
      document.querySelectorAll("[data-rv-category]").forEach((item) => item.classList.toggle("is-active", item.dataset.rvCategory === "all"));
      renderRvCatalog();
    });
  });
})();