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

//---------- usuarios y usuario ------------ 
      //obtenemos el usuario en formato Json del local storage
      let localStoreUserJson = localStorage.getItem("user");
      // convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreUserJson);

      //obtenemos los usuarios en formato Json del local storage
let localStoreUsersJson = localStorage.getItem("users");
      // convertimos los usuarios en formato Json de local storage en js
let usersJs = JSON.parse(localStoreUsersJson);

// filtrar
let filtrarTransacion = userJs.comprobantesServicios.filter(value => value.movimiento === 'pago de servicios');
console.log(filtrarTransacion)

let caja2 = document.getElementById('caja2');
caja2.innerHTML = `${filtrarTransacion.map(value =>
  `
                  <div class="tarjeta">
                  <div class="nombre-servicio"><p>${value.nombreDeposito}</p></div>
                  <div class="monto-servicio"><p>$${value.montoDeposito  }</p></div>
                  <div class="vencimiento-sercicio"><p>Fecha de Pago: </p></div>
                  <div class="vencimiento-sercicio"><p>${value.fecha}</p></div>
                  <div class="al-dia"><div class='al-dia-div'><div></div></div></div>
                  <div class="boton-de-servicio"><div><div id="pagar-servicio"></div></div></div>
                   </div> 
  `
  
  
  )}`
