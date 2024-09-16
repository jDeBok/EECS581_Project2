SHIP_CONFIGURATIONS = {
    5: [1, 2, 3, 4, 5],
    4: [1, 2, 3, 4],
    3: [1, 2, 3],
    2: [1, 2],
    1: [1]
}

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
