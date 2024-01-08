function updateElement() {
  const option = document.getElementById("predict");
  if (option.value == "card") {
    predictCards();
    document.getElementById("treasureRng").style.display = "none";
    document.getElementById("tierRng").style.display = "none";
    document.getElementById("bingoPredictor").style.display = "none";
    document.getElementById("div1").style.display = "block";
    document.getElementById("cardRng").style.display = "inline";
  }
  if (option.value == "treasure") {
    startGame();
    document.getElementById("treasureRng").style.display = "inline";
    document.getElementById("tierRng").style.display = "inline";
    document.getElementById("cardRng").style.display = "none";
    document.getElementById("div1").style.display = "block";
    document.getElementById("bingoPredictor").style.display = "none";
  }
  if (option.value == "bingo") {
    parseWeights();
    predictBingo();
    document.getElementById("treasureRng").style.display = "none";
    document.getElementById("tierRng").style.display = "none";
    document.getElementById("bingoPredictor").style.display = "inline";
    document.getElementById("cardRng").style.display = "none";
    document.getElementById("div1").style.display = "none";
  }
}
function inputFile() {
    var file = document.getElementById("myFile").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var rawSave = evt.target.result;
            if (!evt.target.result.startsWith("{")) {
                var save = atob(rawSave)
            } else {var save = rawSave}
            document.getElementById("saveData").innerHTML = save;
            var dict = JSON.parse(save);

            document.getElementById("treasureRng").value = dict.rng.treasure_regular;
            document.getElementById("tierRng").value = dict.rng.treasureTier_regular;
            document.getElementById("cardRng").value = dict.rng.cardPack_rookieOnTheBattlefield;
            let levels = dict.globalLevel;
            document.getElementById("GL").value = (levels.mining_0 +
                (levels.hasOwnProperty("village_0") ? levels.village_0 : 0) +
                (levels.hasOwnProperty("horde_0") ? levels.horde_0 : 0) +
                (levels.hasOwnProperty("farm_0") ? levels.farm_0 : 0) +
                (levels.hasOwnProperty("gallery_0") ? levels.gallery_0 : 0)
            );
            document.getElementById("playerID").value = dict.playerId;
        }
        reader.onerror = function (evt) {
            document.getElementById("div1").innerHTML = "error reading file";
        }
        document.getElementById("button:D").style.display = "inline";
        document.getElementById("myFile").disabled = true;
    }
}

function unlockFile() {
    document.getElementById("button:D").style.display = "none";
    document.getElementById("myFile").disabled = false;
}

function weightSelect(weights, rng = Math.random()) {
    // exclude 1
    if (rng >= 1) {
        rng = 0.99999999;
    }

    let totalWeight = weights.reduce((a, b) => a + b, 0);
    let currentWeight = 0;
    let chosenValue = rng * totalWeight;

    return weights.findIndex((elem) => {
        if (currentWeight + elem > chosenValue) {
            return true;
        }
        currentWeight += elem;
        return false;
    })
}