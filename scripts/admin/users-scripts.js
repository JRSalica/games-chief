let users = JSON.parse(localStorage.getItem('users')) || [];

renderUsersTable();
renderAdminInfo();

// Elimina un usuario
function deleteUser(username) {
  const confirmDeleteButton = document.getElementById('confirmDeleteUser');
  var modalDeleteConfirm = new bootstrap.Modal(
    document.getElementById('deleteUserModal')
  );
  modalDeleteConfirm.show();
  confirmDeleteButton.onclick = () => {
    users.forEach((user) => {
      if (user.username == username) {
        const usersFiltered = users.filter((user) => user.username != username);
        localStorage.setItem('users', JSON.stringify(usersFiltered));
      }
    });
    renderUsersTable();
  };
}

// Modifica un usuario
function modifyUser(username) {
  // loadModifyInputs(code);
  const modifyUserForm = document.getElementById('modifyUserForm');
  var modifyUserModal = new bootstrap.Modal(
    document.getElementById('modifyUserModal')
  );
  modifyUserModal.show();
  modifyUserForm.onsubmit = function (e) {
    e.preventDefault();
    users.forEach((user) => {
      if (user.username.toLowerCase() == username.toLowerCase()) {
        const userElements = e.target.elements;
        user.role = userElements.roleModify.value;
        user.status = userElements.statusModify.value;
        users[user.username] = user;
        localStorage.setItem('users', JSON.stringify(users));
      }
    });
    renderUsersTable();
    modifyUserModal.hide();
  };
}

// Carga la tabla con TODOS los usuarios
function renderUsersTable() {
  const usersTableBody = document.getElementById('users-table-body');
  usersTableBody.innerHTML = '';
  let users = JSON.parse(localStorage.getItem('users')) || [];
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
        <td><img src="${user.avatar}" alt="user avatar" class="img-fluid rounded-circle bg-dark" /></td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>${user.status}</td>
        <td>
        <div class="d-flex justify-content-evenly">
          <button class="btn p-0" onclick="modifyUser('${user.username.toLowerCase()}')"><i class="bi bi-pencil text-warning"></i></button>
          <button class="btn p-0" onclick="deleteUser('${user.username.toLowerCase()}')"><i class="bi bi-trash text-danger"></i></button>
        </div>
      </td>
      </tr>
      `;
}

// Cambia el texto de informacion de la tabla
function changeUsersListInfo(text) {
  let tableInfoText = document.getElementById('users-table-info-text');
  tableInfoText.innerHTML = text;
}

function renderAdminInfo(){
  const adminAvatar = document.getElementById('admin-avatar');
  const adminInfoText = document.getElementById('admin-info-text');
  let currentAdmin = JSON.parse(localStorage.getItem('currentUser')) || {};

  adminAvatar.setAttribute('src', currentAdmin.avatar);
  adminInfoText.innerHTML = `Hola <span class="text-success">${currentAdmin.username}</span>`;
}



