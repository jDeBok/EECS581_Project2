import os #For clearing the screen
import time # For sleep
import random #for AI
from board import create_board, print_board, board_size  # Import functions and variables related to the board.
from ship import AI_place_ship, place_ship, make_guess, all_ships_sunk  # Import functions related to ship placement, guessing, and checking if all ships are sunk.
from shipconfig import select_ship_configuration  # Import function to select ship configuration.

def convert_Char_to_intIndex( char_switch ):
    # This function converts a char into a zero indexed number for the board
    if( type( char_switch ) == str ):
        c = char_switch.lower() #make sure the input is a string
    else:
        c = "error" #c is not a char, is bad
    if c == "a" : #a to 0
        return 0
    elif c == "b" : #b to 1
        return 1
    elif c == "c" : #c to 2
        return 2
    elif c == "d" : #d to 3
        return 3
    elif c == "e" : #e to 4
        return 4
    elif c == "f" : #f to 5
        return 5
    elif c == "g" : #g to 6
        return 6
    elif c == "h" : #h to 7
        return 7
    elif c == "i" : #i to 8
        return 8
    elif c == "j" : #j to 9
        return 9
    else:
        return -1 #error

# Team 9 change:
# The board will now be printed while placing ships

def place_all_ships(board, player_name, ship_sizes):
    print_board(board) # Print board
    print(f"{player_name}, you will now place your ships.")  # Inform the player that they are placing ships.
    ship_positions = {}  # Dictionary to store ship positions: (row, col) -> ship_id.
    ship_segments = {}   # Dictionary to store ship segments: ship_id -> set of (row, col).
    
    # Loop over each ship size and place it on the board.
    for ship_id, ship_size in enumerate(ship_sizes, start=1):
        place_ship(board, ship_size, ship_id, ship_positions)  # Place a ship on the board.
        ship_segments[ship_id] = set((r, c) for r, c in ship_positions if ship_positions[(r, c)] == ship_id)  # Record positions of the ship.
    
    print(f"All ships placed for {player_name}.")  # Confirm that all ships have been placed.
    return ship_positions, ship_segments  # Return ship positions and segments.

def AI_place_all_ships(board, player_name, ship_sizes): #Team 9 addition.  Use same process but make it random placement
    ship_positions = {}  # Dictionary to store ship positions: (row, col) -> ship_id.
    ship_segments = {}   # Dictionary to store ship segments: ship_id -> set of (row, col).
    
    # Loop over each ship size and place it on the board.
    for ship_id, ship_size in enumerate(ship_sizes, start=1):
        AI_place_ship(board, ship_size, ship_id, ship_positions)  # Place a ship on the board. With AI doing it now
        ship_segments[ship_id] = set((r, c) for r, c in ship_positions if ship_positions[(r, c)] == ship_id)  # Record positions of the ship.
    return ship_positions, ship_segments  # Return ship positions and segments.

def get_player_guess(player_name):
    while True:  # Loop until valid coordinates are provided.
        try:
            guess_row = int(input(f"\n{player_name}, enter the row to guess (1-{board_size}): "))  # Get the row guess from the player. (1-10)
            guess_col = str(input(f"{player_name}, enter the column to guess (A-J): "))  # Get the column guess from the player. (a-j)
            guess_row = guess_row - 1 #make zero indexed
            guess_col = convert_Char_to_intIndex( guess_col ) #converts the char input to a 0 indexed value
            
            # Check if the guess is within the valid range.
            if 0 <= guess_row < board_size and 0 <= guess_col < board_size:
                return guess_row, guess_col  # Return valid guess coordinates.
            else:
                print("Invalid coordinates. Try again.")  # Inform the player of invalid input.
        except ValueError:
            print("Please enter valid numbers.")  # Inform the player if input is not a number.

def AI_get_player_guess( d, op_board ):
    if( d == 1 ): #easy
        while( True ):
            #Fires randomly, however does not shoot where it has already shot
            guess_row = random.randint( 0, 9 ) #get random int between 0 and 9 inclusive
            guess_col = random.randint( 0, 9 ) #get random int between 0 and 9 inclusive
            if( op_board[ guess_row][ guess_col ] == "O" ): #check if this has already been shot at
                continue#print( "AI tried to shoot already shot place" ) #TODO: remove, only here for debugging #randomly guess again
            return guess_row, guess_col #return valid coords
    elif( d == 2 ): #medium
        return #todo
    else: #hard
        #need to find position of a ship to hit, so just look at opponent's board
        for i in range( board_size ):
            for j in range( board_size ):
                if( op_board[ i ][ j ] == "S" ): #see if there is a ship at that spot
                    return i, j #found ship, return that row and column
        return -1, -1 #ERROR

def play_game():
    #Addition for one player game
    while( True ): #same style as other question loops
        players = input( "Hello! Would you like to play a one (1) or two (2) player game?" ) #choose 1 or 2 player
        if players not in ['1', '2']: #check if valid
            print( "Invalid choice, please try again." ) #invalid
        else: #valid
            players = True if ( players == '1' ) else False #True means one player game, false means two player game
            break #break out of while true loop
    while( True ): #now need to choose difficulty of AI
        if( players ): #sure I am in one player game
            difficulty = input( "What Difficulty would you like the AI to be? Easy (1), Medium (2), Hard (3)" ) #choose easy, medium, or hard
            if difficulty not in [ '1', '2', '3', 'Easy', 'Medium', 'Hard', 'easy', 'medium', 'hard', 'e', 'm', 'h', 'E', 'M', 'H' ]: #check if valid
                print( "Invalid choice, please try again." ) #invalid
            else: #valid
                if( difficulty in [ '1', 'Easy', 'easy', 'e', 'E' ] ): 
                    difficulty = 1 #set to easy
                elif( difficulty in [ '2', 'Medium', 'medium', 'm', 'M' ] ):
                    difficulty = 2 #set to medium
                else:
                    difficulty = 3 #set to hard
                break #break out of while true loop
        else:
            break #two player game, don't ask for difficulty
    #end Addition
    player1_board = create_board()  # Create an empty board for Player 1.
    player2_board = create_board()  # Create an empty board for Player 2.

    print("Player 1 setup:")
    player1_ships = select_ship_configuration()  # Let Player 1 select their ship configuration.
    player1_positions, player1_segments = place_all_ships(player1_board, "Player 1", player1_ships)  # Player 1 places their ships.

    if( not players ): 
        # Team 9 change:
        # The screen will now clear and wait for the users to switch seats
        time.sleep(4)
        os.system("clear")
        time.sleep(5)
        #only do this if 2 player game

    if( players ): #one player, so do AI setup
        player2_positions, player2_segments = AI_place_all_ships(player2_board, "Player 2", player1_ships)  # Player 2 places their ships with the same configuration.
        #print( "Player1" )
        #print_board( player1_board )
        #print( "player2" )
        #print_board( player2_board )
        #return #debugging
    else: #two players, go ahead with player two setup
        print("\nPlayer 2 setup:")
        print("Player 1 has chosen their ship configuration.")  # Notify Player 2 that they must use the same configuration as Player 1.
        print("You must follow the same configuration.")
        print("Player 2, you must set up your ships.")
        player2_positions, player2_segments = place_all_ships(player2_board, "Player 2", player1_ships)  # Player 2 places their ships with the same configuration.

        # Team 9 change:
        # The screen will now clear and wait for the users to switch seats
        time.sleep(4)
        os.system("clear")
        time.sleep(5)

    # Game loop
    # Team 9 addition:
    # Opponent's and current player's board will print, rather than just opponent's
    turn = 0  # Keep track of turns.
    while True:
        if turn % 2 == 0:  # If turn is even, it's Player 1's turn.
            current_player = "Player 1"
            current_board = player1_board
            opponent_board = player2_board  # Player 1 is attacking Player 2's board.
            opponent_positions = player2_positions
            opponent_segments = player2_segments
        else:  # If turn is odd, it's Player 2's turn.
            current_player = "Player 2"
            current_board = player2_board
            opponent_board = player1_board  # Player 2 is attacking Player 1's board.
            opponent_positions = player1_positions
            opponent_segments = player1_segments
        if( players ): #one player, so slighly different
            if( turn % 2 == 0 ): #player 1 turn, so normal
                print(f"\n{current_player}'s turn")  # Announce the current player's turn.
                # Print the opponent's board with ships hidden (represented as "~" if it's a ship).
                print_board([["~" if cell == "S" else cell for cell in row] for row in opponent_board])
                # Print the current player's board
                print("\n")
                print_board(current_board)

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

                # Team 9 change:
                # AI doesn't need to clear screen
            else: #AI player turn
                print( "AI Player's turn" ) #tell AI's turn
                #print_board( current_board ) #here for debugging
                while True:
                    guess_row, guess_col = AI_get_player_guess( difficulty, opponent_board )  # Get the AI's guess
                    result, valid = make_guess(opponent_board, guess_row, guess_col, opponent_positions, opponent_segments)  # Make a guess and check if it's valid.
                    print(result)  # Print the result of the guess.
                    if valid:
                        break  # Exit the loop if the shot was valid.

                # Check if all ships of the opponent have been sunk.
                if all_ships_sunk(opponent_segments):
                    print(f"All ships have been sunk! {current_player} wins!")  # Announce the winner if all ships are sunk.
                    break  # End the game.
                
                turn += 1  # Move to the next turn.
                #AI doesn't clear screen as no hot seat
        else:
            print(f"\n{current_player}'s turn")  # Announce the current player's turn.
            # Print the opponent's board with ships hidden (represented as "~" if it's a ship).
            print_board([["~" if cell == "S" else cell for cell in row] for row in opponent_board])
            # Print the current player's board
            print("\n")
            print_board(current_board)

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

            # Team 9 change:
            # The screen will now clear and wait for the users to switch seats
            time.sleep(4)
            os.system("clear")
            time.sleep(4)

if __name__ == "__main__":
    play_game()  # Start the game if the script is run directly.
