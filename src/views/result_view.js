const PubSub = require("../helpers/pub_sub.js");

const ResultView = function(container) {
  this.container = document.querySelector(container)
};

ResultView.prototype.bindEvents = function () {
  console.log("Lllllllll")
  PubSub.subscribe("Munro:selected", event => {
    const selectedMunros = event.detail;
    console.log(selectedMunros,"ResultView");
    this.display(selectedMunros);
  });
};

ResultView.prototype.display = function (munros) {
  // const divmunro = document.querySelector(this.container)
  this.container.innerHTML = '';
  const allMunros = document.createElement('div')
  munros.forEach((munro) => {
    const munroName = document.createElement('h2')
    munroName.textContent = munro.name;
    const list = document.createElement("ul")
    const meaning = document.createElement("li")
    meaning.textContent = `Munro meaning: ${ munro.meaning } `
    list.appendChild(meaning);
    const height = document.createElement("li")
    height.textContent = `Munro height: ${ munro.height }m`;
    list.appendChild(height);
    allMunros.appendChild(munroName);
    allMunros.appendChild(list)

  })
  console.log(allMunros)
  this.container.appendChild(allMunros)

};
module.exports = ResultView;
