const addGameForm = document.getElementById('addGameForm');
const gamesTableBody = document.getElementById('games-table-body');


renderGamesTable();

// Agrega un juego
addGameForm.addEventListener('submit', (event) =>{
  let games = JSON.parse(localStorage.getItem('games')) || [];
  event.preventDefault();

  const gameElements = event.target.elements;
  const name = gameElements.name.value;
  const description = gameElements.description.value;
  const category = gameElements.category.value;
  const published =gameElements.checkPublished.checked;
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
  }

  games.push(game);

  localStorage.setItem('games', JSON.stringify(games));
  renderGamesTable();
});

// Elimina un juego
function deleteGame(code){
  const confirmDeleteButton = document.getElementById('confirmDelete');
  var modalDeleteConfirm = new bootstrap.Modal(document.getElementById('deleteGameModal'));
  modalDeleteConfirm.show();
  confirmDeleteButton.onclick = () =>{
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.forEach(game => {
      if(game.code == code){
        const gamesFiltered = games.filter(game => game.code != code);
        localStorage.setItem('games', JSON.stringify(gamesFiltered));
      }
    });
    renderGamesTable();
  }
}

// Modifica un juego
function modifyGame(code){
  const modifyGameForm = document.getElementById('modifyGameForm');
  var modifyGameModal = new bootstrap.Modal(document.getElementById('modifyGameModal'));
  modifyGameModal.show();
  modifyGameForm.onsubmit = function(e){
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.forEach(game =>{
      if(game.code == code){
        e.preventDefault();

        const gameElements = e.target.elements;
        const name = gameElements.name.value;
        const description = gameElements.description.value;
        const category = gameElements.category.value;
        game.name = name;
        game.description = description;
        game.category = category;
        games[game.code] = game;
        localStorage.setItem('games', JSON.stringify(games));
      }
    });
    renderGamesTable();
  }
}

// Destacar un juego
function starGame(code){
  if(isStarred(code)){
    return;
  }
  const confirmStarButton = document.getElementById('confirmStar');
  var starGameModal = new bootstrap.Modal(document.getElementById('starGameModal'));
  starGameModal.show();
  confirmStarButton.onclick = ()=>{
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.forEach(game => {
      game.starred = false;
      if(game.code == code){
        game.starred = true;
        games[game.code] = game;
      }
      localStorage.setItem('games', JSON.stringify(games));
      renderGamesTable();
    });
  }
}

// Comprueba si el juego a destacar, ya se encuentra destacade y termina el proceso
function isStarred(code){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  games.forEach(game =>{
    if(game.code == code){
      if(game.starred){
        return true;
      } else return false;
    }
  });
}

// Genera un codigo al crear un juego
function generateGameCode(){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  if(games.length){
    gameCodes = games.map(game => game.code)
    return (Math.max(...gameCodes) + 1);
  }
  return 0;
}

// Busca un juego segun el dato elegido y lo carga en la tabla
function renderGamesTableSearch(searchTerm){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  const searchOption = document.getElementById('search-option').value;
  var foundGames = 0;

  gamesTableBody.innerHTML = '';
  games.forEach(game =>{
    if(searchOption == 'name'){
      if(game.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
        renderGame(game);
        foundGames++;
      }
    }
    else {
      if(game.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1){
        renderGame(game);
        foundGames++;
      }
    }
  });

  if(foundGames != games.length){
    changeGameListInfo(`${foundGames} juegos encontrados.`)
  }
  else changeGameListInfo(`${games.length} juegos en el catalogo.`);
  
}

// Carga la tabla con TODOS los juegos
function renderGamesTable(){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  gamesTableBody.innerHTML = '';
  games.forEach(game =>{
    renderGame(game);
  });
}

// Pinta un juego en la tabla
function renderGame(game){
  let gamePublish = '';
  let gameStarred = '';
  
  if(game.published === true){
    gamePublish = '<i class="bi bi-check-circle-fill text-primary"></i>';
  } else gamePublish = '<i class="bi bi-check-circle text-primary"></i>';

  if(game.starred == true){
    gameStarred = '<i class="bi bi-patch-check-fill text-success text-success"></i>';
  } else gameStarred = '<i class="bi bi-patch-check text-success"></i>';

  gamesTableBody.innerHTML += `
      <tr>
      <td>${game.code}</td>
      <td>${game.name}</td>
      <td>${game.category}</td>
      <td>${game.rating}</td>
      <td>${gamePublish}</td>
      <td>
        <div class="d-flex justify-content-evenly">
          <button class="btn p-0" onclick="modifyGame(${game.code})"><i class="bi bi-pencil text-warning"></i></button>
          <button class="btn p-0" onclick="deleteGame(${game.code})"><i class="bi bi-trash text-danger"></i></button>
          <button class="btn p-0" onclick="starGame(${game.code})">${gameStarred}</button>
        </div>
      </td>
      </tr>
      `
}

// Cambia el texto de informacion de la tabla 
function changeGameListInfo(text){
  let tableInfoText = document.getElementById('table-info-text');
  tableInfoText.innerHTML = text;
}

// Ordena la tabla alfabeticamente
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("games-table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
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
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}