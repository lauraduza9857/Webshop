import { db } from "./general";
import { collection, getDocs } from "firebase/firestore";
import { getProducts } from "./functions/products";

const productSection = document.getElementById("products");

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
                  <h2 class="product__name">${item.name}</h2>
                  <h3 class="product__description">${item.description}</h3>
                  <h2 class="product__price">$ ${item.price}</h2>
                  <button class="product__cart">Add</button>
              </div>
    `;
    productSection.appendChild(product);

}

loadProducts();
