/* Elevation UpScales shared navigation 3.11.32 capability rail */
(() => {
  "use strict";

  const intentEndpoint = "/api/site-event";
  const intentSessionKey = "eus-site-intent-session:v1";
  const intentId = () => {
    if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16); crypto.getRandomValues(bytes);
    return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };
  const intentSessionId = () => {
    try {
      let value = sessionStorage.getItem(intentSessionKey);
      if (!value) { value = intentId(); sessionStorage.setItem(intentSessionKey, value); }
      return value;
    } catch (_) { return intentId(); }
  };
  const intentSession = intentSessionId();
  const intentTrack = (eventType, eventValue = "", details = {}) => {
    if (!eventType || document.visibilityState === "prerender") return;
    fetch(intentEndpoint, {
      method: "POST",
      credentials: "same-origin",
      keepalive: true,
      headers: { "Content-Type": "application/json", Accept: "application/json", "X-EUS-Intent": "customer-intent" },
      body: JSON.stringify({ eventId: intentId(), sessionId: intentSession, eventType, eventValue, details, page: location.pathname }),
    }).catch(() => {});
  };
  window.EUSIntent = { track: intentTrack, sessionId: () => intentSession };
  window.EUSSiteAnalytics = window.EUSIntent;
  try {
    const startKey = "eus-site-analytics-started:v1";
    if (!sessionStorage.getItem(startKey)) { sessionStorage.setItem(startKey, "1"); intentTrack("session_start"); }
  } catch (_) { intentTrack("session_start"); }
  intentTrack("page_view");
  if (location.pathname === "/marketplace" || location.pathname.startsWith("/marketplace/listing/")) intentTrack("marketplace_open");

  if (location.pathname === "/start-a-project") {
    document.body.classList.add("eus-funnel-upgrade");
    const setText = (selector, text) => {
      const el = document.querySelector(selector);
      if (el) el.textContent = text;
    };
    setText('.sap-hero h1 + p', 'Choose your project location, then the type of help you need. We’ll only show the questions that apply.');
    setText('[data-progress="location"] b', 'Location');
    setText('[data-progress="intent"] b', 'Service');
    setText('[data-progress="details"] b', 'Project');
    setText('[data-progress="contact"] b', 'Contact');
    setText('[data-progress="review"] b', 'Review');
    setText('[data-step="location"] .sap-step-head > p:last-child', 'Choose where the project is located. City and ZIP come after you choose the service.');
    setText('[data-state-choice="CO"] small', 'Continue with Colorado service routing.');
    setText('[data-state-choice="ID"] small', 'Continue with Idaho service routing.');
    setText('[data-state-choice="OTHER"] small', 'Request an outside-area project review.');
    setText('[data-step="intent"] .sap-step-head h2', 'What kind of help do you need?');
    setText('[data-step="intent"] .sap-step-head > p:last-child', 'Pick the closest match. We’ll narrow the details on the next step.');
    const intentCopy = {
      emergency_repair: 'Leaks, water damage, urgent repairs, or safety concerns.',
      small_repair_handyman: 'Maintenance, fixtures, tile, flooring, minor plumbing, and punch-list work.',
      restoration_remodel_larger_project: 'Restoration, remodels, inspections, and larger multi-step projects.',
      rv: 'RV repair, restoration, inspections, systems, and upgrades.',
      solar_off_grid: 'Solar, batteries, inverters, troubleshooting, and off-grid power systems.'
    };
    Object.entries(intentCopy).forEach(([intent, copy]) => setText(`[data-intake-intent="${intent}"] small`, copy));
    setText('.sap-emergency-actions p', 'Need immediate help? Call now. Or continue the intake so the project is saved for follow-up.');
    setText('[data-step="details"] .sap-step-head > p:last-child', 'Tell us only what we need to understand the project. Deeper scope can happen during follow-up.');
    const progress = document.querySelector('.sap-progress');
    if (progress && !document.querySelector('[data-eus-funnel-guidance]')) {
      const guidance = document.createElement('p');
      guidance.className = 'sap-location-context';
      guidance.dataset.eusFunnelGuidance = 'true';
      guidance.innerHTML = '<strong>One step at a time.</strong> Your answers determine what appears next, so you do not have to fill out unrelated questions.';
      progress.insertAdjacentElement('afterend', guidance);
    }
  }

  const contactAnalyticsBuild = "3.11.13-contact-cta-integrity";
  const contactToken = (value) => String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80);
  const contactCtaId = (link, method) => {
    if (!link) return `${method}-unknown`;
    const explicit = link.dataset.contactCtaId || link.id || link.dataset.callLocation || link.dataset.textLocation || link.dataset.eusContactMethod;
    if (explicit) {
      if (link.closest(".eus-support-dialog")) return `support-dialog-${method}`;
      return contactToken(explicit) || `${method}-link`;
    }
    if (link.closest(".footer-contact,footer")) return `footer-${method}`;
    if (link.closest(".mobile-call-bar")) return `mobile-bar-${method}`;
    const label = contactToken(link.textContent);
    return `${method}-${label || "link"}`.slice(0, 100);
  };
  const contactEventDetails = (link, method) => {
    const params = new URLSearchParams(location.search);
    const source = contactToken(link?.dataset?.contactSource || params.get("source") || "");
    const journeyReference = String(params.get("journey") || "").trim();
    return {
      cta_id: contactCtaId(link, method),
      source_page: location.pathname,
      contact_method: method,
      build: contactAnalyticsBuild,
      ...(source ? { source } : {}),
      ...(journeyReference && /^[A-Za-z0-9_-]{8,120}$/.test(journeyReference) ? { journeyReference } : {}),
    };
  };

  const supportPhoneDisplay = "208-813-4998";
  const supportPhoneHref = "tel:+12088134998";
  const supportTextHref = "sms:+12088134998?body=" + encodeURIComponent("Hi Elevation UpScales, I need help with the website.");
  const supportEmailHref = "mailto:casey@elevationupscales.com?subject=" + encodeURIComponent("Elevation UpScales Website Help");
  let supportReturnFocus = null;
  const supportDialog = document.createElement("div");
  supportDialog.className = "eus-support-dialog";
  supportDialog.hidden = true;
  supportDialog.innerHTML = `<button class="eus-support-dialog__backdrop" type="button" data-eus-support-close aria-label="Close contact options"></button><section role="dialog" aria-modal="true" aria-labelledby="eus-support-title"><header><div><small>Elevation UpScales</small><h2 id="eus-support-title">Contact Elevation</h2><p>Choose how you want to reach us. Text, call and email may open another app.</p></div><button type="button" data-eus-support-close aria-label="Close contact options">×</button></header><div class="eus-support-dialog__actions"><a href="${supportPhoneHref}" data-eus-contact-method="call"><strong>Call Elevation</strong><span>${supportPhoneDisplay}</span></a><a href="${supportTextHref}" data-eus-contact-method="text"><strong>Text Elevation</strong><span>Open your messaging app</span></a><a href="${supportEmailHref}" data-eus-contact-method="email"><strong>Email Elevation</strong><span>Open your email app</span></a><a href="/report-an-issue?stage=contact-help" data-eus-support-report><strong>Report an Issue</strong><span>Stay on the website</span></a></div><p class="eus-support-dialog__fallback">If an app does not open correctly, return here and use another option.</p></section>`;
  document.body.append(supportDialog);
  const closeSupport = () => {
    if (supportDialog.hidden) return;
    supportDialog.hidden = true;
    document.body.classList.remove("eus-support-open");
    supportReturnFocus?.focus?.();
  };
  const openSupport = (trigger) => {
    supportReturnFocus = trigger || document.activeElement;
    supportDialog.hidden = false;
    document.body.classList.add("eus-support-open");
    supportDialog.querySelector("[data-eus-support-close]")?.focus();
  };
  supportDialog.addEventListener("click", (event) => {
    if (event.target.closest("[data-eus-support-close]")) closeSupport();
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeSupport(); });
  document.addEventListener("click", (event) => {
    const supportTrigger = event.target.closest("[data-eus-support]");
    if (supportTrigger) {
      event.preventDefault();
      openSupport(supportTrigger);
      return;
    }
    const link = event.target.closest("a[href]");
    if (link) {
      const href = link.getAttribute("href") || "";
      const label = (link.textContent || "").trim().toLowerCase();
      const isElevationSms = href.startsWith("sms:+12088134998");
      if ((label === "contact elevation" || label === "get help") && isElevationSms) {
        event.preventDefault();
        openSupport(link);
        return;
      }
      const sellerContact = link.closest("[data-eus-contact-listing]");
      const elevationPhone = (href.match(/^(?:tel:|sms:)([^?]+)/i)?.[1] || "").replace(/\D/g, "");
      const elevationEmail = (href.match(/^mailto:([^?]+)/i)?.[1] || "").trim().toLowerCase();
      if (!sellerContact && elevationPhone === "12088134998") {
        const method = href.startsWith("tel:") ? "call" : "text";
        intentTrack("contact_click", method, contactEventDetails(link, method));
      } else if (!sellerContact && elevationEmail === "casey@elevationupscales.com") {
        intentTrack("contact_click", "email", contactEventDetails(link, "email"));
      }

      const projectMatch = href.match(/^\/(home|rv|solar)-project(?:$|[?#])/);
      if (projectMatch && (link.closest(".eus-menu--project,.eus-project-selector,.home-project-chooser") || label.includes("project") || label.includes("home / property") || label.includes("rv / camper") || label.includes("solar / off-grid"))) {
        intentTrack("project_type_selected", projectMatch[1]);
      }
    }
  }, { capture: true });
  document.addEventListener("toggle", (event) => {
    const details = event.target;
    if (!(details instanceof HTMLDetailsElement) || !details.open) return;
    const summaryText = (details.querySelector(":scope > summary")?.textContent || "").toLowerCase();
    if (summaryText.includes("start a project")) intentTrack("start_project_open", "selector");
  }, true);

  const header = document.querySelector(".eus-header");
  if (!header) return;

  const headerInner = header.querySelector(".eus-header__inner");
  if (headerInner && !header.querySelector(".eus-capability-rail")) {
    const rail = document.createElement("nav");
    rail.className = "eus-capability-rail";
    rail.setAttribute("aria-label", "Popular Elevation UpScales services");
    rail.innerHTML = `
      <div class="container eus-capability-rail__inner">
        <span class="eus-capability-rail__label">What We Do</span>
        <a href="/home-services" data-eus-capability="tile"><span class="eus-capability-rail__icon" aria-hidden="true">◆</span>Tile &amp; Showers</a>
        <a href="/home-services" data-eus-capability="flooring"><span class="eus-capability-rail__icon" aria-hidden="true">▤</span>Flooring</a>
        <a href="/home-services" data-eus-capability="home"><span class="eus-capability-rail__icon" aria-hidden="true">⌂</span>Home Repairs</a>
        <a href="/home-services" data-eus-capability="inspection"><span class="eus-capability-rail__icon" aria-hidden="true">⌕</span>Roof &amp; Leak Inspections</a>
        <a href="/rv-services" data-eus-capability="rv"><span class="eus-capability-rail__icon" aria-hidden="true">▰</span>RV Repair &amp; Restoration</a>
        <a href="/solar-services" data-eus-capability="solar"><span class="eus-capability-rail__icon" aria-hidden="true">☀</span>Solar &amp; Off-Grid</a>
      </div>`;
    headerInner.insertAdjacentElement("afterend", rail);
  }

  const shopMenu = header.querySelector(".eus-menu--shop");
  const shopDropdown = shopMenu?.querySelector(".eus-dropdown");
  if (shopDropdown) {
    shopDropdown.replaceChildren();
    const shopLinks = [
      ["/store", "Apparel Store", "Hats, apparel, artwork, stickers, and official Elevation releases"],
      ["/rv-store", "RV & Outdoor Store", "RV parts, accessories, camping gear, travel items, and off-grid essentials"],
      ["/collector", "Collector Series", "Explore the four-card collection and Golden Ticket"],
    ];
    for (const [href, title, description] of shopLinks) {
      const link = document.createElement("a");
      link.href = href;
      const span = document.createElement("span");
      const strong = document.createElement("strong");
      const small = document.createElement("small");
      strong.textContent = title;
      small.textContent = description;
      span.append(strong, small);
      link.append(span);
      shopDropdown.append(link);
    }
  }

  const toggle = header.querySelector(".eus-menu-toggle");
  const nav = header.querySelector(".eus-nav");
  const menus = [...header.querySelectorAll(".eus-menu")];

  const closeMenus = (except = null) => {
    menus.forEach((menu) => {
      if (menu !== except) menu.removeAttribute("open");
    });
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

  menus.forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (menu.open) closeMenus(menu);
    });
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.removeAttribute("open");
        closeNav();
      });
    });
  });

  nav?.querySelectorAll(":scope > a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

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
})();
