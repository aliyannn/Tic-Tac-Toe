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

#### Handling Player Moves:
* Player Actions: Updates the board and UI when the player makes a move.
* State Management: Disables the grid and clears the player's move timer.
* AI Move: Calls computerMove() after a delay to simulate thinking time.

#### Handling AI Moves:
* Minimax Algorithm: Uses the minimax algorithm to determine the best move.
* AI Actions: Updates the board and UI when the AI makes a move.
* State Management: Enables the grid and starts the player's move timer.

#### Minimax Algorithm:
* Recursive Algorithm: Evaluates all possible moves to find the optimal one.
* Scoring: Assigns scores based on game outcomes (win, loss, tie).

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
