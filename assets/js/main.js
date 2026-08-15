/* ==========================================
   NEMMO Academy
   Main JavaScript
   Version: MVP v2.8 (Fixed Modal Script)
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    // 1. تحديث سنة الحقوق المحفوظة تلقائياً
    const currentYearSpan = document.querySelector("[data-current-year]");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. تفعيل أيقونات Lucide
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // 3. تبديل الوضع الليلي / النهاري (Dark / Light Theme Toggle)
    const themeToggleBtn = document.getElementById("themeToggle");
    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
        document.body.setAttribute("data-theme", savedTheme);
        updateThemeIcons(savedTheme);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const currentTheme = document.body.getAttribute("data-theme") || document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";

            if (newTheme === "dark") {
                document.body.setAttribute("data-theme", "dark");
                document.documentElement.setAttribute("data-theme", "dark");
            } else {
                document.body.removeAttribute("data-theme");
                document.documentElement.removeAttribute("data-theme");
            }

            localStorage.setItem("theme", newTheme);
            updateThemeIcons(newTheme);
        });
    }

    function updateThemeIcons(theme) {
        if (moonIcon && sunIcon) {
            if (theme === "dark") {
                moonIcon.style.display = "none";
                sunIcon.style.display = "inline-block";
            } else {
                moonIcon.style.display = "inline-block";
                sunIcon.style.display = "none";
            }
        }
    }

    // 4. السحب والتمرير السلس (Smooth Scroll)
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // 5. التحكم في النافذة المنبثقة للتسجيل (Registration Pop-up Modal)
    const modal = document.getElementById("registrationModal");
    const form = document.getElementById("registrationForm");
    const errorMsg = document.getElementById("registrationError");

    const openBtns = document.querySelectorAll(".js-open-registration, .js-open-modal, [data-registration-open]");
    const closeBtns = document.querySelectorAll(".js-close-registration, [data-modal-close]");

    const WHATSAPP_NUMBER = "9647770300029"; // رقم المبيعات الرسمي

    // فتح النافذة
    function openRegistrationModal(programName = "", packageName = "") {
        if (!modal) return;

        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden"; // منع التمرير الخلفي أثناء تفعيل النافذة

        // تحديد البرنامج تلقائياً
        const programSelect = document.getElementById("registrationProgram") || document.getElementById("registration-program");
        if (programSelect && programName) {
            for (let option of programSelect.options) {
                if (option.value === programName || option.text === programName) {
                    option.selected = true;
                    break;
                }
            }
        }

        // تحديد الباقة تلقائياً
        if (packageName) {
            const packageRadios = modal.querySelectorAll('input[name="package"]');
            packageRadios.forEach(radio => {
                if (radio.value.includes(packageName) || packageName.includes(radio.value)) {
                    radio.checked = true;
                }
            });
        }
    }

    // إغلاق النافذة
    function closeRegistrationModal() {
        if (!modal) return;

        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";

        if (errorMsg) {
            errorMsg.textContent = "";
            errorMsg.style.display = "none";
        }
    }

    // ربط كافة أزرار التفعيل
    openBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const program = this.getAttribute("data-program") || this.dataset.program || "";
            const pkg = this.getAttribute("data-package") || this.dataset.package || "";
            openRegistrationModal(program, pkg);
        });
    });

    // ربط أزرار الإغلاق والخلفية المعتمة
    closeBtns.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            closeRegistrationModal();
        });
    });

    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal || e.target.classList.contains("registration-modal__overlay")) {
                closeRegistrationModal();
            }
        });
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
            closeRegistrationModal();
        }
    });

    // 6. معالجة إرسال البيانات عبر الواتساب
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("registrationName") || document.getElementById("registration-name");
            const phoneInput = document.getElementById("registrationPhone") || document.getElementById("registration-phone");
            const governorateSelect = document.getElementById("registrationGovernorate") || document.getElementById("registration-governorate");
            const addressInput = document.getElementById("registrationAddress") || document.getElementById("registration-address");
            const programSelect = document.getElementById("registrationProgram") || document.getElementById("registration-program");
            const selectedPackage = modal.querySelector('input[name="package"]:checked');

            const name = nameInput ? nameInput.value.trim() : "";
            const phone = phoneInput ? phoneInput.value.trim() : "";
            const governorate = governorateSelect ? governorateSelect.value.trim() : "";
            const address = addressInput ? addressInput.value.trim() : "";
            const program = programSelect ? (programSelect.options[programSelect.selectedIndex]?.text || programSelect.value) : "";
            const pkg = selectedPackage ? selectedPackage.value.trim() : "";

            if (!name || !phone || !governorate || !address || !program || !pkg) {
                if (errorMsg) {
                    errorMsg.textContent = "يرجى ملء كافة الحقول المطلوبة واختيار الباقة والبرنامج.";
                    errorMsg.style.display = "block";
                }
                return;
            }

            if (errorMsg) {
                errorMsg.textContent = "";
                errorMsg.style.display = "none";
            }

            // صياغة الرسالة الموجهة للواتساب
            const whatsappMessage = `طلب تسجيل جديد - NEMMO Academy 🎓\n\n` +
                                    `👤 الاسم الثلاثي: ${name}\n` +
                                    `📞 رقم الهاتف: ${phone}\n` +
                                    `📍 المحافظة: ${governorate}\n` +
                                    `🏠 العنوان الكامل: ${address}\n` +
                                    `📚 البرنامج: ${program}\n` +
                                    `💎 الباقة المختارة: ${pkg}`;

            const encodedText = encodeURIComponent(whatsappMessage);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            form.reset();
            closeRegistrationModal();
        });
    }

});
// ==========================================
// Package Details Modal Controller (Session 3.3)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const packagesData = {
        basics: {
            title: 'باقة الأساسيات',
            badge: 'المسار التأسيسي - للمبتدئين',
            desc: 'لمن يريد البدء بتعلّم الفارسية من الصفر.',
            outcome: 'تأسيس الطالب للانتقال إلى مستويات أعلى، والقراءة والكتابة والنطق الصحيح.',
            features: [
                'الحروف والنطق ومخارج الحروف.',
                'الكلمات والجمل الأساسية.',
                'أساسيات القواعد.',
                'تكوين الجمل البسيطة.',
                'تأسيس الطالب للانتقال إلى مستويات أعلى.'
            ]
        },
        daily: {
            title: 'باقة التواصل اليومي',
            badge: 'المسار الاجتماعي التفاعلي',
            desc: 'لمن هدفه التحدث بالفارسية واستخدامها في الحياة اليومية.',
            outcome: 'تكوين الجمل والتحدث بثقة وفهم الحوارات اليومية.',
            features: [
                'المحادثات اليومية.',
                'العبارات والمفردات المستخدمة في الحياة اليومية.',
                'مواقف التواصل الاجتماعي.',
                'الاستماع والفهم.',
                'تكوين الجمل والتحدث بثقة.'
            ]
        },
        travel: {
            title: 'باقة السياحة والسفر',
            badge: 'دليلك للرحلات والتنقل',
            desc: 'لمن يحتاج اللغة أثناء السفر والرحلات إلى إيران.',
            outcome: 'امتلاك العبارات التي يحتاجها السائح للتواصل مع الإيرانيين في كافة المواقف.',
            features: [
                'محادثات السفر.',
                'المطار والتنقل.',
                'الفندق والمطاعم.',
                'التسوق والتعاملات اليومية.',
                'العبارات التي يحتاجها السائح للتواصل مع الإيرانيين.'
            ]
        },
        business: {
            title: 'باقة التجارة العامة',
            badge: 'للتجار وبيئة الأعمال',
            desc: 'لأصحاب الأعمال وكل من يحتاج الفارسية في المجال التجاري.',
            outcome: 'إدارة المعاملات المهنية، التواصل مع العملاء، والتعامل مع الشركاء بثقة.',
            features: [
                'المصطلحات التجارية.',
                'المحادثات المهنية.',
                'التواصل مع العملاء.',
                'التعامل مع الشركاء.',
                'العبارات والمواقف المستخدمة في بيئة الأعمال والتجارة.'
            ]
        },
        academic: {
            title: 'باقة التعليم والدراسة',
            badge: 'للباحثين والبيئة الجامعية',
            desc: 'للراغبين بالدراسة والتعامل مع البيئة الأكاديمية باللغة الفارسية.',
            outcome: 'فهم النصوص الأكاديمية والمحادثات الدراسية والتواصل في البيئة التعليمية.',
            features: [
                'المفردات الأكاديمية.',
                'المحادثات الدراسية.',
                'فهم النصوص.',
                'القراءة والاستيعاب.',
                'التواصل في البيئة التعليمية.'
            ]
        },
        service: {
            title: 'باقة الزوار والمواكب',
            badge: 'لكوادر الخدمة والزيارة',
            desc: 'للزوار والمواكب الذين يحتاجون الفارسية للتعامل والتواصل مع الإيرانيين.',
            outcome: 'إدارة مواقف الاستقبال والخدمة والتوجيه والتعامل اليومي في المواكب.',
            features: [
                'العبارات الخاصة بالزيارة.',
                'التواصل مع الزوار الإيرانيين.',
                'مواقف الاستقبال والخدمة.',
                'التوجيه والتعامل اليومي.',
                'المفردات والمحادثات التي يحتاجها المشاركون في المواكب.'
            ]
        },
        vip: {
            title: 'باقة VIP | الشاملة',
            badge: 'الباقة المتكاملة الشاملة',
            desc: 'الباقة المتكاملة لمن يريد تعلّم الفارسية واستخدامها في مختلف المجالات.',
            outcome: 'تشمل جميع الباقات والمسارات الستة بالكامل مع كافة المزايا الأكاديمية.',
            features: [
                '1. باقة الأساسيات كاملة.',
                '2. باقة التواصل اليومي كاملة.',
                '3. باقة السياحة والسفر كاملة.',
                '4. باقة التجارة العامة كاملة.',
                '5. باقة التعليم والدراسة كاملة.',
                '6. باقة الزوار والمواكب كاملة.'
            ]
        }
    };

    const detailsModal = document.getElementById('packageDetailsModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBadge = document.getElementById('modalBadge');
    const modalDesc = document.getElementById('modalDescription');
    const modalOutcome = document.getElementById('modalOutcome');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalSubBtn = document.getElementById('modalSubscribeAction');
    let activePackageTitle = '';

    // فتح الـ Modal وتعبئة البيانات عند النقر على "اعرف المزيد"
    document.querySelectorAll('.js-open-details').forEach(button => {
        button.addEventListener('click', () => {
            const targetKey = button.getAttribute('data-package-target');
            const data = packagesData[targetKey];

            if (data && detailsModal) {
                activePackageTitle = data.title;
                modalTitle.textContent = data.title;
                modalBadge.textContent = data.badge;
                modalDesc.textContent = data.desc;
                modalOutcome.textContent = data.outcome;

                modalFeatures.innerHTML = '';
                data.features.forEach(feat => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${feat}`;
                    modalFeatures.appendChild(li);
                });

                detailsModal.classList.add('is-open');
                detailsModal.setAttribute('aria-hidden', 'false');
            }
        });
    });

    // إغلاق الـ Modal
    document.querySelectorAll('.js-close-details').forEach(btn => {
        btn.addEventListener('click', () => {
            if (detailsModal) {
                detailsModal.classList.remove('is-open');
                detailsModal.setAttribute('aria-hidden', 'true');
            }
        });
    });

    // الانتقال المباشر لنموذج التسجيل من داخل الـ Modal
    if (modalSubBtn) {
        modalSubBtn.addEventListener('click', () => {
            if (detailsModal) {
                detailsModal.classList.remove('is-open');
                detailsModal.setAttribute('aria-hidden', 'true');
            }

            const regModal = document.getElementById('registrationModal');
            if (regModal) {
                regModal.classList.add('is-open');
                regModal.setAttribute('aria-hidden', 'false');

                // تحديد الباقة تلقائياً في القائمة المنسدلة للنموذج
                const pkgSelect = regModal.querySelector('select[name="package"]');
                if (pkgSelect) {
                    for (let option of pkgSelect.options) {
                        if (option.value.includes(activePackageTitle)) {
                            pkgSelect.value = option.value;
                            break;
                        }
                    }
                }
            }
        });
    }
});
