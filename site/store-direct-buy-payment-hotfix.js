(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const source = String(params.get("source") || "").trim().toLowerCase();
  const id = String(params.get("id") || "").trim().toLowerCase();

  // Owner-authorized P0 hotfix: exact direct-buy SOK SKU only.
  if (source !== "lithium" || id !== "sok-sk12v100pc") return;

  const SHOPIFY_VARIANT_ID = "64543156371825";
  const SHOPIFY_HOST = "https://ggwt0c-41.myshopify.com";
  const panel = document.querySelector("#checkout-shopify-direct");
  const link = document.querySelector("#checkout-shopify-direct-link");
  const quantity = document.querySelector("#checkout-quantity");
  const unitPrice = document.querySelector("#checkout-unit-price");
  const state = document.querySelector("#checkout-state");
  const availabilityPanel = document.querySelector("#checkout-availability-panel");
  const hawaiiPanel = document.querySelector("#checkout-hawaii-freight");
  const trustStrong = document.querySelector(".eus-checkout-trust strong");
  const trustSpan = document.querySelector(".eus-checkout-trust span");

  if (!panel || !link || !quantity || !unitPrice) return;

  const safeQuantity = () => {
    const parsed = Number.parseInt(quantity.value || "1", 10);
    return Math.min(10, Math.max(1, Number.isFinite(parsed) ? parsed : 1));
  };

  const sync = () => {
    const qty = safeQuantity();
    const nextHref = `${SHOPIFY_HOST}/cart/${SHOPIFY_VARIANT_ID}:${qty}?checkout`;
    if (link.href !== nextHref) link.href = nextHref;

    const quotedPrice = String(unitPrice.textContent || "").trim();
    const quoteReady = Boolean(quotedPrice && quotedPrice !== "—");
    const availabilityBlocked = Boolean(availabilityPanel && !availabilityPanel.hidden);
    const freightBlocked = Boolean(hawaiiPanel && !hawaiiPanel.hidden);
    const stateCode = String(state?.value || params.get("state") || "").trim().toUpperCase();
    const specialDestination = stateCode === "HI" || stateCode === "AK";
    const shouldShow = quoteReady && !availabilityBlocked && !freightBlocked && !specialDestination;

    if (panel.hidden === shouldShow) panel.hidden = !shouldShow;
    if (shouldShow) {
      if (trustStrong) trustStrong.textContent = "PayPal • Card • Shop Pay";
      if (trustSpan) trustSpan.textContent = "Secure payment options";
    }
  };

  quantity.addEventListener("input", sync);
  quantity.addEventListener("change", sync);
  state?.addEventListener("input", sync);
  state?.addEventListener("change", sync);

  const observer = new MutationObserver(sync);
  observer.observe(unitPrice, { childList: true, characterData: true, subtree: true });
  if (availabilityPanel) observer.observe(availabilityPanel, { attributes: true, attributeFilter: ["hidden"] });
  if (hawaiiPanel) observer.observe(hawaiiPanel, { attributes: true, attributeFilter: ["hidden"] });

  sync();
})();
