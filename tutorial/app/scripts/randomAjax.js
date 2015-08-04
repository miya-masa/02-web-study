(function(window) {
  'use strict';
  var app = window.app || {};
  app.randomAjax = function(callback) {
    var random = Math.floor(Math.random() * 10);
    setTimeout(function() {
      callback();
    }, random);
  };
  window.app = app;
})(window);
