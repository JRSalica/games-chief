let users = JSON.parse(localStorage.getItem('users')) || [];

// Vacia los campos del formulario de registro
function cleanRegisterInputs(){
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
  
// Realiza la validacion del formulario de registro.
function registerValidation(){
  return (validateUserName() && validateEmailRegister() && validatePasswordRegister() && validateTerms()) ? true : false;
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

function validateEmailRegister(){
  const email = document.getElementById('emailRegister');
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let emailValidated = false;
  let emailExists = false;

  users.forEach(user =>{
    if(user.email.toLowerCase() == email.value.toLowerCase()){
      emailExists = true;
    }
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

function validatePasswordRegister(){
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

// Vacia los campos del formulario de login
function cleanLoginInputs(){
  document.getElementById('emailLogin').value = '';
  document.getElementById('emailLogin').classList.remove('is-valid');
  document.getElementById('passwordLogin').value = '';
  document.getElementById('passwordLogin').classList.remove('is-valid');
}
  
function loginValidation(){
  return validateLogin() ? true : false;
}

function validateLogin(){
  const email = document.getElementById('emailLogin');
  const password = document.getElementById('passwordLogin');
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  let loginValidated = false;
  let emailExists = false;
  let validPassword = false;

  users.forEach(user =>{
    if(user.email.toLowerCase() == email.value.toLowerCase() && user.status == 'approved'){
      emailExists = true;
    }
    if(user.password == password.value){
      validPassword = true;
    }
  });

  if(email.value === ''){
    setError(email, 'Ingrese un correo electronico.');
    loginValidated = false;
  } else if(!emailRegex.test(String(email.value.toLowerCase()))){
    setError(email, 'No ingreso un correo electronico valido.');
    loginValidated = false;
  } else if (!emailExists){
    setError(email, 'El correo ingresado no corresponde a ninguna cuenta activa');
    loginValidated = false;
  } else if(password.value === ''){
    setSuccess(email)
    setError(password, 'Ingrese una contraseña.');
    loginValidated = false;
  } else if(!validPassword){
    setSuccess(email)
    setError(password, 'Contraseña incorrecta.');
    loginValidated = false;
  } else{
    setSuccess(email);
    setSuccess(password);
    loginValidated = true;
  }
  return loginValidated;
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

export{cleanRegisterInputs, cleanLoginInputs, registerValidation, loginValidation};