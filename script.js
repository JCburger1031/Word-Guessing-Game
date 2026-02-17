const words = ["flins", "varka", "jean", "aino", "lauma"];
let secretWord = "";
let displayedWord = [];
let wrongGuesses = [];
let attemptsLeft = 5;

const startBtn = document.getElementById("start-btn");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const guessInput = document.getElementById("guess-input");
const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const wrongDisplay = document.getElementById("wrong-guesses");
const hintDisplay = document.getElementById("hint");
const gameArea = document.getElementById("game-area");

startBtn.addEventListener("click", startGame);
guessBtn.addEventListener("click", makeGuess);
restartBtn.addEventListener("click", restartGame);

guessInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    makeGuess();
  }
  });

function startGame() {
  secretWord = words[Math.floor(Math.random() * words.length)];
  displayedWord = Array(secretWord.length).fill("_");
  wrongGuesses = [];
  attemptsLeft = 5;

  wordDisplay.textContent = displayedWord.join(" ");
  wrongDisplay.textContent = "Wrong guesses: ";
  message.textContent = "";
  hintDisplay.textContent = "Hint: The word starts with '" + secretWord[0].toUpperCase() + "'";
  guessInput.value = "";
  guessInput.disabled = false;
  guessBtn.disabled = false;
  gameArea.classList.remove("hidden");

  document.body.style.backgroundColor = "";
  console.log("Secret word:", secretWord); 
  
}

function makeGuess() {
  let guess = guessInput.value.toLowerCase().trim();
  guessInput.value = "";

  if (guess === "" || guess.length !== 1) {
    message.textContent = "Please enter one letter only.";
    return;
  }

  if (secretWord.includes(guess)) {
    for (let i = 0; i < secretWord.length; i++) {
      if (secretWord[i] === guess) {
        displayedWord[i] = guess;
      }
    }
    wordDisplay.textContent = displayedWord.join(" ");
    message.textContent = "Good guess!";
  } else {
    if (!wrongGuesses.includes(guess)) {
      wrongGuesses.push(guess);
      attemptsLeft--;
    }
    wrongDisplay.textContent = "Wrong guesses: " + wrongGuesses.join(", ");
    message.textContent = "Wrong letter! Attempts left: " + attemptsLeft;
  }

  if (!displayedWord.includes("_")) {
    message.textContent = "🎉 You won! The word was " + secretWord;
    document.body.style.backgroundColor = "green";
    endGame();
  }

  if (attemptsLeft === 0) {
    message.textContent = "💀 Game over! The word was " + secretWord;
    endGame();

  }
}

function endGame() {
  guessInput.disabled = true;
  guessBtn.disabled = true;
}
