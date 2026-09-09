import assert from "node:assert/strict";
import fs from "node:fs";
import {
  GMAIL_PROVIDER_QA_SUBJECT,
  GMAIL_PROVIDER_QA_TOKEN_EXPIRES_AT,
  GMAIL_PROVIDER_QA_TOKEN_SHA256,
  buildGmailProviderQaMessage,
  gmailProviderQaErrorCategory,
  temporaryGmailQaTokenAuthorized,
} from "../site/worker/shared/gmail-provider-qa.js";

assert.equal(GMAIL_PROVIDER_QA_SUBJECT, "Elevation Gmail Production Provider QA");
assert.match(GMAIL_PROVIDER_QA_TOKEN_SHA256, /^[a-f0-9]{64}$/);
assert.ok(Date.parse(GMAIL_PROVIDER_QA_TOKEN_EXPIRES_AT) > Date.parse("2026-09-09T03:30:00Z"));
assert.equal(await temporaryGmailQaTokenAuthorized("definitely-not-the-deployment-token", Date.parse("2026-09-09T04:00:00Z")), false);
assert.equal(await temporaryGmailQaTokenAuthorized("anything", Date.parse("2026-09-10T00:00:00Z")), false);

const timestamp = "2026-09-09T04:00:00.000Z";
const message = buildGmailProviderQaMessage({ MAIL_FROM: "elevationupscales@gmail.com" }, { timestamp, commit: "abc123" });
assert.equal(message.from.email, "elevationupscales@gmail.com");
assert.equal(message.to.email, "elevationupscales@gmail.com");
assert.equal(message.subject, GMAIL_PROVIDER_QA_SUBJECT);
assert.match(message.text, /automated internal non-customer traffic/i);
assert.match(message.text, /Production commit: abc123/);
assert.match(message.text, new RegExp(timestamp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
assert.match(message.text, /No reply or action is required/);

assert.equal(gmailProviderQaErrorCategory({ code: "provider_auth" }), "provider_auth");
assert.equal(gmailProviderQaErrorCategory({ code: "provider_limited" }), "provider_limited");
assert.equal(gmailProviderQaErrorCategory(new Error("opaque failure")), "application_error");

const systemSource = fs.readFileSync(new URL("../site/worker/domains/system.js", import.meta.url), "utf8");
assert.match(systemSource, /handleAdminGmailProviderQa/);
assert.match(systemSource, /sameOriginRequest\(request\)/);
assert.match(systemSource, /requireAdmin\(request, env\)/);
assert.match(systemSource, /temporaryGmailQaTokenAuthorized/);
assert.match(systemSource, /gmailMailProviderConfigured\(env\)/);
assert.match(systemSource, /env\.EMAIL\.send\(message\)/);
assert.match(systemSource, /caches\.default/);
assert.doesNotMatch(systemSource, /request\.json\(/);

const workerSource = fs.readFileSync(new URL("../site/worker-core.js", import.meta.url), "utf8");
assert.match(workerSource, /ADMIN_GMAIL_PROVIDER_QA_PATH/);
assert.match(workerSource, /handleAdminGmailProviderQa\(request, env\)/);

console.log("gmail-provider-qa.test.mjs: PASS");
