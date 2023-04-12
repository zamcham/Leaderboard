const BASE_URL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/UZPH3aMXFyBkcHNEozdZ';

// Get all scores for a game
export const getAllScores = async () => {
  try {
    const response = await fetch(`${BASE_URL}/scores/`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    throw new Error('Failed to get scores');
  }
};

// Submit a score for a game
export const submitScore = async (fullName, score) => {
  try {
    const response = await fetch(`${BASE_URL}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: fullName, score }),
    });
    /* eslint-disable no-unused-vars */
    const data = await response.json();
    /* eslint-enable no-unused-vars */
  } catch (error) {
    throw new Error('Failed to submit score');
  }
};
