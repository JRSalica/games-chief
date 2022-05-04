const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');


// Cambia entre los formularios
registerLink.addEventListener('click', () =>{
  loginSection.classList.remove('d-block');
  loginSection.classList.add('d-none');
  registerSection.classList.remove('d-none');
  registerSection.classList.add('d-block');
});

loginLink.addEventListener('click', () =>{
  loginSection.classList.remove('d-none');
  loginSection.classList.add('d-block');
  registerSection.classList.remove('d-block');
  registerSection.classList.add('d-none');
});

// Comprueba si hay un usuario logeado

function checkIsAuth(){
  user = JSON.parse(localStorage.getItem('currentUser'));
  if(!user) redirectToLogin();
}

function logout(){
  localStorage.removeItem('currentUser');
}

function redirectToLogin(){
  
}