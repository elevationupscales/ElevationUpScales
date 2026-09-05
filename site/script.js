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

/* Visual redesign v1 loader.
   Presentation-only and branch-isolated. Remove this block to revert the redesign. */
(() => {
  if (location.pathname.startsWith("/admin")) return;
  const styles = [
    ["v1", "/redesign-v1.css?v=1.0.0"],
    ["v1-pages", "/redesign-v1-pages.css?v=1.0.0"]
  ];
  styles.forEach(([key, href]) => {
    if (document.querySelector(`link[data-eus-redesign="${key}"]`)) return;
    const theme = document.createElement("link");
    theme.rel = "stylesheet";
    theme.href = href;
    theme.dataset.eusRedesign = key;
    document.head.append(theme);
  });
  if (!document.querySelector('script[data-eus-redesign="v1"]')) {
    const behavior = document.createElement("script");
    behavior.src = "/redesign-v1.js?v=1.0.0";
    behavior.async = false;
    behavior.dataset.eusRedesign = "v1";
    document.head.append(behavior);
  }
})();
