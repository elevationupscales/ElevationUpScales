/* Elevation UpScales Marketplace v3.3.6 QA PATCH — Admin-only prefill + real photo test modes */
(() => {
  const form = document.querySelector('#marketplace-listing-form');
  if (!form) return;

  const typeLabel = form.dataset.listingType || 'Marketplace';
  const category = ({ RV: 'rv', Motorcycle: 'motorcycle', Bicycle: 'bicycle', Boat: 'boat', Vehicle: 'vehicle', Gear: 'gear' })[typeLabel] || '';
  const titleParts = Array.from(form.querySelectorAll('[data-title-part]'));
  const previewFields = Array.from(form.querySelectorAll('[data-preview-target]'));
  const photoInputs = Array.from(form.querySelectorAll('[data-photo-target]'));
  const previewPanel = document.querySelector('.listing-preview-panel');
  const previewTitle = document.getElementById('preview-title');
  const submitButton = document.getElementById('submit-marketplace-listing');
  const previewButton = document.getElementById('generate-listing-preview');
  const statusBox = document.getElementById('marketplace-submit-status');
  const draftStatus = document.getElementById('listing-draft-status');
  const clearDraftButton = document.getElementById('clear-listing-draft');
  const formSection = document.getElementById('listing-form');
  const startButtons = Array.from(document.querySelectorAll('[data-start-listing]'));
  const maximumListingYear = new Date().getFullYear() + 1;
  const minimumPhotos = category === 'bicycle' || category === 'gear' ? 2 : 4;
  const qaToken = new URLSearchParams(location.search).get('qa') || '';
  let qaMode = false;
  let qaPhotoMode = '';
  let qaFixtureFiles = [];
  let qaPreviewUrls = [];
  let qaContact = { email: 'casey@elevationupscales.com', phone: '208-813-4998' };
  const cityField = form.querySelector('[name="city"]');
  const stateField = form.querySelector('[name="state"]');
  const previewLocation = document.getElementById('preview-location');
  const composedLocation = () => {
    const city = String(cityField?.value || '').trim();
    const state = String(stateField?.value || '').trim();
    return city && state ? `${city}, ${state}` : city || state || '';
  };
  let draftKey = qaToken ? `elevation-upscales-marketplace-draft:${category || typeLabel.toLowerCase()}:qa:v3` : `elevation-upscales-marketplace-draft:${category || typeLabel.toLowerCase()}:v2`;
  const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
  let saveTimer = 0;
  let submissionComplete = false;
  let retryCount = 0;
  const MARKETPLACE_BUILD = 'v3.3.6-qa-prefill-photo-test-modes';
  const clientRequestId = (() => {
    try { return crypto.randomUUID(); } catch (_) { return `MKT-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
  })();

  photoInputs.forEach((input) => { input.dataset.qaRequired = input.required ? '1' : '0'; });

  form.querySelectorAll('input[name="year"]').forEach((input) => { input.max = String(maximumListingYear); });

  const setStatus = (message, state = '') => {
    if (!statusBox) return;
    statusBox.hidden = false;
    statusBox.dataset.state = state;
    statusBox.textContent = message;
    statusBox.setAttribute('role', state === 'error' ? 'alert' : 'status');
  };

  const setDraftStatus = (message, state = '') => {
    if (!draftStatus) return;
    draftStatus.textContent = message;
    draftStatus.dataset.state = state;
  };

  const fieldLabel = (field) => {
    if (field.name === 'submissionConsent') return 'Seller authorization checkbox';
    const explicit = field.getAttribute('aria-label');
    if (explicit) return explicit;
    const label = field.closest('label');
    if (label) {
      const clone = label.cloneNode(true);
      clone.querySelectorAll('input, select, textarea, small, span').forEach((node) => node.remove());
      const text = clone.textContent.replace(/\s+/g, ' ').trim();
      if (text) return text;
    }
    return field.name || 'required field';
  };


  const setQaField = (name, value) => {
    const field = form.elements.namedItem(name);
    if (!field) return;
    if (field instanceof RadioNodeList) return;
    if (field.type === 'checkbox') { field.checked = Boolean(value); return; }
    if (field.tagName === 'SELECT') {
      const wanted = String(value ?? '');
      const options = Array.from(field.options);
      const option = options.find((item) => item.value === wanted) || options.find((item) => item.textContent.trim() === wanted);
      if (option) field.selectedIndex = option.index;
      return;
    }
    field.value = String(value ?? '');
  };

  const qaFixture = () => {
    const shared = {
      sellerName: 'Elevation QA Test',
      sellerEmail: qaContact.email,
      sellerPhone: qaContact.phone,
      city: 'Colorado Springs',
      state: 'CO',
      highlights: 'QA TEST — This is an Elevation UpScales Marketplace system test. Do not publish.',
      condition: 'QA TEST — DO NOT PUBLISH. This record exists only to validate Marketplace submission, image storage and Admin workflow.',
      submissionConsent: true,
    };
    const fixtures = {
      rv: { year: '2024', make: 'Elevation QA', model: 'RV Test Fixture', price: '$12,345', mileage: '12,345', titleStatus: 'Clean title', rvType: 'Class A', sleeps: '4' },
      motorcycle: { year: '2024', make: 'Elevation QA', model: 'Motorcycle Test Fixture', price: '$8,765', mileage: '321', titleStatus: 'Clean title', vehicleType: 'Touring', engineSize: '1200 cc' },
      bicycle: { year: '2024', make: 'Elevation QA', model: 'Bicycle Test Fixture', price: '$1,234', mileage: 'QA test only', titleStatus: 'Owned outright', vehicleType: 'Mountain bike', frameSize: 'Medium', wheelSize: '29 in', electricAssist: 'No electric assist', batteryDetails: 'Not applicable — QA fixture' },
      boat: { year: '2024', make: 'Elevation QA', model: 'Boat Test Fixture', price: '$23,456', length: '20 ft', titleStatus: 'Clear title / current registration', vehicleType: 'Fishing boat', engine: '150 HP QA test engine', engineHours: '100', trailer: 'Yes' },
      vehicle: { year: '2024', make: 'Elevation QA', model: 'Vehicle Test Fixture', price: '$19,876', mileage: '12,345', titleStatus: 'Clean title', vehicleType: 'Pickup truck', drivetrain: '4x4 / 4WD', transmission: 'Automatic', fuelType: 'Gasoline' },
      gear: { make: 'Elevation QA', model: 'Solar Test Fixture', price: '$999', gearType: 'Solar Equipment', conditionRating: 'Good used condition' },
    };
    return { ...shared, ...(fixtures[category] || {}) };
  };

  const applyQaFixture = () => {
    const fixture = qaFixture();
    Object.entries(fixture).forEach(([name, value]) => setQaField(name, value));
    setQaField('submissionConsent', true);
    sync();
    scheduleDraftSave();
  };

  const clearQaPreviewUrls = () => {
    qaPreviewUrls.forEach((url) => { try { URL.revokeObjectURL(url); } catch (_) {} });
    qaPreviewUrls = [];
  };

  const clearPhotoPreviews = () => {
    clearQaPreviewUrls();
    photoInputs.forEach((input) => {
      const target = document.getElementById(input.dataset.photoTarget);
      if (target) {
        target.removeAttribute('src');
        target.parentElement?.classList.remove('has-image');
      }
    });
  };

  const syncQaModeButtons = () => {
    form.querySelectorAll('[data-qa-photo-mode]').forEach((button) => {
      const active = button.dataset.qaPhotoMode === qaPhotoMode;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    const modeStatus = form.querySelector('[data-qa-photo-mode-status]');
    if (modeStatus) modeStatus.textContent = qaPhotoMode === 'test'
      ? `${minimumPhotos} prepared QA photo${minimumPhotos === 1 ? '' : 's'} loaded for the real upload path.`
      : 'Device photo mode active. Select photos using the normal Marketplace controls below.';
  };

  const loadQaFixturePhotos = async () => {
    const urls = Array.from({ length: minimumPhotos }, (_, index) => `/assets/qa/marketplace/qa-photo-${index + 1}.jpg`);
    const files = await Promise.all(urls.map(async (url, index) => {
      const response = await fetch(url, { credentials: 'same-origin', cache: 'no-store' });
      if (!response.ok) throw new Error(`Prepared QA photo ${index + 1} could not be loaded.`);
      const blob = await response.blob();
      if (!blob.size || !String(blob.type || '').startsWith('image/')) throw new Error(`Prepared QA photo ${index + 1} is invalid.`);
      return new File([blob], `qa-photo-${index + 1}.jpg`, { type: blob.type || 'image/jpeg' });
    }));
    return files;
  };

  const setQaPhotoMode = async (mode) => {
    if (!qaMode || !['test', 'device'].includes(mode)) return;
    qaPhotoMode = mode;
    qaFixtureFiles = [];
    clearPhotoPreviews();
    photoInputs.forEach((input) => { input.value = ''; });

    if (mode === 'device') {
      photoInputs.forEach((input) => { input.required = input.dataset.qaRequired === '1'; });
      syncQaModeButtons();
      return;
    }

    photoInputs.forEach((input) => { input.required = false; });
    syncQaModeButtons();
    const modeStatus = form.querySelector('[data-qa-photo-mode-status]');
    if (modeStatus) modeStatus.textContent = 'Loading prepared QA photos…';
    const files = await loadQaFixturePhotos();
    if (qaPhotoMode !== 'test') return;
    qaFixtureFiles = files;
    files.forEach((file, index) => {
      const input = photoInputs[index];
      const target = input ? document.getElementById(input.dataset.photoTarget) : null;
      if (!target) return;
      const objectUrl = URL.createObjectURL(file);
      qaPreviewUrls.push(objectUrl);
      target.src = objectUrl;
      target.parentElement?.classList.add('has-image');
    });
    syncQaModeButtons();
  };

  const buildQaPanel = () => {
    if (form.querySelector('[data-qa-panel]')) return;
    const panel = document.createElement('section');
    panel.className = 'marketplace-qa-panel';
    panel.dataset.qaPanel = 'true';
    panel.setAttribute('aria-label', 'Admin Marketplace QA test controls');
    panel.innerHTML = `
      <div class="marketplace-qa-panel__flag">TEST — DO NOT PUBLISH</div>
      <strong class="marketplace-qa-panel__loaded">QA TEST DATA LOADED</strong>
      <p class="marketplace-qa-panel__copy">Valid Admin QA mode. Written test data is isolated from public drafts and this submission still uses the real Marketplace D1/R2/Admin pipeline.</p>
      <div class="marketplace-qa-panel__mode">
        <span class="marketplace-qa-panel__label">PHOTO TEST MODE</span>
        <div class="marketplace-qa-panel__choices">
          <button type="button" class="marketplace-qa-mode" data-qa-photo-mode="test" aria-pressed="false"><strong>USE TEST PHOTOS</strong><small>Use prepared QA images and test the complete submission/storage path without selecting photos manually.</small></button>
          <button type="button" class="marketplace-qa-mode" data-qa-photo-mode="device" aria-pressed="false"><strong>SELECT PHOTOS FROM DEVICE</strong><small>Use photos from this phone or computer to test real customer-style uploads.</small></button>
        </div>
        <p class="marketplace-qa-panel__status" data-qa-photo-mode-status role="status"></p>
      </div>
      <button type="button" class="marketplace-qa-reset" data-qa-reset>RESET QA TEST DATA</button>
    `;
    form.prepend(panel);
    panel.querySelectorAll('[data-qa-photo-mode]').forEach((button) => button.addEventListener('click', async () => {
      try { await setQaPhotoMode(button.dataset.qaPhotoMode); }
      catch (error) { setStatus(error instanceof Error ? error.message : 'Prepared QA photos could not be loaded.', 'error'); await setQaPhotoMode('device'); }
    }));
    panel.querySelector('[data-qa-reset]')?.addEventListener('click', async () => {
      applyQaFixture();
      try { await setQaPhotoMode('test'); }
      catch (error) { setStatus(error instanceof Error ? error.message : 'Prepared QA photos could not be loaded.', 'error'); await setQaPhotoMode('device'); }
      setDraftStatus('QA test data reset. QA drafts are stored separately from public Marketplace drafts.', 'ready');
    });
  };

  const validateQaSession = async () => {
    if (!qaToken) return { valid: false };
    const response = await fetch('/api/marketplace/qa-validate', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ qaToken, category }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.valid !== true) throw new Error(result.error || 'This Admin QA link is invalid or expired. Open a new TEST form from Marketplace Operations.');
    return result;
  };

  const sync = () => {
    if (previewTitle) {
      const title = titleParts.map((field) => field.value.trim()).filter(Boolean).join(' ');
      previewTitle.textContent = title || 'Year Make Model';
    }

    previewFields.forEach((field) => {
      const target = document.getElementById(field.dataset.previewTarget);
      if (!target) return;
      const selectedText = field.tagName === 'SELECT' && field.selectedIndex >= 0
        ? field.options[field.selectedIndex].text
        : field.value;
      const value = String(selectedText || '').trim();
      target.textContent = value || field.dataset.previewFallback || 'Not provided';
    });
    if (previewLocation && (cityField || stateField)) previewLocation.textContent = composedLocation() || 'City, State';
  };

  const serializableFields = () => Array.from(form.elements).filter((field) => {
    if (!field.name || field.name === 'website') return false;
    if (['file', 'submit', 'button', 'reset'].includes(field.type)) return false;
    return true;
  });

  const saveDraft = () => {
    if (submissionComplete || (qaToken && !qaMode)) return;
    const values = {};
    serializableFields().forEach((field) => {
      if (field.type === 'checkbox' || field.type === 'radio') values[field.name] = Boolean(field.checked);
      else values[field.name] = field.value;
    });
    try {
      localStorage.setItem(draftKey, JSON.stringify({ savedAt: new Date().toISOString(), values }));
      setDraftStatus('Draft saved on this device. Photos must be selected again after a refresh.', 'saved');
    } catch (_) {
      setDraftStatus('Draft saving is unavailable in this browser. Keep this page open until submission.', 'error');
    }
  };

  const scheduleDraftSave = () => {
    window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(saveDraft, 350);
  };

  const restoreDraft = () => {
    let draft;
    try {
      draft = JSON.parse(localStorage.getItem(draftKey) || 'null');
    } catch (_) {
      draft = null;
    }
    if (!draft?.values) {
      setDraftStatus(qaMode ? 'QA written details auto-save separately on this device. Public Marketplace drafts are not touched.' : 'Written details auto-save on this device while you work. Photos cannot be restored after a refresh.', 'ready');
      return false;
    }
    const savedAt = draft.savedAt ? new Date(draft.savedAt).getTime() : 0;
    if (!savedAt || Number.isNaN(savedAt) || Date.now() - savedAt > DRAFT_MAX_AGE_MS) {
      try { localStorage.removeItem(draftKey); } catch (_) {}
      setDraftStatus('An expired saved draft was cleared from this device. Written details will auto-save again as you type.', 'ready');
      return false;
    }

    serializableFields().forEach((field) => {
      if (!Object.prototype.hasOwnProperty.call(draft.values, field.name)) return;
      if (field.type === 'checkbox' || field.type === 'radio') field.checked = Boolean(draft.values[field.name]);
      else field.value = String(draft.values[field.name] ?? '');
    });
    sync();
    const saved = new Date(savedAt);
    const label = saved.toLocaleString();
    setDraftStatus(`${qaMode ? 'QA draft' : 'Draft'} restored from ${label}. ${qaMode ? 'Prepared QA photos can be reloaded below.' : 'Please reselect the required photos before submitting.'}`, 'restored');
    return true;
  };

  const clearDraft = () => {
    try { localStorage.removeItem(draftKey); } catch (_) {}
    form.reset();
    qaFixtureFiles = [];
    clearPhotoPreviews();
    photoInputs.forEach((input) => { input.value = ''; input.required = input.dataset.qaRequired === '1'; });
    form.querySelectorAll('.is-invalid').forEach((field) => field.classList.remove('is-invalid'));
    if (qaMode) {
      applyQaFixture();
      setQaPhotoMode('test').catch(async (error) => { setStatus(error instanceof Error ? error.message : 'Prepared QA photos could not be loaded.', 'error'); await setQaPhotoMode('device'); });
      setDraftStatus('QA draft cleared and default QA test data restored. Public Marketplace drafts were not touched.', 'ready');
    } else {
      sync();
      setDraftStatus('Saved draft cleared. Written details will auto-save again as you type.', 'ready');
    }
    if (statusBox) statusBox.hidden = true;
  };

  const openListingForm = (event) => {
    event?.preventDefault();
    if (!formSection) return;
    try { history.replaceState(null, '', `${location.pathname}${location.search}#listing-form`); } catch (_) {}
    formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.setTimeout(() => {
      const first = form.querySelector('input:not([type="hidden"]):not([tabindex="-1"]), select, textarea');
      first?.focus({ preventScroll: true });
    }, 550);
  };

  startButtons.forEach((button) => button.addEventListener('click', openListingForm));
  if (location.hash === '#listing-form') {
    window.setTimeout(() => formSection?.scrollIntoView({ behavior: 'auto', block: 'start' }), 80);
  }

  form.addEventListener('input', (event) => {
    event.target.classList?.remove('is-invalid');
    event.target.removeAttribute?.('aria-invalid');
    sync();
    scheduleDraftSave();
  });
  form.addEventListener('change', (event) => {
    event.target.classList?.remove('is-invalid');
    event.target.removeAttribute?.('aria-invalid');
    sync();
    if (event.target.type !== 'file') scheduleDraftSave();
  });
  window.addEventListener('beforeunload', saveDraft);
  clearDraftButton?.addEventListener('click', () => {
    if (confirm('Clear the saved written draft and reset this form? Selected photos will also be removed from the page.')) clearDraft();
  });

  photoInputs.forEach((input) => {
    input.addEventListener('change', (event) => {
      if (qaMode && qaPhotoMode === 'test') return;
      const file = event.target.files && event.target.files[0];
      const target = document.getElementById(input.dataset.photoTarget);
      if (!target || !file) return;

      if (file.size > 10 * 1024 * 1024) {
        setStatus('Please use an image smaller than 10 MB.', 'error');
        event.target.value = '';
        return;
      }

      const lowerName = String(file.name || '').toLowerCase();
      const looksLikeImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp|heic|heif)$/i.test(lowerName);
      if (!looksLikeImage) {
        setStatus('Please choose a photo from your device.', 'error');
        event.target.value = '';
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      target.onload = () => URL.revokeObjectURL(objectUrl);
      target.src = objectUrl;
      target.parentElement.classList.add('has-image');
    });
  });

  if (previewButton) {
    previewButton.addEventListener('click', () => {
      sync();
      previewPanel?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  const decodeImageForCanvas = async (file) => {
    if ('createImageBitmap' in window) {
      try {
        const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
        return { source: bitmap, width: bitmap.width, height: bitmap.height, cleanup: () => bitmap.close?.() };
      } catch (_) {}
    }

    const objectUrl = URL.createObjectURL(file);
    try {
      const image = new Image();
      image.decoding = 'async';
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
        image.src = objectUrl;
      });
      return { source: image, width: image.naturalWidth, height: image.naturalHeight, cleanup: () => URL.revokeObjectURL(objectUrl) };
    } catch (error) {
      URL.revokeObjectURL(objectUrl);
      throw error;
    }
  };

  const optimizeImage = async (file) => {
    if (file.type === 'image/webp' && file.size <= 2.5 * 1024 * 1024) return file;

    let decoded;
    try {
      decoded = await decodeImageForCanvas(file);
    } catch (_) {
      throw new Error('This phone photo could not be prepared for upload. Try selecting it again from Photos or save/share it as JPEG first.');
    }

    const maxDimension = 2200;
    const scale = Math.min(1, maxDimension / Math.max(decoded.width, decoded.height));
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d', { alpha: false });
    context.drawImage(decoded.source, 0, 0, width, height);
    decoded.cleanup?.();

    let blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.84));
    let extension = 'webp';
    let type = 'image/webp';
    if (!blob) {
      blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.88));
      extension = 'jpg';
      type = 'image/jpeg';
    }
    if (!blob) throw new Error('This photo could not be converted for upload. Please try another copy of the image.');
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'listing-photo';
    return new File([blob], `${baseName}.${extension}`, { type });
  };

  const invalidFields = () => Array.from(form.elements).filter((field) => field.willValidate && !field.checkValidity());

  const showValidationErrors = () => {
    const invalid = invalidFields();
    if (!invalid.length) return false;
    invalid.forEach((field) => {
      field.classList.add('is-invalid');
      field.setAttribute('aria-invalid', 'true');
    });
    const uniqueLabels = [...new Set(invalid.map(fieldLabel))];
    const summary = uniqueLabels.slice(0, 6).join(', ');
    const extra = uniqueLabels.length > 6 ? ` and ${uniqueLabels.length - 6} more` : '';
    renderCustomerError(`Please complete: ${summary}${extra}.`, clientRequestId);
    statusBox?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(() => invalid[0]?.focus({ preventScroll: false }), 300);
    return true;
  };

  const listingDetailsText = () => {
    const lines = [`Elevation UpScales Marketplace listing details`, `Category: ${typeLabel}`];
    serializableFields().forEach((field) => {
      if (['submissionConsent','qaToken'].includes(field.name)) return;
      const value = field.type === 'checkbox' || field.type === 'radio' ? (field.checked ? 'Yes' : 'No') : String(field.value || '').trim();
      if (!value) return;
      lines.push(`${fieldLabel(field)}: ${value}`);
    });
    lines.push(`Page: ${location.pathname}`, `Support reference: ${clientRequestId}`);
    return lines.join('\n');
  };

  const copyListingDetails = async () => {
    const text = listingDetailsText();
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const area = document.createElement('textarea');
      area.value = text; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.opacity='0';
      document.body.append(area); area.select();
      let ok=false; try { ok=document.execCommand('copy'); } catch (_) {} area.remove();
      return ok;
    }
  };

  const betaSupportMessage = (reference = '') => {
    const ref = reference || clientRequestId;
    return `Hi Elevation UpScales, I'm having trouble submitting a ${typeLabel} Marketplace listing. Marketplace Support Request — Ref: ${ref}`;
  };

  const statusAction = ({ label, href = '', action = '', primary = false, support = false }) => {
    const el = href ? document.createElement('a') : document.createElement('button');
    el.className = `button ${primary ? 'button-primary' : 'button-outline'}`;
    el.textContent = label;
    if (href) { el.href = href; if (support) el.dataset.eusSupport = 'true'; }
    else { el.type = 'button'; el.dataset.statusAction = action; }
    return el;
  };

  const renderStructuredStatus = ({ eyebrow, heading, message, state, reference = '', actions = [] }) => {
    if (!statusBox) return;
    statusBox.hidden = false;
    statusBox.dataset.state = state;
    statusBox.setAttribute('role', state === 'system-error' ? 'alert' : 'status');
    statusBox.replaceChildren();
    const eyebrowEl=document.createElement('span'); eyebrowEl.className='marketplace-submit-status__eyebrow'; eyebrowEl.textContent=eyebrow;
    const headingEl=document.createElement('strong'); headingEl.className='marketplace-submit-status__heading'; headingEl.textContent=heading;
    const messageEl=document.createElement('p'); messageEl.className='marketplace-submit-status__message'; messageEl.textContent=message;
    statusBox.append(eyebrowEl,headingEl,messageEl);
    if (reference) { const ref=document.createElement('code'); ref.className='marketplace-submit-status__reference'; ref.textContent=`Reference: ${reference}`; statusBox.append(ref); }
    if (actions.length) { const box=document.createElement('div'); box.className='marketplace-submit-status__actions'; actions.forEach((action)=>box.append(statusAction(action))); statusBox.append(box); }
    statusBox.scrollIntoView({behavior:'smooth',block:'center'});
  };

  function renderCustomerError(message, reference = '') {
    renderStructuredStatus({
      eyebrow: 'MARKETPLACE BETA', heading: 'WE NEED ONE MORE THING',
      message: `${message} Your written draft is still saved.`, state: 'customer-error', reference,
      actions: [
        {label:'Report an Issue',href:`/report-an-issue?page=${encodeURIComponent(location.pathname)}&stage=customer-error&category=${encodeURIComponent(category)}&ref=${encodeURIComponent(reference||clientRequestId)}`},
      ],
    });
  }

  function renderSystemError(message, reference = '') {
    const ref=reference||clientRequestId;
    renderStructuredStatus({
      eyebrow: 'MARKETPLACE BETA SUPPORT', heading: "WE COULDN'T COMPLETE YOUR SUBMISSION",
      message: `${message || 'Your information may not have been received.'} Your written details remain saved on this device. Please try again or contact Elevation UpScales so we can help you submit the listing.`,
      state:'system-error', reference:ref,
      actions:[
        {label:'Try Again',action:'retry',primary:true},
        {label:'Contact Elevation',href:`/report-an-issue?page=${encodeURIComponent(location.pathname)}&stage=contact-help&category=${encodeURIComponent(category)}&ref=${encodeURIComponent(ref)}`,support:true},
        {label:'Report an Issue',href:`/report-an-issue?page=${encodeURIComponent(location.pathname)}&stage=system-error&category=${encodeURIComponent(category)}&ref=${encodeURIComponent(ref)}`},
        {label:'Copy My Listing Details',action:'copy'},
      ],
    });
  }

  statusBox?.addEventListener('click', async (event) => {
    const button=event.target.closest('button[data-status-action]'); if(!button) return;
    if(button.dataset.statusAction==='retry') { retryCount+=1; try { window.EUSAnalytics?.track?.('seller_submit_start',{category,retry:true}); } catch(_){} form.requestSubmit(); }
    if(button.dataset.statusAction==='copy') { const ok=await copyListingDetails(); button.textContent=ok?'Listing Details Copied':'Copy Failed — Select Details Manually'; }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (showValidationErrors()) return;
    if (!category) { renderSystemError('This listing category could not be identified.', clientRequestId); return; }

    submitButton.disabled = true;
    submitButton.textContent = 'Preparing Photos…';
    setStatus('Preparing and securely uploading your listing. Keep this page open.', 'working');
    try { window.EUSAnalytics?.track?.('seller_submit_start', { category, retry: retryCount > 0 }); } catch (_) {}

    try {
      const payload = new FormData(form);
      payload.set('category', category);
      if (qaMode) payload.set('qaToken', qaToken);
      if (cityField && stateField) payload.set('location', composedLocation());

      let photoCount = 0;
      for (let index = 0; index < photoInputs.length; index += 1) {
        const input = photoInputs[index];
        const file = qaMode && qaPhotoMode === 'test' ? qaFixtureFiles[index] : input.files?.[0];
        if (!file) { payload.delete(input.name); continue; }
        let optimized;
        try { optimized = await optimizeImage(file); }
        catch (error) { error.customerCorrectable = true; throw error; }
        payload.set(input.name, optimized, optimized.name);
        photoCount += 1;
      }
      if (photoCount < minimumPhotos) {
        const error=new Error(category === 'bicycle' || category === 'gear' ? 'Please select at least two listing photos.' : 'All four listing photos are required.');
        error.customerCorrectable=true; throw error;
      }

      submitButton.textContent = 'Submitting Listing…';
      const response = await fetch('/api/marketplace/submit', {
        method: 'POST', body: payload,
        headers: { Accept: 'application/json', 'X-EUS-Session': window.EUSAnalytics?.sessionId?.() || '', 'X-EUS-Request': clientRequestId, 'X-EUS-Retry': String(retryCount), 'X-EUS-Build': MARKETPLACE_BUILD },
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const error=new Error(result.error || 'The listing could not be submitted.');
        error.status=response.status; error.reference=result.reference || clientRequestId; error.code=result.code || '';
        throw error;
      }

      submissionComplete = true;
      try { localStorage.removeItem(draftKey); } catch (_) {}
      const notice = result.emailDelivered ? 'The Elevation UpScales admin team has also been notified by email.' : 'Your listing is saved even though the email notification may be delayed.';
      if (statusBox) {
        statusBox.hidden=false; statusBox.dataset.state='success'; statusBox.setAttribute('role','status'); statusBox.replaceChildren();
        const eyebrow=document.createElement('span'); eyebrow.className='listing-confirmation__eyebrow'; eyebrow.textContent='LISTING RECEIVED';
        const heading=document.createElement('strong'); heading.className='listing-confirmation__heading'; heading.textContent='Pending Review';
        const referenceLabel=document.createElement('span'); referenceLabel.className='listing-confirmation__reference-label'; referenceLabel.textContent='Confirmation Number';
        const reference=document.createElement('code'); reference.className='listing-confirmation__reference'; reference.textContent=String(result.reference||'Saved');
        const message=document.createElement('p'); message.className='listing-confirmation__message'; message.textContent=result.qaTest ? 'TEST — DO NOT PUBLISH received successfully through the real Marketplace path. It remains private in Admin Pending Review.' : 'Your Marketplace submission has been received. It is private and will not appear publicly until an Elevation UpScales admin reviews and approves it.';
        const noResubmit=document.createElement('p'); noResubmit.className='listing-confirmation__no-resubmit'; noResubmit.textContent='You do not need to submit this listing again.';
        const delivery=document.createElement('p'); delivery.className='listing-confirmation__delivery'; delivery.textContent=notice;
        const actions=document.createElement('div'); actions.className='marketplace-submit-status__actions'; actions.append(statusAction({label:'Back to Marketplace',href:'/marketplace#all',primary:true}));
        statusBox.append(eyebrow,heading,referenceLabel,reference,message,noResubmit,delivery,actions);
      }
      setDraftStatus('Submission complete. The saved browser draft has been cleared.', 'submitted');
      submitButton.textContent = 'Listing Received — Pending Review';
      form.querySelectorAll('input, select, textarea, button').forEach((control) => { control.disabled = true; });
      startButtons.forEach((button) => { button.removeEventListener('click', openListingForm); button.removeAttribute('data-start-listing'); button.setAttribute('href','/marketplace#all'); if(button.classList.contains('mobile-call')) button.textContent='View Marketplace'; });
      statusBox?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      try { window.EUSAnalytics?.track?.('seller_submission_failed', { category, retry: retryCount > 0 }); } catch (_) {}
      const status=Number(error?.status)||0;
      const reference=String(error?.reference||clientRequestId);
      if (error?.customerCorrectable || [400, 413, 422].includes(status)) renderCustomerError(error instanceof Error ? error.message : 'Please review the highlighted listing information.', reference);
      else renderSystemError(error instanceof Error ? error.message : 'Your information may not have been received.', reference);
      submitButton.disabled=false; submitButton.textContent='Submit Listing for Review'; saveDraft();
    }
  });

  const initializeFormMode = async () => {
    if (!qaToken) {
      restoreDraft();
      sync();
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Validating Admin QA…';
    }
    setDraftStatus('Validating the Admin QA session. Public Marketplace drafts are not being opened.', 'ready');

    try {
      const validation = await validateQaSession();
      qaMode = true;
      qaContact = {
        email: String(validation.testEmail || qaContact.email),
        phone: String(validation.testPhone || qaContact.phone),
      };
      draftKey = `elevation-upscales-marketplace-draft:${category || typeLabel.toLowerCase()}:qa:v3`;
      buildQaPanel();
      const restored = restoreDraft();
      if (!restored) applyQaFixture();
      else setQaField('submissionConsent', true);
      await setQaPhotoMode('test');
      sync();
      saveDraft();
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit TEST Listing for Review';
      }
    } catch (error) {
      qaMode = false;
      clearPhotoPreviews();
      qaFixtureFiles = [];
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'QA Session Expired';
      }
      renderCustomerError(error instanceof Error ? error.message : 'This Admin QA link is invalid or expired.', clientRequestId);
      setDraftStatus('QA session not validated. No public Marketplace draft was opened or changed.', 'error');
    }
  };

  initializeFormMode();
})();
