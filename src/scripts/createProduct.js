import { initializeApp } from "firebase/app";
//Cosas necesarias para realizar la autenticación
import { getAuth } from "firebase/auth";
//Para la Base de datos
import { getFirestore } from "firebase/firestore";

import firebaseConfig from "../utils/firebase";

import { addProduct, uploadImages } from "./functions/addProduct";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


//Seleccionamos el Formulario de createProduct a trves de js
const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //console.log("Create a new product");

  const name = createProductForm.name.value;
  const description = createProductForm.description.value;
  const category = createProductForm.category.value;
  const images = createProductForm.images.files;
/*
  if (images.length){
    //Subir Imagen al Firestore
    await uploadImages(images);
    }*/
  //Creamos un objeto con toda la información recogida

  const newProduct = {
    name,
    description,
    category,
    images
  };

  await addProduct (db, newProduct);

  console.log(newProduct);
});
