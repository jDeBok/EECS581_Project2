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
    
        this.p1Ships = []; //init array for playerships
        this.p2Ships = [];
        this.p1Shots = []; //inti array for playershots
        this.p2Shots = [];
        this.unplacedShips = [];
        this.boards = {
            [Player.P1]: [],
            [Player.P2]: []
        };
        this.shipPlacementHandler = null; //init ship handler
        this.mainGameHandler = null; //init main handler 
    }
    
    init() {
        this.gamemode = this.gamemode.TitleScreen;
        this.p1Ships = [];
        this.p2Ships = [];
        this.p1Shots = [];
        this.p2Shots = [];
        this.unplacedShips = [];
        this.boards = {
            [Player.P1]: [],
            [Player.P2]: []
        };

        this.shipPlacementHandler = new ShipPlacementHandler(this.unplacedShips, this.p1Ships.concat(this.p2Ships), this.boards, Player.P1);
        this.mainGameHandler = new MainGameHandler({ [Player.P1]: this.p1Ships, [Player.P2]: this.p2Ships }, { [Player.P1]: [], [Player.P2]: [] }, this.boards, Player.P1, Player.P2);
    }

    
    recieveMessage = function(message) {
        let messageBack = new MessageToUICode; //initializng message back
        switch(message.code) {
            case MessageToGameModelCode.Advance:
                break;
            case MessageToGameModelCode.MakeShot:

                let coords = { x: message.content.x_val, y: message.content.y_val }; //coordinates of the shot being made i.e. (A1 ... B4 ... etc)Kyle Spragg
                let turn = message.content.player; //need to know who shot Kyle Spragg

                if (turn === 0) {
                    if (P1_Shots.some(shot => shot.x === coords.x && shot.y === coords.y)) {
                        messageBack = {
                            code: MessageToUICode.BadShot, // send back a bad shot message
                            content: {
                                coords: coords,
                                message: "Shot has already been made."
                            }
                        };
                    } else {
                        P1_Shots.push(coords); // push the coords if valid shot
                        let hit = P2_Ships.some(ship => ship.contains(coords)); // check to see if its a hit
                        if (hit) { //send hit message
                            messageBack = {
                                code: MessageToUICode.ShotResult,
                                content: {
                                    result: "hit",
                                    coords: coords,
                                    currentPlayer: Player.P1,
                                    targetPlayer: Player.P2
                                }
                            }
                        } else {
                            messageBack = { //else send miss message
                                code: MessageToUICode.ShotResult,
                                content: {
                                    result: "miss",
                                    coords: coords,
                                    currrentPlayer: Player.P1,
                                    targetPlayer: Player.P2
                                }
                            }
                        }
                    }
                } else if (turn === 1) { //if players 2 turn

                    if (P2_Shots.some(shot => shot.x === coords.x && shot.y === coords.y)) { // sets coords for shot
                        messageBack = { //if shot already has been made
                            code: MessageToUICode.BadShot,
                            content: {
                                coords: coords,
                                message: "Shot has already been made."
                            }
                        }
                    } else {
                        P2_Shots.push(coords);//else push shot coords
                        let hit = P1_Ships.some(ship => ship.contains(coords)); //check if p1 ships contain coords
                        if (hit) {//send message if hit
                            messageBack = {
                                code: MessageToUICode.ShotResult,
                                content: {
                                    result: "hit",
                                    coords: coords,
                                    currentPlayer: Player.P2,
                                    targetPlayer: Player.P1
                                   
                                }
                            };
                        } else{ //send message if miss
                            messageBack = {
                                code: MessageToUICode.ShotResult,
                                content: {
                                    result: "miss",
                                    coords: coords,
                                    currentPlayer: Player.P2,
                                    targetPlayer: Player.P1
                                }
                            }   
                        }
                    }
                }
                break;


            case MessageToGameModelCode.PlaceShip:
                shipToPlace = message.content.shipToPlace;
                index = message.content.shipToPlaceIndex;
                shipToPlace.origin = index;
                messageBack = {
                    code: MessageToUICode.PlacementResult,
                    content: { 
                        gamemode: Gamemode.PlaceShips,
                        currentPlayer: Player.P1, // the current player, not always P1
                        ships: ships, // updated ships array
                        unplacedShips: unplacedShips // updated unplacedShips array
                    }
                }
                break;
            case MessageToGameModelCode.RuleSelect:
                let rules = message.content.rules;
                messageBack.content = {
                    gamemode: Gamemode.PlaceShips,
                    currentPlayer: Player.P1,
                    ships: [[]], // array of empty arrays
                    unplacedShips: unplacedShips //edit based off of rules given                     
                }

                break;
            case MessageToGameModelCode.StartGame:
                messageBack.content = {
                    gamemode: Gamemode.MainGame,
                    currentPlayer: Player.P1,
                    targetPlayer: Player.P2,
                    ships: ships,
                    boards: boards
                }
                return messageBack;
            default:
                //put error
                break;
        }
    }
}





class ShipPlacementHandler{
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
