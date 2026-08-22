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
