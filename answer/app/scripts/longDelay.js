(function(window, $) {
  'use strict';
  var app = window.app || {};
  // 一秒後にHelloと表示する関数
  app.longDelay = function(rejectFlg) {
    var d = new $.Deferred();
    setTimeout(function() {
      if (rejectFlg) {
        d.reject();
        return;
      }
      console.log('LongDelay Hello');
      d.resolve();
    }, 5000);
    return d.promise();
  };
  window.app = app;
})(window, jQuery);
