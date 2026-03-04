(function () {
  'use strict';

  const select = (el, all = false) =>
    all ? [...document.querySelectorAll(el)] : document.querySelector(el);

  const header = select('#header');
  const navbar = select('#navbar');
  const navToggle = select('.mobile-nav-toggle');

  /* ── Header background on scroll ── */
  const updateHeader = () =>
    header?.classList.toggle('header-scrolled', window.scrollY > 80);

  /* ── Back to top visibility ── */
  const backToTop = select('.back-to-top');
  const updateBackToTop = () =>
    backToTop?.classList.toggle('active', window.scrollY > 200);

  /* ── Active nav link on scroll ── */
  const navLinks = select('#navbar .scrollto', true);
  const updateActiveNav = () => {
    const pos = window.scrollY + 130;
    navLinks.forEach(link => {
      const section = link.hash && select(link.hash);
      if (!section) return;
      link.classList.toggle('active',
        pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight
      );
    });
  };

  window.addEventListener('load', () => {
    updateHeader();
    updateBackToTop();
    updateActiveNav();
    select('#preloader')?.remove();
    if (window.location.hash && select(window.location.hash)) scrollTo(window.location.hash);
  });

  window.addEventListener('scroll', () => {
    updateHeader();
    updateBackToTop();
    updateActiveNav();
  }, { passive: true });

  /* ── Smooth scroll ── */
  const scrollTo = (hash) => {
    const target = select(hash);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - (header?.offsetHeight ?? 70) - 10, behavior: 'smooth' });
  };

  document.addEventListener('click', e => {
    const link = e.target.closest('.scrollto');
    if (!link?.hash || !select(link.hash)) return;
    e.preventDefault();
    closeNav();
    scrollTo(link.hash);
  });

  /* ── Mobile nav ── */
  const closeNav = () => {
    navbar?.classList.remove('navbar-mobile');
    const icon = navToggle?.querySelector('i');
    if (icon) icon.className = 'bi bi-list';
  };

  navToggle?.addEventListener('click', () => {
    const isOpen = navbar?.classList.toggle('navbar-mobile');
    const icon = navToggle.querySelector('i');
    if (icon) icon.className = isOpen ? 'bi bi-x-lg' : 'bi bi-list';
  });

  /* ── Typed.js ── */
  const typedEl = select('.typed');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('.typed', {
      strings: typedEl.dataset.typedItems.split(',').map(s => s.trim()),
      loop: true,
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 2200,
    });
  }

  /* ── Reveal animations ── */
  const revealObserver = new IntersectionObserver(
    entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.08, rootMargin: '0px 0px -55px 0px' }
  );
  select('.reveal', true).forEach(el => revealObserver.observe(el));

  /* ── Skill bar animation ── */
  const skillsSection = select('.skills');
  if (skillsSection) {
    new IntersectionObserver(([entry], obs) => {
      if (!entry.isIntersecting) return;
      skillsSection.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = (bar.dataset.width ?? 0) + '%';
      });
      obs.disconnect();
    }, { threshold: 0.35 }).observe(skillsSection);
  }

  /* ── Portfolio details slider (detail pages only) ── */
  if (typeof Swiper !== 'undefined' && select('.portfolio-details-slider')) {
    new Swiper('.portfolio-details-slider', {
      speed: 400,
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', type: 'bullets', clickable: true },
    });
  }

})();
