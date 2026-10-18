# أكاديمية نمو — NEMMO Academy

موقع ثابت (GitHub Pages) بدون خطوات بناء.

## هيكل الملفات

```
index.html                  الصفحة الرئيسية
programs.html               قائمة البرامج
programs/persian/index.html صفحة برنامج اللغة الفارسية
player/index.html           صفحة مشغّل الدرس
assets/
  css/
    base/        variables.css (المتغيرات) · main.css (التصفير والأساس)
    core/        layout.css (الهيدر/الفوتر) · components.css (المكوّنات)
    pages/       home.css · programs.css · persian.css · persian-lessons.css
    responsive/  mobile-fix.css · phone-fix.css · persian-override.css · mobile-fixes.css
  js/            main.js (كل التفاعلات) · player.js (مشغّل الدرس)
  images/        الصور (والمجلد _unused فيه صور غير مستخدمة حاليًا)
  media/         lesson-01-sample.wav (صوت تجريبي)
.nojekyll
```

## ترتيب تحميل ملفات CSS (مهم)
الترتيب في كل صفحة هو نفسه ترتيب الشلال (cascade) ولا يجوز تغييره:
`variables` ← `mobile-fix` ← `phone-fix` ← `persian-override` ← `layout` ← `components` ← `main` ← (ملف الصفحة) ← `mobile-fixes` ← (`persian-lessons` في صفحة الفارسية فقط).

## إضافة فيديو الدرس في المشغّل
في `player/index.html` ضع رابط الفيديو في الخاصية `data-video-src` على العنصر `.video-stage`:
ملف مباشر (`.mp4`) أو يوتيوب أو فيميو أو أي رابط تضمين.
