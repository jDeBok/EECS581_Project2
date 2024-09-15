/* 
 * Program Name:
 * UI module
 * 
 * Description:
 * 
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

"use strict"

function UIConstructor() {

  // =========== "USING" STATEMENTS ===========

  const mcode    = MessageToUICode;
  const gmode    = Gamemode;
  const uie      = UIEvent;
  const uibtn    = UIButton;
  const m2gmcode = MessageToGameModelCode;


  // =========== LAYOUTS ===========

  function layoutRect(ctx, bbox, 
                      fill, stroke=null, strokeRatio=0.001,
                      text, textColor, textStroke, textStrokeSize=3,
                      textMargin=0.1
                      ) {
      ctx.fillStyle = fill;
      ctx.fillRect(bbox.x, bbox.y, bbox.width, bbox.height);
      if (stroke) {
        ctx.lineWidth = bbox.width * strokeRatio;
        ctx.strokeStyle = stroke;
        ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height);
      }
      if (text) {
        let textInfo = fitTextToBbox(
                        bbox, 
                        text,
                        30,
                        "sans-serif",
                        textMargin);
        ctx.fillStyle = textColor;
        ctx.font = `${textInfo.fontSize}px sans-serif`;
        ctx.fillText(text, textInfo.bbox.x, textInfo.bbox.y);
        if (textStroke) {
          ctx.strokeStyle = "#161F26";
          ctx.lineWidth = textStrokeSize;
          ctx.strokeText(text, textInfo.bbox.x, textInfo.bbox.y);
        }
      }
  }

  function layoutButton(ctx, eventInfo, bbox, 
                        returnCode, text, fill="#DCDCDC",
                        hoverColor="#DCC2C2", clickColor="#A17979",
                        stroke="#161F26", strokeSize=3,
                        textColor="#161F26", textStroke=null,
                        textStrokeSize=3, textMargin=0.1, 
                        radius=5) {
    let hovered = eventInfo.cursor.relativeTo(screenBbox).in(bbox);
    let clicked = eventInfo.click.useValue && 
                    eventInfo.click.relativeTo(screenBbox).in(bbox);                     
    let buttonFill = hovered ? hoverColor : fill;
    buttonFill = clicked ? clickColor : buttonFill;
    ctx.fillStyle = buttonFill;
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = strokeSize;
    }
    roundRect(ctx, bbox.x, bbox.y, bbox.width, bbox.height,
      radius, true, !(stroke === null));
      if (text) {
        let textInfo = fitTextToBbox(
                        bbox, 
                        text,
                        30,
                        "sans-serif",
                        textMargin);
        ctx.fillStyle = textColor;
        ctx.font = `${textInfo.fontSize}px sans-serif`;
        ctx.fillText(text, textInfo.bbox.x, textInfo.bbox.y);
        if (textStroke) {
          ctx.strokeStyle = "#161F26";
          ctx.lineWidth = textStrokeSize;
          ctx.strokeText(text, textInfo.bbox.x, textInfo.bbox.y);
        }
      }
    return clicked ? returnCode : null;
  }

  function makeTitleScreenLayout() {
    let bgBbox = gameLayoutGrid.makeBbox(0,0);
    let titleTextContainerBbox = gameLayoutGrid.makeBbox(4, 4, 20, 8);
    let titleText = "BattleshipJS";
    let titleTextBboxInfo = fitTextToBbox(
                          titleTextContainerBbox, 
                          titleText,
                          30,
                          "sans-serif",
                          0.05);
    let subtitleText = "by Team 2";
    let subtitleTextContainerBbox = gameLayoutGrid.makeBbox(6, 10, 18, 12);
    let subtitleTextBboxInfo = fitTextToBbox(
                          subtitleTextContainerBbox, 
                          subtitleText,
                          30,
                          "sans-serif",
                          0.05);
    let startButtonBbox = gameLayoutGrid.makeBbox(8, 16, 16, 20);
    let startText = "Start";
    let startTextBboxInfo = fitTextToBbox(
                                startButtonBbox, 
                                startText,
                                30,
                                "sans-serif",
                                0.1);
    let render = function(ctx, eventInfo) {
      ctx.clearRect(0, 0, bgBbox.width, bgBbox.height);

      let buttonHovered = eventInfo.cursor.relativeTo(screenBbox).in(startButtonBbox);
      let buttonClicked = eventInfo.click.relativeTo(screenBbox).in(startButtonBbox);
      if (buttonClicked) {
        click.useValue = false;
      }
      // full screen + border
      ctx.fillStyle = "#283745";
      ctx.fillRect(0, 0, bgBbox.width, bgBbox.height);
      ctx.lineWidth = bgBbox.width * 0.05;
      ctx.strokeStyle = "#161F26";
      ctx.strokeRect(0, 0, bgBbox.width, bgBbox.height);
      
      // title text container
      ctx.fillStyle = "#B4BBCD";
      ctx.fillRect(titleTextContainerBbox.x, titleTextContainerBbox.y,
                   titleTextContainerBbox.width, titleTextContainerBbox.height);
      
      // title text
      ctx.fillStyle = "#9E1919";
      ctx.font = `${titleTextBboxInfo.fontSize}px sans-serif`;
      ctx.fillText(titleText, titleTextBboxInfo.bbox.x, titleTextBboxInfo.bbox.y);
      ctx.strokeStyle = "#161F26";
      ctx.lineWidth = 3;
      ctx.strokeText(titleText, titleTextBboxInfo.bbox.x, titleTextBboxInfo.bbox.y);
      
      // subtitle
      ctx.fillStyle = "#DCDCDC"
      ctx.font = `${subtitleTextBboxInfo.fontSize}px sans-serif`;
      ctx.fillText(subtitleText, subtitleTextBboxInfo.bbox.x, subtitleTextBboxInfo.bbox.y);

      // start button
      let buttonFill = buttonHovered ? "#DCC2C2" : "#DCDCDC";
      buttonFill = buttonClicked ? "#A17979" : buttonFill;
      ctx.fillStyle = buttonFill;
      ctx.strokeStyle = "#161F26";
      roundRect(ctx, startButtonBbox.x, startButtonBbox.y, 
                startButtonBbox.width, startButtonBbox.height,
                5, true, true);
      
      // start button text
      ctx.fillStyle = "#161F26";
      ctx.font = `${startTextBboxInfo.fontSize}px sans-serif`;
      ctx.fillText(startText, startTextBboxInfo.bbox.x, startTextBboxInfo.bbox.y)
      
      if (!buttonClicked) {
        return { code: uie.Nothing };
      }
      return {code: uie.ButtonClick, content: {button: uibtn.Start} };
    }
    return { render };
  }

  function makeRuleSelectLayout() {
    let bgBbox = gameLayoutGrid.makeBbox(0,0);
    let rsHeaderBbox = gameLayoutGrid.makeBbox(4, 2, 20, 5);
    let rs1Bbox = gameLayoutGrid.makeBbox(8, 6, 16, 8);
    let rs2Bbox = gameLayoutGrid.makeBbox(8, 9, 16, 11);
    let rs3Bbox = gameLayoutGrid.makeBbox(8, 12, 16, 14);
    let rs4Bbox = gameLayoutGrid.makeBbox(8, 15, 16, 17);
    let rs5Bbox = gameLayoutGrid.makeBbox(8, 18, 16, 20);
    function render(ctx, eventInfo) {
      let response = null;
      layoutRect(ctx, bgBbox, Color.Bg, Color.BgStroke, 0.05);
      layoutRect(ctx, rsHeaderBbox, 
                 Color.TextBox, Color.TextBoxStroke, 
                 0.0005, "Ships Per Team", Color.TextColor);
      response ||= layoutButton(ctx, eventInfo, 
                                rs1Bbox, uibtn.Rule1Ship, "1 Ship");
      response ||= layoutButton(ctx, eventInfo, 
                                rs2Bbox, uibtn.Rule2Ship, "2 Ships");
      response ||= layoutButton(ctx, eventInfo, 
                                rs3Bbox, uibtn.Rule3Ship, "3 Ships");
      response ||= layoutButton(ctx, eventInfo, 
                                rs4Bbox, uibtn.Rule4Ship, "4 Ships");
      response ||= layoutButton(ctx, eventInfo, 
                                rs5Bbox, uibtn.Rule5Ship, "5 Ships");
      if (response) {
        return {code: uie.ButtonClick, content: { button: response }};
      }
      else  {
        return { code: uie.Nothing };
      }
    }
    return { render };
  }

  function makeGameWinLayout() {
    let bgBbox = gameLayoutGrid.makeBbox(0,0);
    let gwHeaderBbox = gameLayoutGrid.makeBbox(4, 4, 20, 8);
    let startBbox = gameLayoutGrid.makeBbox(8, 16, 16, 20);
    function render(ctx, eventInfo, winner=1) {
      let response = null;
      layoutRect(ctx, bgBbox, Color.Bg, Color.BgStroke, 0.05);
      layoutRect(ctx, gwHeaderBbox, 
                 Color.TextBox, Color.TextBoxStroke, 
                 0.0005, `Player ${winner} Wins!`, 
                 Color.RedTruth, "#161F26", 3, 0.05);
      response ||= layoutButton(ctx, eventInfo, 
                                startBbox, uibtn.Start, "Play again?");
      if (response) {
        return {code: uie.ButtonClick, content: { button: response }};
      }
      else  {
        return { code: uie.Nothing };
      }
    }
    return { render };
  }

  function makeAllLayouts() {
    return { titleScreen: makeTitleScreenLayout(),
             ruleSelect : makeRuleSelectLayout(),
             placeShips : null,
             mainGame   : null,
             gameWin    : makeGameWinLayout()
     };
  }

  // =========== HELPER CLASSES, FUNCTIONS ===========

  // kind of stack overflow code
  // link to closest answer:
  //  - https://stackoverflow.com/a/51939030
  // allows an awaitable delay by having this function return a promise
  // that resolves after a setTimeout function expires
  // this is used instead of setInterval for controlling the framerate because
  // setInterval sucks and lags the browser.
  const sleep = ms => new Promise(res => setTimeout(res, ms)); 

  function isConstrainedByWidth(width, height, wToH) {
    if (width / height <= wToH) {
      return true;
    }
    return false;
  }

  function fitTextToBbox(container, text, fontSize=30, font="sans-serif", margin=0, ctx=boardCtx) {
    ctx.font = `${fontSize}px ${font}`;
    let textM = ctx.measureText(text);
    let tWidth  = textM.actualBoundingBoxRight + textM.actualBoundingBoxLeft;
    let tHeight = textM.actualBoundingBoxDescent + textM.actualBoundingBoxAscent;
    let textBbox = new BoundingBox(0, 0, tWidth, tHeight);
    textBbox.scaleTo(container, margin);
    let scaleFactor = textBbox.width / tWidth;
    let newFontsize = scaleFactor * fontSize;
    textBbox.centerIn(container);
    textBbox.y += textM.actualBoundingBoxAscent * scaleFactor;
    textBbox.x += textM.actualBoundingBoxLeft * scaleFactor;
    return { fontSize: newFontsize, bbox: textBbox };
  }

  function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerIn = function(container) {
      this.centerInHorizontal(container);
      this.centerInVertical(container);
    };
    this.centerInHorizontal = function(container) {
      this.x = container.x + (container.width - this.width) / 2;
    };
    this.centerInVertical = function(container) {
      this.y = container.y + (container.height - this.height) / 2;
    };
    this.scaleTo = function(container, margin=0) {
      let newWidth, newHeight;
      let wToHContainer = container.width / container.height;
      if (isConstrainedByWidth(this.width, this.height, wToHContainer)) {
        newHeight = container.height * (1 - margin*2);
        newWidth = this.width * (newHeight / this.height);
      }
      else {
        newWidth = container.width * (1 - margin*2);
        newHeight = this.height * (newWidth / this.width);
      }
      this.height = newHeight;
      this.width = newWidth;
    };
  }

  // A 2D array of bounding boxes. 
  // Contains methods for testing for collision with a specific bbox in the grid.
  // if yDivs is null, grid is assumed to be square.
  // if sqSubdivs is defined, it will make the squares of uneven sizes accounting for the outermost tiles being thicker
  function BoundingBoxGrid(bbox, xDivs, yDivs, sqSubdivs, lineSubdivs) {
    this.grid = [];
    this.bbox = bbox;
    this.sqSubdivs = sqSubdivs;
    this.lineSubdivs = lineSubdivs || 1;
    this.xDivs = xDivs;
    this.yDivs = yDivs || xDivs;
    if (!sqSubdivs) {
      this.x = bbox.x;
      this.y = bbox.y;
      this.width = bbox.width;
      this.height = bbox.height;
      yDivs = yDivs || xDivs;
      let xDivSize = bbox.width / xDivs;
      let yDivSize = bbox.height / yDivs;
      for (let i = 0; i < yDivs; i++) {
        this.grid.push([]);
        for (let j = 0; j < xDivs; j++) {
          this.grid[i].push(new BoundingBox(bbox.x + j * xDivSize, bbox.y + i * yDivSize,  xDivSize, yDivSize));
        }
      }
    }
    else {
      let subdimX = xDivs * sqSubdivs + lineSubdivs * 2;
      let subdimY = xDivs * sqSubdivs + lineSubdivs * 2;
      let subdivX = bbox.width / subdimX;
      let subdivY = bbox.height / subdimY;
      let subdivXSquare = subdivX * sqSubdivs;
      let subdivYSquare = subdivY * sqSubdivs;
      let linesizeXOffset = subdivX * lineSubdivs;
      let linesizeYOffset = subdivY * lineSubdivs;
      let xStart = bbox.x + linesizeXOffset;
      let yStart = bbox.y + linesizeYOffset;
      for (let i = 0; i < yDivs; i++) {
        this.grid.push([]);
        for (let j = 0; j < xDivs; j++) {
          this.grid[i].push(new BoundingBox(xStart + j * subdivXSquare, yStart + i * subdivYSquare,  subdivXSquare, subdivYSquare));
        }
      }
      this.x = xStart;
      this.y = yStart;
      this.width = subdivXSquare * xDivs - xStart;
      this.height = subdivYSquare * yDivs - yStart;
    }
    this.findIntersectingBbox = function(pt) {
      if (
          pt.x < this.x 
          || pt.y < this.y
          || pt.x > this.x + this.width
          || pt.y > this.y + this.height
         ) {
        return null;
      }
      let lowerX = 0;
      let upperX = this.xDivs;
      let lowerY = 0;
      let upperY = this.yDivs;
      let middleX, middleY;
      let foundX, foundY;
      // binary search for bbox
      while (true) {
        if (lowerX == upperX || upperX == lowerX + 1) {
          foundX = lowerX;
          break;
        }
        middleX = Math.trunc((lowerX + upperX) / 2);
        if (pt.x < this.grid[0][middleX].x) {
          upperX = middleX;
        }
        else {
          lowerX = middleX;
        }
      }
      while (true) {
        if (lowerY == upperY || upperY == lowerY + 1) {
          foundY = lowerY;
          break;
        }
        middleY = Math.trunc((lowerY + upperY) / 2);
        if (pt.y < this.grid[middleY][0].y) {
          upperY = middleY;
        }
        else {
          lowerY = middleY;
        }
      }
      return this.grid[foundY][foundX];
    }
    this.getBbox = function(y, x) {
      return this.grid[y][x];
    }
  }

  // A tool for making bboxes based on a layout.
  // So you can evenly divide some area into sections and get slices
  // of that area as a bbox.
  function LayoutGrid(bbox, xDivs, yDivs) {
    this.xDivs = xDivs;
    this.yDivs = yDivs || xDivs;
    this.sectionWidth = bbox.width / this.xDivs;
    this.sectionHeight = bbox.height / this.yDivs;
    this.makeBbox = function(x1=0, y1=0, x2=this.xDivs, y2=this.yDivs) {
      let startX = bbox.x + x1 * this.sectionWidth;
      let width = (x2 * this.sectionWidth) - startX;
      let startY = bbox.y + y1 * this.sectionHeight;
      let height = (y2 * this.sectionHeight) - startY;
      return new BoundingBox(startX, startY, width, height);
    }
  }

  function Point(x, y) {
    this.x = x;
    this.y = y;
    // tests if a point is in a bounding box
    // returns true or false
    this.in = function(bbox) {
      return bbox.x <= this.x && this.x <= bbox.x + bbox.width
            && bbox.y <= this.y && this.y <= bbox.y + bbox.height;
    };
    // returns a new point that's based on the original
    // offset by the x and y of the bbox, as if those values were now 0, 0
    this.relativeTo = function(bbox) {
      return new Point(this.x - bbox.x, this.y - bbox.y);
    };
  }

  function PollablePoint(x, y) {
    this.x = x;
    this.y = y;
    this.useValue = false;
    this.in = function(bbox) {
      return bbox.x <= this.x && this.x <= bbox.x + bbox.width
            && bbox.y <= this.y && this.y <= bbox.y + bbox.height;
    };
    this.relativeTo = function(bbox) {
      return new Point(this.x - bbox.x, this.y - bbox.y);
    };
  }

  function EventInfo() {
    this.cursor;
    this.click;
    this.key;
    this.latest = function() {
      // variables that are polled for
      this.cursor = cursor;
      this.click  = click;
      this.key    = key;
    }
  }

  EventInfo.invalidate = function() {
    click.useValue = false;
    key.useValue = false;
    isPolling = false;
  }

  // =========== VARS ===========

  // DEBUG mode
  const DEBUG = true;

  // functions on intervals that need to be revoked/set differently
  let frameRenderFunc;
  let intervalFuncCode;
  
  // Holds current layouts
  let layouts;

  // Should we be using or discarding polls for clicks/keys/mouse pos
  let isPolling = false;
  
  // HTML canvas elements and associated contexts
  let boardCanvas, boardCtx;
  let bgCanvas, bgGl;
  let fxCanvas, fxGl;

  // Measurements positions for screen placement
  let winBbox = new BoundingBox();
  let screenBbox = new BoundingBox();

  // Measurements associated with game innards
  let gameBbox = new BoundingBox(0, 0);
  let gameLayoutGrid;

  // For cursor tracking
  let cursor = new Point();
  
  // For click tracking
  let click = new PollablePoint();

  // For key tracking
  let key = {key: undefined, useValue: false};

  // Audio context
  let audioCtx;
  

  // =========== FUNCS ON INTERVAL ===========

  function resizeScreen() {
    winBbox.width = window.innerWidth;
    winBbox.height = window.innerHeight;

    bgCanvas.width = winBbox.width;
    bgCanvas.height = winBbox.height;

    if (isConstrainedByWidth(winBbox.width, winBbox.height, Constant.AspectRatio)) {
      screenBbox.width = winBbox.width - winBbox.width * Constant.ScreenMargin;
      screenBbox.height = screenBbox.width / Constant.AspectRatio;
    }
    else {
      screenBbox.height = winBbox.height - winBbox.height * Constant.ScreenMargin;
      screenBbox.width = screenBbox.height * Constant.AspectRatio;
    }

    screenBbox.x = Math.trunc((winBbox.width - screenBbox.width) / 2);
    screenBbox.y = Math.trunc((winBbox.height - screenBbox.height) / 2);

    boardCanvas.width = fxCanvas.width = screenBbox.width;
    boardCanvas.height = fxCanvas.height = screenBbox.height;
    
    boardCanvas.style.left = fxCanvas.style.left = screenBbox.x + "px";
    boardCanvas.style.top  = fxCanvas.style.top  = screenBbox.y + "px";

    gameBbox.width  = screenBbox.width;
    gameBbox.height = screenBbox.height;

    gameLayoutGrid = new LayoutGrid(gameBbox, 24);

    layouts = makeAllLayouts();

  }

  function trackCursor(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  }

  function trackClick(e) {
    click.x = e.clientX;
    click.y = e.clientY;
    click.useValue = isPolling;
  }

  function trackKeydown(e) {
    if (e.repeat) return;
    key.key = e.key;
    key.useValue = isPolling;
  }

  // =========== PUBLIC FUNCTIONS ===========
  
  function init() {
    boardCanvas = document.createElement("canvas");
    bgCanvas = document.createElement("canvas");
    fxCanvas = document.createElement("canvas");
    
    boardCtx = boardCanvas.getContext("2d");
    bgGl = bgCanvas.getContext("webgl2");
    fxGl = fxCanvas.getContext("webgl2");

    bgCanvas.style.position    = "absolute";
    boardCanvas.style.position = "absolute";
    fxCanvas.style.position    = "absolute";

    bgCanvas.style.top = "0";
    bgCanvas.style.left = "0";

    bgCanvas.style.zindex    = "1";
    boardCanvas.style.zindex = "2";
    fxCanvas.style.zindex    = "3";

    document.body.appendChild(bgCanvas);
    document.body.appendChild(boardCanvas);
    document.body.appendChild(fxCanvas);

    resizeScreen();

    window.addEventListener("resize", resizeScreen);
    window.addEventListener("mousemove", trackCursor);
    window.addEventListener("click", trackClick);
    window.addEventListener("keydown", trackKeydown);

    audioCtx = new AudioContext();
  }

  // =========== HELPER DRAWING FUNCTIONS (BOARD) ===========

  // { START STACK OVERFLOW CODE }
  // taken from: https://stackoverflow.com/a/3368118
  function roundRect(
    ctx,
    x,
    y,
    width,
    height,
    radius = 5,
    fill = false,
    stroke = true
  ) {
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      radius = {...{tl: 0, tr: 0, br: 0, bl: 0}, ...radius};
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }
  // { END STACK OVERFLOW CODE }

  // =========== DRAWING FUNCTIONS (BOARD) ===========

  // assuming it's passed a square bbox
  function drawGrid(ctx, bbox, dim, sqSubdivs=20, lineSubdivs=1) {
    ctx.strokeStyle = "#9E1919";
    let subdim = dim * sqSubdivs + lineSubdivs * 2;
    let subdiv = bbox.width / subdim;
    let squareSize = subdiv * sqSubdivs;
    let lineSize =  subdiv * lineSubdivs * 2;
    ctx.lineCap = "square";
    ctx.lineWidth = lineSize;
    let x = bbox.x + subdiv;
    let y = bbox.y + subdiv;
    for (let i = 0; i <= dim; i++) {
      ctx.moveTo(
        x + i * squareSize,
        y
      );
      ctx.lineTo(
        x + i * squareSize,
        y + squareSize * dim
      );
      ctx.moveTo(
        x,
        y + i * squareSize
      );
      ctx.lineTo(
        x + squareSize * dim,
        y + i * squareSize
      );
    }
    ctx.stroke();
  }


  // =========== FRAME RENDER FUNCTIONS ===========

  function setFrameRenderFunc(func) {
    if (frameRenderFunc && intervalFuncCode) {
      clearInterval(intervalFuncCode);
    }
    frameRenderFunc = func;
    intervalFuncCode = setInterval(func, Constant.FrameInterval);
  }

  function highlightBbox(bbox) {
    boardCtx.fillStyle = "rgb(0, 0, 0, 0.5)";
    boardCtx.fillRect(bbox.x, bbox.y, bbox.width, bbox.height);
  }

  // =========== LOGIC & ROUTING ===========

  // This routes messages to sub-functions of the UI that handle a specific state of the game
  async function receiveMessage(msg) {
    EventInfo.invalidate();
    switch (msg.code) {
      case mcode.ShowTitleScreen:
        return await ShowTitleScreen();
      case mcode.ShowRuleSelect:
        return await RuleSelect();
      case mcode.ShowBoard:
        switch (msg.content.gamemode) {
          case gmode.PlaceShips:
            return await PlaceShipsStep(msg);
          case gmode.MainGame:
            return await MainGameStep(msg);
        }
      case mcode.PlacementResult:
      case mcode.BadPlacement:
        return await PlaceShipStep(msg);
      case mcode.EndPlacementMode:
        return await TransitionToMainGame();
      case mcode.ShotResult:
      case mcode.BadShot:
        return await MainGameStep(msg);
    }
  }


  async function ShowTitleScreen() {
    let innerEvent;
    isPolling = true;
    let eventInfo = new EventInfo();
    while (true) {
      eventInfo.latest();
      innerEvent = layouts.titleScreen.render(boardCtx, eventInfo);
      if (innerEvent.code == uie.ButtonClick) {
        let msgBack = {
          code: m2gmcode.StartGame
        };
        return msgBack;
      }
      await sleep(Constant.FrameInterval);
    }
  }

  async function RuleSelect() {
    let innerEvent;
    isPolling = true;
    let eventInfo = new EventInfo();
    while (true) {
      eventInfo.latest();
      innerEvent = layouts.ruleSelect.render(boardCtx, eventInfo);
      if (innerEvent.code == uie.ButtonClick) {
        let msgBack = {
          code: m2gmcode.RuleSelect,
          content: {
            rules: innerEvent.content.button
          }
        };
        return msgBack;
      }
      await sleep(Constant.FrameInterval);
    }
  }

  

  // =========== DEBUG ===========

  
  let debugfn = {};
  if (DEBUG) {
    debugfn = { ShowTitleScreen };
  }
    
  // =========== RETURNING PUBLIC MEMBERS ===========

  return { init, receiveMessage, debugfn };
}
