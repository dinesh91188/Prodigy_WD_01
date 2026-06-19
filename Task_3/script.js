// Grab the HTML elements we need
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

// These are all the ways a player can win (straight lines and diagonals)
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// This tracks what is inside the 9 boxes
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Turn the game on!
initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    running = true;
}

// What happens when you click a box
function cellClicked() {
    const cellIndex = this.getAttribute("data-index");

    // If the box is already full or the game is over, do nothing
    if (options[cellIndex] !== "" || !running) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

// Put the X or O on the screen
function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    // This adds the CSS class to color it red or green
    cell.classList.add(currentPlayer.toLowerCase());
}

// Switch between X and O
function changePlayer() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// The "Referee" - checking if someone won
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue; // Skip if any of the boxes in the line are empty
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true; // We have a winner!
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        running = false; // Stop the game
    } else if (!options.includes("")) {
        statusText.textContent = `Draw!`; // Board is full, nobody won
        running = false; // Stop the game
    } else {
        changePlayer(); // No winner yet, keep playing
    }
}

// Reset everything to play again
function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
    running = true;
}