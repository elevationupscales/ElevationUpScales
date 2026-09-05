import {
  jsonResponse,
  cleanString,
  isValidEmail,
  isValidPhone,
  scheduleOwnerLeadNotification,
  workWithUsOwnerNotificationSpec,
  sameOriginRequest,
  durableRateLimit,
  recordSiteEvent,
  readLimitedJson,
  WWU_TYPES,
  projectReference,
  safeContactPayload,
  cleanWwuDetails,
} from "../core-context.js";


async function handleWorkWithUsSubmit(request,env,ctx){if(request.method!=="POST")return jsonResponse({error:"Method not allowed"},405,{Allow:"POST"});if(!sameOriginRequest(request))return jsonResponse({error:"Cross-origin request denied"},403);if(!env.LEADS_DB)return jsonResponse({error:"Opportunity storage is not configured"},503);const allowance=await durableRateLimit(env.LEADS_DB,request,env,"wwu-submit-hour",8,60*60);if(!allowance.allowed)return jsonResponse({error:"Too many submissions. Please try again later."},429,{"Retry-After":String(allowance.retryAfter||60)});const parsed=await readLimitedJson(request,24_000);if(parsed.error)return jsonResponse({error:"Invalid Work With Us submission"},400);const b=parsed.value||{},type=cleanString(b.opportunityType,30).toLowerCase(),contact=safeContactPayload({...b,consent:b.consent});if(!WWU_TYPES.has(type)||!contact.name||!isValidEmail(contact.email)||!contact.consent)return jsonResponse({error:"Name, valid email and contact permission are required"},400);if(type==="technician"&&!isValidPhone(contact.phone))return jsonResponse({error:"Technician opportunities require a usable phone number"},400);const reference=projectReference(`WWU-${type.toUpperCase()}`),now=new Date().toISOString(),message=cleanString(b.message,2500);if(!message)return jsonResponse({error:"Please include a short message"},400);const location=cleanString(b.location,180),source=cleanString(b.source,120)||"work-with-us",details=cleanWwuDetails(type,b.details);try{await env.LEADS_DB.prepare(`INSERT INTO work_with_us_opportunities (reference,opportunity_type,name,email,phone,location,preferred_contact,message,details_json,status,next_action,source,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(reference,type,contact.name,contact.email,contact.phone,location,contact.preferredContact,message,JSON.stringify(details),"new","Review Submission",source,now,now).run()}catch(error){if(/no such table/i.test(String(error?.message||error)))return jsonResponse({error:"Work With Us migration is required",migrationRequired:true},503);throw error}const ownerNotification=await scheduleOwnerLeadNotification(env,ctx,workWithUsOwnerNotificationSpec({reference,type,contact,location,message,source}));if(env.MARKETPLACE_DB&&cleanString(b.sessionId,100)){await recordSiteEvent(env,{eventType:"opportunity_submitted",eventValue:type,sessionId:cleanString(b.sessionId,100),reference,page:"/work-with-us",details:{source,status:"new"}},{serverConfirmed:true,request}).catch(()=>{})}return jsonResponse({ok:true,stored:true,reference,opportunityType:type,status:"new",ownerNotification},201)}

export {
  handleWorkWithUsSubmit
};
