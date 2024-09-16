BOARD_SIZE = 10

def create_board():
    return [["~" for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]

def print_board(board):
    print("  " + " ".join(str(i) for i in range(BOARD_SIZE)))
    for idx, row in enumerate(board):
        print(idx, " ".join(row))
