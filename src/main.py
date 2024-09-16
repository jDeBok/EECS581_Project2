from board import create_board, print_board, board_size  # Import functions and variables related to the board.
from ship import place_ship, make_guess, all_ships_sunk  # Import functions related to ship placement, guessing, and checking if all ships are sunk.
from shipconfig import select_ship_configuration  # Import function to select ship configuration.

def place_all_ships(board, player_name, ship_sizes):
    print(f"{player_name}, you will now place your ships.")  # Inform the player that they are placing ships.
    ship_positions = {}  # Dictionary to store ship positions: (row, col) -> ship_id.
    ship_segments = {}   # Dictionary to store ship segments: ship_id -> set of (row, col).
    
    # Loop over each ship size and place it on the board.
    for ship_id, ship_size in enumerate(ship_sizes, start=1):
        place_ship(board, ship_size, ship_id, ship_positions)  # Place a ship on the board.
        ship_segments[ship_id] = set((r, c) for r, c in ship_positions if ship_positions[(r, c)] == ship_id)  # Record positions of the ship.
    
    print(f"All ships placed for {player_name}.")  # Confirm that all ships have been placed.
    return ship_positions, ship_segments  # Return ship positions and segments.

def get_player_guess(player_name):
    while True:  # Loop until valid coordinates are provided.
        try:
            guess_row = int(input(f"{player_name}, enter the row to guess (0-{board_size-1}): "))  # Get the row guess from the player.
            guess_col = int(input(f"{player_name}, enter the column to guess (0-{board_size-1}): "))  # Get the column guess from the player.
            
            # Check if the guess is within the valid range.
            if 0 <= guess_row < board_size and 0 <= guess_col < board_size:
                return guess_row, guess_col  # Return valid guess coordinates.
            else:
                print("Invalid coordinates. Try again.")  # Inform the player of invalid input.
        except ValueError:
            print("Please enter valid numbers.")  # Inform the player if input is not a number.

def play_game():
    player1_board = create_board()  # Create an empty board for Player 1.
    player2_board = create_board()  # Create an empty board for Player 2.

    print("Player 1 setup:")
    player1_ships = select_ship_configuration()  # Let Player 1 select their ship configuration.
    player1_positions, player1_segments = place_all_ships(player1_board, "Player 1", player1_ships)  # Player 1 places their ships.

    print("\nPlayer 2 setup:")
    print("Player 1 has chosen their ship configuration.")  # Notify Player 2 that they must use the same configuration as Player 1.
    print("You must follow the same configuration.")
    print("Player 2, you must set up your ships.")
    player2_positions, player2_segments = place_all_ships(player2_board, "Player 2", player1_ships)  # Player 2 places their ships with the same configuration.

    # Game loop
    turn = 0  # Keep track of turns.
    while True:
        if turn % 2 == 0:  # If turn is even, it's Player 1's turn.
            current_player = "Player 1"
            opponent_board = player2_board  # Player 1 is attacking Player 2's board.
            opponent_positions = player2_positions
            opponent_segments = player2_segments
        else:  # If turn is odd, it's Player 2's turn.
            current_player = "Player 2"
            opponent_board = player1_board  # Player 2 is attacking Player 1's board.
            opponent_positions = player1_positions
            opponent_segments = player1_segments
        
        print(f"\n{current_player}'s turn")  # Announce the current player's turn.
        print("\nOpponent's board (hidden):")
        # Print the opponent's board with ships hidden (represented as "~" if it's a ship).
        print_board([["~" if cell == "S" else cell for cell in row] for row in opponent_board])

        while True:
            guess_row, guess_col = get_player_guess(current_player)  # Get the current player's guess.
            result, valid = make_guess(opponent_board, guess_row, guess_col, opponent_positions, opponent_segments)  # Make a guess and check if it's valid.
            print(result)  # Print the result of the guess.
            if valid:
                break  # Exit the loop if the shot was valid.

        # Check if all ships of the opponent have been sunk.
        if all_ships_sunk(opponent_segments):
            print(f"All ships have been sunk! {current_player} wins!")  # Announce the winner if all ships are sunk.
            break  # End the game.
        
        turn += 1  # Move to the next turn.

if __name__ == "__main__":
    play_game()  # Start the game if the script is run directly.
