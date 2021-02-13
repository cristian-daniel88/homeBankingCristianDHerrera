//obtenemos el usuario en formato Json del local storage
let localStoreJson = localStorage.getItem("user");

// convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreJson);

// ya convertido en formato js cambiamos un valor por ejemplo balance = 4
// userJs.balance = 4;

// convertimos el userJs de formato Js a formato Json
// let userJson = JSON.stringify(userJs);

// actualizamos local storage user con formato Json
// localStorage.setItem("user", userJson);
// console.log(localStoreJson);

//------------------------------------------------ Codigo ----------------------------------------//

let off = document.getElementById("off");
off.addEventListener("click", logoutOff);
function logoutOff() {
  if (this.dataset.character === "off") {
    // borrar usuario
    localStorage.removeItem("user");
    //ir a index
    location.href = "../../index.html";
  }
}

let volver = document.getElementById("volver");
volver.addEventListener("click", volverIndex2);
function volverIndex2() {
  location.href = "../../index2.html";
}

// let bienvenido = document.getElementById('seccion');
// bienvenido.innerHTML = `Bienvenido ${userJs.name.toUpperCase()}`

let inputCbu = document.getElementById("cbu-cuenta-propia_input");
inputCbu.value = userJs.cbu;
let inputMonto = document.getElementById("monto-cuenta-propia_input");
let inputMotivo = document.getElementById("razon-cuenta-propia_input");


let formDepositoCuentaPropia = document.getElementById("cuenta-propia-form");
formDepositoCuentaPropia.addEventListener("submit", depositar);
function depositar(e) {
  e.preventDefault();
 
 
  if (inputCbu.value !== userJs.cbu) {
    return alert("CBU Incorrecto");
  }
  let convertirMonto = Number(inputMonto.value);

  if (isNaN(convertirMonto)) {
    return alert("Debes completar un monto en numeros");
  }
  if (convertirMonto <= 0) {
      return alert('Por favor ingrese un numero mayor a 0')
  }
  else {
    //fecha y hora
    let meses = new Array(
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    );
    let f = new Date();
    let h = new Date();
    let objetoDeposito = {
      montoDeposito: inputMonto.value,
      motivoDeposito: inputMotivo.value,
      fecha:
        f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear(),
      hora: h.getHours() + ":" + h.getMinutes() + ":" + h.getSeconds(),
      movimiento: 'ingreso'
    };

    transacionesActualizado (objetoDeposito);

    return saldoActualizado(objetoDeposito);
  }
}

function saldoActualizado(objetoDeposito) {
  let montoAnumber = Number(objetoDeposito.montoDeposito);  
  let balanceANumber = Number(userJs.balance)
  let sumaTotal = montoAnumber + balanceANumber;
  userJs.balance = sumaTotal;

  alert('el deposito fue enviado con exito');
  inputMonto.value = '';
  inputMotivo.value = '';
  

  


 
  // buscamos en el array nuestro objeto que necesitamos actualizar
  let localStore = localStorage.getItem('users');
  let userList = [];

  if(localStore) {
    userList = JSON.parse(localStore)
  }
  // buscamos con metodo find()
  let usuarioBusqueda = userList.find(value => value.cbu === userJs.cbu);
 
  //indexamos
  let indexUsuario = userList.indexOf(usuarioBusqueda)
 
  // borramos 
  userList.splice(indexUsuario, 1);

  // pusheamos usuarioactualizado al array
  userList.push(userJs);
  
  // convertimos el array userlist[] en formato json
  let users = JSON.stringify(userList);
  // pasamos el array en json a users en el localstorage
  localStorage.setItem('users', users);

 
   // creamos una nueva constante y convertimos el userJs de formato Js a formato Json
  let userJson = JSON.stringify(userJs);
    // actualizamos local storage user con formato Json
  return localStorage.setItem("user", userJson);
  // console.log(localStoreJson);
 
}


function transacionesActualizado (objetoDeposito) {
    let objetoTransaciones =  objetoDeposito;
    userJs.transaciones.push(objetoTransaciones);
     
}
