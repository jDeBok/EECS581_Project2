# Battleship Game
This Battleship game is a turn-based two-player strategy game implemented in Python, played through the terminal. Each player places ships on a 10x10 grid, then takes turns guessing the coordinates of the opponent's ships. The game ends when all ships of one player are sunk.

## Project Structure
- `main.py`: Manages the game flow, including setting up ships, taking turns, and checking win conditions.
- `board.py`: Handles board creation and display.
- `ship.py`: Manages ship placement, tracking hits and misses.
- `shipconfig.py`: Configures ship selection and enforces ship size constraints.

# Detailed File Descriptions
## Board.py
- `board_size`: Sets the board size to 10x10.
- `create_board()`: Initializes a grid of `board_size`, where each cell is represented by "~".
- `print_board(board)`: Prints the board, showing row and column indices.

## ShipConfig.py
- `SHIP_CONFIGURATIONS`: A dictionary that maps ship counts to their sizes.
- `select_ship_configuration()`: Prmopts players to choose a number of ships (between 1-5), based on predefined configurations.

## Ship.py
- `place_ship(board, ship_size, ship_id, ship_positions)`: Prompts players for ship orientation and starting position, ensuring ships fit on the board without overlapping. The ship's coordinates are stored in `ship_positions`.
- `make_guess(board, row, col, ship_positions, ship_segments)`: Processes player guesses. Marks hits ("X") or misses ("O") on the board, and tracks if a ship has been sunk.
- `all_ships_sunk(ship_segments)`: Returns `True` if all ships have been sunk.

## Main.py
- `place_all_ships(board, player_name, ship_sizes)`: Each player places their ships on the board by providing ship sizes. The position of ships are tracked.
- `get_player_guess(player_name)`: Prompts the player to input coordinates for guessing the opponent's ship location.
- `play_game()`: The core game loop. Alternates turns between the two players, prints the opponent's board (hiding the ship positions), checks for valid guesses, and ends the game when all ships are sunk.

# How to Play

## 1. Run the Game
Run `python3 main.py` in your terminal.

## 2. Game Setup
Player 1 will first place their ships on a 10x10 grid, choosing their positions and orientations (horizontal or vertical).
Player 2 will place their ships on a separate grid following the same configuration as Player 1.

## 3. Taking Turns
Players take turns guessing the location of their opponent's ships.
Input the row and column coordinates to make a guess.
The game will inform you whether your guess was a hit or a miss.

## 4. Winning the Game
The game ends when all ships of one player have been sunk.
The player who still has ships remaining is declared the winner.



