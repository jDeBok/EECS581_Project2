// This is entirely commented out because it did not make it into the "final" version
// It is not considered part of the project.
// I'm leaving it here in case the next team wants it, but I doubt it

/* 
 * Program Name:
 * UI module
 * 
 * Description:
 * Enjoy your spaghetti.
 * 
 * Inputs:
 * - a Message from the GameModel routed through the GameMaster
 * 
 * Outputs:
 * - Exports an object containing the "init" and "receiveMessage" methods
 * - init returns void
 * - receiveMessage returns a Message (To GameModel)
 * - Graphics to the webpage
 * - (Potentially) SFX to the webpage
 * 
 * Code sources:
 * Self, MDN web docs, a couple of Stack overflow answers
 * - Stack Overflow code has a comment preceding it linking the source
 * 
 * Author:
 * Jake Bernard
 * 
 * Creation Date:
 * 2024-09-08
 * 
 */

// "use strict"
// 
// 
// // sorry you have to deal with this
// function UIConstructor() {
// 
//   // =========== "USING" STATEMENTS ===========
// 
//   const mcode    = MessageToUICode;
//   const gmode    = Gamemode;
//   const uie      = UIEvent;
//   const uibtn    = UIButton;
//   const m2gmcode = MessageToGameModelCode;
// 
// 
//   // =========== LAYOUTS ===========
// 
//   function layoutRect(ctx, bbox, 
//                       fill, stroke=null, strokeRatio=0.001,
//                       text, textColor, textStroke, textStrokeSize=3,
//                       textMargin=0.1
//                       ) {
//       ctx.fillStyle = fill;
//       ctx.fillRect(bbox.x, bbox.y, bbox.width, bbox.height);
//       if (stroke) {
//         ctx.lineWidth = bbox.width * strokeRatio;
//         ctx.strokeStyle = stroke;
//         ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
//       }
//       if (text) {
//         let textInfo = fitTextToBbox(
//                         bbox, 
//                         text,
//                         30,
//                         "sans-serif",
//                         textMargin);
//         ctx.fillStyle = textColor;
//         ctx.font = `${textInfo.fontSize}px sans-serif`;
//         ctx.fillText(text, textInfo.bbox.x, textInfo.bbox.y);
//         if (textStroke) {
//           ctx.strokeStyle = "#161F26";
//           ctx.lineWidth = textStrokeSize;
//           ctx.strokeText(text, textInfo.bbox.x, textInfo.bbox.y);
//         }
//       }
//   }
// 
//   function layoutButton(ctx, eventInfo, bbox, 
//                         returnCode, text, fill="#DCDCDC",
//                         hoverColor="#DCC2C2", clickColor="#A17979",
//                         stroke="#161F26", strokeSize=3,
//                         textColor="#161F26", textStroke=null,
//                         textStrokeSize=3, textMargin=0.1, 
//                         radius=5) {
//     let hovered = eventInfo.cursor.relativeTo(screenBbox).in(bbox);
//     let clicked = eventInfo.click.useValue && 
//                     eventInfo.click.relativeTo(screenBbox).in(bbox);                     
//     let buttonFill = hovered ? hoverColor : fill;
//     buttonFill = clicked ? clickColor : buttonFill;
//     ctx.fillStyle = buttonFill;
//     if (stroke) {
//       ctx.strokeStyle = stroke;
//       ctx.lineWidth = strokeSize;
//     }
//     roundRect(ctx, bbox.x, bbox.y, bbox.width, bbox.height,
//       radius, true, !(stroke === null));
//       if (text) {
//         let textInfo = fitTextToBbox(
//                         bbox, 
//                         text,
//                         30,
//                         "sans-serif",
//                         textMargin);
//         ctx.fillStyle = textColor;
//         ctx.font = `${textInfo.fontSize}px sans-serif`;
//         ctx.fillText(text, textInfo.bbox.x, textInfo.bbox.y);
//         if (textStroke) {
//           ctx.strokeStyle = "#161F26";
//           ctx.lineWidth = textStrokeSize;
//           ctx.strokeText(text, textInfo.bbox.x, textInfo.bbox.y);
//         }
//       }
//     return clicked ? returnCode : null;
//   }
// 
//   function makeTitleScreenLayout() {
//     let bgBbox = gameLayoutGrid.makeBbox(0,0);
//     let titleTextContainerBbox = gameLayoutGrid.makeBbox(4, 4, 20, 8);
//     let titleText = "BattleshipJS";
//     let titleTextBboxInfo = fitTextToBbox(
//                           titleTextContainerBbox, 
//                           titleText,
//                           30,
//                           "sans-serif",
//                           0.05);
//     let subtitleText = "by Team 2";
//     let subtitleTextContainerBbox = gameLayoutGrid.makeBbox(6, 10, 18, 12);
//     let subtitleTextBboxInfo = fitTextToBbox(
//                           subtitleTextContainerBbox, 
//                           subtitleText,
//                           30,
//                           "sans-serif",
//                           0.05);
//     let startButtonBbox = gameLayoutGrid.makeBbox(8, 16, 16, 20);
//     let startText = "Start";
//     let startTextBboxInfo = fitTextToBbox(
//                                 startButtonBbox, 
//                                 startText,
//                                 30,
//                                 "sans-serif",
//                                 0.1);
//     let render = function(ctx, eventInfo) {
//       ctx.clearRect(0, 0, bgBbox.width, bgBbox.height);
// 
//       let buttonHovered = eventInfo.cursor.relativeTo(screenBbox).in(startButtonBbox);
//       let buttonClicked = eventInfo.click.relativeTo(screenBbox).in(startButtonBbox);
//       if (buttonClicked) {
//         click.useValue = false;
//       }
//       // full screen + border
//       ctx.fillStyle = "#283745";
//       ctx.fillRect(0, 0, bgBbox.width, bgBbox.height);
//       ctx.lineWidth = bgBbox.width * 0.05;
//       ctx.strokeStyle = "#161F26";
//       ctx.strokeRect(0, 0, bgBbox.width, bgBbox.height);
//       
//       // title text container
//       ctx.fillStyle = "#B4BBCD";
//       ctx.fillRect(titleTextContainerBbox.x, titleTextContainerBbox.y,
//                    titleTextContainerBbox.width, titleTextContainerBbox.height);
//       
//       // title text
//       ctx.fillStyle = "#9E1919";
//       ctx.font = `${titleTextBboxInfo.fontSize}px sans-serif`;
//       ctx.fillText(titleText, titleTextBboxInfo.bbox.x, titleTextBboxInfo.bbox.y);
//       ctx.strokeStyle = "#161F26";
//       ctx.lineWidth = 3;
//       ctx.strokeText(titleText, titleTextBboxInfo.bbox.x, titleTextBboxInfo.bbox.y);
//       
//       // subtitle
//       ctx.fillStyle = "#DCDCDC"
//       ctx.font = `${subtitleTextBboxInfo.fontSize}px sans-serif`;
//       ctx.fillText(subtitleText, subtitleTextBboxInfo.bbox.x, subtitleTextBboxInfo.bbox.y);
// 
//       // start button
//       let buttonFill = buttonHovered ? "#DCC2C2" : "#DCDCDC";
//       buttonFill = buttonClicked ? "#A17979" : buttonFill;
//       ctx.fillStyle = buttonFill;
//       ctx.strokeStyle = "#161F26";
//       roundRect(ctx, startButtonBbox.x, startButtonBbox.y, 
//                 startButtonBbox.width, startButtonBbox.height,
//                 5, true, true);
//       
//       // start button text
//       ctx.fillStyle = "#161F26";
//       ctx.font = `${startTextBboxInfo.fontSize}px sans-serif`;
//       ctx.fillText(startText, startTextBboxInfo.bbox.x, startTextBboxInfo.bbox.y)
//       
//       if (!buttonClicked) {
//         return { code: uie.Nothing };
//       }
//       return {code: uie.ButtonClick, content: {button: uibtn.Start} };
//     }
//     return { render };
//   }
// 
//   function makeRuleSelectLayout() {
//     let bgBbox = gameLayoutGrid.makeBbox(0,0);
//     let rsHeaderBbox = gameLayoutGrid.makeBbox(4, 2, 20, 5);
//     let rs1Bbox = gameLayoutGrid.makeBbox(8, 6, 16, 8);
//     let rs2Bbox = gameLayoutGrid.makeBbox(8, 9, 16, 11);
//     let rs3Bbox = gameLayoutGrid.makeBbox(8, 12, 16, 14);
//     let rs4Bbox = gameLayoutGrid.makeBbox(8, 15, 16, 17);
//     let rs5Bbox = gameLayoutGrid.makeBbox(8, 18, 16, 20);
//     function render(ctx, eventInfo) {
//       let response = null;
//       layoutRect(ctx, bgBbox, Color.Bg, Color.BgStroke, 0.05);
//       layoutRect(ctx, rsHeaderBbox, 
//                  Color.TextBox, Color.TextBoxStroke, 
//                  0.0005, "Ships Per Team", Color.TextColor);
//       response ||= layoutButton(ctx, eventInfo, 
//                                 rs1Bbox, uibtn.Rule1Ship, "1 Ship");
//       response ||= layoutButton(ctx, eventInfo, 
//                                 rs2Bbox, uibtn.Rule2Ship, "2 Ships");
//       response ||= layoutButton(ctx, eventInfo, 
//                                 rs3Bbox, uibtn.Rule3Ship, "3 Ships");
//       response ||= layoutButton(ctx, eventInfo, 
//                                 rs4Bbox, uibtn.Rule4Ship, "4 Ships");
//       response ||= layoutButton(ctx, eventInfo, 
//                                 rs5Bbox, uibtn.Rule5Ship, "5 Ships");
//       if (response) {
//         return {code: uie.ButtonClick, content: { button: response }};
//       }
//       else  {
//         return { code: uie.Nothing };
//       }
//     }
//     return { render };
//   }
// 
//   function makeGameWinLayout() {
//     let bgBbox = gameLayoutGrid.makeBbox(0,0);
//     let gwHeaderBbox = gameLayoutGrid.makeBbox(4, 4, 20, 8);
//     let startBbox = gameLayoutGrid.makeBbox(8, 16, 16, 20);
//     function render(ctx, eventInfo, winner=1) {
//       let response = null;
//       layoutRect(ctx, bgBbox, Color.Bg, Color.BgStroke, 0.05);
//       layoutRect(ctx, gwHeaderBbox, 
//                  Color.TextBox, Color.TextBoxStroke, 
//                  0.0005, `Player ${winner} Wins!`, 
//                  Color.RedTruth, "#161F26", 3, 0.05);
//       response ||= layoutButton(ctx, eventInfo, 
//                                 startBbox, uibtn.Start, "Play again?");
//       if (response) {
//         return {code: uie.ButtonClick, content: { button: response }};
//       }
//       else  {
//         return { code: uie.Nothing };
//       }
//     }
//     return { render };
//   }
// 
//   function countships(ships, size) {
//     let count = 0;
//     for (let i = 0; i < ships.length; i++) {
//       count += ships[i].segments.length == size ? 1 : 0;
//     }
//     return count;
//   }
// 
//   function makePlaceShipsLayout() {
//     let gridBbox = gameLayoutGrid.makeBbox(4, 6, 16, 18);
//     let gridBboxGrid = new LayoutGrid(gridBbox, 10, 10);
//     let playerNameBbox = gameLayoutGrid.makeBbox(8, 2, 12, 4);
//     let shipBtn1Bbox = gameLayoutGrid.makeBbox(18, 2, 22, 4);
//     let shipBtn2Bbox = gameLayoutGrid.makeBbox(18, 5, 22, 7);
//     let shipBtn3Bbox = gameLayoutGrid.makeBbox(18, 8, 22, 10);
//     let shipBtn4Bbox = gameLayoutGrid.makeBbox(18, 11, 22, 13);
//     let shipBtn5Bbox = gameLayoutGrid.makeBbox(18, 14, 22, 16);
//     let info1Bbox = gameLayoutGrid.makeBbox(18, 17, 22, 19);
//     let info2Bbox = gameLayoutGrid.makeBbox(18, 20, 22, 22);
//     let nextPlayerBtn = gameLayoutGrid.makeBbox(4, 4, 20, 20);
//     function render(ctx, eventInfo, ships, selectedShip, unplacedShips, player) {
//       let response = null;
//       let selectedShipLen = selectedShip.segments.length;
//       let highlightedTiles;
//       if (unplacedShips.length == 0) {
//         let btnText = player == Player.P1 ? "Next player's turn" : "Start the game!";
//         response ||= layoutButton(boardCtx, eventInfo, nextPlayerBtn, uibtn.NextPlayer, btnText);
//         return response;
//       }
//       drawGrid(boardCtx, gridBbox);
//       layoutRect(ctx, playerNameBbox, 
//         Color.TextBox, Color.TextBoxStroke, 
//         0.0005, `Player ${player}`, Color.TextColor);
//       response ||= layoutButton(boardCtx, eventInfo, shipBtn1Bbox, 
//                                 uibtn.Select1, `S1: ${countships(unplacedShips, 1)}`);
//       response ||= layoutButton(boardCtx, eventInfo, shipBtn2Bbox, 
//                                 uibtn.Select2, `S2: ${countships(unplacedShips, 2)}`);
//       response ||= layoutButton(boardCtx, eventInfo, shipBtn3Bbox, 
//                                 uibtn.Select3, `S3: ${countships(unplacedShips, 3)}`);
//       response ||= layoutButton(boardCtx, eventInfo, shipBtn4Bbox, 
//                                 uibtn.Select4, `S4: ${countships(unplacedShips, 4)}`);
//       response ||= layoutButton(boardCtx, eventInfo, shipBtn5Bbox, 
//                                 uibtn.Select5, `S5: ${countships(unplacedShips, 5)}`);
//       layoutRect(ctx, info1Bbox, 
//                 Color.TextBox, Color.TextBoxStroke, 
//                 0.0005, `Rotate: `, Color.TextColor);
//       layoutRect(ctx, info2Bbox, 
//                   Color.TextBox, Color.TextBoxStroke, 
//                   0.0005, `A or D`, Color.TextColor);
//       if (cursor.relativeTo(screenBbox).in(gridBbox)) {
//         highlightedTiles = getHighlightedTiles(gridBboxGrid, 
//                                              cursor.relativeTo(screenBbox),
//                                              selectedShip);
//         for (let i = 0; i < highlightTiles.length; i++) {
//           highlightBbox(ctx, gridBboxGrid.getBbox(highlightTiles[i].col, highlightTiles[i].row));
//         }
//       }
//       drawShips(ctx, gridBboxGrid, ships);
//       if (click.relativeTo(screenBbox).in(gridBbox)) {
//         let coords = gridBboxGrid.findIntersectingBbox(cursor.relativeTo(screenBbox), true).coords;
//         return { code: uie.GridClick, content: { coords: coords}};
//       }
//       if (!response) {
//         return { code: uie.Nothing };
//       }
//       return response;
//     }
//     return { render };
//   }
// 
//   function makeAllLayouts() {
//     return { titleScreen: makeTitleScreenLayout(),
//              ruleSelect : makeRuleSelectLayout(),
//              placeShips : makePlaceShipsLayout(),
//              mainGame   : null,
//              gameWin    : makeGameWinLayout()
//      };
//   }
// 
//   // =========== HELPER CLASSES, FUNCTIONS ===========
// 
//   // kind of stack overflow code
//   // link to closest answer:
//   //  - https://stackoverflow.com/a/51939030
//   // allows an awaitable delay by having this function return a promise
//   // that resolves after a setTimeout function expires
//   // this is used instead of setInterval for controlling the framerate because
//   // setInterval sucks and lags the browser.
//   const sleep = ms => new Promise(res => setTimeout(res, ms)); 
// 
//   function isConstrainedByWidth(width, height, wToH) {
//     if (width / height <= wToH) {
//       return true;
//     }
//     return false;
//   }
// 
//   function fitTextToBbox(container, text, fontSize=30, font="sans-serif", margin=0, ctx=boardCtx) {
//     ctx.font = `${fontSize}px ${font}`;
//     let textM = ctx.measureText(text);
//     let tWidth  = textM.actualBoundingBoxRight + textM.actualBoundingBoxLeft;
//     let tHeight = textM.actualBoundingBoxDescent + textM.actualBoundingBoxAscent;
//     let textBbox = new BoundingBox(0, 0, tWidth, tHeight);
//     textBbox.scaleTo(container, margin);
//     let scaleFactor = textBbox.width / tWidth;
//     let newFontsize = scaleFactor * fontSize;
//     textBbox.centerIn(container);
//     textBbox.y += textM.actualBoundingBoxAscent * scaleFactor;
//     textBbox.x += textM.actualBoundingBoxLeft * scaleFactor;
//     return { fontSize: newFontsize, bbox: textBbox };
//   }
// 
//   function BoundingBox(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.centerIn = function(container) {
//       this.centerInHorizontal(container);
//       this.centerInVertical(container);
//     };
//     this.centerInHorizontal = function(container) {
//       this.x = container.x + (container.width - this.width) / 2;
//     };
//     this.centerInVertical = function(container) {
//       this.y = container.y + (container.height - this.height) / 2;
//     };
//     this.scaleTo = function(container, margin=0) {
//       let newWidth, newHeight;
//       let wToHContainer = container.width / container.height;
//       if (isConstrainedByWidth(this.width, this.height, wToHContainer)) {
//         newHeight = container.height * (1 - margin*2);
//         newWidth = this.width * (newHeight / this.height);
//       }
//       else {
//         newWidth = container.width * (1 - margin*2);
//         newHeight = this.height * (newWidth / this.width);
//       }
//       this.height = newHeight;
//       this.width = newWidth;
//     };
//   }
// 
//   // A 2D array of bounding boxes. 
//   // Contains methods for testing for collision with a specific bbox in the grid.
//   // if yDivs is null, grid is assumed to be square.
//   // if sqSubdivs is defined, it will make the squares of uneven sizes accounting for the outermost tiles being thicker
//   function BoundingBoxGrid(bbox, xDivs, yDivs, sqSubdivs, lineSubdivs) {
//     this.grid = [];
//     this.bbox = bbox;
//     this.sqSubdivs = sqSubdivs;
//     this.lineSubdivs = lineSubdivs || 1;
//     this.xDivs = xDivs;
//     this.yDivs = yDivs || xDivs;
//     if (!sqSubdivs) {
//       this.x = bbox.x;
//       this.y = bbox.y;
//       this.width = bbox.width;
//       this.height = bbox.height;
//       yDivs = yDivs || xDivs;
//       let xDivSize = bbox.width / xDivs;
//       let yDivSize = bbox.height / yDivs;
//       for (let i = 0; i < yDivs; i++) {
//         this.grid.push([]);
//         for (let j = 0; j < xDivs; j++) {
//           this.grid[i].push(new BoundingBox(bbox.x + j * xDivSize, bbox.y + i * yDivSize,  xDivSize, yDivSize));
//         }
//       }
//     }
//     else {
//       let subdimX = xDivs * sqSubdivs + lineSubdivs * 2;
//       let subdimY = xDivs * sqSubdivs + lineSubdivs * 2;
//       let subdivX = bbox.width / subdimX;
//       let subdivY = bbox.height / subdimY;
//       let subdivXSquare = subdivX * sqSubdivs;
//       let subdivYSquare = subdivY * sqSubdivs;
//       let linesizeXOffset = subdivX * lineSubdivs;
//       let linesizeYOffset = subdivY * lineSubdivs;
//       let xStart = bbox.x + linesizeXOffset;
//       let yStart = bbox.y + linesizeYOffset;
//       for (let i = 0; i < yDivs; i++) {
//         this.grid.push([]);
//         for (let j = 0; j < xDivs; j++) {
//           this.grid[i].push(new BoundingBox(xStart + j * subdivXSquare, yStart + i * subdivYSquare,  subdivXSquare, subdivYSquare));
//         }
//       }
//       this.x = xStart;
//       this.y = yStart;
//       this.width = subdivXSquare * xDivs - xStart;
//       this.height = subdivYSquare * yDivs - yStart;
//     }
//     this.findIntersectingBbox = function(pt, returnCoords=false) {
//       if (
//           pt.x < this.x 
//           || pt.y < this.y
//           || pt.x > this.x + this.width
//           || pt.y > this.y + this.height
//          ) {
//         return null;
//       }
//       let lowerX = 0;
//       let upperX = this.xDivs;
//       let lowerY = 0;
//       let upperY = this.yDivs;
//       let middleX, middleY;
//       let foundX, foundY;
//       // binary search for bbox
//       while (true) {
//         if (lowerX == upperX || upperX == lowerX + 1) {
//           foundX = lowerX;
//           break;
//         }
//         middleX = Math.trunc((lowerX + upperX) / 2);
//         if (pt.x < this.grid[0][middleX].x) {
//           upperX = middleX;
//         }
//         else {
//           lowerX = middleX;
//         }
//       }
//       while (true) {
//         if (lowerY == upperY || upperY == lowerY + 1) {
//           foundY = lowerY;
//           break;
//         }
//         middleY = Math.trunc((lowerY + upperY) / 2);
//         if (pt.y < this.grid[middleY][0].y) {
//           upperY = middleY;
//         }
//         else {
//           lowerY = middleY;
//         }
//       }
//       if (!returnCoords) {
//         return this.grid[foundY][foundX];
//       }
//       else {
//         return { bbox: this.grid[foundY][foundX], coords: {row: y, col: x} };
//       }
//       
//     }
//     this.getBbox = function(y, x) {
//       return this.grid[y][x];
//     }
//   }
// 
//   // A tool for making bboxes based on a layout.
//   // So you can evenly divide some area into sections and get slices
//   // of that area as a bbox.
//   function LayoutGrid(bbox, xDivs, yDivs) {
//     this.xDivs = xDivs;
//     this.yDivs = yDivs || xDivs;
//     this.sectionWidth = bbox.width / this.xDivs;
//     this.sectionHeight = bbox.height / this.yDivs;
//     this.makeBbox = function(x1=0, y1=0, x2=this.xDivs, y2=this.yDivs) {
//       let startX = bbox.x + x1 * this.sectionWidth;
//       let width = (x2 * this.sectionWidth) - startX;
//       let startY = bbox.y + y1 * this.sectionHeight;
//       let height = (y2 * this.sectionHeight) - startY;
//       return new BoundingBox(startX, startY, width, height);
//     }
//   }
// 
//   function Point(x, y) {
//     this.x = x;
//     this.y = y;
//     // tests if a point is in a bounding box
//     // returns true or false
//     this.in = function(bbox) {
//       return bbox.x <= this.x && this.x <= bbox.x + bbox.width
//             && bbox.y <= this.y && this.y <= bbox.y + bbox.height;
//     };
//     // returns a new point that's based on the original
//     // offset by the x and y of the bbox, as if those values were now 0, 0
//     this.relativeTo = function(bbox) {
//       return new Point(this.x - bbox.x, this.y - bbox.y);
//     };
//   }
// 
//   function PollablePoint(x, y) {
//     this.x = x;
//     this.y = y;
//     this.useValue = false;
//     this.in = function(bbox) {
//       return bbox.x <= this.x && this.x <= bbox.x + bbox.width
//             && bbox.y <= this.y && this.y <= bbox.y + bbox.height;
//     };
//     this.relativeTo = function(bbox) {
//       return new Point(this.x - bbox.x, this.y - bbox.y);
//     };
//   }
// 
//   function EventInfo() {
//     this.cursor;
//     this.click;
//     this.key;
//     this.latest = function() {
//       // variables that are polled for
//       this.cursor = cursor;
//       this.click  = click;
//       this.key    = key;
//     }
//     this.markAsRead = function() {
//       click.useValue = false;
//       key.useValue = false;
//     }
//   }
// 
//   EventInfo.invalidate = function() {
//     click.x = null;
//     click.y = null;
//     click.useValue = false;
//     key.key = null;
//     key.useValue = false;
//     isPolling = false;
//   }
// 
//   // =========== VARS ===========
// 
//   // DEBUG mode
//   const DEBUG = true;
// 
//   // ship sprites
//   let shipbody, shiptip, shiprubble;
// 
//   // i'm stupid
//   let selectedShipGlobal;
// 
//   // functions on intervals that need to be revoked/set differently
//   let frameRenderFunc;
//   let intervalFuncCode;
//   
//   // Holds current layouts
//   let layouts;
// 
//   // Should we be using or discarding polls for clicks/keys/mouse pos
//   let isPolling = false;
//   
//   // HTML canvas elements and associated contexts
//   let boardCanvas, boardCtx;
//   let bgCanvas, bgGl;
//   // let fxCanvas, fxGl;
//   let spriteCanvas, spriteCtx;
// 
//   // Measurements positions for screen placement
//   let winBbox = new BoundingBox();
//   let screenBbox = new BoundingBox();
// 
//   // Measurements associated with game innards
//   let gameBbox = new BoundingBox(0, 0);
//   let gameLayoutGrid;
// 
//   // For cursor tracking
//   let cursor = new Point();
//   
//   // For click tracking
//   let click = new PollablePoint();
// 
//   // For key tracking
//   let key = {key: undefined, useValue: false};
// 
//   // Audio context, would have been used for sfx
//   // let audioCtx;
//   
// 
//   // =========== FUNCS ON INTERVAL ===========
// 
//   function resizeScreen() {
//     winBbox.width = window.innerWidth;
//     winBbox.height = window.innerHeight;
// 
//     bgCanvas.width = winBbox.width;
//     bgCanvas.height = winBbox.height;
// 
//     if (isConstrainedByWidth(winBbox.width, winBbox.height, Constant.AspectRatio)) {
//       screenBbox.width = winBbox.width - winBbox.width * Constant.ScreenMargin;
//       screenBbox.height = screenBbox.width / Constant.AspectRatio;
//     }
//     else {
//       screenBbox.height = winBbox.height - winBbox.height * Constant.ScreenMargin;
//       screenBbox.width = screenBbox.height * Constant.AspectRatio;
//     }
// 
//     screenBbox.x = Math.trunc((winBbox.width - screenBbox.width) / 2);
//     screenBbox.y = Math.trunc((winBbox.height - screenBbox.height) / 2);
// 
//     boardCanvas.width /* = fxCanvas.width */ = screenBbox.width;
//     boardCanvas.height /* = fxCanvas.height */ = screenBbox.height;
//     
//     boardCanvas.style.left /* = fxCanvas.style.left */ = screenBbox.x + "px";
//     boardCanvas.style.top /* = fxCanvas.style.top */ = screenBbox.y + "px";
// 
//     gameBbox.width  = screenBbox.width;
//     gameBbox.height = screenBbox.height;
// 
//     gameLayoutGrid = new LayoutGrid(gameBbox, 24);
// 
//     layouts = makeAllLayouts();
// 
//   }
// 
//   function trackCursor(e) {
//     cursor.x = e.clientX;
//     cursor.y = e.clientY;
//   }
// 
//   function trackClick(e) {
//     click.x = e.clientX;
//     click.y = e.clientY;
//     click.useValue = isPolling;
//   }
// 
//   function trackKeydown(e) {
//     if (e.repeat) return;
//     key.key = e.key;
//     key.useValue = isPolling;
//   }
// 
//   // =========== PUBLIC FUNCTIONS ===========
//   
//   function init() {
//     boardCanvas = document.createElement("canvas");
//     // meant for background effects
//     bgCanvas = document.createElement("canvas");
//     // unused in current implementation, was meant to be for adding explosions using shaders
//     // fxCanvas = document.createElement("canvas");
//     // used for rotating sprites etc
//     spriteCanvas = new OffscreenCanvas(50,50);
//     
//     boardCtx = boardCanvas.getContext("2d");
//     // meant for background effects
//     bgGl = bgCanvas.getContext("webgl2");
//     // unused in current implementation, was meant to be for adding explosions using shaders
//     // fxGl = fxCanvas.getContext("webgl2");
//     spriteCtx = spriteCanvas.getContext("2d");
// 
//     bgCanvas.style.position    = "absolute";
//     boardCanvas.style.position = "absolute";
//     // fxCanvas.style.position    = "absolute";
// 
//     bgCanvas.style.top = "0";
//     bgCanvas.style.left = "0";
// 
//     bgCanvas.style.zindex    = "1";
//     boardCanvas.style.zindex = "2";
//     // fxCanvas.style.zindex    = "3";
// 
//     document.body.appendChild(bgCanvas);
//     document.body.appendChild(boardCanvas);
//     // document.body.appendChild(fxCanvas);
// 
//     resizeScreen();
// 
//     window.addEventListener("resize", resizeScreen);
//     window.addEventListener("mousemove", trackCursor);
//     window.addEventListener("click", trackClick);
//     window.addEventListener("keydown", trackKeydown);
// 
//     shipbody   = document.getElementById("shipbody");
//     shiptip    = document.getElementById("shiptip");
//     shiprubble = document.getElementById("shiprubble");
// 
//     // unused in current implementation -- meant for sound effects
//     // audioCtx = new AudioContext();
//   }
// 
//   // =========== HELPER DRAWING FUNCTIONS (BOARD) ===========
// 
//   // { START STACK OVERFLOW CODE }
//   // taken from: https://stackoverflow.com/a/3368118
//   function roundRect(
//     ctx,
//     x,
//     y,
//     width,
//     height,
//     radius = 5,
//     fill = false,
//     stroke = true
//   ) {
//     if (typeof radius === 'number') {
//       radius = {tl: radius, tr: radius, br: radius, bl: radius};
//     } else {
//       radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
//     }
//     ctx.beginPath();
//     ctx.moveTo(x + radius.tl, y);
//     ctx.lineTo(x + width - radius.tr, y);
//     ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
//     ctx.lineTo(x + width, y + height - radius.br);
//     ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
//     ctx.lineTo(x + radius.bl, y + height);
//     ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
//     ctx.lineTo(x, y + radius.tl);
//     ctx.quadraticCurveTo(x, y, x + radius.tl, y);
//     ctx.closePath();
//     if (fill) {
//       ctx.fill();
//     }
//     if (stroke) {
//       ctx.stroke();
//     }
//   }
//   // { END STACK OVERFLOW CODE }
// 
//   function getHighlightedTiles(bboxGrid, cursor, selectedShip) {
//     let curTile = bboxGrid.findIntersectingBbox(cursor, true);
//     if (!selectedShip) {
//       return curTile.grid;
//     }
//     else {
//       let tiles = [];
//       let xStretch = 0;
//       let yStretch = 0;
//       switch (selectedShip.orientation) {
//         case Orientation.Up:
//           yStretch -= selectedShip.segments.length - 1;
//           break;
//         case Orientation.Right:
//           xStretch += selectedShip.segments.length - 1;
//           break;
//         case Orientation.Down:
//           yStretch += selectedShip.segments.length - 1;
//           break;
//         case Orientation.Left:
//           xStretch -= selectedShip.segments.length - 1;
//           break;
//       }
//       if (curTile.coords.row + yStretch > 9) {
//         selectedShip.pos.row =  9 - (curTile.coords.row + yStretch - 9);
//       }
//       else if (curTile.coords.col + xStretch > 9) {
//         selectedShip.pos.col =  9 - (curTile.coords.col + xStretch - 9);
//       }
//       else if (curTile.coords.row + yStretch < 0) {
//         selectedShip.pos.row =  0 - (curTile.coords.row + yStretch);
//       }
//       else if (curTile.coords.col + xStretch < 0) {
//         selectedShip.pos.col =  0 - (curTile.coords.col + xStretch);
//       }
//       for (let i = 0; i < selectedShip.segments.length; i++) {
//         switch (selectedShip.orientation) {
//           case Orientation.Up:
//             tiles.push(new Coord(curTile.coords.row - i,
//                                  curTile.coords.col));
//             break;
//           case Orientation.Right:
//             tiles.push(new Coord(curTile.coords.row,
//                                  curTile.coords.col + i));
//             break;
//           case Orientation.Down:
//             tiles.push(new Coord(curTile.coords.row + i,
//                                  curTile.coords.col));
//             break;
//           case Orientation.Left:
//             tiles.push(new Coord(curTile.coords.row,
//                                  curTile.coords.col - i));
//             break;
//         }
//       }
//       return tiles;
//     }
//   }
// 
//   // =========== DRAWING FUNCTIONS (BOARD) ===========
// 
//   // assuming it's passed a square bbox
//   function drawGrid(ctx, bbox, dim, sqSubdivs=20, lineSubdivs=1) {
//     ctx.strokeStyle = "#9E1919";
//     let subdim = dim * sqSubdivs + lineSubdivs * 2;
//     let subdiv = bbox.width / subdim;
//     let squareSize = subdiv * sqSubdivs;
//     let lineSize =  subdiv * lineSubdivs * 2;
//     ctx.lineCap = "square";
//     ctx.lineWidth = lineSize;
//     let x = bbox.x + subdiv;
//     let y = bbox.y + subdiv;
//     for (let i = 0; i <= dim; i++) {
//       ctx.moveTo(
//         x + i * squareSize,
//         y
//       );
//       ctx.lineTo(
//         x + i * squareSize,
//         y + squareSize * dim
//       );
//       ctx.moveTo(
//         x,
//         y + i * squareSize
//       );
//       ctx.lineTo(
//         x + squareSize * dim,
//         y + i * squareSize
//       );
//     }
//     ctx.stroke();
//   }
// 
//   function drawO(ctx, bbox) {
//     let margin = 0.025 * bbox.width;
//     ctx.lineWidth = bbox.width / 5;
//     ctx.strokeStyle = Color.HitGreen;
//     ctx.lineCap = "butt";
//     ctx.moveTo(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);
//     ctx.arc(bbox.x + bbox.width / 2, bbox.y + bbox.height / 2, 
//             (bbox.height / 2) - margin, 0, 2.1 * Math.PI);
//     ctx.stroke();
//   }
// 
//   function drawX(ctx, bbox) {
//     let margin = 0.025 * bbox.width;
//     ctx.lineWidth = bbox.width / 5;
//     ctx.strokeStyle = Color.RedTruth;
//     ctx.lineCap = "butt";
//     ctx.moveTo(bbox.x + margin, bbox.y + margin);
//     ctx.lineTo(bbox.x + bbox.width - margin, bbox.y + bbox.height - margin);
//     ctx.moveTo(bbox.x + bbox.width - margin,  bbox.y + margin);
//     ctx.lineTo(bbox.x + margin, bbox.y + bbox.height - margin);
//     ctx.stroke();
//   }
// 
//   function drawShips(ctx, bboxGrid, ships) {
//     let ship;
//     let bbox;
//     for (let i = 0; i < ships.length; i++) {
//       ship = ships[i];
//       for (let j = 0; j < ship.segments.length; j++) {
//         bbox = bboxGrid.getBbox(ship.segments[j].pos.row, ship.segments[j].pos.col);
//         if (!ship.isAlive) {
//           spriteCtx.drawImage(shiprubble, 0, 0);
//           spriteCtx.rotate(0);
//         }
//         else if (ship.segments.length == 1) {
//           spriteCtx.drawImage(shiptiny, 0, 0);
//           spriteCtx.rotate(Math.PI / -2 * (ship.orientation - 1));
//         }
//         else if (j == 0) {
//           spriteCtx.drawImage(shiptip, 0, 0);
//           spriteCtx.rotate(Math.PI / -2 * (ship.orientation - 1) + Math.PI);
// 
//         }
//         else if (j == ship.segments.length - 1) {
//           spriteCtx.drawImage(shiptip, 0, 0);
//           spriteCtx.rotate(Math.PI / -2 * (ship.orientation - 1));
//         }
//         else {
//           spriteCtx.drawImage(shipbody, 0, 0);
//           spriteCtx.rotate(Math.PI / -2 * (ship.orientation - 1));
//         }
//         ctx.drawImage(spriteCanvas, bbox.x, bbox.y, bbox.width, bbox.height);
//       }
//     }
//   }
// 
// 
// 
// 
//   // =========== FRAME RENDER FUNCTIONS ===========
// 
//   function setFrameRenderFunc(func) {
//     if (frameRenderFunc && intervalFuncCode) {
//       clearInterval(intervalFuncCode);
//     }
//     frameRenderFunc = func;
//     intervalFuncCode = setInterval(func, Constant.FrameInterval);
//   }
// 
//   function highlightBbox(ctx, bbox) {
//     ctx.fillStyle = "rgb(0, 130, 90, 0.5)";
//     ctx.fillRect(bbox.x, bbox.y, bbox.width, bbox.height);
//   }
// 
//   // =========== LOGIC & ROUTING ===========
// 
//   // This routes messages to sub-functions of the UI that handle a specific state of the game
//   async function receiveMessage(msg) {
//     EventInfo.invalidate();
//     switch (msg.code) {
//       case mcode.ShowTitleScreen:
//         return await ShowTitleScreen();
//       case mcode.ShowRuleSelect:
//         return await RuleSelect();
//       case mcode.ShowBoard:
//         switch (msg.content.gamemode) {
//           case gmode.PlaceShips:
//             return await PlaceShipsStep(msg);
//           case gmode.MainGame:
//             return await MainGameStep(msg);
//         }
//       case mcode.PlacementResult:
//       case mcode.BadPlacement:
//         return await PlaceShipStep(msg);
//       case mcode.EndPlacementMode:
//         return await TransitionToMainGame();
//       case mcode.ShotResult:
//       case mcode.BadShot:
//         return await MainGameStep(msg);
//     }
//   }
// 
// 
//   async function ShowTitleScreen() {
//     let innerEvent;
//     isPolling = true;
//     let eventInfo = new EventInfo();
//     while (true) {
//       eventInfo.latest();
//       innerEvent = layouts.titleScreen.render(boardCtx, eventInfo);
//       if (innerEvent.code == uie.ButtonClick) {
//         let msgBack = {
//           code: m2gmcode.StartGame
//         };
//         return msgBack;
//       }
//       await sleep(Constant.FrameInterval);
//     }
//   }
// 
//   async function RuleSelect() {
//     let innerEvent;
//     isPolling = true;
//     let eventInfo = new EventInfo();
//     while (true) {
//       eventInfo.latest();
//       innerEvent = layouts.ruleSelect.render(boardCtx, eventInfo);
//       if (innerEvent.code == uie.ButtonClick) {
//         let msgBack = {
//           code: m2gmcode.RuleSelect,
//           content: {
//             rules: innerEvent.content.button
//           }
//         };
//         return msgBack;
//       }
//       await sleep(Constant.FrameInterval);
//     }
//   }
// 
// 
// 
//   async function PlaceShipStep(msg) {
//     let innerEvent;
//     isPolling = true;
//     let eventInfo = new EventInfo();
//     let ships = msg.content.ships[msg.content.currentPlayer];
//     let unplacedShips = msg.content.unplacedShips[msg.content.currentPlayer];
//     let selectedShip = !(selectedShipGlobal) && ships.length != 0 ? ships[0] : selectedShipGlobal;
//     while (true) {
//       eventInfo.latest();
//       if (eventInfo.key.key == "A") {
//         rotateShip(Rotation.Clockwise);
//       }
//       else if (eventInfo.key.key == "D") {
//         rotateShip(Rotation.CounterClockwise);
//       }
//       innerEvent = layouts.placeShips.render(boardCtx, eventInfo, ships, 
//                                             selectedShip, unplacedShips, msg.content.currentPlayer);
//       if (innerEvent.code != uie.Nothing) {
//         switch (innerEvent.code) {
//           case uie.buttonClicked:
//             // NEEDS TO BE FILLED IN
//             break;
//         }
//       }
//       eventInfo.markAsRead();
//       await sleep(Constant.FrameInterval);
//     }
//   }
// 
//   
// 
//   function rotateShip(ship, rotation) {
//     if (rotation == Rotation.Clockwise) {
//       ship.orientation = (ship.orientation + 1) % 4;
//     }
//     else {
//       ship.orientation = ship.orientation - 1;
//       if (ship.orientation < 0) {
//         ship.orientation = Orientation.Left;
//       }
//     }
//     for (let i = 0; i < ship.segments.length; i++) {
//       let dx = ship.orientation == Orientation.Right ? 1 : 0;
//       dx = ship.orientation == Orientation.Left ? -1 : 0;
//       let dy = ship.orientation == Orientation.Down ? 1 : 0;
//       dy = ship.orientation == Orientation.Up ? -1 : 0;
//       ship.segments[i].pos(ship.pos.row + dy * i, ship.pos.col + dx * i);
//     }
//     }
// 
//   // =========== DEBUG ===========
// 
//   
//   let debugfn = {};
//   if (DEBUG) {
//     debugfn = { ShowTitleScreen };
//   }
//     
//   // =========== RETURNING PUBLIC MEMBERS ===========
// 
//   return { init, receiveMessage, debugfn };
// }
