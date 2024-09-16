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
import { Orientation, Coord, Ship, ShipSegment, GameCell } from './ships.js'; //import ships Class functions

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
    
        this.currentPlayer = null; //initialize currentPLayer
        this.p1Ships = []; //init array for playerships
        this.p2Ships = [];
        this.unplacedShips = [[]]; //array for unplaced ships
        this.boards = Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => new GameCell())
            )
        );
        this.shipPlacementHandler = null; //init ship handler
        this.mainGameHandler = null; //init main handler 
    }
    
    init() { //resets members if game is won
        this.gamemode = this.gamemode.TitleScreen;
        this.currentPlayer = Player.P1;
        this.targetPlayer = Player.P2;
        this.p1Ships = [];
        this.p2Ships = [];
        this.unplacedShips = [[]];
        this.boards = Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => new GameCell())
            )
        );

    }


    recieveMessage = function(message) {
        let messageBack = new Message; //initializng message back
        switch(message.code) {
            case MessageToGameModelCode.Advance: // Used in transitions between states | Drew Meyer
                switch (GameModel.gamemode) {    // Check current state to transition to new state
                    
                    // If Title Screen, advance to Rule Select
                    case Gamemode.TitleScreen:
                        messageBack = {
                            code: MessageToUICode.ShowRuleSelect,    // Send UI code for Rule Select
                            content: {
                                gamemode: Gamemode.RuleSelect,   // Send new game mode Rule Select
                                currentPlayer: Player.P1         // Start with player 1
                            }
                        };
                        return messageBack; //return message
                        break;
                    
                    // If Rule Select, advance to Ship Placement
                    case Gamemode.RuleSelect:
                        messageBack = {
                            code: MessageToUICode.ShowRuleSelect,   // Present board to players for ship placement
                            content: {
                                gamemode: Gamemode.PlaceShips,         // Send new game mode Place Ships
                                currentPlayer: Player.P1,              // Start with player 1
                                p1_ships: Player.P1.ships,                  // Player 1's ship array initially empty
                                p2_ships: Player.P2.ships,                  // Player 2's ship array initially empty
                                p1_unplacedShips: Player.P1.unplacedShips,  // Player 1's ships that must be placed
                                p2_unplacedShips: Player.P2.unplacedShips   // Player 2's ships that must be placed
                            }
                        };
                        return messageBack;//sends message back
                    
                    // If Place Ships, advance to Main Game
                    case Gamemode.PlaceShips:
                        messageBack = {
                            code: MessageToUICode.EndPlacementMode,  // Send message to end ship placement
                            content: {
                                gamemode: Gamemode.MainGame,  // Send new game mode Main Game
                                currentPlayer: Player.P1,     // Set current player
                                targetPlayer: Player.P2       // Set target player
                            }
                        };
                        return messageBack;//sends message back

                    case Gamemode.GameWin:
                        messageBack = {
                            code: MessageToUICode.ShowRuleSelect,  // When game ends, start new game
                            content: {
                                gamemode: Gamemode.RuleSelect,   // Send new game mode Rule Select
                                currentPlayer: Player.P1         // Start with player 1
                            }
                        }
                        return messageBack;//sends message back

                };

                case MessageToGameModelCode.MakeShot: //make shot message

                let hit_coords = message.content.coords; //gets shot coords
                let cell = boards[targetPlayer][hit_coords.row][hit_coords.col];//gets cell of coords

                if (cell.isShotAt === true) { //if cell is already shot at
                    messageBack = { //send back badshot message
                        code: MessageToUICode.BadShot,
                        content: {
                          gamemode: Gamemode.MainGame,
                          currentPlayer: currentPlayer,
                          targetPlayer: targetPlayer,
                          isHit: isHit,
                          isShotAt: isShotAt,
                          ships: ships,
                          boards: boards
                        }
                    };
                    return messageBack;//sends message back
                
                } else if (cell.content === NULL) { //if cell is not a ship segment

                    cell.isShotAt = true; //label cell as shot on board

                    messageBack = { //return with cell as shot at, but not hit since its not a ship segment
                        code: MessageToUICode.ShotResult, // send back a bad shot message
                        content: {
                            gamemode: Gamemode.MainGame,
                            currentPlayer: currentPlayer,
                            targetPlayer: targetPlayer,
                            ships: cell.content.position,
                            isHit: false,
                            isShotAt: true,
                            hitSegment: hitSegment, 
                            destroyedShip: destroyedShip,
                            isWin: isWin,
                            boards: boards
                        }
                    };
                    return messageBack;//sends message back
                } else if (cell.isAlive){ //send hit message

                        cell.content.reportHit(); //report valid hit
                        destroyed = (cell.content.isParentDead()); //check if ship is now destroyed

                        cell.isShotAt = true; // set is shot at to true
                        cell.isHit = true; // set is hit as true

                        let allSunk = true; //checks to see if all ships are sunk

                        if (targetPlayer === Player.P1) { //iterates through p1 ships, checks if ship is sunk --> if not evaluate to false
                            for (let ship of this.p1_ships) {
                                if (!ship.isSunk()) {
                                    allSunk = false;
                                }
                            }
                        } else {
                            for (let ship of this.p2_ships) {  //iterates through p2 ships, checks if ship is sunk --> if not evaluate to false
                                if (!ship.isSunk()) {
                                    allSunk = false;
                                }
                            }
                        }
                        messageBack = { //return message with updated shots, hit segment, board, and destroyed ships/win
                            code: MessageToUICode.ShotResult,
                            content: {
                                gamemode: Gamemode.MainGame,
                                currentPlayer: currentPlayer,
                                targetPlayer: targetPlayer,
                                ships: ships,
                                isHit: true,
                                isShotAt: true,
                                hitSegment: cell.content.position, 
                                destroyedShip: destroyed, //making this a boolean
                                isWin: allSunk,
                                boards: boards,
                            }   
                        }
                        return messageBack;//sends message back
            }

            break;
            
            case MessageToGameModelCode.RuleSelect:
                let numShips = message.content.rules; //Initialize how many ships for each player
                unplaced = [[], []] //Initialize unplaced ships array
                for(let i = 1; i <= numShips; i++) { //gives both player 1 and 2 unplaced ships
                    let addShip = new Ship(i, new Coord(0,0), Orientation.Up);
                    unplaced[0].push(addShip);
                    unplaced[1].push(addShip);
                }
                messageBack.content = {
                    gamemode: Gamemode.PlaceShips,
                    currentPlayer: Player.P1,
                    ships: [[]], // array of empty arrays
                    unplacedShips: unPlaced //edit based off of rules given                     
                }
                return messageBack; //sends message back

                break;
                case MessageToGameModelCode.StartGame: //start game 
                    this.gamemode=this.gamemode.MainGame //set gamemode to maingame 
    
                    messageBack = { //message to send back to UI
                        code: MessageToUICode.StartGame, //sedn back a message 
                        contents: {
                            gamemode: this.gamemode.MainGame, //game mode as maingame
                            currentPlayer: this.currentPlayer, //currentplayer (p1 to start)
                            targetPlayer: this.targetPlayer, //targetplayer (p2 to start)
                            ships: {
                            [Player.P1]: this.p1Ships, //array of ships for player 1 
                            [Player.P2]: this.p2Ships  //array of ships for player 2  
                            },
                            boards: this.boards //gamebaord 
                        }
                    }
                    return messageBack; //sends message back
            default:
                console.error(`Error: Case ${message} is not implemented.`) //throw error if case is not found
                break;
        }
    }
}

class Message{ //message class containing code (type of message) and the content with that message for the UI
    constructor(){
        this.code = null;
        this.content = null;
}
}