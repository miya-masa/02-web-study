(function(window) {
  'use strict';
  var app = window.app || {};
  app.newAjax = app.newAjax || {};
  app.newAjax.lightAjax = function() {
    var d = new $.Deferred();
    setTimeout(function() {
      d.resolve();
    }, 1);
    return d.promise();
  };
  window.app = app;
})(window);
