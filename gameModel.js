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
    }
    recieveMessage = function(message) {
        let messageBack = new MessageToUICode; //initializng message back
        //need to flush out this switch (I could be using incorrect syntax I'm sorry)
        switch(message.code) {
            case MessageToGameModelCode.Advance:
                break;
            case MessageToGameModelCode.MakeShot:
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
        this.boards=boards;
        this.currentPlayer=currentPlayer;
        this.targetPlayer=targetPlayer;
    }
    sendMessage(){
        return; //message
    }
}