import assert from "node:assert/strict";
import { __gmailMailProviderTest } from "../site/worker/shared/gmail-mail-provider.js";

const { base64Url, gmailConfigured, rawMessage } = __gmailMailProviderTest;

assert.equal(gmailConfigured({}), false);
assert.equal(gmailConfigured({
  GOOGLE_CLIENT_ID: "client-id",
  GOOGLE_CLIENT_SECRET: "client-secret",
  GOOGLE_REFRESH_TOKEN: "refresh-token",
  MAIL_FROM: "elevationupscales@gmail.com",
}), true);
assert.equal(gmailConfigured({
  GOOGLE_CLIENT_ID: "client-id",
  GOOGLE_CLIENT_SECRET: "client-secret",
  GOOGLE_REFRESH_TOKEN: "refresh-token",
  MAIL_FROM: "not-an-email",
}), false);

const env = { MAIL_FROM: "elevationupscales@gmail.com" };
const raw = rawMessage(env, {
  from: { email: "ignored@example.com", name: "Elevation UpScales" },
  to: { email: "customer@example.com", name: "Test Customer" },
  replyTo: "support@elevationupscales.com",
  subject: "Gmail provider QA",
  text: "Plain text body",
  html: "<p>HTML body</p>",
});

assert.match(raw, /^From: Elevation UpScales <elevationupscales@gmail\.com>/m);
assert.match(raw, /^To: Test Customer <customer@example\.com>/m);
assert.match(raw, /^Reply-To: support@elevationupscales\.com/m);
assert.match(raw, /^Subject: Gmail provider QA/m);
assert.match(raw, /Content-Type: multipart\/alternative/);
assert.doesNotMatch(raw, /ignored@example\.com/);

const encoded = base64Url("Elevation UpScales Gmail API");
assert.match(encoded, /^[A-Za-z0-9_-]+$/);
assert.equal(encoded.includes("="), false);

console.log("gmail-mail-provider.test.mjs: PASS");
