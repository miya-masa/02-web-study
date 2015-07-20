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
    // jasmineの時間を制御する準備
    jasmine.clock().install();
  });
  afterEach(function() {
    // jasmineの時間制御設定をクリア
    jasmine.clock().uninstall();
  });

  it('非同期の挙動', function() {
    // 非同期制御が呼ばれた回数をカウントするカウンター
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();

    //3種類の非同期処理を5回繰り返す
    for (var i = 0; i < 5; ++i) {
      var no = i;
      // 軽い非同期処理
      app.lightAjax(function() {
        console.log('no' + light.getCount() + ':light');
        light.countUp();
      });
      // 処理時間が不定な非同期処理
      app.randomAjax(function() {
        console.log('no' + random.getCount() + ':random');
        random.countUp();
      });
      // 比較的処理時間が重いajax処理
      app.heavyAjax(function() {
        console.log('no' + heavy.getCount() + ':heavy');
        heavy.countUp();
      });
    }
    // 時間を進める
    jasmine.clock().tick(10000);
  });

  //callbackを利用した順番制御良くない例
  // no0:heavy
  // no0:random
  // no0:light
  // no1:heavy
  // no1:random
  // no1:light
  // no2:heavy
  // no2:random
  // no2:light
  // の様に出力したい
  it('非同期の順番制御。heavy -> random -> light', function() {
    var light = new Counter();
    var random = new Counter();
    var heavy = new Counter();
    //一度関数をまとめる
    var orderedFunction = function(callback) {
      app.heavyAjax(function() {
        console.log('no' + heavy.getCount() + ':heavy');
        heavy.countUp();
        app.randomAjax(function() {
          console.log('no' + random.getCount() + ':random');
          random.countUp();
          app.lightAjax(function() {
            console.log('no' + light.getCount() + ':light');
            light.countUp();
            //ネストが深い！
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
        // 再帰的にラップしていく
        // 分かりづらい！
        var currentFunction = wrapperFunction;
        wrapperFunction = function() {
          orderedFunction(currentFunction);
        };
      })();
    }
    //出来た関数を実行
    wrapperFunction();
    jasmine.clock().tick(100000);
  });
});
