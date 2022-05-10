// Comprueba si hay un usuario logeado
function checkIsAuth(){
  let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if(!currentUser){
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  showSessionItems(currentUser);
}

// Muestra en el navbar los items correspondientes a la sesion
function showSessionItems(currentUser){
  const loginItem = document.getElementById('login-item');
  const logoutItem = document.getElementById('logout-item');
  const adminItem = document.getElementById('admin-item');
  if(currentUser){
    loginItem.classList.remove('d-block');
    loginItem.classList.add('d-none');
    logoutItem.classList.remove('d-none');
    logoutItem.classList.add('d-block');
    if(currentUser.role === 'admin'){
      adminItem.classList.remove('d-none');
      adminItem.classList.add('d-block');
    } else if(currentUser.role === 'user'){
      adminItem.classList.remove('d-block');
      adminItem.classList.add('d-none');
    }
  } else{
    loginItem.classList.remove('d-none');
    loginItem.classList.add('d-block');
    logoutItem.classList.remove('d-block');
    logoutItem.classList.add('d-none');
    adminItem.classList.remove('d-block');
    adminItem.classList.add('d-none');
  }
}

export{checkIsAuth};