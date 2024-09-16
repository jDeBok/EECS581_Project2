board_size = 10

def create_board():
    return [["~" for _ in range(board_size)] for _ in range(board_size)]

def print_board(board):
    print("  " + " ".join(str(i) for i in range(board_size)))
    for idx, row in enumerate(board):
        print(idx, " ".join(row))
