(() => {
  "use strict";

  if (window.__EUSTrustRepairV1) return;
  window.__EUSTrustRepairV1 = true;

  const path = location.pathname.replace(/\/+$/, "") || "/";
  let promotionState = null;
  let scheduled = false;

  function scheduleRepair() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      repairBranding();
      repairHomepageSokImage();
      repairHonoluluCopy();
      if (path === "/checkout") applyCheckoutPromotion();
      if (path === "/lithium-batteries") applyLithiumCuration();
    });
  }

  function repairBranding() {
    document.querySelectorAll(".eus-wordmark__tagline").forEach((node) => {
      const wanted = "OFF-GRID POWER • SUPPLY • LOGISTICS";
      if (node.textContent.trim() !== wanted) node.textContent = wanted;
    });

    const retailer = document.querySelector("#checkout-lithium-retailer");
    if (retailer && /licensed lithium battery retailer/i.test(retailer.textContent)) {
      retailer.innerHTML = "Elevation UpScales, Inc. · <strong>Lithium &amp; Outdoor Dealer</strong>";
    }
  }

  function repairHomepageSokImage() {
    if (path !== "/") return;
    const images = document.querySelectorAll(
      'a[href="/sok/sk48v100n/"] img, .reference-product--48v img'
    );
    images.forEach((img) => {
      const correct = "/assets/brands/sok/sk48v100n/home-crop.webp";
      if (img.getAttribute("src") !== correct) img.setAttribute("src", correct);
      img.setAttribute("alt", "SOK SK48V100N rack battery");
    });
  }

  function replaceTextNodes(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const original = node.nodeValue || "";
      const next = original
        .replace(/our Honolulu warehouse\s*\/\s*pickup location/gi, "the confirmed Honolulu terminal / pickup location for this shipment")
        .replace(/our Honolulu pickup location/gi, "the confirmed Honolulu pickup location")
        .replace(/To our Honolulu warehouse\s*\/\s*pickup location/gi, "To the confirmed Honolulu terminal / pickup location");
      if (next !== original) node.nodeValue = next;
    });
  }

  function repairHonoluluCopy() {
    document.querySelectorAll("#checkout-hawaii-freight, #checkout-success, .hawaii-card-simple").forEach(replaceTextNodes);
    document.querySelectorAll(".hawaii-card-simple strong").forEach((node) => {
      if (node.textContent.trim().toLowerCase() === "included freight") {
        node.textContent = "Freight Destination";
      }
    });
  }

  function checkoutPromoNodes() {
    const labels = [...document.querySelectorAll(".eus-checkout-section-label")];
    const label = labels.find((node) => /labor day coupon|promotion code/i.test(node.textContent));
    return {
      label,
      row: document.querySelector(".eus-checkout-coupon-row"),
      status: document.querySelector("#checkout-coupon-status"),
      input: document.querySelector("#checkout-coupon"),
    };
  }

  function applyCheckoutPromotion() {
    const nodes = checkoutPromoNodes();
    if (!nodes.label && !nodes.row && !nodes.status) return;

    if (nodes.label) nodes.label.textContent = "Promotion code";

    if (promotionState === null) {
      if (nodes.status && /labor day|25% off/i.test(nodes.status.textContent)) {
        nodes.status.textContent = "Checking current promotion…";
      }
      return;
    }

    const active = promotionState.active === true;
    [nodes.label, nodes.row, nodes.status].forEach((node) => {
      if (node) node.hidden = !active;
    });

    if (!active) return;

    if (nodes.input && promotionState.couponCode) {
      nodes.input.placeholder = String(promotionState.couponCode);
    }
    if (nodes.status) {
      nodes.status.textContent = String(
        promotionState.disclosure ||
        promotionState.headline ||
        "Current offer applies to eligible merchandise. Shipping and exclusions may apply."
      );
    }
  }

  async function loadPromotionState() {
    if (path !== "/checkout") return;
    try {
      const response = await fetch("/api/store/promotion", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const data = await response.json().catch(() => ({}));
      promotionState = response.ok ? data : { active: false };
    } catch (_) {
      promotionState = { active: false };
    }
    applyCheckoutPromotion();
  }

  let curationInstalled = false;
  let showAllProducts = false;

  function normalizedCardKey(card) {
    const title = card.querySelector("h3")?.textContent || "";
    const specs = card.querySelector(".lithium-card__spec-line")?.textContent || "";
    return `${title}|${specs}`.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function isBatteryCard(card) {
    const title = (card.querySelector("h3")?.textContent || "").toLowerCase();
    const category = (card.querySelector(".lithium-card__category")?.textContent || "").toLowerCase();
    const identity = `${title} ${category}`;
    if (/power bank|mobile power|battery box|charger|charging cable|\bcable\b|adapter|monitor|meter|bracket|cabinet|accessor/.test(identity)) return false;
    return /battery|lifepo4|lithium/.test(identity);
  }

  function ensureCurationControl() {
    if (curationInstalled) return;
    const controls = document.querySelector(".lithium-controls");
    if (!controls) return;

    const wrap = document.createElement("div");
    wrap.className = "lithium-curation-control";
    wrap.dataset.lithiumCuration = "true";
    wrap.innerHTML = '<button type="button" class="button button-outline" data-lithium-show-all>Show all published products</button><small data-lithium-curation-note>Default view highlights distinct battery listings and removes obvious supplier-feed clutter.</small>';
    controls.append(wrap);

    wrap.querySelector("[data-lithium-show-all]")?.addEventListener("click", () => {
      showAllProducts = !showAllProducts;
      const button = wrap.querySelector("[data-lithium-show-all]");
      if (button) button.textContent = showAllProducts ? "Show curated batteries" : "Show all published products";
      applyLithiumCuration();
    });

    document.querySelector("[data-lithium-search]")?.addEventListener("input", () => setTimeout(applyLithiumCuration, 180));
    document.addEventListener("click", (event) => {
      if (event.target.closest?.("[data-lithium-category]")) setTimeout(applyLithiumCuration, 80);
    });
    curationInstalled = true;
  }

  function applyLithiumCuration() {
    if (path !== "/lithium-batteries" || document.body.dataset.lithiumMode === "hawaii") return;
    ensureCurationControl();
    const grid = document.querySelector("[data-lithium-grid]");
    if (!grid) return;
    const cards = [...grid.querySelectorAll(".lithium-card")];
    if (!cards.length) return;

    const query = String(document.querySelector("[data-lithium-search]")?.value || "").trim();
    const activeCategory = document.querySelector("[data-lithium-category].is-active")?.dataset.lithiumCategory || "all";
    const curatedMode = !showAllProducts && !query && activeCategory === "all";
    const seen = new Set();
    let shown = 0;

    cards.forEach((card) => {
      let hide = false;
      if (curatedMode) {
        const key = normalizedCardKey(card);
        if (!isBatteryCard(card)) hide = true;
        else if (key && seen.has(key)) hide = true;
        else if (shown >= 18) hide = true;
        if (!hide) {
          if (key) seen.add(key);
          shown += 1;
        }
      }
      card.hidden = hide;
      card.toggleAttribute("data-trust-curated-hidden", hide);
    });

    if (!curatedMode) shown = cards.length;
    const results = document.querySelector("[data-lithium-results]");
    if (results && curatedMode) {
      results.textContent = `${shown} curated batteries shown · ${cards.length} matching published products available`;
    }
  }

  repairBranding();
  repairHomepageSokImage();
  repairHonoluluCopy();
  if (path === "/checkout") {
    applyCheckoutPromotion();
    loadPromotionState();
  }
  if (path === "/lithium-batteries") applyLithiumCuration();

  const observer = new MutationObserver(scheduleRepair);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
