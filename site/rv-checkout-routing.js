(() => {
  "use strict";

  const grid = document.querySelector("#rv-product-grid");
  if (!grid) return;

  const apply = () => {
    grid.querySelectorAll(".rv-product-card").forEach((card) => {
      const link = card.querySelector(".rv-product-actions a");
      if (!link || link.dataset.eusCheckoutRoute === "true") return;
      try {
        const external = new URL(link.href, location.origin);
        const match = external.hostname === "www.ebay.com" ? external.pathname.match(/^\/itm\/(\d{12})/i) : null;
        if (!match) return;
        const name = String(card.querySelector("h3")?.textContent || "").trim();
        const original = external.href;
        link.href = `/checkout/?source=rv&id=${encodeURIComponent(match[1])}&ebay=${encodeURIComponent(original)}&name=${encodeURIComponent(name)}`;
        link.removeAttribute("target");
        link.removeAttribute("rel");
        link.dataset.eusCheckoutRoute = "true";
      } catch (_) {}
    });
  };

  new MutationObserver(apply).observe(grid, { childList: true, subtree: true });
  apply();
})();
