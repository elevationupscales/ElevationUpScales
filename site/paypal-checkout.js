(() => {
  "use strict";

  const form = document.getElementById("eus-pay-form");
  const amountInput = document.getElementById("eus-pay-amount");
  const referenceInput = document.getElementById("eus-pay-reference");
  const descriptionInput = document.getElementById("eus-pay-description");
  const total = document.getElementById("eus-pay-total");
  const status = document.getElementById("eus-pay-status");
  const buttonHost = document.getElementById("eus-paypal-buttons");
  const success = document.getElementById("eus-pay-success");
  const successOrder = document.getElementById("eus-pay-success-order");
  const successCapture = document.getElementById("eus-pay-success-capture");
  const successAmount = document.getElementById("eus-pay-success-amount");
  let buttons = null;
  let sdkLoading = null;

  function setStatus(message, kind = "") {
    status.textContent = message;
    status.classList.toggle("is-error", kind === "error");
    status.classList.toggle("is-ready", kind === "ready");
    status.hidden = false;
  }

  function parseAmount() {
    const text = String(amountInput.value || "").replace(/[$,\s]/g, "");
    if (!/^\d+(?:\.\d{1,2})?$/.test(text)) return null;
    const numeric = Number(text);
    if (!Number.isFinite(numeric) || numeric < 1 || numeric > 10000) return null;
    return numeric.toFixed(2);
  }

  function syncTotal() {
    const value = parseAmount();
    total.textContent = value ? `$${value} USD` : "$0.00 USD";
  }

  function loadPayPalSdk(clientId, currency) {
    if (window.paypal?.Buttons) return Promise.resolve();
    if (sdkLoading) return sdkLoading;
    sdkLoading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      const params = new URLSearchParams({
        "client-id": clientId,
        currency: currency || "USD",
        components: "buttons",
      });
      script.src = `https://www.paypal.com/sdk/js?${params}`;
      script.async = true;
      script.addEventListener("load", () => resolve(), { once: true });
      script.addEventListener("error", () => reject(new Error("PayPal checkout could not load.")), { once: true });
      document.head.append(script);
    });
    return sdkLoading;
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: "same-origin",
      cache: "no-store",
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body?.error || "Payment request failed.");
      error.status = response.status;
      error.code = body?.error || "";
      throw error;
    }
    return body;
  }

  function checkoutPayload() {
    const amount = parseAmount();
    if (!amount) throw new Error("Enter an amount from $1.00 to $10,000.00 before continuing.");
    return {
      amount,
      reference: referenceInput.value.trim(),
      description: descriptionInput.value.trim() || "Elevation UpScales payment",
    };
  }

  function showSuccess(data) {
    form.hidden = true;
    buttonHost.hidden = true;
    status.hidden = true;
    success.hidden = false;
    successOrder.textContent = data?.id || "—";
    successCapture.textContent = data?.captureId || "—";
    successAmount.textContent = data?.amount ? `$${data.amount} ${data.currency || "USD"}` : "Captured";
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function renderButtons() {
    if (!window.paypal?.Buttons || buttons) return;
    buttons = window.paypal.Buttons({
      style: { layout: "vertical", shape: "rect", label: "pay" },
      createOrder: async () => {
        const payload = checkoutPayload();
        setStatus("Opening secure PayPal checkout…", "ready");
        const created = await api("/api/paypal/orders", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!created?.id) throw new Error("PayPal did not return an order ID.");
        return created.id;
      },
      onApprove: async (data, actions) => {
        setStatus("Confirming your PayPal payment…", "ready");
        try {
          const captured = await api(`/api/paypal/orders/${encodeURIComponent(data.orderID)}/capture`, {
            method: "POST",
            body: "{}",
          });
          showSuccess(captured);
        } catch (error) {
          if (error?.code === "INSTRUMENT_DECLINED" && actions?.restart) {
            setStatus("That funding source was declined. Choose another PayPal payment method.", "error");
            return actions.restart();
          }
          throw error;
        }
      },
      onCancel: () => setStatus("Payment cancelled. No charge was completed.", "error"),
      onError: (error) => {
        console.error("PayPal checkout error", error);
        setStatus(error?.message || "PayPal checkout encountered an error. Please try again.", "error");
      },
    });
    buttonHost.hidden = false;
    buttons.render("#eus-paypal-buttons");
  }

  async function initialize() {
    syncTotal();
    try {
      const config = await api("/api/paypal/config");
      if (!config?.configured || !config?.clientId) {
        setStatus("PayPal checkout is being configured. No payment can be submitted from this page yet.", "error");
        return;
      }
      await loadPayPalSdk(config.clientId, config.currency || "USD");
      setStatus(config.environment === "live" ? "PayPal is ready for secure payment." : "PayPal sandbox is ready for testing. No live charge will be made.", "ready");
      renderButtons();
    } catch (error) {
      setStatus(error?.message || "PayPal checkout is temporarily unavailable.", "error");
    }
  }

  amountInput.addEventListener("input", syncTotal);
  form.addEventListener("submit", (event) => event.preventDefault());
  initialize();
})();
