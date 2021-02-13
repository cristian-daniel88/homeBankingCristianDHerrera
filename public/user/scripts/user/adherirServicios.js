
let volver = document.getElementById("volver");
volver.addEventListener("click", volverIndex2);
function volverIndex2() {
  location.href = "../../index2.html";
}

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

// generador de id

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

//-------------------- Code ---------------------------------// 
let inputServicios = document.getElementById('adherir-servicios_input');
let inputMonto = document.getElementById('monto-a-abonar_input');
let inputVencimiento = document.getElementById('vencimiento_input');
let adherirServiciosForm = document.getElementById('adherir-servicios-form');

// usuarios y usuario 
      //obtenemos el usuario en formato Json del local storage
let localStoreUserJson = localStorage.getItem("user");
      // convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreUserJson);

      //obtenemos los usuarios en formato Json del local storage
let localStoreUsersJson = localStorage.getItem("users");
      // convertimos los usuarios en formato Json de local storage en js
let usersJs = JSON.parse(localStoreUsersJson);

// eventos
adherirServiciosForm.addEventListener('submit' ,funcionAgregarServicio);

function funcionAgregarServicio (e) {
    e.preventDefault()
    let userJsServices = userJs.service;
    let userJsServicesFilter = userJsServices.filter(value => value.nombre === inputServicios.value);
    let userComprobanteFilter = userJs.comprobantesServicios.filter(value => value.nombreDeposito === inputServicios.value);

    
    let f = new Date();
    let obtenerFechaAnio = f.getFullYear();
    let fechaActualMas20 = obtenerFechaAnio + 20;
    let obtenerFechaMes = f.getMonth() + 1;
    let obtenerFechaDia = f.getDate();

    
    

    // obtener los valores de vencimiento
    let fecha = inputVencimiento.value;
    
    let anioSubstr = fecha.substr(0,4);
    let anioNumber = Number(anioSubstr);
    
    if (anioNumber > fechaActualMas20 ) {
        return alert('fecha incorrecta')
    }

    let diaSubstr = fecha.substr(8, 2);
    let diaNumber = Number(diaSubstr);

    let mesSubstr = fecha.substr(5, 2);
    let mesNumber = Number(mesSubstr);

    if (mesNumber > 12 && mesNumber < 1) {
        return alert('fecha incorrecta')
    }

    if (diaNumber > 31 && diaNumber < 1) {
        return alert('fecha incorrecta')
    }

    // validar monto
    let montoANumber = Number(inputMonto.value);
    if (isNaN(montoANumber)) {
        return alert('El monto no es un número')
    }
  
    if (userJsServicesFilter.length > 0 ) {
      return  alert('Este servicio ya cargado en tu base de datos, elige otro.')
    }
    if (userComprobanteFilter.length > 0) {
      return  alert('Este servicio ya cargado en tu base de datos, elige otro.')
    }
    let pagadoLet = false;
    if (anioNumber > obtenerFechaAnio ) {
        pagadoLet = true;
    }

    if (mesNumber > obtenerFechaMes ) {
        pagadoLet = true;
    }

    if (diaNumber >= obtenerFechaDia) {
        pagadoLet = true;
    }
    
    let objetoServicio = {
        nombre :inputServicios.value,
        monto : inputMonto.value,
        vencimiento: inputVencimiento.value,
        pagado: pagadoLet,
        id : uuidv4(),
    }
    
    
    inputServicios.value= '';
    inputMonto.value = '';
    
    alert('el servicio fue cargado con exito');
    return agregarServiciosAlaBaseDeDatos(objetoServicio)
    
} 



function agregarServiciosAlaBaseDeDatos (objetoServicio) {
    userJs.service.push(objetoServicio);
    // convervetimos user en jso 
    let userLogueadoUser = JSON.stringify(userJs);
    localStorage.setItem('user', userLogueadoUser)
    
    // encontra nuestro usuario en local storage user e indexarlo
    let usuarioFindIndex = usersJs.findIndex(value => value.cbu === userJs.cbu);
    // splice
    usersJs.splice(usuarioFindIndex, 1);
    // push
    usersJs.push(userJs);
    // convertir en json
    let userLogueadoUsers = JSON.stringify(usersJs);
    localStorage.setItem('users', userLogueadoUsers);

    
}

