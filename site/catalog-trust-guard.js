(() => {
  "use strict";

  const TRUSTED_MEDIA_HOSTS = [
    "elevationupscales.com",
    "cdn.shopify.com",
    "image.doba.com",
    "img.vevorstatic.com",
    "image.vevor.com",
    "vevor.com",
    "renogy.com",
    "sokbattery.com",
    "fourthwall.com",
    "fwcdn.pl"
  ];
  const BLOCKED_MEDIA_HOSTS = [
    "walmartimages.com",
    "walmart.com",
    "lowes.com",
    "alicdn.com",
    "alibaba.com",
    "utedusjer.no"
  ];
  const TARGET_PATHS = new Set([
    "/api/store/featured",
    "/api/store-catalog",
    "/api/store/catalog",
    "/api/catalog-product",
    "/api/sok/catalog"
  ]);
  const nativeFetch = window.fetch.bind(window);
  const clean = (value) => String(value ?? "").trim();
  const hostMatches = (host, suffix) => host === suffix || host.endsWith(`.${suffix}`);

  function isTrustedMedia(raw) {
    const value = clean(raw);
    if (!value) return false;
    if (value.startsWith("/")) return true;
    try {
      const url = new URL(value, location.origin);
      const host = url.hostname.toLowerCase();
      if (BLOCKED_MEDIA_HOSTS.some((suffix) => hostMatches(host, suffix))) return false;
      if (host === location.hostname.toLowerCase()) return true;
      return TRUSTED_MEDIA_HOSTS.some((suffix) => hostMatches(host, suffix));
    } catch (_) {
      return false;
    }
  }

  function trustedImages(product) {
    const values = [product?.primaryImage, product?.image, ...(Array.isArray(product?.images) ? product.images : [])];
    const out = [];
    const seen = new Set();
    for (const value of values) {
      const image = clean(value);
      if (!image || seen.has(image) || !isTrustedMedia(image)) continue;
      seen.add(image);
      out.push(image);
    }
    return out;
  }

  function safeProduct(product) {
    if (!product || typeof product !== "object") return null;
    const title = clean(product.title || product.name);
    const id = clean(product.id || product.sku);
    const publish = clean(product.publishStatus || product.publish_status).toLowerCase();
    const price = Number(product.priceCents || product.price_cents || 0);
    if (!title || !id) return null;
    if (publish && publish !== "published") return null;
    if (price <= 0 && !product.sokProduct) return null;
    if (/\b(test|demo|sample|staging)\b/i.test(`${title} ${clean(product.sku)}`)) return null;
    const images = trustedImages(product);
    if (!images.length) return null;
    return {
      ...product,
      primaryImage: images[0],
      image: images[0],
      images
    };
  }

  function sanitizePayload(payload) {
    if (!payload || typeof payload !== "object") return payload;
    if (Array.isArray(payload)) return payload.map(safeProduct).filter(Boolean);

    const next = { ...payload };
    if (Array.isArray(next.products)) next.products = next.products.map(safeProduct).filter(Boolean);
    if (Array.isArray(next.lithium)) next.lithium = next.lithium.map(safeProduct).filter(Boolean);
    if (Array.isArray(next.rv)) next.rv = next.rv.map(safeProduct).filter(Boolean);
    if (next.product && typeof next.product === "object") next.product = safeProduct(next.product);

    const looksLikeProduct = !Object.prototype.hasOwnProperty.call(next, "products") &&
      !Object.prototype.hasOwnProperty.call(next, "product") &&
      (next.id || next.sku) && (next.title || next.name);
    if (looksLikeProduct) return safeProduct(next) || {};

    if (Array.isArray(next.products)) next.count = next.products.length;
    return next;
  }

  window.ElevationCatalogTrust = Object.freeze({ isTrustedMedia, safeProduct });

  window.fetch = async (input, init) => {
    const response = await nativeFetch(input, init);
    try {
      const rawUrl = typeof input === "string" ? input : input?.url;
      const url = new URL(rawUrl || "", location.href);
      if (url.origin !== location.origin || !TARGET_PATHS.has(url.pathname)) return response;
      const contentType = String(response.headers.get("content-type") || "").toLowerCase();
      if (!contentType.includes("application/json")) return response;
      const payload = await response.clone().json();
      const sanitized = sanitizePayload(payload);
      const headers = new Headers(response.headers);
      headers.set("Cache-Control", "no-store");
      headers.set("X-EUS-Catalog-Trust-Guard", "active");
      return new Response(JSON.stringify(sanitized), {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    } catch (_) {
      return response;
    }
  };
})();