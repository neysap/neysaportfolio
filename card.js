(function () {
  const KEY  = "theme";
  const root = document.documentElement;
  const btn  = document.getElementById("themeToggle");

  function setTheme(next){
    root.setAttribute("data-theme", next);
    localStorage.setItem(KEY, next);
    if (btn){
      const isDark = next === "dark";
      const sun  = btn.querySelector(".sun");
      const moon = btn.querySelector(".moon");
      if (sun)  sun.style.display  = isDark ? "inline" : "none";
      if (moon) moon.style.display = isDark ? "none"   : "inline";
    }
  }

  // initialize from saved preference (fallback to light)
  const saved = localStorage.getItem(KEY) || "light";
  setTheme(saved);

  // toggle
  btn?.addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });
})();

