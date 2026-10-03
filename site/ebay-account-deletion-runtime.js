const SECURITY_HEADERS = {
  "Cache-Control": "no-store",
  "Content-Type": "application/json; charset=utf-8",
  "X-Content-Type-Options": "nosniff",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: SECURITY_HEADERS,
  });
}

function verificationToken(env) {
  const token = String(env?.EBAY_DELETION_VERIFICATION_TOKEN || "").trim();
  if (!/^[A-Za-z0-9_-]{32,80}$/.test(token)) {
    throw new Error("EBAY_DELETION_VERIFICATION_TOKEN_MISSING_OR_INVALID");
  }
  return token;
}

async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function handleEbayAccountDeletion(request, env) {
  if (request.method === "GET") {
    const url = new URL(request.url);
    const challengeCode = (url.searchParams.get("challenge_code") || "").trim();
    if (!challengeCode) return json({ error: "challenge_code required" }, 400);

    let token;
    try {
      token = verificationToken(env);
    } catch {
      return json({ error: "verification token unavailable" }, 503);
    }

    const challengeResponse = await sha256Hex(
      challengeCode + token + url.origin + url.pathname,
    );
    return json({ challengeResponse }, 200);
  }

  if (request.method === "POST") {
    try {
      verificationToken(env);
    } catch {
      return json({ error: "verification token unavailable" }, 503);
    }

    // eBay requires acknowledgement of deletion notifications.
    // This endpoint intentionally persists no notification payload or eBay user data.
    await request.arrayBuffer().catch(() => new ArrayBuffer(0));
    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  }

  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "GET, POST",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
