const PROPERTY_SOURCE_TYPES = new Set(["manual","synthetic_test","public_record","licensed","partner_authorized"]);
const PROPERTY_TYPES = new Set(["single_family","multi_family","commercial","agricultural","mixed_use","other"]);
const EXPOSURE_VALUES = new Set(["high","medium","low","unknown"]);
const ORIENTATION_VALUES = new Set(["south","east_west","flat","north","unknown"]);
const SHADE_VALUES = new Set(["low","medium","high","unknown"]);
const SENSITIVE_TARGETING_FIELDS = new Set([
  "ownername","owner_name","owneremail","owner_email","ownerphone","owner_phone",
  "race","ethnicity","religion","disability","medical","political","politicalparty",
  "age","dateofbirth","gender","sex","sexualorientation","sexual_orientation",
  "income","householdincome","household_income","creditscore","credit_score",
  "familystatus","family_status","nationalorigin","national_origin"
]);

const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, Math.round(Number(value) || 0)));
const finite = (value) => {
  if (value === "" || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};
const boolOrNull = (value) => {
  if (value === true || value === "true" || value === 1 || value === "1" || value === "yes") return true;
  if (value === false || value === "false" || value === 0 || value === "0" || value === "no") return false;
  return null;
};
const cleanEnum = (value, allowed, fallback = "unknown") => {
  const normalized = String(value || "").trim().toLowerCase();
  return allowed.has(normalized) ? normalized : fallback;
};
const nonNegative = (value, max = 10_000_000) => {
  const number = finite(value);
  if (number === null) return null;
  if (number < 0 || number > max) return null;
  return Math.round(number * 100) / 100;
};

function protectedTargetingFields(raw = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
  return Object.keys(raw).filter((key) => SENSITIVE_TARGETING_FIELDS.has(String(key).replace(/[^a-zA-Z0-9_]/g, "").toLowerCase()));
}

function normalizePropertyOpportunityInput(raw = {}) {
  const sourceType = cleanEnum(raw.sourceType || raw.propertySource, PROPERTY_SOURCE_TYPES, "manual");
  const propertyType = cleanEnum(raw.propertyType, PROPERTY_TYPES, "other");
  const solarExposure = cleanEnum(raw.solarExposure, EXPOSURE_VALUES);
  const roofOrientation = cleanEnum(raw.roofOrientation, ORIENTATION_VALUES);
  const shadeLevel = cleanEnum(raw.shadeLevel, SHADE_VALUES);
  return {
    propertyAddress: String(raw.propertyAddress || "").trim().slice(0, 240),
    city: String(raw.city || "").trim().slice(0, 120),
    state: String(raw.state || "").trim().toUpperCase().slice(0, 2),
    postalCode: String(raw.postalCode || raw.zip || "").trim().slice(0, 10),
    latitude: finite(raw.latitude),
    longitude: finite(raw.longitude),
    sourceType,
    sourceRecordId: String(raw.sourceRecordId || "").trim().slice(0, 180),
    sourceDate: String(raw.sourceDate || "").trim().slice(0, 40),
    sourceUrl: String(raw.sourceUrl || "").trim().slice(0, 500),
    sourceSummary: String(raw.sourceSummary || "").trim().slice(0, 1200),
    propertyType,
    estimatedRoofArea: nonNegative(raw.estimatedRoofArea, 2_000_000),
    estimatedGroundArea: nonNegative(raw.estimatedGroundArea, 50_000_000),
    solarExposure,
    roofOrientation,
    shadeLevel,
    existingSolarDetected: boolOrNull(raw.existingSolarDetected),
    ruralOrOffgridSignal: boolOrNull(raw.ruralOrOffgridSignal),
    backupPowerApplicability: boolOrNull(raw.backupPowerApplicability),
    campaign: String(raw.campaign || "property-intelligence-pilot").trim().slice(0, 120),
    notes: String(raw.notes || "").trim().slice(0, 5000),
  };
}

function addReason(reasons, code, label, dimension, points) {
  reasons.push({ code, label, dimension, points });
}

function planningSolarRange(input) {
  const roof = input.estimatedRoofArea || 0;
  const ground = input.estimatedGroundArea || 0;
  if (!roof && !ground) return { low: null, high: null };
  const usableRoof = roof * 0.55;
  const usableGround = ground * 0.20;
  const usable = Math.max(usableRoof, usableGround);
  const midpoint = usable * 0.018;
  return {
    low: Math.max(1, Math.round(midpoint * 0.72 * 10) / 10),
    high: Math.max(2, Math.round(midpoint * 1.18 * 10) / 10),
  };
}

function planningStorageRange(lithiumScore) {
  if (lithiumScore >= 80) return { low: 20, high: 40 };
  if (lithiumScore >= 60) return { low: 10, high: 30 };
  if (lithiumScore >= 40) return { low: 5, high: 20 };
  return { low: 0, high: 10 };
}

function scoreConfidence(input) {
  let known = 0;
  if (input.estimatedRoofArea || input.estimatedGroundArea) known += 1;
  if (input.solarExposure !== "unknown") known += 1;
  if (input.roofOrientation !== "unknown") known += 1;
  if (input.shadeLevel !== "unknown") known += 1;
  if (input.existingSolarDetected !== null) known += 1;
  if (input.ruralOrOffgridSignal !== null) known += 1;
  if (input.backupPowerApplicability !== null) known += 1;
  if (input.sourceDate) known += 1;
  if (input.propertyAddress && input.city && input.state && input.postalCode) known += 1;
  if (known >= 7) return "HIGH";
  if (known >= 4) return "MEDIUM";
  return "LOW";
}

function scorePropertyOpportunity(input, service = {}) {
  const reasons = [];
  let solar = 15;
  let lithium = 15;

  const roof = input.estimatedRoofArea || 0;
  if (roof >= 1800) { solar += 28; addReason(reasons,"LARGE_USABLE_ROOF","Large roof-area signal supports a meaningful solar concept.","solar",28); }
  else if (roof >= 1000) { solar += 20; addReason(reasons,"USABLE_ROOF","Roof-area signal supports a residential solar concept.","solar",20); }
  else if (roof >= 500) { solar += 12; addReason(reasons,"MODERATE_ROOF","Roof area may support a smaller solar concept.","solar",12); }
  else if (roof > 0) { solar += 5; addReason(reasons,"LIMITED_ROOF","Roof area is present but should be field-verified.","solar",5); }

  const ground = input.estimatedGroundArea || 0;
  if (ground >= 5000) { solar += 12; addReason(reasons,"LARGE_GROUND_AREA","Ground-area signal may support a ground-mount option.","solar",12); }
  else if (ground >= 2000) { solar += 8; addReason(reasons,"GROUND_MOUNT_OPTION","Ground area may provide an alternate solar placement.","solar",8); }

  if (input.solarExposure === "high") { solar += 22; addReason(reasons,"HIGH_SOLAR_EXPOSURE","High solar-exposure signal improves concept fit.","solar",22); }
  else if (input.solarExposure === "medium") { solar += 12; addReason(reasons,"MODERATE_SOLAR_EXPOSURE","Moderate solar exposure supports further review.","solar",12); }
  else if (input.solarExposure === "low") { solar -= 8; addReason(reasons,"LOW_SOLAR_EXPOSURE","Low solar-exposure signal reduces expected solar fit.","solar",-8); }

  if (input.roofOrientation === "south") { solar += 12; addReason(reasons,"FAVORABLE_ORIENTATION","South-oriented roof signal supports solar production.","solar",12); }
  else if (input.roofOrientation === "east_west") { solar += 8; addReason(reasons,"WORKABLE_ORIENTATION","East/west roof orientation can support a practical layout.","solar",8); }
  else if (input.roofOrientation === "flat") { solar += 6; addReason(reasons,"FLAT_ROOF_LAYOUT","Flat roof may support engineered racking options.","solar",6); }
  else if (input.roofOrientation === "north") { solar -= 8; addReason(reasons,"NORTH_ORIENTATION","North-oriented roof signal warrants closer production review.","solar",-8); }

  if (input.shadeLevel === "low") { solar += 10; addReason(reasons,"LOW_SHADE","Low-shade signal supports solar opportunity.","solar",10); }
  else if (input.shadeLevel === "medium") { solar += 3; addReason(reasons,"MODERATE_SHADE","Moderate shade should be measured before system design.","solar",3); }
  else if (input.shadeLevel === "high") { solar -= 12; addReason(reasons,"HIGH_SHADE","High-shade signal may materially reduce solar output.","solar",-12); }

  if (input.existingSolarDetected === false) { solar += 8; addReason(reasons,"NO_EXISTING_SOLAR","No existing solar was recorded in the source evidence.","solar",8); }
  if (input.existingSolarDetected === true) {
    solar += 4;
    lithium += 20;
    addReason(reasons,"EXISTING_SOLAR_STORAGE_MATCH","Existing solar can create a storage or expansion conversation.","lithium",20);
  }
  if (input.ruralOrOffgridSignal === true) {
    lithium += 20;
    addReason(reasons,"RURAL_OFFGRID_SIGNAL","Rural/off-grid use signal supports storage and resilience review.","lithium",20);
  }
  if (input.backupPowerApplicability === true) {
    lithium += 30;
    addReason(reasons,"BACKUP_POWER_APPLICABILITY","Backup-power applicability is a strong storage opportunity signal.","lithium",30);
  }

  solar = clamp(solar);
  if (solar >= 65) {
    lithium += 12;
    addReason(reasons,"SOLAR_STORAGE_SYNERGY","Solar potential increases the usefulness of a storage conversation.","lithium",12);
  }
  lithium = clamp(lithium);
  const combined = clamp((solar * 0.55) + (lithium * 0.45));

  let subtype = "Lithium";
  if (input.ruralOrOffgridSignal === true && combined >= 55) subtype = "Off-Grid";
  else if (solar >= 60 && lithium >= 55) subtype = "Solar + Storage";
  else if (solar >= lithium + 10) subtype = "Solar";

  const serviceArea = String(service.serviceArea || "manual_review");
  const supported = new Set(["southern_colorado","denver_metro","treasure_valley"]).has(serviceArea);
  const serviceabilityStatus = supported ? "supported" : serviceArea === "outside_standard_area" ? "outside_standard_area" : "review_required";
  let qualificationStatus = "watch";
  if (combined >= 70 && supported) qualificationStatus = "qualified";
  else if (combined >= 55 || serviceabilityStatus !== "supported") qualificationStatus = "review";

  const qualificationReason = qualificationStatus === "qualified"
    ? "Strong opportunity signals and a standard Elevation service market."
    : serviceabilityStatus !== "supported"
      ? "Opportunity signals require service-area review before outreach or commitment."
      : combined >= 55
        ? "Promising opportunity signals require human review before outreach."
        : "Insufficient current evidence for a priority outreach decision.";

  const solarRange = planningSolarRange(input);
  const storageRange = planningStorageRange(lithium);
  return {
    solarScore: solar,
    lithiumScore: lithium,
    combinedScore: combined,
    subtype,
    qualificationStatus,
    qualificationReason,
    serviceabilityStatus,
    scoreConfidence: scoreConfidence(input),
    reasons,
    publicReasons: reasons.filter((reason) => reason.points > 0).slice(0, 5).map(({ code, label, dimension }) => ({ code, label, dimension })),
    estimatedSolarKwLow: solarRange.low,
    estimatedSolarKwHigh: solarRange.high,
    estimatedStorageKwhLow: storageRange.low,
    estimatedStorageKwhHigh: storageRange.high,
  };
}

function propertyOpportunityConcept(score) {
  const solar = score.estimatedSolarKwLow === null
    ? "Solar sizing needs a site measurement before a planning range can be shown."
    : `Solar planning range: ${score.estimatedSolarKwLow}–${score.estimatedSolarKwHigh} kW.`;
  const storage = `Storage planning range: ${score.estimatedStorageKwhLow}–${score.estimatedStorageKwhHigh} kWh.`;
  return {
    title: `${score.subtype} opportunity concept`,
    summary: `${solar} ${storage}`,
    disclaimer: "Preliminary planning concept only. Not an engineering design, quote, guarantee, permit determination, or installation commitment.",
  };
}

export {
  PROPERTY_SOURCE_TYPES,
  PROPERTY_TYPES,
  SENSITIVE_TARGETING_FIELDS,
  protectedTargetingFields,
  normalizePropertyOpportunityInput,
  scorePropertyOpportunity,
  propertyOpportunityConcept,
};
