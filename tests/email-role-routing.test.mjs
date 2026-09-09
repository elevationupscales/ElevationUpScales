import assert from "node:assert/strict";
import test from "node:test";
import {
  EMAIL_ROLE_DEFAULTS,
  buildCustomerAcknowledgement,
  buildEmailRoleQaMessage,
  normalizeEmailRole,
  resolveEmailRole,
  roleForNotificationPath,
  sendCustomerAcknowledgement,
  withEmailRole,
} from "../site/worker/shared/email-role-routing.js";

test("role defaults are the approved public-safe Elevation aliases", () => {
  assert.deepEqual(EMAIL_ROLE_DEFAULTS, {
    owner: "casey@elevationupscales.com",
    sales: "sales@elevationupscales.com",
    orders: "orders@elevationupscales.com",
    logistics: "logistics@elevationupscales.com",
    support: "support@elevationupscales.com",
  });
});

test("resolver accepts valid role overrides and ignores invalid values", () => {
  assert.equal(resolveEmailRole({ EMAIL_SALES: "sales-team@example.com" }, "sales"), "sales-team@example.com");
  assert.equal(resolveEmailRole({ EMAIL_SALES: "not-an-email" }, "sales"), "sales@elevationupscales.com");
  assert.equal(normalizeEmailRole("unknown"), "support");
});

test("role-scoped environment preserves existing notification machinery", () => {
  const env = { OWNER_LEAD_EMAIL_TO: "legacy@example.com", SOLAR_EMAIL_TO: "legacy@example.com", OTHER: "keep" };
  const scoped = withEmailRole(env, "sales");
  assert.equal(scoped.OWNER_LEAD_EMAIL_TO, "sales@elevationupscales.com");
  assert.equal(scoped.SOLAR_EMAIL_TO, "sales@elevationupscales.com");
  assert.equal(scoped.MARKETPLACE_EMAIL_TO, "sales@elevationupscales.com");
  assert.equal(scoped.OTHER, "keep");
});

test("existing intake paths resolve to approved business lanes", () => {
  assert.equal(roleForNotificationPath("/api/solar-build-notify"), "sales");
  assert.equal(roleForNotificationPath("/api/project/submit"), "sales");
  assert.equal(roleForNotificationPath("/api/project/contact-request"), "sales");
  assert.equal(roleForNotificationPath("/api/work-with-us/submit"), "owner");
});

test("customer acknowledgement uses MAIL_FROM and role-specific Reply-To without promises", () => {
  const message = buildCustomerAcknowledgement({ MAIL_FROM: "elevation@example.com" }, "sales", {
    recipientEmail: "customer@example.com",
    recipientName: "Customer",
    reference: "QA-123",
    subject: "Request received",
    nextStep: "We will review the request.",
  });
  assert.equal(message.from.email, "elevation@example.com");
  assert.equal(message.replyTo, "sales@elevationupscales.com");
  assert.match(message.text, /does not promise inventory/i);
  assert.equal(message.text.includes("supplier"), false);
});

test("acknowledgement failure is non-destructive and returns a safe status", async () => {
  const env = { MAIL_FROM: "elevation@example.com", EMAIL: { send: async () => { const error = new Error("nope"); error.code = "provider_error"; throw error; } } };
  const result = await sendCustomerAcknowledgement(env, "support", { recipientEmail: "customer@example.com", reference: "QA-124", subject: "Received", nextStep: "We will review it." });
  assert.deepEqual(result, { status: "failed", messageId: "", errorCode: "provider_error" });
});

test("role QA is fixed to the selected Elevation alias and cannot accept arbitrary recipient/body", () => {
  const message = buildEmailRoleQaMessage({ MAIL_FROM: "elevation@example.com" }, "logistics", { timestamp: "2026-09-09T00:00:00Z", commit: "a".repeat(40) });
  assert.equal(message.to.email, "logistics@elevationupscales.com");
  assert.equal(message.replyTo, "logistics@elevationupscales.com");
  assert.equal(message.subject, "Elevation Email Role QA — LOGISTICS");
  assert.match(message.text, /synthetic internal QA traffic/i);
});
