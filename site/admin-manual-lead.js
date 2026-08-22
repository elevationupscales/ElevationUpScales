(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const value = (id) => $(id)?.value?.trim?.() ?? "";

  function ensureModal() {
    if ($("manual-lead-modal")) return $("manual-lead-modal");
    const modal = document.createElement("div");
    modal.id = "manual-lead-modal";
    modal.className = "manual-lead-modal";
    modal.hidden = true;
    modal.innerHTML = `
      <button type="button" class="manual-lead-modal__backdrop" data-manual-lead-close aria-label="Close Add Lead"></button>
      <section class="manual-lead" role="dialog" aria-modal="true" aria-labelledby="manual-lead-title">
        <header>
          <div><p class="eyebrow">Mission Control</p><h2 id="manual-lead-title">Add a Lead</h2><p>Capture a caller, email, referral, client, or potential project in the same Lead system used by the website.</p></div>
          <button type="button" class="manual-lead__close" data-manual-lead-close aria-label="Close Add Lead">×</button>
        </header>
        <form id="manual-lead-form">
          <section class="manual-lead__section">
            <div class="manual-lead__section-head"><span>1</span><div><h3>Contact</h3><p>At least one usable phone number or email is required.</p></div></div>
            <div class="manual-lead__grid">
              <label>Customer / Client Name<input id="manual-lead-name" maxlength="180" autocomplete="name" required></label>
              <label>Phone<input id="manual-lead-phone" maxlength="80" inputmode="tel" autocomplete="tel"></label>
              <label>Email<input id="manual-lead-email" maxlength="180" type="email" autocomplete="email"></label>
              <label>Preferred Contact<select id="manual-lead-preferred"><option value="phone">Phone Call</option><option value="text">Text Message</option><option value="email">Email</option></select></label>
            </div>
          </section>
          <section class="manual-lead__section">
            <div class="manual-lead__section-head"><span>2</span><div><h3>Potential Project</h3><p>Assign the lead to the operating market you intend to manage.</p></div></div>
            <div class="manual-lead__grid">
              <label>Project Family<select id="manual-lead-family"><option value="home">Home</option><option value="rv">RV</option><option value="solar">Solar</option></select></label>
              <label>Project / Service Category<input id="manual-lead-category" maxlength="180" placeholder="Deck repair, RV electrical, off-grid solar…" required></label>
              <label>Market<select id="manual-lead-market"><option value="manual_review">Location Needs Verification</option><option value="treasure_valley">Boise / Treasure Valley</option><option value="southern_colorado">Colorado Springs / Peyton</option><option value="denver_metro">Denver Metro</option><option value="outside_standard_area">Outside Service Area</option></select></label>
              <label>Priority<select id="manual-lead-priority"><option value="normal">Normal</option><option value="high">High</option><option value="urgent">Urgent</option></select></label>
              <label>City<input id="manual-lead-city" maxlength="120" autocomplete="address-level2"></label>
              <label>State<input id="manual-lead-state" maxlength="2" autocomplete="address-level1" placeholder="ID or CO"></label>
              <label>ZIP<input id="manual-lead-zip" maxlength="10" inputmode="numeric" autocomplete="postal-code"></label>
              <label>Assigned Representative<input id="manual-lead-rep" maxlength="120" placeholder="Unassigned"></label>
              <label class="manual-lead__wide">Timing / Urgency<input id="manual-lead-timing" maxlength="500" placeholder="When do they need help?"></label>
              <label class="manual-lead__wide">Lead Summary<textarea id="manual-lead-summary" rows="3" maxlength="2500" placeholder="What is the opportunity?"></textarea></label>
              <label class="manual-lead__wide">Internal Notes<textarea id="manual-lead-notes" rows="3" maxlength="5000" placeholder="Private context for the team"></textarea></label>
            </div>
          </section>
          <section class="manual-lead__section">
            <div class="manual-lead__section-head"><span>3</span><div><h3>First Conversation</h3><p>Optional. Start the customer timeline with the interaction that created this lead.</p></div></div>
            <div class="manual-lead__grid">
              <label>Channel<select id="manual-lead-conversation-channel"><option value="phone">Phone Call</option><option value="email">Email</option><option value="text">Text Message</option><option value="in_person">In Person</option><option value="other">Other</option></select></label>
              <label class="manual-lead__wide">Conversation Note<textarea id="manual-lead-conversation-note" rows="3" maxlength="5000" placeholder="What did the customer say or ask for?"></textarea></label>
            </div>
          </section>
          <aside class="manual-lead__consent"><strong>Contact permission:</strong> A manual admin entry does not create marketing consent. Mission Control stores consent as false unless the customer separately grants permission through an approved intake path.</aside>
          <footer><p id="manual-lead-status" class="admin-inline-status" aria-live="polite"></p><div><button type="button" data-manual-lead-close>Cancel</button><button type="submit" id="manual-lead-save" class="button button-primary">Create Lead</button></div></footer>
        </form>
      </section>`;
    document.body.appendChild(modal);
    modal.querySelectorAll("[data-manual-lead-close]").forEach((button) => button.addEventListener("click", close));
    $("manual-lead-form")?.addEventListener("submit", submit);
    $("manual-lead-state")?.addEventListener("input", (event) => { event.target.value = event.target.value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 2); });
    return modal;
  }

  function open() {
    const modal = ensureModal();
    $("manual-lead-form")?.reset();
    $("manual-lead-status").textContent = "";
    modal.hidden = false;
    document.body.classList.add("manual-lead-open");
    setTimeout(() => $("manual-lead-name")?.focus(), 0);
  }

  function close() {
    const modal = $("manual-lead-modal");
    if (modal) modal.hidden = true;
    document.body.classList.remove("manual-lead-open");
  }

  async function submit(event) {
    event.preventDefault();
    const button = $("manual-lead-save");
    const status = $("manual-lead-status");
    button.disabled = true;
    status.textContent = "Creating Lead…";
    try {
      const response = await fetch("/api/admin/opportunities", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          action: "create_manual_lead",
          customerName: value("manual-lead-name"),
          phone: value("manual-lead-phone"),
          email: value("manual-lead-email"),
          preferredContact: value("manual-lead-preferred"),
          projectFamily: value("manual-lead-family"),
          category: value("manual-lead-category"),
          market: value("manual-lead-market"),
          priority: value("manual-lead-priority"),
          city: value("manual-lead-city"),
          state: value("manual-lead-state"),
          zip: value("manual-lead-zip"),
          assignedRepresentative: value("manual-lead-rep"),
          timingUrgency: value("manual-lead-timing"),
          summary: value("manual-lead-summary"),
          internalNotes: value("manual-lead-notes"),
          conversationChannel: value("manual-lead-conversation-channel"),
          conversationNote: value("manual-lead-conversation-note"),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || "Unable to create Lead.");
      window.EUSOpportunityCenter?.replaceProject?.(data.opportunity);
      close();
      document.dispatchEvent(new CustomEvent("eus-open-project-editor", { detail: { reference: data.opportunity.reference } }));
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Unable to create Lead.";
    } finally {
      button.disabled = false;
    }
  }

  function syncAuth() {
    const button = $("admin-add-lead");
    if (button) button.hidden = !document.body.classList.contains("eus-admin-authenticated");
  }

  $("admin-add-lead")?.addEventListener("click", open);
  document.addEventListener("eus-admin-authenticated", syncAuth);
  new MutationObserver(syncAuth).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !$("manual-lead-modal")?.hidden) close(); });
  ensureModal();
  syncAuth();
})();
