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

  // =========== HELPER CLASSES, FUNCTIONS ===========

  function isConstrainedByWidth(width, height, wToH) {
    if (width / height <= wToH) {
      return true;
    }
    return false;
  }

  function BoundingBox(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerIn = function(container) {
      this.centerXIn(container);
      this.centerYIn(container);
    };
    this.centerXIn = function(container) {
      this.x = container.x + math.trunc((container.width - this.width) / 2);
    };
    this.centerYIn = function(container) {
      this.y = container.y + math.trunc((container.height - this.height) / 2);
    };
    this.scaleTo = function(container, margin) {
      wToH = this.width / this.height;
      wToHContainer = container.width / container.height;
    };
  }

  function LayoutGrid(bbox, xDivs, yDivs) {
    this.sectionWidth = bbox.width / xDivs;
    this.sectionHeight = bbox.height / yDivs;
    this.xDivs = xDivs;
    this.yDivs = yDivs;
    this.makeBbox = function(x1=0, x2=xDivs, y1=0, y2=yDivs) {
      startX = x1 * sectionWidth;
      width = (x2 * sectionWidth) - startX;
      startY = y1 * sectionHeight;
      height = (y2 * sectionHeight) - startY;
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

  // =========== VARS ===========

  // DEBUG mode
  const DEBUG = true;

  // functions on intervals that need to be revoked/set differently
  let frameRenderFunc;
  
  // Holds current layout
  let layout;
  
  // HTML canvas elements and associated contexts
  let boardCanvas, boardCtx;
  let boardCanvasBuffer, boardCtxBuffer;
  let bgCanvas, bgGl;
  let fxCanvas, fxGl;

  // Measurements positions for screen placement
  let winBbox = new BoundingBox();
  let screenBbox = new BoundingBox();

  // Measurements associated with game innards
  let gameBbox = new BoundingBox(0, 0);
  let gridBbox  = new BoundingBox();

  // For cursor tracking
  let cursor = new Point();
  
  // For click tracking
  let click = new Point();

  // For key tracking
  let key = {key: undefined};

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

    if (frameRenderFunc) {
      frameRenderFunc();
    }
  }

  function trackCursor(e) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  }

  function trackClick(e) {
    click.x = e.clientX;
    click.y = e.clientY;
  }

  function trackKey(e) {
    key.key = e.key;
  }

  // =========== PUBLIC FUNCTIONS ===========
  
  function init() {
    boardCanvas = document.createElement("canvas");
    boardCanvasBuffer = document.createElement("canvas");
    bgCanvas = document.createElement("canvas");
    fxCanvas = document.createElement("canvas");
    
    boardCtx = boardCanvas.getContext("2d");
    boardCtxBuffer = boardCanvasBuffer.getContext("2d");
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
    window.document.addEventListener("mousemove", trackCursor);
    window.document.addEventListener("click", trackClick);
    window.document.addEventListener("keydown", trackKey);

    audioCtx = new AudioContext();
  }

  // message reception function -- handles actual logic
  function receiveMessage(msg) {
    
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

  // DEBUG -- REMOVE LATER
  let drawTestGrid = () => drawGrid(boardCtx, gameBbox, 10);


  // =========== FRAME RENDER FUNCTIONS ===========

  function setFrameRenderFunc(func) {
    if (frameRenderFunc) {
      clearInterval(frameRenderFunc);
    }
    frameRenderFunc = func;
    setInterval(frameRenderFunc, 150);
  }

  function testFrameFunc() {
    boardCtx.clearRect(0, 0, screenBbox.width, screenBbox.height);
    drawTestGrid();
    if (cursor.in(screenBbox)) {
      boardCtx.fillStyle = "rgb(0, 0, 0, 0.5)";
      boardCtx.fillRect(0, 0, screenBbox.width, screenBbox.height);
    }
  }

  // =========== DEBUG ===========

  
  let debugfn = {};
  if (DEBUG) {
    let layout = new LayoutGrid(gameBbox, 10, 10);
    setFrameRenderFunc(testFrameFunc);
    debugfn = { drawTestGrid };
  }
    
  // =========== RETURNING PUBLIC MEMBERS ===========

  return { init, receiveMessage, debugfn };
}