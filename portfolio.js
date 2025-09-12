// portfolio.js
// Author: [Neysap]
// Description: Portfolio main JavaScript file

'use strict';

document.getElementById("card-js").addEventListener("click", function() {
    window.location.href = "JavaScript.html";
});
document.getElementById("card-java").addEventListener("click", function() {
    window.location.href = "java.html";
});
document.getElementById("card-c").addEventListener("click", function() {
    window.location.href = "C.html";
});
document.getElementById("card-python").addEventListener("click", function() {
    window.location.href = "python.html";
});
document.getElementById("nav-home").addEventListener("click", function() {
    window.location.href = "python.html";
});

//GLOBAL Nav Behavior
document.getElementById("nav-home").addEventListener("click", function() {
    window.location.href = "index.html";
});

(function () {
  const KEY = "theme";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  // initial: saved > system preference > light
  const saved = localStorage.getItem(KEY);
  const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", saved || (prefersDark ? "dark" : "light"));

  const updateIcons = () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    if (btn) {
      btn.querySelector(".sun").style.display  = isDark ? "inline" : "none";
      btn.querySelector(".moon").style.display = isDark ? "none"   : "inline";
    }
  };
  updateIcons();

  btn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    updateIcons();
  });

  // keep in sync with OS if user hasn't explicitly chosen
  if (!saved) {
    matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
      root.setAttribute("data-theme", e.matches ? "dark" : "light");
      updateIcons();
    });
  }
})();