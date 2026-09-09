let tokenCache = { accessToken: "", expiresAt: 0 };

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function headerValue(value, max = 500) {
  return clean(value, max).replace(/[\r\n]+/g, " ").trim();
}

function validEmail(value) {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(headerValue(value, 320));
}

function utf8Base64(value) {
  const bytes = new TextEncoder().encode(String(value ?? ""));
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function base64Url(value) {
  return utf8Base64(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function mimeWord(value) {
  const text = headerValue(value, 500);
  return /^[\x20-\x7E]*$/.test(text) ? text : `=?UTF-8?B?${utf8Base64(text)}?=`;
}

function mailbox(email, name = "") {
  const safeEmail = headerValue(email, 320);
  const safeName = headerValue(name, 240);
  return safeName ? `${mimeWord(safeName)} <${safeEmail}>` : safeEmail;
}

function wrapBase64(value) {
  return utf8Base64(value).replace(/.{1,76}/g, "$&\r\n").trimEnd();
}

function gmailConfigured(env) {
  return Boolean(
    clean(env?.GOOGLE_CLIENT_ID, 1000) &&
    clean(env?.GOOGLE_CLIENT_SECRET, 1000) &&
    clean(env?.GOOGLE_REFRESH_TOKEN, 4000) &&
    validEmail(env?.MAIL_FROM)
  );
}

export function gmailMailProviderConfigured(env) {
  return gmailConfigured(env);
}

async function accessToken(env, forceRefresh = false) {
  if (!forceRefresh && tokenCache.accessToken && tokenCache.expiresAt > Date.now() + 30_000) {
    return tokenCache.accessToken;
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clean(env.GOOGLE_CLIENT_ID, 1000),
      client_secret: clean(env.GOOGLE_CLIENT_SECRET, 1000),
      refresh_token: clean(env.GOOGLE_REFRESH_TOKEN, 4000),
      grant_type: "refresh_token",
    }),
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.access_token) {
    const error = new Error(`Gmail OAuth token exchange failed (${response.status}).`);
    error.code = response.status === 400 || response.status === 401 ? "provider_auth" : "provider_error";
    throw error;
  }

  const expiresIn = Number.parseInt(String(body.expires_in ?? "3600"), 10);
  tokenCache = {
    accessToken: clean(body.access_token, 5000),
    expiresAt: Date.now() + (Number.isFinite(expiresIn) ? Math.max(60, expiresIn - 30) : 3570) * 1000,
  };
  return tokenCache.accessToken;
}

function rawMessage(env, message = {}) {
  const fromEmail = headerValue(env.MAIL_FROM, 320);
  const fromName = headerValue(message?.from?.name || "Elevation UpScales", 240);
  const toEmail = headerValue(message?.to?.email, 320);
  const toName = headerValue(message?.to?.name, 240);
  const replyTo = headerValue(message?.replyTo, 320);
  const subject = headerValue(message?.subject, 500);
  const text = String(message?.text ?? "");
  const html = String(message?.html ?? "");

  if (!validEmail(fromEmail) || !validEmail(toEmail) || !subject || (!text && !html)) {
    const error = new Error("Gmail message is missing a valid sender, recipient, subject, or body.");
    error.code = "template_error";
    throw error;
  }

  const headers = [
    `From: ${mailbox(fromEmail, fromName)}`,
    `To: ${mailbox(toEmail, toName)}`,
    ...(validEmail(replyTo) ? [`Reply-To: ${replyTo}`] : []),
    `Subject: ${mimeWord(subject)}`,
    "MIME-Version: 1.0",
  ];

  if (html) {
    const boundary = `eus_${crypto.randomUUID().replaceAll("-", "")}`;
    headers.push(
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      `--${boundary}`,
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      wrapBase64(text || "This message contains an HTML version."),
      `--${boundary}`,
      "Content-Type: text/html; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      wrapBase64(html),
      `--${boundary}--`,
      ""
    );
  } else {
    headers.push(
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: base64",
      "",
      wrapBase64(text),
      ""
    );
  }
  return headers.join("\r\n");
}

async function gmailSend(env, message) {
  const raw = base64Url(rawMessage(env, message));
  const send = async (forceRefresh = false) => {
    const token = await accessToken(env, forceRefresh);
    return fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ raw }),
    });
  };

  let response = await send(false);
  if (response.status === 401) {
    tokenCache = { accessToken: "", expiresAt: 0 };
    response = await send(true);
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok || !body?.id) {
    const error = new Error(`Gmail send failed (${response.status}).`);
    error.code = response.status === 401 || response.status === 403 ? "provider_auth" : response.status === 429 ? "provider_limited" : "provider_error";
    throw error;
  }
  return { messageId: clean(body.id, 240), threadId: clean(body.threadId, 240) };
}

export function withGmailMailProvider(env) {
  if (!gmailConfigured(env)) return env;
  const gmailBinding = { send: (message) => gmailSend(env, message) };
  return new Proxy(env, {
    get(target, property, receiver) {
      if (property === "EMAIL") return gmailBinding;
      if (property === "SOLAR_EMAIL_FROM" || property === "MARKETPLACE_EMAIL_FROM" || property === "OWNER_LEAD_EMAIL_FROM") {
        return clean(target.MAIL_FROM, 320);
      }
      return Reflect.get(target, property, receiver);
    },
  });
}

export const __gmailMailProviderTest = {
  base64Url,
  gmailConfigured,
  rawMessage,
};
