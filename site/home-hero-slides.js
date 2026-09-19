(() => {
  "use strict";

  const root = document.querySelector("[data-home-hero-slides]");
  if (!root) return;

  const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const track = (type, value, details = {}) => window.EUSIntent?.track?.(type, value, { source: "homepage-reference", ...details });

  function enhanceUtilityAndHeader() {
    document.body.classList.add("reference-storefront-home");

    const utility = document.querySelector(".retail-utility__inner");
    if (utility) {
      utility.innerHTML = `
        <span class="reference-utility__signal">Off-Grid Power • Supply • Logistics</span>
        <a class="reference-utility__signal" href="https://shop.elevationupscales.com/collections/all" data-eus-event="shopify_store_open" data-eus-value="utility">Shop Online →</a>
        <a class="reference-utility__signal reference-utility__signal--hawaii" href="/shipping-logistics-services">Hawaii &amp; Alaska Logistics Review</a>
        <span class="reference-utility__signal reference-utility__signal--applications">RV • Solar • Backup • Commercial</span>
        <span class="reference-utility__contact"><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a></span>`;
    }

    const brand = document.querySelector(".eus-brand");
    if (brand) {
      brand.innerHTML = `<span class="reference-header-brand-text"><strong>ELEVATION</strong><b>UpScales</b><small>OFF-GRID POWER • SUPPLY • LOGISTICS</small></span>`;
      brand.setAttribute("aria-label", "Elevation UpScales, Inc. home");
    }

    const nav = document.querySelector("#eus-nav");
    if (nav) {
      nav.innerHTML = `
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Shop <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown"><a href="https://shop.elevationupscales.com/collections/all"><span><strong>Shop All Products</strong><small>Open the Elevation Shopify store</small></span></a><a href="https://shop.elevationupscales.com/collections/complete-power-systems"><span><strong>Complete Power Systems</strong><small>Battery and system-scale packages</small></span></a><a href="https://shop.elevationupscales.com/collections/sok-battery"><span><strong>SOK Battery</strong><small>Authorized SOK Energy products</small></span></a><a href="https://shop.elevationupscales.com/collections/renogy"><span><strong>Renogy</strong><small>Solar, charging and off-grid power</small></span></a><a href="https://shop.elevationupscales.com/collections/sungoldpower"><span><strong>SunGoldPower</strong><small>Inverters and power systems</small></span></a></div></details>
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Projects <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown"><a href="/start-a-project"><span><strong>Start a Project</strong><small>Installation, repair or project support</small></span></a><a href="/solar-project"><span><strong>Solar System Builder</strong><small>Plan your power system</small></span></a></div></details>
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Logistics <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown"><a href="/shipping-logistics-services"><span><strong>Freight &amp; Logistics</strong><small>Hawaii, Alaska and destination support</small></span></a><a href="/hawaii-lithium-batteries"><span><strong>Hawaii Power</strong><small>Lithium and freight review</small></span></a><a href="/shipping-logistics-services#alaska"><span><strong>Alaska Logistics</strong><small>Product and destination shipping review</small></span></a></div></details>
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Services <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown"><a href="/what-we-do#home-rv-services"><span><strong>Home &amp; RV Services</strong><small>Repair, restoration and upgrades</small></span></a><a href="/solar-services"><span><strong>Power &amp; Solar Services</strong><small>Planning and troubleshooting</small></span></a></div></details>
        <details class="eus-menu reference-nav-menu reference-nav-menu--company"><summary class="eus-nav-trigger">Company <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown"><a href="/what-we-do"><span><strong>About Elevation</strong><small>Products, logistics and projects</small></span></a><a href="/work-with-us"><span><strong>Work With Us</strong><small>Creators, technicians and growth</small></span></a></div></details>`;
    }

    const headerInner = document.querySelector(".eus-header__inner");
    if (headerInner && !headerInner.querySelector("[data-reference-search]")) {
      const search = document.createElement("form");
      search.className = "reference-header-search";
      search.dataset.referenceSearch = "true";
      search.setAttribute("role", "search");
      search.innerHTML = `<label class="sr-only" for="reference-site-search">Search products, systems, or solutions</label><input id="reference-site-search" name="q" type="search" autocomplete="off" placeholder="Search products, systems, or solutions…"><button type="submit" aria-label="Search">⌕</button>`;

      const cta = document.createElement("a");
      cta.className = "button retail-primary reference-header-cta";
      cta.href = "/start-a-project";
      cta.textContent = "Start a Project";
      cta.dataset.eusEvent = "homepage_product_detail_open";
      cta.dataset.eusValue = "header-start-project";

      headerInner.append(search, cta);

    }

    const search = headerInner?.querySelector("[data-reference-search]");
    if (search && search.dataset.bound !== "true") {
      search.dataset.bound = "true";
      const routeFor = (query) => {
        const q = query.toLowerCase();
        if (/service|repair|restore|project/.test(q)) return "/start-a-project";
        if (/hawaii|alaska|freight|logistic|shipping|ocean/.test(q)) return "/shipping-logistics-services";
        if (/builder|plan|size|sizing/.test(q) && /solar|battery|power|system/.test(q)) return "/solar-project";
        return `https://shop.elevationupscales.com/search?q=${encodeURIComponent(query)}`;
      };

      search.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = String(new FormData(search).get("q") || "").trim();
        if (!query) return search.querySelector("input")?.focus();
        const destination = routeFor(query);
        track("homepage_product_detail_open", "header-search", { query: query.slice(0, 80), destination });
        window.location.assign(destination);
      });
    }

    document.body.dataset.referenceShellReady = "true";
  }

  function buildFlagshipHero() {
    if (document.querySelector("[data-reference-flagship]")) return;

    const hero = document.createElement("section");
    hero.className = "reference-storefront-hero";
    hero.dataset.referenceFlagship = "true";
    hero.setAttribute("aria-labelledby", "reference-flagship-title");
    hero.innerHTML = `
      <div class="reference-storefront-hero__scene" aria-hidden="true"></div>
      <div class="container reference-storefront-hero__inner">
        <div class="reference-storefront-hero__copy">
          <p class="reference-storefront-hero__eyebrow">OFF-GRID POWER • SUPPLY • LOGISTICS</p>
          <h1 id="reference-flagship-title">Power Systems, Projects<br><span>&amp; Logistics Support</span></h1>
          <p class="reference-storefront-hero__lead">Shop authorized power products through the Elevation online store, start a project, or get help planning systems and moving lithium into harder-to-serve destinations.</p>
          <div class="reference-storefront-hero__actions">
            <a class="button retail-primary reference-storefront-hero__primary" href="/start-a-project" data-eus-event="start_project_open" data-eus-value="flagship">Start a Project <span aria-hidden="true">→</span></a>
            <a class="button retail-secondary" href="https://shop.elevationupscales.com/collections/all" data-eus-event="shopify_store_open" data-eus-value="flagship-shop">Shop Online</a>
          </div>
          <nav class="reference-usecases" aria-label="Elevation shortcuts">
            <a href="https://shop.elevationupscales.com/collections/all"><span>Shop Online</span></a>
            <a href="https://shop.elevationupscales.com/collections/complete-power-systems"><span>Complete Systems</span></a>
            <a href="/shipping-logistics-services"><span>Freight &amp; Logistics</span></a>
            <a href="/solar-project"><span>Solar System Builder</span></a>
            <a href="/start-a-project"><span>Project Support</span></a>
          </nav>
        </div>

        <div class="reference-storefront-hero__visual" aria-label="SOK lithium battery systems">
          <img class="reference-sok-brand" src="/assets/brands/sok/sok-wordmark-home-transparent.webp" alt="SOK Battery" width="620" height="190">
          <p class="reference-sok-partnership">Authorized Dealer <span>•</span> Premium SOK Energy Products</p>
          <a class="reference-product reference-product--12v" href="https://shop.elevationupscales.com/search?q=SK12V100PC" aria-label="View SOK SK12V100PC"><img src="/assets/brands/sok/sk12v100pc/home-hero.webp" alt="SOK SK12V100PC 12.8V 100Ah LiFePO4 battery" width="900" height="900" fetchpriority="high" decoding="async"><span><b>SK12V100PC</b><small>12.8V 100Ah</small></span></a>
          <a class="reference-product reference-product--48v" href="https://shop.elevationupscales.com/search?q=SK48V100N" aria-label="View SOK SK48V100N"><img src="/assets/brands/sok/48v-battery-cabinet/hero.webp" alt="SOK 48V rack storage cabinet" width="500" height="500" decoding="async"><span><b>SK48V100N</b><small>51.2V 100Ah rack platform</small></span></a>
          <div class="reference-authorized"><img src="/assets/brand/storefront-wordmark.webp" alt="Elevation UpScales, Inc." width="430" height="150"><span>AUTHORIZED DEALER</span></div>
        </div>
      </div>
    `;

    root.insertAdjacentElement("beforebegin", hero);

    const trust = document.createElement("section");
    trust.className = "reference-trust-strip";
    trust.dataset.referenceTrust = "true";
    trust.setAttribute("aria-label", "Elevation customer support highlights");
    trust.innerHTML = `
      <a class="reference-trust-strip__item" href="https://shop.elevationupscales.com/collections/all"><div><strong>Shop Elevation</strong><span>Secure online shopping at shop.elevationupscales.com.</span></div></a>
      <a class="reference-trust-strip__item" href="/shipping-logistics-services"><div><strong>Hawaii &amp; Alaska</strong><span>Destination review for harder-to-serve markets.</span></div></a>
      <a class="reference-trust-strip__item" href="tel:+12088134998"><div><strong>Support</strong><span>Call Elevation: 208-813-4998</span></div></a>`;
    hero.insertAdjacentElement("afterend", trust);
  }

  function buildSolutionGrid() {
    if (document.querySelector("[data-reference-solutions]")) return;

    const oldCategory = document.querySelector("#shop-categories-title")?.closest("section");
    if (oldCategory) oldCategory.dataset.referenceSuperseded = "true";

    const section = document.createElement("section");
    section.className = "reference-solutions";
    section.dataset.referenceSolutions = "true";
    section.setAttribute("aria-labelledby", "reference-solutions-title");
    section.innerHTML = `
      <div class="container">
        <div class="reference-solutions__head"><h2 id="reference-solutions-title">Choose Your <span>Path</span></h2><div class="reference-solutions__rail"><span>Real Power for Real Life</span><i></i><a href="https://shop.elevationupscales.com/collections/all">Shop Online →</a></div></div>
        <div class="reference-solutions__grid">
          <article class="reference-solution-card reference-solution-card--product" style="--solution-image:url('/assets/brands/sok/sk12v100pc/home-hero.webp');--solution-size:contain;--solution-position:center 28%;--solution-color:#eef3f4"><div><h3>Lithium Batteries</h3><p>12V lithium energy for RV and mobile systems.</p><a href="https://shop.elevationupscales.com/collections/all">Shop Batteries →</a></div></article>
          <article class="reference-solution-card reference-solution-card--product" style="--solution-image:url('/assets/brands/sok/48v-battery-cabinet/hero.webp');--solution-size:contain;--solution-position:center 24%;--solution-color:#e9edef"><div><h3>SOK Battery Systems</h3><p>12V, 24V &amp; 48V systems.</p><a href="https://shop.elevationupscales.com/collections/sok-battery">Shop SOK →</a></div></article>
          <article class="reference-solution-card" style="--solution-image:url('/assets/solar/solar-hero-desktop.webp')"><div><h3>Solar &amp; Off-Grid</h3><p>Build your energy independence.</p><a href="/solar-project">Build a System →</a></div></article>
          <article class="reference-solution-card" style="--solution-image:url('/assets/hero/hawaii-ocean-freight-v1.webp');--solution-position:center"><div><h3>Hawaii Power &amp; Logistics</h3><p>Battery freight matched to product and destination.</p><a href="/hawaii-lithium-batteries">Learn More →</a></div></article>
          <article class="reference-solution-card reference-solution-card--product" style="--solution-image:url('/assets/brands/sok/sk12v206h/hero.webp');--solution-size:contain;--solution-position:center 24%;--solution-color:#edf1f2"><div><h3>RV &amp; Outdoor</h3><p>Current batteries and gear for the journey.</p><a href="https://shop.elevationupscales.com/collections/all">Shop RV &amp; Outdoor →</a></div></article>
          <article class="reference-solution-card reference-solution-card--product" style="--solution-image:url('/assets/brands/sok/48v-battery-cabinet/hero.webp');--solution-size:contain;--solution-position:center 24%;--solution-color:#e9edef"><div><h3>Backup Power</h3><p>Keep what matters running.</p><a href="https://shop.elevationupscales.com/collections/sok-battery">Shop Backup Power →</a></div></article>
          <article class="reference-solution-card reference-solution-card--product" style="--solution-image:url('/assets/brands/sok/sk48v100n/home-crop.webp');--solution-size:contain;--solution-position:center 20%;--solution-color:#eef2f3"><div><h3>Commercial Power</h3><p>Scalable power solutions.</p><a href="https://shop.elevationupscales.com/collections/sok-battery">Shop Commercial →</a></div></article>
        </div>
      </div>`;

    const trust = document.querySelector("[data-reference-trust]");
    (trust || root).insertAdjacentElement("afterend", section);

    const sok = document.querySelector("[data-home-sok]");
    if (sok) {
      section.insertAdjacentElement("afterend", sok);
      const head = sok.querySelector(".home-sok__head>div");
      if (head && !head.querySelector("h2")) head.insertAdjacentHTML("afterbegin", `<h2>Featured SOK Systems</h2>`);
      const catalog = sok.querySelector(".home-sok__head>a");
      if (catalog) catalog.textContent = "View All SOK Products →";
    }

    if (sok) sok.insertAdjacentElement("afterend", root);
    const logistics = document.querySelector("[data-retail-logistics]");
    if (logistics) root.insertAdjacentElement("afterend", logistics);

    document.body.dataset.referenceMerchandisingReady = "true";
  }

  function slideReferenceMarkup(slide) {
    const layout = String(slide.layout || "");
    const cls = layout === "reference-partnership" ? " home-hero-slide--partnership" : "";
    const style = slide.backgroundImage ? ` style="--slide-bg:url('${esc(slide.backgroundImage)}')"` : "";

    if (layout === "reference-partnership") {
      const products = (slide.products || []).map((product) => `
        <a class="home-hero-reference__product" href="${esc(product.href || '#')}"><img src="${esc(product.image)}" alt="${esc(product.model || 'SOK battery')}" loading="lazy" decoding="async"><span><b>${esc(product.model)}</b><small>${esc(product.use)}</small></span></a>`).join("");
      return `<article class="home-hero-slide home-hero-slide--reference${cls}"${style} data-home-hero-slide data-slide-id="${esc(slide.id)}" hidden><div class="home-hero-reference home-hero-reference--partnership"><div class="home-hero-reference__copy"><p>${esc(slide.eyebrow || '')}</p><h2>${esc(slide.headline || '')}</h2><span>${esc(slide.body || '')}</span><div class="home-hero-reference__actions"><a class="button retail-primary" href="${esc(slide.href || '#')}">${esc(slide.ctaLabel || 'Explore')}</a>${slide.secondaryHref ? `<a class="button retail-secondary" href="${esc(slide.secondaryHref)}">${esc(slide.secondaryCtaLabel || 'Learn More')}</a>` : ''}</div></div><div class="home-hero-reference__products">${products}</div></div></article>`;
    }

    if (layout === "reference-product") {
      return `<article class="home-hero-slide home-hero-slide--reference"${style} data-home-hero-slide data-slide-id="${esc(slide.id)}" hidden><div class="home-hero-reference home-hero-reference--product"><div class="home-hero-reference__copy"><p>${esc(slide.eyebrow || '')}</p><h2>${esc(slide.headline || '')}</h2><span>${esc(slide.body || '')}</span><div class="home-hero-reference__actions"><a class="button retail-primary" href="${esc(slide.href || '#')}">${esc(slide.ctaLabel || 'View')}</a>${slide.secondaryHref ? `<a class="button retail-secondary" href="${esc(slide.secondaryHref)}">${esc(slide.secondaryCtaLabel || 'Purchase Options')}</a>` : ''}</div></div><a class="home-hero-reference__featured-product" href="${esc(slide.href || '#')}"><img src="${esc(slide.image)}" alt="${esc(slide.alt)}" loading="lazy" decoding="async"></a></div></article>`;
    }

    return `<article class="home-hero-slide home-hero-slide--reference"${style} data-home-hero-slide data-slide-id="${esc(slide.id)}" hidden><div class="home-hero-reference home-hero-reference--identity"><div class="home-hero-reference__copy"><img class="home-hero-reference__brand" src="${esc(slide.image)}" alt="${esc(slide.alt)}"><h2>${esc(slide.headline || '')}</h2><div class="home-hero-reference__actions"><a class="button retail-primary" href="${esc(slide.href || '#')}">${esc(slide.ctaLabel || 'Shop')}</a>${slide.secondaryHref ? `<a class="button retail-secondary" href="${esc(slide.secondaryHref)}">${esc(slide.secondaryCtaLabel || 'Learn More')}</a>` : ''}</div></div></div></article>`;
  }

  function genericSlideMarkup(slide) {
    const style = slide.backgroundImage ? ` style="--slide-bg:url('${esc(slide.backgroundImage)}')"` : "";
    return `<article class="home-hero-slide"${style} data-home-hero-slide data-slide-id="${esc(slide.id)}" hidden><div class="home-hero-reference home-hero-reference--identity"><div class="home-hero-reference__copy"><img class="home-hero-reference__brand" src="${esc(slide.image)}" alt="${esc(slide.alt)}"><h2>${esc(slide.headline || '')}</h2><div class="home-hero-reference__actions"><a class="button retail-primary" href="${esc(slide.href || '#')}">${esc(slide.ctaLabel || 'Explore')}</a></div></div></div></article>`;
  }

  function installCarousel(config) {
    const active = Array.isArray(config?.slides) ? config.slides.filter((s) => s && s.active !== false) : [];
    if (!active.length) throw new Error("No active homepage slides");

    const slidesMarkup = active.map((slide) => String(slide.layout || "").startsWith("reference-") ? slideReferenceMarkup(slide) : genericSlideMarkup(slide)).join("");
    const dots = active.map((slide, index) => `<button type="button" data-home-hero-dot="${index}" aria-label="Show slide ${index + 1}: ${esc(slide.headline || slide.id)}"></button>`).join("");

    root.classList.add("home-hero-slides--secondary");
    root.innerHTML = `<div class="home-hero-slides__label"><span>More Power Solutions</span><small>Swipe or use the controls to explore.</small></div><div class="home-hero-slides__viewport">${slidesMarkup}<button class="home-hero-slides__arrow home-hero-slides__arrow--prev" type="button" data-home-hero-prev aria-label="Previous slide">‹</button><button class="home-hero-slides__arrow home-hero-slides__arrow--next" type="button" data-home-hero-next aria-label="Next slide">›</button></div><div class="home-hero-slides__controls"><div class="home-hero-slides__dots" aria-label="Slideshow pages">${dots}</div><button type="button" class="home-hero-slides__pause" data-home-hero-pause aria-pressed="false">Pause</button></div>`;

    const slides = Array.from(root.querySelectorAll("[data-home-hero-slide]"));
    const dotButtons = Array.from(root.querySelectorAll("[data-home-hero-dot]"));
    const prev = root.querySelector("[data-home-hero-prev]");
    const next = root.querySelector("[data-home-hero-next]");
    const pause = root.querySelector("[data-home-hero-pause]");
    const rotationMs = Math.max(4500, Number(config.rotationMs) || 7000);
    let index = 0;
    let paused = false;
    let timer = null;
    let pointerStart = null;

    const show = (nextIndex, reason = "manual") => {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.hidden = !on;
        slide.setAttribute("aria-hidden", String(!on));
      });
      dotButtons.forEach((dot, i) => {
        const on = i === index;
        dot.classList.toggle("is-active", on);
        dot.setAttribute("aria-current", on ? "true" : "false");
      });
      root.dataset.activeSlide = String(index);
      root.dataset.activeSlideId = active[index]?.id || "";
      if (reason !== "init") track("homepage_product_detail_open", "slideshow-control", { action: reason, slide: root.dataset.activeSlideId });
    };

    const stopTimer = () => { if (timer) clearInterval(timer); timer = null; };
    const startTimer = () => {
      stopTimer();
      if (paused || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
      timer = setInterval(() => show(index + 1, "auto"), rotationMs);
    };

    prev?.addEventListener("click", () => { show(index - 1, "previous"); startTimer(); });
    next?.addEventListener("click", () => { show(index + 1, "next"); startTimer(); });
    dotButtons.forEach((dot, i) => dot.addEventListener("click", () => { show(i, "pagination"); startTimer(); }));
    pause?.addEventListener("click", () => {
      paused = !paused;
      pause.setAttribute("aria-pressed", String(paused));
      pause.textContent = paused ? "Play" : "Pause";
      paused ? stopTimer() : startTimer();
    });

    root.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") { event.preventDefault(); prev?.click(); }
      if (event.key === "ArrowRight") { event.preventDefault(); next?.click(); }
    });
    root.addEventListener("pointerdown", (event) => { pointerStart = event.clientX; });
    root.addEventListener("pointerup", (event) => {
      if (pointerStart == null) return;
      const delta = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(delta) < 45) return;
      (delta > 0 ? prev : next)?.click();
    });
    root.addEventListener("mouseenter", stopTimer);
    root.addEventListener("mouseleave", startTimer);
    root.addEventListener("focusin", stopTimer);
    root.addEventListener("focusout", startTimer);

    root.dataset.slideCount = String(slides.length);
    root.dataset.referenceSlides = String(active.filter((slide) => String(slide.layout || "").startsWith("reference-")).length);
    root.dataset.controlsReady = String(Boolean(prev && next && pause && dotButtons.length === slides.length));
    root.dataset.slideshowReady = "true";
    root.setAttribute("aria-roledescription", "carousel");
    root.setAttribute("aria-label", "More Elevation power solutions");
    show(0, "init");
    startTimer();
  }

  async function initSlides() {
    try {
      const src = root.dataset.slidesSrc || "/home-hero-slides.json";
      const response = await fetch(src, { headers: { Accept: "application/json" }, cache: "default" });
      if (!response.ok) throw new Error(`Slideshow config ${response.status}`);
      installCarousel(await response.json());
    } catch (error) {
      root.dataset.slideshowReady = "false";
      root.innerHTML = `<div class="home-hero-slides__fallback"><a href="https://shop.elevationupscales.com/collections/all"><img src="/assets/brand/storefront-wordmark.webp" alt="Elevation UpScales, Inc."><span>Explore Power Solutions →</span></a></div>`;
      console.warn("Homepage slideshow fallback", error);
    }
  }

  enhanceUtilityAndHeader();
  buildFlagshipHero();
  buildSolutionGrid();
  initSlides();
})();
