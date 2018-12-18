//game variables
const CANVAS_WIDTH = 505;
const ALL_STARS = document.querySelector('.stars').innerHTML;
let score = 0;
let starHolder = 3;
// let score = parseInt(document.getElementsByClassName('score')[0].innerText);

//Game Sound object constructor below from https://www.w3schools.com/graphics/game_sound.asp
let Sound = function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
  }
  this.stop = function() {
    this.sound.pause();
  }
};
//sound variables and objects
const BOING = new Sound("sounds/boing.wav");
const WHAH_WHAH = new Sound("sounds/whah_whah.wav");
const WALKING = new Sound("sounds/walking.wav");
const SUCCESS = new Sound("sounds/fanfare.wav");

// Enemies our player must avoid
const Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  //positioning variables below:
  this.x = 0;
  this.y = Math.floor(Math.random() * (310 - 60)) + 60;
  // this.y = Math.floor((Math.random() * 350) + 1);;
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';

  //speed variable below, randomizer from https://www.w3schools.com/jsref/jsref_random.asp:
  this.speed = Math.floor((Math.random() * 200) + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  //The canvas width= 505 in engine.js
  this.x += (this.speed * dt);

  if (this.x >= CANVAS_WIDTH) {
    this.x = 0;
    this.y = Math.floor(Math.random() * (310 - 60)) + 60;
  }
  this.checkCollisions();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.height = Resources.get(this.sprite).height; //used later to determine collisions
  this.width = Resources.get(this.sprite).width;
};

//Each Enemy object will check to see how close it is to the player. A buffer was added around the player which counts as part of the "hit" zone
Enemy.prototype.checkCollisions = function() {
  if ((player.x <= this.x + .7 * this.width) &&
    (player.y <= this.y + .4 * this.height) &&
    (this.x <= player.x + .7 * player.width) &&
    (this.y <= player.y + .4 * player.height)) {
    // Subtract a star
    // reset the player position to the start position
    player.reset();
    deductStars();
    // Play collision sound
    BOING.play();
  }
};

function deductStars() {
  let stars = document.getElementsByClassName('stars')[0];

  if (starHolder > 0) {
    stars.lastElementChild.remove();
    starHolder--
  }

  if (starHolder === 0) {
    gameFinished();
  }
}
/* resetStars is invoked in the when restart button hit*/

let starContainer = document.querySelector('.stars');

function resetStars() {
  starContainer.innerHTML = ALL_STARS;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const playerStartX = 200;
const playerStartY = 410;

let Player = function() {
  this.sprite = 'images/char-cat-girl.png';
  this.x = playerStartX;
  this.y = playerStartY;
  this.speed = 10;
}

Player.prototype.update = function(dt) {
  //canvas.height=606 in engine.js
  if (this.y <= 0) {
    this.y = playerStartY;
    this.x = playerStartX;
    scoreUp();
    // play success sound
    SUCCESS.play();
  } else if (this.y >= 410) {
    this.y = 410; //keeps player from going below canvas
  }
  //keeps player going off canvas left/right
  if (this.x < 0) {
    this.x = 0;
  } else if (this.x > CANVAS_WIDTH - 90) {
    this.x = CANVAS_WIDTH - 90;
  }

};

Player.prototype.reset = function() {
    this.y = playerStartY;
    this.x = playerStartX;
};

function scoreUp() {
  score += 100;
  renderScore(score);
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  this.height = Resources.get(this.sprite).height; //needed to determine collisions
  this.width = Resources.get(this.sprite).width;
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'left':
      this.x -= this.speed + 25;
      break;
    case 'up':
      this.y -= this.speed + 25;
      break;
    case 'right':
      this.x += this.speed + 25;
      break;
    case 'down':
      this.y += this.speed + 25;
  }
}

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

for (let i = 0; i < 4; i++) {
  allEnemies.push(new Enemy());
}

let player = new Player();
let enemy = new Enemy();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  // play the walking sound
  WALKING.play();
  player.handleInput(allowedKeys[e.keyCode]);
});

/* This function launches modal with congratulations screen and contains the final score, number of stars and a play again button  */
function gameFinished() {
  displayModal();
  toggleModal();
  WHAH_WHAH.play();
  enemy.speed = 0;
}

function toggleModal() {
  displayModal();
  $('.modal').modal('show');
}

function displayModal() {
  let message = `You earned a score of ${score}!`;
  document.getElementsByClassName('modal-announcement')[0].textContent = message;
}

function renderScore(score) {
  document.getElementsByClassName('score')[0].innerText = score;
}

let refreshButton = document.getElementsByClassName('restart')[0];

refreshButton.addEventListener('click', restart);

function restart() {
  renderScore(0);
  starHolder = 3;
  resetStars();
  $('.modal').modal('hide');
}
