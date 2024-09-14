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
        let content = new 
        //need to flush out this switch
        switch(message.code) {
            case MessageToGameModelCode.Advance:
                break;
            case MessageToGameModelCode.MakeShot:
                break;
            case MessageToGameModelCode.PlaceShip:
                break;
            case MessageToGameModelCode.RuleSelect:
                break;
            case MessageToGameModelCode.StartGame:
                let messageBack = new MessageToUICode;
                Gammode = MainGame;

                break;
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