(() => {
  const gallery = document.querySelector('[data-before-after-gallery]');
  const dialog = document.querySelector('#before-after-dialog');
  if (!gallery || !dialog || typeof dialog.showModal !== 'function') return;

  const items = [...gallery.querySelectorAll('[data-gallery-src]')];
  const image = dialog.querySelector('#before-after-dialog-image');
  const title = dialog.querySelector('#before-after-dialog-title');
  const position = dialog.querySelector('[data-gallery-position]');
  const closeButton = dialog.querySelector('.before-after-dialog-close');
  const previousButton = dialog.querySelector('[data-gallery-prev]');
  const nextButton = dialog.querySelector('[data-gallery-next]');
  let activeIndex = 0;
  let opener = null;

  const render = (index) => {
    activeIndex = (index + items.length) % items.length;
    const item = items[activeIndex];
    image.src = item.dataset.gallerySrc;
    image.alt = item.dataset.galleryAlt || '';
    title.textContent = item.dataset.galleryCaption || 'Project transformation';
    position.textContent = `${activeIndex + 1} of ${items.length}`;
  };

  const open = (item) => {
    opener = item;
    render(items.indexOf(item));
    dialog.showModal();
    closeButton.focus();
  };

  items.forEach((item) => item.addEventListener('click', () => open(item)));
  previousButton.addEventListener('click', () => render(activeIndex - 1));
  nextButton.addEventListener('click', () => render(activeIndex + 1));
  closeButton.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      render(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      render(activeIndex + 1);
    }
  });

  dialog.addEventListener('close', () => {
    if (opener) opener.focus();
  });
})();
