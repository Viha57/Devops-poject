let targetNumber;
let attempts = 0;
let maxAttempts = 10; // Maximum attempts allowed

const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuessButton');
const messageDisplay = document.getElementById('message');
const attemptsLeftDisplay = document.getElementById('attemptsLeft');
const resetButton = document.getElementById('resetButton');

// Start a new game
function startGame() {
    targetNumber = Math.floor(Math.random() * 100) + 1;  // Random number between 1 and 100
    attempts = 0;
    guessInput.value = '';  // Clear previous guess
    messageDisplay.textContent = 'Guess a number between 1 and 100';
    attemptsLeftDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;
    resetButton.style.display = 'none'; // Hide reset button until game ends
    submitGuessButton.disabled = false;  // Enable the submit button
}

// Check the user's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        messageDisplay.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    attempts++;

    // Provide feedback for incorrect guesses
    if (userGuess === targetNumber) {
        messageDisplay.textContent = `Congratulations! You guessed the number in ${attempts} attempts!`;
        submitGuessButton.disabled = true; // Disable the submit button after winning
        resetButton.style.display = 'inline-block';  // Show reset button
    } else if (userGuess < targetNumber) {
        messageDisplay.textContent = 'Too low! Try again.';
    } else {
        messageDisplay.textContent = 'Too high! Try again.';
    }

    // Update attempts left and check if the game is over
    attemptsLeftDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;
    
    if (attempts >= maxAttempts) {
        messageDisplay.textContent = `Game Over! You've used all attempts. The correct number was ${targetNumber}.`;
        submitGuessButton.disabled = true;  // Disable submit button
        resetButton.style.display = 'inline-block';  // Show reset button
    }

    // Provide a hint if attempts are getting low
    if (attempts === maxAttempts - 2) {
        messageDisplay.textContent += " Hint: The number is " + (targetNumber % 2 === 0 ? "even" : "odd");
    }
}

// Reset the game
function resetGame() {
    startGame();
}

// Event listeners for buttons
submitGuessButton.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);

// Listen for "Enter" key press to submit the guess
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// Start the game initially
startGame();
