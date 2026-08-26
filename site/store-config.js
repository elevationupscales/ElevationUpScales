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

  // Warm the Fourthwall connection before the authoritative catalog request.
  const storefrontOrigin = new URL(window.EUS_STORE.storefront).origin;
  if (!document.querySelector('link[data-eus-fourthwall-preconnect]')) {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = storefrontOrigin;
    preconnect.crossOrigin = "anonymous";
    preconnect.dataset.eusFourthwallPreconnect = "true";
    document.head.appendChild(preconnect);
  }

  if (!document.querySelector('script[data-eus-store-image-quality="true"]')) {
    const quality = document.createElement("script");
    quality.src = "/store-image-quality.js?v=3.11.41";
    quality.async = false;
    quality.dataset.eusStoreImageQuality = "true";
    document.head.appendChild(quality);
  }

  const loadFullCatalog = () => {
    if (document.querySelector('script[data-eus-full-catalog="true"]')) return;
    const script = document.createElement("script");
    script.src = "/store-catalog-resilience.js?v=3.11.38&quality=original-r4";
    script.async = false;
    script.dataset.eusFullCatalog = "true";
    document.head.appendChild(script);
  };

  // Let the lightweight fallback/legacy renderer establish the page first, then
  // run one authoritative full-catalog pass. This avoids three duplicate catalog
  // downloads while still ensuring the complete Fourthwall catalog owns the UI.
  if (document.readyState === "complete") {
    window.setTimeout(loadFullCatalog, 250);
  } else {
    window.addEventListener("load", () => window.setTimeout(loadFullCatalog, 250), { once: true });
  }
})();
