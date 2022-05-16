import {app, auth, db, storage } from "./general";

//Importo funciones desde auth
import { login, createUser, addUserInformationDb } from "./auth";




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
