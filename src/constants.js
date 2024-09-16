/* 
 * Program Name:
 * Constants module
 * 
 * Description:
 * Instantiates global constants for game rendering
 * 
 * Code sources:
 * Self
 * 
 * Author:
 * Code: Jake Bernard
 * 
 * Creation Date:
 * 2024-09-08
 * 
 */

// Collection of generic numeric constants
const Constant = Object.freeze({
  // the aspect ratio of the game screen
  AspectRatio: 1,
  // the margins around the screen (will be divided by two)
  ScreenMargin: 0.05,
  // the amount of ms between frames -- 50 amounts to 20fps
  FrameInterval: 50
});

// some defined colors used throughout the program
const Color = Object.freeze({
  // for a general menu background
  Bg: "#283745",
  // for the edges of the menu
  BgStroke: "#161F26",
  // for the background of a text box
  TextBox: "#B4BBCD",
  // for the outline of a text box
  TextBoxStroke: "#161F26",
  // for the text in a text box
  TextColor: "#161F26",
  // a shade of red
  RedTruth: "#9E1919",
  // a shade of green
  HitGreen: "#23A241"
});
