(() => {
  "use strict";
  if (!(location.pathname === "/" || location.pathname === "/index.html")) return;
  if (document.querySelector(".eus-home-capabilities")) return;

  // EDIT ONLY THIS LIST to change the homepage service cards.
  const HOME_SERVICES = [
    { id: "tile", eyebrow: "INTERIORS", title: "Tile & Showers", description: "Tile installation, shower systems, waterproofing, repair, and restoration.", href: "/home-services" },
    { id: "flooring", eyebrow: "INTERIORS", title: "Flooring", description: "Floor repair, replacement, finishing, and practical upgrades for lived-in spaces.", href: "/home-services" },
    { id: "home", eyebrow: "PROPERTY", title: "Home Repairs", description: "Repairs, maintenance, punch-list work, and restoration support for homes and properties.", href: "/home-services" },
    { id: "inspection", eyebrow: "INSPECTIONS", title: "Roof & Leak Inspections", description: "Leak investigation, moisture concerns, roof observations, and next-step documentation.", href: "/home-services" },
    { id: "rv", eyebrow: "RV", title: "RV Repair & Restoration", description: "RV systems, repairs, restoration, upgrades, inspections, and off-grid improvements.", href: "/rv-services" },
    { id: "solar", eyebrow: "OFF-GRID", title: "Solar & Off-Grid", description: "Solar, lithium batteries, inverters, troubleshooting, and off-grid power planning.", href: "/solar-services" },
  ];

  const css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "/home-capabilities.css?v=3.11.43";
  document.head.appendChild(css);

  const section = document.createElement("section");
  section.className = "eus-home-capabilities";
  section.setAttribute("aria-labelledby", "eus-home-capabilities-title");
  section.innerHTML = `<div class="container eus-home-capabilities__inner"><div class="eus-home-capabilities__heading"><p class="eus-home-capabilities__eyebrow">ELEVATION UPSCALES</p><h2 id="eus-home-capabilities-title">What We Do</h2><p>Practical repair, restoration, RV, and off-grid services built around real projects.</p></div><div class="eus-home-capabilities__grid"></div></div>`;

  const grid = section.querySelector(".eus-home-capabilities__grid");
  HOME_SERVICES.forEach((item) => {
    const link = document.createElement("a");
    link.className = "eus-home-capability-card";
    link.href = item.href;
    link.dataset.eusCapability = item.id;
    link.innerHTML = `<span class="eus-home-capability-card__eyebrow"></span><strong></strong><span class="eus-home-capability-card__description"></span><span class="eus-home-capability-card__action">Explore service <span aria-hidden="true">→</span></span>`;
    link.querySelector(".eus-home-capability-card__eyebrow").textContent = item.eyebrow;
    link.querySelector("strong").textContent = item.title;
    link.querySelector(".eus-home-capability-card__description").textContent = item.description;
    link.addEventListener("click", () => window.EUSIntent?.track?.("service_shortcut_click", item.id, {
      source: "homepage_what_we_do",
      destination: item.href,
    }));
    grid.appendChild(link);
  });

  document.querySelector(".eus-header")?.insertAdjacentElement("afterend", section);
})();