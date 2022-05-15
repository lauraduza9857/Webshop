import {addDoc, collection} from "firebase/firestore";

async function addProduct(db,product){
    try{
    await addDoc(collection(db, "products"), product);
    }catch(e){
        console.log(e);
    }
    console.log("Producto creado en la base de datos")
}

export {

    addProduct,
}