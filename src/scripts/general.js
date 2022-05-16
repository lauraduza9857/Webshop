//Aqui va a quedar la conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Cosas necesarias para realizar la autenticación
import { getAuth } from "firebase/auth";
//Para la Base de datos
import { getFirestore } from "firebase/firestore";

import firebaseConfig from "../utils/firebase";

import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//constante para la autenticación
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage(app);

export{
    app,
    auth,
    db,
    storage

}