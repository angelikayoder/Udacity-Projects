/*
 * List holds all possible cards
 */
const deck = [
  'fa fa-diamond',
  'fa fa-paper-plane-o',
  'fa fa-anchor',
  'fa fa-bolt',
  'fa fa-cube',
  'fa fa-anchor',
  'fa fa-leaf',
  'fa fa-bicycle',
  'fa fa-diamond',
  'fa fa-bomb',
  'fa fa-leaf',
  'fa fa-bomb',
  'fa fa-bolt',
  'fa fa-bicycle',
  'fa fa-paper-plane-o',
  'fa fa-cube'
];

/* Event handler for to reset/restart/reshuffle game */
let refreshButton = document.getElementsByClassName('restart')[0];

refreshButton.addEventListener('click', restart);

function restart() {
  renderDeck(shuffle(deck));
  resetMoves();
  resetStars();
  resetTimer();
  wiggleRefresh();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(deck) {
  var currentIndex = deck.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = deck[currentIndex];
    deck[currentIndex] = deck[randomIndex];
    deck[randomIndex] = temporaryValue;
  }

  return deck;
}

/* removes classes 'open' and 'show' so all slready shuffled cards appear face down */
let wholeDeck = document.getElementsByClassName('card');

function renderDeck(shuffledDeck) {
  for (let i = 0; i < shuffledDeck.length; i++) {
    wholeDeck[i].className = 'card';
    wholeDeck[i].lastElementChild.className = shuffledDeck[i];
  }
}

/* Event Listner to see if card is clicked and adds it to array */
let clickedCards = [];

for (let i = 0; i < wholeDeck.length; i++) {
  wholeDeck[i].addEventListener('click', cardOpener);
}

/* sets card class to open and show */
function cardOpener() {
  clickedCards.push(this);
  this.classList.toggle('open');
  this.classList.toggle('show');
  if (clickedCards.length === 2) {
    setTimeout(compare, 500);
  }
  countMoves();
}

/* Changes cards class to match if classes match then empties clickedCards array */
function compare() {
  let cardIconOne = clickedCards[0].lastElementChild.className;
  let cardIconTwo = clickedCards[1].lastElementChild.className;
  if (cardIconOne === cardIconTwo) {
    cardsMatch();
  } else {
    noMatch();
  }
  clickedCards = [];
}

/* if cards i class matches, cardsMatch sets the cards classes to match */
function cardsMatch() {
  clickedCards[0].classList.toggle('match');
  clickedCards[1].classList.toggle('match');
  wiggleCorrect(clickedCards[0]);
  wiggleCorrect(clickedCards[1]);
  matchedCardCounter();
}

/* if cards i class DON'T match, noMatch removes open/show cards classes leaving only the card class behind, the face down look */
function noMatch() {
  wiggleWrong(clickedCards[0]);
  wiggleWrong(clickedCards[1]);
  clickedCards[0].classList.toggle('open');
  clickedCards[1].classList.toggle('open');
  clickedCards[0].classList.toggle('show');
  clickedCards[1].classList.toggle('show');
}

/* resetMoves is invoked in the when restart button hit to shuffle */
/* No matter how many times I've tried, I can't get moves[0].innerText into a variable to reuse...it breaks */
let moves = document.getElementsByClassName('moves');
moves[0].innerText = 0;

function resetMoves() {
  moves[0].innerText = 0;
}

/* countMoves is invoked in the openCards function*/
function countMoves() {
  if (moves[0].innerText == 0) {
    goTime();
  }

  moves[0].innerText++;
  if (moves[0].innerText == 30) {
    deductStars();
  } else if (moves[0].innerText == 40) {
    deductStars();
  } else if (moves[0].innerText == 50) {
    deductStars();
  }
}

/*deductStars is invoked in openCards function.*/
let starHolder = 3;

function deductStars() {
  let stars = document.getElementsByClassName('stars')[0];
  stars.lastElementChild.remove();
  starHolder--;
}

function wiggleCorrect(el) {
  el.animate(
    [{
      transform: 'translateY(10px)'
    }, {
      transform: 'translateY(-10px)'
    }], {
      duration: 200,
      iterations: 3
    }
  );
}

function wiggleWrong(el) {
  el.animate(
    [{
      transform: 'translateX(10px)'
    }, {
      transform: 'translateX(-10px)'
    }], {
      duration: 200,
      iterations: 3
    }
  );
}

function wiggleRefresh() {
  let deck = document.querySelector('.deck');
  deck.animate(
    [{
      transform: 'rotateX(0deg)'
    }, {
      transform: 'rotateY(360deg)'
    }], {
      duration: 1000,
      iterations: 1
    }
  );
}

/* startCounter and resetStars are invoked in the when restart button hit to shuffle */

const allStars = document.querySelector('.stars').innerHTML;
let starContainer = document.querySelector('.stars');

function resetStars() {
  starContainer.innerHTML = allStars;
}

/*  goTime is invoked in the countMoves function  */
/* This timer within startTimer  is from EasyTimer.js Source: https://albert-gonzalez.github.io/easytimer.js/ */
let clock = document.getElementById('basicUsage');
let timer = new Timer();

let goTime = function() {
  timer.start();
  timer.addEventListener('secondsUpdated', setTimer);
};

function setTimer() {
  clock.innerHTML = timer.getTimeValues().toString();
}

/* resetTimer is invoked in refresh*/
function resetTimer() {
  timer = new Timer();
  setTimer();
}

function stopTimer() {
  timer.stop();
}

let matchedCardTotal = 0;

function matchedCardCounter() {
  if (matchedCardTotal < 7) {
    matchedCardTotal++;
  } else {
    gameFinished();
  }
}

/* This function launches modal with congratulations screen and contains the final counter, number of stars and a play again button  */
function gameFinished() {
  displayModal();
  toggleModal();
  stopTimer();
}

function toggleModal() {
  modal = document.querySelector('.modal');
  modal.classList.toggle('hide');
  stopTimer();
}

function displayModal() {
  let time = document.querySelector('#basicUsage').innerText;
  let message = `You earned ${starHolder} stars out of 3 with a time of ${time}!`;
  document.querySelector('.modal-announcement').textContent = message;
}

let closeX = document.getElementsByClassName('close-this')[0];
closeX.addEventListener('click', function() {
  toggleModal();
  restart();
});



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided 'shuffle' method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of 'open' cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
