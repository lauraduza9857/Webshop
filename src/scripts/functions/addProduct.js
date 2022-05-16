import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";

//Funcion para agregar productos a la base de datos
async function addProduct(db, product) {
  try {
    await addDoc(collection(db, "products"), product);
    console.log("Producto creado en la base de datos");
  } catch (e) {
    console.log(e);
  }
}
//Subir las imagenes al storage
async function imageUploadReference(storage, image){

    const storageRef = ref(storage, `products/images/${image.name}`);
    return await uploadBytes(storageRef, image);
}

async function uploadImages(storage, images = []) {
  console.log(images);
    const uploadedImages =  images.map(async (image) => { 

        const imageReference = await imageUploadReference(storage, image);
        return getDownloadURL(ref(storage, imageReference.ref.fullPath));
    });

    //console.log(uploadedImages);

    return uploadedImages;
}
export { addProduct, uploadImages };
