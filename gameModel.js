import { Ship, ShipSegment, Coord } from './ships.js';

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
        return message;
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