(function () {
  'use strict';

  const header     = document.querySelector('.site-header');
  const hamburger  = document.getElementById('hamburger');
  const mainNav    = document.getElementById('main-nav');
  const navLinks   = mainNav.querySelectorAll('a');
  const backToTop  = document.getElementById('back-to-top');
  const yearEl     = document.getElementById('year');
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Sticky header + back to top ── */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ── Mobile nav ── */
  function closeNav() {
    mainNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    hamburger.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => link.addEventListener('click', closeNav));

  /* ── Active nav link ── */
  const sections = document.querySelectorAll('main section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) current = s.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  }, { passive: true });

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('pillars-grid') || parent.classList.contains('community-grid'))) {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    }
    revealObserver.observe(el);
  });

  /* ── Contact form — Netlify submission ── */
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      const nameEl    = form.querySelector('#name');
      const emailEl   = form.querySelector('#email');
      const messageEl = form.querySelector('#message');
      const submitBtn = document.getElementById('submit-btn');
      let valid = true;

      [nameEl, emailEl, messageEl].forEach(f => f.classList.remove('error'));
      if (!nameEl.value.trim())                             { nameEl.classList.add('error');    valid = false; }
      if (!emailEl.value.trim() || !emailEl.validity.valid) { emailEl.classList.add('error');   valid = false; }
      if (!messageEl.value.trim())                          { messageEl.classList.add('error'); valid = false; }

      if (!valid) {
        formStatus.textContent = 'Please fill in all fields correctly.';
        formStatus.classList.add('error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        });
        if (res.ok) {
          formStatus.textContent = "Thanks for reaching out! We'll be in touch soon.";
          form.reset();
        } else {
          throw new Error();
        }
      } catch {
        formStatus.textContent = 'Something went wrong. Please email us at info@houseafrica.ee';
        formStatus.classList.add('error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  /* ── Gallery lightbox ── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev  = document.getElementById('lightbox-prev');
  const lightboxNext  = document.getElementById('lightbox-next');
  const galleryItems  = Array.from(document.querySelectorAll('.gallery-item'));
  let currentIndex    = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryItems[index].dataset.src;
    lightboxImg.alt = galleryItems[index].querySelector('img').alt;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    galleryItems[currentIndex].focus();
  }

  function showNext() { openLightbox((currentIndex + 1) % galleryItems.length); }
  function showPrev() { openLightbox((currentIndex - 1 + galleryItems.length) % galleryItems.length); }

  galleryItems.forEach((item, i) => item.addEventListener('click', () => openLightbox(i)));
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxNext.addEventListener('click', showNext);
  lightboxPrev.addEventListener('click', showPrev);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (mainNav.classList.contains('open') && e.key === 'Escape') { closeNav(); return; }
    if (lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft')  showPrev();
  });

})();
