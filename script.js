const ROWS = 6;
const COLS = 7;
let board = [];
let currentPlayer = 1;

const player = document.querySelector('#currentPlayer');

// Initialize board
function initBoard() {
    for (let i = 0; i < ROWS; i++) {
        board[i] = new Array(COLS).fill(0);
    }
}

// Render board
function renderBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            if (board[row][col] === 1) {
                cell.style.backgroundColor = 'red';
            } else if (board[row][col] === 2) {
                cell.style.backgroundColor = 'yellow';
            } else {
                cell.className += ' empty';
            }
            cell.addEventListener('click', () => dropPiece(col));
            boardElement.appendChild(cell);
        }
    }
}

// Drop a piece in a column
function dropPiece(col) {
    for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === 0) {
            board[row][col] = currentPlayer;
            renderBoard();
            if (checkWin(row, col)) {
                player.textContent = (`Player ${currentPlayer} wins!`);
                initBoard();
                renderBoard();
                return;
            }
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return;
        }
    }
}

// Check for a win
function checkWin(row, col) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    for (let dir of directions) {
        let count = 1;
        for (let i = 1; i <= 3; i++) {
            const newRow = row + dir[0] * i;
            const newCol = col + dir[1] * i;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== currentPlayer) {
                break;
            }
            count++;
        }
        for (let i = 1; i <= 3; i++) {
            const newRow = row - dir[0] * i;
            const newCol = col - dir[1] * i;
            if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol] !== currentPlayer) {
                break;
            }
            count++;
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

// Start the game
function startGame() {
    initBoard();
    renderBoard();
}

startGame();