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
        avatar: 'https://gravatar.com/avatar/7162cc546151effba2045da4f88efb25?s=100&d=robohash&r=x',
        username: registerElements.userNameRegister.value,
        email: registerElements.emailRegister.value,
        password: registerElements.passwordRegister.value,
        status: 'pending',
        role: 'user',
      }
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Te has registrado exitosamente, tu cuenta sera activada a la brevedad.',
        showConfirmButton: false,
        timer: 5000
      });
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
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Bienvenido ${currentUser.username}! Seras redirigido al inicio en breve.`,
        showConfirmButton: false,
        color: '#E2E8F0',
        background: '#1B202B',
        timer: 3000
      });
      setTimeout(() =>{
        window.location.href = '/index.html';
      }, 4000);

    } else {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: `Bienvenido ${currentUser.username}! Seras redirigido al panel de administracion en breve.`,
        color: '#E2E8F0',
        background: '#1B202B',
        showConfirmButton: false,
        timer: 3000
      });
      setTimeout(() =>{
        window.location.href = '/pages/admin/admin-panel.html';
      }, 4000);
    }
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


