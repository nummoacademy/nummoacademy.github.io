/* ========================================================================== 
   NEMMO Academy — Main JavaScript (Modular Production v3.6)
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

    const siteHeader = document.querySelector('.site-header');
    let siteNav = document.getElementById('siteNav');
    let mobileMenuBtn = document.getElementById('mobileMenuBtn');

    if (!siteNav) {
        siteNav = document.querySelector('.site-nav');
        if (siteNav && !siteNav.id) {
            siteNav.id = 'siteNav';
        }
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
            if (window.innerWidth > 991) {
                closeMobileNav();
            }
        }, { passive: true });
    }

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

    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevReviewBtn = document.getElementById('prevReviewBtn');
    const nextReviewBtn = document.getElementById('nextReviewBtn');
    let currentReviewIndex = 0;

    function showReview(index) {
        if (!testimonialSlides.length) return;
        testimonialSlides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
    }

    if (testimonialSlides.length) {
        showReview(currentReviewIndex);
    }

    if (prevReviewBtn && nextReviewBtn && testimonialSlides.length) {
        prevReviewBtn.addEventListener('click', () => {
            currentReviewIndex = (currentReviewIndex === 0) ? testimonialSlides.length - 1 : currentReviewIndex - 1;
            showReview(currentReviewIndex);
        });

        nextReviewBtn.addEventListener('click', () => {
            currentReviewIndex = (currentReviewIndex === testimonialSlides.length - 1) ? 0 : currentReviewIndex + 1;
            showReview(currentReviewIndex);
        });
    }

    const registrationModal = document.getElementById('registrationModal');
    const form = document.getElementById('registrationForm');
    const errorMsg = document.getElementById('registrationError');
    const programSelect = document.getElementById('registrationProgram');
    const trackGroup = document.getElementById('trackGroup');
    const trackSelect = document.getElementById('registrationTrack');

    const openBtns = document.querySelectorAll('.js-open-registration, .js-open-modal, [data-registration-open]');
    const closeBtns = document.querySelectorAll('.js-close-registration, [data-modal-close]');

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

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else if (document.activeElement === lastElement) {
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
                if (option.value === trackName || option.text.includes(trackName)) {
                    option.selected = true;
                    break;
                }
            }
        }

        document.addEventListener('keydown', handleModalKeyDown);

        window.setTimeout(() => {
            const firstInput = registrationModal.querySelector('input:not([type=hidden]), select, textarea, button');
            if (firstInput) firstInput.focus();
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

    openBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const program = this.getAttribute('data-program') || this.dataset.program || '';
            const track = this.getAttribute('data-track') || this.dataset.track || '';
            openRegistrationModal(program, track, this);
        });
    });

    closeBtns.forEach(btn => {
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
            const track = (trackSelect && !trackGroup.classList.contains('is-hidden')) ? trackSelect.value.trim() : 'عام';

            if (!name || !phone || !governorate || !address || !program || (!trackGroup.classList.contains('is-hidden') && !track)) {
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
                if (phoneInput) phoneInput.focus();
                return;
            }

            if (errorMsg) {
                errorMsg.textContent = '';
                errorMsg.style.display = 'none';
            }

            const now = new Date();
            const timeString = now.toLocaleString('ar-IQ', { dateStyle: 'short', timeStyle: 'short' });
            const pageSource = window.location.href.split('#')[0];
            const userAgent = navigator.userAgent;
            const userDevice = /Android/i.test(userAgent) ? 'Android' : (/iPhone|iPad/i.test(userAgent) ? 'iOS' : 'Desktop');

            let whatsappMessage =
                `طلب تسجيل جديد - NEMMO Academy 🎓\n` +
                `⏰ وقت الطلب: ${timeString} (${userDevice})\n` +
                `🌐 المصدر: ${pageSource}\n` +
                `━━━━━━━━━━━━━━━━━━\n` +
                `👤 الاسم: ${name}\n` +
                `📞 الهاتف: ${phone}\n` +
                `📍 المحافظة: ${governorate}\n` +
                `🏠 العنوان: ${address}\n` +
                `📚 البرنامج: ${program}\n`;

            if (track && track !== 'عام') {
                whatsappMessage += `🎯 المسار: ${track}\n`;
            }

            const encodedText = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

            form.reset();
            handleProgramChange();
            closeRegistrationModal();
        });
    }
});