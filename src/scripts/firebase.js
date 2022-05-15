//Aqui va a quedar la conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Cosas necesarias para realizar la autenticación
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
//Para la Base de datos
import { getFirestore } from "firebase/firestore";

//Importo funciones desde auth
import { login, createUser, addUserInformationDb } from "./auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKPHVIa9T5H2VkqAvvj5gE3ljgRlPwPYs",
  authDomain: "web-shop-143ff.firebaseapp.com",
  projectId: "web-shop-143ff",
  storageBucket: "web-shop-143ff.appspot.com",
  messagingSenderId: "61986115608",
  appId: "1:61986115608:web:f844e941fbcad17f17b36d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//constante para la autenticación
const auth = getAuth();
const db = getFirestore(app);

// Creo un listener del formulario de crear usuario nuevo
const createUserForm = document.getElementById("createUserForm");

const loginUserForm = document.getElementById("loginForm");

createUserForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Usuario Creado");
  //cuando el usurio oprima el boton de submit llamamos la funcion que crea el usurio

  const name = createUserForm.name.value;
  const username = createUserForm.username.value;
  const email = createUserForm.email.value;
  const password = createUserForm.password.value;
  const newUser = {
    name,
    email,
    password,
    username,
    isAdmin: false,
  };
  const userCreated = await createUser(auth, newUser);
  await addUserInformationDb(db, userCreated.uid, newUser);
  alert("Usuario registrado exitosamente");
  alert(`bienvenido, ${name}`);
  location.href = "./shop.html";
  //console.log(userCreated);
});

//Listener del formulario de login

loginUserForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = loginUserForm.email.value;
  const password = loginUserForm.password.value;

  login(auth, email, password);
  alert(`bienvenido`);
  console.log("login");
  //Recuperar Información
  if (user.isAdmin) {
    location.href = "./add-product.html";
  } else {
    location.href = "./shop.html";
  }
});
