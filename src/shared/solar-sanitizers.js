import {
  cleanList,
  cleanString,
} from "./validation.js";

export function sanitizeBuild(raw = {}) {
  return {
    package: cleanString(raw.package, 140),
    ecosystem: cleanString(raw.ecosystem, 140),
    classification: cleanString(raw.classification, 140),
    complexity: cleanString(raw.complexity, 140),
    panel: cleanString(raw.panel, 300),
    battery: cleanString(raw.battery, 300),
    inverter: cleanString(raw.inverter, 300),
    controller: cleanString(raw.controller, 300),
    alternator: cleanString(raw.alternator, 300),
    shore: cleanString(raw.shore, 300),
    monitoring: cleanString(raw.monitoring, 300),
    wiring: cleanString(raw.wiring, 300),
    loads: cleanList(raw.loads),
    services: cleanList(raw.services),
    alerts: cleanList(raw.alerts),
    estimatedDailySolar: cleanString(raw.estimatedDailySolar, 120),
    usableBatteryReserve: cleanString(raw.usableBatteryReserve, 120),
    estimatedDailyUsage: cleanString(raw.estimatedDailyUsage, 120),
    estimatedEnergyBalance: cleanString(raw.estimatedEnergyBalance, 120),
    powerUseContext: cleanString(raw.powerUseContext, 180),
    notes: cleanString(raw.notes, 2_500),
  };
}

export function sanitizeContact(raw = {}) {
  return {
    name: cleanString(raw.name, 120),
    firstName: cleanString(raw.firstName, 80),
    phone: cleanString(raw.phone, 80),
    email: cleanString(raw.email, 180).toLowerCase(),
    location: cleanString(raw.location, 180),
    rv: cleanString(raw.rv, 260),
    preferred: cleanString(raw.preferred, 80),
    timing: cleanString(raw.timing, 120),
    installLocation: cleanString(raw.installLocation, 180),
    available: cleanString(raw.available, 80),
    details: cleanString(raw.details, 2_500),
    consent: Boolean(raw.consent),
  };
}

export function sanitizeSolarMilestone(raw = {}) {
  const hasProgress =
    raw.progressPercent !== null &&
    raw.progressPercent !== undefined &&
    raw.progressPercent !== "";

  const progress = hasProgress
    ? Number(raw.progressPercent)
    : Number.NaN;

  return {
    kind: cleanString(raw.kind, 80),
    currentStep: cleanString(raw.currentStep, 100),
    progressPercent: Number.isFinite(progress)
      ? Math.max(0, Math.min(100, Math.round(progress)))
      : null,
    powerSnapshotViewed: Boolean(raw.powerSnapshotViewed),
    summaryViewed: Boolean(raw.summaryViewed),
    reviewOpened: Boolean(raw.reviewOpened),
    notesSaved: Boolean(raw.notesSaved),
  };
}
