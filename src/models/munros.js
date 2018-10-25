const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js")
const ResultView = require('../views/result_view.js');

const Munros = function(){
    this.data = null;
};

Munros.prototype.getData = function (munroData) {
  const url = `https://munroapi.herokuapp.com/api/munros`
  const request = new RequestHelper(url);
  request.get()
  .then((data) => {
    this.data = data;
    console.log(this.data,"data");
    PubSub.publish("Munros:munros-ready", data);
  })
  .catch((error) => {
    PubSub.publish("Munros:error", error);
  });
  PubSub.subscribe("SelectView:change", (event) => {
    const selectedRegion = event.detail;
    this.publishMunro(selectedRegion);
  })
}

Munros.prototype.publishMunro = function (region){
  const resultView = new ResultView('div#munros');
  resultView.bindEvents()
  const selectedMunros = this.data.filter((munro) => munro.region == region);
  PubSub.publish("Munro:selected", selectedMunros);



}

module.exports = Munros;
