document.addEventListener("DOMContentLoaded", function () {
  // Navbar toggle (keeps existing behavior without Bootstrap JS)
  const toggler = document.querySelector(".navbar-toggler");
  const menu = document.querySelector("#mainNav");
  if (toggler && menu) {
    toggler.addEventListener("click", function () {
      menu.classList.toggle("show");
    });
  }

  // Animate on Scroll using IntersectionObserver
  const aosElements = Array.from(document.querySelectorAll(".aos"));
  if ("IntersectionObserver" in window && aosElements.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aos-show");
            obs.unobserve(entry.target); // one-pass: do not hide again
          }
        });
        // If all elements have been shown, disconnect observer
        if (aosElements.every((el) => el.classList.contains("aos-show"))) {
          obs.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px", // show slightly before fully in view
        threshold: 0.1,
      }
    );

    aosElements.forEach((el) => observer.observe(el));
  } else {
    // Fallback: reveal instantly if IO not supported
    aosElements.forEach((el) => el.classList.add("aos-show"));
  }

  // Preloader fade out on window load
  window.addEventListener("load", function () {
    let preloader = document.getElementById("preloader");
    let mainContent = document.querySelector("main");
    let navbar = document.querySelector("nav");

    if (preloader) {
      if (mainContent) mainContent.style.display = "block";
      if (navbar) navbar.style.display = "flex";

      preloader.style.opacity = "0";

      setTimeout(function () {
        preloader.style.display = "none";
      }, 800);
    }
  });

  // Dark mode toggle with persistence
  const THEME_KEY = "theme-preference";
  const root = document.body;
  const btn = document.getElementById("theme-toggle");
  const setIcon = () => {
    if (!btn) return;
    const i = btn.querySelector("i");
    if (!i) return;
    // Toggle icon classes for basic feedback
    if (root.classList.contains("dark")) {
      i.classList.remove("bi-sun");
      i.classList.add("bi-moon-stars");
    } else {
      i.classList.remove("bi-moon-stars");
      i.classList.add("bi-sun");
    }
  };

  // Restore preference on load
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark") {
      root.classList.add("dark");
    } else if (saved === "light") {
      root.classList.remove("dark");
    }
  } catch (e) {
    // ignore storage errors (e.g., privacy mode)
  }
  setIcon();

  if (btn) {
    btn.addEventListener("click", () => {
      root.classList.toggle("dark");
      setIcon();
      try {
        localStorage.setItem(
          THEME_KEY,
          root.classList.contains("dark") ? "dark" : "light"
        );
      } catch (e) {
        // ignore storage errors
      }
    });
  }
});
