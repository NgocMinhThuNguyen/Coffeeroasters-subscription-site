const mobileToggle = document.querySelector(".mobile-nav-toggle");
const primaryNav = document.querySelector(".primary-nav");
const disclosureBtns = document.querySelectorAll(".disclosure-btn");
const options = document.querySelectorAll("[type=radio]");
const grindOptText = document.querySelector("[data-name=grind-opt]");
const planForm = document.querySelector(".plan-form");
const modal = document.querySelector("#modal");
const submitBtn = document.querySelector("[type=submit]");
const closeModalBtns = document.querySelectorAll(".close-modal-btn");

const orderSummary = {
  "preferences": "",
  "bean-types": "",
  "quantity": "",
  "grind-opt": "",
  "delivery": "",
  "shipping-price": "",
  "total-cost": "",
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

  // update shipping price
  frequencies.forEach( frequency => {
    const shipPrice = frequency.querySelector(".shipment-price");
    shipPrice.textContent = `${shippingPrices[number][frequency.getAttribute("for")]}`;
  });

  // calculate shipping cost
  orderSummary["shipping-price"] = shippingPrices[number][orderSummary["delivery"]];
  let shippingPrice = parseFloat(orderSummary["shipping-price"]*100);

    if (orderSummary["delivery"] === "every-week") {
      orderSummary["total-cost"] = ((shippingPrice*4)/100).toFixed(2).toString();
    } else if (orderSummary["delivery"] === "every-2-week") {
      orderSummary["total-cost"] = ((shippingPrice*2)/100).toFixed(2).toString();
    } else if (orderSummary["delivery"] === "every-month") {
      orderSummary["total-cost"] = (shippingPrice/100).toFixed(2).toString();
    }
}

function displayOrder(optionName, orderSummary) {
  const blanks = document.querySelectorAll(`[data-name=${optionName}]`);
  const grindOptBlanks = document.querySelectorAll("[data-name=grind-opt");

  if (optionName === "preferences") {
    if (orderSummary[optionName] === "capsule") {
      grindOptBlanks.forEach ( grindOptBlank => {
        grindOptBlank.classList.add("hidden");
        grindOptBlank.textContent = "";
      }) 
    } else {
      grindOptBlanks.forEach ( grindOptBlank => {
        grindOptBlank.classList.remove("hidden");
        if (orderSummary["grind-opt"] === "") {
          grindOptBlank.textContent = "_____";
        }
      })
    }
    blanks.forEach(blank => {
      blank.textContent = `${orderSummary[optionName].replace(/-/g, " ")}`;
    });
  } else if (optionName === "quantity") { 
    blanks.forEach(blank => {
      blank.textContent = `${orderSummary[optionName]}g`; // add "g" unit
    })
  } else {
    blanks.forEach(blank => {
      blank.textContent = `${orderSummary[optionName].replace(/-/g, " ")}`; // replace "-" dash with space
    })
  }

  // update total cost
  totalCosts = document.querySelectorAll("[data-name=shipping-cost");
  totalCosts.forEach( totalCost => {
    totalCost.textContent = orderSummary["total-cost"];
  })
}

function enableSubmitBtn(submitBtn) {
  blanks = document.querySelectorAll(".summary-wrapper [data-name]");
  let isBlank = true;

  blanks.forEach(blank => {
    if (blank.textContent === "_____") {
      isBlank = false;
    }
  })

  if (isBlank) {
    submitBtn.removeAttribute("disabled", null);
    planForm.addEventListener("submit", (e) => {
      e.preventDefault();
      modal.showModal();
    })
  } else {
    submitBtn.setAttribute("disabled", null);
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
    enableSubmitBtn(submitBtn);
  })
})

// Close modal
closeModalBtns.forEach( closeModalBtn => {
  closeModalBtn.addEventListener("click", () => {
    modal.close();
  })
})

