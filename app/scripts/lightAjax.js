(function(window) {
  'use strict';
  var app = window.app || {};
  app.lightAjax = function(callback) {
    setTimeout(function() {
      callback();
    }, 1);
  };
  window.app = app;
})(window);
