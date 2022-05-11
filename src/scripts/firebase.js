//Aqui va a quedar la conexión de firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//Cosas necesarias para realizar la autenticación
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


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

const loginUserForm = document.getElementById("loginForm");

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

//Listener del formulario de login

loginUserForm.addEventListener("submit", e =>{
    e.preventDefault();
    
    const email = loginUserForm.email.value;
    const password = loginUserForm.password.value;
    login(email, password);
    console.log("login");

});

async function createUser(name,username,email,password){
    try{
    const newUser =await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
    alert("Usuario registrado exitosamente");
    window.location.replace("../shop.html");
    }catch(e){
        console.log(e);
        if(e.code === "auth/weak-password"){
            alert("La contraseña debe contener por lo menos 6 letras o números");
        }
        
    }
};

async function login(email, password){

    try{

        const { user }= await signInWithEmailAndPassword(auth, email, password);
        alert("ingreso exitoso, bienvenidx!");
        window.location.replace("../shop.html");

    }catch(e){
        console.log(e);
        if(e.code === "auth/wrong-password"){
            alert("contraseña Incorrecta");
        }
        if(e.code === "auth/user-not-found"){
            alert("Este usuario no se encuentra en la base de datos");
        }
        
    }
};

