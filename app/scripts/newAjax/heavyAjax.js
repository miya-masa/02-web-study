(function(window, $) {
  'use strict';
  var app = window.app || {};
  app.newAjax = app.newAjax || {};
  app.newAjax.heavyAjax = function() {
    var d = new $.Deferred();
    setTimeout(function() {
      d.resolve();
    }, 5);
    return d.promise();
  };
  window.app = app;
})(window, jQuery);
