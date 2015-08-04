/* global describe, it, expect, app */
xdescribe('スーパーマン', function() {
  'use strict';
  it('スーパー挨拶をする', function() {
    var me = new app.Superman('Miya', 'Hello');
    expect(me.name).toBe('Miya');
    expect(me.greeting).toBe('Hello');
    expect(me.helloMessage()).toBe('Hello Miya');
    expect(me.superHelloMessage()).toBe('Hello Superman Miya');
    expect(me instanceof app.Superman).toBe(true);
    // プロトタイプ取得の標準はObject.getPrototypeOf(obj);
    //expect(Object.getPrototypeOf(me).__proto__).toBe(app.Person.prototype);
    expect(me.constructor).toBe(app.Superman);
    //オブジェクトの__proto__はコンストラクタのprototypeを参照している
    expect(me.__proto__).toBe(app.Superman.prototype);
    //オブジェクトの__proto__の__proto__プロパティが親のprototypeを参照している。
    //これがチェーンとなる
    expect(me.__proto__.__proto__).toBe(app.Person.prototype);
    // helloMessage関数の参照先の確認
    expect(me.helloMessage).toBe(app.Superman.prototype.__proto__.helloMessage);
    // superHelloMessageの参照先の確認
    expect(me.superHelloMessage).toBe(app.Superman.prototype.superHelloMessage);
  });
  it('空を飛ぶ', function() {
    var me = new app.Superman('Miya', 'Hello');
    me.fly();
  });

});
