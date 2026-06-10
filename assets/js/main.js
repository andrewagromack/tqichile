
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
// Optimizado para LCP: la primera imagen carga de inmediato; las demás se hidratan en idle/post-load.
(function () {
  const hero = document.querySelector('.index-page .hero-dynamic-media');
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll('.hero-slide'));
  if (slides.length < 2) return;

  let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let timer = null;

  function hydrateDeferredSlides() {
    slides.forEach((slide) => {
      if (slide.dataset.srcset && !slide.getAttribute('srcset')) slide.setAttribute('srcset', slide.dataset.srcset);
      if (slide.dataset.src && !slide.getAttribute('src')) slide.setAttribute('src', slide.dataset.src);
    });
  }

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
  }

  function startRotator() {
    if (timer) return;
    hydrateDeferredSlides();
    show(current);
    timer = window.setInterval(() => show(current + 1), 5000);
  }

  const idle = window.requestIdleCallback || function (cb) { return window.setTimeout(cb, 900); };
  if (document.readyState === 'complete') idle(startRotator, { timeout: 1800 });
  else window.addEventListener('load', () => idle(startRotator, { timeout: 1800 }), { once: true });

  window.__TQI_HERO_ROTATOR__ = {
    active: true,
    slides: slides.length,
    interval: 5000,
    current: () => current,
    start: startRotator,
    stop: () => { if (timer) window.clearInterval(timer); timer = null; }
  };
})();

// Product nav active state
(function(){
  var links = document.querySelectorAll('.prod-nav-link');
  if(!links.length) return;
  var sections = Array.from(links).map(function(l){ return document.querySelector(l.getAttribute('href')); });
  function update(){
    var scrollY = window.scrollY + 180;
    var active = null;
    sections.forEach(function(s,i){ if(s && s.offsetTop <= scrollY) active = i; });
    links.forEach(function(l,i){ l.classList.toggle('is-active', i === active); });
  }
  window.addEventListener('scroll', update, {passive:true});
  update();
})();


// Tracking diferido: evita que Analytics y Meta Pixel compitan con el primer render/LCP en mobile.
(function () {
  const GA_ID = 'G-RV6DV8XP24';
  const META_PIXEL_ID = '3374175949411724';
  let gaLoaded = false;
  let metaLoaded = false;

  function appendScript(src) {
    const script = document.createElement('script');
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
    return script;
  }

  function loadGA() {
    if (gaLoaded) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    appendScript('https://www.googletagmanager.com/gtag/js?id=' + GA_ID);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
  }

  function loadMetaPixel() {
    if (metaLoaded) return;
    metaLoaded = true;
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function scheduleTracking() {
    window.setTimeout(loadGA, 1200);
    window.setTimeout(loadMetaPixel, 2200);
  }

  if (document.readyState === 'complete') scheduleTracking();
  else window.addEventListener('load', scheduleTracking, { once: true });
})();
