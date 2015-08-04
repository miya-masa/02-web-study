(function(window, $) {
  'use strict';
  var app = window.app || {};
  // 一秒後にHelloと表示する関数
  app.delay = function(rejectFlg) {
    var d = new $.Deferred();
    setTimeout(function() {
      if (rejectFlg) {
        d.reject();
        return;
      }
      console.log('Hello');
      d.resolve();
    }, 1000);
    return d.promise();
  };
  window.app = app;
})(window, jQuery);
