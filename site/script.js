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

const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

if (!document.querySelector('script[data-eus-trust-repair]')) {
  const trustRepair = document.createElement("script");
  trustRepair.src = "/trust-repair-runtime.js?v=1.0.0";
  trustRepair.defer = true;
  trustRepair.dataset.eusTrustRepair = "true";
  document.head.append(trustRepair);
}
