/* ============================================
   LA VANGUARDIA NACIONAL — JS
   ============================================ */

// ── FECHA ACTUAL ──
function setCurrentDate() {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = now.toLocaleDateString('es-CO', options);
  
  const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);
  
  const el = document.getElementById('current-date');
  if (el) el.textContent = capitalize(dateStr);

  const shortOpts = { day: '2-digit', month: 'short', year: 'numeric' };
  const short = now.toLocaleDateString('es-CO', shortOpts);
  
  ['report-date','report-date-2','report-date-3','report-date-4'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = short;
  });
}

setCurrentDate();

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger?.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close nav on link click
navMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ── ACTIVE NAV LINK on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
}

window.addEventListener('scroll', updateActiveLink);

// ── POLL ──
function vote(btn, percent) {
  const result = document.getElementById('poll-result');
  const options = document.querySelector('.poll-options');
  if (!result || !options) return;

  const other = 100 - percent;
  const isSi = percent > 50;

  options.style.display = 'none';
  result.style.display = 'block';
  result.innerHTML = `
    <strong>Gracias por votar</strong><br>
    Sí la apoyo: <strong style="color:${isSi?'#1a7a3f':'var(--red)'}">${isSi ? percent : other}%</strong><br>
    No la apoyo: <strong style="color:${isSi?'var(--red)':'#1a7a3f'}">${isSi ? other : percent}%</strong><br>
    <em style="font-size:11px">Basado en ${(Math.floor(Math.random()*8000)+12000).toLocaleString()} votos</em>
  `;
}

// ── NEWSLETTER ──
function subscribeNewsletter(event) {
  event.preventDefault();
  const success = document.getElementById('nl-success');
  event.target.style.display = 'none';
  if (success) success.style.display = 'block';
}

// ── CONTACT FORM ──
function sendMessage(event) {
  event.preventDefault();
  const success = document.getElementById('form-success');
  const btn = event.target.querySelector('.submit-btn');
  if (btn) {
    btn.textContent = 'Enviando…';
    btn.disabled = true;
  }
  setTimeout(() => {
    if (success) success.style.display = 'block';
    if (btn) { btn.textContent = 'Enviado ✓'; }
  }, 900);
}

// ── SEARCH ──
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn?.addEventListener('click', () => {
  const q = searchInput?.value.trim();
  if (q) {
    alert(`Buscando: "${q}"\n\n(Función de búsqueda en desarrollo)`);
    searchInput.value = '';
  }
});

searchInput?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchBtn?.click();
});

// ── SCROLL REVEAL (intersection observer) ──
const observerOptions = { threshold: 0.12 };

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.news-card, .tech-card, .report-card, .opinion-card, .list-article').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  observer.observe(el);
});

// ── CLOCK en tiempo real ──
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');
  
  // Si hubiera un elemento de reloj en el header
  const clock = document.getElementById('live-clock');
  if (clock) clock.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

// ── Smooth scroll para nav ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

console.log('%c📰 La Vanguardia Nacional', 'font-size:18px;font-weight:bold;color:#c0392b;');
console.log('%cPeriodismo independiente desde 1948.', 'font-size:12px;color:#7a6e5a;');
