/* 
 * Program Name:
 * Demo module
 * 
 * Description:
 * Builds and tests UI
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

/* code for testing 

UI = UIConstructor();

UI.init();
async function run() {
  await UI.receiveMessage({ code: MessageToUICode.ShowTitleScreen });
}

run();


"use strict"

async function main(game) {
  game.init();
  game.run();
}
*/

class GameMaster {
  constructor() {
    this.ui = UIConstructor;
    this.gm = new GameModel();
    this.msgToUI = null;
    this.msgToGm = null;
  }

  init() {
    ui.init();
    msgToUI = gameModel.init();
  }

  async run() {
    msgToGm = ui.run(msgToUI);
    msgToUI = gm.run(msgToGm);
  }
}

const game = new GameMaster();

await main(game);
