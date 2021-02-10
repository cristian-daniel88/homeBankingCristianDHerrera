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

//---------- usuarios y usuario ------------ 
      //obtenemos el usuario en formato Json del local storage
      let localStoreUserJson = localStorage.getItem("user");
      // convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreUserJson);

      //obtenemos los usuarios en formato Json del local storage
let localStoreUsersJson = localStorage.getItem("users");
      // convertimos los usuarios en formato Json de local storage en js
let usersJs = JSON.parse(localStoreUsersJson);


// map a los servicios
let caja2 = document.getElementById('caja2');
let serviceArray = userJs.service;

caja2.innerHTML = `${serviceArray.map((value, key)=> 
  ` <div class="tarjeta"> <div class="nombre-servicio"><p>${value.nombre}</p></div>
  <div class="monto-servicio"><p>$${value.monto}</p></div>
  <div class="vencimiento-sercicio"><p>Vencimiento: ${value.vencimiento}</p></div>
  <div class="al-dia"><div class='al-dia-div'><div>${value.pagado ? 'Al dia' : `<div class='vencida-p'>Vencida</div>`}</div></div></div>
  <div class="boton-de-servicio" ><div><div key=${value.id}><button  id="pagar-servicio">Pagar</button></div></div></div> </div>`
  )}
`


// pagar
document.addEventListener('click', (e)=> {
  if (e.target.id === 'pagar-servicio') {
    let elementoABuscar = e.target.parentNode.attributes.key.value;
  
    let elementoFind = userJs.service.find((value,index)=> value.id === elementoABuscar);
    
    

    
    // restar
    let userbalance = Number(userJs.balance);
    let restabalance = Number(elementoFind.monto);
    if (userbalance < restabalance){
      return alert('saldo insuficiente');
    }
    // restar balance
    let resultadoResta = userbalance - restabalance;
    userJs.balance = resultadoResta;

    // crear transaciones
    let f = new Date();
    let h = new Date();
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
    let objetoEgreso = {
      montoDeposito: elementoFind.monto,
      nombreDeposito: elementoFind.nombre,
      movimiento : 'pago de servicios',
      fecha:
      f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear(),
      hora: h.getHours() + ":" + h.getMinutes() + ":" + h.getSeconds(),
      id: elementoFind.id,
      vencimiento: elementoFind.vencimiento
    };
    userJs.transaciones.push(objetoEgreso);
    userJs.comprobantesServicios.push(objetoEgreso)
  
    
    // borrar el servicio pagado
    let elementoFindIndex = userJs.service.indexOf(elementoFind);
    userJs.service.splice(elementoFindIndex, 1);

    // actualizar user del local storage
    
    // creamos una nueva constante y convertimos el userJs de formato Js a formato Json
      let userJson = JSON.stringify(userJs);
    // actualizamos local storage user con formato Json
      localStorage.setItem("user", userJson);
    // buscamos nuestro usuario logueado actualizado
    let findUserLogueado = usersJs.findIndex(value => value.cbu === userJs);
    // lo borramos 
    usersJs.splice(findUserLogueado);
    // push
    usersJs.push(userJs);
    // convertimos el array usersjs en formato json
       let usersJson = JSON.stringify(usersJs);
    // pasamos el array en json a users en el localstorage
    localStorage.setItem('users', usersJson);

    caja2.innerHTML = `${serviceArray.map((value, key)=> 
      ` <div class="tarjeta"> <div class="nombre-servicio"><p>${value.nombre}</p></div>
      <div class="monto-servicio"><p>${value.monto}</p></div>
      <div class="vencimiento-sercicio"><p>Vencimiento: ${value.vencimiento}</p></div>
      <div class="al-dia"><div class='al-dia-div'><div>${value.pagado ? 'Al dia' : `<div class='vencida-p'>Vencida</div>`}</div></div></div>
      <div class="boton-de-servicio" ><div><div key=${value.id}><button  id="pagar-servicio">Pagar</button></div></div></div> </div>`
      )}
    `
    return alert('el pago fue debitado de tu cuenta');
  }
 
});
