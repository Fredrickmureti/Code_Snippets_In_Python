let currentPlayer = 'Player 1';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let player1Score = 0;
let player2Score = 0;
let isMusicOn = true;

const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const player1NameDisplay = document.getElementById('player1Name');
const player2NameDisplay = document.getElementById('player2Name');
const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');
const resetButton = document.getElementById('resetButton');
const overlay = document.getElementById('overlay');
const popupMessage = document.getElementById('popupMessage');
const popupBtn = document.getElementById('popupBtn');
const toggleMusicBtn = document.getElementById('toggleMusicBtn');
const editNamesBtn = document.getElementById('editNamesBtn');

const musicTracks = [
  '/music/tropical-summer-music-112842.mp3',
  '/music/subway-mirage-261477.mp3',
  '/music/sus-summer-fire-edm-226418.mp3',
];

let currentTrackIndex = 0;
const bgMusic = document.getElementById('bgMusic');

// Toggle music on/off
toggleMusicBtn.addEventListener('click', () => {
  isMusicOn = !isMusicOn;
  isMusicOn ? bgMusic.play() : bgMusic.pause();
});

// Function to change the music track
function changeMusicTrack() {
  if (currentTrackIndex >= musicTracks.length) {
    currentTrackIndex = 0; // Loop back to the first track
  }
  bgMusic.src = musicTracks[currentTrackIndex];
  bgMusic.load();  // Ensure the new track is loaded
  bgMusic.play();  // Play the track
  currentTrackIndex++;
}

// Play next music automatically when one finishes
bgMusic.addEventListener('ended', changeMusicTrack);

// Initialize first track
changeMusicTrack();



// Handle cell click
function handleCellClick(index) {
  if (gameBoard[index] || !gameActive) return;

  gameBoard[index] = currentPlayer === 'Player 1' ? 'X' : 'O';
  cells[index].textContent = gameBoard[index];
  cells[index].classList.add('glow');

  const winner = checkWinner();
  if (winner) {
    gameActive = false;
    if (winner === 'X') {
      player1Score++;
      player1ScoreElement.textContent = `Score: ${player1Score}`;
    } else {
      player2Score++;
      player2ScoreElement.textContent = `Score: ${player2Score}`;
    }

    popupMessage.textContent = `${winner === 'X' ? player1NameDisplay.textContent : player2NameDisplay.textContent} wins!`;
    overlay.style.display = 'flex';
  } else if (!gameBoard.includes('')) {
    gameActive = false;
    popupMessage.textContent = 'It\'s a draw!';
    overlay.style.display = 'flex';
  } else {
    currentPlayer = currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1';
    statusText.textContent = `${currentPlayer}'s Turn`;
  }
}

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of winPatterns) {
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return gameBoard[a];
    }
  }
  return null;
}

// Reset game
function resetGame() {
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'Player 1';
  gameActive = true;
  statusText.textContent = `${currentPlayer}'s Turn`;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('glow');
  });

  overlay.style.display = 'none';
}

function updatePlayerNames(name1, name2) {
  player1NameDisplay.textContent = name1;
  player2NameDisplay.textContent = name2;
}


popupBtn.addEventListener('click', resetGame);

// Initialize game
resetGame();
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(index));
});


// Modal references
const editNameModal = document.getElementById('editNameModal');
const player1NameInput = document.getElementById('player1NameInput');
const player2NameInput = document.getElementById('player2NameInput');
const saveNamesBtn = document.getElementById('saveNamesBtn');
const closeModalBtn = document.getElementById('closeModalBtn');

// Open modal to edit names
editNamesBtn.addEventListener('click', () => {
  // Set the current player names in the input fields
  player1NameInput.value = player1NameDisplay.textContent;
  player2NameInput.value = player2NameDisplay.textContent;
  editNameModal.style.display = 'flex';
});

// Close modal without saving
closeModalBtn.addEventListener('click', () => {
  editNameModal.style.display = 'none';
});

// Save new names and update the display
saveNamesBtn.addEventListener('click', () => {
  const name1 = player1NameInput.value.trim();
  const name2 = player2NameInput.value.trim();

  if (name1) {
    player1NameDisplay.textContent = name1;
  }
  if (name2) {
    player2NameDisplay.textContent = name2;
  }

  editNameModal.style.display = 'none'; // Close modal after saving
});

