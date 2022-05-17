createGames()
createUsers();

// Crea juegos de forma provisional
function createGames(){
  let gamesArr = [
    {
      code: 0, 
      name: 'Half-Life', 
      category: 'shooter',
      description:'El Dr Gordon Freeman no habla ni una sola palabra, pero tiene un infierno de historia para contarte, una historia revolucionaria que puede no ser todo lo que parece, contada no a través de las escenas, sino del entorno visual.', 
      price:'100', 
      dev:'Valve',
      year: '1998',
      platform: 'pc',
      videoUrl: 'https://www.youtube.com/embed/wtIp8jOo8_o',
      published: true,
      starred: false,
    }, 
    {
      code: 1, 
      name: 'Portal', 
      category: 'puzzle',
      description:'Chell, y su nuevo amigo robot, Wheatley, se enfrentan a más puzzles concebidos por GLaDOS, una I.A. con el único propósito de probar la Pistola de Portales y vengarse de Chell por los sucesos de Portal.', 
      price:'200', 
      dev:'Valve',
      year: '2007',
      platform: 'pc',
      videoUrl:"https://www.youtube.com/embed/tax4e4hBBZc",
      published: true,
      starred: false,
    },
    {
      code: 2, 
      name: 'Half Life Alyx', 
      category: 'shooter',
      description:'Half-Life: Alyx es el regreso de Valve a la serie Half-Life. Es la historia de una lucha imposible contra una despiadada raza alienígena conocida como los Combine. Ambientado entre los acontecimientos de Half-Life y Half-Life 2, Alyx Vance y su padre Eli montan una resistencia temprana a la brutal ocupación de la Tierra por parte de los Combine. ', 
      price:'1000', 
      dev:'Valve',
      year: '2020',
      platform: 'vr',
      videoUrl:"https://www.youtube.com/embed/O2W0N3uKXmo",
      published: true,
      starred: true,
    },
    {
      code: 3, 
      name: 'Age Of Empires IV', 
      category: 'strategy',
      description:'Age of Empires IV te ofrece una experiencia de estrategia en tiempo real evolucionado a una nueva generación. Poniéndote en el centro de épicas batallas históricas que dieron forma al mundo.', 
      price:'600', 
      dev:'Microsoft',
      year: '2021',
      platform: 'xbox',
      videoUrl:"https://www.youtube.com/embed/QFlVNtGJVDU",
      published: true,
      starred: false,
    },
  ];

  localStorage.setItem('games', JSON.stringify(gamesArr));
}

// Crea usuarios de forma provisional
function createUsers(){
  let users = JSON.parse(localStorage.getItem('users')) || [];
  currentAdmin = {avatar: 'https://gravatar.com/avatar/49336876fa3410db4538cd94c91c9ee7?s=100&d=robohash&r=x', username: 'TheChief', email:'gameschief@email.com', password:'gameschief2022', role:'admin', status:'approved'};
  if(users.length == 0){
    let usersArr = [
      currentAdmin,
      {avatar: 'https://gravatar.com/avatar/a02f0cd317c4805ecc316db0e3741327?s=100&d=robohash&r=x', username: 'JRSalica', email:'salicajorge@email.com', password:'gameschief2022', role:'admin', status:'approved'}, 
      {avatar: 'https://gravatar.com/avatar/cfe3c204bd9f5cb4fcbd61cf109d947c?s=100&d=robohash&r=x', username: 'JRSickness', email:'jrsick@email.com', password:'gameschief2022', role:'user', status:'suspended'},
      {avatar: 'https://gravatar.com/avatar/8c66a907354c524c525441815415b338?s=100&d=robohash&r=x', username: 'JRSystems', email:'jrsystems.jr@email.com', password:'gameschief2022', role:'user', status:'pending'},
      {avatar: 'https://gravatar.com/avatar/1ba8e6babcb532aa831a055c68aaff25?s=100&d=robohash&r=x', username: 'JRSoul', email:'soulofjr@email.com', password:'gameschief2022', role:'user', status:'approved'},
    ];
    localStorage.setItem('currentUser', JSON.stringify(currentAdmin));
    localStorage.setItem('users', JSON.stringify(usersArr));
  }
}