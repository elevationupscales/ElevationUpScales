(() => {
  const root = document.querySelector('.marketplace-premium');
  const grid = document.querySelector('.marketplace-premium-list');
  if (!root || !grid) return;

  const controls = [...document.querySelectorAll('[data-marketplace-filter]')];
  const searchInput = document.querySelector('[data-marketplace-search]');
  const locationInput = document.querySelector('[data-marketplace-location]');
  const maxPriceInput = document.querySelector('[data-marketplace-max-price]');
  const statusSelect = document.querySelector('[data-marketplace-status]');
  const sortSelect = document.querySelector('[data-marketplace-sort]');
  const clearButtons = [...document.querySelectorAll('[data-marketplace-clear]')];
  const resultCount = document.querySelector('[data-marketplace-count]');
  const emptyState = document.querySelector('[data-marketplace-empty]');
  const loadMore = document.querySelector('[data-marketplace-load-more]');
  const PUBLIC_SITE_ORIGIN = 'https://elevationupscales.com';
  const savedCount = document.querySelector('[data-saved-count]');
  const savedNotice = document.querySelector('[data-saved-notice]');
  const showSavedButtons = [...document.querySelectorAll('[data-show-saved], [data-mobile-saved]')];
  const heroTitle = document.querySelector('[data-marketplace-hero-title]');
  const heroCopy = document.querySelector('[data-marketplace-hero-copy]');
  const drawer = document.querySelector('[data-filter-drawer]');
  const allowed = new Set(['all','rv','motorcycle','bicycle','boat','vehicle','gear']);
  const hashMap = {'#all':'all','#rvs':'rv','#motorcycles':'motorcycle','#bicycles':'bicycle','#bikes':'bicycle','#boats':'boat','#vehicles':'vehicle','#cars':'vehicle','#trucks':'vehicle','#gear':'gear','#gears':'gear','#used-gear':'gear','#usedgear':'gear','#saved':'saved'};
  const heroMap = {
    all: ['Find Your Next', 'Adventure.'],
    rv: ['Find Your Next', 'RV or Camper.'],
    motorcycle: ['Find Your Next', 'Motorcycle.'],
    bicycle: ['Find Your Next', 'Bicycle or Trike.'],
    boat: ['Find Your Next', 'Boat or Watercraft.'],
    vehicle: ['Find Your Next', 'Car or Truck.'],
    gear: ['Browse', 'Used Gear / Solar.'],
    saved: ['Your Liked', 'Listings.'],
  };
  const categoryNames = {rv:'RV / CAMPER', motorcycle:'MOTORCYCLE', bicycle:'BICYCLE / TRIKE', boat:'BOAT / WATERCRAFT', vehicle:'CAR / TRUCK', gear:'USED GEAR / SOLAR · BETA'};
  const favoriteKey = 'elevation-upscales-marketplace-favorites:v1';
  let listings = [];
  let selectedFilter = hashMap[location.hash] || 'all';
  let favoritesOnly = selectedFilter === 'saved';
  let visibleLimit = 12;
  let favoriteIds = new Set();

  try { favoriteIds = new Set(JSON.parse(localStorage.getItem(favoriteKey) || '[]')); } catch (_) {}
  const normalize = (value) => String(value || '').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim();
  const parsePrice = (value) => Number(String(value || '').replace(/[^0-9.]/g,'')) || 0;
  const listingTitle = (listing) => (listing?.category === 'gear' ? [listing?.make, listing?.model] : [listing?.year, listing?.make, listing?.model]).filter((value) => value !== null && value !== undefined && String(value).trim()).join(' ').trim() || 'Marketplace Listing';
  const escape = (value) => String(value ?? '').replace(/[&<>'"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const saveFavorites = () => { try { localStorage.setItem(favoriteKey, JSON.stringify([...favoriteIds])); } catch (_) {} };
  const updateSavedCount = () => { if (savedCount) savedCount.textContent = String(favoriteIds.size); showSavedButtons.forEach((b) => b.classList.toggle('is-active', favoritesOnly)); };

  const currentFilters = () => ({
    search: normalize(searchInput?.value),
    location: normalize(locationInput?.value),
    maxPrice: Number(maxPriceInput?.value || 0),
    status: statusSelect?.value || 'published',
    sort: sortSelect?.value || 'newest',
  });

  const syncHero = () => {
    const key = favoritesOnly ? 'saved' : selectedFilter;
    const [line, accent] = heroMap[key] || heroMap.all;
    if (heroTitle) heroTitle.innerHTML = `${escape(line)} <span>${escape(accent)}</span>`;
    if (heroCopy) heroCopy.textContent = key === 'saved' ? 'The listings you liked on this device.' : key === 'gear' ? 'Experimental category. Every Used Gear / Solar post is reviewed before publication.' : 'Real listings. Real people. Real adventures.';
    controls.forEach((control) => {
      const active = !favoritesOnly && control.dataset.marketplaceFilter === selectedFilter;
      control.classList.toggle('is-active', active);
      control.setAttribute('aria-pressed', String(active));
    });
    if (savedNotice) savedNotice.hidden = !favoritesOnly;
  };

  const categoryDetails = (listing) => {
    const f = listing.categoryFields || {};
    const pairs = [];
    if (listing.category === 'vehicle') {
      if (f.drivetrain) pairs.push(f.drivetrain);
      if (f.transmission) pairs.push(f.transmission);
      if (f.fuelType) pairs.push(f.fuelType);
    } else if (listing.category === 'rv') {
      if (listing.itemType) pairs.push(listing.itemType);
      if (f.sleeps) pairs.push(`Sleeps ${f.sleeps}`);
    } else if (listing.category === 'motorcycle') {
      if (f.engineSize) pairs.push(f.engineSize);
      if (f.vehicleType) pairs.push(f.vehicleType);
    } else if (listing.category === 'bicycle') {
      if (f.frameSize) pairs.push(f.frameSize);
      if (f.electricAssist) pairs.push(f.electricAssist);
    } else if (listing.category === 'boat') {
      if (f.length) pairs.push(f.length);
      if (f.engine) pairs.push(f.engine);
    } else if (listing.category === 'gear') {
      if (listing.itemType) pairs.push(listing.itemType);
      if (f.conditionRating) pairs.push(f.conditionRating);
      if (listing.make) pairs.push(listing.make);
    }
    return pairs.slice(0,3);
  };

  const createCard = (listing) => {
    const sold = listing.status === 'sold';
    const favorite = favoriteIds.has(listing.id);
    const featured = listing.images?.[listing.featuredPhoto] || listing.images?.[0] || '';
    const details = categoryDetails(listing);
    const article = document.createElement('article');
    article.className = `marketplace-premium-card${sold ? ' is-sold' : ''}`;
    article.dataset.listingId = listing.id;
    article.innerHTML = `
      <a class="marketplace-premium-card__media marketplace-listing-link" href="/marketplace/listing/${encodeURIComponent(listing.id)}" aria-label="View full listing for ${escape(listingTitle(listing))}">
        ${featured ? `<img src="${escape(featured)}" alt="${escape(listingTitle(listing))}" loading="lazy" decoding="async">` : '<div class="marketplace-card-placeholder">Photo pending</div>'}
        <span class="marketplace-photo-count">▣ ${listing.images?.length || 0}</span>
      </a>
      <div class="marketplace-premium-card__body">
        <div class="marketplace-card-actions" aria-label="Listing actions">
          <button class="marketplace-share-button" type="button" data-share-listing="${escape(listing.id)}" aria-label="Share ${escape(listingTitle(listing))}" title="Share listing"><span aria-hidden="true">↗</span></button>
          <button class="marketplace-favorite-button${favorite ? ' is-favorite' : ''}" type="button" data-favorite="${escape(listing.id)}" aria-pressed="${favorite}" aria-label="${favorite ? 'Unlike listing' : 'Like listing'}" title="${favorite ? 'Unlike' : 'Like'} listing"><span aria-hidden="true">${favorite ? '♥' : '♡'}</span></button>
        </div>
        <p class="marketplace-card-category">${escape(categoryNames[listing.category] || 'MARKETPLACE')}</p>
        <h3><a class="marketplace-listing-title-link" href="/marketplace/listing/${encodeURIComponent(listing.id)}">${escape(listingTitle(listing))}</a></h3>
        <strong class="marketplace-card-price">${escape(listing.price)}</strong>
        <p class="marketplace-card-location">${escape(listing.location)}${listing.mileage ? ` <span>•</span> ${escape(listing.mileage)}` : ''}</p>
        ${details.length ? `<ul class="marketplace-card-specs">${details.map((v) => `<li>${escape(v)}</li>`).join('')}</ul>` : ''}
        <p class="marketplace-card-views" aria-label="${escape((Number(listing.views)||0).toLocaleString('en-US'))} views"><span aria-hidden="true">👁</span> ${(Number(listing.views)||0).toLocaleString('en-US')} views</p>
        <div class="marketplace-card-chips"><span>Approved</span><span>${sold ? 'Sold' : 'Available'}</span></div>
        <a class="marketplace-view-listing" href="/marketplace/listing/${encodeURIComponent(listing.id)}">View Full Listing <span aria-hidden="true">→</span></a>
      </div>`;
    return article;
  };

  const filteredListings = () => {
    const filters = currentFilters();
    let rows = listings.filter((listing) => {
      if (favoritesOnly && !favoriteIds.has(listing.id)) return false;
      if (!favoritesOnly && selectedFilter !== 'all' && listing.category !== selectedFilter) return false;
      if (filters.status !== 'all' && listing.status !== filters.status) return false;
      if (filters.maxPrice && parsePrice(listing.price) > filters.maxPrice) return false;
      if (filters.location && !normalize(listing.location).includes(filters.location)) return false;
      if (filters.search) {
        const haystack = normalize([listing.year,listing.make,listing.model,listing.location,listing.itemType,listing.highlights,listing.conditionDisclosure,listing.mileage,listing.category,...Object.values(listing.categoryFields || {})].join(' '));
        if (!haystack.includes(filters.search)) return false;
      }
      return true;
    });
    rows.sort((a,b) => {
      if (filters.sort === 'price-low') return parsePrice(a.price)-parsePrice(b.price);
      if (filters.sort === 'price-high') return parsePrice(b.price)-parsePrice(a.price);
      if (filters.sort === 'year-new') return Number(b.year||0)-Number(a.year||0);
      return new Date(b.publishedAt || 0)-new Date(a.publishedAt || 0);
    });
    return rows;
  };

  const render = () => {
    syncHero(); updateSavedCount();
    const rows = filteredListings();
    const shown = rows.slice(0, visibleLimit);
    grid.replaceChildren(...shown.map(createCard));
    if (resultCount) resultCount.textContent = String(rows.length);
    if (emptyState) emptyState.hidden = rows.length > 0;
    if (loadMore) { loadMore.hidden = rows.length <= visibleLimit; loadMore.textContent = `Load More Listings (${rows.length-visibleLimit})`; }
    const counts = {all:listings.length,rv:0,motorcycle:0,bicycle:0,boat:0,vehicle:0,gear:0};
    listings.forEach((l)=>{ if (counts[l.category] !== undefined) counts[l.category]+=1; });
    document.querySelectorAll('[data-category-count]').forEach((node)=>{ const count=counts[node.dataset.categoryCount] ?? 0; node.textContent = count ? String(count) : ''; });
  };

  const setCategory = (value, updateHash=true) => {
    favoritesOnly = value === 'saved';
    selectedFilter = favoritesOnly ? 'all' : (allowed.has(value) ? value : 'all');
    visibleLimit = 12;
    if (updateHash) { const hash = favoritesOnly ? '#saved' : selectedFilter === 'all' ? '#all' : `#${selectedFilter === 'bicycle' ? 'bicycles' : selectedFilter === 'vehicle' ? 'vehicles' : selectedFilter === 'gear' ? 'gear' : `${selectedFilter}s`}`; try { history.replaceState(null,'',`${location.pathname}${location.search}${hash}`); } catch (_) {} }
    render(); document.querySelector('#all')?.scrollIntoView({behavior:'smooth',block:'start'});
  };

  controls.forEach((button)=>button.addEventListener('click',()=>{const category=button.dataset.marketplaceFilter;window.EUSAnalytics?.track('category_select',{category});setCategory(category)}));
  let searchTimer=null;[searchInput,locationInput,maxPriceInput].forEach((field)=>field?.addEventListener('input',()=>{visibleLimit=12;render();if(field===searchInput){clearTimeout(searchTimer);searchTimer=setTimeout(()=>{if(searchInput?.value.trim())window.EUSAnalytics?.track('search_used')},900)}}));
  [statusSelect,sortSelect].forEach((field)=>field?.addEventListener('change',()=>{visibleLimit=12;render();}));
  clearButtons.forEach((button)=>button.addEventListener('click',()=>{
    favoritesOnly=false; selectedFilter='all'; visibleLimit=12;
    if(searchInput)searchInput.value=''; if(locationInput)locationInput.value=''; if(maxPriceInput)maxPriceInput.value=''; if(statusSelect)statusSelect.value='published'; if(sortSelect)sortSelect.value='newest';
    document.querySelector('[data-drawer-category]').value='all'; document.querySelector('[data-drawer-location]').value=''; document.querySelector('[data-drawer-max-price]').value=''; document.querySelector('[data-drawer-status]').value='published'; document.querySelector('[data-drawer-sort]').value='newest';
    setCategory('all'); closeDrawer();
  }));
  showSavedButtons.forEach((button)=>button.addEventListener('click',()=>setCategory('saved')));
  loadMore?.addEventListener('click',()=>{visibleLimit+=12;render();});
  window.addEventListener('hashchange',()=>setCategory(hashMap[location.hash] || 'all',false));

  document.addEventListener('click', async (event) => {
    const favoriteButton = event.target.closest('[data-favorite]');
    if (favoriteButton) {
      const id = favoriteButton.dataset.favorite;
      const wasFavorite=favoriteIds.has(id);wasFavorite ? favoriteIds.delete(id) : favoriteIds.add(id);
      window.EUSAnalytics?.track(wasFavorite?'favorite_remove':'favorite_add',{listingId:id,category:listings.find((item)=>String(item.id)===String(id))?.category||''});
      saveFavorites(); render(); return;
    }
    const shareButton = event.target.closest('[data-share-listing]');
    if (shareButton) {
      const id = shareButton.dataset.shareListing;
      const listing = listings.find((item) => String(item.id) === String(id));
      if (!listing) return;
      const shareUrl = `${PUBLIC_SITE_ORIGIN}/marketplace/listing/${encodeURIComponent(id)}`;
      const title = listingTitle(listing);
      const text = `${title} — ${listing.price || 'Marketplace listing'}${listing.location ? ` — ${listing.location}` : ''}`;
      try {
        if (navigator.share) {
          await navigator.share({ title, text, url: shareUrl });
        } else if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(shareUrl);
          const original = shareButton.innerHTML;
          shareButton.innerHTML = '<span aria-hidden="true">✓</span>';
          shareButton.setAttribute('aria-label','Listing link copied');
          window.setTimeout(() => { shareButton.innerHTML = original; shareButton.setAttribute('aria-label', `Share ${title}`); }, 1600);
        } else {
          window.prompt('Copy this listing link:', shareUrl);
        }
      } catch (error) {
        if (error?.name !== 'AbortError') console.warn('Marketplace share failed:', error);
      }
      window.EUSAnalytics?.track('share_listing',{listingId:id,category:listing.category||''});
      return;
    }
    const contactButton = event.target.closest('[data-listing-contact]');
    if (!contactButton) return;
    const result = contactButton.nextElementSibling;
    if (contactButton.getAttribute('aria-expanded') === 'true') { result.hidden=true; result.replaceChildren(); contactButton.setAttribute('aria-expanded','false'); contactButton.textContent='Show Contact Info'; return; }
    contactButton.disabled=true; contactButton.textContent='Loading Contact…';
    try {
      const response = await fetch(`/api/marketplace/contact/${encodeURIComponent(contactButton.dataset.listingContact)}`,{method:'POST',credentials:'same-origin',headers:{Accept:'application/json','X-EUS-Contact-Intent':'reveal','X-EUS-Session':window.EUSAnalytics?.sessionId?.()||''}});
      const data = await response.json().catch(()=>({})); if(!response.ok) throw new Error(data.error || 'Contact information is unavailable.');
      const digits=String(data.phone||'').replace(/\D/g,''); result.replaceChildren(); result.dataset.eusContactListing=contactButton.dataset.listingContact||''; result.dataset.eusContactCategory=listings.find((item)=>String(item.id)===String(contactButton.dataset.listingContact))?.category||''; const label=document.createElement('strong'); label.textContent=`${data.name || 'Seller'}:`; const call=document.createElement('a'); call.href=`tel:${digits}`; call.textContent=`Call ${data.phone || ''}`; const text=document.createElement('a'); text.href=`sms:${digits}`; text.textContent='Text Seller'; result.append(label,call,text); result.hidden=false; contactButton.setAttribute('aria-expanded','true'); contactButton.textContent='Hide Contact Info';
    } catch(error) { result.hidden=false; result.textContent=error.message || 'Contact information is unavailable.'; contactButton.textContent='Try Contact Again'; }
    finally { contactButton.disabled=false; }
  });

  const filterOpener = document.querySelector('[data-filter-open]');
  let drawerReturnFocus = null;
  const drawerDialog = drawer?.querySelector('[role="dialog"]');
  const drawerFocusable = () => drawerDialog ? [...drawerDialog.querySelectorAll('button:not([disabled]),select:not([disabled]),input:not([disabled]),a[href],[tabindex]:not([tabindex="-1"])')].filter((el) => !el.hidden) : [];
  const openDrawer = () => {
    if(!drawer)return; drawerReturnFocus=document.activeElement instanceof HTMLElement ? document.activeElement : filterOpener; drawer.hidden=false; document.body.classList.add('marketplace-filter-open');
    drawer.querySelector('[data-drawer-category]').value=favoritesOnly?'all':selectedFilter;
    drawer.querySelector('[data-drawer-location]').value=locationInput?.value||'';
    drawer.querySelector('[data-drawer-max-price]').value=maxPriceInput?.value||'';
    drawer.querySelector('[data-drawer-status]').value=statusSelect?.value||'published';
    drawer.querySelector('[data-drawer-sort]').value=sortSelect?.value||'newest';
    drawer.querySelector('[data-filter-close]')?.focus();
  };
  const closeDrawer = () => { if(!drawer)return; drawer.hidden=true; document.body.classList.remove('marketplace-filter-open'); const target=drawerReturnFocus; drawerReturnFocus=null; target?.focus?.(); };
  filterOpener?.addEventListener('click',openDrawer);
  drawer?.querySelectorAll('[data-filter-close]').forEach((button)=>button.addEventListener('click',closeDrawer));
  drawer?.querySelector('[data-filter-apply]')?.addEventListener('click',()=>{
    selectedFilter=drawer.querySelector('[data-drawer-category]').value; favoritesOnly=false;
    if(locationInput)locationInput.value=drawer.querySelector('[data-drawer-location]').value;
    if(maxPriceInput)maxPriceInput.value=drawer.querySelector('[data-drawer-max-price]').value;
    if(statusSelect)statusSelect.value=drawer.querySelector('[data-drawer-status]').value;
    if(sortSelect)sortSelect.value=drawer.querySelector('[data-drawer-sort]').value;
    closeDrawer(); setCategory(selectedFilter);
  });
  window.addEventListener('keydown',(event)=>{if(drawer?.hidden)return;if(event.key==='Escape'){event.preventDefault();closeDrawer();return;}if(event.key==='Tab'){const items=drawerFocusable();if(!items.length)return;const first=items[0],last=items[items.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});

  const load = async () => {
    try {
      const response=await fetch('/api/marketplace/listings',{headers:{Accept:'application/json'},cache:'no-store'}); const data=await response.json().catch(()=>({})); if(!response.ok)throw new Error(data.error||'Listings are unavailable.'); listings=data.listings||[]; render();
    } catch(error) { console.warn('Marketplace listings could not be loaded:',error); if(resultCount)resultCount.textContent='0'; if(emptyState){emptyState.hidden=false; emptyState.querySelector('h3').textContent='Marketplace listings could not be loaded.'; emptyState.querySelector('p').textContent='Refresh the page or try again shortly.';} }
  };
  updateSavedCount(); syncHero(); load();
})();
