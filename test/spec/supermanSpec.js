/* global describe, it, expect, app */
describe('スーパーマン', function() {
  'use strict';
  it('スーパー挨拶をする', function() {
    var me = new app.Superman('Miya', 'Hello');
    expect(me.name).toBe('Miya');
    expect(me.greeting).toBe('Hello');
    expect(me.helloMessage()).toBe('Hello Miya');
    expect(me.superHelloMessage()).toBe('Hello Superman Miya!');
  });
  it('空を飛ぶ', function() {
    var me = new app.Superman('Miya', 'Hello');
    me.fly();
  });

});
