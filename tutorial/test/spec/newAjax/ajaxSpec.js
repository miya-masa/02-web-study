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
    var newAjax = app.newAjax;

    for (var i = 0; i < 5; ++i) {
      var no = i;
      newAjax.lightAjax().done(function() {
        console.log('no' + light.getCount() + ':new light Finished!!');
        light.countUp();
      });
      newAjax.randomAjax().done(function() {
        console.log('no' + random.getCount() + ':new random Finished!!');
        random.countUp();
      });
      newAjax.heavyAjax().done(function() {
        console.log('no' + heavy.getCount() + ':new heavy Finished!!');
        heavy.countUp();
      });
    }
    jasmine.clock().tick(10000);
  });

  it('非同期の順番制御。heavy -> random -> light', function() {
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();
    var newAjax = app.newAjax;
    // Question 下記に示す順番で実行順序を制御する
    // 0 heavy
    // 0 random
    // 0 light
    // 1 heavy
    // 1 random
    // 1 light
    // 2 heavy
    // 2 random
    // 2 light
    // 3 heavy
    // 3 random
    // 3 light
    // ...
    for (var i = 0; i < 5; i++) {
    }
    jasmine.clock().tick(100000);
  });
});
