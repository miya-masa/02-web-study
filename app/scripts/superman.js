(function(window) {
  'use strict';
  var app = window.app || {};
  app.Superman = function(name, greeting) {
    // 親のコンストラクタを呼ぶ簡単な方法
    app.Person.call(this, name, greeting);
  };
  // 指定したプロトタイプを持つオブジェクトの生成
  // つまりSuperman.prototypeはPerson.prototypeを参照するオブジェクト
  app.Superman.prototype = Object.create(app.Person.prototype, {
    constructor: {
      value: app.Superman,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  app.Superman.prototype.superHelloMessage = function() {
    return this.greeting + ' Superman ' + this.name;
  };
  app.Superman.prototype.fly = function() {
    console.log('I can fly. Booooooon.');
  };
  window.app = app;
})(window);
