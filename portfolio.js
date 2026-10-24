(function initPortfolio() {
  'use strict';

  const container = document.getElementById('portfolioCategories');
  if (!container || !window.PORTFOLIO_DATA) return;

  const categories = window.PORTFOLIO_DATA
    .map((cat) => {
      const items = (cat.items || []).map((it) => ({
        type: it.type,
        label: it.label || '',
        src: it.src || null,
        pages: it.pages || null,
        thumb: it.thumb || (it.type === 'pdf' ? (it.pages && it.pages[0]) : it.src),
        size: it.size || null
      })).filter((it) => it.thumb);
      return {
        id: cat.id,
        title: cat.title,
        desc: cat.desc,
        items,
        images: items.filter((it) => it.type === 'image'),
        pdfs: items.filter((it) => it.type === 'pdf')
      };
    })
    .filter((cat) => cat.items.length > 0);

  if (!categories.length) return;

  const iconExpand = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/></svg>';
  const iconPdf = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6"/></svg>';

  const noContext = (e) => e.preventDefault();

  // Übersetzungs-Helfer: nutzt i18n.js, falls geladen, sonst deutscher Fallback.
  const tt = (key, fallback) => {
    if (!window.i18nText) return fallback;
    const v = window.i18nText(key);
    return v && v !== key ? v : fallback;
  };
  const catTitle = (cat) => tt(`pcat.${cat.id}.title`, cat.title);
  const itemLabel = (catId, idx, fallback) => tt(`pitem.${catId}.${idx}`, fallback);
  const pad2 = (n) => String(n).padStart(2, '0');
  const sizeAttrs = (item) => item.size ? ` width="${item.size[0]}" height="${item.size[1]}"` : '';

  // Elemente mit statischen, übersetzbaren Attributen (aria-label) — siehe i18n:change.
  const ariaEls = [];
  function setAria(el, key, fallback) {
    el.setAttribute('aria-label', tt(key, fallback));
    ariaEls.push({ el, key, fallback });
  }

  function countLabel(cat) {
    const parts = [];
    if (cat.images.length) {
      const w = cat.images.length === 1 ? tt('pcat.image', 'Bild') : tt('pcat.images', 'Bilder');
      parts.push(`${cat.images.length} ${w}`);
    }
    if (cat.pdfs.length) {
      const w = cat.pdfs.length === 1 ? tt('pcat.pdf', 'PDF') : tt('pcat.pdfs', 'PDF-Dokumente');
      parts.push(`${cat.pdfs.length} ${w}`);
    }
    return parts.join(' · ');
  }

  const countEls = [];
  const pdfThumbs = [];
  const imgThumbs = [];

  // Bilder ohne eigenen Titel (z. B. „1", „2") werden als „Kategorie — Nr." beschriftet.
  function imageLabel(cat, idx) {
    const raw = cat.items[idx].label;
    const label = itemLabel(cat.id, idx, raw);
    return !raw || /^\d+$/.test(label) ? `${catTitle(cat)} — ${idx + 1}` : label;
  }

  // ---- Karussell-Grundgerüst ----
  const carousel = document.createElement('div');
  carousel.className = 'portfolio-carousel';
  carousel.innerHTML = `
    <div class="portfolio-carousel-bar">
      <button type="button" class="portfolio-carousel-btn portfolio-carousel-prev">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div class="portfolio-carousel-status">
        <span class="portfolio-carousel-index">01</span>
        <span class="portfolio-carousel-sep">/</span>
        <span class="portfolio-carousel-total">${pad2(categories.length)}</span>
        <span class="portfolio-carousel-title"></span>
      </div>
      <button type="button" class="portfolio-carousel-btn portfolio-carousel-next">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>
    </div>
    <div class="portfolio-carousel-viewport">
      <div class="portfolio-carousel-track"></div>
    </div>
    <div class="portfolio-carousel-dots" role="tablist"></div>
  `;

  const track = carousel.querySelector('.portfolio-carousel-track');
  const dotsWrap = carousel.querySelector('.portfolio-carousel-dots');
  const titleEl = carousel.querySelector('.portfolio-carousel-title');
  const indexEl = carousel.querySelector('.portfolio-carousel-index');
  setAria(carousel.querySelector('.portfolio-carousel-prev'), 'ui.prevCategory', 'Vorherige Kategorie');
  setAria(carousel.querySelector('.portfolio-carousel-next'), 'ui.nextCategory', 'Nächste Kategorie');
  setAria(dotsWrap, 'ui.categories', 'Kategorien');

  categories.forEach((cat, catIndex) => {
    const slide = document.createElement('div');
    slide.className = 'portfolio-slide';
    slide.setAttribute('role', 'tabpanel');
    slide.id = `portfolio-slide-${cat.id}`;

    const cover = (cat.items[0] || cat.images[0]);
    const coverHtml = cover
      ? `<img src="${cover.thumb}" alt=""${sizeAttrs(cover)} loading="lazy" decoding="async">`
      : `<div class="portfolio-category-cover-placeholder">${iconPdf}</div>`;

    slide.innerHTML = `
      <article class="portfolio-category">
        <div class="portfolio-category-header">
          <div class="portfolio-category-cover">${coverHtml}</div>
          <div class="portfolio-category-info">
            <span class="portfolio-category-tag">${pad2(catIndex + 1)} · <span data-i18n="pcat.field">Fachgebiet</span></span>
            <h3 data-i18n="pcat.${cat.id}.title">${cat.title}</h3>
            <p data-i18n="pcat.${cat.id}.desc">${cat.desc}</p>
            <span class="portfolio-count">${countLabel(cat)}</span>
          </div>
        </div>
        <div class="portfolio-gallery" role="list"></div>
      </article>
    `;

    const gallery = slide.querySelector('.portfolio-gallery');
    const countEl = slide.querySelector('.portfolio-count');
    if (countEl) countEls.push({ el: countEl, cat });

    cat.items.forEach((item, i) => {
      const thumb = document.createElement('button');
      thumb.type = 'button';
      thumb.setAttribute('role', 'listitem');
      thumb.addEventListener('contextmenu', noContext);

      if (item.type === 'pdf') {
        const label = itemLabel(cat.id, i, item.label);
        thumb.className = 'portfolio-thumb portfolio-thumb-pdf';
        thumb.setAttribute('aria-label', `PDF: ${label}`);
        thumb.title = label;
        thumb.innerHTML = `
          <span class="portfolio-thumb-media">
            <img src="${item.thumb}" alt=""${sizeAttrs(item)} loading="lazy" decoding="async" draggable="false">
          </span>
          <span class="portfolio-thumb-badge">PDF</span>
          <span class="portfolio-thumb-overlay">${iconExpand}</span>
        `;
        pdfThumbs.push({ thumb, catId: cat.id, idx: i, fallback: item.label });
      } else {
        thumb.className = 'portfolio-thumb';
        thumb.setAttribute('aria-label', imageLabel(cat, i));
        thumb.title = imageLabel(cat, i);
        thumb.innerHTML = `
          <img src="${item.thumb}" alt=""${sizeAttrs(item)} loading="lazy" decoding="async" draggable="false">
          <span class="portfolio-thumb-overlay">${iconExpand}</span>
          <span class="portfolio-thumb-caption" aria-hidden="true"></span>
        `;
        const caption = thumb.querySelector('.portfolio-thumb-caption');
        caption.textContent = imageLabel(cat, i);
        imgThumbs.push({ thumb, cat, idx: i, caption });
      }

      thumb.addEventListener('click', () => openLightbox(catIndex, i));
      gallery.appendChild(thumb);
    });

    track.appendChild(slide);

    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'portfolio-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', catTitle(cat));
    dot.dataset.index = String(catIndex);
    dot.addEventListener('click', () => goTo(catIndex));
    dotsWrap.appendChild(dot);
  });

  container.appendChild(carousel);

  const slides = Array.from(track.querySelectorAll('.portfolio-slide'));
  const dots = Array.from(dotsWrap.querySelectorAll('.portfolio-dot'));
  let current = 0;

  function updateHeight() {
    const active = slides[current];
    if (!active) return;
    const h = active.offsetHeight + 'px';
    if (track.style.height !== h) track.style.height = h;
  }

  function goTo(index) {
    current = (index + categories.length) % categories.length;
    track.style.transform = `translateX(${-current * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
    slides.forEach((s, i) => s.setAttribute('aria-hidden', i === current ? 'false' : 'true'));
    titleEl.textContent = catTitle(categories[current]);
    indexEl.textContent = pad2(current + 1);
    updateHeight();
  }

  // Dynamische Texte bei Sprachwechsel aktualisieren (i18n.js übernimmt data-i18n-Elemente).
  document.addEventListener('i18n:change', () => {
    titleEl.textContent = catTitle(categories[current]);
    countEls.forEach(({ el, cat }) => { el.textContent = countLabel(cat); });
    dots.forEach((d, i) => d.setAttribute('aria-label', catTitle(categories[i])));
    ariaEls.forEach(({ el, key, fallback }) => el.setAttribute('aria-label', tt(key, fallback)));
    imgThumbs.forEach(({ thumb, cat, idx, caption }) => {
      const label = imageLabel(cat, idx);
      thumb.setAttribute('aria-label', label);
      thumb.title = label;
      caption.textContent = label;
    });
    pdfThumbs.forEach(({ thumb, catId, idx, fallback }) => {
      const label = itemLabel(catId, idx, fallback);
      thumb.title = label;
      thumb.setAttribute('aria-label', `PDF: ${label}`);
    });
    if (!lightbox.hidden) {
      lbCatTitle = catTitle(categories.find((c) => c.id === lbCatId) || { id: lbCatId, title: lbCatTitle });
      renderLightbox();
    }
    updateHeight();
  });

  carousel.querySelector('.portfolio-carousel-prev').addEventListener('click', () => goTo(current - 1));
  carousel.querySelector('.portfolio-carousel-next').addEventListener('click', () => goTo(current + 1));

  // Touch-/Swipe-Unterstützung
  let startX = 0;
  let dragging = false;
  const viewport = carousel.querySelector('.portfolio-carousel-viewport');
  viewport.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    dragging = true;
  }, { passive: true });
  viewport.addEventListener('touchend', (e) => {
    if (!dragging) return;
    dragging = false;
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 50) goTo(current + (delta < 0 ? 1 : -1));
  });

  window.addEventListener('resize', updateHeight);
  track.querySelectorAll('img').forEach((img) => {
    img.addEventListener('load', () => {
      if (slides[current] && slides[current].contains(img)) updateHeight();
    });
  });

  goTo(0);
  window.addEventListener('load', updateHeight);
  setTimeout(updateHeight, 400);

  // ---- Lightbox ----
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.id = 'lightbox';
  lightbox.hidden = true;
  lightbox.innerHTML = `
    <div class="lightbox-backdrop" data-close></div>
    <div class="lightbox-dialog" role="dialog" aria-modal="true" tabindex="-1">
      <button type="button" class="lightbox-close">&times;</button>
      <button type="button" class="lightbox-nav lightbox-prev">&#8249;</button>
      <button type="button" class="lightbox-nav lightbox-next">&#8250;</button>
      <figure class="lightbox-figure">
        <img class="lightbox-img" src="" alt="" hidden draggable="false">
        <div class="lightbox-pdf" hidden></div>
        <figcaption class="lightbox-caption"></figcaption>
      </figure>
      <div class="lightbox-toolbar">
        <span class="lightbox-counter"></span>
      </div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const lbImg = lightbox.querySelector('.lightbox-img');
  const lbPdfWrap = lightbox.querySelector('.lightbox-pdf');
  const lbCaption = lightbox.querySelector('.lightbox-caption');
  const lbCounter = lightbox.querySelector('.lightbox-counter');
  const lbDialog = lightbox.querySelector('.lightbox-dialog');
  const lbClose = lightbox.querySelector('.lightbox-close');
  setAria(lbDialog, 'ui.preview', 'Portfolio-Vorschau');
  setAria(lbClose, 'ui.close', 'Schließen');
  setAria(lightbox.querySelector('.lightbox-prev'), 'ui.prevItem', 'Vorheriges Dokument');
  setAria(lightbox.querySelector('.lightbox-next'), 'ui.nextItem', 'Nächstes Dokument');
  lbImg.addEventListener('contextmenu', noContext);
  lbPdfWrap.addEventListener('contextmenu', noContext);

  let lbItems = [];
  let lbIndex = 0;
  let lbCatTitle = '';
  let lbCatId = '';
  let lbReturnFocus = null;
  let lbHistory = false; // true, solange ein History-Eintrag für die Lightbox existiert

  function openLightbox(catIndex, itemIndex) {
    lbReturnFocus = document.activeElement;
    lbItems = categories[catIndex].items;
    lbCatId = categories[catIndex].id;
    lbCatTitle = catTitle(categories[catIndex]);
    lbIndex = itemIndex;
    renderLightbox();
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lbClose.focus();
    // Eigener History-Eintrag: „Zurück" (Taste/Wischgeste) schließt die Lightbox,
    // statt die Seite zu verlassen oder darunter zu scrollen.
    if (!lbHistory) {
      try {
        history.pushState({ lightbox: true }, '');
        lbHistory = true;
      } catch (e) { /* ohne History-API weiter */ }
    }
  }

  function closeLightbox(fromHistory) {
    if (lightbox.hidden) return;
    if (lbHistory && fromHistory !== true) {
      lbHistory = false;
      history.back(); // löst popstate aus, Eintrag wird entfernt
    }
    lbHistory = false;
    lightbox.hidden = true;
    lbPdfWrap.innerHTML = '';
    lbImg.removeAttribute('src');
    document.body.style.overflow = '';
    if (lbReturnFocus && typeof lbReturnFocus.focus === 'function') lbReturnFocus.focus();
  }

  // Nachbarbilder vorladen, damit das Blättern ohne Wartezeit funktioniert.
  function preload(item) {
    if (!item) return;
    const src = item.type === 'pdf' ? item.pages[0] : item.src;
    if (src) new Image().src = src;
  }

  function renderLightbox() {
    const item = lbItems[lbIndex];
    if (!item) return;
    lbCounter.textContent = `${lbIndex + 1} / ${lbItems.length}`;
    const label = itemLabel(lbCatId, lbIndex, item.label);

    if (item.type === 'pdf') {
      lbImg.hidden = true;
      lbImg.removeAttribute('src');
      lbPdfWrap.hidden = false;
      lbCaption.textContent = label;
      lbPdfWrap.innerHTML = '';
      lbPdfWrap.scrollTop = 0;
      item.pages.forEach((src, p) => {
        const img = document.createElement('img');
        img.className = 'lightbox-pdf-page';
        img.src = src;
        img.alt = `${label} — ${p + 1}`;
        img.loading = 'lazy';
        img.draggable = false;
        img.addEventListener('contextmenu', noContext);
        lbPdfWrap.appendChild(img);
      });
    } else {
      lbPdfWrap.hidden = true;
      lbPdfWrap.innerHTML = '';
      const cat = categories.find((c) => c.id === lbCatId);
      const imgLabel = cat ? imageLabel(cat, lbIndex) : lbCatTitle;
      lbImg.hidden = false;
      lbImg.src = item.src;
      lbImg.alt = imgLabel;
      lbCaption.textContent = imgLabel;
    }
    if (lbItems.length > 1) {
      preload(lbItems[(lbIndex + 1) % lbItems.length]);
      preload(lbItems[(lbIndex - 1 + lbItems.length) % lbItems.length]);
    }
  }

  function stepLightbox(delta) {
    lbIndex = (lbIndex + delta + lbItems.length) % lbItems.length;
    renderLightbox();
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', () => closeLightbox());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => stepLightbox(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => stepLightbox(1));

  window.addEventListener('popstate', () => {
    if (!lightbox.hidden) closeLightbox(true);
  });

  // Tippen/Klicken auf die freie Fläche rund um das Dokument schließt die Lightbox.
  const closeTargets = new Set([
    lightbox, lbDialog, lightbox.querySelector('[data-close]'),
    lightbox.querySelector('.lightbox-figure')
  ]);
  lightbox.addEventListener('click', (e) => {
    if (closeTargets.has(e.target)) closeLightbox();
  });

  // Wischen nach links/rechts blättert (vertikales Scrollen in PDFs bleibt erhalten).
  let swipeX = 0;
  let swipeY = 0;
  let swipeActive = false;
  lightbox.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { swipeActive = false; return; }
    swipeActive = true;
    swipeX = e.touches[0].clientX;
    swipeY = e.touches[0].clientY;
  }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    if (!swipeActive || lbItems.length < 2) return;
    swipeActive = false;
    const dx = e.changedTouches[0].clientX - swipeX;
    const dy = e.changedTouches[0].clientY - swipeY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) stepLightbox(dx < 0 ? 1 : -1);
  }, { passive: true });

  // Öffentliche API: Dokument aus dem Portfolio direkt öffnen (z. B. aus der Zertifikatsliste).
  window.openPortfolioItem = (catId, itemIndex) => {
    const catIndex = categories.findIndex((c) => c.id === catId);
    if (catIndex < 0 || !categories[catIndex].items[itemIndex]) return false;
    openLightbox(catIndex, itemIndex);
    return true;
  };

  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
    if (e.key === 'Tab') {
      // Fokus innerhalb des Dialogs halten.
      const focusables = Array.from(lbDialog.querySelectorAll('button')).filter((b) => b.offsetParent !== null);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  // Reveal-Beobachter
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  carousel.classList.add('reveal');
  revealObserver.observe(carousel);
})();
