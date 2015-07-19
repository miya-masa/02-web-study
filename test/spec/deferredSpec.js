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
  it('Deferredの前の確認', function() {
    // app.delayが終わった後に処理を行いたい場合
    // これだとダメ
    console.log('ダメパターン');
    app.delay();
    console.log('After Hello');
  });
  it('Deferred基礎', function() {
    // app.delayが終わった後に処理を行いたい場合
    console.log('OKパターン');
    app.delay().done(function() {
      console.log('After Hello');
    });
  });
  it('done関数', function() {
    // doneはresolveで一斉に実行される
    app.delay().done(app.delay).done(function() {
      console.log('After Done2');
    });
  });

  it('then関数', function() {
    app.delay().then(app.delay).then(function() {
      console.log('After Then');
    });
  });

  it('fail関数', function() {
    // rejectされた場合はthenは飛ばしてfailを実行する
    app.delay(true).then(app.delay).then(function() {
      console.log('After Then');
    }).fail(function() {
      console.log('Reject');
    });
  });

  it('when関数', function() {
    //複数の非同期処理の実行制御
    $.when(app.delay(), app.delay(), app.longDelay()).done(function() {
      console.log('After When');
    });
  });

  it('deferredに紐づくpromiseを取得', function() {
    // 明示的な遅延実行ができる
    var d = new $.Deferred();
    var p = d.promise();
    p.done(function() {
      console.log('Done');
    })
    console.log('Define');
    d.resolve();
  });
});
