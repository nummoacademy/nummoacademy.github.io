/* ==========================================
   NEMMO Academy
   Main JavaScript
   Version: MVP v2.5
   Registration Modal + WhatsApp + Theme Toggle
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       Current Year
    ========================================== */

    const yearElements = document.querySelectorAll("[data-current-year]");

    yearElements.forEach((element) => {
        element.textContent = new Date().getFullYear();
    });


    /* ==========================================
       Theme Toggle (Dark / Light Mode)
    ========================================== */

    const themeToggleBtn = document.getElementById("themeToggle");
    const moonIcon = document.querySelector(".moon-icon");
    const sunIcon = document.querySelector(".sun-icon");

    // استرجاع المظهر المحفوظ سابقاً في المتصفح
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.setAttribute("data-theme", "dark");
        if (moonIcon) moonIcon.style.display = "none";
        if (sunIcon) sunIcon.style.display = "block";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            const isDark = document.body.getAttribute("data-theme") === "dark";

            if (isDark) {
                document.body.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
                if (moonIcon) moonIcon.style.display = "block";
                if (sunIcon) sunIcon.style.display = "none";
            } else {
                document.body.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
                if (moonIcon) moonIcon.style.display = "none";
                if (sunIcon) sunIcon.style.display = "block";
            }
        });
    }


    /* ==========================================
       Smooth Scrolling
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
       Registration Modal
    ========================================== */

    const modal = document.querySelector("[data-registration-modal]");

    if (!modal) {
        return;
    }

    const form = modal.querySelector("[data-registration-form]");
    const closeButtons = modal.querySelectorAll("[data-modal-close]");
    const openButtons = document.querySelectorAll("[data-registration-open]");

    const programSelect = modal.querySelector("#registration-program");
    const packageSelect = modal.querySelector("#registration-package");


    /* ==========================================
       Open Modal
    ========================================== */

    const openModal = (button) => {

        const selectedProgram = button?.dataset.program || "";

        if (selectedProgram && programSelect) {
            programSelect.value = selectedProgram;
        }

        modal.classList.add("is-open");
        document.body.classList.add("modal-open");

        modal.setAttribute("aria-hidden", "false");

        const firstInput = modal.querySelector(
            "input:not([type='hidden']), select"
        );

        if (firstInput) {
            setTimeout(() => {
                firstInput.focus();
            }, 100);
        }

    };


    /* ==========================================
       Close Modal
    ========================================== */

    const closeModal = () => {

        modal.classList.remove("is-open");
        document.body.classList.remove("modal-open");

        modal.setAttribute("aria-hidden", "true");

    };


    /* ==========================================
       Open Buttons
    ========================================== */

    openButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.preventDefault();

            openModal(button);

        });

    });


    /* ==========================================
       Close Buttons
    ========================================== */

    closeButtons.forEach((button) => {

        button.addEventListener("click", () => {
            closeModal();
        });

    });


    /* ==========================================
       Close When Clicking Overlay
    ========================================== */

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {
            closeModal();
        }

    });


    /* ==========================================
       Close With Escape
    ========================================== */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("is-open")
        ) {
            closeModal();
        }

    });


    /* ==========================================
       Registration Form
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


        /* ==========================================
           Collect Form Data
        ========================================== */

        const fullName =
            form.querySelector("#registration-name")?.value.trim() || "";

        const phone =
            form.querySelector("#registration-phone")?.value.trim() || "";

        const governorate =
            form.querySelector("#registration-governorate")?.value.trim() || "";

        const address =
            form.querySelector("#registration-address")?.value.trim() || "";

        const program =
            programSelect?.options[programSelect.selectedIndex]?.text || "";

        const selectedPackage =
            packageSelect?.options[packageSelect.selectedIndex]?.text || "";


        /* ==========================================
           WhatsApp Message
        ========================================== */

        const message = `طلب تسجيل جديد

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
${selectedPackage}`;


        /* ==========================================
           WhatsApp Number
        ========================================== */

        const whatsappNumber = "9647770300029";


        /* ==========================================
           WhatsApp URL
        ========================================== */

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        /* ==========================================
           Open WhatsApp
        ========================================== */

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});
