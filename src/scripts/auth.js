import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

async function createUser(auth,{email,password}){
    try{
    const { user } =await createUserWithEmailAndPassword(auth, email, password);
    return user;

    //adicionar información de usuario


    //alert("Usuario registrado exitosamente");
    //window.location.replace("./shop.html");
    }catch(e){
        console.log(e);
        if(e.code === "auth/weak-password"){
            alert("La contraseña debe contener por lo menos 6 letras o números");
        }
        
    }
};

async function login(auth, email, password){

    try{

        const { user }= await signInWithEmailAndPassword(auth, email, password);
        //alert("ingreso exitoso, bienvenidx!");
        //window.location.replace("./shop.html");

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

async function addUserInformationDb(db, userId, userInfo){
    try{
    await setDoc(doc(db, "users", userId), userInfo);
    }catch(e){
        console.log(e);
    }
}

export{
    login,
    createUser,
    addUserInformationDb
}