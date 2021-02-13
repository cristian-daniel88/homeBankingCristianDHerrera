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

//obtenemos el usuario en formato Json del local storage
let localStoreUserJson = localStorage.getItem("user");
// convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreUserJson);

//obtenemos los usuarios en formato Json del local storage
let localStoreUsersJson = localStorage.getItem("users");
// convertimos los usuarios en formato Json de local storage en js
let usersJs = JSON.parse(localStoreUsersJson);

// iputs
let inputSelect = document.getElementById('select');
let inputAGregarCbu = document.getElementById('agregar-cbu_span');
let inputAGregarCbu2 = document.getElementById('agregar-cbu2_span')
let inputMonto = document.getElementById("monto-cuenta-terceros_input");
let inputMotivo = document.getElementById("razon-cuenta-terceros_input");
let transferencias = document.getElementById('transferencias-form');


//---------- agregar cbu de terceros en <option>---------------------//
// hacemos funcionar el boton agregarCbu que nos redidirigue a una nueva pagina
inputAGregarCbu.addEventListener('click', funcionIrParaAgregarCbu);

function funcionIrParaAgregarCbu () {
    location.href = "../../public/user/agregarCbu.html";
}

console.log(inputSelect.value)
inputSelect.innerHTML = `<option value="" class='opciones'></option>${userJs.saved.map((item)=> 
  `<option value="${item.cbu}" class='opciones'>${item.cbu}</option>`
)}`

inputSelect.addEventListener('input', ponerNombreCompleto);
function ponerNombreCompleto() {
 let encontranombre =  usersJs.find(value => value.cbu === inputSelect.value);
  let nombre = document.getElementById('nombre-cuenta-terceros_span');
  let apellido = document.getElementById('apellido-cuenta-terceros_span');
  nombre.innerHTML = `Nombre: ${encontranombre.name}`;
  apellido.innerHTML = `Apellido: ${encontranombre.lastname}`
}
 let cuentatercerosbutton = document.getElementById('cuenta-terceros-button');


transferencias.addEventListener('submit', depositarTerceros)
function depositarTerceros(e) {
  e.preventDefault();
  if (userJs.balance < inputMonto.value) {
    return alert("saldo insuficient");
  } else {
    let usuarioASumar = usersJs.find((value) => value.cbu === inputSelect.value);
    console.log(usersJs)
    let usuariobalance = Number(usuarioASumar.balance);
    let montoParaUsuario = Number(inputMonto.value);
    let sumatotal = usuariobalance + montoParaUsuario;
    usuarioASumar.balance = sumatotal;
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
      movimiento: 'ingreso de un tercero'
    };
    usuarioASumar.transaciones.push(objetoDeposito)
  
    // indexsamos al usuarioTercero
    let indexUsuarioTercero = usersJs.indexOf(usuarioASumar);
    
    // borramos con splice()
    usersJs.splice(indexUsuarioTercero, 1);
    
    // pusheamos
    usersJs.push(usuarioASumar);
    
    /// convertimos el array userlist[] en formato json
    let usersTerceros = JSON.stringify(usersJs);
    // pasamos el array en json a users en el localstorage
    localStorage.setItem("users", usersTerceros);

    
    
 
    
    // restamos de su balance
    let usuarioLogBalance = Number(userJs.balance);
    let restatotal = usuarioLogBalance - montoParaUsuario;
    
    // actualizamos el objeto
    userJs.balance = restatotal;
    let objetoEgreso = {
      montoDeposito: inputMonto.value,
      motivoDeposito: inputMotivo.value,
      fecha:
        f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear(),
      hora: h.getHours() + ":" + h.getMinutes() + ":" + h.getSeconds(),
      movimiento: 'egreso para un tercero'
    };
    userJs.transaciones.push(objetoEgreso)
    
    
    //  buscamos al usuario en el array con find()
    let usuarioARestar = usersJs.find((value) => value.cbu === userJs.cbu);
    
    // indexamos
    let indexUsuarioLog = usersJs.indexOf(usuarioARestar);
    
    // splice
    usersJs.splice(indexUsuarioLog, 1)
    
    // push
    usersJs.push(userJs);
    

    //
    
    /// convertimos el array de usuarios en formato json
    let userLogueado = JSON.stringify(usersJs);
    // pasamos el array en json a users en el localstorage
    localStorage.setItem("users", userLogueado);
    // convervetimos user en jso 
    let userLogueadoUser = JSON.stringify(userJs);
    localStorage.setItem('user', userLogueadoUser)

    //
    inputMonto.value = '';
    inputMotivo.value = '';
    return alert('fue depositado con exito')
    

    
  

  }
}
