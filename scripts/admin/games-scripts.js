renderGamesTable();

// Agregar juego
function addGame() {
  const addGameForm = document.getElementById('addGameForm');
  var addGameModal = new bootstrap.Modal(
    document.getElementById('addGameModal')
  );
  addGameModal.show();
  cleanInputs();

  addGameForm.onsubmit = function (e) {
    e.preventDefault();

    const gameElements = e.target.elements;
    const name = gameElements.name.value;
    const description = gameElements.description.value;
    const category = gameElements.category.value;
    const published = gameElements.checkPublished.checked;
    const videoUrl = gameElements.trailerUrl.value;

    const game = {
      code: generateGameCode(),
      name: name,
      description: description,
      category: category,
      rating: 5,
      published: published,
      videoUrl: videoUrl,
      starred: false,
    };

    let games = JSON.parse(localStorage.getItem('games')) || [];
    games.push(game);

    localStorage.setItem('games', JSON.stringify(games));
    renderGamesTable();
    addGameModal.hide();
  };
}

// Vacia los campos al agregar un juego
function cleanInputs(){
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('trailerUrl').value = '';
  document.getElementById('checkPublished').checked = false;
}

// Valida que el nombre no este usado
function validateName(){
  let nameInput = document.getElementById('name');
  let addGameButton = document.getElementById('add-game-confirm');
  let validNameText = document.getElementById('valid-name-text');
  let invalidNameText = document.getElementById('invalid-name-text');
  const games = JSON.parse(localStorage.getItem('games')) || [];
  let gameExists = false;
  games.forEach(game =>{
    if(game.name.toLowerCase() == nameInput.value.toLowerCase()){
      gameExists = true;
    } 
  });
  if(gameExists){
    addGameButton.setAttribute('disabled', '');
    nameInput.classList.remove('is-valid');
    nameInput.classList.add('is-invalid');
    invalidNameText.classList.remove('d-none');
    validNameText.classList.add('d-none');
  } else {
    addGameButton.removeAttribute('disabled');
    nameInput.classList.remove('is-invalid');
    nameInput.classList.add('is-valid');
    validNameText.classList.remove('d-none');
    invalidNameText.classList.add('d-none');
  }
}

// Elimina un juego
function deleteGame(code) {
  const confirmDeleteButton = document.getElementById('confirmDelete');
  var modalDeleteConfirm = new bootstrap.Modal(
    document.getElementById('deleteGameModal')
  );
  modalDeleteConfirm.show();
  confirmDeleteButton.onclick = () => {
    const games = JSON.parse(localStorage.getItem("games")) || [];
    games.forEach((game) => {
      if (game.code == code) {
        const gamesFiltered = games.filter((game) => game.code != code);
        localStorage.setItem("games", JSON.stringify(gamesFiltered));
      }
    });
    renderGamesTable();
  };
}

// Modifica un juego
function modifyGame(code) {
  const modifyGameForm = document.getElementById('modifyGameForm');
  var modifyGameModal = new bootstrap.Modal(
    document.getElementById('modifyGameModal')
  );
  loadModifyInputs(code);
  modifyGameModal.show();
  modifyGameForm.onsubmit = function (e) {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.forEach((game) => {
      if (game.code == code) {
        e.preventDefault();

        const gameElements = e.target.elements;
        const name = gameElements.nameModify.value;
        const description = gameElements.descriptionModify.value;
        const category = gameElements.categoryModify.value;
        const videoUrl = gameElements.trailerUrlModify.value;
        const published = gameElements.checkPublishedModify.checked;

        game.name = name;
        game.description = description;
        game.category = category;
        game.videoUrl = videoUrl;
        game.published = published;
        games[game.code] = game;
        localStorage.setItem('games', JSON.stringify(games));
      }
    });
    renderGamesTable();
    modifyGameModal.hide();
  };
}

function loadModifyInputs(code){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  let nameInput = document.getElementById('nameModify');
  let descriptionInput = document.getElementById('descriptionModify');
  let categoryInput = document.getElementById('categoryModify');
  let trailerUrlInput = document.getElementById('trailerUrlModify');
  let checkPublishedInput = document.getElementById('checkPublishedModify');

  games.forEach(game =>{
    if(game.code == code){
      nameInput.value = game.name;
      descriptionInput.value = game.description;
      categoryInput.value = game.category;
      trailerUrlInput.value = game.videoUrl;
      checkPublishedInput.checked = game.published;
    }
  });
}

// Destaca un juego
function starGame(code) {
  if (isStarred(code) === true) {
    console.log('hola4');
    return;
  }
  const confirmStarButton = document.getElementById('confirmStar');
  var starGameModal = new bootstrap.Modal(
    document.getElementById('starGameModal')
  );
  starGameModal.show();
  confirmStarButton.onclick = () => {
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.forEach((game) => {
      game.starred = false;
      if (game.code == code) {
        game.starred = true;
        games[game.code] = game;
      }
      localStorage.setItem('games', JSON.stringify(games));
      renderGamesTable();
    });
  };
}

// Comprueba si el juego a destacar, ya se encuentra destacado y termina el proceso
function isStarred(code) {
  const games = JSON.parse(localStorage.getItem('games')) || [];
  games.forEach((game) => {
    if (game.code == code) {
      if (game.starred) {
        return true;
      } else return false;
    }
  });
}

// Genera un codigo al crear un juego
function generateGameCode() {
  const games = JSON.parse(localStorage.getItem('games')) || [];
  if (games.length) {
    gameCodes = games.map((game) => game.code);
    return Math.max(...gameCodes) + 1;
  }
  return 0;
}

// Busca juegos por su nombre
function searchGames() {
  const games = JSON.parse(localStorage.getItem('games')) || [];
  const gameCategory = document.getElementById('category-option-search').value;
  const gameName = document.getElementById('game-name-search').value;
  var gamesTableBody = document.getElementById('games-table-body');
  var foundGames = 0;

  gamesTableBody.innerHTML = '';
  games.forEach((game) => {
    if ((game.name.toLowerCase().indexOf(gameName.toLowerCase()) > -1) && gameCategory == 'all') {
      renderGame(game);
      foundGames++;
    }else if((game.name.toLowerCase().indexOf(gameName.toLowerCase()) > -1) && (game.category.toLowerCase().indexOf(gameCategory.toLowerCase()) > -1)){
      renderGame(game);
      foundGames++;
    }
    
  });

  if (foundGames != games.length) {
    changeGamesListInfo(`${foundGames} juegos encontrados.`);
  } else changeGamesListInfo(`${games.length} juegos en el catalogo.`);
}

// Carga la tabla con TODOS los juegos
function renderGamesTable() {
  const games = JSON.parse(localStorage.getItem('games')) || [];
  const gamesTableBody = document.getElementById('games-table-body');
  gamesTableBody.innerHTML = '';
  games.forEach((game) => {
    renderGame(game);
  });
  changeGamesListInfo(`${games.length} juegos en el catalogo.`);

}

// Pinta un juego en la tabla
function renderGame(game) {
  const gamesTableBody = document.getElementById('games-table-body');
  gamesTableBody.innerHTML += `
      <tr>
        <td>${game.code}</td>
        <td>${game.name}</td>
        ${getCategoryColorName(game)}
        <td>${game.rating}</td>
        <td>${getGameIsPublished(game)}</td>
        <td>
          <div class="d-flex justify-content-evenly">
            <button class="btn p-0" onclick="modifyGame(${game.code})"><i class="bi bi-pencil text-warning"></i></button>
            <button class="btn p-0" onclick="deleteGame(${game.code})"><i class="bi bi-trash text-danger"></i></button>
            ${getGameIsStarred(game)}
          </div>
        </td>
      </tr>
      `;
}

// Comprueba si un juego esta publicado y retorna su componente grafico
function getGameIsPublished(game){
  return (game.published) ? '<i class="bi bi-check-circle-fill text-primary"></i>' : '<i class="bi bi-check-circle text-primary"></i>';
}

// Comprueba si un juego esta publicado y retorna su componente grafico
function getGameIsStarred(game){
  return (game.starred) ? `<button class="btn p-0"><i class="bi bi-patch-check-fill text-success text-success"></i></button>` : `<button class="btn p-0" onclick="starGame(${game.code})"><i class="bi bi-patch-check text-success"></i></button>`; 
}

// Comprueba la categoria del juego y retorna su componente grafico
function getCategoryColorName(game){
  switch(game.category){
    case 'survival':
      return`<td class="${game.category} text-danger fw-bold">Supervivencia</td>`

    case 'shooter':
      return`<td class="${game.category} text-warning fw-bold">Disparos</td>`

    case 'strategy':
    return`<td class="${game.category} text-info fw-bold">Estrategia</td>`

    case 'simulation':
      return`<td class="${game.category} text-primary fw-bold">Simulacion</td>`

    case 'rpg':
        return`<td class="${game.category} text-success fw-bold">RPG</td>`

    default:
      return `<td class="${game.category} fw-bold">Otro</td>`
  }
}

// Cambia el texto de informacion de la tabla
function changeGamesListInfo(text) {
  let tableInfoText = document.getElementById('games-table-info-text');
  tableInfoText.innerHTML = text;
}

// Ordena la tabla alfabeticamente
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById('games-table');
  switching = true;
  // Establecemos la direccion de ordenado ASCENDENTE
  dir = 'asc';
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}