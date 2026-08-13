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
