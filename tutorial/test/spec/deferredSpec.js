/* global describe, it, expect, app */
xdescribe('Deferred Promiseを試す', function() {
  'use strict';
  beforeEach(function() {
    jasmine.clock().install();
  });
  afterEach(function() {
    jasmine.clock().tick(10000);
    jasmine.clock().uninstall();
  });
  // app.delayは一秒後にHelloと表示する関数
  // promiseoオブジェクトを返す
  it('Deferredの前の確認', function() {
    // app.delayが終わった後に処理を行いたい場合
    // これはダメパターン
    console.log('ダメパターン');
    // delayよりAfter Helloの方が早く実行されてしまう
    app.delay();
    console.log('After Hello');
  });
  it('Deferred基礎の基礎', function() {
    // app.delayが終わった後に処理を行いたい場合
    console.log('OKパターン');
    //doneの引数の関数はapp.delayの中に定義されている d.resolve()に反応して実行
    var promise = app.delay();
    // promiseのdone関数の引数にコールバック関数を指定すると
    // defferedがresolve状態になった時に実行される
    promise.done(function() {
      var d = new $.Deferred();
      console.log('After Hello');
      // resolveはpromiseを返す
      return d.resolve();
    });
  });
  it('Deferred基礎', function() {
    // app.delayが終わった後に処理を行いたい場合
    console.log('OKパターン');
    //deferredでつなぐ場合はかならずpromiseを返すこと
    app.delay().done(function() {
      var d = new $.Deferred();
      console.log('After Hello');
      // resolveはpromiseを返す
      return d.resolve();
    });
  });
  it('done関数', function() {
    // doneはresolveで一斉に実行される
    // done()もpromiseオブジェクトを返す。そのpromiseオブジェクトはすべて同じのため
    // delay内のresolveで一斉に実行される
    // この例の場合の順番は １回目のapp.delay -> After Done2 -> 二回目のapp.delay
    app.delay().done(app.delay).done(function() {
      var d = new $.Deferred();
      console.log('After Done2');
      return d.resolve();
    });
  });

  it('then関数', function() {
    // promise.thenもdoneと同じようにapp.delayのresolveに反応する
    // 違いは別のpromiseを返すため、順番に実行制御ができる
    // この例の場合の順番は １回目のapp.delay -> 二回目のapp.delay -> After Then
    app.delay().then(app.delay).then(function() {
      var d = new $.Deferred();
      console.log('After Then');
      return d.resolve();
    });
  });

  it('fail関数', function() {
    // rejectされた場合はthenは飛ばしてfailを実行する
    // delayは引数にtrueを与えるとHelloと出力せずrejectするように実装している
    // この例の場合の順番は １回目のapp.delay -> Reject
    app.delay(true).then(app.delay).then(function() {
      var d = new $.Deferred();
      console.log('After Then');
      return d.resolve();
    }).fail(function() {
      var d = new $.Deferred();
      console.log('Reject');
      return d.resolve();
    });
  });

  it('when関数', function() {
    //複数の非同期処理の実行制御
    // app.delay * 2 と app.longDelayの処理が終わった後に After Whenが実行
    $.when(app.delay(), app.delay(), app.longDelay()).done(function() {
      var d = new $.Deferred();
      console.log('After When');
      return d.resolve();
    });
  });

  it('deferredに紐づくpromiseを取得', function() {
    // 明示的な遅延実行ができる
    // この例の場合の順番は Define -> Done
    var d = new $.Deferred();
    var p = d.promise();
    p.done(function() {
      var d = new $.Deferred();
      console.log('Done');
      return d.resolve();
    })
    console.log('Define');
    d.resolve();
  });
});
