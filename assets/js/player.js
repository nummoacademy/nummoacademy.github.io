/* NEMMO Academy — lesson player (player/index.html)
   Set the lesson video on the stage element:
     <div class="video-stage" data-video-src="https://.../lesson-01.mp4">
   Supported: direct files (.mp4 / .webm / .ogg), YouTube, Vimeo, or any
   embeddable page URL (Facebook / Instagram plugin links, etc.).
   Leave data-video-src empty and the stage shows a "coming soon" message. */
(function () {
    'use strict';

    function embedUrl(src) {
        var m = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1] + '?autoplay=1&rel=0';
        m = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (m) return 'https://player.vimeo.com/video/' + m[1] + '?autoplay=1';
        return src;
    }

    document.addEventListener('DOMContentLoaded', function () {
        var stage = document.querySelector('.video-stage[data-video-src]');
        var btn = document.querySelector('[data-video-play]');
        var text = document.querySelector('.video-stage__text');
        var title = document.querySelector('.video-stage__title');
        if (!stage || !btn) return;

        btn.addEventListener('click', function () {
            var src = (stage.getAttribute('data-video-src') || '').trim();
            if (!src) {
                if (title) title.textContent = 'الفيديو غير متوفر بعد';
                if (text) text.textContent = 'لم يتم رفع فيديو هذا الدرس حتى الآن. سيظهر هنا فور إضافته.';
                return;
            }
            var el;
            if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(src)) {
                el = document.createElement('video');
                el.controls = true;
                el.autoplay = true;
                el.playsInline = true;
                el.preload = 'metadata';
                el.setAttribute('controlsList', 'nodownload');
                el.src = src;
            } else {
                el = document.createElement('iframe');
                el.src = embedUrl(src);
                el.title = 'فيديو الدرس';
                el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
                el.allowFullscreen = true;
                el.referrerPolicy = 'strict-origin-when-cross-origin';
            }
            el.className = 'video-stage__media';
            stage.innerHTML = '';
            stage.appendChild(el);
        });
    });
})();
