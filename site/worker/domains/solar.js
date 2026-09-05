import {
  OPERATIONS_BUILD,
  SOLAR_NOTIFY_MAX_BYTES,
  jsonResponse,
  cleanString,
  sanitizeBuild,
  sanitizeContact,
  isValidEmail,
  isValidPhone,
  hasEarlySolarContact,
  sanitizeSolarMilestone,
  rateLimitSolarNotification,
  saveLead,
  solarBuilderStage,
  solarProjectOpportunityRow,
  solarContactFromOpportunity,
  syncSolarProjectOpportunity,
  solarOwnerNotificationSpec,
  scheduleOwnerLeadNotification,
  recordSolarFunnelStage,
  sameOriginRequest,
  requireAdmin,
  recordSiteEvent,
  validAnalyticsSessionId,
  createSolarQaToken,
  verifySolarQaToken,
} from "../core-context.js";


async function handleSolarNotification(request, env, ctx) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  if (!sameOriginRequest(request)) return jsonResponse({ error: "Cross-origin request denied" }, 403);
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > SOLAR_NOTIFY_MAX_BYTES) return jsonResponse({ error: "Payload too large" }, 413);
  let raw; try { const bodyText=await request.text(); if(bodyText.length>SOLAR_NOTIFY_MAX_BYTES)return jsonResponse({error:"Payload too large"},413); raw=JSON.parse(bodyText); } catch(_){ return jsonResponse({error:"Invalid JSON"},400); }
  if(cleanString(raw.website,120))return jsonResponse({ok:true,ignored:true});
  const allowedEvents=new Set(["builder_started","builder_progress","review_opened","lead_submitted"]),eventType=cleanString(raw.eventType,40);
  if(!allowedEvents.has(eventType))return jsonResponse({error:"Invalid event type"},400);
  const reference=cleanString(raw.reference,80),page=cleanString(raw.page,500),createdAt=cleanString(raw.createdAt,80)||new Date().toISOString(),build=sanitizeBuild(raw.build),incomingContact=sanitizeContact(raw.contact||{}),milestone=sanitizeSolarMilestone(raw.milestone),analyticsSessionId=cleanString(raw.sessionId,100),journeyId=cleanString(raw?.journeyId,120),projectContext=raw?.projectContext;
  if(!reference||!build.package||!build.panel||!build.battery)return jsonResponse({error:"Incomplete build payload"},400);
  const existingOpportunity=await solarProjectOpportunityRow(env,reference);
  if(eventType==="builder_started"&&!hasEarlySolarContact(incomingContact))return jsonResponse({error:"A valid phone number or email and contact permission are required"},400);
  if(eventType!=="builder_started"&&!existingOpportunity)return jsonResponse({error:"Solar Lead reference was not found. Restart the Builder save step before continuing.",reference,stored:false},409);
  if(existingOpportunity&&cleanString(existingOpportunity.intake_status,40)==="submitted"&&eventType!=="lead_submitted")return jsonResponse({error:"This Solar Lead has already been submitted. Start a new build to make another request.",reference,stored:true,completed:true},409);
  if(eventType==="lead_submitted"&&(!incomingContact.name||!isValidPhone(incomingContact.phone)||!isValidEmail(incomingContact.email)||!incomingContact.consent))return jsonResponse({error:"Complete contact information and consent are required"},400);
  const effectiveContact=(eventType!=="builder_started"&&eventType!=="lead_submitted"&&!hasEarlySolarContact(incomingContact))?solarContactFromOpportunity(existingOpportunity):incomingContact;
  const solarAllowance=await rateLimitSolarNotification(request,eventType,env);
  if(!solarAllowance.allowed){if(solarAllowance.retryAfter<=300){const existing=existingOpportunity||await solarProjectOpportunityRow(env,reference);return jsonResponse({ok:true,duplicate:true,reference,stored:Boolean(existing),emailDelivered:false,ownerNotification:{status:"deduped"}});}return jsonResponse({error:"Too many Solar Builder requests from this connection. Please try again later."},429,{"Retry-After":String(solarAllowance.retryAfter||60)});}
  const initialStore=await saveLead(env,{eventType,reference,build,contact:effectiveContact,page,createdAt,emailStatus:eventType==="builder_progress"?"not_requested":"scheduled"});
  if(!initialStore.stored)return jsonResponse({error:"Solar technical progress could not be stored.",reference,stored:false},503);
  const opportunityStore=await syncSolarProjectOpportunity(env,{eventType,reference,build,contact:effectiveContact,journeyId,projectContext,milestone,page});
  if(!opportunityStore.stored)return jsonResponse({error:opportunityStore.reason==="missing_reference"?"Solar Lead reference was not found.":"Solar Lead could not be stored in Leads Center.",reference,stored:false},opportunityStore.reason==="missing_reference"?409:503);
  if(validAnalyticsSessionId(analyticsSessionId)){
    const funnelDetails={sessionId:analyticsSessionId,reference,page,build,stage:opportunityStore.stage};
    if(eventType==="builder_started"){await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_contact_captured",eventValue:"contact_captured"},request).catch(()=>{});await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_lead_created",eventValue:"lead_created"},request).catch(()=>{});await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_build_started",eventValue:"build_started"},request).catch(()=>{});}
    else if(eventType==="review_opened")await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_review_opened",eventValue:"review_opened"},request).catch(()=>{});
    else if(eventType==="lead_submitted"){await recordSolarFunnelStage(env,{...funnelDetails,eventType:"solar_completed_submitted",eventValue:"completed_submitted"},request).catch(()=>{});await recordSiteEvent(env,{eventType:"lead_submitted",eventValue:cleanString(raw?.build?.package,120).toLowerCase(),sessionId:analyticsSessionId,reference,page,details:{package:cleanString(raw?.build?.package,120),classification:build.classification,source:"Solar Builder",build:OPERATIONS_BUILD}},{serverConfirmed:true,request}).catch(error=>console.error(JSON.stringify({event:"solar_lead_intent_tracking_error",reference,message:error instanceof Error?error.message:String(error)})));}
  }
  if(eventType==="builder_progress")return jsonResponse({ok:true,reference,stored:true,emailDelivered:false,ownerNotification:{status:"not_requested"},stage:opportunityStore.stage});
  const spec=solarOwnerNotificationSpec({reference,eventType,contact:effectiveContact,build,stageLabel:solarBuilderStage(eventType).label}),ownerNotification=await scheduleOwnerLeadNotification(env,ctx,spec);
  return jsonResponse({ok:true,reference,stored:true,emailDelivered:ownerNotification.status==="sent",notificationQueued:["scheduled","sent","deduped"].includes(ownerNotification.status),ownerNotification,stage:opportunityStore.stage},eventType==="builder_started"?201:200);
}

async function handleAdminSolarQaToken(request,env){const auth=await requireAdmin(request,env);if(auth.response)return auth.response;if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);return jsonResponse({ok:true,...await createSolarQaToken(env)})}

async function handleSolarQaValidate(request,env){if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);let body;try{body=await request.json()}catch(_){body={}};if(!await verifySolarQaToken(body.qaToken,env))return jsonResponse({valid:false,error:"Solar QA link is invalid or expired"},403);const suffix=crypto.randomUUID().split("-")[0].toUpperCase();return jsonResponse({valid:true,reference:`QA-SOLAR-${suffix}`,journeyId:`qa-journey-${suffix}`,contact:{name:"QA Solar Tester",firstName:"QA",phone:"2085550199",email:"qa-solar-test@example.invalid",preferred:"Email",consent:true,location:"TEST — DO NOT PUBLISH",rv:"TEST — DO NOT PUBLISH",timing:"QA",installLocation:"QA",available:"QA",details:"TEST — DO NOT PUBLISH"}},200)}

export {
  handleAdminSolarQaToken,
  handleSolarNotification,
  handleSolarQaValidate
};
