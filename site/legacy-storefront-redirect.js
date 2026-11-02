// Shopify-first storefront migration, Phase 1.
// Scope: the root legacy store landing only. Query-dependent department and
// SKU-linked URLs remain on the existing site pending explicit mapping review.
// This module deliberately does not touch the company homepage, Hawaii freight,
// customer-intake forms, historical orders, or administrative/API endpoints.
const SHOPIFY_STORE_URL = "https://shop.elevationupscales.com/";

export function redirectLegacyStoreLanding(request) {
  const method = request?.method || "";
  if (method !== "GET" && method !== "HEAD") return null;

  const url = new URL(request.url);
  // Host is controlled by the Cloudflare Pages Worker. Allow preview domains
  // so the same route can be verified before production deployment.

  const landingPaths = new Set(["/store", "/store/", "/store.html"]);
  if (!landingPaths.has(url.pathname)) return null;

  // Defer links that represent a department, deep-link, or campaign query
  // until an exact Shopify destination is mapped and verified.
  if (url.search) return null;

  // Temporary redirect: preserve a reliable rollback while we verify the
  // customer journey. Permanent redirects require separate SEO validation.
  return new Response(null, {
    status: 302,
    headers: {
      "Location": SHOPIFY_STORE_URL,
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
