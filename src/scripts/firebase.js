//Aqui va a quedar la conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Cosas necesarias para realizar la autenticación
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKPHVIa9T5H2VkqAvvj5gE3ljgRlPwPYs",
  authDomain: "web-shop-143ff.firebaseapp.com",
  projectId: "web-shop-143ff",
  storageBucket: "web-shop-143ff.appspot.com",
  messagingSenderId: "61986115608",
  appId: "1:61986115608:web:f844e941fbcad17f17b36d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//constante para la autenticación
const auth = getAuth();

// Creo un listener del formulario de crear usuario nuevo
const createUserForm = document.getElementById("createUserForm");
createUserForm.addEventListener("submit", e =>{
    e.preventDefault();
   // console.log("Usuario Creado");
   //cuando el usurio oprima el boton de submit llamamos la funcion que crea el usurio
   
   const name = createUserForm.name.value;
   const username = createUserForm.username.value;
   const email = createUserForm.email.value;
   const password = createUserForm.password.value;
   createUser(name, username, email, password);
});

async function createUser(name,username,email,password){
    try{
    const newUser =await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
    }catch(e){
        console.log(e);
    }
}

