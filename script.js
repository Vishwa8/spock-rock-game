import { removeConfetti, startConfetti, stopConfetti } from "./confetti.js";

const playerScoreEl = document.getElementById('playerScore');
const playerChoiceEl = document.getElementById('playerChoice');
const computerScoreEl = document.getElementById('computerScore');
const computerChoiceEl = document.getElementById('computerChoice');
const resultText = document.getElementById('resultText');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGameIcons = document.querySelectorAll('.far');

const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let playerScoreNumber = 0;
let computerScoreNumber = 0;
let computerChoice = '';

const resetSelected = () => {
  allGameIcons.forEach((icon) => {
    icon.classList.remove('selected');
  });
  stopConfetti();
  removeConfetti();
};

const resetAll = () => {
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  computerChoice = '';
  playerScoreEl.textContent = playerScoreNumber;
  computerScoreEl.textContent = computerScoreNumber;
  playerChoiceEl.textContent = '';
  computerChoiceEl.textContent = '';
  resultText.textContent = '';
  resetSelected();
};

window.resetAll = resetAll;

const computerRandomChoice = () => {
  const computerChoiceNumber = Math.random();
  if (computerChoiceNumber < 0.2) {
    computerChoice = 'rock';
  } else if (computerChoiceNumber <= 0.4) {
    computerChoice = 'paper';
  } else if (computerChoiceNumber <= 0.6) {
    computerChoice = 'scissors';
  } else if (computerChoiceNumber <= 0.8) {
    computerChoice = 'lizard';
  } else {
    computerChoice = 'spock';
  }
  return computerChoice;
};

const updateScore = (playerChoice) => {
  if (playerChoice === computerChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[playerChoice];
    if (choice.defeats.indexOf(computerChoice) > -1) {
      startConfetti();
      resultText.textContent = "You Won!";
      playerScoreNumber++;
      playerScoreEl.textContent = playerScoreNumber;
    } else {
      resultText.textContent = "You Lost!";
      computerScoreNumber++;
      computerScoreEl.textContent = computerScoreNumber;
    }
  }
};

const checkResult = (playerChoice) => {
  resetSelected();
  computerRandomChoice();
  displayComputerChoice();
  updateScore(playerChoice);
};

const changePlayerChoiceTextContent = (playerChoice) => {
  playerChoiceEl.textContent = ` --- ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;
};

const changeComputerChoiceTextContent = (computerChoice) => {
  computerChoiceEl.textContent = ` --- ${computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)}`;
};

const addSelectedClass = (element) => {
  element.classList.add('selected');
};

const displayComputerChoice = () => {
  computerChoice = computerRandomChoice();
  changeComputerChoiceTextContent(computerChoice);
  switch (computerChoice) {
    case 'rock':
      addSelectedClass(computerRock);
      break;
    case 'paper':
      addSelectedClass(computerPaper);
      break;
    case 'scissors':
      addSelectedClass(computerScissors);
      break;
    case 'lizard':
      addSelectedClass(computerLizard);
      break;
    case 'spock':
      addSelectedClass(computerSpock);
      break; 
    default:
      break; 
  }
};

const select = (playerChoice) => {
  checkResult(playerChoice);
  changePlayerChoiceTextContent(playerChoice);
  switch (playerChoice) {
    case 'rock':
      addSelectedClass(playerRock);
      break;
    case 'paper':
      addSelectedClass(playerPaper);
      break;
    case 'scissors':
      addSelectedClass(playerScissors);
      break;
    case 'lizard':
      addSelectedClass(playerLizard);
      break;
    case 'spock':
      addSelectedClass(playerSpock);
      break; 
    default:
      break; 
  }
};

window.select = select;

resetAll();