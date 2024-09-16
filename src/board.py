board_size = 10  # Set the size of the board (a grid) to 10x10.

def create_board():
    return [["~" for _ in range(board_size)] for _ in range(board_size)]  # Create a 10x10 grid filled with "~" representing water.

def print_board(board):
    print("  " + " ".join(str(i) for i in range(board_size)))  # Print column headers (0 to board_size-1).
    for idx, row in enumerate(board):
        print(idx, " ".join(row))  # Print each row's index followed by its contents, joined by spaces.
