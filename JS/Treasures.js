let colors = ['white', 'yellow', 'orange', 'red', 'pink', 'purple', 'indigo', 'blue', 'teal', 'green', 'light-green', 'lime', '#FFC107', 'orange-red', 'red-pink', 'pink-purple', 'dark-blue', 'light-blue', 'cyan']
function startGame() {
    //let rngGen = rootGetters['system/getRng']('treasure_' + type, rngSkip);
    let chosenEffect = [];
    iconList = [
        'mdi-star', 'mdi-hexagram', 'mdi-star-four-points', 'mdi-star-three-points', 'mdi-lightning-bolt',
        'mdi-spear', 'mdi-stamper', 'mdi-magnify', 'mdi-shaker', 'mdi-checkerboard', 'mdi-sd', 'mdi-bullseye',
        'mdi-spa', 'mdi-sim', 'mdi-drama-masks', 'mdi-tag', 'mdi-water-pump', 'mdi-asterisk', 'mdi-filmstrip',
        'mdi-pillar', 'mdi-vhs'
    ]
    let effectList = [
        "miningDamage",
        "currencyMiningScrapGain",
        "miningOreGain"
    ]

    const div = document.getElementById("div1");
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }

    var save = JSON.parse(document.getElementById("saveData").innerHTML);
    var unlocks = save.unlock;
    "miningSmeltery" in unlocks ? effectList.push("miningSmelterySpeed") : null;
    "miningSmoke" in unlocks ? effectList.push("currencyMiningSmokeGain") : null;
    effectList.push("queueSpeedVillageBuilding");
    effectList.push("villageMaterialGain");
    effectList.push("currencyVillageCoinGain");
    effectList.push("villageMentalGain");
    "hordeFeature" in unlocks ? effectList.push("hordeAttack") : null;
    "hordeFeature" in unlocks ? effectList.push("currencyHordeBoneGain") : null;
    "hordeFeature" in unlocks ? effectList.push("currencyHordeMonsterPartGain") : null;
    "hordeItemMastery" in unlocks ? effectList.push("hordeItemMasteryGain") : null;
    effectList.push("currencyFarmVegetableGain");
    effectList.push("currencyFarmFruitGain");
    effectList.push("currencyFarmGrainGain");
    effectList.push("currencyFarmFlowerGain");
    "galleryFeature" in unlocks ? effectList.push("currencyGalleryBeautyGain") : null;
    "galleryConversion" in unlocks ? effectList.push("currencyGalleryConverterGain") : null;
    "galleryDrums" in unlocks ? effectList.push("currencyGalleryPackageGain") : null;

    for(let i = 0; i < 99; i++) {
        // Tier Rolling
        var tierRng = typeof parseInt(document.getElementById('tierRng').value) === "number" ? document.getElementById('tierRng').value : 0;
        let tierGen = new Math.seedrandom(document.getElementById('playerID').value + "treasureTier_regular" + '_' + (parseInt(tierRng) + i));
        const nextChance = tierGen()
        let tier = null;
        let totalChance = 0;
        tierChancesRaw().forEach(elem => {
            totalChance += elem.chance;
            if (tier === null && chance(totalChance, nextChance)) {
                tier = elem.tier;
            }
        })

        // Treasure Type + Output
        var treasureRng = typeof parseInt(document.getElementById('treasureRng').value) === "number" ? document.getElementById('treasureRng').value : 0;
        let rngGen = new Math.seedrandom(document.getElementById('playerID').value + "treasure_regular" + '_' + (parseInt(treasureRng) + i));
        outputText((i + 1) + ". " + String(randomElem(effectList, rngGen()) + ", " + randomElem(iconList, rngGen())), tier);
    }
}
function outputText(text, color = 0) {
    const para = document.createElement("p");
    para.style.color = colors[color];
    para.style.textShadow = "-1px -1px 2px black, 1px 1px 2px black, 1px -1px 2px black, -1px 1px 2px black, \
    -1px -1px 1px black, 1px 1px 1px black, 1px -1px 1px black, -1px 1px 1px black, \
    1px 0px 1px black, 0px 1px 1px black, -1px 0px 1px black, 0px -1px 1px black, \
    1px 0px 2px black, 0px 1px 2px black, -1px 0px 2px black, 0px -1px 2px black";
    para.style.fontSize = "19px";
    para.style.fontFamily = "Araboto";
    const node = document.createTextNode(text);
    para.appendChild(node);
    const element = document.getElementById("div1");
    element.appendChild(para);
}

function randomElem(array, rng = Math.random()) {
    return array[randomInt(0, array.length - 1, rng)];
}
function randomInt(min, max, rng = Math.random()) {
    return Math.floor(rng * (1 + max - min) + min);
}
function tierChances() {
    let chances = [];
    var globalLevel = typeof parseInt(document.getElementById('GL').value) === "number" ? document.getElementById('GL').value : 200;
    let chanceValue = globalLevel / 1000;

    while (chanceValue > 0) {
        chances.push(chanceValue);

        chanceValue *= 0.9;
        chanceValue -= 0.2;
    }

    return chances;
}
function chance(chance, rng = Math.random()) {
    return rng < chance;
}
function tierChancesRaw() {
    let arr = [];
    let tier = 0;
    let totalChance = 0;

    const upgradeChances = tierChances();

    if (upgradeChances.length <= 0) {
        return [{tier: 0, chance: 1}];
    }

    upgradeChances.forEach((elem, key) => {
        if (elem < 1) {
            const chance = (1 - totalChance) * (1 - elem)
            arr.push({tier, chance});
            totalChance += chance;
        }
        tier++;
        if ((key + 1) >= upgradeChances.length) {
            arr.push({tier, chance: (1 - totalChance)});
        }
    });
    return arr;
}
