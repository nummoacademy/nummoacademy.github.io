/* NEMMO Academy — حركة هيدر صفحة الفارسية (عدّادات + تتبّع المؤشر + لون الموجة) */
(function () {
  'use strict';
  var hero = document.querySelector('.pz-hero');
  if (!hero) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* لون الموجة = لون القسم التالي (يتبدّل مع الوضع الليلي) */
  function paintWave() {
    var n = hero.nextElementSibling, c = '';
    if (n) c = getComputedStyle(n).backgroundColor;
    if (!c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)') c = getComputedStyle(document.body).backgroundColor;
    hero.style.setProperty('--pz-next', c);
  }
  paintWave();
  window.addEventListener('load', paintWave);
  new MutationObserver(function () { setTimeout(paintWave, 60); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* عدّادات الأرقام */
  var nums = hero.querySelectorAll('[data-count]');
  nums.forEach(function (el) {
    var to = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce) { el.textContent = to; return; }
    var t0 = null, dur = 1500;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    setTimeout(function () { requestAnimationFrame(step); }, 700);
  });

  if (reduce) return;

  /* تتبّع المؤشر (للحاسوب فقط) */
  var vis = hero.querySelector('.pz-visual');
  if (vis && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var raf = 0, tx = 0, ty = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(function () {
        raf = 0; vis.style.setProperty('--mx', tx.toFixed(3)); vis.style.setProperty('--my', ty.toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', function () { vis.style.setProperty('--mx', 0); vis.style.setProperty('--my', 0); });
  }

  /* انزياح خفيف مع التمرير */
  if (vis) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY || 0;
        if (y < 900) vis.style.setProperty('--sy', y);
      });
    }, { passive: true });
  }
})();
