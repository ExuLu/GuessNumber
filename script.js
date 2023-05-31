'use strict';

let secretNumber = randomNumber();
function randomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}
let score = 20;
let highscore = 0;

const btnAgain = document.querySelector('.again');
const number = document.querySelector('.number');
const btnCheck = document.querySelector('.check');
let guessEnter = document.querySelector('.guess');
let playing = true;

const displayMessage = (message) =>
  (document.querySelector('.message').textContent = message);
const displaySecretNumber = (secretNumber) =>
  (number.textContent = secretNumber);
const changeBackgroundColor = (color) =>
  (document.querySelector('body').style.backgroundColor = color);
const changeNumberWidth = (width) => (number.style.width = width);
const displayHighscore = (highscore) =>
  (document.querySelector('.highscore').textContent = highscore);
const displayScore = (score) =>
  (document.querySelector('.score').textContent = score);
const displayGuess = (value) => (guessEnter.value = value);

const checkingProcess = function () {
  const guess = Number(guessEnter.value);

  // When there is no input
  if (!guess) {
    displayMessage('⛔️ No number!');
    // When player wins
  } else if (guess === secretNumber) {
    displayMessage('🥳 Correct Number!');
    displaySecretNumber(secretNumber);

    changeBackgroundColor('#60b347');

    changeNumberWidth('30rem');

    playing = false;

    if (highscore < score) {
      highscore = score;
      displayHighscore(highscore);
    }
    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      displayScore(score);
    } else {
      displayMessage('☠️ You lost the game!');
      displayScore(0);
    }
  }
};

btnCheck.addEventListener('click', function () {
  if (playing) {
    checkingProcess;
  }
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && playing) checkingProcess();
});

btnAgain.addEventListener('click', function () {
  secretNumber = randomNumber();
  score = 20;

  displayMessage('Start guessing...');
  displaySecretNumber('?');
  displayScore(score);
  displayGuess('');

  changeBackgroundColor('#222');
  changeNumberWidth('15rem');
  playing = true;
});
