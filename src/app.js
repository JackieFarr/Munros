const SelectView = require('./views/select_view.js');
const Munros = require("./models/munros.js");
const ErrorView = require('./views/error_view.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

const info = document.querySelector("#munro-family");
const selectView = new SelectView(info);
selectView.bindEvents();

const munroData = new Munros()
munroData.getData()

const munros = document.querySelector("div#munros")
const errorView = new ErrorView(munros);
  errorView.bindEvents();

})
