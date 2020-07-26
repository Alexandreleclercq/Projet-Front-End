var canvas = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var scoring = document.getElementById("afficheScore"); // on récupère l'élément span lié à l'affichage du score
var compteurVoituresDepassees = 0; // declaration variable qui comptera le nombre de voitures dépassées.
var rightArrow = false;
var leftArrow = false;
var upArrow = false;
var downArrow = false;
var game_over = false;
var ranPos;
var ranSpeed;
var signal = true;
var win = document.getElementById("win");
var lose = document.getElementById("lose");
var road = new Image();
road.src = "route.png";

//**********variable car player****************//
var playerImg = new Image();
playerImg.src = "player.png"; //source picture car player//

var ennemyImg_1 = new Image();
ennemyImg_1.src = "ennemy.png";

var ennemyImg_2 = new Image();
ennemyImg_2.src = "ennemy.png";

var ennemyImg_3 = new Image();
ennemyImg_3.src = "ennemy.png";

//***************variable road move***********//
var yoffset = -500;

const carFactory = function (x, y, width, height, speed) {
  const Car = {
    positionX: x,
    positionY: y,
    width: width,
    height: height,
    speed: speed,
  };
  return Car;
};
/*****************coordonnées***************/
var player = carFactory(175, 700, 50, 100, 5);
var ennemy_1 = carFactory(50, -389, 50, 100, ranSpeed);
var ennemy_2 = carFactory(175, -123, 50, 100, ranSpeed);
var ennemy_3 = carFactory(300, -532, 50, 100, ranSpeed);
var ennemiesArray = [ennemy_1, ennemy_2, ennemy_3];
/********************contrôles******************/
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    rightArrow = true;
    leftArrow = false;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    leftArrow = true;
    rightArrow = false;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    upArrow = true;
    downArrow = false;
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    downArrow = true;
    upArrow = false;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();
    rightArrow = false;
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    leftArrow = false;
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    upArrow = false;
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    downArrow = false;
  }
});
//**************call road**************************/
function drawRoad() {
  context.drawImage(road, 0, yoffset);
  context.drawImage(road, 0, yoffset + 380);
  context.drawImage(road, 0, yoffset + 760);
  context.drawImage(road, 0, yoffset + 1140);
  if (signal) {
    if (yoffset >= 0) yoffset = -380;
    yoffset += 5;
  }
}

//**************call car *****************//

function drawPlayer() {
  context.drawImage(playerImg, player.positionX, player.positionY);
}

function drawEnnemies() {
  context.beginPath();
  context.drawImage(ennemyImg_1, ennemy_1.positionX, ennemy_1.positionY);
  context.drawImage(ennemyImg_2, ennemy_2.positionX, ennemy_2.positionY);
  context.drawImage(ennemyImg_3, ennemy_3.positionX, ennemy_3.positionY);
  return { ennemy_1, ennemy_2, ennemy_3 };
}
//***************movement******************//
function movePlayer() {
  if (leftArrow && player.positionX > 50) {
    rightArrow = false;
    player.positionX -= player.speed;
  } else if (rightArrow && player.positionX < canvas.width - player.width - 50) {
    leftArrow = false;
    player.positionX += player.speed;
  } else if (upArrow && player.positionY > canvas.height / 2) {
    downArrow = false;
    player.positionY -= player.speed;
  } else if (downArrow && player.positionY < canvas.height - player.height) {
    upArrow = false;
    player.positionY += player.speed;
  }
}

function moveEnnemies(carplayer) {
  if (signal) {
    ennemiesArray.forEach((ennemy) => {
      ranPos = Math.floor(Math.random() - 1.5) * 150;
      ranSpeed = Math.random() * 5 + 3;
      if (ennemy.positionY > canvas.height) {
        compteurVoituresDepassees++; // le player vient de dépasser une voiture ennemie on incrémente le compteur de voitures dépassées
        ennemy.positionY = ranPos;
      }
      ennemy.positionY += ranSpeed;

      if (
        player.positionX < ennemy.positionX + ennemy.width - 5 &&
        carplayer.positionX + carplayer.width - 5 > ennemy.positionX &&
        carplayer.positionY <= ennemy.positionY + ennemy.height - 5 &&
        carplayer.positionY + carplayer.height >= ennemy.positionY - 5
      ) {
        signal = false;
        lose.style.display = "flex"; // affichage de la div id#lose s'il y a collision
        player.speed = 0;
      } else if (compteurVoituresDepassees === 20) {
        win.style.display = "flex";
        signal = false;
        player.speed = 0;
      }
    });
  }
}

// gestion evenement clic sur bouton CV
bouton1.addEventListener("click", () => {
  window.location.assign("./CV.pdf");
});

bouton3.addEventListener("click", () => {
  window.location.assign("./CV.pdf");
});


// gestion evenement clic sur bouton restart
bouton2.addEventListener("click", () => {
  window.location.reload(true);
});

bouton4.addEventListener("click", () => {
  window.location.reload(true);
});

function gameloop() {
  requestAnimationFrame(gameloop);
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawPlayer();
  drawEnnemies();
  movePlayer();
  moveEnnemies(player);
  scoring.innerHTML = `Score: ${compteurVoituresDepassees}`;  // affectation à la propriété textContent de l'élément scoring de notre nouvelle valeur afin d'actualiser le score
}
gameloop();



