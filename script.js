(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  // Header scroll effect
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  navAnchors.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active nav link on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    '.portfolio-category, .timeline-item, .edu-card, .cert-item, .info-card, .contact-item, .contact-form'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Übersetzungs-Helfer (i18n.js wird nach diesem Skript geladen).
  const tr = (key, fallback) => {
    const v = window.i18nText ? window.i18nText(key) : key;
    return v && v !== key ? v : fallback;
  };
  const i18nUpdaters = [];
  document.addEventListener('i18n:change', () => i18nUpdaters.forEach((fn) => fn()));

  // Berufserfahrung kompakt: lange Listen kürzen, ältere Stationen einklappen.
  const VISIBLE_POINTS = 3;
  const COLLAPSE_FROM_INDEX = 4; // ab der 5. Station (vor 2015) nur Kopfzeile zeigen

  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    const content = item.querySelector('.timeline-content');
    const list = content && content.querySelector('ul');
    const points = list ? Array.from(list.children) : [];
    const collapseAll = index >= COLLAPSE_FROM_INDEX;
    const hiddenPoints = collapseAll ? points : points.slice(VISIBLE_POINTS);
    if (!collapseAll && hiddenPoints.length < 2) return;

    hiddenPoints.forEach((li) => li.classList.add('is-extra'));
    item.classList.add(collapseAll ? 'is-collapsed' : 'is-truncated');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'timeline-toggle';
    btn.setAttribute('aria-expanded', 'false');
    if (list) {
      list.id = list.id || `timeline-list-${index}`;
      btn.setAttribute('aria-controls', list.id);
    }

    const render = () => {
      const open = item.classList.contains('is-open');
      let label;
      if (open) label = tr('ui.showLess', 'Weniger anzeigen');
      else if (collapseAll) label = tr('ui.details', 'Details anzeigen');
      else label = `${tr('ui.showMore', 'Mehr anzeigen')} (+${hiddenPoints.length})`;
      btn.innerHTML = `<span>${label}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>`;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    btn.addEventListener('click', () => {
      item.classList.toggle('is-open');
      render();
      if (!item.classList.contains('is-open')) {
        const top = item.getBoundingClientRect().top;
        if (top < 0) item.scrollIntoView({ block: 'start' });
      }
    });

    content.appendChild(btn);
    render();
    i18nUpdaters.push(render);
  });

  // Zertifikate: Schaltfläche „Ansehen" öffnet das Dokument aus dem Portfolio.
  document.querySelectorAll('.cert-item[data-doc]').forEach((cert) => {
    const [catId, idx] = cert.dataset.doc.split(':');
    if (typeof window.openPortfolioItem !== 'function') return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cert-view';
    const title = cert.querySelector('strong');
    const render = () => {
      btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg><span>${tr('ui.view', 'Ansehen')}</span>`;
      btn.setAttribute('aria-label', `${tr('ui.viewDoc', 'Dokument ansehen')}: ${title ? title.textContent : ''}`);
    };
    btn.addEventListener('click', () => window.openPortfolioItem(catId, Number(idx)));
    cert.classList.add('has-doc');
    cert.appendChild(btn);
    render();
    i18nUpdaters.push(render);
  });

  // Scroll-Fortschritt und „Nach oben"-Schaltfläche
  const progress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    if (progress) progress.style.transform = `scaleX(${ratio})`;
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > window.innerHeight);
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  // Contact form — opens mail client
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent(`${tr('mail.subject', 'Kontaktanfrage von')} ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n${tr('mail.email', 'E-Mail')}: ${email}\n\n${message}`);
    window.location.href = `mailto:olyermakov@gmail.com?subject=${subject}&body=${body}`;
  });
})();
