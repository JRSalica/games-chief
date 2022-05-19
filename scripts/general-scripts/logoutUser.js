// Logout
const logoutLink = document.getElementById('logout-link').addEventListener('click', logoutUser);

function logoutUser(){
  sessionStorage.removeItem('currentUser');
  localStorage.removeItem('currentUser');
  Swal.fire({
    position: 'top',
    icon: 'success',
    title: `Has finalizado sesion. Hasta la proxima!`,
    showConfirmButton: false,
    color: '#E2E8F0',
    background: '#1B202B',
    timer: 3000
  });
  setTimeout(() =>{
    window.location.href = '/index.html';
  }, 4000);
}