(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const source = String(params.get("source") || "").trim().toLowerCase();
  const id = String(params.get("id") || "").trim();
  const rvName = String(params.get("name") || "").trim();
  const destinationHint = String(params.get("state") || "").trim().toUpperCase();

  const productEl = document.querySelector("#checkout-product");
  const productImageEl = document.querySelector("#checkout-product-image");
  const unitPriceEl = document.querySelector("#checkout-unit-price");
  const selectedOptionEl = document.querySelector("#checkout-selected-option");
  const quantityEl = document.querySelector("#checkout-quantity");
  const variantRow = document.querySelector("#checkout-variant-row");
  const variantEl = document.querySelector("#checkout-variant");
  const variantOptionsEl = document.querySelector("#checkout-variant-options");
  const listMerchandiseEl = document.querySelector("#checkout-list-merchandise");
  const merchandiseEl = document.querySelector("#checkout-merchandise");
  const discountRow = document.querySelector("#checkout-discount-row");
  const discountEl = document.querySelector("#checkout-discount");
  const couponCodeEl = document.querySelector("#checkout-coupon");
  const couponStatusEl = document.querySelector("#checkout-coupon-status");
  const shippingEl = document.querySelector("#checkout-shipping");
  const totalEl = document.querySelector("#checkout-total");
  const statusEl = document.querySelector("#checkout-status");
  const paypalEl = document.querySelector("#checkout-paypal");
  const form = document.querySelector("#checkout-form");
  const successEl = document.querySelector("#checkout-success");
  const successReferenceEl = document.querySelector("#checkout-success-reference");
  const retailerEl = document.querySelector("#checkout-lithium-retailer");
  const shippingLabelEl = document.querySelector("#checkout-shipping-label");
  const hawaiiPanel = document.querySelector("#checkout-hawaii-freight");
  const hawaiiMath = document.querySelector("#checkout-hawaii-math");
  const hawaiiReserve = document.querySelector("#checkout-hawaii-reserve");
  const contactShippingLabel = document.querySelector("#checkout-contact-shipping-label");
  const shippingFields = document.querySelector("#checkout-shipping-fields");

  let quote = null;
  let paypalButtons = null;
  let config = null;
  let quoteTimer = 0;

  const money = (cents) => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((Number(cents) || 0) / 100);

  const setStatus = (message, kind = "") => {
    statusEl.textContent = message;
    statusEl.classList.toggle("is-error", kind === "error");
    statusEl.classList.toggle("is-ready", kind === "ready");
    statusEl.classList.toggle("is-loading", !kind);
  };

  const setProductImage = (value, alt) => {
    if (!productImageEl) return;
    const next = String(value || "").trim();
    productImageEl.alt = alt ? `${alt} preview` : "Selected item preview";
    productImageEl.onerror = () => {
      productImageEl.onerror = null;
      productImageEl.src = "/assets/logo.webp";
    };
    productImageEl.src = next || "/assets/logo.webp";
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
    name: rvName,
    quantity: Number.parseInt(quantityEl.value || "1", 10) || 1,
    variantId: variantEl?.value || "",
    couponCode: couponCodeEl?.value.trim() || "",
    ...(["rv","lithium"].includes(source) ? { shipping: shipping() } : {}),
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
    const fallback = String(body.ebayUrl || "").trim();
    return /^https:\/\/www\.ebay\.com\/itm\/\d{12}$/i.test(fallback) ? fallback : "";
  };

  function selectedVariant(variants = []) {
    return variants.find((variant) => variant.id === variantEl?.value) || null;
  }

  function renderVariantOptions(variants) {
    if (!variantOptionsEl || !variantEl) return;
    if (!variants.length) {
      variantRow.hidden = true;
      variantEl.replaceChildren();
      variantOptionsEl.replaceChildren();
      selectedOptionEl.textContent = "Standard item";
      return;
    }

    const preferred = variantEl.value || quote?.variantId || variants[0].id;
    variantEl.replaceChildren(...variants.map((variant) => {
      const option = document.createElement("option");
      option.value = variant.id;
      option.textContent = variant.label;
      option.selected = variant.id === preferred;
      return option;
    }));

    const active = selectedVariant(variants) || variants[0];
    if (!variantEl.value && active) variantEl.value = active.id;

    variantOptionsEl.replaceChildren(...variants.map((variant) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "eus-variant-option";
      button.dataset.variantId = variant.id;
      button.setAttribute("aria-pressed", variant.id === variantEl.value ? "true" : "false");

      const label = document.createElement("strong");
      label.textContent = variant.label;
      const price = document.createElement("span");
      price.textContent = money(variant.priceCents);
      button.append(label, price);

      button.addEventListener("click", () => {
        if (variantEl.value === variant.id) return;
        variantEl.value = variant.id;
        variantOptionsEl.querySelectorAll(".eus-variant-option").forEach((item) => {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
        selectedOptionEl.textContent = variant.label;
        if (variant.image) setProductImage(variant.image, productEl.textContent);
        refreshQuote();
      });
      return button;
    }));

    variantRow.hidden = false;
    selectedOptionEl.textContent = active?.label || "Select an option";
  }

  function renderQuote(next) {
    quote = next;
    const productName = next.productName || rvName || "Store item";
    productEl.textContent = productName;
    unitPriceEl.textContent = money(next.unitPriceCents);
    if (listMerchandiseEl) listMerchandiseEl.textContent = money(next.listMerchandiseCents ?? next.merchandiseCents);
    merchandiseEl.textContent = money(next.merchandiseCents);
    if (discountRow && discountEl) { discountRow.hidden = !(Number(next.discountCents) > 0); discountEl.textContent = Number(next.discountCents) > 0 ? `-${money(next.discountCents)}` : money(0); }
    if (couponStatusEl) couponStatusEl.textContent = next.couponCode ? `${next.couponCode} applied — shipping is not discounted.` : (next.promotion?.active ? `Labor Day coupon available for eligible merchandise.` : "");
    const isHawaii = Boolean(next.hawaii);
    shippingEl.textContent = money(next.shippingCents);
    if (shippingLabelEl) shippingLabelEl.textContent = isHawaii ? "Hawaii Consolidated Freight" : "Shipping";
    totalEl.textContent = money(next.totalCents);
    if (retailerEl) retailerEl.hidden = source !== "lithium";
    if (hawaiiPanel) hawaiiPanel.hidden = !isHawaii;
    if (contactShippingLabel) contactShippingLabel.hidden = isHawaii;
    if (shippingFields) shippingFields.hidden = isHawaii;
    if (isHawaii) {
      const batteryCount = Number(next.battery?.batteryUnitsPerItem || 1) * Number(next.quantity || 1);
      if (hawaiiMath) hawaiiMath.textContent = `${batteryCount} actual batter${batteryCount === 1 ? "y" : "ies"} × $99 = ${money(next.shippingCents)} Hawaii freight. Merchandise ${money(next.merchandiseCents)} + freight ${money(next.shippingCents)} = ${money(next.totalCents)} total before any applicable tax.`;
      if (hawaiiReserve) hawaiiReserve.href = next.hawaii?.requestUrl || "/hawaii-lithium-batteries#hawaii-request";
      paypalEl.hidden = true;
    }
    setProductImage(next.productImage, productName);

    const variants = Array.isArray(next.variants) ? next.variants : [];
    renderVariantOptions(variants);
    if (next.variantName) selectedOptionEl.textContent = next.variantName;
  }

  async function requestQuote() {
    setStatus("Updating order…");
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
    if (body.hawaii) setStatus("Hawaii consolidated-freight terms loaded. Reserve the order for freight coordination before payment.", "ready");
    else setStatus(config?.configured ? "Secure PayPal checkout ready." : "Order details loaded.", config?.configured ? "ready" : "");
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
      style: { layout: "vertical", shape: "rect", label: "paypal", height: 48 },

      onClick(_data, actions) {
        if (!formReady()) {
          setStatus("Complete the shipping and contact information before paying.", "error");
          document.querySelector("#checkout-name")?.focus();
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

  const refreshQuote = () => {
    clearTimeout(quoteTimer);
    quoteTimer = setTimeout(() => {
      requestQuote().catch((error) => setStatus(error.message || "Checkout is unavailable", "error"));
    }, 180);
  };

  quantityEl.addEventListener("change", refreshQuote);
  document.querySelector("#checkout-apply-coupon")?.addEventListener("click", refreshQuote);
  couponCodeEl?.addEventListener("keydown", (event) => { if (event.key === "Enter") { event.preventDefault(); refreshQuote(); } });
  if (["rv","lithium"].includes(source)) {
    for (const selector of ["#checkout-address1", "#checkout-city", "#checkout-state", "#checkout-postal"]) {
      document.querySelector(selector)?.addEventListener("change", refreshQuote);
    }
  }

  async function init() {
    if (!["apparel", "rv", "lithium"].includes(source) || !id) {
      setStatus("Checkout item is unavailable.", "error");
      return;
    }

    try {
      if (source === "lithium" && destinationHint === "HI") document.querySelector("#checkout-state").value = "HI";
      await requestQuote();
      if (!quote) return;
      if (quote.hawaii) return;
      if (await loadPayPal()) {
        setStatus("Secure PayPal checkout ready.", "ready");
        await renderPayPal();
      }
    } catch (error) {
      setStatus(error.message || "Checkout is unavailable", "error");
    }
  }

  init();
})();