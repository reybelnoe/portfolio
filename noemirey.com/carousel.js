/* Carrusel de la tira final (móvil): las flechas desplazan de foto en foto.
   Las fotos se centran gracias a scroll-snap (ver style.css). */
(function () {
  const strip = document.querySelector('.wh-strip');
  const prev = document.querySelector('.wh-strip__arrow--prev');
  const next = document.querySelector('.wh-strip__arrow--next');
  if (!strip || !prev || !next) return;

  const items = Array.from(strip.querySelectorAll('.wh-strip__item'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function centers() {
    const base = strip.getBoundingClientRect().left;
    return items.map(el => {
      const b = el.getBoundingClientRect();
      return b.left - base + strip.scrollLeft + b.width / 2;
    });
  }

  function currentIndex() {
    const mid = strip.scrollLeft + strip.clientWidth / 2;
    const c = centers();
    let best = 0;
    c.forEach((x, i) => { if (Math.abs(x - mid) < Math.abs(c[best] - mid)) best = i; });
    return best;
  }

  function go(step) {
    const i = Math.min(items.length - 1, Math.max(0, currentIndex() + step));
    strip.scrollTo({
      left: centers()[i] - strip.clientWidth / 2,
      behavior: reduceMotion ? 'auto' : 'smooth'
    });
  }

  function update() {
    const max = strip.scrollWidth - strip.clientWidth;
    prev.hidden = strip.scrollLeft <= 2;
    next.hidden = strip.scrollLeft >= max - 2;
  }

  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  strip.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
