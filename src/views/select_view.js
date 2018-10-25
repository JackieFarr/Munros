const RequestHelper = require("../helpers/request_helper.js");
const PubSub = require("../helpers/pub_sub.js");


const SelectView = function(element){
  this.element = element;
};

SelectView.prototype.bindEvents = function () {
  console.log("HELO");
  PubSub.subscribe("Munros:munros-ready", (event) =>
{
  const allMunros = event.detail;
  this.populate(allMunros)
})

this.element.addEventListener("change", (event) => {
  const selectedRegion = event.target.value;

  PubSub.publish("SelectView:change", selectedRegion);
})
};

SelectView.prototype.populate = function (data) {
const regions = data.map(munro => munro.region)
   .filter((region, index, regions) => regions.indexOf(region) === index);
      regions.forEach((region) => {
    const option = document.createElement('option');
    option.textContent = region;
    option.value = region;
    this.element.appendChild(option);
  })
};

module.exports = SelectView;
