//obtenemos el usuario en formato Json del local storage
let localStoreJson = localStorage.getItem("user");

// convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreJson);

// ya convertido en formato js cambiamos un valor por ejemplo balance = 4
// userJs.balance = 4;

// creamos una nueva constante y convertimos el userJs de formato Js a formato Json
let userJson = JSON.stringify(userJs);

// actualizamos local storage user con formato Json
localStorage.setItem("user", userJson);
// console.log(localStoreJson);
//------------------------------------------------ Codigo ----------------------------------------//

let off = document.getElementById("off");
off.addEventListener("click", logoutOff);
function logoutOff() {
  if (this.dataset.character === "off") {
    // borrar usuario
    localStorage.removeItem("user");
    //ir a index
    location.href = "./public/user/index.html";
  }
}

document.addEventListener("click", volverIndex2);
function volverIndex2(e) {
  if (e.target.id === "volver-index2" || e.target.id === 'volver-index2b') {
    caja2.innerHTML = ` <div class="cajita-a" data-character="consultas" id="consultas">
    <div id="boton-consultas"   ><div id="boton-consultas_p" >Consultas</div></div>
    </div>
    <div class="cajita-b" data-character="servicios" id="servicios">
    <div id="boton-servicios"><div id="boton-servicios_p">Servicios</div></div>
    </div>`;
    caja3.innerHTML = ` <div class="cajita-c" data-character="depositos" id="depositos">
        <div id="boton-depositos"><div id="boton-depositos_p">Depositos</div></div>
        </div>
        <div class="cajita-d" data-character="transferencias" id="transferencias">
        <div id="boton-transferencias"><div id="boton-transferencioas_p">Transferencias</div></div>
        </div>`;
    return (volver.innerHTML = ``);
  }
  // ` <div class="cajita-a" data-character="consultas" id="consultas">
  //       <div id="boton-consultas"   ><div id="boton-consultas_p" >Consultas</div></div>
  //       </div>
  //       <div class="cajita-b" data-character="servicios" id="servicios">
  //       <div id="boton-servicios"><div id="boton-servicios_p">Servicios</div></div>
  //       </div>`
}
let tituloSeccion = document.getElementById("seccion");
tituloSeccion.innerHTML = `BIENVENID@ ${userJs.name.toUpperCase()}`;
let volver = document.getElementById("caja4");

// Consulta
document.addEventListener("click", funcionConsultaTarget);
function funcionConsultaTarget(e) {
  if (e.target.id === "boton-consultas_p") {
    caja2.innerHTML = ` <div class="cajita-a" data-character="saldo" id="saldo">
            <div id="boton-saldo"><div id="boton-saldo_p">Saldo</div></div>
            </div>
            <div class="cajita-b" data-character="cbu" id="cbu">
            <div id="boton-cbu"><div id="boton-cbu_p">CBU</div></div>
            </div>`;
    caja3.innerHTML = ``;
    return (volver.innerHTML = `<div id="volver-index2" data-character='volver-index2'> <span id='volver-index2b' class="icon-arrow-left" style="margin-right: 15px;"></span>Volver</div>`);
  }
}

// saldo
document.addEventListener("click", funcionSaldoTarget);
function funcionSaldoTarget(e) {
  if (e.target.id === "boton-saldo_p") {
    caja2.innerHTML = `<h3 class= 'saldo-h3'>Su saldo es: $${userJs.balance}</h3>`;
    caja3.innerHTML = "";
    return (volver.innerHTML = `<div id="volver-index2" data-character='volver-index2'> <span id='volver-index2b' class="icon-arrow-left" style="margin-right: 15px;"></span>Volver</div>`);
  }
}

// CBU
document.addEventListener("click", funcionCbuTarget);
function funcionCbuTarget(e) {
  if (e.target.id === "boton-cbu_p") {
    caja2.innerHTML = `<h3 class= 'cbu-h3'> Su CBU es : </br> ${userJs.cbu}</h3>`;
    caja3.innerHTML = "";
    return (volver.innerHTML = `<div id="volver-index2" data-character='volver-index2'> <span id='volver-index2b' class="icon-arrow-left" style="margin-right: 15px;"></span>Volver</div>`);
  }
}

// Depositos
document.addEventListener("click", funcionDepositosTarget);
function funcionDepositosTarget(e) {
  if (e.target.id === "boton-depositos_p") {
    caja2.innerHTML = ` <div class="cajita-a" data-character="cuenta-propia" id="cuenta-propia">
            <div id="boton-cuenta-propia"><div id="boton-cuenta-propia_p">Cuenta propia</div></div>
            </div>
            <div class="cajita-b" data-character="cuenta-terceros" id="cuenta-tereceros">
            <div id="boton-cuenta-terceros"><div id="boton-cuenta-terceros_p">Cuenta terceros</div></div>
            </div>`;
    caja3.innerHTML = ``;
    return (volver.innerHTML = `<div id="volver-index2" data-character='volver-index2'> <span id='volver-index2b' class="icon-arrow-left" style="margin-right: 15px;"></span>Volver</div>`);
  }
}

// Cuenta Propia
document.addEventListener("click", funcionCuentaPropiaTarget);
function funcionCuentaPropiaTarget(e) {
  if (e.target.id === "boton-cuenta-propia_p") {
    location.href = "../../public/user/depositoEnCuentaPropia.html";
  }
}

// Cuenta Terceros
document.addEventListener("click", funcionCuentaTercerosTarget);
function funcionCuentaTercerosTarget(e) {
  if (e.target.id === "boton-cuenta-terceros_p") {
    location.href = "../../public/user/depositoEnCuentaTerceros.html";
  }
}

// Transferencias
document.addEventListener("click", funcionTransferencias);
function funcionTransferencias(e) {
  if (e.target.id === "boton-transferencioas_p") {
    location.href = "../../public/user/transferencias.html";
  }
}

// Servicios
document.addEventListener("click", funcionServicios);
function funcionServicios(e) {
  if (e.target.id === "boton-servicios_p") {
    caja2.innerHTML = ` <div class="cajita-a" data-character="adherir-servicios" id="adherir-servicios">
    <div id="boton-adherir-servicios"   ><div id="boton-adherir-servicios_p" >Adherir Servicios</div></div>
    </div>
    <div class="cajita-b" data-character="desvincular-servicios" id="desvincular-servicios">
    <div id="boton-desvincular-servicios"><div id="boton-desvincular-servicios_p"> Desvincular Servicios</div></div>
    </div>`;
    caja3.innerHTML = ` <div class="cajita-c" data-character="pagar-servicios" id="pagar-servicios">
    <div id="boton-pagar-servicios"><div id="boton-pagar-servicios_p">Pagar Servicios</div></div>
    </div>
    <div class="cajita-d" data-character="mis-comprobantes" id="mis-comprobantes">
    <div id="boton-mis-comprobantes"><div id="boton-mis-comprobantes_p">Mis comprobantes</div></div>
    </div>`;
    return (volver.innerHTML = `<div id="volver-index2" data-character='volver-index2'> <span id='volver-index2b' class="icon-arrow-left" style="margin-right: 15px;"></span>Volver</div>`)
  }
}

// Adherir servicios

document.addEventListener("click", funcionAdherirServicios);
function funcionAdherirServicios(e) {
  if (e.target.id === "boton-adherir-servicios_p") {
    location.href = "../../public/user/adherirServicios.html";  
  }
}

// Pagar Servicios
document.addEventListener("click", funcionPagarServicios);
function funcionPagarServicios(e) {
  if (e.target.id === "boton-pagar-servicios_p") {
    location.href = "../../public/user/pagarServicios.html";  
  }
}

// Mis Comprobantes
document.addEventListener("click", funcionMiscomprobantes);
function funcionMiscomprobantes(e) {
  if (e.target.id === "boton-mis-comprobantes_p") {
    location.href = "../../public/user/misComprobantes.html";  
  }
}

// Desvincular Servicio
document.addEventListener("click", funcionDesvincularServicio);
function funcionDesvincularServicio(e) {
  if (e.target.id === "boton-desvincular-servicios_p") {
    location.href = "../../public/user/desvincularServicio.html";  
  }
}


