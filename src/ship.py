from board import board_size, print_board  # Import board_size from the board module.
import random #get random for AI placement
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

def place_ship(board, ship_size, ship_id, ship_positions):
    while True:  # Loop until a valid ship placement is made.
        # Team 9 addition:
        # Orientation will be skipped if the ship size is 1
        try:
            orientation = None
            # If the ship size isn't 1, ask for the orientation
            if ship_size != 1:
                # Ask the user for the ship's orientation (Horizontal or Vertical) and convert it to uppercase.
                orientation = input(f"Enter orientation for ship of size {ship_size} (H for horizontal, V for vertical): ").upper()
            # Otherwise just arbitrarily set orientation to horizontal
            # Checking for other ships is unnecessary as well, as there will be no other ships, but I don't think its a priority to change this
            else:
                orientation = "H"
                # Check if the input orientation is valid (either 'H' or 'V').
            if orientation not in ['H', 'V']:
                print("Invalid orientation. Please enter H or V.")  # Inform the user of invalid input.
                continue  # Restart the loop if invalid orientation is provided.
            
            # Get the starting row and column from the user.
            start_row = int(input("Enter starting row (1-10): "))   #team 9 changed this to use 1 indexing per project specs
            start_col = str(input("Enter starting column (A-J): ")) #team 9 changed this to use char indexing
            
            start_row = start_row - 1 #uses zero indexing now
            start_col = convert_Char_to_intIndex( start_col ) #converts the char input to a 0 indexed value
                
                
            # Check if the starting position is within the bounds of the board.
            if not (0 <= start_row < board_size and 0 <= start_col < board_size):
                print("Invalid starting position. Please enter coordinates within the board.")  # Inform the user of out-of-bound coordinates.
                continue  # Restart the loop if invalid coordinates are provided.

            # If the ship is placed horizontally.
            if orientation == 'H':
                # Check if the ship fits within the board horizontally.
                if start_col + ship_size > board_size:
                    print("Ship does not fit horizontally. Try again.")  # Inform the user that the ship exceeds the board boundary.
                    continue  # Restart the loop.

                # Check if the ship overlaps with any existing ships.
                if any(board[start_row][start_col + i] != "~" for i in range(ship_size)):
                    print("Ship overlaps with another ship. Try again.")  # Inform the user of overlap with another ship.
                    continue  # Restart the loop.

                # Place the ship on the board by updating the grid with 'S' for each position.
                for i in range(ship_size):
                    board[start_row][start_col + i] = "S"  # Mark the ship's position on the board.
                    ship_positions[(start_row, start_col + i)] = ship_id  # Store the ship's position in ship_positions.
                break  # Exit the loop once the ship is successfully placed.

            # If the ship is placed vertically.
            elif orientation == 'V':
                # Check if the ship fits within the board vertically.
                if start_row + ship_size > board_size:
                    print("Ship does not fit vertically. Try again.")  # Inform the user that the ship exceeds the board boundary.
                    continue  # Restart the loop.

                # Check if the ship overlaps with any existing ships.
                if any(board[start_row + i][start_col] != "~" for i in range(ship_size)):
                    print("Ship overlaps with another ship. Try again.")  # Inform the user of overlap with another ship.
                    continue  # Restart the loop.

                # Place the ship on the board by updating the grid with 'S' for each position.
                for i in range(ship_size):
                    board[start_row + i][start_col] = "S"  # Mark the ship's position on the board.
                    ship_positions[(start_row + i, start_col)] = ship_id  # Store the ship's position in ship_positions.
                break  # Exit the loop once the ship is successfully placed.
        except ValueError:
            print("Please enter valid numbers.")  # Inform the user if they input non-numeric values.
    print_board(board)

def AI_place_ship(board, ship_size, ship_id, ship_positions): #Team 9 added, makes random placements for AI
    while( True ): #could randomly be invalid #TODO
        # Team 9 addition:
        # Orientation will be skipped if the ship size is 1
        orientation = random.choice( ['H', 'V' ] ) #randomly choose H or V
        
        # If the ship is placed horizontally.
        if orientation == 'H':
            start_row = random.randint( 0, 9 ) #chooses 0 to 9 inclusive
            start_col = random.randint( 0, board_size - ship_size ) #uses zero indexing now, only chooses valid spots
            # Check if the ship overlaps with any existing ships. If true, then just randomly pick again
            if any(board[start_row][start_col + i] != "~" for i in range(ship_size)):
                continue  # Restart the loop.

            # Place the ship on the board by updating the grid with 'S' for each position.
            for i in range(ship_size):
                board[start_row][start_col + i] = "S"  # Mark the ship's position on the board.
                ship_positions[(start_row, start_col + i)] = ship_id  # Store the ship's position in ship_positions.
            break  # Exit the loop once the ship is successfully placed.

        # If the ship is placed vertically.
        elif orientation == 'V':
            start_row = random.randint( 0, board_size - ship_size ) #chooses valid spots
            start_col = random.randint( 0, 9 ) #uses zero indexing

            # Check if the ship overlaps with any existing ships.
            if any(board[start_row + i][start_col] != "~" for i in range(ship_size)):
                #print("Ship overlaps with another ship. Try again.")  # Inform the user of overlap with another ship.
                #Uncomment above line to see when AI messes up, for debugging
                continue  # Restart the loop.

            # Place the ship on the board by updating the grid with 'S' for each position.
            for i in range(ship_size):
                board[start_row + i][start_col] = "S"  # Mark the ship's position on the board.
                ship_positions[(start_row + i, start_col)] = ship_id  # Store the ship's position in ship_positions.
            break  # Exit the loop once the ship is successfully placed.
        
#end team 9 addition AI_place ship
def make_guess(board, row, col, ship_positions, ship_segments):
    # If the guessed position contains part of a ship.
    if board[row][col] == "S":
        board[row][col] = "X"  # Mark the position as a hit.
        ship_id = ship_positions.get((row, col))  # Retrieve the ship_id for the hit position.
        if ship_id is not None:
            ship_segments[ship_id].remove((row, col))  # Remove the hit segment from the ship's segment list.
            # If all segments of the ship are hit, the ship is sunk.
            if not ship_segments[ship_id]:
                print(f"Ship {ship_id} has been sunk!")  # Announce that the ship has been sunk.
        return "Hit!", True  # Return the result of the guess as a hit and indicate the guess was valid.

    # If the guessed position contains water.
    elif board[row][col] == "~":
        board[row][col] = "O"  # Mark the position as a miss.
        return "Miss!", True  # Return the result of the guess as a miss and indicate the guess was valid.

    # If the guessed position has already been guessed.
    else:
        return "Already guessed!", False  # Return the result as already guessed and indicate the guess was invalid.

#Team 9 addition
#function to hit all the cells in a given 3x3 surrounding area
def make_aoe_guess(board, row, col, ship_positions, ship_segments):
	flag = False #initialize the flag for the return value

	if board[row][col] == "O": #if the guessed position has already been guessed
		return "Already guessed!", False #return the result as already guessed and indicate the guess was invalid

	if row > 0 and col > 0 and row < 9 and col < 9: #if the guess is not on the boarder
		for i in range(-1, 2): #loop through all the allowable rows
			for j in range(-1, 2): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship_id
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position
                    
					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
							ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list
							if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
								print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~": #if the guessed position contains water
					board[row + i][col + j] = "O" #mark the position as a miss

	elif col > 0 and row < 9 and col < 9: #if the guess is on the boarder
		for i in range(0, 2): #loop through all the allowable rows
			for j in range(-1, 2): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position

					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
						    ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list

						if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
							print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~": #if the guessed position contains water
					board[row + i][col + j] = "O" #mark the position as a miss

	if row > 0 and row < 9 and col < 9: #if the guess is on the boarder
		for i in range(-1, 2): #loop through all the allowable rows
			for j in range(0, 2): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position

					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
						    ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list

						if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
							print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~": #if the guessed position contains water
					board[row + i][col + j] = "O" #mark the position as a miss

	if row > 0 and col > 0 and col < 9: #if the guess is on the boarder
		for i in range(-1, 1): #loop through all the allowable rows
			for j in range(-1, 2): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position

					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
						    ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list

						if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
							print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~": #if the guessed position contains water
					board[row + i][col + j] = "O" #mark the position as a miss

	if row > 0 and col > 0 and row < 9: #if the guess is on the boarder
		for i in range(-1, 2): #loop through all the allowable rows
			for j in range(-1, 1): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position

					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
						    ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list

						if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
							print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~":
					board[row + i][col + j] = "O" #mark the position as a miss

	if row < 9 and col < 9: #if the guess is on the boarder
		for i in range(0, 2): #loop through all the allowable rows
			for j in range(0, 2): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position

					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
							ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list

						if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
							print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~": #if the guessed position contains water
					board[row + i][col + j] = "O" #mark the position as a miss

	if row > 0 and col > 0: #if the guess is on the boarder
		for i in range(-1, 1): #loop through all the allowable rows
			for j in range(-1, 1): #loop through all the allowable columns
				if board[row + i][col + j] == "S": #if the guessed position contains part of a ship
					board[row + i][col + j] == "X" #mark the position as a hit
					ship_id = ship_positions.get((row + i, col + j)) #retrieve the ship_id for the hit position

					if ship_id is not None: #if the ship_id is populated
						if len(ship_segments[ship_id]) > 0: # If there is actually a space there
							ship_segments[ship_id].remove((row + i, col + j)) #remove the hit segment from the ship's segment list

						if not ship_segments[ship_id]: #if all the segments of the ship are hit, the ship is sunk
							print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

					flag = True #set the flag so that the function returns true

				elif board[row + i][col + j] == "~": #if the guessed position contains water
					board[row + i][col + j] = "O" #mark the position as a miss

	if flag: #check the flag to determine the return value
		return "Hit!", True #return the result of the guess as a hit and indicate the guess was valid

	else:
		return "Miss!", True #return the result of the guess as a miss and indicate the guess was valid

#function to hit all the cells in a given row - column should be initialized to 0 when called
def make_row_guess(board, row, col, ship_positions, ship_segments):
	flag = False #initialize the flag for the return value

	for i in range(10): #for all the columns in the guessed row
		if board[row][i] == "S": #if the guessed position contains part of a ship
			board[row][i] = "X" #mark the position as a hit
			ship_id = ship_positions.get((row, i)) #retrieve the ship_id for the hit position

			if ship_id is not None: #if the ship_id is populated
				ship_segments[ship_id].remove((row, i)) #remove the hit segment from the ship's segment list

				if not ship_segments[ship_id]: #if all segments of the ship are hit, the ship is sunk
					print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

			flag = True #set the flag so that the function returns true

		elif board[row][i] == "~": #if the guessed position contains water
			board[row][i] = "O" #mark the position as a miss

	if flag: #check the flag to determine the return value
		return "Hit!", True #return the result of the guess as a hit and indicate the guess was valid

	else:
		return "Miss!", True #return the result of the guess as a miss and indicate the guess was valid

#function to hit all the cells in a given column - row should be initialized to 0 when called
def make_col_guess(board, row, col, ship_positions, ship_segments):
	flag = False #initialize the flag for the return value

	for i in range(10): #for all the rows in the guessed column
		if board[i][col] == "S": #if the guessed position contains part of a ship
			board[i][col] = "X" #mark the position as a hit
			ship_id = ship_positions.get((i, col)) #retrieve the ship_id for the hit position

			if ship_id is not None: #if the ship_id is populated
				ship_segments[ship_id].remove((i, col)) #remove the hit segment from the ship's segment list

				if not ship_segments[ship_id]: #if all segments of the ship are hit, the ship is sunk
					print(f"Ship {ship_id} has been sunk!") #announce that the ship has been sunk

			flag = True #set the flag so that the function returns true

		elif board[i][col] == "~": #if the guessed position contains water
			board[i][col] = "O" #mark the position as a miss

	if flag: #check the flag to determine the return value
		return "Hit!", True #return the result of the guess as a hit and indicate the guess was valid

	else:
		return "Miss!", True #return the result of the guess as a miss and indicate the guess was valid

#end Team 9 addition for the three custom shot functions
def all_ships_sunk(ship_segments):
    # Check if all ships have been sunk by verifying that all ship segments are empty.
    return all(not segments for segments in ship_segments.values())  # Return True if all ships are sunk, False otherwise.
