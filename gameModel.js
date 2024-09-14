/* 
 * Program Name:
 * Game Model Module
 * 
 * Description:
 * This File contains the GameModel, ShipPlacementHandler and MainGameHandler classes for managing game states
 * 
 * Inputs:
 * - Player ship positions, current game states
 * 
 * Outputs:
 * - Transitions to future game state
 * 
 * Code sources:
 * Self, MDN web docs, a couple of Stack overflow answers
 * 
 * Author:
 * Code: Jake Bernard, Alex Doehring, Mark Maloney
 * Documentation: Drew Meyer
 * 
 * Creation Date:
 * 2024-09-08
 * 
 */

class GameModel {  // Class object that contains and updates the game state
    constructor() {
        this.gamemode = Object.freeze({     // Enum for Game Mode 
            RuleSelect: 'RuleSelect',       // State following start screen where players select # of ships 
            PlaceShips: 'PlaceShips',       // State where players place/orient their ships
            MainGame: 'MainGame',           // State which alternates between players where players take shots
            GameWin: 'GameWin',             // State after a player has won, prompts play again
            SwitchPlayers: 'SwitchPlayers', // State handling transition between player MainGame state
            TitleScreen: 'TitleScreen'      // State handlnig start screen
        });
    }
    recieveMessage = function(message) {    // Method of GameMaster which takes action based on internal messages
        return message;
    }
}

class ShipPlacementHandler{  // Class object which maintains the location of each player's ship(s)
    constructor(unplacedShips,placedShips,boards,currentPlayer){
    this.unplacedShips = unplacedShips;  // Unplaced ships are held in a 2d array with one nested array for each player
    this.placedShips = placedShips;      // Unplaced ships moved to this 2d array when moved to the board
    this.boards = boards;                // 2d array of GameCells which comprise the playable board
    this.currentPlayer = currentPlayer;  // Tracks current turn's player
    }

    finishSetup(){  // Method to retrieve game state
        return this.boards;
    }
}

class MainGameHandler{  // Class object representing the actual game
    constructor(ships,liveShips,boards,currentPlayer,targetPlayer){
        this.ships=ships;                  // 2d array of ships in player order, accessed with ships[player][ship]
        this.liveShips=liveShips;          // Array of ints which keeps track of the current lives of each ships (total live segments)
        this.boards=boards;                // 3d array of GameCells containing ships segment, accessed with boards[player][row][column]
        this.currentPlayer=currentPlayer;  // Int representing current player
        this.targetPlayer=targetPlayer;    // The player whose board is being targeted
    }
    sendMessage(){
        return; //message
    }
}