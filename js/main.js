// ===========================
// MOBILE NAV TOGGLE
// ===========================
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

// Close nav on link click
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ===========================
// STICKY HEADER SHADOW
// ===========================
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerH = header.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 12;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===========================
// CONTACT FORM SUBMISSION (Netlify Forms)
// ===========================
const form = document.getElementById('contactForm');

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  const data = {
    'form-name': 'contact',
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    service: document.getElementById('service').value,
    message: document.getElementById('message').value,
  };

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encode(data),
  })
    .then(() => {
      btn.textContent = 'Request Sent! ✓';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Request';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 4000);
    })
    .catch(() => {
      btn.textContent = 'Failed. Try again.';
      btn.style.background = '#dc2626';
      btn.style.borderColor = '#dc2626';
      btn.disabled = false;
      setTimeout(() => {
        btn.textContent = 'Send Request';
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 3000);
    });
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealEls = document.querySelectorAll(
  '.service-card, .step, .why-card, .testimonial-card, .contact-item'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
