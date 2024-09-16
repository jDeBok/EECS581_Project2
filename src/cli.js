function UIConstructor() {
  let cmd, cmdBtn, asciiOut;
  let currentShip;
  function init() { 
    cmd = document.getElementById("cmd");
    cmdBtn = document.getElementById("submitCmd");
    asciiOut = document.getElementById("asciiOut");
  }
  function receiveMessage(msg) {
    switch (msg.code) {
      case MessageToUICode.ShowTitleScreen:
        return ShowTitleScreen();
      case MessageToUICode.ShowRuleSelect:
        return RuleSelect();
      case MessageToUICode.ShowBoard:
        switch (msg.content.gamemode) {
          case Gamemode.PlaceShips:
            return PlaceShipsStep(msg);
          case Gamemode.MainGame:
            return MainGameStep(msg);
        }
      case MessageToUICode.PlacementResult:
      case MessageToUICode.BadPlacement:
        return PlaceShipStep(msg);
      case MessageToUICode.EndPlacementMode:
        return TransitionToMainGame();
      case MessageToUICode.ShotResult:
      case MessageToUICode.BadShot:
        return MainGameStep(msg);
    }
  }
  return { init, receiveMessage };
}
