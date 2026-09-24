(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const payForm = $("custom-pay-form");
  const payStatus = $("custom-pay-status");
  const paypalEl = $("custom-paypal");
  const paySuccess = $("custom-pay-success");
  const paySuccessRef = $("custom-pay-success-reference");
  const requestForm = $("battery-request-form");
  const requestStatus = $("battery-status");
  const requestSuccess = $("battery-success");
  const requestSuccessRef = $("battery-success-reference");
  const requestButton = $("battery-submit");
  let config = null;
  let paypalButtons = null;

  function setPayStatus(message, kind = "") {
    payStatus.textContent = message;
    payStatus.className = "custom-order-status" + (kind ? " is-" + kind : "");
  }
  function text(id) { return ($(id)?.value || "").trim(); }
  function checked(id) { return Boolean($(id)?.checked); }
  function validEmail(value) { return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value); }
  function payShipping() {
    return {
      fullName: text("custom-pay-name"),
      address1: text("custom-pay-address1"),
      address2: text("custom-pay-address2"),
      city: text("custom-pay-city"),
      state: text("custom-pay-state").toUpperCase(),
      postalCode: text("custom-pay-postal"),
      countryCode: "US",
    };
  }
  function payCustomer() {
    return { email: text("custom-pay-email"), phone: text("custom-pay-phone") };
  }
  function payPayload() {
    return {
      source: "custom",
      id: text("custom-pay-reference"),
      name: text("custom-pay-description"),
      amount: text("custom-pay-amount"),
      approvalAcknowledged: checked("custom-pay-ack"),
      quantity: 1,
      customer: payCustomer(),
      shipping: payShipping(),
    };
  }
  function paymentReady() {
    const address = payShipping();
    const customer = payCustomer();
    const amount = Number.parseFloat(text("custom-pay-amount"));
    return Boolean(
      text("custom-pay-reference").length >= 3 &&
      text("custom-pay-description").length >= 3 &&
      Number.isFinite(amount) && amount >= 1 &&
      address.fullName && address.address1 && address.city &&
      /^[A-Z]{2}$/.test(address.state) &&
      /^\d{5}(?:-\d{4})?$/.test(address.postalCode) &&
      validEmail(customer.email) &&
      checked("custom-pay-ack")
    );
  }

  async function loadPayPal() {
    const response = await fetch("/api/store-checkout/config", { headers: { Accept: "application/json" } });
    config = await response.json().catch(() => ({}));
    if (!response.ok || !config?.configured || !config?.clientId) {
      setPayStatus("Secure custom-order payment is temporarily unavailable. Start a battery shipment request below and Elevation will provide the next payment step.", "error");
      return false;
    }
    if (window.paypal?.Buttons) return true;
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://www.paypal.com/sdk/js?client-id=" + encodeURIComponent(config.clientId) + "&currency=USD&intent=capture&components=buttons";
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error("PayPal could not be loaded"));
      document.head.append(script);
    });
    return Boolean(window.paypal?.Buttons);
  }

  async function renderPayPal() {
    if (!window.paypal?.Buttons || paypalButtons) return;
    paypalEl.hidden = false;
    paypalButtons = window.paypal.Buttons({
      style: { layout: "vertical", shape: "rect", label: "paypal", height: 48 },
      onClick(_data, actions) {
        if (!paymentReady()) {
          setPayStatus("Complete the approved order reference, amount, contact, shipping address and confirmation before paying.", "error");
          payForm.reportValidity();
          return actions.reject();
        }
        return actions.resolve();
      },
      async createOrder() {
        setPayStatus("Creating secure custom order…");
        const response = await fetch("/api/store-checkout/orders", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payPayload()),
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok || !body?.id) throw new Error(body.error || "Unable to create the custom order");
        window.__EUS_CUSTOM_REFERENCE__ = body.reference || "";
        return body.id;
      },
      async onApprove(data, actions) {
        setPayStatus("Capturing payment…");
        const response = await fetch("/api/store-checkout/orders/" + encodeURIComponent(data.orderID) + "/capture", {
          method: "POST",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          if (body?.error === "INSTRUMENT_DECLINED" && actions?.restart) {
            setPayStatus("Choose another PayPal funding source.", "error");
            return actions.restart();
          }
          throw new Error(body.error || "Unable to capture payment");
        }
        payForm.hidden = true;
        paypalEl.hidden = true;
        payStatus.hidden = true;
        paySuccessRef.textContent = window.__EUS_CUSTOM_REFERENCE__
          ? "Elevation order " + window.__EUS_CUSTOM_REFERENCE__
          : "PayPal order " + (body.id || data.orderID);
        paySuccess.hidden = false;
      },
      onCancel() { setPayStatus("Payment was not completed.", "error"); },
      onError(error) { setPayStatus(error?.message || "Secure payment could not be completed.", "error"); },
    });
    await paypalButtons.render("#custom-paypal");
    setPayStatus("Secure PayPal payment is ready. Confirm the prepared order details before paying.", "ready");
  }

  function applyPrefill() {
    const query = new URLSearchParams(location.search);
    const mapping = {
      ref: "custom-pay-reference",
      amount: "custom-pay-amount",
      product: "custom-pay-description",
      name: "custom-pay-name",
      email: "custom-pay-email",
      phone: "custom-pay-phone",
      state: "battery-state",
      zip: "battery-zip",
    };
    for (const [key, id] of Object.entries(mapping)) {
      const value = query.get(key);
      if (value && $(id)) $(id).value = value;
    }
    if (query.get("product")) $("battery-product").value = query.get("product");
    if (query.get("qty")) $("battery-quantity").value = query.get("qty");
  }

  requestForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    requestStatus.className = "custom-order-status";
    if (!checked("battery-consent")) {
      requestStatus.textContent = "Confirm contact permission to continue.";
      requestStatus.classList.add("is-error");
      return;
    }
    const preferred = text("battery-contact");
    const email = text("battery-email");
    const phone = text("battery-phone");
    if (preferred === "Email" && !validEmail(email)) {
      requestStatus.textContent = "Enter a valid email address for email contact.";
      requestStatus.classList.add("is-error");
      return;
    }
    if ((preferred === "Text message" || preferred === "Phone call") && phone.replace(/\D/g, "").length < 7) {
      requestStatus.textContent = "Enter a usable phone number for phone or text contact.";
      requestStatus.classList.add("is-error");
      return;
    }
    const product = text("battery-product");
    const qty = Math.max(1, Number.parseInt(text("battery-quantity") || "1", 10) || 1);
    const state = text("battery-state").toUpperCase();
    const zip = text("battery-zip");
    if (!text("battery-name") || !product || !/^[A-Z]{2}$/.test(state) || !/^\d{5}(?:-\d{4})?$/.test(zip)) {
      requestForm.reportValidity();
      requestStatus.textContent = "Complete the product, destination and contact information.";
      requestStatus.classList.add("is-error");
      return;
    }
    const parts = [
      "Battery / product: " + product,
      "Quantity: " + qty,
      "Destination: " + state + " " + zip,
      text("battery-timing") ? "Timing / delivery: " + text("battery-timing") : "",
      text("battery-note") ? "Notes: " + text("battery-note") : "",
    ].filter(Boolean);
    requestButton.disabled = true;
    requestButton.textContent = "Saving Request…";
    requestStatus.textContent = "Starting the battery shipment request…";
    try {
      const response = await fetch("/api/project/follow-up-request", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          projectType: "solar",
          name: text("battery-name"),
          email,
          phone,
          preferredContact: preferred,
          consent: true,
          helpWith: "Battery Shipment / Custom Order",
          note: parts.join("\n"),
          sourcePage: "/custom-order",
          website: text("battery-website"),
          sessionId: window.EUSIntent?.sessionId?.() || "",
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || "We could not save the battery shipment request.");
      requestForm.hidden = true;
      requestSuccessRef.textContent = body.reference ? "Request " + body.reference : "Your request has been stored.";
      requestSuccess.hidden = false;
    } catch (error) {
      requestStatus.textContent = error.message;
      requestStatus.classList.add("is-error");
    } finally {
      requestButton.disabled = false;
      requestButton.textContent = "Start Battery Shipment Request";
    }
  });

  applyPrefill();
  loadPayPal()
    .then((ok) => ok ? renderPayPal() : null)
    .catch((error) => setPayStatus(error.message || "Secure payment could not be loaded.", "error"));
})();