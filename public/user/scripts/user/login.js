let formElement = document.getElementById('login-form');
let userElement = document.getElementById('user');
let passwordElement = document.getElementById('password');
let loginErrorElement = document.getElementById('login-error');
let logoutElement = document.getElementById('logout');



loginErrorElement.style.display = 'none';

let localStore = localStorage.getItem('users');
let userList = [];

if (localStore) {
    userList = JSON.parse(localStore)
}

function loginUser (e) {
    e.preventDefault();

    loginErrorElement.style.display = 'none';

    let user = userElement.value;
    let password = passwordElement.value;

    if (user !== '' && password !== '') {

        let match = false;

        userList.forEach(userEl => {
            if (userEl.user === user) {
                if (userEl.password  === password )  {
                    match = true;
                    location.href = '../../public/user/index2.html';
                    localStorage.setItem('user', JSON.stringify(userEl));
                    return
                }
            }
        });
        if(!match) {
            loginErrorElement.style.display = 'block';
            loginErrorElement.innerHTML = 'Datos incorrectos.';
        }
    } else {
        loginErrorElement.style.display = 'block';
        
        loginErrorElement.innerHTML = 'Por favor complete todos los campos.';
    }
}


// function logOutUser (e) {
//     localStorage.removeItem('user');
//     location.href = '../../public/user/register.html'
// }

// logoutElement.addEventListener('click', (e)=> logOutUser(e))


formElement.addEventListener('submit', (e)=> loginUser(e));



// para que el navegador no autocomplete el formulario
passwordElement.style.display = 'none';

passwordElement.addEventListener('focus', () => {
passwordElement.style.display = 'flex'; 
passwordElement.value = '1'
setTimeout(( ) =>{
    passwordElement.value = ''
} ,0 )
})



userElement.addEventListener('focus', () => {
    userElement.style.display = 'flex'; 
    userElement.value = '1'
    setTimeout(( ) =>{
        userElement.value = ''
    } ,0 )
    })
    

// borrar usuario
localStorage.removeItem('user');
    
    
    
    






