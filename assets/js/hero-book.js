/* الكتاب التفاعلي: يقلّب صفحاته تلقائياً مع إيقاف وتنقّل يدوي */
(function () {
  var book = document.getElementById('nmBook');
  if (!book) return;
  var leaves = book.querySelectorAll('.nm-leaf');
  var total = leaves.length, flipped = 0, playing = true, timer = null;
  var label = document.getElementById('nmBookCount');
  var playBtn = document.getElementById('nmBookPlay');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) { playing = false; playBtn.textContent = 'تشغيل التقليب'; }

  function render() {
    leaves.forEach(function (l, i) {
      var f = i < flipped;
      l.style.transform = f ? 'rotateY(-180deg)' : 'rotateY(0deg)';
      l.style.zIndex = f ? i + 1 : total - i;
    });
    book.style.transform = flipped === 0 ? 'translateX(-160px)' : (flipped === total ? 'translateX(160px)' : 'translateX(0)');
    label.textContent = (flipped + 1) + ' / ' + (total + 1);
  }
  function go(d) { flipped += d; if (flipped > total) flipped = 0; if (flipped < 0) flipped = total; render(); }
  function start() { clearInterval(timer); timer = setInterval(function () { if (playing && !document.hidden) go(1); }, 3200); }

  document.getElementById('nmBookNext').addEventListener('click', function () { go(1); });
  document.getElementById('nmBookPrev').addEventListener('click', function () { go(-1); });
  playBtn.addEventListener('click', function () {
    playing = !playing;
    playBtn.textContent = playing ? 'إيقاف التقليب' : 'تشغيل التقليب';
  });
  render(); start();
})();
