(function(window) {
  'use strict';
  var app = window.app || {};
  app.heavyAjax = function(callback) {
    setTimeout(function() {
      callback();
    }, 5);
  };
  window.app = app;
})(window);
