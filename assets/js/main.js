/* ========================================================================== 
   NEMMO Academy — Main JavaScript (Modular Production v3.8)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    let lastActiveElement = null;
    const WHATSAPP_NUMBER = '9647770300029';

    const currentYearSpan = document.querySelector('[data-current-year]');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ------------------------------
       Theme toggle
    ------------------------------ */
    const themeToggleBtn = document.getElementById('themeToggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (moonIcon && sunIcon) {
            moonIcon.style.display = theme === 'dark' ? 'none' : 'inline-block';
            sunIcon.style.display = theme === 'dark' ? 'inline-block' : 'none';
        }
    }

    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function () {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    /* ------------------------------
       Navigation drawer
    ------------------------------ */
    const siteHeader = document.querySelector('.site-header');
    let siteNav = document.getElementById('siteNav');
    let mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (!siteNav) {
        siteNav = document.querySelector('.site-nav');
        if (siteNav && !siteNav.id) siteNav.id = 'siteNav';
    }

    if (siteHeader && siteNav && !mobileMenuBtn) {
        const headerActions = siteHeader.querySelector('.site-header__actions');
        if (headerActions) {
            mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.id = 'mobileMenuBtn';
            mobileMenuBtn.type = 'button';
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.setAttribute('aria-label', 'فتح القائمة');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.innerHTML = '<span class="hamburger-bar"></span><span class="hamburger-bar"></span><span class="hamburger-bar"></span>';
            headerActions.appendChild(mobileMenuBtn);
        }
    }

    if (siteNav && !siteNav.hasAttribute('aria-hidden')) {
        siteNav.setAttribute('aria-hidden', 'true');
    }

    function closeMobileNav() {
        if (!siteNav || !siteNav.classList.contains('is-open')) return;
        siteNav.classList.remove('is-open');
        siteNav.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('is-nav-open');
        if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('is-active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    }

    if (siteNav && document.body.classList.contains('page-home') && !siteNav.querySelector('.site-nav__cta')) {
        const navList = siteNav.querySelector('ul');
        if (navList) {
            const ctaItem = document.createElement('li');
            ctaItem.className = 'site-nav__cta';
            ctaItem.innerHTML = "<button type='button' class='btn btn-hero-gold js-open-registration' data-program='عام - أكاديمية نُمو'><i class='fa-solid fa-user-plus'></i><span>اشترك الآن</span></button>";
            navList.appendChild(ctaItem);
        }
    }

    if (mobileMenuBtn && siteNav) {
        mobileMenuBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = siteNav.classList.toggle('is-open');
            siteNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
            mobileMenuBtn.classList.toggle('is-active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('is-nav-open', isOpen);
        });

        siteNav.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        siteNav.querySelectorAll('a, button').forEach(link => {
            link.addEventListener('click', closeMobileNav);
        });

        document.addEventListener('click', function (e) {
            if (!siteNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileNav();
            }
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 991) closeMobileNav();
        }, { passive: true });
    }

    /* ------------------------------
       Header scrolled state
    ------------------------------ */
    let isScrolling = false;
    window.addEventListener('scroll', function () {
        if (isScrolling) return;

        window.requestAnimationFrame(function () {
            if (siteHeader) {
                siteHeader.classList.toggle('site-header--scrolled', window.scrollY > 20);
            }
            isScrolling = false;
        });

        isScrolling = true;
    }, { passive: true });

    /* ------------------------------
       Smooth anchor links
    ------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ------------------------------
       Testimonials slider (home)
    ------------------------------ */
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevReviewBtn = document.getElementById('prevReviewBtn');
    const nextReviewBtn = document.getElementById('nextReviewBtn');
    let currentReviewIndex = 0;

    function showReview(index) {
        if (!testimonialSlides.length) return;
        testimonialSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    }

    if (testimonialSlides.length) showReview(currentReviewIndex);

    if (prevReviewBtn && nextReviewBtn && testimonialSlides.length) {
        prevReviewBtn.addEventListener('click', () => {
            currentReviewIndex = currentReviewIndex === 0 ? testimonialSlides.length - 1 : currentReviewIndex - 1;
            showReview(currentReviewIndex);
        });

        nextReviewBtn.addEventListener('click', () => {
            currentReviewIndex = currentReviewIndex === testimonialSlides.length - 1 ? 0 : currentReviewIndex + 1;
            showReview(currentReviewIndex);
        });
    }

    /* ------------------------------
       Registration modal
    ------------------------------ */
    const registrationModal = document.getElementById('registrationModal');
    const form = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('registrationError');
    const programSelect = document.getElementById('registrationProgram');
    const trackGroup = document.getElementById('trackGroup');
    const trackSelect = document.getElementById('registrationTrack');

    const openRegistrationBtns = document.querySelectorAll('.js-open-registration, .js-open-modal, [data-registration-open]');
    const closeRegistrationBtns = document.querySelectorAll('.js-close-registration, [data-modal-close]');

    function handleProgramChange() {
        if (!programSelect || !trackGroup) return;

        if (programSelect.value === 'برنامج اللغة الفارسية') {
            trackGroup.classList.remove('is-hidden');
            if (trackSelect) trackSelect.required = true;
        } else {
            trackGroup.classList.add('is-hidden');
            if (trackSelect) {
                trackSelect.required = false;
                trackSelect.value = '';
            }
        }
    }

    if (programSelect) {
        programSelect.addEventListener('change', handleProgramChange);
    }

    function handleModalKeyDown(e) {
        if (!registrationModal || !registrationModal.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeRegistrationModal();
            closeMobileNav();
            return;
        }

        if (e.key !== 'Tab') return;

        const focusableElements = registrationModal.querySelectorAll('button, [href], input:not([type=hidden]), select, textarea, [tabindex]:not([tabindex="-1"])');
        if (!focusableElements.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }

    function openRegistrationModal(programName = '', trackName = '', triggerElement = null) {
        if (!registrationModal) return;
        lastActiveElement = triggerElement || document.activeElement;

        if (form) form.reset();
        if (errorMsg) {
            errorMsg.textContent = '';
            errorMsg.style.display = 'none';
        }

        registrationModal.classList.add('is-open');
        registrationModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (programSelect && programName) {
            for (const option of programSelect.options) {
                if (option.value === programName || option.text === programName) {
                    option.selected = true;
                    break;
                }
            }
        }

        handleProgramChange();

        if (trackSelect && trackName) {
            for (const option of trackSelect.options) {
                if (option.value === trackName || (option.text || '').includes(trackName)) {
                    option.selected = true;
                    break;
                }
            }
        }

        document.addEventListener('keydown', handleModalKeyDown);

        setTimeout(() => {
            const firstInput = registrationModal.querySelector('input:not([type=hidden]), select, textarea, button');
            if (firstInput && typeof firstInput.focus === 'function') {
                firstInput.focus();
            }
        }, 80);
    }

    function closeRegistrationModal() {
        if (!registrationModal) return;

        registrationModal.classList.remove('is-open');
        registrationModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleModalKeyDown);

        if (form) form.reset();
        handleProgramChange();

        if (errorMsg) {
            errorMsg.textContent = '';
            errorMsg.style.display = 'none';
        }

        if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
            lastActiveElement.focus();
        }
    }

    openRegistrationBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const program = this.getAttribute('data-program') || this.dataset.program || '';
            const track = this.getAttribute('data-track') || this.dataset.track || '';
            openRegistrationModal(program, track, this);
        });
    });

    closeRegistrationBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            closeRegistrationModal();
        });
    });

    if (registrationModal) {
        registrationModal.addEventListener('click', function (e) {
            if (e.target === registrationModal || e.target.classList.contains('registration-modal__overlay')) {
                closeRegistrationModal();
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('registrationName');
            const phoneInput = document.getElementById('registrationPhone');
            const governorateSelect = document.getElementById('registrationGovernorate');
            const addressInput = document.getElementById('registrationAddress');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const governorate = governorateSelect ? governorateSelect.value.trim() : '';
            const address = addressInput ? addressInput.value.trim() : '';
            const program = programSelect ? (programSelect.options[programSelect.selectedIndex]?.text || programSelect.value) : '';
            const track = (trackSelect && !trackGroup?.classList.contains('is-hidden')) ? trackSelect.value.trim() : 'عام';

            if (!name || !phone || !governorate || !address || !program || (!trackGroup?.classList.contains('is-hidden') && !track)) {
                if (errorMsg) {
                    errorMsg.textContent = 'يرجى ملء كافة الحقول واختيار المسار المطلوب.';
                    errorMsg.style.display = 'block';
                }
                return;
            }

            const iraqiPhoneRegex = /^07\d{9}$/;
            if (!iraqiPhoneRegex.test(phone.replace(/\s+/g, ''))) {
                if (errorMsg) {
                    errorMsg.textContent = 'يرجى إدخال رقم هاتف عراقي صحيح مكون من 11 رقماً يبدأ بـ 07 (مثال: 07700000000).';
                    errorMsg.style.display = 'block';
                }
                if (phoneInput && typeof phoneInput.focus === 'function') phoneInput.focus();
                return;
            }

            if (errorMsg) {
                errorMsg.textContent = '';
                errorMsg.style.display = 'none';
            }

            const now = new Date();
            const timeString = now.toLocaleString('ar-IQ', { dateStyle: 'short', timeStyle: 'short' });
            const userDevice = /Android/i.test(navigator.userAgent) ? 'Android' : /iPhone|iPad/i.test(navigator.userAgent) ? 'iOS' : 'Desktop';

            let whatsappMessage = `طلب تسجيل جديد - NEMMO Academy 🎓\n` +
                                  `⏰ وقت الطلب: ${timeString} (${userDevice})\n` +
                                  `━━━━━━━━━━━━━━━━━━\n` +
                                  `👤 الاسم: ${name}\n` +
                                  `📞 الهاتف: ${phone}\n` +
                                  `📍 المحافظة: ${governorate}\n` +
                                  `🏠 العنوان: ${address}\n` +
                                  `📚 البرنامج: ${program}\n`;

            if (track && track !== 'عام') {
                whatsappMessage += `🎯 المسار: ${track}\n`;
            }

            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            form.reset();
            handleProgramChange();
            closeRegistrationModal();
        });
    }

    /* ------------------------------
       Persian package details modal
    ------------------------------ */
    const pkgModal = document.getElementById('packageDetailsModal');
    const openPkgBtns = document.querySelectorAll('.js-open-pkg-modal');
    const closePkgBtns = document.querySelectorAll('.js-close-pkg-modal');
    const modalTitle = document.getElementById('packageDetailsTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalOutcome = document.getElementById('modalOutcome');
    const modalTopicsList = document.getElementById('modalTopicsList');
    const modalSubscribeBtn = document.getElementById('modalSubscribeBtn');

    const packagesData = {
        '1': { title: 'باقة الأساسيات', desc: 'لمن يريد بدء تعلم الفارسية من الصفر بطريقة منهجية وصحيحة.', outcome: 'تأسيس الطالب للانتقال إلى مستويات أعلى، والقدرة على قراءة وكتابة الجمل الأساسية بنطق سليم.', topics: ['الحروف والنطق ومخارج الأصوات الفارسية.', 'تركيب الكلمات وبناء الجمل البسيطة.', 'قواعد تصريف الأفعال في الحاضر والماضي.', 'الأرقام والأيام والتعريف بالنفس.'] },
        '2': { title: 'باقة التواصل اليومي', desc: 'لمن هدفه التحدث بالفارسية واستخدامها في المحادثات والحياة اليومية.', outcome: 'تكوين الجمل والتحدث بطلاقة وثقة في كافة مواقف التواصل الاجتماعي.', topics: ['المحادثات في الأسواق والمطاعم والأماكن العامة.', 'العبارات والاصطلاحات الشائعة عند الإيرانيين.', 'فهم اللهجة العامية والرد السريع بدون تردد.', 'التعبير عن المشاعر والآراء والاحتياجات اليومية.'] },
        '3': { title: 'باقة السياحة والسفر', desc: 'لمن يحتاج اللغة أثناء السفر والرحلات العلاجية أو السياحية إلى إيران.', outcome: 'الاستقلالية التامة في السفر وإدارة كافة الإجراءات بدون الحاجة إلى مترجم.', topics: ['محادثات المطارات، سيارات الأجرة، والفنادق.', 'المصطلحات الطبية والمستشفيات وشرح الأعراض.', 'التسوق والمفاصلة بالأسعار والصرافة.', 'إرشادات الطرق والتنقل بين المدن.'] },
        '4': { title: 'باقة التجارة العامة', desc: 'لأصحاب الأعمال والتجار ومن يحتاج الفارسية في الاستيراد والتصدير.', outcome: 'إتقان لغة المال والتفاوض التجاري والتعامل الاحترافي مع الشركات والموردين.', topics: ['المصطلحات التجارية، العقود، والمراسلات الرسمية.', 'محادثات التفاوض على الأسعار وشروط الدفع والشحن.', 'التواصل عبر الواتساب والإيميل مع الشركات الإيرانية.', 'إدارة الجلسات والاجتماعات التجارية.'] },
        '5': { title: 'باقة التعليم والدراسة', desc: 'للطلاب والباحثين الراغبين بالدراسة في الجامعات الإيرانية.', outcome: 'القدرة على استيعاب المحاضرات، وكتابة البحوث، والتواصل الأكاديمي الممتاز.', topics: ['المصطلحات الأكاديمية والجامعية المشتركة.', 'فهم المحاضرات التخصصية وتلخيص الدروس.', 'مخاطبة الأساتذة والعمادات وكتابة الرسائل الأكاديمية.', 'التعامل مع بيئة السكن والأنشطة الطلابية.'] },
        '6': { title: 'باقة الزوار والمواكب', desc: 'لخدمة الزوار وأصحاب المواكب للتواصل المباشر مع الزائرين الإيرانيين.', outcome: 'إدارة مواقف الاستقبال والضيافة والتوجيه والإرشاد اليومي بكل سلاسة ويسر.', topics: ['عبارات الترحيب، الضيافة، وتلبية احتياجات الزائر.', 'توجيه الطرق، الإسعافات الأولية، ومساعدة المفقودين.', 'الحوارات الدينية والشعائرية والتنظيمية.', 'المحادثات السريعة والمباشرة في المواكب الحسينية.'] },
        'vip': { title: 'باقة VIP الشاملة', desc: 'الحل المتكامل الشامل لجميع المستويات والتخصصات في مكان واحد.', outcome: 'إتقان شامل للغة الفارسية في المحادثة، السياحة، التجارة، والدراسة.', topics: ['الوصول لكافة المحاضرات الـ 70 والمسارات الستة بالكامل.', 'الملازم المطبوعة مع التوصيل المجاني.', 'متابعة واستشارات فردية مع الأستاذة زهراء لمدة 6 أشهر.', 'خدمة مخصصة للمشتركين في الباقة الشاملة.'] }
    };

    function renderPackageData(data) {
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalDescription) modalDescription.textContent = data.desc;
        if (modalOutcome) modalOutcome.textContent = data.outcome;
        if (modalTopicsList) {
            modalTopicsList.innerHTML = '';
            data.topics.forEach(topic => {
                const li = document.createElement('li');
                li.innerHTML = `<i data-lucide="check"></i> ${topic}`;
                modalTopicsList.appendChild(li);
            });
        }
        if (modalSubscribeBtn) {
            modalSubscribeBtn.setAttribute('data-track', data.title);
            modalSubscribeBtn.setAttribute('data-program', 'برنامج اللغة الفارسية');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }

    function openPackageModal(pkgId) {
        if (!pkgModal) return;
        const data = packagesData[pkgId];
        if (!data) return;
        renderPackageData(data);
        pkgModal.classList.add('is-open');
        pkgModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closePackageModal() {
        if (!pkgModal) return;
        pkgModal.classList.remove('is-open');
        pkgModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openPkgBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openPackageModal(this.getAttribute('data-pkg-id'));
        });
    });

    closePkgBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            closePackageModal();
        });
    });

    if (pkgModal) {
        pkgModal.addEventListener('click', function (e) {
            if (e.target === pkgModal || e.target.classList.contains('registration-modal__overlay')) {
                closePackageModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closePackageModal();
    });

    /* ------------------------------
       Certificate lightbox
    ------------------------------ */
    const certLightbox = document.getElementById('certLightbox');
    const certImg = document.getElementById('certLightboxImg');
    const certCaption = document.getElementById('certLightboxCaption');
    const certContainer = document.getElementById('certZoomContainer');

    document.querySelectorAll('.js-view-cert').forEach(btn => {
        btn.addEventListener('click', function () {
            if (!certLightbox || !certImg || !certCaption || !certContainer) return;
            certImg.src = this.getAttribute('data-cert-src') || '';
            certCaption.textContent = this.getAttribute('data-cert-title') || '';
            certContainer.classList.remove('is-zoomed');
            certLightbox.classList.add('is-open');
            certLightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    document.querySelectorAll('.js-close-cert').forEach(btn => {
        btn.addEventListener('click', function () {
            if (!certLightbox) return;
            certLightbox.classList.remove('is-open');
            certLightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    });

    if (certContainer) {
        certContainer.addEventListener('click', function () {
            this.classList.toggle('is-zoomed');
        });
    }

    /* ------------------------------
       Persian reel lightbox
    ------------------------------ */
    const videoModal = document.getElementById('persianVideoModal');
    const videoFrame = document.getElementById('persianVideoFrame');
    const videoOpenBtn = document.querySelector('[data-video-open]');
    const videoCloseBtns = document.querySelectorAll('[data-video-close]');

    function openVideoModal(url) {
        if (!videoModal || !videoFrame || !url) return;
        const embedUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=560`;
        videoFrame.src = embedUrl;
        videoModal.classList.add('is-open');
        videoModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        if (!videoModal || !videoFrame) return;
        videoModal.classList.remove('is-open');
        videoModal.setAttribute('aria-hidden', 'true');
        videoFrame.src = '';
        document.body.style.overflow = '';
    }

    if (videoOpenBtn) {
        videoOpenBtn.addEventListener('click', function () {
            openVideoModal(this.getAttribute('data-video-url'));
        });
    }

    videoCloseBtns.forEach(btn => btn.addEventListener('click', closeVideoModal));
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeVideoModal(); });

    /* ------------------------------
       Persian program reel placement
    ------------------------------ */
    function fixPersianReelPlacement() {
        if (!document.body.classList.contains('page-persian')) return;

        const screen = document.querySelector('#about-program .phone-mockup__screen');
        if (!screen) return;

        const reelSrc = 'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1022229670752507&show_text=false&width=560';
        if (screen.dataset.reelFixed !== '1') {
            screen.innerHTML = `<iframe src="${reelSrc}" title="ريل البرنامج التعريفي" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>`;
            screen.dataset.reelFixed = '1';
        }

        if (!document.getElementById('persianReelFixStyle')) {
            const style = document.createElement('style');
            style.id = 'persianReelFixStyle';
            style.textContent = `
                .page-persian .program-editorial-wrapper { align-items: start; }
                .page-persian .editorial-media-column { display: flex; justify-content: center; align-items: flex-start; }
                .page-persian .phone-mockup { width: min(100%, 360px); background: transparent; border: 0; padding: 0; box-shadow: none; }
                .page-persian .phone-mockup__screen { position: relative; width: 100%; aspect-ratio: 9 / 16; height: auto; overflow: hidden; border-radius: 28px; background: #000; }
                .page-persian .phone-mockup__screen iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }
                @media (max-width: 991px) {
                    .page-persian .program-editorial-wrapper { grid-template-columns: 1fr; }
                    .page-persian .editorial-media-column { order: -1; margin-bottom: 1rem; }
                    .page-persian .phone-mockup { width: min(100%, 420px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    fixPersianReelPlacement();
    window.addEventListener('load', fixPersianReelPlacement);
});