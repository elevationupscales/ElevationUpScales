import { resolveEmailRole } from "./email-role-routing.js";

const OWNER_ADDRESS = "casey@elevationupscales.com";

function cleanPath(value) {
  const path = String(value ?? "").split("?")[0].replace(/\/+$/, "") || "/";
  return path.toLowerCase();
}

export function publicEmailRoleForPath(pathname) {
  const path = cleanPath(pathname);
  if (path === "/work-with-us") return "owner";
  if (path === "/checkout" || path.startsWith("/order")) return "orders";
  if (path === "/shipping-logistics-services" || path === "/hawaii-lithium-batteries" || path.includes("hawaii") || path.includes("alaska")) return "logistics";
  if (path === "/store" || path === "/rv-store" || path === "/lithium-batteries" || path === "/sok-batteries" || path === "/product" || path.startsWith("/sok/")) return "sales";
  return "support";
}

export function rewriteRoleEmailText(text, pathname, env = {}) {
  const role = publicEmailRoleForPath(pathname);
  const address = resolveEmailRole(env, role);
  return String(text ?? "").replaceAll(OWNER_ADDRESS, address);
}

export async function rewritePublicEmailRoleSurface(response, pathname, env = {}) {
  if (!response?.ok || !response.body) return response;
  const path = cleanPath(pathname);
  const contentType = String(response.headers.get("Content-Type") || "").toLowerCase();
  const isHtml = contentType.includes("text/html");
  const isSiteShell = path === "/site-shell.js" && (contentType.includes("javascript") || contentType.includes("text/plain") || !contentType);
  if (!isHtml && !isSiteShell) return response;
  const source = await response.text();
  const rewritten = isSiteShell ? rewriteRoleEmailText(source, "/", env) : rewriteRoleEmailText(source, path, env);
  if (rewritten === source) return new Response(source, { status: response.status, statusText: response.statusText, headers: response.headers });
  const headers = new Headers(response.headers);
  headers.delete("Content-Length");
  return new Response(rewritten, { status: response.status, statusText: response.statusText, headers });
}
