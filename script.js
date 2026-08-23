const burgerMenu = document.getElementById("burgerMenu");
const navLinks = document.getElementById("navLinks");

burgerMenu.addEventListener("click", () => {
  burgerMenu.classList.toggle("active");
  navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burgerMenu.classList.remove("active");
    navLinks.classList.remove("active");
  });
});
document.addEventListener("scroll", () => {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop - 200 &&
        window.scrollY < sectionTop + sectionHeight - 200
      ) {
        link.style.color = "var(--primary-color)";
      } else {
        link.style.color = "var(--text-light)";
      }
    }
  });
});

document.querySelector(".nav-logo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
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

document
  .querySelectorAll(".skill-card, .project-card, .service-item, .step")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });
function showCookieBanner() {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;
  const consent = localStorage.getItem("cookie_consent");
  if (!consent) {
    banner.style.display = "block";
  }
}

function setCookieConsent(value) {
  localStorage.setItem("cookie_consent", value);
  const banner = document.getElementById("cookieBanner");
  if (banner) banner.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  showCookieBanner();

  const acceptBtn = document.getElementById("acceptCookies");
  const declineBtn = document.getElementById("declineCookies");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      setCookieConsent("accepted");
    });
  }

  if (declineBtn) {
    declineBtn.addEventListener("click", () => {
      setCookieConsent("declined");
    });
  }

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
