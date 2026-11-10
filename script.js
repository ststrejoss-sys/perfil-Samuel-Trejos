document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.lucide) {
  window.lucide.createIcons();
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        navAnchors.forEach((link) => link.classList.toggle("active", link === activeLink));
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });

  document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Abrir menú" : "Cerrar menú");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Abrir menú");
      navLinks.classList.remove("is-open");
    });
  });
}

const typedRole = document.querySelector(".typed-role");
if (typedRole && !reducedMotion) {
  const phrases = ["APRENDIENDO CADA DÍA", "EXPLORANDO LA TECNOLOGÍA", "IMAGINANDO LO QUE SIGUE"];
  let phraseIndex = 0;
  let characterIndex = 0;
  let deleting = false;

  const typeNextCharacter = () => {
    const phrase = phrases[phraseIndex];
    characterIndex += deleting ? -1 : 1;
    typedRole.textContent = phrase.slice(0, characterIndex);

    if (characterIndex === phrase.length) {
      deleting = true;
      window.setTimeout(typeNextCharacter, 1500);
    } else if (characterIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(typeNextCharacter, 350);
    } else {
      window.setTimeout(typeNextCharacter, deleting ? 35 : 72);
    }
  };

  typeNextCharacter();
} else if (typedRole) {
  typedRole.textContent = "APRENDIENDO CADA DÍA";
}

if (!reducedMotion) {
  const hero = document.querySelector(".hero");
  let frameRequested = false;

  window.addEventListener("scroll", () => {
    if (!frameRequested) {
      frameRequested = true;
      window.requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.08, 34);
        hero.style.setProperty("--parallax-y", `${offset}px`);
        frameRequested = false;
      });
    }
  }, { passive: true });
}
