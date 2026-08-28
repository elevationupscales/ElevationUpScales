(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  if (String(params.get("source") || "").toLowerCase() !== "apparel") return;
  const wanted = String(params.get("id") || "").trim();
  if (!wanted) return;

  const image = document.querySelector("#checkout-product-image");
  const select = document.querySelector("#checkout-variant");
  if (!image || !select) return;

  const clean = (value) => String(value || "").trim();
  const extractProducts = (data) => [data, data?.products, data?.results, data?.items, data?.collection?.products, data?.data?.products, data?.data?.results].find(Array.isArray) || [];
  const slugFrom = (product) => {
    const direct = clean(product?.slug || product?.handle).replace(/^\/+|\/+$/g, "").replace(/^products\//i, "");
    if (direct) return direct;
    for (const value of [product?.url, product?.productUrl, product?.permalink]) {
      try {
        const match = new URL(String(value || ""), location.origin).pathname.match(/^\/products\/([^/?#]+)/i);
        if (match) return decodeURIComponent(match[1]);
      } catch (_) {}
    }
    return "";
  };
  const productId = (product) => clean(product?.id || product?.productId || product?.offerId || slugFrom(product) || product?.name || product?.title);
  const variantId = (variant, index) => clean(variant?.id || variant?.variantId || variant?.sku || variant?.offerId || `variant-${index + 1}`);

  const collectImages = (value, depth = 0, found = [], seen = new Set()) => {
    if (value == null || depth > 7) return found;
    if (typeof value === "string") {
      const url = clean(value);
      const imageLike = /^https?:\/\//i.test(url) && (/imgproxy|image|media|mockup|thumbnail/i.test(url) || /\.(?:avif|webp|png|jpe?g)(?:[?#]|$)/i.test(url));
      if (imageLike && !seen.has(url)) { seen.add(url); found.push(url); }
      return found;
    }
    if (Array.isArray(value)) {
      value.forEach((item) => collectImages(item, depth + 1, found, seen));
      return found;
    }
    if (typeof value === "object") {
      for (const [key, child] of Object.entries(value)) {
        if (depth < 2 || /image|media|thumb|preview|mockup|photo|url|src/i.test(key)) collectImages(child, depth + 1, found, seen);
      }
    }
    return found;
  };

  const map = new Map();
  let productImages = [];

  const apply = (id) => {
    const candidates = map.get(id) || [];
    const next = candidates[0] || productImages[0] || "";
    if (!next || image.currentSrc === next || image.src === next) return;
    image.src = next;
  };

  document.addEventListener("click", (event) => {
    const button = event.target.closest(".eus-variant-option[data-variant-id]");
    if (!button) return;
    apply(button.dataset.variantId || "");
  });

  select.addEventListener("change", () => apply(select.value));

  fetch(`/api/store-products?catalog=full&ts=${Date.now()}`, { cache: "no-store", headers: { Accept: "application/json" } })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error(`catalog ${response.status}`)))
    .then((data) => {
      const product = extractProducts(data).find((row) => [productId(row), slugFrom(row)].includes(wanted));
      if (!product) return;
      productImages = collectImages({ images: product?.images, media: product?.media, image: product?.image, featuredImage: product?.featuredImage, primaryImage: product?.primaryImage, thumbnailImage: product?.thumbnailImage });
      (Array.isArray(product?.variants) ? product.variants : []).forEach((variant, index) => {
        const images = collectImages(variant);
        if (images.length) map.set(variantId(variant, index), images);
      });
      apply(select.value);
    })
    .catch((error) => console.warn("Variant image map unavailable:", error));
})();