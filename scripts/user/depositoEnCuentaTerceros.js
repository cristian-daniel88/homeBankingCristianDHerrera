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
  location.href = "../../public/user/index2.html";
}

//obtenemos los usuarios en formato Json del local storage
let localStoreUsersJson = localStorage.getItem("users");
// convertimos los usuarios en formato Json de local storage en js
let usersJs = JSON.parse(localStoreUsersJson);

// mapeamos los cbu de usuarios para tenerlos en la consola
let cbuMap = usersJs.map((value) => value.cbu);


let inputCbu = document.getElementById("cbu-cuenta-terceros_input");
let inputMonto = document.getElementById("monto-cuenta-terceros_input");
let inputMotivo = document.getElementById("razon-cuenta-terceros_input");

let formDepositoCuentaTerceros = document.getElementById(
  "cuenta-terceros-form"
);
formDepositoCuentaTerceros.addEventListener("submit", depositarTerceros);

function depositarTerceros(e) {
  e.preventDefault();
  let existe = false;
  usersJs.filter((value) => {
    if (value.cbu === inputCbu.value) {
      existe = true;
    }
  });
  if (!existe) {
    return alert("no existe");
  }

  //obtenemos el usuario logueado en formato Json del local storage
  let localStoreUserJson = localStorage.getItem("user");
  // convertimos el usuario logueado en formato Json de local storage en js
  let userJs = JSON.parse(localStoreUserJson);
  let userCbu = userJs.cbu;
  

  if (inputCbu.value === userCbu) {
    return alert("no puede ser tu cbu");
  }
  if (userJs.balance < inputMonto.value) {
    return alert("saldo insuficient");
  } else {
    let usuarioASumar = usersJs.find((value) => value.cbu === inputCbu.value);
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

    
    
    // actualizar ahora el usuario

    //obtenemos el usuario loguedo en formato Json del local storage
    let localStoreJsonUsuario = localStorage.getItem("user");

    // convertimos el usuario logueado de formato Json de local storage en js
    let userJsUsuario = JSON.parse(localStoreJsonUsuario);
    
    // restamos de su balance
    let usuarioLogBalance = Number(userJsUsuario.balance);
    let restatotal = usuarioLogBalance - montoParaUsuario;
    
    // actualizamos el objeto
    userJsUsuario.balance = restatotal;
    let objetoEgreso = {
      montoDeposito: inputMonto.value,
      motivoDeposito: inputMotivo.value,
      fecha:
        f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear(),
      hora: h.getHours() + ":" + h.getMinutes() + ":" + h.getSeconds(),
      movimiento: 'egreso para un tercero'
    };
    userJsUsuario.transaciones.push(objetoEgreso)
    
    
    //  buscamos al usuario en el array con find()
    let usuarioARestar = usersJs.find((value) => value.cbu === userJsUsuario.cbu);
    
    // indexamos
    let indexUsuarioLog = usersJs.indexOf(usuarioARestar);
    
    // splice
    usersJs.splice(indexUsuarioLog, 1)
    
    // push
    usersJs.push(userJsUsuario);
    
    /// convertimos el array de usuarios en formato json
    let userLogueado = JSON.stringify(usersJs);
    // pasamos el array en json a users en el localstorage
    localStorage.setItem("users", userLogueado);
    // convervetimos user en jso 
    let userLogueadoUser = JSON.stringify(userJsUsuario);
    localStorage.setItem('user', userLogueadoUser)


    
  

  }
}
