(() => {
  "use strict";

  const TARGET_WIDTH = 1920;
  const GRID_SELECTOR = "#product-grid";

  function highResolutionUrl(value) {
    const raw = String(value || "").trim();
    if (!raw || raw.startsWith("data:") || raw.startsWith("blob:")) return raw;

    let next = raw
      .replace(/\/w%3A\d+(?=\/)/gi, `/w%3A${TARGET_WIDTH}`)
      .replace(/\/w:\d+(?=\/)/gi, `/w:${TARGET_WIDTH}`);

    try {
      const url = new URL(next, location.href);
      const host = url.hostname.toLowerCase();
      const isFourthwall = host.includes("fourthwall") || host.includes("imgproxy");
      if (!isFourthwall) return next;

      for (const key of ["w", "width", "maxWidth", "max_width"]) {
        if (url.searchParams.has(key)) url.searchParams.set(key, String(TARGET_WIDTH));
      }
      next = url.toString();
    } catch (_) {}

    return next;
  }

  function upgradeImage(img) {
    if (!(img instanceof HTMLImageElement)) return;
    const current = img.currentSrc || img.getAttribute("src") || "";
    const upgraded = highResolutionUrl(current);
    if (!upgraded || upgraded === current) return;

    // A low-resolution srcset can override a higher-quality src in the browser.
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    img.src = upgraded;
    img.dataset.eusImageQuality = String(TARGET_WIDTH);
  }

  function upgrade(root = document) {
    if (root instanceof HTMLImageElement) upgradeImage(root);
    root.querySelectorAll?.(`${GRID_SELECTOR} img, .market-product-image img, .hero-product-media img`).forEach(upgradeImage);
  }

  function start() {
    upgrade();
    const grid = document.querySelector(GRID_SELECTOR);
    if (!grid) return;

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) upgrade(node);
        });
      }
    });
    observer.observe(grid, { childList: true, subtree: true });

    // Catch async image swaps performed after catalog hydration.
    window.setTimeout(() => upgrade(grid), 500);
    window.setTimeout(() => upgrade(grid), 2000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
