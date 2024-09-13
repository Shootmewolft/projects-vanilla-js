import { totalPrice } from "./checkCart.js";
import { totalProducts } from "./checkCart.js";

const products = document.querySelector("#products");

export function removeProductCart(product, index, event) {
  const btnNumbers = document.querySelectorAll("#productsToAdd");
  if (event.target.classList.contains("icon-remove-item")) {
    const currentProduct = event.target.parentNode.parentNode;
    const currentProductName =
      currentProduct.querySelector("#name-product-cart").textContent;
    const numberProduct = Number(
      currentProduct.querySelector("#final-number").textContent.replace("x", "")
    );
    const totalProductsNumber = Number(
      totalProducts.textContent.replace("x", "")
    );
    totalProducts.textContent = `${totalProductsNumber - numberProduct}x`;
    const totalPriceProduct = Number(
      currentProduct.querySelector("#price-final").textContent.replace("$", "")
    );
    const totalPriceNumber = Number(totalPrice.textContent.replace("$", ""));
    totalPrice.textContent = `$${totalPriceNumber - totalPriceProduct}`;

    currentProduct.remove();
    let index = 0;
    for (let product of products.children) {
      const nameProduct = product.querySelector("#name-product").textContent;
      if (nameProduct === currentProductName) {
        btnNumbers[index].textContent = "0";
        break;
      }
      index++;
    }
  }
}
