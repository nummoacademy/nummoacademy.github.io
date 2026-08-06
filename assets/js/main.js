/* ==========================================
   NEMMO Academy
   Main JavaScript
   Version: MVP v1.0
========================================== */

"use strict";

/* ==========================================
   APP
========================================== */

const NEMMO = {

    init() {

        this.cache();

        this.events();

        this.ready();

    },

    cache() {

        this.body = document.body;

    },

    events() {

        // سيتم إضافة الأحداث التفاعلية
        // في الجلسات القادمة.

    },

    ready() {

        this.body.classList.add("app-loaded");

        console.log(
            "%cNEMMO Academy MVP",
            "color:#C9A227;font-size:16px;font-weight:bold;"
        );

        console.log("Application initialized successfully.");

    }

};

/* ==========================================
   DOM READY
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    NEMMO.init();

});
