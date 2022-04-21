const addGameForm = document.getElementById('addGameForm');
const gamesTableBody = document.getElementById('games-table-body');
let games = JSON.parse(localStorage.getItem('games')) || [];

renderGamesTable();

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

modifyGameForm.addEventListener('submit', (event)=>{
  event.preventDefault();

  const games = JSON.parse(localStorage.getItem('games')) || [];

  const gameElements = event.target.elements;
  const name = gameElements.name.value;
  const description = gameElements.description.value;
  const category = gameElements.category.value;

  
});

function renderGamesTable(){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  gamesTableBody.innerHTML = '';
  games.forEach(game =>{
    gamesTableBody.innerHTML += `
    <tr>
    <td>${game.code}</td>
    <td>${game.name}</td>
    <td>${game.category}</td>
    <td>${game.rating}</td>
    <td>
      <div class="d-flex justify-content-evenly">
        <button class="btn btn-link p-0" onclick="modifyGame(${game.code})"><i class="bi bi-pencil text-primary"></i></button>
        <button class="btn btn-link p-0" onclick="deleteGame(${game.code})"><i class="bi bi-trash text-danger"></i></button>
        <button class="btn btn-link p-0" onclick="starGame(${game.code})"><i class="bi bi-star text-warning"></i></button>
      </div>
    </td>
    </tr>
    `
  });
}

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

function modifyGame(code){
  const confirmModifyButton = document.getElementById('confirmModify');
  var modalModifyGame = new bootstrap.Modal(document.getElementById('modifyGameModal'));
  modalModifyGame.show();
  confirmModifyButton.onclick = () =>{
    const games = JSON.parse(localStorage.getItem('games')) || [];
    games.forEach(game => {
      if(game.code == code){
        const gamesFiltered = games.filter(game => game.code != code);
        localStorage.setItem('games', JSON.stringify(gamesFiltered));
      }
    });
    renderGamesTable();
  }


//   const games = JSON.parse(localStorage.getItem) || [];
//   games.forEach(game => {
//     if(game.code == code){
//       game.name = name,
//       game.description = description,
//       game.category = category,
//     }
//   })
}

function generateGameCode(){
  const games = JSON.parse(localStorage.getItem('games')) || [];
  if(games.length){
    gameCodes = games.map(game => game.code)
    return (Math.max(...gameCodes) + 1);
  }
  return 0;
}

function renderGamesTableSearch(gameName){
  const games = JSON.parse(localStorage.getItem('games')) || [];

  gamesTableBody.innerHTML = '';
  games.forEach(game =>{
    if(game.name.toLowerCase().indexOf(gameName.toLowerCase()) > -1){
      gamesTableBody.innerHTML += `
      <tr>
      <td>${game.code}</td>
      <td>${game.name}</td>
      <td>${game.category}</td>
      <td>${game.rating}</td>
      <td>
        <div class="d-flex justify-content-evenly">
          <button class="btn" onclick="modifyGame(${game.code})"><i class="bi bi-pencil text-primary"></i></button>
          <button class="btn" onclick="deleteGame(${game.code})"><i class="bi bi-trash text-danger"></i></button>
          <button class="btn" onclick="starGame(${game.code})"><i class="bi bi-star text-warning"></i></button>
        </div>
      </td>
      </tr>
      `
    }
  });
}
