function GameModel() {
    this.gamemode = Object.freeze({   //Enum for Game Mode 
        RuleSelect: 'RuleSelect',
        PlaceShips: 'PlaceShips',
        MainGame: 'MainGame',
        GameWin: 'GameWin',
        SwitchPlayers: 'SwitchPlayers',
        TitleScreen: 'TitleScreen'
    });

    this.recieveMessage = function(message) {
        return message;
    }
}