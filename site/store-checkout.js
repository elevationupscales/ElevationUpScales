(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const source = String(params.get("source") || "").trim().toLowerCase();
  const id = String(params.get("id") || "").trim();
  const ebayUrl = String(params.get("ebay") || "").trim();
  const rvName = String(params.get("name") || "").trim();

  const productEl = document.querySelector("#checkout-product");
  const unitPriceEl = document.querySelector("#checkout-unit-price");
  const quantityEl = document.querySelector("#checkout-quantity");
  const variantRow = document.querySelector("#checkout-variant-row");
  const variantEl = document.querySelector("#checkout-variant");
  const merchandiseEl = document.querySelector("#checkout-merchandise");
  const shippingEl = document.querySelector("#checkout-shipping");
  const totalEl = document.querySelector("#checkout-total");
  const statusEl = document.querySelector("#checkout-status");
  const paypalEl = document.querySelector("#checkout-paypal");
  const form = document.querySelector("#checkout-form");
  const successEl = document.querySelector("#checkout-success");
  const successReferenceEl = document.querySelector("#checkout-success-reference");

  let quote = null;
  let paypalButtons = null;
  let config = null;

  const money = (cents) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((Number(cents) || 0) / 100);

  const setStatus = (message, kind = "") => {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", kind === "error");
    statusEl.classList.toggle("is-ready", kind === "ready");
  };

  const customer = () => ({
    email: document.querySelector("#checkout-email").value.trim(),
    phone: document.querySelector("#checkout-phone").value.trim(),
  });

  const shipping = () => ({
    fullName: document.querySelector("#checkout-name").value.trim(),
    address1: document.querySelector("#checkout-address1").value.trim(),
    address2: document.querySelector("#checkout-address2").value.trim(),
    city: document.querySelector("#checkout-city").value.trim(),
    state: document.querySelector("#checkout-state").value.trim().toUpperCase(),
    postalCode: document.querySelector("#checkout-postal").value.trim(),
    countryCode: "US",
  });

  const payload = () => ({
    source,
    id,
    ebayUrl,
    name: rvName,
    quantity: Number.parseInt(quantityEl.value || "1", 10) || 1,
    variantId: variantEl?.value || "",
    ...(source === "rv" ? { shipping: shipping() } : {}),
  });

  const formReady = () => {
    const address = shipping();
    const buyer = customer();
    return Boolean(
      address.fullName &&
      address.address1 &&
      address.city &&
      /^[A-Z]{2}$/.test(address.state) &&
      /^\d{5}(?:-\d{4})?$/.test(address.postalCode) &&
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(buyer.email)
    );
  };

  const fallbackUrl = (body = {}) => {
    const fallback = String(body.ebayUrl || ebayUrl || "").trim();
    return /^https:\/\/www\.ebay\.com\/itm\/\d{12}$/i.test(fallback) ? fallback : "";
  };

  function renderQuote(next) {
    quote = next;
    productEl.textContent = next.productName || rvName || "Store item";
    unitPriceEl.textContent = money(next.unitPriceCents);
    merchandiseEl.textContent = money(next.merchandiseCents);
    shippingEl.textContent = money(next.shippingCents);
    totalEl.textContent = money(next.totalCents);

    const variants = Array.isArray(next.variants) ? next.variants : [];
    if (variants.length) {
      const selected = variantEl.value || next.variantId || variants[0].id;
      variantEl.replaceChildren(...variants.map((variant) => {
        const option = document.createElement("option");
        option.value = variant.id;
        option.textContent = `${variant.label} — ${money(variant.priceCents)}`;
        option.selected = variant.id === selected;
        return option;
      }));
      variantRow.hidden = false;
    } else {
      variantRow.hidden = true;
      variantEl.replaceChildren();
    }
  }

  async function requestQuote() {
    setStatus("Loading checkout…");
    const response = await fetch("/api/store-checkout/quote", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload()),
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      if (source === "rv" && body?.fallback === "ebay") {
        const fallback = fallbackUrl(body);
        if (fallback) {
          location.assign(fallback);
          return null;
        }
      }
      throw new Error(body.error || "Checkout is unavailable");
    }

    renderQuote(body);
    if (Array.isArray(body.variants) && body.variants.length && !body.variantId && variantEl.value) {
      return requestQuote();
    }
    setStatus(config?.configured ? "PayPal is ready." : "PayPal checkout is not configured.", config?.configured ? "ready" : "error");
    return body;
  }

  async function loadPayPal() {
    const response = await fetch("/api/store-checkout/config", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    config = await response.json().catch(() => ({}));
    if (!response.ok || !config?.configured || !config?.clientId) {
      setStatus("PayPal checkout is not configured.", "error");
      return false;
    }

    await new Promise((resolve, reject) => {
      if (window.paypal?.Buttons) return resolve();
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(config.clientId)}&currency=USD&components=buttons`;
      script.async = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error("PayPal could not be loaded"));
      document.head.append(script);
    });
    return Boolean(window.paypal?.Buttons);
  }

  async function renderPayPal() {
    if (!window.paypal?.Buttons || paypalButtons) return;

    paypalButtons = window.paypal.Buttons({
      style: { layout: "vertical", shape: "rect", label: "paypal" },

      onClick(_data, actions) {
        if (!formReady()) {
          setStatus("Complete the shipping and contact information before paying.", "error");
          return actions.reject();
        }
        return actions.resolve();
      },

      async createOrder() {
        setStatus("Creating PayPal order…");
        const response = await fetch("/api/store-checkout/orders", {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            ...payload(),
            customer: customer(),
            shipping: shipping(),
          }),
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok || !body?.id) {
          if (source === "rv" && body?.fallback === "ebay") {
            const fallback = fallbackUrl(body);
            if (fallback) location.assign(fallback);
          }
          throw new Error(body.error || "Unable to create PayPal order");
        }
        window.__EUS_STORE_REFERENCE__ = body.reference || "";
        return body.id;
      },

      async onApprove(data, actions) {
        setStatus("Capturing payment…");
        const response = await fetch(`/api/store-checkout/orders/${encodeURIComponent(data.orderID)}/capture`, {
          method: "POST",
          credentials: "same-origin",
          headers: { Accept: "application/json" },
        });
        const body = await response.json().catch(() => ({}));

        if (!response.ok) {
          if (body?.error === "INSTRUMENT_DECLINED" && actions?.restart) {
            setStatus("Choose another PayPal funding source.", "error");
            return actions.restart();
          }
          throw new Error(body.error || "Unable to capture PayPal payment");
        }

        form.hidden = true;
        paypalEl.hidden = true;
        statusEl.hidden = true;
        successReferenceEl.textContent = window.__EUS_STORE_REFERENCE__
          ? `Order ${window.__EUS_STORE_REFERENCE__}`
          : `PayPal order ${body.id || data.orderID}`;
        successEl.hidden = false;
      },

      onCancel() {
        setStatus("Payment was not completed.", "error");
      },

      onError(error) {
        console.error("Store PayPal checkout error:", error);
        setStatus(error?.message || "PayPal checkout is temporarily unavailable.", "error");
      },
    });

    paypalEl.hidden = false;
    await paypalButtons.render("#checkout-paypal");
  }

  let quoteTimer = 0;
  const refreshQuote = () => {
    clearTimeout(quoteTimer);
    quoteTimer = setTimeout(() => {
      requestQuote().catch((error) => setStatus(error.message || "Checkout is unavailable", "error"));
    }, 180);
  };

  quantityEl.addEventListener("change", refreshQuote);
  variantEl.addEventListener("change", refreshQuote);
  if (source === "rv") {
    for (const selector of ["#checkout-address1", "#checkout-city", "#checkout-state", "#checkout-postal"]) {
      document.querySelector(selector)?.addEventListener("change", refreshQuote);
    }
  }

  async function init() {
    if (!["apparel", "rv"].includes(source) || !id) {
      setStatus("Checkout item is unavailable.", "error");
      return;
    }

    try {
      await requestQuote();
      if (!quote) return;
      if (await loadPayPal()) {
        setStatus("PayPal is ready.", "ready");
        await renderPayPal();
      }
    } catch (error) {
      setStatus(error.message || "Checkout is unavailable", "error");
    }
  }

  init();
})();