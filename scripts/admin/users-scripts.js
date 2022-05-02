createUsers();
renderUsersTable();
renderAdminInfo();

// Carga la tabla con TODOS los usuarios
function renderUsersTable() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const usersTableBody = document.getElementById('users-table-body');
  usersTableBody.innerHTML = '';
  users.forEach((user) => {
    renderUser(user);
  });
  changeUsersListInfo(`${users.length} usuarios registrados.`);
}

// Pinta un usuario en la tabla
function renderUser(user) {
  const usersTableBody = document.getElementById('users-table-body');
  usersTableBody.innerHTML += `
      <tr>
        <td><img src="${user.avatar}" alt="user avatar" class="w-25 rounded-circle bg-dark" /></td>
        <td>${user.userName}</td>
        <td>${user.mail}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
      </tr>
      `;
}

// Cambia el texto de informacion de la tabla
function changeUsersListInfo(text) {
  let tableInfoText = document.getElementById('users-table-info-text');
  tableInfoText.innerHTML = text;
}

function renderAdminInfo(){
  let adminInfoText = document.getElementById('admin-info-text');
  let currentAdmin = JSON.parse(localStorage.getItem('currentUser')) || {};
  adminInfoText.innerHTML = `Hola <span class="text-success">${currentAdmin.userName}</span>`;
}

// Crea usuarios de forma provisional
function createUsers(){
  let currentUser = {avatar: 'https://gravatar.com/avatar/a02f0cd317c4805ecc316db0e3741327?s=100&d=robohash&r=x', userName: 'JRSalica', mail:'salicajorge@gmail.com', role:'admin', status:'approved'};
  let usersArr = [
    currentUser, 
    {avatar: 'https://gravatar.com/avatar/cfe3c204bd9f5cb4fcbd61cf109d947c?s=100&d=robohash&r=x', userName: 'JRSickness', mail:'jrsick@gmail.com', role:'user', status:'suspend'},
    {avatar: 'https://gravatar.com/avatar/8c66a907354c524c525441815415b338?s=100&d=robohash&r=x', userName: 'JRSystems', mail:'jrsystems.jr@gmail.com', role:'user', status:'pending'},
    {avatar: 'https://gravatar.com/avatar/1ba8e6babcb532aa831a055c68aaff25?s=100&d=robohash&r=x', userName: 'JRSoul', mail:'soulofjr@gmail.com', role:'user', status:'approved'},
  ];

  localStorage.setItem('users', JSON.stringify(usersArr));
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

