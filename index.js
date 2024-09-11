'use strict';

// Select elements
let guessCard = document.querySelector('.guess-card');
let guessForm = document.querySelector('.form');
let guessFormInput = document.querySelector('.form input');
const message = document.querySelector('.message');
const resetButton = document.querySelector('.btn');
const footerYear = document.querySelector('.currentYear');

// EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getYear); // Load the current year when page loads
guessForm.addEventListener('submit', guessNumber);
resetButton.addEventListener('click', reset);

// GET CURRENT YEAR FOR THE FOOTER
function getYear() {
  footerYear.textContent = new Date().getFullYear();
}

// COMPUTER SELECTS A RANDOM NUMBER
// Declare randNum variable
let randNum;
// Function to initialize randNum variable
function randomNumber() {
  randNum = Math.floor(Math.random() * 100) + 1;
  console.log(randNum); // Console log the variable for debugging
}
// Initialize randNum variable
randomNumber();

// List of numbers already guessed
let guessed = [];

// Number of guesses
let numGuess = 0;

// GUESS NUMBER FUNCTIONALITY (WHEN GUESS IS SUBMITTED)
function guessNumber(e) {
  e.preventDefault(); // Prevent reloading the page after form submission

  if (guessFormInput.value === '') return; // Input should not be empty

  // If there is an existing message, remove it
  const existingMessage = document.querySelector('.message');
  if (existingMessage) existingMessage.remove();

  // Check if a number is in an array
  function isNumberInArray(arr, targetNumber) {
    return arr.some((item) => item?.number === targetNumber);
  }

  // Number guessed by user
  const number = Number(guessFormInput.value);

  // Declare variables for the content of the card and the message that will appear
  let messageText, cardText;

  // If user guesses the right number
  if (number === randNum) {
    numGuess++; // Add 1 guess to number of guesses
    messageText = `Yes! <span class='message-number'>${number}</span> was the number. Well done! It took you ${
      numGuess === 1 ? 'just' : ''
    } <span class='message-number-green'>${numGuess}</span> ${
      numGuess === 1 ? 'guess' : 'guesses'
    }.`;
    cardText = `${randNum} <span class='emoji'>🎉</span>`;

    updateMessage(cardText, messageText);
    // guessForm.style.visibility = 'hidden';
    guessForm.remove();
    // randomNumber(); // Generates a new Random Number to start the game again
  } else if (number > randNum || number < randNum) {
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
    updateMessage(cardText, messageText);
  }
}

// Update message content and card content
function updateMessage(cardText, messageText) {
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
  randomNumber();

  // If there is no form, create a form
  const newGuessForm = document.querySelector('.form');
  if (!newGuessForm) {
    const newGuessForm = document.createElement('form');
    newGuessForm.className = 'form';
    newGuessForm.innerHTML = `<input
      type="number"
      placeholder="Type Your Guess Here..."
      name="number"
    />`;
    guessCard.insertAdjacentElement('afterend', newGuessForm);

    // Update global references
    guessForm = newGuessForm;
    guessFormInput = guessForm.querySelector('input');

    // Add event listener to the new form
    guessForm.addEventListener('submit', guessNumber);
  }

  // If there is an existing message, remove it
  const existingMessage = document.querySelector('.message');
  if (existingMessage) existingMessage.remove();

  // Reset card content
  guessCard.innerHTML = '❓';
  // Empty form in case there is anything
  guessFormInput.value = '';

  guessed = []; // Empty guessed list
  numGuess = 0; // Reset the num of guesses to 0
  // Remove the diplayed list
  let existingGuessedList = document.querySelector('.guessed-list');
  if (existingGuessedList) existingGuessedList.remove();
}
