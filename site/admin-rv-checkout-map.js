(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const auth = $("rv-map-auth");
  const dashboard = $("rv-map-dashboard");
  const productSelect = $("rv-map-product");
  const status = $("rv-map-status");
  const output = $("rv-map-output");
  const copyButton = $("rv-map-copy");
  const catalogStatus = $("rv-map-catalog-status");
  const queueList = $("rv-map-queue-list");

  const FIRST_QUEUE = [
    "186833010961", // fuse set
    "186833034172", // paper towel holder
    "186833049170", // moisture absorbers
    "186833063926", // adhesive hooks
    "186833285491", // screen door guard
  ];

  // Exact Doba product matches from the operator's Doba account snapshot.
  // These identify the supplier item only; checkout activation still requires
  // destination-specific shipping verification through Doba cart/rate/support.
  const PUBLIC_DOBA_MATCHES = Object.freeze({
    "186833010961": {
      itemNo: "D010275E6ZT",
      url: "https://dropshipping.doba.com/v/detail/D010275E6ZT",
    },
    "186833034172": {
      itemNo: "D0102774602",
      url: "https://dropshipping.doba.com/v/detail/D0102774602",
    },
    "186833049170": {
      itemNo: "D010277UX8J",
      url: "https://dropshipping.doba.com/v/detail/D010277UX8J",
    },
    "186833063926": {
      itemNo: "D010275RYD2",
      url: "https://dropshipping.doba.com/v/detail/D010275RYD2",
    },
    "186833285491": {
      itemNo: "D01027RQMT2",
      url: "https://dropshipping.doba.com/v/detail/D01027RQMT2",
    },
  });

  // Account snapshot supplied 2026-08-28. Values below are current listing data
  // from Doba, not a universal shipping promise. "Free" is prefilled as $0 while
  // the direct-checkout confirmation remains intentionally unchecked until the
  // destination policy is verified.
  const ACCOUNT_DOBA_SNAPSHOTS = Object.freeze({
    "186833010961": {
      observedAt: "2026-08-22 18:38:50 UTC-07:00",
      storeSku: "D010275E6ZT-934006",
      storePriceCents: 1799,
      inventory: 1,
      itemNo: "D010275E6ZT",
      supplierPriceCents: 786,
      shippingCents: 0,
      shippingLabel: "Free",
      marginPercent: 56.3,
    },
    "186833034172": {
      observedAt: "2026-08-22 19:11:28 UTC-07:00",
      storeSku: "D0102774602-304255",
      storePriceCents: 2566,
      inventory: 1,
      itemNo: "D0102774602",
      supplierPriceCents: 1272,
      shippingCents: 0,
      shippingLabel: "Free",
      marginPercent: 50.4,
    },
    "186833049170": {
      observedAt: "2026-08-22 19:27:45 UTC-07:00",
      storeSku: "D010277UX8J-980664",
      storePriceCents: 1988,
      inventory: 1,
      itemNo: "D010277UX8J",
      supplierPriceCents: 1032,
      shippingCents: 0,
      shippingLabel: "Free",
      marginPercent: 48.1,
    },
    "186833063926": {
      observedAt: "2026-08-22 19:44:28 UTC-07:00",
      storeSku: "D010275RYD2-323785",
      storePriceCents: 2332,
      inventory: 1,
      itemNo: "D010275RYD2",
      supplierPriceCents: 872,
      shippingCents: 0,
      shippingLabel: "Free",
      marginPercent: 62.6,
    },
    "186833285491": {
      observedAt: "2026-08-22 22:25:37 UTC-07:00",
      storeSku: "D01027RQMT2-738035",
      storePriceCents: 3766,
      inventory: 1,
      itemNo: "D01027RQMT2",
      supplierPriceCents: 2872,
      shippingCents: 0,
      shippingLabel: "Free",
      marginPercent: 23.7,
    },
  });

  const catalog = () => Array.isArray(window.EUS_VERIFIED_EBAY_CATALOG) ? window.EUS_VERIFIED_EBAY_CATALOG : [];
  const money = (cents) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format((Number(cents) || 0) / 100);
  const dollarsToCents = (value) => {
    const parsed = Number.parseFloat(String(value ?? "").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) && parsed >= 0 ? Math.round(parsed * 100) : null;
  };
  const centsToInput = (cents) => (Number(cents || 0) / 100).toFixed(2);
  const clean = (value) => String(value ?? "").trim();

  async function api(url, options = {}) {
    const response = await fetch(url, { credentials: "same-origin", cache: "no-store", ...options, headers: { Accept: "application/json", ...(options.headers || {}) } });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(body.error || `Request failed (${response.status})`);
      error.status = response.status;
      throw error;
    }
    return body;
  }

  function selectedProduct() {
    return catalog().find((item) => item.itemNumber === productSelect.value) || null;
  }

  function parseStates(value, label) {
    const states = [...new Set(clean(value).split(/[\s,]+/).map((state) => state.toUpperCase()).filter(Boolean))];
    const invalid = states.filter((state) => !/^[A-Z]{2}$/.test(state));
    if (invalid.length) throw new Error(`${label} must use two-letter state codes: ${invalid.join(", ")}`);
    return states;
  }

  function setStatus(message = "", state = "") {
    status.textContent = message;
    status.dataset.state = state;
  }

  function clearSupplierVerification() {
    ["rv-map-item-no","rv-map-sku-id","rv-map-spu-no","rv-map-cost","rv-map-shipping","rv-map-allowed","rv-map-blocked","rv-map-notes","rv-map-output"].forEach((id) => { $(id).value = ""; });
    $("rv-map-shipping-basis").value = "doba_cart";
    $("rv-map-verified-date").value = new Date().toISOString().slice(0, 10);
    $("rv-map-verified").checked = false;
    copyButton.disabled = true;
  }

  function renderProduct() {
    clearSupplierVerification();
    const product = selectedProduct();
    const readout = $("rv-map-product-readout");
    if (!product) {
      readout.hidden = true;
      $("rv-map-price").value = "";
      setStatus();
      updateMath();
      return;
    }
    readout.hidden = false;
    $("rv-map-product-name").textContent = product.name;
    $("rv-map-product-category").textContent = product.category;
    $("rv-map-ebay-item").textContent = product.itemNumber;
    $("rv-map-ebay-link").href = product.buyUrl;
    $("rv-map-price").value = centsToInput(product.priceCents);

    const known = PUBLIC_DOBA_MATCHES[product.itemNumber];
    const snapshot = ACCOUNT_DOBA_SNAPSHOTS[product.itemNumber];
    if (known) $("rv-map-item-no").value = known.itemNo;
    if (snapshot) {
      $("rv-map-cost").value = centsToInput(snapshot.supplierPriceCents);
      $("rv-map-shipping").value = centsToInput(snapshot.shippingCents);
      $("rv-map-notes").value = `Doba account snapshot ${snapshot.observedAt}; Store SKU ${snapshot.storeSku}; Doba inventory ${snapshot.inventory}; listed shipping ${snapshot.shippingLabel}; listed margin ${snapshot.marginPercent}%. Destination scope is not proven by this snapshot. Re-verify shipping in Doba cart/rate/support before checking direct-checkout confirmation.`;
      const priceChanged = Number(product.priceCents) !== Number(snapshot.storePriceCents);
      setStatus(`Doba account snapshot prefilled (${snapshot.itemNo}): supplier ${money(snapshot.supplierPriceCents)}, listed shipping ${snapshot.shippingLabel}, inventory ${snapshot.inventory}.${priceChanged ? ` Current RV Store price ${money(product.priceCents)} differs from snapshot ${money(snapshot.storePriceCents)}.` : ""} Shipping scope still requires verification.`, priceChanged ? "error" : "");
    } else if (known) {
      setStatus(`Doba product match prefilled (${known.itemNo}). Verify current Doba cost, inventory, and shipping before activation.`, "");
    } else {
      setStatus("No Doba product ID match is stored for this item yet. Verify it in Doba before mapping.", "");
    }
    updateMath();
  }

  function updateMath() {
    const price = dollarsToCents($("rv-map-price").value);
    const cost = dollarsToCents($("rv-map-cost").value);
    const shipping = dollarsToCents($("rv-map-shipping").value);
    $("rv-map-margin").textContent = Number.isInteger(price) && Number.isInteger(cost) ? money(price - cost) : "—";
    $("rv-map-total").textContent = Number.isInteger(price) && Number.isInteger(shipping) ? money(price + shipping) : "—";
  }

  function populateCatalog() {
    const rows = catalog();
    productSelect.innerHTML = '<option value="">Choose a product</option>' + rows.map((item) => `<option value="${item.itemNumber}">${item.name} · ${money(item.priceCents)}</option>`).join("");
    catalogStatus.textContent = `${rows.length} RV Store items`;
    queueList.innerHTML = FIRST_QUEUE.map((itemNumber) => rows.find((item) => item.itemNumber === itemNumber)).filter(Boolean).map((item) => {
      const match = PUBLIC_DOBA_MATCHES[item.itemNumber];
      const snapshot = ACCOUNT_DOBA_SNAPSHOTS[item.itemNumber];
      return `
      <article>
        <div><strong>${item.name}</strong><span>${item.category} · ${money(item.priceCents)}</span><code>${item.itemNumber}${match ? ` · ${match.itemNo}` : " · Doba ID pending"}</code>${snapshot ? `<span>Doba ${money(snapshot.supplierPriceCents)} · ${snapshot.shippingLabel} listed shipping · inv ${snapshot.inventory} · destination scope pending</span>` : ""}</div>
        <button class="button button-outline" type="button" data-queue-item="${item.itemNumber}">Map This Item</button>
      </article>`;
    }).join("") || '<p class="admin-muted">Queue items are unavailable in the current catalog.</p>';
  }

  function buildMap() {
    const product = selectedProduct();
    if (!product) throw new Error("Choose an RV Store product first.");
    const itemNo = clean($("rv-map-item-no").value);
    if (!itemNo) throw new Error("Enter the verified Doba Item No.");
    const priceCents = dollarsToCents($("rv-map-price").value);
    const costCents = dollarsToCents($("rv-map-cost").value);
    const shippingCents = dollarsToCents($("rv-map-shipping").value);
    if (!Number.isInteger(priceCents) || priceCents < 1) throw new Error("Enter a valid website checkout price.");
    if (!Number.isInteger(shippingCents) || shippingCents < 0) throw new Error("Enter the verified Doba shipping charge.");
    if (!$("rv-map-verified").checked) throw new Error("Confirm that merchandise price and Doba shipping were verified before generating the map.");

    const allowedStates = parseStates($("rv-map-allowed").value, "Allowed States");
    const blockedStates = parseStates($("rv-map-blocked").value, "Blocked States");
    if (allowedStates.length && blockedStates.length) throw new Error("Use either Allowed States or Blocked States for one mapping, not both.");

    let existing = {};
    const rawExisting = clean($("rv-map-existing").value);
    if (rawExisting) {
      try { existing = JSON.parse(rawExisting); }
      catch (_) { throw new Error("Existing map JSON is invalid."); }
      if (!existing || typeof existing !== "object" || Array.isArray(existing)) throw new Error("Existing map JSON must be an object.");
    }

    const entry = {
      name: product.name,
      priceCents,
      shippingCents,
      shippingVerified: true,
      itemNo,
      ebayUrl: product.buyUrl,
      shippingBasis: $("rv-map-shipping-basis").value,
      verifiedAt: $("rv-map-verified-date").value || new Date().toISOString().slice(0, 10),
    };
    if (Number.isInteger(costCents) && costCents >= 0) entry.supplierCostCents = costCents;
    const known = PUBLIC_DOBA_MATCHES[product.itemNumber];
    const snapshot = ACCOUNT_DOBA_SNAPSHOTS[product.itemNumber];
    const skuId = clean($("rv-map-sku-id").value);
    const spuNo = clean($("rv-map-spu-no").value);
    const verificationNotes = clean($("rv-map-notes").value);
    if (skuId) entry.skuId = skuId;
    if (spuNo) entry.spuNo = spuNo;
    if (known?.url) entry.dobaProductUrl = known.url;
    if (verificationNotes) entry.verificationNotes = verificationNotes;
    if (snapshot) {
      entry.sourceSnapshot = {
        observedAt: snapshot.observedAt,
        storeSku: snapshot.storeSku,
        inventory: snapshot.inventory,
        listedShipping: snapshot.shippingLabel,
        listedMarginPercent: snapshot.marginPercent,
      };
    }
    if (allowedStates.length) entry.allowedStates = allowedStates;
    if (blockedStates.length) entry.blockedStates = blockedStates;

    const next = { ...existing, [product.itemNumber]: entry };
    output.value = JSON.stringify(next, null, 2);
    copyButton.disabled = false;
    setStatus(`Verified mapping generated for eBay item ${product.itemNumber}.`, "success");
  }

  async function copyOutput() {
    if (!output.value) return;
    try {
      await navigator.clipboard.writeText(output.value);
      setStatus("Mapping JSON copied.", "success");
    } catch (_) {
      output.focus();
      output.select();
      document.execCommand("copy");
      setStatus("Mapping JSON copied.", "success");
    }
  }

  function reset() {
    productSelect.value = "";
    ["rv-map-item-no","rv-map-sku-id","rv-map-spu-no","rv-map-cost","rv-map-price","rv-map-shipping","rv-map-allowed","rv-map-blocked","rv-map-notes","rv-map-existing","rv-map-output"].forEach((id) => { $(id).value = ""; });
    $("rv-map-shipping-basis").value = "doba_cart";
    $("rv-map-verified-date").value = new Date().toISOString().slice(0, 10);
    $("rv-map-verified").checked = false;
    copyButton.disabled = true;
    setStatus();
    $("rv-map-product-readout").hidden = true;
    updateMath();
  }

  productSelect.addEventListener("change", renderProduct);
  ["rv-map-cost","rv-map-price","rv-map-shipping"].forEach((id) => $(id).addEventListener("input", updateMath));
  $("rv-map-generate").addEventListener("click", () => { try { buildMap(); } catch (error) { setStatus(error.message, "error"); } });
  copyButton.addEventListener("click", copyOutput);
  $("rv-map-reset").addEventListener("click", reset);
  queueList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-queue-item]");
    if (!button) return;
    productSelect.value = button.dataset.queueItem;
    renderProduct();
    productSelect.scrollIntoView({ behavior: "smooth", block: "center" });
    productSelect.focus();
  });

  $("rv-map-verified-date").value = new Date().toISOString().slice(0, 10);
  populateCatalog();
  api("/api/admin/session").then(() => { auth.hidden = true; dashboard.hidden = false; }).catch((error) => {
    dashboard.hidden = true;
    auth.hidden = false;
    if (error?.status !== 401 && error?.status !== 403) auth.querySelector("p:last-of-type").textContent = "Unable to verify the Admin session. Open Mission Control and try again.";
  });
})();
