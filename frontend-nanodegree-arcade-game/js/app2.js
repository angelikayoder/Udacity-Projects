//Player Picker TODO: make this work!!
let playerImg = "images/char-cat-girl.png";

function playerImgSaver() {
  let answer = prompt("Please choose the number of the player you'd like to be:\n1: pink-girl\n2: horn-girl\n3:cat-girl\n4:princess-girl\n5:blue-boy");
  console.log(answer);
  switch (answer) {
    case 1:
      playerImg = "images/char-pink-girl.png";
      break;
    case 2:
      playerImg = "images/char-horn-girl.png";
      break;
    case 3:
      playerImg = "images/char-cat-girl.png";
      break;
    case 4:
      playerImg = "images/char-princess-girl.png";
      break;
    case 5:
      playerImg = "images/char-boy.png";
  }
  return playerImg;
}

//Game Variables

let maxWidth = 505;
let maxHeight = 606;
let nRows = 6;
let nCols = 5;
let tileWidth = maxWidth / nCols;
let tileHeight = 83;
let allEnemies = [];
let startX;
let startY = tileHeight * ( nRows - 1 );
let gameLevel = 1;
let lives = 0;
let maxLives = 5;
let enemyMinY = tileHeight + 10;
let enemyMaxY = ( tileHeight * 4 ) - 20;
let speedMin = 50;
let speedMax = 150;
let moveX = tileWidth / 3;
let moveY = tileHeight / 3;
// let playerImg = 'images/char-boy.png'
let enemyImg = ['images/enemy-bug.png', 'images/enemy-bug.png', 'images/enemy-bug.png', 'images/enemy-bug.png', 'images/enemy-bug.png', 'images/enemy-bug.png' ]


//creates sprite gamepiece property which all attributes all gamepieces need, both player and enemy
let Sprite = function (x, y, rate, sprite) {
  this.x = x; //starting postition on x axis
  this.y = y; //starting postition on x axis
  this.rate = rate; //speed of movement
  this.sprite = sprite; //image used for piece
}

//draws all sprite images to screen. Extracted out and refactored from original code to include both player and enemy sprites since they share these commonalities. Function also stores height & width of sprite to determine proximity of players to enemies.

Sprite.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.height = Resources.get(this.sprite).height;
    this.width = Resources.get(this.sprite).width;
};

// Enemies our player must avoid

class Enemy extends Sprite {
  constructor(x, y, rate, sprite) {
    super(this);
    this.name = "Enemy";
  }
}
let Enemy = function(x, y, rate, sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
