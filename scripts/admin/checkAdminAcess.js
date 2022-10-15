window.addEventListener('load', () => {
  let currentUser = JSON.parse(sessionStorage.getItem('currentUser')) || JSON.parse(localStorage.getItem('currentUser'));
  if (currentUser.role != 'admin') {
    window.location.href = '/index.html';
  }
});