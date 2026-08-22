(() => {
  "use strict";

  const PACKAGE_TYPE = "elevation_project_handoff";
  const SCHEMA_VERSION = 1;
  const MAX_PROJECT_BYTES = 512 * 1024;
  const MAX_ZIP_BYTES = 1024 * 1024;
  const textEncoder = new TextEncoder();

  const clean = (value, max = 5000) => String(value ?? "").trim().slice(0, max);
  const nullable = (value, max) => clean(value, max) || null;

  function marketplaceReference(project) {
    const details = project?.details && typeof project.details === "object" ? project.details : {};
    const followup = details.marketplaceFollowup && typeof details.marketplaceFollowup === "object" ? details.marketplaceFollowup : {};
    return nullable(followup.listingReference, 120);
  }

  function validate(project) {
    const errors = [];
    if (!clean(project?.reference, 120)) errors.push("Lead reference is required.");
    if (!clean(project?.name, 180)) errors.push("Customer name is required.");
    if (!clean(project?.family, 20)) errors.push("Project family is required.");
    if (!clean(project?.category, 180)) errors.push("Project / service category is required.");
    if (!clean(project?.market, 60)) errors.push("Service market is required.");
    if (!clean(project?.phone, 80) && !clean(project?.email, 180)) errors.push("Phone or email is required.");
    return errors;
  }

  function projectPayload(project) {
    const errors = validate(project);
    if (errors.length) throw new Error(errors.join(" "));
    const internalNotes = clean(project.internalNotes, 5000);
    return {
      source: {
        lead_id: clean(project.reference, 120),
        source_type: nullable(project.source, 180),
        marketplace_reference: marketplaceReference(project)
      },
      customer: {
        name: clean(project.name, 180),
        phone: nullable(project.phone, 80),
        email: nullable(project.email, 180)
      },
      location: {
        address: null,
        city: nullable(project.city, 180),
        state: nullable(project.state, 80),
        zip: nullable(project.zip, 40),
        service_market: clean(project.market, 60)
      },
      project: {
        family: clean(project.family, 20),
        service_category: clean(project.category, 180),
        description: nullable(project.summary, 2500),
        timing: nullable(project.timingUrgency, 500),
        opportunity_status: clean(project.pipelineStatus || project.status, 60),
        next_action: clean(project.pipelineNextAction || project.nextAction, 120)
      },
      assignment: {
        assigned_rep: nullable(project.assignedRepresentative, 120)
      },
      notes: internalNotes ? [internalNotes] : [],
      portal: {
        status: clean(project.portalStatus || "not_in_portal", 40) || "not_in_portal",
        project_id: nullable(project.portalProjectId, 120)
      }
    };
  }

  function jsonBytes(value) {
    return textEncoder.encode(`${JSON.stringify(value, null, 2)}\n`);
  }

  async function sha256Hex(bytes) {
    if (!globalThis.crypto?.subtle) throw new Error("Secure SHA-256 is not available in this browser.");
    const digest = await globalThis.crypto.subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function safeFilenameReference(reference) {
    return clean(reference, 120).replace(/[^A-Za-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "LEAD";
  }

  async function createPackage(project, options = {}) {
    if (typeof globalThis.JSZip !== "function") throw new Error("Portal ZIP library is unavailable. Refresh Admin and try again.");
    const payload = projectPayload(project);
    const projectBytes = jsonBytes(payload);
    if (projectBytes.byteLength > MAX_PROJECT_BYTES) throw new Error("Project handoff is larger than the V1 export limit.");
    const projectHash = await sha256Hex(projectBytes);
    const manifest = {
      package_type: PACKAGE_TYPE,
      schema_version: SCHEMA_VERSION,
      source_system: "command_center",
      source_record_type: "lead",
      source_record_id: clean(project.reference, 120),
      exported_at: options.exportedAt || new Date().toISOString(),
      exported_by: clean(options.exportedBy, 180) || "admin",
      project_file: "project.json",
      files: [{
        path: "project.json",
        size_bytes: projectBytes.byteLength,
        sha256: projectHash
      }]
    };
    const manifestBytes = jsonBytes(manifest);
    const zip = new globalThis.JSZip();
    const zipDate = new Date(Date.UTC(1980, 0, 1, 0, 0, 0));
    zip.file("manifest.json", manifestBytes, { binary: true, date: zipDate });
    zip.file("project.json", projectBytes, { binary: true, date: zipDate });
    const zipBytes = await zip.generateAsync({
      type: "uint8array",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
      platform: "DOS",
      comment: "Elevation UpScales Project Handoff V1"
    });
    if (zipBytes.byteLength > MAX_ZIP_BYTES) throw new Error("Project handoff ZIP exceeds the V1 1 MiB limit.");
    return {
      filename: `Elevation-Project-Handoff-${safeFilenameReference(project.reference)}.zip`,
      manifest,
      project: payload,
      projectBytes,
      zipBytes
    };
  }

  async function download(project, options = {}) {
    const result = await createPackage(project, options);
    const blob = new Blob([result.zipBytes], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    try {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = result.filename;
      anchor.rel = "noopener";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    } finally {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    return result;
  }

  globalThis.EUSPortalExport = Object.freeze({
    packageType: PACKAGE_TYPE,
    schemaVersion: SCHEMA_VERSION,
    validate,
    projectPayload,
    createPackage,
    download
  });
})();
