const addGameForm = document.getElementById('addGameForm');
const gamesTableBody = document.getElementById('games-table-body');
let games = JSON.parse(localStorage.getItem('games')) || [];

renderGamesTable();

// Agrega un juego
addGameForm.addEventListener('submit', (event) =>{
  event.preventDefault();

  const gameElements = event.target.elements;
  const name = gameElements.name.value;
  const description = gameElements.description.value;
  const category = gameElements.category.value;

  const game = {
    code: generateGameCode(),
    name: name,
    description: description,
    category: category,
    rating: 5,
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

function showModifyModal(code){
  const modifyGameForm = document.getElementById('modifyGameForm');
  var modalModifyGame = new bootstrap.Modal(document.getElementById('modifyGameModal'));
  modalModifyGame.show();
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

// Genera un codigo al crear un juego
function generateGameCode(){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  if(games.length){
    gameCodes = games.map(game => game.code)
    return (Math.max(...gameCodes) + 1);
  }
  return 0;
}

// Carga la tabla con TODOS los juegos
function renderGamesTable(){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  gamesTableBody.innerHTML = '';
  games.forEach(game =>{
    render(game);
  });
}

// Busca un juego por su nombre y lo carga en la tabla
function renderGamesTableSearch(gameName){
  const games = JSON.parse(localStorage.getItem('games')) || [];

  gamesTableBody.innerHTML = '';
  games.forEach(game =>{
    if(game.name.toLowerCase().indexOf(gameName.toLowerCase()) > -1){
      render(game);
    }
  });
}

// Pinta un juego en la tabla
function renderGame(game){
  gamesTableBody.innerHTML += `
      <tr>
      <td>${game.code}</td>
      <td>${game.name}</td>
      <td>${game.category}</td>
      <td>${game.rating}</td>
      <td>
        <div class="d-flex justify-content-evenly">
          <button class="btn" onclick="showModifyModal(${game.code})"><i class="bi bi-pencil text-primary"></i></button>
          <button class="btn" onclick="deleteGame(${game.code})"><i class="bi bi-trash text-danger"></i></button>
          <button class="btn" onclick="starGame(${game.code})"><i class="bi bi-star text-warning"></i></button>
        </div>
      </td>
      </tr>
      `
}