/* Elevation UpScales — reusable customer follow-up request */
(() => {
  "use strict";

  const triggers = [...document.querySelectorAll("[data-followup-open]")];
  if (!triggers.length) return;

  const familyLabels = { home: "Home project", rv: "RV project", solar: "Solar / off-grid" };
  const validFamilies = new Set(Object.keys(familyLabels));
  const endpoint = "/api/project/follow-up-request";
  let returnFocus = null;
  let activeTrigger = null;

  const journeyKey = "eus-project-journey:v1";
  const fallbackId = () => {
    if (globalThis.crypto?.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
  };
  const journeyId = (() => {
    try {
      let value = sessionStorage.getItem(journeyKey);
      if (!value) { value = fallbackId(); sessionStorage.setItem(journeyKey, value); }
      return value;
    } catch (_) { return fallbackId(); }
  })();

  const modal = document.createElement("div");
  modal.className = "eus-followup";
  modal.id = "elevation-follow-up";
  modal.hidden = true;
  modal.innerHTML = `
    <button class="eus-followup__backdrop" type="button" data-followup-close aria-label="Close follow-up request"></button>
    <section class="eus-followup__dialog" role="dialog" aria-modal="true" aria-labelledby="eus-followup-title">
      <button class="eus-followup__close" type="button" data-followup-close aria-label="Close follow-up request">×</button>
      <div class="eus-followup__heading">
        <p class="eyebrow">Have Elevation Follow Up</p>
        <h2 id="eus-followup-title">Tell us the best way to reach you.</h2>
        <p>Send a short request and Casey will follow up about the next step.</p>
      </div>
      <form id="eus-followup-form" novalidate>
        <div class="eus-followup__grid">
          <label>Name<input id="eus-followup-name" name="name" autocomplete="name" maxlength="120" required></label>
          <label>Phone<input id="eus-followup-phone" name="phone" autocomplete="tel" inputmode="tel" maxlength="80" placeholder="Optional if email is provided"></label>
          <label>Email<input id="eus-followup-email" name="email" autocomplete="email" type="email" maxlength="180" placeholder="Optional if phone is provided"></label>
          <fieldset class="eus-followup__preference"><legend>Preferred contact method</legend><input id="eus-followup-preferred" name="preferredContact" type="hidden" value="Text message"><div class="eus-followup__chips" role="group" aria-label="Preferred contact method"><button class="eus-followup__chip is-selected" type="button" data-followup-preferred="Text message" aria-pressed="true">Text me</button><button class="eus-followup__chip" type="button" data-followup-preferred="Phone call" aria-pressed="false">Call me</button><button class="eus-followup__chip" type="button" data-followup-preferred="Email" aria-pressed="false">Email me</button></div></fieldset>
          <label id="eus-followup-family-wrap">What type of project?<select id="eus-followup-family" name="projectType"><option value="">Choose one</option><option value="home">Home project</option><option value="rv">RV project</option><option value="solar">Solar / off-grid</option></select></label>
          <label>What can we help with?<input id="eus-followup-help" name="helpWith" maxlength="180" required placeholder="Example: roof leak, RV repair, solar upgrade"></label>
        </div>
        <label class="eus-followup__note">Optional note<textarea id="eus-followup-note" name="note" maxlength="1500" rows="4" placeholder="Add a short detail that will help us understand what you need."></textarea></label>
        <label class="eus-followup__consent"><input id="eus-followup-consent" type="checkbox" required><span>I agree that Elevation UpScales, Inc. may contact me about this request. This does not subscribe me to unrelated marketing. See the <a href="/privacy">privacy notice</a>.</span></label>
        <input class="form-honeypot" id="eus-followup-website" name="website" autocomplete="off" tabindex="-1" aria-hidden="true">
        <p class="eus-followup__status" id="eus-followup-status" role="status" hidden></p>
        <div class="eus-followup__actions"><button class="button button-primary button-xl" id="eus-followup-submit" type="submit">Request Follow-Up</button><button class="button button-outline" type="button" data-followup-close>Cancel</button></div>
      </form>
      <div class="eus-followup__success" id="eus-followup-success" hidden>
        <p class="eyebrow">Request Received</p>
        <h2>Thanks — we saved your request.</h2>
        <p>Casey will follow up using the contact method you selected.</p>
        <p class="eus-followup__reference" id="eus-followup-reference"></p>
        <button class="button button-primary" type="button" data-followup-close>Done</button>
      </div>
    </section>`;
  document.body.append(modal);

  const $ = (id) => document.getElementById(id);
  const form = $("eus-followup-form");
  const success = $("eus-followup-success");
  const familyWrap = $("eus-followup-family-wrap");
  const family = $("eus-followup-family");
  const help = $("eus-followup-help");
  const status = $("eus-followup-status");
  const submit = $("eus-followup-submit");
  let preferredManual = false;
  const preferredButtons = () => [...modal.querySelectorAll("[data-followup-preferred]")];
  function setPreferred(value, manual = false) {
    $("eus-followup-preferred").value = value;
    preferredButtons().forEach((button) => {
      const selected = button.dataset.followupPreferred === value;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    if (manual) preferredManual = true;
  }
  function syncPreferred(source = "") {
    const phoneValid = $("eus-followup-phone").value.replace(/\D/g, "").length >= 7;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($("eus-followup-email").value.trim());
    const current = $("eus-followup-preferred").value;
    const compatible = current === "Email" ? emailValid : phoneValid;
    if (!compatible) {
      if (source === "email" && emailValid) { setPreferred("Email"); return; }
      if (source === "phone" && phoneValid) { setPreferred("Text message"); return; }
      if (phoneValid) { setPreferred("Text message"); return; }
      if (emailValid) setPreferred("Email");
      return;
    }
    if (!preferredManual && source === "email" && emailValid) setPreferred("Email");
    else if (!preferredManual && source === "phone" && phoneValid) setPreferred("Text message");
  }
  preferredButtons().forEach((button) => button.addEventListener("click", () => setPreferred(button.dataset.followupPreferred, true)));
  $("eus-followup-phone").addEventListener("input", () => syncPreferred("phone"));
  $("eus-followup-email").addEventListener("input", () => syncPreferred("email"));

  function close() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("eus-followup-open");
    returnFocus?.focus?.();
  }

  function open(trigger) {
    activeTrigger = trigger;
    returnFocus = trigger || document.activeElement;
    form.reset();
    preferredManual = false;
    setPreferred("Text message");
    form.hidden = false;
    success.hidden = true;
    status.hidden = true;
    status.textContent = "";

    const knownFamily = validFamilies.has(trigger?.dataset.followupFamily || "") ? trigger.dataset.followupFamily : "";
    family.value = knownFamily;
    familyWrap.hidden = Boolean(knownFamily);
    help.value = (trigger?.dataset.followupHelp || familyLabels[knownFamily] || "").trim();

    modal.hidden = false;
    document.body.classList.add("eus-followup-open");
    const followUpCtaId = trigger?.dataset.followupCtaId || trigger?.id || (trigger?.classList?.contains("mobile-text") ? "follow-up-mobile" : "have-elevation-follow-up");
    window.EUSIntent?.track?.("contact_click", "follow_up_request", {
      cta_id: followUpCtaId,
      source_page: location.pathname,
      contact_method: "follow_up_request",
      build: "3.11.15-targeted-intake-simplification",
      projectType: knownFamily || "unselected",
      source: "have-elevation-follow-up",
    });
    setTimeout(() => $("eus-followup-name")?.focus(), 0);
  }

  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-followup-close]")) close();
  });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
  triggers.forEach((trigger) => trigger.addEventListener("click", (event) => {
    event.preventDefault();
    open(trigger);
  }));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    const projectType = family.value;
    const phone = $("eus-followup-phone").value.trim();
    const email = $("eus-followup-email").value.trim();
    const preferredContact = $("eus-followup-preferred").value;
    if (!validFamilies.has(projectType)) {
      status.hidden = false;
      status.textContent = "Choose the project type so we can route your request correctly.";
      family.focus();
      return;
    }
    if (!phone && !email) {
      status.hidden = false;
      status.textContent = "Enter a phone number or email address.";
      $("eus-followup-phone").focus();
      return;
    }
    if (preferredContact === "Email" && !email) {
      status.hidden = false;
      status.textContent = "Enter an email address or choose phone/text as your preferred contact method.";
      $("eus-followup-email").focus();
      return;
    }
    if ((preferredContact === "Phone call" || preferredContact === "Text message") && !phone) {
      status.hidden = false;
      status.textContent = "Enter a phone number or choose email as your preferred contact method.";
      $("eus-followup-phone").focus();
      return;
    }

    const payload = {
      name: $("eus-followup-name").value.trim(),
      phone,
      email,
      preferredContact,
      projectType,
      helpWith: help.value.trim(),
      note: $("eus-followup-note").value.trim(),
      consent: $("eus-followup-consent").checked,
      website: $("eus-followup-website").value,
      sourcePage: location.pathname,
      sourceAction: "Have Elevation Follow Up",
      journeyId,
      sessionId: window.EUSIntent?.sessionId?.() || "",
    };

    submit.disabled = true;
    submit.textContent = "Saving…";
    status.hidden = false;
    status.textContent = "Saving your request…";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || data.stored !== true) throw new Error(data.error || "We could not save your request.");
      form.hidden = true;
      success.hidden = false;
      const reference = $("eus-followup-reference");
      reference.textContent = data.reference ? `Request reference: ${data.reference}` : "";
      success.querySelector("button")?.focus();
    } catch (error) {
      status.hidden = false;
      status.textContent = error instanceof Error ? error.message : "We could not save your request. Please try again.";
    } finally {
      submit.disabled = false;
      submit.textContent = "Request Follow-Up";
    }
  });
})();
