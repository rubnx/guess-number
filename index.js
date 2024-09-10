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

function guessNumber(e) {
  e.preventDefault();

  // Input should not be empty
  if (guessFormInput.value === '') return;

  // If there is an existing message, remove it
  const existingMessage = document.querySelector('.message');
  if (existingMessage) existingMessage.remove();

  const number = Number(guessFormInput.value);

  let messageText, cardText;

  if (number === randNum) {
    messageText = `Yes! <strong>${number}</strong> was the number. Well done!`;
    cardText = `${randNum} <span class='emoji'>🎉</span>`;
  }

  if (number > randNum) {
    messageText = `Nope, <strong>${number}</strong> is too high 🔺. Keep guessing.`;
    cardText = `🔺 <span class='text'>Too High</span>`;
  }

  if (number < randNum) {
    messageText = `Nope, <strong>${number}</strong> is too low 🔻. Keep guessing.`;
    cardText = `🔻 <span class='text'>Too low</span>`;
  }

  guessCard.innerHTML = cardText;

  const newMessage = document.createElement('p');
  newMessage.className = 'message';
  newMessage.innerHTML = messageText;

  guessForm.insertAdjacentElement('afterend', newMessage);

  clearForm();
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
}
