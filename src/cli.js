// returns only the public members of the UI as an object
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
      // the callback should link back to the original invocation somehow to return a message
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

// receives a message and then acts on it
// originally this was meant for a GUI where it made more sense
// here we'd have to rely on assigning functions to the command line button's callback and then using those to return messages
// it's not fully thought out because we ran out of time
// i am deeply sorry
  function receiveMessage(msg) {
    // chooses based on message code what function to call
    switch (msg.code) {
      // if the message was to show the title screen
      case MessageToUICode.ShowTitleScreen:
        // invoke the showtitlescreen sub function and return the message from it
        return ShowTitleScreen();
      // if the message was to show the rule select (choose how many ships)
      case MessageToUICode.ShowRuleSelect:
        // return the message from the rule select based on how many ships the player wants to play with
        return RuleSelect();
      // the show board message is ambiguous, so we need to further narrow down the state
      case MessageToUICode.ShowBoard:
        // we have an inner switch statement based on the gamemode passed by the message in its content field
        switch (msg.content.gamemode) {
          // if it's in ship placing mode
          case Gamemode.PlaceShips:
            // we perform an action there based on the message contents
            return PlaceShipsStep(msg);
          // or if its the main game
          case Gamemode.MainGame:
            // we perform an action there and return a message
            return MainGameStep(msg);
        }
      // in the case of a bad placement or a normal placement (placement result)
      // both should fall-through to a PlaceShipstep and then return a message
      case MessageToUICode.PlacementResult:
      case MessageToUICode.BadPlacement:
        // get the message back
        return PlaceShipStep(msg);
      // When placement mode is done, some kind of transition should be shown before the main game starts
      case MessageToUICode.EndPlacementMode:
        // show the transition then return a message indicating an advance to the next state
        return TransitionToMainGame();
      // in the case of an invalid shot and valid one
      case MessageToUICode.ShotResult:
      // utlitizing switch case fall-through again
      case MessageToUICode.BadShot:
        // perforom a main game step (shooting back and forth and positions)
        return MainGameStep(msg);
    }
  }


  // a function for drawing a player's grid for placing
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
