'use strict';
// Prism swipe + live drag — does not touch theme code
const prism = document.getElementById("projectPrism");
const stage = document.querySelector(".prism-stage");

if (prism && stage) {
  let rotationStep = 3;
  let startX = 0;
  let currentDrag = 0;
  let isDragging = false;

  const anglePerSlide = 120;
  const startTilt = 0;
  const swipeThreshold = 50;
  const dragSensitivity = 0.28; // higher = rotates more while dragging

  
  function setPrismRotation(extraDragAngle = 0) {
  const angle = rotationStep * anglePerSlide + startTilt + extraDragAngle;

  // Normalize active face: 0, 1, or 2
  const active = ((rotationStep % 3) + 3) % 3;

  // Adjust these numbers until each face sits centered
  const offsets = [-200, 100, 100];

  prism.style.transform = `
    translateX(${offsets[active]}px)
    rotateY(${angle}deg)
  `;
}

  setPrismRotation();

  stage.addEventListener("pointerdown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentDrag = 0;

    stage.setPointerCapture?.(e.pointerId);
    prism.style.transition = "none"; // live movement, no lag
  });

  stage.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    currentDrag = e.clientX - startX;

    // negative drag = left, positive drag = right
    const liveAngle = currentDrag * dragSensitivity;
    setPrismRotation(liveAngle);
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
}
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

