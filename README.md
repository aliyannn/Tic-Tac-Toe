# Tic-Tac-Toe
## A code repo for Tic Tac Toe game in JS

Human vs AI Tic-Tac-Toe
This repository contains a web-based Tic Tac Toe game where a human player competes against an AI. The game is built using HTML, CSS, and JavaScript, featuring smooth transitions, animations, and a time limit for each move.

### Features
* Player vs AI: Compete against a computer opponent using the minimax algorithm.
* Smooth Transitions: Smooth fading and animation effects for an engaging user experience.
* Move Timer: Each player has 15 seconds to make a move, adding urgency to the game.
* Responsive Design: Adjusts layout and sizes for different screen sizes for a better experience on both mobile and desktop.
* Stylish Interface: Custom fonts and colors for an appealing and modern design.

### Technologies Used
* HTML: Structure of the game.
* CSS: Styling, including animations and transitions.
* JavaScript: Game logic and interactivity.

## Code Explanation
### 1) HTML Structure
* Header and Messages: The h1, h2, and h6 elements provide the game title and instructions.
* Form: Radio buttons allow the player to choose their mark (X or O).
* Grid: The (ul id="grid") element is where the game grid will be dynamically created.
* JavaScript: Linked through <script src="index.js"></script> to handle game logic.

### 2) JavaScript Functionality
#### The JavaScript code manages the game logic, including player and AI moves, animations, and timing.
#### Variables and Initialization:
* Elements: grid, msg, and chooser are DOM elements.
* Game State: playerMark, computerMark, cells, and board manage the game state.
* Timers: playerTimer and computerTimer manage move timing.
* Constants: moveTimeLimit sets the 15-second move limit.

#### Setting the Player's Mark:
* Event Handling: Sets playerMark and computerMark based on player choice.
* Animations: Adds fade-out and fade-in classes for smooth transitions.
* Game Setup: Calls buildGrid() to create the game grid and starts the player's move timer.

#### Building the Game Grid:
* Grid Creation: Dynamically creates the 3x3 grid and attaches playerMove event listeners to each cell.

### Handling Player Moves:
#### The playerMove function is triggered when the player clicks on a cell. Here's the detailed breakdown:
#### Keypoints: 

#### i) Check Turn and Cell State:
* if (isPlayerTurn && event.target.textContent === ' '): Ensures it's the player's turn and the clicked cell is empty.

####  ii) Update UI and State:
* event.target.textContent = playerMark;: Sets the player's mark (X or O) in the clicked cell.
* animateMove(event.target);: Adds an animation to the cell.
* let index = cells.indexOf(event.target);: Gets the index of the clicked cell.
* board[index] = playerMark;: Updates the internal game board state.

#### iii) Change Turn and Manage Timers:
* isPlayerTurn = false;: Switches the turn to the computer.
* disableGrid();: Disables the grid to prevent further player interaction until the computer moves.
* clearTimeout(playerTimer);: Clears the player's move timer.

#### iv) Check for Winner and Trigger Computer Move:
* if (!checkWinner(board)): Checks if the player has won. If not, updates the message and triggers the computer's move after a delay to simulate thinking time.
After the computer's move, checks again for a winner and updates the message.

### Handling AI Moves:
#### The computerMove function determines and makes the best move for the AI using the minimax algorithm. Here's the breakdown:
#### Keypoints:

#### i) Initialize Variables:
* let bestScore = -Infinity;: Sets the initial best score to a very low value.
* let moveIndex;: Variable to store the index of the best move.

#### ii) Find the Best Move:
* Loops through each cell in the board.
* If the cell is empty, makes a temporary move for the computer.
* Uses minimax to evaluate the score of this move.
* Reverts the move.
* Updates bestScore and moveIndex if this move has a better score.

#### iii) Make the move:
* Sets the computer's mark in the best cell.
* Updates the board and UI.
* Animates the move.

#### iv) Switch Turn and Manage Timers:
* Switches the turn back to the player.
* Enables the grid for the player.
* Starts the player's timer.

#### v) Check for Winner:
* Checks if the computer has won. If not, returns true to indicate the game continues.

### Minimax Algorithm:
#### The minimax function is a recursive algorithm used to determine the optimal move for the AI. Here's the breakdown:
#### Keypoints:

#### i) Check for Terminal States:
* let result = checkWinner(board, true);: Checks if the game has a winner or is a tie.
* If there is a result, returns a score based on who won or if it's a tie:
* AI win: 10 - depth (favors quicker wins).
* Player win: depth - 10 (penalizes quicker losses).
* Tie: 0.

#### ii) Maximizing Player (AI):
* if (isMaximizing): When it's the AI's turn.
* Initializes bestScore to a very low value.

#### iii) Loops through each cell:
* If the cell is empty, makes a temporary move for the AI.
* Recursively calls minimax to get the score of this move.
* Reverts the move.
* Updates bestScore with the maximum of the current best score and the new score.

#### iv) Minimizing Player (Human):
* else: When it's the player's turn.
* Initializes bestScore to a very high value.

#### v) Loops through each cell:
* If the cell is empty, makes a temporary move for the player.
* Recursively calls minimax to get the score of this move.
* Reverts the move.
* Updates bestScore with the minimum of the current best score and the new score.

#### vi) Return Best Score:
* Returns the best score found for the current player (AI or human).

#### NOTE: By using the minimax algorithm, the AI evaluates all possible moves and their outcomes, ensuring it makes the optimal move to either win or draw the game. This ensures a challenging opponent for the player.

#### Checking for a Winner:
* Winning Patterns: Checks predefined patterns to determine if there's a winner.
* UI Updates: Highlights winning cells and displays the winner or tie message.

#### Move Timing and Animation:
* Move Timer: Starts a timer for the player's move, declaring the computer the winner if time runs out.
* Animations: Adds a pulse animation to the cell to indicate a move.

#### Utility Functions:
* Grid State Management: Enables and disables the grid based on game state.

### 3) CSS Styling
* Overall Style: Sets the font, colors, and layout for the game.
* Transitions and Animations: Smooth transitions for fade effects and pulse animation for moves.
* Responsive Design: Adjusts layout to be centered and maintains a clean, simple look.

## Conclusion
This Tic Tac Toe game provides an engaging experience with a human player competing against an AI. The code includes detailed explanations for each section, making it easy for others to understand and modify the game. Contributions are welcome via issues or pull requests.
