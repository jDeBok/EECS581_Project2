//This file contains the ShipPlacementHandler class and MainGame Handler class

class ShipPlacementHandler{
    constructor(unplacedShips,placedShips,boards,currentPlayer){
    this.unplacedShips=unplacedShips
    this.placedShips=placedShips
    this.boards=boards
    this.currentPlayer=currentPlayer
    }
    initialize(rules){
        retun //message
    }

    finishSetup(){
        return this.boards
    }
}

class MainGameHandler{
    constructor(ships,liveShips,boards,currentPlayer,targetPlayer){
        this.ships=ships
        this.liveShips=liveShips
        this.boards=boards
        this.currentPlayer=currentPlayer
        this.targetPlayer=targetPlayer
    }
    sendMessage(){
        return //message
    }
}