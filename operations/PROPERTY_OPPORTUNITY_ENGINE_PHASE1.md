# ELEVATION UPSCALES — PROPERTY OPPORTUNITY ENGINE — PHASE 1 BUILD RECORD

**Owner:** Casey Young  
**Company:** Elevation UpScales, Inc.  
**System:** Elevation OS 1.1  
**Repository:** `elevationupscales/ElevationUpScales`  
**Frozen base:** `5ffceddb5a77ed242805c2dbc65a0d64d3105378`  
**Branch:** `work/property-opportunity-engine-phase1-2026-09-24`  
**Production:** NOT AUTHORIZED / NOT TOUCHED

## 1. Recon Report

Current lead/customer truth was preserved.

- `LEADS_DB.project_opportunities` is the existing submitted/customer Lead source of truth.
- `/api/project/capture-contact` and `/api/project/submit` create/update that same Lead record.
- `site/start-project.js` already carries source, journey and session attribution through Start a Project.
- `classifyProjectServiceArea()` in `site/worker/core-context.js` is the existing market authority for Treasure Valley, Colorado Springs / Peyton, Denver Metro, Outside Service Area and Manual Review.
- `MARKETPLACE_DB` owns first-party website/session analytics; confirmed Lead submission is already a server-side event.
- `/api/admin/opportunities` + Mission Control are the current primary Lead-management surface.
- Admin access already uses the signed Elevation admin session; the Property Opportunity API reuses that authentication.
- No existing property intelligence, geocoder or map-provider integration was present in the accepted base.
- Existing Worker routing is centralized in `site/worker-core.js`; new business logic belongs in a domain module rather than the router.

**Decision:** add one upstream `property_opportunities` table inside existing `LEADS_DB`, then link/convert into `project_opportunities`. Do not create a second lead database.

## 2. Proposed Architecture

```text
AUTHORIZED / PUBLIC / MANUAL PROPERTY FACTS
        ↓
Property Opportunity normalization
        ↓
Deterministic explainable scoring
  Solar / Lithium / Combined
  reason codes + evidence + confidence
        ↓
LEADS_DB.property_opportunities
        ↓
Text planning concept + secure slug + QR tracking ID
        ↓
/project-opportunity/{secure-slug}
        ↓
QR / page / Start Project engagement counters
        ↓
Existing /start-a-project
        ↓
Existing LEADS_DB.project_opportunities
        ↓
Existing Leads Manager / status / rep / next action
        ↓
Estimate → Won Project → future revenue reporting
```

No live outbound automation is part of Phase 1.

## 3. Data Source Plan

### Phase 1 — active

**Manual / synthetic test entry only.**  
External API cost: **$0**.  
Purpose: prove scoring, attribution, personalized page, engagement tracking and Lead conversion without importing real prospect lists.

Accepted provenance labels:

- `manual`
- `synthetic_test`
- `public_record`
- `licensed`
- `partner_authorized`

A source record can store source ID/date, HTTPS source URL and a factual source summary. Owner identity and protected/sensitive targeting fields are rejected.

### Candidate pilot sources — not connected yet

| Source | Candidate use | Access / licensing state | Freshness / reliability | Pilot decision |
|---|---|---|---|---|
| Colorado statewide Property Tax Parcels ArcGIS feature layer | parcel geometry / locality context | Public GIS endpoint supports JSON/GeoJSON/PBF. Reuse/outreach terms still require confirmation before automated ingestion. | Government-hosted current service; county-level completeness still needs sampling. | Candidate after terms review. |
| U.S. Census Geocoder | address → coordinate/geography enrichment | Public U.S. Census service; no paid provider selected. | Current benchmark/vintage options; geocoding match quality must be retained as confidence evidence. | Preferred low-cost geocoder candidate for pilot testing. |
| Microsoft Global ML Building Footprints | building geometry / approximate structure footprint | Microsoft publishes the current global dataset under CDLA Permissive 2.0; source imagery has varying vintages. | Dataset refreshed during 2026, but individual footprint/image vintage varies. | Candidate geometry enrichment only; never treat footprint as current roof condition. |
| NREL / NSRDB developer APIs | solar-resource evidence | API key required; published service limits apply. No paid solar API selected. | Strong public solar-resource source; request limits and exact dataset vintage must be recorded. | Candidate for solar-resource enrichment after key/terms setup. |
| City/county permit open data | solar/building permit signal | Varies by jurisdiction; use only documented public/open endpoints. | Jurisdiction-specific. | Evaluate per Colorado pilot market. |
| Licensed/authorized imagery | concept source image | Must have explicit reuse permission appropriate to the intended concept/outreach use. | Provider-specific. | Required before any image-based concept generation. |

Current source references checked 2026-09-24:
- Colorado parcels: `https://gis.colorado.gov/public/rest/services/GOV/PropertyTaxParels/MapServer/0`
- Census Geocoder: `https://geocoding.geo.census.gov/geocoder/`
- Microsoft footprints: `https://github.com/microsoft/GlobalMLBuildingFootprints`
- NREL developer network: `https://developer.nrel.gov/`

### Cost control — Phase 1

| 100-unit activity | New external API/service cost in Phase 1 |
|---|---:|
| 100 properties analyzed | $0 API cost; manual operator time excluded |
| 100 text planning concepts | $0 API cost |
| 100 personalized pages | No new paid vendor; uses existing Worker + D1 runtime |
| 100 outreach tracking records | $0 system cost; printing/postage or third-party delivery excluded |

AI/image concept generation is intentionally **not enabled**, so image-generation cost is **TBD rather than invented**.

## 4. Database / Schema Patch

New table: `LEADS_DB.property_opportunities`.

It preserves the required fields for:

- property/location and optional coordinates;
- source/provenance;
- property suitability signals;
- solar/lithium/combined scores;
- system planning ranges;
- service region and serviceability;
- qualification state/reason;
- reason-code evidence and confidence;
- text/image concept state;
- secure page slug + QR tracking ID;
- outreach status + **opt-out control**;
- visit/QR/Start Project counters;
- Lead link/submission;
- rep / next action / notes.

Indices cover:
- created date;
- combined score;
- service region + qualification;
- converted Lead ID.

Schema is idempotently created through the existing `LEADS_DB` binding when the new feature is invoked. No D1 ID is invented.

## 5. Leads Manager UI Plan

Implemented inside existing Mission Control customer-leads workspace:

**PROPERTY OPPORTUNITIES**

Summary:
- Discovered
- Qualified
- Concepts Generated
- Outreach Sent
- Visited
- Engaged
- Leads
- Estimates
- Projects Won
- Pipeline Value

Filters:
- region;
- opportunity type;
- solar score minimum;
- lithium score minimum;
- combined score minimum;
- outreach status;
- engagement;
- assigned rep;
- date;
- Lead conversion;
- qualification state;
- text search.

Property record shows:
- location;
- subtype;
- Solar / Lithium / Combined score;
- confidence;
- service market;
- qualification / next action;
- outreach state;
- engagement;
- assigned rep;
- linked Lead;
- reason codes;
- planning ranges;
- personalized page / QR tracking / Start Project links.

A no-cost Colorado coordinate map plots only records with explicit stored coordinates. It does not auto-geocode or call a map vendor.

## 6. Phase 1 Build

Implemented pipeline:

```text
manual/test property input
→ deterministic score
→ LEADS_DB Property Opportunity record
→ secure personalized page
→ QR tracking route
→ tracked Start a Project open
→ existing Start a Project intake
→ existing Lead record
→ Property Intelligence attribution
→ linked Property Opportunity conversion
```

Controls:

- secure unguessable page and QR identifiers;
- personalized page is `noindex,nofollow`;
- public page does not expose numeric internal scores or raw source evidence;
- concept copy is explicitly preliminary/non-engineered;
- sensitive targeting fields are rejected;
- source provenance is stored;
- outreach opt-out blocks approved/sent outreach state;
- no automatic email/SMS/mail/ad delivery exists;
- QR/page/Start Project activity changes internal next action only;
- repeat Start Project sessions reuse an already-linked Lead where possible;
- source on converted Lead is exactly **Property Intelligence**;
- subtype is retained as Solar, Lithium, Solar + Storage or Off-Grid;
- initial scores/campaign/concept-view/QR attribution are retained inside the existing Lead details.

## 7. Test Receipt

Canonical regression test:
`tests/property-opportunity-engine.test.mjs`

Synthetic fixture:
- Colorado Springs synthetic property;
- approved property-only signals;
- explainable deterministic scoring;
- private personalized page;
- QR redirect;
- Start Project redirect with property slug/campaign;
- attribution resolver into existing Lead integration contract.

Final CI receipt is appended after pull-request QA.

## 8. Pilot Plan

Initial size: **50–100 reviewed Colorado opportunities**.

Recommended sequence:

1. connect one approved Colorado property source only after reuse terms are confirmed;
2. enrich coordinates/building facts with approved public/open sources;
3. calculate scores;
4. retain only records meeting the chosen human-review threshold;
5. human review every reason/evidence record;
6. prioritize current Colorado service markets;
7. generate/approve concepts only where source imagery rights are explicit;
8. approve outreach manually;
9. run one bounded campaign;
10. measure:
   - cost per qualified property;
   - cost per outreach;
   - QR scan rate;
   - landing-page visit rate;
   - Start a Project open rate;
   - Lead conversion;
   - estimate conversion;
   - closed-project conversion;
   - revenue per campaign;
11. do not scale until real conversion evidence supports expansion.

No mass outreach is authorized.

## 9. Release Receipt

Pending canonical QA / preview generation.

```text
branch: work/property-opportunity-engine-phase1-2026-09-24
base SHA: 5ffceddb5a77ed242805c2dbc65a0d64d3105378
candidate SHA: PENDING
files changed: PENDING FINAL DIFF
tests run: PENDING
tests passed: PENDING
preview URL: PENDING
known limitations:
- external discovery/enrichment sources are designed but not yet connected;
- AI/image concept generation is intentionally disabled pending an approved imagery/model workflow;
- printable QR image generation is not included; unique tracked QR URL/ID is implemented;
- Pipeline Value remains unavailable until a canonical Lead/project value source is confirmed;
privacy/compliance:
- property suitability only;
- protected/sensitive targeting rejected;
- no inferred financial/health/political profiling;
- no automated outbound contact;
- opt-out enforced;
- provenance retained;
- personalized page noindexed;
- internal scores/evidence not exposed publicly;
READY TO DEPLOY: PENDING QA / PREVIEW / OWNER APPROVAL
```

## Production Gate

**STOP BEFORE PRODUCTION. CASEY APPROVAL REQUIRED.**
