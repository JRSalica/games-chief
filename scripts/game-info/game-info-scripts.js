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
    const videoUrl = document.getElementById('video-url');
    let selectedGame = null;

    games.forEach((game) => {
      if(game.code == gameCode){
        selectedGame = game;
      }
    });

    loadImages(selectedGame.code);

    nameTag.innerHTML = selectedGame.name;
    categoryTag.innerHTML = selectedGame.category;
    descriptionTag.innerHTML = selectedGame.description;
    priceTag.innerHTML = `Comprar - $${selectedGame.price.toUpperCase()}`;
    devTag.innerHTML = `&gt ${selectedGame.dev}`;
    yearTag.innerHTML = `&gt ${selectedGame.year}`;
    platformTag.innerHTML = `&gt ${selectedGame.platform.toUpperCase()}`;
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

  // Crea juegos de forma provisional
// function createGames(){
//   let gamesArr = [
//     {
//       code: 1, 
//       name: 'Half-Life', 
//       category: 'shooter',
//       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est optio omnis facilis deleniti similique, possimus nemo beatae et asperiores quisquam! Expedita non, perspiciatis minima a repellat commodi quos ratione architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam beatae ea molestias aspernatur nisi, tempora voluptate eos libero quae debitis soluta maiores accusamus ipsa commodi. Facilis minima ducimus est quaerat.', 
//       price:'100', 
//       developer:'Valve',
//       year: '1998',
//       platform: 'PC',
//       rating: 'M',
//       coverUrl: 'https://upload.wikimedia.org/wikipedia/en/f/fa/Half-Life_Cover_Art.jpg',
//       trailerUrl: 'https://www.youtube.com/embed/wtIp8jOo8_o',
//     }, 
//     {
//       code: 2, 
//       name: 'Portal', 
//       category: 'puzzle',
//       description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est optio omnis facilis deleniti similique, possimus nemo beatae et asperiores quisquam! Expedita non, perspiciatis minima a repellat commodi quos ratione architecto architecto.', 
//       price:'200', 
//       developer:'ValvE',
//       year: '2007',
//       platform: 'PC/Xbox',
//       rating: 'A',
//       coverUrl: 'https://i1.theportalwiki.net/img/thumb/b/b8/PortalBoxart.jpg/617px-PortalBoxart.jpg',
//       trailerUrl: 'https://www.youtube.com/embed/zQhCTRHYBZQ',
//     },
//   ];

//   localStorage.setItem('gamesStorage', JSON.stringify(gamesArr));
// }


