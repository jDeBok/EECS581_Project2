"use strict"

async function main(game) {
  game.init();
  game.run();
}




class GameMaster {
  constructor() {
    this.ui = UIConstructor();
    this.gm = new GameModel();
    this.msgToUI = null;
    this.msgToGm = null;
  }

  init() {
    ui.init();
    msgToUI = gameModel.init();
  }

  async run() {
    msgToGm = ui.receiveMessage(msgToUI);
    msgToUI = gm.receiveMessage(msgToGm);
  }
}

const game = new GameMaster();

main(game);
