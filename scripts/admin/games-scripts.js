let games = JSON.parse(localStorage.getItem('games')) || [];

renderGamesTable();

// Agregar juego
function addGame(){
  cleanInputs();
  const addGameForm = document.getElementById('addGameForm');
  var addGameModal = new bootstrap.Modal(document.getElementById('addGameModal'));
  addGameModal.show();

  addGameForm.onsubmit = (e) =>{
    e.preventDefault();
    if(addGameValidation()){
      const gameElements = e.target.elements;
      const game = {
        code: generateGameCode(),
        name: gameElements.name.value,
        description: gameElements.description.value,
        category: gameElements.category.value,
        rating: 5,
        published: gameElements.checkPublished.checked,
        videoUrl: gameElements.trailerUrl.value,
        starred: false,
      };  

      games.push(game);
      localStorage.setItem('games', JSON.stringify(games));
      renderGamesTable();
      addGameModal.hide();
    }
  } 
}


// Vacia los campos al agregar un juego
function cleanInputs(){
  document.getElementById('name').value = '';
  document.getElementById('description').value = '';
  document.getElementById('trailerUrl').value = '';
  document.getElementById('checkPublished').checked = false;
}


// Elimina un juego
function deleteGame(code) {
  const confirmDeleteButton = document.getElementById('confirmDelete');
  var modalDeleteConfirm = new bootstrap.Modal(
    document.getElementById('deleteGameModal')
  );
  modalDeleteConfirm.show();
  confirmDeleteButton.onclick = () => {
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

  const confirmStarButton = document.getElementById('confirmStar');
  var starGameModal = new bootstrap.Modal(
    document.getElementById('starGameModal')
  );
  starGameModal.show();
  confirmStarButton.onclick = () => {
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

// Genera un codigo al crear un juego
function generateGameCode() {
  if (games.length) {
    gameCodes = games.map((game) => game.code);
    return Math.max(...gameCodes) + 1;
  }
  return 0;
}

// Busca juegos por su nombre
function searchGames() {
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
  /* El bucle se repite hasta que no se registren intercambios */
  while (switching) {
    // Empezamos sin intercambios
    switching = false;
    rows = table.rows;
    /* Iteramos las filas de las tablas, excepto las cabeceras */ 
    for (i = 1; i < rows.length - 1; i++) {
      // Empezamos diciendo que no deberia haber intercambios
      shouldSwitch = false;
      /* Tomamos dos elementos para comparar, uno de la fila actual y el otro de la siguiente */
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      /* Verificamos si las dos filas deben intercambiarse, segun direccion ascendente o descendente */
      if (dir == 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // Declaramos que deben intercambiar lugar
          shouldSwitch = true;
          break;
        }
      } else if (dir == 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // Declaramos que deben intercambiar lugar
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* Si deben intercambiar lugar, realiza el intercambio y se declara que se estan realizando intercambios */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Cada vez que un intercambio se realiza, aumenta el contador en 1
      switchcount++;
    } else {
      /* Si no se realizaron intercambios y la direccion es ascendente, se invierte la direccion y se continua con el bucle */
      if (switchcount == 0 && dir == 'asc') {
        dir = 'desc';
        switching = true;
      }
    }
  }
}

function addGameValidation(){
  return (validateName() && validateDescription() && validateTrailerUrl()) ? true : false;
}

function validateName(){
  const gameName = document.getElementById('name');
  let nameValidated = false;
  let gameExists = false;

  games.forEach(game =>{
    if(game.name.toLowerCase() == gameName.value.toLowerCase()){
      gameExists = true;
    }
  });

  if(gameExists){
    setError(gameName, 'Ya existe un juego con ese nombre.');
    nameValidated = false;
  } else if(gameName.value === ''){
    setError(gameName, 'Debe ingresar un nombre');
    nameValidated = false;
  } else if(gameName.value.length < 2){
    setError(gameName, 'El nombre debe ser mas largo.');
    nameValidated = false;
  } else {
    setSuccess(gameName);
    nameValidated = true;
  }

  return nameValidated;
}

function validateDescription(){
  const gameDescription = document.getElementById('description');
  let descriptionValidated = false;

  if(gameDescription.value === ''){
    setError(gameDescription, 'Ingrese una descripcion.');
    descriptionValidated = false;
  } else if(gameDescription.value.length < 10){
    setError(gameDescription, 'Ingrese una descripcion mas larga.');
    descriptionValidated = false;
  } else {
    setSuccess(gameDescription);
    descriptionValidated = true;
  }
  console.log('desc: ' + descriptionValidated);
  return descriptionValidated;
}

function validateTrailerUrl(){
  const gameURL = document.getElementById('trailerUrl');
  const regexForYT = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
  let urlValidated = false;

  if(gameURL.value === ''){
    setError(gameURL, 'Ingrese un enlace.');
    urlValidated = false;
  } else if(!(regexForYT.test(String(gameURL.value.toLowerCase())))){
    setError(gameURL, 'No ingreso un enlace valido.');
    urlValidated = false;
  } else {
    setSuccess(gameURL);
    urlValidated = true;
  } 
  console.log('url: ' + urlValidated);
  return urlValidated;
}

function setError(element, message){
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const addGameButton = document.getElementById('add-game-confirm');

  errorDisplay.innerText = message;
  errorDisplay.classList.add('invalid-feedback');
  element.classList.remove('is-valid');
  element.classList.add('is-invalid');
  addGameButton.setAttribute('disabled', '');
}

function setSuccess(element){
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const addGameButton = document.getElementById('add-game-confirm');

  errorDisplay.innerText = '';
  errorDisplay.classList.remove('invalid-feedback');
  element.classList.remove('is-invalid');
  element.classList.add('is-valid');
  addGameButton.removeAttribute('disabled');
}