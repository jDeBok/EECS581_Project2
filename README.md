Battleship Game
A simple implementation of the classic Battleship game in Python. Players take turns guessing the locations of each other's ships on a grid, with the goal of sinking all opponent's ships before their own are sunk.

Project Structure
main.py: The main entry point of the game, which handles game flow, player turns, and game setup.
board.py: Contains functions to create and print the game board.
ship.py: Contains functions for placing ships on the board, making guesses, and checking if all ships have been sunk.
shipconfig.py: Manages ship configurations and selections.
Setup
Clone the Repository

bash
Copy code
git clone <repository_url>
cd <repository_directory>
Ensure Python is Installed

Make sure you have Python 3.x installed. You can check your Python version by running:

bash
Copy code
python --version
Install Dependencies

This project does not have external dependencies beyond the standard Python library.

How to Play
Run the Game

To start the game, run the following command in your terminal:

bash
Copy code
python main.py
Game Setup

Player 1 will first place their ships on a 10x10 grid, choosing their positions and orientations (horizontal or vertical).
Player 2 will place their ships on a separate grid following the same configuration as Player 1.
Taking Turns

Players take turns guessing the location of their opponent's ships.
Input the row and column coordinates to make a guess.
The game will inform you whether your guess was a hit or a miss.
Winning the Game

The game ends when all ships of one player have been sunk.
The player who still has ships remaining is declared the winner.
Files
main.py: Handles game flow and interaction with players.
board.py: Contains board creation and display functions.
ship.py: Manages ship placement and guessing mechanics.
shipconfig.py: Provides predefined ship configurations for players to select.
Contributing
Feel free to fork the repository and submit pull requests with improvements or bug fixes. Ensure that any changes are well-tested and documented.
