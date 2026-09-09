import assert from "node:assert/strict";
import fs from "node:fs";
import {
  GMAIL_PROVIDER_QA_OIDC_AUDIENCE,
  GMAIL_PROVIDER_QA_OIDC_ISSUER,
  GMAIL_PROVIDER_QA_REF,
  GMAIL_PROVIDER_QA_REPOSITORY,
  GMAIL_PROVIDER_QA_SUBJECT,
  GMAIL_PROVIDER_QA_WORKFLOW_PATH,
  buildGmailProviderQaMessage,
  gmailProviderQaErrorCategory,
  githubActionsGmailQaAuthorized,
  validateGithubActionsQaClaims,
} from "../site/worker/shared/gmail-provider-qa.js";

assert.equal(GMAIL_PROVIDER_QA_SUBJECT, "Elevation Gmail Production Provider QA");

const nowMs = Date.parse("2026-09-09T04:00:00Z");
const nowSeconds = Math.floor(nowMs / 1000);
const validClaims = {
  iss: GMAIL_PROVIDER_QA_OIDC_ISSUER,
  aud: GMAIL_PROVIDER_QA_OIDC_AUDIENCE,
  repository: GMAIL_PROVIDER_QA_REPOSITORY,
  ref: GMAIL_PROVIDER_QA_REF,
  event_name: "push",
  environment: "production",
  workflow_ref: `${GMAIL_PROVIDER_QA_REPOSITORY}/${GMAIL_PROVIDER_QA_WORKFLOW_PATH}@${GMAIL_PROVIDER_QA_REF}`,
  sha: "a".repeat(40),
  iat: nowSeconds,
  nbf: nowSeconds - 10,
  exp: nowSeconds + 300,
};

assert.deepEqual(validateGithubActionsQaClaims(validClaims, nowMs), { ok: true, sha: "a".repeat(40) });
assert.equal(validateGithubActionsQaClaims({ ...validClaims, repository: "someone/else" }, nowMs).ok, false);
assert.equal(validateGithubActionsQaClaims({ ...validClaims, ref: "refs/heads/main" }, nowMs).ok, false);
assert.equal(validateGithubActionsQaClaims({ ...validClaims, environment: "preview" }, nowMs).ok, false);
assert.equal(validateGithubActionsQaClaims({ ...validClaims, aud: "wrong-audience" }, nowMs).ok, false);
assert.equal(validateGithubActionsQaClaims({ ...validClaims, exp: nowSeconds - 120 }, nowMs).ok, false);
assert.equal((await githubActionsGmailQaAuthorized("not-a-jwt", { fetchImpl: async () => { throw new Error("must not fetch"); }, nowMs })).ok, false);

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
assert.match(systemSource, /githubActionsGmailQaAuthorized/);
assert.match(systemSource, /gmailMailProviderConfigured\(env\)/);
assert.match(systemSource, /env\.EMAIL\.send\(message\)/);
assert.match(systemSource, /caches\.default/);
assert.doesNotMatch(systemSource, /request\.json\(/);

const workerSource = fs.readFileSync(new URL("../site/worker-core.js", import.meta.url), "utf8");
assert.match(workerSource, /ADMIN_GMAIL_PROVIDER_QA_PATH/);
assert.match(workerSource, /handleAdminGmailProviderQa\(request, env\)/);

console.log("gmail-provider-qa.test.mjs: PASS");
