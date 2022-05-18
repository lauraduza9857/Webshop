import getPrdduct from "./functions/getProduct";
import {auth} from "./general";
import { onAuthStateChanged } from "firebase/auth";
import { addProductToCart, getMyLocalCart } from "./functions/localCart";

const productInfoSection = document.getElementById("product__info");
const productAssetsSection = document.getElementById("product__assets");

let cart = [];

function getParam(param){
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get(param);
    return productId;
}

async function loadProduct() {
    const productid = getParam("id");

    const data = await getPrdduct(productid);
    const product = {
        ...data,
        id: productid,
    }

    renderProduct(product);
}

function renderProduct(product) {
    let mainImage = document.createElement("img");

    mainImage.src = product.images[0];
    mainImage.className = "product__mainImage";
    mainImage.id = "mainImage";
    productAssetsSection.appendChild(mainImage);

    productInfoSection.innerHTML = `
    <h1 id="product__name">${product.name}</h1>
    <p id="product__review">${product.category}</p>
    <h3 id="product__price">${product.price}</h3>
    <p id="product__description">${product.description}</p>
    <form id="product__size">
        <input class="size__check" type="checkbox" id="personal" name="vehicle1" value="personal">
        <label for="vehicle1"> Personal</label><br>
        <input class="size__check" type="checkbox" id="couple" name="vehicle2" value="couple">
        <label for="vehicle2"> Couple</label><br>
        <input class="size__check" type="checkbox" id="family" name="vehicle3" value="family">
        <label for="vehicle3"> Family</label><br><br>
        <input type="submit" value="Añadir Producto">
</form>
    `


    const product__size = document.querySelector("#product__size");

    product__size.addEventListener("submit", async (e) =>{
        e.preventDefault();
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
    loadProduct();
    cart = getMyLocalCart();
})