from board import create_board, print_board, board_size
from ship import place_ship, make_guess, all_ships_sunk
from shipconfig import select_ship_configuration

def place_all_ships(board, player_name, ship_sizes):
    print(f"{player_name}, you will now place your ships.")
    ship_positions = {}  # (row, col) -> ship_id
    ship_segments = {}   # ship_id -> set of (row, col)
    for ship_id, ship_size in enumerate(ship_sizes, start=1):
        place_ship(board, ship_size, ship_id, ship_positions)
        ship_segments[ship_id] = set((r, c) for r, c in ship_positions if ship_positions[(r, c)] == ship_id)
    print(f"All ships placed for {player_name}.")
    return ship_positions, ship_segments

def get_player_guess(player_name):
    while True:
        try:
            guess_row = int(input(f"{player_name}, enter the row to guess (0-{board_size-1}): "))
            guess_col = int(input(f"{player_name}, enter the column to guess (0-{board_size-1}): "))
            if 0 <= guess_row < board_size and 0 <= guess_col < board_size:
                return guess_row, guess_col
            else:
                print("Invalid coordinates. Try again.")
        except ValueError:
            print("Please enter valid numbers.")

def play_game():
    player1_board = create_board()
    player2_board = create_board()

    print("Player 1 setup:")
    player1_ships = select_ship_configuration()
    player1_positions, player1_segments = place_all_ships(player1_board, "Player 1", player1_ships)

    print("\nPlayer 2 setup:")
    print("Player 1 has chosen their ship configuration.")
    print("You must follow the same configuration.")
    print("Player 2, you must set up your ships.")
    player2_positions, player2_segments = place_all_ships(player2_board, "Player 2", player1_ships)  # Player 2 uses the same configuration as Player 1

    # Game loop
    turn = 0
    while True:
        if turn % 2 == 0:
            current_player = "Player 1"
            opponent_board = player2_board
            opponent_positions = player2_positions
            opponent_segments = player2_segments
        else:
            current_player = "Player 2"
            opponent_board = player1_board
            opponent_positions = player1_positions
            opponent_segments = player1_segments
        
        print(f"\n{current_player}'s turn")
        print("\nOpponent's board (hidden):")
        print_board([["~" if cell == "S" else cell for cell in row] for row in opponent_board])

        while True:
            guess_row, guess_col = get_player_guess(current_player)
            result, valid = make_guess(opponent_board, guess_row, guess_col, opponent_positions, opponent_segments)
            print(result)
            if valid:
                break  # Exit the loop if the shot was valid

        if all_ships_sunk(opponent_segments):
            print(f"All ships have been sunk! {current_player} wins!")
            break
        
        turn += 1

if __name__ == "__main__":
    play_game()
