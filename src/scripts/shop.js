import { db, auth } from "./general";
import { collection, getDocs } from "firebase/firestore";
import { getProducts } from "./functions/products";
import { addProductToCart, getMyLocalCart } from "./functions/localCart";
import { onAuthStateChanged } from "firebase/auth";

const productSection = document.getElementById("products");

let cart = [];

async function loadProducts() {
  const firebaseProducts = await getProducts(db);
  firebaseProducts.forEach(product => {
      renderProducts(product);
  });
  console.log(firebaseProducts);
}

function renderProducts(item) {
  const product = document.createElement("a");
  product.className = "product";

    product.setAttribute("href", `./product.html?id=${item.id}`);
  const coverImage = item.images ? item.images[0] : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKHyaPhxbC58gDd_ud3OBQIevPFg-IDKe2NgMoH9JlySF8QucB6lkGusAPp9GoLFlXAaA&usqp=CAU"
  
  product.innerHTML = `
            <img src="${coverImage}" class="product__image">
              <div class="product__info">
                <div class="product__info--visual">
                <h2 class="product__name">${item.name}</h2>
                <h3 class="product__description">${item.description}</h3>
                <h2 class="product__price">$ ${item.price}</h2>
                <button class="product__cart button button--1">Add</button>
                </div>
                  
              </div>
    `;
    productSection.appendChild(product);

    const product__cart = document.querySelector(".product__cart");

    product__cart.addEventListener("click",  (e) =>{
      console.log("click desde store")
        
        const newItem = {
            ...product,
            size: "Personal",
        }
        cart.push(newItem);
        addProductToCart(cart);
        window.location.href = "cart.html";
    })

}

onAuthStateChanged(auth, async user =>{
  loadProducts();
  cart = getMyLocalCart();
})

