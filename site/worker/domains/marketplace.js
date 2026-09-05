import {
  OPERATIONS_BUILD,
  HTML_SECURITY_HEADERS,
  jsonResponse,
  cleanString,
  isValidEmail,
  isValidPhone,
  MARKETPLACE_IMAGE_PREFIX,
  MARKETPLACE_CONTACT_PREFIX,
  MARKETPLACE_SHARE_PREFIX,
  ADMIN_LISTINGS_PATH,
  ADMIN_MARKETPLACE_FOLLOWUPS_PATH,
  DEFAULT_MARKETPLACE_EMAIL_TO,
  MARKETPLACE_MAX_IMAGE_BYTES,
  MARKETPLACE_MAX_TOTAL_BYTES,
  MARKETPLACE_MAX_ADMIN_PHOTOS,
  MARKETPLACE_US_STATE_CODES,
  MARKETPLACE_ADMIN_STATUSES,
  MARKETPLACE_CONTACT_THROTTLE_SECONDS,
  ADMIN_SINGLE_PHOTO_MAX_TOTAL_BYTES,
  FOLLOWUP_DEFAULT_SUBJECT,
  FOLLOWUP_DEFAULT_BODY,
  sameOriginRequest,
  requireAdmin,
  marketplaceRateLimit,
  validMarketplaceImageSignature,
  prepareMarketplaceImage,
  normalizeMarketplaceCategory,
  marketplaceField,
  parseLimitedMultipartFormData,
  marketplacePhotoSlots,
  marketplaceMinimumPhotos,
  marketplaceCategoryFields,
  marketplaceItemType,
  marketplaceReference,
  sendMarketplaceEmail,
  marketplaceSubmissionText,
  marketplaceSubmissionIssueReference,
  recordMarketplaceSubmissionIssue,
  marketplaceSubmissionIssueRecord,
  verifyMarketplaceQaToken,
  marketplaceQaTestFromRow,
  normalizeMarketplaceContactEmail,
  marketplaceFollowupSchemaStatus,
  ensureMarketplaceFollowupContact,
  marketplaceFollowupTemplate,
  marketplaceFollowupRegistry,
  recordMarketplaceFollowupHistory,
  copyMarketplaceFollowupToLead,
  marketplacePublicRecord,
  getMarketplaceRow,
  getMarketplaceRowWithViews,
  validAnalyticsSessionId,
  analyticsSessionHash,
  recordSiteAnalyticsPoint,
  recordMarketplaceEvent,
  readLimitedJson,
  marketplaceContactAllowed,
  marketplaceSharePage,
  marketplaceAdminRecord,
  adminLog,
  marketplacePhotoKeys,
  validateMarketplaceAdminPhoto,
  adjustedFeaturedAfterDelete,
  updateMarketplacePhotoRecord,
} from "../core-context.js";


async function handleMarketplaceIssueReport(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const parsed = await readLimitedJson(request, 16 * 1024);
  if (parsed.error) return jsonResponse({ error: parsed.error === "too_large" ? "Issue report is too large" : "Invalid issue report" }, parsed.error === "too_large" ? 413 : 400);
  const body = parsed.value && typeof parsed.value === "object" ? parsed.value : {};
  const issueType = cleanString(body.type, 60) || "other";
  const page = cleanString(body.page, 180) || "unknown";
  const stage = cleanString(body.stage, 60) || "user_report";
  const note = cleanString(body.note, 800);
  const contact = cleanString(body.contact, 180);
  const userAgent = cleanString(body.userAgent || request.headers.get("User-Agent"), 280);
  const requestedRef = cleanString(body.requestRef, 80);
  const clientRequestId = cleanString(body.clientRequestId, 100);
  const build = cleanString(body.build || request.headers.get("X-EUS-Build"), 100) || OPERATIONS_BUILD;
  const retryCount = Number.parseInt(body.retryCount, 10) || 0;
  if (!note) return jsonResponse({ error: "Please describe what went wrong" }, 400);
  const issue = await recordMarketplaceSubmissionIssue(env, {
    reference: requestedRef || undefined, category: cleanString(body.category, 60) || "unknown",
    stage: `user_report:${stage}`, code: `user_report:${issueType}`, httpStatus: 0,
    backendStatus: "reported", uploadStatus: "unknown", r2Status: "unknown",
    d1Status: env.MARKETPLACE_DB ? "available" : "unconfigured", page, note, contact, userAgent, clientRequestId, retryCount, build,
  });
  if (!issue.stored && !issue.emailDelivered) return jsonResponse({ error: "Issue reporting is temporarily unavailable. Please contact Elevation UpScales directly." }, 503);
  return jsonResponse({ ok: true, reference: issue.reference, stored: issue.stored, emailDelivered: issue.emailDelivered }, 202);
}

async function handleMarketplaceQaValidate(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  let body;
  try { body = await request.json(); } catch (_) { return jsonResponse({ valid: false, error: "Invalid QA validation request" }, 400); }
  const token = cleanString(body?.qaToken, 1600);
  const category = normalizeMarketplaceCategory(body?.category);
  const valid = Boolean(category && await verifyMarketplaceQaToken(token, env));
  if (!valid) return jsonResponse({ valid: false, error: "This Admin QA link is invalid or expired. Open a new TEST form from Marketplace Operations." }, 403);
  return jsonResponse({
    valid: true,
    category,
    testEmail: cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180),
    testPhone: "208-813-4998",
    build: OPERATIONS_BUILD,
  });
}

async function handleAdminMarketplaceFollowups(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB) return jsonResponse({ error:"Marketplace database is not configured" },503);
  const schema = await marketplaceFollowupSchemaStatus(env.MARKETPLACE_DB);
  if (!schema.ready) return jsonResponse({ error:"Marketplace Follow-Up Registry migration is required", migrationRequired:true, missing:schema.missing },503);
  const suffix=pathname.slice(ADMIN_MARKETPLACE_FOLLOWUPS_PATH.length).replace(/^\/+/,"");
  if (request.method === "GET" && (!suffix || suffix === "registry")) {
    const contacts=await marketplaceFollowupRegistry(env);
    const template=await marketplaceFollowupTemplate(env);
    const metrics={ contacts:contacts.length, needsFollowUp:contacts.filter(c=>c.followupStatus!=="complete").length, emailPrepared:contacts.filter(c=>c.followupStatus==="email_prepared").length, openedGmail:contacts.filter(c=>c.followupStatus==="opened_gmail").length, markedSent:contacts.filter(c=>c.followupStatus==="marked_sent").length, complete:contacts.filter(c=>c.followupStatus==="complete").length };
    return jsonResponse({ ok:true, contacts, metrics, template });
  }
  if (request.method === "GET" && suffix === "history") {
    const url=new URL(request.url); const email=normalizeMarketplaceContactEmail(url.searchParams.get("email"));
    if (!email) return jsonResponse({error:"Valid customer email required"},400);
    const rows=await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_followup_history WHERE normalized_email=? ORDER BY created_at DESC LIMIT 100").bind(email).all();
    return jsonResponse({ok:true,history:(rows.results||[]).map(r=>({action:r.action,listingId:r.listing_id,listingReference:r.listing_reference,subject:r.subject,body:r.message_body,templateVersion:Number(r.template_version)||0,adminEmail:r.admin_email,createdAt:r.created_at}))});
  }
  if (!sameOriginRequest(request)) return jsonResponse({error:"Cross-origin request denied"},403);
  if (request.method !== "POST") return jsonResponse({error:"Method not allowed"},405,{Allow:"GET, POST"});
  let body; try { body=await request.json(); } catch (_) { return jsonResponse({error:"Invalid follow-up action"},400); }
  if (suffix === "template") {
    const action=cleanString(body.action,40);
    if (action === "reset") {
      const current=await marketplaceFollowupTemplate(env); const version=(Number(current.version)||1)+1; const now=new Date().toISOString();
      await env.MARKETPLACE_DB.prepare("UPDATE marketplace_followup_template SET subject=?, body=?, version=?, updated_at=?, updated_by=? WHERE id='default'").bind(FOLLOWUP_DEFAULT_SUBJECT,FOLLOWUP_DEFAULT_BODY,version,now,auth.session.email).run();
      return jsonResponse({ok:true,template:{subject:FOLLOWUP_DEFAULT_SUBJECT,body:FOLLOWUP_DEFAULT_BODY,version,updatedAt:now,updatedBy:auth.session.email}});
    }
    if (action !== "save") return jsonResponse({error:"Invalid template action"},400);
    const subject=cleanString(body.subject,500), messageBody=cleanString(body.body,8000);
    if (!subject || !messageBody) return jsonResponse({error:"Subject and body are required"},400);
    const allowedTokens=new Set(["first_name","listing_type","listing_title","listing_reference"]);
    const tokenPattern=/{{\s*([^{}\s]+)\s*}}/g; let match;
    while ((match=tokenPattern.exec(`${subject}\n${messageBody}`))) if (!allowedTokens.has(match[1])) return jsonResponse({error:`Unsupported merge field: {{${match[1]}}}`},400);
    const current=await marketplaceFollowupTemplate(env); const version=(Number(current.version)||1)+1; const now=new Date().toISOString();
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_followup_template SET subject=?, body=?, version=?, updated_at=?, updated_by=? WHERE id='default'").bind(subject,messageBody,version,now,auth.session.email).run();
    return jsonResponse({ok:true,template:{subject,body:messageBody,version,updatedAt:now,updatedBy:auth.session.email}});
  }
  if (suffix !== "action") return jsonResponse({error:"Unknown follow-up route"},404);
  const email=normalizeMarketplaceContactEmail(body.email); if (!email) return jsonResponse({error:"Valid customer email required"},400);
  const listing=body.listingId ? await getMarketplaceRow(env,cleanString(body.listingId,80)) : null;
  if (listing && normalizeMarketplaceContactEmail(listing.seller_email)!==email) return jsonResponse({error:"Posting does not belong to this customer"},400);
  const action=cleanString(body.action,40), now=new Date().toISOString();
  if (action === "copy_to_leads") {
    if (!listing) return jsonResponse({error:"Choose a Marketplace posting to copy"},400);
    const result = await copyMarketplaceFollowupToLead(env,listing,email,body.projectFamily,auth);
    if (result.error) return jsonResponse({error:result.error},result.status||400);
    return jsonResponse(result,200);
  }
  const customerSource=listing?{name:listing.seller_name,phone:listing.seller_phone}:{}; await ensureMarketplaceFollowupContact(env,email,customerSource);
  let status="";
  if (action === "prepare_email") status="email_prepared";
  else if (action === "opened_gmail") status="opened_gmail";
  else if (action === "mark_sent") status="marked_sent";
  else if (action === "mark_complete") status="complete";
  else if (action === "return_followup") status="needs_follow_up";
  else if (action === "save_notes") status="";
  else return jsonResponse({error:"Unsupported follow-up action"},400);
  const notes=cleanString(body.notes,5000);
  if (action === "save_notes") {
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_followup_contacts SET operations_notes=?, updated_at=? WHERE normalized_email=?").bind(notes,now,email).run();
  } else {
    const lastContact = action === "mark_sent" ? now : null;
    await env.MARKETPLACE_DB.prepare(`UPDATE marketplace_followup_contacts SET followup_status=?, last_contact_at=CASE WHEN ? IS NOT NULL THEN ? ELSE last_contact_at END, operations_notes=CASE WHEN ?<>'' THEN ? ELSE operations_notes END, updated_at=? WHERE normalized_email=?`)
      .bind(status,lastContact,lastContact,notes,notes,now,email).run();
    await recordMarketplaceFollowupHistory(env,email,action,listing,auth,{subject:cleanString(body.subject,500),body:cleanString(body.messageBody,8000),templateVersion:Number(body.templateVersion)||0});
  }
  const contacts=await marketplaceFollowupRegistry(env); const contact=contacts.find(c=>c.normalizedEmail===email)||null;
  return jsonResponse({ok:true,contact});
}

async function handleAdminMarketplaceIssues(request, env) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Marketplace database is not configured" }, 503);

  if (request.method === "POST") {
    if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
    let body;
    try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid issue action" }, 400); }
    const action = cleanString(body.action, 40), issueId = cleanString(body.issueId, 100), reference = cleanString(body.reference, 80);
    const resolution = cleanString(body.resolution, 500) || "Resolved by Admin";
    if (action !== "resolve" || !issueId) return jsonResponse({ error: "Invalid issue action" }, 400);
    const now = new Date().toISOString();
    await env.MARKETPLACE_DB.prepare("INSERT INTO marketplace_admin_log (listing_id, action, admin_email, details, created_at) VALUES (?, 'submission_issue_resolved', ?, ?, ?)")
      .bind(`submission-issue:${issueId}`, auth.session.email, JSON.stringify({ issueId, reference, resolution, resolvedAt: now }), now).run();
    return jsonResponse({ ok: true, issueId, reference, resolvedAt: now });
  }

  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD, POST" });
  const result = await env.MARKETPLACE_DB.prepare("SELECT id, listing_id, details, created_at FROM marketplace_admin_log WHERE action='submission_failure' ORDER BY created_at DESC LIMIT 100").all();
  const resolutionResult = await env.MARKETPLACE_DB.prepare("SELECT listing_id, admin_email, details, created_at FROM marketplace_admin_log WHERE action='submission_issue_resolved' ORDER BY created_at DESC LIMIT 200").all();
  const resolutions = new Map();
  for (const row of resolutionResult.results || []) {
    const key = cleanString(row.listing_id, 160);
    if (!key || resolutions.has(key)) continue;
    let detail = {}; try { detail = JSON.parse(row.details || "{}"); } catch (_) {}
    resolutions.set(key, { resolvedAt: cleanString(row.created_at || detail.resolvedAt, 80), resolution: cleanString(detail.resolution, 500), resolvedBy: cleanString(row.admin_email, 180) });
  }
  let issues = (result.results || []).map((row) => {
    const issue = marketplaceSubmissionIssueRecord(row);
    const resolution = resolutions.get(`submission-issue:${issue.issueId}`) || null;
    return { ...issue, resolved: Boolean(resolution), ...(resolution || {}) };
  });
  const url = new URL(request.url);
  const state = cleanString(url.searchParams.get("state") || "unresolved", 20);
  if (state === "resolved") issues = issues.filter((issue) => issue.resolved);
  else if (state !== "all") issues = issues.filter((issue) => !issue.resolved);

  let signals24h = { failed: 0, succeeded: 0 };
  try {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const funnel = await env.MARKETPLACE_DB.prepare("SELECT SUM(CASE WHEN event_type='seller_submission_failed' THEN 1 ELSE 0 END) AS failed, SUM(CASE WHEN event_type='seller_submission' THEN 1 ELSE 0 END) AS succeeded FROM marketplace_events WHERE created_at>=?").bind(cutoff).first();
    signals24h = { failed: Number(funnel?.failed) || 0, succeeded: Number(funnel?.succeeded) || 0 };
  } catch (_) {}
  const response = jsonResponse({ issues, count: issues.length, limit: 100, state, signals24h });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleMarketplaceHealth(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  let d1 = env.MARKETPLACE_DB ? "configured" : "unconfigured";
  let r2 = env.LISTING_IMAGES ? "configured" : "unconfigured";
  let pendingWorkflow = "unknown";
  let publicListingWorkflow = "unknown";
  if (env.MARKETPLACE_DB) {
    try {
      await env.MARKETPLACE_DB.prepare("SELECT 1 AS ok").first();
      d1 = "ok";
      await env.MARKETPLACE_DB.prepare("SELECT id FROM marketplace_listings WHERE status='pending_review' LIMIT 1").first();
      pendingWorkflow = "ok";
      await env.MARKETPLACE_DB.prepare("SELECT id FROM marketplace_listings WHERE status IN ('published','sold') LIMIT 1").first();
      publicListingWorkflow = "ok";
    } catch (error) {
      d1 = "error"; pendingWorkflow = "error"; publicListingWorkflow = "error";
      console.error(JSON.stringify({ event: "marketplace_health_d1_error", message: error instanceof Error ? error.message : String(error) }));
    }
  }
  if (env.LISTING_IMAGES) {
    try { if (typeof env.LISTING_IMAGES.list === "function") await env.LISTING_IMAGES.list({ limit: 1 }); r2 = "ok"; }
    catch (error) { r2 = "error"; console.error(JSON.stringify({ event: "marketplace_health_r2_error", message: error instanceof Error ? error.message : String(error) })); }
  }
  const notifications = Boolean(
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_TO || DEFAULT_MARKETPLACE_EMAIL_TO, 180)) &&
    isValidEmail(cleanString(env.MARKETPLACE_EMAIL_FROM || env.SOLAR_EMAIL_FROM, 180)) &&
    ((env.EMAIL && typeof env.EMAIL.send === "function") || (env.CLOUDFLARE_ACCOUNT_ID && env.CLOUDFLARE_EMAIL_API_TOKEN))
  ) ? "configured" : "unconfigured";
  const status = d1 === "ok" && r2 === "ok" && pendingWorkflow === "ok" && publicListingWorkflow === "ok" ? "ok" : "degraded";
  const payload = {
    status, build: OPERATIONS_BUILD, checkedAt: new Date().toISOString(),
    services: {
      marketplaceFrontend: env.ASSETS ? "configured" : "unconfigured",
      listingSubmissionEndpoint: "reachable",
      marketplaceDatabase: d1,
      marketplaceImages: r2,
      pendingListingWorkflow: pendingWorkflow,
      publicListingWorkflow,
      notifications,
    },
    note: "This health response verifies Marketplace infrastructure and read paths without exposing secrets or creating test records.",
  };
  const response = jsonResponse(payload, status === "ok" ? 200 : 503, { "Cache-Control": "no-store", "X-EUS-Operations-Build": OPERATIONS_BUILD, "X-Robots-Tag": "noindex, nofollow, noarchive" });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleMarketplaceSubmit(request, env) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const page = new URL(request.url).pathname;
  const userAgent = cleanString(request.headers.get("User-Agent"), 280);
  const clientRequestId = cleanString(request.headers.get("X-EUS-Request"), 100) || marketplaceSubmissionIssueReference();
  const retryCount = Math.max(0, Math.min(20, Number.parseInt(request.headers.get("X-EUS-Retry") || "0", 10) || 0));
  const requestBuild = cleanString(request.headers.get("X-EUS-Build"), 100) || OPERATIONS_BUILD;
  const analyticsSessionId = cleanString(request.headers.get("X-EUS-Session"), 100);

  if (!env.MARKETPLACE_DB || !env.LISTING_IMAGES) {
    const issue = await recordMarketplaceSubmissionIssue(env, { reference: clientRequestId, stage: "configuration", code: "storage_not_configured", httpStatus: 503, backendStatus: "unavailable", uploadStatus: "not_started", r2Status: env.LISTING_IMAGES ? "configured" : "unconfigured", d1Status: env.MARKETPLACE_DB ? "configured" : "unconfigured", page, userAgent, clientRequestId, retryCount, build: requestBuild });
    return jsonResponse({ error: "Marketplace storage is not configured", code: "storage_not_configured", reference: issue.reference }, 503);
  }

  const rateLimit = await marketplaceRateLimit(request, env);
  if (!rateLimit.allowed) {
    const issue = await recordMarketplaceSubmissionIssue(env, { reference: clientRequestId, stage: "rate_limit", code: "submission_rate_limited", httpStatus: 429, backendStatus: "rejected", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started", page, userAgent, clientRequestId, retryCount, build: requestBuild });
    return jsonResponse({ error: "Too many listing submissions from this connection. Please try again later.", code: "submission_rate_limited", reference: issue.reference }, 429, { "Retry-After": String(rateLimit.retryAfter || 20) });
  }

  const parsedSubmission = await parseLimitedMultipartFormData(request, MARKETPLACE_MAX_TOTAL_BYTES, "Submission");
  if (parsedSubmission.response) {
    const issue = await recordMarketplaceSubmissionIssue(env, { reference: clientRequestId, stage: "request_parse", code: "submission_body_invalid_or_too_large", httpStatus: parsedSubmission.response.status || 400, backendStatus: "rejected", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started", page, userAgent, clientRequestId, retryCount, build: requestBuild });
    return jsonResponse({ error: parsedSubmission.response.status === 413 ? "The full submission is too large. Please use fewer or smaller photos." : "The listing request could not be read. Please try again.", code: "submission_body_invalid_or_too_large", reference: issue.reference }, parsedSubmission.response.status || 400);
  }

  const form = parsedSubmission.form;
  if (marketplaceField(form, "website", 120)) return jsonResponse({ ok: true, ignored: true });
  const category = normalizeMarketplaceCategory(form.get("category"));
  const sellerName = marketplaceField(form, "sellerName", 120);
  const sellerEmail = marketplaceField(form, "sellerEmail", 180).toLowerCase();
  const sellerPhone = marketplaceField(form, "sellerPhone", 80);
  const city = marketplaceField(form, "city", 120);
  const state = marketplaceField(form, "state", 2).toUpperCase();
  const legacyLocation = marketplaceField(form, "location", 180);
  const location = city && MARKETPLACE_US_STATE_CODES.has(state) ? `${city}, ${state}` : legacyLocation;
  const locationValid = Boolean(city && MARKETPLACE_US_STATE_CODES.has(state));
  const year = Number.parseInt(marketplaceField(form, "year", 4), 10);
  const make = marketplaceField(form, "make", 120);
  const model = marketplaceField(form, "model", 160);
  const price = marketplaceField(form, "price", 80);
  const mileage = marketplaceField(form, "mileage", 80);
  const titleStatus = marketplaceField(form, "titleStatus", 120);
  const itemType = marketplaceItemType(category, form);
  const highlights = marketplaceField(form, "highlights", 2500);
  const conditionDisclosure = marketplaceField(form, "condition", 2500);
  const consent = marketplaceField(form, "submissionConsent", 20);
  const qaToken = marketplaceField(form, "qaToken", 1600);
  const reference = marketplaceReference();
  const submitStartedAt = new Date().toISOString();
  const submittedPhotoCount = marketplacePhotoSlots(category).filter((slot) => { const file=form.get(slot); return file instanceof File && file.size; }).length;
  const context = { reference, category, page, userAgent, clientRequestId, photoCount: submittedPhotoCount, retryCount, build: requestBuild };

  if (validAnalyticsSessionId(analyticsSessionId)) {
    await recordMarketplaceEvent(env, { eventId: crypto.randomUUID(), sessionId: analyticsSessionId, eventType: "seller_submit_start", category, page }).catch((error) => console.error(JSON.stringify({ event: "marketplace_submit_start_analytics_error", reference, message: error instanceof Error ? error.message : String(error) })));
  }
  sendMarketplaceEmail(env, {
    notificationType: "admin_marketplace_submission_attempt",
    subject: `Marketplace Submit Attempt — ${category ? category.toUpperCase() : "UNKNOWN"} — ${reference}`,
    text: ["Elevation UpScales Marketplace submit attempt", "", `Request: ${reference}`, `Client request: ${clientRequestId}`, `Category: ${category || "unknown"}`, `Route: ${page}`, `Photo count: ${submittedPhotoCount}`, `Retry count: ${retryCount}`, `Build: ${requestBuild}`, `Time: ${submitStartedAt}`, "", "This is an ATTEMPT alert, not proof of successful storage."].join("\n"),
  }).catch((error) => console.error(JSON.stringify({ event: "marketplace_submission_attempt_email_error", reference, message: error instanceof Error ? error.message : String(error) })));

  const qaTest = qaToken ? await verifyMarketplaceQaToken(qaToken, env) : false;
  if (qaToken && !qaTest) {
    await recordMarketplaceSubmissionIssue(env, { ...context, stage: "validation", code: "qa_token_invalid_or_expired", httpStatus: 400, backendStatus: "blocked", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started" });
    return jsonResponse({ error: "This Admin QA session expired. Open a new TEST form from Marketplace Operations.", code: "qa_token_invalid_or_expired", reference }, 400);
  }

  const bicycle = category === "bicycle"; const gear = category === "gear"; const flexibleYear = bicycle || gear;
  const yearValid = flexibleYear ? (!Number.isFinite(year) || (year >= 1900 && year <= new Date().getFullYear()+1)) : (Number.isFinite(year) && year >= 1900 && year <= new Date().getFullYear()+1);
  const makeValid = gear ? true : Boolean(make); const titleStatusValid = bicycle || gear ? true : Boolean(titleStatus);
  if (!category || !sellerName || !isValidEmail(sellerEmail) || !isValidPhone(sellerPhone) || !locationValid || !location || !yearValid || !makeValid || !model || !price || !titleStatusValid || !itemType || !highlights || !conditionDisclosure || consent !== "yes") {
    await recordMarketplaceSubmissionIssue(env, { ...context, stage: "validation", code: "required_fields_invalid", httpStatus: 400, backendStatus: "rejected", uploadStatus: "not_started", r2Status: "not_started", d1Status: "not_started" });
    if (validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission_failed",category,page}).catch(()=>{});
    return jsonResponse({ error: "Please complete all required listing and contact fields", code: "required_fields_invalid", reference }, 400);
  }

  const photos=[];
  for (const slot of marketplacePhotoSlots(category)) {
    const file=form.get(slot); if(!(file instanceof File)||!file.size) continue;
    if(!["image/jpeg","image/png","image/webp"].includes(file.type)) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"image_validation",code:"unsupported_image_type",httpStatus:400,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); return jsonResponse({error:"Photos must be JPEG, PNG, or WebP",code:"unsupported_image_type",reference},400); }
    if(file.size>MARKETPLACE_MAX_IMAGE_BYTES) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"image_validation",code:"image_too_large",httpStatus:413,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); return jsonResponse({error:"Each photo must be smaller than 10 MB",code:"image_too_large",reference},413); }
    if(!(await validMarketplaceImageSignature(file))) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"image_validation",code:"invalid_image_signature",httpStatus:400,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); return jsonResponse({error:"One or more files are not valid listing photos",code:"invalid_image_signature",reference},400); }
    photos.push({slot,file});
  }
  if(photos.length<marketplaceMinimumPhotos(category)) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"validation",code:"insufficient_photos",httpStatus:400,backendStatus:"rejected",uploadStatus:"failed",r2Status:"not_started",d1Status:"not_started"}); if(validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission_failed",category,page}).catch(()=>{}); return jsonResponse({error:category==="bicycle"||category==="gear"?"Please add at least two listing photos":"All four listing photos are required",code:"insufficient_photos",reference},400); }

  if(gear) {
    const schema=await env.MARKETPLACE_DB.prepare("SELECT sql FROM sqlite_master WHERE type='table' AND name='marketplace_listings'").first(); const schemaSql=String(schema?.sql||"");
    if(/CHECK\s*\(\s*category\s+IN/i.test(schemaSql)&&!/[\'\"]gear[\'\"]/i.test(schemaSql)) { await recordMarketplaceSubmissionIssue(env,{...context,stage:"schema",code:"category_schema_upgrade_required",httpStatus:503,backendStatus:"blocked",uploadStatus:"not_started",r2Status:"not_started",d1Status:"blocked"}); return jsonResponse({error:"Used Gear is temporarily unavailable until the administrator completes the marketplace schema upgrade.",code:"category_schema_upgrade_required",reference},503); }
  }

  const storedYear=Number.isFinite(year)?year:null; const id=crypto.randomUUID(); const createdAt=submitStartedAt; const categoryFields=marketplaceCategoryFields(category,form); if(qaTest) categoryFields.qaTest=true; const photoKeys=[]; let submissionStorageStage="image_storage";
  try {
    for(let index=0;index<photos.length;index+=1){const {slot,file}=photos[index]; const prepared=await prepareMarketplaceImage(file,env); const key=`marketplace/${id}/${index+1}-${slot}.${prepared.extension}`; await env.LISTING_IMAGES.put(key,prepared.body,{httpMetadata:{contentType:prepared.contentType,cacheControl:"public, max-age=31536000, immutable"},customMetadata:{listingId:id,slot,normalized:prepared.normalized?"true":"false"}}); photoKeys.push(key);}
    submissionStorageStage="database_save";
    await env.MARKETPLACE_DB.prepare(`INSERT INTO marketplace_listings (
      id, reference, category, status, seller_name, seller_email, seller_phone, location,
      year, make, model, price, mileage, title_status, item_type, category_fields_json,
      highlights, condition_disclosure, photo_keys_json, featured_photo, created_at, updated_at, notification_status
    ) VALUES (?, ?, ?, 'pending_review', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, 'pending')`).bind(id,reference,category,sellerName,sellerEmail,sellerPhone,location,storedYear,make,model,price,mileage,titleStatus,itemType,JSON.stringify(categoryFields),highlights,conditionDisclosure,JSON.stringify(photoKeys),createdAt,createdAt).run();
  } catch(error) {
    await Promise.all(photoKeys.map((key)=>env.LISTING_IMAGES.delete(key).catch(()=>{})));
    const issueCode=submissionStorageStage==="database_save"?"database_save_failed":"image_storage_failed";
    await recordMarketplaceSubmissionIssue(env,{...context,stage:submissionStorageStage,code:issueCode,httpStatus:500,backendStatus:"failed",uploadStatus:submissionStorageStage==="database_save"?"completed":"failed",r2Status:submissionStorageStage==="database_save"?"ok":"failed",d1Status:submissionStorageStage==="database_save"?"failed":"not_started"});
    if(validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission_failed",category,page}).catch(()=>{});
    console.error(JSON.stringify({event:"marketplace_submission_storage_error",reference,stage:submissionStorageStage,code:issueCode,clientRequestId,retryCount,build:requestBuild,message:error instanceof Error?error.message:String(error)}));
    return jsonResponse({error:"The listing could not be saved. Please try again.",code:issueCode,reference},500);
  }

  const record={id,reference,category,sellerName,sellerEmail,sellerPhone,location,year:storedYear,make,model,price,mileage,titleStatus,itemType,highlights,conditionDisclosure,createdAt};
  if(validAnalyticsSessionId(analyticsSessionId)) await recordMarketplaceEvent(env,{eventId:crypto.randomUUID(),sessionId:analyticsSessionId,eventType:"seller_submission",listingId:id,category,page}).catch((error)=>console.error(JSON.stringify({event:"marketplace_submission_analytics_error",reference,message:error instanceof Error?error.message:String(error)})));
  let emailDelivered=false;
  try { await sendMarketplaceEmail(env,{notificationType:"admin_new_marketplace_submission",subject:`Marketplace Submission SUCCESS — ${reference} — ${category.toUpperCase()}${qaTest?" — TEST DO NOT PUBLISH":""}`,text:marketplaceSubmissionText(record),replyTo:sellerEmail}); emailDelivered=true; await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET notification_status='sent', updated_at=? WHERE id=?").bind(new Date().toISOString(),id).run(); }
  catch(error){console.error(JSON.stringify({event:"marketplace_submission_email_error",reference,message:error instanceof Error?error.message:String(error)})); await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET notification_status='failed', updated_at=? WHERE id=?").bind(new Date().toISOString(),id).run();}
  return jsonResponse({ok:true,id,reference,status:"pending_review",emailDelivered,qaTest,build:OPERATIONS_BUILD},201);
}

async function handleMarketplacePublicListings(request, env) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  if (!env.MARKETPLACE_DB) return jsonResponse({ listings: [], count: 0, storageConfigured: false });
  const url = new URL(request.url);
  const requestedId = cleanString(url.searchParams.get("id") || "", 80);
  if (requestedId) {
    const row = await getMarketplaceRowWithViews(env, requestedId);
    if (!row || !["published", "sold"].includes(row.status)) return jsonResponse({ error: "Listing not found" }, 404, { "Cache-Control": "no-store" });
    const response = jsonResponse({ listing: marketplacePublicRecord(row), storageConfigured: true }, 200, { "Cache-Control": "no-store" });
    return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
  }
  let rows = [];
  try {
    const result = await env.MARKETPLACE_DB.prepare(`SELECT l.*, COALESCE(v.view_count, 0) AS view_count
      FROM marketplace_listings l
      LEFT JOIN (
        SELECT listing_id, COUNT(DISTINCT session_hash) AS view_count
        FROM marketplace_events
        WHERE event_type='listing_open' AND listing_id IS NOT NULL AND listing_id<>''
        GROUP BY listing_id
      ) v ON v.listing_id=l.id
      WHERE l.status IN ('published','sold')
      ORDER BY CASE l.status WHEN 'published' THEN 0 ELSE 1 END, l.published_at DESC, l.created_at DESC`).all();
    rows = result.results || [];
  } catch (error) {
    console.error(JSON.stringify({ event: "marketplace_view_count_public_fallback", message: error instanceof Error ? error.message : String(error) }));
    const result = await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings WHERE status IN ('published','sold') ORDER BY CASE status WHEN 'published' THEN 0 ELSE 1 END, published_at DESC, created_at DESC").all();
    rows = (result.results || []).map((row) => ({ ...row, view_count: 0 }));
  }
  const listings = rows.map(marketplacePublicRecord);
  const response = jsonResponse({ listings, count: listings.length, storageConfigured: true }, 200, { "Cache-Control": "public, max-age=10, s-maxage=10" });
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleMarketplaceImage(request, env, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  const parts = pathname.slice(MARKETPLACE_IMAGE_PREFIX.length).split("/");
  const id = cleanString(decodeURIComponent(parts[0] || ""), 80);
  const index = Number.parseInt(parts[1] || "0", 10);
  if (!id || !Number.isInteger(index) || index < 0 || index > 20 || !env.LISTING_IMAGES) return new Response("Not found", { status: 404 });
  const row = await getMarketplaceRow(env, id);
  if (!row) return new Response("Not found", { status: 404 });
  if (!["published", "sold"].includes(row.status)) {
    const auth = await requireAdmin(request, env);
    if (auth.response) return auth.response;
  }
  const keys = JSON.parse(row.photo_keys_json || "[]");
  const key = keys[index];
  if (!key) return new Response("Not found", { status: 404 });
  const object = await env.LISTING_IMAGES.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("ETag", object.httpEtag);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("Cache-Control", ["published", "sold"].includes(row.status) ? "public, max-age=86400" : "private, no-store");
  return request.method === "HEAD" ? new Response(null, { headers }) : new Response(object.body, { headers });
}

async function handleMarketplaceContact(request, env, pathname) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const intent = cleanString(request.headers.get("X-EUS-Contact-Intent"), 40);
  if (intent !== "reveal") return jsonResponse({ error: "Contact reveal intent is required" }, 400);
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Contact information is unavailable" }, 503);
  const allowance = await marketplaceContactAllowed(request, env);
  if (!allowance.allowed) {
    return jsonResponse({ error: "Seller contact reveal limit reached. Please try again later." }, 429, { "Retry-After": String(allowance.retryAfter || MARKETPLACE_CONTACT_THROTTLE_SECONDS) });
  }
  const id = cleanString(decodeURIComponent(pathname.slice(MARKETPLACE_CONTACT_PREFIX.length)), 80);
  const row = await getMarketplaceRow(env, id);
  if (!row || row.status !== "published") return jsonResponse({ error: "Contact information is unavailable" }, 404);
  const sessionId = cleanString(request.headers.get("X-EUS-Session"), 100);
  if (validAnalyticsSessionId(sessionId)) {
    const sessionHash = await analyticsSessionHash(sessionId, env);
    let priorInterest = null;
    if (sessionHash) {
      priorInterest = await env.MARKETPLACE_DB.prepare(`SELECT id FROM marketplace_events
        WHERE session_hash=? AND listing_id=? AND event_type='contact_reveal' LIMIT 1`).bind(sessionHash, id).first().catch(() => null);
    }
    await recordMarketplaceEvent(env, { eventId: crypto.randomUUID(), sessionId, eventType: "contact_reveal", listingId: id, category: row.category, page: `/marketplace/listing/${id}` }).catch((error) => {
      console.error(JSON.stringify({ event: "marketplace_contact_analytics_error", listingId: id, message: error instanceof Error ? error.message : String(error) }));
    });
    if (sessionHash && !priorInterest) {
      recordSiteAnalyticsPoint(env, { sessionHash, eventType: "listing_interest", eventValue: row.category, listingId: id, category: row.category, page: `/marketplace/listing/${id}`, reference: row.reference || id, source: "marketplace_show_contact" }, request);
    }
  }
  return jsonResponse({ name: row.seller_name.split(/\s+/)[0] || "Seller", phone: row.seller_phone }, 200, { "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow, noarchive" });
}

async function handleMarketplaceShare(request, env, pathname) {
  if (request.method !== "GET" && request.method !== "HEAD") return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD", "Cache-Control": "no-store", ...HTML_SECURITY_HEADERS } });
  const id = cleanString(decodeURIComponent(pathname.slice(MARKETPLACE_SHARE_PREFIX.length).split("/")[0] || ""), 80);
  if (!id) return new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store", ...HTML_SECURITY_HEADERS } });
  const row = await getMarketplaceRowWithViews(env, id);
  if (!row || !["published", "sold"].includes(row.status)) return new Response("Listing not found", { status: 404, headers: { "Cache-Control": "no-store", ...HTML_SECURITY_HEADERS } });
  const response = marketplaceSharePage(request, row);
  return request.method === "HEAD" ? new Response(null, { status: response.status, headers: response.headers }) : response;
}

async function handleAdminListings(request, env, pathname) {
  const auth = await requireAdmin(request, env);
  if (auth.response) return auth.response;
  if (!env.MARKETPLACE_DB) return jsonResponse({ error: "Marketplace database is not configured" }, 503);

  const suffix = pathname.slice(ADMIN_LISTINGS_PATH.length).replace(/^\//, "");
  const parts = suffix ? suffix.split("/") : [];
  const id = cleanString(parts[0], 80);
  const actionSegment = parts[1] || "";

  if (request.method === "GET" && !id) {
    const url = new URL(request.url);
    const status = cleanString(url.searchParams.get("status") || "pending_review", 40);
    const queryStatus = status === "all" ? "" : (MARKETPLACE_ADMIN_STATUSES.has(status) ? status : "pending_review");
    let rows = [];
    try {
      const base = `SELECT l.*, COALESCE(v.view_count, 0) AS view_count
        FROM marketplace_listings l
        LEFT JOIN (
          SELECT listing_id, COUNT(DISTINCT session_hash) AS view_count
          FROM marketplace_events
          WHERE event_type='listing_open' AND listing_id IS NOT NULL AND listing_id<>''
          GROUP BY listing_id
        ) v ON v.listing_id=l.id`;
      const result = queryStatus
        ? await env.MARKETPLACE_DB.prepare(`${base} WHERE l.status=? ORDER BY l.created_at DESC`).bind(queryStatus).all()
        : await env.MARKETPLACE_DB.prepare(`${base} ORDER BY l.created_at DESC`).all();
      rows = result.results || [];
    } catch (error) {
      console.error(JSON.stringify({ event: "admin_listing_view_count_fallback", message: error instanceof Error ? error.message : String(error) }));
      const result = queryStatus
        ? await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings WHERE status=? ORDER BY created_at DESC").bind(queryStatus).all()
        : await env.MARKETPLACE_DB.prepare("SELECT * FROM marketplace_listings ORDER BY created_at DESC").all();
      rows = (result.results || []).map((row) => ({ ...row, view_count: 0 }));
    }
    return jsonResponse({ listings: rows.map(marketplaceAdminRecord), count: rows.length });
  }

  if (request.method === "GET" && id) {
    const row = await getMarketplaceRowWithViews(env, id);
    return row ? jsonResponse({ listing: marketplaceAdminRecord(row) }) : jsonResponse({ error: "Listing not found" }, 404);
  }

  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const row = id ? await getMarketplaceRow(env, id) : null;
  if (!row) return jsonResponse({ error: "Listing not found" }, 404);

  if (actionSegment === "photos") {
    if (!env.LISTING_IMAGES) return jsonResponse({ error: "Listing image storage is not configured" }, 503);
    const keys = marketplacePhotoKeys(row);
    const indexSegment = parts[2];
    const photoIndex = indexSegment === undefined ? -1 : Number.parseInt(indexSegment, 10);

    if (request.method === "POST" && indexSegment === undefined) {
      const parsedUpload = await parseLimitedMultipartFormData(request, MARKETPLACE_MAX_TOTAL_BYTES, "Photo upload");
      if (parsedUpload.response) return parsedUpload.response;
      const form = parsedUpload.form;
      const files = form.getAll("photos").filter((file) => file instanceof File && file.size);
      if (!files.length) return jsonResponse({ error: "Choose at least one photo" }, 400);
      if (keys.length + files.length > MARKETPLACE_MAX_ADMIN_PHOTOS) return jsonResponse({ error: `A listing can have up to ${MARKETPLACE_MAX_ADMIN_PHOTOS} photos` }, 400);
      for (const file of files) {
        const error = await validateMarketplaceAdminPhoto(file);
        if (error) return jsonResponse({ error }, error.includes("10 MB") ? 413 : 400);
      }

      const uploaded = [];
      try {
        for (const file of files) {
          const prepared = await prepareMarketplaceImage(file, env);
          const key = `marketplace/${id}/admin-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${prepared.extension}`;
          await env.LISTING_IMAGES.put(key, prepared.body, {
            httpMetadata: { contentType: prepared.contentType, cacheControl: "public, max-age=31536000, immutable" },
            customMetadata: { listingId: id, slot: "admin-upload", normalized: prepared.normalized ? "true" : "false" },
          });
          uploaded.push(key);
        }
        const updatedRow = await updateMarketplacePhotoRecord(env, id, [...keys, ...uploaded], Math.min(Number(row.featured_photo) || 0, keys.length + uploaded.length - 1));
        await adminLog(env, id, "photos_added", auth.session.email, `${uploaded.length} photo(s) added`);
        return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
      } catch (error) {
        await Promise.all(uploaded.map((key) => env.LISTING_IMAGES.delete(key).catch(() => {})));
        return jsonResponse({ error: "The photos could not be added" }, 500);
      }
    }

    if (request.method === "PUT" && Number.isInteger(photoIndex) && photoIndex >= 0 && photoIndex < keys.length) {
      const parsedUpload = await parseLimitedMultipartFormData(request, ADMIN_SINGLE_PHOTO_MAX_TOTAL_BYTES, "Replacement photo");
      if (parsedUpload.response) return parsedUpload.response;
      const form = parsedUpload.form;
      const file = form.get("photo");
      const validationError = await validateMarketplaceAdminPhoto(file);
      if (validationError) return jsonResponse({ error: validationError }, validationError.includes("10 MB") ? 413 : 400);
      let replacementKey = "";
      try {
        const prepared = await prepareMarketplaceImage(file, env);
        replacementKey = `marketplace/${id}/admin-replacement-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${prepared.extension}`;
        await env.LISTING_IMAGES.put(replacementKey, prepared.body, {
          httpMetadata: { contentType: prepared.contentType, cacheControl: "public, max-age=31536000, immutable" },
          customMetadata: { listingId: id, slot: `replacement-${photoIndex + 1}`, normalized: prepared.normalized ? "true" : "false" },
        });
        const oldKey = keys[photoIndex];
        const nextKeys = [...keys];
        nextKeys[photoIndex] = replacementKey;
        const updatedRow = await updateMarketplacePhotoRecord(env, id, nextKeys, Math.min(Number(row.featured_photo) || 0, nextKeys.length - 1));
        await env.LISTING_IMAGES.delete(oldKey).catch(() => {});
        await adminLog(env, id, "photo_replaced", auth.session.email, `Photo ${photoIndex + 1} replaced`);
        return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
      } catch (error) {
        await env.LISTING_IMAGES.delete(replacementKey).catch(() => {});
        return jsonResponse({ error: "The photo could not be replaced" }, 500);
      }
    }

    if (request.method === "PATCH" && indexSegment === undefined) {
      let body;
      try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid photo action" }, 400); }
      const action = cleanString(body.action, 40);
      const index = Number.parseInt(body.index, 10);
      if (!Number.isInteger(index) || index < 0 || index >= keys.length) return jsonResponse({ error: "Photo not found" }, 404);
      let nextKeys = [...keys];
      let featured = Math.min(Number(row.featured_photo) || 0, Math.max(0, nextKeys.length - 1));
      let logDetails = "";
      if (action === "cover") {
        featured = index;
        logDetails = `Photo ${index + 1} set as cover`;
      } else if (action === "move") {
        const direction = body.direction === "left" ? -1 : body.direction === "right" ? 1 : 0;
        const target = index + direction;
        if (!direction || target < 0 || target >= nextKeys.length) return jsonResponse({ error: "Photo cannot move in that direction" }, 400);
        [nextKeys[index], nextKeys[target]] = [nextKeys[target], nextKeys[index]];
        if (featured === index) featured = target;
        else if (featured === target) featured = index;
        logDetails = `Photo ${index + 1} moved ${body.direction}`;
      } else {
        return jsonResponse({ error: "Invalid photo action" }, 400);
      }
      const updatedRow = await updateMarketplacePhotoRecord(env, id, nextKeys, featured);
      await adminLog(env, id, action === "cover" ? "cover_photo_changed" : "photo_reordered", auth.session.email, logDetails);
      return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
    }

    if (request.method === "DELETE" && Number.isInteger(photoIndex) && photoIndex >= 0 && photoIndex < keys.length) {
      if (keys.length <= 1) return jsonResponse({ error: "A listing must keep at least one photo" }, 400);
      const removedKey = keys[photoIndex];
      const nextKeys = keys.filter((_, index) => index !== photoIndex);
      const featured = adjustedFeaturedAfterDelete(Number(row.featured_photo) || 0, photoIndex, nextKeys.length);
      const updatedRow = await updateMarketplacePhotoRecord(env, id, nextKeys, featured);
      await env.LISTING_IMAGES.delete(removedKey).catch(() => {});
      await adminLog(env, id, "photo_deleted", auth.session.email, `Photo ${photoIndex + 1} deleted`);
      return jsonResponse({ ok: true, listing: marketplaceAdminRecord(updatedRow) });
    }

    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  if (request.method === "PATCH" && id && !actionSegment) {
    let body;
    try { body = await request.json(); } catch (_) { return jsonResponse({ error: "Invalid update" }, 400); }
    const editedYear = Number.parseInt(body.year ?? row.year, 10);
    const fields = {
      location: cleanString(body.location ?? row.location, 180),
      year: Number.isFinite(editedYear) ? editedYear : null,
      make: cleanString(body.make ?? row.make, 120),
      model: cleanString(body.model ?? row.model, 160),
      price: cleanString(body.price ?? row.price, 80),
      mileage: cleanString(body.mileage ?? row.mileage, 80),
      titleStatus: cleanString(body.titleStatus ?? row.title_status, 120),
      itemType: cleanString(body.itemType ?? row.item_type, 100),
      highlights: cleanString(body.highlights ?? row.highlights, 2500),
      conditionDisclosure: cleanString(body.conditionDisclosure ?? row.condition_disclosure, 2500),
      moderationNotes: cleanString(body.moderationNotes ?? row.moderation_notes, 2500),
      featuredPhoto: Math.max(0, Math.min(Math.max(0, marketplacePhotoKeys(row).length - 1), Number.parseInt(body.featuredPhoto ?? row.featured_photo, 10) || 0)),
    };
    const adminYearRequired = !["bicycle", "gear"].includes(row.category);
    const adminMakeRequired = row.category !== "gear";
    if (!fields.location || (adminYearRequired && !fields.year) || (adminMakeRequired && !fields.make) || !fields.model || !fields.price || !fields.itemType || !fields.highlights || !fields.conditionDisclosure) return jsonResponse({ error: "Required listing fields cannot be blank" }, 400);
    const now = new Date().toISOString();
    await env.MARKETPLACE_DB.prepare(`UPDATE marketplace_listings SET location=?, year=?, make=?, model=?, price=?, mileage=?, title_status=?, item_type=?, highlights=?, condition_disclosure=?, moderation_notes=?, featured_photo=?, updated_at=? WHERE id=?`).bind(
      fields.location, fields.year, fields.make, fields.model, fields.price, fields.mileage, fields.titleStatus, fields.itemType,
      fields.highlights, fields.conditionDisclosure, fields.moderationNotes, fields.featuredPhoto, now, id,
    ).run();
    await adminLog(env, id, "edit", auth.session.email, fields.moderationNotes);
    return jsonResponse({ ok: true, listing: marketplaceAdminRecord(await getMarketplaceRowWithViews(env, id)) });
  }

  if (request.method === "POST" && id && actionSegment === "action") {
    let body;
    try { body = await request.json(); } catch (_) { body = {}; }
    const action = cleanString(body.action, 40);
    const notes = cleanString(body.notes, 2500);
    const qaTest = marketplaceQaTestFromRow(row);
    if (action === "approve" && qaTest && body.confirmTestPublish !== true) {
      return jsonResponse({ error: "TEST — DO NOT PUBLISH requires explicit Admin publish confirmation" }, 409);
    }
    const now = new Date().toISOString();
    const statusMap = { approve: "published", reject: "rejected", request_changes: "changes_requested", mark_sold: "sold", unpublish: "unpublished", restore_pending: "pending_review" };
    const nextStatus = statusMap[action];
    if (!nextStatus) return jsonResponse({ error: "Invalid admin action" }, 400);
    const publishedAt = action === "approve" ? (row.published_at || now) : row.published_at;
    const soldAt = action === "mark_sold" ? now : (action === "restore_pending" ? null : row.sold_at);
    await env.MARKETPLACE_DB.prepare("UPDATE marketplace_listings SET status=?, moderation_notes=?, updated_at=?, published_at=?, sold_at=? WHERE id=?")
      .bind(nextStatus, notes || row.moderation_notes || "", now, publishedAt, soldAt, id).run();
    await adminLog(env, id, action, auth.session.email, notes);
    return jsonResponse({ ok: true, listing: marketplaceAdminRecord(await getMarketplaceRowWithViews(env, id)) });
  }

  if (request.method === "DELETE" && id) {
    const keys = marketplacePhotoKeys(row);
    const deletedAt = new Date().toISOString();
    await env.MARKETPLACE_DB.batch([
      env.MARKETPLACE_DB.prepare("INSERT INTO marketplace_admin_log (listing_id, action, admin_email, details, created_at) VALUES (?, ?, ?, ?, ?)")
        .bind(id, "delete", auth.session.email, cleanString(row.reference, 2000), deletedAt),
      env.MARKETPLACE_DB.prepare("DELETE FROM marketplace_listings WHERE id=?").bind(id),
    ]);
    const cleanup = await Promise.allSettled(keys.map((key) => env.LISTING_IMAGES?.delete(key)));
    const cleanupFailures = cleanup.filter((result) => result.status === "rejected").length;
    return jsonResponse({ ok: true, imageCleanupPending: cleanupFailures > 0, imageCleanupFailures: cleanupFailures });
  }

  return jsonResponse({ error: "Method not allowed" }, 405);
}



// v3.4.0 — Dedicated Start a Project + Regional Routing + Work With Us

export {
  handleAdminListings,
  handleAdminMarketplaceFollowups,
  handleAdminMarketplaceIssues,
  handleMarketplaceContact,
  handleMarketplaceHealth,
  handleMarketplaceImage,
  handleMarketplaceIssueReport,
  handleMarketplacePublicListings,
  handleMarketplaceQaValidate,
  handleMarketplaceShare,
  handleMarketplaceSubmit
};
