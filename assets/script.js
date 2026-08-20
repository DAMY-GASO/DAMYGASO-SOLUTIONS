/* =========================================================
   DAMYGASO TECH — shared behaviour
   Language state is carried via a ?lang= URL parameter (no
   browser storage), so it survives navigation between pages.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Language handling ---------- */
  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") === "en" ? "en" : "sw"; // Swahili default
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang === "en" ? "en" : "sw");

  function withLang(href, targetLang) {
    if (!href || href.indexOf("#") === 0 || /^https?:\/\//i.test(href) || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("wa.me") > -1) {
      return href;
    }
    var url = new URL(href, window.location.href);
    url.searchParams.set("lang", targetLang);
    return url.pathname.split("/").pop() + "?" + url.searchParams.toString();
  }

  function applyLangToLinks(targetLang) {
    document.querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      if (/^https?:\/\//i.test(href) || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("#") === 0) return;
      a.setAttribute("href", withLang(href, targetLang));
    });
  }
  applyLangToLinks(lang);

  function syncFormFieldsForLang(activeLang) {
    document.querySelectorAll("select[data-sw], input[data-sw], textarea[data-sw]").forEach(function (el) {
      el.disabled = activeLang === "en";
    });
    document.querySelectorAll("select[data-en], input[data-en], textarea[data-en]").forEach(function (el) {
      el.disabled = activeLang === "sw";
    });
  }
  syncFormFieldsForLang(lang);

  function setLangButtons() {
    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
      btn.addEventListener("click", function () {
        var target = btn.getAttribute("data-lang-btn");
        var url = new URL(window.location.href);
        url.searchParams.set("lang", target);
        window.location.href = url.pathname + "?" + url.searchParams.toString() + url.hash;
      });
    });
  }
  setLangButtons();

 /* ---------- Mobile off-canvas menu ---------- */
  var burger = document.querySelector(".hamburger");
  var offcanvas = document.querySelector(".offcanvas");
  var backdrop = document.querySelector(".offcanvas-backdrop");
  var closeBtn = document.querySelector(".offcanvas-close");

  function openMenu() {
    if (burger) burger.classList.add("is-open");
    if (offcanvas) offcanvas.classList.add("is-open");
    if (backdrop) backdrop.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMenu() {
    if (burger) burger.classList.remove("is-open");
    if (offcanvas) offcanvas.classList.remove("is-open");
    if (backdrop) backdrop.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  if (burger) {
    burger.addEventListener("click", function () {
      if (offcanvas && offcanvas.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (backdrop) backdrop.addEventListener("click", closeMenu);
  
  document.querySelectorAll(".offcanvas nav a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* ---------- Active nav link ---------- */
  var current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-desktop a, .offcanvas nav a").forEach(function (a) {
    var href = (a.getAttribute("href") || "").split("?")[0];
    if (href === current || (current === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var q = item.querySelector(".faq-q");
    if (!q) return;
    q.addEventListener("click", function () {
      var wasOpen = item.classList.contains("is-open");
      document.querySelectorAll(".faq-item").forEach(function (i) { i.classList.remove("is-open"); });
      if (!wasOpen) item.classList.add("is-open");
    });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Forms (booking + contact) ---------- */
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var successBox = form.parentElement.querySelector(".form-success");

      var get = function (n) {
        var els = form.querySelectorAll("[name='" + n + "']");
        for (var i = 0; i < els.length; i++) {
          if (els[i].offsetParent !== null) return (els[i].value || "").trim();
        }
        return els.length ? (els[0].value || "").trim() : "";
      };
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
      form.reset();
      setTimeout(function () { window.open(waLink, "_blank"); }, 900);
    });
  });

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function () {
      header.style.boxShadow = window.scrollY > 8 ? "0 2px 16px rgba(0,31,63,.08)" : "none";
    });
  }
  });
})();
