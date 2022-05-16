import {app, auth, db, storage} from "./general";

import { addProduct, uploadImages } from "./functions/addProduct";



//console.log(storage);

//Seleccionamos el Formulario de createProduct a trves de js
const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  //console.log("Create a new product");

  const name = createProductForm.name.value;
  const description = createProductForm.description.value;
  const category = createProductForm.category.value;
  const price = createProductForm.price.value;
  const images = createProductForm.images.files;

  let gallery = [];

  if (images.length) {
    //Subir Imagen al Firestore
    const uploadedImages = await uploadImages(storage, [...images]);
    gallery = await Promise.all(uploadedImages);
  }

 // console.log(uploadedImages);

  //Creamos un objeto con toda la información recogida

  const newProduct = {
    name,
    description,
    category,
    price,
    images: gallery,
  };

  await addProduct(db, newProduct);

  console.log(newProduct);
});
