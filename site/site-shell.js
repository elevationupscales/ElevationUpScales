/* Elevation UpScales clean consolidated browser shell
 * Accepted application baseline: 176dbd96cac420b1e52e4fb19ab2483a6caeb46b
 * Drop-in replacement for /site-shell.js — no HTML route change required.
 */
(() => {
  "use strict";

  const CONTACT = Object.freeze({
    phoneDisplay: "208-813-4998",
    phoneHref: "tel:+12088134998",
    textHref: "sms:+12088134998?body=" + encodeURIComponent(
      "Hi Elevation UpScales, I need help with the website."
    ),
    email: "casey@elevationupscales.com",
    emailHref: "mailto:casey@elevationupscales.com?subject=" + encodeURIComponent(
      "Elevation UpScales Website Help"
    ),
  });

  const SHOP_LINKS = Object.freeze([
    ["/lithium-batteries", "Lithium Batteries", "12V, 24V and 48V LiFePO4 for RV, solar and off-grid power"],
    ["/sok-batteries", "SOK Battery Systems", "Authorized SOK Energy Dealer · batteries, chargers and accessories"],
    ["/rv-store", "RV & Outdoor", "RV essentials, camping, travel and practical outdoor equipment"],
    ["/store", "Elevation Gear", "Apparel, hats and current Elevation releases"],
  ]);

  function randomId() {
    if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function installAnalytics() {
    const endpoint = "/api/site-event";
    const sessionKey = "eus-site-intent-session:v1";
    const startedKey = "eus-site-analytics-started:v1";
    const recent = new Map();

    let sessionId;
    try {
      sessionId = sessionStorage.getItem(sessionKey);
      if (!sessionId) {
        sessionId = randomId();
        sessionStorage.setItem(sessionKey, sessionId);
      }
    } catch (_) {
      sessionId = randomId();
    }

    function track(eventType, eventValue = "", details = {}) {
      if (!eventType || document.visibilityState === "prerender") return false;

      const value = String(eventValue || "");
      const key = `${eventType}|${value}|${location.pathname}`;
      const now = Date.now();
      const prior = recent.get(key) || 0;
      if (now - prior < 900) return false;

      recent.set(key, now);
      if (recent.size > 80) {
        for (const [item, at] of recent) {
          if (now - at > 5000) recent.delete(item);
        }
      }

      fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-EUS-Intent": "customer-intent",
        },
        body: JSON.stringify({
          eventId: randomId(),
          sessionId,
          eventType,
          eventValue: value,
          details,
          page: location.pathname,
        }),
      }).catch(() => {});

      return true;
    }

    const api = Object.freeze({ track, sessionId: () => sessionId });
    window.EUSIntent = api;
    window.EUSSiteAnalytics = api;

    try {
      if (!sessionStorage.getItem(startedKey)) {
        sessionStorage.setItem(startedKey, "1");
        track("session_start");
      }
    } catch (_) {
      track("session_start");
    }

    track("page_view");

    document.addEventListener("click", (event) => {
      const element = event.target.closest?.("[data-eus-event]");
      if (!element) return;
      const type = String(element.dataset.eusEvent || "").trim();
      const value = String(element.dataset.eusValue || "").trim();
      if (type) track(type, value, { source: "data-event" });
    });

    document.addEventListener("click", (event) => {
      const add = event.target.closest?.("[data-add-to-cart],[data-cart-add],[data-product-add]");
      if (add) {
        track(
          "add_to_cart",
          String(add.dataset.sku || add.dataset.productId || add.dataset.id || "product").slice(0, 120),
          { source: "commerce" },
        );
      }
      const checkout = event.target.closest?.('a[href^="/checkout"],[data-checkout-start]');
      if (checkout) track("checkout_start", "checkout", { source: "commerce" });
    });

    if (
      location.pathname === "/marketplace" ||
      location.pathname.startsWith("/marketplace/listing/")
    ) {
      track("marketplace_open");
    }

    return api;
  }

  function applyStartProjectPresentation() {
    if (location.pathname !== "/start-a-project") return;

    document.body.classList.add("eus-funnel-upgrade");
    const setText = (selector, value) => {
      const element = document.querySelector(selector);
      if (element) element.textContent = value;
    };

    setText(
      ".sap-hero h1 + p",
      "Choose your project location, then the type of help you need. We’ll only show the questions that apply.",
    );
    setText('[data-progress="location"] b', "Location");
    setText('[data-progress="intent"] b', "Service");
    setText('[data-progress="details"] b', "Project");
    setText('[data-progress="contact"] b', "Contact");
    setText('[data-progress="review"] b', "Review");
    setText(
      '[data-step="location"] .sap-step-head > p:last-child',
      "Choose where the project is located. City and ZIP come after you choose the service.",
    );
    setText('[data-state-choice="CO"] small', "Continue with Colorado service routing.");
    setText('[data-state-choice="ID"] small', "Continue with Idaho service routing.");
    setText('[data-state-choice="OTHER"] small', "Request an outside-area project review.");
    setText('[data-step="intent"] .sap-step-head h2', "What kind of help do you need?");
    setText(
      '[data-step="intent"] .sap-step-head > p:last-child',
      "Pick the closest match. We’ll narrow the details on the next step.",
    );

    const intentCopy = {
      emergency_repair: "Leaks, water damage, urgent repairs, or safety concerns.",
      small_repair_handyman: "Maintenance, fixtures, tile, flooring, minor plumbing, and punch-list work.",
      restoration_remodel_larger_project: "Restoration, remodels, inspections, and larger multi-step projects.",
      rv: "RV repair, restoration, inspections, systems, and upgrades.",
      solar_off_grid: "Solar, batteries, inverters, troubleshooting, and off-grid power systems.",
    };

    for (const [intent, copy] of Object.entries(intentCopy)) {
      setText(`[data-intake-intent="${intent}"] small`, copy);
    }

    setText(
      ".sap-emergency-actions p",
      "Need immediate help? Call now. Or continue the intake so the project is saved for follow-up.",
    );
    setText(
      '[data-step="details"] .sap-step-head > p:last-child',
      "Tell us only what we need to understand the project. Deeper scope can happen during follow-up.",
    );

    const progress = document.querySelector(".sap-progress");
    if (progress && !document.querySelector("[data-eus-funnel-guidance]")) {
      const guidance = document.createElement("p");
      guidance.className = "sap-location-context";
      guidance.dataset.eusFunnelGuidance = "true";
      const strong = document.createElement("strong");
      strong.textContent = "One step at a time.";
      guidance.append(
        strong,
        document.createTextNode(
          " Your answers determine what appears next, so you do not have to fill out unrelated questions.",
        ),
      );
      progress.insertAdjacentElement("afterend", guidance);
    }
  }

  function contactToken(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
  }

  function contactCtaId(link, method) {
    if (!link) return `${method}-unknown`;
    const explicit =
      link.dataset.contactCtaId ||
      link.id ||
      link.dataset.callLocation ||
      link.dataset.textLocation ||
      link.dataset.eusContactMethod;

    if (explicit) {
      if (link.closest(".eus-support-dialog")) return `support-dialog-${method}`;
      return contactToken(explicit) || `${method}-link`;
    }
    if (link.closest(".footer-contact,footer")) return `footer-${method}`;
    if (link.closest(".mobile-call-bar")) return `mobile-bar-${method}`;
    return `${method}-${contactToken(link.textContent) || "link"}`.slice(0, 100);
  }

  function contactEventDetails(link, method) {
    const params = new URLSearchParams(location.search);
    const source = contactToken(link?.dataset?.contactSource || params.get("source") || "");
    const journeyReference = String(params.get("journey") || "").trim();

    return {
      cta_id: contactCtaId(link, method),
      source_page: location.pathname,
      contact_method: method,
      build: "clean-consolidated-browser-shell",
      ...(source ? { source } : {}),
      ...(journeyReference && /^[A-Za-z0-9_-]{8,120}$/.test(journeyReference)
        ? { journeyReference }
        : {}),
    };
  }

  function installSupportAndContactAnalytics(analytics) {
    let returnFocus = null;
    const dialog = document.createElement("div");
    dialog.className = "eus-support-dialog";
    dialog.hidden = true;
    dialog.innerHTML = `
      <button class="eus-support-dialog__backdrop" type="button" data-eus-support-close aria-label="Close contact options"></button>
      <section role="dialog" aria-modal="true" aria-labelledby="eus-support-title">
        <header>
          <div>
            <small>Elevation UpScales</small>
            <h2 id="eus-support-title">Contact Elevation</h2>
            <p>Choose how you want to reach us. Text, call and email may open another app.</p>
          </div>
          <button type="button" data-eus-support-close aria-label="Close contact options">×</button>
        </header>
        <div class="eus-support-dialog__actions">
          <a href="${CONTACT.phoneHref}" data-eus-contact-method="call"><strong>Call Elevation</strong><span>${CONTACT.phoneDisplay}</span></a>
          <a href="${CONTACT.textHref}" data-eus-contact-method="text"><strong>Text Elevation</strong><span>Open your messaging app</span></a>
          <a href="${CONTACT.emailHref}" data-eus-contact-method="email"><strong>Email Elevation</strong><span>Open your email app</span></a>
          <a href="/report-an-issue?stage=contact-help" data-eus-support-report><strong>Report an Issue</strong><span>Stay on the website</span></a>
        </div>
        <p class="eus-support-dialog__fallback">If an app does not open correctly, return here and use another option.</p>
      </section>`;
    document.body.append(dialog);

    function close() {
      if (dialog.hidden) return;
      dialog.hidden = true;
      document.body.classList.remove("eus-support-open");
      returnFocus?.focus?.();
    }

    function open(trigger) {
      returnFocus = trigger || document.activeElement;
      dialog.hidden = false;
      document.body.classList.add("eus-support-open");
      dialog.querySelector("[data-eus-support-close]")?.focus();
    }

    dialog.addEventListener("click", (event) => {
      if (event.target.closest("[data-eus-support-close]")) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });

    document.addEventListener(
      "click",
      (event) => {
        const supportTrigger = event.target.closest?.("[data-eus-support]");
        if (supportTrigger) {
          event.preventDefault();
          open(supportTrigger);
          return;
        }

        const link = event.target.closest?.("a[href]");
        if (!link) return;

        const href = link.getAttribute("href") || "";
        const label = (link.textContent || "").trim().toLowerCase();
        const isElevationSms = href.startsWith("sms:+12088134998");

        if ((label === "contact elevation" || label === "get help") && isElevationSms) {
          event.preventDefault();
          open(link);
          return;
        }

        const sellerContact = link.closest("[data-eus-contact-listing]");
        const phone = (href.match(/^(?:tel:|sms:)([^?]+)/i)?.[1] || "").replace(/\D/g, "");
        const email = (href.match(/^mailto:([^?]+)/i)?.[1] || "").trim().toLowerCase();

        if (!sellerContact && phone === "12088134998") {
          const method = href.startsWith("tel:") ? "call" : "text";
          analytics.track("contact_click", method, contactEventDetails(link, method));
        } else if (!sellerContact && email === CONTACT.email) {
          analytics.track("contact_click", "email", contactEventDetails(link, "email"));
        }

        const projectMatch = href.match(/^\/(home|rv|solar)-project(?:$|[?#])/);
        if (
          projectMatch &&
          (
            link.closest(".eus-menu--project,.eus-project-selector,.home-project-chooser") ||
            label.includes("project") ||
            label.includes("home / property") ||
            label.includes("rv / camper") ||
            label.includes("solar / off-grid")
          )
        ) {
          analytics.track("project_type_selected", projectMatch[1]);
        }
      },
      { capture: true },
    );

    document.addEventListener(
      "toggle",
      (event) => {
        const details = event.target;
        if (!(details instanceof HTMLDetailsElement) || !details.open) return;
        const summary = (details.querySelector(":scope > summary")?.textContent || "").toLowerCase();
        if (summary.includes("start a project")) {
          analytics.track("start_project_open", "selector");
        }
      },
      true,
    );
  }

  function installRetailStoreShell() {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const retailRoute = path === "/store" || path === "/rv-store" || path === "/lithium-batteries" || path === "/sok-batteries" || path === "/hawaii-lithium-batteries" || path === "/collector" || path === "/checkout" || path === "/product" || path === "/marketplace" || path.startsWith("/sok/");
    if (document.body.classList.contains("retail-home")) return;
    document.body.classList.add("reference-global-shell");
    if (retailRoute) document.body.classList.add("retail-store-shell");
    if (retailRoute && !document.querySelector('link[data-retail-shell]')) {
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = "/retail-first.css?v=5.4.0";
      style.dataset.retailShell = "true";
      document.head.append(style);
    }
    const header = document.querySelector(".eus-header");
    const inner = header?.querySelector(".eus-header__inner");
    if (!header || !inner) return;
    inner.innerHTML = `
      <a class="eus-brand" href="/" aria-label="Elevation UpScales, Inc. home"><img class="reference-header-wordmark" src="/assets/brand/storefront-wordmark.webp" alt="Elevation UpScales, Inc." width="430" height="150"></a>
      <button class="eus-menu-toggle" type="button" aria-controls="eus-nav" aria-expanded="false"><span></span><span></span><span></span><span class="sr-only">Open navigation</span></button>
      <nav class="eus-nav" id="eus-nav" aria-label="Primary navigation">
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Power <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown">
          <a href="/lithium-batteries"><span><strong>Lithium Batteries</strong><small>12V, 24V and 48V power</small></span></a>
          <a href="/sok-batteries"><span><strong>SOK Battery Systems</strong><small>Authorized SOK Energy Dealer</small></span></a>
          <a href="/solar-project"><span><strong>Solar & Off-Grid</strong><small>Build around real power needs</small></span></a>
          <a href="/hawaii-lithium-batteries"><span><strong>Hawaii Power</strong><small>Availability and freight review</small></span></a>
        </div></details>
        <details class="eus-menu eus-menu--shop reference-nav-menu"><summary class="eus-nav-trigger">Shop <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown"></div></details>
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Projects <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown">
          <a href="/start-a-project"><span><strong>Start a Project</strong><small>Installation, repair or project support</small></span></a>
          <a href="/solar-project"><span><strong>Solar System Builder</strong><small>Plan your power system</small></span></a>
        </div></details>
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Services <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown">
          <a href="/shipping-logistics-services"><span><strong>Freight & Logistics</strong><small>Hawaii, Alaska and destination support</small></span></a>
          <a href="/what-we-do#home-rv-services"><span><strong>Home & RV Services</strong><small>Repair, restoration and upgrades</small></span></a>
          <a href="/solar-services"><span><strong>Power & Solar Services</strong><small>Planning and troubleshooting</small></span></a>
        </div></details>
        <details class="eus-menu reference-nav-menu"><summary class="eus-nav-trigger">Company <span class="eus-caret" aria-hidden="true"></span></summary><div class="eus-dropdown">
          <a href="/what-we-do"><span><strong>About Elevation</strong><small>Products, logistics and projects</small></span></a>
          <a href="/work-with-us"><span><strong>Work With Us</strong><small>Creators, technicians and growth</small></span></a>
          <a href="/marketplace"><span><strong>Marketplace</strong><small>Independent local and community listings</small></span></a>
        </div></details>
      </nav>
      ${retailRoute ? '<form class="reference-global-search" data-global-search role="search"><label class="sr-only" for="global-site-search">Search products</label><input id="global-site-search" name="q" type="search" autocomplete="off" placeholder="Search products…"><button type="submit" aria-label="Search">⌕</button></form>' : ""}
      <a class="button button-primary reference-global-cta" href="/start-a-project" data-eus-event="start_project_open" data-eus-value="header">Start a Project</a>`;

    const search = inner.querySelector("[data-global-search]");
    search?.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = String(new FormData(search).get("q") || "").trim();
      if (!query) return;
      const lower = query.toLowerCase();
      const destination = /sok|battery|lithium|12v|24v|48v|lifepo4/.test(lower) ? "/lithium-batteries" : /marketplace|used|rv for sale|vehicle/.test(lower) ? "/marketplace" : "/rv-store";
      location.assign(`${destination}?q=${encodeURIComponent(query)}`);
    });
  }

  function installGlobalFooter() {
    if (document.body.classList.contains("retail-home")) return;
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    footer.innerHTML = `<div class="container footer-grid"><div class="footer-brand"><img alt="" src="/assets/logo.webp" width="80" height="80"><div><strong>Elevation UpScales, Inc.</strong><p>Off-Grid Power • Supply • Logistics<br>Elevation Catalog and independent Marketplace</p></div></div><div class="footer-contact"><a href="/lithium-batteries">Lithium Batteries</a><a href="/sok-batteries">SOK Battery Systems</a><a href="/shipping-logistics-services">Hawaii • Alaska • Freight</a><a href="/marketplace">Marketplace</a><a href="tel:+12088134998">208-813-4998</a><a href="mailto:casey@elevationupscales.com">casey@elevationupscales.com</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><p class="copyright">© <span id="year"></span> Elevation UpScales, Inc. · Colorado Springs, CO.</p></div>`;
    const year = footer.querySelector("#year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function installNavigation() {
    const header = document.querySelector(".eus-header");
    if (!header) return;

    const dropdown = header.querySelector(".eus-menu--shop .eus-dropdown");
    if (dropdown) {
      dropdown.replaceChildren();
      for (const [href, title, description] of SHOP_LINKS) {
        const link = document.createElement("a");
        link.href = href;
        const span = document.createElement("span");
        const strong = document.createElement("strong");
        const small = document.createElement("small");
        strong.textContent = title;
        small.textContent = description;
        span.append(strong, small);
        link.append(span);
        dropdown.append(link);
      }
    }

    const toggle = header.querySelector(".eus-menu-toggle");
    const nav = header.querySelector(".eus-nav");
    const menus = [...header.querySelectorAll(".eus-menu")];

    const closeMenus = (except = null) => {
      for (const menu of menus) {
        if (menu !== except) menu.removeAttribute("open");
      }
    };

    const closeNav = () => {
      if (!toggle || !nav) return;
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    toggle?.addEventListener("click", () => {
      const opening = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(opening));
      nav?.classList.toggle("is-open", opening);
      if (!opening) closeMenus();
    });

    for (const menu of menus) {
      menu.addEventListener("toggle", () => {
        if (menu.open) closeMenus(menu);
      });
      for (const link of menu.querySelectorAll("a")) {
        link.addEventListener("click", () => {
          menu.removeAttribute("open");
          closeNav();
        });
      }
    }

    for (const link of nav?.querySelectorAll(":scope > a") || []) {
      link.addEventListener("click", closeNav);
    }

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        closeMenus();
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const openMenu = menus.find((menu) => menu.open);
      closeMenus();
      closeNav();
      if (openMenu) openMenu.querySelector("summary")?.focus();
      else toggle?.focus();
    });
  }

  const analytics = installAnalytics();
  applyStartProjectPresentation();
  installSupportAndContactAnalytics(analytics);
  installRetailStoreShell();
  installGlobalFooter();
  installNavigation();
})();
