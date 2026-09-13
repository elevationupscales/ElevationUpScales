import { clientScript } from './client.js';
import { cartClientScript } from './cart-client.js';
import { renderCartPage } from './cart-page.js';
import { cartStyles } from './cart-styles.js';
import { parseCartItems, resolveCartLines } from './cart.js';
import { checkoutClientScript } from './checkout-client.js';
import { renderCheckoutPage } from './checkout-page.js';
import { checkoutStyles } from './checkout-styles.js';
import { resolveCheckout } from './checkout.js';
import { createOrderFromCheckout, captureOrderPayment } from './order-service.js';
import { catalogStyles } from './catalog-styles.js';
import { navStyles } from './nav-styles.js';
import { CANONICAL_ORIGIN, canonicalUrl, getPublicRoute, getSitemapRoutes, resolveCompatibilityRedirect } from './routes.js';
import { renderCatalogPage } from './catalog-pages.js';
import { renderNotFound, renderPublicPage } from './shell.js';
import { styles } from './styles.js';

const baseHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' https://elevationupscales.com data:; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
};

function response(body, init = {}) {
  const headers = new Headers(baseHeaders);
  for (const [key, value] of Object.entries(init.headers || {})) headers.set(key, value);
  return new Response(body, { ...init, headers });
}

function json(payload, status = 200) {
  return response(JSON.stringify(payload, null, 2), { status, headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

function html(body, status = 200) {
  return response(body, { status, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
}

function redirect(location, status) { return response(null, { status, headers: { Location: location } }); }

function mutationOriginAllowed(request) {
  const origin = request.headers.get('Origin');
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function robotsText(url) {
  if (url.origin !== CANONICAL_ORIGIN) return 'User-agent: *\nDisallow: /\n';
  return ['User-agent: *', 'Allow: /', 'Disallow: /healthz', 'Disallow: /__version', '', `Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`, ''].join('\n');
}

function sitemapXml() {
  const entries = getSitemapRoutes().map((routeInfo) => `  <url><loc>${canonicalUrl(routeInfo)}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function currentPublicBridge(url, routeInfo) {
  if (!routeInfo || routeInfo.implemented) return null;
  if (url.origin === CANONICAL_ORIGIN) return null;
  return `${CANONICAL_ORIGIN}${routeInfo.path}${url.search}`;
}

function versionPayload(env) {
  const meta = env?.CF_VERSION_METADATA || {};
  return { service: 'elevation-web-v2', id: meta.id || null, tag: meta.tag || null, timestamp: meta.timestamp || null };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const checkoutResolvePost = url.pathname === '/api/checkout/resolve' && request.method === 'POST';
    const orderCreatePost = url.pathname === '/api/order/create' && request.method === 'POST';
    const orderCaptureMatch = url.pathname.match(/^\/api\/order\/paypal\/([A-Z0-9-]{8,80})\/capture$/i);
    const orderCapturePost = Boolean(orderCaptureMatch) && request.method === 'POST';
    const allowedMutation = checkoutResolvePost || orderCreatePost || orderCapturePost;

    if (request.method !== 'GET' && request.method !== 'HEAD' && !allowedMutation) {
      return response('Method Not Allowed', { status: 405, headers: { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' } });
    }

    if (checkoutResolvePost) {
      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: 'INVALID_CHECKOUT_PAYLOAD' }, 400);
      }
      if (!payload || !Array.isArray(payload.items)) return json({ error: 'INVALID_CHECKOUT_PAYLOAD' }, 400);
      return json(resolveCheckout(payload.items, payload.destination));
    }

    if (orderCreatePost) {
      if (!mutationOriginAllowed(request)) return json({ error: 'CROSS_ORIGIN_ORDER_DENIED' }, 403);
      let payload;
      try {
        payload = await request.json();
      } catch {
        return json({ error: 'INVALID_ORDER_PAYLOAD' }, 400);
      }
      const result = await createOrderFromCheckout(payload, env);
      return json(result.body, result.status);
    }

    if (orderCapturePost) {
      if (!mutationOriginAllowed(request)) return json({ error: 'CROSS_ORIGIN_CAPTURE_DENIED' }, 403);
      const result = await captureOrderPayment(orderCaptureMatch[1], env);
      return json(result.body, result.status);
    }

    if (url.pathname === '/__version') return json(versionPayload(env));

    if (url.pathname === '/healthz') {
      return json({ status: 'ok', service: 'elevation-web-v2', phase: 'commercial-retail-rebuild', commerceConnected: false, opsConnected: false, version: versionPayload(env) });
    }

    if (url.pathname === '/robots.txt') {
      return response(robotsText(url), { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/sitemap.xml') {
      return response(sitemapXml(), { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/assets/app.css') {
      return response(`${styles}\n${navStyles}\n${catalogStyles}\n${cartStyles}\n${checkoutStyles}`, { headers: { 'Content-Type': 'text/css; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/assets/app.js') {
      return response(clientScript, { headers: { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/assets/cart.js') {
      return response(cartClientScript, { headers: { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/assets/checkout.js') {
      return response(checkoutClientScript, { headers: { 'Content-Type': 'text/javascript; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }

    if (url.pathname === '/api/cart/resolve') {
      const requestedLines = parseCartItems(url.searchParams.get('items'));
      if (requestedLines === null) return json({ error: 'INVALID_CART_PAYLOAD' }, 400);
      return json(resolveCartLines(requestedLines));
    }

    if (url.pathname === '/cart') return html(renderCartPage());
    if (url.pathname === '/checkout') return html(renderCheckoutPage());

    const compatibilityRedirect = resolveCompatibilityRedirect(url);
    if (compatibilityRedirect) return redirect(compatibilityRedirect.location, compatibilityRedirect.status);

    const routeInfo = getPublicRoute(url.pathname);
    if (routeInfo?.implemented) {
      if (['store', 'vendor', 'product'].includes(routeInfo.page)) {
        const catalogPage = renderCatalogPage(routeInfo, url);
        if (catalogPage) return html(catalogPage);
        return html(renderNotFound(), 404);
      }
      return html(renderPublicPage(routeInfo));
    }

    const bridgeLocation = currentPublicBridge(url, routeInfo);
    if (bridgeLocation) return redirect(bridgeLocation, 307);

    return html(renderNotFound(), 404);
  }
};
