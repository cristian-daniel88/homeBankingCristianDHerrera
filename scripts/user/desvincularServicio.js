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


// filtrar 


let caja2 = document.getElementById('caja2');
caja2.innerHTML = `${userJs.comprobantesServicios.map(value =>
  `
                  <div class="tarjeta">
                  <div class="nombre-servicio"><p>${value.nombreDeposito}</p></div>
                  <div class="monto-servicio"><p>$${value.montoDeposito  }</p></div>
                  <div class="vencimiento-sercicio"><p>Fecha de Pago: </p></div>
                  <div class="vencimiento-sercicio"><p>${value.fecha}</p></div>
                  
                  <div class="boton-de-servicio" ><div><div key=${value.id}><button  id="borrar-servicio">Borrar</button></div></div></div> </div>
                   </div> 
  `
  
  
  )}`

  document.addEventListener('click', (e) => {
        if (e.target.id === 'borrar-servicio') {
            let elementoABuscar = e.target.parentNode.attributes.key.value;
            let findTransacion = userJs.comprobantesServicios.findIndex(value => value.id === elementoABuscar);

            userJs.comprobantesServicios.splice(findTransacion, 1);
            // convertir a json el userjs
            let userLogueadoUser = JSON.stringify(userJs);
            localStorage.setItem('user', userLogueadoUser);
            //
            // let findUser = usersJs.findIndex(value => value.cbu === userJs.cbu);
            // usersJs.splice(findUser, 1);
            // usersJs.push(userJs);
            // convertir a json el usersjs
            let usersLogueadoUser = JSON.stringify(usersJs);
            localStorage.setItem('users', usersLogueadoUser);
            caja2.innerHTML = `${userJs.comprobantesServicios.map(value =>
                `
                                <div class="tarjeta">
                                <div class="nombre-servicio"><p>${value.nombreDeposito}</p></div>
                                <div class="monto-servicio"><p>$${value.montoDeposito  }</p></div>
                                <div class="vencimiento-sercicio"><p>Fecha de Pago: </p></div>
                                <div class="vencimiento-sercicio"><p>${value.fecha}</p></div>
                                
                                <div class="boton-de-servicio" ><div><div key=${value.id}><button  id="borrar-servicio">Borrar</button></div></div></div> </div>
                                 </div> 
                `
                
                
                )}`
            
        }

  })

