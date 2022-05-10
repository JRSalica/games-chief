// Logout
function logoutUser(){
  sessionStorage.removeItem('currentUser');
  localStorage.removeItem('currentUser');
}