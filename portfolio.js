'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // card click handlers — only attach if elements exist on this page
  const attachClick = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', () => { window.location.href = href; });
  };
  attachClick("card-js", "Javascript.html");
  attachClick("card-java", "java.html");
  attachClick("card-c", "C.html");
  attachClick("card-python", "python.html");

  // Global nav: go to index if nav-home exists
  const navHome = document.getElementById("nav-home");
  if (navHome) {
    navHome.addEventListener("click", () => { window.location.href = "index.html"; });
  }
});

(() => {
  try {
    const KEY = "theme";
    const root = document.documentElement;
    const btn = document.getElementById("themeToggle");

    // initial: saved > system preference > light
    // If an inline head script already set data-theme, don't override it.
    const saved = localStorage.getItem(KEY);
    const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
    if (!root.hasAttribute('data-theme')) {
      root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));
    }

    const updateIcons = () => {
      const isDark = root.getAttribute("data-theme") === "dark";
      if (!btn) return;
      const sun = btn.querySelector(".sun");
      const moon = btn.querySelector(".moon");
      if (sun) sun.style.display  = isDark ? "inline" : "none";
      if (moon) moon.style.display = isDark ? "none"   : "inline";
    };
    updateIcons();

    if (btn) {
      btn.addEventListener("click", () => {
        const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        localStorage.setItem(KEY, next);
        updateIcons();
      });
    }

    // keep in sync with OS if user hasn't explicitly chosen
    if (!saved) {
      const mq = matchMedia("(prefers-color-scheme: dark)");
      if (typeof mq.addEventListener === 'function') {
        mq.addEventListener("change", e => {
          root.setAttribute("data-theme", e.matches ? "dark" : "light");
          updateIcons();
        });
      } else if ('onchange' in mq) {
        mq.onchange = e => {
          root.setAttribute("data-theme", e.matches ? "dark" : "light");
          updateIcons();
        };
      }
    }
  } catch (e) {
    // fail silently — don't let JS errors break other scripts
    console.error('portfolio.js error', e);
  }
})();