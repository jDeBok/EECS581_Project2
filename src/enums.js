const Player = Object.freeze({
	P1: 0,
  P2: 1
});

const Module = Object.freeze({
	GameMaster: 0,
	GameModel: 1,
	UI: 2
});

const Orientation = Object.freeze({
	Up: 0,
	Right: 1,
	Down: 2,
	Left: 3
});

const Rotation = Object.freeze({
	Clockwise: 0,
	CounterClockwise: 1,
	Flip: 2
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
	Start: 0,
	// sloppy, i know
	Rule1Ship: 1,
	Rule2Ship: 2,
	Rule3Ship: 3,
	Rule4Ship: 4,
	Rule5Ship: 5
});

