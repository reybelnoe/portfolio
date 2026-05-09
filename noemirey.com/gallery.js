(function () {
  const gallery = document.querySelector('.index-gallery');
  const bleed   = document.querySelector('.obra--bleed');
  const xxl     = document.querySelector('.obra__xxl');
  if (!gallery || !bleed || !xxl) return;

  /* ── Snap toggle for bleed section ── */
  let snapOff = false;

  gallery.addEventListener('scroll', () => {
    const scrollTop = gallery.scrollTop;
    const vp        = gallery.clientHeight;
    const topPad    = parseFloat(getComputedStyle(bleed).paddingTop);
    const sectionTop    = bleed.offsetTop;
    const imgTop        = sectionTop + topPad;
    const imgBottom     = imgTop + xxl.offsetHeight;
    const sectionBottom = bleed.offsetTop + bleed.offsetHeight;
    const bottomPad     = sectionBottom - imgBottom;
    const triggerOn     = sectionTop  + topPad    / 2 - vp / 2;
    const triggerOff    = imgBottom   + bottomPad / 2 - vp / 2;

    if (!snapOff && scrollTop >= triggerOn) {
      gallery.classList.add('snap-off');
      snapOff = true;
    } else if (snapOff && (scrollTop >= triggerOff || scrollTop < triggerOn)) {
      gallery.classList.remove('snap-off');
      snapOff = false;
    }
  }, { passive: true });

  /* ── Keyboard navigation: arrows scroll between obras ── */
  const obras = Array.from(document.querySelectorAll('.obra'));

  document.addEventListener('keydown', e => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();

    // Find which obra is currently most centered in the viewport
    const vp = gallery.clientHeight;
    const center = gallery.scrollTop + vp / 2;
    let current = 0;
    let minDist = Infinity;
    obras.forEach((obra, i) => {
      const obraCenter = obra.offsetTop + obra.offsetHeight / 2;
      const dist = Math.abs(obraCenter - center);
      if (dist < minDist) { minDist = dist; current = i; }
    });

    const next = e.key === 'ArrowDown'
      ? Math.min(current + 1, obras.length - 1)
      : Math.max(current - 1, 0);

    if (next === current) return;

    const target = obras[next];
    // Scroll so the obra center aligns with viewport center
    gallery.scrollTo({
      top: target.offsetTop + target.offsetHeight / 2 - vp / 2,
      behavior: 'smooth'
    });
  });
})();
