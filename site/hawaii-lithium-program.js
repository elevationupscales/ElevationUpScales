(() => {
  "use strict";
  const form = document.querySelector("[data-hawaii-request-form]");
  if (!form) return;
  const status = document.querySelector("[data-hawaii-request-status]");
  const submit = form.querySelector("button[type='submit']");
  const message = (text, state="") => { if (!status) return; status.textContent = text || ""; status.dataset.state = state; };
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.consent = form.querySelector("[name='consent']")?.checked === true;
    data.quantity = Number(data.quantity || 1);
    submit.disabled = true; message("Saving your Hawaii availability request…");
    try {
      const response = await fetch("/api/hawaii-lithium/requests", { method:"POST", credentials:"same-origin", headers:{"Content-Type":"application/json","Accept":"application/json"}, body:JSON.stringify(data) });
      const body = await response.json().catch(()=>({}));
      if (!response.ok) throw new Error(body.error || "Request could not be saved.");
      form.reset(); message(`Request received. Reference ${body.requestId}. No payment was collected. Elevation will review product fit and Hawaii shipping options before any order is confirmed.`,"success");
    } catch (error) { message(error.message || "Request could not be saved.","error"); }
    finally { submit.disabled = false; }
  });
})();
