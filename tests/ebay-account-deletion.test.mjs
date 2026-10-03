import test from "node:test";
import assert from "node:assert/strict";
import { handleEbayAccountDeletion } from "../site/ebay-account-deletion-runtime.js";

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

test("eBay deletion challenge returns exact SHA-256 response", async () => {
  const token = "A".repeat(40);
  const endpoint = "https://elevationupscales.com/api/ebay/account-deletion";
  const challenge = "challenge-123";
  const request = new Request(endpoint + "?challenge_code=" + challenge);

  const response = await handleEbayAccountDeletion(request, {
    EBAY_DELETION_VERIFICATION_TOKEN: token,
  });

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "no-store");
  assert.deepEqual(await response.json(), {
    challengeResponse: await sha256Hex(challenge + token + endpoint),
  });
});

test("eBay deletion challenge fails closed without verification secret", async () => {
  const response = await handleEbayAccountDeletion(
    new Request("https://elevationupscales.com/api/ebay/account-deletion?challenge_code=x"),
    {},
  );
  assert.equal(response.status, 503);
});

test("eBay deletion POST acknowledges without persisting payload", async () => {
  const response = await handleEbayAccountDeletion(
    new Request("https://elevationupscales.com/api/ebay/account-deletion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notification: { data: "test" } }),
    }),
    { EBAY_DELETION_VERIFICATION_TOKEN: "B".repeat(40) },
  );
  assert.equal(response.status, 204);
  assert.equal(await response.text(), "");
});

test("eBay deletion endpoint rejects unsupported methods", async () => {
  const response = await handleEbayAccountDeletion(
    new Request("https://elevationupscales.com/api/ebay/account-deletion", {
      method: "PUT",
    }),
    { EBAY_DELETION_VERIFICATION_TOKEN: "C".repeat(40) },
  );
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("Allow"), "GET, POST");
});
