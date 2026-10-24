/* NEMMO Academy — صفحة الدورات (v2)
   لإضافة دورة مرتقبة: أضف كائناً جديداً إلى PG_COURSES (الاسم، المجال، الوصف، 3 مواضيع، أيقونة، لونان).
   لتغيير رقم الواتساب: عدّل PG_WA. */
(function () {
  'use strict';

  var PG_WA = '9647770300029';

  var PG_CATS = {
    lang:     'لغات',
    biz:      'أعمال وتسويق',
    tech:     'تقنية وذكاء اصطناعي',
    creative: 'تصميم وإبداع',
    life:     'صحة وحياة',
    edu:      'تعليم وتطوير'
  };

  /* i: الأيقونة الرئيسية، i2/i3: أيقونتان صغيرتان على الغلاف، c1/c2: ألوان الغلاف */
  var PG_COURSES = [
    { t: 'إدارة الأعمال وتطوير الشركات', cat: 'biz', i: 'briefcase', i2: 'chart', i3: 'users', c1: '#0F3D6E', c2: '#2A7BC0',
      d: 'الإدارة الحديثة والتخطيط الاستراتيجي وبناء الشركات وإدارة المشاريع بأسلوب عملي.',
      topics: ['القيادة', 'التخطيط الاستراتيجي', 'إدارة المشاريع'] },
    { t: 'كتابة المحتوى التسويقي', cat: 'biz', i: 'pen', i2: 'megaphone', i3: 'bulb', c1: '#6B2A86', c2: '#C0529A',
      d: 'اكتب نصوصاً تقنع وتبيع: من الإعلان القصير إلى استراتيجية المحتوى الكاملة.',
      topics: ['كتابة الإعلانات', 'المحتوى الرقمي', 'صياغة الرسائل'] },
    { t: 'التصميم الجرافيكي', cat: 'creative', i: 'palette', i2: 'pen', i3: 'bulb', c1: '#D8472A', c2: '#F4A460',
      d: 'من الفكرة إلى التصميم الاحترافي: أساسيات الهوية البصرية وتصميم السوشيال ميديا.',
      topics: ['Photoshop', 'Illustrator', 'Canva'] },
    { t: 'البرمجة وتطوير المواقع', cat: 'tech', i: 'code', i2: 'cpu', i3: 'globe', c1: '#0A6F6B', c2: '#2FB5A5',
      d: 'ابنِ موقعك وتطبيقك الأول من الصفر، خطوة بخطوة وبمشاريع حقيقية.',
      topics: ['HTML وCSS', 'JavaScript', 'نشر الموقع'] },
    { t: 'اللغة الإنجليزية للمحادثة', cat: 'lang', i: 'language', i2: 'chat', i3: 'globe', c1: '#2A47A8', c2: '#6F8DF0',
      d: 'محادثة إنجليزية بثقة في الحياة اليومية والعمل والسفر.',
      topics: ['المحادثة اليومية', 'الاستماع', 'الإنجليزية للعمل'] },
    { t: 'اللغة التركية للسياحة والتجارة', cat: 'lang', i: 'globe', i2: 'language', i3: 'chat', c1: '#A91E2E', c2: '#E8606A',
      d: 'التركية من الحروف إلى الحوار، لمن يسافر ويتاجر ويدرس في تركيا.',
      topics: ['الحروف والنطق', 'محادثات السفر', 'التجارة'] },
    { t: 'المحاسبة وإدارة المال', cat: 'biz', i: 'calc', i2: 'coins', i3: 'chart', c1: '#2F6B3F', c2: '#7DBB8B',
      d: 'أساسيات المحاسبة وإدارة المال الشخصي وحسابات المشاريع الصغيرة.',
      topics: ['القيود المحاسبية', 'الميزانية', 'إدارة المصروفات'] },
    { t: 'التصوير والمونتاج', cat: 'creative', i: 'camera', i2: 'film', i3: 'bulb', c1: '#47367A', c2: '#9181CC',
      d: 'صوّر وركّب محتوى مرئياً يلفت الانتباه، بالكاميرا أو بهاتفك.',
      topics: ['التكوين والإضاءة', 'المونتاج', 'تصوير الجوال'] },
    { t: 'مهارات التدريس وبناء الدورات', cat: 'edu', i: 'teach', i2: 'users', i3: 'bulb', c1: '#9A5F0E', c2: '#E5B455',
      d: 'كيف تشرح بوضوح وتصمّم درساً ناجحاً وتبني دورتك المسجّلة أو المباشرة.',
      topics: ['تصميم الدرس', 'أساليب الشرح', 'إدارة الحصة'] },
    { t: 'التغذية ونمط الحياة الصحي', cat: 'life', i: 'leaf', i2: 'heart', i3: 'bulb', c1: '#237A4B', c2: '#A3D86F',
      d: 'ثقافة غذائية وعادات يومية صحية بمعلومات مبسّطة وقابلة للتطبيق.',
      topics: ['التغذية السليمة', 'العادات الصحية', 'الوقاية'] },
    { t: 'الذكاء الاصطناعي لأصحاب الأعمال', cat: 'tech', i: 'cpu', i2: 'bulb', i3: 'chart', c1: '#141C45', c2: '#4656D6',
      d: 'استخدم أدوات الذكاء الاصطناعي لتوفير وقتك وتطوير عملك ومحتواك.',
      topics: ['كتابة الأوامر', 'أتمتة المهام', 'أدوات الإنتاجية'] },
    { t: 'الطبخ وفنون الضيافة', cat: 'life', i: 'utensils', i2: 'heart', i3: 'bulb', c1: '#B1432A', c2: '#F2935C',
      d: 'من أساسيات المطبخ إلى المائدة المميزة، لهواة الطبخ ومن يريد احتراف الضيافة.',
      topics: ['أساسيات الطبخ', 'الحلويات', 'تقديم الأطباق'] }
  ];

  /* ---------- الأيقونات (SVG مضمّنة) ---------- */
  var P = {
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
    pen: '<path d="M12 20h9"/><path d="M16.500 3.500a2.100 2.100 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.100 0 1.600-.8 1.600-1.600 0-.5-.2-.9-.5-1.200-.3-.3-.5-.7-.5-1.200 0-.9.7-1.600 1.600-1.600H16a5 5 0 0 0 5-5c0-4.400-4-7.400-9-7.400z"/><circle cx="7.500" cy="11" r="1"/><circle cx="10.500" cy="7" r="1"/><circle cx="15.500" cy="7.500" r="1"/>',
    code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    language: '<path d="M4 5h9M8.500 3v2M6 5c.5 3.500 3 6.500 6.500 8M12 5c-.6 3.600-3.400 6.800-8 8.500"/><path d="M12 21l4.500-10L21 21M13.500 17.500h6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.500 2.700 3.800 5.700 3.800 9s-1.300 6.300-3.800 9c-2.500-2.700-3.800-5.700-3.800-9S9.500 5.700 12 3z"/>',
    calc: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13" r="3.500"/>',
    teach: '<path d="M3 4h18M5 4v10h14V4M12 14v4M8 21l4-3 4 3"/>',
    leaf: '<path d="M5 19c0-8 5-13 15-14 0 10-5 15-13 15"/><path d="M5 19c2-5 5-8 9-10"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.500" y="9.500" width="5" height="5" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    utensils: '<path d="M5 3v6a3 3 0 0 0 3 3v9M8 3v6M11 3v6a3 3 0 0 1-3 3"/><path d="M17 3c-2 1.500-3 4-3 7v3h3v8"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    wa: '<path d="M20.500 11.500a8.500 8.500 0 0 1-12.600 7.400L3.500 20.500l1.700-4.300a8.500 8.500 0 1 1 15.300-4.700z"/><path d="M9 8.500c.3 3 2.500 5.200 6 6.200l1.200-1.400-2-1-1 .7c-.9-.4-1.700-1.200-2.100-2.100l.8-.9-1-2z"/>',
    arrow: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    megaphone: '<path d="M3 11v3a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1z"/><path d="M15 9a4 4 0 0 1 0 6M18 6.500a8 8 0 0 1 0 11"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.500c.7.7 1 1.500 1 2.500h6c0-1 .3-1.800 1-2.500A6 6 0 0 0 12 3z"/>',
    chart: '<path d="M3 3v18h18M7 15l4-4 3 3 5-6"/>',
    users: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c0-3.600 2.900-6 6.500-6s6.500 2.400 6.500 6M16 4.500a3.500 3.500 0 0 1 0 7M18 14.500c2 .8 3.500 2.600 3.500 5.500"/>',
    coins: '<circle cx="9" cy="9" r="6"/><path d="M15 9.500A6 6 0 1 1 9.500 15M9 6.500v5M7.500 8.500h3"/>',
    film: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    heart: '<path d="M12 20s-7-4.400-7-10a4.200 4.200 0 0 1 7-3 4.200 4.200 0 0 1 7 3c0 5.600-7 10-7 10z"/><path d="M5.500 12H9l1.500-3 2.500 6 1.500-3H18.500"/>',
    chat: '<path d="M21 12a8 8 0 0 1-11.800 7L4 20l1.200-4.200A8 8 0 1 1 21 12z"/><path d="M8.500 11h7M8.500 14.500h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    shield: '<path d="M12 3l8 3v6c0 4.500-3.200 7.800-8 9-4.800-1.200-8-4.500-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    rocket: '<path d="M5 15c-1.500 1.500-2 5-2 5s3.500-.5 5-2M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5z"/><circle cx="15" cy="9" r="1.200"/>'
  };
  function ic(name) {
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + (P[name] || '') + '</svg>';
  }

  function wa(msg) { return 'https://wa.me/' + PG_WA + '?text=' + encodeURIComponent(msg); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- العدّادات الأولية ---------- */
  var catKeys = Object.keys(PG_CATS);
  function setCount(id, n) { var e = document.getElementById(id); if (e) { e.setAttribute('data-count', n); e.textContent = n; } }
  setCount('pgNAvail', 1);
  setCount('pgNSoon', PG_COURSES.length);
  setCount('pgNCats', catKeys.length + 1);

  /* ---------- أيقونات الهيدر العائمة ---------- */
  var floats = [
    { i: 'briefcase', x: '5%',  y: '16%', s: 82, a: '#0F3D6E', b: '#2A7BC0', k: 20,  dl: '.6s' },
    { i: 'palette',   x: '15%', y: '56%', s: 64, a: '#D8472A', b: '#F4A460', k: -26, dl: '.8s', inn: 1 },
    { i: 'code',      x: '4%',  y: '66%', s: 56, a: '#0A6F6B', b: '#2FB5A5', k: 14,  dl: '1s' },
    { i: 'language',  x: '84%', y: '14%', s: 74, a: '#2A47A8', b: '#6F8DF0', k: -18, dl: '.7s' },
    { i: 'camera',    x: '78%', y: '58%', s: 66, a: '#47367A', b: '#9181CC', k: 24,  dl: '.9s', inn: 1 },
    { i: 'leaf',      x: '91%', y: '62%', s: 58, a: '#237A4B', b: '#A3D86F', k: -12, dl: '1.1s' },
    { i: 'cpu',       x: '17%', y: '10%', s: 50, a: '#141C45', b: '#4656D6', k: 28,  dl: '1.2s', inn: 1 },
    { i: 'teach',     x: '72%', y: '8%',  s: 52, a: '#9A5F0E', b: '#E5B455', k: -22, dl: '1.3s', inn: 1 }
  ];
  var fl = $('#pgFloats');
  if (fl) fl.innerHTML = floats.map(function (f) {
    return '<span class="pg-float' + (f.inn ? ' pg-float--in' : '') + '" style="--x:' + f.x + ';--y:' + f.y + ';--s:' + f.s + 'px;--a:' + f.a + ';--b:' + f.b + ';--k:' + f.k + ';--dl:' + f.dl + '"><span class="pg-float__hex">' + ic(f.i) + '</span></span>';
  }).join('');

  /* ---------- الشريط المتحرك ---------- */
  var rib = [['briefcase', 'إدارة الأعمال'], ['language', 'اللغات'], ['palette', 'التصميم'], ['code', 'البرمجة'], ['pen', 'كتابة المحتوى'], ['camera', 'التصوير'], ['cpu', 'الذكاء الاصطناعي'], ['teach', 'التدريس'], ['leaf', 'الصحة'], ['utensils', 'الطبخ'], ['calc', 'المحاسبة']];
  var rbHtml = rib.map(function (r) { return '<span class="pg-rb">' + ic(r[0]) + r[1] + '</span>'; }).join('');
  var tr = $('#pgTrack'); if (tr) tr.innerHTML = rbHtml + rbHtml;

  /* ---------- الفلاتر والبطاقات ---------- */
  var filtersEl = $('#pgFilters'), gridEl = $('#pgGrid');
  var current = 'all';
  function count(cat) { return cat === 'all' ? PG_COURSES.length : PG_COURSES.filter(function (c) { return c.cat === cat; }).length; }
  if (filtersEl) {
    filtersEl.innerHTML = [['all', 'الكل']].concat(catKeys.map(function (k) { return [k, PG_CATS[k]]; })).map(function (p) {
      return '<button type="button" class="pg-fchip" data-cat="' + p[0] + '" aria-pressed="' + (p[0] === 'all') + '">' + p[1] + '<em>' + count(p[0]) + '</em></button>';
    }).join('');
  }
  if (gridEl) {
    gridEl.innerHTML = PG_COURSES.map(function (c, n) {
      var msg = 'السلام عليكم، أرغب بالإشعار عند إطلاق دورة (' + c.t + ') في أكاديمية نمو';
      return '<div class="pg-cell pg-reveal pg-reveal--scale" data-cat="' + c.cat + '" style="--d:' + ((n % 4) * 0.08).toFixed(2) + 's">' +
        '<article class="pg-card" style="--c1:' + c.c1 + ';--c2:' + c.c2 + '">' +
        '<div class="pg-cover">' +
          '<span class="pg-cover__mark">' + ic(c.i) + '</span>' +
          '<span class="pg-cover__hex">' + ic(c.i) + '</span>' +
          '<span class="pg-orbit-i pg-orbit-i--1">' + ic(c.i2) + '</span>' +
          '<span class="pg-orbit-i pg-orbit-i--2">' + ic(c.i3) + '</span>' +
          '<span class="pg-soon"><i></i>قريباً</span>' +
        '</div>' +
        '<div class="pg-card__body">' +
          '<span class="pg-cat">' + PG_CATS[c.cat] + '</span>' +
          '<h3>' + c.t + '</h3>' +
          '<p>' + c.d + '</p>' +
          '<ul class="pg-topics">' + c.topics.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' +
          '<div class="pg-card__foot"><a class="pg-btn pg-btn--line pg-btn--sm" href="' + wa(msg) + '" target="_blank" rel="noopener noreferrer">' + ic('bell') + '<span>أخبرني عند الإطلاق</span></a></div>' +
        '</div></article></div>';
    }).join('');
  }

  var cells = $$('.pg-cell');
  function applyFilter(cat) {
    if (cat === current) return;
    current = cat;
    $$('.pg-fchip').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-cat') === cat)); });
    var show = [];
    cells.forEach(function (c) {
      var ok = cat === 'all' || c.getAttribute('data-cat') === cat;
      if (ok) show.push(c);
      else { c.classList.add('is-out'); }
    });
    setTimeout(function () {
      cells.forEach(function (c) {
        var ok = cat === 'all' || c.getAttribute('data-cat') === cat;
        c.hidden = !ok;
      });
      show.forEach(function (c, n) {
        c.classList.add('is-out'); c.classList.add('is-in');
        c.style.setProperty('--d', (n * 0.06).toFixed(2) + 's');
      });
      void gridEl.offsetWidth;
      show.forEach(function (c) { c.classList.remove('is-out'); });
    }, reduce ? 0 : 260);
  }
  if (filtersEl) filtersEl.addEventListener('click', function (e) {
    var b = e.target.closest('.pg-fchip'); if (b) applyFilter(b.getAttribute('data-cat'));
  });

  /* ---------- دورة مقترحة + قسم الأساتذة ---------- */
  var sg = $('#pgSuggest'); if (sg) sg.href = wa('السلام عليكم، أقترح إضافة دورة في أكاديمية نمو: ');
  var tb = $('#pgTeachBtn'); if (tb) tb.href = wa('السلام عليكم، أنا مدرّس وأرغب بعرض دورتي في منصة أكاديمية نمو');

  var orbitItems = [['briefcase', '#0F3D6E', '#2A7BC0'], ['code', '#0A6F6B', '#2FB5A5'], ['palette', '#D8472A', '#F4A460'], ['language', '#2A47A8', '#6F8DF0'], ['camera', '#47367A', '#9181CC'], ['teach', '#9A5F0E', '#E5B455'], ['heart', '#237A4B', '#A3D86F'], ['utensils', '#B1432A', '#F2935C']];
  var ob = $('#pgOrbitRing');
  if (ob) ob.innerHTML = orbitItems.map(function (o, n) {
    return '<span class="pg-orbit__item" style="--a:' + (n * 45) + 'deg;--c1:' + o[1] + ';--c2:' + o[2] + '"><span>' + ic(o[0]) + '</span></span>';
  }).join('');

  /* ---------- أيقونات ثابتة في الـ HTML ---------- */
  $$('[data-ic]').forEach(function (el) { el.insertAdjacentHTML('afterbegin', ic(el.getAttribute('data-ic'))); });
  $$('[data-ic-end]').forEach(function (el) { el.insertAdjacentHTML('beforeend', ic(el.getAttribute('data-ic-end'))); });

  /* ---------- كشف عند التمرير ---------- */
  var revealEls = $$('.pg-reveal, .pg-close');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else revealEls.forEach(function (el) { el.classList.add('is-in'); });

  /* ---------- العدّادات ---------- */
  function runCount(el) {
    var to = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduce) { el.textContent = to; return; }
    var t0 = null, dur = 1400;
    el.textContent = '0';
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var co = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); } });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach(function (el) { co.observe(el); });
  }

  /* ---------- لون الموجة ---------- */
  var hero = $('#pgHero');
  function paintWave() {
    if (!hero) return;
    var n = hero.nextElementSibling, c = '';
    if (n) c = getComputedStyle(n).backgroundColor;
    if (!c || c === 'transparent' || c === 'rgba(0, 0, 0, 0)') c = getComputedStyle(document.body).backgroundColor;
    hero.style.setProperty('--pg-next', c);
  }
  paintWave();
  window.addEventListener('load', paintWave);
  new MutationObserver(function () { setTimeout(paintWave, 60); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  if (reduce || !fine) return;

  /* ---------- تتبّع المؤشر في الهيدر ---------- */
  if (hero) {
    var raf = 0, tx = 0, ty = 0;
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5; ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(function () { raf = 0; hero.style.setProperty('--mx', tx.toFixed(3)); hero.style.setProperty('--my', ty.toFixed(3)); });
    });
    hero.addEventListener('pointerleave', function () { hero.style.setProperty('--mx', 0); hero.style.setProperty('--my', 0); });
  }

  /* ---------- ميلان البطاقات + لمعة تتبع المؤشر ---------- */
  document.addEventListener('pointermove', function (e) {
    var card = e.target.closest && e.target.closest('.pg-card');
    if (!card) return;
    var r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    card.style.setProperty('--ry', ((x - 0.5) * -9).toFixed(2) + 'deg');
    card.style.setProperty('--rx', ((y - 0.5) * 9).toFixed(2) + 'deg');
    card.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
    card.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
  });
  document.addEventListener('pointerout', function (e) {
    var card = e.target.closest && e.target.closest('.pg-card');
    if (card && !card.contains(e.relatedTarget)) { card.style.setProperty('--rx', '0deg'); card.style.setProperty('--ry', '0deg'); }
  });

  /* ---------- أزرار مغناطيسية خفيفة ---------- */
  $$('.pg-btn--gold').forEach(function (b) {
    b.addEventListener('pointermove', function (e) {
      var r = b.getBoundingClientRect();
      b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.25 - 3).toFixed(1) + 'px)';
    });
    b.addEventListener('pointerleave', function () { b.style.transform = ''; });
  });
})();
