/* global describe, it, expect, app */
describe('非同期制御', function() {
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

    // 重いajax終了処理
    var thenHeavyFinished = function() {
      console.log('no' + heavy.getCount() + ':new heavy Finished!!');
      heavy.countUp();
    };

    // 軽いajax終了処理
    var thenLightFinished = function() {
      console.log('no' + light.getCount() + ':new light Finished!!');
      light.countUp();
    };

    //ランダムajaxの終了処理
    var randomFinished = function() {
      console.log('no' + random.getCount() + ':new random Finished!!');
      random.countUp();
    };
    var d = new $.Deferred();
    var p = d.promise();
    for (var i = 0; i < 5; i++) {
      // heavyAjax実行
      p = p.then(newAjax.heavyAjax)
        // heavyAjax終了
        .then(thenHeavyFinished)
        // randomAjax実行
        .then(newAjax.randomAjax)
        // randomAjax終了
        .then(randomFinished)
        // lightAjax実行
        .then(newAjax.lightAjax)
        // lightAjax終了
        .then(thenLightFinished);
    }
    d.resolve();
    jasmine.clock().tick(100000);
  });
});
