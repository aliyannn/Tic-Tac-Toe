const grid = document.getElementById('grid');
const msg = document.querySelector('.message');
const chooser = document.querySelector('form');
let playerMark;
let computerMark;
let cells;
let board = ['', '', '', '', '', '', '', '', ''];
let isPlayerTurn = true;
let playerTimer;
let computerTimer;
const moveTimeLimit = 15000; // 15 seconds

const setPlayer = (event) => {
    playerMark = event.target.value;
    computerMark = (playerMark === 'X') ? 'O' : 'X';
    chooser.classList.add('fade-out');

    setTimeout(() => {
        chooser.classList.add('game-on');
        chooser.classList.remove('fade-out');
        msg.textContent = `Hello ${playerMark}, make your move`;
        event.target.checked = false;
        buildGrid();

        msg.classList.add('fade-in');
        grid.classList.add('fade-in');
        startPlayerTimer();
    }, 500);
}

const playerMove = (event) => {
    if (isPlayerTurn && event.target.textContent === '') {
        event.target.textContent = playerMark;
        animateMove(event.target);
        let index = cells.indexOf(event.target);
        board[index] = playerMark;
        isPlayerTurn = false;
        disableGrid();
        clearTimeout(playerTimer);

        if (!checkWinner(board)) {
            msg.textContent = "Computer's Turn";
            setTimeout(() => {
                computerMove();
                if (!checkWinner(board)) {
                    msg.textContent = "Make your move";
                }
            }, 1200); // Delay computer move to see player's move
        }
    }
}

const computerMove = () => {
    clearTimeout(computerTimer);
    let bestScore = -Infinity;
    let moveIndex;

    for (let i = 0; i < board.length; ++i) {
        if (board[i] === '') {
            board[i] = computerMark;
            let score = minimax(board, 0, false);
            board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                moveIndex = i;
            }
        }
    }

    board[moveIndex] = computerMark;
    cells[moveIndex].textContent = computerMark;
    animateMove(cells[moveIndex]);
    isPlayerTurn = true;
    enableGrid();
    startPlayerTimer();

    if (!checkWinner(board)) {
        return true;
    }
}

const makeBestMove = (mark) => {
    let bestScore = mark === playerMark ? -Infinity : Infinity;
    let moveIndex;

    for (let i = 0; i < board.length; ++i) {
        if (board[i] === '') {
            board[i] = mark;
            let score = minimax(board, 0, mark === playerMark ? false : true);
            board[i] = '';

            if (mark === playerMark) {
                if (score > bestScore) {
                    bestScore = score;
                    moveIndex = i;
                }
            } else {
                if (score < bestScore) {
                    bestScore = score;
                    moveIndex = i;
                }
            }
        }
    }

    board[moveIndex] = mark;
    cells[moveIndex].textContent = mark;
    animateMove(cells[moveIndex]);
}

const animateMove = (cell) => {
    cell.style.backgroundColor = '#FA6900';
    cell.style.color = 'white';
}

const minimax = (board, depth, isMaximizing) => {
    let result = checkWinner(board, true);

    if (result !== null) {
        if (result === computerMark) {
            return 10 - depth; // Reward quicker wins
        }
        if (result === playerMark) {
            return depth - 10; // Penalize quicker losses
        }
        return 0; // Tie
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < board.length; ++i) {
            if (board[i] === '') {
                board[i] = computerMark;
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;

        for (let i = 0; i < board.length; ++i) {
            if (board[i] === '') {
                board[i] = playerMark;
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}

const winner = (a, b, c) => {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
    }
    return null;
}

const disableGrid = () => {
    cells.forEach(cell => {
        cell.removeEventListener('click', playerMove);
    });
};

const enableGrid = () => {
    cells.forEach(cell => {
        if (cell.textContent === '') {
            cell.addEventListener('click', playerMove);
        }
    });
};

const checkWinner = (board, isMinimax = false) => {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let i = 0; i < winningCombos.length; i++) {
        const combo = winningCombos[i];
        const [a, b, c] = combo;
        const result = winner(a, b, c);

        if (result) {
            if (!isMinimax) {
                msg.textContent = `${result} wins!`;
                cells[a].style.color = 'black';
                cells[b].style.color = 'black';
                cells[c].style.color = 'black';
                disableGrid();
                clearTimeout(playerTimer);
                clearTimeout(computerTimer);
                setTimeout(() => {
                    resetGrid();
                }, 800);
            }
            return result;
        }
    }

    if (board.every(cell => cell !== '')) {
        if (!isMinimax) {
            msg.textContent = "It's a tie!";
            cells.forEach(cell => cell.style.color = 'red'); // Turn all marks red for a tie
            disableGrid();
            clearTimeout(playerTimer);
            clearTimeout(computerTimer);
            setTimeout(() => {
                resetGrid();
            }, 800);
        }
        return 'Tie';
    }

    return null;
}

const resetGrid = (event) => {
    msg.classList.add('fade-out');
    grid.classList.add('fade-out');

    setTimeout(() => {
        playerMark = 'X';
        computerMark = 'O';
        board = ['', '', '', '', '', '', '', '', ''];
        isPlayerTurn = true;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
            cell.style.color = 'black'; // Reset color to black
            cell.classList.add('cell-reset'); // Add animation class
        });

        msg.textContent = 'Choose Your Player:';
        chooser.classList.remove('game-on');

        setTimeout(() => {
            cells.forEach(cell => {
                cell.classList.remove('cell-reset'); // Remove animation class after animation ends
            });

            msg.classList.remove('fade-out');
            grid.classList.remove('fade-out');

            msg.classList.add('fade-in');
            grid.classList.add('fade-in');
        }, 1200); // Match the animation duration

        grid.innerHTML = '';

        if (event) {
            event.preventDefault();
        }
    }, 500);
}

const buildGrid = () => {
    grid.innerHTML = ''; // Clear existing grid

    for (let i = 0; i < 9; ++i) {
        let cell = document.createElement('li');
        cell.style.color = 'black'; // Ensure initial color is black
        cell.addEventListener('click', playerMove);
        grid.appendChild(cell);
    }

    cells = Array.from(grid.children); // Convert NodeList to Array
}

const startPlayerTimer = () => {
    playerTimer = setTimeout(() => {
        if (isPlayerTurn) {
            msg.textContent = "Time's up! Making a move for you.";
            setTimeout(() => {
                makeBestMove(playerMark);
            }, 800);

            isPlayerTurn = false;
            disableGrid();
            if (!checkWinner(board)) {
                setTimeout(() => {
                    msg.textContent = "Computer's Turn";
                    setTimeout(computerMove, 1200);
                    if (!checkWinner(board)) {
                        setTimeout(() => {
                            msg.textContent = "Make your move";
                        }, 1200);
                    }
                }, 1200);
            }
        }
    }, moveTimeLimit);
}

const startComputerTimer = () => {
    computerTimer = setTimeout(() => {
        if (!isPlayerTurn) {
            msg.textContent = "Computer took too long! Making a move for it.";
            makeBestMove(computerMark);
            isPlayerTurn = true;
            enableGrid();
            startPlayerTimer();
            if (!checkWinner(board)) {
                return true;
            }
        }
    }, moveTimeLimit);
}

// Event listeners
const players = Array.from(document.querySelectorAll('input[name="player-choice"]'));

players.forEach(choice => {
    choice.addEventListener('click', setPlayer);
});
