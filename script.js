const burgerMenu = document.getElementById("burgerMenu");
const navLinks = document.getElementById("navLinks");

function closeNavigation() {
  if (!burgerMenu || !navLinks) return;
  burgerMenu.classList.remove("active");
  navLinks.classList.remove("active");
  burgerMenu.setAttribute("aria-expanded", "false");
  burgerMenu.setAttribute("aria-label", "Navigation öffnen");
}

if (burgerMenu && navLinks) {
  burgerMenu.addEventListener("click", () => {
    const isOpen = burgerMenu.getAttribute("aria-expanded") === "true";
    burgerMenu.classList.toggle("active", !isOpen);
    navLinks.classList.toggle("active", !isOpen);
    burgerMenu.setAttribute("aria-expanded", String(!isOpen));
    burgerMenu.setAttribute(
      "aria-label",
      isOpen ? "Navigation öffnen" : "Navigation schließen",
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNavigation);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      burgerMenu.getAttribute("aria-expanded") === "true"
    ) {
      closeNavigation();
      burgerMenu.focus();
    }
  });
}
function updateActiveNavigation() {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if (!links.length) return;

  const scrollMarker = window.scrollY + 200;
  const reachedPageEnd =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  let activeLink = null;

  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section && section.offsetTop <= scrollMarker) {
      activeLink = link;
    }
  });

  if (reachedPageEnd) {
    activeLink = links.at(-1);
  }

  links.forEach((link) => {
    const isActive = link === activeLink;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

document.addEventListener("scroll", updateActiveNavigation, { passive: true });
window.addEventListener("resize", updateActiveNavigation);
updateActiveNavigation();

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document
    .querySelectorAll(".skill-card, .project-card, .service-item, .step")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });
}
document.addEventListener("DOMContentLoaded", () => {
  const revealBtn = document.getElementById("revealPhoneBtn");
  if (revealBtn) {
    const phoneNumber = "[private phone number removed]";
    revealBtn.addEventListener("click", () => {
      const placeholder = document.getElementById("phonePlaceholder");
      if (!placeholder) return;
      const revealed = revealBtn.getAttribute("data-revealed") === "1";
      if (!revealed) {
        placeholder.textContent = phoneNumber;
        revealBtn.textContent = "Verbergen";
        revealBtn.setAttribute("aria-expanded", "true");
        revealBtn.setAttribute("data-revealed", "1");
      } else {
        placeholder.textContent = "Auf Anfrage";
        revealBtn.textContent = "Anzeigen";
        revealBtn.setAttribute("aria-expanded", "false");
        revealBtn.removeAttribute("data-revealed");
      }
    });
  }
});
