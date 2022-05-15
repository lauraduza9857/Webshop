//Seleccionamos el Formulario de createProduct a trves de js
const createProductForm = document.getElementById("createProductForm");

createProductForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Create a new product");

  const name = createProductForm.name.value;
  const description = createProductForm.description.value;
  const category = createProductForm.category.value;
  
});
