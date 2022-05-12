import{cleanRegisterInputs, cleanLoginInputs, registerValidation, loginValidation} from './accessValidations.js';

const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

let users = JSON.parse(localStorage.getItem('users')) || [];

registerForm.addEventListener('submit', registerUser);
loginForm.addEventListener('submit', loginUser);

function registerUser(ev){
  ev.preventDefault();
  if(!registerValidation()){
    return false;
  } else{
      const registerElements = ev.target.elements;
      const user = {
        username: registerElements.userNameRegister.value,
        email: registerElements.emailRegister.value,
        password: registerElements.passwordRegister.value,
        status: 'pending',
        role: 'user',
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      cleanRegisterInputs();
  } 
}

function loginUser(ev){
  ev.preventDefault();
  const loginElements = ev.target.elements;
  if(!loginValidation()){
    return false;
  } else{
    const email = loginElements.emailLogin.value;
    const currentUser = users.find(user => {
      return user.email === email;
    });
    if(loginElements.checkRemember.checked){
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
    if(currentUser.role == 'user'){
      window.location.href = '/index.html';
    } else window.location.href = '/pages/admin/admin-panel.html';
    cleanLoginInputs();
  }
}

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


