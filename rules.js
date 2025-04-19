class Start extends Scene {
    create() {
        this.engine.strikes = 0;
        this.engine.maxstrikes = 3;
        this.engine.nodecomplete = 0;
        this.engine.maxnodecomplete = 3;
        this.engine.wirescompleted = false;
        this.engine.keypadcompleted = false;
        this.engine.buttoncompleted = false;

        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.show(this.engine.storyData.Description); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Start Game");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if (locationData.Choices && locationData.Choices.length > 0) {
            for (let choice of locationData.Choices) {
                if (choice.Text === "Wires" && this.engine.wiresdone === true) {
                    this.engine.wirescompleted = true;
                    continue;
                }
                if (choice.Text === "Keypad" && this.engine.keypaddone === true) {
                    this.engine.keypadcompletedcompleted = true;
                    continue;
                }
                if (choice.Text === "Button" && this.engine.buttondone === true) {
                    this.engine.buttoncompletedcompleted = true;
                    continue;
                }
    
                this.engine.addChoice(choice.Text, choice);

            }
        }
    }

    handleChoice(choice) {
        
        if (choice.wiresdone === true) {
            this.engine.wiresdone = true;
        }
        if (choice.keypaddone === true) {
            this.engine.keypaddone = true;
        }
        if (choice.buttondone === true) {
            this.engine.buttondone = true;
        }
        
        if (choice.Strike === true) {
            this.engine.strikes++;
            if (this.engine.strikes >= this.engine.maxstrikes) {
                this.engine.gotoScene(Location, "Lose");
                return;
            }
        }

        if (choice.Completed === true || choice.nodestatus === true) {
            this.engine.nodecomplete++;
            if (this.engine.nodecomplete >= this.engine.maxnodecomplete) {
                this.engine.gotoScene(Location, "CompletedBombpanel");
                return;
            }
        }
        
        if(choice) {
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');