'user select';

const activePlayer = function () {
  if (player0.classList.contains('player--active')) {
    return 'player0';
  } else {
    return 'player1';
  }
};

// Generating a random number
const randomNumber = function () {
  return Number((Math.random() * 5 + 1).toFixed(0));
};

// Switching between players
const playerSwitch = function () {
  if (player0.classList.contains('player--active')) {
    player0.classList.remove('player--active');
    player1.classList.add('player--active');
  } else if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
    player0.classList.add('player--active');
  }
};

// Checking the result
const result = function (playerName) {
  if (playerName.textContent === 'PLAYER 1') {
    // Winning animation
    document.querySelector('.for-animation-0').style.backgroundColor =
      '#98f5e1';
  } else {
    // loosing animation
    document.querySelector('.for-animation-0').style.backgroundColor =
      '#ff4d6d';
  }

  if (playerName.textContent === 'PLAYER 2') {
    document.querySelector('.for-animation-1').style.backgroundColor =
      '#98f5e1';
  } else {
    document.querySelector('.for-animation-1').style.backgroundColor =
      '#ff4d6d';
  }

  document.querySelector('.for-animation-1').style.width = '50rem';
  document.querySelector('.for-animation-0').style.width = '50rem';
  playerName.textContent = 'WINNER!';

  // hiding rooling and holding button
  rollbtn.classList.add('hidden');
  holdbtn.classList.add('hidden');
};

// Resetting current score
const csReset = csNumber => (csNumber.textContent = 0);

const allButtons = document.querySelectorAll('.btn');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const name0 = document.querySelector('#name--0');
const name1 = document.querySelector('#name--1');
const globalScore0 = document.querySelector('#score--0');
const globalScore1 = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const dice = document.querySelector('.dice');
const newbtn = document.querySelector('.btn--new');
const rollbtn = document.querySelector('.btn--roll');
const holdbtn = document.querySelector('.btn--hold');
const ruleBookBtn = document.querySelector('.btn-rule');
const ruleBook = document.querySelector('.rules-book');

let currentScore = 0;

/* Making the functionality of new game work */
newbtn.addEventListener('click', function () {
  // By this player 1 will always be the active player in the starting of the new game
  if (player1.classList.contains('player--active')) {
    player1.classList.remove('player--active');
  }

  if (!player0.classList.contains('player--active')) {
    player0.classList.add('player--active');
  }

  for (let i = 0; i < allButtons.length; i++) {
    if (allButtons[i].classList.contains('hidden')) {
      allButtons[i].classList.remove('hidden');
    }
  }

  // Resetting player names
  name0.textContent = 'PLAYER 1';
  name1.textContent = 'PLAYER 2';

  // Resetting background color
  document.querySelector('.for-animation-1').style.width = '0rem';
  document.querySelector('.for-animation-0').style.width = '0rem';
  document.querySelector('.for-animation-1').style.backgroundColor = '';
  document.querySelector('.for-animation-0').style.backgroundColor = '';

  // Resetting current score
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  // Resetting global score
  globalScore0.textContent = 0;
  globalScore1.textContent = 0;
});

/* Moaking roll dice function work */
rollbtn.addEventListener('click', function () {
  let number = randomNumber();
  currentPlayer = activePlayer();

  // Changing the dice image according to the random number
  document.querySelector('.dice').src = `dice-${number}.png`;

  // Checking if the number is = 1 and if not then update the score in current score
  if (number === 1) {
    if (currentPlayer === 'player0') {
      csReset(currentScore0);
    } else {
      csReset(currentScore1);
    }

    currentScore = 0;
    playerSwitch();
  } else {
    // If number not equals 1
    currentScore += number;
    if (currentPlayer === 'player0') {
      currentScore0.textContent = currentScore;
    } else {
      currentScore1.textContent = currentScore;
    }
  }
});

/* making hold button work */

// Adding event listner
holdbtn.addEventListener('click', function () {
  currentGlobal0 = Number(globalScore0.textContent);
  currentGlobal1 = Number(globalScore1.textContent);

  // Transfer current score of active player to his global score
  if (currentPlayer === 'player0') {
    globalScore0.textContent = currentGlobal0 + currentScore;
    csReset(currentScore0);
    // see if global score of current player = 100
    if (Number(globalScore0.textContent) >= 100) {
      result(name0, player0);
    } else {
      // if not then transfer of active player
      playerSwitch();
    }
  } else {
    globalScore1.textContent = currentGlobal1 + currentScore;
    csReset(currentScore1);
    // see if global score of current player = 100
    if (Number(globalScore1.textContent) >= 100) {
      result(name1, player1);
    } else {
      // if not then transfer of active player
      playerSwitch();
    }
  }

  currentScore = 0;
});

/* Making rules button work */
ruleBookBtn.addEventListener('click', function () {
  document.querySelector('.overlay').classList.remove('hidden');
  // making rules visible
  ruleBook.style.transitionDuration = '1s';
  ruleBook.style.transform = 'scale(1)';
});

document
  .querySelector('.rule-book-close')
  .addEventListener('click', function () {
    // hiding rules
    ruleBook.style.transitionDuration = '0s';
    ruleBook.style.transform = 'scale(0)';
    document.querySelector('.overlay').classList.add('hidden');
  });
