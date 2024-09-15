class GameModel {
    constructor() {
        this.gamemode = Object.freeze({   //Enum for Game Mode 
            RuleSelect: 'RuleSelect',
            PlaceShips: 'PlaceShips',
            MainGame: 'MainGame',
            GameWin: 'GameWin',
            SwitchPlayers: 'SwitchPlayers',
            TitleScreen: 'TitleScreen'
        });
    
        this.currentPlayer = null;
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
        this.currentPlayer = Player.P1;
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
                let numShips = message.content.rules; //Initialize how many ships for each player
                unplaced = [[], []] //Initialize unplaced ships array
                for(let i = 1; i <= numShips; i++) {
                    let addShip = new Ship(i, new Coord(0,0), Orientation.Up);
                    unplaced[0].push(addShip);
                    unplaced[1].push(addShip)
                }
                messageBack.content = {
                    gamemode: Gamemode.PlaceShips,
                    currentPlayer: Player.P1,
                    ships: [[]], // array of empty arrays
                    unplacedShips: unPlaced //edit based off of rules given                     
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
    this.unplacedShips = unplacedShips;
    this.placedShips = placedShips;
    this.boards = boards;
    this.currentPlayer = currentPlayer;
    }

    finishSetup(){
        return this.boards;
    }
}

class MainGameHandler{
    constructor(ships,liveShips,boards,currentPlayer,targetPlayer){
        this.ships=ships;
        this.liveShips=liveShips;
        this.boards = Array.from({ length: 10 }, () => 
            Array.from({ length: 10 }, () => 
                Array.from({ length: 10 }, () => new GameCell())
            )
        );
        this.currentPlayer=currentPlayer;
        this.targetPlayer=targetPlayer;
    }
    sendMessage(){
        return; //message
    }
}
