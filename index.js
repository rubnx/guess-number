'use strict';

// Select elements
const guessCard = document.querySelector('.guess-card');
const guessForm = document.querySelector('.form');
const guessFormInput = document.querySelector('.form input');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.btn');
const footerYear = document.querySelector('.currentYear');

// Load the current year when page loads
document.addEventListener('DOMContentLoaded', getYear);

// Get current year
function getYear() {
  footerYear.textContent = new Date().getFullYear();
}

// Computer selects a random number
const randNum = Math.floor(Math.random() * 100) + 1;
console.log(randNum);

guessForm.addEventListener('submit', guessNumber);
resetButton.addEventListener('click', reset);

// Numbers already guessed
let guessed = [];

// Number of guesses
let numGuess = 0;

function guessNumber(e) {
  e.preventDefault();

  // Input should not be empty
  if (guessFormInput.value === '') return;

  // If there is an existing message, remove it
  const existingMessage = document.querySelector('.message');
  if (existingMessage) existingMessage.remove();

  // Check if a number is in an array
  function isNumberInArray(arr, targetNumber) {
    return arr.some((item) => item?.number === targetNumber);
  }

  const number = Number(guessFormInput.value);

  let messageText, cardText;

  if (number === randNum) {
    numGuess++;
    messageText = `Yes! <span class='message-number'>${number}</span> was the number. Well done! It took you ${
      numGuess === 1 ? 'just' : ''
    } <span class='message-number-green'>${numGuess}</span> ${
      numGuess === 1 ? 'guess' : 'guesses'
    }.`;
    cardText = `${randNum} <span class='emoji'>🎉</span>`;
  }

  if (number > randNum || number < randNum) {
    numGuess++;

    if (isNumberInArray(guessed, number)) {
      messageText = `You already tried <span class='message-number'>${number}</span>, and we stated it is too ${
        number > randNum ? 'high' : 'low'
      }. Try again.`;

      cardText = `<span class='text'>Too ${
        number > randNum ? 'High 🔺' : 'Low 🔻'
      }</span>`;
    } else {
      messageText = `Nope, <span class='message-number'>${number}</span> is too ${
        number > randNum ? 'high 🔺' : 'low 🔻'
      }. Keep guessing.`;

      cardText = `<span class='text'>Too ${
        number > randNum ? 'High 🔺' : 'Low 🔻'
      }</span>`;
      guessed.push({ number, guess: number > randNum ? 'high' : 'low' });
    }

    // Update or create guessed list only if the guess is incorrect
    updateGuessedList();
  }
  guessCard.innerHTML = cardText;

  const newMessage = document.createElement('p');
  newMessage.className = 'message';
  newMessage.innerHTML = messageText;

  guessForm.insertAdjacentElement('afterend', newMessage);

  clearForm();
}

function updateGuessedList() {
  let existingGuessedList = document.querySelector('.guessed-list');
  if (!existingGuessedList) {
    existingGuessedList = document.createElement('ul');
    existingGuessedList.className = 'guessed-list';
    resetButton.insertAdjacentElement('beforebegin', existingGuessedList);
  }

  // Clear existing list items
  existingGuessedList.innerHTML = '';

  // Add all guessed numbers to the list
  guessed.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'message-number';
    listItem.textContent = `${item.number} ${
      item.guess === 'high' ? '🔺' : '🔻'
    }`;
    existingGuessedList.appendChild(listItem);
  });
}

function clearForm() {
  guessFormInput.value = '';
}

function reset() {
  // Select a new random number
  const randNum = Math.floor(Math.random() * 100);
  console.log(randNum);

  // If there is an existing message, remove it
  const existingMessage = document.querySelector('.message');
  if (existingMessage) existingMessage.remove();

  // Reset card content
  guessCard.innerHTML = '❓';

  // Empty form in case there is anything
  guessFormInput.value = '';

  // Empty guessed list and remove the diplayed list
  guessed = [];
  let existingGuessedList = document.querySelector('.guessed-list');
  if (existingGuessedList) existingGuessedList.remove();
}
