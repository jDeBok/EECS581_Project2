from board import board_size;
def place_ship(board, ship_size, ship_id, ship_positions):
    while True:
        try:
            orientation = input(f"Enter orientation for ship of size {ship_size} (H for horizontal, V for vertical): ").upper()
            if orientation not in ['H', 'V']:
                print("Invalid orientation. Please enter H or V.")
                continue
            start_row = int(input("Enter starting row (0-9): "))
            start_col = int(input("Enter starting column (0-9): "))
            if not (0 <= start_row < board_size and 0 <= start_col < board_size):
                print("Invalid starting position. Please enter coordinates within the board.")
                continue

            if orientation == 'H':
                if start_col + ship_size > board_size:
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
                if start_row + ship_size > board_size:
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
                print(f"Ship {ship_id} has been sunk!")
        return "Hit!", True
    elif board[row][col] == "~":
        board[row][col] = "O"  # Mark as miss
        return "Miss!", True
    else:
        return "Already guessed!", False


def all_ships_sunk(ship_segments):
    return all(not segments for segments in ship_segments.values())
