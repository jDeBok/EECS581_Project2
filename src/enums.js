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

//I don't know where this needs to be, so I put it here for now --Alex
function MessageToGameModelContent(coords, shipToPlace, shipToPlaceIndex, rules) {
	this.coords = coords;
	this.shipToPlace = shipToPlace;
    this.shipToPlaceIndex = shipToPlaceIndex;
	this.rules = rules;
}