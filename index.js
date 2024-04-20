const mobileToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const disclosureBtns = document.querySelectorAll(".disclosure-btn");
const options = document.querySelectorAll("[type=radio]");
const grindOptText = document.querySelector("[data-name=grind-opt]");

function toggleDisplay(targetElement, isVisible) {
  if (isVisible.hasAttribute("data-visible")) {
    targetElement.setAttribute("aria-expanded", false);
  } else {
    targetElement.setAttribute("aria-expanded", true);
  }

  isVisible.toggleAttribute("data-visible");
}

function displayPlan(option) {
  const optionName = option.getAttribute("name");
  const blank = document.querySelector(`[data-name=${optionName}]`);

  blank.innerHTML = `${option.dataset.value}`;
}

// Mobile menu disclosure
mobileToggle.addEventListener("click", () => {
  toggleDisplay(mobileToggle, primaryNav);
})

// Plan disclosure
disclosureBtns.forEach( (disclosureBtn) => {
  disclosureBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const disclosureContent = document.querySelector(`#${disclosureBtn.getAttribute("aria-control")}`);
    toggleDisplay(disclosureBtn, disclosureContent);
  })
})

// Selection update
options.forEach( (option) => {
  option.addEventListener("change", () => {
    checkOption(option);
    displayPlan(option);
  })
})

function checkOption(option) {
  const grindOptDisclosure = document.querySelector("[aria-control=grind-opt");
  const grindOptContent = document.querySelector(`#${grindOptDisclosure.getAttribute("aria-control")}`);
  const optionValue = option.dataset.value;


  // "Capsule" selection
  if ( optionValue === "Capsule") {
    grindOptDisclosure.setAttribute("disabled", null);
    grindOptDisclosure.setAttribute("aria-expaned", false);
    grindOptContent.removeAttribute("data-visible");
    grindOptText.classList.add("hidden");
  } else {
    grindOptDisclosure.removeAttribute("disabled", null);
    grindOptText.classList.remove("hidden");
  }

  // Weight selection
  if (option.getAttribute("name") === "quantity") {
    updateShipment(optionValue);
  }
}

function updateShipment(optionValue) {
  const shippingPrices = {
    "250g": {
      "every-week": "7.20",
      "every-2-week": "9.60",
      "every-month": "12.00",
    },
    "500g": {
      "every-week": "13.00",
      "every-2-week": "17.50",
      "every-month": "22.00",
    },
    "1000g": {
      "every-week": "22.00",
      "every-2-week": "32.00",
      "every-month": "42.00",
    }
  }

  const frequencies = document.querySelectorAll("[name=delivery] + label");
  frequencies.forEach( frequency => {
    const shipPrice = frequency.querySelector(".shipment-price");
    shipPrice.textContent = `${shippingPrices[optionValue][frequency.getAttribute("for")]}`;
  });
}
