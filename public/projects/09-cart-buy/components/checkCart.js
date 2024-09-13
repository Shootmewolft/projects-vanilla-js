import {data} from "../data.js";
import { activeOrder } from "./addProductCart.js";

export const totalProducts = document.querySelector("#products-selected");
export const cartProducts = document.querySelector("#cart-products");
export const totalPrice = document.querySelector("#total-price");

export function checkCart(index, productNumbersToAdd) {
  const currentProduct = data[index];
  const productCart = `
    <article class="check-cart-product-container" id="${currentProduct.id}">
      <h3 class="check-cart-product-name" id="name-product-cart">${currentProduct.name}</h3>
      <div class="check-cart-product-data" id="data-product">
        <span class="check-cart-product-quantity" id="final-number">${productNumbersToAdd}x</span>
        <span class="check-cart-product-price-info">@ $${currentProduct.price}</span>
        <span class="check-cart-product-final-price" id="price-final">$${currentProduct.price}</span>
        <img src="assets/images/icon-remove-item.svg" class="icon-remove-item" id="btn-delete-product">
      </div>
    </article>
`;
  const currentCartProduct = cartProducts.querySelector(
    `#${currentProduct.id}`
  );
  let productExists = false;
  for (let product of cartProducts.children) {
    if (product.id === currentProduct.id) {
      const productFinalNumber =
        currentCartProduct.querySelector("#final-number");
      const productFinalPrice =
        currentCartProduct.querySelector("#price-final");
      productFinalPrice.textContent = `$${
        currentProduct.price * productNumbersToAdd
      }`;
      productFinalNumber.textContent = `${productNumbersToAdd}x`;
      productExists = true;
      break;
    }
  }
  if (!productExists && activeOrder && productNumbersToAdd !== 0) {
    cartProducts.innerHTML += productCart;
  }
  try {
    if (
      (!activeOrder && productNumbersToAdd < 1) ||
      productNumbersToAdd === 0
    ) {
      currentCartProduct.remove();
    }
  } catch (error) {
    const errorEmptyList = new Error("Error", error);
  }
  checkProducts();
}

function checkProducts() {
  let products = 0;
  let price = 0;
  for (let product of cartProducts.children) {
    const productFinalNumber = product
      .querySelector("#final-number")
      .textContent.replace(/[^0-9]+/g, "");
    products += Number(productFinalNumber);
    const productFinalPrice = product
      .querySelector("#price-final")
      .textContent.replace("$", "");
    price += Number(productFinalPrice);
  }
  totalProducts.textContent = "";
  totalProducts.textContent = `${products}x`;
  totalPrice.textContent = "";
  totalPrice.textContent = `$${price}`;
}
