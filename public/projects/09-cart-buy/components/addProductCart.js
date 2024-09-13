import { checkCart } from "./checkCart.js";
export let activeOrder = false;

export function addProductCart(btnCart, index, btnNumbers) {
  const btnNumberCurrent = btnNumbers[index];
  btnCart.style.display = "none";
  btnNumberCurrent.style.display = "flex";
  activeOrder = true;
}

export function numberProduct(btnNumber, index, event, btnCart) {
  let productNumbersToAdd = btnNumber.querySelector("span");
  const btnChange = event.target;
  if (btnChange.classList.contains("icon-decrement-quantity")) {
    if (productNumbersToAdd.textContent === "0") {
      btnCart[index].style.display = "flex";
      btnNumber.style.display = "none";
      productNumbersToAdd.textContent = "0";
      activeOrder = false;
    } else {
      productNumbersToAdd.textContent--;
    }
  } else if (btnChange.classList.contains("icon-increment-quantity")) {
    productNumbersToAdd.textContent++;
  }
  productNumbersToAdd = Number(productNumbersToAdd.textContent);
  checkCart(index, productNumbersToAdd);
}
