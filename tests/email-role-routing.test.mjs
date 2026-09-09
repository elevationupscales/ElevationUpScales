import assert from "node:assert/strict";
import test from "node:test";
import {
  EMAIL_ROLE_DEFAULTS,
  normalizeEmailRole,
  resolveEmailRole,
  roleForNotificationPath,
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

test("existing intake paths resolve to the approved business lanes", () => {
  assert.equal(roleForNotificationPath("/api/solar-build-notify"), "sales");
  assert.equal(roleForNotificationPath("/api/project/submit"), "sales");
  assert.equal(roleForNotificationPath("/api/project/contact-request"), "sales");
  assert.equal(roleForNotificationPath("/api/work-with-us/submit"), "owner");
});
