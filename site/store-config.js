window.EUS_STORE = Object.freeze({
  provider: "Fourthwall",
  storefront: "https://elevationupscales-shop.fourthwall.com/",
  products: {
    trueGritHat: "https://elevationupscales-shop.fourthwall.com/products/elevation-upscales-true-grit-trucker-hat",
    goldenSnapback: "https://elevationupscales-shop.fourthwall.com/products/golden-bear-and-bull-snapback",
    signatureTshirt: "https://elevationupscales-shop.fourthwall.com/products/black-and-gold-signature-t-shirt",
    goldenHoodie: "https://elevationupscales-shop.fourthwall.com/products/elevation-golden-bear-and-bull-hoodie",
    premiumHat: "https://elevationupscales-shop.fourthwall.com/products/signature-trucker-hat",
    signatureHat: "https://elevationupscales-shop.fourthwall.com/products/elevationupscales-trucker-hat",
    combinedBrandWallArt: "https://elevationupscales-shop.fourthwall.com/products/elevation-upscales-4k-wall-art",
    polarBearWallArt: "https://elevationupscales-shop.fourthwall.com/products/polar-bear-elevation-upscales-4k-wall-art",
    goldenBullWallArt: "https://elevationupscales-shop.fourthwall.com/products/golden-bull-elevation-upscales-4k-wall-art",
    emergencyWallArt: "https://elevationupscales-shop.fourthwall.com/products/emergency-response-4k-wall-art",
    stickers: "https://elevationupscales-shop.fourthwall.com/products/elevationupscales-kiss-cut-stickers",
    signatureDigital: "https://elevationupscales-shop.fourthwall.com/products/collectors-series-01-printable"
  }
});

(() => {
  "use strict";

  if (!document.body?.classList.contains("store-page") || !document.querySelector("#product-grid")) return;

  const loadFullCatalog = (phase) => {
    if (document.querySelector(`script[data-eus-catalog-phase="${phase}"]`)) return;
    const script = document.createElement("script");
    script.src = `/store-catalog-resilience.js?v=3.11.38&quality=original-r3&phase=${encodeURIComponent(phase)}`;
    script.async = false;
    script.dataset.eusFullCatalog = "true";
    script.dataset.eusCatalogPhase = phase;
    document.head.appendChild(script);
  };

  // Load immediately, then run two post-load reconciliation passes. The legacy
  // renderer can finish its own fetch later; these passes make the full catalog
  // the final owner of the product grid and controls.
  loadFullCatalog("initial");
  window.addEventListener("load", () => {
    window.setTimeout(() => loadFullCatalog("settled"), 400);
    window.setTimeout(() => loadFullCatalog("final"), 2800);
  }, { once: true });
})();
