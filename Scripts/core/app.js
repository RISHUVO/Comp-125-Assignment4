(function () {
    // Function scoped Variables
    let stage;
    let assets;
    let slotMachineBackground;
    let resetButton;
    let spinButton;
    let bet1Button;
    let bet10Button;
    let bet100Button;
    let betMaxButton;
    let jackPotLabel;
    let creditLabel;
    let winningsLabel;
    let betLabel;
    let leftReel;
    let middleReel;
    let rightReel;
    let betLine;

    // TO ensure user propablay win jackpot after 10 tries
    let spin_tried = 0;

    // symbol tallies
    let grapes = 0;
    let bananas = 0;
    let oranges = 0;
    let cherries = 0;
    let bars = 0;
    let bells = 0;
    let sevens = 0;
    let blanks = 0;
    let manifest = [
        { id: "background", src: "./Assets/images/background.png" },
        { id: "banana", src: "./Assets/images/banana.gif" },
        { id: "bar", src: "./Assets/images/bar.gif" },
        { id: "bell", src: "./Assets/images/bell.gif" },
        { id: "bet_line", src: "./Assets/images/bet_line.gif" },
        { id: "bet1Button", src: "./Assets/images/bet1Button.png" },
        { id: "bet10Button", src: "./Assets/images/bet10Button.png" },
        { id: "bet100Button", src: "./Assets/images/bet100Button.png" },
        { id: "betMaxButton", src: "./Assets/images/betMaxButton.png" },
        { id: "blank", src: "./Assets/images/blank.gif" },
        { id: "cherry", src: "./Assets/images/cherry.gif" },
        { id: "grapes", src: "./Assets/images/grapes.gif" },
        { id: "orange", src: "./Assets/images/orange.gif" },
        { id: "seven", src: "./Assets/images/seven.gif" },
        { id: "spinButton", src: "./Assets/images/spinButton.png" },
        { id: "resetButton", src: "./Assets/images/spinButton.png" },
    ];
    // This function triggers first and "Preloads" all the assets
    function Preload() {
        assets = new createjs.LoadQueue();
        assets.installPlugin(createjs.Sound);
        assets.on("complete", Start);
        assets.loadManifest(manifest);
    }
    // This function triggers after everything has been preloaded
    // This function is used for config and initialization
    function Start() {
        console.log("App Started...");
        let canvas = document.getElementById("canvas");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 FPS or 16.667 ms
        createjs.Ticker.on("tick", Update);
        stage.enableMouseOver(20);
        Config.Globals.AssetManifest = assets;
        Main();
    }
    // called every frame
    function Update() {
        stage.update();
    }
    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value, lowerBounds, upperBounds) {
        if (value >= lowerBounds && value <= upperBounds) {
            return value;
        }
        else {
            return !value;
        }
    }
    /* When this function is called it determines the betLine results.
    e.g. Bar - Orange - Banana */
    function Reels() {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];
        /*
        let animate_fruits = ["blank", "grapes", "banana", "orange", "cherry", "bar", "bell", "seven"];
        let count = 0;
        // Show some animation
        for (var animation = 0; animation < 1500; animation++) {
            leftReel.image = assets.getResult(animate_fruits[count]);
            middleReel.image = assets.getResult(animate_fruits[count++]);
            rightReel.image = assets.getResult(animate_fruits[count++]);
            count++;
            if (count > animate_fruits.length)
                count=0;
        }
        */
        // Get Reel Output
        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case checkRange(outCome[spin], 1, 27): // 41.5% probability
                    betLine[spin] = "blank";
                    blanks++;
                    break;
                case checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "grapes";
                    grapes++;
                    break;
                case checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "banana";
                    bananas++;
                    break;
                case checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "orange";
                    oranges++;
                    break;
                case checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "cherry";
                    cherries++;
                    break;
                case checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "bar";
                    bars++;
                    break;
                case checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "bell";
                    bells++;
                    break;
                case checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "seven";
                    sevens++;
                    break;
            }
        }
        return betLine;
    }
    function buildInterface() {
        // Slot Machine Background
        slotMachineBackground = new Core.GameObject("background", Config.Screen.CENTER_X, Config.Screen.CENTER_Y, true);
        stage.addChild(slotMachineBackground);
        // Buttons
        spinButton = new UIObjects.Button("spinButton", Config.Screen.CENTER_X + 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(spinButton);
        bet1Button = new UIObjects.Button("bet1Button", Config.Screen.CENTER_X - 135, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet1Button);
        bet10Button = new UIObjects.Button("bet10Button", Config.Screen.CENTER_X - 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet10Button);
        bet100Button = new UIObjects.Button("bet100Button", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(bet100Button);
        betMaxButton = new UIObjects.Button("betMaxButton", Config.Screen.CENTER_X + 67, Config.Screen.CENTER_Y + 176, true);
        stage.addChild(betMaxButton);

        
        
        // Labels
        jackPotLabel = new UIObjects.Label("00000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 175, true);
        stage.addChild(jackPotLabel);
        creditLabel = new UIObjects.Label("00001000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X - 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(creditLabel);
        winningsLabel = new UIObjects.Label("00000000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X + 94, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(winningsLabel);
        betLabel = new UIObjects.Label("0000", "20px", "Consolas", "#FF0000", Config.Screen.CENTER_X, Config.Screen.CENTER_Y + 108, true);
        stage.addChild(betLabel);
        // Reel GameObjects
        leftReel = new Core.GameObject("bell", Config.Screen.CENTER_X - 79, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(leftReel);
        middleReel = new Core.GameObject("banana", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(middleReel);
        rightReel = new Core.GameObject("bar", Config.Screen.CENTER_X + 78, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(rightReel);
        // Bet Line
        betLine = new Core.GameObject("bet_line", Config.Screen.CENTER_X, Config.Screen.CENTER_Y - 12, true);
        stage.addChild(betLine);
    }
    function interfaceLogic() {
        spinButton.on("click", () => {
            // Play sound
            let audio = document.getElementById('play_sound');
            audio.src = "./Assets/sounds/click.mp3";
            audio.play();
            // Check Either user selected bet or not
            if (parseInt(betLabel.text, 10)==0){
                alert('Please select your bet');
                return false;
            }
            // Check if credit is less than the bet amount
            spinButton.mouseEnabled = (parseInt(creditLabel.text, 10) >= parseInt(betLabel.text, 10)) ? true : false;
            if (!spinButton.mouseEnabled) {
                alert("Not Enough Credit Available for " + betLabel.text+ " Bet");
                return false;
            }
            // Deduct the credit of the spin bet
            creditLabel.text = parseInt(creditLabel.text, 10) - parseInt(betLabel.text, 10);
            // Incrememnt spin tries
            spin_tried++;
            // reel test
            let reels = Reels();
            // Check if user have won or not and assign points accordingly
            if (reels[0] == reels[1] && reels[1]==reels[2]) {
                if (reels[0]=="blank"){
                    reels[0] = reels[1] = reels[2] = "grapes";
                }
                jackPotLabel.text  = parseInt(betLabel.text, 10) * 100;
                winningsLabel.text = parseInt(winningsLabel.text, 10) + parseInt(jackPotLabel.text, 10);
                creditLabel.text = parseInt(creditLabel.text, 10) + parseInt(jackPotLabel.text, 10);
                spin_tried=0;
                let audio = document.getElementById('play_sound');
                audio.src = "./Assets/sounds/win.mp3";
                audio.play();
            } else if (spin_tried>10){
                jackPotLabel.text = parseInt(betLabel.text, 10) * 100;
                winningsLabel.text = parseInt(winningsLabel.text, 10) + parseInt(jackPotLabel.text, 10);
                creditLabel.text = parseInt(creditLabel.text, 10) + parseInt(jackPotLabel.text, 10);
                reels[0] = (reels[0] != "blank") ? reels[0] : reels[1];
                reels[0] = (reels[0] != "blank") ? reels[0] : reels[2];
                reels[0] = (reels[0] == "blank") ? "cherry" : reels[0];

                reels[0] = reels[0];
                reels[1] = reels[0];
                reels[2] = reels[0];
                spin_tried=0;
                let audio = document.getElementById('play_sound');
                audio.src = "./Assets/sounds/win.mp3";
                audio.play();
            }
            else if (reels[0] == reels[1] || reels[1] == reels[2] || reels[0] == reels[2]){
                jackPotLabel.text = parseInt(betLabel.text, 10) * 10;
                winningsLabel.text = parseInt(winningsLabel.text, 10) + parseInt(jackPotLabel.text, 10);
                creditLabel.text = parseInt(creditLabel.text, 10) + parseInt(jackPotLabel.text, 10);
            }else{
                jackPotLabel.text = parseInt(betLabel.text, 10) * 0.5;
                winningsLabel.text = parseInt(winningsLabel.text, 10) + parseInt(jackPotLabel.text, 10);
                creditLabel.text = parseInt(creditLabel.text, 10) + parseInt(jackPotLabel.text, 10);
            }
            // example of how to replace the images in the reels
            leftReel.image = assets.getResult(reels[0]);
            middleReel.image = assets.getResult(reels[1]);
            rightReel.image = assets.getResult(reels[2]);
        });
        bet1Button.on("click", () => {
            betLabel.text="1";
            spinButton.mouseEnabled = (parseInt(creditLabel.text, 10) >= parseInt(betLabel.text,10) ) ? true : false;
            if (!spinButton.mouseEnabled) {
                alert("Not Enough Credit Available");
            }else{
                let audio = document.getElementById('play_sound');
                audio.src = "./Assets/sounds/coins.mp3";
                audio.play();
            }
        });
        bet10Button.on("click", () => {
            betLabel.text = "10";
            spinButton.mouseEnabled = (parseInt(creditLabel.text, 10) >= parseInt(betLabel.text, 10)) ? true : false;
            if (!spinButton.mouseEnabled) {
                alert("Not Enough Credit Available");
            }else{
                let audio = document.getElementById('play_sound');
                audio.src = "./Assets/sounds/coins.mp3";
                audio.play();
            }
        });
        bet100Button.on("click", () => {
            betLabel.text = "100";
            spinButton.mouseEnabled = (parseInt(creditLabel.text, 10) >= parseInt(betLabel.text, 10)) ? true : false;
            if (!spinButton.mouseEnabled) {
                alert("Not Enough Credit Available");
            }else{
                let audio = document.getElementById('play_sound');
                audio.src = "./Assets/sounds/coins.mp3";
                audio.play();
            }
        });
        betMaxButton.on("click", () => {
            betLabel.text = "9999";
            spinButton.mouseEnabled = (parseInt(creditLabel.text, 10) >= parseInt(betLabel.text, 10)) ? true : false;
            if (!spinButton.mouseEnabled){
                alert("Not Enough Credit Available");
            }else{
                let audio = document.getElementById('play_sound');
                audio.src = "./Assets/sounds/coins.mp3";
                audio.play();
            }
        });
        document.getElementById("reset_button").addEventListener("click", function () {
            // Play sound
            let audio = document.getElementById('play_sound');
            audio.src = "./Assets/sounds/click.mp3";
            try { audio.play(); } catch (e) { console.log(e) }
            Main();
        });
        document.getElementById("quit_button").addEventListener("click", function () {
            // Play sound
            let audio = document.getElementById('play_sound');
            audio.src = "./Assets/sounds/click.mp3";
            try { audio.play(); } catch (e) { console.log(e) }
            Main();
        });
    }
    // app logic goes here
    function Main() {
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener("load", Preload);
})();
//# sourceMappingURL=app.js.map