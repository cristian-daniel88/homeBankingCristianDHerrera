
//obtenemos el usuario en formato Json del local storage
let localStoreJson = localStorage.getItem('user');


// convertimos el usuario en formato Json de local storage en js
let userJs = JSON.parse(localStoreJson)

// ya convertido en formato js cambiamos un valor por ejemplo balance = 4
userJs.balance = 4;


// creamos una nueva constante y convertimos el userJs de formato Js a formato Json
let userJson = JSON.stringify(userJs)

// actualizamos local storage user con formato Json
localStorage.setItem('user', userJson);
console.log(localStoreJson)
