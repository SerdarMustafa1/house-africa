/* ============================================================
   House Africa MTÜ — script.js
   Handles: sticky header, mobile nav, scroll reveal,
            back-to-top, active nav links, contact form
   ============================================================ */

(function () {
  'use strict';

  /* ── Element refs ── */
  const header     = document.querySelector('.site-header');
  const hamburger  = document.getElementById('hamburger');
  const mainNav    = document.getElementById('main-nav');
  const navLinks   = mainNav.querySelectorAll('a');
  const backToTop  = document.getElementById('back-to-top');
  const yearEl     = document.getElementById('year');
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  /* ── Current year in footer ── */
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── Sticky header shadow ── */
  function onScroll() {
    const scrolled = window.scrollY > 10;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Mobile nav toggle ── */
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

  /* Close nav when a link is clicked */
  navLinks.forEach(link => link.addEventListener('click', closeNav));

  /* Close nav on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) closeNav();
  });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('main section[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ── Scroll reveal ── */
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((el, i) => {
    /* Stagger sibling cards */
    const parent = el.parentElement;
    if (parent && (parent.classList.contains('pillars-grid') || parent.classList.contains('community-grid'))) {
      el.style.transitionDelay = `${(i % 3) * 0.1}s`;
    }
    revealObserver.observe(el);
  });

  /* ── Contact form (front-end validation + UX only) ── */
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      const name    = form.querySelector('#name');
      const email   = form.querySelector('#email');
      const message = form.querySelector('#message');
      let valid = true;

      [name, email, message].forEach(field => field.classList.remove('error'));

      if (!name.value.trim()) { name.classList.add('error'); valid = false; }
      if (!email.value.trim() || !email.validity.valid) { email.classList.add('error'); valid = false; }
      if (!message.value.trim()) { message.classList.add('error'); valid = false; }

      if (!valid) {
        formStatus.textContent = 'Please fill in all fields correctly.';
        formStatus.classList.add('error');
        return;
      }

      /*
        TODO: Replace this block with a real submission.
        Options:
          - fetch(form.action, { method: 'POST', body: new FormData(form) })
          - Formspree: set form action="https://formspree.io/f/YOUR_ID" and remove e.preventDefault()
          - Netlify Forms: add netlify attribute to <form> and remove e.preventDefault()
      */
      formStatus.textContent = "Thanks for reaching out! We'll be in touch soon.";
      form.reset();
    });
  }

})();
