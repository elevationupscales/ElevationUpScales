(() => {
  "use strict";

  const success = document.querySelector("#checkout-success");
  if (!success) return;

  let requested = false;

  function validReference(value) {
    return /^EUS-STORE-\d{8}-[A-F0-9]{8}$/.test(String(value || "").trim().toUpperCase());
  }

  function requestConfirmation() {
    if (requested || success.hidden) return;
    const reference = String(window.__EUS_STORE_REFERENCE__ || "").trim().toUpperCase();
    if (!validReference(reference)) return;
    const storageKey = `eus-order-confirmation:${reference}`;
    try {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "requested");
    } catch (_) {}
    requested = true;
    fetch("/api/email-workflows/order-confirmation", {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ reference }),
    }).catch(() => {});
  }

  new MutationObserver(requestConfirmation).observe(success, { attributes: true, attributeFilter: ["hidden"] });
  requestConfirmation();
})();
