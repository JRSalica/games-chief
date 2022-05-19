window.addEventListener('load', ()=> {
  let queryString = window.location.search;
  let params = new URLSearchParams(queryString);
  const GAME_CODE = parseInt(params.get("code"));
  // createGames();
  loadGameInfo(GAME_CODE);
  });

  // Recibe el codigo del juego y lo carga en la pagina
  function loadGameInfo(gameCode){
    const games = JSON.parse(localStorage.getItem('games')) || [];
    const nameTag = document.getElementById('name-tag');
    const categoryTag = document.getElementById('category-tag');
    const descriptionTag = document.getElementById('description-tag');
    const priceTag = document.getElementById('price-tag');
    const devTag = document.getElementById('dev-tag');
    const yearTag = document.getElementById('year-tag');
    const platformTag = document.getElementById('platform-tag');
    const categoryBadge = document.getElementById('category-badge');
    const platformBadge = document.getElementById('platform-badge');
    const videoUrl = document.getElementById('video-url');
    let selectedGame = null;

    games.forEach((game) => {
      if(game.code == gameCode){
        selectedGame = game;
      }
    });

    loadImages(selectedGame.code);

    nameTag.innerHTML = selectedGame.name;
    categoryTag.innerHTML = `&gt ${selectedGame.category}`;
    descriptionTag.innerHTML = selectedGame.description;
    priceTag.innerHTML = `<i class="bi bi-cart-plus-fill pe-2"></i>Comprar - $${selectedGame.price}`;
    devTag.innerHTML = `&gt ${selectedGame.dev}`;
    yearTag.innerHTML = `&gt ${selectedGame.year}`;
    platformTag.innerHTML = `&gt ${selectedGame.platform.toUpperCase()}`;
    categoryBadge.innerHTML = loadCategoryElement(selectedGame.category);
    platformBadge.innerHTML = loadPlatformElement(selectedGame.platform);
    videoUrl.setAttribute('src', selectedGame.videoUrl);
  }

  function loadImages(gameCode){
    const coverImage = document.getElementById('cover-image');
    const carouselImage1 = document.getElementById('carousel-image-1');
    const carouselImage2 = document.getElementById('carousel-image-2');
    const carouselImage3 = document.getElementById('carousel-image-3');
    switch(gameCode){
      case 0:
        coverImage.setAttribute('src', '../assets/images/games-info/half-life/halflife-cover.jpg');
        carouselImage1.setAttribute('src', '../assets/images/games-info/half-life/halflife-carousel1.png');
        carouselImage2.setAttribute('src', '../assets/images/games-info/half-life/halflife-carousel2.png');
        carouselImage3.setAttribute('src', '../assets/images/games-info/half-life/halflife-carousel3.png');
        break;
      case 1:
        coverImage.setAttribute('src', '../assets/images/games-info/portal-2/portal2-cover.jpg');
        carouselImage1.setAttribute('src', '../assets/images/games-info/portal-2/portal2-carousel1.jpg');
        carouselImage2.setAttribute('src', '../assets/images/games-info/portal-2/portal2-carousel2.jpg');
        carouselImage3.setAttribute('src', '../assets/images/games-info/portal-2/portal2-carousel3.jpg');
        break;
      case 2:
        coverImage.setAttribute('src', '../assets/images/games-info/half-life-alyx/halflifealyx-cover.png');
        carouselImage1.setAttribute('src', '../../assets/images/games-info/half-life-alyx/halflifealyx-carousel1.jpg');
        carouselImage2.setAttribute('src', '../../assets/images/games-info/half-life-alyx/halflifealyx-carousel2.jpg');
        carouselImage3.setAttribute('src', '../assets/images/games-info/half-life-alyx/halflifealyx-carousel3.png');
        break;
      case 3:
        coverImage.setAttribute('src', '../assets/images/games-info/age-of-empires-iv/ageofempiresiv-cover.png');
        carouselImage1.setAttribute('src', '../assets/images/games-info/age-of-empires-iv/ageofempiresiv-carousel1.jpg');
        carouselImage2.setAttribute('src', '../assets/images/games-info/age-of-empires-iv/ageofempiresiv-carousel2.jpg');
        carouselImage3.setAttribute('src', '../assets/images/games-info/age-of-empires-iv/ageofempiresiv-carousel3.jpg');
        break;
    }
  }

function loadCategoryElement(category){
  switch(category){
    case 'shooter':
      return`<p class="badge bg-danger fs-6"><i class="bi bi-bullseye pe-2"></i>Disparos</p>`

    case 'puzzle':
      return`<p class="badge bg-warning text-black fs-6"><i class="bi bi-puzzle pe-2 text-black"></i>Puzzle</p>`

    case 'strategy':
    return`<p class="badge bg-info text-black fs-6"><i class="bi bi-pie-chart pe-2 text-black"></i>Estrategia</p>`

    default:
      return`<p class="badge bg-dark fs-6"><i class="bi bi-controller pe-2"></i>Otro</p>`;
  }
}

function loadPlatformElement(platform){
  switch(platform){
    case 'pc':
      return`<p class="badge bg-dark fs-6"><i class="bi bi-pc-display pe-2"></i>PC</p>`

    case 'ps5':
      return`<p class="badge bg-dark fs-6"><i class="bi bi-playstation pe-2"></i>PS5</p>`

    case 'xbox':
    return`<p class="badge bg-dark fs-6"><i class="bi bi-xbox pe-2 "></i>XBOX</p>`

    case 'vr':
    return`<p class="badge bg-dark fs-6"><i class="bi bi-headset-vr pe-2"></i>VR</p>`

    default:
      return`<p class="badge bg-dark fs-6"><i class="bi bi-controller pe-2"></i>Otro</p>`;
  }
}
