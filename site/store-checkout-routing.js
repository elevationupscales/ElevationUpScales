(() => {
  "use strict";

  const grid = document.querySelector("#product-grid");
  if (!grid) return;

  const isProductionStorefront = /(^|\.)elevationupscales\.com$/i.test(location.hostname);

  async function checkoutRoutingAllowed() {
    if (!isProductionStorefront) return true;
    try {
      const response = await fetch("/api/store-checkout/config", {
        credentials: "same-origin",
        cache: "no-store",
        headers: { Accept: "application/json" },
      });
      const config = await response.json().catch(() => ({}));
      return Boolean(
        response.ok &&
        config?.environment === "live" &&
        config?.checkoutEnabled === true &&
        config?.liveCheckoutApproved === true
      );
    } catch (_) {
      return false;
    }
  }

  const formatMarkedPrice = (text, amount) => {
    const decimals = /\.\d{2}\b/.test(text) ? 2 : 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const apply = () => {
    grid.querySelectorAll(".market-product-card").forEach((card) => {
      const price = card.querySelector(".market-product-price");
      if (price && price.dataset.eusCheckoutMarkup !== "20") {
        const raw = Number.parseFloat(String(price.textContent || "").replace(/[^0-9.-]/g, ""));
        if (Number.isFinite(raw)) price.textContent = formatMarkedPrice(price.textContent || "", Math.round(raw * 120) / 100);
        price.dataset.eusCheckoutMarkup = "20";
      }

      const link = card.querySelector(".market-product-link");
      if (!link || link.dataset.eusCheckoutRoute === "true") return;
      try {
        const external = new URL(link.href, location.origin);
        if (!/elevationupscales-shop\.fourthwall\.com$/i.test(external.hostname)) return;
        const match = external.pathname.match(/^\/products\/([^/?#]+)/i);
        if (!match) return;
        link.href = `/checkout/?source=apparel&id=${encodeURIComponent(decodeURIComponent(match[1]))}`;
        link.removeAttribute("target");
        link.removeAttribute("rel");
        link.dataset.eusCheckoutRoute = "true";
      } catch (_) {}
    });
  };

  checkoutRoutingAllowed().then((allowed) => {
    if (!allowed) return;
    new MutationObserver(apply).observe(grid, { childList: true, subtree: true });
    apply();
  });
})();
