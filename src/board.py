#Program: board methods
#Description:  creates the board and prints the board
#Author: Team 2, modifications Team 9
#
board_size = 10  # Set the size of the board (a grid) to 10x10.

def create_board():
    return [["~" for _ in range(board_size)] for _ in range(board_size)]  # Create a 10x10 grid filled with "~" representing water.

def print_board(board):
    #print("  " + " ".join(str(i) for i in range(board_size)))  # Print column headers (0 to board_size-1).
    #Additions by team 9
    print("\n   A B C D E F G H I J") #print column headers ( a through j)
    #end Team 9 additions
    for idx, row in enumerate(board):
        #additions
        if( idx == 9 ):
            print( "10", " ".join(row))  #Special case for i = 10, to line up row headers
        else:
            print( " " + str(idx + 1), " ".join(row))  # Print each row's index followed by its contents, joined by spaces. Index 1 through 10
        #end additions
        #print(idx, " ".join(row))  # Print each row's index followed by its contents, joined by spaces.
    print("\n")
