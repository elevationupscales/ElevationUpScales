(() => {
  const ENDPOINT = '/api/marketplace/event';
  const SESSION_KEY = 'eus-marketplace-session:v1';
  const marketplacePath = location.pathname === '/marketplace' || location.pathname.startsWith('/marketplace/listing/') || location.pathname === '/make-a-listing' || /^\/list-(an?|used-)/.test(location.pathname);
  if (!marketplacePath || location.pathname.startsWith('/admin') || location.pathname.startsWith('/api/')) return;

  const newId = () => {
    if (crypto?.randomUUID) return crypto.randomUUID();
    const bytes = new Uint8Array(16); crypto.getRandomValues(bytes);
    return [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  };
  const getSessionId = () => {
    try {
      let value = sessionStorage.getItem(SESSION_KEY);
      if (!value) { value = newId(); sessionStorage.setItem(SESSION_KEY, value); }
      return value;
    } catch (_) { return newId(); }
  };
  const sessionId = window.EUSSiteAnalytics?.sessionId?.() || window.EUSIntent?.sessionId?.() || getSessionId();
  const params = new URLSearchParams(location.search);
  let referrerHost = '';
  try { referrerHost = document.referrer ? new URL(document.referrer).hostname : ''; } catch (_) {}

  const basePayload = () => ({
    sessionId,
    page: location.pathname,
    referrerHost,
    utmSource: params.get('utm_source') || '',
    utmCampaign: params.get('utm_campaign') || '',
  });
  const track = (eventType, details = {}) => {
    if (!eventType || document.visibilityState === 'prerender') return;
    const payload = { ...basePayload(), ...details, eventType, eventId: newId() };
    fetch(ENDPOINT, {
      method: 'POST', credentials: 'same-origin', keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-EUS-Analytics': 'customer-event' },
      body: JSON.stringify(payload),
    }).catch(() => {});
  };

  window.EUSAnalytics = { track, sessionId: () => sessionId };

  if (location.pathname === '/marketplace') track('marketplace_view');
  if (location.pathname === '/make-a-listing' || /^\/list-(an?|used-)/.test(location.pathname)) track('seller_form_view');

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (location.pathname === '/marketplace' && (/^\/make-a-listing/.test(href) || /^\/list-(an?|used-)/.test(href))) {
      track('seller_funnel_start');
    }
    const contactBox = link.closest('[data-eus-contact-listing]');
    if (contactBox && href.startsWith('tel:')) track('contact_call', { listingId: contactBox.dataset.eusContactListing || '', category: contactBox.dataset.eusContactCategory || '' });
    if (contactBox && href.startsWith('sms:')) track('contact_text', { listingId: contactBox.dataset.eusContactListing || '', category: contactBox.dataset.eusContactCategory || '' });
  }, { capture: true });

  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (form instanceof HTMLFormElement && form.querySelector('[name="sellerName"]')) track('seller_submit_start');
  }, { capture: true });
})();
