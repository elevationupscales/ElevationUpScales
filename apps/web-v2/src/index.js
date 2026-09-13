import { renderShell } from './shell.js';
import { styles } from './styles.js';
import { clientScript } from './client.js';

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

    if (url.pathname === '/' || url.pathname === '/start-a-project') {
      return html(renderShell({ startProject: url.pathname === '/start-a-project' }));
    }

    return html(renderShell({ notFound: true }), 404);
  }
};
