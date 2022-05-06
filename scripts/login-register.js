const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const loginLink = document.getElementById('login-link');
const registerLink = document.getElementById('register-link');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
let users = JSON.parse(localStorage.getItem('users')) || [];

registerForm.addEventListener('submit', registerUser);

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
      cleanInputs();
  } 
}

function cleanInputs(){
  document.getElementById('userNameRegister').value = '';
  document.getElementById('userNameRegister').classList.remove('is-valid');
  document.getElementById('emailRegister').value = '';
  document.getElementById('emailRegister').classList.remove('is-valid');
  document.getElementById('passwordRegister').value = '';
  document.getElementById('passwordRegister').classList.remove('is-valid');
  document.getElementById('password2Register').value = '';
  document.getElementById('password2Register').classList.remove('is-valid');
  document.getElementById('checkTerms').checked = false;
}
  
function registerValidation(){
  return (validateUserName() && validateEmail() && validatePassword() && validateTerms()) ? true : false;
}

function validateUserName(){
  const userName = document.getElementById('userNameRegister');
  let userNameValidated = false;
  let userNameExists = false;

  users.forEach(user =>{
    if(user.username.toLowerCase() == userName.value.toLowerCase())
    userNameExists = true;
  });

  if(userNameExists){
    setError(userName, 'Ya existe un usuario con ese nombre.');
    userNameValidated = false;
  } else if(userName.value === ''){
    setError(userName, 'Ingrese un nombre.');
    userNameValidated = false;
  } else if(userName.value.length < 2){
    setError(userName, 'Ingrese un nombre mas largo.')
    userNameValidated = false;
  } else if(userName.value.length > 10){
    setError(userName, 'Ingrese un nombre mas corto.')
    userNameValidated = false;
  } else{
    setSuccess(userName)
    userNameValidated = true;
  }
  return userNameValidated;
}

function validateEmail(){
  const email = document.getElementById('emailRegister');
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let emailValidated = false;
  let emailExists = false;

  users.forEach(user =>{
    if(user.email.toLowerCase() == email.value.toLowerCase())
    emailExists = true;
  });

  if(emailExists){
    setError(email, 'El correo electronico ya esta registrado con otra cuenta.')
    emailValidated = false;  
  }else if(email.value === ''){
    setError(email, 'Ingrese un correo electronico.');
    emailValidated = false;
  } else if(!emailRegex.test(String(email.value.toLowerCase()))){
    setError(email, 'No ingreso un correo electronico valido.');
    emailValidated = false;
  } else{
    setSuccess(email);
    emailValidated = true;
  }
  return emailValidated;
}

function validatePassword(){
  const password = document.getElementById('passwordRegister');
  const password2 = document.getElementById('password2Register');
  let passwordValidated = false;

  if(password.value === ''){
    setError(password, 'Ingrese una contraseña.');
    passwordValidated = false;
  } else if(password.value.length <= 6 || password.value.length >= 20){
    console.log(password.value.length);
    setError(password, 'Su contraseña debe tener entre 6 y 20 caracteres.')
    passwordValidated = false;
  } else if(password2.value === ''){
    setSuccess(password);
    setError(password2, 'Repita su contraseña.');
    passwordValidated = false;
  } else if(password.value.toLowerCase() != password2.value.toLowerCase()){
    setError(password, 'Las contraseñas no coinciden.');
    passwordValidated = false;
  } else{
    setSuccess(password);
    setSuccess(password2);
    passwordValidated = true;
  }
  return passwordValidated;
}

function validateTerms(){
  const checkTerms = document.getElementById('checkTerms');
  let termsValidated = false;

  if(!checkTerms.checked){
    setError(checkTerms, 'Debe aceptar los terminos y condiciones.');
    termsValidated = false;
  } else{
    setSuccess(checkTerms);
    termsValidated = true;
  }
  return termsValidated;
}

function setError(element, message){
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  errorDisplay.classList.add('invalid-feedback');
  element.classList.remove('is-valid');
  element.classList.add('is-invalid');

}

function setSuccess(element){
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  errorDisplay.classList.remove('invalid-feedback');
  element.classList.remove('is-invalid');
  element.classList.add('is-valid');
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

