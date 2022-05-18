import { auth, db } from "./general";
import { onAuthStateChanged } from "firebase/auth";
import { createOrder } from "./functions/cartOptions.js";
import { addProductToCart, getMyLocalCart } from "./functions/localCart.js";

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");
let cart = [];
let userLogged = undefined;
let total = 0;

const paymentCartForm = document.getElementById("paymentForm");


function loadCart(cart) {
    total = 0;
    cart.forEach(product => {
        renderProduct(product);
        total += (parseInt(product.price));
    });

    renderProduct

    totalSection.innerText = (total);
};

async function removeProduct(productId) {
    const newCart = cart.filter(product => product.id !== productId);
    
    cart = newCart;



    addProductToCart(newCart);

    cartSection.innerHTML = "";

    loadCart(newCart);

}


function renderProduct(product) {
    const productCart = document.createElement("li");
    productCart.className = "product";
    productCart.innerHTML = `

    <img src="${product.images[0]}" class="product__image">
    <div class="product__info">
    <h2 class="product__name"><strong>Name:</strong> ${product.name}</h2>
    <p class="product__size"><strong>Size:</strong> ${product.size}<p>
    <h3 class="product__price">Total: ${(product.price)}</h3>
    </div>
    <div class="product__options">
    <button class="product__edit">Edit</button>
    <button class="product__delete">X</button>
    </div>
    
    
    
    
    `;

    cartSection.appendChild(productCart);

    productCart.addEventListener("click", e => {
         if (e.target.tagName === "BUTTON" &&  e.target.className === "product__delete") {
             console.log("remove it!");
             removeProduct(product.id);
         }
        
    })
};

paymentCartForm.addEventListener('submit', async e =>{
    e.preventDefault();

    const town = paymentCartForm.town.value;
    const address = paymentCartForm.address.value;
    const card = paymentCartForm.card.value;
    const card_number = paymentCartForm.card_number.value;
    const userInfo = {
        name: userLogged.email,
        town,
        address,
        card,
        card_number,
    }

    if (userLogged) {
        await createOrder(db, userLogged.uid, cart,total, userInfo);
        cart = [];
        cartSection.innerHTML = "";
        loadCart(cart);
    } else {
        alert("inicia sesión :(")
    }
})

onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      userLogged = user;
      cart = getMyLocalCart();
      //cart = await getFirebaseCart(db, userLogged.uid);
    } else {
        cart = getMyLocalCart();  
      // User is signed out
      // ...
    }
    console.log(cart);
    loadCart(cart);

  });