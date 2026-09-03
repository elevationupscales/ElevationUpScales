(() => {
  "use strict";
  const DIRECT_CHECKOUT_IDS = new Set([
    "168646573395",
    "168631043193",
    "168631039073",
    "168631036536",
    "168631025949",
    "168631017090",
    "168631006501",
    "168631001484",
  ]);
  const grid = document.querySelector("#rv-product-grid");
  if (!grid) return;
  const apply = () => {
    grid.querySelectorAll(".rv-product-card").forEach((card) => {
      const link = card.querySelector(".rv-product-actions a");
      if (!link || link.dataset.eusCheckoutRoute === "true") return;
      try {
        const external = new URL(link.href, location.origin);
        const match = external.hostname === "www.ebay.com" ? external.pathname.match(/^\/itm\/(\d{12})/i) : null;
        if (!match || !DIRECT_CHECKOUT_IDS.has(match[1])) return;
        const name = String(card.querySelector("h3")?.textContent || "").trim();
        link.href = `/checkout/?source=rv&id=${encodeURIComponent(match[1])}&name=${encodeURIComponent(name)}`;
        link.removeAttribute("target");
        link.removeAttribute("rel");
        link.dataset.eusCheckoutRoute = "true";
      } catch (_) {}
    });
  };
  new MutationObserver(apply).observe(grid, { childList: true, subtree: true });
  apply();
})();
