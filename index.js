const mobileToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const disclosureBtn = document.querySelector(".disclosure-btn");
const disclosureContent = document.querySelector(".disclosure-content");

function toggleDisplay(targetElement, isVisible) {
  if (isVisible.hasAttribute("data-visible")) {
    targetElement.setAttribute("aria-expanded", false);
  } else {
    targetElement.setAttribute("aria-expanded", true);
  }

  isVisible.toggleAttribute("data-visible");
}

mobileToggle.addEventListener("click", () => {
  toggleDisplay(mobileToggle, primaryNav);
})

disclosureBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleDisplay(disclosureBtn, disclosureContent);
})