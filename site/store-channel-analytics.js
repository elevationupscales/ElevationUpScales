(() => {
  "use strict";

  if (location.pathname !== "/store" && location.pathname !== "/store.html") return;

  const BUILD = "3.11.27-rv-shop-analytics";
  const EBAY_HOSTS = new Set(["ebay.com", "www.ebay.com"]);
  const FOURTHWALL_HOST = "elevationupscales-shop.fourthwall.com";
  const params = new URLSearchParams(location.search);

  const clean = (value, max = 120) => String(value || "").trim().replace(/\s+/g, " ").slice(0, max);
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

  const destinationFor = (link) => {
    try {
      const url = new URL(link.href, location.href);
      const host = url.hostname.toLowerCase();
      if (EBAY_HOSTS.has(host) && /\/usr\/elevationupscalesshop\/?$/i.test(url.pathname)) return "ebay";
      if (host === FOURTHWALL_HOST) return "fourthwall";
      if (url.origin === location.origin && /^\/collector(?:$|[/?#])/.test(url.pathname)) return "collector";
    } catch (_) {}
    return "";
  };

  const productNameFor = (link) => {
    const card = link.closest(".market-product-card,.hero-product");
    return clean(card?.querySelector("h3,h2")?.textContent, 120);
  };

  const safeSearchValue = (value) => {
    const query = clean(value, 80);
    if (!query) return "";
    if (/@/.test(query) || /(?:\D|^)(?:\d[\s().-]*){7,}(?:\D|$)/.test(query)) return "[redacted]";
    return query.replace(/[^a-zA-Z0-9 '&+._/-]/g, "").slice(0, 80);
  };

  document.addEventListener("DOMContentLoaded", () => {
    track("store_open", "storefront", { section: "store" });

    const observedSections = [
      [document.querySelector("#rv-shop"), "rv_shop"],
      [document.querySelector("#catalog"), "brand_catalog"],
    ].filter(([element]) => element);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.28) return;
          const row = observedSections.find(([element]) => element === entry.target);
          if (!row) return;
          oncePerSession(`section:${row[1]}`, () => track("store_section_view", row[1], { section: row[1] }));
          observer.unobserve(entry.target);
        });
      }, { threshold: [0.28] });
      observedSections.forEach(([element]) => observer.observe(element));
    }

    document.addEventListener("click", (event) => {
      const categoryButton = event.target.closest("[data-category]");
      if (categoryButton) {
        track("store_category_select", clean(categoryButton.dataset.category, 60), { category: clean(categoryButton.dataset.category, 60), section: "brand_catalog" });
      }

      const link = event.target.closest("a[href]");
      if (!link) return;
      const destination = destinationFor(link);
      if (!destination) return;

      const product = productNameFor(link);
      track("store_destination_click", destination, {
        destination,
        section: link.closest("#rv-shop") ? "rv_shop" : (link.closest("#catalog,#featured") ? "brand_catalog" : "store_navigation"),
        product,
      });
      if (product) track("store_product_click", destination, { destination, product, section: link.closest("#rv-shop") ? "rv_shop" : "brand_catalog" });
    }, { capture: true });

    const search = document.querySelector("#product-search");
    let searchTimer = null;
    search?.addEventListener("input", () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const query = safeSearchValue(search.value);
        if (query) track("store_search_used", query, { section: "brand_catalog" });
      }, 900);
    });

    document.querySelector("#product-sort")?.addEventListener("change", (event) => {
      const value = clean(event.target?.value, 60);
      if (value) track("store_sort_changed", value, { section: "brand_catalog" });
    });
  });
})();
