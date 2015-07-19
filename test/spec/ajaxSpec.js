/* global describe, it, expect, app */
xdescribe('非同期制御', function() {
  'use strict';
  var Counter = function() {
    this.count = 0;
  }
  Counter.prototype.getCount = function() {
    return this.count;
  }
  Counter.prototype.countUp = function() {
    this.count++;
  };

  beforeEach(function() {
    jasmine.clock().install();
  });
  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('非同期の挙動', function() {
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();

    for (var i = 0; i < 5; ++i) {
      var no = i;
      app.lightAjax(function() {
        console.log('no' + light.getCount() + ':light Finished!!');
        light.countUp();
      });
      app.randomAjax(function() {
        console.log('no' + random.getCount() + ':random Finished!!');
        random.countUp();
      });
      app.heavyAjax(function() {
        console.log('no' + heavy.getCount() + ':heavy Finished!!');
        heavy.countUp();
      });
    }
    jasmine.clock().tick(1000);
  });

  it('非同期の順番制御。heavy -> random -> light', function() {
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();
    var orderedFunction = function(callback) {
      app.heavyAjax(function() {
        console.log('no' + heavy.getCount() + ':heavy Finished!!');
        heavy.countUp();
        app.randomAjax(function() {
          console.log('no' + random.getCount() + ':random Finished!!');
          random.countUp();
          app.lightAjax(function() {
            console.log('no' + light.getCount() + ':light Finished!!');
            light.countUp();
            if (!callback) {
              return;
            }
            callback();
          });
        });
      });
    };

    var wrapperFunction;
    for (var i = 0; i < 5; ++i) {
      (function() {
        // currentFunctionのスコープを作りたいため即時実行関数にする
        var currentFunction = wrapperFunction;
        wrapperFunction = function() {
          orderedFunction(currentFunction);
        };
      })();
    }
    wrapperFunction();
    jasmine.clock().tick(100000);
  });
});
