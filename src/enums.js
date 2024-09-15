const Player = Object.freeze({
	P1: 0,
  P2: 1
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

const Gamemode = Object.freeze({
	RuleSelect: 0,
	PlaceShips: 1,
	MainGame: 2,
	GameWin: 3,
  SwitchPlayers: 4,
  TitleScreen: 5
});

const MessageToGameModelCode = Object.freeze({
	Advance: 0,
	RuleSelect: 1,
  StartGame: 2,
	PlaceShip: 3,	
	MakeShot: 4
});

const MessageToUICode = Object.freeze({
	BadShot: -2,
	BadPlacement: -1,
  ShowBoard: 0,
	ShotResult: 1,
	PlacementResult: 2,
	ShowRuleSelect: 3,
	EndPlacementMode: 4,
	ShowTitleScreen: 5
});

const UIEvent = Object.freeze({
	Nothing:		-1,
	ButtonClick: 0,
	SoundToggle: 1,
	GridClick:   2
});

const UIButton = Object.freeze({
	Start: 0
});

