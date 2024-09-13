import {data} from '../data.js'
const products = document.querySelector("#products");

export function addProduct() {
  data.forEach((item) => {
    const product = `
    <article class="product-addProduct">
      <picture>
        <img src="${item.image.desktop}" alt="product"/>
      </picture>
      <div class="product--cart product">
        <img src="assets/images/icon-add-to-cart.svg" alt="cart" />
        <span class="font-bold">Add to Cart</span>
      </div>
      <div class="product product--add-remove">
        <img src="assets/images/icon-decrement-quantity.svg" alt="cart++" class="icon-decrement-quantity"/>
        <span id="productsToAdd">0</span>
        <img src="assets/images/icon-increment-quantity.svg" alt="cart++" class="icon-increment-quantity"/>
      </div>
      <div class="product-info">
        <span>${item.category}</span>
        <span id="name-product">${item.name}</span>
        <span>$${item.price}</span>
      </div>
    </article>`;
    products.innerHTML += product;
  });
}
