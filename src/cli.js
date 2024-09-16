function UIConstructor() {
  // init places to output or get input
  let cmd, cmdBtn, asciiOut, asciiOut2, immed;
  // needed for tracking state -- the current ship when placing ships
  let currentShip;
  // the function to be executed on each step after data has been received from game model
  let btnCallback;
  
  // the wrapper function around the one above
  function handleCmd() {
    // if no callback is defined, ignore
    if (btnCallback) {
      // otherwise, call the current callback
      btnCallback();
      // then set the callback to null
      btnCallback = null;
    }
  }

  // grabs all html elements
  function init() { 
    // the simulated command line
    cmd = document.getElementById("cmd");
    // the submit button
    cmdBtn = document.getElementById("submitCmd");
    cmdBtn.addEventListener("click", handleCmd);
    // the first text output
    asciiOut = document.getElementById("asciiOut");
    // the second text output
    asciiOut2 = document.getElementById("asciiOut2");
    // for immediate text output (eg, you got a hit)
    immed = document.getElementById("immediate");
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



  function drawGridForPlacement(board) {
    asciiOut2.innerHtml = `Place your ships, player ${player + 1}\n`;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        asciiOut.innerHtml += board[i][j].content === null ? "~" : "s";
      }
      asciiOut.innerHtml += "\n";
    }
  }

  function drawGridForMainGameCurrentPlayer(board) {
    asciiOut.innerHtml = `Your board\n`;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let outchar = board[i][j].content === null ? "~" : "s";
        if (outchar == "s") {
          outchar = board[i][j].content.isAlive ? "s" : "d";
        }
        asciiOut.innerHtml += outchar;
      }
      asciiOut.innerHtml += "\n";
    }
  }

  function drawGridForMainGameTargetPlayer(board) {
    asciiOut2.innerHtml = `Enemy's board\n`;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let outchar = board[i][j].isShotAt ? "x" : "~";
        if (outchar == "x") {
          outchar = board[i][j].content === null ? "o" : "x";
        }
        if (outchar == "x") {
          outchar = board[i][j].content.isParentDead() ? "d" : "x";
        }
        asciiOut.innerHtml += outchar;
      }
      asciiOut.innerHtml += "\n";
    }
  }

  return { init, receiveMessage };
}