# Table of Contents


- [General Notes](#general-notes)
- [Notes on JavaScript](#notes-on-javascript)
  - [Typing and Errors](#typing-and-errors)
  - [Objects](#objects)
  - [Enums](#enums)
  - [References](#references)
- [Architecture overview](#architecture-overview)
- [Classes](#classes)
  - [GameMaster](#gamemaster)
  - [GameModel](#gamemodel)
  - [ShipPlacementHandler](#shipplacementhandler)
  - [MainGameHandler](#maingamehandler)
  - [UI](#ui)
  - [GameCell](#gamecell)
  - [Coord](#coord)
  - [Ship](#ship)
  - [ShipSegment](#shipsegment)
  - [Message](#message)
- [Messages and The Flow of the Program](#messages-and-the-flow-of-the-program)
  - [Enums](#enums-1)
    - [Player](#player)
    - [Module](#module)
    - [Orientation](#orientation)
    - [Rotation](#rotation)
    - [Gamemode](#gamemode)
    - [MessageToGameModelCode](#messagetogamemodelcode)
    - [MessageToUICode](#messagetouicode)
    - [Messages](#messages)
    - [MessageToGameModelContent](#messagetogamemodelcontent)
    - [MessageToUIContent](#messagetouicontent)
  - [The Flow of the Program](#the-flow-of-the-program)
    - [Initial State](#initial-state)
    - [Rule Select](#rule-select)
      - [Rule Selection =\> Ship Placement](#rule-selection--ship-placement)
    - [Ship Placement](#ship-placement)
      - [Ship Placement =\> Place Ship](#ship-placement--place-ship)
      - [Ship Placement =\> Next Player](#ship-placement--next-player)
      - [Ship Placement =\> Main Game](#ship-placement--main-game)
    - [Main Game](#main-game)
      - [Main Game =\> Make Shot](#main-game--make-shot)
    - [Switch Players](#switch-players)
      - [Switch Players =\> Next Player](#switch-players--next-player)
    - [Won Game](#won-game)
      - [Won Game =\> Rule Select](#won-game--rule-select)
- [Mockup Javascript for some things discussed](#mockup-javascript-for-some-things-discussed)
- [Easier Use Message Content/Quick Reference](#easier-use-message-contentquick-reference)
  - [UI ==\> GameModel](#ui--gamemodel)
  - [GameModel ==\> UI](#gamemodel--ui)

## General Notes

My hope is that if you read and understand this entire document, the amount we'll have to meddle with each other's work will be minimal. This probably won't be the case because my thoughts are a little scattered and this might not be the easiest document to follow because I'm making with a time constraint in mind. I apologize if it's too long. I want to write out as much as possible to have good reference material.

Not everything here has to be set in stone, but I think we should aim to keep the **Message Format** as close as possible to this specification; not because it's particularly good or well thought out, but because then we can focus on internal behaviors for each class based on the message format.

The most important part of this document is probably **Messages and The Flow of the Program**, but it may not make sense without everything else.

The UML diagram may differ from this document a bit. Take this document as being more truthful, as it was written after.

None of the names here have to be final for classes etc, but you shouldn't change the names of enums or the fields without consulting the group so we can all use the same values.

When keeping track of player turns, we can just store boards and ships in an array of arrays -- eg, the first entry will be an array containing all the ships for player 1, second entry will be all the ships for player 2, etc.

**IMPORTANT NOTE ON COORDINATES**

when creating **Coord** objects, the order of creation is (row, column), with the array going from 0-9.

in the mockup code below, i made a function to convert from a battleship coordinate, eg ("a", 7) to a coordinate in the program, like (6, 0). Use it if you find it useful.

**THE TOP LEFT OF THE BOARD IS (0, 0)**. This is just the easiest way to deal with arrays, but it means +y is down and -y is up and the coordinates are stored in (y, x) order. If you want this to be handled differently, let me know. We can create a Board class or something that's easier to access. We should probably do that, but I've already written most of this documentation. If people want that, please speak up about it immediately and we'll use it and change the documentation later.

Lastly, I don't think the architecture is that good. It's way overcomplicated. I apologize.

## Notes on JavaScript

I can't give a full JavaScript tutorial here, I'm just going to go over the most pressing stuff.

In general, as for naming conventions:
- variables should be named like this: `myVarName`
  - if the variable is an acronym, like "UI", just make it all lowercase
- classes and enums should be named like this: `MyClassName`

if I deviate from this in the documentation, it's an error on my part

### Typing and Errors

JavaScript is **extremely** weakly typed. You can do 1 + "3" and get "13" as a valid result. 

You can access members on objects that don't exist, which will just return "**undefined**". For example, if a "dog" object has a "species" field but you try to access "dog.speces" you won't get an error, it just will give you the value "undefined".

Because of this, insidious and hard-to-spot errors can find their way in. Be wary.

### Objects

There are multiple ways to define classes/objects in JavaScript.

Classes don't really exist in JavaScript in the same way as other languages. Every class is really just a JavaScript object, and JavaScript objects are closer to something like a dictionary in Python.

I use a specific way of making classes in the **Mockup JavaScript** section that might be a little confusing, but it's a little more concise than some of the other ways.

Here are 3 ways to make objects/classes in JavaScript:


#### The way like other languages

A class declaration looks like this:

```javascript
class ClassName {
  // you literally write constructor here, but field1 and field2 are just stand-ins
  constructor(field1, field2) {
    // using 'this' is also necessary
    this.field1 = field1;
    this.field2 = field2;
  }

  someMethod() {
    return field1 + field2;
  }
}
```

and if you wanted to instantiate that object, you would do something like:

```javascript
let myClass = new ClassName(field1, field2);
```

#### The way I used in the examples (a function)

a class declaration looks like this:

```javascript
function ClassName(field1, field2) {
    // using this is also necessary
    this.field1 = field1;
    this.field2 = field2;
    // assigning a function to a variable
    this.someMethod = function() {
      return this.field1 + this.field2;
    };
}
```

and if you wanted to instantiate that object, you would do something like:

```javascript
let myClass = new ClassName(field1, field2);
```

In both this method and the above, **if you do not pass in a value for a field, it is initialized to undefined**. You won't get an error for this And, unfortunately, you cannot (as far as I know), use keyword arguments in JavaScript (ie, you can't do `new ClassName(field2=4)`)

This is why the next method might be extremely useful for you.

#### JSON, A useful method that will probably be helpful when constructing messages

In JavaScript, it doesn't really matter what you pass to functions. You can create objects in a manner similar to dictionaries in Python, using curly braces (if you know JSON i might just be reiterating things you already know):

(assume **someValue1** and **someValue2** are defined)
```javascript
let myClass = {
  field1: someValue1,
  field2: someValue2,
  // I'm omitting adding the function because it's more complicated to use member variables in a function in a class defined like this
};

```

The advantage to this is that *you only need to assign the values that will be used*.

For example, if we have a function which takes a Garden object and counts the amount of carrots, but the Garden object has a bunch of useless fields like cabbages, potatoes, celery, etc, we can just pass a Garden like so:

```javascript

function countCarrots(garden) {
  return garden.carrots.length;
}

let smallerGarden = { carrots: [carrot1, carrot2, carrot3] };
countCarrots(smallerGarden);
```

This is just an example, but this should be useful when passing messages so you don't have to write something like (this will make sense later):
```javascript
let message_content = new MessageToUIContent(Gamemode.MainGame, Player.P1, Player.P2, ships, true, segment, null, false, null, null);
```

You can do something like this:

```javascript
let message_content = {
    gamemode: GameMode.MainGame, 
    currentPlayer: Player.P1,
    targetPlayer: Player.P2, 
    ships: ships,
    isHit: true,
    hitSegment: segment, 
    isWin: false
  };
```

Hopefully the latter looks a bit more sensible, even if it is a bit wordy. You also don't have to write every field in order.


### Enums

Enums are just ways to assign names to numbers (like Red = 1, Blue = 2, etc). It's a bit more efficient than comparing strings, and it's like having a bool that can have more than just 2 states. For this program, it will probably be helpful to keep track of the states of various parts using enums, so I've opted to use them even though JavaScript doesn't make it necessarily that easy to use them.

Enums in JavaScript are just objects where the field values are integers.

I'm using Object.freeze on a JavaScript object to make it immutable so it can act like an enum (basically an alias for an integer used to track the state of something).
Otherwise, every object in JavaScript is mutable.

So when I make the example enum:
```javascript
const Colors = Object.freeze({
  Red: 0,
  Blue: 1,
  Green: 2
});
```

Now I can use it throughout the program like a literal value, for instance:
```javascript
if (color == Colors.Red) {
  console.log("It's red");
}
```

And because the object Colors is frozen, this code:
```javascript
Colors.Red = 5;
```

will not affect the value of Colors.Red.

### References

Objects and arrays are always passed (kind of) by reference in JavaScript. Changing the fields of an array or object in a function will change the fields of that object outside the function, but replacing the object wholesale will not affect the original object.

For instance:
```javascript
let a = {b: 1, c: 2};

function changeB(a) {
  a.b = 2;
}

changeB(a);
// a.b will now be 2

function overrideA(a) {
  a = 3;
}

overrideA(a);
// nothing happens to a outisde of that function, it's still the same object
```

Passing things by reference will be useful when we need ship segments to point to their parent ship, etc.

## Architecture overview

This is based on a **Model, View, Controller** architecture (as far as I understand it). 

From a high level, in this architecture, the **Controller** holds the whole program together by running the **View** and **Model** and then passing needed messages between them.

The **View** is both the UI and input handler. Input is passed from the **View** to the **Model**.

The **Model** holds the actual game logic and data within it. 

The corresponding parts of this architecture to the implementation is:
- **Controller** is the **GameMaster** class
- **Model** is the **GameModel** class
- **View** is the **UI** class

The general way this program will run is like this:
- The **Controller** (**GameMaster**) will run the **init** methods for both the **View** (**UI**) and **Model** (**GameModel**)
  - This will size the **UI** correctly to the window and set up event handlers for mouse input etc.
  - This will set the **GameModel** to the **RuleSelect** state and get a **Message** to pass to the **UI**
- After initialization is done, the **GameMaster** will, in a loop: 
  - first call the **receiveMessage** method for the **UI**, which will then return another **Message**
  - Then transmit the **Message** via the **receiveMessage** function in the **GameModel**, which will act upon the method and update the board etc, which then returns another message to the **UI** and the process repeats.

There are specific states and messages. That need to be taken into account here.

## Classes

### GameMaster

This holds the **UI** and **GameModel** classes as singletons. It also has an **init** method run at the beginning of the program, which just calls the **UI** and **GameModel**'s **init** methods.

Should contain something like a **run** method which is called at the program startup. This method should call **init** and then, following what was outlined above, repeatedly query the **UI** then **GameModel** to pass messages between each and advance the game.

Should have these fields (UML diagram is wrong):
- ui
  - instance of UI class
- gameModel
  - instance of GameModel class
- messageToUI
  - Message received from GameModel to UI
- messageToGameModel 
  - Message received from UI directed to GameModel


### GameModel

This contains and updates the game state. 

This means it holds the boards, the ships for each board, the current "mode" of the game, which would be (with the corresponding enum value in the Gamemode enum):
- rule select (RuleSelect) -- after the beginning screen (or displayed after a game ends) where you pick how many ships players have
- placement of ships (PlaceShips) -- when the game begins and players have to place and orient their ships
- main gameplay (MainGame) -- each player taking turns making shots
  - Between each shot, the **GameModel** should send a message to the **UI** to prompt the players to switch. This isn't really a "Gamemmode" that the model needs to worry about, but it's an intermediate state
- Ended game (GameWin) - this and the select rules state may not need to be kept explicitly, but it might be easier to understand the program if they exist. This is simply the state of the game after a player has won and the game prompts the players to "Play Again". Clicking on that button will directly lead back into the RuleSelect state.

The **receiveMessage** and function will be called by the **GameMaster**. This receives a message from the **UI**, acts upon it, and returns a message which is then sent to the **UI**. This process is the main flow of the program.

It may be helpful to break this up into multiple submodules. In the WIP UML diagram, I broke it into the **ShipPlacementHandler** and **MainGameHandler**, since the former will have to keep track of unplaced ships but the latter will only need to keep track of all ships on the board, plus some other differences.

I wrote in the UML diagram that holding the gamemode in the **GameModel** may not be necessary, but I'm pretty sure it will be necessary to act on a message properly.

The **GameModel**'s **init()** function (probably not in UML diagram) will set the GameMode to **Title Screen**.

### ShipPlacementHandler

During the first part of the game, when players are setting up their boards, this will be used to build each player's board by keeping track of the unplaced ships.

Unplaced ships will be in an array of arrays called **unplacedShips**. Each player has their own array of unplaced ships, and the **unplacedShips** array holds those arrays in player order. We can either keep track of the length of it when a player is placing ships, or keep around an int to see how many ships they have left to place before advancing to the next player. When a ship is placed, it should be moved into the **placedShips** array and the corresponding ship segments should be put into the board for that player.

The **boards** field will be an array of 2D arrays of **GameCells** (I accidentally say **BoardCells** on the UML diagram). Each cell either holds nothing or a **ShipSegment**. It also holds a bool describing whether or not it's been hit.

Keep track of the current player that's placing. Once no more players need to place ships, return the complete board and ships arrays and pass them to the **MainGameHandler**. Then set the player turn to the first player and change the gamemode to the main game. 

When initializing the game in the "init" function for **ShipPlacementHandler**, I was thinking we could just send a **GameRule** object from the **UI** to the **GameModel** which contains the number of ships for each player (will always be the same in this implementation, just thought it might be necessary for future teams to have asymmetric matches or something).

### MainGameHandler

Where the actual game takes place, a step at a time.

The fields, briefly

- ships: array of arrays of ships, stored in player order. Specific ships are not stored in any particular order. The general structure when accessing is: \[player]\[ship] 
- liveShips: array of integers, stored in player order. keeps track of how many live ships a player has. when it reaches 0, that player loses. The general structure when accessing is: \[player]
- boards: array of arrays of **GameCells**, which contain each player's ship segments. This is an array of 2D arrays, where each 2D array represents the player's board. The structure of accessing is: \[player]\[row]\[column].
- currentPlayer: the current player (an integer)
- targetPlayer: the player whose board is being attacked


### UI

I'll write more documentation for this later when I figure more out for it.

Generally, this will handle all input and output, including mouseclicks etc. The GameModel will handle everything in-between. Depending on how much time is available, I'll try to make something cool. But I'll start small and just make something functional.

### GameCell

A cell that makes up any board.

Fields:
- content: either a **ShipSegment** or **null**
- isHit: a boolean keeping track of whether or not it's been hit before. Players shouldn't be able to strike the same space twice.

### Coord

On the UML diagram it says x and y, but in our case the fields will be (row, col). Just a way of indicating a space on the board.

**PLEASE KEEP IN MIND**: the coord constructor is (row, col). There is an included ultility function in this document that translates from board coordinates to the actual array coordinates (eg, ("a", 2) => (1, 0)) called MakeBoardCoord.

### Ship

Every ship for a player is kept track of in an array. A **Ship** has these fields:

- size: the amount of segments that make it up
- origin: Where the backmost coordinate resides. A ship's segments go outward from this point, eg if a ship's origin is (0, 0) and it's oriented to face right and has 3 segments, it will have segments in the spaces (assuming (y, x) order): (0, 0), (0, 1), (0, 2)
- orientation: based on the Orientation enum. Used when placing the ship and when drawing it to the **UI**.
- segments: an array of **ShipSegments** that make up the ship. It's easier to keep track of arbitrarily sized ships like this. Each segment points back to this **Ship** as its parent. The board will also contain references to these **ShipSegments** in the **GameCells**.
- liveSegments: a count of the number of live segments a ship has. When this reaches 0, the ship is dead.

### ShipSegment

A part of a ship that takes up 1 grid space. Each holds a reference to the ship it's part of so that when it specifically is hit, it can report the hit to its parent to see if that hit will kill the entire ship.

Has fields:

- pos: the coords of the segment on the board
- parent: the **Ship** object that owns this **ShipSegment**
- isAlive: bool for if it's been hit or not

Has methods:

- reportHit(): reports being hit to it's parent. Decrements the **liveSegments** field of the parent. Sets it's i**sAlive** bool to False.
- isParentDead(): returns True if the parent **Ship**'s liveSegments count is 0.


### Message

A message passed between the **UI** and **GameModel** or vice versa. 

There is a whole section devoted to **Messages** and how the general program should play out.

The UML diagram pretends like there's inheritance in some of the fields, but really that's just conceptually. Using actual inheritance would be an enormous waste of time.

fields:
- **code**: An enum (int) which stands for the message type
- **content**: any necessary objects/data passed between the **UI** and **GameModel** which is needed to accomplish the goal of the message
  - It's a "MessageContent" class, which will be explained in the next section.

## Messages and The Flow of the Program

This section will govern pretty much how everything in the program needs to actually run. It details the different enums in the program, the fields of a message, the states the program can be in, and how to deal with each state and the data necessary to be passed between modules (**UI** and **GameModel**) in each state.




### Enums
---

There's a lot of different states the program can be in, so I'm using enums to cover them. Here's a list of all the enums I've made that I think we'll need and brief descriptions. If the integer value of each is important, I'll put it after a colon. If the integer values aren't important, I won't write them. I may write a brief description after a value to explain what it's for.

Assume you can use these values by doing:  
`EnumName.value`

eg, `if (0 == Player.P1) return true;`

### Player
#### Description:  
Just represents a player. All we have right now are player 1 and player 2. P1 and P2 will be mapped to 0 and 1 so you can access an array like:
`player1Board = boards[Player.P1];`

#### Values:
- P1: 0
- P2: 1


### Module
#### Description
Just stands for which module in the program something needs to go to. May be unnecessary.

#### Values:
- GameMaster
- GameModel
- UI


### Orientation
#### Description
Used when placing ships and stored alongside ships as they're placed (useful for drawing them to the board). Note that Up is -y and down is +y, as we're storing the board in the format (row, column).

#### Values
- Up
- Right
- Down
- Left


### Rotation
#### Description
Used when placing ships on the board. Won't probably be used in **GameModel**, only useful in the **UI** where flipping will take place,

#### Values
- Clockwise
- CounterClockwise
- Flip

### Gamemode
#### Description
Used within the **GameModel** and in messages sent to the **UI**. These aren't really "gamemodes", they're more likely stages the program has to go through for the game. We can rename it later if it's confusing.

#### Values
- RuleSelect 
  -  when picking out how many ships to play with
- PlaceShips 
  - when placing ships
- MainGame 
  - when taking turns firing shots
- GameWin
  - when a player wins and the program is waiting on the user's response if they want to play again
- SwitchPlayers
  - When a player's turn is over and the program prompts the players to switch places, waiting for one to click the "Next" button.
- TitleScreen
  - Only shown at the beginning of the program after init.

### MessageToGameModelCode

#### Description
Used as a code for a message sent from the **UI** to the **GameModel** explaining what the message is.

#### Values
- Advance
  - Used when a player switched with another and pressed the "next" button. the board is displayed after.
- StartGame
  - used when transitioning from the ship placement state to the main game
- RuleSelect
  - Used for a message sending the rules for a new game to the board
- PlaceShip	
  - Used when attempting to place a ship
- MakeShot
  - Used when attempting to make a shot


### MessageToUICode
#### Description
Used in a message sent from the **GameModel** to the **UI**. Usually indicates the result of an action.

#### Values
- BadShot
  - A shot couldn't be made because that spot has been shot before (or some other reason)
- BadPlacement
  - A placement can't be made because it goes off the map, intersects with another ship, etc
- ShowBoard
  - Used to show the board and wait for user input, eg after players switch spots or after placement is done.
- ShotResult
  - Used to return the result of a shot made. Implicitly, the **UI** will then play an animation and/or sound effects, and then wait for the next player to switch out/or declare a winner.
- PlacementResult
  - return the result of a succesful placement. If it's the next player's turn the **UI** will act accordingly.
- ShowRuleSelect
  - Prompt the **UI** to show the rule select (pick how many ships for a game)
- ShowTitleScreen
  - Prompt the **UI** to show the title screen
- EndPlacementMode
  - Declare to the **UI** that placement mode is done so a transitional animation can be played.


### Messages
---

We'll just be using a generic **Message** class, but really there are two distinct kinds of messages:
- **Messages to the UI**
- **Messages to the GameModel**

I've defined classes for the content and codes of each. The codes are above in the last part of the **Enum** section. This part will explain the content fields. The following part, **The Flow of the Program**, will explain how these are used in each distinct state of the program.

Not every message will have **content**, but every message will have a **code**. Not every field will be used in every message.

There are two distinct message cointent types. This will explain all the fields of each.

I would assume when you're crafting a message it would be best to do something like:

```javascript
let message;

let messageCode = MessageToGameModelCode.ShotResult;

let messageContent = {
  gamemode: Gamemode.MainGame,
  currentPlayer: currentPlayer,
  targetPlayer: targetPlayer,
  isHit: false;
};



```


### MessageToGameModelContent
Data going from the **UI** to the **Gamemodel**

#### Possible fields
- coords
  - Used when attacking a spot or placing a ship. A pair of coordinates.
- shipToPlace
  - When placing ships, sends a copy of the ship to place. The UI will rotate ships. Since the ship stores its position, it won't need the coords field above passed to it.
- shipToPlaceIndex
  - The index of the ship that's going to placed in the subarray of the "**ships**" array which corresponds to the current player.
  - have to do this so we know which one to remove
    - To better explain, you'd get to the ship (for player one) by doing:
    - `ships[Player.P1][shipToPlaceIndex]`
- rules
  - A **GameRules** object which contains the count for P1 and P2's ships. Usually these will be the same. Used when initializing the board for placement.


### MessageToUIContent
Data going from the **Gamemodel** to the **UI**.

#### Possible fields
- gamemode
  - the current gamemode from the gamemode enum
- currentPlayer
  - The current player
- targetPlayer
  - the target player -- leave null if placing ships
- ships
  - The full array of all ships -- should be only when placing ships at the beginning, the rest of the time we can rely on passing the boards
  - This means its an array of arrays - the first entry corresponds to all of player 1's ships and so on
- boards
  - Also an array of arrays, where this time the inner arrays are the boards for each player. General structure of accessing is: \[player]\[row]\[column]
  - will be passed to the UI after pretty much every action in the main game
- isHit
  - Boolean for whether or not a shot was a hit
  - Bad shots (shooting the same spot) are controlled by an enum in the message code
- hitSegment
  - The **ShipSegment** that was hit, given a shot was a hit.
  - Otherwise it's null.
- destroyedShip
  - If a shot destroyed a ship, this is the **Ship** that was destroyed.
- isWin
  - boolean indicating whether or not a shot won the game for the player
- unplacedShips
  - An array of unplaced ships. Used during ship placement. Ships are removed from this array after being placed and put into the **ships** array. Each player has several (currently the same amount for everyone) unplaced ships in an array, and this array holds those arrays in the implicit player order (player 1 = 0, player 2 = 1, etc). The order ships are stored in doesn't matter. The general structure of accessing is: \[player]\[ship]

---
### The Flow of the Program
---

This section exactly states what messages will be passed and what state elements will be set during each possible part of the program.

You can implement this using a switch statement or something similar which will go to different functions **depending on the message AND gamemode**

**This is the most important part of this document**

### Initial State

---

1. The **GameMaster** calls **init()**
   1. For the **UI**, this sets up any event handlers for mouse clicks and sizes the canvas to the page
   2. The GameModel's init function sets its **Gamemode** to **Gamemode.TitleScreen** and returns this message:
- ```javascript 
  {
    code: MessageToUICode.ShowTitleScreen, 
    content: null
  } 
  ```

2. The **GameMaster**'s **run()** function is then called

### Running the Program

---

These steps repeat endlessly:
1. The **GameMaster** passes the **messageToUI** to the **UI** via the **receiveMessage** fucntion, which returns another message which is stored in the **messageToGameModel** variable
2. The **GameMaster** passes the **messageToGameModel** to the **GameModel**'s **receiveMessage** function. This function returns another message, which is stored in the **messageToUI** variable

Here are the expected states, substates, transitions, and messages

### Title Screen

#### Title Screen => Rule Selection

UI passes this message to the GameModel, whose state is set to **Gamemode.TitleScreen**:

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.Advance 
}
```

##### Return Message (from GameModel)

**GameModel** sets its state to **Gamemode.RuleSelect** and returns:

```javascript
{
  code: MessageToUICode.ShowRuleSelect
}
```

### Rule Select

#### Rule Selection => Ship Placement

UI passes this message to the GameModel, whose state is set to **Gamemode.RuleSelect**:

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.RuleSelect,
  content: { rules: rules }
}
```

##### Return Message (from GameModel)

**GameModel** uses the rules to initialize **unplacedShips** variables, sets its state to **Gamemode.PlaceShips**, and returns:

```javascript
{
  code: MessageToUICode.ShowBoard,
  content: { 
    gamemode: Gamemode.PlaceShips,
    currentPlayer: Player.P1,
    ships: ships, // array of empty arrays
    unplacedShips: unplacedShips 
  }
}
```

### Ship Placement

#### Ship Placement => Place Ship

UI passes this message to the GameModel, whose state is set to **Gamemode.PlaceShips**:

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.PlaceShip,
  content: { 
    shipToPlace: shipToPlace, 
    shipToPlaceIndex: shipToPlaceIndex
  }
}
```

##### Return Message (from GameModel)

**GameModel** checks if the **ship** can be placed and returns:

**On success**
```javascript
{
  code: MessageToUICode.PlacementResult,
  content: { 
    gamemode: Gamemode.PlaceShips,
    currentPlayer: Player.P1, // the current player, not always P1
    ships: ships, // updated ships array
    unplacedShips: unplacedShips // updated unplacedShips array
  }
}
```

**On failure**
```javascript
{
  code: MessageToUICode.BadPlacement,
  content: { 
    gamemode: Gamemode.PlaceShips,
    currentPlayer: Player.P1, // the current player, not always P1
    ships: ships, // updated ships array
    unplacedShips: unplacedShips // updated unplacedShips array
  }
}
```

#### Ship Placement => Next Player

If the **unplacedShips** array is empty, the **UI** will send this message back to the **GameModel**, which should be in the **Gamemode.PlaceShips** state:

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.Advance
}
```

##### Return Message (from GameModel)

**if there are players left that need to place their ships (assuming we could have more than 2 players)**
```javascript
{
  code: MessageToUICode.ShowBoard,
  content: { 
    gamemode: Gamemode.PlaceShips,
    currentPlayer: Player.P2, // the new current player
    ships: ships, // updated ships array
    unplacedShips: unplacedShips // updated unplacedShips array
  }
}
```

**If that was the last player that needed to place ships**
The **GameModel** should set its state to **MainGame** and then return this message:

```javascript
{
  code: MessageToUICode.EndPlacementMode
}
```

#### Ship Placement => Main Game

After **UI** gets the message with code `MessageToUICode.EndPlacementMode`, it will show a short title card telling the players to get ready, then when player 1 is ready and clicks on the advance button, it send this message to the **GameModel**:

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.StartGame
}
```

##### Return Message (from GameModel)

The GameModel, which should be in state **Gamemode.MainGame**, returns this message:

```javascript
{
  code: MessageToUICode.ShowBoard,
  content: {
    gamemode: Gamemode.MainGame,
    currentPlayer: currentPlayer,
    targetPlayer: targetPlayer,
    ships: ships,
    boards: boards
  }
}
```

### Main Game

#### Main Game => Make Shot

The **UI** sends a potential shot to the **GameModel**, which is in state **Gamemode.MainGame**

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.MakeShot,
  content: {
    coords: coords
  }
}
```

##### Return Message (from GameModel)

The GameModel, which should be in state **Gamemode.MainGame**, checks to see if the shot is valid and updates its state and returns a message in one of three ways:

**If a shot is valid - but the game is not won**

**GameModel** sets its state to **Gamemode.SwitchPlayers** then returns this message:

```javascript
{
  code: MessageToUICode.ShotResult,
  content: {
    gamemode: Gamemode.MainGame,
    currentPlayer: currentPlayer,
    targetPlayer: targetPlayer,
    ships: ships, // for updating
    isHit: isHit,
    hitSegment: hitSegment, 
    destroyedShip: destroyedShip,
    isWin: false,
    boards: boards
  }
}
```

**If a shot is valid and wins the game**

**GameModel** sets its state to **Gamemode.GameWin** then returns this message:

```javascript
{
  code: MessageToUICode.ShotResult,
  content: {
    gamemode: Gamemode.MainGame,
    currentPlayer: currentPlayer,
    targetPlayer: targetPlayer,
    ships: ships, // for updating
    isHit: isHit, // false if it didn't hit a ship segment
    hitSegment: hitSegment,
    destroyedShip: destroyedShip,
    isWin: true,
    boards: boards
  }
}
```

**If a shot is not valid**

**GameModel** sets stays in the state **Gamemode.MainGame** then returns this message:

```javascript
{
  code: MessageToUICode.BadShot,
  content: {
    gamemode: Gamemode.MainGame,
    currentPlayer: currentPlayer,
    targetPlayer: targetPlayer,
    ships: ships,
    boards: boards
  }
}
```

### Switch Players

#### Switch Players => Next Player

The **UI** gets a signal that the next player is ready.

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.Advance,
}
```

##### Return Message (from GameModel)

The GameModel, sets its state to **Gamemode.MainGame** then updates the current player. It then returns this message:

**If a shot is valid - but the game is not won**

**GameModel** sets its state to **Gamemode.SwitchPlayers** then returns this message:

```javascript
{
  code: MessageToUICode.ShowBoard,
  content: {
    gamemode: Gamemode.MainGame,
    currentPlayer: currentPlayer, // new current player
    targetPlayer: targetPlayer, // new target player
    ships: ships,
    boards: boards
  }
}
```

### Won Game

#### Won Game => Rule Select

After the win screen is shown, the **GameModel** will be in state **Gamemode.GameWin** and the **UI** will send back this message when the players are ready to start again (assume endless play):

##### Sent Message (from UI)

```javascript
{
  code: MessageToGameModelCode.Advance,
}
```

##### Return Message (from GameModel)

The GameModel should reset everything it's holding onto and set its state to **GameMode.RuleSelect**, then return this message:

```javascript
{
  code: MessageToUICode.ShowRuleSelect
}
```

----

That should cover every possible state for the game (unless I haven't thought it out fully). If all of these cases are handled, the game should work.



## Mockup Javascript for some things discussed

I **would** recommend using these values in your program as if they're already defined. We'll work on putting things together later.

```javascript

// These are enums

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

// These are classes

function MessageToGameModelContent(coords, shipToPlace, shipToPlaceIndex, rules) {
	this.coords = coords;
	this.shipToPlace = shipToPlace;
    this.shipToPlaceIndex = shipToPlaceIndex;
	this.rules = rules;
}



function MessageToUIContent(gamemode, currentPlayer, targetPlayer, boards, ships, isHit, hitSegment, destroyedShip, isWin, rules, unplacedShips) {
	this.gamemode = gamemode; // from Gamemode enum
	this.currentPlayer = currentPlayer;
  this.targetPlayer = targetPlayer;
  this.ships = ships;
	this.boards = boards;
	this.isHit = isHit;
  this.hitSegment = hitSegment;
	this.destroyedShip = destroyedShip;
	this.isWin = isWin;
	this.unplacedShips = unplacedShips;
}

function Message(code, content) {
	this.code = code;
	this.content = content;
}

// whenever I use || next to an assignment, I'm giving things default values.
// so if p2Ships isn't passed as a parameter, its value is the same as p1Ships

function GameRules(p1Ships, p2Ships) {
	this.player1Ships = p1Ships;
	this.player2Ships = p2Ships || p1Ships;
}

function Coord(col, row) {
	this.col = col;
	this.row = row || col;
}

function MakeBoardCoord(col, row) {
  // converting from string to proper column number
  if (typeof(col) == "string") {
    // converts string to base 36 (the numerals 0-9 + a-z) then subtracts 10
    col = parseInt(col, 36) - 10;
  }
  row = row - 1;
  return new Coord(col, row);
}

function Ship(size, orientation, origin) {
	this.size = size;
	this.orientation = orientation;
	this.origin = origin;
	this.segments = // create ship segments based on orientation/origin
	this.isAlive = // rather than making this a boolean, make a function that sees if any segment exists that's alive
}

function ShipSegment(position, parent) {
	this.position = position;	
	this.parent = parent;
	this.isAlive = true;
}

function Cell(content) {
	this.content = content;
  this.isHit = false;
}
```
## Easier Use Message Content/Quick Reference

Here's some "unfolded" (not a real term) versions of the MessageContent classes for easier use. Feel free to leave out fields that you don't need. They'll be set to null. All possible codes for messages are also included


### UI ==> GameModel 
**MessageToGameModelCode**
```javascript
MessageToGameModelCode.Advance
MessageToGameModelCode.StartGame
MessageToGameModelCode.RuleSelect
MessageToGameModelCode.PlaceShip	
MessageToGameModelCode.MakeShot
```
**MessageToGameModelContent**
```javascript
{
	coords: coords,
	shipToPlace: shipToPlace,
    shipToPlaceIndex: shipToPlaceIndex,
	rules: rules
}
```
### GameModel ==> UI
**MessageToUICode**
```javascript
MessageToUICode.BadShot
MessageToUICode.BadPlacement
MessageToUICode.ShowBoard
MessageToUICode.ShotResult
MessageToUICode.PlacementResult
MessageToUICode.ShowRuleSelect
MessageToUICode.ShowTitleScreen
MessageToUICode.EndPlacementMode
```
**MessageToUIContent**
```javascript
{
	gamemode: Gamemode.MainGame,
	currentPlayer: currentPlayer,
    targetPlayer: targetPlayer,
    ships: ships,
	boards: boards,
	isHit: isHit,
    hitSegment: hitSegment,
	destroyedShip: destroyedShip,
	isWin: isWin,
	unplacedShips: unplacedShips
}
```





