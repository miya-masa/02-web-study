(function(window) {
  'use strict';
  var app = window.app || {};
  // app.Person
  // nameとgreetingを持つクラス
  // helloMessageを関数として持つ
  // 詳しい使用はpersonSpec.jsを参照すること
  app.Person = function(name, greeting) {
    this.name = name;
    this.greeting = greeting;
  };
  app.Person.prototype.helloMessage = function() {
    return this.greeting + ' ' + this.name;
  };
  window.app = app;
})(window);
