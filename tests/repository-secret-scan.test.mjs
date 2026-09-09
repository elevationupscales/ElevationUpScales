import assert from "node:assert/strict";
import { forbiddenTrackedPath, scanText } from "../deployment/qa/repository-secret-scan.mjs";

assert.deepEqual(scanText("GOOGLE_CLIENT_ID\nGOOGLE_CLIENT_SECRET\nGOOGLE_REFRESH_TOKEN\nMAIL_FROM"), []);
assert.deepEqual(scanText("GOOGLE_CLIENT_SECRET='<redacted>'\nGOOGLE_REFRESH_TOKEN='PLACEHOLDER'"), []);

const googleClientSecret = "GOC" + "SPX-" + "abcdefghijklmnopqrstuvwxyz";
assert.ok(scanText(googleClientSecret).includes("Google OAuth client secret"));

const googleRefreshToken = "1/" + "/0g" + "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
assert.ok(scanText(googleRefreshToken).includes("Google OAuth refresh token"));

const literalClientSecret = "GOOGLE_CLIENT_SECRET=\"" + "abcdefghijklmnopqrstuvwxyz123456" + "\"";
assert.ok(scanText(literalClientSecret).includes("literal GOOGLE_CLIENT_SECRET assignment"));

const literalRefreshToken = "GOOGLE_REFRESH_TOKEN='" + "abcdefghijklmnopqrstuvwxyz1234567890" + "'";
assert.ok(scanText(literalRefreshToken).includes("literal GOOGLE_REFRESH_TOKEN assignment"));

assert.equal(forbiddenTrackedPath(".env").blocked, true);
assert.equal(forbiddenTrackedPath("config/.env.production").blocked, true);
assert.equal(forbiddenTrackedPath("site/.dev.vars").blocked, true);
assert.equal(forbiddenTrackedPath("private/client_secret_google.json").blocked, true);
assert.equal(forbiddenTrackedPath("keys/mail.pem").blocked, true);
assert.equal(forbiddenTrackedPath("artifacts/release.zip").blocked, true);
assert.equal(forbiddenTrackedPath("site/worker/shared/gmail-mail-provider.js").blocked, false);

console.log("repository-secret-scan.test.mjs: PASS");
