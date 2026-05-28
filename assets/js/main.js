
const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
if(menuBtn&&navLinks){menuBtn.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',open?'true':'false')});}
const path=(location.pathname.split('/').pop()||'index.html');
document.querySelectorAll('.nav-link').forEach(a=>{if(a.getAttribute('href')===path){a.classList.add('active');}});
document.querySelectorAll('[data-mail-form]').forEach(form=>{form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const body=[`Nombre: ${data.get('nombre')||''}`,`Empresa: ${data.get('empresa')||''}`,`Correo: ${data.get('email')||''}`,`Teléfono: ${data.get('telefono')||''}`,`Interés: ${data.get('interes')||''}`,'',`Mensaje: ${data.get('mensaje')||''}`].join('\n');location.href=`mailto:andrew@tqichile.cl?subject=${encodeURIComponent('Contacto desde sitio TQI Chile')}&body=${encodeURIComponent(body)}`;});});


// Carruseles de placeholders técnicos
document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  const dotsWrap = carousel.querySelector('.carousel-dots');
  const prev = carousel.querySelector('[data-carousel-prev]');
  const next = carousel.querySelector('[data-carousel-next]');
  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));

  if (!slides.length || !dotsWrap || !prev || !next) return;

  const dots = slides.map((_, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ver imagen ${index + 1}`);
    dot.addEventListener('click', () => show(index));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  prev.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  show(current);
});


/* Floating header: opacity bump on scroll */
(function(){
  var header = document.querySelector('.site-header');
  if (!header) return;
  var onScroll = function(){
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Hero dinámico del index: texto fijo, imágenes rotando cada 5 segundos
(function () {
  const hero = document.querySelector('.index-page .hero-dynamic-media');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;

  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
  }

  show(current);
  const timer = window.setInterval(() => show(current + 1), 5000);

  window.__TQI_HERO_ROTATOR__ = {
    active: true,
    slides: slides.length,
    interval: 5000,
    current: () => current,
    stop: () => window.clearInterval(timer)
  };
})();
