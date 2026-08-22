(() => {
  "use strict";

  // Legacy compatibility hardening:
  // structured Home/RV project intake must never use SMS as its persistence layer.
  // Current production routes already redirect /home-project and /rv-project to
  // the canonical server-backed Start a Project workflow. If an orphan legacy
  // page still loads this script with #project-form, move it into that same flow
  // before the customer enters structured project information.
  const form = document.querySelector("#project-form");
  if (!form) return;

  const params = new URLSearchParams(window.location.search);
  const declaredType = document.body.dataset.projectType;
  const type = declaredType === "rv" || declaredType === "home"
    ? declaredType
    : (params.get("type") === "rv" ? "rv" : "home");

  const target = `/start-a-project?type=${encodeURIComponent(type)}&source=legacy-project-js`;
  window.location.replace(target);
})();
