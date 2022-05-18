import getPrdduct from "./functions/getProduct";
import {auth} from "./general";
import { onAuthStateChanged } from "firebase/auth";

const productInfoSection = document.getElementById("product__info");
const productAssetsSection = document.getElementById("product__assets");

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
    `
}

onAuthStateChanged(auth, async user =>{
    loadProduct();
})