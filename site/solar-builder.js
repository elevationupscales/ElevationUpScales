(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const all = (selector, root = document) => [...root.querySelectorAll(selector)];
  const STORAGE_KEY = "eus-solar-builder-209";
  const CONTACT_KEY = "eus-solar-builder-contact-209";
  const JOURNEY_KEY = "eus-solar-builder-journey-340";
  const REFERENCE_KEY = "eus-solar-builder-reference-31117";
  let qaMode = false;
  const NOTES_KEY = "eus-solar-builder-notes-303";
  const LEAD_RESULT_KEY = "eus-solar-lead-result-303";
  const LEGACY_STORAGE_KEYS = ["eus-solar-builder-208", "eus-solar-builder-207"];
  const LEGACY_PII_KEYS = ["eus-solar-builder-contact-209", "eus-solar-lead-draft"];
  const SNAPSHOT_ASSUMPTIONS = { peakSunHours: 4.5, solarSystemEfficiency: 0.78, usableBatteryFraction: 0.90, inverterEfficiency: 0.90 };
  const PRACTICAL_USE = { compact: "Compact / Essential Power", weekend: "Weekend RV / Essential Power", fulltime: "Full-Time RV / Light Off-Grid", heavy: "Higher-Demand / Heavy Off-Grid", planning: "Designed Around Your Loads" };
  const DAILY_LOAD_KWH = { "12V refrigerator": 1.0, "Residential refrigerator": 1.5, Starlink: 1.2, CPAP: 0.4, Microwave: 0.4, "Coffee maker": 0.3, "Laptop/workstation": 0.6, "Air conditioning": 6.0, "Lighting & device charging": 0.35, "TV / entertainment": 0.5, "Water pump": 0.15, "Power tools": 0.8 };
  const LOAD_PEAK_WATTS = { "12V refrigerator": 120, "Residential refrigerator": 600, Starlink: 150, CPAP: 90, Microwave: 1500, "Coffee maker": 1100, "Laptop/workstation": 180, "Air conditioning": 3000, "Lighting & device charging": 180, "TV / entertainment": 180, "Water pump": 180, "Power tools": 1400 };
  const USAGE_PROFILES = {
    essentials: { label:"Essentials", multiplier:0.8, reserveDays:1, loads:["12V refrigerator", "Lighting & device charging", "Water pump"] },
    remote: { label:"Remote Work", multiplier:0.8, reserveDays:1, loads:["12V refrigerator", "Starlink", "Laptop/workstation", "Lighting & device charging", "Coffee maker"] },
    fulltime: { label:"Full-Time RV", multiplier:1, reserveDays:2, loads:["12V refrigerator", "Starlink", "Laptop/workstation", "Microwave", "Coffee maker", "TV / entertainment", "Lighting & device charging", "Water pump"] },
    high: { label:"High Demand", multiplier:1, reserveDays:2, loads:["Residential refrigerator", "Starlink", "Laptop/workstation", "Microwave", "Coffee maker", "Air conditioning", "TV / entertainment", "Lighting & device charging", "Water pump"] },
  };
  const START_REGION_LABELS = Object.freeze({ CO: "Colorado", ID: "Idaho", OTHER: "Another State" });
  const APPLIANCE_EXAMPLES = [
    { key:"refrigerator", label:"Refrigerator", watts:70, icon:"refrigerator.svg" },
    { key:"lighting", label:"Lighting", watts:40, icon:"lighting.svg" },
    { key:"laptop", label:"Laptop", watts:65, icon:"laptop.svg" },
    { key:"television", label:"Television", watts:100, icon:"television.svg" },
    { key:"cpap", label:"CPAP", watts:50, icon:"cpap.svg" },
    { key:"microwave", label:"Microwave", watts:1200, icon:"microwave.svg" },
    { key:"power-tools", label:"Power Tools", watts:800, icon:"power_tools.svg" },
    { key:"rv-ac", label:"RV Air Conditioner", watts:1500, icon:"rv_air_conditioner.svg" },
    { key:"water-pump", label:"Water Pump", watts:120, icon:"water_pump.svg" },
    { key:"phone", label:"Device Charging", watts:20, icon:"phone_device_charging.svg" }
  ];
  const intentTrack = (type, value="", details={}) => window.EUSIntent?.track?.(type, value, details);
  const BUILDER_STAGES = Object.freeze([
    { id:"needs", title:"Your Power", sections:["needs"] },
    { id:"packages", title:"System Match", sections:["packages"] },
    { id:"hardware", title:"Solar & Storage", sections:["panels", "batteries"] },
    { id:"integration", title:"Charging & Install", sections:["power", "integration"] },
    { id:"services", title:"Review & Services", sections:["services"] },
  ]);

  const catalog = {
    panels: {
      n100: { brand: "Renogy", name: "Renogy 100W N-Type rigid panel", watts: 100, description: "Compact rigid panel for tight roof layouts and smaller systems." },
      n175: { brand: "Renogy", name: "Renogy 175W N-Type rigid panel", watts: 175, description: "A balanced panel size when roof geometry limits larger modules." },
      n200: { brand: "Renogy", name: "Renogy 200W N-Type rigid panel", watts: 200, description: "High-output rigid panel for common RV roof layouts." },
      shadow200: { brand: "Renogy", name: "Renogy 200W ShadowFlux N-Type panel", watts: 200, description: "Anti-shading direction for roofs affected by vents, racks, or changing shade." },
      bifacial200: { brand: "Renogy", name: "Renogy 200W N-Type bifacial panel", watts: 200, description: "Bifacial option requiring suitable clearance and reflected-light review." },
      portable200: { brand: "Renogy", name: "Renogy 200W portable solar option", watts: 200, description: "Supplemental deployable solar for flexible campsite positioning." },
      engineered200: { brand: "Engineered", name: "High-efficiency 200W-class rigid panel", watts: 200, description: "Platinum planning placeholder; final panel model is selected after roof measurement, string design, and availability review." }
    },
    batteries: {
      core100: { brand: "Renogy", name: "Renogy 12V 100Ah Core Mini lithium", ah: 100, voltage: 12.8, description: "Compact lithium storage for lighter electrical loads." },
      core200: { brand: "Renogy", name: "Renogy 12V 200Ah Core lithium", ah: 200, voltage: 12.8, description: "Low-temperature protection and an RV-friendly capacity." },
      smart200: { brand: "Renogy", name: "Renogy 12V 200Ah Smart self-heated lithium", ah: 200, voltage: 12.8, description: "Bluetooth visibility and self-heating for colder travel." },
      core300: { brand: "Renogy", name: "Renogy 12V 300Ah Core lithium", ah: 300, voltage: 12.8, description: "Higher-capacity storage with low-temperature protection." },
      heated300: { brand: "Renogy", name: "Renogy 12V 300Ah self-heated lithium", ah: 300, voltage: 12.8, description: "Cold-weather capacity for larger off-grid systems." },
      victron100: { brand: "Victron", name: "Victron Lithium NG 12.8V 100Ah", ah: 100, voltage: 12.8, description: "Victron lithium battery direction requiring an approved BMS and complete system review." },
      victron200: { brand: "Victron", name: "Victron Lithium NG 12.8V 200Ah", ah: 200, voltage: 12.8, description: "Top-tier Victron battery direction requiring BMS, cabling, and architecture review." },
      victron300: { brand: "Victron", name: "Victron Lithium NG 12.8V 300Ah", ah: 300, voltage: 12.8, description: "High-capacity Victron storage direction for engineered Platinum systems." }
    },
    inverters: {
      none: { brand: "Existing", name: "No new inverter selected", watts: 0, voltage: 12, description: "Retain or review the existing AC system." },
      pro1000: { brand: "Renogy", name: "Renogy Pro 1,000W pure sine inverter", watts: 1000, voltage: 12, description: "Basic outlets, device charging, and smaller AC loads." },
      pro2000: { brand: "Renogy", name: "Renogy Pro 2,000W pure sine inverter", watts: 2000, voltage: 12, description: "Moderate kitchen loads and broader outlet support, subject to startup-load review." },
      pro3000: { brand: "Renogy", name: "Renogy Pro 3,000W pure sine inverter", watts: 3000, voltage: 12, description: "Higher-demand AC loads with correct battery, BMS, protection, and cable design." },
      charger3000: { brand: "Renogy", name: "Renogy 3,000W inverter/charger integration", watts: 3000, voltage: 12, description: "Renogy AC and shore-power integration requiring electrical architecture review." },
      multiplus12: { brand: "Victron", name: "Victron MultiPlus-II 12V / 3,000VA inverter/charger", watts: 3000, voltage: 12, description: "Platinum inverter/charger direction for engineered 12V systems and shore-power integration." },
      multiplus24: { brand: "Victron", name: "Victron MultiPlus-II 24V / 3,000VA inverter/charger", watts: 3000, voltage: 24, description: "24V Platinum architecture requiring series battery, BMS, DC distribution, and converter review." },
      custom: { brand: "Custom", name: "Custom high-load inverter configuration", watts: 4000, voltage: 0, description: "Engineering review required for unusual voltage, air-conditioning, or high-demand systems." }
    },
    controllers: {
      none: { brand: "Existing", name: "No new solar controller", amps: 0, planningWatts: 0, description: "Existing controller must be identified and verified." },
      rover40: { brand: "Renogy", name: "Renogy Rover 40A MPPT", amps: 40, planningWatts: 500, description: "Common MPPT level for compact 12V arrays." },
      rover60: { brand: "Renogy", name: "Renogy Rover 60A MPPT", amps: 60, planningWatts: 800, description: "Higher-capacity MPPT direction for expanded arrays." },
      rover100: { brand: "Renogy", name: "Renogy Rover 100A MPPT", amps: 100, planningWatts: 1300, description: "Large-array controller direction requiring voltage and string review." },
      dual30: { brand: "Renogy", name: "Renogy 30A combined DC-to-DC and MPPT", amps: 30, planningWatts: 400, description: "Combined solar and alternator charging for smaller mobile systems." },
      dual50: { brand: "Renogy", name: "Renogy IP67 50A DC-to-DC charger with MPPT", amps: 50, planningWatts: 600, description: "Integrated dual-charging direction subject to alternator review." },
      smartsolar50: { brand: "Victron", name: "Victron SmartSolar MPPT 100/50 direction", amps: 50, planningWatts: 700, description: "Victron MPPT direction for moderate arrays; voltage and string limits require verification." },
      smartsolar100: { brand: "Victron", name: "Victron SmartSolar MPPT 150/100 direction", amps: 100, planningWatts: 1450, description: "High-capacity Victron MPPT direction for engineered Platinum arrays." },
      split: { brand: "Custom", name: "Multiple-controller custom configuration", amps: 120, planningWatts: 1800, description: "Separate charging paths for larger arrays or mixed panel groups." }
    },
    alternators: {
      none: { brand: "None", name: "Not selected", description: "Solar and shore power remain the primary charging sources." },
      dcc30: { brand: "Renogy", name: "Renogy 30A DC-to-DC charging", description: "Moderate alternator charging, subject to vehicle and smart-alternator review." },
      ip6750: { brand: "Renogy", name: "Renogy IP67 50A DC-to-DC charging", description: "Higher mobile charging rate requiring alternator, cable, and duty-cycle verification." },
      orionxs: { brand: "Victron", name: "Victron Orion XS DC-to-DC charging", description: "Platinum alternator-charging direction requiring source alternator and vehicle wiring verification." },
      custom: { brand: "Custom", name: "Custom high-output alternator review", description: "Engineering review for large battery banks, dual alternators, or unusual vehicles." }
    },
    shore: {
      retain: { brand: "Existing", name: "Existing shore system retained", description: "Existing converter or charger must be checked for lithium compatibility." },
      lithium: { brand: "Renogy", name: "Lithium-compatible charger upgrade", description: "Dedicated shore charging selected for the proposed lithium bank." },
      integration30: { brand: "Renogy", name: "Renogy 30A inverter/charger integration", description: "Integrated AC transfer and charging direction for 30A RV service." },
      integration50: { brand: "Custom", name: "50A shore-power integration review", description: "Advanced system requiring panel, transfer, branch-circuit, and load review." },
      victron30: { brand: "Victron", name: "Victron MultiPlus-II 30A shore integration", description: "Platinum 30A shore-power transfer, charging, and load-management direction." },
      victron50: { brand: "Victron", name: "Victron 50A shore architecture review", description: "Platinum 50A integration requiring detailed AC distribution and architecture review." },
      custom: { brand: "Custom", name: "Custom shore-power management", description: "For unusual distribution, generators, multiple AC sources, or stationary systems." }
    },
    monitors: {
      none: { brand: "None", name: "No new monitoring", description: "System visibility will depend on existing equipment." },
      battery: { brand: "Universal", name: "Battery monitor and shunt", description: "State-of-charge and current tracking at the battery bank." },
      bluetooth: { brand: "Renogy", name: "Renogy Bluetooth component monitoring", description: "App-level visibility for compatible Renogy equipment." },
      one: { brand: "Renogy", name: "Renogy ONE Core monitoring", description: "Centralized Renogy system information and compatible-device monitoring." },
      smartshunt: { brand: "Victron", name: "Victron SmartShunt monitoring", description: "Victron battery-state monitoring with app connectivity." },
      cerbo: { brand: "Victron", name: "Victron Cerbo GX system monitoring", description: "Platinum central monitoring and control direction, with display and remote visibility options." }
    },
    wiring: {
      standard: { brand: "Universal", name: "Standard wiring and protection", rank: 1, description: "Proper cable sizing, fusing, disconnects, lugs, protection, and labeling for compact systems." },
      gold: { brand: "Universal", name: "Gold wiring and distribution", rank: 2, description: "Larger cabling, busbars, distribution upgrades, shunt, improved organization, and expanded labeling." },
      platinum: { brand: "Victron", name: "Platinum Victron Lynx power center", rank: 3, description: "Engineered Lynx distribution direction, serviceable mounting, advanced protection, disconnects, and expansion preparation." }
    }
  };

  const packages = {
    standard: { label: "Standard System", panel: "n200", panelQty: 2, battery: "core200", batteryQty: 1, inverter: "pro2000", controller: "rover40", alternator: "none", shore: "retain", monitor: "battery", wiring: "standard" },
    gold: { label: "Gold System", panel: "n200", panelQty: 3, battery: "smart200", batteryQty: 2, inverter: "pro3000", controller: "rover60", alternator: "ip6750", shore: "lithium", monitor: "one", wiring: "gold" },
    platinum: { label: "Platinum Victron System", panel: "engineered200", panelQty: 4, battery: "victron200", batteryQty: 2, inverter: "multiplus12", controller: "smartsolar100", alternator: "orionxs", shore: "victron30", monitor: "cerbo", wiring: "platinum" },
    custom: { label: "Build From Scratch", panel: "n200", panelQty: 0, battery: "core100", batteryQty: 0, inverter: "none", controller: "none", alternator: "none", shore: "retain", monitor: "none", wiring: "standard" }
  };

  const state = { package: "standard", usageProfile:"custom", usageMultiplier:1, reserveDays:1, ...packages.standard };
  let activeReference = "";
  let leadContact = null;
  let leadReferenceVerified = false;
  let summaryMilestoneRecorded = false;
  let progressTimer = 0;
  let userHasInteracted = false;
  let currentBuilderStep = "needs";
  let currentBuilderProgress = Math.round(100 / BUILDER_STAGES.length);
  let furthestBuilderStage = 0;

  function builderEntrySource() {
    try { return (new URLSearchParams(location.search).get("source") || "direct").trim().slice(0, 80); }
    catch (_) { return "direct"; }
  }

  function showBuilderScene(stageId, { focus = false, updateHash = true } = {}) {
    const index = BUILDER_STAGES.findIndex((stage) => stage.id === stageId || stage.sections.includes(stageId));
    if (index < 0) return;
    const stage = BUILDER_STAGES[index];
    const activeSections = new Set(stage.sections);
    document.body.classList.add("solar-scene-mode");
    all("[data-builder-section]").forEach((section) => {
      const active = activeSections.has(section.id);
      section.hidden = !active;
      section.setAttribute("aria-hidden", String(!active));
      section.classList.toggle("is-active-scene", active);
    });
    const mainPanel = document.querySelector(".builder-main");
    if (mainPanel) mainPanel.scrollTop = 0;
    currentBuilderStep = stage.id;
    currentBuilderProgress = Math.round(((index + 1) / BUILDER_STAGES.length) * 100);
    furthestBuilderStage = Math.max(furthestBuilderStage, index);
    if ($("solar-stage-count")) $("solar-stage-count").textContent = `Stage ${index + 1} of ${BUILDER_STAGES.length}`;
    if ($("solar-stage-title")) $("solar-stage-title").textContent = stage.title;
    if ($("solar-stage-meter")) $("solar-stage-meter").style.width = `${currentBuilderProgress}%`;
    if ($("builder-mobile-stage-count")) $("builder-mobile-stage-count").textContent = `Stage ${index + 1} of ${BUILDER_STAGES.length}`;
    if ($("builder-mobile-stage-title")) $("builder-mobile-stage-title").textContent = stage.title;
    if ($("builder-mobile-meter")) $("builder-mobile-meter").style.width = `${currentBuilderProgress}%`;
    if ($("builder-scene-status")) $("builder-scene-status").textContent = stage.title;
    const back = $("builder-scene-back"), next = $("builder-scene-next");
    if (back) back.disabled = index === 0;
    if (next) next.textContent = index === BUILDER_STAGES.length - 1 ? "Review My System →" : "Continue →";
    all("[data-jump]").forEach((button) => {
      const buttonIndex = BUILDER_STAGES.findIndex((item) => item.id === button.dataset.jump);
      const active = button.dataset.jump === stage.id;
      button.classList.toggle("is-active", active);
      button.classList.toggle("is-complete", buttonIndex >= 0 && buttonIndex < furthestBuilderStage);
      if (active) button.setAttribute("aria-current", "step"); else button.removeAttribute("aria-current");
    });
    closeBuilderStageNav();
    if (updateHash) {
      try {
        const url = new URL(location.href);
        url.hash = `builder-${stage.id}`;
        history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
      } catch (_) {}
    }
    if (focus) {
      const heading = $(stage.sections[0])?.querySelector("h3");
      if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll:true }); }
    }
  }

  function moveBuilderScene(direction) {
    const index = Math.max(0, BUILDER_STAGES.findIndex((stage) => stage.id === currentBuilderStep));
    if (direction > 0 && index === BUILDER_STAGES.length - 1) { openWall(); return; }
    const next = BUILDER_STAGES[Math.max(0, Math.min(BUILDER_STAGES.length - 1, index + direction))];
    if (next) showBuilderScene(next.id, { focus:true });
  }

  function escapeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
  }

  function optionMarkup(items) {
    return Object.entries(items).map(([value, item]) => `<option value="${escapeText(value)}">${escapeText(item.name)}</option>`).join("");
  }

  function initializeSelects() {
    $("panel-select").innerHTML = optionMarkup(catalog.panels);
    $("battery-select").innerHTML = optionMarkup(catalog.batteries);
    $("inverter-select").innerHTML = optionMarkup(catalog.inverters);
    $("controller-select").innerHTML = optionMarkup(catalog.controllers);
    $("alternator-select").innerHTML = optionMarkup(catalog.alternators);
    $("shore-select").innerHTML = optionMarkup(catalog.shore);
    $("monitor-select").innerHTML = optionMarkup(catalog.monitors);
    $("wiring-select").innerHTML = optionMarkup(catalog.wiring);
  }

  function clamp(value, min, max) {
    const number = Number.parseInt(value, 10);
    if (Number.isNaN(number)) return min;
    return Math.min(max, Math.max(min, number));
  }

  function migratePackageKey(key) {
    if (key === "premium") return "platinum";
    if (key === "scratch") return "custom";
    return key;
  }

  function applyPackage(rawKey, scroll = false) {
    const key = migratePackageKey(rawKey);
    const template = packages[key] || packages.standard;
    Object.assign(state, template, { package: key });
    all("[data-package]").forEach((button) => {
      const selected = button.dataset.package === key;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    syncInputs();
    update(true);
    if (scroll) showBuilderScene("hardware", { focus:true });
  }

  function syncInputs() {
    $("panel-select").value = state.panel;
    $("panel-qty").value = state.panelQty;
    $("battery-select").value = state.battery;
    $("battery-qty").value = state.batteryQty;
    $("inverter-select").value = state.inverter;
    $("controller-select").value = state.controller;
    $("alternator-select").value = state.alternator;
    $("shore-select").value = state.shore;
    $("monitor-select").value = state.monitor;
    $("wiring-select").value = state.wiring;
    if ($("usage-intensity")) $("usage-intensity").value = String(state.usageMultiplier || 1);
    if ($("reserve-days")) $("reserve-days").value = String(state.reserveDays || 1);
    syncUsageProfileButtons();
  }

  function readState() {
    state.panel = $("panel-select").value;
    state.panelQty = clamp($("panel-qty").value, 0, 8);
    state.battery = $("battery-select").value;
    state.batteryQty = clamp($("battery-qty").value, 0, 6);
    state.inverter = $("inverter-select").value;
    state.controller = $("controller-select").value;
    state.alternator = $("alternator-select").value;
    state.shore = $("shore-select").value;
    state.monitor = $("monitor-select").value;
    state.wiring = $("wiring-select").value;
    state.usageMultiplier = Math.max(0.5, Math.min(1.5, Number($("usage-intensity")?.value || state.usageMultiplier || 1)));
    state.reserveDays = Math.max(1, Math.min(3, Number.parseInt($("reserve-days")?.value || state.reserveDays || 1, 10)));
    $("panel-qty").value = state.panelQty;
    $("battery-qty").value = state.batteryQty;
  }

  function checkedValues(selector) {
    return all(`${selector} input:checked`).map((input) => input.value);
  }

  function syncUsageProfileButtons() {
    all("[data-usage-profile]").forEach((button) => {
      const selected = button.dataset.usageProfile === state.usageProfile;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function applyUsageProfile(key) {
    const profile = USAGE_PROFILES[key];
    if (!profile) return;
    state.usageProfile = key;
    state.usageMultiplier = profile.multiplier;
    state.reserveDays = profile.reserveDays;
    all("#load-options input").forEach((input) => { input.checked = profile.loads.includes(input.value); });
    syncInputs();
    userHasInteracted = true;
    update(true);
    intentTrack("solar_power_profile_selected", key, { profile:key, loads:profile.loads.length, reserveDays:profile.reserveDays });
  }

  function metrics() {
    const panel = catalog.panels[state.panel];
    const battery = catalog.batteries[state.battery];
    const inverter = catalog.inverters[state.inverter];
    const controller = catalog.controllers[state.controller];
    const arrayWatts = panel.watts * state.panelQty;
    const batteryAh = battery.ah * state.batteryQty;
    const batteryKwh = battery.ah * battery.voltage * state.batteryQty / 1000;
    return { panel, battery, inverter, controller, arrayWatts, batteryAh, batteryKwh };
  }

  function powerSnapshot(m, loads) {
    const dailySolarKwh = m.arrayWatts * SNAPSHOT_ASSUMPTIONS.peakSunHours * SNAPSHOT_ASSUMPTIONS.solarSystemEfficiency / 1000;
    const usableBatteryKwh = m.batteryKwh * SNAPSHOT_ASSUMPTIONS.usableBatteryFraction;
    const usableAcKwh = usableBatteryKwh * SNAPSHOT_ASSUMPTIONS.inverterEfficiency;
    const usageMultiplier = Number(state.usageMultiplier) || 1;
    const reserveDays = Number(state.reserveDays) || 1;
    const estimatedUsageKwh = loads.reduce((sum, load) => sum + (DAILY_LOAD_KWH[load] || 0), 0) * usageMultiplier;
    const hasUsage = loads.length > 0;
    const balanceKwh = hasUsage ? dailySolarKwh - estimatedUsageKwh : null;
    const capability = practicalUse(m, loads);
    const inverterWatts = Number(m.inverter.watts) || 0;
    const peakValues = loads.map((load) => LOAD_PEAK_WATTS[load] || 0).sort((a, b) => b - a);
    const peakNeedWatts = peakValues.length ? Math.round(peakValues[0] + peakValues.slice(1).reduce((sum, watts) => sum + watts, 0) * 0.2) : 0;
    const requiredBatteryKwh = hasUsage ? estimatedUsageKwh * reserveDays / (SNAPSHOT_ASSUMPTIONS.usableBatteryFraction * SNAPSHOT_ASSUMPTIONS.inverterEfficiency) : 0;
    const recommendedSolarWatts = hasUsage ? estimatedUsageKwh * 1000 / (SNAPSHOT_ASSUMPTIONS.peakSunHours * SNAPSHOT_ASSUMPTIONS.solarSystemEfficiency) * 1.15 : 0;
    return { dailySolarKwh, usableBatteryKwh, usableAcKwh, estimatedUsageKwh, hasUsage, balanceKwh, capability, inverterWatts, peakNeedWatts, requiredBatteryKwh, recommendedSolarWatts, reserveDays, usageMultiplier };
  }

  function recommendedSystem(snapshot, loads) {
    if (!snapshot.hasUsage) return null;
    let applyKey = "standard";
    if (snapshot.estimatedUsageKwh > 2.2 || snapshot.requiredBatteryKwh > 4.6 || snapshot.recommendedSolarWatts > 650 || snapshot.peakNeedWatts > 2400) applyKey = "platinum";
    else if (snapshot.estimatedUsageKwh > 1.35 || snapshot.requiredBatteryKwh > 2.35 || snapshot.recommendedSolarWatts > 420 || snapshot.peakNeedWatts > 1800) applyKey = "gold";
    const beyondPackages = loads.includes("Air conditioning") || snapshot.estimatedUsageKwh > 2.8 || snapshot.requiredBatteryKwh > 4.7 || snapshot.recommendedSolarWatts > 850 || snapshot.peakNeedWatts > 3000;
    const packageLabel = packages[applyKey].label;
    return {
      applyKey,
      label: beyondPackages ? `Custom review · ${packageLabel} starting point` : `${packageLabel} recommended`,
      reason: beyondPackages
        ? `Your planned use is above a simple package. Start with ${packageLabel}, then Casey can size additional solar, battery reserve, and startup capacity around the RV and roof.`
        : `${packageLabel} is the closest starting point for about ${snapshot.estimatedUsageKwh.toFixed(1)} kWh of daily use, ${snapshot.reserveDays} day${snapshot.reserveDays === 1 ? "" : "s"} of reserve, and a ${snapshot.peakNeedWatts.toLocaleString()}W planning peak.`,
      beyondPackages,
    };
  }

  function setPlannerMeter(name, need, system) {
    const needBar = document.querySelector(`[data-meter="${name}-need"]`);
    const systemBar = document.querySelector(`[data-meter="${name}-system"]`);
    if (!needBar || !systemBar) return;
    const scale = Math.max(need, system, 0.01);
    needBar.style.width = `${Math.max(2, Math.min(100, need / scale * 100))}%`;
    systemBar.style.width = `${Math.max(2, Math.min(100, system / scale * 100))}%`;
  }

  function renderPowerPlanner(m, loads) {
    const snapshot = powerSnapshot(m, loads);
    const recommendation = recommendedSystem(snapshot, loads);
    const title = $("power-recommendation-title"), reason = $("power-recommendation-reason"), apply = $("apply-power-recommendation");
    if (!title || !reason || !apply) return snapshot;
    $("planner-daily-need").textContent = snapshot.hasUsage ? `${snapshot.estimatedUsageKwh.toFixed(1)} kWh/day` : "Choose appliances";
    $("planner-daily-system").textContent = `Selected solar: ${snapshot.dailySolarKwh.toFixed(1)} kWh/day`;
    $("planner-battery-need").textContent = snapshot.hasUsage ? `${snapshot.requiredBatteryKwh.toFixed(1)} kWh nominal` : "Choose appliances";
    $("planner-battery-system").textContent = `Selected battery: ${m.batteryKwh.toFixed(1)} kWh nominal`;
    $("planner-peak-need").textContent = snapshot.hasUsage ? `${snapshot.peakNeedWatts.toLocaleString()}W planning peak` : "Choose appliances";
    $("planner-peak-system").textContent = `Selected inverter: ${snapshot.inverterWatts.toLocaleString()}W`;
    setPlannerMeter("daily", snapshot.estimatedUsageKwh, snapshot.dailySolarKwh);
    setPlannerMeter("battery", snapshot.requiredBatteryKwh, m.batteryKwh);
    setPlannerMeter("peak", snapshot.peakNeedWatts, snapshot.inverterWatts);
    const result = title.closest(".power-need-result");
    if (!recommendation) {
      title.textContent = "Choose what you want to run";
      reason.textContent = "The planner will compare your everyday power need with the system currently selected.";
      apply.disabled = true;
      apply.textContent = "Apply Recommendation";
      delete apply.dataset.recommendPackage;
      result?.classList.remove("is-fit", "is-review");
      return snapshot;
    }
    const selectedFits = snapshot.dailySolarKwh >= snapshot.estimatedUsageKwh && m.batteryKwh >= snapshot.requiredBatteryKwh && snapshot.inverterWatts >= snapshot.peakNeedWatts;
    title.textContent = recommendation.label;
    reason.textContent = recommendation.reason;
    apply.dataset.recommendPackage = recommendation.applyKey;
    apply.disabled = recommendation.applyKey === state.package;
    apply.textContent = recommendation.applyKey === state.package ? "Recommended Starting Point Selected" : `Apply ${packages[recommendation.applyKey].label}`;
    result?.classList.toggle("is-fit", selectedFits && !recommendation.beyondPackages);
    result?.classList.toggle("is-review", !selectedFits || recommendation.beyondPackages);
    return snapshot;
  }

  function renderBuilderHud(m, loads, snapshot, className) {
    const recommendation = recommendedSystem(snapshot, loads);
    const selectedFits = snapshot.hasUsage && snapshot.dailySolarKwh >= snapshot.estimatedUsageKwh && m.batteryKwh >= snapshot.requiredBatteryKwh && snapshot.inverterWatts >= snapshot.peakNeedWatts;
    if ($("hud-solar")) $("hud-solar").textContent = `${m.arrayWatts.toLocaleString()}W`;
    if ($("hud-battery")) $("hud-battery").textContent = `${m.batteryAh.toLocaleString()}Ah`;
    if ($("hud-inverter")) $("hud-inverter").textContent = snapshot.inverterWatts ? `${snapshot.inverterWatts.toLocaleString()}W` : "None";
    if ($("hud-load")) $("hud-load").textContent = snapshot.hasUsage ? `${snapshot.estimatedUsageKwh.toFixed(1)} kWh/day` : "Choose loads";
    const card = $("solar-system-fit"), label = $("solar-fit-label"), note = $("solar-fit-note");
    card?.classList.toggle("is-fit", selectedFits && !recommendation?.beyondPackages);
    card?.classList.toggle("is-review", snapshot.hasUsage && (!selectedFits || recommendation?.beyondPackages));
    if (!snapshot.hasUsage) {
      if (label) label.textContent = "Choose what you want to power";
      if (note) note.textContent = "Your live system fit will appear here.";
    } else if (selectedFits && !recommendation?.beyondPackages) {
      if (label) label.textContent = "Your selected system covers this plan";
      if (note) note.textContent = `${className} · about ${snapshot.estimatedUsageKwh.toFixed(1)} kWh/day planned`;
    } else {
      if (label) label.textContent = recommendation?.beyondPackages ? "Custom sizing recommended" : `${recommendation?.label || "More capacity recommended"}`;
      if (note) note.textContent = "Use the recommendation, then adjust each scene before professional review.";
    }
  }

  function runtimeLabel(hours) {
    if (!Number.isFinite(hours) || hours <= 0) return "Not supported";
    if (hours >= 48) return "48+ hr";
    if (hours >= 10) return `~${Math.round(hours)} hr`;
    if (hours >= 1) return `~${hours.toFixed(1)} hr`;
    return `~${Math.max(1, Math.round(hours * 60))} min`;
  }

  function renderPowerSnapshot(m, loads, className) {
    const snap = powerSnapshot(m, loads);
    const solar = $("snapshot-solar"), battery = $("snapshot-battery"), inverter = $("snapshot-inverter"), usage = $("snapshot-usage"), balance = $("snapshot-balance"), balanceNote = $("snapshot-balance-note"), balanceIcon = $("snapshot-balance-icon"), classificationNode = $("snapshot-classification"), useNode = $("power-snapshot-use"), summary = $("power-snapshot-summary"), applianceHost = $("snapshot-appliances");
    if (!solar) return snap;
    solar.textContent = `${snap.dailySolarKwh.toFixed(1)} kWh`;
    battery.textContent = `${snap.usableBatteryKwh.toFixed(1)} kWh`;
    inverter.textContent = snap.inverterWatts ? `${snap.inverterWatts.toLocaleString()}W` : "No inverter";
    usage.textContent = snap.hasUsage ? `${snap.estimatedUsageKwh.toFixed(1)} kWh/day` : "Select loads";
    classificationNode.textContent = className;
    useNode.textContent = snap.capability;
    if (snap.balanceKwh === null) {
      balance.textContent = "Select loads";
      balanceNote.textContent = "Compare solar production with selected loads";
      balanceIcon.src = "assets/solar/power-snapshot/power_surplus.svg";
    } else if (snap.balanceKwh >= 0) {
      balance.textContent = `~${snap.balanceKwh.toFixed(1)} kWh surplus`;
      balanceNote.textContent = "Estimated solar exceeds selected daily loads";
      balanceIcon.src = "assets/solar/power-snapshot/power_surplus.svg";
    } else {
      balance.textContent = `~${Math.abs(snap.balanceKwh).toFixed(1)} kWh deficit`;
      balanceNote.textContent = "Selected loads exceed estimated solar production";
      balanceIcon.src = "assets/solar/power-snapshot/power_deficit.svg";
    }
    const loadSummary = snap.hasUsage ? `With the loads selected, estimated daily use is about ${snap.estimatedUsageKwh.toFixed(1)} kWh.` : "Select the appliances you expect to use to compare daily production with demand.";
    summary.textContent = `${snap.capability}. Estimated solar production is about ${snap.dailySolarKwh.toFixed(1)} kWh on a representative day, with about ${snap.usableBatteryKwh.toFixed(1)} kWh of planned usable battery reserve. ${loadSummary}`;
    if (applianceHost) applianceHost.innerHTML = APPLIANCE_EXAMPLES.map((item) => {
      const inverterOkay = item.watts <= snap.inverterWatts && snap.inverterWatts > 0;
      const hours = inverterOkay ? snap.usableAcKwh * 1000 / item.watts : 0;
      const label = inverterOkay ? runtimeLabel(hours) : "Inverter too small";
      return `<article><img src="assets/solar/appliances/${item.icon}" alt="" width="42" height="42"><span>${escapeText(item.label)}</span><strong>${escapeText(label)}</strong><small>${item.watts.toLocaleString()}W representative load</small></article>`;
    }).join("");
    return snap;
  }

  function selectedBrands(m) {
    const components = [m.panel, m.battery, m.inverter, m.controller, catalog.alternators[state.alternator], catalog.shore[state.shore], catalog.monitors[state.monitor], catalog.wiring[state.wiring]];
    return new Set(components.map((item) => item.brand).filter((brand) => ["Renogy", "Victron"].includes(brand)));
  }

  function ecosystem(m) {
    const brands = selectedBrands(m);
    if (brands.size > 1) return "Mixed Renogy + Victron";
    if (brands.has("Victron")) return "Victron Energy";
    if (brands.has("Renogy")) return "Renogy";
    return "Custom / Existing Equipment";
  }

  function minimumWiringRank(m) {
    if (m.inverter.watts > 3000 || m.batteryAh >= 600 || m.arrayWatts > 800 || selectedBrands(m).has("Victron")) return 3;
    if (m.inverter.watts >= 3000 || m.batteryAh >= 300 || m.arrayWatts > 400) return 2;
    return 1;
  }

  function practicalUse(m, loads) {
    const inverterWatts = Number(m.inverter.watts) || 0;
    if (m.arrayWatts === 0 && m.batteryAh === 0) return PRACTICAL_USE.planning;
    if (m.arrayWatts >= 750 && m.batteryAh >= 400 && inverterWatts >= 3000) return PRACTICAL_USE.heavy;
    if (m.arrayWatts >= 550 && m.batteryAh >= 300 && inverterWatts >= 2500) return PRACTICAL_USE.fulltime;
    if (m.arrayWatts >= 300 && m.batteryAh >= 150 && inverterWatts >= 1500) return PRACTICAL_USE.weekend;
    return PRACTICAL_USE.compact;
  }

  function classification(m, loads) {
    const inverterWatts = Number(m.inverter.watts) || 0;
    if (m.arrayWatts === 0 && m.batteryAh === 0) return "System Planning Started";
    if (m.arrayWatts >= 1000 || m.batteryAh >= 600 || inverterWatts > 3000) return "Custom Engineered System";
    if (m.arrayWatts >= 750 && m.batteryAh >= 400 && inverterWatts >= 3000) return "High-Capacity System";
    if (m.arrayWatts >= 550 && m.batteryAh >= 300 && inverterWatts >= 2500) return loads.includes("Air conditioning") ? "High-Demand Travel System" : "Extended Travel System";
    if (m.arrayWatts >= 300 && m.batteryAh >= 150 && inverterWatts >= 1500) return "Weekend Off-Grid System";
    return "Compact System";
  }

  function complexity(m, services, alerts) {
    let score = 0;
    if (m.arrayWatts > 400) score += 1;
    if (m.arrayWatts > 800) score += 1;
    if (m.batteryAh >= 400) score += 1;
    if (m.inverter.watts >= 3000) score += 1;
    if (["integration30", "integration50", "victron30", "victron50", "custom"].includes(state.shore)) score += 1;
    if (["ip6750", "orionxs", "custom"].includes(state.alternator)) score += 1;
    if (state.package === "platinum" || selectedBrands(m).size > 1) score += 2;
    if (services.length >= 2) score += 1;
    if (alerts.some((item) => item.level === "critical")) score += 2;
    if (score <= 1) return "Straightforward Installation";
    if (score <= 3) return "Moderate Installation";
    if (score <= 5) return "Advanced Installation";
    return "Custom Engineering Required";
  }

  function compatibility(m, loads) {
    const alerts = [];
    const push = (text, level = "review") => alerts.push({ text, level });
    if (m.arrayWatts === 0) push("No solar panels are selected.");
    else if (state.panelQty > 4) push("Large panel count requires detailed roof-layout verification.");
    else push("Roof-space and mounting verification required.", "good");

    if (m.batteryAh === 0) push("No battery storage is selected.", "critical");
    if (m.controller.planningWatts === 0 && m.arrayWatts > 0) push("A compatible solar controller must be selected.", "critical");
    if (m.controller.planningWatts > 0 && m.arrayWatts > m.controller.planningWatts) push("Proposed array exceeds this controller's planning range; larger or multiple controllers may be required.", "critical");
    if (m.inverter.watts >= 3000 && m.batteryAh < 300) push("A 3,000W-class inverter needs a larger battery/BMS and cable review.", "critical");
    if (m.inverter.watts >= 2000 && m.batteryAh > 0 && m.batteryAh < 200) push("Selected inverter may demand more battery capacity and discharge capability.");
    if (m.inverter.voltage === 24) push("A 24V architecture requires series battery configuration, BMS approval, 12V conversion, and complete DC distribution review.", "critical");
    if (loads.includes("Air conditioning")) {
      push("Air conditioning requires startup-load, duty-cycle, soft-start, roof space, and runtime evaluation.", "critical");
      if (m.inverter.watts < 3000 || m.batteryAh < 400) push("Current inverter or storage selection is likely below the planning level for air-conditioning evaluation.", "critical");
    }
    if (state.alternator !== "none") push("Vehicle alternator output, smart-alternator behavior, wiring route, and manufacturer limits must be verified.");
    if (state.shore === "retain") push("Existing shore charger must be confirmed compatible with the selected battery chemistry.");
    if (state.panel === "bifacial200") push("Bifacial performance depends on mounting clearance and reflected light.");
    if (state.panel === "portable200") push("Portable solar requires connector, cable-length, security, and controller review.");
    if (state.batteryQty > 4 || m.batteryKwh > 10) push("Large battery configuration requires custom engineering review.", "critical");

    const brands = selectedBrands(m);
    if (brands.size > 1) push("Renogy and Victron control or monitoring ecosystems are mixed. Communication, charging profiles, BMS behavior, warranties, and serviceability require custom review.", "critical");
    if (m.battery.brand === "Victron") push("Victron Lithium NG selections require an approved Victron-compatible BMS and complete charge/load-disconnect design.", "critical");
    if (state.package === "platinum") push("Platinum is an engineered Victron system; final component models depend on RV voltage, shore service, BMS, roof layout, and load study.", "good");
    if (["standard", "gold"].includes(state.package) && brands.has("Victron")) push("Victron equipment has been added to a Renogy package template; the build is now a custom mixed-system review.");

    const neededRank = minimumWiringRank(m);
    const currentRank = catalog.wiring[state.wiring].rank;
    if (currentRank < neededRank) {
      const requiredKey = neededRank === 3 ? "platinum" : "gold";
      state.wiring = requiredKey;
      $("wiring-select").value = requiredKey;
      push(`Wiring package automatically raised to ${catalog.wiring[requiredKey].name} for the proposed system.`, "good");
    } else {
      push("Required fusing, disconnects, cable sizing, and protection remain part of final design.", "good");
    }
    return alerts;
  }

  function setBrandTag(containerSelector, tagId, brand) {
    const container = document.querySelector(containerSelector);
    const tag = $(tagId);
    if (container) container.dataset.brand = brand || "Custom";
    if (tag) tag.textContent = brand || "Custom";
  }

  function closeBuilderStageNav() {
    const nav = $("builder-stage-nav");
    const toggle = $("builder-stage-toggle");
    nav?.classList.remove("is-mobile-open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("builder-stage-menu-open");
  }

  function toggleBuilderStageNav() {
    const nav = $("builder-stage-nav");
    const toggle = $("builder-stage-toggle");
    if (!nav || !toggle) return;
    const open = !nav.classList.contains("is-mobile-open");
    nav.classList.toggle("is-mobile-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("builder-stage-menu-open", open);
    if (open) nav.querySelector('[aria-current="step"]')?.focus({ preventScroll:true });
  }

  function closeMobileSummary() {
    const panel = $("builder-summary-panel");
    const toggle = $("mobile-summary-toggle");
    panel?.classList.remove("is-mobile-open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) toggle.textContent = "View Summary";
  }

  function toggleMobileSummary() {
    const panel = $("builder-summary-panel");
    const toggle = $("mobile-summary-toggle");
    if (!panel || !toggle) return;
    const open = !panel.classList.contains("is-mobile-open");
    panel.classList.toggle("is-mobile-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close Summary" : "View Summary";
    if (open) {
      $("mobile-summary-close")?.focus();
      recordSummaryViewed();
    }
  }

  function update(scheduleProgress = false) {
    readState();
    const m = metrics();
    const loads = checkedValues("#load-options");
    const services = checkedValues("#service-options");
    const alerts = compatibility(m, loads);
    const className = classification(m, loads);
    const complexityName = complexity(m, services, alerts);
    const snapshot = renderPowerSnapshot(m, loads, className);
    renderPowerPlanner(m, loads);
    renderBuilderHud(m, loads, snapshot, className);

    $("panel-title").textContent = m.panel.name;
    $("panel-description").textContent = m.panel.description;
    $("battery-title").textContent = m.battery.name;
    $("battery-description").textContent = m.battery.description;
    $("array-output").textContent = `${m.arrayWatts.toLocaleString()}W`;
    $("roof-note").textContent = state.panelQty > 4 ? "Detailed roof-layout review required." : "Roof-space verification required.";
    $("battery-output").textContent = `${m.batteryAh.toLocaleString()}Ah • ${m.batteryKwh.toFixed(2)}kWh`;
    $("inverter-description").textContent = m.inverter.description;
    $("controller-description").textContent = m.controller.description;
    $("alternator-note").textContent = catalog.alternators[state.alternator].description;
    $("shore-note").textContent = catalog.shore[state.shore].description;
    $("monitor-note").textContent = catalog.monitors[state.monitor].description;
    $("wiring-note").textContent = catalog.wiring[state.wiring].description;

    const packageLabel = packages[state.package]?.label || "Custom System";
    $("summary-package").textContent = packageLabel;
    if ($("mobile-summary-package")) $("mobile-summary-package").textContent = packageLabel;
    if ($("mobile-summary-solar")) $("mobile-summary-solar").textContent = `${m.arrayWatts.toLocaleString()}W`;
    if ($("mobile-summary-battery")) $("mobile-summary-battery").textContent = `${m.batteryAh.toLocaleString()}Ah`;
    if ($("summary-visual-solar")) $("summary-visual-solar").textContent = `${m.arrayWatts.toLocaleString()}W`;
    if ($("summary-visual-battery")) $("summary-visual-battery").textContent = `${m.batteryAh.toLocaleString()}Ah`;
    if ($("summary-visual-inverter")) $("summary-visual-inverter").textContent = snapshot.inverterWatts ? `${snapshot.inverterWatts.toLocaleString()}W` : "None";
    if ($("summary-visual-use")) $("summary-visual-use").textContent = snapshot.hasUsage ? `${snapshot.estimatedUsageKwh.toFixed(1)} kWh/day` : "Choose loads";
    const summaryPanel = $("builder-summary-panel");
    if (summaryPanel) summaryPanel.dataset.packageTier = state.package;
    if ($("final-action-package")) $("final-action-package").textContent = packageLabel;
    if ($("final-action-solar")) $("final-action-solar").textContent = `${m.arrayWatts.toLocaleString()}W`;
    if ($("final-action-battery")) $("final-action-battery").textContent = `${m.batteryAh.toLocaleString()}Ah • ${m.batteryKwh.toFixed(2)}kWh`;
    if ($("final-action-inverter")) $("final-action-inverter").textContent = m.inverter.name;
    setBrandTag("#panels .component-visual", "panel-brand", m.panel.brand);
    setBrandTag("#batteries .component-visual", "battery-brand", m.battery.brand);
    setBrandTag("#power .component-panel:nth-of-type(1)", "inverter-brand", m.inverter.brand);
    setBrandTag("#power .component-panel:nth-of-type(2)", "controller-brand", m.controller.brand);
    $("summary-ecosystem").textContent = ecosystem(m);
    $("summary-classification").textContent = className;
    $("summary-solar").textContent = `${m.arrayWatts.toLocaleString()}W (${state.panelQty} × ${m.panel.watts}W)`;
    $("summary-battery").textContent = `${m.batteryAh.toLocaleString()}Ah • ${m.batteryKwh.toFixed(2)}kWh`;
    $("summary-inverter").textContent = m.inverter.name;
    $("summary-controller").textContent = m.controller.name;
    $("summary-alternator").textContent = catalog.alternators[state.alternator].name;
    $("summary-shore").textContent = catalog.shore[state.shore].name;
    $("summary-monitor").textContent = catalog.monitors[state.monitor].name;
    $("summary-wiring").textContent = catalog.wiring[state.wiring].name;
    $("summary-complexity").textContent = complexityName;
    $("compatibility-alerts").innerHTML = alerts.map((alert) => {
      const levelClass = alert.level === "good" ? "is-good" : alert.level === "critical" ? "is-critical" : "is-review";
      return `<li class="${levelClass}">${escapeText(alert.text)}</li>`;
    }).join("");

    saveLocal();
    if (scheduleProgress && userHasInteracted) scheduleProgressSave();
  }

  function saveLocal() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, loads: checkedValues("#load-options"), services: checkedValues("#service-options") }));
      sessionStorage.setItem(NOTES_KEY, $("builder-notes").value);
    } catch (_) {}
  }

  function readStoredBuild() {
    const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];
    for (const key of keys) {
      try {
        const stored = JSON.parse(localStorage.getItem(key) || "null");
        if (!stored) continue;
        stored.package = migratePackageKey(stored.package);
        if (!packages[stored.package]) continue;
        if (stored.wiring === "premium") stored.wiring = "platinum";
        if (stored.monitor === "premium") stored.monitor = stored.package === "platinum" ? "cerbo" : "one";
        if (stored.inverter === "charger3000" && stored.package === "platinum") stored.inverter = "multiplus12";
        if (stored.controller === "rover100" && stored.package === "platinum") stored.controller = "smartsolar100";
        if (stored.battery === "heated300" && stored.package === "platinum") stored.battery = "victron200";
        if (stored.panel === "shadow200" && stored.package === "platinum") stored.panel = "engineered200";
        return stored;
      } catch (_) {}
    }
    return null;
  }

  function loadLocal() {
    const stored = readStoredBuild();
    if (!stored) return false;
    Object.assign(state, stored);
    syncInputs();
    all("#load-options input").forEach((input) => { input.checked = (stored.loads || []).includes(input.value); });
    all("#service-options input").forEach((input) => { input.checked = (stored.services || []).includes(input.value); });
    try { $("builder-notes").value = sessionStorage.getItem(NOTES_KEY) || ""; } catch (_) { $("builder-notes").value = ""; }
    all("[data-package]").forEach((button) => {
      const selected = button.dataset.package === state.package;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    return true;
  }

  function buildData() {
    const m = metrics();
    const loads = checkedValues("#load-options");
    const services = checkedValues("#service-options");
    const alerts = compatibility(m, loads);
    const snapshot = powerSnapshot(m, loads);
    const recommendation = recommendedSystem(snapshot, loads);
    return {
      package: packages[state.package]?.label || "Custom System",
      ecosystem: ecosystem(m),
      classification: classification(m, loads),
      complexity: complexity(m, services, alerts),
      panel: `${state.panelQty} × ${m.panel.name} (${m.arrayWatts}W total)`,
      battery: `${state.batteryQty} × ${m.battery.name} (${m.batteryAh}Ah / ${m.batteryKwh.toFixed(2)}kWh nominal)`,
      inverter: m.inverter.name,
      controller: m.controller.name,
      alternator: catalog.alternators[state.alternator].name,
      shore: catalog.shore[state.shore].name,
      monitoring: catalog.monitors[state.monitor].name,
      wiring: catalog.wiring[state.wiring].name,
      loads,
      powerPlan: {
        usageProfile: state.usageProfile,
        usageMultiplier: snapshot.usageMultiplier,
        reserveDays: snapshot.reserveDays,
        estimatedDailyUsageKwh: Number(snapshot.estimatedUsageKwh.toFixed(2)),
        recommendedSolarWatts: Math.round(snapshot.recommendedSolarWatts),
        requiredBatteryKwh: Number(snapshot.requiredBatteryKwh.toFixed(2)),
        peakNeedWatts: snapshot.peakNeedWatts,
        recommendedStartingPackage: recommendation ? packages[recommendation.applyKey].label : "Not calculated",
        customReviewRecommended: Boolean(recommendation?.beyondPackages),
      },
      services,
      alerts: alerts.map((item) => item.text),
      estimatedDailySolar: `${snapshot.dailySolarKwh.toFixed(1)} kWh/day`,
      usableBatteryReserve: `${snapshot.usableBatteryKwh.toFixed(1)} kWh`,
      estimatedDailyUsage: snapshot.hasUsage ? `${snapshot.estimatedUsageKwh.toFixed(1)} kWh/day` : "Loads not selected",
      estimatedEnergyBalance: snapshot.balanceKwh === null ? "Loads not selected" : `${snapshot.balanceKwh >= 0 ? "+" : ""}${snapshot.balanceKwh.toFixed(1)} kWh/day`,
      powerUseContext: snapshot.capability,
      notes: $("builder-notes").value.trim() || "Not specified"
    };
  }

  function referenceNumber() {
    const now = new Date();
    const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const bytes = new Uint8Array(5);
    crypto.getRandomValues(bytes);
    const random = [...bytes].map((byte) => byte.toString(36).padStart(2, "0")).join("").slice(0, 7).toUpperCase();
    return `EUS-SOLAR-${date}-${random}`;
  }

  function ensureReference() {
    if (!activeReference) activeReference = referenceNumber();
    return activeReference;
  }

  function guidedProjectContext() {
    try {
      const params = new URLSearchParams(location.search);
      const chosenRegion = document.querySelector('input[name="start-region"]:checked')?.value || "";
      const chosenState = chosenRegion === "OTHER" ? $("start-other-state")?.value : chosenRegion;
      const city = ($("start-city")?.value || params.get("projectCity") || "").trim().slice(0, 120);
      const zipMatch = ($("start-zip")?.value || params.get("projectZip") || "").match(/\d{5}/);
      const stateCode = (chosenState || params.get("projectState") || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
      return city && zipMatch && /^[A-Z]{2}$/.test(stateCode) ? { city, zip: zipMatch[0], state: stateCode, source: builderEntrySource() } : null;
    } catch (_) { return null; }
  }

  function milestoneData(kind, extra = {}) {
    return { kind, currentStep: currentBuilderStep, progressPercent: currentBuilderProgress, ...extra };
  }

  async function postSolarNotification(eventType, reference, build, contact = null, website = "", milestone = null) {
    const response = await fetch("/api/solar-build-notify", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      credentials: "same-origin",
      keepalive: eventType !== "builder_progress",
      body: JSON.stringify({ eventType, reference, build, contact, milestone: milestone || milestoneData(eventType), page: location.href, createdAt: new Date().toISOString(), website, sessionId: window.EUSIntent?.sessionId?.() || "", journeyId: ensureJourneyId(), projectContext: guidedProjectContext() })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.ok) {
      const error = new Error(result.error || "Lead delivery failed.");
      error.status = response.status;
      error.result = result;
      throw error;
    }
    return result;
  }

  function validSolarReference(value) {
    return /^EUS-SOLAR-\d{8}-[A-Z0-9]{6,12}$/.test(String(value || "").trim());
  }

  function builderUnlocked() {
    return Boolean(leadContact || leadReferenceVerified);
  }

  function persistResumeReference(reference) {
    if (!validSolarReference(reference)) return;
    try { localStorage.setItem(REFERENCE_KEY, JSON.stringify({ reference, updatedAt: new Date().toISOString() })); } catch (_) {}
    try {
      const url = new URL(location.href);
      url.searchParams.set("solarRef", reference);
      history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
    } catch (_) {}
  }

  function clearResumeReference() {
    try { localStorage.removeItem(REFERENCE_KEY); } catch (_) {}
    try {
      const url = new URL(location.href);
      url.searchParams.delete("solarRef");
      history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
    } catch (_) {}
  }

  function resumeReferenceCandidate(params) {
    const requested = String(params.get("solarRef") || "").trim();
    if (validSolarReference(requested)) return requested;
    if (params.get("journey")) return "";
    try {
      const stored = JSON.parse(localStorage.getItem(REFERENCE_KEY) || "null");
      return validSolarReference(stored?.reference) ? stored.reference : "";
    } catch (_) { return ""; }
  }

  async function resumeStoredLead(params) {
    const reference = resumeReferenceCandidate(params);
    if (!reference) return false;
    activeReference = reference;
    try {
      const result = await postSolarNotification("builder_progress", reference, buildData(), null, "", { kind:"return_session" });
      if (!result.stored) return false;
      leadReferenceVerified = true;
      persistResumeReference(reference);
      return true;
    } catch (error) {
      if (error?.status === 409) {
        clearResumeReference();
        activeReference = "";
      }
      console.warn("Solar Lead reference could not be resumed:", error);
      return false;
    }
  }

  function recordSummaryViewed() {
    if (summaryMilestoneRecorded || !builderUnlocked() || !activeReference) return;
    summaryMilestoneRecorded = true;
    const build = buildData();
    intentTrack("build_summary_viewed", state.package, { package: state.package, classification: build.classification });
    void postSolarNotification("builder_progress", activeReference, build, leadContact, "", milestoneData("summary_viewed", { summaryViewed:true }))
      .catch((error) => { summaryMilestoneRecorded = false; console.warn("Solar summary milestone was not saved:", error); });
  }

  function normalizedStarterContact() {
    const contactValue = $("start-contact").value.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue);
    const phoneDigits = contactValue.replace(/\D/g, "");
    if (!isEmail && phoneDigits.length < 7) throw new Error("Enter a valid phone number or email address.");
    const context = guidedProjectContext();
    if (!context) throw new Error("Choose Colorado, Idaho, or Another State and enter a valid city and 5-digit ZIP.");
    return { name:"", firstName:"", phone:isEmail?"":contactValue, email:isEmail?contactValue:"", preferred:"", consent:$("start-consent").checked, location:`${context.city}, ${context.state} ${context.zip}`, rv:"", timing:"", installLocation:"", available:"", details:"" };
  }

  function prefillStarterLocation(params) {
    const stateCode = (params.get("projectState") || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2);
    const city = (params.get("projectCity") || "").trim().slice(0, 120);
    const zip = (params.get("projectZip") || "").match(/\d{5}/)?.[0] || "";
    if (city && $("start-city")) $("start-city").value = city;
    if (zip && $("start-zip")) $("start-zip").value = zip;
    if (!/^[A-Z]{2}$/.test(stateCode)) return;
    const regionValue = ["CO", "ID"].includes(stateCode) ? stateCode : "OTHER";
    const region = document.querySelector(`input[name="start-region"][value="${regionValue}"]`);
    if (region) region.checked = true;
    all(".builder-region-gate label").forEach((option) => option.classList.toggle("is-selected", option.contains(region)));
    const other = regionValue === "OTHER";
    if ($("start-other-state-label")) $("start-other-state-label").hidden = !other;
    if ($("start-other-state")) { $("start-other-state").disabled = !other; $("start-other-state").required = other; $("start-other-state").value = other ? stateCode : ""; }
    syncStarterRegion();
  }

  function selectedStarterRegion() {
    return document.querySelector('input[name="start-region"]:checked')?.value || "";
  }

  function syncStarterRegion() {
    const value = selectedStarterRegion();
    const other = value === "OTHER";
    const label = $("start-other-state-label");
    const field = $("start-other-state");
    if (label) label.hidden = !other;
    if (field) {
      field.required = other;
      field.disabled = !other;
      if (!other) field.value = "";
    }
    all(".builder-region-gate label").forEach((option) => {
      const input = option.querySelector('input[name="start-region"]');
      option.classList.toggle("is-selected", Boolean(input?.checked));
    });
    if ($("builder-region-continue")) $("builder-region-continue").disabled = !value;
    if ($("builder-region-summary")) $("builder-region-summary").textContent = START_REGION_LABELS[value] || "—";
  }

  function setStarterStep(step, { focus = true } = {}) {
    const target = step === "details" ? "details" : "region";
    all("[data-start-step]").forEach((panel) => {
      const active = panel.dataset.startStep === target;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });
    all("[data-start-step-indicator]").forEach((indicator) => {
      const name = indicator.dataset.startStepIndicator;
      indicator.classList.toggle("is-active", name === target);
      indicator.classList.toggle("is-complete", target === "details" && name === "region");
    });
    if ($("builder-start-title")) $("builder-start-title").textContent = target === "details" ? "Save this Solar plan." : "Where will this system be used?";
    if ($("builder-start-copy")) $("builder-start-copy").textContent = target === "details"
      ? "Add the location and one way to reach you. The guided Builder then opens with one saved Lead reference."
      : "Choose the project area first. We use it to route the same saved Solar plan to the right market.";
    if (!focus) return;
    setTimeout(() => {
      const targetElement = target === "details" ? $("start-city") : document.querySelector('input[name="start-region"]:checked') || document.querySelector('input[name="start-region"]');
      targetElement?.focus();
    }, 0);
  }

  function continueStarterRegion() {
    const selected = document.querySelector('input[name="start-region"]:checked');
    if (!selected) {
      document.querySelector('input[name="start-region"]')?.reportValidity();
      return;
    }
    syncStarterRegion();
    setStarterStep("details");
  }

  function ensureJourneyId() {
    try {
      const params = new URLSearchParams(location.search);
      const requested = params.get("journey");
      const validRequested = requested && /^[A-Za-z0-9_-]{8,100}$/.test(requested) ? requested : "";
      let value = sessionStorage.getItem(JOURNEY_KEY);
      // An explicit journey from Start a Project is authoritative. This keeps a new
      // customer/build journey from inheriting a prior Solar contact gate.
      if (validRequested && validRequested !== value) value = validRequested;
      if (!value) value = globalThis.crypto?.randomUUID?.() || `journey-${Date.now()}-${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem(JOURNEY_KEY, value);
      return value;
    } catch (_) { return `journey-${Date.now()}-${Math.random().toString(36).slice(2)}`; }
  }

  function storeStarterContact(contact, reference) {
    try { sessionStorage.setItem(CONTACT_KEY, JSON.stringify({ contact, reference, journeyId: ensureJourneyId(), createdAt: new Date().toISOString() })); } catch (_) {}
  }

  function purgeLegacyLocalPii() {
    for (const key of LEGACY_PII_KEYS) {
      try { localStorage.removeItem(key); } catch (_) {}
    }
    for (const key of [STORAGE_KEY, ...LEGACY_STORAGE_KEYS]) {
      try {
        const stored = JSON.parse(localStorage.getItem(key) || "null");
        if (!stored || typeof stored !== "object" || !("notes" in stored)) continue;
        delete stored.notes;
        localStorage.setItem(key, JSON.stringify(stored));
      } catch (_) {}
    }
  }

  function loadStarterContact() {
    try {
      const stored = JSON.parse(sessionStorage.getItem(CONTACT_KEY) || "null");
      const journeyId = ensureJourneyId();
      if (!stored?.contact || (!stored.contact.phone && !stored.contact.email) || !stored.reference || stored.journeyId !== journeyId) return false;
      leadContact = stored.contact;
      activeReference = stored.reference;
      leadReferenceVerified = true;
      persistResumeReference(activeReference);
      prefillFinalContact();
      return true;
    } catch (_) { return false; }
  }

  function showStartWall() {
    const wall = $("builder-start-wall");
    if (!wall || builderUnlocked()) return;
    wall.hidden = false;
    document.body.classList.add("body-no-scroll");
    syncStarterRegion();
    setStarterStep(selectedStarterRegion() ? "details" : "region");
  }

  function closeStartWall() {
    $("builder-start-wall").hidden = true;
    document.body.classList.remove("body-no-scroll");
    $("start-building")?.focus();
  }

  async function submitStart(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = $("start-send-status");
    const submit = $("builder-start-submit");
    if (!document.querySelector('[data-start-step="region"]')?.hidden) {
      continueStarterRegion();
      return;
    }
    if (!form.checkValidity()) { form.reportValidity(); return; }

    let contact;
    try { contact = normalizedStarterContact(); }
    catch (error) {
      status.hidden = false; status.className = "contact-send-status is-error"; status.textContent = error.message; return;
    }

    const reference = ensureReference();
    status.hidden = false;
    status.className = "contact-send-status";
    status.textContent = "Saving your Solar lead and build reference…";
    submit.disabled = true;
    submit.textContent = "Saving Build…";

    try {
      const result = await postSolarNotification("builder_started", reference, buildData(), contact, $("start-website").value, milestoneData("build_started"));
      leadContact = contact;
      leadReferenceVerified = true;
      storeStarterContact(contact, reference);
      persistResumeReference(reference);
      prefillFinalContact();
      closeStartWall();
      userHasInteracted = true;
      const projectContext = guidedProjectContext();
      intentTrack("solar_builder_entry", "builder", { package: state.package, source:builderEntrySource(), state:projectContext?.state || "" });
      showBuilderScene(currentBuilderStep || "needs");
      $("builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
      if (result.stored && !result.notificationQueued) console.warn("Solar Lead stored; owner notification is not currently queued.");
    } catch (error) {
      status.className = "contact-send-status is-error";
      status.textContent = "We could not save your contact information. Please try again or call Casey at 208-813-4998.";
      console.error(error);
    } finally {
      submit.disabled = false;
      submit.textContent = "Save Plan & Open Builder";
    }
  }

  function scheduleProgressSave(kind = "progress_saved") {
    if (!builderUnlocked() || !activeReference) return;
    clearTimeout(progressTimer);
    progressTimer = window.setTimeout(() => {
      const notesSaved = kind === "notes_saved" && Boolean($("builder-notes").value.trim());
      void postSolarNotification("builder_progress", activeReference, buildData(), leadContact, "", milestoneData(kind, { notesSaved })).catch((error) => console.warn("Solar build progress was not saved:", error));
    }, 1800);
  }

  function contactData() {
    const raw = (id) => $(id).value.trim();
    const fallback = (value) => value || "Not specified";
    const projectType = fallback(raw("lead-project-type"));
    const projectDetails = fallback(raw("lead-project-details"));
    return {
      name: fallback(raw("lead-name") || leadContact?.name || ""),
      firstName: fallback(raw("lead-name") || leadContact?.name || "").split(/\s+/)[0],
      phone: raw("lead-phone") || leadContact?.phone || "",
      email: raw("lead-email") || leadContact?.email || "",
      location: fallback(raw("lead-location")),
      rv: `${projectType} — ${projectDetails}`,
      projectType,
      projectDetails,
      preferred: fallback(raw("lead-contact")),
      timing: fallback(raw("lead-timing")),
      installLocation: fallback(raw("lead-install-location")),
      available: fallback(raw("lead-available")),
      details: fallback(raw("lead-details")),
      consent: $("lead-consent").checked
    };
  }

  function prefillFinalContact() {
    if (!leadContact) return;
    const projectContext = guidedProjectContext();
    if (projectContext && !$("lead-location").value) $("lead-location").value = `${projectContext.city}, ${projectContext.state} ${projectContext.zip}`;
    if (!$("lead-location").value && leadContact.location) $("lead-location").value = leadContact.location;
    if (!$("lead-name").value) $("lead-name").value = leadContact.name || "";
    if (!$("lead-phone").value) $("lead-phone").value = leadContact.phone || "";
    if (!$("lead-email").value) $("lead-email").value = leadContact.email || "";
    if (leadContact.preferred) $("lead-contact").value = leadContact.preferred;
  }

  function formatSubmission(reference, contact, build) {
    return [
      "ELEVATION UPSCALES — SOLAR SYSTEM BUILD",
      `Reference: ${reference}`,
      "",
      "CUSTOMER",
      `Name: ${contact.name}`,
      `Phone: ${contact.phone || "Not specified"}`,
      `Email: ${contact.email || "Not specified"}`,
      `Location: ${contact.location}`,
      `Project: ${contact.rv}`,
      `Preferred contact: ${contact.preferred}`,
      `Project timing: ${contact.timing}`,
      `Installation location: ${contact.installLocation}`,
      `Available for inspection: ${contact.available}`,
      `Existing equipment/issues: ${contact.details}`,
      "",
      "PRELIMINARY SYSTEM",
      `Starting package: ${build.package}`,
      `Equipment ecosystem: ${build.ecosystem}`,
      `Classification: ${build.classification}`,
      `Complexity: ${build.complexity}`,
      `Panels: ${build.panel}`,
      `Battery bank: ${build.battery}`,
      `Inverter: ${build.inverter}`,
      `Solar controller: ${build.controller}`,
      `Alternator charging: ${build.alternator}`,
      `Shore power: ${build.shore}`,
      `Monitoring: ${build.monitoring}`,
      `Wiring/protection: ${build.wiring}`,
      `Loads: ${build.loads.join(", ") || "Not specified"}`,
      `Additional services: ${build.services.join(", ") || "None selected"}`,
      `Customer goals/notes: ${build.notes}`,
      "",
      "REVIEW FLAGS",
      ...(build.alerts.length ? build.alerts.map((alert) => `- ${alert}`) : ["- None generated"]),
      "",
      `Created: ${new Date().toLocaleString()}`,
      `Referral page: ${location.href}`,
      "",
      "Final design, compatibility, installation scope, product availability, labor, and pricing require professional review."
    ].join("\n");
  }

  function openWall() {
    closeMobileSummary();
    if (!builderUnlocked()) { showStartWall(); return; }
    const reference = ensureReference();
    const build = buildData();
    recordSummaryViewed();
    intentTrack("review_opened", state.package, { package: state.package, classification: build.classification });
    prefillFinalContact();
    $("contact-wall").hidden = false;
    document.body.classList.add("body-no-scroll");
    setTimeout(() => $("lead-location")?.focus(), 0);

    const sessionKey = `eus-solar-review-notified-${reference}`;
    let alreadyNotified = false;
    try { alreadyNotified = Boolean(sessionStorage.getItem(sessionKey)); } catch (_) {}
    if (!alreadyNotified) {
      try { sessionStorage.setItem(sessionKey, "pending"); } catch (_) {}
      void postSolarNotification("review_opened", reference, build, leadContact, "", milestoneData("review_opened", { summaryViewed:true, reviewOpened:true }))
        .then(() => { try { sessionStorage.setItem(sessionKey, "sent"); } catch (_) {} })
        .catch((error) => { try { sessionStorage.removeItem(sessionKey); } catch (_) {} console.warn("Solar review notification was not delivered:", error); });
    }
  }

  function closeWall() {
    $("contact-wall").hidden = true;
    document.body.classList.remove("body-no-scroll");
    $("review-build")?.focus();
  }

  async function submitContact(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const reference = ensureReference();
    const build = buildData();
    const contact = contactData();
    const submission = formatSubmission(reference, contact, build);
    intentTrack("submit_attempt", state.package, { package: state.package, classification: build.classification });
    if (qaMode) {
      $("submission-reference").textContent = reference;
      $("final-build-summary").textContent = submission;
      $("contact-form-view").hidden = true;
      $("contact-result-view").hidden = false;
      $("contact-result-title").textContent = "TEST — DO NOT PUBLISH";
      $("contact-result-note").textContent = "Protected QA mode validated the full Builder and review experience. Production lead storage and notification were intentionally suppressed.";
      return;
    }
    const submitButton = $("contact-submit");
    const status = $("contact-send-status");

    submitButton.disabled = true;
    submitButton.textContent = "Submitting Build…";
    status.hidden = false;
    status.className = "contact-send-status";
    status.textContent = "Submitting your Solar build to Elevation UpScales…";

    let delivered = false;
    let stored = false;
    try {
      const result = await postSolarNotification("lead_submitted", reference, build, contact, "", milestoneData("completed_submitted", { summaryViewed:true, reviewOpened:true }));
      delivered = Boolean(result.emailDelivered);
      stored = Boolean(result.stored);
      if (!stored) throw new Error("Submission storage was not confirmed.");

      leadContact = contact;
      leadReferenceVerified = true;
      try { sessionStorage.removeItem(CONTACT_KEY); } catch (_) {}
      clearResumeReference();
      status.classList.add("is-success");
      status.textContent = `Submitted for Review. Reference: ${reference}`;

      $("submission-reference").textContent = reference;
      $("final-build-summary").textContent = submission;
      $("send-build-text").href = `sms:+12088134998?body=${encodeURIComponent(submission)}`;
      $("send-build-email").href = `mailto:casey@elevationupscales.com?subject=${encodeURIComponent(`Solar Build ${reference}`)}&body=${encodeURIComponent(submission)}`;
      $("contact-form-view").hidden = true;
      $("contact-result-view").hidden = false;
      $("contact-result-title").textContent = "Submitted for Review";
      $("contact-result-note").textContent = `Your Solar build has been submitted to Elevation UpScales for review. Reference: ${reference}. Your Lead is stored in the same build record. Text, email, and call are optional follow-up actions.`;
      try { sessionStorage.setItem(LEAD_RESULT_KEY, JSON.stringify({ reference, delivered, stored, createdAt: new Date().toISOString() })); } catch (_) {}
    } catch (error) {
      status.classList.add("is-error");
      status.textContent = "We could not confirm that your Solar build was stored. Please try Send Build for Review again. Text, email, and call are not required to submit a Solar lead.";
      console.error(error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Build for Review";
    }
  }

  function resetBuild() {
    if (!window.confirm("Reset the solar builder to the Standard package? Your saved contact and reference will remain connected to this lead.")) return;
    all("#load-options input, #service-options input").forEach((input) => { input.checked = false; });
    $("builder-notes").value = "";
    state.usageProfile = "custom";
    state.usageMultiplier = 1;
    state.reserveDays = 1;
    try { localStorage.removeItem(STORAGE_KEY); sessionStorage.removeItem(NOTES_KEY); } catch (_) {}
    applyPackage("standard");
    userHasInteracted = true;
    scheduleProgressSave();
    showBuilderScene("needs", { focus:true });
  }

  function guardBuilderInteraction(event) {
    if (builderUnlocked()) return;
    if (event.target.closest("#builder-start-wall")) return;
    event.preventDefault();
    event.stopPropagation();
    showStartWall();
  }

  async function activateQaMode(params) {
    const token = params.get("qaToken");
    if (params.get("qa") !== "1" || !token) return false;
    try {
      const response = await fetch("/api/solar/qa-validate", { method:"POST", credentials:"same-origin", headers:{"Content-Type":"application/json","Accept":"application/json"}, body:JSON.stringify({qaToken:token}) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.valid) return false;
      qaMode = true;
      const journeyId = data.journeyId || ensureJourneyId();
      try { sessionStorage.setItem(JOURNEY_KEY, journeyId); } catch (_) {}
      activeReference = data.reference;
      leadContact = data.contact;
      leadReferenceVerified = true;
      storeStarterContact(leadContact, activeReference);
      persistResumeReference(activeReference);
      prefillFinalContact();
      const banner = $("solar-qa-banner"); if (banner) banner.hidden = false;
      return true;
    } catch (_) { return false; }
  }

  function bind() {
    all("[data-usage-profile]").forEach((button) => button.addEventListener("click", () => applyUsageProfile(button.dataset.usageProfile)));
    all("[data-package]").forEach((button) => button.addEventListener("click", () => { userHasInteracted = true; applyPackage(button.dataset.package, true); const m=metrics(),loads=checkedValues("#load-options"); intentTrack("package_selected", button.dataset.package, { package: button.dataset.package, arrayWatts:m.arrayWatts, batteryKwh:Number(m.batteryKwh.toFixed(2)), inverterWatts:m.inverter.watts, classification:classification(m,loads) }); scheduleProgressSave("package_selected"); }));
    all("select", $("builder")).forEach((select) => select.addEventListener("change", () => { userHasInteracted = true; update(true); }));
    all("#load-options input").forEach((input) => input.addEventListener("change", () => { state.usageProfile = "custom"; syncUsageProfileButtons(); userHasInteracted = true; update(true); }));
    all("#service-options input").forEach((input) => input.addEventListener("change", () => { userHasInteracted = true; update(true); }));
    $("apply-power-recommendation")?.addEventListener("click", () => {
      const key = $("apply-power-recommendation").dataset.recommendPackage;
      if (!packages[key]) return;
      userHasInteracted = true;
      applyPackage(key);
      const snapshot = powerSnapshot(metrics(), checkedValues("#load-options"));
      intentTrack("solar_power_recommendation_applied", key, { package:key, estimatedDailyUsageKwh:Number(snapshot.estimatedUsageKwh.toFixed(2)), reserveDays:snapshot.reserveDays, peakNeedWatts:snapshot.peakNeedWatts });
      scheduleProgressSave("power_recommendation_applied");
      showBuilderScene("packages", { focus:true });
    });
    $("builder-notes").addEventListener("input", () => { userHasInteracted = true; saveLocal(); scheduleProgressSave("notes_saved"); });
    [$("panel-qty"), $("battery-qty")].forEach((input) => input.addEventListener("input", () => { userHasInteracted = true; update(true); }));
    all("[data-qty]").forEach((button) => button.addEventListener("click", () => {
      userHasInteracted = true;
      const target = button.dataset.qty === "panel" ? $("panel-qty") : $("battery-qty");
      const max = Number(target.max); const min = Number(target.min);
      target.value = Math.min(max, Math.max(min, Number(target.value || 0) + Number(button.dataset.change)));
      update(true);
    }));
    all("[data-jump]").forEach((button) => button.addEventListener("click", () => showBuilderScene(button.dataset.jump, { focus:true })));
    $("builder-stage-toggle")?.addEventListener("click", toggleBuilderStageNav);
    $("builder-scene-back")?.addEventListener("click", () => moveBuilderScene(-1));
    $("builder-scene-next")?.addEventListener("click", () => moveBuilderScene(1));
    all('input[name="start-region"]').forEach((input) => input.addEventListener("change", syncStarterRegion));
    $("builder-region-continue")?.addEventListener("click", continueStarterRegion);
    $("builder-details-back")?.addEventListener("click", () => setStarterStep("region"));
    $("start-building")?.addEventListener("click", (event) => { if (!builderUnlocked()) { event.preventDefault(); showStartWall(); } });
    $("review-build").addEventListener("click", openWall);
    $("review-build-bottom")?.addEventListener("click", openWall);
    $("mobile-summary-toggle")?.addEventListener("click", toggleMobileSummary);
    $("mobile-summary-close")?.addEventListener("click", closeMobileSummary);
    $("reset-build").addEventListener("click", resetBuild);
    $("builder-start-form").addEventListener("submit", submitStart);
    all("[data-close-start-wall]").forEach((element) => element.addEventListener("click", closeStartWall));
    all("[data-close-wall]").forEach((element) => element.addEventListener("click", closeWall));
    $("contact-wall-form").addEventListener("submit", submitContact);
    $("builder").addEventListener("click", guardBuilderInteraction, true);
    $("builder").addEventListener("change", guardBuilderInteraction, true);
    $("builder").addEventListener("input", guardBuilderInteraction, true);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !$("contact-wall").hidden) closeWall();
      if (event.key === "Escape" && !$("builder-start-wall").hidden) closeStartWall();
      if (event.key === "Escape") { closeMobileSummary(); closeBuilderStageNav(); }
      if ((event.key === "ArrowLeft" || event.key === "ArrowRight") && document.body.classList.contains("is-builder-active") && $("contact-wall").hidden && $("builder-start-wall").hidden && !event.target.closest("input, select, textarea, button, a")) {
        event.preventDefault();
        moveBuilderScene(event.key === "ArrowRight" ? 1 : -1);
      }
    });

    const snapshotSection = $("power-snapshot");
    if (snapshotSection) {
      let snapshotTracked = false;
      const snapshotObserver = new IntersectionObserver((entries) => {
        if (snapshotTracked || !entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)) return;
        snapshotTracked = true;
        const m=metrics(),loads=checkedValues("#load-options"),snap=powerSnapshot(m,loads);
        intentTrack("power_snapshot_viewed", state.package, { package:state.package, arrayWatts:m.arrayWatts, batteryKwh:Number(m.batteryKwh.toFixed(2)), inverterWatts:m.inverter.watts, dailySolarKwh:Number(snap.dailySolarKwh.toFixed(2)), estimatedUsageKwh:Number(snap.estimatedUsageKwh.toFixed(2)), classification:classification(m,loads) });
        if (builderUnlocked() && activeReference) void postSolarNotification("builder_progress", activeReference, buildData(), leadContact, "", milestoneData("power_snapshot_viewed", { powerSnapshotViewed:true })).catch((error) => console.warn("Solar Power Snapshot milestone was not saved:", error));
        snapshotObserver.disconnect();
      }, { threshold: [0.35] });
      snapshotObserver.observe(snapshotSection);
    }

    const builderSection = $("builder");
    if (builderSection) {
      const builderVisibility = new IntersectionObserver((entries) => {
        const active = Boolean(entries[0]?.isIntersecting);
        document.body.classList.toggle("is-builder-active", active);
        if (!active) closeMobileSummary();
      }, { threshold: 0, rootMargin: "0px 0px -12% 0px" });
      builderVisibility.observe(builderSection);
    }

  }

  document.addEventListener("DOMContentLoaded", async () => {
    purgeLegacyLocalPii();
    initializeSelects();
    const params = new URLSearchParams(location.search);
    prefillStarterLocation(params);
    ensureJourneyId();
    intentTrack("solar_builder_opened", "builder", { source:builderEntrySource() });
    const requested = migratePackageKey(params.get("package"));
    if (requested && packages[requested]) applyPackage(requested);
    else if (!loadLocal()) applyPackage("standard");
    const requestedProfile = params.get("profile");
    if (requestedProfile && USAGE_PROFILES[requestedProfile]) applyUsageProfile(requestedProfile);
    const qaActivated = await activateQaMode(params);
    if (!qaActivated) {
      const restoredContact = loadStarterContact();
      if (!restoredContact) await resumeStoredLead(params);
    }
    bind();
    update(false);
    const hashStage = location.hash.startsWith("#builder-") ? location.hash.slice(9) : "needs";
    showBuilderScene(BUILDER_STAGES.some((stage) => stage.id === hashStage || stage.sections.includes(hashStage)) ? hashStage : "needs", { updateHash:false });
    if (params.get("start") === "1" && !builderUnlocked()) showStartWall();
    const year = $("year"); if (year) year.textContent = new Date().getFullYear();
  });
})();
