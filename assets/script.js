/* =========================================================
   DAMYGASO TECH — shared behaviour (optimised)
   ========================================================= */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var params = new URLSearchParams(window.location.search);
    var lang = params.get("lang") === "en" ? "en" : "sw";
    document.documentElement.setAttribute("data-lang", lang);
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "sw");

    /* ---------- Language handling ---------- */
    function withLang(href, targetLang) {
      if (!href || href.indexOf("#") === 0 || /^https?:\/\//i.test(href) || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("wa.me") > -1) {
        return href;
      }
      var url = new URL(href, window.location.href);
      url.searchParams.set("lang", targetLang);
      return url.pathname.split("/").pop() + "?" + url.searchParams.toString() + url.hash;
    }

    function applyLangToLinks(targetLang) {
      var links = document.querySelectorAll("a[href]");
      for (var i = 0; i < links.length; i++) {
        var a = links[i];
        var href = a.getAttribute("href");
        if (!href) continue;
        if (/^https?:\/\//i.test(href) || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("#") === 0) continue;
        a.setAttribute("href", withLang(href, targetLang));
      }
    }
    applyLangToLinks(lang);

    function syncFormFieldsForLang(activeLang) {
      var selects = document.querySelectorAll("select[data-sw], select[data-en]");
      for (var i = 0; i < selects.length; i++) {
        var el = selects[i];
        var isSw = el.hasAttribute("data-sw");
        el.disabled = (isSw && activeLang === "en") || (!isSw && activeLang === "sw");
      }
    }
    syncFormFieldsForLang(lang);

    function setLangButtons() {
      var btns = document.querySelectorAll("[data-lang-btn]");
      for (var i = 0; i < btns.length; i++) {
        var btn = btns[i];
        btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
        btn.addEventListener("click", function () {
          var target = this.getAttribute("data-lang-btn");
          var url = new URL(window.location.href);
          url.searchParams.set("lang", target);
          var dest = url.pathname + "?" + url.searchParams.toString() + url.hash;
          if (this.closest(".lang-slider") && target !== lang) {
            // let the slider pill glide to the new side before the page reloads
            document.documentElement.setAttribute("data-lang", target);
            setTimeout(function () { window.location.href = dest; }, 300);
          } else {
            window.location.href = dest;
          }
        });
      }
    }
    setLangButtons();

    var langSelects = document.querySelectorAll("[data-lang-select]");
    for (var ls = 0; ls < langSelects.length; ls++) {
      langSelects[ls].value = lang;
      langSelects[ls].addEventListener("change", function () {
        var url = new URL(window.location.href);
        url.searchParams.set("lang", this.value);
        window.location.href = url.pathname + "?" + url.searchParams.toString() + url.hash;
      });
    }

    /* ---------- Mobile off-canvas menu ---------- */
    var burger = document.querySelector(".hamburger");
    var offcanvas = document.querySelector(".offcanvas");
    var backdrop = document.querySelector(".offcanvas-backdrop");
    var closeBtn = document.querySelector(".offcanvas-close");

    function openMenu() {
      burger.classList.add("is-open");
      offcanvas.classList.add("is-open");
      backdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
      burger.setAttribute("aria-expanded", "true");
    }
    function closeMenu() {
      burger.classList.remove("is-open");
      offcanvas.classList.remove("is-open");
      backdrop.classList.remove("is-open");
      document.body.style.overflow = "";
      if (burger) burger.setAttribute("aria-expanded", "false");
    }
    if (burger) {
      burger.addEventListener("click", function () {
        offcanvas.classList.contains("is-open") ? closeMenu() : openMenu();
      });
    }
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    if (backdrop) backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && offcanvas && offcanvas.classList.contains("is-open")) closeMenu();
    });

    var navLinks = document.querySelectorAll(".offcanvas nav a");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", closeMenu);
    }

    /* ---------- Active nav link ---------- */
    var current = window.location.pathname.split("/").pop() || "index.html";
    var allNavLinks = document.querySelectorAll(".nav-desktop > ul > li > a, .offcanvas nav > ul > li > a");
    for (var i = 0; i < allNavLinks.length; i++) {
      var a = allNavLinks[i];
      var href = (a.getAttribute("href") || "").split("?")[0];
      if (href === current || (current === "" && href === "index.html")) {
        a.classList.add("active");
      }
    }

    /* ---------- FAQ accordion ---------- */
    var faqItems = document.querySelectorAll(".faq-item");
    for (var i = 0; i < faqItems.length; i++) {
      var item = faqItems[i];
      var q = item.querySelector(".faq-q");
      if (!q) continue;
      q.addEventListener("click", function () {
        var parent = this.closest(".faq-item");
        var wasOpen = parent.classList.contains("is-open");
        var allItems = document.querySelectorAll(".faq-item");
        for (var j = 0; j < allItems.length; j++) {
          allItems[j].classList.remove("is-open");
        }
        if (!wasOpen) parent.classList.add("is-open");
      });
    }

    /* ---------- Scroll reveal ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window && revealEls.length) {
      var io = new IntersectionObserver(function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      }, { threshold: 0.15 });
      for (var i = 0; i < revealEls.length; i++) {
        io.observe(revealEls[i]);
      }
    } else {
      for (var i = 0; i < revealEls.length; i++) {
        revealEls[i].classList.add("is-visible");
      }
    }

    /* ---------- Forms ---------- */
    var forms = document.querySelectorAll("form[data-demo-form]");
    for (var i = 0; i < forms.length; i++) {
      var form = forms[i];
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var successBox = this.parentElement.querySelector(".form-success");

        var get = function (n) {
          var els = this.querySelectorAll("[name='" + n + "']");
          for (var i = 0; i < els.length; i++) {
            if (els[i].offsetParent !== null) return (els[i].value || "").trim();
          }
          return els.length ? (els[0].value || "").trim() : "";
        }.bind(this);

        var name = get("name");
        var phone = get("phone");
        var email = get("email");
        var service = get("service");
        var details = get("details") || get("message");

        var lines = ["Habari Damygaso Tech, naomba huduma:"];
        if (name) lines.push("Jina: " + name);
        if (phone) lines.push("Simu: " + phone);
        if (email) lines.push("Email: " + email);
        if (service) lines.push("Huduma: " + service);
        if (details) lines.push("Maelezo: " + details);
        var waMessage = lines.join("\n");

        var waNumber = "255743322107";
        var waLink = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(waMessage);

        if (successBox) {
          successBox.classList.add("is-visible");
          successBox.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        this.reset();

        // Fungua WhatsApp mara moja
        window.open(waLink, "_blank");
      });
    }

    /* ---------- Desktop dropdowns (hover/focus via CSS; tap support for touch screens) ---------- */
    var dropdowns = document.querySelectorAll(".has-dropdown");
    function closeDropdowns(except) {
      for (var d = 0; d < dropdowns.length; d++) {
        if (dropdowns[d] !== except) {
          dropdowns[d].classList.remove("open");
          var t = dropdowns[d].querySelector(":scope > a");
          if (t) t.setAttribute("aria-expanded", "false");
        }
      }
    }
    for (var d = 0; d < dropdowns.length; d++) {
      (function (li) {
        var trigger = li.querySelector(":scope > a");
        li.addEventListener("mouseenter", function () { trigger.setAttribute("aria-expanded", "true"); });
        li.addEventListener("mouseleave", function () { if (!li.classList.contains("open")) trigger.setAttribute("aria-expanded", "false"); });
        li.addEventListener("focusin", function () { trigger.setAttribute("aria-expanded", "true"); });
        li.addEventListener("focusout", function (e) { if (!li.contains(e.relatedTarget)) trigger.setAttribute("aria-expanded", "false"); });
        trigger.addEventListener("click", function (e) {
          // On touch devices the first tap opens the menu, the second tap follows the link
          if (window.matchMedia("(hover: none)").matches && !li.classList.contains("open")) {
            e.preventDefault();
            closeDropdowns(li);
            li.classList.add("open");
            trigger.setAttribute("aria-expanded", "true");
          }
        });
      })(dropdowns[d]);
    }
    document.addEventListener("click", function (e) {
      if (!e.target.closest || !e.target.closest(".has-dropdown")) closeDropdowns(null);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDropdowns(null); });

    /* ---------- Scroll progress bar, back-to-top, header shadow (one rAF-throttled handler) ---------- */
    var header = document.querySelector(".site-header");
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);

    var toTop = document.createElement("button");
    toTop.className = "to-top";
    toTop.type = "button";
    toTop.setAttribute("aria-label", lang === "en" ? "Back to top" : "Rudi juu");
    toTop.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: "smooth" }); });
    document.body.appendChild(toTop);

    var ticking = false;
    function onScroll() {
      var y = window.scrollY || document.documentElement.scrollTop;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(y / max, 1) : 0) + ")";
      if (header) header.classList.toggle("scrolled", y > 8);
      toTop.classList.toggle("show", y > 600);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
    }, { passive: true });
    onScroll();
  });
})();