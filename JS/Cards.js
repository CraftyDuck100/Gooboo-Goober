let cardStuff = getCardData();

function predictCards() {
    const div = document.getElementById("div1");
    while(div.firstChild) {
        div.removeChild(div.firstChild);
    }
    let pack = cardStuff.packs.horde.taintedWorld
    var prog = typeof parseInt(document.getElementById('cardRng').value) === "number" ? document.getElementById('cardRng').value : 0;
    for (let i = 0; i < 10; i++) {
      let rngGen = new Math.seedrandom(document.getElementById('playerID').value + "cardPack_" + "taintedWorld" + "_" + (parseInt(prog) + i));
      let cacheWeight = [];
      let cacheContent = [];
      for (const [key, elem] of Object.entries(pack.content)) {
          cacheWeight.push(elem);
          cacheContent.push(key);
      }
      for (let j = 0, m = pack.amount; j < m; j++) {
          const cardChosen = cacheContent[weightSelect(cacheWeight, rngGen())];
          outputText(cardStuff.names[cardChosen]);
      }
    }
}