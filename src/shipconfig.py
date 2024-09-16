# Dictionary storing ship configurations where the key represents the number of ships, 
# and the value is a list representing the ship sizes.
SHIP_CONFIGURATIONS = {
    5: [1, 2, 3, 4, 5],  # 5 ships of sizes 1, 2, 3, 4, 5
    4: [1, 2, 3, 4],     # 4 ships of sizes 1, 2, 3, 4
    3: [1, 2, 3],        # 3 ships of sizes 1, 2, 3
    2: [1, 2],           # 2 ships of sizes 1, 2
    1: [1]               # 1 ship of size 1
}

def select_ship_configuration():
    print("Select ship configuration:")  # Prompt the user to select a ship configuration.
    
    # Print each available configuration by iterating through the SHIP_CONFIGURATIONS dictionary.
    for key in SHIP_CONFIGURATIONS:
        print(f"{key} ships: {SHIP_CONFIGURATIONS[key]}")  # Display the number of ships and their sizes.
    
    while True:  # Loop until the user selects a valid configuration.
        try:
            # Ask the user to input a number representing the configuration (number of ships).
            choice = int(input("Enter number of ships (1-5): "))
            
            # Check if the input corresponds to a valid configuration in the dictionary.
            if choice in SHIP_CONFIGURATIONS:
                return SHIP_CONFIGURATIONS[choice]  # Return the selected ship configuration.
            else:
                print("Invalid choice. Please enter a number between 1 and 5.")  # Inform the user of invalid input.
        except ValueError:
            print("Please enter a valid number.")  # Inform the user if a non-numeric value is entered.
