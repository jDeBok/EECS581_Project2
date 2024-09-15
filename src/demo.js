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

UI = UIConstructor();

UI.init();
async function run() {
  await UI.receiveMessage({ code: MessageToUICode.ShowTitleScreen });
}

run();


// class GameMaster {
//   constructor() {
//     this.ui = new UI();
//     this.gm = new GameModel();
//     this.msgToUI = null;
//     this.msgToGm = null;
//   }
// 
//   init() {
//     ui.init();
//     msgToUI = gameModel.init();
//   }
// 
//   run() {
//     msgToGm = ui.run(msgToUI);
//     msgToUI = gm.run(msgToGm);
//   }
// }
