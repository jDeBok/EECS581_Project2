//Probably incorrect/messy
//am working on it rn --Alex


class GameMaster {
    constructor() {
        this.ui = UI.getInstance();          // Singleton instance of UI
        this.gameModel = GameModel.getInstance(); // Singleton instance of GameModel
        this.messageToUI = null;             // Message received from GameModel to UI
        this.messageToGameModel = null;      // Message received from UI to GameModel
    }

    init() {
        // Initialize both UI and GameModel
        this.ui.init();
        this.gameModel.init();

        // Start the game with RuleSelect state and get the initial message to pass to UI
        this.messageToUI = this.gameModel.recieveMessage({
            code: MessageToGameModelCode.RuleSelect,
            content: {
                rules: {}, // You can define or customize game rules here
            }
        });

        // Send the first message to UI
        this.ui.recieveMessage(this.messageToUI);
    }

    run() {
        // Initialize the game
        this.init();

        // Start the game loop
        while (true) {
            // Query the UI to get the next message
            this.messageToGameModel = this.ui.receiveMessage();

            // Send the message to GameModel and receive a response
            this.messageToUI = this.gameModel.recieveMessage(this.messageToGameModel);

            // Send the updated message back to UI
            this.ui.recieveMessage(this.messageToUI);

            // Depending on the game state, you might break out of the loop when the game ends
            if (this.messageToUI.code === MessageToUICode.GameOver) {
                console.log("Game Over");
                break;
            }
        }
    }
}

// Assuming a singleton pattern for both UI and GameModel classes
class UI {
    static instance = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new UI();
        }
        return this.instance;
    }

    init() {
        // Initialize the UI, set up event handlers, etc.
        console.log("UI initialized");
    }

    recieveMessage(message) {
        // Handle the message from GameMaster/GameModel
        console.log("UI received message:", message);
    }

    receiveMessage() {
        // Simulate UI sending a message to GameModel
        return {
            code: MessageToGameModelCode.MakeShot,
            content: {
                x_val: 0, // Example coordinates
                y_val: 1,
                player: Player.P1,
            }
        };
    }
}
