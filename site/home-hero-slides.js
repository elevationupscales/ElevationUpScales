(() => {
  'use strict';

  const root = document.querySelector('[data-home-hero-slides]');
  if (!root) return;

  const source = root.getAttribute('data-slides-src') || '/home-hero-slides.json';
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;
  let slides = [];
  let index = 0;
  let timer = 0;
  let rotationMs = 8000;
  let pausedByUser = false;
  let pointerStartX = null;

  const clearTimer = () => {
    if (timer) window.clearTimeout(timer);
    timer = 0;
  };

  const shouldRotate = () => slides.length > 1 && !reduceMotion && !pausedByUser && !document.hidden;

  const schedule = () => {
    clearTimer();
    if (!shouldRotate()) return;
    timer = window.setTimeout(() => show(index + 1, true), rotationMs);
  };

  const setPauseButtonState = () => {
    const button = root.querySelector('[data-home-hero-pause]');
    if (!button) return;
    button.setAttribute('aria-pressed', pausedByUser ? 'true' : 'false');
    button.setAttribute('aria-label', pausedByUser ? 'Resume slideshow' : 'Pause slideshow');
    button.innerHTML = pausedByUser
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7zm6 0h4v14h-4z"/></svg>';
  };

  const show = (nextIndex, fromTimer = false) => {
    if (!slides.length) return;
    index = ((nextIndex % slides.length) + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === index;
      slide.el.classList.toggle('is-active', active);
      slide.el.setAttribute('aria-hidden', active ? 'false' : 'true');
      if (active) {
        slide.el.removeAttribute('inert');
      } else {
        slide.el.setAttribute('inert', '');
      }
    });
    root.querySelectorAll('[data-home-hero-dot]').forEach((dot, i) => {
      dot.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
    if (!fromTimer) clearTimer();
    schedule();
  };

  const makeSlide = (item, i) => {
    const hasLink = typeof item.href === 'string' && item.href.trim() !== '';
    const el = document.createElement(hasLink ? 'a' : 'div');
    el.className = 'home-hero-slide';
    el.dataset.homeHeroSlide = item.id || `slide-${i + 1}`;
    el.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    if (hasLink) {
      el.href = item.href;
      if (item.event) el.dataset.eusEvent = item.event;
      if (item.value) el.dataset.eusValue = item.value;
    }

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.alt || '';
    img.width = Number(item.width) || 1640;
    img.height = Number(item.height) || 624;
    img.loading = i === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.fetchPriority = i === 0 ? 'high' : 'auto';
    if (item.fit === 'cover' || item.fit === 'contain') img.style.objectFit = item.fit;
    if (typeof item.objectPosition === 'string') img.style.objectPosition = item.objectPosition;
    if (typeof item.background === 'string') el.style.background = item.background;
    el.appendChild(img);

    if (i !== 0) el.setAttribute('inert', '');
    return { el, item };
  };

  const renderControls = (viewport) => {
    if (slides.length <= 1) return;

    const controls = document.createElement('div');
    controls.className = 'home-hero-slides__controls';
    controls.innerHTML = `
      <button class="home-hero-slides__button home-hero-slides__button--prev" type="button" data-home-hero-prev aria-label="Previous slide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button class="home-hero-slides__button home-hero-slides__button--next" type="button" data-home-hero-next aria-label="Next slide">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>
      </button>`;
    root.appendChild(controls);

    const status = document.createElement('div');
    status.className = 'home-hero-slides__status';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'home-hero-slides__dot';
      dot.dataset.homeHeroDot = String(i);
      dot.setAttribute('aria-label', `Show slide ${i + 1}`);
      dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => show(i));
      status.appendChild(dot);
    });

    const pause = document.createElement('button');
    pause.type = 'button';
    pause.className = 'home-hero-slides__pause';
    pause.dataset.homeHeroPause = '';
    pause.addEventListener('click', () => {
      pausedByUser = !pausedByUser;
      setPauseButtonState();
      schedule();
    });
    status.appendChild(pause);
    root.appendChild(status);
    setPauseButtonState();

    root.querySelector('[data-home-hero-prev]')?.addEventListener('click', () => show(index - 1));
    root.querySelector('[data-home-hero-next]')?.addEventListener('click', () => show(index + 1));

    viewport.addEventListener('pointerdown', (event) => {
      pointerStartX = event.clientX;
    }, { passive: true });
    viewport.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const delta = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(delta) < 45) return;
      show(index + (delta < 0 ? 1 : -1));
    }, { passive: true });
  };

  const fail = (message) => {
    root.classList.add('is-ready');
    const error = document.createElement('div');
    error.className = 'home-hero-slides__error';
    error.textContent = message;
    root.appendChild(error);
  };

  fetch(source, { cache: 'no-store', credentials: 'same-origin' })
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((config) => {
      rotationMs = Math.max(4500, Number(config.rotationMs) || 8000);
      const items = Array.isArray(config.slides)
        ? config.slides.filter((item) => item && item.active !== false && typeof item.image === 'string' && item.image.trim() !== '')
        : [];
      if (!items.length) throw new Error('No active slides');

      const viewport = document.createElement('div');
      viewport.className = 'home-hero-slides__viewport';
      viewport.dataset.homeHeroSlidesViewport = '';
      viewport.setAttribute('aria-live', 'off');

      slides = items.map(makeSlide);
      slides.forEach((slide) => viewport.appendChild(slide.el));
      root.appendChild(viewport);
      root.dataset.slideCount = String(slides.length);
      root.classList.add('is-ready');
      renderControls(viewport);
      show(0);

      root.addEventListener('mouseenter', clearTimer);
      root.addEventListener('mouseleave', schedule);
      root.addEventListener('focusin', clearTimer);
      root.addEventListener('focusout', schedule);
      root.addEventListener('keydown', (event) => {
        if (slides.length <= 1) return;
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          show(index - 1);
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          show(index + 1);
        }
      });
      document.addEventListener('visibilitychange', schedule);
    })
    .catch((error) => {
      console.error('Homepage slideshow failed to initialize', error);
      fail('Featured marketing is temporarily unavailable.');
    });
})();
