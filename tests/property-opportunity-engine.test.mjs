import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  protectedTargetingFields,
  normalizePropertyOpportunityInput,
  scorePropertyOpportunity,
  propertyOpportunityConcept,
} from "../site/worker/shared/property-opportunity-core.js";
import {
  handlePropertyOpportunityPublic,
  handlePropertyOpportunityQr,
  handlePropertyOpportunityStart,
  resolvePropertyOpportunityAttribution,
} from "../site/worker/domains/property-opportunities.js";

const root = process.cwd();

test("property scoring is deterministic, explainable, and based only on approved property signals", () => {
  const raw = {
    propertyAddress: "100 Test Mesa Rd",
    city: "Colorado Springs",
    state: "CO",
    postalCode: "80908",
    sourceType: "synthetic_test",
    sourceRecordId: "SYNTH-001",
    sourceDate: "2026-09-24",
    propertyType: "single_family",
    estimatedRoofArea: 1800,
    estimatedGroundArea: 3000,
    solarExposure: "high",
    roofOrientation: "south",
    shadeLevel: "low",
    existingSolarDetected: false,
    ruralOrOffgridSignal: true,
    backupPowerApplicability: true,
  };
  const input = normalizePropertyOpportunityInput(raw);
  const a = scorePropertyOpportunity(input, { serviceArea: "southern_colorado" });
  const b = scorePropertyOpportunity(input, { serviceArea: "southern_colorado" });
  assert.deepEqual(a, b);
  assert.equal(a.solarScore, 100);
  assert.ok(a.lithiumScore >= 70);
  assert.ok(a.combinedScore >= 80);
  assert.equal(a.subtype, "Off-Grid");
  assert.equal(a.qualificationStatus, "qualified");
  assert.equal(a.scoreConfidence, "HIGH");
  assert.ok(a.reasons.some((reason) => reason.code === "HIGH_SOLAR_EXPOSURE"));
  assert.ok(a.reasons.some((reason) => reason.code === "BACKUP_POWER_APPLICABILITY"));
  const concept = propertyOpportunityConcept(a);
  assert.match(concept.summary, /Solar planning range:/);
  assert.match(concept.disclaimer, /Not an engineering design/);
});

test("protected or sensitive targeting fields are rejected by the model boundary", () => {
  assert.deepEqual(protectedTargetingFields({ race: "x", household_income: 1 }).sort(), ["household_income","race"]);
  assert.deepEqual(protectedTargetingFields({ propertyAddress: "x", roofArea: 1000 }), []);
});

class FakePropertyDb {
  constructor(row) { this.row = { ...row }; this.updates = []; }
  prepare(sql) {
    const db = this;
    return {
      bind(...args) {
        return {
          async run() {
            db.updates.push({ sql, args });
            if (/page_visit_count=page_visit_count\+1/.test(sql)) {
              db.row.page_visit_count = Number(db.row.page_visit_count || 0) + 1;
              if (!db.row.first_visit_at) db.row.first_visit_at = args[0];
              db.row.last_visit_at = args[1];
            }
            if (/qr_scan_count=qr_scan_count\+1/.test(sql)) db.row.qr_scan_count = Number(db.row.qr_scan_count || 0) + 1;
            if (/start_project_opened=start_project_opened\+1/.test(sql)) db.row.start_project_opened = Number(db.row.start_project_opened || 0) + 1;
            return { meta: { changes: 1 } };
          },
          async first() {
            if (/WHERE personalized_page_slug=\?/.test(sql)) return args[0] === db.row.personalized_page_slug ? { ...db.row } : null;
            if (/WHERE qr_code_id=\?/.test(sql)) return args[0] === db.row.qr_code_id ? { opportunity_id: db.row.opportunity_id, personalized_page_slug: db.row.personalized_page_slug } : null;
            return null;
          },
          async all() { return { results: [] }; },
        };
      },
      async run() { return { meta: { changes: 0 } }; },
      async first() { return null; },
      async all() { return { results: [] }; },
    };
  }
}

function syntheticRow() {
  return {
    opportunity_id: "PO-20260924-TEST0001",
    created_at: "2026-09-24T20:00:00.000Z",
    updated_at: "2026-09-24T20:00:00.000Z",
    property_address: "100 Test Mesa Rd",
    city: "Colorado Springs",
    state: "CO",
    postal_code: "80908",
    property_source: "synthetic_test",
    solar_opportunity_score: 88,
    lithium_opportunity_score: 74,
    combined_opportunity_score: 82,
    opportunity_type: "Solar + Storage",
    estimated_solar_kw_low: 9.2,
    estimated_solar_kw_high: 15.1,
    estimated_storage_kwh_low: 10,
    estimated_storage_kwh_high: 30,
    service_region: "southern_colorado",
    serviceability_status: "supported",
    qualification_status: "qualified",
    qualification_reason: "Strong opportunity signals.",
    score_reason_codes_json: JSON.stringify([
      { code:"HIGH_SOLAR_EXPOSURE", label:"High solar-exposure signal improves concept fit.", dimension:"solar", points:22 },
      { code:"BACKUP_POWER_APPLICABILITY", label:"Backup-power applicability is a strong storage opportunity signal.", dimension:"lithium", points:30 },
    ]),
    source_evidence_json: JSON.stringify({ sourceType:"synthetic_test" }),
    score_confidence: "HIGH",
    concept_status: "text_concept_ready",
    concept_image_url: "",
    concept_generated_at: "2026-09-24T20:00:00.000Z",
    personalized_page_slug: "op-0123456789abcdef0123456789abcdef",
    qr_code_id: "qr-0123456789abcdef01234567",
    campaign: "property-intelligence-pilot",
    first_visit_at: "",
    last_visit_at: "",
    page_visit_count: 0,
    qr_scan_count: 0,
    start_project_opened: 0,
    lead_submitted: 0,
    converted_lead_id: "",
  };
}

test("synthetic property page, QR, and Start Project handoff stay private and attributable", async () => {
  const db = new FakePropertyDb(syntheticRow());
  const env = { LEADS_DB: db };
  const slug = db.row.personalized_page_slug;

  const page = await handlePropertyOpportunityPublic(new Request(`https://preview.test/project-opportunity/${slug}`), env, slug);
  assert.equal(page.status, 200);
  assert.equal(page.headers.get("x-robots-tag"), "noindex, nofollow");
  const html = await page.text();
  assert.match(html, /Solar \+ Storage/);
  assert.match(html, /Start a Project/);
  assert.match(html, /preliminary planning concept/i);
  assert.doesNotMatch(html, />82</);
  assert.doesNotMatch(html, /scoreConfidence|source_evidence|combined_opportunity_score/);
  assert.equal(db.row.page_visit_count, 1);

  const qr = await handlePropertyOpportunityQr(new Request(`https://preview.test/property-opportunity/qr/${db.row.qr_code_id}`), env, db.row.qr_code_id);
  assert.equal(qr.status, 302);
  assert.equal(qr.headers.get("location"), `/project-opportunity/${slug}?via=qr`);
  assert.equal(db.row.qr_scan_count, 1);

  const start = await handlePropertyOpportunityStart(new Request(`https://preview.test/property-opportunity/start/${slug}`), env, slug);
  assert.equal(start.status, 302);
  const location = start.headers.get("location");
  assert.match(location, /^\/start-a-project\?/);
  assert.match(location, /source=property-intelligence/);
  assert.match(location, new RegExp(`propertyOpportunity=${slug}`));
  assert.equal(db.row.start_project_opened, 1);

  const attribution = await resolvePropertyOpportunityAttribution(env, slug);
  assert.equal(attribution.opportunityId, db.row.opportunity_id);
  assert.equal(attribution.campaign, "property-intelligence-pilot");
  assert.equal(attribution.combinedScore, 82);
});

test("repository wiring uses the existing Leads pipeline and contains no automated outreach sender", async () => {
  const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
  const routes = read("site/worker/routes.js");
  const worker = read("site/worker-core.js");
  const leads = read("site/worker/domains/leads.js");
  const domain = read("site/worker/domains/property-opportunities.js");
  const start = read("site/start-project.js");
  const admin = read("site/admin-listings.html");
  const workspace = read("site/admin-workspace.js");

  assert.match(routes, /ADMIN_PROPERTY_OPPORTUNITIES_PATH/);
  assert.match(routes, /PROPERTY_OPPORTUNITY_START_PREFIX/);
  assert.match(worker, /handleAdminPropertyOpportunities/);
  assert.match(worker, /handlePropertyOpportunityPublic/);
  assert.match(start, /propertyOpportunitySlug/);
  assert.match(leads, /Property Intelligence/);
  assert.match(leads, /linkPropertyOpportunityLead/);
  assert.match(leads, /convertedLeadId/);
  assert.match(admin, /Property Opportunities/);
  assert.match(admin, /admin-property-opportunities\.js/);
  assert.match(workspace, /propertyOpportunities/);
  assert.match(domain, /outreachSentBySystem: false/);
  assert.doesNotMatch(domain, /sendEmail|sendNotification|sendSms|sendMail|twilio|mailgun/i);
});
