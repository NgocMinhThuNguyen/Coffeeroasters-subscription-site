const mobileToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const disclosureBtns = document.querySelectorAll(".disclosure-btn");
const options = document.querySelectorAll("[type=radio]");
const grindOptText = document.querySelector("[data-name=grind-opt]");

const orderSummary = {
  "preferences": "",
  "bean-types": "",
  "quantity": "",
  "grind-opt": "",
  "delivery": "",
  "shipping-price": "",
}

function toggleDisplay(targetElement, isVisible) {
  if (isVisible.hasAttribute("data-visible")) {
    targetElement.setAttribute("aria-expanded", false);
  } else {
    targetElement.setAttribute("aria-expanded", true);
  }

  isVisible.toggleAttribute("data-visible");
}

function checkOrder(orderSummary) {
  const grindDisclosureBtn = document.querySelector("[aria-control=grind-opt");
  const grindContent = document.querySelector("#grind-opt");
  
  if (orderSummary["preferences"] === "capsule") {
    grindDisclosureBtn.setAttribute("disabled", null);
    grindDisclosureBtn.setAttribute("aria-expaned", false);
    grindContent.removeAttribute("data-visible");
    orderSummary["grind-opt"] = "";
    grindInputs = grindContent.querySelectorAll("input");
    grindInputs.forEach(grindInput => {
      grindInput.checked = false;
    })
  } else {
    grindDisclosureBtn.removeAttribute("disabled", null);
  }

  if(orderSummary["quantity"] !== "") {
    updateShippingPrice(orderSummary["quantity"])
  }
}

function updateShippingPrice(number) {
  const shippingPrices = {
    "250": {
      "every-week": "7.20",
      "every-2-week": "9.60",
      "every-month": "12.00",
    },
    "500": {
      "every-week": "13.00",
      "every-2-week": "17.50",
      "every-month": "22.00",
    },
    "1000": {
      "every-week": "22.00",
      "every-2-week": "32.00",
      "every-month": "42.00",
    }
  }

  const frequencies = document.querySelectorAll("[name=delivery] + label");
  frequencies.forEach( frequency => {
    const shipPrice = frequency.querySelector(".shipment-price");
    shipPrice.textContent = `${shippingPrices[number][frequency.getAttribute("for")]}`;
  });
  orderSummary["shipping-price"] = shippingPrices[number][orderSummary["delivery"]];
}

function displayOrder(optionName, orderSummary) {
  const blank = document.querySelector(`[data-name=${optionName}]`);
  const grindOptBlank = document.querySelector("[data-name=grind-opt");
  
  if (orderSummary["preferences"] === "capsule") {
    grindOptBlank.classList.add("hidden");
  } else {
    grindOptBlank.classList.remove("hidden");
  }

  if (optionName === "quantity") {
    blank.innerHTML = `${orderSummary[optionName]}g`;
  } else {
    blank.innerHTML = `${orderSummary[optionName].replace(/-/g, " ")}`;
  } 
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
    optionName = option.getAttribute("name");
    orderSummary[optionName] = option.dataset.value;
    checkOrder(orderSummary);
    displayOrder(optionName, orderSummary);
  })
})