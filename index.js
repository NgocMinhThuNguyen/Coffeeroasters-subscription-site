const mobileToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const disclosureBtns = document.querySelectorAll(".disclosure-btn");

function toggleDisplay(targetElement, isVisible) {
  if (isVisible.hasAttribute("data-visible")) {
    targetElement.setAttribute("aria-expanded", false);
  } else {
    targetElement.setAttribute("aria-expanded", true);
  }

  isVisible.toggleAttribute("data-visible");
}

// Mobile menu disclosure
mobileToggle.addEventListener("click", () => {
  toggleDisplay(mobileToggle, primaryNav);
})

// Create plan disclosure
disclosureBtns.forEach( (disclosureBtn) => {
  disclosureBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const disclosureContent = document.querySelector(`#${disclosureBtn.getAttribute("aria-control")}`);
    toggleDisplay(disclosureBtn, disclosureContent);
  })
})