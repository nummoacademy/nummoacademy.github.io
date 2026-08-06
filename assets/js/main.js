/* ==========================================
   NEMMO Academy
   Main JavaScript
   Version: MVP v1.2
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // Current Year
    document.querySelectorAll("[data-current-year]").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // Active Navigation
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".site-nav a").forEach(link => {

        const href = link.getAttribute("href");

        if (!href || href === "#") return;

        if (href === currentPage) {
            link.classList.add("active");
        }

    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

});
