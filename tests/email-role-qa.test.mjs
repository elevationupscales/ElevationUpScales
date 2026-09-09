import assert from "node:assert/strict";
import fs from "node:fs";

const roleQaSource = fs.readFileSync(new URL("../site/worker/domains/email-role-qa.js", import.meta.url), "utf8");
assert.match(roleQaSource, /sameOriginRequest\(request\)/);
assert.match(roleQaSource, /gmailQaAuthorization\(request, env\)/);
assert.match(roleQaSource, /EMAIL_ROLE_QA_ROLES/);
assert.match(roleQaSource, /request\.json\(\)/);
assert.match(roleQaSource, /env\.EMAIL\.send\(message\)/);
assert.match(roleQaSource, /caches\.default/);
assert.doesNotMatch(roleQaSource, /body\?\.(?:to|recipient|subject|text|html)/);

const systemSource = fs.readFileSync(new URL("../site/worker/domains/system.js", import.meta.url), "utf8");
assert.doesNotMatch(systemSource, /request\.json\(/);
assert.match(systemSource, /gmailQaAuthorization/);

console.log("email-role-qa.test.mjs: PASS");
