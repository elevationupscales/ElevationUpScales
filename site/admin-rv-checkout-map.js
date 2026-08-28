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

  // Public Doba product matches only. These prefill supplier identity, never price,
  // shipping, inventory, or shippingVerified. Re-verify those inside Doba before activation.
  const PUBLIC_DOBA_MATCHES = Object.freeze({
    "186833010961": {
      itemNo: "D010275E6ZT",
      url: "https://www.doba.com/product/wEeybzdltKva/dropshipping-vevor-fast-blow-glass-fuses-assortment-kit-120-pcs-125-volt-5-x-20-mm-1a-2a-3a-4a-5a-8a-10a-36-x-10-mm-25a-3a-5a-tube-fuses-suitable-for-electrical-boxes-led-strips-electronics-appliances.html",
    },
    "186833034172": {
      itemNo: "D0102774602",
      url: "https://www.doba.com/product/HKCaDASijeqr/dropshipping-paper-towel-holder-countertop-stainless-steel-paper-towel-stand-for-kitchen.html",
    },
    "186833063926": {
      itemNo: "D010275RYD2",
      url: "https://www.doba.com/product/wIQvDkdGOFVi/dropshipping-vevor-adhesive-hooks-4-pack-self-adhesive-towel-coat-hooks-heavy-duty-wall-hook-hold-15-lbs-max-stainless-steel-sticky-hanger-for-bathroom-kitchen-hanging-towel-coat-keys-matte-black.html",
    },
    "186833285491": {
      itemNo: "D01027RQMT2",
      url: "https://www.doba.com/product/tPQWeGKBuFvC/dropshipping-vevor-rv-screen-door-protector-adjusts-from-22-to-315-inch-adjustable-door-grille-easy-to-install-reinforced-breathable-honeycomb-holes-iron-camper-rv-entry-protector-for-pet-protection-black.html",
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
    if (known) {
      $("rv-map-item-no").value = known.itemNo;
      setStatus(`Doba product match prefilled (${known.itemNo}). Verify current Doba cost, inventory, and shipping before activation.`, "");
    } else {
      setStatus("No public Doba product ID match is stored for this item yet. Verify it in Doba before mapping.", "");
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
      return `
      <article>
        <div><strong>${item.name}</strong><span>${item.category} · ${money(item.priceCents)}</span><code>${item.itemNumber}${match ? ` · ${match.itemNo}` : " · Doba ID pending"}</code></div>
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
    const known = PUBLIC_DOBA_MATCHES[product.itemNumber];
    const skuId = clean($("rv-map-sku-id").value);
    const spuNo = clean($("rv-map-spu-no").value);
    if (skuId) entry.skuId = skuId;
    if (spuNo) entry.spuNo = spuNo;
    if (known?.url) entry.dobaProductUrl = known.url;
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
