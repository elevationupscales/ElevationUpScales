(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const form = $("start-project-form");
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const INTENTS = Object.freeze({
    emergency_repair: { label: "Emergency Repair", family: "" },
    small_repair_handyman: { label: "Small Repair / Handyman", family: "home" },
    restoration_remodel_larger_project: { label: "Restoration / Remodel / Larger Project", family: "home" },
    rv: { label: "RV", family: "rv" },
    solar_off_grid: { label: "Solar / Off-Grid", family: "solar" },
  });
  const labels = {
    treasure_valley: "Boise / Treasure Valley",
    southern_colorado: "Colorado Springs / Peyton",
    denver_metro: "Denver Metro",
    outside_standard_area: "Outside Service Area",
    manual_review: "Location Needs Verification",
  };
  const resultCopy = {
    treasure_valley: "This location matched Elevation’s Treasure Valley service market.",
    southern_colorado: "This location matched Elevation’s Colorado Springs / Peyton service market.",
    denver_metro: "This location matched Elevation’s Denver Metro service market.",
    outside_standard_area: "This project is outside Elevation’s standard service markets. Management will verify project fit before making a service commitment.",
    manual_review: "Elevation needs to verify this location before assigning a service market.",
  };

  const state = {
    step: "location",
    projectType: "",
    intakeIntent: "",
    intakeIntentKey: "",
    serviceArea: "",
    serviceLabel: "",
    outside: false,
    outsideReviewRequested: params.get("outside") === "1",
    outsideReview: false,
    locationBranch: "",
    locationAcknowledged: false,
    solarBuilderAcknowledged: false,
    journeyId: "",
    source: params.get("source") || "start-a-project",
    reference: "",
    contactRequested: false,
  };

  const uuid = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const journeyKey = "eus-project-journey:v1";
  const requestedJourney = params.get("journey") || "";
  try {
    state.journeyId = /^[A-Za-z0-9_-]{8,120}$/.test(requestedJourney)
      ? requestedJourney
      : (sessionStorage.getItem(journeyKey) || uuid());
    sessionStorage.setItem(journeyKey, state.journeyId);
  } catch (_) {
    state.journeyId = uuid();
  }

  const track = (type, value = "", details = {}) => window.EUSIntent?.track?.(type, value, {
    ...details,
    journeyReference: state.journeyId,
    projectType: state.projectType,
    serviceArea: state.serviceArea,
  });

  let intakeTracked = false;
  let contactTracked = false;

  function show(step) {
    state.step = step;
    qsa("[data-step]").forEach((node) => { node.hidden = node.dataset.step !== step; });
    const order = ["location", "intent", "details", "contact", "review"];
    const index = order.indexOf(step);
    qsa("[data-progress]").forEach((node, i) => node.classList.toggle("is-active", i <= index));
    window.scrollTo({ top: Math.max(0, form.offsetTop - 120), behavior: "smooth" });
  }

  function markStarted() {
    if (intakeTracked) return;
    intakeTracked = true;
    track("intake_started", state.locationBranch === "OTHER" ? "outside_review" : (state.locationBranch || "project").toLowerCase());
  }

  function resetAreaResult() {
    state.serviceArea = "";
    state.serviceLabel = "";
    state.outside = false;
    state.locationAcknowledged = false;
    state.solarBuilderAcknowledged = false;
    const result = $("sap-area-result");
    result.hidden = true;
    result.textContent = "";
    const next = $("sap-details-next");
    if (next) next.textContent = "Continue";
  }

  function selectedStateName() {
    const code = $("sap-state").value;
    if (code === "CO") return "Colorado";
    if (code === "ID") return "Idaho";
    const option = $("sap-state-review")?.selectedOptions?.[0];
    return option?.value ? option.textContent.trim() : "Outside Area Review";
  }

  function renderSelectedState() {
    const target = $("sap-selected-state-summary");
    if (!target) return;
    target.textContent = state.outsideReview
      ? `Outside Area Review — ${selectedStateName()}`
      : selectedStateName();
  }

  function selectStateBranch(code) {
    if (code === "OTHER") {
      state.locationBranch = "OTHER";
      track("project_state_selected", "another_state");
      markStarted();
      const url = new URL("/other-ways-we-can-help", location.origin);
      url.searchParams.set("journey", state.journeyId);
      url.searchParams.set("source", "start-a-project");
      location.assign(url.pathname + url.search);
      return;
    }
    if (!['CO', 'ID'].includes(code)) return;
    state.locationBranch = code;
    state.outsideReviewRequested = false;
    state.outsideReview = false;
    $("sap-state").value = code;
    $("sap-state-review").value = "";
    qsa("[data-state-choice]").forEach((button) => button.classList.toggle("is-selected", button.dataset.stateChoice === code));
    track("project_state_selected", code === "CO" ? "colorado" : "idaho");
    markStarted();
    resetAreaResult();
    show("intent");
  }

  function beginOutsideReview() {
    state.locationBranch = "OTHER";
    state.outsideReview = true;
    state.outsideReviewRequested = true;
    $("sap-state").value = "";
    $("sap-state-gate").hidden = true;
    $("sap-outside-state-panel").hidden = false;
    track("outside_area_review_selected", "project_review");
    markStarted();
    show("location");
  }

  qsa("[data-state-choice]").forEach((button) => button.addEventListener("click", () => selectStateBranch(button.dataset.stateChoice)));
  $("sap-state-review").addEventListener("change", () => {
    $("sap-state").value = $("sap-state-review").value;
    resetAreaResult();
  });
  $("sap-outside-state-next").addEventListener("click", () => {
    const selected = $("sap-state-review").value;
    if (!selected) {
      alert("Choose the actual project state to continue the Outside Area Project Review.");
      return;
    }
    $("sap-state").value = selected;
    resetAreaResult();
    show("intent");
  });

  function setProjectFamily(projectType) {
    if (!['home', 'rv', 'solar'].includes(projectType)) return false;
    state.projectType = projectType;
    track("project_type_selected", projectType);
    return true;
  }

  function applyIntentDefaults() {
    if (state.intakeIntent === "Emergency Repair" && state.projectType === "home") $("home-urgency").value = "Urgent concern";
    if (state.intakeIntent === "Small Repair / Handyman" && state.projectType === "home" && !$("home-category").value) $("home-category").value = "General handyman / small repair";
  }

  function prepareDetails() {
    if (!state.projectType || !state.intakeIntent) return;
    const detailsLane = state.intakeIntent === "Small Repair / Handyman" ? "handyman" : state.projectType;
    qsa("[data-details]").forEach((node) => { node.hidden = node.dataset.details !== detailsLane; });
    const title = $("sap-details-title");
    if (state.intakeIntent === "Emergency Repair") title.textContent = state.projectType === "home" ? "Tell us what needs urgent attention at the property" : "Tell us what needs urgent attention on the RV";
    else if (state.intakeIntent === "Small Repair / Handyman") title.textContent = "Choose your Handyman service";
    else if (state.intakeIntent === "Restoration / Remodel / Larger Project") title.textContent = "Tell us about the restoration, remodel, or larger project";
    else if (state.projectType === "rv") title.textContent = "Tell us about the RV";
    else title.textContent = "Choose how you want Solar help";
    $("sap-emergency-details-call").hidden = state.intakeIntent !== "Emergency Repair";
    const handyman = state.intakeIntent === "Small Repair / Handyman";
    $("sap-contact-title").textContent = "How should we reach you?";
    $("sap-contact-next").textContent = handyman ? "Review" : "Review Project";
    $("sap-contact-submit").hidden = !handyman;
    $("sap-review-title").textContent = handyman ? "Review your service request" : "Review your project";
    $("sap-review-copy").textContent = handyman ? "Nothing is requested until you press Request Service and the server confirms Lead storage." : "Nothing is submitted until you press the final button and the server confirms storage.";
    $("sap-submit").textContent = handyman ? "Request Service" : "Submit Project";
    $("sap-success-eyebrow").textContent = handyman ? "Service Request Received" : "Project Submitted";
    $("sap-success-title").textContent = handyman ? "We have your service request." : "We have your project.";
    applyIntentDefaults();
    renderSelectedState();
    resetAreaResult();
    show("details");
  }

  function selectIntent(key) {
    const definition = INTENTS[key];
    if (!definition) return;
    state.intakeIntentKey = key;
    state.intakeIntent = definition.label;
    state.projectType = "";
    qsa("[data-intake-intent]").forEach((button) => button.classList.toggle("is-selected", button.dataset.intakeIntent === key));
    $("sap-emergency-panel").hidden = key !== "emergency_repair";
    track("intake_intent_selected", key);
    markStarted();
    if (definition.family && setProjectFamily(definition.family)) prepareDetails();
  }

  qsa("[data-intake-intent]").forEach((button) => button.addEventListener("click", () => selectIntent(button.dataset.intakeIntent)));
  qsa("[data-emergency-family]").forEach((button) => button.addEventListener("click", () => {
    qsa("[data-emergency-family]").forEach((item) => item.classList.toggle("is-selected", item === button));
    if (setProjectFamily(button.dataset.emergencyFamily)) prepareDetails();
  }));
  qsa("[data-emergency-call]").forEach((link) => link.addEventListener("click", () => {
    track("emergency_call_clicked", state.projectType || "unselected");
  }));

  qsa("[data-back]").forEach((button) => button.addEventListener("click", () => show(button.dataset.back)));

  async function classify() {
    const city = $("sap-city").value.trim();
    const zip = $("sap-zip").value.trim();
    const stateCode = $("sap-state").value.trim();
    if (!city || !zip || !stateCode) {
      const result = $("sap-area-result");
      result.hidden = false;
      result.textContent = "Enter the project city and ZIP to continue.";
      return null;
    }
    const response = await fetch("/api/project/classify", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ city, zip, state: stateCode }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "We could not classify that project location.");
    state.serviceArea = data.serviceArea;
    state.serviceLabel = labels[data.serviceArea] || "Location Needs Verification";
    state.outside = data.serviceArea === "outside_standard_area";
    const result = $("sap-area-result");
    result.hidden = false;
    result.innerHTML = `<strong>${state.serviceLabel}</strong><br><small>${resultCopy[data.serviceArea] || "Elevation will verify this location."}</small>`;
    track("service_area_classified", state.serviceArea, { source: "backend" });
    return data;
  }

  const HANDYMAN_MAX_PHOTOS = 3;
  const handymanServiceInputs = () => qsa("[data-handyman-service]");
  function handymanSelections() {
    return handymanServiceInputs().filter((input) => input.checked).map((input) => ({
      key: input.value,
      label: input.dataset.label || input.value,
      startingPrice: Number(input.dataset.price) || 0,
      priceLabel: input.dataset.priceLabel || (input.dataset.price ? "from $" + input.dataset.price : "Assessment Required"),
    }));
  }
  function handymanPricingClass() {
    const selected = handymanSelections();
    if (!selected.length) return "unselected";
    if (selected.length > 1) return "bundle_review";
    return selected[0].key === "general_multiple" ? "two_hour_block" : "starting_price";
  }
  function handymanSummaryText() {
    const selected = handymanSelections();
    const brief = $("handyman-summary").value.trim();
    const quantity = Math.max(1, Math.min(50, Number.parseInt($("handyman-quantity").value, 10) || 1));
    return brief || "Requested Handyman service: " + selected.map((item) => item.label).join(", ") + ". Quantity / count: " + quantity + ".";
  }
  function handymanDetails() {
    const selected = handymanSelections();
    return {
      ...routeDetails(),
      handyman: {
        requestedServices: selected.map((item) => ({ key: item.key, label: item.label, startingPrice: item.startingPrice, priceLabel: item.priceLabel })),
        quantity: Math.max(1, Math.min(50, Number.parseInt($("handyman-quantity").value, 10) || 1)),
        timing: $("handyman-timing").value,
        briefDetails: $("handyman-summary").value.trim(),
        pricingClass: handymanPricingClass(),
        pricingGuidance: { baseServiceVisit: 189, additionalLaborHourly: 129, twoHourBlock: 299, halfDayBlock: 549, materialsMarkupPercent: 25, urgentPremiumPercent: 25, extendedMarketTravelRange: "49-99" },
      },
    };
  }
  function renderHandymanPriceGuidance() {
    const selected = handymanSelections();
    const box = $("handyman-price-guidance");
    const bundle = $("handyman-bundle-note");
    handymanServiceInputs().forEach((input) => input.closest(".handyman-service-card")?.classList.toggle("is-selected", input.checked));
    bundle.hidden = selected.length < 2;
    if (!selected.length) {
      box.innerHTML = "<strong>Starting prices are shown on each service.</strong><p>Final price is confirmed before work begins.</p>";
      return;
    }
    if (selected.length === 1) {
      box.innerHTML = "<strong>" + selected[0].label + ": " + selected[0].priceLabel + "</strong><p>Final price is confirmed before work begins.</p>";
      return;
    }
    box.innerHTML = "<strong>" + selected.length + " services selected — bundled pricing review</strong><p>We’ll confirm the best service block before work begins.</p>";
  }
  function selectedHandymanFiles() {
    const files = [...($("handyman-photos")?.files || [])];
    return files.slice(0, HANDYMAN_MAX_PHOTOS);
  }
  async function uploadHandymanPhotos(reference) {
    const files = selectedHandymanFiles();
    if (!files.length || !reference) return { ok: true, uploaded: 0 };
    const formData = new FormData();
    formData.set("reference", reference);
    files.forEach((file) => formData.append("photos", file));
    const response = await fetch("/api/project/handyman-photos", { method: "POST", credentials: "same-origin", body: formData, headers: { Accept: "application/json" } });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "The service request was saved, but the optional photos could not be uploaded.");
    return data;
  }

  function detailsValid() {
    if (state.intakeIntent === "Small Repair / Handyman") return handymanSelections().length > 0;
    if (state.projectType === "home") return Boolean($("home-category").value && $("home-summary").value.trim());
    if (state.projectType === "rv") return Boolean($("rv-category").value && $("rv-summary").value.trim());
    if (state.projectType === "solar") return Boolean(!$("sap-solar-help-fields").hidden && $("solar-summary").value.trim());
    return false;
  }

  $("sap-city").addEventListener("input", resetAreaResult);
  $("sap-zip").addEventListener("input", resetAreaResult);

  $("sap-details-next").addEventListener("click", async () => {
    if (!detailsValid()) {
      alert(state.intakeIntent === "Small Repair / Handyman"
        ? "Select at least one Handyman service to continue."
        : state.projectType === "solar"
          ? "Choose REQUEST SOLAR HELP and describe what you need, or use BUILD MY SOLAR SYSTEM."
          : "Choose a project category and add a short description.");
      return;
    }
    try {
      const data = state.serviceArea ? { serviceArea: state.serviceArea } : await classify();
      if (!data) return;
      if (["manual_review", "outside_standard_area"].includes(state.serviceArea) && !state.locationAcknowledged) {
        state.locationAcknowledged = true;
        $("sap-details-next").textContent = "Continue to Contact";
        return;
      }
      show("contact");
    } catch (error) {
      const result = $("sap-area-result");
      result.hidden = false;
      result.textContent = error.message;
    }
  });

  handymanServiceInputs().forEach((input) => input.addEventListener("change", () => {
    renderHandymanPriceGuidance();
  }));
  $("handyman-photos").addEventListener("change", () => {
    const files = [...($("handyman-photos").files || [])];
    const target = $("handyman-photo-summary");
    target.textContent = files.length > HANDYMAN_MAX_PHOTOS
      ? "Only the first " + HANDYMAN_MAX_PHOTOS + " photos will be uploaded."
      : (files.length ? files.length + " optional photo" + (files.length === 1 ? "" : "s") + " selected." : "");
  });
  $("handyman-contact-me-toggle").addEventListener("click", () => {
    const panel = $("handyman-contact-me-panel");
    panel.hidden = !panel.hidden;
    if (!panel.hidden) $("handyman-fallback-email").focus();
  });
  $("handyman-contact-me-submit").addEventListener("click", async () => {
    const status = $("handyman-contact-me-status");
    const email = $("handyman-fallback-email").value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !$("handyman-fallback-consent").checked) {
      status.textContent = "Enter a valid email and confirm contact permission.";
      status.className = "sap-status is-error";
      return;
    }
    if (!handymanSelections().length) {
      status.textContent = "Select at least one Handyman service first.";
      status.className = "sap-status is-error";
      return;
    }
    const button = $("handyman-contact-me-submit");
    button.disabled = true;
    button.textContent = "Saving Lead…";
    status.textContent = "Saving what you selected…";
    status.className = "sap-status";
    try {
      const response = await fetch("/api/project/contact-request", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          projectType: "home",
          intakeIntent: "Small Repair / Handyman",
          state: $("sap-state").value.trim(),
          city: $("sap-city").value.trim(),
          zip: $("sap-zip").value.trim(),
          name: $("handyman-fallback-name").value.trim(),
          email,
          consent: true,
          journeyId: state.journeyId,
          reference: state.reference,
          sessionId: window.EUSIntent?.sessionId?.() || "",
          category: "Small Repairs & Handyman",
          summary: handymanSummaryText(),
          details: handymanDetails(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "We could not save the contact request.");
      state.reference = data.reference || state.reference;
      state.contactRequested = true;
      let photoNote = "";
      try {
        const photoResult = await uploadHandymanPhotos(state.reference);
        if (photoResult.uploaded) {
          photoNote = " " + photoResult.uploaded + " photo" + (photoResult.uploaded === 1 ? "" : "s") + " saved.";
          $("handyman-photos").value = "";
          $("handyman-photo-summary").textContent = photoResult.uploaded + " photo" + (photoResult.uploaded === 1 ? "" : "s") + " saved with this Lead.";
        }
      } catch (photoError) {
        photoNote = " " + photoError.message;
      }
      status.textContent = "Lead saved. We’ll contact you by email." + photoNote;
      status.className = "sap-status is-success";
    } catch (error) {
      status.textContent = error.message;
      status.className = "sap-status is-error";
    } finally {
      button.disabled = false;
      button.textContent = "Request Contact";
    }
  });
  renderHandymanPriceGuidance();

  $("sap-solar-help").addEventListener("click", () => {
    $("sap-solar-help-fields").hidden = false;
    $("sap-solar-help").classList.add("is-selected");
  });

  $("sap-solar-builder-link").addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      const data = state.serviceArea ? { serviceArea: state.serviceArea } : await classify();
      if (!data) return;
      if (["manual_review", "outside_standard_area"].includes(state.serviceArea) && !state.solarBuilderAcknowledged) {
        state.solarBuilderAcknowledged = true;
        const result = $("sap-area-result");
        result.hidden = false;
        result.insertAdjacentHTML("beforeend", "<br><small>Click Build My Solar System again to continue with this location flagged for management verification.</small>");
        return;
      }
      const url = new URL(event.currentTarget.href, location.origin);
      url.searchParams.set("journey", state.journeyId);
      url.searchParams.set("source", "start-a-project");
      url.searchParams.set("projectCity", $("sap-city").value.trim());
      url.searchParams.set("projectZip", $("sap-zip").value.trim());
      url.searchParams.set("projectState", $("sap-state").value.trim());
      location.assign(url.pathname + url.search);
    } catch (error) {
      const result = $("sap-area-result");
      result.hidden = false;
      result.textContent = error.message;
    }
  });

  let sapPreferredManual = false;
  const sapPreferredButtons = () => qsa("[data-sap-preferred]");
  function setSapPreferred(value, manual = false) {
    $("sap-preferred").value = value;
    sapPreferredButtons().forEach((button) => {
      const selected = button.dataset.sapPreferred === value;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (manual) sapPreferredManual = true;
  }
  function syncSapPreferred(source = "") {
    const phoneValid = $("sap-phone").value.replace(/\D/g, "").length >= 7;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("sap-email").value.trim());
    const current = $("sap-preferred").value;
    const compatible = current === "Email" ? emailValid : phoneValid;
    if (!compatible) {
      if (source === "email" && emailValid) { setSapPreferred("Email"); return; }
      if (source === "phone" && phoneValid) { setSapPreferred("Text message"); return; }
      if (phoneValid) { setSapPreferred("Text message"); return; }
      if (emailValid) setSapPreferred("Email");
      return;
    }
    if (!sapPreferredManual && source === "email" && emailValid) setSapPreferred("Email");
    else if (!sapPreferredManual && source === "phone" && phoneValid) setSapPreferred("Text message");
  }
  sapPreferredButtons().forEach((button) => button.addEventListener("click", () => setSapPreferred(button.dataset.sapPreferred, true)));
  $("sap-phone").addEventListener("input", () => syncSapPreferred("phone"));
  $("sap-email").addEventListener("input", () => syncSapPreferred("email"));

  function validContact() {
    const name = $("sap-name").value.trim();
    const phone = $("sap-phone").value.trim();
    const email = $("sap-email").value.trim();
    const phoneValid = phone.replace(/\D/g, "").length >= 7;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const preferred = $("sap-preferred").value;
    const preferredValid = preferred === "Email" ? emailValid : phoneValid;
    return Boolean(name && (phoneValid || emailValid) && preferredValid && $("sap-consent").checked);
  }

  function routeDetails() {
    return {
      locationRoute: state.outsideReview ? "outside_area_review" : "state_first",
      locationBranch: state.locationBranch,
      intakeIntent: state.intakeIntent,
    };
  }

  function payload() {
    const base = {
      projectType: state.projectType,
      intakeIntent: state.intakeIntent,
      city: $("sap-city").value.trim(),
      zip: $("sap-zip").value.trim(),
      state: $("sap-state").value.trim(),
      name: $("sap-name").value.trim(),
      phone: $("sap-phone").value.trim(),
      email: $("sap-email").value.trim(),
      preferredContact: $("sap-preferred").value,
      consent: $("sap-consent").checked,
      source: state.source,
      journeyId: state.journeyId,
      reference: state.reference,
      sessionId: window.EUSIntent?.sessionId?.() || "",
    };
    if (state.intakeIntent === "Small Repair / Handyman") return {
      ...base,
      category: "Small Repairs & Handyman",
      summary: handymanSummaryText(),
      details: handymanDetails(),
    };
    if (state.projectType === "home") return {
      ...base,
      category: $("home-category").value,
      summary: $("home-summary").value.trim(),
      details: { ...routeDetails(), urgency: $("home-urgency").value, assessment: $("home-assessment").value },
    };
    if (state.projectType === "rv") return {
      ...base,
      category: $("rv-category").value,
      summary: $("rv-summary").value.trim(),
      details: {
        ...routeDetails(),
        year: $("rv-year").value.trim() || "Not sure",
        make: $("rv-make").value.trim() || "Not sure",
        model: $("rv-model").value.trim() || "Not sure",
        rvType: $("rv-type").value,
        mobility: $("rv-mobility").value,
      },
    };
    return {
      ...base,
      category: $("solar-category").value,
      summary: $("solar-summary").value.trim(),
      details: {
        ...routeDetails(),
        systemType: $("solar-system-type").value,
        systemStatus: $("solar-status").value,
        timeline: $("solar-timeline").value,
        equipment: $("solar-equipment").value.trim(),
        route: "direct_help",
      },
    };
  }

  $("sap-contact-next").addEventListener("click", async () => {
    if (!validContact()) {
      alert("Enter your name, a usable phone number or email address that matches your contact choice, and confirm contact permission.");
      return;
    }
    const button = $("sap-contact-next");
    button.disabled = true;
    button.textContent = "Saving…";
    try {
      const response = await fetch("/api/project/capture-contact", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "We could not save this project contact.");
      state.reference = data.reference || state.reference;
      if (!contactTracked) {
        contactTracked = true;
        track("contact_captured", state.projectType, { contactMethod: $("sap-email").value.trim() ? "email" : "phone" });
      }
      renderReview();
      show("review");
    } catch (error) {
      alert(error.message);
    } finally {
      button.disabled = false;
      button.textContent = state.intakeIntent === "Small Repair / Handyman" ? "Review Service Request" : "Review Project";
    }
  });

  function renderReview() {
    const p = payload();
    if (state.intakeIntent === "Small Repair / Handyman") {
      const services = handymanSelections();
      $("sap-review").innerHTML = `<article><span>Service Request</span><strong>HANDYMAN — ${services.map((item) => item.label).join(", ")}</strong></article><article><span>Price Guidance</span><strong>${services.length > 1 ? "Bundled pricing review — starting prices are not added together" : services[0]?.priceLabel || "Assessment Required"}</strong></article><article><span>Location</span><strong>${p.city}, ${p.state} ${p.zip}\n${state.serviceLabel}</strong></article><article><span>Timing / Details</span><strong></strong></article><article><span>Contact</span><strong>${p.name}\n${p.phone || ""}${p.phone && p.email ? " · " : ""}${p.email || ""}</strong></article>`;
      $("sap-review").children[3].querySelector("strong").textContent = `${p.details.handyman.timing} · Quantity / count ${p.details.handyman.quantity}\n${p.summary}`;
      return;
    }
    const specific = state.projectType === "rv" ? `${p.details.year} ${p.details.make} ${p.details.model}` : p.category;
    $("sap-review").innerHTML = `<article><span>Project</span><strong>${state.projectType.toUpperCase()} — ${specific}</strong></article><article><span>Intake Intent</span><strong>${state.intakeIntent}</strong></article><article><span>Location</span><strong>${p.city}, ${p.state} ${p.zip}\n${state.serviceLabel}</strong></article><article><span>Project summary</span><strong></strong></article><article><span>Contact</span><strong>${p.name}\n${p.phone || ""}${p.phone && p.email ? " · " : ""}${p.email || ""}</strong></article>`;
    $("sap-review").children[3].querySelector("strong").textContent = p.summary;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const directHandymanSubmit = event.submitter?.id === "sap-contact-submit";
    const button = event.submitter || $("sap-submit");
    const status = directHandymanSubmit ? $("sap-contact-submit-status") : $("sap-submit-status");
    if (!validContact()) return;
    track("submit_attempt", state.projectType);
    button.disabled = true;
    button.textContent = "Submitting…";
    status.textContent = state.intakeIntent === "Small Repair / Handyman" ? "Storing your service request as a Lead…" : "Storing your project for management review…";
    status.className = "sap-status";
    try {
      const response = await fetch("/api/project/submit", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload()),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Project submission was not stored.");
      $("sap-reference").textContent = data.reference;
      if (state.intakeIntent === "Small Repair / Handyman") {
        let photoMessage = "";
        try {
          const photoResult = await uploadHandymanPhotos(data.reference);
          if (photoResult.uploaded) photoMessage = " " + photoResult.uploaded + " optional photo" + (photoResult.uploaded === 1 ? " was" : "s were") + " saved with the Lead.";
        } catch (photoError) {
          photoMessage = " Your Lead is saved. " + photoError.message;
        }
        $("sap-success-copy").textContent = data.serviceArea === "outside_standard_area" || data.serviceArea === "manual_review"
          ? "Your Handyman Lead is stored. Elevation will verify the service area before the next step." + photoMessage
          : "Your Handyman Lead is stored for follow-up. Elevation will confirm scope, scheduling, and final price before work begins." + photoMessage;
      } else $("sap-success-copy").textContent = data.serviceArea === "outside_standard_area"
        ? "Your project is stored for Outside Area Review. Elevation will verify project fit and the appropriate next step."
        : data.serviceArea === "manual_review"
          ? "Your project is stored and Elevation will verify the service area before assigning the next step."
          : "Your project is stored for management review.";
      show("success");
      status.classList.add("is-success");
    } catch (error) {
      status.textContent = error.message;
      status.classList.add("is-error");
    } finally {
      button.disabled = false;
      if (button.id === "sap-contact-submit") button.textContent = "Submit Request";
      else button.textContent = state.intakeIntent === "Small Repair / Handyman" ? "Request Service" : "Submit Project";
    }
  });

  qsa("input,select,textarea", form).forEach((element) => element.addEventListener("input", markStarted, { once: true }));
  track("start_project_open", "dedicated_page");
  if (state.outsideReviewRequested) beginOutsideReview();
  else show("location");

  const year = $("year");
  if (year) year.textContent = new Date().getFullYear();
})();
