(function () {
  const thumbs = document.querySelectorAll('.thumb');
  const box    = document.getElementById('featured-box');
  const img    = document.getElementById('featured-img');
  if (!thumbs.length || !box || !img) return;

  let current = 0; // index of active thumb

  function activate(index) {
    const thumb = thumbs[index];
    const newSrc   = thumb.dataset.src;
    const newRatio = thumb.dataset.ratio;

    thumbs.forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');

    box.classList.remove('is-portrait', 'is-landscape');
    box.classList.add(newRatio === 'landscape' ? 'is-landscape' : 'is-portrait');

    if (img.getAttribute('src') === newSrc) return;
    img.classList.add('is-loading');
    const preload = new Image();
    preload.onload = () => { img.src = newSrc; img.classList.remove('is-loading'); };
    preload.src = newSrc;
  }

  /* ── Hover ── */
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener('mouseenter', () => { current = i; activate(i); });
  });

  /* ── Keyboard: left/right or up/down arrows ── */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      current = Math.min(current + 1, thumbs.length - 1);
      activate(current);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      current = Math.max(current - 1, 0);
      activate(current);
    }
  });
})();
