/* ==========================================
   NEMMO Academy
   Main JavaScript
   Version: MVP v2.6 (Unified & Fully Compatible)
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       1. Current Year Auto Update
    ========================================== */
    const yearElements = document.querySelectorAll("[data-current-year]");
    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* ==========================================
       2. Theme Toggle (Dark / Light Mode)
    ========================================== */
    const themeToggleBtn = document.getElementById("themeToggle");
    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");

    // استرجاع المظهر المحفوظ سابقاً
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
        if (moonIcon) moonIcon.style.display = "none";
        if (sunIcon) sunIcon.style.display = "block";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.body.getAttribute("data-theme") === "dark" || document.documentElement.getAttribute("data-theme") === "dark";

            if (isDark) {
                document.body.removeAttribute("data-theme");
                document.documentElement.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
                if (moonIcon) moonIcon.style.display = "block";
                if (sunIcon) sunIcon.style.display = "none";
            } else {
                document.body.setAttribute("data-theme", "dark");
                document.documentElement.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                if (moonIcon) moonIcon.style.display = "none";
                if (sunIcon) sunIcon.style.display = "block";
            }
        });
    }


    /* ==========================================
       3. Smooth Scrolling
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });


    /* ==========================================
       4. Registration Modal System
    ========================================== */
    // البحث بالخصائص القديمة أوالجديدة لضمان التوافق التام
    const modal = document.querySelector("[data-registration-modal]") || document.getElementById("registrationModal");

    if (!modal) {
        return;
    }

    const form = modal.querySelector("[data-registration-form]") || modal.querySelector("#registrationForm") || modal.querySelector("form");
    const closeButtons = modal.querySelectorAll("[data-modal-close], .js-close-registration, .registration-modal__close");
    const openButtons = document.querySelectorAll("[data-registration-open], .js-open-registration, .js-open-modal");

    const programSelect = modal.querySelector("#registration-program") || modal.querySelector("#registrationProgram") || modal.querySelector("#program");
    const packageSelect = modal.querySelector("#registration-package") || modal.querySelector("#registrationPackage") || modal.querySelector("#package");


    /* ==========================================
       Open Modal Function
    ========================================== */
    const openModal = (button) => {
        const selectedProgram = button?.dataset.program || button?.getAttribute("data-program") || "";
        const selectedPackage = button?.dataset.package || button?.getAttribute("data-package") || "";

        // تحديد البرنامج
        if (selectedProgram && programSelect) {
            for (let option of programSelect.options) {
                if (option.value === selectedProgram || option.text === selectedProgram) {
                    option.selected = true;
                    break;
                }
            }
        }

        // تحديد الباقة
        if (selectedPackage) {
            if (packageSelect && packageSelect.tagName === "SELECT") {
                for (let option of packageSelect.options) {
                    if (option.value.includes(selectedPackage) || selectedPackage.includes(option.value)) {
                        option.selected = true;
                        break;
                    }
                }
            } else {
                const packageRadios = modal.querySelectorAll('input[name="package"]');
                packageRadios.forEach(radio => {
                    if (radio.value.includes(selectedPackage) || selectedPackage.includes(radio.value)) {
                        radio.checked = true;
                    }
                });
            }
        }

        modal.classList.add("is-open");
        document.body.classList.add("modal-open");
        modal.setAttribute("aria-hidden", "false");

        const firstInput = modal.querySelector("input:not([type='hidden']), select, textarea");
        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 100);
        }
    };


    /* ==========================================
       Close Modal Function
    ========================================== */
    const closeModal = () => {
        modal.classList.remove("is-open");
        document.body.classList.remove("modal-open");
        modal.setAttribute("aria-hidden", "true");
    };


    /* ==========================================
       Attach Open Events
    ========================================== */
    openButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            openModal(button);
        });
    });


    /* ==========================================
       Attach Close Events
    ========================================== */
    closeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    });


    /* ==========================================
       Close On Overlay Click
    ========================================== */
    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.classList.contains("registration-modal__overlay")) {
            closeModal();
        }
    });


    /* ==========================================
       Close On Escape Key
    ========================================== */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });


    /* ==========================================
       Form Submission & WhatsApp
    ========================================== */
    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // جمع البيانات بجميع المعرفات الممكنة
        const fullName = (
            form.querySelector("#registration-name") ||
            form.querySelector("#registrationName") ||
            form.querySelector("#fullName")
        )?.value.trim() || "";

        const phone = (
            form.querySelector("#registration-phone") ||
            form.querySelector("#registrationPhone") ||
            form.querySelector("#phone")
        )?.value.trim() || "";

        const governorate = (
            form.querySelector("#registration-governorate") ||
            form.querySelector("#registrationGovernorate") ||
            form.querySelector("#governorate")
        )?.value.trim() || "";

        const address = (
            form.querySelector("#registration-address") ||
            form.querySelector("#registrationAddress") ||
            form.querySelector("#address")
        )?.value.trim() || "";

        let program = "";
        if (programSelect) {
            program = programSelect.options[programSelect.selectedIndex]?.text || programSelect.value || "";
        }

        let selectedPackageText = "";
        if (packageSelect && packageSelect.tagName === "SELECT") {
            selectedPackageText = packageSelect.options[packageSelect.selectedIndex]?.text || packageSelect.value || "";
        } else {
            const checkedRadio = form.querySelector('input[name="package"]:checked');
            selectedPackageText = checkedRadio ? checkedRadio.value : "";
        }

        /* صياغة رسالة الواتساب الرسمية */
        const message = `طلب تسجيل جديد - NEMMO Academy 🎓

الاسم:
${fullName}

رقم الهاتف:
${phone}

المحافظة:
${governorate}

العنوان:
${address}

البرنامج:
${program}

الباقة:
${selectedPackageText}`;

        const whatsappNumber = "9647770300029";
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        // فتح تطبيق الواتساب
        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        // إغلاق النافذة وإعادة الضبط
        form.reset();
        closeModal();
    });

});
