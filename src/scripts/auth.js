async function createUser(name,username,email,password){
    try{
    const newUser =await createUserWithEmailAndPassword(auth, email, password);
    console.log(newUser);
    alert("Usuario registrado exitosamente");
    window.location.replace("./shop.html");
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
        window.location.replace("./shop.html");

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

export{
    login,
    createUser
}