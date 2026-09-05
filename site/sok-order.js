/* Elevation UpScales clean consolidated SOK Purchase Options controller
 * Accepted application baseline: 176dbd96cac420b1e52e4fb19ab2483a6caeb46b
 * Drop-in replacement for /sok-order.js.
 */
(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const allowedIntents = new Set(["purchase_options", "product", "commercial", "hawaii"]);

  const el = {
    form: document.querySelector("#sok-order-form"),
    status: document.querySelector("#sok-order-status"),
    sku: document.querySelector("#sok-order-sku"),
    quantity: document.querySelector("#sok-order-qty"),
    state: document.querySelector("#sok-order-state"),
    postal: document.querySelector("#sok-order-zip"),
    mode: document.querySelector("#sok-order-mode"),
    title: document.querySelector("#sok-order-title"),
    product: document.querySelector("#sok-order-product"),
    intent: document.querySelector("#sok-order-intent"),
    island: document.querySelector("#sok-order-island"),
    name: document.querySelector("#sok-order-name"),
    email: document.querySelector("#sok-order-email"),
    phone: document.querySelector("#sok-order-phone"),
    notes: document.querySelector("#sok-order-notes"),
    emailDisplay: document.querySelector("#sok-order-email-link"),
  };

  if (!el.form) return;

  const sku = String(params.get("sku") || "").trim().toUpperCase();
  const mode = String(params.get("mode") || "").trim().toLowerCase();
  let intent = String(params.get("intent") || "purchase_options").trim().toLowerCase();
  let product = null;
  let started = false;

  if (!allowedIntents.has(intent)) intent = "purchase_options";

  el.sku.value = sku;
  el.intent.value = intent;
  if (params.get("qty")) el.quantity.value = params.get("qty");
  if (params.get("state")) el.state.value = String(params.get("state")).trim().toUpperCase();

  function quantity() {
    return Math.max(1, Number.parseInt(el.quantity.value || "1", 10) || 1);
  }

  function quantityBand() {
    const value = quantity();
    return value >= 4 ? "4plus" : String(value);
  }

  function track(type, details = {}) {
    window.EUSIntent?.track?.(type, sku, {
      source: "sok-order",
      sku,
      ...details,
    });
  }

  async function requestJson(url, options = {}) {
    const response = await fetch(url, {
      credentials: "same-origin",
      cache: "no-store",
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...(options.headers || {}),
      },
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
    return data;
  }

  function updateHawaii(announce = false) {
    const active =
      el.state.value.trim().toUpperCase() === "HI" ||
      intent === "hawaii";

    document.querySelectorAll("[data-hawaii-field]").forEach((node) => {
      node.hidden = !active;
    });
    el.island.required = active;

    if (active && intent === "hawaii") el.state.value = "HI";
    if (active && announce) {
      track("hawaii_options_open", { quantityBand: quantityBand() });
    }
  }

  function resolveIntent(requested) {
    let next = allowedIntents.has(requested) ? requested : "purchase_options";
    if (product?.publicPurchaseMode === "COMMERCIAL_ONLY") next = "commercial";
    if (next === "hawaii" && product && !product.batteryRelevant) next = "purchase_options";
    return next;
  }

  function setIntent(requested, announce = true) {
    const askedForHawaii = requested === "hawaii";
    const next = resolveIntent(requested);

    if (askedForHawaii && next !== "hawaii" && product && !product.batteryRelevant && announce) {
      el.status.textContent =
        "Hawaii battery review does not apply to this product; use Purchase Options or Commercial Pricing.";
    }

    intent = next;
    el.intent.value = next;

    if (next === "hawaii") {
      el.state.value = "HI";
      el.title.textContent = "Request Hawaii Purchase Options";
      if (announce) {
        el.status.textContent =
          "Hawaii selected. Add quantity, destination and one contact method.";
      }
    } else if (next === "commercial") {
      el.title.textContent = "Request Commercial Pricing";
      if (announce) {
        el.status.textContent =
          "Commercial pricing selected. Add quantity, destination and one contact method.";
      }
    } else if (next === "product") {
      el.title.textContent = "Ask About This Product";
      if (announce) {
        el.status.textContent = "Your exact SOK model stays attached to this request.";
      }
    } else {
      el.title.textContent = "Start Your Purchase Request";
    }

    updateHawaii(next === "hawaii" && announce);

    if (announce) {
      const eventType =
        next === "hawaii"
          ? "hawaii_options_open"
          : next === "commercial"
            ? "commercial_review_route"
            : "purchase_options_open";

      track(eventType, {
        intent: next,
        quantityBand: quantityBand(),
      });
    }
  }

  document.querySelectorAll("[data-sok-intent]").forEach((button) => {
    button.addEventListener("click", () => {
      setIntent(String(button.dataset.sokIntent || "purchase_options"));
      el.form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  el.state.addEventListener("change", () => updateHawaii(true));

  el.quantity.addEventListener("change", () => {
    if (quantity() >= 4) {
      track("commercial_review_route", {
        reason: "quantity_4plus",
        quantityBand: "4plus",
      });
    }
  });

  el.form.addEventListener(
    "input",
    () => {
      if (started) return;
      started = true;
      track("purchase_inquiry_start", { intent: el.intent.value });
    },
    { passive: true },
  );

  if (mode === "prepurchase") {
    el.mode.textContent =
      "PRE-PURCHASE — Elevation confirms the current supply window before payment when required.";
  } else if (mode === "backorder") {
    el.mode.textContent =
      "AVAILABLE ON BACKORDER — Elevation confirms replenishment and timing before payment when required.";
  }

  requestJson("/api/sok/catalog")
    .then((data) => {
      product =
        (data.products || []).find(
          (item) => String(item.sku || "").toUpperCase() === sku,
        ) || null;

      if (!product) {
        el.status.textContent =
          "Select a current SOK product from the catalog before submitting.";
        el.form.querySelector('button[type="submit"]').disabled = true;
        return;
      }

      el.product.textContent = `${product.sku} · ${product.title}`;
      if (el.emailDisplay) el.emailDisplay.textContent = "casey@elevationupscales.com";

      if (!product.batteryRelevant) {
        const hawaii = document.querySelector('[data-sok-intent="hawaii"]');
        if (hawaii) hawaii.hidden = true;
      }

      setIntent(intent, false);
    })
    .catch(() => {
      el.status.textContent =
        "Current SOK product information could not be loaded. Please return to the SOK catalog and try again.";
    });

  el.form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!product) return;

    const email = el.email.value.trim();
    const phone = el.phone.value.trim();

    if (!el.name.value.trim()) {
      el.status.textContent = "Enter your name.";
      el.name.focus();
      return;
    }
    if (!email && !phone) {
      el.status.textContent =
        "Enter an email address or phone number so we can contact you.";
      el.email.focus();
      return;
    }
    if (email && !el.email.validity.valid) {
      el.status.textContent =
        "Enter a valid email address or leave email blank and use a phone number.";
      el.email.focus();
      return;
    }
    if (el.state.value.trim().length !== 2) {
      el.status.textContent = "Enter a two-letter destination state.";
      el.state.focus();
      return;
    }

    updateHawaii(false);

    if (el.island.required && !el.island.value) {
      el.status.textContent = "Select the Hawaii island for this request.";
      el.island.focus();
      return;
    }

    const body = {
      intent: el.intent.value,
      sku: el.sku.value,
      quantity: quantity(),
      destinationState: el.state.value.trim().toUpperCase(),
      postalCode: el.postal.value.trim(),
      hawaiiIsland: el.island.value,
      name: el.name.value.trim(),
      email,
      phone,
      notes: el.notes.value.trim(),
      productUrl: `${location.origin}${product.detailUrl || location.pathname}`,
    };

    el.status.textContent = "Sending purchase request…";

    try {
      const data = await requestJson("/api/sok/reservations", {
        method: "POST",
        body: JSON.stringify(body),
      });

      el.status.textContent =
        `${data.status}. Reference ${data.reservationId}. ${data.nextStep}`;
      el.form.querySelector('button[type="submit"]').disabled = true;

      track("purchase_inquiry_submit", {
        intent: el.intent.value,
        quantityBand: quantityBand(),
      });

      if (body.quantity >= 4 || data.status === "COMMERCIAL INQUIRY RECEIVED") {
        track("commercial_review_route", {
          reason: "submitted_commercial",
          quantityBand: quantityBand(),
        });
      }
    } catch (error) {
      el.status.textContent = error.message;
    }
  });

  updateHawaii(false);
})();
