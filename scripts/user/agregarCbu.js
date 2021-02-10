let off = document.getElementById("off");
off.addEventListener("click", logoutOff);
function logoutOff() {
  if (this.dataset.character === "off") {
    // borrar usuario
    localStorage.removeItem("user");
    //ir a index
    location.href = "../../public/user/index.html";
  }
}
let volver = document.getElementById("volver");
volver.addEventListener("click", volverIndex2);
function volverIndex2() {
  location.href = "../../public/user/transferencias.html";
}

//obtenemos el usuario en formato Json del local storage
let localStoreUserJson = localStorage.getItem("user");
// convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreUserJson);

//obtenemos los usuarios en formato Json del local storage
let localStoreUsersJson = localStorage.getItem("users");
// convertimos los usuarios en formato Json de local storage en js
let usersJs = JSON.parse(localStoreUsersJson);

// inputs
let botonAGregarCbu2 = document.getElementById("agregar-cbu2_span");
let formAgregarCbu2 = document.getElementById("agregar-cbu-form");
let inputAgregarCbu2 = document.getElementById("cbu-cuenta-terceros2_input");

//hacemos funcionar el boton agregarCbu2
botonAGregarCbu2.addEventListener("click", funcionAgregarCbuArray);
formAgregarCbu2.addEventListener("submit", funcionAgregarCbuArray);
function funcionAgregarCbuArray() {
  
  let existe = false;
 
  usersJs.filter((value) => {
    if (value.cbu === inputAgregarCbu2.value) {
      console.log("ok");
      existe = true;
      
    }
  });
  if (!existe) {
    return alert("No es un Cbu registrado en nuestros datos");
  }

 
  else {
    let nuevoObjetoCbu = {
      cbu: inputAgregarCbu2.value,
    };
     return verificarSiExisteCbu(nuevoObjetoCbu);
  
  }
}

function verificarSiExisteCbu ( nuevoObjetoCbu) {
    const functionFilter = userJs.saved.filter(value => value.cbu === nuevoObjetoCbu.cbu)
   if (userJs.cbu === inputAgregarCbu2.value) {
     return alert('No puede ser tu CBU')
   }
   if (functionFilter.length > 0) {
    return   alert('Ya existe')
   }
   
   
    userJs.saved.push(nuevoObjetoCbu);
    // find
    let indexarUsuario = usersJs.findIndex((value) => value.cbu === userJs.cbu);
    usersJs.splice(indexarUsuario, 1);
    usersJs.push(userJs);
    /// convertimos el array de usuarios en formato json
    let userTerceros = JSON.stringify(usersJs);
    // pasamos el array en json a users en el localstorage
    localStorage.setItem("users", userTerceros);
    // convervetimos user en jso
    let userLogueadoUser = JSON.stringify(userJs);
    localStorage.setItem("user", userLogueadoUser);
    inputAgregarCbu2.value = '';
    return alert('CBU guardado')
}