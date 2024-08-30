# EECS581_Project1
This repo contains the code for our first project, a recreation of the popular game Battleship.

Overview:
- Let's make Battleship!
- Battleship is a two-player game.
- Both players secretly place 1 to 5 ships on a 10x10 grid.
- Taking turns, each player announces where on the opponent's grid they wish to fire.
- The opponent must announce whether or not one of the ships was hit.
- The first player to sink all the opponent's ships wins.

Requirements
1. Game Setup
  - Board size
      1. 10x10
      2. The columns are denoted by letters (A-J)
      3. The rows are denoted by number (1-10)
  - Number of ships (per player)
      1. Given by user
      2. Minimum of 1 and a maximum of 5
  - Types of ships
      1. This will be based on the number of ships chosen.
      2. If a total of 1 ship is chosen, then each player gets a single 1x1 ship
      3. If a total of 2 ships is chosen, then each player gets a 1x1 and a 1x2 ship
      4. This continues up to 5, where each player will a 1x1, 1x2, 1x3, 1x4, and a 1x5 ship
  - Ship placement
      1. After the number of ships is chosen, players need to be able to secretly orient and place the ships on their board.
2. Playing the Game
      1. Taking turns, the users pick a space on the opponent's board to "fire" at.
      2. They must then be informed if the shot was a "hit" or a "miss".
      3. The player's view should be updated to reflect this (see Player's view below).
      4. After each shot, it is the other players turn.
3. Destroying a ship
      1. Once a ship has been hit in every space it occupies, it is sunk.
      2. For example, if the 1x3 ship occupies spaces B3, B4, and B5.
      3. Once the opponent has shot those three spaces, that ship is sunk.
4. Player's view
      1. A player should have full view of their board and where their ships are placed.
      2. Show how many times each ship has been hit
      3. A player should have a board to track all shots they've fired and whether they were
misses or hits.
5. Game End: Once a player has sunk all the opponent's ships, they immediately win
