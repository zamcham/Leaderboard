import './styles.css';
import { getAllScores, submitScore } from './api.js'; // Import functions from api.js

// DOM elements
const refreshButton = document.getElementById('refreshButton');
const submitButton = document.getElementById('submit');
const fullNameInput = document.getElementById('fullName');
const scoreInput = document.getElementById('score');
const successMessage = document.getElementById('successMessage');
const scoreboardContainer = document.getElementById('scoreboard');

// Update scoreboard in UI
const updateScoreboard = (scores) => {
  scoreboardContainer.innerHTML = ''; // Clear existing scoreboard
  scores.forEach((score) => {
    const scoreElement = document.createElement('div');
    scoreElement.classList.add('score');
    scoreElement.textContent = `${score.user}: ${score.score}`;
    scoreboardContainer.appendChild(scoreElement);
  });
};

// Refresh scores
const refreshScores = async () => {
  try {
    // Call API to get all scores
    const scores = await getAllScores();
    // Update UI with received data
    updateScoreboard(scores);
  } catch (error) {
    return error;
  }
  return null;
};

// Submit score
const submitScoreHandler = async () => {
  // Get user input
  const user = fullNameInput.value.trim();
  const score = scoreInput.value.trim();

  // Validate user input
  if (user === '' || score === '') {
    return;
  }

  try {
    // Call API to submit score
    await submitScore(user, score);
    // Show success message
    successMessage.style.display = 'block';
    // Set timeout to hide success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 2000);
    // Clear input fields
    fullNameInput.value = '';
    scoreInput.value = '';
    // Refresh scores
  } catch (error) {
    // eslint-disable-next-line consistent-return
    return error;
  }
};

// Event listeners
refreshButton.addEventListener('click', refreshScores);
submitButton.addEventListener('click', submitScoreHandler);

// Call refreshScores() when DOM is loaded
window.addEventListener('DOMContentLoaded', refreshScores);
