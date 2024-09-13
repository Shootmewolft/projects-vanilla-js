import { addProduct } from "./components/addProduct.js";
import { addProductCart, numberProduct } from "./components/addProductCart.js";
import { removeProductCart } from "./components/removeProductCart.js";
import { addConfirmOrder } from "./components/confirmationOrder.js";

addProduct();

const btnCart = document.querySelectorAll(".product--cart");
const btnNumbers = document.querySelectorAll(".product--add-remove");
const products = document.querySelectorAll("#cart-products");
const confirmOrder = document.querySelector("#confirm-order");

function handlerEvents(buttons, eventType, callback) {
  buttons.forEach((button, index) => {
    button.addEventListener(eventType, (event) =>
      callback(button, index, event)
    );
  });
}

handlerEvents(btnCart, "click", (btnCart, index) =>
  addProductCart(btnCart, index, btnNumbers)
);

handlerEvents(btnNumbers, "click", (btnNumber, index, event) =>
  numberProduct(btnNumber, index, event, btnCart)
);

handlerEvents(products, "click", (product, index, event) =>
  removeProductCart(product, index, event)
);

confirmOrder.addEventListener("click", () => addConfirmOrder());