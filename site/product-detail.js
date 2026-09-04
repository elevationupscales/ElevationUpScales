(() => {
  "use strict";

  const params = new URLSearchParams(location.search);
  const requestedId = String(params.get("id") || "").trim();
  const hintedStore = String(params.get("store") || "").trim().toLowerCase();
  const hawaiiProgram = String(params.get("program") || "").trim().toLowerCase() === "hawaii";
  const status = document.querySelector("[data-product-status]");
  const detail = document.querySelector("[data-product-detail]");
  const unavailable = document.querySelector("[data-product-unavailable]");
  const titleEl = document.querySelector("[data-product-title]");
  const categoryEl = document.querySelector("[data-product-category]");
  const priceEl = document.querySelector("[data-product-price]");
  const shippingEl = document.querySelector("[data-product-shipping]");
  const buyNow = document.querySelector("[data-buy-now]");
  const mainImage = document.querySelector("[data-product-image]");
  const thumbs = document.querySelector("[data-product-thumbs]");
  const prev = document.querySelector("[data-gallery-prev]");
  const next = document.querySelector("[data-gallery-next]");
  const descriptionSection = document.querySelector("[data-description-section]");
  const descriptionEl = document.querySelector("[data-product-description]");
  const specsSection = document.querySelector("[data-specs-section]");
  const specsEl = document.querySelector("[data-product-specs]");
  const relatedSection = document.querySelector("[data-related-section]");
  const relatedHost = document.querySelector("[data-related-products]");
  const lithiumRetailer = document.querySelector("[data-lithium-retailer]");
  const lithiumFreightLink = document.querySelector("[data-lithium-freight-link]");
  const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
  const fallbackImage = "/assets/logo.webp";
  let galleryImages = [];
  let galleryIndex = 0;

  function plainText(value, max = 7000) {
    const raw = String(value ?? "").replace(/<br\s*\/?>/gi, "\n").replace(/<\/p>/gi, "\n");
    const doc = new DOMParser().parseFromString(raw, "text/html");
    return String(doc.body.textContent || "").replace(/\r/g, "").replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim().slice(0, max);
  }

  function clean(value, max = 500) { return String(value ?? "").trim().slice(0, max); }
  function token(raw, re, format = (match) => match[0]) { const match = raw.match(re); return match ? format(match) : ""; }

  function criticalDetails(value) {
    const raw = plainText(value, 1200); const found = [];
    const patterns = [
      /\b\d+(?:\.\d+)?\s*(?:x|×|\*)\s*\d+(?:\.\d+)?(?:\s*(?:x|×|\*)\s*\d+(?:\.\d+)?)?\s*(?:in(?:ch(?:es)?)?|"|cm|mm)?\b/i,
      /\b\d+(?:\.\d+)?\s*(?:GPM|PSI|Gallon|Gal|LBS|LB|W|Watt|V|Volt|A|Amp|L|Liter|Piece|Pieces|Pc|Pcs)\b/i,
      /\b\d{2,4}-Piece\b/i,
      /\b\d+(?:\.\d+)?\s*(?:ft|feet)\b/i
    ];
    for (const re of patterns) {
      const match = raw.match(re);
      if (match && !found.some((item) => item.toLowerCase() === match[0].toLowerCase())) found.push(match[0].replace(/\*/g, "×"));
    }
    return found.slice(0, 2);
  }

  function compactRvTitle(value, max = 96) {
    const raw = plainText(value, 300).replace(/^(?:VEVOR|KINGBOSS)\s+/i, "").replace(/^(?:In Stock|Premium|Super Bright|High-Performance|Comprehensive)\s+/i, "").trim();
    let title = raw;
    const forMatch = raw.match(/^(.{12,}?)\s+for\s+(.+)$/i);
    if (forMatch) {
      const before = forMatch[1].trim();
      const missing = criticalDetails(raw).filter((value) => !before.toLowerCase().includes(value.toLowerCase()));
      title = [before, ...missing].join(" — ");
    }
    if (title.length > max) {
      const clauses = title.split(/,\s*/); let built = "";
      for (const clause of clauses) { const next = built ? `${built}, ${clause}` : clause; if (next.length > max) break; built = next; }
      title = built || title.slice(0, max).replace(/\s+\S*$/, "").trim();
    }
    return title || "Elevation store product";
  }

  function rvCategory(rawCategory, title) {
    const value = `${rawCategory || ""} ${title || ""}`.toLowerCase();
    if (/spotlight|camping light|outdoor light|led light/.test(value)) return "Outdoor Lighting & Power";
    if (/solar|off[- ]grid|charge controller|panel connector|solar cable/.test(value)) return "Solar & Off-Grid";
    if (/tent|sleeping|gazebo|greenhouse|cooler|camping/.test(value)) return "Camping & Shelter";
    if (/fuel|car jack|automotive|motorcycle|atv|tow|trailer/.test(value)) return "Automotive, ATV & Towing";
    if (/tool|wrench|ladder|mechanic|fuse|plasma cutter|refrigerant/.test(value)) return "Tools & Workshop";
    if (/organizer|storage|travel|cup holder|shoe dryer|laptop stand/.test(value)) return "Travel & Organization";
    if (/rv|water pump|water heater|diesel heater|deadbolt|mattress|marine|tpms/.test(value)) return "RV Essentials & Water";
    return "Outdoor Gear";
  }

  function lithiumView(product) {
    const raw = plainText(product?.title || product?.name || "Lithium battery", 500);
    const lower = raw.toLowerCase();
    const voltage = token(raw, /\b(12|24|36|48)V\b/i, (m) => `${m[1]}V`);
    const ah = token(raw, /\b(\d{2,4})\s*Ah\b/i, (m) => `${m[1]}Ah`);
    const kwh = token(raw, /\b(\d+(?:\.\d+)?)\s*kWh\b/i, (m) => `${m[1]}kWh`);
    const wh = token(raw, /\b(\d{3,5})\s*Wh\b/i, (m) => `${m[1]}Wh`);
    const mah = token(raw, /\b(\d{4,7})\s*mAh\b/i, (m) => `${m[1]}mAh`);
    const dimensions = token(raw, /\b(\d+(?:\.\d+)?\s*(?:x|×|\*)\s*\d+(?:\.\d+)?(?:\s*(?:x|×|\*)\s*\d+(?:\.\d+)?)?\s*(?:in(?:ch(?:es)?)?|"|cm|mm)?)\b/i, (m) => m[1].replace(/\*/g, "×").replace(/\s+/g, " "));
    const chemistry = /LiFePO4/i.test(raw) ? "LiFePO4" : "";
    const heated = /\b(?:heated|self[- ]heating|self heating)\b/i.test(raw);
    const twoPack = /\b(?:2[- ]?pack|two[- ]pack|dual)\b/i.test(raw);
    let title;
    if (/battery box/.test(lower)) title = `RV Battery Box${dimensions ? ` — ${dimensions}` : ""}`;
    else if (/power bank/.test(lower)) {
      const capacity = mah || wh || kwh;
      title = `${/solar/.test(lower) ? "Portable Solar Power Bank" : "Portable Power Bank"}${capacity ? ` — ${capacity}` : ""}`;
    } else {
      const parts = [voltage, ah, heated ? "Heated" : "", chemistry].filter(Boolean);
      if (parts.length >= 2) title = `${twoPack ? "2-Pack " : ""}${parts.join(" ")} Battery`;
      else title = raw.replace(/^(?:VEVOR|KINGBOSS)\s+/i, "").replace(/^Lithium Battery[:,]?\s*/i, "").split(/[,;|]/)[0].trim().slice(0, 82) || "Lithium Battery";
    }
    const category = /battery box/.test(lower) ? "Battery Accessories" : /power bank/.test(lower) ? "Portable Power" : /48v|36v|24v/.test(lower) ? "Higher Voltage / Storage" : /solar|off[- ]grid/.test(lower) ? "Solar & Off-Grid" : "12V Lithium";
    return { title, category };
  }

  function sectionFor(product) { return clean(product?.storeSection, 60).toLowerCase() === "lithium-batteries" ? "lithium" : "rv"; }
  function displayTitle(product) { return sectionFor(product) === "lithium" ? lithiumView(product).title : compactRvTitle(product?.title || product?.name || "RV & Outdoor item"); }
  function displayCategory(product) { return sectionFor(product) === "lithium" ? lithiumView(product).category : rvCategory(product?.category, product?.title || product?.name); }
  function storeUrl(product) { return sectionFor(product) === "lithium" ? (hawaiiProgram ? "/hawaii-lithium-batteries" : "/lithium-batteries") : "/rv-store"; }
  function detailUrl(product) { return `/product?id=${encodeURIComponent(clean(product?.id || product?.sku, 160))}&store=${sectionFor(product)}${hawaiiProgram && sectionFor(product) === "lithium" ? "&program=hawaii" : ""}`; }

  function shippingPresentation(product) {
    const shipping = clean(product?.shippingStatus, 30).toLowerCase();
    if (hawaiiProgram && sectionFor(product) === "lithium") return { label: "Hawaii pickup program · eligibility confirmed before payment", className: "is-quote" };
    if (shipping === "verified") return { label: "Ships to the Lower 48", className: "is-approved" };
    if (shipping === "quote_required") return { label: "Shipping quote required", className: "is-quote" };
    return { label: "Check shipping availability", className: "is-researching" };
  }

  function isLiveProduct(product) {
    if (!product || clean(product.publishStatus, 30).toLowerCase() !== "published") return false;
    if (!(Number(product.priceCents) > 0)) return false;
    if (String(product.availabilityStatus || "check").toLowerCase() === "unavailable") return false;
    if (clean(product.shippingStatus, 30).toLowerCase() === "hold") return false;
    if (sectionFor(product) === "rv" && clean(product.shippingStatus, 30).toLowerCase() === "unverified") return false;
    return true;
  }

  function elevationCheckoutUrl(product) {
    const id = clean(product?.id || product?.sku, 160);
    const rawName = plainText(product?.title || product?.name || displayTitle(product), 300);
    const checkoutSource = sectionFor(product) === "lithium" ? "lithium" : "rv";
    let url = `/checkout/?source=${checkoutSource}&id=${encodeURIComponent(id)}&name=${encodeURIComponent(rawName)}${hawaiiProgram && checkoutSource === "lithium" ? "&state=HI" : ""}`;
    return url;
  }

  function purchaseUrl(product) {
    const value = clean(product?.purchaseUrl, 1200);
    return /^(?:\/|https?:\/\/)/i.test(value) ? value : "";
  }

  function productImages(product) {
    const values = [product?.primaryImage, ...(Array.isArray(product?.images) ? product.images : [])];
    const seen = new Set(); const out = [];
    for (const value of values) {
      const image = clean(value, 1200);
      if (!image || !/^(?:https?:\/\/|\/)/i.test(image) || seen.has(image)) continue;
      seen.add(image); out.push(image);
    }
    return out;
  }

  function addSpec(list, label, value) {
    const cleanValue = clean(value, 180);
    if (!cleanValue || list.some((item) => item.label === label || item.value.toLowerCase() === cleanValue.toLowerCase())) return;
    list.push({ label, value: cleanValue });
  }

  function literalSpecs(product) {
    const raw = `${plainText(product?.title, 1400)} ${plainText(product?.description, 4500)}`.replace(/\s+/g, " ").trim();
    const specs = [];
    if (sectionFor(product) === "lithium") {
      addSpec(specs, "Voltage", token(raw, /\b(\d{1,3}(?:\.\d+)?)\s*V\b/i, (m) => `${m[1]}V`));
      addSpec(specs, "Capacity", token(raw, /\b(\d{2,4})\s*Ah\b/i, (m) => `${m[1]}Ah`));
      addSpec(specs, "Energy", token(raw, /\b(\d+(?:\.\d+)?)\s*kWh\b/i, (m) => `${m[1]} kWh`) || token(raw, /\b(\d{3,5})\s*Wh\b/i, (m) => `${m[1]} Wh`));
      if (/\bLiFePO4\b/i.test(raw)) addSpec(specs, "Chemistry", "LiFePO4");
      addSpec(specs, "BMS", token(raw, /\b(\d{2,3})A\s*BMS\b/i, (m) => `${m[1]}A BMS`));
      addSpec(specs, "Dimensions", token(raw, /\b\d+(?:\.\d+)?\s*(?:x|×|\*)\s*\d+(?:\.\d+)?(?:\s*(?:x|×|\*)\s*\d+(?:\.\d+)?)?\s*(?:in(?:ch(?:es)?)?|"|cm|mm)\b/i, (m) => m[0].replace(/\*/g, "×")));
      addSpec(specs, "Cycle rating", token(raw, /\b(?:up to\s*)?\d{3,5}\s*(?:cycle times|cycles)\b/i));
      if (/\bBluetooth\b/i.test(raw)) addSpec(specs, "Documented feature", "Bluetooth");
      if (/\b(?:self[- ]heating|self heating|heated)\b/i.test(raw)) addSpec(specs, "Documented feature", "Heating feature");
    } else {
      addSpec(specs, "Dimensions", token(raw, /\b\d+(?:\.\d+)?\s*(?:x|×|\*)\s*\d+(?:\.\d+)?(?:\s*(?:x|×|\*)\s*\d+(?:\.\d+)?)?\s*(?:in(?:ch(?:es)?)?|"|cm|mm|ft|feet)\b/i, (m) => m[0].replace(/\*/g, "×")));
      addSpec(specs, "Weight", token(raw, /\b\d+(?:\.\d+)?\s*(?:lb|lbs|pounds|kg)\b/i));
      addSpec(specs, "Wattage", token(raw, /\b\d+(?:\.\d+)?\s*(?:W|Watt|Watts)\b/i));
      addSpec(specs, "Voltage", token(raw, /\b\d+(?:\.\d+)?\s*(?:V|Volt|Volts)\b/i));
      addSpec(specs, "Pressure", token(raw, /\b\d+(?:\.\d+)?\s*PSI\b/i));
      addSpec(specs, "Flow", token(raw, /\b\d+(?:\.\d+)?\s*GPM\b/i));
      addSpec(specs, "Capacity", token(raw, /\b\d+(?:\.\d+)?\s*(?:Gallon|Gallons|Gal|L|Liter|Liters)\b/i));
      addSpec(specs, "Package quantity", token(raw, /\b\d{1,4}\s*(?:Piece|Pieces|Pc|Pcs|Pairs|Pack)\b/i));
      addSpec(specs, "Material", token(raw, /\b(?:stainless steel|carbon steel|alloy steel|steel|aluminum|aluminium|plastic|polypropylene|polyester|canvas)\b/i));
      const application = raw.match(/\bfor\s+([^,.;]{3,80})/i)?.[1]?.trim() || "";
      if (application && !/^\d/.test(application)) addSpec(specs, "Application", application);
    }
    return specs.slice(0, 10);
  }

  function setStoreLinks(product) {
    const href = storeUrl(product);
    document.querySelectorAll("[data-back-store]").forEach((link) => {
      link.href = href;
      if (link.classList.contains("product-back")) link.textContent = `← Back to ${sectionFor(product) === "lithium" ? "Lithium Shop" : "RV & Outdoor Store"}`;
      else if (link.textContent.includes("View Store")) link.textContent = "View Store →";
      else link.textContent = "Back to Store";
    });
  }

  function renderGallery(product) {
    galleryImages = productImages(product);
    if (!galleryImages.length) galleryImages = [fallbackImage];
    galleryIndex = 0;
    const update = () => {
      const src = galleryImages[galleryIndex] || fallbackImage;
      mainImage.src = src; mainImage.alt = displayTitle(product);
      [...thumbs.querySelectorAll("button")].forEach((button, index) => button.classList.toggle("is-active", index === galleryIndex));
    };
    mainImage.addEventListener("error", () => { if (mainImage.src !== new URL(fallbackImage, location.href).href) mainImage.src = fallbackImage; });
    thumbs.replaceChildren(...galleryImages.map((src, index) => {
      const button = document.createElement("button"); button.type = "button"; button.setAttribute("aria-label", `Show image ${index + 1}`);
      const image = document.createElement("img"); image.src = src; image.alt = ""; image.loading = index ? "lazy" : "eager"; image.decoding = "async"; image.referrerPolicy = "no-referrer";
      image.addEventListener("error", () => button.remove(), { once: true });
      button.append(image); button.addEventListener("click", () => { galleryIndex = index; update(); }); return button;
    }));
    const multiple = galleryImages.length > 1; prev.hidden = !multiple; next.hidden = !multiple; thumbs.hidden = !multiple;
    prev.onclick = () => { galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length; update(); };
    next.onclick = () => { galleryIndex = (galleryIndex + 1) % galleryImages.length; update(); };
    let touchX = null;
    mainImage.addEventListener("touchstart", (event) => { touchX = event.changedTouches?.[0]?.clientX ?? null; }, { passive: true });
    mainImage.addEventListener("touchend", (event) => {
      if (touchX === null || !multiple) return;
      const delta = (event.changedTouches?.[0]?.clientX ?? touchX) - touchX; touchX = null;
      if (Math.abs(delta) < 45) return;
      if (delta < 0) next.click(); else prev.click();
    }, { passive: true });
    update();
  }

  function renderSpecs(product) {
    const specs = literalSpecs(product);
    specsEl.replaceChildren(...specs.map(({ label, value }) => {
      const row = document.createElement("div"); row.className = "spec-row";
      const dt = document.createElement("dt"); dt.textContent = label;
      const dd = document.createElement("dd"); dd.textContent = value;
      row.append(dt, dd); return row;
    }));
    specsSection.hidden = !specs.length;
  }

  function updateMetadata(product) {
    const title = displayTitle(product);
    const description = plainText(product?.description, 180) || `${displayCategory(product)} from Elevation UpScales.`;
    document.title = `${title} | Elevation UpScales`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    const canonical = `${location.origin}/product?id=${encodeURIComponent(clean(product.id || product.sku, 160))}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonical);
    const image = productImages(product)[0];
    if (image) {
      let ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) { ogImage = document.createElement("meta"); ogImage.setAttribute("property", "og:image"); document.head.append(ogImage); }
      ogImage.setAttribute("content", image);
      let twImage = document.querySelector('meta[name="twitter:image"]');
      if (!twImage) { twImage = document.createElement("meta"); twImage.setAttribute("name", "twitter:image"); document.head.append(twImage); }
      twImage.setAttribute("content", image);
    }
  }

  function renderProduct(product) {
    const live = isLiveProduct(product); const title = displayTitle(product); const shipping = shippingPresentation(product);
    setStoreLinks(product); updateMetadata(product);
    if (!live) {
      status.hidden = true; unavailable.hidden = false; detail.hidden = true;
      buyNow.hidden = true; buyNow.removeAttribute("href");
      return;
    }
    const lithiumProduct = sectionFor(product) === "lithium";
    if (lithiumRetailer) lithiumRetailer.hidden = !lithiumProduct;
    if (lithiumFreightLink) lithiumFreightLink.hidden = !lithiumProduct;
    categoryEl.textContent = displayCategory(product); titleEl.textContent = title; priceEl.textContent = money.format(Number(product.priceCents) / 100);
    shippingEl.textContent = shipping.label; shippingEl.className = `product-shipping ${shipping.className}`;
    const purchase = purchaseUrl(product);
    if (purchase) {
      buyNow.hidden = false; buyNow.href = purchase; buyNow.setAttribute("aria-label", `Buy ${title}`);
      if (/^https?:\/\//i.test(purchase)) { buyNow.target = "_blank"; buyNow.rel = "noopener"; }
      else { buyNow.removeAttribute("target"); buyNow.removeAttribute("rel"); }
    } else {
      buyNow.hidden = true; buyNow.removeAttribute("href");
    }
    renderGallery(product); renderSpecs(product);
    const description = plainText(product?.description, 7000);
    descriptionEl.textContent = description; descriptionSection.hidden = !description;
    status.hidden = true; unavailable.hidden = true; detail.hidden = false;
  }

  function relatedReady(product) {
    if (!isLiveProduct(product)) return false;
    const shipping = clean(product.shippingStatus, 30).toLowerCase();
    return shipping === "verified" || shipping === "quote_required";
  }

  function renderRelated(current, products) {
    const currentId = clean(current?.id || current?.sku, 160); const section = sectionFor(current);
    const related = products.filter((product) => clean(product?.id || product?.sku, 160) !== currentId && sectionFor(product) === section && relatedReady(product)).slice(0, 4);
    relatedHost.replaceChildren(...related.map((product) => {
      const article = document.createElement("article"); article.className = "related-card";
      const imageLink = document.createElement("a"); imageLink.className = "related-card__image"; imageLink.href = detailUrl(product);
      const image = document.createElement("img"); image.src = productImages(product)[0] || fallbackImage; image.alt = displayTitle(product); image.loading = "lazy"; image.decoding = "async"; image.referrerPolicy = "no-referrer"; image.addEventListener("error", () => { image.src = fallbackImage; }, { once: true }); imageLink.append(image);
      const body = document.createElement("div"); body.className = "related-card__body";
      const category = document.createElement("p"); category.className = "eyebrow"; category.textContent = displayCategory(product);
      const heading = document.createElement("h3"); const link = document.createElement("a"); link.href = detailUrl(product); link.textContent = displayTitle(product); heading.append(link);
      const meta = document.createElement("div"); meta.className = "related-card__meta";
      const price = document.createElement("strong"); price.textContent = money.format(Number(product.priceCents) / 100);
      const ship = document.createElement("span"); ship.textContent = shippingPresentation(product).label; meta.append(price, ship);
      body.append(category, heading, meta); article.append(imageLink, body); return article;
    }));
    relatedSection.hidden = !related.length;
  }

  async function fetchSection(section) {
    const url = section === "lithium" ? "/api/store/catalog?section=lithium-batteries" : "/api/store-catalog?section=rv-outdoor";
    const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !Array.isArray(data.products)) return [];
    return data.products;
  }

  async function load() {
    if (!requestedId) { status.hidden = true; unavailable.hidden = false; return; }
    try {
      const order = hintedStore === "lithium" ? ["lithium", "rv"] : hintedStore === "rv" ? ["rv", "lithium"] : ["lithium", "rv"];
      let matched = null; let matchedRows = [];
      for (const section of order) {
        const rows = await fetchSection(section);
        const found = rows.find((product) => clean(product?.id || product?.sku, 160) === requestedId);
        if (found) { matched = found; matchedRows = rows; break; }
      }
      if (!matched) { status.hidden = true; unavailable.hidden = false; return; }
      renderProduct(matched); renderRelated(matched, matchedRows);
    } catch (_) {
      status.hidden = true; unavailable.hidden = false;
    }
  }

  load();
})();