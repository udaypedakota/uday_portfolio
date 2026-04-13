// ===== LOADER =====
window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('hidden');
});

// ===== SCROLL PROGRESS =====
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('scrollProgress').style.width = scrolled + '%';
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ===== BACK TO TOP =====
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.querySelector('i').className = navLinks.classList.contains('open') ? 'bx bx-x' : 'bx bx-menu';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelector('i').className = 'bx bx-menu';
  });
});

// ===== THEME PERSISTENCE =====
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  document.querySelector('#themeToggle i').className = 'bx bx-sun';
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  icon.className = isLight ? 'bx bx-sun' : 'bx bx-moon';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ===== ACTIVE NAV LINK =====
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const link = document.querySelector(`.nav-links a[href="#${section.id}"]`);
    if (!link) return;
    const top = section.offsetTop, bottom = top + section.offsetHeight;
    link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.about-card, .skill-category, .project-card, .timeline-card, .contact-item, .stat').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const subject = document.getElementById('contactSubject').value;
  const message = document.getElementById('contactMessage').value;
  const text = `Name: ${name}%0AEmail: ${email}%0ASubject: ${subject}%0AMessage: ${message}`;
  window.open(`https://wa.me/919908660573?text=${text}`, '_blank');
});

// ===== HIRE ME BUTTON =====
document.querySelector('.hire-btn').addEventListener('click', () => {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
});

// ===== TYPING EFFECT =====
const roles = ['Full Stack Developer', 'Java Engineer', 'Angular Developer', 'Microservices Architect'];
const roleEl = document.querySelector('.hero-role');
let roleIndex = 0, charIndex = 0, deleting = false;
function type() {
  const current = roles[roleIndex];
  roleEl.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
  if (!deleting && charIndex > current.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && charIndex < 0) { deleting = false; roleIndex = (roleIndex + 1) % roles.length; }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ===== STAT COUNT-UP =====
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const span = entry.target.querySelector('span');
    const target = parseFloat(span.textContent);
    const suffix = span.textContent.replace(/[\d.]/g, '');
    let current = 0, step = target / 40;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      span.textContent = (Number.isInteger(target) ? Math.floor(current) : current.toFixed(1)) + suffix;
      if (current >= target) clearInterval(timer);
    }, 30);
    statObserver.unobserve(entry.target);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat').forEach(el => statObserver.observe(el));

// ===== CURSOR GLOW =====
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ===== PROJECT CARD TILT (desktop only) =====
if (window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const { left, top, width, height } = card.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 12;
      const y = ((e.clientY - top) / height - 0.5) * -12;
      card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

// ===== FLOATING PARTICLES =====
const hero = document.querySelector('.hero');
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;width:${2+Math.random()*4}px;height:${2+Math.random()*4}px;animation-delay:${Math.random()*6}s;animation-duration:${6+Math.random()*6}s`;
  hero.appendChild(p);
}
