import { totalPrice } from "./checkCart.js";
import { cartProducts } from "./checkCart.js";
import {data} from "../data.js";

export function addConfirmOrder(){
  const products = document.querySelector('#confirmation-products')
  const total = document.querySelector('#total-confirm-order')
  if (cartProducts.children.length === 0){
    const windowConfirmation = document.querySelector('#confirmation-order')
    alert('El carrito de compras está vacío. Por favor, seleccione productos.')
    windowConfirmation.style.display = "None"
    location.reload()
    return
  }
  for (let product of cartProducts.children){
    const numberProduct = product.querySelector('#final-number').textContent
    const idProduct = product.id
    const totalPriceProduct = product.querySelector('#price-final').textContent
    data.forEach(product => {
      if (product.id === idProduct){
          const productToAdd = `
            <article class="product-container" id="product-confirmation">
              <div class="product-details">
                <img src="${product.image.thumbnail}" alt="image-product" id="image-product-confirmation">
                <div class="product-info">
                  <h2 class="product-name">${product.name}</h2>
                  <div class="product-pricing">
                    <span class="product-quantity">${numberProduct}</span>
                    <span class="product-price">@ $${product.price}</span>
                  </div>
                </div>
              </div>
              <span class="total-price">${totalPriceProduct}</span>
            </article>`
            products.innerHTML += productToAdd
      }
    })
  }
  total.textContent = totalPrice.textContent
}