/* 
 * Program Name:
 * Enums module
 * 
 * Description:
 * Stores global enums used to assign names to numbers
 * 
 * Code sources:
 * Self, MDN web docs
 * 
 * Author:
 * Code: Jake Bernard
 * Documentation: Drew Meyer
 * 
 * Creation Date:
 * 2024-09-08
 * 
 */

const Player = Object.freeze({  // Enums identifiying either player
	P1: 0,  // Player 1
	P2: 1   // Player 2
});

const Module = Object.freeze({  // Enums identifying 
	GameMaster: 0,
	GameModel: 1,
	UI: 2
});

const Orientation = Object.freeze({ // Enums identifying ship orientations
	Up: 0,     // Ship facing up, -Y direction
	Right: 1,  // Ship facing right, -X direction
	Down: 2,   // Ship facing down, +Y direction
	Left: 3    // Ship facing left, +X direction
});

const Rotation = Object.freeze({  // Enums identifying possible ship manipulations
	Clockwise: 0,         // Rotate clockwise
	CounterClockwise: 1,  // Rotate counterclockwise
	Flip: 2               // Flip (180 degree rotation)
});

const Gamemode = Object.freeze({  // Enums identifying current game mode
	RuleSelect: 0,     // Handles player total ship selection
	PlaceShips: 1,     // Handles ship placement and orientation
	MainGame: 2,       // Handles state transitions for main gameplay
	GameWin: 3,        // State representing player win and game termination
	SwitchPlayers: 4,  // Player turn transition state
	TitleScreen: 5     // Title screen state
});

const MessageToGameModelCode = Object.freeze({  // Enums identifying the type of message sent to GameModel class
	Advance: 0,     // Indicates advancement to next game state
	RuleSelect: 1,  // Sends rules for a new game to the board
	StartGame: 2,   // Indicates transition from ship placement to main game
	PlaceShip: 3,	// Message communicating ship placement/orientation
	MakeShot: 4     // Indicates current player firing at tareted player
});

const MessageToUICode = Object.freeze({  // Enum identifying the type of message sent to the UI, indicating result of an action
	BadShot: -2,          // Shot couldn't be made (i.e. repeat location, out of bounds, etc.)
	BadPlacement: -1,     // Placement couldn't be made (i.e. attempt to place ship on existing ship, out of bounds, etc.)
	ShowBoard: 0,         // Shows board while waiting for user input
	ShotResult: 1,        // Returns result of shot, UI responds
	PlacementResult: 2,   // Returns the result of a successful placement, UI responds
	ShowRuleSelect: 3,    // Prompts UI to show rule select / # of ships per player
	EndPlacementMode: 4,  // Tells UI placement is complete and activate a transition animation
	ShowTitleScreen: 5    // Prompts UI to display title screen
});
