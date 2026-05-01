'use strict';

document.addEventListener("DOMContentLoaded", () => {
  // Prism swipe + live drag
  const prism = document.getElementById("projectPrism");
  const stage = document.querySelector(".prism-stage");

  if (!prism || !stage) return;

  let rotationStep = 3;
  let startX = 0;
  let currentDrag = 0;
  let isDragging = false;
  let moved = false;

  const anglePerSlide = 120;
  const startTilt = 0;
  const swipeThreshold = 50;
  const dragSensitivity = 0.28;

  function setPrismRotation(extraDragAngle = 0) {
    const angle = rotationStep * anglePerSlide + startTilt + extraDragAngle;
    prism.style.transform = `rotateY(${angle}deg)`;
  }

  setPrismRotation();

  stage.addEventListener("pointerdown", (e) => {
    isDragging = true;
    moved = false;
    startX = e.clientX;
    currentDrag = 0;
    prism.style.transition = "none";
  });

  stage.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    currentDrag = e.clientX - startX;

    if (Math.abs(currentDrag) > 8) {
      moved = true;
    }

    setPrismRotation(currentDrag * dragSensitivity);
  });

  document.addEventListener("pointerup", () => {
    if (!isDragging) return;

    prism.style.transition = "transform .8s ease";

    if (currentDrag < -swipeThreshold) {
      rotationStep--;
    }

    if (currentDrag > swipeThreshold) {
      rotationStep++;
    }

    setPrismRotation();
    isDragging = false;
  });

  document.addEventListener("pointercancel", () => {
    if (!isDragging) return;

    prism.style.transition = "transform .8s ease";
    setPrismRotation();
    isDragging = false;
  });

  // Link taps work, but swipes do not accidentally click
  document.querySelectorAll(".prism-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (moved) {
        e.preventDefault();
      }
    });
  });
});



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

