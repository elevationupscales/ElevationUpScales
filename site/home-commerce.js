(() => {
  "use strict";

  function installCommerceNavigation() {
    const shopMenu = [...document.querySelectorAll(".reference-nav-menu")].find((menu) => menu.querySelector("summary")?.textContent.trim().startsWith("Shop"));
    const dropdown = shopMenu?.querySelector(".eus-dropdown");
    if (dropdown) dropdown.innerHTML = `
      <a href="/store"><span><strong>Universal Store</strong><small>Lithium, charging, RV, backup and off-grid products</small></span></a>
      <a href="/sok-batteries"><span><strong>Shop SOK</strong><small>Authorized SOK Energy Dealer storefront</small></span></a>
      <a href="/kingboss-batteries"><span><strong>Shop Kingboss</strong><small>Kingboss battery storefront in the Elevation catalog</small></span></a>
      <a href="/store?department=rv-outdoor"><span><strong>RV &amp; Mobile Power</strong><small>RV, travel and mobile-power products</small></span></a>`;

    document.querySelectorAll('a[href="/lithium-batteries"]').forEach((link) => {
      if (!link.closest("[data-home-sok]")) link.href = "/store?department=lithium-batteries";
    });
    document.querySelectorAll('a[href="/rv-store"]').forEach((link) => { link.href = "/store?department=rv-outdoor"; });
  }

  installCommerceNavigation();

  const root = document.querySelector("[data-home-commerce]");
  if (!root) return;
  const lithiumHost = root.querySelector("[data-home-products='lithium']");
  const rvHost = root.querySelector("[data-home-products='rv']");
  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const money = (cents) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format((Number(cents)||0)/100);
  const track = (type,value,details={}) => window.EUSIntent?.track?.(type,value,{source:"homepage-commerce",...details});
  const TRUSTED_MEDIA_HOSTS = ["elevationupscales.com","cdn.shopify.com","image.doba.com","img.vevorstatic.com","image.vevor.com","vevor.com","renogy.com","sokbattery.com","fourthwall.com","fwcdn.pl"];
  const BLOCKED_MEDIA_HOSTS = ["walmartimages.com","walmart.com","lowes.com","alicdn.com","alibaba.com","utedusjer.no"];
  const hostMatches = (host,suffix) => host === suffix || host.endsWith(`.${suffix}`);
  function trustedMedia(raw) {
    const value = String(raw || "").trim();
    if (!value) return false;
    if (value.startsWith("/")) return true;
    try {
      const url = new URL(value, location.origin), host = url.hostname.toLowerCase();
      if (BLOCKED_MEDIA_HOSTS.some((suffix) => hostMatches(host,suffix))) return false;
      if (host === location.hostname.toLowerCase()) return true;
      return TRUSTED_MEDIA_HOSTS.some((suffix) => hostMatches(host,suffix));
    } catch (_) { return false; }
  }
  function trustedFeatured(item) {
    return Boolean(item && item.id && item.title && Number(item.priceCents) > 0 && trustedMedia(item.image));
  }

  function installLogisticsStyles() {
    if (document.querySelector('link[href*="home-logistics-capability.css"]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/home-logistics-capability.css?v=4.9.0";
    document.head.append(link);
  }

  function installLogisticsCapability() {
    const existing = document.querySelector("[data-home-logistics-capability]");
    if (existing) { track("homepage_logistics_capability_view","home",{sourceControl:"static-logistics"}); return; }
    const sokSection = document.querySelector("[data-home-sok]");
    if (!sokSection) return;
    const section = document.createElement("section");
    section.className = "home-logistics-capability";
    section.dataset.homeLogisticsCapability = "true";
    section.setAttribute("aria-labelledby","home-logistics-capability-title");
    section.innerHTML = `<div class="container"><div class="home-logistics-capability__grid"><div class="home-logistics-capability__copy"><p class="hc-eyebrow">OFF-GRID POWER • SUPPLY • LOGISTICS • MARKET ACCESS</p><h2 id="home-logistics-capability-title">Power supply beyond simple ecommerce.</h2><p class="home-logistics-capability__lead">Elevation helps customers and partners find the right power product, understand the purchase path and coordinate the next step when normal parcel shipping or one-click checkout is not enough—especially for lithium batteries, Hawaii, Alaska and larger commercial demand.</p><div class="home-logistics-capability__path" aria-label="Elevation customer path"><span><small>01</small><strong>Choose the power solution</strong></span><span><small>02</small><strong>Confirm quantity &amp; destination</strong></span><span><small>03</small><strong>Elevation builds the route</strong></span><span><small>04</small><strong>Purchase or assisted fulfillment</strong></span></div><div class="home-logistics-capability__actions"><a class="button button-primary" data-home-logistics-action="store" href="/store">Shop Universal Store</a><a class="button button-outline" data-home-logistics-action="sok" href="/sok-batteries">Shop SOK</a><a class="button button-outline" data-home-logistics-action="kingboss" href="/kingboss-batteries">Shop Kingboss</a><a class="button button-outline" data-home-logistics-action="hawaii" href="/hawaii-lithium-batteries">Hawaii Power &amp; Logistics</a></div></div><div class="home-logistics-capability__media"><img src="/assets/elevation-lithium-social-card.webp" alt="Elevation UpScales lithium, off-grid power and logistics" loading="lazy" decoding="async"><div class="home-logistics-capability__badge"><small>POWER • SUPPLY • LOGISTICS</small><strong>One retail system, route-specific fulfillment.</strong><span>Normal Lower-48 checkout stays simple while special destinations move into the logistics path only when required.</span></div></div></div></div>`;
    sokSection.insertAdjacentElement("beforebegin", section);
    section.addEventListener("click", (event) => {
      const link = event.target.closest("[data-home-logistics-action]");
      if (link) track("homepage_logistics_route", link.dataset.homeLogisticsAction || "unknown", {destination:link.getAttribute("href")||""});
    });
  }

  function card(item) {
    const title = String(item.title || "Elevation product");
    const image = String(item.image || "/assets/logo.webp");
    const spec = String(item.spec || item.status || "");
    const detail = String(item.detailUrl || item.buyUrl || "#");
    const buy = String(item.buyUrl || item.detailUrl || "#");
    const id = String(item.sku || item.id || title).slice(0,120);
    return `<article class="home-product-card" data-home-product-id="${esc(id)}"><a class="home-product-card__image" data-home-product-action="detail" href="${esc(detail)}"><img src="${esc(image)}" alt="${esc(title)}" width="480" height="360" loading="lazy" decoding="async" referrerpolicy="no-referrer"></a><div class="home-product-card__body"><h3><a data-home-product-action="detail" href="${esc(detail)}">${esc(title)}</a></h3>${spec?`<p>${esc(spec)}</p>`:""}<strong>${money(item.priceCents)}</strong><div class="home-product-card__actions"><a class="button button-primary" data-home-product-action="buy" href="${esc(buy)}">Buy Now</a>${item.detailUrl?`<a class="button button-outline" data-home-product-action="detail" href="${esc(detail)}">View Details</a>`:""}</div></div></article>`;
  }

  function render(host, rows) {
    if (!host) return;
    const trusted = Array.isArray(rows) ? rows.filter(trustedFeatured) : [];
    if (!trusted.length) { host.innerHTML = '<p class="home-commerce-empty">Current products are temporarily unavailable. Shop the universal store for current verified availability.</p>'; return; }
    host.innerHTML = trusted.slice(0,6).map(card).join("");
  }

  root.addEventListener("click", (event) => {
    const link = event.target.closest("[data-home-product-action]");
    if (!link) return;
    const item = link.closest("[data-home-product-id]");
    track(link.dataset.homeProductAction === "buy" ? "homepage_product_buy_open" : "homepage_product_detail_open", item?.dataset.homeProductId || "product", {destination:link.getAttribute("href")||""});
  });

  async function load() {
    try {
      const response = await fetch("/api/store/featured", { headers:{Accept:"application/json"}, cache:"default" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error("Featured products unavailable");
      render(lithiumHost, data.lithium);
      render(rvHost, data.rv);
      root.dataset.loaded = "true";
    } catch (_) { render(lithiumHost, []); render(rvHost, []); }
  }

  installLogisticsStyles();
  installLogisticsCapability();
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => { if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); load(); } }, {rootMargin:"500px 0px"});
    observer.observe(root);
  } else load();
})();
