import { clientScript } from './client.js';
import { CANONICAL_ORIGIN, canonicalUrl, getPublicRoute, getSitemapRoutes, resolveCompatibilityRedirect } from './routes.js';
import { renderNotFound, renderPublicPage } from './shell.js';
import { styles } from './styles.js';

const baseHeaders = {
  'Cache-Control': 'no-store',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'"
};

function response(body, init = {}) {
  const headers = new Headers(baseHeaders);
  for (const [key, value] of Object.entries(init.headers || {})) headers.set(key, value);
  return new Response(body, { ...init, headers });
}

function json(payload, status = 200) {
  return response(JSON.stringify(payload, null, 2), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  });
}

function html(body, status = 200) {
  return response(body, {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}

function redirect(location, status) {
  return response(null, {
    status,
    headers: { Location: location }
  });
}

function robotsText(url) {
  if (url.origin !== CANONICAL_ORIGIN) {
    return 'User-agent: *\nDisallow: /\n';
  }

  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /healthz',
    '',
    `Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml`,
    ''
  ].join('\n');
}

function sitemapXml() {
  const entries = getSitemapRoutes()
    .map((routeInfo) => `  <url><loc>${canonicalUrl(routeInfo)}</loc></url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
}

function currentPublicBridge(url, routeInfo) {
  if (!routeInfo || routeInfo.implemented) return null;
  if (url.origin === CANONICAL_ORIGIN) return null;
  return `${CANONICAL_ORIGIN}${routeInfo.path}${url.search}`;
}

export default {
  async fetch(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }

    const url = new URL(request.url);

    if (url.pathname === '/healthz') {
      return json({
        status: 'ok',
        service: 'elevation-web-v2',
        phase: 'phase-1-step-4-shell',
        commerceConnected: false,
        opsConnected: false
      });
    }

    if (url.pathname === '/robots.txt') {
      return response(robotsText(url), {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    if (url.pathname === '/sitemap.xml') {
      return response(sitemapXml(), {
        headers: {
          'Content-Type': 'application/xml; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    if (url.pathname === '/assets/app.css') {
      return response(styles, {
        headers: {
          'Content-Type': 'text/css; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    if (url.pathname === '/assets/app.js') {
      return response(clientScript, {
        headers: {
          'Content-Type': 'text/javascript; charset=utf-8',
          'Cache-Control': 'public, max-age=300'
        }
      });
    }

    const compatibilityRedirect = resolveCompatibilityRedirect(url);
    if (compatibilityRedirect) {
      return redirect(compatibilityRedirect.location, compatibilityRedirect.status);
    }

    const routeInfo = getPublicRoute(url.pathname);
    if (routeInfo?.implemented) {
      return html(renderPublicPage(routeInfo));
    }

    const bridgeLocation = currentPublicBridge(url, routeInfo);
    if (bridgeLocation) {
      return redirect(bridgeLocation, 307);
    }

    return html(renderNotFound(), 404);
  }
};
