import {
  STORE_BUILD,
  API_SECURITY_HEADERS,
  jsonResponse,
  getCatalog,
} from "../core-context.js";


async function handleRetiredLegacyMarketplaceImport(request) {
  if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "POST" });
  return jsonResponse({ error: "Legacy marketplace import was retired in v3.2.1" }, 410);
}

async function handleStoreProductsCompatibility(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return jsonResponse({ error: "Method not allowed" }, 405, { Allow: "GET, HEAD" });
  }

  try {
    const response = await getCatalog(request);
    return request.method === "HEAD"
      ? new Response(null, { status: response.status, headers: response.headers })
      : response;
  } catch (error) {
    console.error(JSON.stringify({
      event: "store_catalog_error",
      message: error instanceof Error ? error.message : String(error),
    }));
    return Response.json(
      { error: "The live catalog is temporarily unavailable." },
      {
        status: 502,
        headers: {
          "Cache-Control": "no-store",
          ...API_SECURITY_HEADERS,
          "X-EUS-Store-Build": STORE_BUILD,
        },
      },
    );
  }
}

export {
  handleRetiredLegacyMarketplaceImport,
  handleStoreProductsCompatibility,
};
