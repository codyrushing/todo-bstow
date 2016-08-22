const ReactDOM = require("react-dom");

const TodoApp = require("./TodoApp");

var App = {
  init: function(){
    document.addEventListener("DOMContentLoaded", this.DOMReady.bind(this))
  },
  DOMReady: function(){
    // bind React container component to
  }
};

Object.create(App).init()
