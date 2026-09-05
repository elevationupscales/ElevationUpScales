import assert from "node:assert/strict";
import {
  API_SECURITY_HEADERS,
  HTML_SECURITY_HEADERS,
  htmlResponse,
  jsonResponse,
} from "../site/worker/shared/response.js";
import {
  escapeHtml,
  jsonForInlineScript,
} from "../site/worker/shared/html.js";
import {
  cleanList,
  cleanString,
  configuredEmail,
  hasBasicContact,
  hasEarlySolarContact,
  isValidEmail,
  isValidPhone,
} from "../site/worker/shared/validation.js";
import {
  sanitizeBuild,
  sanitizeContact,
  sanitizeSolarMilestone,
} from "../site/worker/shared/solar-sanitizers.js";

assert.equal(API_SECURITY_HEADERS["X-Frame-Options"], "DENY");
assert.equal(HTML_SECURITY_HEADERS["X-Frame-Options"], "SAMEORIGIN");

const response = jsonResponse({ ok: true }, 201, { "X-Test": "yes" });
assert.equal(response.status, 201);
assert.equal(response.headers.get("Cache-Control"), "no-store");
assert.equal(response.headers.get("X-Frame-Options"), "DENY");
assert.equal(response.headers.get("X-Test"), "yes");
assert.deepEqual(await response.json(), { ok: true });

const html = htmlResponse("<main>ok</main>");
assert.equal(html.status, 200);
assert.equal(html.headers.get("X-Frame-Options"), "SAMEORIGIN");
assert.match(html.headers.get("Content-Security-Policy"), /frame-ancestors 'self'/);
assert.equal(await html.text(), "<main>ok</main>");

assert.equal(
  escapeHtml('<script>alert("x")</script>'),
  "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;",
);
assert.equal(
  jsonForInlineScript({ value: "</script>&" }),
  '{"value":"\\u003c/script\\u003e\\u0026"}',
);

assert.equal(cleanString("  hello  ", 5), "hello");
assert.deepEqual(cleanList([" a ", "", "b"], 2, 10), ["a"]);
assert.equal(isValidEmail("ops@example.com"), true);
assert.equal(isValidEmail("bad@"), false);
assert.equal(configuredEmail("Elevation <Ops@Example.com>"), "ops@example.com");
assert.equal(isValidPhone("+1 (208) 813-4998"), true);
assert.equal(isValidPhone("123"), false);
assert.equal(
  hasBasicContact({
    name: "Casey",
    consent: true,
    email: "casey@example.com",
  }),
  true,
);
assert.equal(
  hasBasicContact({
    name: "Casey",
    consent: false,
    email: "casey@example.com",
  }),
  false,
);
assert.equal(
  hasEarlySolarContact({
    consent: true,
    phone: "208-813-4998",
  }),
  true,
);

const build = sanitizeBuild({
  package: "  Off Grid  ",
  loads: [" Fridge ", "Lights"],
  notes: "x".repeat(3_000),
});
assert.equal(build.package, "Off Grid");
assert.deepEqual(build.loads, ["Fridge", "Lights"]);
assert.equal(build.notes.length, 2_500);

const contact = sanitizeContact({
  name: " Casey ",
  email: " CASEY@EXAMPLE.COM ",
  consent: 1,
});
assert.equal(contact.name, "Casey");
assert.equal(contact.email, "casey@example.com");
assert.equal(contact.consent, true);

assert.equal(
  sanitizeSolarMilestone({ progressPercent: 120 }).progressPercent,
  100,
);
assert.equal(
  sanitizeSolarMilestone({ progressPercent: -10 }).progressPercent,
  0,
);
assert.equal(
  sanitizeSolarMilestone({ progressPercent: "" }).progressPercent,
  null,
);

console.log("shared-foundation.test.mjs: PASS");
