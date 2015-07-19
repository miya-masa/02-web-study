(function(window) {
  'use strict';
  var app = window.app || {};
  app.newAjax = app.newAjax || {};
  app.newAjax.randomAjax = function() {
    var d = new $.Deferred();
    var random = Math.floor(Math.random() * 10);
    setTimeout(function() {
      d.resolve();
    }, random);
    return d.promise();
  };
  window.app = app;
})(window);
