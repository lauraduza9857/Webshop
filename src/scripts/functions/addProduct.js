import { addDoc, collection } from "firebase/firestore";
//cómo no me quería dar tuve que importar de nuevo aqui
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../utils/firebase";
import { initializeApp } from "firebase/app";

/*const app = initializeApp(firebaseConfig);
const db = getFirestore(app);*/


async function addProduct(db, product) {
  try {
    await addDoc(collection(db, "products"), product);
    console.log("Producto creado en la base de datos");
  } catch (e) {
    console.log(e);
  }
}
async function uploadImages(images = []) {
  console.log(images);
}
export { addProduct, uploadImages };
