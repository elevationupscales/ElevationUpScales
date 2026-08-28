(() => {
  "use strict";

  const TARGET_WIDTH = 1920;
  const GRID_SELECTOR = "#product-grid";
  const IMAGE_SELECTOR = `${GRID_SELECTOR} img, .market-product-image img, .hero-product-media img`;

  function highResolutionUrl(value) {
    const raw = String(value || "").trim();
    if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return raw;

    // Fourthwall imgproxy URLs are signed. Rewriting the transform path (for
    // example w:422 -> w:1920) invalidates that signature and makes the image
    // fail in the browser. Preserve signed imgproxy URLs exactly as supplied.
    try {
      const original = new URL(raw, location.href);
      const originalHost = original.hostname.toLowerCase();
      if (originalHost.includes("imgproxy")) return raw;
    } catch (_) {}

    let next = raw
      .replace(/\/w%3A\d+(?=\/)/gi, `/w%3A${TARGET_WIDTH}`)
      .replace(/\/w:\d+(?=\/)/gi, `/w:${TARGET_WIDTH}`)
      .replace(/\/width%3A\d+(?=\/)/gi, `/width%3A${TARGET_WIDTH}`)
      .replace(/\/width:\d+(?=\/)/gi, `/width:${TARGET_WIDTH}`);

    try {
      const url = new URL(next, location.href);
      const host = url.hostname.toLowerCase();
      const fourthwallImage = host.includes("fourthwall");
      if (!fourthwallImage) return next;

      for (const key of ["w", "width", "maxWidth", "max_width"]) {
        if (url.searchParams.has(key)) url.searchParams.set(key, String(TARGET_WIDTH));
      }
      next = url.toString();
    } catch (_) {}

    return next;
  }

  function upgradeImage(img) {
    if (!(img instanceof HTMLImageElement)) return;

    const source = img.getAttribute("src") || img.currentSrc || "";
    const upgraded = highResolutionUrl(source);
    if (!upgraded) return;

    // Browser-selected low-resolution srcsets can override a better source.
    if (img.hasAttribute("srcset")) img.removeAttribute("srcset");
    if (img.hasAttribute("sizes")) img.removeAttribute("sizes");

    if (upgraded !== source) img.setAttribute("src", upgraded);
    img.dataset.eusImageQuality = String(TARGET_WIDTH);
  }

  function upgrade(root = document) {
    if (root instanceof HTMLImageElement) upgradeImage(root);
    root.querySelectorAll?.(IMAGE_SELECTOR).forEach(upgradeImage);
  }

  function start() {
    upgrade();

    const grid = document.querySelector(GRID_SELECTOR);
    if (!grid) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.target instanceof HTMLImageElement) {
          upgradeImage(mutation.target);
          continue;
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) upgrade(node);
        });
      }
    });

    observer.observe(grid, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "srcset", "sizes"]
    });

    // Catch delayed swaps made after the authoritative catalog hydrates.
    window.setTimeout(() => upgrade(grid), 500);
    window.setTimeout(() => upgrade(grid), 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
