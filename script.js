// ============ Mobile nav toggle ============
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ============ Hero slider ============
const heroSlider = document.getElementById('heroSlider');
const heroSlides = heroSlider ? Array.from(heroSlider.querySelectorAll('.hero-slide')) : [];
const heroDotsWrap = document.getElementById('heroDots');
let heroCurrent = 0;
let heroTimer;

function renderHeroDots() {
  heroDotsWrap.innerHTML = '';
  heroSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === heroCurrent ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => { heroGoTo(i); heroStartAuto(); });
    heroDotsWrap.appendChild(dot);
  });
}

function heroGoTo(index) {
  heroSlides[heroCurrent].classList.remove('active');
  heroCurrent = (index + heroSlides.length) % heroSlides.length;
  heroSlides[heroCurrent].classList.add('active');
  renderHeroDots();
}

function heroNext() { heroGoTo(heroCurrent + 1); }

function heroStartAuto() {
  clearInterval(heroTimer);
  heroTimer = setInterval(heroNext, 6000);
}

if (heroSlides.length) {
  renderHeroDots();
  heroStartAuto();
}

// ============ Header shadow on scroll ============
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 12) {
    header.style.boxShadow = '0 6px 20px -10px rgba(92,42,20,0.25)';
  } else {
    header.style.boxShadow = 'none';
  }
});

// ============ Prestasi slider ============
const track = document.getElementById('prestasiTrack');
const slides = track ? Array.from(track.children) : [];
const dotsWrap = document.getElementById('prestasiDots');
const prevBtn = document.getElementById('prestasiPrev');
const nextBtn = document.getElementById('prestasiNext');
let current = 0;
let autoTimer;

function renderDots() {
  dotsWrap.innerHTML = '';
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === current ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
}

function goTo(index) {
  slides[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  renderDots();
}

function nextSlide() { goTo(current + 1); }
function prevSlide() { goTo(current - 1); }

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 5000);
}

if (slides.length) {
  slides[0].classList.add('active');
  renderDots();
  nextBtn.addEventListener('click', () => { nextSlide(); startAuto(); });
  prevBtn.addEventListener('click', () => { prevSlide(); startAuto(); });
  startAuto();
}

// ============ Carousel Pimpinan Lembaga & Guru ============
document.querySelectorAll('.people-arrow').forEach(btn => {
  btn.addEventListener('click', () => {
    const track = document.getElementById(btn.dataset.target);
    if (!track) return;
    const card = track.querySelector('.people-card');
    const step = card ? card.offsetWidth + 22 : 240;
    track.scrollBy({ left: btn.classList.contains('next') ? step : -step, behavior: 'smooth' });
  });
});

// ============ Jenjang tabs ============
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    tabButtons.forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    tabPanels.forEach(panel => {
      panel.classList.toggle('active', panel.dataset.panel === target);
    });
  });
});

// ============ Stat counters (animate once visible) ============
const statNums = document.querySelectorAll('.stat-num');

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNums.forEach(el => statObserver.observe(el));

// ============ Back to top button ============
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 500);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============ Reveal on scroll ============
const revealTargets = document.querySelectorAll(
  '.card, .jenjang-card, .unggulan-item, .berita-card, .ppdb-step, .people-card'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => observer.observe(el));