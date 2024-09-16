BOARD_SIZE = 10

# Define the ship configurations
SHIP_CONFIGURATIONS = {
    5: [1, 2, 3, 4, 5],
    4: [1, 2, 3, 4],
    3: [1, 2, 3],
    2: [1, 2],
    1: [1]
}

def create_board():
    return [["~" for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]

def print_board(board):
    print("  " + " ".join(str(i) for i in range(BOARD_SIZE)))
    for idx, row in enumerate(board):
        print(idx, " ".join(row))

def place_ship(board, ship_size, ship_id, ship_positions):
    while True:
        try:
            orientation = input(f"Enter orientation for ship of size {ship_size} (H for horizontal, V for vertical): ").upper()
            if orientation not in ['H', 'V']:
                print("Invalid orientation. Please enter H or V.")
                continue
            start_row = int(input("Enter starting row (0-9): "))
            start_col = int(input("Enter starting column (0-9): "))
            if not (0 <= start_row < BOARD_SIZE and 0 <= start_col < BOARD_SIZE):
                print("Invalid starting position. Please enter coordinates within the board.")
                continue

            if orientation == 'H':
                if start_col + ship_size > BOARD_SIZE:
                    print("Ship does not fit horizontally. Try again.")
                    continue
                if any(board[start_row][start_col + i] != "~" for i in range(ship_size)):
                    print("Ship overlaps with another ship. Try again.")
                    continue
                for i in range(ship_size):
                    board[start_row][start_col + i] = "S"
                    ship_positions[(start_row, start_col + i)] = ship_id
                break

            elif orientation == 'V':
                if start_row + ship_size > BOARD_SIZE:
                    print("Ship does not fit vertically. Try again.")
                    continue
                if any(board[start_row + i][start_col] != "~" for i in range(ship_size)):
                    print("Ship overlaps with another ship. Try again.")
                    continue
                for i in range(ship_size):
                    board[start_row + i][start_col] = "S"
                    ship_positions[(start_row + i, start_col)] = ship_id
                break
        except ValueError:
            print("Please enter valid numbers.")

def make_guess(board, row, col, ship_positions, ship_segments):
    if board[row][col] == "S":
        board[row][col] = "X"  # Mark as hit
        ship_id = ship_positions.get((row, col))
        if ship_id is not None:
            ship_segments[ship_id].remove((row, col))
            if not ship_segments[ship_id]:
                print("Hit!")
                print(f"Ship {ship_id} has been sunk!")
                return '\n'
        return "Hit!"
    elif board[row][col] == "~":
        board[row][col] = "O"  # Mark as miss
        return "Miss!"
    else:
        return "Already guessed!"

def all_ships_sunk(ship_segments):
    return all(not segments for segments in ship_segments.values())

def get_player_guess(player_name):
    while True:
        try:
            guess_row = int(input(f"{player_name}, enter the row to guess (0-{BOARD_SIZE-1}): "))
            guess_col = int(input(f"{player_name}, enter the column to guess (0-{BOARD_SIZE-1}): "))
            if 0 <= guess_row < BOARD_SIZE and 0 <= guess_col < BOARD_SIZE:
                return guess_row, guess_col
            else:
                print("Invalid coordinates. Try again.")
        except ValueError:
            print("Please enter valid numbers.")

def place_all_ships(board, player_name, ship_sizes):
    print(f"{player_name}, you will now place your ships.")
    ship_positions = {}  # (row, col) -> ship_id
    ship_segments = {}   # ship_id -> set of (row, col)
    for ship_id, ship_size in enumerate(ship_sizes, start=1):
        place_ship(board, ship_size, ship_id, ship_positions)
        ship_segments[ship_id] = set((r, c) for r, c in ship_positions if ship_positions[(r, c)] == ship_id)
    print(f"All ships placed for {player_name}.")
    return ship_positions, ship_segments

def select_ship_configuration():
    print("Select ship configuration:")
    for key in SHIP_CONFIGURATIONS:
        print(f"{key} ships: {SHIP_CONFIGURATIONS[key]}")
    while True:
        try:
            choice = int(input("Enter number of ships (1-5): "))
            if choice in SHIP_CONFIGURATIONS:
                return SHIP_CONFIGURATIONS[choice]
            else:
                print("Invalid choice. Please enter a number between 1 and 5.")
        except ValueError:
            print("Please enter a valid number.")

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

        guess_row, guess_col = get_player_guess(current_player)
        result = make_guess(opponent_board, guess_row, guess_col, opponent_positions, opponent_segments)
        print(result)

        if all_ships_sunk(opponent_segments):
            print(f"All ships have been sunk! {current_player} wins!")
            break
        
        turn += 1

if __name__ == "__main__":
    play_game()
