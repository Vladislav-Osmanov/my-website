document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");
  const themeToggle = document.getElementById("theme-toggle");
  const htmlElement = document.documentElement;

  // Восстановление темы из localStorage, если есть
  htmlElement.classList.remove("dark-theme");
  themeToggle.setAttribute("aria-pressed", "false");

  // Переключение темы
  themeToggle.addEventListener("click", () => {
    const isDark = htmlElement.classList.toggle("dark-theme");
    themeToggle.setAttribute("aria-pressed", isDark);
  });

  function toggleMenu() {
    const expanded = burger.getAttribute("aria-expanded") === "true" || false;
    burger.setAttribute("aria-expanded", !expanded);
    burger.classList.toggle("open");
    mobileMenu.classList.toggle("active");
    mobileMenu.hidden = !mobileMenu.classList.contains("active");
    overlay.hidden = !mobileMenu.classList.contains("active");

    const links = mobileMenu.querySelectorAll("a");
    links.forEach(link => {
      link.tabIndex = mobileMenu.classList.contains("active") ? 0 : -1;
    });
  }

  burger.addEventListener("click", toggleMenu);

  overlay.addEventListener("click", () => {
    burger.setAttribute("aria-expanded", false);
    burger.classList.remove("open");
    mobileMenu.classList.remove("active");
    mobileMenu.hidden = true;
    overlay.hidden = true;
    const links = mobileMenu.querySelectorAll("a");
    links.forEach(link => (link.tabIndex = -1));
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
      burger.setAttribute("aria-expanded", false);
      burger.classList.remove("open");
      mobileMenu.classList.remove("active");
      mobileMenu.hidden = true;
      overlay.hidden = true;
      const links = mobileMenu.querySelectorAll("a");
      links.forEach(link => (link.tabIndex = -1));
      burger.focus();
    }
  });
});
