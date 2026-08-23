"use strict";

document.querySelectorAll("[data-call-location]").forEach((link) => {
  link.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("elevation-call-click", {
      detail: { location: link.dataset.callLocation }
    }));
  });
});

document.querySelectorAll("[data-text-location]").forEach((link) => {
  link.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent("elevation-text-click", {
      detail: { location: link.dataset.textLocation }
    }));
  });
});

if (location.pathname === "/rv-store" || location.pathname === "/rv-store.html") {
  const rvHeroShop = document.querySelector(".rv-store-actions .button-primary");
  if (rvHeroShop) {
    rvHeroShop.href = "https://www.ebay.com/usr/elevationupscalesshop";
    rvHeroShop.target = "_blank";
    rvHeroShop.rel = "noopener";
    rvHeroShop.textContent = "Shop Our eBay Store";
    rvHeroShop.setAttribute("aria-label", "Shop the Elevation UpScales eBay store");
    rvHeroShop.dataset.storeDestination = "ebay";
  }
}

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
