const mobileToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");

mobileToggle.addEventListener("click", () => {
  if(primaryNav.hasAttribute("data-visible")) {
    mobileToggle.setAttribute("aria-expanded", false);
  } else {
    mobileToggle.setAttribute("aria-expanded", true);
  }

  primaryNav.toggleAttribute("data-visible");
})