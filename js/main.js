/* SabioAcademy.com — Main JavaScript */
(function () {
  'use strict';

  // --- Navbar scroll state ---
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- Mobile hamburger menu ---
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger to X
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  // --- Scroll-into-view animations ---
  const animatedEls = document.querySelectorAll(
    '.program-card, .testimonial-card, .about-card, .research-highlight, .hero-stats .stat'
  );

  animatedEls.forEach(function (el) {
    el.classList.add('animate-on-scroll');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  animatedEls.forEach(function (el) { observer.observe(el); });

  // --- Stagger animation for grids ---
  document.querySelectorAll('.programs-grid, .testimonials-grid').forEach(function (grid) {
    Array.from(grid.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.08) + 's';
    });
  });

  // --- CTA Form submission ---
  const ctaForm    = document.getElementById('cta-form');
  const formSuccess = document.getElementById('form-success');

  if (ctaForm) {
    ctaForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Basic validation
      if (!name) {
        showFieldError('name', 'Please enter your name.');
        return;
      }
      if (!email || !emailRe.test(email)) {
        showFieldError('email', 'Please enter a valid email address.');
        return;
      }

      // Simulate form submission
      const btn = ctaForm.querySelector('button[type="submit"]');
      btn.disabled    = true;
      btn.textContent = 'Submitting…';

      setTimeout(function () {
        ctaForm.style.display    = 'none';
        formSuccess.hidden       = false;
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 800);
    });
  }

  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    field.focus();
    field.style.borderColor = '#f87171';
    field.setAttribute('aria-invalid', 'true');

    // Show a visible error message below the field
    var existingError = field.parentNode.querySelector('.field-error');
    if (existingError) existingError.remove();
    var errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;
    errorEl.style.cssText = 'display:block;font-size:13px;color:#f87171;margin-top:6px;padding-left:8px;';
    field.parentNode.appendChild(errorEl);

    field.addEventListener('input', function onInput() {
      field.style.borderColor = '';
      field.removeAttribute('aria-invalid');
      if (errorEl.parentNode) errorEl.remove();
      field.removeEventListener('input', onInput);
    }, { once: true });
  }

  // --- Smooth anchor scrolling with navbar offset ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
